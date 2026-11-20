/* data/trampas.json: «¿Cuál es correcta?» (satzbau, habilidad trampa), generado por tools/gen-trampas.js con frases propias. */
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const { DG, dataset } = require('./helpers.js');
const T = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'trampas.json'), 'utf8')), S = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'satzbau.json'), 'utf8')), { data, concepts } = dataset();

test('validan con el motor, NFC, ids únicos, ≥40 trampas y los tres niveles', () => {
  const rep = DG.items.validate(DG.items.createStore(data.concat(S, T)), { concepts }); assert.deepEqual(rep.errors, []);
  assert.equal(new Set(T.map(i => i.id)).size, T.length); const t = JSON.stringify(T); assert.equal(t, t.normalize('NFC'));
  assert.ok(T.length >= 40); assert.deepEqual([...new Set(T.map(i => i.level))].sort(), ['A1', 'A2', 'B1']);
});
test('cada trampa: 2–3 opciones sin duplicar, sólo una correcta, con explicación, y la correcta no siempre primera', () => {
  T.forEach(i => { assert.ok(i.options.length >= 2 && i.options.length <= 3, i.id); assert.equal(new Set(i.options).size, i.options.length); assert.deepEqual(i.options.filter(o => i.accept.includes(o)), [i.answer]); assert.ok(i.explanation.length > 15, i.id); });
  assert.ok(T.filter(i => i.options[0] === i.answer).length < T.length * 0.8);
});
test('la respuesta correcta no es la frase más larga de forma sistemática (sin pista por longitud)', () => {
  const l = T.filter(i => i.answer.length >= Math.max.apply(null, i.options.map(o => o.length))).length; assert.ok(l / T.length < 0.85, String(l / T.length));
});
