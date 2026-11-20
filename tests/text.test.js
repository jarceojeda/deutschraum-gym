const test = require('node:test'), assert = require('node:assert/strict');
const { DG } = require('./helpers.js'); const T = DG.text;

test('fold conserva ä/ö/ü/ß y no usa NFD', () => {
  assert.equal(T.fold('Straße'), 'straße');
  assert.equal(T.fold('ÜBER'), 'über');
  assert.equal(T.fold('ẞ'), 'ß');                 // ß mayúscula → ß
  assert.equal(T.fold('Käse Öl'), 'käse öl');
  assert.notEqual(T.fold('für'), T.fold('fur'));  // jamás se borra la diéresis
});
test('NFC: una ä descompuesta (a + U+0308) equivale a la precompuesta', () => {
  const nfd = 'fährt';
  assert.equal(T.fold(nfd), 'fährt');
  assert.equal(T.nfc(nfd), 'fährt');
});
test('translit: ae/oe/ue/ss ↔ ä/ö/ü/ß, pero fahrt ≠ fährt', () => {
  assert.equal(T.translit('fährt'), T.translit('faehrt'));
  assert.equal(T.translit('Fuß'), T.translit('Fuss'));
  assert.notEqual(T.translit('fährt'), T.translit('fahrt'));
});
test('dropUmlaut es un mapa explícito: no toca ß', () => {
  assert.equal(T.dropUmlaut('Fuß'), 'fuß');
  assert.equal(T.dropUmlaut('Häuser'), 'hauser');
});
test('espacios, comillas y signos tipográficos', () => {
  assert.equal(T.fold('  ich bin   da  '), 'ich bin da');
  assert.equal(T.fold('Ich hab’s'), "ich hab's");
  assert.equal(T.normSentence('Ich bleibe, weil ich krank bin.'), 'ich bleibe weil ich krank bin');
});
test('osa: transposición cuenta 1', () => {
  assert.equal(T.osa('gehen', 'gheen'), 1);
  assert.equal(T.osa('haus', 'häus'), 1);
  assert.equal(T.osa('', 'abc'), 3);
});
test('joinTiles pega los signos a la ficha anterior', () => {
  assert.equal(T.joinTiles(['Ich', 'bleibe', 'zu', 'Hause', ',', 'denn', 'ich', 'bin', 'krank', '.']), 'Ich bleibe zu Hause, denn ich bin krank.');
});
