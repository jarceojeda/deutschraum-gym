# Revisión Opus 5.5 · Etapa 2 (motor) — HISTÓRICO

Esta revisión se aplicó en la etapa 2b (ver `ESTADO.md`). Se conserva como referencia de qué problemas se detectaron y por qué existen ciertos tests. Los números de línea y el patch citados son los de la etapa 2, anteriores a 2b.

## Alta (todas resueltas en 2b)
1. **Rescate de errores sin tiempo mínimo** (`recordFirst` + scheduler): un error se rescataba minutos después. Ahora exige ≥16 h; `learning` no cuenta como `due`; escenario de simulación 3 sesiones/día.
2. **Evaluador: «casi» perdonaba lo que se practica** (Hund/Hunde, das/dass, den/dem, diéresis). Ahora plural = `none`, frases por palabras con lista cerrada, diéresis perdida = error.
3. **Sesiones abandonadas contaban** (contador, historial, carry). Ahora se confirman en la primera respuesta.
4. **Memoria penalizaba las vencidas.** Ahora `recencyFactor` sólo para `new` y `future`.
5. **Verbos «dominados» sin las formas con cambio de vocal.** Ahora du/er_sie_es ×3 y «dominada» exige acierto en esas personas (unidades difíciles).

## Media (resueltas en 2b salvo lo indicado)
- NFC al cargar datos + aviso del validador · `letters` como array sin espacios · vaciar `rev[nxt]` al promover · no reintentar con <2 ítems detrás · `saveError` · caché de `view()` · varios ítems por unidad en `kind:'errors'` · guarda anti-inanición de casillas · comentario de `masteryFrac`.
- **Pendientes (no se hicieron en 2b):** nota SRS 3 (`fast` nunca se pasa; ease sólo baja) · `masteredUnits` con `r ≥ 2` (llamarlo «evidencia» o exigir `r ≥ 3`) · `unitId` estable en datos (homógrafos der/die See; editar el sentido borra progreso vía `reconcile`) · evaluar la rampa de módulos pendientes si se mata la app antes de `finish()`.

## Baja (pendientes)
- Errores sanguijuela: peso crece con `f` sin tope; con `f ≥ 4` mostrar la regla antes.
- `importJSON`: acepta copias sin `checksum`; no llama a `reconcile`; importar a mitad de sesión pierde lo respondido.
- `dg-text.js`: caracteres invisibles literales en regex → usar escapes.
- `memorySessions` > 12 se corta por `HISTORY_MAX` sin aviso.

## Umbrales
- Cobertura mixta restaurada a 0,90/0,80 con 10 semillas nuevas (101–110); progreso = ≥2 de los 4 módulos que empiezan en A1; débil con comprobación de tendencia y espera máxima en el informe; «Duros» separado en el informe.
- **Pendiente:** nuevas ≥1/sesión (calibrado) no llega al B1 en meses (≈1,3 × 200 = 260 de 3.398 unidades): requiere un núcleo de alta frecuencia en los datos; umbral ≥ 0,15 × size.

**Puntos ciegos de la simulación:** varias sesiones/día (cubierto en 2b), sesiones abandonadas (cubierto), casi-aciertos (cubierto), diferencias entre personas dentro de una unidad (cubierto parcialmente por el punto 5).
