/* data/pronunciacion.json: reglas de sonido (wortschatz, A1–A2) de tools/gen-pronunciacion.js. */
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const { DG, dataset } = require('./helpers.js');
const V = require('../ui/dgui-voice.js');
const P = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'pronunciacion.json'), 'utf8')), W = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'wortschatz.json'), 'utf8')), { data, concepts } = dataset();

test('validan con el motor, NFC, ids únicos, ≥30 ítems, una sola opción válida de 4', () => {
  const rep = DG.items.validate(DG.items.createStore(data.concat(W, P)), { concepts }); assert.deepEqual(rep.errors, []);
  assert.equal(new Set(P.map(i => i.id)).size, P.length); assert.ok(P.length >= 30); const t = JSON.stringify(P); assert.equal(t, t.normalize('NFC'));
  P.forEach(i => { assert.equal(i.options.length, 4); assert.equal(new Set(i.options).size, 4); assert.deepEqual(i.options.filter(o => i.accept.includes(o)), [i.answer]); assert.ok(i.explanation.length > 10); assert.ok(i.prompt.length > 10 && i.prompt.endsWith('?'), i.id + ' sin enunciado'); });
});
test('la respuesta correcta no es sistemáticamente la más larga y no siempre está en la misma posición', () => {
  const largest = P.filter(i => i.answer.length >= Math.max.apply(null, i.options.map(o => o.length))).length; assert.ok(largest / P.length < 0.6, String(largest / P.length));
  assert.ok(new Set(P.map(i => i.options.indexOf(i.answer))).size >= 3);
});
test('voz: el 🔊 pronuncia la palabra alemana de ejemplo (lemma), nunca la explicación en español', () => {
  P.forEach(i => { assert.ok(i.lemma && /^[A-Za-zÄÖÜäöüß]+$/.test(i.lemma), i.id); assert.equal(V.spokenText(i), i.lemma); });
});
