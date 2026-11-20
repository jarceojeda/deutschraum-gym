/* Pistas de sufijo (ui/dgui-sufijos.js + ui/sufijos.json) sobre los ítems reales de Artikel. */
const test = require('node:test'), assert = require('node:assert/strict');
globalThis.DGUI = globalThis.DGUI || {};
const S = require('../ui/dgui-sufijos.js'), TAB = require('../ui/sufijos.json').sufijos;
const { newEngine } = require('./helpers.js');
const art = newEngine({ seed: 2 }).eng.store.all.filter(i => i.module === 'artikel');

test('sufijos.json: 26 terminaciones (8 der, 12 die, 6 das) con ejemplos que cumplen su propio artículo y su terminación', () => {
  assert.equal(TAB.length, 26); assert.deepEqual(['der', 'die', 'das'].map(a => TAB.filter(s => s.art === a).length), [8, 12, 6]);
  TAB.forEach(s => { assert.match(s.fin, /^-[a-zäöüß]+$/); assert.ok(s.ejemplos && s.nota); assert.equal(JSON.stringify(s), JSON.stringify(s).normalize('NFC')); });
  TAB.filter(s => s.art === 'die').forEach(s => assert.ok(new RegExp('die [A-ZÄÖÜ][a-zäöüß]*' + s.fin.slice(1)).test(s.ejemplos), s.fin + ': ' + s.ejemplos));
});

test('hint(): casos reales — -ung → die (coincide), -er en das Zimmer → excepción, -chen → das, sin sufijo → null', () => {
  const by = l => art.find(i => i.lemma === l && S.articleOf(i));
  const z = by('Zeitung') && S.hint(by('Zeitung'), TAB); if (z) { assert.equal(z.fin, '-ung'); assert.equal(z.coincide, true); assert.equal(z.correct, 'die'); }
  const zi = S.hint(by('Zimmer'), TAB); assert.equal(zi.fin, '-er'); assert.equal(zi.art, 'der'); assert.equal(zi.correct, 'das'); assert.equal(zi.coincide, false);
  const dim = art.find(i => /(chen|lein)$/.test(i.lemma || '') && S.articleOf(i)); if (dim) { const d = S.hint(dim, TAB); assert.match(d.fin, /^-(chen|lein)$/); assert.equal(d.coincide, true); }
  const um = art.find(i => /um$/.test(i.lemma || '') && S.articleOf(i) === 'das'); if (um) assert.equal(S.hint(um, TAB).fin, '-um');
  assert.equal(S.hint(by('Tisch'), TAB), null);
  assert.equal(S.hint({ module: 'verben', lemma: 'gehen' }, TAB), null);
});

test('cobertura y coherencia sobre los ítems de Artikel: hay pista en cientos y casi todas coinciden con el artículo real', () => {
  let con = 0, coin = 0, exc = 0, noArt = 0;
  art.forEach(i => { const a = S.articleOf(i); if (!a) { noArt++; return; } const h = S.hint(i, TAB); if (h) { con++; h.coincide ? coin++ : exc++; assert.equal(h.correct, a); assert.ok(h.lemma.toLowerCase().endsWith(h.fin.slice(1))); } });
  assert.ok(con > 150, 'con pista: ' + con); assert.ok(coin / con > 0.8, 'coincidencia ' + (coin / con).toFixed(2)); assert.ok(exc > 0, 'hay excepciones reales (p. ej. -er)');
  assert.ok(noArt < art.length * 0.05, 'ítems sin artículo identificable: ' + noArt);
});
