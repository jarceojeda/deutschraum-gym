/* dgui-sufijos.js — pistas de sufijo para el género (SPEC §3, Artikel: «pistas de sufijo después del error»).
 * Datos: ui/sufijos.json (de reglas_articulos…md). Sin DOM; se prueba en Node. Honesto: «suele ser», y avisa de las excepciones. */
(function (g) {
  'use strict';
  var S = {};
  // artículo CORRECTO del ítem de Artikel (genero: la respuesta; plural/indefinido: el artículo del enunciado o de la pista)
  S.articleOf = function (item) {
    if (item.skill === 'genero') return /^(der|die|das)$/i.test(item.answer) ? item.answer.toLowerCase() : null;
    var m = /^(der|die|das)\b/i.exec(String(item.hint || '')) || /^(der|die|das)\b/i.exec(String(item.prompt || ''));
    return m ? m[1].toLowerCase() : null;
  };
  // → {fin, art (el de la terminación), correct (el del sustantivo), coincide, ejemplos, nota, lemma} o null
  S.hint = function (item, sufijos) {
    if (!item || item.module !== 'artikel' || !item.lemma) return null;
    var art = S.articleOf(item); if (!art) return null;
    var lw = String(item.lemma).toLowerCase(), best = null;
    (sufijos || []).forEach(function (s) {
      var f = s.fin.slice(1).toLowerCase();
      if (lw.length > f.length + 1 && lw.slice(lw.length - f.length) === f && (!best || f.length > best.f.length)) best = { s: s, f: f };
    });
    if (!best) return null;
    return { fin: best.s.fin, art: best.s.art, correct: art, coincide: best.s.art === art, ejemplos: best.s.ejemplos, nota: best.s.nota, lemma: item.lemma };
  };
  g.DGUI = g.DGUI || {}; g.DGUI.sufijos = S;
  if (typeof module === 'object' && module.exports) module.exports = S;
})(typeof globalThis !== 'undefined' ? globalThis : this);
