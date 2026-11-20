/* dgui-tablas.js — tablas de referencia que se RETIRAN (Deklination): completa → media tabla → ninguna.
 * Datos: ui/tablas.json (§11 de aleman_declination_master). Sin DOM; se prueba en Node.
 * Retirada por dominio de ese tipo de error (errorTag): n<3 intentos → completa; dominado (≥6 y ≥85 %) → ninguna; entre medias → media
 * (se ocultan las celdas de la mitad de la tabla que contiene la respuesta: queda el contraste, no la respuesta).
 * Tras fallar se muestra siempre la tabla completa con la casilla marcada y la cadena caso → casilla → forma. */
(function (g) {
  'use strict';
  var T = {};
  var ROW = { nominative: 'Nom', accusative: 'Akk', dative: 'Dat', genitive: 'Gen' };
  var CASE_LABEL = { nominative: 'nominativo', accusative: 'acusativo', dative: 'dativo', genitive: 'genitivo' };
  var COL_LABEL = { M: 'masculino', F: 'femenino', N: 'neutro', PL: 'plural' };
  T.COL_LABEL = COL_LABEL;

  // caso gramatical de la RESPUESTA según el errorTag del ítem (null si el tag no lo dice)
  T.caseKey = function (item) {
    var tag = String(item.errorTag || ''), m = /(nominative|accusative|dative|genitive)/.exec(tag);
    if (m) return m[1];
    if (/^genitiv/.test(tag)) return 'genitive';
    if (/^dativ-plural/.test(tag)) return 'dative';
    return null;
  };
  function matches(item, table, cell, skill) {
    var a = String(item.answer).toLowerCase(); cell = String(cell).toLowerCase();   // «Die» a principio de frase = die
    if (/^adjektivendung/.test(skill)) return cell === '-' + a;
    if (skill === 'kasus-possessive_article') {      // la tabla es de ein-: se compara la TERMINACIÓN (mein-en ≈ ein-en, unser-e ≈ ein-e)
      if (cell === '—' || cell.slice(0, 3) !== 'ein') return false;
      var m = /^(unser|euer|eur|mein|dein|sein|ihr)(.*)$/i.exec(a);
      return !!m && m[2] === cell.slice(3);
    }
    return cell === a;
  }
  // Qué tabla ayuda a este ítem (id de tablas.json) o null.
  T.tableId = function (item, tablas) {
    var s = item.skill, a = String(item.answer || '').toLowerCase();
    if (/^adjektivendung-(weak|mixed|strong)$/.test(s)) return { weak: 's11-3', mixed: 's11-4', strong: 's11-5' }[s.split('-')[1]];
    if (s === 'kasus-possessive_article') return 's11-2';
    if (s === 'relativpronomen') return 's11-6';
    if (s === 'kasus-article' || s === 'kasus-two_way_preposition' || s === 'genitiv-article' || s === 'kasus-predicate_noun') {
      var has = function (id) { return tablas[id] && tablas[id].rows.some(function (r) { return r.celdas.indexOf(a) >= 0; }); };   // celdas ya en minúscula
      if (has('s11-1')) return 's11-1';
      if (has('s11-2')) return 's11-2';
    }
    return null;
  };
  // Casilla de la respuesta: {r: fila, cols: [columnas posibles]} o null. Primero en la fila del caso; si no, en cualquier fila.
  T.locate = function (item, table, id) {
    var skill = item.skill, ck = T.caseKey(item), rows = table.rows, order = [];
    if (ck) rows.forEach(function (r, i) { if (r.caso === ROW[ck]) order.push(i); });
    rows.forEach(function (r, i) { if (order.indexOf(i) < 0) order.push(i); });
    for (var k = 0; k < order.length; k++) {
      var r = order[k], cols = [];
      rows[r].celdas.forEach(function (c, j) { if (matches(item, table, c, skill)) cols.push(j); });
      if (cols.length) return { r: r, cols: cols };
    }
    return null;
  };
  // Nivel de ayuda según el dominio del tipo de error: 'completa' | 'media' | 'ninguna'
  T.level = function (stats) {
    var n = stats ? stats.n : 0, f = stats ? stats.f : 0;
    if (n >= 6 && (n - f) / n >= 0.85) return 'ninguna';
    return n < 3 ? 'completa' : 'media';
  };
  // Filas ocultas en «media tabla»: la mitad (Nom/Akk o Dat/Gen) que contiene la respuesta
  T.maskedRows = function (loc, table) {
    var half = loc && loc.r >= 2 ? [2, 3] : [0, 1];
    return half.filter(function (i) { return i < table.rows.length; });
  };
  // Cadena de decisión (motor de 4 movimientos, pasos con dato): caso → casilla → forma
  T.chain = function (item, table, loc) {
    var ck = T.caseKey(item), steps = [];
    if (ck) steps.push({ k: 'Caso', v: CASE_LABEL[ck], caseKey: ck });
    if (loc) steps.push({ k: 'Casilla', v: loc.cols.map(function (j) { return COL_LABEL[table.cols[j]] || table.cols[j]; }).join(' / ') });
    if (loc) steps.push({ k: 'Forma', v: table.rows[loc.r].celdas[loc.cols[0]] });
    return steps;
  };
  g.DGUI = g.DGUI || {}; g.DGUI.tablas = T;
  if (typeof module === 'object' && module.exports) module.exports = T;
})(typeof globalThis !== 'undefined' ? globalThis : this);
