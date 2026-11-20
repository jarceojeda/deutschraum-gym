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
| 7 | Tarjetas de módulo con barra de color por módulo (artikel azul, verben naranja, deklination morado) | Tarjetas por módulo, nivel actual (`engine.levelOf`) y un toque = empezar. Los 4 módulos de la etapa 4 salen «Próximamente» deshabilitados | B · HECHO |
| 8 | Modo Tren (`trainMode`, por toques) | Es el modo por defecto. «Escribir» es opcional (Ajustes y chip en inicio); usa `mode:'write'` del motor | C · HECHO |
| 9 | Bloques tocables (`word-chip`, `sentence-builder`) | `ui/dgui-inputs.js`: bloques de raíz+terminación (verbos), prefijo-ge+raíz+terminación (Partizip II), palabras (transformaciones), letras como último recurso. Se envía el texto unido al motor | C · HECHO |
| 10 | Emparejado rápido (`verb-quick-match`, 7 formas) | Paradigma de 6 personas (+ Partizip II si existe su unidad) sobre las formas de `store.units`. **Solo la fila de la persona del ítem se envía a `answer()`** (el motor puntúa 1 unidad = 1 ítem); las otras filas se corrigen en pantalla y no puntúan. Límite declarado | C · HECHO con límite |
| 11 | Emparejado infinitivo ↔ significado | **BLOQUEADO:** `data/verben.json` no trae traducción (0 de 3.662). No se inventa. Hace falta campo `translation` en verben (pipeline de datos) | BLOQUEADO |
| 12 | Opciones con distractores (`choice-grid`) | Opciones del motor (`view().options`); para Verben/Artikel-plural sin opciones, distractores generados en la UI (formas de otras personas, plurales plausibles) | C · HECHO |
| 13 | Avance automático (1,6 s, «Dudé / Pausar») | Tras acertar: barra de 1,4 s con «Pausar» y «Siguiente»; chip Auto activable. Al fallar nunca avanza solo | C · HECHO |
| 14 | «Casi» con tolerancia | Solo existe en modo «Escribir» (el evaluador táctil es exacto): veredicto `almost` → «Casi, revisa y reintenta» (1 reintento, lo da el motor) | C · HECHO |
| 15 | Rescate de errores | Insignia «Rescatada» (`out.rescued`) y botón «Mis errores» (`kind:'errors'`) en inicio | C · HECHO |
| 16 | Botones de confianza «Lo sabía / Dudé / Adiviné» | **DESCARTADO por ahora:** el motor no recibe confianza (nota SRS 3 `fast` pendiente, ESTADO.md). Se evalúa con el motor | DESCARTADO |
| 17 | Haptics (`navigator.vibrate`: tap 8, ok 14, milestone, warning, fallo) | Hecho: tap/ok/«casi»/fallo (respeta reduced-motion y el ajuste de vibración); falta milestone | tap 8 ms (bloques, filas, letras), acierto 12, «casi» y fallo ya hechos; milestone y warning · E · PENDIENTE |
| 18 | Toast | Ya hay toast; se unifican mensajes | E · PENDIENTE (básico HECHO) |
| 19 | Racha, XP, niveles, logros | Racha con perdón y logros sobrios (sin XP/niveles); estado en `dg.ui`, no en el motor | E · PENDIENTE |
| 20 | Resumen de sesión | Hecho en etapa 3; se añade «qué falló y por qué» con la cápsula de regla | E · PENDIENTE |
| 21 | Cápsula de regla («memory-strip», «formula», antes→después, `decisionChain`, tablas de referencia) | `ui/reglas.json` por `conceptId`; el hueco queda vacío si no hay regla (no se inventa) | D · PENDIENTE |
| 22 | Botón «¿por qué?» bajo demanda | Mismo contenido que 21, también antes de responder (tras el control) | D · PENDIENTE |
| 23 | TTS de-DE rate 0,85 (`speakGerman`, `autoAudio`) | `speechSynthesis`, `lang=de-DE`, `rate=0.85`, voz alemana si existe; apagado por defecto | F · PENDIENTE |
| 24 | Ajustes (tema, auto-avance, audio, sesión por defecto) | Ya: nivel (Auto/A1/A2), entrada (Toques/Escribir), tema, vibración; el chip Auto de la sesión. Faltan voz y tamaño por defecto | F · PENDIENTE (parcial HECHO) |
| 25 | `safe-area`, `100dvh`, `touch-action`, objetivos ≥48 px, sin hover | Prueba jsdom del CSS (≥48 px, sin `:hover`) + medición real en Chromium 390×844: el botón activo más bajo mide 48 px | A/C · HECHO |
| 26 | `prefers-reduced-motion` | Anula animaciones y transiciones (también la barra de avance automático) | A · HECHO |
| 27 | Reanudar sesión (`resume-banner`) | El motor no persiste sesiones abiertas (`startSession` no escribe). No se reanuda; lo respondido sí queda guardado | DESCARTADO (limitación del motor) |
| 28 | Backup exportar/importar, `requestPersistence`, IndexedDB | Etapa 5 (el motor ya tiene `exportJSON/importJSON`) | Etapa 5 |
| 29 | Teclado de umlauts en respuestas escritas | Fila ä ö ü ß (≥48 px) en el modo «Escribir» | C · HECHO |

## Variedad (queja de la 1.9: «repetía siempre lo mismo»)
`tests/ui-variedad.test.js` juega 30 sesiones seguidas del Viaje combinado pulsando la UI. **Pasa** lo pedido (misma unidad ≤2 veces seguidas, los 3 módulos, las 6 personas verbales, las 3 variantes de verbos). **No pasan los límites estrictos** (≥75 % de ejercicios distintos, ≤15 % de solape con la sesión siguiente, ninguna persona >30 %): con 8 h entre sesiones salen 111 ejercicios distintos de 300 (37 %), 21 % de solape y «du» ≈ 33 %. Son dos pruebas `todo` (visibles, no relajadas). Causa probable en el motor: paso de aprendizaje de 1 h (lo nuevo vuelve en cada sesión), cupo de nuevas ≈1,3 unidades/sesión y pesos ×3 de du/er en verbos difíciles. Decisión pendiente del usuario.

## Descartado a propósito (TELC / fuera del alcance — SPEC §1)
- **Hören, Lesen, Schreiben, Sprechen** (módulos `hoeren`, `lesen`, `schreiben`, `sprechen`, `listeningQuestion`, `readingQuestion`, `speakingQuestion`, `writingQuestion`): la meta es B1 de gramática/vocabulario; eso se estudia aparte con libros.
- **Plan de 14 días / `studyPlan` / «Camino» de 18 paradas / simulaciones TELC / `telc-plan` / `renderTelcTracks`**: no hay calendario de examen; el avance es por dominio (rampa 70/20/10 del motor).
- **Wortschatz de exámenes** (listas de situaciones TELC de A1-2.4.4 y de las cheat sheets): `wortschatz` llega en la etapa 4 desde el pipeline propio, no desde el HTML.
- **Evidencia de lectura, autoevaluación de Sprechen/Schreiben, checklist manual**: dependen de los módulos anteriores.
- **XP y niveles de usuario**: gamificación excesiva (el SPEC pide deleite solo donde resuelve un dolor real).
