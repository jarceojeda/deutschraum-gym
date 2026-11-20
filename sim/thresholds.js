/* Umbrales de aprobación de la simulación. Cada uno lleva su origen:
 *   apriori    → fijado antes de ejecutar la simulación (criterio del diseño)
 *   relajado   → inicialmente más estricto; se relajó DESPUÉS de medir, con la razón indicada
 *   calibrado  → no existía a priori; se fijó mirando resultados (sólo detecta regresiones, no «demuestra» calidad) */
module.exports = {
  hard: { dupItems: 0, dupUnits: 0, capViolations: 0, shortfalls: 0, origin: 'apriori' },
  freshRepeat3: { max: 0.02, origin: 'apriori', note: 'unidades new/future repetidas en ≤3 sesiones (relleno sin motivo didáctico)' },
  mix: { current: [0.65, 0.75], easier: [0.15, 0.25], up: [0.06, 0.14], origin: 'apriori', note: '70/20/10 ± 5/5/4 pp, sólo en módulos con nivel fácil y reto a la vez' },
  coverageSingle: { mean: 0.90, min: 0.80, origin: 'apriori', note: 'cobertura de casillas por ventana de 20 sesiones, un solo módulo' },
  coverageMixed: { mean: 0.90, min: 0.80, origin: 'apriori (restaurado)', was: { mean: 0.85, min: 0.70, note: 'relajado en la etapa 2 tras medir .87–.91 / .76–.83' },
    note: 'restaurado en 2b: la guarda anti-inanición (1 hueco/sesión para la casilla con >10 sesiones sin salir) lo cumple con holgura; 10 semillas nuevas dan 1.000/1.000' },
  errWaitTypical: { p95: 6, max: 12, origin: 'apriori', note: 'sesiones hasta la primera reaparición de un error' },
  errWaitWeak: { p95: 15, max: 30, origin: 'calibrado', note: 'alumno débil = prueba de estrés' },
  backlogTypical: { final: 15, max: 30, origin: 'apriori' },
  backlogWeak: { max: 45, origin: 'calibrado', note: 'acotado (alumno débil)' },
  backlogWeakTrend: { slack: 3, early: [101, 150], late: [151, 200], origin: 'apriori', note: 'no creciente: atraso medio en sesiones 151–200 ≤ el de 101–150 + 3' },
  perf: { buildMeanMs: 15, origin: 'apriori' },
  stateBytes: { max: 1.5 * 1024 * 1024, origin: 'apriori' },
  levelChangesPerModule: { max: 3, origin: 'apriori', note: 'sin vaivén en 200 sesiones' },
  progress: { promotedAtLeast: 2, of: ['verben', 'artikel', 'deklination', 'praepositionen'], origin: 'calibrado', note: '≥2 de los 4 módulos que empiezan en A1 promovidos tras 200 sesiones (konnektoren empieza en A2 y no cuenta). Con el requisito «du/er» en verbos con cambio de vocal, verben tarda más de 200 sesiones en mix-12' },
  newPerSession: { min: 1.0, origin: 'calibrado', note: 'unidades nuevas introducidas por sesión (mix-12 típico)' },
  negativeControl: { memorySessions: 0, freshRepeat3Min: 0.05, origin: 'apriori', note: 'sin memoria el umbral de repetición DEBE romperse' },
  nearMiss: { neverAlmost: ['umlaut', 'dassdas'], origin: 'apriori', note: 'diéresis quitada y das↔dass nunca acaban como «almost» ni «correct»; «última letra» sólo puede ser «almost» en palabras ≥5 letras de frases' },
  rescueFast: { max: 0, origin: 'apriori', note: 'errores rescatados con <16 h desde el último fallo (escenario 3 sesiones/día)' },
  rescueFastControl: { shareMin: 0.2, origin: 'calibrado', note: 'control negativo (sin paso de aprendizaje ni 16 h): ≥20 % de los rescates son prematuros; medido ≈62 %' },
  seeds: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110], seedsNote: 'etapa 2b: 10 semillas NUEVAS (las 11–55 se usaron para calibrar en la etapa 2 y para diseñar los arreglos 2b)'
};
