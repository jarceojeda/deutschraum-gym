/* data/satzbau-b1.json: Satzbau A2/B1 (ordenar) generado por tools/gen-satzbau-b1.js con oraciones propias. */
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const { DG, dataset } = require('./helpers.js');
const S = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'satzbau.json'), 'utf8')), T = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'satzbau-b1.json'), 'utf8')), { data, concepts } = dataset();
const PRON = /^(ich|du|er|sie|wir|ihr)$/i;

test('validan con el motor (0 errores, pools ≥12), NFC, ids únicos, ≥150 frases A2/B1 con pista de estructura y traducción', () => {
  const rep = DG.items.validate(DG.items.createStore(data.concat(S, T)), { concepts }); assert.deepEqual(rep.errors, []);
  assert.equal(new Set(T.map(i => i.id)).size, T.length); assert.ok(T.length >= 150); const t = JSON.stringify(T); assert.equal(t, t.normalize('NFC'));
  assert.deepEqual([...new Set(T.map(i => i.level))].sort(), ['A2', 'B1']);
  T.forEach(i => { assert.ok(i.hint.length > 10 && i.translation.length > 8, i.id); assert.ok(/[.?]$/.test(i.answer) && i.tiles.length >= 4 && i.tiles.length <= 16, i.id); assert.equal(i.tiles.join(' ').replace(/ ([.,?])/g, '$1'), i.answer, i.id); });
});
test('subordinadas con conjunción: se ofrecen en las dos órdenes y, si empiezan por la subordinada, el verbo conjugado va justo tras la coma (inversión)', () => {
  const sub = T.filter(i => /^nebensatz-/.test(i.skill)); assert.ok(sub.length >= 70);
  const first = sub.filter(i => /^(Weil|Wenn|Obwohl|Damit|Nachdem) /.test(i.answer)), last = sub.filter(i => !/^(Weil|Wenn|Obwohl|Damit|Nachdem) /.test(i.answer));
  assert.equal(first.length, last.length);
  first.forEach(i => { const w = i.answer.split(', ')[1].split(' '); assert.ok(!PRON.test(w[0]), i.id + ' tras la coma debe ir el verbo: ' + i.answer); });
  last.forEach(i => assert.ok(new RegExp(', (weil|wenn|obwohl|damit|nachdem) ').test(i.answer), i.id));
  assert.equal(new Set(sub.map(i => i.answer)).size, sub.length, 'sin frases repetidas');
});
