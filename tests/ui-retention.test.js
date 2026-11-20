/* Racha con perdón y logros (ui/dgui-retention.js), sin DOM. */
const test = require('node:test'), assert = require('node:assert/strict');
globalThis.DGUI = globalThis.DGUI || {};
const R = require('../ui/dgui-retention.js');
const DAY = 864e5, T0 = Date.UTC(2026, 5, 10, 12);
function mk() { const mem = {}, prefs = { get: k => mem[k], set: (k, v) => { mem[k] = JSON.parse(JSON.stringify(v)); } }; let t = T0; const ret = R.create(prefs, () => t); return { ret, day: n => { t = T0 + n * DAY; }, prefs }; }

test('racha: suma un día por día practicado y no cuenta dos veces el mismo día', () => {
  const { ret, day } = mk();
  assert.equal(ret.touch().streak, 1); assert.equal(ret.touch().changed, false);
  day(1); assert.equal(ret.touch().streak, 2); day(2); assert.equal(ret.touch().streak, 3);
  assert.equal(ret.current().today, true); assert.equal(ret.state().best, 3);
});

test('perdón: falta UN día y la racha sigue (1 perdón por semana); la segunda falta cercana la rompe', () => {
  const { ret, day } = mk();
  ret.touch(); day(1); ret.touch();                              // racha 2
  day(3); const p = ret.touch();                                  // faltó el día 2 → perdón
  assert.deepEqual([p.streak, p.perdonado], [3, true]);
  day(5); const q = ret.touch();                                  // vuelve a faltar un día, perdón usado hace 2 días → se rompe
  assert.deepEqual([q.streak, q.perdonado], [1, false]);
  day(7); assert.equal(ret.touch().streak, 1, 'día 7: faltó el 6 y el perdón (día 3) tiene menos de 7 días');
  day(8); assert.equal(ret.touch().streak, 2);
  day(10); const r = ret.touch();                                 // faltó el 9; el perdón del día 3 ya tiene 7 días → vuelve a estar disponible
  assert.deepEqual([r.streak, r.perdonado], [3, true]);
});

test('racha: faltar 2 días o más la reinicia; current() lo anticipa sin escribir', () => {
  const { ret, day, prefs } = mk(); ret.touch(); day(1); ret.touch(); day(2); ret.touch();
  day(3); assert.deepEqual([ret.current().streak, ret.current().atRisk, ret.current().today], [3, true, false]);
  day(5); assert.equal(ret.current().streak, 0, 'ya no se puede perdonar: faltan 2 días');
  assert.equal(ret.state().streak, 3, 'current() no modifica el estado');
  assert.equal(ret.touch().streak, 1);
});

test('logros: se desbloquean una vez, con criterios sobrios y sin XP', () => {
  const { ret, day } = mk();
  const none = ret.unlock({ stats: { sessions: 0, rescued: 0, correct: 0 }, summary: { answered: 5, accuracy: 1 } }); assert.deepEqual(none.map(b => b.id), []);
  ret.touch();
  assert.deepEqual(ret.unlock({ stats: { sessions: 1, rescued: 0, correct: 8 }, summary: { answered: 10, accuracy: 1 } }).map(b => b.id).sort(), ['primera', 'sesion-limpia']);
  assert.deepEqual(ret.unlock({ stats: { sessions: 1, rescued: 0, correct: 8 }, summary: { answered: 10, accuracy: 1 } }), [], 'idempotente');
  day(1); ret.touch(); day(2); ret.touch();
  assert.deepEqual(ret.unlock({ stats: { sessions: 3, rescued: 1, correct: 120 } }).map(b => b.id).sort(), ['cien-aciertos', 'primer-rescate', 'tres-dias']);
  assert.ok(Object.keys(ret.earned()).length === 5);
  assert.ok(R.BADGES.every(b => b.title && b.detail) && !R.BADGES.some(b => /xp|nivel de usuario/i.test(b.title + b.detail)));
});

test('dateKey: fecha local estable', () => { assert.match(R.dateKey(T0), /^2026-06-1[01]$/); });
