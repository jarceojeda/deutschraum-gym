/* SIM — simulación de 200 sesiones con alumno sintético. Los umbrales viven en sim/thresholds.js (con su origen). */
const test = require('node:test'), assert = require('node:assert/strict');
const { runScenario, SCENARIOS } = require('../sim/simulate.js');
const T = require('../sim/thresholds.js');
const sc = n => SCENARIOS.find(s => s.name === n);
const within = (v, [a, b], label) => assert.ok(v >= a && v <= b, `${label}=${v.toFixed(3)} fuera de [${a}, ${b}]`);
const cache = {};
const run = (name, over) => { const k = name + JSON.stringify(over || {}); return cache[k] || (cache[k] = runScenario(Object.assign({}, sc(name), over || {}))); };
const changes = r => Object.values(r.levelTrace || {}).map(v => v.length);
const promotedA1 = r => T.progress.of.filter(m => r.levels[m] !== 'A1').length;   // módulos que empiezan en A1 y ya subieron

function invariants(r, label) {
  assert.equal(r.dupItem, T.hard.dupItems, label + ': ítems repetidos en una sesión');
  assert.equal(r.dupUnit, T.hard.dupUnits, label + ': unidades repetidas en una sesión');
  assert.equal(r.capViolations, T.hard.capViolations, label + ': ítems por encima del tope de nivel');
  assert.equal(r.shortfalls, T.hard.shortfalls, label + ': sesiones incompletas');
  assert.ok(r.freshRepeat3 <= T.freshRepeat3.max, `${label}: repetidos cercanos ${(r.freshRepeat3 * 100).toFixed(1)} % > ${T.freshRepeat3.max * 100} %`);
  assert.ok(r.buildMs.mean <= T.perf.buildMeanMs, `${label}: construir sesión ${r.buildMs.mean.toFixed(1)} ms`);
  assert.ok(r.stateBytes <= T.stateBytes.max, `${label}: estado ${r.stateBytes} B`);
  changes(r).forEach(c => assert.ok(c <= T.levelChangesPerModule.max, `${label}: vaivén de nivel (${c} cambios)`));
  T.nearMiss.neverAlmost.forEach(k => { const x = r.near.byKind[k]; if (x) assert.equal(x.almost + x.correct, 0, `${label}: casi-aciertos «${k}» que acaban almost/correct: ${JSON.stringify(x)}`); });
  Object.values(r.near.byKind).forEach(x => assert.equal(x.correct, 0, label + ': un casi-acierto del alumno dio «correct»'));
  if (r.mix) { within(r.mix.current, T.mix.current, label + ' mezcla actual'); within(r.mix.easier, T.mix.easier, label + ' mezcla fácil'); within(r.mix.up, T.mix.up, label + ' mezcla reto'); }
}
const typical = (r, label) => {
  assert.ok(r.errWait.p95 <= T.errWaitTypical.p95 && r.errWait.max <= T.errWaitTypical.max, `${label}: espera de errores ${JSON.stringify(r.errWait)}`);
  assert.ok(r.errBacklog.final <= T.backlogTypical.final && r.errBacklog.max <= T.backlogTypical.max, `${label}: atraso de errores ${JSON.stringify(r.errBacklog)}`);
};

test('SIM mix-12 (alumno típico, 5 módulos): invariantes, mezcla 70/20/10, cobertura, errores, progreso', () => {
  const r = run('mix-12'); invariants(r, 'mix-12'); typical(r, 'mix-12');
  assert.ok(r.mix, 'la mezcla debe poder medirse en mix-12'); assert.ok(r.near.n >= 50, 'casi-aciertos del alumno: ' + r.near.n);
  assert.ok(r.windowCoverage.mean >= T.coverageMixed.mean && r.windowCoverage.min >= T.coverageMixed.min, JSON.stringify(r.windowCoverage));
  assert.ok(promotedA1(r) >= T.progress.promotedAtLeast, JSON.stringify(r.levels));
  assert.ok(r.accuracyByClass.new.n / r.sessions >= T.newPerSession.min, 'unidades nuevas/sesión: ' + (r.accuracyByClass.new.n / r.sessions).toFixed(2));
});
test('SIM verben-20 (un módulo): invariantes, mezcla y cobertura estricta; asciende A1→B1 sin vaivén', () => {
  const r = run('verben-20'); invariants(r, 'verben-20'); typical(r, 'verben-20');
  assert.ok(r.mix); assert.ok(r.windowCoverage.mean >= T.coverageSingle.mean && r.windowCoverage.min >= T.coverageSingle.min, JSON.stringify(r.windowCoverage));
  assert.equal(r.levels.verben, 'B1');
});
test('SIM konnektoren-12 (módulo pequeño, nivel inicial A2): invariantes y cobertura', () => {
  const r = run('konnektoren-12'); invariants(r, 'konnektoren-12'); typical(r, 'konnektoren-12');
  assert.ok(r.windowCoverage.mean >= T.coverageSingle.mean && r.windowCoverage.min >= T.coverageSingle.min, JSON.stringify(r.windowCoverage));
});
test('SIM mix-12-capA2: el tope A2 no se viola nunca y ningún módulo sube de A2', () => {
  const r = run('mix-12-capA2'); invariants(r, 'capA2'); typical(r, 'capA2');
  Object.values(r.levels).forEach(l => assert.ok(l === 'A1' || l === 'A2', 'nivel ' + l + ' con tope A2'));
  assert.ok(r.windowCoverage.mean >= T.coverageMixed.mean && r.windowCoverage.min >= T.coverageMixed.min, JSON.stringify(r.windowCoverage));
});
test('SIM mix-12-weak (alumno débil = estrés): invariantes duras, atraso acotado y sin vaivén', () => {
  const r = run('mix-12-weak'); invariants(r, 'weak');
  assert.ok(r.errBacklog.max <= T.backlogWeak.max, JSON.stringify(r.errBacklog));
  const mean = (a, b) => { const x = r.errBacklog.series.slice(a - 1, b); return x.reduce((p, c) => p + c, 0) / x.length; };
  const e = mean(...T.backlogWeakTrend.early), l = mean(...T.backlogWeakTrend.late);
  assert.ok(l <= e + T.backlogWeakTrend.slack, `atraso creciente: sesiones 101–150 media ${e.toFixed(1)}, 151–200 media ${l.toFixed(1)}`);
  assert.ok(r.errWait.p95 <= T.errWaitWeak.p95 && r.errWait.max <= T.errWaitWeak.max, JSON.stringify(r.errWait));
  assert.ok(r.windowCoverage.mean >= T.coverageMixed.mean && r.windowCoverage.min >= T.coverageMixed.min, JSON.stringify(r.windowCoverage));
});
test('SIM robustez: mix-12 con 10 semillas NUEVAS (101–110) NO usadas para calibrar cumple invariantes, mezcla y errores', () => {
  T.seeds.forEach(seed => {
    const r = run('mix-12', { seed, name: 'mix-12@' + seed }); invariants(r, 'seed ' + seed); typical(r, 'seed ' + seed);
    assert.ok(r.windowCoverage.mean >= T.coverageMixed.mean && r.windowCoverage.min >= T.coverageMixed.min, `seed ${seed}: ${JSON.stringify(r.windowCoverage)}`);
    assert.ok(promotedA1(r) >= T.progress.promotedAtLeast, `seed ${seed}: ${JSON.stringify(r.levels)}`);
  });
});
test('SIM control negativo: sin memoria de sesiones (memorySessions=0) el umbral de repetición SE ROMPE', () => {
  const r = run('mix-12', { memorySessions: T.negativeControl.memorySessions, name: 'sin-memoria' });
  assert.ok(r.freshRepeat3 >= T.negativeControl.freshRepeat3Min, `sin memoria sólo ${(r.freshRepeat3 * 100).toFixed(1)} % de repetidos: la métrica no discrimina`);
  assert.ok(r.freshRepeat3 > T.freshRepeat3.max);
});

test('SIM mix-12-3perday (3 sesiones/día separadas 20 min, 600 sesiones = 200 días): 0 errores rescatados con <16 h desde el fallo', () => {
  const r = run('mix-12-3perday'); invariants(r, '3perday'); typical(r, '3perday');
  assert.ok(r.rescue.n >= 100, 'la métrica necesita datos: ' + r.rescue.n + ' rescates');
  assert.equal(r.rescue.fast, T.rescueFast.max, `${r.rescue.fast} de ${r.rescue.n} rescatados con <16 h`);
});
test('SIM control negativo (3/día): sin paso de aprendizaje ni regla de 16 h (comportamiento de la etapa 2) la métrica SE ROMPE; sólo con la regla de 16 h ya es 0', () => {
  const old = run('mix-12-3perday', { name: '3perday-antiguo', srsConfig: { learnStepMs: 0 }, engineConfig: { rescueMinMs: 0 } });
  assert.ok(old.rescue.fast / old.rescue.n >= T.rescueFastControl.shareMin, `sólo ${old.rescue.fast}/${old.rescue.n}: la métrica no discrimina`);
  const engineOnly = run('mix-12-3perday', { name: '3perday-solo-16h', srsConfig: { learnStepMs: 0 } });
  assert.equal(engineOnly.rescue.fast, 0, 'la regla de 16 h del motor por sí sola debe bastar');
});
