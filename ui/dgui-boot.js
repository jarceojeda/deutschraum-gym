/* dgui-boot.js — arranque: lee los datos incrustados, crea el motor con localStorage y monta la interfaz. */
(function (g) {
  'use strict';
  var D = g.DGUI, doc = g.document;
  function json(id) { return JSON.parse(doc.getElementById(id).textContent); }
  var cfg = g.DGUI_CONFIG || {};
  var storage = null, ok = false;
  try { storage = g.localStorage; var k = 'dg.probe'; storage.setItem(k, '1'); storage.removeItem(k); ok = true; } catch (e) { storage = null; }
  var reglasEl = doc.getElementById('dg-reglas'), reglasAll = reglasEl ? JSON.parse(reglasEl.textContent) : {}, reglas = reglasAll.reglas || {}, biblioteca = reglasAll.biblioteca || [];
  var tablasEl = doc.getElementById('dg-tablas'), tablas = tablasEl ? (JSON.parse(tablasEl.textContent).tablas || {}) : {};
  var sufEl = doc.getElementById('dg-sufijos'), sufijos = sufEl ? (JSON.parse(sufEl.textContent).sufijos || []) : [];
  var prefs = D.util.prefs(storage), beyondOn = prefs.get('beyond') === true;   // «Más allá del B1»: vocabulario B2/C1 opcional, apagado por defecto (se aplica al reiniciar)
  var data = json('dg-data'), beyond = doc.getElementById('dg-beyond') ? json('dg-beyond') : [], keepIds = [];
  if (beyondOn) data = data.concat(beyond); else keepIds = beyond.map(function (i) { return i.id; });   // apagado: se cargan sin ejercicios, pero su progreso NO se poda
  var words = D.palabras.load(storage);   // «Mis palabras»: ítems propios del alumno
  if (words.length) data = data.concat(D.palabras.makeAll(words, data));
  var opts = { data: data, concepts: json('dg-concepts'), storage: storage, keepIds: keepIds };
  if (cfg.seed != null) opts.rng = g.DG.rng.create(cfg.seed);
  var engine = g.DG.engine.createEngine(opts);
  var rnd = cfg.seed != null ? g.DG.rng.create(cfg.seed + 1).next : null;
  g.DGUI.app = D.mount(doc.getElementById('app'), { win: g, engine: engine, concepts: opts.concepts, reglas: reglas, biblioteca: biblioteca, tablas: tablas, sufijos: sufijos, storageOk: ok, prefs: prefs, beyondOn: beyondOn, words: words, storage: storage, keepIds: keepIds, rnd: rnd, autoMs: cfg.autoMs });
  g.DGUI.engine = engine;
  if (!cfg.noPwa) D.pwa.init(g);
})(typeof globalThis !== 'undefined' ? globalThis : this);
