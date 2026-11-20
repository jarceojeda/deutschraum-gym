/* dg-engine.js — fachada del motor: sesiones, evaluación, repaso espaciado, cola de errores y progreso.
 * Sin interfaz. La UI (etapa 3) sólo llama a: createEngine → startSession → session.view/answer/finish. */
(function (g) {
  'use strict';
  var DG = (g.DG = g.DG || {});
  if (typeof require === 'function' && typeof module === 'object') {
    ['dg-rng.js', 'dg-text.js', 'dg-sampler.js', 'dg-items.js', 'dg-evaluator.js', 'dg-srs.js', 'dg-ramp.js', 'dg-progress.js', 'dg-scheduler.js']
      .forEach(function (f) { require('./' + f); });
  }
  var Items = DG.items, Ev = DG.evaluator, SRS = DG.srs, R = DG.ramp, P = DG.progress, Sch = DG.scheduler;

  var CFG = { maxRetries: 2, retryGap: 3, retryMinBehind: 2, almostAllowance: 1, ewmaAlpha: 0.1,
    rescueMinMs: 16 * 3600000 };   // un error sólo se rescata si han pasado ≥16 h desde el último fallo

  function createEngine(opts) {
    opts = opts || {};
    var cfg = Object.assign({}, CFG, opts.config || {});
    var clock = opts.clock || { now: function () { return Date.now(); } };
    var rng = opts.rng || DG.rng.create();
    var store = Items.createStore(opts.data || []);
    var progress = P.create({ storage: opts.storage || null, key: opts.key, clock: clock });
    progress.load();
    var reconciled = progress.reconcile(store);

    var engine = { store: store, progress: progress, rng: rng, clock: clock, cfg: cfg, reconciled: reconciled };
    function state() { return progress.state; }
    engine.state = state;

    engine.validate = function () { return Items.validate(store, { concepts: opts.concepts }); };

    // «Practicar desde este nivel»: fija el nivel ACTUAL de la rampa (por módulo o de todos). setLevelCap sólo pone un techo; sin esto
    // el B1 sólo se alcanzaría dominando A1 y A2. Respeta el tope y los niveles con ≥12 unidades; la permanencia mínima protege el cambio.
    engine.setLevel = function (level, module) {
      if (Items.LEVELS.indexOf(level) < 0) throw new Error('nivel inválido: ' + level);
      var st = state(), mods = module ? [module] : store.modules(), levels = {};
      mods.forEach(function (m) { var r = R.moduleRamp(st, m); r.lv = level; r.since = st.sessionCounter; levels[m] = R.currentLevel(st, store, m); });
      var sv = progress.save() || {};
      return Object.assign({ levels: levels }, sv);
    };

    engine.setLevelCap = function (level, module) {
      if (Items.LEVELS.indexOf(level) < 0) throw new Error('nivel inválido: ' + level);
      if (module) state().settings.capByModule[module] = level; else state().settings.levelCap = level;
      return progress.save();
    };

    /* ---------- sesiones ---------- */
    engine.startSession = function (req) {
      req = req || {};
      var st = state();
      var plan = Sch.buildSession({ store: store, state: st, rng: rng, now: clock.now(), cfg: opts.schedulerConfig }, req);
      // Abrir NO escribe nada: contador, restos de rampa e historial se confirman en la 1.ª respuesta (o giveUp).
      // Así una sesión abierta y cerrada sin responder no deja rastro ni degrada la memoria de sesiones.
      return makeSession(plan, req);
    };

    function makeSession(plan, req) {
      var st = state();
      var mode = req.mode || st.settings.mode || 'touch';
      var queue = plan.items.map(function (e) { return Object.assign({ retry: 0, almostUsed: 0 }, e); });
      var index = 0, finished = false, committed = false, sessionNo = plan.sessionNo, saveError = null, viewCache = null;
      var log = [];            // un registro por PRIMER intento
      var rescued = [], newUnits = {}, modulesTouched = {};
      var S = { id: sessionNo, kind: plan.kind, plan: plan, warnings: plan.warnings, notes: plan.notes, composition: plan.composition };

      S.length = function () { return queue.length; };
      S.position = function () { return index; };
      S.done = function () { return index >= queue.length; };
      S.currentEntry = function () { return index < queue.length ? queue[index] : null; };
      S.currentItem = function () { var e = S.currentEntry(); return e ? store.byId[e.id] : null; };
      // La vista se cachea por posición de cola (y modo): llamar dos veces no vuelve a barajar fichas/opciones.
      S.view = function (m) {
        var it = S.currentItem(); if (!it) return null;
        var md = m || mode;
        if (viewCache && viewCache.index === index && viewCache.mode === md) return viewCache.v;
        var v = Items.view(it, md, rng);
        var e = S.currentEntry(); v.retry = e.retry; v.bucket = e.bucket; v.cls = e.cls;
        viewCache = { index: index, mode: md, v: v };
        return v;
      };
      function save() { var r = progress.save(); if (!r || !r.ok) saveError = (r && r.error) || 'save'; else saveError = null; return saveError; }
      // Reintento en sesión sólo si queda margen: con <retryMinBehind ítems por detrás se vería enseguida (no es repaso).
      function canRetry(e, it) { return e.retry < cfg.maxRetries && R.allowed(st.settings, it.module, it.level) && queue.length - index - 1 >= cfg.retryMinBehind; }

      // Confirmación diferida: contador, restos de rampa y entrada de historial (los ids se añaden al contestar).
      // Si otra sesión abierta después ya confirmó (contador ≥ nuestro número), se toma el siguiente libre.
      function commit() {
        if (committed) return;
        committed = true;
        sessionNo = Math.max(plan.sessionNo, st.sessionCounter + 1); S.id = sessionNo;
        st.sessionCounter = sessionNo;
        Object.keys(plan.carry).forEach(function (m) { R.moduleRamp(st, m).carry = plan.carry[m]; });
        st.history.push({ n: sessionNo, ts: clock.now(), kind: plan.kind, modules: Array.from(new Set(plan.items.map(function (e) { return e.module; }))), ids: [] });
        if (st.history.length > P.HISTORY_MAX) st.history.splice(0, st.history.length - P.HISTORY_MAX);
      }

      function recordFirst(it, e, correct, usedAlmost) {
        var now = clock.now();
        // historial (memoria del randomizador)
        var h = st.history[st.history.length - 1];
        if (h && h.n === sessionNo) h.ids.push(it.id);
        // ítem
        var is = st.items[it.id] || (st.items[it.id] = { a: 0, f: 0, ls: 0, lr: 1 });
        is.a++; if (!correct) is.f++; is.ls = sessionNo; is.lr = correct ? 1 : 0;
        // unidad SRS (calificación SOLO del primer intento)
        var before = st.units[it.unit];
        st.units[it.unit] = SRS.update(before, SRS.gradeFor(correct ? 'correct' : 'wrong', usedAlmost, false), now, rng);
        if (correct && (!before || before.s === 'l')) { newUnits[it.unit] = true; st.stats.learned++; }
        // verbos con cambio de vocal / irregulares: marca por unidad de que ya se acertó una persona difícil (du / er_sie_es)
        var ui = store.unitInfo[it.unit];
        if (correct && ui && ui.hard && (it.person === 'du' || it.person === 'er_sie_es')) st.units[it.unit].hp = true;
        // habilidad (EWMA; media simple mientras hay pocos datos)
        var sk = st.skills[it.skillId] || (st.skills[it.skillId] = { n: 0, acc: 0, ls: 0 });
        var x = correct ? 1 : 0, a = Math.max(cfg.ewmaAlpha, 1 / (sk.n + 1));
        sk.acc = sk.n === 0 ? x : sk.acc + a * (x - sk.acc); sk.n++; sk.ls = sessionNo;
        // mapa de errores por etiqueta
        if (it.errorTag) {
          var tg = st.tags[it.errorTag] || (st.tags[it.errorTag] = { n: 0, f: 0, ls: 0 });
          tg.n++; if (!correct) tg.f++; tg.ls = sessionNo;
        }
        // cola de errores: todo fallo entra; sale al acertar cuando han pasado ≥ rescueMinMs (16 h) desde el último fallo.
        // Un acierto anterior cuenta para el SRS pero el error sigue en la cola (se actualiza ls, no f ni ts).
        var res = { rescued: false };
        if (!correct) {
          var prev = st.errors[it.id];
          st.errors[it.id] = { s: prev ? prev.s : sessionNo, ls: sessionNo, f: (prev ? prev.f : 0) + 1, ts: now };
        } else if (st.errors[it.id]) {
          var er = st.errors[it.id];
          if (now - (er.ts || 0) >= cfg.rescueMinMs) {
            res.rescued = true; res.fails = er.f;
            delete st.errors[it.id]; st.stats.rescued++; rescued.push(it.id);
          } else er.ls = sessionNo;
        }
        // rampa: registro por módulo y nivel
        R.record(st, it.module, it.level, correct, !!before && before.n > 0);
        st.recent.push(correct ? 1 : 0); if (st.recent.length > 60) st.recent.splice(0, st.recent.length - 60);
        modulesTouched[it.module] = true;
        st.stats.answered++; if (correct) st.stats.correct++;
        log.push({ id: it.id, unit: it.unit, module: it.module, skillId: it.skillId, errorTag: it.errorTag, level: it.level, correct: correct, rescued: res.rescued, bucket: e.bucket });
        return res;
      }

      /* answer(response, {mode}) → {evaluation, almost, advance, retryScheduled, rescued, finished} */
      S.answer = function (response, aopts) {
        if (finished) throw new Error('sesión terminada');
        var e = S.currentEntry(); if (!e) throw new Error('sin ítem actual');
        var it = store.byId[e.id];
        var ev = Ev.evaluate(it, response, Object.assign({ mode: mode }, aopts || {}));
        var out = { evaluation: ev, almost: false, advance: true, retryScheduled: false, rescued: false, finished: false };
        if (ev.verdict === 'almost') {
          if (e.almostUsed < cfg.almostAllowance) { e.almostUsed++; out.almost = true; out.advance = false; return out; }
          ev.verdict = 'wrong'; ev.correct = false; ev.notes = (ev.notes || []).concat('almost-exhausted');
        }
        var correct = ev.verdict === 'correct';
        commit();
        if (e.retry === 0) {
          var r = recordFirst(it, e, correct, e.almostUsed > 0);
          out.rescued = r.rescued; out.fails = r.fails;
        }
        if (!correct && canRetry(e, it)) {
          // reintento del MISMO error dentro de la sesión, unos ítems más adelante
          var pos = Math.min(queue.length, index + 1 + cfg.retryGap);
          queue.splice(pos, 0, Object.assign({}, e, { retry: e.retry + 1, almostUsed: 0, bucket: 'retry', cls: 'retry' }));
          out.retryScheduled = true;
        }
        index++;
        if (save()) out.saveError = saveError;
        if (S.done()) { out.finished = true; }
        return out;
      };

      // Rendirse/ver respuesta: cuenta como fallo del primer intento.
      S.giveUp = function () {
        var e = S.currentEntry(); if (!e) throw new Error('sin ítem actual');
        var it = store.byId[e.id];
        commit();
        if (e.retry === 0) recordFirst(it, e, false, false);
        if (canRetry(e, it)) {
          queue.splice(Math.min(queue.length, index + 1 + cfg.retryGap), 0, Object.assign({}, e, { retry: e.retry + 1, almostUsed: 0, bucket: 'retry', cls: 'retry' }));
        }
        index++;
        var out = { finished: S.done() };
        if (save()) out.saveError = saveError;
        return out;
      };

      /* finish(): evalúa la rampa por módulo y cierra la sesión (idempotente). */
      S.finish = function () {
        if (finished) return S.summary();
        finished = true;
        if (!committed) { S._levelChanges = []; return S.summary(); }    // abierta y cerrada sin responder: no deja rastro
        var changes = [];
        Object.keys(modulesTouched).forEach(function (m) {
          var r = R.evaluate(st, store, m, sessionNo);
          if (r.change) changes.push({ module: m, change: r.change, from: r.from, to: r.to, acc: r.acc });
        });
        st.stats.sessions++;
        S._levelChanges = changes;
        save();
        return S.summary();
      };

      S.summary = function () {
        var n = log.length, ok = log.filter(function (l) { return l.correct; }).length, byTag = {};
        log.forEach(function (l) { if (!l.correct && l.errorTag) byTag[l.errorTag] = (byTag[l.errorTag] || 0) + 1; });
        var sm = {
          sessionNo: sessionNo, answered: n, correct: ok, accuracy: n ? ok / n : null,
          newUnits: Object.keys(newUnits).length,         // «hoy aprendiste X que ayer no sabías»
          rescued: rescued.slice(),                       // «rescataste una palabra que fallabas»
          failed: log.filter(function (l) { return !l.correct; }).map(function (l) { return l.id; }),
          errorsByTag: byTag, levelChanges: S._levelChanges || [], log: log.slice()
        };
        if (saveError) sm.saveError = saveError;
        return sm;
      };
      return S;
    }

    /* ---------- consultas ---------- */
    engine.errorQueue = function () {
      var st = state();
      return Object.keys(st.errors).filter(function (id) { var it = store.byId[id]; return it && R.allowed(st.settings, it.module, it.level); })
        .map(function (id) { return Object.assign({ id: id }, st.errors[id]); });
    };
    engine.errorMap = function () {
      var st = state();
      return Object.keys(st.tags).map(function (t) { return { tag: t, n: st.tags[t].n, f: st.tags[t].f, rate: st.tags[t].n ? st.tags[t].f / st.tags[t].n : 0 }; })
        .filter(function (x) { return x.f > 0; }).sort(function (a, b) { return b.f - a.f; });
    };
    engine.levelOf = function (module) { return R.currentLevel(state(), store, module); };
    engine.exportJSON = function () { return progress.exportJSON(); };
    engine.importJSON = function (t) { return progress.importJSON(t); };
    return engine;
  }

  DG.engine = { CFG: CFG, createEngine: createEngine };
  if (typeof module === 'object' && module.exports) module.exports = DG.engine;
})(typeof globalThis !== 'undefined' ? globalThis : this);
