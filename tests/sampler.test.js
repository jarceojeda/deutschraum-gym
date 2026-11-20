const test = require('node:test'), assert = require('node:assert/strict');
const { DG } = require('./helpers.js'); const S = DG.sampler;

test('drawIndex es proporcional a los pesos (chi²)', () => {
  const rng = DG.rng.create(1), w = [1, 2, 3, 4], N = 40000, c = [0, 0, 0, 0];
  for (let i = 0; i < N; i++) c[S.drawIndex(w, rng)]++;
  const tot = 10; let chi = 0; w.forEach((x, i) => { const e = N * x / tot; chi += (c[i] - e) ** 2 / e; });
  assert.ok(chi < 16.3, 'chi² = ' + chi.toFixed(2)); // gl=3, p=0.001
});
test('sin reemplazo: probabilidades de inclusión exactas para k=2', () => {
  // Con pesos 1,2,3,4: P(i incluido) = p_i + Σ_{j≠i} p_j·p_i/(1-p_j)
  const w = [1, 2, 3, 4], tot = 10, p = w.map(x => x / tot);
  const exact = p.map((pi, i) => pi + p.reduce((s, pj, j) => j === i ? s : s + pj * pi / (1 - pj), 0));
  const rng = DG.rng.create(2), N = 40000, inc = [0, 0, 0, 0];
  for (let t = 0; t < N; t++) S.sampleWithoutReplacement(w, 2, rng).forEach(i => inc[i]++);
  exact.forEach((e, i) => assert.ok(Math.abs(inc[i] / N - e) < 0.012, `i=${i} obs=${(inc[i] / N).toFixed(3)} exp=${e.toFixed(3)}`));
});
test('sin reemplazo: nunca repite índice, nunca elige peso 0, y se corta si no hay masa', () => {
  const rng = DG.rng.create(3);
  for (let t = 0; t < 500; t++) {
    const r = S.sampleWithoutReplacement([0, 5, 0, 1, 1, 0], 5, rng);
    assert.equal(new Set(r).size, r.length);
    assert.ok(r.every(i => [1, 3, 4].includes(i)));
    assert.equal(r.length, 3);
  }
  assert.deepEqual(S.sampleWithoutReplacement([0, 0], 2, rng), []);
});
test('largestRemainder: suma exacta, respeta topes y reparte el sobrante', () => {
  const rng = DG.rng.create(4);
  const a = S.largestRemainder(10, [7, 2, 1], rng); assert.equal(a.reduce((x, y) => x + y), 10); assert.deepEqual(a, [7, 2, 1]);
  const b = S.largestRemainder(10, [1, 1, 1], rng); assert.equal(b.reduce((x, y) => x + y), 10); assert.ok(b.every(x => x >= 3 && x <= 4));
  const c = S.largestRemainder(10, [5, 1, 1], rng, [2, 10, 10]); assert.equal(c.reduce((x, y) => x + y), 10); assert.equal(c[0], 2);
  const d = S.largestRemainder(10, [1, 1], rng, [2, 3]); assert.equal(d.reduce((x, y) => x + y), 5); // no hay más capacidad
});
test('allocateWithCarry: con 3 huecos por sesión la mezcla converge a 70/20/10', () => {
  let carry = {}, tot = { current: 0, easier: 0, up: 0 }, S_ = 3000;
  for (let i = 0; i < S_; i++) { const r = S.allocateWithCarry(3, { current: .7, easier: .2, up: .1 }, carry); carry = r.carry; for (const k in r.counts) tot[k] += r.counts[k]; assert.equal(Object.values(r.counts).reduce((x, y) => x + y), 3); }
  const n = S_ * 3;
  assert.ok(Math.abs(tot.current / n - .7) < .005 && Math.abs(tot.easier / n - .2) < .005 && Math.abs(tot.up / n - .1) < .005, JSON.stringify(tot));
});
test('rng: sin semilla NO es determinista (no atado a la fecha); con semilla sí', () => {
  const a = DG.rng.create(), b = DG.rng.create();
  assert.equal(a.deterministic, false); assert.notEqual(a.seed, b.seed);
  const x = DG.rng.create(9), y = DG.rng.create(9);
  assert.deepEqual([x.next(), x.next(), x.next()], [y.next(), y.next(), y.next()]);
});
