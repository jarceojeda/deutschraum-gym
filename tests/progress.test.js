const test = require('node:test'), assert = require('node:assert/strict');
const { DG, memStorage, manualClock, dataset } = require('./helpers.js');
const P = DG.progress, I = DG.items;

test('estado nuevo: versión actual, ajustes por defecto', () => {
  const p = P.create({ storage: memStorage(), clock: manualClock() }); p.load();
  assert.equal(p.state.version, P.VERSION); assert.equal(p.state.settings.levelCap, 'B1'); assert.equal(p.loadInfo.fresh, true);
});
test('guardar y recargar conserva todo', () => {
  const st = memStorage(), p = P.create({ storage: st, clock: manualClock() }); p.load();
  p.state.items.a = { a: 3, f: 1, ls: 2, lr: 0 }; p.state.errors.a = { s: 1, ls: 2, f: 1, ts: 5 }; assert.equal(p.save().ok, true);
  const q = P.create({ storage: st, clock: manualClock() }); q.load(); assert.deepEqual(q.state.items.a, p.state.items.a); assert.equal(q.loadInfo.fresh, false);
});
test('migración v0 (prototipo sin versión) → vigente', () => {
  const st = memStorage(); st.setItem('dg.progress', JSON.stringify({ seen: { x1: 4, x2: 1 }, wrong: ['x2'] }));
  const p = P.create({ storage: st, clock: manualClock() }); p.load();
  assert.equal(p.loadInfo.migratedFrom, 0); assert.equal(p.state.version, P.VERSION);
  assert.equal(p.state.items.x1.a, 4); assert.ok(p.state.errors.x2); assert.deepEqual(p.state.units, {}); assert.ok(p.state.ramp && p.state.skills);
});
test('migración v1 → v2 sin pisar datos', () => {
  const v1 = Object.assign(P.defaults(), { version: 1 }); delete v1.ramp; v1.skills = { 'verben:praesens': { n: 5, acc: 0.8 } }; v1.items = { a: { a: 1, f: 0, ls: 1, lr: 1 } };
  const m = P.migrate(v1); assert.equal(m.version, 2); assert.equal(m.skills['verben:praesens'].ls, 0); assert.equal(m.skills['verben:praesens'].n, 5); assert.deepEqual(m.ramp, {}); assert.equal(m.items.a.a, 1);
});
test('versión futura se rechaza sin tocar el almacenamiento; datos corruptos → copia .bak y arranque limpio', () => {
  const st = memStorage(); st.setItem('dg.progress', JSON.stringify({ version: 99, app: P.APP }));
  const p = P.create({ storage: st, clock: manualClock() }); p.load();
  assert.equal(p.loadInfo.recovered, true); assert.equal(p.loadInfo.code, 'FUTURE_VERSION'); assert.ok(st.getItem('dg.progress.bak'));
  const st2 = memStorage(); st2.setItem('dg.progress', '{no es json'); const q = P.create({ storage: st2, clock: manualClock() }); assert.doesNotThrow(() => q.load());
  assert.equal(q.loadInfo.recovered, true); assert.equal(st2.getItem('dg.progress.bak'), '{no es json'); assert.equal(q.state.version, P.VERSION);
});
test('exportar/importar: ida y vuelta idéntica', () => {
  const p = P.create({ storage: memStorage(), clock: manualClock() }); p.load(); p.state.items.k = { a: 2, f: 1, ls: 3, lr: 0 }; p.state.stats.answered = 7; p.save();
  const txt = p.exportJSON(); const q = P.create({ storage: memStorage(), clock: manualClock() }); q.load();
  const r = q.importJSON(txt); assert.equal(r.ok, true); assert.deepEqual(q.state.items, p.state.items); assert.equal(q.state.stats.answered, 7);
});
test('importar es atómico y detecta manipulación/archivo ajeno', () => {
  const p = P.create({ storage: memStorage(), clock: manualClock() }); p.load(); p.state.stats.answered = 5; p.save();
  const keep = JSON.stringify(p.state);
  const pkg = JSON.parse(p.exportJSON()); pkg.state.stats.answered = 9999;                // alterado
  assert.equal(p.importJSON(JSON.stringify(pkg)).code, 'CHECKSUM');
  assert.equal(p.importJSON('no json').code, 'NOT_JSON'); assert.equal(p.importJSON('{"a":1}').code, 'NOT_BACKUP');
  const fut = JSON.parse(p.exportJSON()); fut.state.version = 99; delete fut.checksum; assert.equal(p.importJSON(JSON.stringify(fut)).code, 'FUTURE_VERSION');
  assert.equal(JSON.stringify(p.state), keep, 'el estado no cambió tras importaciones fallidas');
});
test('save: error de cuota no lanza y se informa', () => {
  const bad = { getItem: () => null, setItem: () => { const e = new Error('full'); e.name = 'QuotaExceededError'; throw e; } };
  const p = P.create({ storage: bad, clock: manualClock() }); p.load(); const r = p.save();
  assert.equal(r.ok, false); assert.equal(r.error, 'QuotaExceededError');
});
test('reconcile: quita ítems/errores/unidades/historial que ya no existen en el contenido', () => {
  const store = I.createStore(dataset().data); const p = P.create({ storage: memStorage(), clock: manualClock() }); p.load();
  const real = store.all[0];
  p.state.items[real.id] = { a: 1, f: 0, ls: 1, lr: 1 }; p.state.items.fantasma = { a: 1, f: 0, ls: 1, lr: 1 };
  p.state.errors.fantasma = { s: 1, ls: 1, f: 1, ts: 1 }; p.state.units['u|fantasma'] = { n: 1 }; p.state.units[real.unit] = { n: 1 };
  p.state.history.push({ n: 1, ts: 1, kind: 'mix', modules: [], ids: [real.id, 'fantasma'] });
  const r = p.reconcile(store); assert.deepEqual(r, { items: 1, errors: 1, units: 1, history: 1 });
  assert.ok(p.state.items[real.id] && p.state.units[real.unit]);
});
