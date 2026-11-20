/* dgui-retention.js — racha con perdón y logros sobrios (sin XP ni niveles; SPEC §2: deleite sólo donde resuelve un dolor).
 * Estado en prefs (clave dg.ui → «ret»), NO en el motor. Sin DOM: se prueba en Node.
 * Racha: se cuenta un día cuando se termina una sesión con respuestas. Si falta UN día se perdona (1 perdón por semana);
 * si faltan más, vuelve a 1. */
(function (g) {
  'use strict';
  var R = {};
  var BADGES = [
    { id: 'primera', title: 'Primera sesión', detail: 'Terminaste tu primera sesión', test: function (c) { return c.stats.sessions >= 1; } },
    { id: 'tres-dias', title: 'Tres días', detail: '3 días seguidos', test: function (c) { return c.streak >= 3; } },
    { id: 'siete-dias', title: 'Una semana', detail: '7 días seguidos', test: function (c) { return c.streak >= 7; } },
    { id: 'diez-sesiones', title: 'Diez sesiones', detail: '10 sesiones terminadas', test: function (c) { return c.stats.sessions >= 10; } },
    { id: 'primer-rescate', title: 'Primer rescate', detail: 'Acertaste algo que fallabas', test: function (c) { return c.stats.rescued >= 1; } },
    { id: 'cien-aciertos', title: 'Cien aciertos', detail: '100 respuestas correctas', test: function (c) { return c.stats.correct >= 100; } },
    { id: 'sesion-limpia', title: 'Sesión limpia', detail: 'Una sesión de 10 o más sin errores', test: function (c) { return !!c.summary && c.summary.answered >= 10 && c.summary.accuracy === 1; } }
  ];
  R.BADGES = BADGES;
  function key(ms) { var d = new Date(ms), p = function (n) { return (n < 10 ? '0' : '') + n; }; return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); }
  function dayNum(k) { var a = k.split('-'); return Math.round(Date.UTC(+a[0], +a[1] - 1, +a[2]) / 864e5); }
  R.dateKey = key;

  // prefs: {get,set}; now: () => ms
  R.create = function (prefs, now) {
    function state() { var s = prefs.get('ret'); return s && typeof s === 'object' ? s : { streak: 0, best: 0, last: null, perdon: null, badges: {} }; }
    function save(s) { prefs.set('ret', s); }
    var api = {};
    api.state = state;
    // streak mostrado: 0 si ya se rompió (faltan ≥2 días y no hay perdón posible)
    api.current = function () {
      var s = state(); if (!s.last) return { streak: 0, today: false, atRisk: false };
      var today = key(now()), gap = dayNum(today) - dayNum(s.last);
      var forgivable = !s.perdon || dayNum(today) - dayNum(s.perdon) >= 7;
      var alive = gap <= 1 || (gap === 2 && forgivable);
      return { streak: alive ? s.streak : 0, today: gap === 0, atRisk: alive && gap >= 1, best: s.best };
    };
    // Llamar al terminar una sesión con respuestas. → {streak, changed, perdonado}
    api.touch = function () {
      var s = state(), today = key(now()), out = { streak: s.streak, changed: false, perdonado: false };
      if (s.last === today) return out;
      var gap = s.last ? dayNum(today) - dayNum(s.last) : null, forgivable = !s.perdon || dayNum(today) - dayNum(s.perdon) >= 7;
      if (gap === null) s.streak = 1;
      else if (gap === 1) s.streak += 1;
      else if (gap === 2 && forgivable) { s.streak += 1; s.perdon = today; out.perdonado = true; }
      else s.streak = 1;
      s.last = today; s.best = Math.max(s.best || 0, s.streak); out.streak = s.streak; out.changed = true;
      save(s); return out;
    };
    // → ids de logros NUEVOS (ya guardados). ctx: {stats, summary}
    api.unlock = function (ctx) {
      var s = state(), cur = api.current(), c = { stats: ctx.stats || {}, summary: ctx.summary || null, streak: cur.streak }, fresh = [];
      c.stats = { sessions: c.stats.sessions || 0, rescued: c.stats.rescued || 0, correct: c.stats.correct || 0 };
      s.badges = s.badges || {};
      BADGES.forEach(function (b) { if (!s.badges[b.id] && b.test(c)) { s.badges[b.id] = key(now()); fresh.push(b); } });
      if (fresh.length) save(s);
      return fresh;
    };
    api.earned = function () { return state().badges || {}; };
    return api;
  };
  g.DGUI = g.DGUI || {}; g.DGUI.retention = R;
  if (typeof module === 'object' && module.exports) module.exports = R;
})(typeof globalThis !== 'undefined' ? globalThis : this);
