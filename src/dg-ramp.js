/* dg-ramp.js — rampa de nivel A1→B1 por dominio (módulo), tope ajustable y mezcla 70/20/10.
 *
 *  - 70 % nivel actual · 20 % repaso más fácil (niveles inferiores) · 10 % reto un nivel arriba.
 *  - El nivel sube por DOMINIO, no por calendario: precisión móvil ≥ objetivo (85 %) con evidencia
 *    suficiente y cobertura mínima del nivel; baja si la precisión cae por debajo del suelo.
 *  - El filtro de nivel es UNO solo (allowed/levelsAllowed) y lo usan scheduler, cola de errores y reintentos. */
(function (g) {
  'use strict';
  var DG = (g.DG = g.DG || {});
  if (typeof require === 'function' && typeof module === 'object') { require('./dg-items.js'); require('./dg-sampler.js'); }
  var LEVELS = DG.items.LEVELS;

  var CFG = {
    mix: { current: 0.7, easier: 0.2, up: 0.1 },
    target: 0.85,            // objetivo de aciertos
    window: 30,              // intentos recordados por módulo y nivel
    minAttempts: 20,         // promoción: ≥20 intentos sobre ítems YA vistos (retención)
    promoteAcc: 0.85,
    demoteAcc: 0.55, demoteMinAttempts: 25,
    masteryFrac: 0.5, masteryMaxUnits: 30,     // unidades «dominadas» necesarias: min(50 % del nivel, 30)
    masteryReps: 2,          // dominada = graduada y repasada con éxito ≥2 veces, sin estar en reaprendizaje (y, en verbos con cambio de vocal/irregulares, con ≥1 acierto en du o er_sie_es)
    minUnitsStart: 12,       // un nivel «existe» para un módulo si tiene ≥12 unidades
    minDwell: 5              // sesiones mínimas entre cambios de nivel (histéresis)
  };

  function rank(l) { return LEVELS.indexOf(l); }

  // Tope efectivo del módulo (el más estricto entre el global y el del módulo).
  function capFor(settings, module) {
    var g1 = rank((settings && settings.levelCap) || 'B1'); if (g1 < 0) g1 = 2;
    var m = settings && settings.capByModule && settings.capByModule[module];
    var m1 = m ? rank(m) : 2; if (m1 < 0) m1 = 2;
    return LEVELS[Math.min(g1, m1)];
  }
  // EL filtro de nivel. Todo el motor pregunta aquí.
  function allowed(settings, module, level) { return rank(level) <= rank(capFor(settings, module)); }
  function levelsAllowed(settings, module) { var c = rank(capFor(settings, module)); return LEVELS.slice(0, c + 1); }

  function populatedLevels(store, module, cfg) {
    cfg = cfg || CFG;
    return LEVELS.filter(function (l) { return store.unitCount(module, l) >= cfg.minUnitsStart; });
  }
  function startLevel(store, module, cfg) {
    var p = populatedLevels(store, module, cfg);
    if (p.length) return p[0];
    var any = store.levelsOf(module);
    return any.length ? any[0] : 'A1';
  }

  function moduleRamp(state, module) { return (state.ramp[module] = state.ramp[module] || { lv: null, win: {}, rev: {}, since: 0, carry: {} }); }

  // Nivel actual efectivo (respeta tope y niveles realmente poblados). Si bajo el tope sólo hay niveles
  // «finos» (<12 unidades), se usan igualmente y el scheduler avisa (LEVEL_THIN).
  function currentLevel(state, store, module, cfg) {
    cfg = cfg || CFG;
    var cap = capFor(state.settings, module), capR = rank(cap);
    var pop = populatedLevels(store, module, cfg).filter(function (l) { return rank(l) <= capR; });
    if (!pop.length) pop = store.levelsOf(module).filter(function (l) { return rank(l) <= capR; });
    if (!pop.length) return null;
    var r = state.ramp[module], lv = (r && r.lv) || pop[0];
    if (rank(lv) > capR) lv = cap;
    if (pop.indexOf(lv) >= 0) return lv;
    var up = pop.filter(function (l) { return rank(l) >= rank(lv); })[0];
    return up || pop[pop.length - 1];
  }

  // Estructura de cubos del módulo: qué niveles entran en cada cubo. Sólo niveles con ≥12 unidades
  // forman cubo propio (un nivel «fino» no se usa como repaso/reto: se repetiría sin parar).
  function buckets(state, store, module, cfg) {
    cfg = cfg || CFG;
    var cur = currentLevel(state, store, module, cfg);
    if (!cur) return null;
    var pop = populatedLevels(store, module, cfg);
    var cap = rank(capFor(state.settings, module));
    var easier = pop.filter(function (l) { return rank(l) < rank(cur); });
    var upL = pop.filter(function (l) { return rank(l) > rank(cur) && rank(l) <= cap; })[0] || null;
    return { current: cur, easier: easier, up: upL ? [upL] : [] };
  }

  // Proporciones efectivas (si falta cubo, su parte pasa al nivel actual).
  function shares(b, cfg) {
    cfg = cfg || CFG;
    var s = { current: cfg.mix.current, easier: cfg.mix.easier, up: cfg.mix.up };
    if (!b.easier.length) { s.current += s.easier; s.easier = 0; }
    if (!b.up.length) { s.current += s.up; s.up = 0; }
    return s;
  }

  // win = todos los intentos del nivel; rev = sólo intentos sobre unidades YA vistas (retención).
  // La promoción y la degradación usan rev: fallar contenido recién introducido no baja de nivel.
  function record(state, module, level, correct, seenBefore, cfg) {
    cfg = cfg || CFG;
    var r = moduleRamp(state, module); r.rev = r.rev || {};
    var w = (r.win[level] = r.win[level] || []);
    w.push(correct ? 1 : 0); if (w.length > cfg.window) w.splice(0, w.length - cfg.window);
    if (seenBefore) {
      var v = (r.rev[level] = r.rev[level] || []);
      v.push(correct ? 1 : 0); if (v.length > cfg.window) v.splice(0, v.length - cfg.window);
    }
  }

  function accuracy(w) { if (!w || !w.length) return null; var s = 0; w.forEach(function (x) { s += x; }); return s / w.length; }

  function seenUnits(state, store, module, level) {
    var n = 0;
    (store.unitsByModule[module] || []).forEach(function (u) { if (u.level === level && state.units[u.unit] && state.units[u.unit].n > 0) n++; });
    return n;
  }
  function masteredUnits(state, store, module, level, cfg) {
    cfg = cfg || CFG; var n = 0;
    (store.unitsByModule[module] || []).forEach(function (u) {
      if (u.level !== level) return;
      var s = state.units[u.unit];
      // verbos con cambio de vocal / irregulares: además ≥1 acierto en du o er_sie_es (hp)
      if (s && s.s === 'r' && s.r >= cfg.masteryReps && (!u.hard || s.hp)) n++;
    });
    return n;
  }

  // Evalúa promoción/degradación del módulo. Devuelve {change:'promote'|'demote'|null, from, to, acc, n}.
  function evaluate(state, store, module, sessionNo, cfg) {
    cfg = cfg || CFG;
    var r = moduleRamp(state, module); r.rev = r.rev || {};
    var cur = currentLevel(state, store, module, cfg);
    if (!cur) return { change: null };
    if (!r.lv) r.lv = cur;
    var w = r.rev[cur] || [], acc = accuracy(w), n = w.length;
    var out = { change: null, from: cur, to: cur, acc: acc, n: n, mastered: masteredUnits(state, store, module, cur, cfg) };
    if (sessionNo - (r.since || 0) < cfg.minDwell) return out;
    var pop = populatedLevels(store, module, cfg); if (!pop.length) pop = store.levelsOf(module);
    var cap = rank(capFor(state.settings, module));
    var idx = pop.indexOf(cur);
    if (n >= cfg.minAttempts && acc >= cfg.promoteAcc) {
      var nxt = pop[idx + 1];
      if (nxt && rank(nxt) <= cap) {
        var total = store.unitCount(module, cur), need = Math.min(Math.ceil(cfg.masteryFrac * total), cfg.masteryMaxUnits);
        if (out.mastered >= need) { r.lv = nxt; r.since = sessionNo; r.win[cur] = []; r.rev[cur] = []; r.rev[nxt] = []; out.change = 'promote'; out.to = nxt; }
      }
    } else if (n >= cfg.demoteMinAttempts && acc < cfg.demoteAcc && idx > 0) {
      r.lv = pop[idx - 1]; r.since = sessionNo; r.win[cur] = []; r.rev[cur] = []; out.change = 'demote'; out.to = r.lv;
    }
    return out;
  }

  DG.ramp = { CFG: CFG, LEVELS: LEVELS, capFor: capFor, allowed: allowed, levelsAllowed: levelsAllowed,
    populatedLevels: populatedLevels, startLevel: startLevel, currentLevel: currentLevel, buckets: buckets,
    shares: shares, record: record, evaluate: evaluate, moduleRamp: moduleRamp, accuracy: accuracy, seenUnits: seenUnits, masteredUnits: masteredUnits };
  if (typeof module === 'object' && module.exports) module.exports = DG.ramp;
})(typeof globalThis !== 'undefined' ? globalThis : this);
