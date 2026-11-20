/* engine.setLevel(nivel, módulo?) — «practicar desde este nivel» (el botón B1 de la UI).
 * Motivo: sólo con setLevelCap (tope) no hay forma de llegar al contenido B1 sin dominar antes A2 (la rampa sube por dominio). */
const test = require('node:test'), assert = require('node:assert/strict');
const { newEngine, memStorage, respond, DG, dataset, manualClock } = require('./helpers.js');

function fresh(seed, storage) { return newEngine({ seed: seed || 5, storage }); }
const levelShare = (s, lv) => { let n = 0, t = 0; while (!s.done()) { const it = s.currentItem(); t++; if (it.level === lv) n++; s.answer(respond(it, true), { mode: 'write' }); } return n / t; };

test('setLevel existe y cambia el nivel actual de un módulo sin tocar los demás', () => {
  const { eng } = fresh();
  assert.equal(typeof eng.setLevel, 'function', 'falta engine.setLevel');
  assert.equal(eng.levelOf('verben'), 'A1');
  const r = eng.setLevel('B1', 'verben');
  assert.equal(r.ok !== false, true); assert.equal(r.levels.verben, 'B1');
  assert.equal(eng.levelOf('verben'), 'B1'); assert.equal(eng.levelOf('artikel'), 'A1');
});

test('tras setLevel(B1) la sesión es sobre todo B1 (nivel actual) con repaso de niveles anteriores', () => {
  [3, 4, 5].forEach(seed => {
    const { eng } = fresh(seed); eng.setLevel('B1', 'verben');
    const share = levelShare(eng.startSession({ kind: 'module', modules: ['verben'], size: 20, mode: 'write' }), 'B1');
    assert.ok(share >= 0.6 && share <= 0.95, 'semilla ' + seed + ': ' + share);
  });
});

test('respeta el tope: con tope A2, setLevel(B1) queda en A2 y no sale ningún B1', () => {
  const { eng } = fresh(); eng.setLevelCap('A2'); const r = eng.setLevel('B1', 'verben');
  assert.equal(r.levels.verben, 'A2'); assert.equal(eng.levelOf('verben'), 'A2');
  const s = eng.startSession({ kind: 'module', modules: ['verben'], size: 20, mode: 'write' });
  while (!s.done()) { assert.notEqual(s.currentItem().level, 'B1'); s.answer(respond(s.currentItem(), true), { mode: 'write' }); }
});

test('sin módulo se aplica a todos; un nivel poco poblado cae al más cercano permitido', () => {
  const { eng } = fresh(); const r = eng.setLevel('A2');
  eng.store.modules().forEach(m => { assert.ok(['A1', 'A2', 'B1'].includes(r.levels[m]), m); assert.equal(eng.levelOf(m), r.levels[m]); });
  assert.equal(eng.levelOf('verben'), 'A2'); assert.equal(eng.levelOf('deklination'), 'A2');
});

test('persiste al recargar y no se baja enseguida (se protege con la permanencia mínima)', () => {
  const storage = memStorage(), { eng } = fresh(7, storage); eng.setLevel('B1', 'verben');
  const st = JSON.parse(storage.getItem('dg.progress')); assert.equal(st.ramp.verben.lv, 'B1'); assert.equal(st.ramp.verben.since, st.sessionCounter);
  const { eng: eng2 } = newEngine({ seed: 8, storage }); assert.equal(eng2.levelOf('verben'), 'B1');
});

test('nivel inválido lanza error y no cambia nada', () => {
  const { eng } = fresh(); assert.throws(() => eng.setLevel('C2', 'verben'), /nivel inválido/); assert.equal(eng.levelOf('verben'), 'A1');
});
