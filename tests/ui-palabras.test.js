/* «Mis palabras» (ui/dgui-palabras.js): validación, ítems generados (una sola opción válida, artículo coherente) y persistencia. */
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const { DG, dataset, memStorage } = require('./helpers.js');
const P = require('../ui/dgui-palabras.js');
const W = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'wortschatz.json'), 'utf8')), { data, concepts } = dataset();

test('parse: exige las dos partes, recorta, pone el artículo en minúscula y rechaza duplicados, HTML y listas llenas', () => {
  assert.equal(P.parse('', 'perro', []).ok, false); assert.equal(P.parse('Hund', '', []).ok, false);
  const ok = P.parse('  Der   Hund ', ' el  perro ', []); assert.deepEqual(ok, { ok: true, word: { de: 'der Hund', es: 'el perro' } });
  assert.equal(P.parse('der Hund', 'perro', [{ id: 'a', de: 'der hund', es: 'x' }]).ok, false, 'duplicado sin distinguir mayúsculas');
  assert.equal(P.parse('der', 'x', []).ok, false); assert.equal(P.parse('<b>x</b>', 'y', []).ok, false); assert.equal(P.parse('x'.repeat(41), 'y', []).ok, false);
  assert.equal(P.parse('Haus', 'casa', new Array(300).fill(0).map((_, i) => ({ id: 'i' + i, de: 'w' + i, es: 'x' }))).ok, false);
  assert.equal(P.parse('Dorf', 'pueblo', []).word.de, 'Dorf'); assert.equal(P.parse('Ärger', 'enojo', []).word.de, 'Ärger', 'conserva la diéresis (NFC)');
});
test('make: sustantivo con artículo → 3 ítems válidos, una sola opción correcta, distractores del mismo tipo; palabra suelta → distractores sin artículo', () => {
  const w = { id: 'abc', de: 'das Eichhörnchen', es: 'la ardilla' }, items = P.make(w, W, []);
  assert.deepEqual(items.map(i => i.skill), ['es-de', 'de-es', 'produccion']);
  const rep = DG.items.validate(DG.items.createStore(data.concat(W, items)), { concepts }); assert.deepEqual(rep.errors.filter(e => e.code !== 'pool-too-small'), []);
  items.slice(0, 2).forEach(i => { assert.equal(i.options.length, 4); assert.equal(new Set(i.options).size, 4); assert.deepEqual(i.options.filter(o => i.accept.includes(o)), [i.answer]); });
  assert.ok(items[0].options.every(o => /^(der|die|das) /.test(o)), 'en alemán, todas con artículo'); assert.ok(items[1].options.every(o => /^(el|la|los|las|un|una) /i.test(o)));
  const v = P.make({ id: 'z', de: 'schnell', es: 'rápido' }, W, []); assert.ok(v[0].options.every(o => !/^(der|die|das) /.test(o)), 'sin artículo para no delatar la respuesta');
  assert.deepEqual(P.itemIds(w), ['mw-abc-es-de', 'mw-abc-de-es', 'mw-abc-produccion']);
  items.forEach(i => { const t = JSON.stringify(i); assert.equal(t, t.normalize('NFC')); assert.equal(i.module, 'wortschatz'); assert.equal(i.source, 'mis-palabras'); });
});
test('load/save: ida y vuelta, ignora basura y no falla sin almacenamiento', () => {
  const st = memStorage(); assert.deepEqual(P.load(st), []); assert.equal(P.save(st, [{ id: 'a', de: 'der Hund', es: 'el perro' }]), true);
  assert.deepEqual(P.load(st), [{ id: 'a', de: 'der Hund', es: 'el perro' }]);
  st.setItem(P.KEY, '{rota'); assert.deepEqual(P.load(st), []); st.setItem(P.KEY, JSON.stringify({ words: [1, { id: 'x' }, { id: 'b', de: 'x', es: 'y' }] })); assert.deepEqual(P.load(st), [{ id: 'b', de: 'x', es: 'y' }]);
  assert.deepEqual(P.load(null), []); assert.equal(P.save(null, []), false);
});

test('Mis frases: parseFrase normaliza (mayúscula inicial, punto final), limita 3–12 palabras y rechaza duplicados; las fichas reconstruyen la frase y el motor la valida', () => {
  const ok = P.parseFrase('  ich lerne jeden tag deutsch ', 'Aprendo alemán cada día', []); assert.equal(ok.ok, true); assert.equal(ok.frase.de, 'Ich lerne jeden tag deutsch.');
  assert.equal(P.parseFrase('Hallo Welt', 'x', []).ok, false, '2 palabras'); assert.equal(P.parseFrase('a b c d e f g h i j k l m.', 'x', []).ok, false, '13 palabras');
  assert.equal(P.parseFrase('Ich lerne Deutsch.', '', []).ok, false); assert.equal(P.parseFrase('Ich <b>lerne</b> Deutsch', 'x', []).ok, false);
  assert.equal(P.parseFrase('ich lerne deutsch', 'x', [{ id: 'a', de: 'Ich lerne deutsch.', es: 'y' }]).ok, false, 'duplicado');
  assert.deepEqual(P.tiles('Wo wohnst du, Anna?'), ['Wo', 'wohnst', 'du', ',', 'Anna', '?']);
  const f = { id: 'f1', de: 'Ich möchte einen Kaffee, bitte.', es: 'Quiero un café, por favor.' }, items = P.makeFrase(f);
  const rep = DG.items.validate(DG.items.createStore(data.concat(items)), { concepts }); assert.deepEqual(rep.errors.filter(e => e.code !== 'pool-too-small'), []);
  assert.equal(items[0].module, 'satzbau'); assert.equal(items[0].translation, f.es); assert.deepEqual(P.fraseIds(f), ['mf-f1-order']);
  const st = memStorage(); assert.deepEqual(P.loadFrases(st), []); P.saveFrases(st, [f]); assert.deepEqual(P.loadFrases(st), [f]); st.setItem(P.KEYF, '{rota'); assert.deepEqual(P.loadFrases(st), []);
});
