/* data/relativ.json: Relativpronomen (deklination, B1) generado por tools/gen-relativ.js; tabla s11-6 y su localización por la UI. */
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const { DG, dataset } = require('./helpers.js');
const T = require('../ui/dgui-tablas.js'), TAB = require('../ui/tablas.json').tablas;
const R = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'relativ.json'), 'utf8')), { data, concepts } = dataset();
const FORM = { M: ['der', 'den', 'dem', 'dessen'], F: ['die', 'die', 'der', 'deren'], N: ['das', 'das', 'dem', 'dessen'], PL: ['die', 'die', 'denen', 'deren'] };

test('validan con el motor, NFC, ids únicos, ≥90 ítems, una sola opción válida', () => {
  const rep = DG.items.validate(DG.items.createStore(data.concat(R)), { concepts }); assert.deepEqual(rep.errors, []);
  assert.equal(new Set(R.map(i => i.id)).size, R.length); assert.ok(R.length >= 90);
  const t = JSON.stringify(R); assert.equal(t, t.normalize('NFC'));
  R.forEach(i => { assert.equal(i.options.length, 4); assert.equal(new Set(i.options).size, 4); assert.deepEqual(i.options.filter(o => i.accept.includes(o)), [i.answer]); assert.equal((i.prompt.match(/___/g) || []).length, 1); });
});
test('la respuesta sigue la tabla (género del antecedente × caso) y los cuatro casos y géneros aparecen', () => {
  const gen = { Der: 'M', Die: null, Das: 'N' }, cases = new Set(), gs = new Set();
  R.forEach(i => {
    const col = Object.keys(FORM).filter(g => FORM[g][['nominative', 'accusative', 'dative', 'genitive'].indexOf(i.case)] === i.answer);
    assert.ok(col.length >= 1, i.id); cases.add(i.case); col.forEach(c => gs.add(c));
    const art = i.prompt.split(' ')[0]; if (art === 'Der') assert.ok(col.includes('M'), i.id); if (art === 'Das') assert.ok(col.includes('N'), i.id);
  });
  assert.equal(cases.size, 4); assert.equal(gs.size, 4);
});
test('tabla s11-6: coincide con la tabla del pronombre relativo y la UI la elige y localiza la casilla', () => {
  const t = TAB['s11-6']; assert.deepEqual(t.rows.map(r => r.celdas), [0, 1, 2, 3].map(k => ['M', 'F', 'N', 'PL'].map(g => FORM[g][k])));
  R.forEach(i => { assert.equal(T.tableId(i, TAB), 's11-6'); const loc = T.locate(i, t, 's11-6'); assert.ok(loc, i.id); assert.equal(t.rows[loc.r].celdas[loc.cols[0]], i.answer); assert.equal(t.rows[loc.r].caso, { nominative: 'Nom', accusative: 'Akk', dative: 'Dat', genitive: 'Gen' }[i.case], i.id); });
});
