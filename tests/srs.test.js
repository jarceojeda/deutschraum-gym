const test = require('node:test'), assert = require('node:assert/strict');
const { DG } = require('./helpers.js'); const SRS = DG.srs, DAY = SRS.DAY;
const rng0 = { next: () => 0.5 };   // sin fuzz efectivo

test('unidad nueva: primer acierto gradúa a 1 día; fácil a 3; difícil a 0,5', () => {
  assert.equal(SRS.update(null, 2, 0, rng0).i, 1);
  assert.equal(SRS.update(null, 3, 0, rng0).i, 3);
  assert.equal(SRS.update(null, 1, 0, rng0).i, 0.5);
});
test('los intervalos crecen con aciertos sucesivos y se topan en maxInterval', () => {
  let s = null, t = 0, prev = 0;
  for (let k = 0; k < 14; k++) { s = SRS.update(s, 2, t, rng0); assert.ok(s.i >= prev, 'k=' + k); prev = s.i; t = s.d; }
  assert.ok(s.i <= SRS.CFG.maxInterval && s.i >= 100, 'i=' + s.i);
});
test('fallo en repaso: lapse, ease baja, intervalo se reduce y vuelve disponible en 1 h', () => {
  let s = null, t = 0; for (let k = 0; k < 4; k++) { s = SRS.update(s, 2, t, rng0); t = s.d; }
  const before = s, f = SRS.update(s, 0, t, rng0);
  assert.equal(f.l, 1); assert.ok(f.e < before.e); assert.ok(f.i < before.i); assert.equal(f.s, 'x'); assert.equal(f.d, t + SRS.CFG.learnStepMs);
  const back = SRS.update(f, 2, f.d, rng0); assert.equal(back.s, 'r'); assert.ok(back.i >= 1);
});
test('fallo en unidad nueva: queda en aprendizaje, no gradúa', () => {
  const f = SRS.update(null, 0, 0, rng0); assert.equal(f.s, 'l'); assert.equal(f.f, 1);
  assert.equal(SRS.classify(f, 10), 'learning'); assert.equal(SRS.classify(f, SRS.CFG.learnStepMs + 1), 'due');
});
test('ease nunca baja de 1,3 ni sube de 3,0', () => {
  let s = null, t = 0; for (let k = 0; k < 30; k++) { s = SRS.update(s, k % 2 ? 0 : 1, t, rng0); t = s.d; }
  assert.ok(s.e >= SRS.CFG.easeMin);
  let h = null; t = 0; for (let k = 0; k < 40; k++) { h = SRS.update(h, 3, t, rng0); t = h.d; }
  assert.ok(h.e <= SRS.CFG.easeMax);
});
test('fuzz acotado a ±5 %: cota exacta en los extremos del generador', () => {
  // Estado con intervalo ≥3 d para que se aplique fuzz; comparar contra el resultado sin fuzz (rng=0,5 → factor 1).
  let s = null, t = 0; for (let k = 0; k < 3; k++) { s = SRS.update(s, 2, t, rng0); t = s.d; }
  const base = SRS.update(s, 2, t, rng0).i;
  const lo = SRS.update(s, 2, t, { next: () => 0 }).i, hi = SRS.update(s, 2, t, { next: () => 0.999999 }).i;
  assert.ok(base >= 3);
  assert.ok(Math.abs(lo / base - 0.95) < 1e-6, 'lo=' + lo / base); assert.ok(Math.abs(hi / base - 1.05) < 1e-3, 'hi=' + hi / base);
  const r = DG.rng.create(3);
  for (let k = 0; k < 500; k++) { const x = SRS.update(s, 2, t, r).i / base; assert.ok(x >= 0.95 - 1e-9 && x <= 1.05 + 1e-9); }
});
test('pesos: aprendiendo/vencida > nueva > futura reciente; el atraso pesa más', () => {
  const now = 100 * DAY;
  const learning = { s: 'x', d: now - 1, t: now - 1e6, i: 2, r: 3, e: 2, l: 1, n: 5, f: 1 };
  const due = { s: 'r', d: now - 1 * DAY, t: now - 3 * DAY, i: 2, r: 3, e: 2, l: 0, n: 3, f: 0 };
  const dueLate = Object.assign({}, due, { d: now - 6 * DAY });
  const fut = { s: 'r', d: now + 20 * DAY, t: now - DAY, i: 21, r: 4, e: 2, l: 0, n: 4, f: 0 };
  const W = s => SRS.weight(s, now);
  assert.ok(W(learning) > W(due) && W(dueLate) > W(due));
  assert.ok(W(due) > W(null)); assert.ok(W(null) > W(fut));
  const nearly = Object.assign({}, fut, { d: now + 1 * DAY, t: now - 20 * DAY });
  assert.ok(W(nearly) > W(fut));
});
test('gradeFor: sólo el primer intento decide; «casi» = difícil', () => {
  assert.equal(SRS.gradeFor('wrong', false), 0); assert.equal(SRS.gradeFor('correct', true), 1); assert.equal(SRS.gradeFor('correct', false), 2); assert.equal(SRS.gradeFor('correct', false, true), 3);
});
