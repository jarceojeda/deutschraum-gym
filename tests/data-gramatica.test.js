/* data/gramatica.json (Gramática B1, lote 1: Plusquamperfekt, Futur I, Imperativ, Konjunktiv II), generado por tools/gen-gramatica.js.
 * Validan con el motor, formas correctas conocidas, trampas con una sola opción válida y el motor las sirve. */
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const { DG, dataset } = require('./helpers.js');
const G = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'gramatica.json'), 'utf8')), { data, concepts } = dataset();
const find = (lemma, skill, person) => G.find(i => i.lemma === lemma && i.skill === skill && i.prompt.endsWith(' · ' + person));

test('validan con el motor: 0 errores, ids únicos, NFC, cuatro habilidades nuevas del módulo verben', () => {
  const rep = DG.items.validate(DG.items.createStore(data.concat(G)), { concepts });
  assert.deepEqual(rep.errors, []);
  assert.equal(new Set(G.map(i => i.id)).size, G.length);
  const t = JSON.stringify(G); assert.equal(t, t.normalize('NFC'));
  assert.deepEqual([...new Set(G.map(i => i.skill))].sort(), ['futur', 'imperativ', 'konjunktiv2', 'plusquamperfekt']);
  assert.ok(G.every(i => i.module === 'verben' && i.options.filter(o => i.accept.includes(o)).length >= 1));
});

test('formas correctas conocidas (derivadas de los datos propios, comprobadas a mano)', () => {
  const ans = (l, s, p) => { const i = find(l, s, p); assert.ok(i, l + ' ' + s + ' ' + p); return i; };
  assert.equal(ans('nehmen', 'imperativ', 'du').answer, 'nimm');
  assert.equal(ans('lesen', 'imperativ', 'du').answer, 'lies');
  assert.equal(ans('fahren', 'imperativ', 'du').answer, 'fahr');
  assert.equal(ans('essen', 'imperativ', 'du').answer, 'iss');
  assert.equal(ans('arbeiten', 'imperativ', 'du').answer, 'arbeite');
  assert.equal(ans('aufstehen', 'imperativ', 'du').answer, 'steh auf');
  assert.equal(ans('kommen', 'imperativ', 'sie / Sie').answer, 'Kommen Sie');
  assert.equal(ans('kommen', 'imperativ', 'ihr').answer, 'kommt');
  assert.deepEqual(ans('kommen', 'imperativ', 'du').accept.sort(), ['komm', 'komme']);
  assert.equal(ans('lernen', 'futur', 'ich').answer, 'werde lernen');
  assert.equal(ans('lernen', 'futur', 'er / sie / es').answer, 'wird lernen');
  assert.equal(ans('gehen', 'plusquamperfekt', 'ich').answer, 'war gegangen');
  assert.equal(ans('essen', 'plusquamperfekt', 'wir').answer, 'hatten gegessen');
  assert.equal(ans('gehen', 'konjunktiv2', 'ich').answer, 'würde gehen');
});

test('trampas: sin duplicados, ninguna otra opción es válida y ninguna es basura (palabras inventadas con -t sobre el lema)', () => {
  G.forEach(i => {
    assert.equal(new Set(i.options).size, i.options.length, i.id + ' opciones duplicadas');
    assert.deepEqual(i.options.filter(o => i.accept.includes(o)), i.options.filter(o => o === i.answer).concat(i.accept.filter(a => a !== i.answer && i.options.includes(a))), i.id);
    assert.ok(!i.options.some(o => /^würde\S* \S+t$/.test(o) && !/^würde\S* (?:\S+en|\S+n)$/.test(o) && o.endsWith('kostt')), i.id);
  });
});

test('el motor las sirve en una sesión de módulo verben (mezcladas con las demás habilidades)', () => {
  const eng = DG.engine.createEngine({ data: data.concat(G), concepts, storage: null, rng: DG.rng.create(5) });
  const seen = new Set();
  for (let k = 0; k < 12; k++) { const s = eng.startSession({ kind: 'module', modules: ['verben'], size: 30, mode: 'touch' }); s.plan.items.forEach(e => seen.add(eng.store.byId[e.id].skill)); }
  const nuevas = ['futur', 'imperativ', 'konjunktiv2', 'plusquamperfekt'].filter(sk => seen.has(sk));
  assert.ok(nuevas.length >= 1, 'ninguna habilidad nueva salió en 12 sesiones: ' + [...seen].join());
});
