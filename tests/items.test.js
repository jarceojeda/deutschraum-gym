const test = require('node:test'), assert = require('node:assert/strict');
const { DG, dataset } = require('./helpers.js');
const I = DG.items;
const { data, concepts } = dataset();
const store = I.createStore(data);

test('DATASET real: 0 errores de esquema; sólo el aviso de conceptIds sin entrada', () => {
  const v = I.validate(store, { concepts });
  assert.deepEqual(v.errors, []);
  assert.deepEqual(v.warnings.map(w => w.code), ['concept-unresolved']);
  assert.equal(v.summary.items, 6007); assert.ok(v.summary.minPool >= 12);
});
test('tamaño mínimo se mide por POOL, no por skill (hay skills <12 con pool válido)', () => {
  const smallSkills = Object.keys(store.bySkillId).filter(k => store.bySkillId[k].length < 12);
  assert.ok(smallSkills.length >= 5, 'hay skills pequeñas en los datos reales: ' + smallSkills.length);
  assert.equal(I.validate(store).errors.filter(e => e.code === 'pool-too-small').length, 0);
  // sintético: un pool de 11 sí falla aunque otras skills sean grandes
  const raw = [];
  for (let i = 0; i < 11; i++) raw.push({ id: 'x' + i, module: 'artikel', level: 'A1', type: 'cloze', skill: 's' + i, pool: 'p', prompt: 'p', answer: 'a', accept: ['a'], options: ['a', 'b'] });
  const v = I.validate(I.createStore(raw)); assert.ok(v.errors.some(e => e.code === 'pool-too-small' && e.id === 'artikel:p'));
  raw.push({ id: 'x11', module: 'artikel', level: 'A1', type: 'cloze', skill: 'zz', pool: 'p', prompt: 'p', answer: 'a', accept: ['a'], options: ['a', 'b'] });
  assert.equal(I.validate(I.createStore(raw)).errors.filter(e => e.code === 'pool-too-small').length, 0);
});
test('unidades de repaso por habilidad: fahren·presente / Partizip / Präteritum son distintas', () => {
  const us = ['praesens', 'praeteritum', 'partizip-ii', 'hilfsverb'].map(s => 'verben|fahren|' + s);
  us.forEach(u => assert.ok(store.units[u], u));
  assert.equal(store.units['verben|fahren|praesens'].length, 6); assert.equal(store.units['verben|fahren|partizip-ii'].length, 1);
  assert.equal(new Set(us).size, 4);
});
test('verbos con dos sentidos (hängen) forman unidades separadas por sentido', () => {
  const u = Object.keys(store.units).filter(k => k.startsWith('verben|hängen'));
  assert.ok(u.some(k => k.includes('(estar colgado)')) && u.some(k => k.includes('(colgar algo)')));
  assert.equal(store.units['verben|hängen(estar colgado)|praesens'].length, 6);
});
test('ninguna unidad mezcla niveles; toda unidad tiene ≥1 ítem; familia de pares enlazada', () => {
  Object.values(store.unitInfo).forEach(u => { assert.ok(u.items.length >= 1); assert.equal(new Set(u.items.map(i => i.level)).size, 1, u.unit); });
  assert.equal(store.byId['gx-pair-001'].family, 'gx-pair-001'); assert.equal(store.byId['gx-pair-001-wo'].family, 'gx-pair-001');
});
test('impersonal: tarjetas de 2 personas (er/sie/es + sie/Sie) o 1 (regnen) NO se marcan incompletas', () => {
  assert.equal(store.units['verben|geschehen|praesens'].length, 2); assert.equal(store.units['verben|regnen|praesens'].length, 1);
  assert.equal(I.validate(store).errors.filter(e => e.code === 'verb-incomplete').length, 0);
});
test('el validador detecta defectos inyectados', () => {
  const clone = () => JSON.parse(JSON.stringify(data));
  const bad = clone();
  bad.push(Object.assign({}, bad[0]));                                                   // id duplicado
  const cz = bad.find(x => x.type === 'cloze' && x.options && x.options.length > 2 && x.module === 'deklination');
  cz.accept = cz.accept.concat(cz.options.find(o => !cz.accept.includes(o)));            // 2 válidas en options sin multi_ok
  const nt = bad.find(x => x.module === 'konnektoren' || x.module === 'artikel'); nt.needs_translation = true; nt.translation = '';
  const v = I.validate(I.createStore(bad)); const codes = new Set(v.errors.map(e => e.code));
  ['dup-id', 'options-multi-valid', 'needs-translation'].forEach(c => assert.ok(codes.has(c), c + ' ∉ ' + [...codes]));
  const v2 = I.validate(I.createStore(data.filter(x => !(x.module === 'verben' && x.lemma === 'fahren' && x.id.endsWith('praesens-wir')))));
  assert.ok(v2.errors.some(e => e.code === 'verb-incomplete'));
  const o = JSON.parse(JSON.stringify(data.find(x => x.type === 'order'))); o.tiles = o.tiles.slice(1);
  assert.ok(I.validate(I.createStore([o])).errors.some(e => e.code === 'order-tiles-mismatch'));
});

/* ===== 2b · punto 5: verbos con cambio de vocal / irregulares ===== */
test('P5 detección comparando la forma du/er con el infinitivo: fahren/sein/haben/können/einhalten = difíciles; arbeiten/lernen/aufstehen/heißen/sammeln = regulares', () => {
  const hard = id => { const u = store.unitInfo[id]; assert.ok(u, id); return u.hard; };
  ['verben|fahren|praesens', 'verben|fahren|praeteritum', 'verben|sein|praesens', 'verben|haben|praesens', 'verben|können|praesens', 'verben|essen|praesens', 'verben|einhalten|praesens', 'verben|geschehen|praesens', 'verben|wissen|praesens']
    .forEach(id => assert.equal(hard(id), true, id));
  ['verben|arbeiten|praesens', 'verben|arbeiten|praeteritum', 'verben|lernen|praesens', 'verben|lernen|praeteritum', 'verben|aufstehen|praesens', 'verben|heißen|praesens', 'verben|sammeln|praesens', 'verben|tanzen|praesens', 'verben|regnen|praesens']
    .forEach(id => assert.equal(hard(id), false, id));
  // otras habilidades (Partizip, auxiliar) y otros módulos nunca son «difíciles»
  assert.equal(store.unitInfo['verben|fahren|partizip-ii'].hard, false); assert.equal(store.unitInfo['verben|fahren|hilfsverb'].hard, false);
  assert.ok(Object.values(store.unitInfo).filter(u => u.module !== 'verben').every(u => !u.hard));
  // formas iguales al infinitivo: wir y sie/Sie del presente (también con prefijo separable)
  assert.deepEqual(store.unitInfo['verben|fahren|praesens'].items.filter(i => store.unitInfo['verben|fahren|praesens'].infIds[i.id]).map(i => i.person).sort(), ['sie_Sie', 'wir']);
  assert.deepEqual(store.unitInfo['verben|einhalten|praesens'].items.filter(i => store.unitInfo['verben|einhalten|praesens'].infIds[i.id]).map(i => i.person).sort(), ['sie_Sie', 'wir']);
  const n = Object.values(store.unitInfo).filter(u => u.hard).length; assert.ok(n > 150 && n < 260, 'unidades difíciles: ' + n);
});
