# Prompts de arranque por etapa · Deutschraum Gym

Todas las etapas parten de `SPEC-deutschraum-gym.md` y de `ESTADO.md`. Las etapas 0–2b ya están hechas. Desde la etapa 3 se trabaja en este repo con Claude Code (los textos de las etapas anteriores se conservan por referencia).

---
## Etapa 3 · Interfaz base + 3 módulos
Modelo: Sonnet 5.5 · esfuerzo medium.

> Lee docs/SPEC-deutschraum-gym.md y docs/ESTADO.md. Etapa 3: interfaz móvil (Pixel 10 Pro, una mano, botones abajo, modo oscuro, Modo Tren por toques) y los módulos Verben, Artikel y Deklination jugables, con explicación de una línea al fallar y botón "ver regla". Arma el HTML único con el script de build. Prueba con jsdom y en viewport de teléfono. Entrega una versión que pueda probar. Al terminar: "etapa lista, cierra aquí" y actualiza ESTADO.md.

---
## Etapa 4 · Resto de módulos y viaje combinado
Modelo: Sonnet 5.5 · esfuerzo medium (low al clonar módulos parecidos).

> Lee SPEC y ESTADO. Etapa 4: agrega Präpositionen, Konnektoren/Partikeln, Wortschatz (con "Mis palabras") y Satzbau, más el Viaje combinado de 5/10/20 min y "Mis errores". Reutiliza el motor y los componentes existentes. Prueba y entrega diffs.

---
## Etapa 5 · Teoría, rampa, Modo Casa, backup y PWA
Modelo: Sonnet 5.5 · esfuerzo medium.

> Lee SPEC y ESTADO. Etapa 5: pestaña de consulta con los cheat sheets A1/A2/B1 y declinaciones, ciclo Verstehen→Üben→Sprechen con TTS opcional, rampa A1→B1 con tope de nivel, mapa de errores por tipo, Modo Casa (escribir con teclado), exportar/importar copia de seguridad, manifest y service worker para publicar en una URL estática gratis. Prueba todo.

---
## Etapa 6 · Auditoría
Modelo: Sonnet 5.5 · esfuerzo medium (high solo para un bug difícil).

> Lee SPEC y ESTADO. Etapa 6: audita la app completa con pruebas E2E en jsdom (estado de localStorage tras errores deliberados), revisa umlauts, cola de errores, filtro de nivel, tamaño de pools, accesibilidad y viewport de teléfono. Corrige lo confirmado y entrega un informe corto.
