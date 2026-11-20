/* E2E en jsdom: el BUNDLE de dist/ (lo que irá incrustado en el HTML de la etapa 3) corriendo en una ventana
 * con localStorage real. Se comprueba el JSON que queda guardado, la recarga, el rescate de errores,
 * exportar/importar, almacenamiento corrupto y las cadenas con ä/ö/ü/ß (NFC y NFD). */
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const { JSDOM } = require('jsdom');
const { dataset } = require('./helpers.js');

const BUNDLE = fs.readFileSync(path.join(__dirname, '..', 'dist', 'dg-engine.bundle.js'), 'utf8');
const { data, concepts } = dataset();
const DATA_JSON = JSON.stringify(data), CONCEPTS_JSON = JSON.stringify(concepts);
const DAY = 864e5;

// Ventana nueva con el bundle cargado. Los datos se re-parsean DENTRO de la ventana (objetos de su propio realm).
function boot(dom) {
  dom = dom || new JSDOM('<!doctype html><html><body></body></html>', { runScripts: 'outside-only', url: 'http://localhost/' });
  const w = dom.window;
  if (!w.DG) w.eval(BUNDLE);
  w.__data = w.JSON.parse(DATA_JSON); w.__concepts = w.JSON.parse(CONCEPTS_JSON);
  return { dom, w };
}
function engineIn(w, t0, seed) {
  w.__t = t0 == null ? 1.7e12 : t0;
  w.eval('window.__clock = { now: function () { return window.__t; } };');
  return w.eval('DG.engine.createEngine({ data: window.__data, concepts: window.__concepts, storage: window.localStorage, clock: window.__clock, rng: DG.rng.create(' + (seed || 7) + ') })');
}
const stored = w => JSON.parse(w.localStorage.getItem('dg.progress'));
function respond(it, ok) {
  if (it.type === 'minimal-pair') return ok ? { wo: it.wo.answer, wohin: it.wohin.answer } : { wo: 'zzz', wohin: 'zzz' };
  return ok ? it.answer : '¿¿??';
}

test('el bundle carga en jsdom y expone el motor completo', () => {
  const { w } = boot();
  for (const k of ['rng', 'text', 'sampler', 'items', 'evaluator', 'srs', 'ramp', 'progress', 'scheduler', 'engine']) assert.ok(w.DG[k], 'falta DG.' + k);
  const eng = engineIn(w);
  assert.equal(eng.validate().errors.length, 0);
  assert.ok(Object.keys(eng.store.units).length > 3000, 'unidades indexadas');
});

test('respuestas malas deliberadas dejan errores, etiquetas, ítems y unidades en localStorage', () => {
  const { w } = boot(); const eng = engineIn(w, 1.7e12, 3);
  const s = eng.startSession({ kind: 'mix', size: 12 });
  let k = 0;
  while (!s.done()) { const it = s.currentItem(); s.answer(respond(it, k++ % 3 !== 0), { mode: 'write' }); }
  s.finish();
  const j = stored(w);
  assert.equal(j.version, 2);
  assert.ok(Object.keys(j.errors).length > 0, 'errors vacío');
  assert.ok(Object.keys(j.items).length >= 8 && Object.keys(j.units).length >= 8);
  assert.ok(Object.keys(j.skills).length > 0 && j.history.length === 1 && j.history[0].ids.length >= 10);
  assert.ok(Object.keys(j.tags).length > 0, 'etiquetas de error (errorTag) sin registrar');
  assert.ok(j.sessionCounter === 1);
  // guardado en cada respuesta (no sólo al terminar): matar la pestaña a mitad de sesión no pierde lo hecho
  const e2 = engineIn(boot().w, 1.7e12, 3); assert.ok(e2.state());
});

test('persistencia a mitad de sesión: lo respondido ya está guardado antes de finish()', () => {
  const { w } = boot(); const eng = engineIn(w, 1.7e12, 4);
  const s = eng.startSession({ kind: 'module', modules: ['artikel'], size: 8 });
  const it = s.currentItem(); s.answer('¿¿??', { mode: 'write' });
  const j = stored(w);
  assert.ok(j.errors[it.id], 'el fallo debe estar guardado ya');
  assert.equal(j.items[it.id].a, 1);
});

test('recarga: un motor nuevo sobre el mismo localStorage recupera el estado y el rescate funciona', () => {
  const { dom, w } = boot(); const t0 = 1.7e12;
  let eng = engineIn(w, t0, 5);
  const s = eng.startSession({ kind: 'module', modules: ['verben'], size: 10 });
  const failed = []; while (!s.done()) { const it = s.currentItem(); const r = s.answer(respond(it, false), { mode: 'write' }); if (r.advance) failed.push(it.id); if (failed.length > 40) break; }
  s.finish();
  const before = stored(w); const errs = Object.keys(before.errors);
  assert.ok(errs.length >= 5);
  // «recargar la página»: misma ventana/localStorage, motor nuevo, un día después
  eng = engineIn(w, t0 + DAY, 6);
  assert.deepEqual(Object.keys(eng.state().errors).sort(), errs.sort());
  assert.equal(eng.state().sessionCounter, 1);
  // sesión de errores: responder bien en la primera → se rescatan y salen de la cola
  const s2 = eng.startSession({ kind: 'errors', size: 12 });
  const ids = s2.plan.items.map(e => e.id); assert.ok(ids.length > 0 && ids.every(id => errs.includes(id)));
  while (!s2.done()) { const it = s2.currentItem(); s2.answer(respond(it, true), { mode: 'write' }); }
  const sum = s2.finish();
  const after = stored(w);
  ids.forEach(id => assert.ok(!(id in after.errors), id + ' debió salir de la cola'));
  assert.ok(after.stats.rescued >= ids.length);
  assert.ok(sum && typeof sum === 'object');
});

test('exportar → importar en otra ventana reproduce el estado; checksum alterado se rechaza sin tocar nada', () => {
  const A = boot(), eng = engineIn(A.w, 1.7e12, 8);
  const s = eng.startSession({ kind: 'mix', size: 12 });
  while (!s.done()) { const it = s.currentItem(); s.answer(respond(it, Math.random() > 2), { mode: 'write' }); }
  s.finish();
  const dump = eng.exportJSON();
  const B = boot(), engB = engineIn(B.w, 1.7e12, 9);
  const before = B.w.localStorage.getItem('dg.progress');
  const bad = JSON.parse(dump); bad.state.sessionCounter += 5;
  const r0 = engB.importJSON(JSON.stringify(bad));
  assert.equal(r0.ok, false); assert.equal(r0.code, 'CHECKSUM');
  assert.equal(B.w.localStorage.getItem('dg.progress'), before, 'import fallido no debe modificar el almacenamiento');
  assert.equal(engB.importJSON('esto no es json').code, 'NOT_JSON');
  assert.equal(engB.importJSON(JSON.stringify({ app: 'otra', state: {} })).code, 'NOT_BACKUP');
  const r = engB.importJSON(dump); assert.equal(r.ok, true);
  assert.deepEqual(stored(B.w).errors, stored(A.w).errors);
  assert.equal(stored(B.w).sessionCounter, stored(A.w).sessionCounter);
  assert.deepEqual(stored(B.w).units, stored(A.w).units);
});

test('almacenamiento corrupto: no lanza, guarda copia .bak y arranca limpio', () => {
  const { w } = boot(); const junk = '{"version":2,"units":{"x":';
  w.localStorage.setItem('dg.progress', junk);
  let eng; assert.doesNotThrow(() => { eng = engineIn(w, 1.7e12, 10); });
  assert.equal(w.localStorage.getItem('dg.progress.bak'), junk);
  assert.equal(eng.progress.loadInfo.recovered, true);
  assert.equal(eng.state().sessionCounter, 0);
  const s = eng.startSession({ kind: 'mix', size: 12 }); assert.equal(s.length(), 12);   // sigue siendo usable
});

test('localStorage de versión antigua (v0/v1) se migra al abrir', () => {
  const { w } = boot();
  w.localStorage.setItem('dg.progress', JSON.stringify({ version: 1, sessionCounter: 4, errors: {}, items: {}, units: {}, skills: {}, history: [], settings: { levelCap: 'A2' } }));
  const eng = engineIn(w, 1.7e12, 11);
  assert.equal(eng.state().version, 2); assert.equal(eng.state().sessionCounter, 4); assert.equal(eng.state().settings.levelCap, 'A2');
  assert.equal(eng.progress.loadInfo.migratedFrom, 1);
});

test('ä/ö/ü/ß: NFC = NFD; transliteración ae/oe/ue/ss válida; quitar la diéresis o la ß NO es correcto', () => {
  const { w } = boot(); const eng = engineIn(w, 1.7e12, 12);
  const ev = (it, r) => w.DG.evaluator.evaluate(it, r, { mode: 'write' }).verdict;
  const all = Object.values(eng.store.byId);
  const um = all.find(i => i.module === 'verben' && i.type === 'cloze' && /[äöü]/.test(i.answer));   // schläfst
  const sz = all.find(i => i.module === 'verben' && i.type === 'cloze' && /ß/.test(i.answer));        // heiße
  assert.ok(um && sz);
  const ans = um.answer;
  assert.equal(ev(um, ans), 'correct');
  assert.equal(ev(um, ans.normalize('NFD')), 'correct', 'NFD (u + diéresis combinante) debe valer igual que NFC');
  assert.equal(ev(um, ans.normalize('NFC')), 'correct');
  assert.equal(ev(um, ans.toUpperCase()), 'correct', 'mayúsculas: Ä/Ö/Ü');
  assert.equal(ev(um, ans.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue')), 'correct', 'schlaefst');
  assert.equal(ev(um, ans.replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u')), 'wrong', 'schlafst es OTRA forma (schlafen): nunca se perdona en formas cerradas');
  assert.equal(ev(sz, sz.answer), 'correct');
  assert.equal(ev(sz, sz.answer.normalize('NFD')), 'correct');
  assert.equal(ev(sz, sz.answer.replace(/ß/g, 'ss')), 'correct', 'heisse');
  assert.equal(ev(sz, sz.answer.replace(/ß/g, 's')), 'wrong', 'heise');
  // «ä» suelto con NFD en cadena larga mezclada con espacios y puntuación
  const mix = 'Straße, Käse, Öl und Übung';
  assert.equal(w.DG.text.nfc(mix.normalize('NFD')), mix);
  assert.equal(w.DG.text.nfc(mix.normalize('NFD')).length, mix.length);
});

test('sin semilla, dos ventanas distintas dan sesiones distintas (el azar no depende de la fecha)', () => {
  const mk = () => { const { w } = boot(); w.__t = 1.7e12; w.eval('window.__clock = { now: function () { return 1.7e12; } };'); return w.eval('DG.engine.createEngine({ data: window.__data, concepts: window.__concepts, storage: window.localStorage, clock: window.__clock })'); };
  const a = mk().startSession({ kind: 'mix', size: 12 }).plan.items.map(e => e.id), b = mk().startSession({ kind: 'mix', size: 12 }).plan.items.map(e => e.id);
  assert.notDeepEqual(a, b);
});

test('cuota de almacenamiento llena: el motor no lanza y lo notifica', () => {
  const { w } = boot(); const eng = engineIn(w, 1.7e12, 13);
  const real = w.Storage.prototype.setItem;
  w.Storage.prototype.setItem = function () { const e = new Error('full'); e.name = 'QuotaExceededError'; throw e; };
  try {
    const s = eng.startSession({ kind: 'mix', size: 12 });
    assert.doesNotThrow(() => { while (!s.done()) s.answer(respond(s.currentItem(), true), { mode: 'write' }); s.finish(); });
    assert.equal(eng.progress.save().ok, false);
  } finally { w.Storage.prototype.setItem = real; }
});
