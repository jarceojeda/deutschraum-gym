/* dg-sampler.js — muestreo ponderado SIN reemplazo y reparto de cuotas.
 * No se ordena por «puntaje + ruido»: cada extracción es una ruleta con los pesos vigentes y el
 * elegido se retira (peso 0) antes de la siguiente extracción. */
(function (g) {
  'use strict';
  var DG = (g.DG = g.DG || {});

  // Una extracción proporcional a los pesos. Devuelve índice o -1 si no queda masa.
  function drawIndex(weights, rng) {
    var total = 0, i, w;
    for (i = 0; i < weights.length; i++) { w = weights[i]; if (w > 0 && isFinite(w)) total += w; }
    if (!(total > 0)) return -1;
    var r = rng.next() * total, acc = 0, last = -1;
    for (i = 0; i < weights.length; i++) {
      w = weights[i];
      if (!(w > 0) || !isFinite(w)) continue;
      last = i; acc += w;
      if (r < acc) return i;
    }
    return last; // por redondeo de coma flotante
  }

  // k índices distintos, ponderados, sin reemplazo.
  function sampleWithoutReplacement(weights, k, rng) {
    var w = weights.slice(), out = [];
    for (var j = 0; j < k; j++) {
      var i = drawIndex(w, rng);
      if (i < 0) break;
      out.push(i); w[i] = 0;
    }
    return out;
  }

  // Reparto entero por mayor resto. caps opcional (máximo por casilla); rng desempata.
  function largestRemainder(total, weights, rng, caps) {
    var n = weights.length, res = new Array(n).fill(0), cap = caps || new Array(n).fill(Infinity);
    var active = [], i;
    for (i = 0; i < n; i++) if (weights[i] > 0 && cap[i] > 0) active.push(i);
    var left = total, guard = 0;
    while (left > 0 && active.length && guard++ < 50) {
      var sw = 0; active.forEach(function (k) { sw += weights[k]; });
      var base = {}, used = 0, rem = [];
      active.forEach(function (k) {
        var exact = left * weights[k] / sw;
        var fl = Math.min(Math.floor(exact), cap[k] - res[k]);
        base[k] = fl; used += fl;
        rem.push({ k: k, f: exact - Math.floor(exact), t: rng ? rng.next() : 0 });
      });
      active.forEach(function (k) { res[k] += base[k]; });
      left -= used;
      rem.sort(function (a, b) { return (b.f - a.f) || (b.t - a.t); });
      for (var r = 0; r < rem.length && left > 0; r++) {
        var kk = rem[r].k;
        if (res[kk] < cap[kk]) { res[kk]++; left--; }
      }
      active = active.filter(function (k) { return res[k] < cap[k]; });
    }
    return res;
  }

  // Reparto con «difusión de error»: el resto fraccional de cada casilla pasa a la siguiente sesión,
  // así la mezcla a largo plazo converge a las proporciones aunque cada sesión sea chica.
  // shares: {nombre: proporción}; carry: {nombre: resto previo}. Devuelve {counts, carry}.
  function allocateWithCarry(total, shares, carry) {
    var names = Object.keys(shares), counts = {}, newCarry = {}, used = 0, i;
    var fr = [];
    names.forEach(function (n) {
      var x = total * shares[n] + ((carry && carry[n]) || 0);
      var f = Math.max(0, Math.floor(x + 1e-9));
      counts[n] = f; used += f; fr.push({ n: n, rest: x - f });
    });
    // Si nos pasamos (restos negativos acumulados), quitar a los más sobrados.
    while (used > total) {
      fr.sort(function (a, b) { return a.rest - b.rest; });
      var hit = fr.filter(function (e) { return counts[e.n] > 0; })[0];
      if (!hit) break;
      counts[hit.n]--; hit.rest += 1; used--;
    }
    fr.sort(function (a, b) { return b.rest - a.rest; });
    for (i = 0; used < total && i < fr.length; i++) { counts[fr[i].n]++; fr[i].rest -= 1; used++; }
    fr.forEach(function (e) { newCarry[e.n] = Math.max(-1, Math.min(1, e.rest)); });
    return { counts: counts, carry: newCarry };
  }

  DG.sampler = {
    drawIndex: drawIndex,
    sampleWithoutReplacement: sampleWithoutReplacement,
    largestRemainder: largestRemainder,
    allocateWithCarry: allocateWithCarry
  };
  if (typeof module === 'object' && module.exports) module.exports = DG.sampler;
})(typeof globalThis !== 'undefined' ? globalThis : this);
