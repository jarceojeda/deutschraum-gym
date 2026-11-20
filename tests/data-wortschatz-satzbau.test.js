/* data/wortschatz.json y data/satzbau.json (primera versión, A1, generada por tools/gen-wortschatz-satzbau.js desde la referencia 2.4.4):
 * validan con el motor, no inventan contenido y el motor las sirve en sesiones de módulo y de Viaje combinado (7 módulos). */
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const { DG, dataset } = require('./helpers.js');
const D = f => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', f), 'utf8'));
const wz = D('wortschatz.json'), sb = D('satzbau.json'), { data, concepts } = dataset();

test('validan con el motor: 0 errores, 0 avisos, pools ≥12, ids únicos, NFC', () => {
  const rep = DG.items.validate(DG.items.createStore(wz.concat(sb)), { concepts });
  assert.deepEqual(rep.errors, []); assert.equal(rep.warnings.length, 0);
  assert.equal(new Set(wz.concat(sb).map(i => i.id)).size, wz.length + sb.length);
  const t = JSON.stringify(wz) + JSON.stringify(sb); assert.equal(t, t.normalize('NFC'));
  assert.ok(wz.length > 2000 && sb.length > 400, wz.length + ' / ' + sb.length);
});

test('wortschatz: niveles A1/A2/B1 (A2 y B1 salen de las clases), cuatro habilidades, una sola opción válida, distractores sin la misma respuesta y sustantivos con artículo', () => {
  const sk = {}; wz.forEach(i => { sk[i.skill] = (sk[i.skill] || 0) + 1; });
  assert.deepEqual(Object.keys(sk).sort(), ['contexto', 'de-es', 'es-de', 'produccion']);
  wz.forEach(i => {
    assert.equal(i.module, 'wortschatz'); assert.ok(['A1', 'A2', 'B1'].includes(i.level)); assert.ok(i.accept.includes(i.answer));
    if (i.options.length) { assert.equal(i.options.length, 4); assert.equal(new Set(i.options).size, 4, i.id); assert.deepEqual(i.options.filter(o => i.accept.includes(o)), [i.answer], i.id + ': una sola opción válida'); }
    if (i.skill === 'produccion') assert.equal(i.options.length, 0);
    if (i.skill === 'contexto') { assert.equal((i.prompt.match(/___/g) || []).length, 1, i.id); assert.ok(i.hint, i.id + ' sin pista (significado)'); }
  });
  const lv = {}; wz.forEach(i => { lv[i.level] = (lv[i.level] || 0) + 1; }); assert.ok(lv.A1 > 2000 && lv.A2 > 300 && lv.B1 > 800, JSON.stringify(lv));
  // de→es: si la respuesta lleva artículo en español, los distractores también (no se delata por la forma)
  wz.filter(i => i.skill === 'de-es').forEach(i => { const art = x => /^(el|la|los|las|un|una)\s/i.test(x); const a = art(i.answer); assert.ok(i.options.every(o => art(o) === a), i.id + ' ' + JSON.stringify(i.options)); });
  const nounsEsDe = wz.filter(i => i.skill === 'es-de' && /^(der|die|das) /.test(i.answer)); assert.ok(nounsEsDe.length > 200, 'sustantivos con artículo: ' + nounsEsDe.length);
  assert.ok(wz.filter(i => i.skill === 'produccion').every(i => i.answer.length <= 18));
  assert.ok(!wz.some(i => /\{\{/.test(JSON.stringify(i))), 'sin marcadores de plantilla');
});

test('satzbau: fichas que forman la frase, 4 habilidades, las preguntas acaban en «?» y no hay frases con marcadores', () => {
  const T = DG.text;
  sb.forEach(i => { assert.equal(i.type, 'order'); assert.equal(T.normSentence(T.joinTiles(i.tiles)), T.normSentence(i.answer), i.id); assert.ok(i.tiles.length >= 4 && i.tiles.length <= 14, i.id); assert.ok(!/\{\{/.test(i.answer)); });
  assert.deepEqual([...new Set(sb.map(i => i.skill))].sort(), ['aussagesatz', 'ja-nein-frage', 'umformen', 'w-frage']);
  sb.filter(i => /frage$/.test(i.skill)).forEach(i => assert.ok(/\?$/.test(i.answer), i.id));
  sb.filter(i => i.skill === 'w-frage').forEach(i => assert.match(i.answer, /^(Wie|Was|Wo|Woher|Wohin|Wer|Wen|Wem|Wann|Warum|Welche|Wieviel|Wessen|Womit|Wof)/i));
  sb.filter(i => i.skill === 'umformen').forEach(i => assert.ok(i.prompt.includes(' · ') && i.conceptIds.length));
});

test('el motor sirve Wortschatz y Satzbau (módulo y Viaje combinado de 7 módulos) sin avisos y con el filtro de nivel', () => {
  const eng = DG.engine.createEngine({ data: data.concat(wz, sb), concepts, storage: null, rng: DG.rng.create(9) });
  assert.equal(eng.validate().errors.length, 0);
  ['wortschatz', 'satzbau'].forEach(m => { const s = eng.startSession({ kind: 'module', modules: [m], size: 20, mode: 'touch' }); assert.equal(s.length(), 20); assert.deepEqual(s.warnings, []); assert.ok(s.plan.items.every(e => eng.store.byId[e.id].module === m)); });
  const mx = eng.startSession({ kind: 'mix', modules: eng.store.modules(), size: 30, mode: 'touch' }); assert.equal(mx.length(), 30);
  assert.ok(new Set(mx.plan.items.map(e => eng.store.byId[e.id].module)).size >= 5);
  assert.deepEqual(eng.store.levelsOf('wortschatz'), ['A1', 'A2', 'B1']); assert.deepEqual(eng.store.levelsOf('satzbau'), ['A1']);
  const s = eng.startSession({ kind: 'module', modules: ['satzbau'], size: 12, mode: 'touch' });
  while (!s.done()) { const v = s.view(); assert.equal(v.input, 'tiles'); const it = s.currentItem(); s.answer(it.tiles.slice(), { mode: 'touch' }); }
  assert.equal(s.summary().correct, 12);
});

test('auditoría: sin columnas intercambiadas ni marcas «sí/no» convertidas en traducción, y sin ejercicios idénticos (Wortschatz normal y «Más allá»)', () => {
  const B = D('wortschatz-beyond.json');
  [wz, B].forEach(list => {
    const es = list.filter(i => i.skill === 'es-de');
    assert.deepEqual(es.filter(i => /^(sí|no)(, posible|\s*\(.*\))?$/.test(i.prompt) && !/^(ja|nein|nicht|doch)$/.test(i.answer)).map(i => i.id), [], 'marcas sí/no como traducción');
    assert.deepEqual(es.filter(i => !/^(der|die|das) /.test(i.answer) && /(arse|erse|irse)$/.test(i.answer)).map(i => i.id), [], 'respuesta alemana que es un reflexivo español (columnas intercambiadas)');
    const seen = new Set(); list.forEach(i => { const k = i.skill + '|' + i.prompt + '|' + i.answer; assert.ok(!seen.has(k), 'duplicado ' + i.id); seen.add(k); });
  });
});
