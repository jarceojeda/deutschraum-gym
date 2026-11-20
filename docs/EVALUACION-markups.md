# Evaluación del zip «Alemán Markups» (58 archivos)

Archivos en `docs/fuentes/aleman-markups/` (ver su `README.md`). Qué contienen, qué se aprovechó, qué no y por qué.

## Inventario (medido con script)
| Grupo | Contenido | Cifras |
|---|---|---|
| 51 clases `NNN-*.md` | Estructura fija: front matter (`level`), §1 objetivos, §2 vocabulario (tabla alemán/español/categoría/ejemplo), §3 reglas y tablas, §4 frases, §5 **errores comunes** («⚠️ Atención»), §6 Q&A (`DATA_QUIZ_START`) | 1.868 filas de vocabulario · 440 viñetas de errores · 1.007 tarjetas Q&A · niveles de clase: A1 ×7, A2 ×10, B1 ×18, B2 ×13, C1 ×3 |
| `reglas-articulos-…` | Reglas de género y tablas de terminaciones | 26 terminaciones útiles |
| `vocabulario-a1-…` | Vocabulario A1 por situaciones (cita listas Goethe/telc como base) | solapa con la referencia 2.4.4 |
| `aleman-docx`, `consolidacion-final-…` | Hojas de clase A1 | contenido A1 ya cubierto |
| `gramatica-alemana` (454 KB) | Extracción OCR/PDF de un curso | duplica las clases; fuente de texto de curso |
| `aleman-a1-fuente-maestra` (983 KB) | Consolidación de las 58 fuentes | duplica todo; incluye cartas de ejemplo con el nombre del autor |
| `goethe-telc-a1-…` | Contenidos de examen | **fuera de alcance** (SPEC §1) |

## Aprovechado (con prueba)
1. **Errores típicos en las cápsulas de regla** (`tools/extract-reglas-md.js`): 81 viñetas «Atención» → `errores` (≤3 por concepto). 17 cápsulas enriquecidas y 10 nuevas (Präsens, Präteritum, Perfekt/Partizip II, V₂, preguntas, indefinidos, Genitiv, Akkusativ, N-Deklination, conectores dobles). Se ven como «Errores típicos (n)» desplegable tras fallar y abiertos en «Ver regla» y en la Consulta (grupo nuevo «Clases»).
2. **Defecto corregido:** un verbo en Präteritum mostraba la regla del Präsens (la cápsula se elegía por el primer concepto con regla). Ahora cada tiempo tiene la suya (`pickCapsule`; los 3.662 ítems de Verben tienen cápsula y, sin regla propia, queda el hueco).
3. **Wortschatz A2 y B1** (`tools/gen-wortschatz-satzbau.js` lee las tablas de vocabulario de las 35 clases A1/A2/B1): de 2.316 a **4.206 ítems** (A1 2.563 · A2 453 · B1 1.190). Solo palabra alemana + significado + categoría; **no** se usan los ejemplos de las clases. Dedupe por palabra alemana (gana la primera aparición, de menor a mayor nivel). Con esto el botón **B1** también cambia Wortschatz.
4. **Pistas de sufijo para el género** (`tools/extract-sufijos.js` → `ui/sufijos.json`, 26 terminaciones: 8 der, 12 die, 6 das): tras fallar un sustantivo de Artikel sale «**-ung** suele ser **die** (die Wohnung…)» o, si es excepción, «Ojo: -er suele ser der, pero Zimmer es das». Es lo que pedía el SPEC §3 (Artikel). Cubre los sustantivos cuya terminación está en la tabla (cientos de ítems).

## Valorado y NO aplicado (con motivo)
- **Tarjetas Q&A (1.007) como ejercicios:** los enunciados y ejemplos parecen proceder del curso (nombres como Bernd, Felix, Luis) y la regla de este proyecto es que **los ejercicios son originales** (no se copian textos de un libro). Además son cloze sin opciones. Queda como material de consulta; si se quieren ejercicios de B1 (Passiv, Konjunktiv II, relativsätze), conviene **escribirlos originales** con esos temas como guía.
- **Ejemplos de las clases** (frases): mismo motivo; no se incrustan.
- **Clases B2/C1 (16)**: fuera del alcance A1→B1 (SPEC §1).
- **Niveles de las clases como nivel de cada palabra:** el `level` de la clase es el del tema, no el de cada palabra (p. ej. «der Durst» aparece en una clase B1). Es una aproximación y está declarada; un nivel por palabra requiere una lista CEFR que no tenemos.
- **Goethe/telc, fuente maestra, gramática OCR:** no se usan para generar contenido (examen; duplicados; texto de curso).
- **Verbos separables/irregulares (009, 033):** la lista de irregulares (136 filas) ya está cubierta por `data/verben.json`; no aporta formas nuevas.

## Pendiente / propuesta
- ~~Cápsulas para Präpositionen y Konnektoren~~ (hecho, mapeo decidido por contenido: Wechsel→016; Dativ→011; Akkusativ→004/005; Genitiv→012 (sin viñetas relevantes: hueco); verbos con preposición→005/034; contracciones→011/016 con filtro; conectores a2→019/047; Nebensätze→040/044; conectores B1→043/044/047; preguntas indirectas→045/046). Los 33 conceptos de un solo ítem `a24:prep-*` son alias de su tipo. Cobertura por ítem: Verben 100 %, Artikel 100 %, Satzbau 100 %, Präpositionen 98 %, Deklination 98 %, Konnektoren 84 %. **Hueco declarado:** las partículas modales (45 ítems) no las trata ninguna clase.
- Ejercicios originales B1 (Passiv, relativsätze, Konjunktiv II, indirekte Fragen) para un módulo de gramática B1; es etapa 4+.
- Plurales: las tablas de plural y sufijos de plural no están en estas fuentes de forma tabular.
