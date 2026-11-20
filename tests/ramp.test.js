const test = require('node:test'), assert = require('node:assert/strict');
const { DG, dataset } = require('./helpers.js');
const R = DG.ramp, I = DG.items, P = DG.progress;
const store = I.createStore(dataset().data);
const fresh = () => P.defaults();

test('filtro de nivel único: tope global y por módulo (gana el más estricto)', () => {
  const s = fresh().settings;
  assert.equal(R.capFor(s, 'verben'), 'B1');
  s.levelCap = 'A2'; assert.equal(R.capFor(s, 'verben'), 'A2');
  s.capByModule.verben = 'A1'; assert.equal(R.capFor(s, 'verben'), 'A1'); assert.equal(R.capFor(s, 'artikel'), 'A2');
  s.capByModule.artikel = 'B1'; assert.equal(R.capFor(s, 'artikel'), 'A2');   // el módulo no puede superar el global
  assert.equal(R.allowed(s, 'verben', 'A2'), false); assert.equal(R.allowed(s, 'verben', 'A1'), true);
  assert.deepEqual(R.levelsAllowed(s, 'deklination'), ['A1', 'A2']);
});
test('nivel inicial por dominio: konnektoren arranca en A2 (A1 sólo tiene 3 unidades); el resto en A1', () => {
  const st = fresh();
  assert.equal(R.currentLevel(st, store, 'konnektoren'), 'A2');
  ['verben', 'artikel', 'deklination', 'praepositionen'].forEach(m => assert.equal(R.currentLevel(st, store, m), 'A1', m));
});
test('con tope A1, un módulo sin nivel poblado cae al nivel fino (se avisará LEVEL_THIN)', () => {
  const st = fresh(); st.settings.levelCap = 'A1';
  assert.equal(R.currentLevel(st, store, 'konnektoren'), 'A1');
  const b = R.buckets(st, store, 'konnektoren'); assert.deepEqual(b.easier, []); assert.deepEqual(b.up, []);
});
test('cubos: easier = niveles poblados inferiores; up = siguiente poblado dentro del tope', () => {
  const st = fresh(); R.moduleRamp(st, 'verben').lv = 'A2';
  let b = R.buckets(st, store, 'verben'); assert.equal(b.current, 'A2'); assert.deepEqual(b.easier, ['A1']); assert.deepEqual(b.up, ['B1']);
  st.settings.levelCap = 'A2'; b = R.buckets(st, store, 'verben'); assert.deepEqual(b.up, []);            // tope: no hay reto arriba
  st.settings.levelCap = 'A1'; assert.equal(R.currentLevel(st, store, 'verben'), 'A1');                    // nivel guardado A2 queda recortado al tope
});
test('shares 70/20/10; sin cubo, su parte pasa al nivel actual', () => {
  assert.deepEqual(R.shares({ easier: ['A1'], up: ['B1'] }), { current: .7, easier: .2, up: .1 });
  const a = R.shares({ easier: [], up: ['A2'] }); assert.ok(Math.abs(a.current - .9) < 1e-9 && a.easier === 0 && a.up === .1);
  const b = R.shares({ easier: [], up: [] }); assert.ok(Math.abs(b.current - 1) < 1e-9);
});
// seen=true: intento sobre una unidad ya vista (cuenta para la rampa); seen=false: ítem nuevo (no cuenta)
function feed(st, m, level, n, p, rng, seen = true) { for (let i = 0; i < n; i++) R.record(st, m, level, rng.next() < p, seen); }
const master = (st, m, level) => store.unitsByModule[m].filter(u => u.level === level).forEach(u => { st.units[u.unit] = { s: 'r', r: 2, n: 3 }; });
test('promoción: exige evidencia (≥20 intentos sobre unidades vistas), precisión ≥85 %, dominio y permanencia mínima', () => {
  const st = fresh(), m = 'deklination', rng = DG.rng.create(1);
  st.sessionCounter = 10;
  feed(st, m, 'A1', 10, 1, rng);                                    // poca evidencia
  assert.equal(R.evaluate(st, store, m, 10).change, null);
  feed(st, m, 'A1', 30, 1, rng, false);                             // aciertos en ítems NUEVOS: no cuentan
  assert.equal(R.evaluate(st, store, m, 10).change, null);
  feed(st, m, 'A1', 20, 1, rng);                                    // evidencia y precisión, pero sin dominio
  assert.equal(R.evaluate(st, store, m, 10).change, null);
  master(st, m, 'A1');
  const r = R.evaluate(st, store, m, 10); assert.equal(r.change, 'promote'); assert.equal(r.to, 'A2'); assert.equal(st.ramp[m].lv, 'A2');
  // permanencia mínima: no vuelve a cambiar enseguida
  feed(st, m, 'A2', 30, 1, rng); master(st, m, 'A2'); assert.equal(R.evaluate(st, store, m, 11).change, null);
});
test('promoción respeta el tope: con cap A1 jamás sube', () => {
  const st = fresh(), m = 'deklination'; st.settings.levelCap = 'A1'; st.sessionCounter = 20;
  feed(st, m, 'A1', 30, 1, DG.rng.create(2)); master(st, m, 'A1');
  assert.equal(R.evaluate(st, store, m, 20).change, null); assert.equal(R.currentLevel(st, store, m), 'A1');
});
test('degradación: precisión < 55 % con evidencia baja un nivel; en el nivel inicial no baja', () => {
  const st = fresh(), m = 'verben', rng = DG.rng.create(3); R.moduleRamp(st, m).lv = 'A2'; st.sessionCounter = 30;
  feed(st, m, 'A2', 30, 0.3, rng);
  const r = R.evaluate(st, store, m, 30); assert.equal(r.change, 'demote'); assert.equal(st.ramp[m].lv, 'A1');
  feed(st, m, 'A1', 30, 0.2, rng); st.sessionCounter = 40; assert.equal(R.evaluate(st, store, m, 40).change, null);
});

test('P5 «dominada»: un verbo con cambio de vocal exige además ≥1 acierto en du o er_sie_es (hp); uno regular, no', () => {
  const st = fresh(), m = 'verben';
  const hardU = 'verben|fahren|praesens', regU = 'verben|arbeiten|praesens';
  assert.ok(store.unitInfo[hardU].hard && !store.unitInfo[regU].hard);
  st.units[hardU] = { s: 'r', r: 3, n: 4 }; st.units[regU] = { s: 'r', r: 3, n: 4 };
  const count = () => store.unitsByModule[m].filter(u => u.level === 'A1').filter(u => { const s = st.units[u.unit]; return s && s.s === 'r' && s.r >= 2 && (!u.hard || s.hp); }).length;
  assert.equal(R.masteredUnits(st, store, m, 'A1'), count());
  const a = R.masteredUnits(st, store, m, 'A1');
  st.units[hardU].hp = true; assert.equal(R.masteredUnits(st, store, m, 'A1'), a + 1, 'con hp cuenta');
  delete st.units[hardU].hp; assert.equal(R.masteredUnits(st, store, m, 'A1'), a);
  // la promoción también lo exige: todas las unidades «dominadas» salvo los difíciles sin hp → no promueve
  const st2 = fresh(); st2.sessionCounter = 50; R.moduleRamp(st2, m);
  for (let i = 0; i < 40; i++) R.record(st2, m, 'A1', true, true);
  store.unitsByModule[m].filter(u => u.level === 'A1' && u.hard).forEach(u => { st2.units[u.unit] = { s: 'r', r: 3, n: 4 }; });   // 38 difíciles ≥ 30 necesarias
  assert.equal(R.evaluate(st2, store, m, 50).change, null, 'sin hp en los verbos difíciles no se alcanza el dominio');
  store.unitsByModule[m].filter(u => u.level === 'A1' && u.hard).forEach(u => { st2.units[u.unit].hp = true; });
  assert.equal(R.evaluate(st2, store, m, 50).change, 'promote');
});
