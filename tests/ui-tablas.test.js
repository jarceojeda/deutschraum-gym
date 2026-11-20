/* Tablas que se retiran (ui/dgui-tablas.js + ui/tablas.json) sobre los ítems reales de Deklination. */
const test = require('node:test'), assert = require('node:assert/strict');
globalThis.DGUI = globalThis.DGUI || {};
const T = require('../ui/dgui-tablas.js');
const TAB = require('../ui/tablas.json').tablas;
const { newEngine } = require('./helpers.js');
const { eng } = newEngine({ seed: 4 });
const dk = eng.store.all.filter(i => i.module === 'deklination');
const ROW = { nominative: 'Nom', accusative: 'Akk', dative: 'Dat', genitive: 'Gen' };

test('tablas.json: 5 tablas de la guía + la propia del relativo (s11-6) de 4 casos × 4 columnas, NFC, con los valores de la guía', () => {
  assert.deepEqual(Object.keys(TAB), ['s11-1', 's11-2', 's11-3', 's11-4', 's11-5', 's11-6']);
  Object.values(TAB).forEach(t => { assert.deepEqual(t.cols, ['M', 'F', 'N', 'PL']); assert.deepEqual(t.rows.map(r => r.caso), ['Nom', 'Akk', 'Dat', 'Gen']); t.rows.forEach(r => assert.equal(r.celdas.length, 4)); assert.equal(JSON.stringify(t), JSON.stringify(t).normalize('NFC')); });
  assert.equal(TAB['s11-1'].rows[2].celdas[0], 'dem'); assert.equal(TAB['s11-1'].rows[1].celdas[0], 'den'); assert.equal(TAB['s11-5'].rows[2].celdas[0], '-em');
});

test('cobertura: los 191 ítems de Deklination con tabla localizan su casilla, en la fila de su caso', () => {
  let n = 0;
  dk.forEach(i => {
    const id = T.tableId(i, TAB); if (!id) return; n++;
    const loc = T.locate(i, TAB[id], id); assert.ok(loc, i.id + ' sin casilla (' + i.answer + ')');
    const ck = T.caseKey(i); if (ck) assert.equal(TAB[id].rows[loc.r].caso, ROW[ck], i.id + ': caso ' + ck + ' ≠ fila ' + TAB[id].rows[loc.r].caso);
    const cell = TAB[id].rows[loc.r].celdas[loc.cols[0]]; assert.ok(cell === i.answer.toLowerCase() || cell === '-' + i.answer || /^ein/.test(cell), i.id);
  });
  assert.equal(n, 191, 'ítems de Deklination con tabla de ayuda');
});

test('nivel de ayuda: completa (<3 intentos) → media → ninguna (≥6 intentos y ≥85 %)', () => {
  assert.equal(T.level(undefined), 'completa'); assert.equal(T.level({ n: 2, f: 2 }), 'completa');
  assert.equal(T.level({ n: 3, f: 0 }), 'media'); assert.equal(T.level({ n: 5, f: 0 }), 'media'); assert.equal(T.level({ n: 10, f: 2 }), 'media');
  assert.equal(T.level({ n: 6, f: 0 }), 'ninguna'); assert.equal(T.level({ n: 20, f: 3 }), 'ninguna'); assert.equal(T.level({ n: 20, f: 4 }), 'media');
});

test('media tabla: oculta la mitad que contiene la respuesta (no la respuesta visible) y la cadena da caso → casilla → forma', () => {
  dk.filter(i => T.tableId(i, TAB)).forEach(i => {
    const t = TAB[T.tableId(i, TAB)], loc = T.locate(i, t), m = T.maskedRows(loc, t);
    assert.ok(m.includes(loc.r) && m.length === 2, i.id);
    t.rows.forEach((r, ri) => { if (!m.includes(ri)) assert.ok(!(ri === loc.r)); });
  });
  const i = dk.find(x => x.skill === 'kasus-article' && x.answer === 'dem'); const t = TAB[T.tableId(i, TAB)], loc = T.locate(i, t);
  const ch = T.chain(i, t, loc); assert.deepEqual(ch.map(s => s.k), ['Caso', 'Casilla', 'Forma']);
  assert.equal(ch[0].v, 'dativo'); assert.match(ch[1].v, /masculino/); assert.equal(ch[2].v, 'dem');
});
