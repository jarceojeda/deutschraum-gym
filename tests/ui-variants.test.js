/* Variantes por toque (ui/dgui-variants.js) sobre TODOS los ítems reales de verben/artikel/deklination:
 * cada variante debe poder resolverse (la respuesta correcta es alcanzable), sin distractores aceptados y en NFC. */
const test = require('node:test'), assert = require('node:assert/strict');
globalThis.DGUI = globalThis.DGUI || {};
const V = require('../ui/dgui-variants.js');
const { newEngine } = require('./helpers.js');
const DG = globalThis.DG;

const { eng } = newEngine({ seed: 5 });
const store = eng.store;
const MODS = new Set(['verben', 'artikel', 'deklination']);
const items = store.all.filter(i => MODS.has(i.module));
const rng = DG.rng.create(99), r = () => rng.next();

function canBuild(blocks, target, joiner) {
  const rec = (rem, used) => {
    if (rem === '') return true;
    return blocks.some(b => {
      if (used.has(b.id)) return false;
      if (joiner) { if (!(rem === b.t || rem.startsWith(b.t + joiner))) return false; return rec(rem === b.t ? '' : rem.slice(b.t.length + 1), new Set(used).add(b.id)); }
      return rem.startsWith(b.t) && rec(rem.slice(b.t.length), new Set(used).add(b.id));
    });
  };
  return rec(target, new Set());
}

test('pick(): cada ejercicio de los 3 módulos tiene una variante resoluble (≈5.400 ítems × 3 pasadas)', () => {
  const kinds = {};
  for (let pass = 0; pass < 3; pass++) for (const it of items) {
    const view = DG.items.view(it, 'touch', rng);
    const spec = V.pick(it, view, { store, rnd: r, mode: 'touch', last: pass ? { kind: 'choice' } : null });
    kinds[spec.kind] = (kinds[spec.kind] || 0) + 1;
    const acc = new Set(it.accept.concat(it.answer));
    if (spec.kind === 'choice') {
      assert.ok(spec.options.includes(it.answer), it.id + ': falta la correcta');
      assert.equal(new Set(spec.options).size, spec.options.length, it.id + ': opciones repetidas');
      assert.ok(spec.options.length >= 2 && spec.options.length <= (view.input === 'choice' ? 6 : 4), it.id + ' n=' + spec.options.length);
      if (view.input !== 'choice') spec.options.filter(o => o !== it.answer).forEach(o => assert.ok(!acc.has(o), it.id + ': distractor aceptado ' + o));   // las opciones del motor (aux_alt) las decide el motor
    } else if (spec.kind === 'blocks') {
      assert.ok(canBuild(spec.blocks, it.answer, spec.joiner), it.id + ': bloques no forman ' + it.answer);
      assert.ok(spec.blocks.length > spec.parts, it.id + ': sin distractores');
    } else if (spec.kind === 'match') {
      assert.equal(spec.rows.find(x => x.target).expected, it.answer, it.id);
      assert.ok(spec.rows.length >= 6);
      const need = spec.rows.map(x => x.expected).sort(), have = spec.bank.map(b => b.t).slice().sort();
      need.forEach(n => { const i = have.indexOf(n); assert.ok(i >= 0, it.id + ' falta ficha ' + n); have.splice(i, 1); });
    } else if (spec.kind === 'letters') {
      assert.ok(it.module === 'verben' || it.module === 'artikel' || it.module === 'deklination');
    }
    const texts = JSON.stringify(spec);
    assert.equal(texts, texts.normalize('NFC'), it.id + ': spec no NFC');
  }
  assert.ok(kinds.choice > 1000 && kinds.blocks > 300 && kinds.match > 100, JSON.stringify(kinds));
});

test('pick(): modo escribir → text; verbos usan las tres variantes; Partizip II y plural por opciones/bloques', () => {
  const v = items.find(i => i.module === 'verben' && i.skill === 'praesens' && i.person === 'du');
  assert.equal(V.pick(v, DG.items.view(v, 'write', rng), { store, rnd: r, mode: 'write' }).kind, 'text');
  const seen = new Set();
  for (let i = 0; i < 80; i++) seen.add(V.pick(v, DG.items.view(v, 'touch', rng), { store, rnd: r, mode: 'touch' }).kind);
  assert.deepEqual([...seen].sort(), ['blocks', 'choice', 'match']);
  const pii = items.find(i => i.skill === 'partizip-ii' && /^ge/.test(i.answer));
  const ks = new Set(); for (let i = 0; i < 60; i++) ks.add(V.pick(pii, DG.items.view(pii, 'touch', rng), { store, rnd: r, mode: 'touch' }).kind);
  assert.ok(ks.has('choice') && ks.has('blocks'), [...ks].join());
  const pl = items.find(i => i.skill === 'plural' && i.lemma);
  assert.equal(V.pick(pl, DG.items.view(pl, 'touch', rng), { store, rnd: r, mode: 'touch' }).kind, 'choice');
});

test('pick(): no repite la misma variante dos veces seguidas en verbos con las 3 disponibles', () => {
  const v = items.find(i => i.module === 'verben' && i.skill === 'praesens' && i.person === 'wir' && store.units[i.unit].length === 6);
  let last = null;
  for (let i = 0; i < 60; i++) { const s = V.pick(v, DG.items.view(v, 'touch', rng), { store, rnd: r, mode: 'touch', last }); assert.notEqual(s.kind, last && last.kind); last = s; }
});

test('match: el paradigma incluye Partizip II cuando existe su unidad y gradeMatch corrige fila a fila', () => {
  const v = items.find(i => i.module === 'verben' && i.skill === 'praesens' && i.person === 'du' && store.units[i.unit.replace('praesens', 'partizip-ii')]);
  const spec = V.pick(Object.assign({}, v), DG.items.view(v, 'touch', rng), { store, rnd: () => 0.999, mode: 'touch', last: { kind: 'choice' } });
  const m = spec.kind === 'match' ? spec : null;
  if (m) assert.ok(m.rows.some(x => x.key === 'pii'));
  const sp = { rows: [{ key: 'ich', label: 'ich', expected: 'a', target: false }, { key: 'du', label: 'du', expected: 'b', target: true }], targetKey: 'du' };
  const g = V.gradeMatch(sp, { ich: 'x', du: 'b' });
  assert.equal(g.response, 'b'); assert.deepEqual(g.rows.map(x => x.ok), [false, true]);
});

test('umlaut(): plural con diéresis plausible', () => {
  assert.equal(V.umlaut('Haus'), 'Häus'); assert.equal(V.umlaut('Mutter'), 'Mütter'); assert.equal(V.umlaut('Kind'), 'Kind');
  assert.equal(V.umlaut('Baum'), 'Bäum'); assert.equal(V.umlaut('Buch'), 'Büch');
});
