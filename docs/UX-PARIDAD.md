# UX-PARIDAD · 1.9.0 / A1-2.4.4 → UI sobre el motor actual

Referencia: `docs/referencia/Deutschraum-Training-1.9.0-Modo-Tren.html` (UX), `Deutschraum-A1-2.4.4.html` (contenido, ya migrado a `data/`), cheat sheets y `aleman_declination_master_mobile_v1_1.html` (tokens y paneles de regla).
Estados: **HECHO** · **EN CURSO** (este punto de control: bloques A, B, C) · **PENDIENTE** (D/E/F, tras confirmación) · **DESCARTADO** · **BLOQUEADO** (falta dato o API del motor).

| # | Función en la 1.9.0 / A1-2.4.4 | Cómo se hará sobre el motor actual | Estado |
|---|---|---|---|
| 1 | Paleta/tokens (`--paper --surface --ink --brand --accent --coral…`) | Mismos tokens en `ui/style.css` (`:root`), más acentos de las cheat sheets (`--violet`, `--amber` para «memory/formula») | A · HECHO |
| 2 | Tema oscuro (`html[data-theme=dark]`) | Igual, y además sigue al sistema (`prefers-color-scheme`) con opción Sistema/Claro/Oscuro en Ajustes | A · HECHO |
| 3 | Color de género der/die/das/plural, con forma | der ● azul · die ◆ rosa · das ⬢ verde · plural ▲ morado (+ la palabra siempre escrita). `ui/dgui-fmt.js` convierte cualquier artículo mostrado en insignia | A · HECHO |
| 4 | Color por caso (nominativo/acusativo/dativo) | N teal · A terracota · D morado (+ G ámbar, nuevo) con letra N/A/D/G dentro de la insignia (no solo color). El caso sale del `errorTag` (`case:dative:…`) y solo se muestra **después** de responder (no filtra la respuesta) | A · HECHO (artículos y respuestas) |
| 5 | Appbar sticky + marca | Appbar con marca «D», título, racha (E) y ajustes; `safe-area` arriba | A · HECHO |
| 6 | Hero verde con CTA | Hero en inicio con «Viaje combinado», selector de tamaño y de nivel | A/B · HECHO |
| 7 | Tarjetas de módulo con barra de color por módulo (artikel azul, verben naranja, deklination morado) | Tarjetas por módulo, nivel actual (`engine.levelOf`) y un toque = empezar. Los 7 módulos jugables (Verben, Artikel, Deklination, Präpositionen, Konnektoren, Wortschatz, Satzbau) | B · HECHO |
| 8 | Modo Tren (`trainMode`, por toques) | Es el modo por defecto. «Escribir» es opcional (Ajustes y chip en inicio); usa `mode:'write'` del motor | C · HECHO |
| 9 | Bloques tocables (`word-chip`, `sentence-builder`) | `ui/dgui-inputs.js`: bloques de raíz+terminación (verbos), prefijo-ge+raíz+terminación (Partizip II), palabras (transformaciones), letras como último recurso. Se envía el texto unido al motor | C · HECHO |
| 10 | Emparejado rápido (`verb-quick-match`, 7 formas) | Paradigma de 6 personas (+ Partizip II si existe su unidad) sobre las formas de `store.units`. **Solo la fila de la persona del ítem se envía a `answer()`** (el motor puntúa 1 unidad = 1 ítem); las otras filas se corrigen en pantalla y no puntúan. Límite declarado | C · HECHO con límite |
| 11 | Emparejado infinitivo ↔ significado | **BLOQUEADO:** `data/verben.json` no trae traducción (0 de 3.662). No se inventa. Hace falta campo `translation` en verben (pipeline de datos) | BLOQUEADO |
| 12 | Opciones con distractores (`choice-grid`) | Opciones del motor (`view().options`); para Verben/Artikel-plural sin opciones, distractores generados en la UI (formas de otras personas, plurales plausibles) | C · HECHO |
| 13 | Avance automático (1,6 s, «Dudé / Pausar») | Tras acertar: barra de 1,4 s con «Pausar» y «Siguiente»; chip Auto activable. Al fallar nunca avanza solo | C · HECHO |
| 14 | «Casi» con tolerancia | Solo existe en modo «Escribir» (el evaluador táctil es exacto): veredicto `almost` → «Casi, revisa y reintenta» (1 reintento, lo da el motor) | C · HECHO |
| 15 | Rescate de errores | Insignia «Rescatada» (`out.rescued`), botón «Mis errores» (`kind:'errors'`) y **Mapa de errores por tipo** (`errorMap()`, con hoja de regla/ejemplos por tipo) | C/E · HECHO |
| 16 | Botones de confianza «Lo sabía / Dudé / Adiviné» | **DESCARTADO por ahora:** el motor no recibe confianza (nota SRS 3 `fast` pendiente, ESTADO.md). Se evalúa con el motor | DESCARTADO |
| 17 | Haptics (`navigator.vibrate`: tap 8, ok 14, milestone, warning, fallo) | Con nombre: tap 8, ok 12, fallo [30,40,30], aviso [15,40,15] (casi y fallo de guardado), hito [18,45,28] (logros/racha). Respeta el ajuste y reduced-motion | E · HECHO |
| 18 | Toast | Un único toast a la vez, tipos info/ok/warn (ok y warn vibran) | E · HECHO |
| 19 | Racha, XP, niveles, logros | Racha con perdón (1 por semana) y 7 logros sobrios; **sin XP ni niveles**. Estado en `dg.ui` (`ui/dgui-retention.js`), no en el motor | E · HECHO |
| 20 | Resumen de sesión | «Hoy aprendiste…», rescatados, errores por tipo, racha, logros y **«Qué falló y por qué»** (respuesta, explicación y regla de cada fallo) | E · HECHO |
| 21 | Cápsula de regla («memory-strip», «formula», antes→después) | `ui/reglas.json` por concept id, generado por `tools/extract-reglas.js` de `aleman_declination_master` (27) y la hoja A1 (35). Cubre 25 de 54 conceptos de los 3 módulos; el resto queda vacío, sin inventar | D · HECHO (cobertura parcial) |
| 22 | Botón «¿Por qué?» bajo demanda | Dentro de la tarjeta de pregunta; abre/cierra la cápsula. Además, regla visible mientras el tema es nuevo y oculta al dominarlo (≥6 intentos con ≥85 % en ese `errorTag`); vuelve tras fallar | D · HECHO |
| 23 | TTS de-DE rate 0,85 (`speakGerman`, `autoAudio`) | `ui/dgui-voice.js`: `de-DE`, `rate 0.85`, voz alemana si existe; botón 🔊 tras responder, «Al responder» opcional, «Probar voz» y estado de la voz (con instrucciones de Android si falta). Apagado por defecto | F · HECHO |
| 24 | Ajustes (tema, auto-avance, audio, sesión por defecto) | Nivel, entrada, tamaño por defecto, avance automático, regla visible, voz, tema, vibración y logros | F · HECHO |
| 25 | `safe-area`, `100dvh`, `touch-action`, objetivos ≥48 px, sin hover | Prueba jsdom del CSS (≥48 px, sin `:hover`) + medición real en Chromium 390×844: el botón activo más bajo mide 48 px | A/C · HECHO |
| 26 | `prefers-reduced-motion` | Anula animaciones y transiciones (también la barra de avance automático) | A · HECHO |
| 27 | Reanudar sesión (`resume-banner`) | El motor no persiste sesiones abiertas (`startSession` no escribe). No se reanuda; lo respondido sí queda guardado | DESCARTADO (limitación del motor) |
| 28 | Backup exportar/importar, `requestPersistence`, IndexedDB | Exportar/importar copia en Ajustes (JSON con checksum, confirma antes de reemplazar). `requestPersistence`/IndexedDB: no (localStorage + copia) | HECHO (copia) |
| 29 | Teclado de umlauts en respuestas escritas | Fila ä ö ü ß (≥48 px) en el modo «Escribir» | C · HECHO |

| 30 | Präpositionen y Konnektoren (módulos 4 y 5 de la propuesta) | Par mínimo Wo?/Wohin? y fichas para ordenar con datos y motor existentes; transformaciones por palabras con conectores como distractores | HECHO (ahora) |
| 32 | Andamiaje que se retira: tabla completa → media tabla → ninguna (Deklination) | `ui/dgui-tablas.js` + `ui/tablas.json` (§11 de la guía): 191 ítems con tabla; retirada por dominio del `errorTag` (<3 intentos completa, ≥6 y ≥85 % ninguna); tras fallar siempre tabla con la casilla marcada. Se apaga en Ajustes | HECHO |
| 33 | Motor de 4 movimientos (caso → casilla → quién lleva la señal → cola del sustantivo) | Cadena **caso → casilla → forma** tras fallar (pasos con dato). «Quién lleva la señal» y «cola del sustantivo» no existen como dato en `data/` | PARCIAL |
| 34 | «Completar solo la terminación» (`gut__`) | Variante `ending`: la raíz queda puesta y se elige solo la terminación (`-en`, `-n`, `—`…). Aplica a 322 plurales, los Dativ plural y ~2.300 formas de verbos conjugados; envía raíz + terminación al motor | HECHO |
| 35 | Escalera de ayuda que se retira (opciones → bloques/terminación → letras) | Por intentos acumulados del `errorTag`: <5 ayuda (opciones, emparejado), 5–19 o <85 % media (bloques, terminación), ≥20 con ≥85 % dominado (letras sueltas). Se apaga en Ajustes («Ayuda que se retira») | HECHO |
| 36 | Nivel A1 / A2 / **B1** / Auto | Cuatro botones; A1/A2/B1 = practicar ese nivel (`engine.setLevel` + tope), Auto = rampa por dominio y restaura el nivel ganado | HECHO |
| 37 | Wortschatz y Satzbau (módulos 6 y 7) | Primera versión solo A1 generada desde la referencia 2.4.4 (2.316 y 421 ítems); los 7 módulos están activos | HECHO (A1) |
| 38 | Errores comunes de las clases en las cápsulas | 81 viñetas «Atención» → `errores` (≤3 por concepto, 27 conceptos); cada tiempo verbal muestra su regla | HECHO |
| 39 | Pistas de sufijo para el género (Artikel, SPEC §3) | `ui/sufijos.json` (26 terminaciones de las fuentes); tras fallar: «-ung suele ser die» o excepción | HECHO |
| 40 | PWA: instalable y sin conexión (SPEC §2: URL gratis + service worker) | `dist/index.html` + `manifest.webmanifest` + `sw.js` (caché versionada por hash) + iconos; Ajustes → «Instalar y sin conexión» (botón Instalar, estado sin conexión, almacenamiento persistente, aviso de versión nueva). Verificada en Chromium real, con y sin subruta: SW activo, instalable, recarga sin red y progreso intacto (`tools/check-pwa.js`). Publicación: `docs/PUBLICAR.md` | HECHO (falta publicar) |
| 31 | Pestaña de consulta separada de los ejercicios | «Consulta de reglas»: 62 temas de `reglas.json`, solo lectura | HECHO (parcial: faltan cheat sheets A2/B1) |

Evaluación completa de la propuesta de la charla inicial: `docs/EVALUACION-propuesta.md`.

## Variedad (queja de la 1.9: «repetía siempre lo mismo»)
`tests/ui-variedad.test.js` juega 30 sesiones seguidas del Viaje combinado pulsando la UI. **Pasa** lo pedido (misma unidad ≤2 veces seguidas, los 3 módulos, las 6 personas verbales, las 3 variantes de verbos). **No pasan los límites estrictos** (≥75 % de ejercicios distintos, ≤15 % de solape con la sesión siguiente, ninguna persona >30 %): con 8 h entre sesiones salen 111 ejercicios distintos de 300 (37 %), 21 % de solape y «du» ≈ 33 %. Son dos pruebas `todo` (visibles, no relajadas). Causa probable en el motor: paso de aprendizaje de 1 h (lo nuevo vuelve en cada sesión), cupo de nuevas ≈1,3 unidades/sesión y pesos ×3 de du/er en verbos difíciles. Decisión pendiente del usuario.

## Descartado a propósito (TELC / fuera del alcance — SPEC §1)
- **Hören, Lesen, Schreiben, Sprechen** (módulos `hoeren`, `lesen`, `schreiben`, `sprechen`, `listeningQuestion`, `readingQuestion`, `speakingQuestion`, `writingQuestion`): la meta es B1 de gramática/vocabulario; eso se estudia aparte con libros.
- **Plan de 14 días / `studyPlan` / «Camino» de 18 paradas / simulaciones TELC / `telc-plan` / `renderTelcTracks`**: no hay calendario de examen; el avance es por dominio (rampa 70/20/10 del motor).
- **Wortschatz de exámenes** (listas de situaciones TELC de A1-2.4.4 y de las cheat sheets): `wortschatz` llega en la etapa 4 desde el pipeline propio, no desde el HTML.
- **Evidencia de lectura, autoevaluación de Sprechen/Schreiben, checklist manual**: dependen de los módulos anteriores.
- **XP y niveles de usuario**: gamificación excesiva (el SPEC pide deleite solo donde resuelve un dolor real).
