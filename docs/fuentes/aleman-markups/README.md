# Fuentes de trabajo · Alemán Markups

Archivos del Project «Alemán» de claude.ai (zip `Alemán Markups`, 58 archivos, ≈2,4 MB). Son **material fuente**: no se incrustan en la app ni se leen en tiempo de ejecución. Sirven para que los scripts de `tools/` generen contenido derivado (cápsulas de regla, vocabulario) de forma reproducible.

| Grupo | Archivos | Qué son |
|---|---|---|
| Clases | `001-…` a `051-….md` (51) | Una clase por tema con estructura fija: front matter (`class_id`, `title`, `level`, `topics`), §1 objetivos, §2 vocabulario (tabla alemán/español/categoría/ejemplo), §3 reglas gramaticales (tablas y fórmulas), §4 frases útiles, §5 **errores comunes** (viñetas «⚠️ Atención»), §6 tarjetas Q&A entre `DATA_QUIZ_START/END`. |
| Referencias | `reglas-articulos-aleman-der-die-das.md`, `vocabulario-a1-aleman-base-app.md` | Reglas de género y terminaciones; vocabulario A1 por situaciones. |
| Hojas de clase | `aleman-docx.md`, `consolidacion-final-aleman-a1-docx.md` | Cheat sheets de clase convertidos desde .docx. |
| Consolidados | `gramatica-alemana.md` (extracción OCR/PDF de un curso, 454 KB), `aleman-a1-fuente-maestra.md` (consolidación de las 58 fuentes, 983 KB) | Duplican el contenido de las clases; se conservan como respaldo. |
| Examen | `goethe-telc-a1-contenidos-app.md` | Contenidos de examen Goethe/telc A1. **Fuera del alcance de la app** (SPEC §1). |

## Nombres originales
Se renombraron a minúsculas sin acentos ni espacios: `Aleman.docx.md` → `aleman-docx.md` · `Consolidación final alemán A1.docx.md` → `consolidacion-final-aleman-a1-docx.md` · `Gramatica alemana.md` → `gramatica-alemana.md` · `goethe_telc_a1_contenidos_app.md` → `goethe-telc-a1-contenidos-app.md` · `reglas_articulos_aleman_der_die_das.md` → `reglas-articulos-aleman-der-die-das.md` · `vocabulario_a1_aleman_base_app.md` → `vocabulario-a1-aleman-base-app.md`.

## Qué se aprovecha y qué no
Ver `docs/EVALUACION-markups.md`. Resumen: se reutilizan las viñetas de errores comunes (cápsulas de regla) y las tablas de vocabulario (Wortschatz A2/B1). **No** se copian los ejemplos ni las tarjetas Q&A literalmente: los ejercicios de la app se escriben originales.

## Aviso
Este repositorio es público. Estos archivos se subieron por decisión expresa del autor, sabiendo que `aleman-a1-fuente-maestra.md` contiene su nombre en cartas de ejemplo y que `gramatica-alemana.md` procede de la extracción de un curso. Si algún titular de derechos lo pide, se retiran del historial.
