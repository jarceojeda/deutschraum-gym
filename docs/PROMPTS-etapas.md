# Prompts de arranque por etapa · Deutschraum Gym

Todas las etapas parten de `SPEC-deutschraum-gym.md` y de `ESTADO.md`. Desde la etapa 3 se trabaja en este repo con Claude Code.

## Estado REAL de las etapas (reordenado tras el PR #2)
Durante la «etapa 3» se hizo también buena parte de las etapas 4 y 5 (ver `docs/ESTADO.md`, secciones «Etapa 3» y «Etapa 3b»). Este cuadro manda sobre los textos de abajo, que se conservan como historial.

| Etapa | Alcance | Estado |
|---|---|---|
| 0–2b | SPEC, contenido, motor y revisión Opus | **Hecha** |
| 3 | Interfaz móvil + Verben, Artikel, Deklination | **Hecha** (PR #2 fusionado) |
| 3b | Paridad de UX con la 1.9.0: tokens/tema, inicio, variantes por toque, cápsulas, retención, ajustes, voz | **Hecha** |
| 4 | Resto de módulos (Präpositionen, Konnektoren, Wortschatz, Satzbau), Viaje combinado, Mis errores | **Hecha en lo esencial** (7 módulos jugables). Pendiente → **4c** |
| 4b | **Gramática B1** — HECHA en lo esencial (rama `etapa4-gramatica`): Plusquamperfekt, Futur I, Imperativ, Konjunktiv II y Passiv (Präsens/Präteritum) en Verben; Relativpronomen y Komparativ/Superlativ en Deklination (tabla propia s11-6); TeKaMoLo y «Trampas» en Satzbau; Pronunciación en Wortschatz (🔊 con palabra de ejemplo); Biblioteca de clases (51 fichas) en Consulta; «Más allá del B1» opcional (vocabulario B2/C1, apagado por defecto). Todo con ejercicios originales generados y pruebas. Pendiente de pulir: ver ESTADO. | **Hecha en lo esencial** (pendiente de PR) |
| 4c | Datos definitivos de Wortschatz (1.139) y Satzbau (216) del pipeline + «Mis palabras» (requiere cambio de motor con prueba) | «Mis palabras» **hecha**; datos definitivos pendientes (no están en el repo) |
| 5 | Teoría, rampa A1→B1 con tope, backup, PWA, voz, «Escribir» | **Hecha en lo esencial** (publicada como PWA). Pendiente → **5b** |
| 5b | Modo Casa para laptop, ciclo Verstehen→Üben→Sprechen formal, cheat sheets A2/B1 completos en la Consulta, frases personalizadas | Pendiente |
| 6 | **Auditoría final** (accesibilidad, diéresis en todos los datos, cola de errores, filtro de nivel, pools, viewport, pendientes de la revisión Opus 2b) | **Pendiente: se hace al final** |

---
## Etapa 3 · Interfaz base + 3 módulos
Modelo: Sonnet 5.5 · esfuerzo medium.

> Lee docs/SPEC-deutschraum-gym.md y docs/ESTADO.md. Etapa 3: interfaz móvil (Pixel 10 Pro, una mano, botones abajo, modo oscuro, Modo Tren por toques) y los módulos Verben, Artikel y Deklination jugables, con explicación de una línea al fallar y botón "ver regla". Arma el HTML único con el script de build. Prueba con jsdom y en viewport de teléfono. Entrega una versión que pueda probar. Al terminar: "etapa lista, cierra aquí" y actualiza ESTADO.md.

---
## Etapa 4 · Resto de módulos y viaje combinado (HISTORIAL: hecha en lo esencial)
Modelo: Sonnet 5.5 · esfuerzo medium (low al clonar módulos parecidos).

> Lee SPEC y ESTADO. Etapa 4: agrega Präpositionen, Konnektoren/Partikeln, Wortschatz (con "Mis palabras") y Satzbau, más el Viaje combinado de 5/10/20 min y "Mis errores". Reutiliza el motor y los componentes existentes. Prueba y entrega diffs.

---
## Etapa 5 · Teoría, rampa, Modo Casa, backup y PWA (HISTORIAL: hecha en lo esencial; resto = 5b)
Modelo: Sonnet 5.5 · esfuerzo medium.

> Lee SPEC y ESTADO. Etapa 5: pestaña de consulta con los cheat sheets A1/A2/B1 y declinaciones, ciclo Verstehen→Üben→Sprechen con TTS opcional, rampa A1→B1 con tope de nivel, mapa de errores por tipo, Modo Casa (escribir con teclado), exportar/importar copia de seguridad, manifest y service worker para publicar en una URL estática gratis. Prueba todo.

---
## Etapa 6 · Auditoría (PENDIENTE, al final)
Modelo: Sonnet 5.5 · esfuerzo medium (high solo para un bug difícil).

> Lee SPEC y ESTADO. Etapa 6: audita la app completa con pruebas E2E en jsdom (estado de localStorage tras errores deliberados), revisa umlauts, cola de errores, filtro de nivel, tamaño de pools, accesibilidad y viewport de teléfono. Corrige lo confirmado y entrega un informe corto.

---
## Etapa 4b · Gramática B1
Modelo: Sonnet 5.5 · esfuerzo medium.

> Lee SPEC, ESTADO y `docs/EVALUACION-markups.md`. Etapa 4b: cubre los temas B1 del SPEC §7 que la app no practica (Plusquamperfekt, Futur I, Imperativ, Konjunktiv II, Passiv, Relativpronomen, Komparativ/Superlativ, TeKaMoLo) **dentro de los módulos existentes** (Verben, Deklination, Satzbau; sin módulo nuevo ni cambio de motor), con ejercicios **generados desde reglas y datos propios** (nunca copiados de las clases ni del libro), cápsula y errores típicos por tema, variante «Trampas» (forma correcta vs error típico) y pruebas que verifiquen cada forma generada. Después: Biblioteca de consulta ampliada y «Más allá del B1» opcional.
