/* dg-srs.js — repaso espaciado por UNIDAD de habilidad (no por palabra).
 * Una unidad es «fahren · presente», «fahren · Partizip II», «fahren · Präteritum»… (ver dg-items.js).
 * Variante de SM-2 con pasos de aprendizaje, tope de intervalo (examen en meses) y fuzz.
 *
 * Estado de unidad: { r reps, l lapses, e ease, i intervalo (días), d vence (ms), t último (ms),
 *                     s 'l' aprendiendo | 'r' repaso | 'x' reaprendiendo, n intentos, f fallos }
 * Calificación: 0 otra vez · 1 difícil · 2 bien · 3 fácil. */
(function (g) {
  'use strict';
  var DG = (g.DG = g.DG || {});

  var DAY = 86400000;
  var CFG = {
    learnStepMs: 3600000,       // tras un fallo, la unidad vuelve a estar disponible en 1 h
    easeStart: 2.3, easeMin: 1.3, easeMax: 3.0,
    hardFactor: 1.2, easyBonus: 1.3, lapseFactor: 0.25,
    firstGood: 1, firstEasy: 3, firstHard: 0.5,
    maxInterval: 120, fuzz: 0.05,
    wNew: 1.0, wLearning: 6, wLearningWait: 1.5, wDueBase: 4, wDueSpan: 4, wFutureMin: 0.1
  };

  function fresh(cfg) {
    cfg = cfg || CFG;
    return { r: 0, l: 0, e: cfg.easeStart, i: 0, d: 0, t: 0, s: 'l', n: 0, f: 0 };
  }

  // Del resultado del ítem a calificación.
  //  first: veredicto del primer intento ('correct' | 'wrong'); usedAlmost: hubo un «casi» antes de acertar.
  function gradeFor(first, usedAlmost, fast) {
    if (first !== 'correct') return 0;
    if (usedAlmost) return 1;
    return fast ? 3 : 2;
  }

  function update(st, grade, now, rng, cfg) {
    cfg = cfg || CFG;
    var s = st ? Object.assign({}, st) : fresh(cfg);
    s.n++; s.t = now;
    if (grade === 0) {
      s.f++;
      if (s.s === 'r' || s.s === 'x') {
        s.l++; s.e = Math.max(cfg.easeMin, s.e - 0.2);
        s.i = Math.max(1, Math.round(s.i * cfg.lapseFactor));
        s.s = 'x';
      } else { s.s = 'l'; s.i = 0; }
      s.d = now + cfg.learnStepMs;
      return s;
    }
    if (s.s === 'l') {
      s.r = 1; s.s = 'r';
      s.i = grade === 3 ? cfg.firstEasy : (grade === 1 ? cfg.firstHard : cfg.firstGood);
    } else if (s.s === 'x') {
      s.s = 'r'; s.r++;
      s.i = Math.max(1, s.i * (grade === 3 ? 1.5 : 1));
    } else {
      s.r++;
      if (grade === 1) { s.i = Math.max(1, Math.round(s.i * cfg.hardFactor)); s.e = Math.max(cfg.easeMin, s.e - 0.15); }
      else if (grade === 2) { s.i = Math.max(s.i + 1, Math.round(s.i * s.e)); }
      else { s.i = Math.max(s.i + 1, Math.round(s.i * s.e * cfg.easyBonus)); s.e = Math.min(cfg.easeMax, s.e + 0.15); }
    }
    if (s.i >= 3 && rng) s.i = s.i * (1 + (rng.next() * 2 - 1) * cfg.fuzz);
    s.i = Math.min(s.i, cfg.maxInterval);
    s.d = now + s.i * DAY;
    return s;
  }

  // 'new' | 'learning' | 'due' | 'future'
  function classify(st, now) {
    if (!st) return 'new';
    if (st.s === 'l' || st.s === 'x') return now >= st.d ? 'due' : 'learning';
    return now >= st.d ? 'due' : 'future';
  }

  function overdueRatio(st, now) {
    if (!st || now < st.d) return 0;
    return (now - st.d) / Math.max(DAY * 0.5, (st.i || 1) * DAY);
  }

  // Peso de muestreo según estado SRS (sin penalizaciones de memoria/cuotas).
  function weight(st, now, cfg) {
    cfg = cfg || CFG;
    var c = classify(st, now);
    if (c === 'new') return cfg.wNew;
    if (c === 'learning') return cfg.wLearningWait;
    if (c === 'due') {
      if (st.s === 'l' || st.s === 'x') return cfg.wLearning;
      return cfg.wDueBase + cfg.wDueSpan * Math.min(2, overdueRatio(st, now)) / 2;
    }
    var span = Math.max(1, st.d - st.t), p = Math.min(1, Math.max(0, (now - st.t) / span));
    return cfg.wFutureMin + (1 - cfg.wFutureMin) * p * p * 0.5;
  }

  DG.srs = { CFG: CFG, DAY: DAY, fresh: fresh, gradeFor: gradeFor, update: update, classify: classify,
    overdueRatio: overdueRatio, weight: weight };
  if (typeof module === 'object' && module.exports) module.exports = DG.srs;
})(typeof globalThis !== 'undefined' ? globalThis : this);
