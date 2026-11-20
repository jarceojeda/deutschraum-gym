# Auditoría (etapa 6) · Deutschraum Gym

Alcance: contenido (corrección), motor y aprendizaje, UX/UI, accesibilidad, rendimiento/PWA, producto y «delight».
Método: scripts reproducibles (`tools/audit-contenido.js`, `tools/audit-aprendizaje.js`, `tools/audit-ux.js` en Chromium real a 390×844 claro/oscuro, `tools/check-pwa.js`) + revisión manual de muestras. Capturas en `docs/capturas/audit/`.
Honestidad: la revisión lingüística la hizo un modelo, **no una persona nativa**; los hallazgos de alemán/español son de alta confianza en formas verbales y géneros, de confianza media en traducciones y matices.

## 1. Contenido — qué se revisó y qué se encontró
| Revisado | Resultado |
|---|---|
| 263 verbos × presente/Präteritum/Partizip II/auxiliar (lectura completa de la tabla) | Formas correctas. Observaciones abajo (A). |
| 474 géneros de sustantivos (der/die/das, lista completa) | **Sin errores.** |
| Muestras de Deklination, Präpositionen, Konnektoren (16 c/u) y Wortschatz (110) | Correctas, salvo los defectos de Wortschatz ya corregidos. |
| Todo `data/` junto en el motor, NFC/NFD, mojibake, opciones duplicadas, respuesta fuera de opciones | 0 errores graves. |
| Sesgo de posición de la respuesta | 0:1611 · 1:1363 · 2:1451 · 3:1466 (sin sesgo fuerte); la más larga es la correcta en 32 % de los casos (azar ≈ 25 %, aceptable). |

**Corregido en esta etapa (con prueba de regresión):**
- Wortschatz (clase 034, reflexivos): **15 filas con las columnas alemán/español intercambiadas** («ausgehen» como respuesta a «apagarse») y **6 filas con las marcas «sí/no» convertidas en traducciones** («sí = ärgern»). Ahora se intercambian o se descartan.
- 6 ejercicios idénticos duplicados (p. ej. *buchstabieren*, *helfen*): ya no hay duplicados.
- Significado de *hängen* (las formas del contenido son transitivas): «colgar (algo)».
- Texto desactualizado en Ajustes («Wortschatz y Satzbau solo tienen A1»).

**Abierto (decide el dueño del pipeline; `data/verben.json` no se tocó):**
- (A1) `bewerben` está sin «sich» (se usa siempre `sich bewerben um`).
- (A2) `hängen`: las formas son las del verbo transitivo (*hängte/gehängt*); el intransitivo es *hing/gehangen* (ya existe `abhängen`).
- (A3) Perfekt de `treten`/`brechen`: sólo se acepta un auxiliar; depende del sentido (movimiento vs. acción).
- (A4) 45 enunciados del pipeline llevan doble espacio antes del paréntesis de ayuda (cosmético; HTML lo colapsa) y un par de pistas acaban en «!.».

## 2. Aprendizaje (motor real, todo el contenido, 60 sesiones simuladas × 20 ejercicios)
- Rendimiento: `createEngine` 71 ms con 12.882 ítems; `startSession` ≈ 10 ms (máx. 50).
- Ritmo: con 3–18 % de fallos se ven ≈ 350–400 ítems distintos en 60 sesiones, repetidos ≈ 3,5–4,5 veces (aprendizaje + 2 repasos). Es el repaso espaciado funcionando; no es estancamiento. Solape con la sesión anterior ≈ 14 %.
- Rampa Auto: sube de nivel en varios módulos en ~60 sesiones con ≥92 % de aciertos; a 82 % casi no sube. **Descubribilidad:** los ejercicios B1 (Plusquamperfekt, Konjunktiv II, Passiv…) **no se ven nunca en modo Auto hasta dominar el A1/A2** de Verben; hoy hay que pulsar «B1». Ver recomendación R1.
- Habilidades nunca vistas en 60 sesiones: 14–34 de 92 según precisión (las B1).

## 3. UX/UI y accesibilidad (Chromium real, 390×844)
- Sin desborde horizontal, sin errores de página, objetivos táctiles ≥ 44 px, todos los controles con nombre accesible y los campos con etiqueta.
- **Corregido:** contraste insuficiente en modo claro (texto secundario `--muted` 3,9:1 y colores de módulo/género/caso 3,4–4,4:1 → ≥ 4,5:1); **toast de éxito en modo oscuro 2,1:1** (texto blanco sobre verde claro) → ahora texto oscuro; textos de 11–11,5 px → 12 px; foco visible también en campos, `summary` y filas.
- **Corregido:** el texto alemán no llevaba `lang="de"`; un lector de pantalla (TalkBack) lo leía con voz española. Ahora enunciados y opciones alemanes llevan `lang="de"` y los españoles `lang="es"`.
- Pendiente de comprobar en dispositivo real: TalkBack, ratón/teclado en laptop, capturas del diseño ancho.

## 4. Rendimiento y PWA
- HTML único de 5,6 MB (tope 6 MB). Arranque en Chromium con CPU ×4: 1,2 s; abrir sesión 0,3 s; heap ≈ 23 MB. PWA: instalable, offline verificada (con y sin subruta). La primera descarga es la parte pesada (el host debería servirlo comprimido; GitHub Pages lo hace).
- Riesgo: el contenido ya llena el 93 % del tope. Antes de añadir más datos conviene partir «Más allá del B1» y el contenido B1 en archivos que el service worker cargue bajo demanda.

## 5. Producto y «delight» (observaciones, no implementadas)
R1. **Puerta al B1:** un aviso único («Ya dominas A1 de Verben: ¿probar Gramática B1?») o una tarjeta «Gramática B1» en Inicio que fije B1 solo para Verben/Deklination. Es lo que más valor aporta hoy.
R2. **Panel de progreso:** hoy sólo hay racha, insignias y «Mapa de errores». Faltan «palabras aprendidas», «verbos dominados» y una curva semanal: es el motor de motivación más barato.
R3. **Cierre de sesión con peso emocional:** el resumen es informativo; un momento de celebración breve (movimiento reducido respetado) al subir de nivel o completar una racha.
R4. **Inicio más corto:** 11 secciones; agrupar «Consulta / Mi vocabulario» en una sola tarjeta y mostrar primero «Continuar» (última sesión).
R5. **Ajustes largo:** 14 secciones; agrupar (Práctica, Voz, Datos).
R6. **Color de género en las palabras:** viable sólo en listas (ya hay color+forma en artículos); en frases añade ruido; el caso no conviene por color (choca con género y falla en daltonismo): se mantiene la etiqueta N/A/D/G.
R7. Umbral de ramp (`masteryMaxUnits` 30): decisión de diseño; bajarlo acelera la promoción Auto. No se tocó.

## 6. Cómo repetir la auditoría
```
node tools/audit-contenido.js
node tools/audit-aprendizaje.js [semilla] [% de fallos]
NODE_PATH=$(npm root -g) node tools/audit-ux.js
NODE_PATH=$(npm root -g) node tools/check-pwa.js
```

## 7. Seguimiento: recomendaciones implementadas
- **R1** Gramática B1: tarjeta fija en Inicio (fija B1 en Verben, Deklination y Satzbau y arranca una mezcla) + aviso único tras 8 sesiones si Verben sigue por debajo de B1 (se descarta para siempre con «Ahora no»).
- **R2** «Mi progreso»: palabras dominadas, verbos con un tiempo dominado, aciertos, errores rescatados, barras de los últimos 7 días (diario guardado por sesión, 30 días) y avance por módulo.
- **R3** Celebración al subir de nivel, desbloquear un logro o cerrar una sesión limpia de ≥10 (animación breve, anulada por «reducir movimiento», aviso accesible).
- **R4** Inicio en tres bloques (Un módulo · Repaso · Mi material) y botón «Seguir: …» que retoma la última sesión (módulo, mezcla o mezcla B1).
- **R5** Ajustes en cuatro bloques plegables (Práctica abierto).
- **R6** Sin cambios, por decisión: el color de género ya está en artículos y palabras con artículo (listas, Mis palabras, resumen); en frases añade ruido y el caso no se marca por color (se mantiene N/A/D/G).
- **R7** Sin cambios, por decisión: con R1 la puerta al B1 ya no depende de la promoción Auto; `masteryMaxUnits` queda en 30 (protege la calidad del dominio) y se puede revisar con datos de uso real.
