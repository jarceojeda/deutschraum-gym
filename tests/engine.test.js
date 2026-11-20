const test = require('node:test'), assert = require('node:assert/strict');
const { DG, dataset, newEngine, respond, memStorage, manualClock } = require('./helpers.js');
const I = DG.items, R = DG.ramp, SRS = DG.srs; const DAY = 864e5;
const store = I.createStore(dataset().data);

// Sesión de 1 módulo con un ítem concreto en cabeza (para controlar el guion).
function sessionWith(eng, ids) { const s = eng.startSession({ kind: 'module', modules: ['deklination'], size: 12 }); s._force = ids; return s; }
function firstOf(s, pred) { while (!s.done()) { const it = s.currentItem(); if (pred(it)) return it; s.answer(respond(it, true), { mode: 'write' }); } return null; }

test('fallo → reintento del MISMO ítem unos puestos después (máx. 2); sólo el primer intento cuenta', () => {
  const { eng } = newEngine({ seed: 51 }); const s = eng.startSession({ kind: 'module', modules: ['artikel'], size: 8 });
  const first = s.currentItem(), len0 = s.length();
  const r1 = s.answer('¿¿??', { mode: 'write' }); assert.equal(r1.retryScheduled, true); assert.equal(s.length(), len0 + 1);
  for (let k = 0; k < 2; k++) s.answer(respond(s.currentItem(), true), { mode: 'write' });
  // el reintento aparece en la posición index+1+gap(3) del momento del fallo = puesto 4 (0-based) de la cola
  const order = []; while (!s.done()) { const it = s.currentItem(); order.push(it.id); s.answer(respond(it, false), { mode: 'write' }); if (order.length > 40) break; }
  const st = eng.state();
  assert.equal(st.items[first.id].a, 1, 'un solo intento registrado (el 1.º)'); assert.equal(st.items[first.id].f, 1);
  assert.ok(st.errors[first.id] && st.errors[first.id].f === 1);
  const times = order.filter(id => id === first.id).length; assert.equal(times, 2, 'dos reintentos como máximo (ambos falló) → apareció 2 veces más');
});
test('el reintento se coloca ≥3 ítems más tarde', () => {
  const { eng } = newEngine({ seed: 52 }); const s = eng.startSession({ kind: 'module', modules: ['artikel'], size: 10 });
  const id = s.currentItem().id; s.answer('xx', { mode: 'write' });
  let steps = 0; while (!s.done() && s.currentItem().id !== id) { s.answer(respond(s.currentItem(), true), { mode: 'write' }); steps++; }
  assert.equal(steps, 3);
});
test('calificación SRS sólo del primer intento: fallo + reintento correcto = unidad en aprendizaje (otra vez)', () => {
  const { eng } = newEngine({ seed: 53 }); const s = eng.startSession({ kind: 'module', modules: ['artikel'], size: 6 });
  const it = s.currentItem(); s.answer('mal', { mode: 'write' });
  while (!s.done() && s.currentItem().id !== it.id) s.answer(respond(s.currentItem(), true), { mode: 'write' });
  s.answer(respond(it, true), { mode: 'write' });                         // acierta en el reintento
  const u = eng.state().units[it.unit]; assert.equal(u.s, 'l'); assert.equal(u.f, 1); assert.equal(u.n, 1);
  assert.ok(eng.state().errors[it.id], 'sigue en la cola persistente: sólo sale acertando en una sesión posterior');
});
test('rescate: acierta en una sesión POSTERIOR → sale de la cola y cuenta como «rescatada»', () => {
  const { eng, clock } = newEngine({ seed: 54 });
  const it = store.byModule.verben.find(i => i.level === 'A1');
  eng.state().errors[it.id] = { s: 1, ls: 1, f: 2, ts: 1 };
  let rescuedNow = false;
  for (let n = 0; n < 6 && !rescuedNow; n++) {
    const s = eng.startSession({ kind: 'errors', size: 5 });
    while (!s.done()) { const cur = s.currentItem(); const r = s.answer(respond(cur, true), { mode: 'write' }); if (r.rescued) { rescuedNow = true; assert.equal(r.fails, 2); } }
    const sm = s.finish(); if (rescuedNow) assert.deepEqual(sm.rescued, [it.id]); clock.advance(DAY);
  }
  assert.ok(rescuedNow); assert.equal(eng.state().errors[it.id], undefined); assert.equal(eng.state().stats.rescued, 1);
});
// errata real (transposición interior) en la palabra más larga de la frase: «casi» bajo las reglas de 2b
function longWordTypo(ans) {
  const ws = ans.replace(/[.,!?;:]/g, '').split(/\s+/).filter(w => /^[A-Za-z]{6,}$/.test(w) && !/^(dieser|dieses|diesen|diesem|keinen|keinem|keiner|keines|meinen|meinem|meiner|deinen|deinem|deiner|seinen|seinem|seiner|ihren|ihrem|ihrer|unsere|unseren|unserem|unserer|welcher|welchen|welchem|welches|jeden|jedem|jeder|jedes|einen|einem|einer|eines)$/i.test(w));
  for (const w of ws.sort((x, y) => y.length - x.length)) { const i = Math.floor(w.length / 2); if (w[i] !== w[i + 1]) return ans.replace(w, w.slice(0, i) + w[i + 1] + w[i] + w.slice(i + 2)); }
  return null;
}
test('«casi» (errata en palabra larga de una frase): no avanza ni penaliza; acertar tras «casi» = difícil; un 2.º «casi» = fallo', () => {
  const { eng } = newEngine({ seed: 55 });
  const pick = () => { for (let k = 0; k < 160; k++) { const s = eng.startSession({ kind: 'module', modules: ['konnektoren'], size: 12 }); const it = firstOf(s, i => i.type === 'transform' && longWordTypo(i.answer)); if (it) return { s, it }; } };
  const { s, it } = pick(); const typo = longWordTypo(it.answer);
  const r1 = s.answer(typo, { mode: 'write' });
  assert.equal(r1.almost, true); assert.equal(r1.advance, false); assert.equal(s.currentItem().id, it.id); assert.equal(eng.state().items[it.id], undefined);
  const r2 = s.answer(it.answer, { mode: 'write' }); assert.equal(r2.evaluation.verdict, 'correct');
  const u = eng.state().units[it.unit]; assert.equal(u.s, 'r'); assert.equal(u.i, SRS.CFG.firstHard); assert.equal(eng.state().errors[it.id], undefined);
  // segundo «casi» seguido → fallo
  const { s: s2, it: it2 } = pick(); const bad = longWordTypo(it2.answer);
  assert.equal(s2.answer(bad, { mode: 'write' }).almost, true); const r3 = s2.answer(bad, { mode: 'write' });
  assert.equal(r3.evaluation.verdict, 'wrong'); assert.ok(eng.state().errors[it2.id]);
});
test('P2 «casi» ya no perdona un error gramatical: una frase con das↔dass o diéresis perdida es fallo al primer intento (entra a la cola)', () => {
  const { eng } = newEngine({ seed: 56 });
  let tested = 0;
  for (let k = 0; k < 200 && tested < 2; k++) {
    const s = eng.startSession({ kind: 'module', modules: ['konnektoren'], size: 12 });
    const it = firstOf(s, i => /\bdass\b/.test(i.answer) && (i.type === 'transform' || i.type === 'order'));
    if (!it) continue;
    const r = s.answer(it.answer.replace(/\bdass\b/, 'das'), { mode: 'write' });
    assert.equal(r.almost, false); assert.equal(r.evaluation.verdict, 'wrong'); assert.ok(eng.state().errors[it.id]); tested++;
  }
  assert.equal(tested, 2);
});
test('persistencia inmediata: tras cada respuesta el almacenamiento ya contiene el error', () => {
  const { eng, storage } = newEngine({ seed: 56 }); const s = eng.startSession({ kind: 'module', modules: ['verben'], size: 6 });
  const it = s.currentItem(); s.answer('basura', { mode: 'write' });
  const saved = JSON.parse(storage.getItem('dg.progress')); assert.ok(saved.errors[it.id]); assert.equal(saved.items[it.id].f, 1);
  assert.equal(saved.tags[it.errorTag].f, 1); assert.ok(saved.history[saved.history.length - 1].ids.includes(it.id));
});
test('bajar el tope a mitad de sesión: no se programan reintentos de ítems que ya no están permitidos', () => {
  const { eng } = newEngine({ seed: 57 }); const s = eng.startSession({ kind: 'module', modules: ['deklination'], size: 12 });
  const it = firstOf(s, i => i.level !== 'A1'); if (!it) return;           // si el módulo sólo sirvió A1, nada que probar
  eng.setLevelCap('A1'); const len = s.length(); const r = s.answer('zzz', { mode: 'write' });
  assert.equal(r.retryScheduled, false); assert.equal(s.length(), len);
});
test('giveUp cuenta como fallo del primer intento y programa reintento', () => {
  const { eng } = newEngine({ seed: 58 }); const s = eng.startSession({ kind: 'module', modules: ['artikel'], size: 6 });
  const it = s.currentItem(); const len = s.length(); s.giveUp(); assert.equal(s.length(), len + 1); assert.equal(eng.state().items[it.id].f, 1); assert.ok(eng.state().errors[it.id]);
});
test('resumen: aciertos, unidades nuevas aprendidas, fallos y mapa por etiqueta', () => {
  const { eng } = newEngine({ seed: 59 }); const s = eng.startSession({ kind: 'module', modules: ['verben'], size: 8 }); let i = 0;
  while (!s.done()) { const it = s.currentItem(); const ok = s.currentEntry().retry > 0 ? true : i++ % 2 === 0; s.answer(respond(it, ok), { mode: 'write' }); }
  const sm = s.finish(); assert.equal(sm.answered, 8); assert.equal(sm.correct, 4); assert.equal(sm.accuracy, 0.5); assert.equal(sm.newUnits, 4);
  assert.equal(sm.failed.length, 4); assert.ok(Object.values(sm.errorsByTag).reduce((a, b) => a + b, 0) === 4);
  assert.deepEqual(eng.finish, undefined); assert.equal(s.finish().answered, 8);                // idempotente
  assert.ok(eng.errorMap().length >= 1);
});
test('historial: se registran los ids contestados y sólo se guardan las últimas 12 sesiones', () => {
  const { eng, clock } = newEngine({ seed: 60 });
  for (let k = 0; k < 15; k++) { const s = eng.startSession({ kind: 'mix', size: 6 }); while (!s.done()) s.answer(respond(s.currentItem(), true), { mode: 'write' }); s.finish(); clock.advance(DAY); }
  const h = eng.state().history; assert.equal(h.length, 12); assert.equal(h[h.length - 1].n, 15); assert.ok(h.every(x => x.ids.length >= 6));
});
test('huérfanos: al crear el motor se podan ids/unidades que ya no existen', () => {
  const storage = memStorage(), clock = manualClock();
  const a = newEngine({ storage, clock, seed: 1 }); a.eng.state().items.fantasma = { a: 1, f: 1, ls: 1, lr: 0 }; a.eng.state().errors.fantasma = { s: 1, ls: 1, f: 1, ts: 1 }; a.eng.progress.save();
  const b = newEngine({ storage, clock, seed: 1 }); assert.equal(b.eng.reconciled.errors, 1); assert.equal(b.eng.state().errors.fantasma, undefined);
});
test('rampa extremo a extremo: acertar en deklination sube de A1 a A2 por dominio y se informa al cerrar', () => {
  const { eng, clock } = newEngine({ seed: 61 }); let changed = null;
  for (let n = 0; n < 40 && !changed; n++) {
    const s = eng.startSession({ kind: 'module', modules: ['deklination'], size: 15 });
    while (!s.done()) s.answer(respond(s.currentItem(), true), { mode: 'write' });
    const sm = s.finish(); changed = sm.levelChanges.find(c => c.module === 'deklination'); clock.advance(DAY);
  }
  assert.ok(changed && changed.change === 'promote' && changed.to === 'A2', JSON.stringify(changed)); assert.equal(eng.levelOf('deklination'), 'A2');
  const s = eng.startSession({ kind: 'module', modules: ['deklination'], size: 30 }); const lv = s.plan.items.map(e => e.level);
  assert.ok(lv.includes('A2') && lv.includes('A1'), 'ahora mezcla A2 (actual) y A1 (repaso): ' + [...new Set(lv)]);
});
test('modo táctil por defecto en las vistas; write bajo petición', () => {
  const { eng } = newEngine({ seed: 62 }); const s = eng.startSession({ kind: 'module', modules: ['artikel'], size: 4 });
  const v = s.view(); assert.equal(v.input, 'choice'); const w = s.view('write'); assert.equal(w.input, 'text'); assert.deepEqual(w.options, []);
});

/* ===== 2b · punto 1: cola de errores ===== */
test('P1 rescate: acertar antes de 16 h cuenta para el SRS pero el error sigue (ls sí, f no); a las 16 h exactas se rescata', () => {
  const { eng, clock } = newEngine({ seed: 71 });
  const it = store.byModule.verben.find(i => i.level === 'A1'); const H = 36e5, ts = clock.now();
  eng.state().errors[it.id] = { s: 1, ls: 1, f: 2, ts }; eng.state().sessionCounter = 1;
  clock.advance(2 * H);                                       // pasado el paso de aprendizaje (1 h), muy lejos de 16 h
  let s = eng.startSession({ kind: 'errors', size: 5 }); assert.equal(s.length(), 1);
  let r = s.answer(respond(s.currentItem(), true), { mode: 'write' }); s.finish();
  assert.equal(r.rescued, false);
  const e = eng.state().errors[it.id]; assert.ok(e, 'el error sigue en la cola');
  assert.equal(e.f, 2, 'f no cambia'); assert.equal(e.ts, ts, 'ts (último fallo) no cambia'); assert.equal(e.ls, 2, 'ls = sesión del acierto temprano');
  assert.equal(eng.state().units[it.unit].n, 1, 'cuenta para el SRS'); assert.equal(eng.state().stats.rescued, 0);
  clock.set(ts + 16 * H - 1);                                 // 1 ms antes del umbral: todavía no
  s = eng.startSession({ kind: 'errors', size: 5 }); r = s.answer(respond(s.currentItem(), true), { mode: 'write' }); s.finish();
  assert.equal(r.rescued, false); assert.ok(eng.state().errors[it.id]);
  clock.set(ts + 16 * H);                                     // justo en el umbral: rescatado
  s = eng.startSession({ kind: 'errors', size: 5 }); r = s.answer(respond(s.currentItem(), true), { mode: 'write' }); const sm = s.finish();
  assert.equal(r.rescued, true); assert.equal(r.fails, 2); assert.deepEqual(sm.rescued, [it.id]);
  assert.equal(eng.state().errors[it.id], undefined); assert.equal(eng.state().stats.rescued, 1);
});
test('P1 rescate: un fallo vuelve a empezar el reloj de 16 h (ts nuevo) y suma f', () => {
  const { eng, clock } = newEngine({ seed: 72 });
  const it = store.byModule.verben.find(i => i.level === 'A1'), H = 36e5;
  eng.state().errors[it.id] = { s: 1, ls: 1, f: 1, ts: clock.now() - 30 * H }; eng.state().sessionCounter = 1;
  let s = eng.startSession({ kind: 'errors', size: 5 }); s.answer('¿¿??', { mode: 'write' }); s.finish();
  const e = eng.state().errors[it.id]; assert.equal(e.f, 2); assert.equal(e.ts, clock.now());
  clock.advance(10 * H); s = eng.startSession({ kind: 'errors', size: 5 }); const r = s.answer(respond(s.currentItem(), true), { mode: 'write' });
  assert.equal(r.rescued, false, 'a 10 h del último fallo no se rescata aunque el primer fallo fuese hace 40 h');
});

/* ===== 2b · punto 3: sesiones abandonadas ===== */
const Sch = DG.scheduler;
test('P3 una sesión abierta y cerrada sin responder no deja rastro (contador, historial, carry, stats, rampa)', () => {
  const { eng, clock } = newEngine({ seed: 81 });
  const s0 = eng.startSession({ kind: 'mix', size: 12 }); while (!s0.done()) s0.answer(respond(s0.currentItem(), true), { mode: 'write' }); s0.finish(); clock.advance(DAY);
  const before = JSON.stringify(eng.state());
  for (let k = 0; k < 5; k++) { const s = eng.startSession({ kind: 'mix', size: 12 }); assert.ok(s.length() > 0); const sm = s.finish(); assert.equal(sm.answered, 0); }
  assert.equal(JSON.stringify(eng.state()), before, 'el estado no cambia ni en un byte');
  assert.equal(eng.state().sessionCounter, 1); assert.equal(eng.state().history.length, 1); assert.equal(eng.state().stats.sessions, 1);
});
test('P3 unitDist de lo visto ayer no cambia al abrir/cerrar 5 sesiones vacías: el plan de la sesión siguiente es idéntico', () => {
  const mk = emptyOpens => {
    const { eng, clock } = newEngine({ seed: 82 });
    const s0 = eng.startSession({ kind: 'mix', size: 12 }); while (!s0.done()) s0.answer(respond(s0.currentItem(), true), { mode: 'write' }); s0.finish(); clock.advance(DAY);
    for (let k = 0; k < emptyOpens; k++) eng.startSession({ kind: 'mix', size: 12 }).finish();
    return { eng, clock, yesterday: new Set(eng.state().history[0].ids.map(id => store.byId[id].unit)) };
  };
  const a = mk(0), b = mk(5); let hitA = 0, hitB = 0;
  for (let k = 0; k < 120; k++) {
    const pa = Sch.buildSession({ store, state: a.eng.state(), rng: DG.rng.create(900 + k), now: a.clock.now() }, { kind: 'mix', size: 12 });
    const pb = Sch.buildSession({ store, state: b.eng.state(), rng: DG.rng.create(900 + k), now: b.clock.now() }, { kind: 'mix', size: 12 });
    assert.equal(pa.sessionNo, pb.sessionNo); assert.deepEqual(pa.items.map(e => e.id), pb.items.map(e => e.id));
    pa.items.forEach(e => { if (a.yesterday.has(e.unit)) hitA++; }); pb.items.forEach(e => { if (b.yesterday.has(e.unit)) hitB++; });
  }
  assert.equal(hitA, hitB);
});
test('P3 la 1.ª respuesta (o giveUp) confirma la sesión: contador, historial y carry', () => {
  const { eng } = newEngine({ seed: 83 });
  const s = eng.startSession({ kind: 'module', modules: ['artikel'], size: 6 }); assert.equal(eng.state().sessionCounter, 0); assert.equal(eng.state().history.length, 0);
  const id = s.currentItem().id; s.answer(respond(s.currentItem(), true), { mode: 'write' });
  assert.equal(eng.state().sessionCounter, 1); assert.equal(eng.state().history.length, 1); assert.deepEqual(eng.state().history[0].ids, [id]);
  assert.ok(eng.state().ramp.artikel && eng.state().ramp.artikel.carry, 'carry de la rampa guardado al confirmar');
  s.finish(); assert.equal(eng.state().stats.sessions, 1);
  const g = eng.startSession({ kind: 'module', modules: ['artikel'], size: 6 }); assert.equal(eng.state().sessionCounter, 1);
  g.giveUp(); assert.equal(eng.state().sessionCounter, 2); assert.equal(eng.state().history.length, 2); assert.equal(g.id || g.summary().sessionNo, 2);
});
test('P3 sesiones sin responder entre dos reales no dejan huecos: la siguiente real es la n+1; una abierta «vieja» confirma tras otra más nueva sin repetir número', () => {
  const { eng } = newEngine({ seed: 84 });
  const a = eng.startSession({ kind: 'mix', size: 6 }); eng.startSession({ kind: 'mix', size: 6 }).finish(); eng.startSession({ kind: 'mix', size: 6 }).finish();
  const b = eng.startSession({ kind: 'mix', size: 6 }); b.answer(respond(b.currentItem(), true), { mode: 'write' }); assert.equal(eng.state().sessionCounter, 1); assert.equal(b.id, 1);
  a.answer(respond(a.currentItem(), true), { mode: 'write' });             // «a» se abrió antes pero responde después de b
  assert.equal(eng.state().sessionCounter, 2); assert.equal(a.id, 2); assert.deepEqual(eng.state().history.map(h => h.n), [1, 2]);
});

test('P5 hp: sólo un acierto en du o er_sie_es de un verbo difícil marca st.units[u].hp; fallos y otras personas no', () => {
  const { eng, clock } = newEngine({ seed: 91 }); const rnd = DG.rng.create(3);
  const expect = {}, hardUnits = new Set();
  for (let n = 0; n < 25; n++) {
    const s = eng.startSession({ kind: 'module', modules: ['verben'], size: 20 });
    while (!s.done()) {
      const e = s.currentEntry(), it = s.currentItem(), ui = store.unitInfo[it.unit];
      const ok = (it.person === 'du' || it.person === 'er_sie_es') ? rnd.next() < 0.6 : true;
      s.answer(respond(it, ok), { mode: 'write' });
      if (e.retry === 0 && ui.hard) { hardUnits.add(it.unit); if (ok && (it.person === 'du' || it.person === 'er_sie_es')) expect[it.unit] = true; }
    }
    s.finish(); clock.advance(DAY);
  }
  let withHp = 0, hardNoHp = 0;
  Object.keys(eng.state().units).forEach(u => {
    const hp = !!eng.state().units[u].hp;
    assert.equal(hp, !!expect[u], u); if (hp) withHp++; else if (hardUnits.has(u)) hardNoHp++;
    if (!store.unitInfo[u].hard) assert.equal(hp, false, 'una unidad regular nunca lleva hp: ' + u);
  });
  assert.ok(withHp >= 10 && hardNoHp >= 1, `con hp ${withHp}, difíciles sin hp ${hardNoHp}`);
});
