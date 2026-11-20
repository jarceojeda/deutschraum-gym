/* dg-progress.js — progreso versionado, migraciones, persistencia (localStorage inyectable) y copia de seguridad.
 * Nunca lanza por datos corruptos: guarda copia «.bak» y arranca limpio. Importar es atómico (todo o nada). */
(function (g) {
  'use strict';
  var DG = (g.DG = g.DG || {});

  var APP = 'deutschraum-gym';
  var VERSION = 2;
  var KEY = 'dg.progress';
  var HISTORY_MAX = 12;

  function defaults() {
    return {
      app: APP, version: VERSION, createdAt: 0, updatedAt: 0,
      settings: { levelCap: 'B1', capByModule: {}, memorySessions: 5, errorShare: 0.25, mode: 'touch' },
      sessionCounter: 0,
      history: [],      // [{n, ts, kind, modules, ids}]  últimas sesiones (memoria del randomizador)
      units: {},        // unidad → estado SRS
      items: {},        // id → {a intentos, f fallos, ls última sesión, lr último resultado 0/1}
      skills: {},       // skillId → {n, acc (EWMA), ls (última sesión en que salió)}
      tags: {},         // errorTag → {n, f, ls}
      errors: {},       // id → {s sesión del 1.er fallo, ls último fallo, f fallos, ts}
      ramp: {},         // módulo → {lv, win/rev:{A1:[0/1..]}, since, carry:{easier, up}}
      recent: [],       // últimos 60 primeros intentos (0/1): controla el ritmo de contenido nuevo
      stats: { sessions: 0, answered: 0, correct: 0, rescued: 0, learned: 0 }
    };
  }

  /* ---------- migraciones: cada una sube UNA versión ---------- */
  var MIGRATIONS = {
    // v0 (prototipo): { seen: {id: veces}, wrong: [ids] } sin versión.
    0: function (s) {
      var d = defaults();
      d.createdAt = s.createdAt || 0; d.updatedAt = s.updatedAt || 0;
      var seen = s.seen || {};
      Object.keys(seen).forEach(function (id) { d.items[id] = { a: seen[id] | 0, f: 0, ls: 0, lr: 1 }; });
      (s.wrong || []).forEach(function (id) {
        d.errors[id] = { s: 0, ls: 0, f: 1, ts: 0 };
        d.items[id] = d.items[id] || { a: 1, f: 1, ls: 0, lr: 0 };
        d.items[id].f = Math.max(1, d.items[id].f);
      });
      d.version = 1;
      return d;
    },
    // v1 → v2: unidades de repaso por habilidad (antes por id de ítem) y ramp/carry; se añade skills.ls.
    1: function (s) {
      s.units = s.units || {};
      s.ramp = s.ramp || {};
      Object.keys(s.skills || {}).forEach(function (k) { if (s.skills[k].ls == null) s.skills[k].ls = 0; });
      s.tags = s.tags || {};
      s.settings = Object.assign({ levelCap: 'B1', capByModule: {}, memorySessions: 5, errorShare: 0.25, mode: 'touch' }, s.settings || {});
      s.version = 2;
      return s;
    }
  };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function migrate(raw) {
    if (!raw || typeof raw !== 'object') throw new Error('estado inválido');
    var s = clone(raw), v = s.version | 0;
    if (v > VERSION) { var e = new Error('versión futura: ' + v); e.code = 'FUTURE_VERSION'; throw e; }
    while (v < VERSION) {
      if (!MIGRATIONS[v]) throw new Error('sin migración desde v' + v);
      s = MIGRATIONS[v](s); v = s.version | 0;
    }
    // Completar claves faltantes sin pisar datos.
    var d = defaults();
    Object.keys(d).forEach(function (k) { if (s[k] == null) s[k] = d[k]; });
    s.settings = Object.assign({}, d.settings, s.settings);
    s.stats = Object.assign({}, d.stats, s.stats);
    return s;
  }

  // Suma de comprobación (FNV-1a 32) sobre JSON canónico del estado, para detectar copias corruptas.
  function checksum(str) {
    var h = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    return ('00000000' + h.toString(16)).slice(-8);
  }

  function create(opts) {
    opts = opts || {};
    var storage = opts.storage || null, key = opts.key || KEY;
    var clock = opts.clock || { now: function () { return Date.now(); } };
    var self = { state: null, loadInfo: { fresh: true, migratedFrom: null, recovered: false }, lastError: null };

    function nowTs() { return clock.now(); }

    self.load = function () {
      var raw = null;
      try { raw = storage ? storage.getItem(key) : null; } catch (e) { self.lastError = e; }
      if (!raw) { self.state = defaults(); self.state.createdAt = nowTs(); self.loadInfo = { fresh: true, migratedFrom: null, recovered: false }; return self.state; }
      try {
        var parsed = JSON.parse(raw), from = parsed.version | 0;
        self.state = migrate(parsed);
        self.loadInfo = { fresh: false, migratedFrom: from < VERSION ? from : null, recovered: false };
      } catch (e) {
        self.lastError = e;
        try { if (storage) storage.setItem(key + '.bak', raw); } catch (e2) { /* nada */ }
        self.state = defaults(); self.state.createdAt = nowTs();
        self.loadInfo = { fresh: true, migratedFrom: null, recovered: true, code: e.code || 'CORRUPT' };
      }
      return self.state;
    };

    self.save = function () {
      if (!self.state) return { ok: false, error: 'sin estado' };
      self.state.updatedAt = nowTs();
      try { if (storage) storage.setItem(key, JSON.stringify(self.state)); return { ok: true }; }
      catch (e) { self.lastError = e; return { ok: false, error: String(e && e.name || e) }; }
    };

    self.reset = function () { self.state = defaults(); self.state.createdAt = nowTs(); return self.save(); };

    self.exportJSON = function () {
      var body = JSON.stringify(self.state);
      return JSON.stringify({ app: APP, version: VERSION, exportedAt: nowTs(), checksum: checksum(body), state: self.state });
    };

    // Atómico: valida y migra en una copia; sólo si todo sale bien reemplaza el estado.
    self.importJSON = function (text) {
      var pkg, st;
      try { pkg = JSON.parse(text); } catch (e) { return { ok: false, code: 'NOT_JSON' }; }
      if (!pkg || pkg.app !== APP || !pkg.state) return { ok: false, code: 'NOT_BACKUP' };
      if (pkg.checksum && pkg.checksum !== checksum(JSON.stringify(pkg.state))) return { ok: false, code: 'CHECKSUM' };
      try { st = migrate(pkg.state); } catch (e) { return { ok: false, code: e.code || 'MIGRATION', error: String(e.message) }; }
      self.state = st;
      var r = self.save();
      return r.ok ? { ok: true, version: pkg.version | 0 } : { ok: false, code: 'SAVE', error: r.error };
    };

    // Quita referencias a ítems/unidades que ya no existen (tras actualizar el contenido).
    self.reconcile = function (store) {
      var st = self.state, removed = { items: 0, errors: 0, units: 0, history: 0 };
      Object.keys(st.items).forEach(function (id) { if (!store.byId[id]) { delete st.items[id]; removed.items++; } });
      Object.keys(st.errors).forEach(function (id) { if (!store.byId[id]) { delete st.errors[id]; removed.errors++; } });
      Object.keys(st.units).forEach(function (u) { if (!store.units[u]) { delete st.units[u]; removed.units++; } });
      st.history.forEach(function (h) {
        var n = h.ids.length; h.ids = h.ids.filter(function (id) { return !!store.byId[id]; }); removed.history += n - h.ids.length;
      });
      return removed;
    };

    return self;
  }

  DG.progress = { APP: APP, VERSION: VERSION, KEY: KEY, HISTORY_MAX: HISTORY_MAX, defaults: defaults, migrate: migrate,
    checksum: checksum, create: create };
  if (typeof module === 'object' && module.exports) module.exports = DG.progress;
})(typeof globalThis !== 'undefined' ? globalThis : this);
