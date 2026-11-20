/* dgui-voice.js — voz alemana (Web Speech API): de-DE, velocidad 0,85, voz alemana del teléfono si existe.
 * Apagada por defecto (Modo Tren). Sin DOM propio: recibe `win` (speechSynthesis + SpeechSynthesisUtterance). Probado en Node con un doble. */
(function (g) {
  'use strict';
  var V = {};
  var PRON = { ich: 'ich', du: 'du', er_sie_es: 'er', wir: 'wir', ihr: 'ihr', sie_Sie: 'sie' };
  V.RATE = 0.85; V.LANG = 'de-DE';

  // Qué se pronuncia al oír un ejercicio ya resuelto (siempre la forma CORRECTA del ítem).
  V.spokenText = function (item) {
    var a = String(item.answer || '').trim();
    if (item.module === 'verben') return item.person && PRON[item.person] ? PRON[item.person] + ' ' + a : a;
    if (item.module === 'artikel') {
      if (item.skill === 'genero') return a + ' ' + (item.lemma || '');
      if (item.skill === 'plural') return 'die ' + a;
    }
    var p = String(item.prompt || '');
    if (/_{2,}/.test(p) && item.type !== 'transform') {
      p = p.replace(/^Completa:\s*/i, '').replace(/\s*\((?:[^()]*)\)\s*$/, '').replace(/_{2,}/g, a).replace(/\s+/g, ' ').trim();
      return p;
    }
    return a;
  };

  V.create = function (win, prefs) {
    var syn = win.speechSynthesis, Utt = win.SpeechSynthesisUtterance;
    var api = {};
    api.available = function () { return !!(syn && Utt); };
    api.germanVoice = function () {
      try {
        var vs = (syn && syn.getVoices && syn.getVoices()) || [];
        return vs.filter(function (v) { return String(v.lang).toLowerCase().replace('_', '-') === 'de-de'; })[0] || vs.filter(function (v) { return /^de/i.test(v.lang); })[0] || null;
      } catch (e) { return null; }
    };
    // → {ok, reason?}
    api.speak = function (text) {
      var out = String(text == null ? '' : text).replace(/_{2,}/g, ' ').replace(/\s+/g, ' ').trim();
      if (!api.available()) return { ok: false, reason: 'unsupported' };
      if (!out) return { ok: false, reason: 'empty' };
      try {
        syn.cancel();
        var u = new Utt(out); u.lang = V.LANG; u.rate = V.RATE; u.pitch = 1;
        var v = api.germanVoice(); if (v) u.voice = v;
        syn.speak(u); return { ok: true, voice: v ? v.name : null };
      } catch (e) { return { ok: false, reason: 'error' }; }
    };
    api.speakItem = function (item) { return api.speak(V.spokenText(item)); };
    api.stop = function () { try { if (syn) syn.cancel(); } catch (e) { /* ignora */ } };
    return api;
  };
  g.DGUI = g.DGUI || {}; g.DGUI.voice = V;
  if (typeof module === 'object' && module.exports) module.exports = V;
})(typeof globalThis !== 'undefined' ? globalThis : this);
