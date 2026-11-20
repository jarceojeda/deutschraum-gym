/* dg-text.js — comparación de texto segura para alemán.
 * REGLA: nunca se usa NFD ni se eliminan diacríticos con regex de rango combinante.
 * ä/ö/ü/ß se conservan; solo se usa NFC + minúsculas + mapas explícitos. */
(function (g) {
  'use strict';
  var DG = (g.DG = g.DG || {});

  function nfc(s) { return String(s == null ? '' : s).normalize('NFC'); }

  // Comillas/apóstrofos tipográficos → ASCII; espacios raros → espacio normal.
  function unifyChars(s) {
    return s
      .replace(/[‘’‛′´`]/g, "'")
      .replace(/[“”„‟«»]/g, '"')
      .replace(/[–—]/g, '-')
      .replace(/[  -   　\t\r\n]+/g, ' ')
      .replace(/[​-‍﻿]/g, '');
  }

  // Minúsculas: 'ß' se queda 'ß' y 'ẞ' (U+1E9E) pasa a 'ß'. Nunca toUpperCase (ß→SS).
  function fold(s) {
    return unifyChars(nfc(s)).toLowerCase().replace(/\s+/g, ' ').trim();
  }

  var TRANSLIT = { 'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss' };
  // Equivalencia de teclado sin ä/ö/ü/ß (ae/oe/ue/ss). Sólo se usa para ACEPTAR con nota.
  function translit(s) {
    return fold(s).replace(/[äöüß]/g, function (m) { return TRANSLIT[m]; });
  }

  var DROP = { 'ä': 'a', 'ö': 'o', 'ü': 'u', 'Ä': 'A', 'Ö': 'O', 'Ü': 'U' };
  // Quita la diéresis con un mapa explícito (NO NFD). Sólo sirve para detectar «casi».
  function dropUmlaut(s) { return fold(s).replace(/[äöü]/g, function (m) { return DROP[m]; }); }

  function stripTerminal(s) { return s.replace(/[\s.!?;:]+$/g, '').trim(); }
  function stripPunct(s) { return s.replace(/[.,!?;:"'()…]/g, ' ').replace(/\s+/g, ' ').trim(); }
  function normSentence(s) { return stripPunct(fold(s)); }

  // Distancia de Damerau-Levenshtein (variante OSA): inserción, borrado, sustitución, transposición.
  function osa(a, b) {
    var al = a.length, bl = b.length;
    if (al === 0) return bl;
    if (bl === 0) return al;
    var d = [], i, j;
    for (i = 0; i <= al; i++) { d[i] = new Array(bl + 1); d[i][0] = i; }
    for (j = 0; j <= bl; j++) d[0][j] = j;
    for (i = 1; i <= al; i++) {
      for (j = 1; j <= bl; j++) {
        var c = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + c);
        if (i > 1 && j > 1 && a.charCodeAt(i - 1) === b.charCodeAt(j - 2) && a.charCodeAt(i - 2) === b.charCodeAt(j - 1)) {
          d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
        }
      }
    }
    return d[al][bl];
  }

  // Une fichas de «ordena la frase»: espacio entre palabras, signos pegados a la anterior.
  function joinTiles(tiles) {
    var out = '';
    for (var i = 0; i < tiles.length; i++) {
      var t = String(tiles[i]);
      if (i > 0 && !/^[,.;:!?)…]$/.test(t)) out += ' ';
      out += t;
    }
    return out;
  }

  DG.text = {
    nfc: nfc, fold: fold, translit: translit, dropUmlaut: dropUmlaut,
    stripTerminal: stripTerminal, stripPunct: stripPunct, normSentence: normSentence,
    osa: osa, joinTiles: joinTiles, unifyChars: unifyChars
  };
  if (typeof module === 'object' && module.exports) module.exports = DG.text;
})(typeof globalThis !== 'undefined' ? globalThis : this);
