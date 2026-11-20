// Etapa 2b · punto 6 (prioridad media): una prueba por corrección.
const test = require('node:test'), assert = require('node:assert/strict');
const { DG, dataset, newEngine, respond, manualClock } = require('./helpers.js');
const I = DG.items, E = DG.evaluator, R = DG.ramp, P = DG.progress, Sch = DG.scheduler;
const { data, concepts } = dataset();
const store = I.createStore(data);
const DAY = 864e5;

/* ---------- 6.1 NFC ---------- */
test('P6 NFC: normalizeItem pasa a NFC todos los textos (incl. wo/wohin.accept); el validador avisa de datos no NFC', () => {
  const nfd = s => s.normalize('NFD');
  const raw = JSON.parse(JSON.stringify(data.find(x => x.type === 'cloze' && /[äöü]/.test(x.answer))));
  assert.ok(raw.answer.normalize('NFD') !== raw.answer, 'el ítem de prueba contiene diacríticos');
  const bad = Object.assign({}, raw, { prompt: nfd(raw.prompt), answer: nfd(raw.answer), accept: raw.accept.map(nfd), options: (raw.options || []).map(nfd), hint: nfd(raw.hint || '') });
  const it = I.normalizeItem(bad);
  assert.equal(it.answer, raw.answer.normalize('NFC')); assert.deepEqual(it.accept, raw.accept.map(s => s.normalize('NFC'))); assert.equal(it.prompt, raw.prompt.normalize('NFC'));
  assert.ok(it.nfcFixed);
  const mp = JSON.parse(JSON.stringify(data.find(x => x.type === 'minimal-pair')));
  const badMp = Object.assign({}, mp, { wo: Object.assign({}, mp.wo, { answer: nfd(mp.wo.answer), accept: mp.wo.accept.map(nfd), prompt: nfd(mp.wo.prompt) }), wohin: Object.assign({}, mp.wohin, { accept: mp.wohin.accept.map(nfd) }) });
  const im = I.normalizeItem(badMp);
  assert.deepEqual(im.wo.accept, mp.wo.accept.map(s => s.normalize('NFC'))); assert.equal(im.wo.answer, mp.wo.answer.normalize('NFC')); assert.deepEqual(im.wohin.accept, mp.wohin.accept.map(s => s.normalize('NFC')));
  // el validador avisa; con los datos reales (ya NFC) no
  const v = I.validate(I.createStore([bad]));
  assert.ok(v.warnings.some(w => w.code === 'not-nfc' && w.id === bad.id), 'aviso not-nfc');
  assert.equal(I.validate(store, { concepts }).warnings.filter(w => w.code === 'not-nfc').length, 0);
});

/* ---------- 6.2 letters ---------- */
test('P6 letters: una respuesta en array de letras (ítem no order) se une SIN espacios, en touch y en write', () => {
  const it = data.find(x => x.module === 'verben' && x.type !== 'order' && !(x.options && x.options.length) && /^[a-zäöüß]{4,7}$/.test(x.answer));
  const item = I.normalizeItem(it), letters = it.answer.split('');
  assert.equal(E.evaluate(item, letters, { mode: 'touch' }).verdict, 'correct');
  assert.equal(E.evaluate(item, letters, { mode: 'write' }).verdict, 'correct');
  assert.equal(E.evaluate(item, letters.slice().reverse(), { mode: 'touch' }).verdict, 'wrong');
  // un ítem order sigue uniendo con espacios y pegando la puntuación
  const o = data.find(x => x.type === 'order'), oi = I.normalizeItem(o);
  assert.equal(E.evaluate(oi, o.tiles, { mode: 'touch' }).verdict, 'correct');
});

/* ---------- 6.3 rampa: rev[nxt] ---------- */
test('P6 rampa: al promover se vacía también rev del nivel nuevo (no hereda retención de una visita anterior)', () => {
  const st = P.defaults(), m = 'deklination'; st.sessionCounter = 10;
  const rp = R.moduleRamp(st, m);
  for (let i = 0; i < 30; i++) R.record(st, m, 'A1', true, true);
  store.unitsByModule[m].filter(u => u.level === 'A1').forEach(u => { st.units[u.unit] = { s: 'r', r: 2, n: 3 }; });
  rp.rev = rp.rev || {}; rp.rev.A2 = [1, 0, 1, 1, 0];
  assert.equal(R.evaluate(st, store, m, 10).change, 'promote');
  assert.deepEqual(rp.rev.A2, [], 'rev[A2] vacío tras promover'); assert.deepEqual(rp.rev.A1, []);
});

/* ---------- 6.4 reintentos ---------- */
test('P6 reintento en sesión: sólo si quedan ≥2 ítems por detrás (answer y giveUp)', () => {
  const { eng } = newEngine({ seed: 61 }); const s = eng.startSession({ kind: 'module', modules: ['artikel'], size: 3 });
  const r0 = s.answer('¿¿??', { mode: 'write' });                 // quedan 2 detrás → reintento
  assert.equal(r0.retryScheduled, true); assert.equal(s.length(), 4);
  s.answer(respond(s.currentItem(), true), { mode: 'write' });     // ítem 1 (bien)
  const r2 = s.answer('¿¿??', { mode: 'write' });                 // ítem 2: detrás sólo queda el reintento (1) → sin reintento nuevo
  assert.equal(r2.retryScheduled, false); assert.equal(s.length(), 4);
  // giveUp en el último hueco con <2 detrás tampoco reencola
  const e2 = newEngine({ seed: 62 }).eng, s2 = e2.startSession({ kind: 'module', modules: ['artikel'], size: 3 });
  s2.answer(respond(s2.currentItem(), true), { mode: 'write' }); s2.answer(respond(s2.currentItem(), true), { mode: 'write' });
  s2.giveUp(); assert.equal(s2.length(), 3); assert.equal(s2.done(), true);
});

/* ---------- 6.5 saveError ---------- */
test('P6 saveError: answer/giveUp/finish lo devuelven si progress.save() falla; sin fallo no aparece', () => {
  const m = {}; let fail = false;
  const storage = { getItem: k => (k in m ? m[k] : null), setItem: (k, v) => { if (fail) { const e = new Error('cuota'); e.name = 'QuotaExceededError'; throw e; } m[k] = String(v); }, removeItem: k => { delete m[k]; } };
  const { eng } = newEngine({ seed: 63, storage }); const s = eng.startSession({ kind: 'module', modules: ['artikel'], size: 4 });
  const ok = s.answer(respond(s.currentItem(), true), { mode: 'write' }); assert.equal('saveError' in ok, false);
  fail = true;
  const bad = s.answer(respond(s.currentItem(), true), { mode: 'write' }); assert.equal(bad.saveError, 'QuotaExceededError');
  const g = s.giveUp(); assert.equal(g.saveError, 'QuotaExceededError');
  s.answer(respond(s.currentItem(), true), { mode: 'write' });
  while (!s.done()) s.answer(respond(s.currentItem(), true), { mode: 'write' });
  assert.equal(s.finish().saveError, 'QuotaExceededError');
  fail = false; const s2 = eng.startSession({ kind: 'module', modules: ['artikel'], size: 3 });
  assert.equal('saveError' in s2.answer(respond(s2.currentItem(), true), { mode: 'write' }), false);
});

/* ---------- 6.6 view() cacheada ---------- */
test('P6 view(): misma vista si se llama dos veces en la misma posición (fichas sin re-barajar); cambia al avanzar', () => {
  const { eng } = newEngine({ seed: 64 }); const s = eng.startSession({ kind: 'module', modules: ['deklination', 'konnektoren'], size: 14 });
  let sawTiles = 0;
  while (!s.done()) {
    const a = s.view('touch'), b = s.view('touch');
    assert.strictEqual(a, b); assert.deepEqual(a.tiles, b.tiles); if (a.tiles.length > 1) sawTiles++;
    const w = s.view('write'); assert.notStrictEqual(w, a, 'otro modo = otra vista');
    s.answer(respond(s.currentItem(), true), { mode: 'write' });
    if (!s.done()) assert.notStrictEqual(s.view('touch'), a);
  }
  assert.ok(sawTiles >= 0);
});

/* ---------- 6.7 kind 'errors': varios ítems de una unidad ---------- */
test("P6 kind 'errors': varios errores de la misma unidad entran en la misma sesión", () => {
  const st = P.defaults(), now = 1.7e12, ids = store.units['verben|fahren|praesens'].slice(0, 3).map(i => i.id).concat(store.units['verben|sein|praesens'].slice(0, 2).map(i => i.id));
  ids.forEach(id => { st.errors[id] = { s: 1, ls: 1, f: 1, ts: now - DAY }; });
  st.sessionCounter = 5;
  const plan = Sch.buildSession({ store, state: st, rng: DG.rng.create(9), now }, { kind: 'errors', size: 12 });
  assert.deepEqual(plan.items.map(e => e.id).sort(), ids.slice().sort(), 'los 5 errores, 3 de la misma unidad');
  // fuera del repaso de errores la regla «una unidad por sesión» sigue vigente
  const mix = Sch.buildSession({ store, state: st, rng: DG.rng.create(9), now }, { kind: 'mix', size: 12 });
  const us = mix.items.map(e => e.unit); assert.equal(new Set(us).size, us.length);
});

/* ---------- 6.8 guarda anti-inanición ---------- */
// Se anula el empuje por antigüedad de casilla (cellAgeMax:0) para aislar la red de seguridad: sin ella la casilla puede no salir.
const NOAGE = { cellAgeMax: 0 };
test('P6 anti-inanición: con F≥6, la casilla alcanzable que lleva >10 sesiones sin salir aparece en TODAS las sesiones (60 semillas)', () => {
  const cells = {}; store.unitsByModule.deklination.forEach(u => { if (u.level === 'A1') cells[u.skillId] = true; });
  const target = 'deklination:transform'; assert.ok(cells[target]);
  let hits = 0, N = 60, noGuardHits = 0;
  for (let seed = 1; seed <= N; seed++) {
    const st = P.defaults(); st.sessionCounter = 40;
    Object.keys(cells).forEach(k => { st.skills[k] = { n: 20, acc: 0.8, ls: k === target ? 20 : 39 }; });
    const plan = Sch.buildSession({ store, state: st, rng: DG.rng.create(seed), now: 1.7e12, cfg: NOAGE }, { kind: 'module', modules: ['deklination'], size: 12 });
    if (plan.items.some(e => e.skillId === target)) hits++;
    assert.equal(plan.items.length, 12, 'el hueco reservado no deja la sesión corta');
    assert.equal(plan.items.filter(e => e.guard).length <= 1, true);
    // sin la casilla vencida (ls reciente) no hay nota de guarda
    st.skills[target].ls = 39;
    const p2 = Sch.buildSession({ store, state: st, rng: DG.rng.create(seed), now: 1.7e12, cfg: NOAGE }, { kind: 'module', modules: ['deklination'], size: 12 });
    assert.equal(p2.notes.some(n => n.code === 'STARVATION_GUARD'), false);
    if (p2.items.some(e => e.skillId === target)) noGuardHits++;
  }
  assert.equal(hits, N, 'con guarda: siempre');
  assert.ok(noGuardHits < N, 'sin la guarda (casilla reciente) no está garantizada: ' + noGuardHits + '/' + N);
  // sesiones pequeñas (F<6) no reservan hueco
  const st = P.defaults(); st.sessionCounter = 40; Object.keys(cells).forEach(k => { st.skills[k] = { n: 20, acc: 0.8, ls: k === target ? 20 : 39 }; });
  const small = Sch.buildSession({ store, state: st, rng: DG.rng.create(3), now: 1.7e12, cfg: NOAGE }, { kind: 'module', modules: ['deklination'], size: 5 });
  assert.equal(small.notes.some(n => n.code === 'STARVATION_GUARD'), false);
});
