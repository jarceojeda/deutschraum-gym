/* sim/simulate.js — simulación de N sesiones con un alumno sintético (conocimiento por unidad + olvido).
 * Mide: duplicados, violaciones de tope de nivel, repetición (obligada vs. no obligada), cobertura por unidad
 * y por habilidad, mezcla 70/20/10, espera de la cola de errores, ascensos de nivel, tiempo y tamaño de estado.
 * El alumno NO usa el motor para decidir si acierta: tiene su propio modelo oculto. */
const path = require('path');
const { loadAll } = require('../tools/load-data.js');
require('../src/dg-engine.js');
const DG = globalThis.DG;
const DAY = 86400000;

function respond(item, correct) {
  if (item.type === 'minimal-pair') return correct ? { wo: item.wo.answer, wohin: item.wohin.answer } : { wo: 'zzz', wohin: 'zzz' };
  return correct ? item.answer : '¿¿??';
}

// Casi-aciertos: el 30 % de los fallos del alumno son errores «pequeños» (diéresis quitada, última letra quitada, das↔dass).
// Sirven para medir cuántos errores reales acaban como «almost» (= sin entrar a la cola de errores).
const NEAR_SHARE = 0.3;
function nearMiss(item, rng) {
  if (item.type === 'minimal-pair') return null;
  const a = item.answer, ok = new Set(item.accept.map(x => DG.text.fold(x))), cand = [];
  const add = (kind, text) => { if (text && !ok.has(DG.text.fold(text))) cand.push({ kind, text }); };
  if (/[äöü]/.test(a)) add('umlaut', a.replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u'));
  const m = /^(.*?)([.!?]*)$/.exec(a);
  if (m[1].length >= 3) add('lastletter', m[1].slice(0, -1) + m[2]);
  if (/\bdass\b/.test(a)) add('dassdas', a.replace(/\bdass\b/, 'das')); else if (/\bdas\b/.test(a)) add('dassdas', a.replace(/\bdas\b/, 'dass'));
  return cand.length ? cand[Math.floor(rng.next() * cand.length)] : null;
}

// Alumno: k∈[0,1] por unidad, estabilidad S en días. Primer contacto según nivel; cada exposición refuerza.
function makeLearner(seed, params) {
  const rng = DG.rng.create(seed ^ 0x9e3779b1);
  // 'typical': memoria compatible con el supuesto de SM-2 (estabilidad crece ≈ como el intervalo).
  // 'weak': olvida más rápido de lo que el SRS asume → prueba de estrés (errores abundantes).
  const PRESETS = {
    typical: { k0: { A1: 0.65, A2: 0.5, B1: 0.35 }, guess: 0.1, gainOk: 0.4, gainKo: 0.2, S0: 4, growOk: 2.4, growKo: 1.2, Smax: 400 },
    weak: { k0: { A1: 0.6, A2: 0.45, B1: 0.3 }, guess: 0.1, gainOk: 0.35, gainKo: 0.15, S0: 2, growOk: 1.9, growKo: 1.15, Smax: 400 }
  };
  const P = Object.assign({}, PRESETS[(params && params.preset) || 'typical'], params && params.override || {});
  const K = new Map();
  function state(u, level) {
    let s = K.get(u);
    if (!s) { s = { k: Math.min(0.9, Math.max(0.02, P.k0[level] * (0.6 + 0.8 * rng.next()))), S: P.S0, t: null }; K.set(u, s); }
    return s;
  }
  return {
    p(item, now) {
      const s = state(item.unit, item.level);
      const decay = s.t == null ? 1 : Math.exp(-((now - s.t) / DAY) / s.S);
      return P.guess + (1 - P.guess) * s.k * decay;
    },
    answer(item, now) {
      const s = state(item.unit, item.level);
      const ok = rng.next() < this.p(item, now);
      const decay = s.t == null ? 1 : Math.exp(-((now - s.t) / DAY) / s.S);
      s.k = s.k * decay;
      if (ok) { s.k += (1 - s.k) * P.gainOk; s.S = Math.min(P.Smax, s.S * P.growOk); } else { s.k += (1 - s.k) * P.gainKo; s.S = s.S * P.growKo; }
      s.t = now; return ok;
    }
  };
}

function memStorage() { const m = {}; return { getItem: k => (k in m ? m[k] : null), setItem: (k, v) => { m[k] = String(v); }, _m: m }; }

function pct(a, p) { if (!a.length) return 0; const s = a.slice().sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(p * s.length))]; }

// Controles negativos: sc.srsConfig sobreescribe SRS.CFG sólo durante la corrida (se restaura siempre).
function runScenario(sc) {
  const saved = Object.assign({}, DG.srs.CFG);
  Object.assign(DG.srs.CFG, sc.srsConfig || {});
  try { return runScenarioInner(sc); } finally { Object.keys(DG.srs.CFG).forEach(k => delete DG.srs.CFG[k]); Object.assign(DG.srs.CFG, saved); }
}

function runScenarioInner(sc) {
  const { data, concepts } = loadAll();
  const clock = { t: 1.7e12, now() { return this.t; } };
  const storage = memStorage();
  const eng = DG.engine.createEngine({ data, concepts, storage, clock, rng: DG.rng.create(sc.seed), config: sc.engineConfig });
  if (sc.memorySessions != null) eng.state().settings.memorySessions = sc.memorySessions;
  if (sc.cap) eng.setLevelCap(sc.cap);
  const store = eng.store, Ramp = DG.ramp;
  const learner = makeLearner(sc.seed, { preset: sc.learner || 'typical' });
  const sessions = sc.sessions || 200, size = sc.size || 12;
  const modules = sc.modules || null;
  const M = {
    sessions, size, kind: sc.kind || (modules && modules.length === 1 ? 'module' : 'mix'),
    dupItem: 0, dupUnit: 0, capViolations: 0, slots: 0,
    fresh: { n: 0, repeat3: 0 }, allNonError: { n: 0, repeat2: 0 }, repeatAnyByBand: { '1-50': [0, 0], '51-100': [0, 0], '101-200': [0, 0] },
    mandated: { due: 0, learning: 0, error: 0, new: 0, future: 0 },
    bucket: { current: 0, easier: 0, up: 0, fallback: 0, error: 0 }, mixBase: { current: 0, easier: 0, up: 0 },
    rescue: { n: 0, fast: 0 }, firstAttempts: 0, firstOk: 0, retries: 0, byCls: {}, errWaits: [], errBacklog: [], buildMs: [], warnings: {}, shortfalls: 0
  };
  const nmRng = DG.rng.create(sc.seed ^ 0x5bd1e995);
  const near = { fails: 0, n: 0, byKind: {} };     // casi-aciertos del alumno y cómo los califica el motor
  const lastSeen = new Map();         // id → sesión
  const unitSeen = new Set();
  const skillLast = new Map();        // skillId → sesión
  const skillGaps = [];               // por habilidad con contenido alcanzable: huecos entre apariciones (tras calentamiento)
  const windows = [];                 // cobertura por ventanas de 20 sesiones
  const windowCells = new Set();
  const errEnter = new Map();         // id → sesión en que entró a la cola
  const levelTrace = {};              // módulo → [[sesión, nivel]]
  const warmup = 30, W = 20;
  let winExpected = null;

  // daysBetween: número (días entre inicios de sesión, 1 por defecto) o lista cíclica de huecos FRACCIONALES en días.
  // p. ej. 3 sesiones/día separadas 20 min: [1 - 40/1440, 20/1440, 20/1440]. Los inicios son tiempos absolutos
  // (no se acumula el tiempo de respuesta), así «20 min» es de inicio a inicio.
  const gaps = Array.isArray(sc.daysBetween) ? sc.daysBetween : [sc.daysBetween || 1];
  let startT = clock.t;
  for (let s = 1; s <= sessions; s++) {
    startT += gaps[(s - 1) % gaps.length] * DAY; clock.t = startT;
    const t0 = process.hrtime.bigint();
    const sess = eng.startSession({ kind: M.kind, modules: modules || undefined, size });
    M.buildMs.push(Number(process.hrtime.bigint() - t0) / 1e6);
    sess.warnings.forEach(w => { M.warnings[w.code] = (M.warnings[w.code] || 0) + 1; });
    if (sess.warnings.some(w => w.code === 'SHORTFALL')) M.shortfalls++;
    const items = sess.plan.items;
    M.slots += items.length;
    const ids = items.map(e => e.id), us = items.map(e => e.unit);
    M.dupItem += ids.length - new Set(ids).size; M.dupUnit += us.length - new Set(us).size;

    const mp = sess.plan.modulePlan || {};
    items.forEach(e => {
      const it = store.byId[e.id];
      if (!Ramp.allowed(eng.state().settings, it.module, it.level)) M.capViolations++;
      M.bucket[e.bucket]++; M.mandated[e.cls] = (M.mandated[e.cls] || 0) + 1;
      if (e.bucket !== 'error' && e.bucket !== 'fallback' && mp[e.module] && mp[e.module].hasEasier && mp[e.module].hasUp) M.mixBase[e.bucket]++;
      const prev = lastSeen.get(e.id), d = prev == null ? null : s - prev;
      const band = s <= 50 ? '1-50' : s <= 100 ? '51-100' : '101-200';
      M.repeatAnyByBand[band][1]++; if (d != null) M.repeatAnyByBand[band][0]++;
      if (e.bucket !== 'error') { M.allNonError.n++; if (d != null && d <= 2) M.allNonError.repeat2++; }
      if (e.cls === 'new' || e.cls === 'future') {
        M.fresh.n++; if (d != null && d <= 3) M.fresh.repeat3++;
        const fc = (M.freshBy = M.freshBy || {}); const k = e.cls + (d != null && d <= 3 ? '@d' + d : '');
        fc[k] = (fc[k] || 0) + 1;
      }
      // espera de un error = sesiones hasta su PRIMERA reaparición (cualquier cubo: el motor puede traerlo por la cola o por el sorteo normal)
      { const t = errEnter.get(e.id); if (t != null) { M.errWaits.push(s - t); errEnter.delete(e.id); } }
      if (s > warmup) { const l = skillLast.get(e.skillId); if (l != null) skillGaps.push(s - l); }
      skillLast.set(e.skillId, s); unitSeen.add(e.unit); lastSeen.set(e.id, s); windowCells.add(e.skillId);
    });

    // cobertura por ventana de 20 sesiones: celdas alcanzables (con ≥1 unidad en niveles ≤ nivel actual del módulo al inicio)
    if ((s - 1) % W === 0) {
      winExpected = new Set();
      const mods = modules || store.modules();
      mods.forEach(m => {
        const cur = Ramp.currentLevel(eng.state(), store, m); if (!cur) return;
        (store.unitsByModule[m] || []).forEach(u => { if (Ramp.CFG && DG.items.levelRank(u.level) <= DG.items.levelRank(cur)) winExpected.add(u.skillId); });
      });
      windowCells.clear();
    }

    // responder (alumno sintético)
    const before = Object.assign({}, eng.state().errors);
    while (!sess.done()) {
      const e = sess.currentEntry(), it = sess.currentItem();
      const ok = learner.answer(it, clock.t);
      let resp = respond(it, ok), nm = null;
      if (!ok && e.retry === 0) { near.fails++; if (nmRng.next() < NEAR_SHARE) { nm = nearMiss(it, nmRng); if (nm) resp = nm.text; } }
      let r = sess.answer(resp, { mode: 'write' });
      if (nm) {
        const k = (near.byKind[nm.kind] = near.byKind[nm.kind] || { n: 0, almost: 0, wrong: 0, correct: 0 });
        near.n++; k.n++; k[r.almost ? 'almost' : r.evaluation.verdict]++;
        if (r.almost) r = sess.answer(respond(it, true), { mode: 'write' });   // el alumno corrige la errata en el reintento
      }
      if (r.rescued) { M.rescue.n++; const pe = before[it.id]; if (pe && clock.t - pe.ts < 16 * 3600000) M.rescue.fast++; }   // «rescatado» con <16 h desde el fallo
      if (e.retry === 0) { M.firstAttempts++; if (ok) M.firstOk++; const b = (M.byCls[e.cls] = M.byCls[e.cls] || [0, 0]); b[1]++; if (ok) b[0]++; } else M.retries++;
      // el error «entra» sólo si el motor lo guardó (un casi-acierto corregido en el reintento NO entra a la cola)
      if (e.retry === 0 && eng.state().errors[it.id] && !errEnter.has(it.id) && !before[it.id]) errEnter.set(it.id, s);
      clock.t += 15000;
    }
    const sm = sess.finish();
    sm.levelChanges.forEach(c => { (levelTrace[c.module] = levelTrace[c.module] || []).push([s, c.change, c.from, c.to]); });
    M.errBacklog.push(Object.keys(eng.state().errors).length);
    if (s % W === 0 && s > warmup - W) {
      const exp = winExpected ? [...winExpected] : [], got = exp.filter(c => windowCells.has(c)).length;
      if (s - W >= warmup - W && exp.length) windows.push({ end: s, expected: exp.length, covered: got, frac: got / exp.length, missing: exp.filter(c => !windowCells.has(c)) });
    }
  }

  // ---- agregados ----
  const st = eng.state();
  const levels = {}, unitCov = {};
  (modules || store.modules()).forEach(m => {
    const cur = Ramp.currentLevel(st, store, m); levels[m] = cur;
    const us = store.unitsByModule[m] || [], lr = DG.items.levelRank;
    const upto = us.filter(u => lr(u.level) <= lr(cur)), below = us.filter(u => lr(u.level) < lr(cur)), at = us.filter(u => u.level === cur);
    const seen = arr => arr.filter(u => unitSeen.has(u.unit)).length;
    unitCov[m] = { level: cur, upTo: [seen(upto), upto.length], below: [seen(below), below.length], at: [seen(at), at.length], all: [seen(us), us.length] };
  });
  const rampFinal = {};
  (modules || store.modules()).forEach(m => {
    const e = Ramp.evaluate(JSON.parse(JSON.stringify(st)), store, m, 10 ** 6), cur = levels[m];
    const tot = store.unitCount(m, cur);
    rampFinal[m] = { level: cur, revN: e.n, revAcc: e.acc == null ? null : +e.acc.toFixed(3), mastered: e.mastered, need: Math.min(Math.ceil(Ramp.CFG.masteryFrac * tot), Ramp.CFG.masteryMaxUnits), units: tot };
  });
  const mixTot = M.mixBase.current + M.mixBase.easier + M.mixBase.up;
  const out = {
    rampFinal: rampFinal, rescue: M.rescue, near: near,
    scenario: sc.name, sessions, size, kind: M.kind, modules: modules || store.modules(), cap: sc.cap || 'B1', seed: sc.seed, memorySessions: eng.state().settings.memorySessions,
    slots: M.slots, dupItem: M.dupItem, dupUnit: M.dupUnit, capViolations: M.capViolations,
    freshRepeat3: M.fresh.n ? M.fresh.repeat3 / M.fresh.n : 0, freshN: M.fresh.n,
    nonErrorRepeat2: M.allNonError.n ? M.allNonError.repeat2 / M.allNonError.n : 0,
    repeatAnyByBand: Object.fromEntries(Object.entries(M.repeatAnyByBand).map(([k, v]) => [k, v[1] ? v[0] / v[1] : 0])),
    composition: Object.fromEntries(Object.entries(M.mandated).map(([k, v]) => [k, v / M.slots])),
    bucketShare: Object.fromEntries(Object.entries(M.bucket).map(([k, v]) => [k, v / M.slots])),
    mix: mixTot ? { n: mixTot, current: M.mixBase.current / mixTot, easier: M.mixBase.easier / mixTot, up: M.mixBase.up / mixTot } : null,
    accuracy: M.firstAttempts ? M.firstOk / M.firstAttempts : null, firstAttempts: M.firstAttempts,
    accuracyByClass: Object.fromEntries(Object.entries(M.byCls).map(([k, v]) => [k, { n: v[1], acc: v[0] / v[1] }])),
    freshBy: M.freshBy, errWait: { n: M.errWaits.length, mean: M.errWaits.length ? M.errWaits.reduce((a, b) => a + b, 0) / M.errWaits.length : 0, p95: pct(M.errWaits, 0.95), max: Math.max(0, ...M.errWaits) },
    errBacklog: { series: M.errBacklog.slice(), max: Math.max(0, ...M.errBacklog), final: M.errBacklog[M.errBacklog.length - 1], mean: M.errBacklog.reduce((a, b) => a + b, 0) / M.errBacklog.length },
    skillGap: { n: skillGaps.length, mean: skillGaps.length ? skillGaps.reduce((a, b) => a + b, 0) / skillGaps.length : 0, p95: pct(skillGaps, 0.95), max: Math.max(0, ...skillGaps) },
    windowCoverage: { n: windows.length, mean: windows.length ? windows.reduce((a, w) => a + w.frac, 0) / windows.length : 1, min: windows.length ? Math.min(...windows.map(w => w.frac)) : 1, worst: windows.slice().sort((a, b) => a.frac - b.frac)[0] || null },
    levels, levelTrace, unitCoverage: unitCov,
    buildMs: { mean: M.buildMs.reduce((a, b) => a + b, 0) / M.buildMs.length, p95: pct(M.buildMs, 0.95), max: Math.max(...M.buildMs) },
    stateBytes: storage.getItem('dg.progress').length, warnings: M.warnings, shortfalls: M.shortfalls,
    stats: st.stats
  };
  return out;
}

const SCENARIOS = [
  { name: 'mix-12', seed: 20260101, sessions: 200, size: 12 },
  { name: 'verben-20', seed: 20260102, sessions: 200, size: 20, modules: ['verben'] },
  { name: 'konnektoren-12', seed: 20260103, sessions: 200, size: 12, modules: ['konnektoren'] },
  { name: 'mix-12-capA2', seed: 20260104, sessions: 200, size: 12, cap: 'A2' },
  { name: 'mix-12-weak', seed: 20260105, sessions: 200, size: 12, learner: 'weak' },
  // 3 sesiones por día separadas 20 min (600 sesiones = 200 días). Métrica clave: rescatados con <16 h desde el fallo = 0.
  { name: 'mix-12-3perday', seed: 20260106, sessions: 600, size: 12, daysBetween: [1 - 40 / 1440, 20 / 1440, 20 / 1440] }
];

module.exports = { runScenario, SCENARIOS, makeLearner };

if (require.main === module) {
  const fs = require('fs');
  const names = process.argv.slice(2); const sel = names.length ? SCENARIOS.filter(s => names.includes(s.name)) : SCENARIOS;
  const res = sel.map(s => { const t = Date.now(); const r = runScenario(s); r.wallMs = Date.now() - t; return r; });
  fs.writeFileSync(path.join(__dirname, 'report.json'), JSON.stringify(res, null, 1));
  res.forEach(r => console.log(JSON.stringify({ name: r.scenario, dup: [r.dupItem, r.dupUnit], cap: r.capViolations, freshRepeat3: +r.freshRepeat3.toFixed(4), nonErrRep2: +r.nonErrorRepeat2.toFixed(3), mix: r.mix && { c: +r.mix.current.toFixed(3), e: +r.mix.easier.toFixed(3), u: +r.mix.up.toFixed(3) }, acc: +r.accuracy.toFixed(3), win: { mean: +r.windowCoverage.mean.toFixed(3), min: +r.windowCoverage.min.toFixed(3) }, errWait: r.errWait, backlog: r.errBacklog, levels: r.levels, trace: r.levelTrace, byCls: r.accuracyByClass, freshBy: r.freshBy, rampFinal: r.rampFinal, ms: r.buildMs.mean.toFixed(1) })));
}
