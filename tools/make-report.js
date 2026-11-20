// Ejecuta los escenarios y escribe sim/REPORT.md (resultados + umbrales con su origen).
const fs = require('fs'), path = require('path');
const { runScenario, SCENARIOS } = require('../sim/simulate.js');
const T = require('../sim/thresholds.js');
const f = (x, d = 3) => x == null ? '—' : (+x).toFixed(d), pc = x => x == null ? '—' : (100 * x).toFixed(1) + ' %';
const byName = n => SCENARIOS.find(s => s.name === n);
const rows = SCENARIOS.map(sc => runScenario(sc));
const R = n => rows.find(r => r.scenario === n);
const seedRows = T.seeds.map(seed => runScenario(Object.assign({}, byName('mix-12'), { seed, name: 'mix-12@' + seed })));
const ctl = runScenario(Object.assign({}, byName('mix-12'), { memorySessions: 0, name: 'sin memoria' }));
const rescueOld = runScenario(Object.assign({}, byName('mix-12-3perday'), { name: '3perday-antiguo', srsConfig: { learnStepMs: 0 }, engineConfig: { rescueMinMs: 0 } }));
const rescue16 = runScenario(Object.assign({}, byName('mix-12-3perday'), { name: '3perday-solo-16h', srsConfig: { learnStepMs: 0 } }));
const mean = (a, [x, y]) => { const v = a.slice(x - 1, y); return v.reduce((p, c) => p + c, 0) / v.length; };
const promoted = r => T.progress.of.filter(m => r.levels[m] !== 'A1').length;
const tr = r => Object.entries(r.levelTrace || {}).map(([m, v]) => m + ':' + v.map(x => x[3]).join('>')).join(' ') || '—';
const mixS = r => r.mix ? [r.mix.current, r.mix.easier, r.mix.up].map(x => (100 * x).toFixed(1)).join(' / ') : 'n/d';
const wk = R('mix-12-weak'), wEarly = mean(wk.errBacklog.series, T.backlogWeakTrend.early), wLate = mean(wk.errBacklog.series, T.backlogWeakTrend.late);
const covMeans = seedRows.map(r => r.windowCoverage.mean), covMins = seedRows.map(r => r.windowCoverage.min);

let md = '# Simulación del motor — informe (etapa 2b)\n\n' +
  'Alumno sintético (conocimiento y estabilidad por unidad), 200 sesiones por escenario (600 en `mix-12-3perday`), reloj simulado (1 sesión = 1 día; en `3perday`, 3 sesiones/día separadas 20 min).\n' +
  'El alumno comete además casi-aciertos (30 % de sus fallos: diéresis quitada, última letra quitada, das↔dass).\n' +
  'Regenerar: `node tools/make-report.js`. Pasar/fallar: `npm test` (archivo `tests/simulation.test.js`, umbrales en `sim/thresholds.js`).\n\n' +
  '## Resultados\n\n| escenario | precisión 1.er intento | dup ítem/unidad | sobre tope | repetidos ≤3 ses. (new/future) | mezcla actual/fácil/reto | cobertura ventana 20 (media/mín) | espera error p95/máx | atraso final/máx | niveles finales | cambios de nivel | ms/sesión | estado |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|\n';
const line = r => `| ${r.scenario} | ${pc(r.accuracy)} | ${r.dupItem}/${r.dupUnit} | ${r.capViolations} | ${pc(r.freshRepeat3)} | ${mixS(r)} | ${f(r.windowCoverage.mean)} / ${f(r.windowCoverage.min)} | ${r.errWait.p95} / ${r.errWait.max} | ${r.errBacklog.final} / ${r.errBacklog.max} | ${Object.values(r.levels).join(',')} | ${tr(r)} | ${f(r.buildMs.mean, 1)} | ${(r.stateBytes / 1024).toFixed(0)} KB |\n`;
rows.forEach(r => { md += line(r); });

md += `\n### Robustez: mix-12 con ${T.seeds.length} semillas NUEVAS (${T.seeds[0]}–${T.seeds[T.seeds.length - 1]})\n\n${T.seedsNote}.\n\n| escenario | precisión | repetidos ≤3 | mezcla | cobertura (media/mín) | espera p95/máx | niveles | módulos A1 promovidos | atraso final/máx |\n|---|---|---|---|---|---|---|---|---|\n`;
seedRows.forEach(r => { md += `| ${r.scenario} | ${pc(r.accuracy)} | ${pc(r.freshRepeat3)} | ${mixS(r)} | ${f(r.windowCoverage.mean)} / ${f(r.windowCoverage.min)} | ${r.errWait.p95} / ${r.errWait.max} | ${Object.values(r.levels).join(',')} | ${promoted(r)} de ${T.progress.of.length} | ${r.errBacklog.final} / ${r.errBacklog.max} |\n`; });
md += `\nDistribución de la cobertura en las ${T.seeds.length} semillas: media ${f(Math.min(...covMeans))}–${f(Math.max(...covMeans))}, mínimo ${f(Math.min(...covMins))}–${f(Math.max(...covMins))}. Umbral restaurado: media ≥ ${T.coverageMixed.mean}, mín ≥ ${T.coverageMixed.min}.\n`;

md += '\n### Rescate de errores (3 sesiones/día)\n\n| variante | rescates | rescatados con <16 h | % |\n|---|---|---|---|\n';
[['motor 2b (paso de aprendizaje + regla de 16 h)', R('mix-12-3perday')], ['control: sólo regla de 16 h (sin paso de aprendizaje)', rescue16], ['control: comportamiento etapa 2 (sin ambos)', rescueOld]].forEach(([n, r]) => { md += `| ${n} | ${r.rescue.n} | ${r.rescue.fast} | ${r.rescue.n ? pc(r.rescue.fast / r.rescue.n) : '—'} |\n`; });
md += '\n### Casi-aciertos del alumno (errata) y veredicto del evaluador\n\n| escenario | casi-aciertos | acaban «almost» | de ellos, por tipo |\n|---|---|---|---|\n';
rows.forEach(r => { const al = Object.values(r.near.byKind).reduce((a, x) => a + x.almost, 0); md += `| ${r.scenario} | ${r.near.n} de ${r.near.fails} fallos | ${al} | ${Object.entries(r.near.byKind).map(([k, x]) => `${k}: ${x.almost}/${x.n}`).join(', ') || '—'} |\n`; });
md += '\n(«almost» sólo es posible en frases con una errata en una palabra larga; diéresis quitada y das↔dass son siempre «wrong».)\n';

md += `\n### Alumno débil (estrés)\n\n| espera de error p95 / **máx** | atraso máx | atraso medio sesiones 101–150 | atraso medio sesiones 151–200 | tendencia (≤ +${T.backlogWeakTrend.slack}) |\n|---|---|---|---|---|\n| ${wk.errWait.p95} / **${wk.errWait.max}** | ${wk.errBacklog.max} | ${f(wEarly, 1)} | ${f(wLate, 1)} | ${f(wLate - wEarly, 1)} |\n`;
md += `\n### Control negativo\n\nSin memoria de sesiones (\`memorySessions = 0\`) los repetidos cercanos suben a **${pc(ctl.freshRepeat3)}** (con memoria: ${pc(R('mix-12').freshRepeat3)}). Umbral ≤ ${pc(T.freshRepeat3.max)}: la métrica discrimina.\n\n`;

md += '## Umbrales y su origen\n\n### Duros (a priori, sin excepciones)\n\n| umbral | valor | origen | nota |\n|---|---|---|---|\n';
const add = (n, v, o, note) => { md += `| ${n} | ${v} | **${o}** | ${note || ''} |\n`; };
add('duplicados / sobre tope / incompletas', '0 / 0 / 0', T.hard.origin);
add('repetidos cercanos new/future', '≤ ' + pc(T.freshRepeat3.max), T.freshRepeat3.origin, T.freshRepeat3.note);
add('mezcla actual/fácil/reto', '65–75 / 15–25 / 6–14 %', T.mix.origin, T.mix.note);
add('rescatados con <16 h (3/día)', `${T.rescueFast.max}`, T.rescueFast.origin, T.rescueFast.note);
add('casi-aciertos que nunca son «almost»/«correct»', T.nearMiss.neverAlmost.join(', '), T.nearMiss.origin, T.nearMiss.note);
add('espera de error (típico)', `p95 ≤ ${T.errWaitTypical.p95}, máx ≤ ${T.errWaitTypical.max}`, T.errWaitTypical.origin, T.errWaitTypical.note);
add('atraso de errores (típico)', `final ≤ ${T.backlogTypical.final}, máx ≤ ${T.backlogTypical.max}`, T.backlogTypical.origin);
add('tendencia del atraso (débil)', `media 151–200 ≤ media 101–150 + ${T.backlogWeakTrend.slack}`, T.backlogWeakTrend.origin, T.backlogWeakTrend.note);
add('rendimiento / estado', `≤ ${T.perf.buildMeanMs} ms/sesión; ≤ 1.5 MB`, T.perf.origin);
add('cambios de nivel por módulo', `≤ ${T.levelChangesPerModule.max}`, T.levelChangesPerModule.origin, T.levelChangesPerModule.note);
add('control negativo (sin memoria)', `repetidos ≥ ${pc(T.negativeControl.freshRepeat3Min)}`, T.negativeControl.origin, T.negativeControl.note);
md += '\n### Restaurados / calibrados / relajados\n\n| umbral | valor | origen | nota |\n|---|---|---|---|\n';
add('cobertura (un módulo)', `media ≥ ${T.coverageSingle.mean}, mín ≥ ${T.coverageSingle.min}`, T.coverageSingle.origin, T.coverageSingle.note);
add('cobertura (mixto 5 módulos)', `media ≥ ${T.coverageMixed.mean}, mín ≥ ${T.coverageMixed.min}`, T.coverageMixed.origin, T.coverageMixed.note);
add('alumno débil: atraso y espera', `atraso máx ≤ ${T.backlogWeak.max}; espera p95 ≤ ${T.errWaitWeak.p95}, máx ≤ ${T.errWaitWeak.max}`, T.backlogWeak.origin, T.errWaitWeak.note);
add('progreso', `≥ ${T.progress.promotedAtLeast} de ${T.progress.of.length} módulos que empiezan en A1 promovidos`, T.progress.origin, T.progress.note);
add('unidades nuevas por sesión', `≥ ${T.newPerSession.min}`, T.newPerSession.origin, T.newPerSession.note);
add('control negativo 3/día', `≥ ${pc(T.rescueFastControl.shareMin)} de rescates prematuros`, T.rescueFastControl.origin, T.rescueFastControl.note);

const vb = R('mix-12').rampFinal.verben;
md += '\n## Lectura honesta\n\n' +
  '- **Duros:** 0 duplicados, 0 ítems por encima del tope, 0 sesiones incompletas, mezcla 70/20/10 dentro de ±5/5/4 pp, sin vaivén de nivel, 0 rescates con <16 h y ningún casi-acierto de diéresis o das↔dass acaba como «almost».\n' +
  `- **Cobertura restaurada (0.90/0.80):** la guarda anti-inanición (1 hueco por sesión para la casilla alcanzable con >10 sesiones sin salir) hace que, en las ${T.seeds.length} semillas nuevas, ninguna casilla alcanzable quede fuera de una ventana de 20 sesiones. Es un resultado de diseño (la guarda lo garantiza casi por construcción), no una prueba de que el reparto sin la guarda fuera bueno: con la guarda desactivada, la etapa 2 daba .87–.91 / .76–.83.\n` +
  `- **Coste pedagógico de los arreglos en verben:** exigir ≥1 acierto en du/er_sie_es en los verbos con cambio de vocal/irregulares retrasa la promoción. En mix-12, verben sigue en A1 a las 200 sesiones en las ${T.seeds.length} semillas nuevas (semilla de calibración: ${vb.mastered} de ${vb.need} unidades dominadas necesarias), mientras que en la etapa 2 llegaba a A2. En el escenario de un solo módulo (verben-20) sí asciende hasta B1. Es el efecto buscado del punto 5, pero hay que saber que existe.\n` +
  '- **Casi-aciertos:** el 30 % de los fallos del alumno son erratas; la mayoría acaba como «wrong» a propósito (diéresis y das↔dass nunca son «almost»). «almost» sólo sale en frases con una errata en una palabra larga. Límite conocido: una errata de flexión en una palabra larga dentro de una frase («ich bleibt») sigue siendo «almost».\n' +
  '- **Capacidad:** con 12 ítems/sesión el sistema introduce ≈1.3 unidades nuevas por sesión (cada unidad necesita ≈8–10 repasos). No es un fallo: es el límite del tamaño de sesión.\n' +
  '- **El alumno sintético es un modelo**, no un estudiante real: valida mecánica (repetición, cobertura, estabilidad), no eficacia pedagógica. Las cifras de precisión (≈78 %) dependen de sus parámetros.\n' +
  '- **API:** además de `saveError`, el planificador emite el aviso nuevo `ERRORS_NOT_READY` (repaso de errores con errores recién fallados, <1 h) y las entradas de sesión pueden llevar `guard: true` / la nota `STARVATION_GUARD`.\n';
md += '\n## Pruebas de mutación (etapa 2; no se repitieron en 2b)\n\n' +
  'Línea base sin mutar: 0 fallos. Cada mutación se aplicó sobre una copia y se corrió toda la suite:\n\n' +
  '| mutación | pruebas que fallan | quién la detecta |\n|---|---|---|\n' +
  '| evaluador: toda forma cerrada tolera «typo» | 3 | unitarias del evaluador, dataset ä/ö/ü, e2e jsdom |\n' +
  '| filtro de nivel siempre permite | 4 | unitarias de tope/avisos/reintentos |\n' +
  '| SRS: un fallo cuenta como nota 2 | 4 | unitaria SRS + SIM verben-20 y robustez |\n' +
  '| scheduler sin memoria (recencyFactor = 1) | 2 | unitaria de memoria + SIM robustez |\n' +
  '| scheduler: relleno sin hueco estricto (futureGap = 0) | 6 | SIM (5 escenarios + control) |\n' +
  '| scheduler: permite repetir unidad en la sesión | 6 | unitarias de unicidad + SIM |\n\n' +
  'Aviso: una mutación («sin memoria») sólo la detectan 2 pruebas. En 2b cada punto lleva su prueba «falla antes / pasa después», comprobada ejecutando los tests nuevos contra el código de la etapa 2.\n';
fs.writeFileSync(path.join(__dirname, '..', 'sim', 'REPORT.md'), md);
console.log('REPORT.md escrito');
