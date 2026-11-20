const test = require('node:test'), assert = require('node:assert/strict');
const { DG, dataset, newEngine, respond, manualClock } = require('./helpers.js');
const Sch = DG.scheduler, R = DG.ramp, P = DG.progress, I = DG.items;
const store = I.createStore(dataset().data);
const DAY = 864e5;

function ctxOf(state, seed, now) { return { store, state, rng: DG.rng.create(seed), now: now == null ? 1.7e12 : now }; }
function play(eng, session, accuracy, rnd) {
  while (!session.done()) { const it = session.currentItem(); session.answer(respond(it, rnd.next() < accuracy), { mode: 'write' }); }
  return session.finish();
}

test('una sesión nunca repite ítem ni unidad (todas las vías, 150 sesiones)', () => {
  const { eng, clock } = newEngine({ seed: 11 }); const rnd = DG.rng.create(5);
  for (let i = 0; i < 150; i++) {
    const kinds = [{ kind: 'mix', size: 12 }, { kind: 'module', modules: ['verben'], size: 20 }, { kind: 'module', modules: ['konnektoren'], size: 15 }, { kind: 'mix', size: 25 }];
    const s = eng.startSession(kinds[i % kinds.length]);
    const ids = s.plan.items.map(e => e.id), us = s.plan.items.map(e => e.unit);
    assert.equal(new Set(ids).size, ids.length, 'ítem repetido en sesión ' + i); assert.equal(new Set(us).size, us.length, 'unidad repetida en sesión ' + i);
    play(eng, s, 0.8, rnd); clock.advance(DAY);
  }
});
test('filtro de nivel consistente: ningún ítem por encima del tope, ni de errores ni de reintentos (3 topes × 5 módulos)', () => {
  ['A1', 'A2', 'B1'].forEach(cap => {
    ['verben', 'artikel', 'deklination', 'praepositionen', 'konnektoren'].forEach(m => {
      const { eng, clock } = newEngine({ seed: 3 }); eng.setLevelCap(cap);
      // inyectar errores en TODOS los niveles del módulo
      store.byModule[m].filter((_, i) => i % 7 === 0).forEach(it => { eng.state().errors[it.id] = { s: 1, ls: 1, f: 2, ts: 1 }; });
      const rnd = DG.rng.create(9);
      for (let i = 0; i < 12; i++) {
        const s = eng.startSession({ kind: i % 3 === 0 ? 'errors' : 'module', modules: [m], size: 12 });
        s.plan.items.forEach(e => assert.ok(R.levelsAllowed(eng.state().settings, m).includes(e.level), `${m} cap ${cap}: ${e.id} es ${e.level}`));
        while (!s.done()) { const e = s.currentEntry(); assert.ok(R.levelsAllowed(eng.state().settings, m).includes(e.level)); s.answer(respond(s.currentItem(), rnd.next() < 0.4), { mode: 'write' }); }
        s.finish(); clock.advance(DAY);
      }
      // los errores por encima del tope siguen en la cola persistente, sólo que ocultos
      const raw = Object.keys(eng.state().errors).length, visible = eng.errorQueue().length; assert.ok(visible <= raw);
    });
  });
});
test('cola de errores: todo lo fallado se sirve; cupo por sesión y espera acotada', () => {
  const { eng, clock } = newEngine({ seed: 21 });
  const errIds = store.byModule.verben.filter(i => i.level === 'A1').filter((_, i) => i % 40 === 0).slice(0, 8).map(i => i.id);
  errIds.forEach(id => { eng.state().errors[id] = { s: 1, ls: 1, f: 1, ts: 1 }; });
  const served = new Set(); let first = null;
  for (let n = 1; n <= 6; n++) {
    const s = eng.startSession({ kind: 'mix', size: 12 });
    const e = s.plan.items.filter(x => x.bucket === 'error'); if (n === 1) first = e.length;
    e.forEach(x => served.add(x.id));
    assert.ok(e.length <= Math.ceil(12 * 0.25) * 2);
    while (!s.done()) s.answer(respond(s.currentItem(), true), { mode: 'write' }); s.finish(); clock.advance(DAY);
  }
  assert.equal(first, 3, 'cupo = ceil(12×0,25)');
  errIds.forEach(id => assert.ok(served.has(id), 'no se sirvió ' + id));
  assert.equal(eng.errorQueue().length, 0, 'todos rescatados tras acertar en sesión posterior');
});
test('kind=errors sólo sirve errores; sin errores avisa NO_ERRORS y no inventa ítems', () => {
  const { eng } = newEngine({ seed: 22 });
  const e0 = eng.startSession({ kind: 'errors', size: 10 }); assert.equal(e0.length(), 0); assert.ok(e0.warnings.some(w => w.code === 'NO_ERRORS'));
  const ids = store.byModule.artikel.slice(0, 5).map(i => i.id); ids.forEach(id => { eng.state().errors[id] = { s: 1, ls: 1, f: 1, ts: 1 }; });
  const s = eng.startSession({ kind: 'errors', size: 10 }); assert.equal(s.length(), 5); assert.ok(s.plan.items.every(x => x.bucket === 'error' && ids.includes(x.id)));
});
test('sesión de módulo sólo contiene ese módulo (también sus errores)', () => {
  const { eng } = newEngine({ seed: 23 });
  store.byModule.artikel.slice(0, 6).forEach(i => { eng.state().errors[i.id] = { s: 1, ls: 1, f: 1, ts: 1 }; });
  for (let k = 0; k < 10; k++) { const s = eng.startSession({ kind: 'module', modules: ['deklination'], size: 12 }); assert.ok(s.plan.items.every(x => x.module === 'deklination')); }
});
test('avisos: tope A1 en konnektoren → LEVEL_THIN + SHORTFALL; pool bajo el mínimo bajo el tope → POOL_UNDER_MIN', () => {
  const { eng } = newEngine({ seed: 24 }); eng.setLevelCap('A1');
  const s = eng.startSession({ kind: 'module', modules: ['konnektoren'], size: 12 });
  const codes = s.warnings.map(w => w.code);
  assert.ok(codes.includes('LEVEL_THIN') && codes.includes('SHORTFALL'), codes.join()); assert.ok(s.length() <= 3);
  eng.setLevelCap('A2');
  const s2 = eng.startSession({ kind: 'module', modules: ['konnektoren'], size: 12 });
  assert.ok(s2.warnings.some(w => w.code === 'POOL_UNDER_MIN' && w.pool === 'konnektoren:dass-ob-damit' && w.available === 8), JSON.stringify(s2.warnings));
});
test('memoria de sesiones: lo visto ayer casi no vuelve; recupera peso con la distancia (estadístico, plan puro)', () => {
  const mk = dist => {
    const st = P.defaults(); st.sessionCounter = dist;
    return st;
  };
  const units = store.unitsByModule.artikel.filter(u => u.level === 'A1');
  const seenUnits = units.slice(0, 12);                                  // «lo visto» en la sesión 1
  const run = dist => {
    const st = mk(dist); st.history = [{ n: 1, ts: 1, kind: 'mix', modules: ['artikel'], ids: seenUnits.map(u => u.items[0].id) }];
    const ctx = ctxOf(st, 100 + dist), S = new Set(seenUnits.map(u => u.unit)); let hit = 0, tot = 0;
    for (let k = 0; k < 600; k++) { ctx.rng = DG.rng.create(1000 + k); const p = Sch.buildSession(ctx, { kind: 'module', modules: ['artikel'], size: 12 }); p.items.forEach(e => { tot++; if (S.has(e.unit)) hit++; }); }
    return hit / tot;
  };
  const baseline = 12 / units.length * 1;                                // prob. base por unidad si no hubiese memoria
  const d1 = run(1) / baseline, d3 = run(3) / baseline, d6 = run(6) / baseline;   // N=5: d=6 queda fuera de la ventana
  assert.ok(d1 < 0.12, 'd=1 → ' + d1.toFixed(3) + '× la base');
  assert.ok(d3 > 0.15 && d3 < 0.55, 'd=3 → ' + d3.toFixed(3));
  assert.ok(d6 > 0.8 && d6 < 1.25, 'd=6 (fuera de ventana) → ' + d6.toFixed(3));
  assert.ok(d1 < d3 && d3 < d6);
});
test('SRS pesa: las unidades vencidas salen mucho más que las no vencidas', () => {
  const st = P.defaults(); const now = 1.7e12;
  const units = store.unitsByModule.artikel.filter(u => u.level === 'A1').slice(0, 40);
  units.forEach((u, i) => { st.units[u.unit] = i < 20 ? { s: 'r', d: now - 2 * DAY, t: now - 5 * DAY, i: 3, r: 2, e: 2.3, l: 0, n: 2, f: 0 } : { s: 'r', d: now + 20 * DAY, t: now - DAY, i: 21, r: 4, e: 2.5, l: 0, n: 4, f: 0 }; });
  st.skills['artikel:genero'] = { n: 50, acc: 0.85, ls: 0 };
  const due = new Set(units.slice(0, 20).map(u => u.unit)), fut = new Set(units.slice(20).map(u => u.unit));
  let a = 0, b = 0;
  for (let k = 0; k < 400; k++) { const p = Sch.buildSession(ctxOf(st, 7000 + k, now), { kind: 'module', modules: ['artikel'], size: 12 }); p.items.forEach(e => { if (due.has(e.unit)) a++; if (fut.has(e.unit)) b++; }); }
  assert.ok(a > 6 * b, `vencidas=${a} futuras=${b}`);
});
test('cuotas: tope por tipo (order ≤30 %, transform ≤25 %) y por casilla (≤50 %) dentro del cubo de nivel', () => {
  const { eng, clock } = newEngine({ seed: 31 }); const rnd = DG.rng.create(2);
  for (let i = 0; i < 40; i++) {
    const s = eng.startSession({ kind: 'module', modules: ['konnektoren'], size: 20 });
    const c = {}; s.plan.items.forEach(e => { c[e.type] = (c[e.type] || 0) + 1; });
    assert.ok((c.order || 0) <= 6, 'order=' + c.order); assert.ok((c.transform || 0) <= 5, 'transform=' + c.transform);
    const cells = {}; s.plan.items.forEach(e => { cells[e.skillId] = (cells[e.skillId] || 0) + 1; });
    assert.ok(Math.max(...Object.values(cells)) <= 10, JSON.stringify(cells));
    play(eng, s, 0.85, rnd); clock.advance(DAY);
  }
  // Jerarquía: nivel > casilla. En A1 los verbos sólo tienen «presente»; el cupo por casilla se relaja ahí,
  // y las demás habilidades (Präteritum, Partizip II, haben/sein) entran por el cubo «reto» (A2).
  const seenA1 = {}, seenUp = {}; let nUp = 0, sessionsA1 = 0;
  for (let i = 0; i < 40; i++) {
    const lv = eng.levelOf('verben');
    const s = eng.startSession({ kind: 'module', modules: ['verben'], size: 20 });
    s.plan.items.forEach(e => { if (lv === 'A1') seenA1[e.skillId] = (seenA1[e.skillId] || 0) + 1; else { seenUp[e.skillId] = (seenUp[e.skillId] || 0) + 1; nUp++; } });
    if (lv === 'A1') sessionsA1++;
    play(eng, s, 0.85, rnd); clock.advance(DAY);
  }
  // En A1 domina «presente» (única habilidad del nivel) pero el cubo «reto» (10 %) ya mete otras habilidades.
  assert.ok(sessionsA1 >= 1 && sessionsA1 < 25, 'sesiones en A1: ' + sessionsA1);
  assert.ok(Object.keys(seenA1).length > 1, 'el cubo reto debe traer otras habilidades en A1: ' + JSON.stringify(seenA1));
  // Tras ascender, las 4 habilidades verbales entran y ninguna monopoliza la sesión.
  assert.equal(Object.keys(seenUp).length, 4, JSON.stringify(seenUp));
  Object.values(seenUp).forEach(c => assert.ok(c / nUp < 0.6, JSON.stringify(seenUp)));
  assert.ok(eng.levelOf('verben') !== 'A1', 'el dominio de verbos debió ascender');
});
test('semilla: determinista sólo si se fija; sin semilla dos motores con el MISMO reloj congelado difieren', () => {
  const a = newEngine({ seed: 5 }), b = newEngine({ seed: 5 });
  assert.deepEqual(a.eng.startSession({ size: 12 }).plan.items.map(e => e.id), b.eng.startSession({ size: 12 }).plan.items.map(e => e.id));
  const { data, concepts } = dataset(), clock = manualClock(1.7e12);
  const mk = () => DG.engine.createEngine({ data, concepts, storage: null, clock });   // sin rng → entropía
  const x = mk().startSession({ size: 12 }).plan.items.map(e => e.id), y = mk().startSession({ size: 12 }).plan.items.map(e => e.id);
  assert.notDeepEqual(x, y);
});
test('orden: unidades contiguas distintas; habilidades nuevas en bloque contiguo; errores repartidos', () => {
  const { eng } = newEngine({ seed: 41 });
  const s = eng.startSession({ kind: 'mix', size: 20 });                     // estado vacío: todas las habilidades son nuevas
  const sk = s.plan.items.map(e => e.skillId);
  new Set(sk).forEach(k => { const idx = sk.map((x, i) => x === k ? i : -1).filter(i => i >= 0); assert.equal(idx[idx.length - 1] - idx[0] + 1, idx.length, 'bloque no contiguo: ' + k); });
  const e2 = newEngine({ seed: 42 }).eng; Object.keys(e2.state()).length;
  store.byModule.deklination.slice(0, 5).forEach(i => { e2.state().errors[i.id] = { s: 1, ls: 1, f: 1, ts: 1 }; });
  Object.keys(store.bySkillId).forEach(k => { e2.state().skills[k] = { n: 50, acc: 0.8, ls: 0 }; });   // ya no son nuevas → intercalado
  const t = e2.startSession({ kind: 'mix', size: 20 }); const pos = t.plan.items.map((e, i) => e.bucket === 'error' ? i : -1).filter(i => i >= 0);
  assert.ok(pos.length >= 2); for (let i = 1; i < pos.length; i++) assert.ok(pos[i] - pos[i - 1] >= 2, 'errores pegados: ' + pos);
  const u = t.plan.items.map(e => e.unit); for (let i = 1; i < u.length; i++) assert.notEqual(u[i], u[i - 1]);
});
test('plan puro: buildSession no muta el estado', () => {
  const st = P.defaults(); const before = JSON.stringify(st);
  Sch.buildSession(ctxOf(st, 1), { kind: 'mix', size: 12 }); assert.equal(JSON.stringify(st), before);
});

/* ===== 2b · punto 1: cola de errores y clase `learning` ===== */
test('P1 scheduler: un error con menos de learnStepMs desde el fallo pesa 0; justo al cumplirse ya es elegible', () => {
  const now = 1.7e12, step = DG.srs.CFG.learnStepMs;
  const ids = store.byModule.artikel.filter(i => i.level === 'A1').slice(0, 6).map(i => i.id);
  const mk = age => { const st = P.defaults(); st.sessionCounter = 5; ids.forEach(id => { st.errors[id] = { s: 1, ls: 4, f: 1, ts: now - age }; }); return st; };
  for (let k = 0; k < 20; k++) {
    const young = Sch.buildSession(ctxOf(mk(step - 1), 300 + k, now), { kind: 'mix', size: 12 });
    assert.equal(young.items.filter(e => e.bucket === 'error').length, 0, 'error de hace <1 h en la sesión');
    const e0 = Sch.buildSession(ctxOf(mk(step - 1), 300 + k, now), { kind: 'errors', size: 12 });
    assert.equal(e0.items.length, 0); assert.ok(e0.warnings.some(w => w.code === 'ERRORS_NOT_READY'), JSON.stringify(e0.warnings));
    assert.ok(!e0.warnings.some(w => w.code === 'NO_ERRORS'));
    const old = Sch.buildSession(ctxOf(mk(step), 300 + k, now), { kind: 'errors', size: 12 });
    assert.equal(old.items.length, 6); assert.ok(old.items.every(e => ids.includes(e.id)));
  }
});
test('P1 scheduler: `learning` (paso de 1 h sin cumplir) no cuenta como vencida ni en la cuota ni en el atraso D; al cumplirse sí', () => {
  const now = 1.7e12, step = DG.srs.CFG.learnStepMs;
  const us = store.unitsByModule.artikel.filter(u => u.level === 'A1').slice(0, 30), set = new Set(us.map(u => u.unit));
  const mk = () => { const st = P.defaults(); st.sessionCounter = 5; us.forEach(u => { st.units[u.unit] = { s: 'l', r: 0, l: 0, e: 2.3, i: 0, t: now - 1000, d: now - 1000 + step, n: 1, f: 1 }; }); return st; };
  const learning = Sch.buildSession(ctxOf(mk(), 1, now), { kind: 'module', modules: ['artikel'], size: 12 });
  assert.equal(learning.composition.control.dueAvail, 0, 'D no cuenta learning');
  for (let k = 0; k < 30; k++) {
    const p = Sch.buildSession(ctxOf(mk(), 400 + k, now), { kind: 'module', modules: ['artikel'], size: 12 });
    assert.ok(p.items.every(e => !set.has(e.unit)), 'unidad en aprendizaje elegida antes de tiempo');
    assert.equal(p.composition.cls.due, 0);
  }
  const later = Sch.buildSession(ctxOf(mk(), 1, now + step), { kind: 'module', modules: ['artikel'], size: 12 });
  assert.equal(later.composition.control.dueAvail, 30, 'cumplido el paso, las 30 son vencidas');
});

/* ===== 2b · punto 4: la memoria de sesiones no se aplica a las vencidas ===== */
test('P4 una unidad vencida con intervalo 1 d vista ayer sale con la misma probabilidad que otra vencida no vista ayer (estadístico)', () => {
  const now = 1.7e12;
  const us = store.unitsByModule.artikel.filter(u => u.skillId === 'artikel:genero' && u.level === 'A1').slice(0, 12);
  const [X, Y] = us;                                                    // X: vista ayer; Y: no
  const mk = () => {
    const st = P.defaults(); st.sessionCounter = 1;
    us.forEach(u => { st.units[u.unit] = { s: 'r', r: 3, l: 0, e: 2.3, i: 1, t: now - DAY, d: now, n: 3, f: 0 }; });   // todas vencidas HOY, mismo estado
    st.history = [{ n: 1, ts: now - DAY, kind: 'mix', modules: ['artikel'], ids: [X.items[0].id] }];                       // ayer: sólo X (d = 1)
    st.skills['artikel:genero'] = { n: 50, acc: 0.85, ls: 1 };
    return st;
  };
  let cx = 0, cy = 0;
  for (let k = 0; k < 1500; k++) {
    const p = Sch.buildSession(ctxOf(mk(), 5000 + k, now), { kind: 'module', modules: ['artikel'], size: 12 });
    p.items.forEach(e => { if (e.unit === X.unit) cx++; if (e.unit === Y.unit) cy++; });
  }
  assert.ok(cx > 150 && cy > 150, `datos insuficientes: X=${cx} Y=${cy}`);
  assert.ok(cx / cy > 0.8 && cx / cy < 1.25, `X (vista ayer)=${cx} vs Y=${cy}: ratio ${(cx / cy).toFixed(2)}`);
});

test('P5 chooseVariant: en un verbo con cambio de vocal du y er_sie_es pesan ×3 y wir/sie_Sie (= infinitivo) ×0,5; en uno regular, uniforme', () => {
  const raw = dataset().data;
  const freq = (lemma, skill) => {
    const mini = I.createStore(raw.filter(x => x.module === 'verben' && x.lemma === lemma && x.skill === skill));
    const f = {}; const N = 6000;
    for (let k = 0; k < N; k++) { const p = Sch.buildSession({ store: mini, state: P.defaults(), rng: DG.rng.create(7000 + k), now: 1.7e12 }, { kind: 'module', modules: ['verben'], size: 1 }); const it = mini.byId[p.items[0].id]; f[it.person] = (f[it.person] || 0) + 1; }
    Object.keys(f).forEach(k => { f[k] /= N; }); return f;
  };
  const h = freq('fahren', 'praesens');                    // pesos 1·3·3·.5·1·.5 = 9
  const near = (x, y, m) => assert.ok(Math.abs(x - y) < 0.025, m + ': ' + x.toFixed(3) + ' vs ' + y.toFixed(3));
  near(h.du, 3 / 9, 'du'); near(h.er_sie_es, 3 / 9, 'er'); near(h.ich, 1 / 9, 'ich'); near(h.ihr, 1 / 9, 'ihr'); near(h.wir, 0.5 / 9, 'wir'); near(h.sie_Sie, 0.5 / 9, 'sie');
  const r = freq('arbeiten', 'praesens');
  Object.keys(r).forEach(k => near(r[k], 1 / 6, 'regular ' + k));
});
