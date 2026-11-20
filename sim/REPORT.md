# Simulación del motor — informe (etapa 2b)

Alumno sintético (conocimiento y estabilidad por unidad), 200 sesiones por escenario (600 en `mix-12-3perday`), reloj simulado (1 sesión = 1 día; en `3perday`, 3 sesiones/día separadas 20 min).
El alumno comete además casi-aciertos (30 % de sus fallos: diéresis quitada, última letra quitada, das↔dass).
Regenerar: `node tools/make-report.js`. Pasar/fallar: `npm test` (archivo `tests/simulation.test.js`, umbrales en `sim/thresholds.js`).

## Resultados

| escenario | precisión 1.er intento | dup ítem/unidad | sobre tope | repetidos ≤3 ses. (new/future) | mezcla actual/fácil/reto | cobertura ventana 20 (media/mín) | espera error p95/máx | atraso final/máx | niveles finales | cambios de nivel | ms/sesión | estado |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| mix-12 | 77.8 % | 0/0 | 0 | 0.0 % | 70.1 / 20.1 / 9.9 | 1.000 / 1.000 | 3 / 5 | 6 / 9 | A1,A2,A2,A2,B1 | konnektoren:B1 deklination:A2 praepositionen:A2 artikel:A2 | 3.9 | 70 KB |
| verben-20 | 79.6 % | 0/0 | 0 | 0.0 % | 70.3 / 19.4 / 10.3 | 1.000 / 1.000 | 2 / 5 | 2 / 12 | B1 | verben:A2>B1 | 2.6 | 126 KB |
| konnektoren-12 | 82.7 % | 0/0 | 0 | 0.0 % | n/d | 1.000 / 1.000 | 2 / 4 | 3 / 7 | B1 | konnektoren:B1 | 0.7 | 43 KB |
| mix-12-capA2 | 77.4 % | 0/0 | 0 | 0.0 % | n/d | 1.000 / 1.000 | 3 / 7 | 3 / 10 | A1,A2,A2,A2,A2 | artikel:A2 deklination:A2 praepositionen:A2 | 2.8 | 67 KB |
| mix-12-weak | 65.6 % | 0/0 | 0 | 0.0 % | 69.8 / 20.6 / 9.5 | 1.000 / 1.000 | 13 / 28 | 27 / 28 | A1,A1,A1,A2,B1 | praepositionen:A2 konnektoren:B1 | 2.9 | 64 KB |
| mix-12-3perday | 80.3 % | 0/0 | 0 | 0.0 % | 70.0 / 20.0 / 10.0 | 0.982 / 0.895 | 4 / 10 | 8 / 17 | B1,B1,B1,B1,B1 | konnektoren:B1 praepositionen:A2>B1 deklination:A2>B1 artikel:A2>B1 verben:A2>B1 | 3.0 | 177 KB |

### Robustez: mix-12 con 10 semillas NUEVAS (101–110)

etapa 2b: 10 semillas NUEVAS (las 11–55 se usaron para calibrar en la etapa 2 y para diseñar los arreglos 2b).

| escenario | precisión | repetidos ≤3 | mezcla | cobertura (media/mín) | espera p95/máx | niveles | módulos A1 promovidos | atraso final/máx |
|---|---|---|---|---|---|---|---|---|
| mix-12@101 | 78.0 % | 0.0 % | 70.0 / 20.1 / 9.8 | 1.000 / 1.000 | 3 / 4 | A1,A2,A2,A2,B1 | 3 de 4 | 3 / 9 |
| mix-12@102 | 78.1 % | 0.0 % | 70.3 / 19.9 / 9.8 | 1.000 / 1.000 | 3 / 5 | A1,A2,A2,A2,B1 | 3 de 4 | 2 / 9 |
| mix-12@103 | 77.3 % | 0.0 % | 69.9 / 19.9 / 10.1 | 1.000 / 1.000 | 3 / 8 | A1,A2,A2,A2,B1 | 3 de 4 | 11 / 11 |
| mix-12@104 | 77.3 % | 0.0 % | 70.0 / 20.0 / 10.1 | 1.000 / 1.000 | 4 / 7 | A1,A2,A2,A2,B1 | 3 de 4 | 1 / 9 |
| mix-12@105 | 77.5 % | 0.0 % | 69.7 / 20.7 / 9.6 | 1.000 / 1.000 | 3 / 7 | A1,A2,A2,A2,B1 | 3 de 4 | 4 / 11 |
| mix-12@106 | 77.6 % | 0.0 % | 69.9 / 19.9 / 10.3 | 1.000 / 1.000 | 3 / 5 | A1,A2,A2,A2,B1 | 3 de 4 | 6 / 8 |
| mix-12@107 | 77.9 % | 0.0 % | 70.1 / 20.1 / 9.8 | 1.000 / 1.000 | 2 / 5 | A1,A2,A2,A2,B1 | 3 de 4 | 3 / 9 |
| mix-12@108 | 78.0 % | 0.0 % | 69.9 / 20.0 / 10.0 | 1.000 / 1.000 | 3 / 7 | A1,A2,A2,A2,B1 | 3 de 4 | 1 / 9 |
| mix-12@109 | 78.1 % | 0.0 % | 69.8 / 20.2 / 10.0 | 1.000 / 1.000 | 3 / 5 | A1,A2,A2,A2,B1 | 3 de 4 | 0 / 8 |
| mix-12@110 | 77.8 % | 0.0 % | 70.1 / 20.1 / 9.8 | 1.000 / 1.000 | 3 / 8 | A1,A2,A2,A2,B1 | 3 de 4 | 1 / 10 |

Distribución de la cobertura en las 10 semillas: media 1.000–1.000, mínimo 1.000–1.000. Umbral restaurado: media ≥ 0.9, mín ≥ 0.8.

### Rescate de errores (3 sesiones/día)

| variante | rescates | rescatados con <16 h | % |
|---|---|---|---|
| motor 2b (paso de aprendizaje + regla de 16 h) | 1088 | 0 | 0.0 % |
| control: sólo regla de 16 h (sin paso de aprendizaje) | 1011 | 0 | 0.0 % |
| control: comportamiento etapa 2 (sin ambos) | 1086 | 697 | 64.2 % |

### Casi-aciertos del alumno (errata) y veredicto del evaluador

| escenario | casi-aciertos | acaban «almost» | de ellos, por tipo |
|---|---|---|---|
| mix-12 | 153 de 532 fallos | 11 | lastletter: 11/146, umlaut: 0/7 |
| verben-20 | 242 de 815 fallos | 0 | lastletter: 0/229, umlaut: 0/13 |
| konnektoren-12 | 111 de 416 fallos | 20 | lastletter: 20/99, umlaut: 0/9, dassdas: 0/3 |
| mix-12-capA2 | 153 de 542 fallos | 15 | lastletter: 15/144, umlaut: 0/6, dassdas: 0/3 |
| mix-12-weak | 245 de 826 fallos | 25 | lastletter: 25/229, umlaut: 0/11, dassdas: 0/5 |
| mix-12-3perday | 378 de 1416 fallos | 27 | lastletter: 27/346, dassdas: 0/10, umlaut: 0/22 |

(«almost» sólo es posible en frases con una errata en una palabra larga; diéresis quitada y das↔dass son siempre «wrong».)

### Alumno débil (estrés)

| espera de error p95 / **máx** | atraso máx | atraso medio sesiones 101–150 | atraso medio sesiones 151–200 | tendencia (≤ +3) |
|---|---|---|---|---|
| 13 / **28** | 28 | 22.3 | 21.9 | -0.4 |

### Control negativo

Sin memoria de sesiones (`memorySessions = 0`) los repetidos cercanos suben a **18.9 %** (con memoria: 0.0 %). Umbral ≤ 2.0 %: la métrica discrimina.

## Umbrales y su origen

### Duros (a priori, sin excepciones)

| umbral | valor | origen | nota |
|---|---|---|---|
| duplicados / sobre tope / incompletas | 0 / 0 / 0 | **apriori** |  |
| repetidos cercanos new/future | ≤ 2.0 % | **apriori** | unidades new/future repetidas en ≤3 sesiones (relleno sin motivo didáctico) |
| mezcla actual/fácil/reto | 65–75 / 15–25 / 6–14 % | **apriori** | 70/20/10 ± 5/5/4 pp, sólo en módulos con nivel fácil y reto a la vez |
| rescatados con <16 h (3/día) | 0 | **apriori** | errores rescatados con <16 h desde el último fallo (escenario 3 sesiones/día) |
| casi-aciertos que nunca son «almost»/«correct» | umlaut, dassdas | **apriori** | diéresis quitada y das↔dass nunca acaban como «almost» ni «correct»; «última letra» sólo puede ser «almost» en palabras ≥5 letras de frases |
| espera de error (típico) | p95 ≤ 6, máx ≤ 12 | **apriori** | sesiones hasta la primera reaparición de un error |
| atraso de errores (típico) | final ≤ 15, máx ≤ 30 | **apriori** |  |
| tendencia del atraso (débil) | media 151–200 ≤ media 101–150 + 3 | **apriori** | no creciente: atraso medio en sesiones 151–200 ≤ el de 101–150 + 3 |
| rendimiento / estado | ≤ 15 ms/sesión; ≤ 1.5 MB | **apriori** |  |
| cambios de nivel por módulo | ≤ 3 | **apriori** | sin vaivén en 200 sesiones |
| control negativo (sin memoria) | repetidos ≥ 5.0 % | **apriori** | sin memoria el umbral de repetición DEBE romperse |

### Restaurados / calibrados / relajados

| umbral | valor | origen | nota |
|---|---|---|---|
| cobertura (un módulo) | media ≥ 0.9, mín ≥ 0.8 | **apriori** | cobertura de casillas por ventana de 20 sesiones, un solo módulo |
| cobertura (mixto 5 módulos) | media ≥ 0.9, mín ≥ 0.8 | **apriori (restaurado)** | restaurado en 2b: la guarda anti-inanición (1 hueco/sesión para la casilla con >10 sesiones sin salir) lo cumple con holgura; 10 semillas nuevas dan 1.000/1.000 |
| alumno débil: atraso y espera | atraso máx ≤ 45; espera p95 ≤ 15, máx ≤ 30 | **calibrado** | alumno débil = prueba de estrés |
| progreso | ≥ 2 de 4 módulos que empiezan en A1 promovidos | **calibrado** | ≥2 de los 4 módulos que empiezan en A1 promovidos tras 200 sesiones (konnektoren empieza en A2 y no cuenta). Con el requisito «du/er» en verbos con cambio de vocal, verben tarda más de 200 sesiones en mix-12 |
| unidades nuevas por sesión | ≥ 1 | **calibrado** | unidades nuevas introducidas por sesión (mix-12 típico) |
| control negativo 3/día | ≥ 20.0 % de rescates prematuros | **calibrado** | control negativo (sin paso de aprendizaje ni 16 h): ≥20 % de los rescates son prematuros; medido ≈62 % |

## Lectura honesta

- **Duros:** 0 duplicados, 0 ítems por encima del tope, 0 sesiones incompletas, mezcla 70/20/10 dentro de ±5/5/4 pp, sin vaivén de nivel, 0 rescates con <16 h y ningún casi-acierto de diéresis o das↔dass acaba como «almost».
- **Cobertura restaurada (0.90/0.80):** la guarda anti-inanición (1 hueco por sesión para la casilla alcanzable con >10 sesiones sin salir) hace que, en las 10 semillas nuevas, ninguna casilla alcanzable quede fuera de una ventana de 20 sesiones. Es un resultado de diseño (la guarda lo garantiza casi por construcción), no una prueba de que el reparto sin la guarda fuera bueno: con la guarda desactivada, la etapa 2 daba .87–.91 / .76–.83.
- **Coste pedagógico de los arreglos en verben:** exigir ≥1 acierto en du/er_sie_es en los verbos con cambio de vocal/irregulares retrasa la promoción. En mix-12, verben sigue en A1 a las 200 sesiones en las 10 semillas nuevas (semilla de calibración: 27 de 30 unidades dominadas necesarias), mientras que en la etapa 2 llegaba a A2. En el escenario de un solo módulo (verben-20) sí asciende hasta B1. Es el efecto buscado del punto 5, pero hay que saber que existe.
- **Casi-aciertos:** el 30 % de los fallos del alumno son erratas; la mayoría acaba como «wrong» a propósito (diéresis y das↔dass nunca son «almost»). «almost» sólo sale en frases con una errata en una palabra larga. Límite conocido: una errata de flexión en una palabra larga dentro de una frase («ich bleibt») sigue siendo «almost».
- **Capacidad:** con 12 ítems/sesión el sistema introduce ≈1.3 unidades nuevas por sesión (cada unidad necesita ≈8–10 repasos). No es un fallo: es el límite del tamaño de sesión.
- **El alumno sintético es un modelo**, no un estudiante real: valida mecánica (repetición, cobertura, estabilidad), no eficacia pedagógica. Las cifras de precisión (≈78 %) dependen de sus parámetros.
- **API:** además de `saveError`, el planificador emite el aviso nuevo `ERRORS_NOT_READY` (repaso de errores con errores recién fallados, <1 h) y las entradas de sesión pueden llevar `guard: true` / la nota `STARVATION_GUARD`.

## Pruebas de mutación (etapa 2; no se repitieron en 2b)

Línea base sin mutar: 0 fallos. Cada mutación se aplicó sobre una copia y se corrió toda la suite:

| mutación | pruebas que fallan | quién la detecta |
|---|---|---|
| evaluador: toda forma cerrada tolera «typo» | 3 | unitarias del evaluador, dataset ä/ö/ü, e2e jsdom |
| filtro de nivel siempre permite | 4 | unitarias de tope/avisos/reintentos |
| SRS: un fallo cuenta como nota 2 | 4 | unitaria SRS + SIM verben-20 y robustez |
| scheduler sin memoria (recencyFactor = 1) | 2 | unitaria de memoria + SIM robustez |
| scheduler: relleno sin hueco estricto (futureGap = 0) | 6 | SIM (5 escenarios + control) |
| scheduler: permite repetir unidad en la sesión | 6 | unitarias de unicidad + SIM |

Aviso: una mutación («sin memoria») sólo la detectan 2 pruebas. En 2b cada punto lleva su prueba «falla antes / pasa después», comprobada ejecutando los tests nuevos contra el código de la etapa 2.
