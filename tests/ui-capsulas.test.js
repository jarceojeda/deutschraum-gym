/* Cobertura de cápsulas de regla por módulo (ui/reglas.json + pickCapsule) sobre los ítems reales. */
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
globalThis.DGUI = globalThis.DGUI || {}; globalThis.DGUI.util = globalThis.DGUI.util || {};
require('../ui/dgui-rules.js');
const R = globalThis.DGUI.rules, REGLAS = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'ui', 'reglas.json'), 'utf8')).reglas;
const D = m => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', m + '.json'), 'utf8'));
const cov = m => { const d = D(m); const n = d.filter(i => R.pickCapsule(Object.assign({ module: m }, i), REGLAS)).length; return { n, tot: d.length, f: n / d.length }; };

test('cobertura de cápsulas: Verben, Artikel y Satzbau 100 %; Präpositionen ≥95 %; Deklination ≥95 %; Konnektoren ≥80 %', () => {
  const minimos = { verben: 1, artikel: 1, satzbau: 1, praepositionen: 0.95, deklination: 0.95, konnektoren: 0.8 };
  Object.keys(minimos).forEach(m => { const c = cov(m); assert.ok(c.f >= minimos[m] - 1e-9, m + ' ' + c.n + '/' + c.tot); });
});

test('Präpositionen/Konnektoren: cada familia recibe la cápsula de SU tema (no la de otro)', () => {
  const by = (m, f) => D(m).find(f);
  const ck = i => R.pickCapsule(Object.assign({ module: i.module }, i), REGLAS);
  assert.ok(['cs:t23', 'a2:wechselpraepositionen'].includes(ck(by('praepositionen', i => i.skill === 'wechsel-pair')).id));
  const dativ = by('praepositionen', i => (i.conceptIds || []).includes('a2:praeposition-dat') && !(i.conceptIds || []).some(c => REGLAS[c] && !REGLAS[c].alias && c !== 'a2:praeposition-dat'));
  if (dativ) assert.equal(ck(dativ).id, 'a2:praeposition-dat');
  const nebens = by('konnektoren', i => (i.conceptIds || []).includes('a2:nebensaetze'));
  assert.ok(['a2:nebensaetze', 'a2:konnektoren', 'cs:t38', 'cs:t39', 'md:konnektoren-doppel'].includes(ck(nebens).id), ck(nebens).id);
  assert.ok(ck(nebens).errores.length >= 1);
});

test('Partículas modales: ninguna clase las trata → siguen sin cápsula (hueco declarado, nada inventado)', () => {
  const part = D('konnektoren').filter(i => ['partikel', 'adverb-gradpartikel'].includes(i.skill));
  assert.ok(part.length > 40);
  part.forEach(i => assert.equal(R.pickCapsule(Object.assign({ module: 'konnektoren' }, i), REGLAS), null, i.id));
});

test('alias: los a24:prep-* apuntan a la cápsula de su tipo (Wechsel, contracción, caso de la preposición)', () => {
  const al = Object.keys(REGLAS).filter(k => REGLAS[k].alias);
  assert.ok(al.length >= 25, 'alias: ' + al.length);
  al.forEach(k => assert.ok(/^a24:prep-/.test(k) && /^(a2:wechselpraepositionen|cs:t26|a2:praeposition-(dat|acc))$/.test(REGLAS[k].alias), k + ' → ' + REGLAS[k].alias));
});
