/* dg-scheduler.js — construcción de sesiones: randomizador ponderado sin reemplazo, memoria de sesiones
 * previas, cuotas (módulo / habilidad / tipo / clase SRS), repaso espaciado por unidad y rampa 70/20/10.
 *
 * buildSession(ctx, req) es PURO respecto al estado: devuelve el plan y los restos de la rampa;
 * dg-engine.js lo «confirma». Semilla: la del ctx.rng (en producción NO depende de la fecha).
 *
 * Orden de decisiones:
 *   1. cola de errores (siempre entra; hasta errorShare de la sesión, más si hay atraso)
 *   2. cuotas por CLASE SRS de los huecos restantes: vencidas / nuevas / relleno.
 *      El cupo de nuevas sigue la precisión reciente (objetivo ≈85 %) y se frena con atraso (errores + vencidas).
 *   3. reparto por módulo (pesos: debilidad, antigüedad sin practicar, disponibilidad)
 *   4. por módulo: cubos de la rampa (actual/fácil/reto) con difusión de resto entre sesiones
 *   5. por hueco: clase (según cuota restante) → casilla (skillId: cuota máx., tamaño, antigüedad, debilidad)
 *      → unidad (peso SRS × memoria de sesiones × penalizaciones) → variante (fallos del ítem × memoria)
 *   6. ordenar: bloques para habilidades nuevas, intercalado después. */
(function (g) {
  'use strict';
  var DG = (g.DG = g.DG || {});
  if (typeof require === 'function' && typeof module === 'object') {
    ['dg-items.js', 'dg-sampler.js', 'dg-srs.js', 'dg-ramp.js'].forEach(function (f) { require('./' + f); });
  }
  var S = DG.sampler, SRS = DG.srs, R = DG.ramp;

  var CFG = {
    size: 12,
    // cuotas por clase SRS
    dueShareMax: 0.6,
    newShareBase: 0.35, newShareGain: 1.5, newShareMin: 0.1, newShareMax: 0.5, accTarget: 0.85, accMinSamples: 20,
    loadFree: 2, loadSpan: 4, pressureMin: 0.2,        // atraso (errores + vencidas) en «sesiones»: libre hasta 2, mínimo a 6
    classPrior: { due: 3, future: 1, new: 1 },
    futureGap: 3,                                      // relleno (clase future): excluye lo visto en las últimas 3 sesiones (≤ memorySessions)         // si las cuotas se agotan antes de tiempo
    // cuotas por casilla y por tipo
    maxCellShare: 0.5,
    typeCaps: { 'order': 0.3, 'transform': 0.25, 'minimal-pair': 0.25 },
    // penalizaciones suaves
    lemmaPenalty: 0.1, familyPenalty: 0.3,
    newSkillN: 5,
    cellAgeSpan: 8, cellAgeMax: 12, weaknessGain: 1.5,
    cellCountExp: 0.2,                                 // peso del módulo ∝ (nº de casillas alcanzables)^0.2 → cobertura (calibrado con simulación)
    moduleAgeSpan: 6, moduleAgeMax: 2, priorAcc: 0.7, priorMinN: 10,
    hardPersonBoost: 3, infPersonDamp: 0.5,
    starveSessions: 10, guardMinF: 6,            // verbos con cambio de vocal / irregulares (du, er_sie_es ×3; = infinitivo ×0,5)
    errorBacklogFactor: 1.6, errorWeightFails: 0.5, errorAgeSpan: 8, errorAgeMax: 3
  };
  var CLASSES = ['due', 'new', 'future'];

  // d = sesiones de distancia a la última aparición (1 = la sesión anterior). N = ventana de memoria.
  function recencyFactor(d, N) {
    if (d == null || d > N || d < 1) return 1;
    var x = d / (N + 1);
    return x * x;
  }
  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function sampleOne(weights, rng) { return S.drawIndex(weights, rng); }
  // `learning` (paso de aprendizaje sin cumplir) NO es una clase elegible: ni cuota, ni atraso D, ni sorteo hasta que venza.
  function classOfState(st, now) { return SRS.classify(st, now); }

  function buildSession(ctx, req) {
    var store = ctx.store, st = ctx.state, rng = ctx.rng, now = ctx.now;
    var cfg = Object.assign({}, CFG, ctx.cfg || {});
    var settings = st.settings;
    var sessionNo = st.sessionCounter + 1;
    var kind = req.kind || 'mix';
    var size = Math.max(1, req.size || cfg.size);
    var N = settings.memorySessions;
    var warnings = [], notes = [];

    var modules = (req.modules && req.modules.length ? req.modules : store.modules()).filter(function (m) { return !!store.byModule[m]; });
    if (!modules.length) return { sessionNo: sessionNo, kind: kind, size: size, items: [], warnings: [{ code: 'NO_MODULES' }], notes: [], carry: {}, composition: {}, modulePlan: {} };

    /* ---- memoria de sesiones previas ---- */
    var itemDist = Object.create(null), unitDist = Object.create(null);
    st.history.forEach(function (h) {
      var d = sessionNo - h.n;
      if (d < 1 || d > N) return;
      h.ids.forEach(function (id) {
        if (!(id in itemDist) || d < itemDist[id]) itemDist[id] = d;
        var it = store.byId[id];
        if (it && (!(it.unit in unitDist) || d < unitDist[it.unit])) unitDist[it.unit] = d;
      });
    });

    var used = { unit: Object.create(null), item: Object.create(null), lemma: Object.create(null), family: Object.create(null) };
    var typeCount = Object.create(null), cellUsed = Object.create(null);
    var entries = [];

    function levelOK(it) { return R.allowed(settings, it.module, it.level); }   // único filtro de nivel

    function take(it, bucket, cls) {
      used.unit[it.unit] = true; used.item[it.id] = true;
      if (it.lemma) used.lemma[it.lemma] = (used.lemma[it.lemma] || 0) + 1;
      if (it.family) used.family[it.family] = true;
      typeCount[it.type] = (typeCount[it.type] || 0) + 1;
      cellUsed[it.skillId] = (cellUsed[it.skillId] || 0) + 1;   // los errores obligatorios también ocupan cuota
      entries.push({ id: it.id, unit: it.unit, module: it.module, skillId: it.skillId, level: it.level, type: it.type, bucket: bucket, cls: cls });
    }

    /* ---- 1. cola de errores ---- */
    var errList = [];
    Object.keys(st.errors).forEach(function (id) {
      var it = store.byId[id];
      if (!it || modules.indexOf(it.module) < 0 || !levelOK(it)) return;
      errList.push({ it: it, e: st.errors[id] });
    });
    var errCap;
    if (kind === 'errors') errCap = Math.min(size, errList.length);
    else {
      var share = settings.errorShare * (errList.length > 2 * size ? cfg.errorBacklogFactor : 1);
      errCap = Math.min(errList.length, Math.ceil(size * share));
    }
    var ew = errList.map(function (x) {
      if (now - (x.e.ts || 0) < SRS.CFG.learnStepMs) return 0;   // recién fallado: aún en el paso de aprendizaje
      return 1 + cfg.errorWeightFails * Math.min(4, x.e.f || 1) + Math.min(cfg.errorAgeMax, (sessionNo - (x.e.ls || 0)) / cfg.errorAgeSpan);
    });
    var errChosen = 0;
    while (errChosen < errCap) {
      var ei = sampleOne(ew, rng);
      if (ei < 0) break;
      var ex = errList[ei]; ew[ei] = 0;
      if (kind !== 'errors' && used.unit[ex.it.unit]) continue;   // una sola unidad por sesión (salvo repaso de errores: ahí cada error cuenta)
      take(ex.it, 'error', 'error'); errChosen++;
    }
    if (kind === 'errors' && !errList.length) warnings.push({ code: 'NO_ERRORS', msg: 'No hay errores pendientes en el nivel permitido.' });
    else if (kind === 'errors' && !errChosen) warnings.push({ code: 'ERRORS_NOT_READY', msg: 'Los errores son de hace menos de 1 h: vuelve más tarde.' });

    var F = kind === 'errors' ? 0 : size - errChosen;

    /* ---- índices por módulo/casilla ---- */
    var cellsByModule = Object.create(null);
    modules.forEach(function (m) {
      var cells = Object.create(null);
      (store.unitsByModule[m] || []).forEach(function (u) { (cells[u.skillId] = cells[u.skillId] || []).push(u); });
      cellsByModule[m] = Object.keys(cells).map(function (k) { return { skillId: k, units: cells[k] }; });
    });
    function unitType(u) { return u.items[0].type; }
    var typeCap = {};
    Object.keys(cfg.typeCaps).forEach(function (t) { typeCap[t] = Math.max(1, Math.ceil(cfg.typeCaps[t] * size)); });

    var clsCache = Object.create(null);
    function clsOf(u) { var c = clsCache[u.unit]; if (!c) c = clsCache[u.unit] = classOfState(st.units[u.unit], now); return c; }

    function unitEligible(u, levels, relaxType) {
      if (used.unit[u.unit]) return false;
      if (levels && levels.indexOf(u.level) < 0) return false;
      if (!R.allowed(settings, u.module, u.level)) return false;
      if (!relaxType) { var t = unitType(u); if (typeCap[t] && (typeCount[t] || 0) >= typeCap[t]) return false; }
      return true;
    }

    var futureGap = Math.min(cfg.futureGap, N);
    function futureOK(u) { return !(u.unit in unitDist) || unitDist[u.unit] > futureGap; }

    function allowedUnitsCount(m) {
      var n = 0; (store.unitsByModule[m] || []).forEach(function (u) { if (unitEligible(u, null, true)) n++; }); return n;
    }

    /* ---- avisos de tamaño mínimo de pool bajo el tope ---- */
    var poolSeen = {};
    modules.forEach(function (m) {
      (store.byModule[m] || []).forEach(function (it) { if (!poolSeen[it.poolId]) poolSeen[it.poolId] = 0; if (levelOK(it)) poolSeen[it.poolId]++; });
    });
    Object.keys(poolSeen).forEach(function (pid) {
      var n = poolSeen[pid];
      if (n > 0 && n < DG.items.MIN_POOL) warnings.push({ code: 'POOL_UNDER_MIN', pool: pid, available: n, min: DG.items.MIN_POOL });
    });

    /* ---- 2. cuotas por clase SRS ---- */
    var D = 0;                                             // unidades vencidas elegibles en el ámbito
    modules.forEach(function (m) { (store.unitsByModule[m] || []).forEach(function (u) { if (unitEligible(u, null, true) && clsOf(u) === 'due') D++; }); });
    var rec = st.recent || [], accNow = rec.length >= cfg.accMinSamples ? rec.reduce(function (a, b) { return a + b; }, 0) / rec.length : cfg.accTarget;
    var load = errList.length + D;                         // atraso total en huecos
    var pressure = load <= cfg.loadFree * size ? 1 : Math.max(cfg.pressureMin, 1 - (load - cfg.loadFree * size) / (cfg.loadSpan * size));
    var newShare = clamp(cfg.newShareBase + cfg.newShareGain * (accNow - cfg.accTarget), cfg.newShareMin, cfg.newShareMax) * pressure;
    if (pressure < 1) notes.push({ code: 'BACKPRESSURE', factor: +pressure.toFixed(2), errors: errList.length, due: D });
    var quota = { due: Math.min(D, Math.ceil(F * cfg.dueShareMax)), new: 0, future: 0 };
    quota.new = Math.min(Math.ceil(F * newShare), F - quota.due);
    quota.future = F - quota.due - quota.new;

    /* ---- pesos de módulo ---- */
    function skillsOf(m) { return Object.keys(st.skills).filter(function (k) { return k.indexOf(m + ':') === 0; }); }
    function moduleAcc(m) {
      var sn = 0, sa = 0;
      skillsOf(m).forEach(function (k) { var s = st.skills[k]; sn += s.n; sa += s.acc * s.n; });
      return sn >= cfg.priorMinN ? sa / sn : cfg.priorAcc;
    }
    function moduleAge(m) {
      var last = -1; skillsOf(m).forEach(function (k) { if ((st.skills[k].ls || 0) > last) last = st.skills[k].ls; });
      return last < 0 ? 10 : sessionNo - last;
    }
    var mAvail = modules.map(allowedUnitsCount);
    function reachableCells(m) {
      var cur = R.currentLevel(st, store, m); if (!cur) return 1;
      var cr = DG.items.levelRank(cur), n = 0;
      cellsByModule[m].forEach(function (c) { if (c.units.some(function (u) { return DG.items.levelRank(u.level) <= cr && unitEligible(u, null, true); })) n++; });
      return Math.max(1, n);
    }
    var mWeights = modules.map(function (m, i) {
      if (!mAvail[i]) return 0;
      var weak = Math.max(0, 1 - moduleAcc(m));
      var age = 1 + Math.min(cfg.moduleAgeMax, moduleAge(m) / cfg.moduleAgeSpan);
      return (1 + cfg.weaknessGain * weak) * age * Math.pow(reachableCells(m), cfg.cellCountExp);
    });
    modules.forEach(function (m, i) { if (!mAvail[i]) warnings.push({ code: 'MODULE_EMPTY_UNDER_CAP', module: m }); });
    var mAlloc = F > 0 ? S.largestRemainder(F, mWeights, rng, mAvail) : modules.map(function () { return 0; });

    /* ---- 4. cubos de la rampa por módulo ---- */
    var slots = [], carryOut = {}, modulePlan = {};
    modules.forEach(function (m, i) {
      var n = mAlloc[i]; if (!n) return;
      var b = R.buckets(st, store, m);
      if (!b) return;
      var thin = store.unitCount(m, b.current) < R.CFG.minUnitsStart;
      if (thin) warnings.push({ code: 'LEVEL_THIN', module: m, level: b.current, units: store.unitCount(m, b.current) });
      var sh = R.shares(b);
      modulePlan[m] = { n: n, current: b.current, hasEasier: b.easier.length > 0, hasUp: b.up.length > 0 };
      var alloc = S.allocateWithCarry(n, sh, (st.ramp[m] && st.ramp[m].carry) || {});
      carryOut[m] = alloc.carry;
      ['up', 'easier', 'current'].forEach(function (name) {
        for (var k = 0; k < alloc.counts[name]; k++) {
          slots.push({ module: m, bucket: name, levels: name === 'current' ? [b.current] : b[name], current: b.current });
        }
      });
    });

    /* ---- 5. clase → casilla → unidad → variante ---- */
    var cellCapOf = {};
    modules.forEach(function (m, i) { cellCapOf[m] = cellsByModule[m].length > 1 ? Math.max(2, Math.ceil(cfg.maxCellShare * mAlloc[i])) : Infinity; });

    function unitWeight(u) {
      var w = SRS.weight(st.units[u.unit], now);
      // La memoria de sesiones sólo frena lo NUEVO y el relleno; una unidad vencida (p. ej. intervalo 1 d, vista ayer) debe volver ya.
      if (clsOf(u) !== 'due') w *= recencyFactor(unitDist[u.unit], N);
      if (u.lemma && used.lemma[u.lemma]) w *= cfg.lemmaPenalty;
      if (u.family && used.family[u.family]) w *= cfg.familyPenalty;
      return w;
    }

    function cellBase(cell, levels, cls, relax, strict) {
      var n = 0;
      for (var i = 0; i < cell.units.length; i++) {
        var u = cell.units[i];
        if (clsOf(u) !== cls || !unitEligible(u, levels, relax >= 1)) continue;
        if (strict && !futureOK(u)) continue;
        n++;
      }
      if (!n) return 0;
      var sk = st.skills[cell.skillId];
      var age = sk && sk.ls != null ? sessionNo - sk.ls : 10;
      var ageF = 1 + Math.min(cfg.cellAgeMax, Math.pow(age / cfg.cellAgeSpan, 2));   // cuadrático: las casillas pequeñas no se quedan sin turno
      var weakF = sk && sk.n >= 5 ? 1 + cfg.weaknessGain * Math.max(0, 1 - sk.acc) : 1;
      return Math.sqrt(n) * ageF * weakF;
    }

    function chooseVariant(u) {
      var items = u.items, w = items.map(function (it) {
        if (used.item[it.id] || !levelOK(it)) return 0;
        var s = st.items[it.id], fr = s && s.a ? s.f / s.a : 0;
        var pw = 1;
        // Verbos con cambio de vocal / irregulares: las personas que delatan el cambio (du, er/sie/es) pesan ×3 y las
        // formas iguales al infinitivo ×0,5, para que la unidad no se «domine» viendo sólo wir/sie_Sie.
        if (u.hard) pw = (it.person === 'du' || it.person === 'er_sie_es') ? cfg.hardPersonBoost : (u.infIds[it.id] ? cfg.infPersonDamp : 1);
        return pw * (1 + 2 * fr) * recencyFactor(itemDist[it.id], N);
      });
      var i = sampleOne(w, rng);
      return i < 0 ? null : items[i];
    }

    function fill(spec, relax) {
      // relax 0: cubo y cuotas · 1: sin cuotas de casilla/tipo · 2: cualquier nivel permitido del módulo
      var cells = [];
      spec.modules.forEach(function (m) { cellsByModule[m].forEach(function (c) { cells.push({ m: m, cell: c }); }); });
      var levels = relax >= 2 ? null : spec.levels;
      var open = cells.filter(function (x) { return relax >= 1 || (cellUsed[x.cell.skillId] || 0) < cellCapOf[x.m]; });
      // disponibilidad por clase en el ámbito del hueco
      var avail = { due: 0, new: 0, future: 0 };
      open.forEach(function (x) {
        x.cell.units.forEach(function (u) { if (unitEligible(u, levels, relax >= 1)) avail[clsOf(u)]++; });
      });
      var cw = CLASSES.map(function (c) { return avail[c] > 0 ? Math.max(0, quota[c]) : 0; });
      var ci = sampleOne(cw, rng);
      if (ci < 0) { cw = CLASSES.map(function (c) { return avail[c] > 0 ? cfg.classPrior[c] : 0; }); ci = sampleOne(cw, rng); }
      if (ci < 0) return null;
      // probar la clase elegida y, si sus casillas no rinden, las demás (por si el tope de tipo las vació)
      // El relleno (future) no tiene motivo didáctico para repetir lo recién visto: primero se prueba en modo estricto
      // (excluye las últimas futureGap sesiones) y sólo como último recurso se permite repetir.
      var tryOrder = [{ c: CLASSES[ci], strict: true }].concat(CLASSES.filter(function (c, j) { return j !== ci && avail[c] > 0; }).map(function (c) { return { c: c, strict: true }; }));
      if (avail.future > 0) tryOrder.push({ c: 'future', strict: false });
      for (var oi = 0; oi < tryOrder.length; oi++) {
        var cls = tryOrder[oi].c, strict = tryOrder[oi].strict && cls === 'future';
        var cwt = open.map(function (x) { return cellBase(x.cell, levels, cls, relax, strict); });
        while (true) {
          var k = sampleOne(cwt, rng);
          if (k < 0) break;
          var cell = open[k].cell;
          var cands = cell.units.filter(function (u) { return clsOf(u) === cls && unitEligible(u, levels, relax >= 1) && (!strict || futureOK(u)); });
          if (!cands.length) { cwt[k] = 0; continue; }
          var ui = sampleOne(cands.map(unitWeight), rng);
          if (ui < 0) { cwt[k] = 0; continue; }
          var u = cands[ui], it = chooseVariant(u);
          if (!it) { cwt[k] = 0; continue; }
          if (quota[cls] > 0) quota[cls]--;
          take(it, relax >= 1 ? 'fallback' : spec.bucket, SRS.classify(st.units[u.unit], now));
          return it;
        }
      }
      return null;
    }

    /* ---- guarda anti-inanición: 1 hueco por sesión (si F ≥ guardMinF) para la casilla alcanzable que más sesiones lleva sin salir ---- */
    if (kind !== 'errors' && F >= cfg.guardMinF) {
      var worst = null;
      modules.forEach(function (m) {
        var cur = R.currentLevel(st, store, m); if (!cur) return;
        var cr = DG.items.levelRank(cur);
        cellsByModule[m].forEach(function (c) {
          var sk = st.skills[c.skillId], age = sessionNo - (sk && sk.ls != null ? sk.ls : 0);
          if (age <= cfg.starveSessions || (worst && age <= worst.age)) return;
          var cands = c.units.filter(function (u) { return DG.items.levelRank(u.level) <= cr && unitEligible(u, null, true); });
          if (cands.length) worst = { age: age, cell: c, m: m, cands: cands };
        });
      });
      if (worst) {
        // «mejor» unidad de la casilla sea cual sea su clase: la de mayor peso SRS/recencia que tenga alguna variante servible
        var ranked = worst.cands.map(function (u) { return { u: u, w: unitWeight(u) }; }).sort(function (a, b) { return b.w - a.w; });
        for (var gi = 0; gi < ranked.length; gi++) {
          var gu = ranked[gi].u, git = chooseVariant(gu);
          if (!git) continue;
          var si = -1;
          for (var q = 0; q < slots.length; q++) if (slots[q].module === worst.m && (si < 0 || slots[q].bucket === 'current')) si = q;
          if (si < 0) si = 0;
          if (slots.length) slots.splice(si, 1);
          var gcls = clsOf(gu); if (quota[gcls] > 0) quota[gcls]--;
          take(git, 'current', gcls);
          entries[entries.length - 1].guard = true;
          notes.push({ code: 'STARVATION_GUARD', skillId: worst.cell.skillId, sessions: worst.age });
          break;
        }
      }
    }

    var missing = [];
    rng.shuffle(slots).forEach(function (sl) {
      var ok = fill({ modules: [sl.module], levels: sl.levels, bucket: sl.bucket }, 0);
      if (!ok && sl.bucket !== 'current') ok = fill({ modules: [sl.module], levels: [sl.current], bucket: 'current' }, 0);
      if (!ok) missing.push(sl);
    });
    // Relleno por relajación progresiva (nunca viola el filtro de nivel ni repite unidades).
    var guard = 0;
    while (entries.length - errChosen < F && guard++ < size * 4) {
      var miss = missing.shift();
      var spec = miss ? { modules: [miss.module], levels: [miss.current], bucket: 'fallback' } : { modules: modules, levels: null, bucket: 'fallback' };
      var done = fill(spec, 1) || fill({ modules: spec.modules, levels: null, bucket: 'fallback' }, 2) || fill({ modules: modules, levels: null, bucket: 'fallback' }, 2);
      if (!done) break;
    }
    var fallbackN = entries.filter(function (e) { return e.bucket === 'fallback'; }).length;
    if (fallbackN) notes.push({ code: 'RELAXED', count: fallbackN });
    var expected = kind === 'errors' ? errChosen : size;
    if (entries.length < expected) warnings.push({ code: 'SHORTFALL', requested: size, delivered: entries.length });

    /* ---- 6. orden: bloques para habilidades nuevas, intercalado después ---- */
    var ordered = arrange(entries, st, rng, cfg, kind);

    var comp = { error: 0, current: 0, easier: 0, up: 0, fallback: 0, cls: { new: 0, due: 0, learning: 0, future: 0, error: 0 } };
    entries.forEach(function (e) { comp[e.bucket]++; comp.cls[e.cls]++; });
    comp.control = { newShare: +newShare.toFixed(3), pressure: +pressure.toFixed(3), accRecent: +accNow.toFixed(3), dueAvail: D, errorBacklog: errList.length };

    return { sessionNo: sessionNo, kind: kind, size: size, items: ordered, warnings: warnings, notes: notes, carry: carryOut, composition: comp, modulePlan: modulePlan };
  }

  function arrange(entries, st, rng, cfg, kind) {
    if (kind === 'errors') return rng.shuffle(entries);
    var errs = entries.filter(function (e) { return e.bucket === 'error'; });
    var rest = rng.shuffle(entries.filter(function (e) { return e.bucket !== 'error'; }));
    // chunks: bloques de habilidades nuevas (≥2 ítems de la misma skill aún poco vista) o ítems sueltos
    var groups = Object.create(null);
    rest.forEach(function (e) {
      var sk = st.skills[e.skillId];
      if (!sk || sk.n < cfg.newSkillN) (groups[e.skillId] = groups[e.skillId] || []).push(e);
    });
    var chunks = [], placed = new Set();
    rest.forEach(function (e) {
      if (placed.has(e)) return;
      var gk = groups[e.skillId];
      if (gk && gk.length > 1) { gk.forEach(function (x) { placed.add(x); }); chunks.push({ skillId: e.skillId, items: gk.slice() }); }
      else { placed.add(e); chunks.push({ skillId: e.skillId, items: [e] }); }
    });
    // intercalar: evitar la misma habilidad en chunks contiguos cuando hay alternativa
    for (var i = 1; i < chunks.length; i++) {
      if (chunks[i].skillId === chunks[i - 1].skillId) {
        for (var j = i + 1; j < chunks.length; j++) {
          if (chunks[j].skillId !== chunks[i - 1].skillId) { var t = chunks[i]; chunks[i] = chunks[j]; chunks[j] = t; break; }
        }
      }
    }
    var flat = []; chunks.forEach(function (c) { c.items.forEach(function (e) { flat.push(e); }); });
    // errores repartidos a intervalos regulares
    var out = flat.slice(), total = flat.length + errs.length;
    errs = rng.shuffle(errs);
    errs.forEach(function (e, k) {
      var pos = Math.min(out.length, Math.round(((k + 0.5) * total) / errs.length));
      out.splice(pos, 0, e);
    });
    return out;
  }

  DG.scheduler = { CFG: CFG, recencyFactor: recencyFactor, buildSession: buildSession };
  if (typeof module === 'object' && module.exports) module.exports = DG.scheduler;
})(typeof globalThis !== 'undefined' ? globalThis : this);
