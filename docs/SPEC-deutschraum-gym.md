# SPEC · Deutschraum Gym (nombre de trabajo)

App de ejercicios cortos para consolidar vocabulario, conjugación, declinación y uso de preposiciones/conectores en alemán, de A1 a B1. Se usa sobre todo en el Google Pixel 10 Pro, en el tren. Fuente de verdad del diseño: cada etapa de desarrollo parte de este documento.

## 1. Objetivo (North Star)
Prepararse para el B1 (examen en varios meses) afirmando: vocabulario, conjugación (regulares e irregulares), declinación, preposiciones, conectores/partículas. **Fuera de alcance:** Hören, Lesen, Schreiben, Sprechen estilo TELC, planes de examen, capítulos TELC. Eso se estudia aparte con libros.

## 2. Decisiones ya tomadas
- Uso principal: Pixel 10 Pro (una mano, botones abajo). Laptop secundario.
- Hospedaje: URL estática gratis (GitHub Pages o Netlify) para instalar como PWA y funcionar offline (service worker). Build final = un solo HTML + manifest + sw.js. El progreso NO se sincroniza entre dispositivos: exportar/importar copia de seguridad.
- Entrada: **Modo Tren** (solo toques) por defecto. **Modo Casa** (teclado) en la etapa 5: escribir completo, para laptop. Andamiaje en toques: opciones con distractores → banco de letras → completar solo la terminación.
- Niveles: se empieza en A1 y se sube hasta B1 con dificultad ascendente por dominio (no por calendario). Tope de nivel ajustable por el usuario. Cada ítem lleva nivel A1/A2/B1.
- Mezcla en sesión: ~70% nivel actual, ~20% repaso más fácil, ~10% reto un nivel arriba. Objetivo de aciertos ~85%.
- Stack: HTML/CSS/JS vanilla, sin frameworks ni backend, localStorage, IIFE modules, Web Speech API (TTS alemán). Desarrollo en archivos separados (datos, motor, interfaz) y un script que arma el HTML único.
- Estilo/UX/delight: principios de Nesrine Changuel (Product Delight): el deleite aparece donde ya resolvimos un dolor real; nada decorativo. Colores de género der/die/das (más forma, no solo color), racha con perdón, "rescataste una palabra que fallabas", cierre de sesión "hoy aprendiste X que ayer no sabías", modo oscuro, movimiento reducido, vibración suave.

## 3. Módulos (cada uno se practica solo)
1. **Verben:** conjugar con toques 6 personas + Partizip II. Luego Präteritum (Stammformen), separables, modales, haben/sein, Vokalwechsel, Konjunktiv II (B1).
2. **Artikel:** género con color y forma, plural, pistas de sufijo después del error, Komposita.
3. **Deklination:** motor de 4 movimientos (caso → casilla → quién lleva la señal → cola del sustantivo). Fuente: `aleman_declination_master_mobile_v1_1.html` (tareas BAU ES UM de 5 niveles, tarjetas de error). Andamiaje que se retira: tabla completa → media tabla → ninguna. Incluye Dativ plural, N-Deklination, Genitiv.
4. **Präpositionen:** ítems tipo chunk con par mínimo ("auf dem Tisch" vs "auf den Tisch") bajo la pregunta Wo?/Wohin?; preposiciones por caso, Wechselpräpositionen, contracciones (im/am/zum/zur), im/am/um, verbos con preposición (warten auf + Akk).
5. **Konnektoren y Partikeln:** ordenar frases con toques (weil, dass, wenn, obwohl, als/wenn/ob, deshalb, trotzdem) y partículas modales (doch, mal, ja, eben, halt).
6. **Wortschatz:** por las 7 situaciones de los cheat sheets, sustantivos siempre con artículo coloreado; DE↔ES, producción, contexto. Más "Mis palabras": agregar una palabra propia en ~10 s y que entre al repaso con su artículo.
7. **Satzbau:** ordenar frases con toques (V₂, TeKaMoLo, verbo final, preguntas).

## 4. Modos de uso
- **Un módulo** (5 min / sesión larga).
- **Viaje combinado** 5/10/20 min, intercalando módulos según puntos débiles (bloques al introducir un tema, intercalado después).
- **Mis errores:** rehacer lo fallado.
- Al fallar: explicación de una línea (fórmula o tira de memoria del cheat sheet) y botón "ver regla" que abre el tema completo en un panel. Pestaña de consulta con los cheat sheets A1/A2/B1 y el de declinaciones, separada de los ejercicios.
- Mapa de errores por tipo (ej. "Dativ plural", "als/wenn").

## 5. Método tomado de Grammatik aktiv (Cornelsen, A1–B1)
Se toma el método, no el texto (ejercicios 100% originales):
- Ciclo **Verstehen → Üben → Sprechen** por concepto: microtarjeta (regla + 2 ejemplos en contexto) → práctica guiada que pasa a producción → repetir la frase en voz alta con TTS (opcional, apagado en Modo Tren).
- Regla visible al principio y luego oculta (andamiaje).
- Cadenas pregunta-respuesta (estilo "páginas de pareja") para automatizar estructuras.
- Usar el temario por capítulos como lista de control de cobertura A1–B1 (pendiente: el usuario aporta el índice del libro, solo títulos).

## 6. Motor (requisitos y lecciones de bugs previos)
- **Randomizador:** muestreo ponderado sin reemplazo (NO ordenar por puntaje + ruido); memoria de lo visto en las últimas N sesiones; cuotas por tipo/habilidad; semilla NO atada a la fecha (solo determinista en tests). Test: simular 200 sesiones y medir tasa de repetición y cobertura.
- **Repaso espaciado por habilidad**, no por palabra (ej. "fahren": presente, Partizip, Präteritum por separado).
- Todo lo fallado entra siempre a la cola de repaso; reintento del mismo error dentro de la sesión.
- Comparación de texto segura con ä/ö/ü/ß (NUNCA NFD que borre diacríticos) y evaluación tolerante (sinónimos o similitud).
- Filtro de nivel aplicado de forma consistente en todos los módulos.
- Tamaño mínimo validado de cada pool (sin pools de 5 ítems); modos que no cumplan su meta deben avisar.
- Datos con esquema validado; progreso con versión y migración; exportar/importar.
- Pruebas end-to-end con Node + jsdom inspeccionando localStorage tras errores deliberados.

## 7. Contenido de origen (a reutilizar)
- `Deutschraum-A1-2.4.4.html`: ~876 vocab (291 sustantivos, 128 verbos, 320 frases...), 234 ítems de gramática, 21 transforms, 216 conceptos enlazados a lecciones, 41 capítulos de vocabulario. **Descartar:** listening, reading, writing, speaking, plan de 14 días y "Camino" de 18 paradas hacia el examen.
- `Deutschraum-Training-1.9.0-Modo-Tren.html`: 331 vocab y 145 ítems de declinación (en gran parte superado por la 2.4.4); aporta UX Modo Tren y tiras de memoria.
- Cheat sheets `telc_a1_v4_3`, `telc_a2_v1_2`, `telc_b1_v1_1` y `aleman_declination_master`: marcos de decisiones, fórmulas, tiras de memoria, errores típicos, vocabulario por situación. **Descartar** capítulos TELC, Schreibkasten y Sprechen.
- Docs `.md` del Project (51 temas): extraer lo que haga falta módulo por módulo. Mapa orientativo: A1 = personales, nominativ, akkusativ, possessiv, präsens, grundstruktur, dativ, negation, fragen, imperativ, trennbare; A2 = perfekt, präteritum, wechselpräpositionen, adjektive, reflexive, futur, genitiv, komparativ, nebensätze 1, konnektoren; B1 = passiv, relativsätze, konjunktiv II, indirekte fragen, plusquamperfekt. Konjunktiv I, Nominalisierung y subordinadas en Konjunktiv II: aparcar.

## 8. Etapas, modelo y esfuerzo (priorizar créditos)
| Etapa | Entregable | Modelo | Esfuerzo |
|---|---|---|---|
| 0 | SPEC + prompts (este doc) | Sonnet 5.5 | medium |
| 1 | Pipeline de contenido: datos unificados, etiquetados por nivel, validados, ampliados A2/B1 | Sonnet 5.5 (+ Opus 5.5 una vez para revisar tablas delicadas) | medium |
| 2 | Motor + simulaciones, sin interfaz (+ revisión Opus 5.5 una vez) | Sonnet 5.5 | high (solo aquí) |
| 3 | Interfaz base + Verben, Artikel, Deklination jugables en el teléfono | Sonnet 5.5 | medium |
| 4 | Resto de módulos + viaje combinado | Sonnet 5.5 | medium/low |
| 5 | Teoría bajo demanda, rampa A1→B1, Modo Casa (teclado), backup, PWA hospedada | Sonnet 5.5 | medium |
| 6 | Auditoría E2E + viewport de teléfono | Sonnet 5.5 | medium (high solo para un bug difícil) |
| — | Tareas mecánicas (esquema, renombres, formato) | Haiku 5.5 | default |
Nunca xhigh/max. No usar Fable/Mythos.

## 9. Protocolo de chats (ahorro de créditos)
- Un chat por etapa, dentro de este Project. Cada chat arranca con el prompt de su etapa (ver `PROMPTS-etapas.md`).
- Cerrar el chat al terminar la etapa con su entregable probado; Claude lo indica con "etapa lista, cierra aquí".
- No re-subir los HTML grandes al contexto: usar scripts de extracción y lecturas parciales. Pedir diffs, no archivos completos.
- Al cerrar cada etapa, actualizar en el Project un `ESTADO.md` corto (qué quedó hecho, decisiones, archivos).
