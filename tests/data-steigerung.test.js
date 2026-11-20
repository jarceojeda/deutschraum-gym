/* data/steigerung.json: Komparativ/Superlativ (deklination, A2) generado por tools/gen-steigerung.js con formas comprobadas a mano. */
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const { DG, dataset } = require('./helpers.js');
const S = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'steigerung.json'), 'utf8')), { data, concepts } = dataset();
const get = (adj, sk) => S.find(i => i.hint === adj && i.skill === sk);

test('validan con el motor, NFC, ids únicos, pools ≥12, una sola opción válida de 4 sin duplicados', () => {
  const rep = DG.items.validate(DG.items.createStore(data.concat(S)), { concepts }); assert.deepEqual(rep.errors, []);
  assert.equal(new Set(S.map(i => i.id)).size, S.length); const t = JSON.stringify(S); assert.equal(t, t.normalize('NFC'));
  assert.deepEqual([...new Set(S.map(i => i.skill))].sort(), ['komparativ', 'superlativ']);
  S.forEach(i => { assert.equal(i.options.length, 4); assert.equal(new Set(i.options).size, 4); assert.deepEqual(i.options.filter(o => i.accept.includes(o)), [i.answer], i.id); assert.equal((i.prompt.match(/___/g) || []).length, 1); });
});
test('formas correctas conocidas: umlaut, -e- ante -t/-d/-s/-ß, teurer y los irregulares', () => {
  const k = { alt: 'älter', jung: 'jünger', groß: 'größer', teuer: 'teurer', dunkel: 'dunkler', gut: 'besser', viel: 'mehr', gern: 'lieber', hoch: 'höher', nah: 'näher', schnell: 'schneller' };
  const sup = { alt: 'ältesten', heiß: 'heißesten', gut: 'besten', viel: 'meisten', gern: 'liebsten', hoch: 'höchsten', nah: 'nächsten', groß: 'größten', schnell: 'schnellsten', teuer: 'teuersten', interessant: 'interessantesten' };
  Object.entries(k).forEach(([a, f]) => assert.equal(get(a, 'komparativ').answer, f, a));
  Object.entries(sup).forEach(([a, f]) => assert.equal(get(a, 'superlativ').answer, f, a));
});
test('ninguna trampa es una palabra inventada evidente (sin dobles consonantes artificiales)', () => {
  S.forEach(i => i.options.forEach(o => assert.ok(!/(.)\1\1/.test(o) && !/ttt|terr/.test(o), i.id + ' ' + o)));
});
