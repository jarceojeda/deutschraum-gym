# Deutschraum Gym

App de ejercicios cortos de alemán (A1 → B1): conjugación, artículos, declinación, preposiciones y conectores. Uso principal: Pixel 10 Pro, Modo Tren (solo toques), offline como PWA.

**Estado:** motor sin interfaz terminado y probado (etapas 2 y 2b). La interfaz (etapa 3) está pendiente.

## Comandos

```bash
npm ci            # instala jsdom (única dependencia, solo para pruebas)
npm test          # arma dist/dg-engine.bundle.js y corre las 138 pruebas (≈70 s; incluye simulaciones)
npm run test:fast # lo mismo sin las simulaciones (SIM)
npm run bundle    # sólo genera dist/dg-engine.bundle.js
node tools/make-report.js   # regenera sim/REPORT.md (tarda ~1 min)
```

Requiere Node ≥ 20 (probado con 22).

## Estructura

| Carpeta | Contenido |
|---|---|
| `src/` | Motor: 10 módulos IIFE (`window.DG.*`, también `require` en Node) |
| `data/` | JSON de contenido: verben, artikel, deklination, praepositionen, konnektoren + concepts (wortschatz y satzbau aún no están) |
| `tests/` | Pruebas node:test + jsdom (unitarias, e2e, simulación) |
| `sim/` | Simulación con alumno sintético y `thresholds.js` (umbrales con su origen) |
| `tools/` | `bundle.js` (arma el bundle), `load-data.js`, `make-report.js` |
| `dist/` | `dg-engine.bundle.js`: lo que la interfaz incrusta en el HTML |
| `docs/` | SPEC, ESTADO, prompts por etapa, revisión Opus, historial de parches |

Leer primero: `docs/SPEC-deutschraum-gym.md` y `docs/ESTADO.md`. Las instrucciones para Claude Code están en `CLAUDE.md`.
