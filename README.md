# Deutschraum Gym

App de ejercicios cortos de alemán (A1 → B1): conjugación, artículos, declinación, preposiciones y conectores. Uso principal: Pixel 10 Pro, Modo Tren (solo toques), offline como PWA.

**Estado:** motor + interfaz móvil (7 módulos) + PWA sin conexión. Cómo publicarla e instalarla: `docs/PUBLICAR.md`. Estado detallado: `docs/ESTADO.md`.

## Comandos

```bash
npm ci            # instala jsdom (única dependencia, solo para pruebas)
npm test          # arma dist/dg-engine.bundle.js y corre todas las pruebas (≈3 min; incluye simulaciones)
npm run test:fast # lo mismo sin las simulaciones (SIM)
npm run bundle    # sólo genera dist/dg-engine.bundle.js
npm run build:ui  # arma el HTML único y la PWA en dist/
node tools/make-report.js   # regenera sim/REPORT.md (tarda ~1 min)
```

Requiere Node ≥ 20 (probado con 22).

## Estructura

| Carpeta | Contenido |
|---|---|
| `src/` | Motor: 10 módulos IIFE (`window.DG.*`, también `require` en Node) |
| `data/` | JSON de contenido: verben, artikel, deklination, praepositionen, konnektoren + concepts; wortschatz y satzbau son una primera versión generada (`tools/gen-wortschatz-satzbau.js`) |
| `tests/` | Pruebas node:test + jsdom (unitarias, e2e, simulación) |
| `sim/` | Simulación con alumno sintético y `thresholds.js` (umbrales con su origen) |
| `tools/` | `bundle.js` (arma el bundle), `load-data.js`, `make-report.js` |
| `ui/` | Interfaz (IIFE vanilla): pantallas, variantes de ejercicio, cápsulas de regla, voz, PWA |
| `dist/` | `dg-engine.bundle.js` y la PWA armada: `index.html` (= `deutschraum-gym.html`), `manifest.webmanifest`, `sw.js`, `icons/` |
| `docs/` | SPEC, ESTADO, prompts por etapa, revisión Opus, historial de parches |

Leer primero: `docs/SPEC-deutschraum-gym.md` y `docs/ESTADO.md`. Las instrucciones para Claude Code están en `CLAUDE.md`.
