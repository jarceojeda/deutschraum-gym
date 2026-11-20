/* data/wortschatz-beyond.json: vocabulario B2/C1 de las clases («Más allá del B1», opcional). Sólo palabra + significado, sin ejemplos de clase. */
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const { DG, dataset } = require('./helpers.js');
const D = f => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', f), 'utf8')), B = D('wortschatz-beyond.json'), W = D('wortschatz.json'), { data, concepts } = dataset();
test('validan con el motor junto al Wortschatz normal, NFC, ids únicos, sin repetir palabras del A1–B1 y con una sola opción válida', () => {
  const rep = DG.items.validate(DG.items.createStore(data.concat(W, B)), { concepts }); assert.deepEqual(rep.errors, []);
  assert.equal(new Set(B.map(i => i.id)).size, B.length); const t = JSON.stringify(B); assert.equal(t, t.normalize('NFC'));
  const base = new Set(W.map(i => String(i.lemma).toLowerCase())); assert.equal(B.filter(i => base.has(String(i.lemma).toLowerCase())).length, 0);
  B.forEach(i => { if (i.options.length) assert.deepEqual(i.options.filter(o => i.accept.includes(o)), [i.answer], i.id); });
  assert.deepEqual([...new Set(B.map(i => i.skill))].sort(), ['de-es', 'es-de', 'produccion']);
});
