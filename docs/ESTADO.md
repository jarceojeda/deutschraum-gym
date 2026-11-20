# ESTADO · Deutschraum Gym

Resumen de lo hecho. Las etapas 0–2b se hicieron en chats del Project «Alemán» de claude.ai; desde la etapa 3 se trabaja en este repo con Claude Code. Este archivo es la fuente de estado (el del Project queda como copia histórica hasta la etapa 2b).

## Etapa 0 · SPEC + prompts — HECHA
## Etapa 1 · Contenido — HECHA
7.446 ítems en v1; tras la revisión Opus (1 bis) 7.362: verben 3.662, artikel 1.329, deklination 436, praepositionen 299, konnektoren 281, wortschatz 1.139, satzbau 216. concepts.json 268. Validación: 0 errores, 1 aviso mitigado, ningún pool <12.

**En este repo sólo están `verben`, `artikel`, `deklination`, `praepositionen`, `konnektoren` y `concepts`** (`data/`). **wortschatz y satzbau no están** y el motor no los ha probado (etapa 4).

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
- Motor: ajustes en `state().settings` (`levelCap`, `capByModule`, `memorySessions`, `errorShare`), `setLevelCap(nivel, módulo?)`, `errorQueue()`, `errorMap()`, `levelOf(m)`, `exportJSON()/importJSON()`.
- Entrada `letters` (verbos/plurales/transform sin `options`): la UI genera las fichas y envía array de letras (se unen sin espacios; en `order` sí con espacios) o texto. En `minimal-pair` las opciones son sólo las dos respuestas.
- Sin semilla el azar viene de `crypto.getRandomValues`; con semilla es determinista (sólo pruebas).

## Etapa 3 · Interfaz base + Verben, Artikel, Deklination — PENDIENTE (siguiente)
Prompt en `docs/PROMPTS-etapas.md`. Ramas sugeridas: `etapa3-ui`.
## Etapas 4–6 — PENDIENTES
