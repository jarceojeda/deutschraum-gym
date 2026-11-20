# CLAUDE.md · Deutschraum Gym

App de alemán A1→B1 (vanilla JS, sin frameworks ni backend, localStorage, IIFE modules). Usuario: Jorge, habla español; responde siempre en español. Uso principal en el Pixel 10 Pro en el tren (una mano, toques); laptop secundario.

## Lee antes de actuar
1. `docs/SPEC-deutschraum-gym.md` — fuente de verdad del diseño.
2. `docs/ESTADO.md` — qué está hecho, decisiones, API del motor, avisos honestos.
3. `docs/PROMPTS-etapas.md` — qué toca en cada etapa (ahora: etapa 3 = interfaz base + Verben, Artikel, Deklination).

## Comandos
- `npm ci` · `npm test` (138 pruebas, ≈70 s) · `npm run test:fast` (sin simulaciones) · `npm run bundle` · `node tools/make-report.js`.
- `npm test` regenera `dist/dg-engine.bundle.js`; si cambia `src/`, commitea también el bundle.

## Reglas del proyecto
- **Stack:** HTML/CSS/JS vanilla, IIFE modules, sin dependencias nuevas en runtime (jsdom sólo para pruebas). Build final = un solo HTML + manifest + sw.js que incrusta el bundle.
- **Texto alemán:** NFC siempre, NUNCA NFD (borraría diacríticos). Diéresis perdida = error; `ae/oe/ue/ss` sí valen.
- **No tocar el motor (`src/`) sin motivo.** Si la interfaz necesita algo, primero comprueba la API en `docs/ESTADO.md`; si falta, propón el cambio y añade una prueba que falle antes y pase después.
- **No tocar `data/`** salvo petición expresa. Los datos vienen de un pipeline externo; wortschatz y satzbau todavía no están en el repo.
- **Umbrales** (`sim/thresholds.js`): no se relajan para que pase un test. Si un cambio rompe un umbral por razones de diseño, parar y explicar.
- **Pruebas:** todo cambio con una prueba; `npm test` en verde antes de cada commit. Pruebas e2e con jsdom inspeccionando localStorage tras errores deliberados.
- **API del motor:** `view()` devuelve el mismo objeto en la misma posición (no mutarlo); `answer()/giveUp()/finish()` pueden devolver `saveError`; la entrada `letters` puede enviarse como array de letras (se unen sin espacios) o como texto.
- **UX (SPEC §2):** Modo Tren por toques por defecto, botones abajo, modo oscuro, movimiento reducido; el deleite sólo donde resuelve un dolor real.

## Flujo de trabajo
- Una rama por etapa o tarea (`etapa3-ui`, `fix/...`); commits pequeños en español o inglés, con mensaje claro. PR hacia `main`.
- Al cerrar una etapa: actualizar `docs/ESTADO.md` y decir «etapa lista, cierra aquí».
- Pedir diffs, no reescribir archivos completos. No volcar los JSON de `data/` (2,6 MB) en el contexto: usar scripts o lecturas parciales.
- Modelos: Sonnet 5.5, esfuerzo medium para la interfaz. Nunca xhigh/max.
