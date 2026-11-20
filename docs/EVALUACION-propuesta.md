# Evaluación de la propuesta de la charla inicial (¿se puede y tiene sentido aplicarla ahora?)

Criterio: **Hecho** = ya estaba o se aplicó ahora (con prueba). **Pendiente** = es posible, falta construirlo (con estimación). **Bloqueado** = falta un dato o una decisión. **No procede** = no tiene sentido hoy. Las cifras salen de los datos y de las pruebas, no de la propuesta.

## Lo que «funcionó y se queda»
| Propuesta | Estado | Notas |
|---|---|---|
| Modo Tren (solo toques) | Hecho | Por defecto; «Escribir» es opcional. |
| Conjugación 6 personas + Partizip II | Hecho (con límite) | Emparejado de 6 personas (+ Partizip II si existe su unidad). Solo la fila ★ puntúa: el motor puntúa 1 unidad = 1 ítem. |
| Colores de género y tiras de memoria | Hecho | der ● die ◆ das ⬢ plural ▲; caso N/A/D/G; cápsulas «regla/fórmula/ejemplo» (62 temas). |
| **Motor de 4 movimientos** (caso → casilla → quién lleva la señal → cola del sustantivo) | **Hecho (pasos 1–2 + forma)** | Tras fallar: cadena caso → casilla → forma con la tabla marcada (191 ítems). Los pasos «quién lleva la señal» y «cola del sustantivo» no existen como dato en `data/`; no los invento. |
| BAU ES UM de 5 niveles como ejercicios | Hecho | Ya están en `data/deklination` (`d244-decl-source-quiz-*`, transformaciones). |
| Ítems enlazados a conceptos y teoría al fallar | Hecho | `conceptIds` → cápsula tras fallar y «¿Por qué?». Cobertura **25 de 54** conceptos de los 3 primeros módulos; el resto queda en blanco. |
| Módulos sueltos + viaje combinado | Hecho | Ahora con 5 módulos. |

## Lo que se descarta
Hören/Lesen/Schreiben/Sprechen, plan TELC de 14 días, «Camino» de 18 paradas y capítulos TELC: **Hecho** (no están en el repo; ver `UX-PARIDAD.md`).

## Randomizador
Muestreo ponderado sin reemplazo, memoria de sesiones y cuotas: **Hecho en el motor** (etapa 2, con simulaciones). Prueba de la UI con 30 sesiones seguidas: pasa lo pedido (unidad ≤2 seguidas, módulos, personas); **los límites estrictos fallan** (37 % de ejercicios distintos con 8 h entre sesiones). Decisión abierta (ver `ESTADO.md`).

## Módulos
| # | Propuesta | Estado | Notas |
|---|---|---|---|
| 1 | Verben | Hecho | Präsens, Präteritum, Partizip II, haben/sein. Modales/separables/Konjunktiv II: lo que traiga `verben.json` por nivel. |
| 2 | Artikel | Hecho | Género con color y forma, plural, indefinido. «Pistas de sufijo»: cápsula `cs:t12` («die: -ung/-heit… · das: -chen/-lein»). |
| 3 | Deklination con andamiaje que se retira (tabla → media tabla → ninguna) | **Hecho** | `ui/tablas.json` (5 tablas de la guía §11). Completa con <3 intentos del tipo, media tabla (se oculta la mitad que contiene la respuesta, con «Mostrar toda») después, ninguna al dominarlo (≥6 intentos y ≥85 %). |
| 4 | **Präpositionen** (par mínimo Wo?/Wohin?, verbos con preposición, contracciones) | **Hecho ahora** | 299 ítems (33 pares mínimos). Par mínimo por toques, envía `{wo, wohin}` al motor. |
| 5 | **Konnektoren y Partikeln** (ordenar frases con toques) | **Hecho ahora** | 281 ítems: 107 de ordenar fichas con traducción, 24 «une con weil/deshalb» por palabras, 150 de elegir y partículas. |
| 6 | Wortschatz (7 situaciones, «Mis palabras») | Bloqueado | `wortschatz.json` no está en el repo. «Mis palabras» exige que el motor acepte ítems creados en la app (cambio de motor con prueba). |
| 7 | Satzbau | Bloqueado | `satzbau.json` no está en el repo. La UI ya sabe ordenar fichas, así que será barato cuando lleguen los datos. |

## Modos de uso
| Propuesta | Estado | Notas |
|---|---|---|
| Un módulo / Mis errores | Hecho | + Mapa de errores por tipo. |
| Viaje combinado de 5/10/20 min | Pendiente (calibrar) | Hoy 10/20/30 **ejercicios**. Falta medir segundos por ejercicio con uso real para etiquetar en minutos; no he medido tiempos. |
| Hacia el B1 (rampa, 70/20/10, tope) | Hecho | Motor + chips Auto/A1/A2. «Auto» ya llega a B1; no hay chip B1 aparte porque sería idéntico. |

## Teoría
| Propuesta | Estado | Notas |
|---|---|---|
| Explicación de una línea + «ver regla» | Hecho | |
| **Pestaña de consulta separada** | **Hecho ahora (parcial)** | «Consulta de reglas»: los 62 temas de `reglas.json`, solo lectura, sin ejercicios, filtrable (Declinación / A1). **No** incluye los cheat sheets completos A1–A2–B1: las hojas A2/B1 usan otros ids (`g1t…`, `g1-1-…`) y no están mapeadas a conceptos. |

## Principios
| Propuesta | Estado | Notas |
|---|---|---|
| Recuperación activa y repetición espaciada por habilidad | Hecho (motor) | |
| Bloques al introducir un tema e intercalado después | No verificado | El scheduler mezcla por casillas/cuotas; no probé una fase de «bloque» al introducir un tema. |
| ~85 % de aciertos, corrección inmediata, reintento | Hecho | |
| Delight (rescate, racha con perdón, cierre) | Hecho | Sin XP ni niveles. |
| Accesibilidad: forma además de color, movimiento reducido | Hecho | |
| Comparación segura ä/ö/ü/ß | Hecho | Pruebas con NFC/NFD y teclas ä ö ü ß en «Escribir». |
| **Exportar/importar copia de seguridad** | **Hecho ahora** | Ajustes → Exportar copia (JSON con checksum) / Importar copia (pide confirmar; rechaza archivos alterados o ajenos sin tocar nada). Las preferencias de pantalla (tema, voz, racha) no van en la copia. |
| Script que arma el HTML único | Hecho | `npm run build:ui` (≈2,6 MB con 5 módulos). |

## Dónde se usa y toques vs teclado
| Propuesta | Estado | Notas |
|---|---|---|
| URL gratis + PWA offline (service worker) | Pendiente (etapa 5) | Mantengo la recomendación. Ya se probó que un HTML suelto puede perder el progreso, por eso la copia de seguridad ya existe. Necesita: `manifest`, `sw.js`, iconos y activar GitHub Pages (decisión tuya). |
| Escalera «opciones → banco de letras → solo la terminación» | **Hecho** | Variante «solo la terminación» (322 plurales, Dativ plural, ~2.300 formas de verbo) y retirada progresiva por dominio del tipo de error: opciones → bloques/terminación → letras. Las ~120 terminaciones de adjetivos de Deklination ya eran de elegir solo la terminación (opciones del dato). Apagable en Ajustes. |
| Modo Casa (teclado completo para la laptop) | Parcial | «Escribir» ya existe (opcional); un Modo Casa pensado para laptop (atajos, Enter) queda para la etapa 5. |

## Propuesta de orden (si quieres seguir)
1. ~~Andamiaje de tablas en Deklination~~ (hecho).
2. ~~Variante «completar solo la terminación» + retirada progresiva de la ayuda~~ (hecho).
3. PWA + URL gratis (etapa 5) y calibrar los tamaños de sesión en minutos con uso real.
4. Wortschatz/Satzbau cuando lleguen los datos; «Mis palabras» con cambio de motor.
