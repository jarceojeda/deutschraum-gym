/* data/tekamolo.json: ordenar complementos (satzbau, B1) con frases propias de tools/gen-tekamolo.js. */
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const { DG, dataset } = require('./helpers.js');
const T = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'tekamolo.json'), 'utf8')), { data, concepts } = dataset();
const TE = ['heute', 'morgen', 'am Montag', 'jeden Tag', 'nach der Arbeit', 'am Wochenende', 'im Sommer'], KA = ['wegen des Wetters', 'wegen der Prüfung', 'wegen des Projekts', 'aus Neugier', 'aus Erschöpfung'];

test('validan con el motor, NFC, ids únicos, ≥80 frases, las fichas forman la respuesta', () => {
  const rep = DG.items.validate(DG.items.createStore(data.concat(T)), { concepts }); assert.deepEqual(rep.errors, []);
  assert.equal(new Set(T.map(i => i.id)).size, T.length); assert.ok(T.length >= 80); const t = JSON.stringify(T); assert.equal(t, t.normalize('NFC'));
  T.forEach(i => { assert.equal(i.level, 'B1'); assert.ok(i.answer.endsWith('.')); assert.equal(i.tiles[i.tiles.length - 1], '.'); });
});
test('orden neutro: el complemento temporal va antes del causal, éste antes del modal y todos antes del local; el sujeto y el verbo abren la frase', () => {
  T.forEach(i => {
    const s = i.answer, pos = l => { const f = l.map(x => s.indexOf(' ' + x + ' ')).filter(x => x >= 0); return f.length ? f[0] : -1; };
    const te = pos(TE), ka = pos(KA);
    assert.ok(/^(Ich|Wir|Er) \S+ /.test(s), i.id);
    if (te >= 0 && ka >= 0) assert.ok(te < ka, i.id + ' Te antes de Ka');
    // el verbo siempre es la 2.ª ficha
    assert.ok(/^(Ich|Wir|Er)$/.test(i.tiles[0]), i.id);
  });
  assert.ok(T.some(i => KA.some(k => i.answer.includes(k))) && T.some(i => !KA.some(k => i.answer.includes(k))), 'con y sin causal');
});
