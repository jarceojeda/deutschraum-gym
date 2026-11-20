/* Variantes por toque (ui/dgui-variants.js) sobre TODOS los ítems reales de verben/artikel/deklination:
 * cada variante debe poder resolverse (la respuesta correcta es alcanzable), sin distractores aceptados y en NFC. */
const test = require('node:test'), assert = require('node:assert/strict');
globalThis.DGUI = globalThis.DGUI || {};
const V = require('../ui/dgui-variants.js');
const { newEngine } = require('./helpers.js');
const DG = globalThis.DG;

const { eng } = newEngine({ seed: 5 });
const store = eng.store;
const MODS = new Set(['verben', 'artikel', 'deklination', 'praepositionen', 'konnektoren']);
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

test('pick(): cada ejercicio de los 5 módulos tiene una variante resoluble (≈6.000 ítems × 3 pasadas)', () => {
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
    } else if (spec.kind === 'pair') {
      assert.equal(spec.parts.length, 2); spec.parts.forEach(p => { assert.ok(p.choices.includes(it[p.key].answer), it.id + ' ' + p.key); assert.equal(p.choices.length, 2); });
    } else if (spec.kind === 'tiles') {
      assert.equal(spec.tiles.slice().sort().join('|'), it.tiles.slice().sort().join('|'), it.id); assert.ok(spec.tiles.length >= 3, it.id);
    } else if (spec.kind === 'letters') {
      assert.ok(it.type === 'cloze' && !it.options.length, it.id + ': letras sólo para cloze sin opciones');
    }
    const texts = JSON.stringify(spec);
    assert.equal(texts, texts.normalize('NFC'), it.id + ': spec no NFC');
  }
  assert.ok(kinds.choice > 1000 && kinds.blocks > 300 && kinds.match > 100 && kinds.pair > 50 && kinds.tiles > 250, JSON.stringify(kinds));
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

/* ---------- Escalera de ayuda que se retira y «completar solo la terminación» ---------- */
const LEVELS = ['ayuda', 'media', 'dominado'];
function solvable(spec, it, view) {
  const acc = new Set(it.accept.concat(it.answer));
  if (spec.kind === 'choice') assert.ok(spec.options.includes(it.answer), it.id);
  else if (spec.kind === 'blocks') assert.ok(canBuild(spec.blocks, it.answer, spec.joiner), it.id);
  else if (spec.kind === 'match') assert.equal(spec.rows.find(x => x.target).expected, it.answer);
  else if (spec.kind === 'ending') {
    assert.ok(spec.options.length >= 2 && spec.options.length <= 6, it.id + ' n=' + spec.options.length);
    assert.equal(spec.options.filter(o => spec.stem + o.v === it.answer).length, 1, it.id + ': exactamente una terminación correcta');
    assert.equal(new Set(spec.options.map(o => o.v)).size, spec.options.length, it.id + ' repetidas');
    spec.options.forEach(o => assert.equal(o.t, o.v === '' ? '—' : '-' + o.v));
    spec.options.filter(o => spec.stem + o.v !== it.answer).forEach(o => assert.ok(!acc.has(spec.stem + o.v), it.id + ': distractor aceptado ' + spec.stem + o.v));
  } else if (spec.kind === 'letters') assert.ok(it.type === 'cloze' && String(it.answer).length <= 24, it.id);
}

test('escalera: en los 3 niveles cada ejercicio de los 5 módulos sigue teniendo variante resoluble (incl. terminación y letras)', () => {
  const seen = { ayuda: {}, media: {}, dominado: {} };
  LEVELS.forEach(level => items.forEach(it => {
    const view = DG.items.view(it, 'touch', rng), spec = V.pick(it, view, { store, rnd: r, mode: 'touch', level });
    solvable(spec, it, view); seen[level][spec.kind] = (seen[level][spec.kind] || 0) + 1;
  }));
  assert.ok(seen.media.ending > 800, JSON.stringify(seen.media));   // 2.689 ítems con terminación × ≈35-40 % de peso en el nivel medio assert.ok(seen.dominado.letters > 1000, JSON.stringify(seen.dominado)); assert.equal(seen.ayuda.letters || 0, 0, 'con ayuda máxima no hay letras sueltas');
});

test('escalera: a medida que se domina, menos opciones y más letras (monotonía en verbos conjugados y plurales)', () => {
  const share = (filter, level, kind) => { const l = items.filter(filter); let n = 0; for (let k = 0; k < 4; k++) l.forEach(it => { if (V.pick(it, DG.items.view(it, 'touch', rng), { store, rnd: r, mode: 'touch', level }).kind === kind) n++; }); return n / (4 * l.length); };
  const fin = i => i.module === 'verben' && i.person && (i.skill === 'praesens' || i.skill === 'praeteritum'), plu = i => i.module === 'artikel' && i.skill === 'plural';
  [fin, plu].forEach(f => {
    const c = LEVELS.map(l => share(f, l, 'choice')), le = LEVELS.map(l => share(f, l, 'letters'));
    assert.ok(c[0] > c[1] && c[1] > c[2] - 1e-9, 'choice debe bajar: ' + c); assert.ok(le[0] === 0 && le[1] === 0 && le[2] > 0.3, 'letters sube al dominar: ' + le);
  });
  assert.ok(share(fin, 'media', 'ending') > 0.2 && share(fin, 'media', 'blocks') > 0.2, 'en el nivel medio dominan terminación y bloques');
});

test('terminación: plurales (322), Dativ plural y verbos conjugados (≥2.300) se resuelven eligiendo SOLO la terminación', () => {
  let pl = 0, dp = 0, vb = 0;
  items.forEach(it => { const sp = V.endingSpec(it, r); if (!sp) return; solvable(sp, it); if (it.skill === 'plural') pl++; else if (it.skill === 'dativ-plural') dp++; else vb++; });
  assert.equal(pl, 322); assert.ok(dp >= 30, 'dativ plural ' + dp); assert.ok(vb >= 2300, 'verbos ' + vb);
  const z = items.find(i => i.skill === 'plural' && i.answer === 'Zimmer'); const sp = V.endingSpec(z, () => 0.3);
  assert.equal(sp.stem, 'Zimmer'); assert.ok(sp.options.some(o => o.v === '' && o.t === '—'));
  assert.equal(V.endingSpec(items.find(i => i.skill === 'plural' && /^[A-Z][a-z]*[äöü]/.test(i.answer) && i.answer.indexOf(i.lemma) !== 0), r), null, 'plurales con diéresis: no es sólo terminación');
});

test('sin level (ayuda apagada) el reparto clásico no usa terminación ni letras en verbos', () => {
  const v = items.find(i => i.module === 'verben' && i.skill === 'praesens' && i.person === 'du' && store.units[i.unit].length === 6), ks = new Set();
  for (let i = 0; i < 100; i++) ks.add(V.pick(v, DG.items.view(v, 'touch', rng), { store, rnd: r, mode: 'touch' }).kind);
  assert.deepEqual([...ks].sort(), ['blocks', 'choice', 'match']);
});

test('ladderLevel: <5 intentos ayuda; ≥20 con ≥85 % dominado; el resto media (acumulado por errorTag)', () => {
  assert.equal(V.ladderLevel(undefined), 'ayuda'); assert.equal(V.ladderLevel({ n: 4, f: 0 }), 'ayuda'); assert.equal(V.ladderLevel({ n: 5, f: 5 }), 'media');
  assert.equal(V.ladderLevel({ n: 19, f: 0 }), 'media'); assert.equal(V.ladderLevel({ n: 20, f: 0 }), 'dominado'); assert.equal(V.ladderLevel({ n: 20, f: 3 }), 'dominado'); assert.equal(V.ladderLevel({ n: 20, f: 4 }), 'media');
});
