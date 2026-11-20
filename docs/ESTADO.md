# ESTADO · Deutschraum Gym

Resumen de lo hecho. Las etapas 0–2b se hicieron en chats del Project «Alemán» de claude.ai; desde la etapa 3 se trabaja en este repo con Claude Code. Este archivo es la fuente de estado (el del Project queda como copia histórica hasta la etapa 2b).

## Etapa 0 · SPEC + prompts — HECHA
## Etapa 1 · Contenido — HECHA
7.446 ítems en v1; tras la revisión Opus (1 bis) 7.362: verben 3.662, artikel 1.329, deklination 436, praepositionen 299, konnektoren 281, wortschatz 1.139, satzbau 216. concepts.json 268. Validación: 0 errores, 1 aviso mitigado, ningún pool <12.

**En este repo están `verben`, `artikel`, `deklination`, `praepositionen`, `konnektoren` y `concepts`** (`data/`, del pipeline). **`wortschatz.json` y `satzbau.json` son una PRIMERA VERSIÓN generada aquí** (`node tools/gen-wortschatz-satzbau.js`, desde `docs/referencia/Deutschraum-A1-2.4.4.html` y las clases de `docs/fuentes/aleman-markups/`; wortschatz 4.206 ítems A1/A2/B1, satzbau 421 solo A1; ver «Wortschatz y Satzbau» y «Fuentes Alemán Markups» en Etapa 3b). Los datos definitivos de la etapa 1 (1.139 y 216 ítems) siguen sin estar en el repo; cuando lleguen sustituyen estos archivos (mismo esquema).

Decisiones de datos:
- En modo táctil, `options` contiene UNA sola forma válida; las demás válidas van en `accept` (modo escritura). Contracciones (am/im/zum…): en options sólo la contracta; la larga en accept.
- Ítems ambiguos por diseño llevan `needs_translation` (la UI muestra la traducción).
- Flags: needs_translation, multi_ok, impersonal (regnen/schneien: er/sie/es; geschehen/gelingen: er_sie_es + sie_Sie), countable, pluraleTantum, aux_alt/aux_hint (fahren, schwimmen, treten, ausziehen, umziehen), label en verbos de varios sentidos (hängen).
- Präteritum du: forma corta en accept (hießt, last, standst…).
- N-Deklination, Genitiv (variantes -(e)s en accept), partículas curadas con needs_translation y accept amplio.
- `pool` es la clave del tamaño mínimo (12).

## Etapa 2 · Motor + simulaciones — HECHA
Motor sin interfaz, 10 módulos IIFE (`window.DG.*`, también `require` en Node) en `src/`; bundle `dist/dg-engine.bundle.js` (≈90 KB; es lo que la etapa 3 incrusta en el HTML). Datos reales: 0 errores de validación y 1 aviso (2 conceptIds sin resolver en concepts: `md:indefinitpronomen`, `md:gradpartikeln`; aviso, no error). 3.398 unidades en los 5 módulos incluidos.

Módulos: rng (mulberry32 / crypto, sin depender de la fecha), text (NFC, translit, OSA), sampler (sorteo ponderado sin reemplazo, mayor resto con topes, difusión de resto), items (esquema, índices, validación, `view()` táctil), evaluator, srs, ramp, progress, scheduler, engine.

### Decisiones de diseño
- **Unidad SRS = habilidad, no palabra:** `verben|lema[(sentido)]|skill` y `artikel|lema|skill`; en el resto, el id del ítem. `skillId = módulo:skill` (casilla para cuotas/cobertura/mapa de errores); `poolId = módulo:pool`. Una sola unidad por sesión (salvo `kind:'errors'`).
- **Evaluador:** veredictos correct / almost / wrong. Escalera: exacto NFC → mayúsculas → puntuación final → puntuación → transliteración ae/oe/ue/ss (cuenta como correcto). Nunca NFD. Tolerancia `typo` sólo en transform/order (frases) frente a `none` (todo lo demás: formas cerradas, plurales). Modo táctil compara exacto con `options`; modo escritura con `accept[]`. Pares mínimos {wo, wohin}.
- **SRS (variante SM-2) por unidad:** paso de aprendizaje 1 h; 1.º acierto 1 d / fácil 3 d / difícil 0,5 d; ease 1,3–3,0; factor de lapso 0,25; intervalo máx 120 d; fuzz ±5 %. Sólo el primer intento puntúa. Estados l / r / x.
- **Scheduler (orden de decisiones):** errores → cuotas por clase SRS (vencidas ≤60 %, nuevas, relleno) → reparto por módulo → cubos de la rampa → clase → casilla → unidad → variante. Cupo de nuevas = 0,35 + 1,5·(precisión reciente − 0,85), acotado a 0,10–0,50, y se frena si el atraso supera 2 sesiones. Jerarquía de cuotas: nivel > casilla > tipo (order ≤30 %, transform ≤25 %, casilla ≤50 %).
- **Memoria de sesiones previas:** ventana `memorySessions`=5, peso (d/6)². El relleno (`future`) excluye además lo visto en las últimas 3 sesiones.
- **Cobertura:** refuerzo por antigüedad de casilla cuadrático (tope ×13), peso de módulo ∝ (nº de casillas)^0,2 y guarda anti-inanición (2b).
- **Rampa 70/20/10:** filtro único de nivel (`Ramp.allowed/capFor/levelsAllowed`); cubos actual/fácil/reto usando sólo niveles con ≥12 unidades; difusión de resto entre sesiones. Promoción: ≥20 intentos sobre unidades ya vistas, precisión ≥85 %, unidades dominadas ≥ min(50 % del nivel, 30), permanencia mínima 5 sesiones. Degradación: ≥25 intentos y <55 %. Konnektoren arranca en A2.
- **Progreso:** `localStorage`, versión 2 (migraciones v0→v1→v2), guarda tras cada respuesta, copia `.bak` si está corrupto, importar atómico con checksum, reconciliación de huérfanos. Historial: últimas 12 sesiones.

## Etapa 2b · Correcciones del motor (revisión Opus) — HECHA
**138 pruebas, 138 OK.** Cada punto tiene una prueba que fallaba contra el código de la etapa 2. Detalle de la revisión original: `docs/REVISION-opus-etapa2.md`; parche aplicado: `docs/history/etapa2b.patch`; resultados: `docs/history/TEST-RESULTS-etapa2b.txt`; informe de simulación vigente: `sim/REPORT.md`.

1. **Cola de errores:** rescate sólo si `now − ts ≥ rescueMinMs` (16 h); un acierto anterior cuenta para el SRS pero el error se queda. Peso 0 en el scheduler a errores con `now − ts < learnStepMs` (1 h). `learning` ya no cuenta como `due`. Escenario `mix-12-3perday`: rescatados con <16 h = 0 (con el comportamiento antiguo, ≈64 %).
2. **Evaluador:** plural de artikel → `none` (+ lema singular como distractor); frases: «almost» sólo con misma nº de palabras, 1 palabra distinta, ≥5 letras, OSA ≤1, fuera de lista cerrada y sin ser sólo diéresis; diéresis perdida = wrong siempre. El alumno sintético hace un 30 % de sus fallos como erratas.
3. **Sesiones abandonadas:** `startSession` no escribe nada; contador, historial y carry se confirman en la 1.ª respuesta o en `giveUp`.
4. **Memoria:** `recencyFactor` sólo para `new` y `future`.
5. **Verbos:** en praesens/praeteritum de verbos con cambio de vocal/irregulares (67/264 y 134/263 unidades) du y er_sie_es ×3, formas = infinitivo ×0,5. «Dominada» exige además ≥1 acierto en du o er_sie_es (`st.units[u].hp`), sólo en unidades «difíciles».
6. **Media:** NFC en `normalizeItem` (+ aviso `not-nfc`); `letters` en array sin espacios; `rev[nxt]` vacío al promover; sin reintento con <2 ítems detrás; `saveError`; `view()` cacheada por posición y modo; `kind:'errors'` admite varios ítems por unidad; guarda anti-inanición (1 hueco/sesión si F ≥ 6).
7. **Umbrales** (10 semillas nuevas 101–110): cobertura mixta restaurada a 0,90/0,80 (las 10 dan 1,000/1,000); progreso = ≥2 de los 4 módulos que empiezan en A1; débil con tendencia (151–200 ≤ 101–150 + 3).

### Avisos honestos
- **verben sube más lento en mix-12** (sigue en A1 a las 200 sesiones; en verben-20 llega a B1). Efecto buscado del punto 5.
- **La cobertura 1,000 la garantiza la guarda casi por construcción**; no demuestra que el reparto sin ella fuera bueno. La prueba de la guarda anula el empuje por antigüedad (`cellAgeMax: 0`) para aislarla.
- **Límite del evaluador:** una errata de flexión en una palabra larga dentro de una frase («ich bleibt») sigue siendo «almost».
- **Pendientes de la revisión (no hechos):** nota SRS 3 (`fast` nunca se pasa), `masteredUnits` con `r ≥ 2`, `unitId` estable en datos (homógrafos), evaluar rampa si se mata la app antes de `finish()`, sanguijuelas, `importJSON` sin checksum/`reconcile`, escapes en regex de `dg-text.js`, aviso de `memorySessions` > 12. Capacidad: ≈1,3 unidades nuevas/sesión → ~260 de 3.398 unidades en 200 sesiones; requiere núcleo de alta frecuencia en los datos.
- Las mutaciones de la etapa 2 no se repitieron en 2b.

## API del motor (para la interfaz)
`createEngine({data, concepts, storage, clock?, rng?}) → startSession({kind:'mix'|'module'|'errors', modules, size, mode})`.
- Sesión: `view(modo?)` (mismo objeto en la misma posición; no mutarlo), `answer(resp,{mode})` → `{evaluation, almost, retryScheduled, rescued, finished, saveError?}`, `giveUp()`, `finish()` → resumen (`saveError?`), `summary()`, `currentItem()`, `currentEntry()`, `length()`, `done()`, `plan.warnings` (NO_ERRORS, ERRORS_NOT_READY, NO_MODULES, POOL_UNDER_MIN, MODULE_EMPTY_UNDER_CAP, LEVEL_THIN, SHORTFALL). Entradas de plan pueden llevar `guard: true` y nota `STARVATION_GUARD`.
- Motor: ajustes en `state().settings` (`levelCap`, `capByModule`, `memorySessions`, `errorShare`), `setLevelCap(nivel, módulo?)`, **`setLevel(nivel, módulo?)`** (3b: «practicar desde este nivel»; fija el nivel actual de la rampa, respeta el tope y los niveles con ≥12 unidades; prueba en `tests/set-level.test.js`), `errorQueue()`, `errorMap()`, `levelOf(m)`, `exportJSON()/importJSON()`.
- Entrada `letters` (verbos/plurales/transform sin `options`): la UI genera las fichas y envía array de letras (se unen sin espacios; en `order` sí con espacios) o texto. En `minimal-pair` las opciones son sólo las dos respuestas.
- Sin semilla el azar viene de `crypto.getRandomValues`; con semilla es determinista (sólo pruebas).

## Etapa 3 · Interfaz base + Verben, Artikel, Deklination — HECHA
**154 pruebas, 154 OK** (138 del motor + 16 de UI en `tests/ui-jsdom.test.js`). Entregable: `dist/deutschraum-gym.html` (≈2,2 MB, autocontenido: CSS + motor + UI + datos de los 3 módulos + concepts; sin recursos externos). `npm run build:ui` lo regenera (también regenera el bundle del motor). Capturas a 390×844 en `docs/capturas/` (`NODE_PATH=$(npm root -g) node tools/screenshots.js`; necesita Playwright del sistema, no es dependencia del proyecto).

### Qué hay
- `ui/` (IIFE, vanilla): `dgui-util` (nodos, tema, vibración), `dgui-rules` (explicación de una línea y panel «ver regla»), `dgui-inputs` (opciones, banco de letras, fichas, par mínimo), `dgui-app` (pantallas), `dgui-boot`, `style.css`, `index.html` (plantilla). `tools/build.js` los junta.
- Pantallas: inicio (módulo + 10/20/30 ejercicios), sesión, resumen («hoy aprendiste X que ayer no sabías», rescatados, errores por tipo, cambios de nivel) y ajustes (tope de nivel, tema sistema/claro/oscuro, vibración).
- Modo Tren: opciones con distractores (view `choice`); banco de letras para lo que no trae `options` (respuesta + 3 distractores, p. ej. ä↔a, ß↔s; se envía un **array** de letras, o texto si la respuesta lleva espacios, p. ej. «den Kindern»); fichas para `order` y par mínimo ya implementados pero sin datos que los usen hasta la etapa 4.
- Artikel: der ■ azul, die ● roja, das ▲ verde (color + forma + palabra).
- Fallo: banner con la respuesta, explicación de una línea y «Ver regla» (panel inferior, Escape/«Entendido» lo cierran). «No sé» = `giveUp()`.
- `saveError`: aviso amarillo sin bloquear, desaparece si un guardado posterior funciona. `plan.warnings`: se listan al empezar. Si `localStorage` no está disponible se avisa en el inicio.

### Decisiones
- **Texto de la regla:** `data/concepts.json` sólo trae títulos (`title`), sin cuerpo; `explanation` sólo existe en Deklination (422/436). El panel muestra: título(s) del concepto, `explanation` si hay, tabla de conjugación de la unidad (Verben), 4 ejemplos del mismo tema, y una nota honesta cuando falta el texto. Para Verben/Artikel la «línea» se deriva (concepto + persona/lema → forma, o pista del ítem + respuesta).
- Tamaños de sesión 10/20/30 ejercicios (los de «minutos» llegan con el viaje combinado, etapa 4). La sesión puede alargarse por reintentos del motor.
- Tocar una opción responde de inmediato (una mano, rápido); el fallo se ve en el banner, no hay confirmación previa.
- Preferencias de UI en `dg.ui` (aparte de `dg.progress`). No se tocó `src/` ni `data/`.

### Límites / pendiente
- **Falta el texto real de las reglas** (cheat sheets) para el panel: viene en la etapa 5 (pestaña de consulta). Hace falta aportar `explanation` para Verben/Artikel o los textos por concepto.
- No hay «completar sólo la terminación» ni Modo Casa (etapa 5), ni «Mis errores»/viaje combinado (etapa 4), ni TTS, ni PWA/service worker/manifest (etapa 5), ni exportar/importar en la UI (el motor ya lo tiene).
- **Progreso en el teléfono:** abierto como archivo local, Chrome puede no conservar `localStorage` entre sesiones según cómo se abra; para uso real conviene la URL hospedada de la etapa 5.
- La prueba de ä/ö/ü/ß depende de que el sorteo los saque: la prueba recorre hasta 12 sesiones con semilla fija.

## Etapa 3b · Paridad de UX con la 1.9.0 — HECHA (bloques A–F)
Detalle y estado por función en `docs/UX-PARIDAD.md`. Capturas 390×844 en `docs/capturas/A` … `F`. No se tocó `src/` ni `data/`; todo entra por `view()/answer()/giveUp()/finish()/errorMap()`.
- **A** sistema visual (tokens 1.9.0, tema sistema/claro/oscuro, appbar, hero, tarjetas; género der ● die ◆ das ⬢ plural ▲ y caso N/A/D/G con forma o letra, `ui/dgui-fmt.js`).
- **B** inicio (Viaje combinado, 3 módulos, 4 «Próximamente» deshabilitados, «Mis errores», tamaño 10/20/30, nivel Auto/A1/A2, entrada Toques/Escribir).
- **C** sesión (`ui/dgui-variants.js`: opciones, bloques, emparejado de 6 personas + Partizip II, plural por opciones; «Escribir» con ä ö ü ß y «casi»; avance automático; rescate).
- **D** cápsula de regla: `ui/reglas.json` (62 reglas copiadas de `aleman_declination_master` y de la hoja A1; regenerable con `node tools/extract-reglas.js`). Tras fallar, en «Ver regla» y bajo demanda («¿Por qué?»); visible mientras el tema es nuevo, oculta al dominarlo (≥6 intentos y ≥85 % en el `errorTag`).
- **E** retención: haptics con nombre, toast único, racha con perdón (1 por semana), 7 logros sobrios, resumen «qué falló y por qué», **mapa de errores por tipo**. Estado en `dg.ui` (`ui/dgui-retention.js`).
- **F** ajustes completos y voz alemana (`ui/dgui-voice.js`: de-DE, 0,85, 🔊 tras responder, «Probar voz» con estado de la voz).
- **Después de F:** 5 módulos jugables (+ Präpositionen y Konnektoren), `Consulta de reglas` y copia de seguridad en Ajustes; HTML ≈2,6 MB.
- **Límites declarados:**
  1. En el emparejado **solo la fila ★ puntúa** (el motor puntúa 1 unidad = 1 ítem).
  2. **Infinitivo↔significado no se puede**: `verben.json` no trae traducción (0 de 3.662).
  3. **Reglas: 25 de 54 conceptos cubiertos.** Faltan los de Verben (`md:verben-*`, `cs:a1-v*`…) y algunos de Deklination (`dm:s7-*`, `dm:s8-3`, `b1:genitiv-praepositionen`…): los textos de `001-…051-…` del Project no están en el repo. Esos temas muestran el hueco, no una regla inventada.
  4. Algunas cápsulas son parciales (solo ejemplo o fórmula) porque así vienen en la hoja de origen; una cápsula puede ser más general que el ejercicio (p. ej. «in/an → Dativ» ante un caso de movimiento con Akkusativ).
  5. La voz depende de la voz alemana instalada en Android (la pantalla de ajustes lo comprueba y explica cómo instalarla).
  6. Los HTML sueltos pierden el progreso en algunos navegadores; para el teléfono falta la URL hospedada + PWA (etapa 5).
- **Variedad (decisión tomada, motor sin cambios):** 30 sesiones seguidas del Viaje combinado con 8 h entre sesiones dan (5 módulos) ~98 ejercicios distintos de 300 (33 %), ~24 % de solape con la sesión siguiente y un reparto desigual (Konnektoren 28 % y Präpositionen 23–28 % frente a 13–20 % de Verben/Artikel/Deklination). Pasa lo que se pidió (misma unidad ≤2 seguidas, 5 módulos, 6 personas, 3 variantes). **Experimento** (`node tools/exp-variedad.js`): subir `memorySessions` a 8 o 12, `futureGap` a 6 u 8 o el cupo de nuevas no mueve la cifra (30–34 %). **Decisión:** no tocar `src/`. Razones: (1) a este volumen (≈3 exposiciones por ejercicio en 10 días) la repetición es el repaso espaciado que se busca, no un defecto; (2) el reparto desigual lo produce el peso por nº de casillas^0,2 (Konnektoren tiene 22 habilidades, Verben 4), que es la cobertura calibrada en etapa 2; (3) cambiar pesos arriesga los umbrales de simulación. Lo que sí se vigila: nunca la misma unidad más de 2 veces seguidas (pasa). Las dos pruebas «ESTRICTA» (≥75 % distintos, ≤15 % de solape, persona ≤30 %) siguen como `todo`: son el ideal sin repetición, no una promesa. Revisar con uso real (si en la práctica se siente repetitivo, el candidato es el cupo de nuevas, no los pesos).
- **Tablas que se retiran (Deklination):** `ui/tablas.json` + `ui/dgui-tablas.js`; 191 ítems con tabla de ayuda (completa → media → ninguna por dominio del `errorTag`) y cadena caso → casilla → forma tras fallar. Con tabla visible la regla no se abre sola (cabe en pantalla). Ajustes → «Tablas de ayuda».
- **Terminación y escalera de ayuda:** variante `ending` (raíz puesta, se elige solo la terminación) y escalera por intentos acumulados del `errorTag` (`variants.ladderLevel`: <5 ayuda; ≥20 con ≥85 % dominado): opciones → bloques/terminación → letras sueltas. Observación: los `errorTag` de verbos son amplios (4 tipos), por eso «dominado» pide 20 intentos y no 6 como las tablas. Ajustes → «Ayuda que se retira».
- **Niveles Auto / A1 / A2 / B1 (corrección):** antes solo había Auto/A1/A2 (B1 «era igual que Auto» porque solo existía el tope). Ahora B1 existe y significa **practicar B1**: tope B1 + nivel actual B1 (`engine.setLevel`, cambio de motor con prueba que fallaba antes), con ≈20 % de repaso de A1/A2. A1 y A2 igual (tope + nivel actual en ese nivel). Al salir de Auto se recuerda el nivel ganado por dominio y **Auto lo restaura**.
- **Wortschatz y Satzbau activos (primera versión, solo A1):** datos generados por `tools/gen-wortschatz-satzbau.js` desde la referencia 2.4.4, sin inventar contenido: Wortschatz 2.316 ítems (ES→DE 808, DE→ES 808, escribir la palabra 478, en contexto 222; sustantivos con artículo en color y forma; distractores de la misma categoría en reconocimiento y de otras categorías en contexto) y Satzbau 421 ítems de ordenar (afirmaciones 379, W-Frage 19, preguntas sí/no 17, 6 transformaciones de frase; la regla de V₂ / preguntas sale al fallar). **Límites:** solo A1 (las fuentes son A1; con B1 elegido estos dos módulos siguen en A1); la clasificación de frases es por puntuación y palabra interrogativa, no un análisis gramatical; no hay traducción de las frases; se descartaron las frases con marcadores `{{profile.*}}`. El HTML pasa a ≈3,6 MB con 7 módulos.
- **Fuentes «Alemán Markups» (58 archivos, `docs/fuentes/aleman-markups/`):** evaluación en `docs/EVALUACION-markups.md`. Aprovechado: errores típicos en las cápsulas (81 viñetas, 27 conceptos), cápsula correcta por tiempo verbal (**defecto corregido**: el Präteritum mostraba la regla del Präsens), Wortschatz A2/B1 desde las tablas de vocabulario de las clases (2.316 → **4.206 ítems**; A1 2.563, A2 453, B1 1.190) y pistas de sufijo para el género (26 terminaciones). No aplicado: Q&A y ejemplos de las clases (el proyecto exige ejercicios originales), clases B2/C1 y material de examen. El repo es **público**: se subieron los 58 archivos por decisión expresa del autor (incluye su nombre en la fuente maestra y la extracción OCR de un curso). Reproducible: `node tools/extract-reglas.js && node tools/extract-reglas-md.js`, `node tools/extract-sufijos.js`, `node tools/gen-wortschatz-satzbau.js`. Límite: el nivel de una palabra es el de la clase donde aparece primero, no un nivel CEFR por palabra. HTML ≈4,2 MB (10.634 ítems).
- **Cápsulas de Präpositionen y Konnektoren:** mapeo concepto→clase decidido por contenido (ver `EVALUACION-markups.md`); cobertura por ítem Verben/Artikel/Satzbau 100 %, Präpositionen 98 %, Deklination 98 %, Konnektoren 84 % (hueco: partículas modales, ninguna clase las trata). Los conceptos `a24:prep-*` son alias (`{alias}` en `reglas.json`).
- **PWA (lista para publicar):** `npm run build:ui` genera `dist/index.html` (mismos bytes que `deutschraum-gym.html`), `manifest.webmanifest`, `sw.js` (caché `dg-<hash>`: app shell precacheado, caché primero, sin red las navegaciones reciben el shell, las cachés antiguas se borran al activar; nunca toca `localStorage`) e `icons/` (PNG versionados, `tools/gen-icons.js`). Rutas **relativas** (GitHub Pages sirve en subruta). Raíz del repo: `index.html` (redirige a `dist/`), `.nojekyll` (los `.md` llevan `{{…}}`) y `.github/workflows/pages.yml` (publicación **manual** por Actions, opcional). Ajustes → «Instalar y sin conexión». **Verificado en Chromium real** (`tools/check-pwa.js`, con y sin subruta): SW activo, una caché versionada, app shell precacheado, instalable (sin errores de instalabilidad), recarga **sin red** y el progreso de `localStorage` intacto. Pruebas: `tests/pwa.test.js` (salida del build + SW simulado) y 3 jsdom. **Límites:** no pude alcanzar `github.io` desde el entorno (proxy), así que la URL publicada no está verificada; la instalación solo se prueba de verdad en https. Pasos: `docs/PUBLICAR.md`.
- **Evaluación de la propuesta inicial** (`docs/EVALUACION-propuesta.md`): aplicado ahora **Präpositionen** y **Konnektoren** jugables (datos y motor ya existían; 299 y 281 ítems), **Consulta de reglas** y **copia de seguridad** exportar/importar. Pendiente/bloqueado: andamiaje de tablas y motor de 4 movimientos (Deklination), «completar solo la terminación», PWA, minutos reales de sesión, Wortschatz/Satzbau (sin datos).
- **Ideas pendientes (de la charla sobre Grammatik aktiv):** ciclo Verstehen→Üben→Sprechen por concepto, preguntas-respuesta en cadena (Wo?/Wohin?), «completar solo la terminación» (gut__), «Mis palabras», frases personalizadas, cruce del temario por capítulos A1–B1.
- Pruebas: ver `npm test` (UI en `tests/ui-*.test.js`; `ui-variedad` con 2 `todo` a propósito).

## Etapas 4–6 — PENDIENTES
