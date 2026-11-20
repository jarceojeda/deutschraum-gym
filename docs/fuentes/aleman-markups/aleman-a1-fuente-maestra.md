# Alemán A1 — Fuente Maestra de Contenido
### Base de conocimiento consolidada para la app de estudio A1 (Goethe/telc)

> **Qué es este archivo:** la consolidación de las 58 fuentes markdown del proyecto en
> un único documento, limpio y organizado, pensado para usarse como *source* en Codex
> al generar el contenido de la nueva app descrita en el prompt de arquitectura
> (motor SRS, Satzbau-Trainer de 7 niveles, entrenadores dedicados de género/verbos/
> declinación, etc.). No sustituye la curación tema por tema de la Parte 5 de ese
> prompt — es la base sobre la que esa curación se apoya.

## Cómo usar este documento

1. **Parte 1** da el marco oficial del examen (qué entra en Goethe A1 y en telc A1).
2. **Parte 2** es el núcleo A1 práctico y compacto: úsalo como primera referencia
   rápida al escribir `lessons`, `writingPrompts` y `speakingPrompts`.
3. **Parte 3** es el vocabulario base ya estructurado por dominio (identidad, casa,
   comida, compras...), listo para poblar `vocab` en el esquema de datos.
4. **Parte 4** son las reglas de artículos der/die/das — la base directa del
   ENTRENADOR DE GÉNERO GRAMATICAL (punto 16 del prompt de arquitectura).
5. **Parte 5** es la referencia gramatical profunda, unidad por unidad, con un
   **nivel CEFR orientativo** por tema y una marca explícita de si entra o no en el
   alcance estricto A1 de esta app. Es el respaldo teórico detrás de cada regla que
   sí se use; los temas fuera de alcance quedan igualmente documentados para no
   perderlos, siguiendo el principio del prompt: *"si un tema tiene versión simple
   (A1) y avanzada, cubrir solo la simple y decirlo explícitamente."*
6. **Parte 6** son tablas de declinación de referencia rápida (apéndice).
7. **Parte 7** explica qué otras fuentes del proyecto se revisaron y por qué no se
   incluyeron aquí, para que la decisión sea trazable y reversible.

## Alcance y convenciones de nivel

- El alcance de **esta app** es A1 estricto (Goethe-Zertifikat A1 / telc Deutsch A1),
  igual que exige el prompt de arquitectura (Parte 3, punto 1).
- Los niveles CEFR marcados en la Parte 5 son **orientativos**, no una clasificación
  oficial — sirven para decidir rápido qué mover a `lessons`/`sentenceTrainer.items`
  ahora y qué dejar como referencia para una futura ampliación A2. Ajusta lo que no
  encaje con tu propio criterio al curar cada tema.
- Todo el contenido aquí es **producción propia o síntesis didáctica del propio
  proyecto** (no material protegido de terceros), así que se reproduce completo en
  vez de resumirse.

## Mapa de fuentes

| Fuente original | Rol en este documento |
|---|---|
| `goethe_telc_a1_contenidos_app.md` | Parte 1 — marco de examen y hoja de ruta original |
| `Consolidación_final_alemán_A1_docx.md` | Parte 2 — núcleo A1 compacto |
| `vocabulario_a1_aleman_base_app.md` | Parte 3 — vocabulario base estructurado |
| `reglas_articulos_aleman_der_die_das.md` | Parte 4 — reglas der/die/das |
| `001-pronunciacion.md` … `051-subordinadas-en-konjunktiv-ii.md` | Parte 5 — gramática detallada por unidad |
| `Resumen_Declinaciones_docx.md` | Parte 6 — apéndice de tablas de declinación |
| `Gramatica_alemana.md`, `Aleman_docx.md` | **No incluidas** — ver Parte 7 |

---

## Parte 1 — Marco del examen Goethe/telc A1

**Propósito:** este archivo está diseñado como base de conocimiento para construir una aplicación HTML didáctica personal para aprender alemán A1 y preparar los exámenes **Goethe-Zertifikat A1: Start Deutsch 1** y **Start Deutsch 1 / telc Deutsch A1**.

**Idioma de apoyo:** español.  
**Idioma objetivo:** alemán A1.  
**Uso recomendado:** importar este `.md` en Claude, NotebookLM, Cursor, VS Code o cualquier generador de app HTML/JS para convertirlo en módulos interactivos, tarjetas, quizzes, ejercicios de escritura y simuladores de speaking.

---

#### 0. Fuentes oficiales consultadas

> Este documento resume y reorganiza información oficial. No copia tests completos ni sustituye las páginas oficiales. Para practicar el formato real, descarga siempre los materiales oficiales.

##### Goethe-Institut

- Goethe-Institut — **Goethe-Zertifikat A1: Exam training**  
  https://www.goethe.de/en/spr/prf/ueb/pa1.html
- Goethe-Institut — **Goethe-Zertifikat A1: Start Deutsch 1, información de examen**  
  https://www.goethe.de/ins/mm/de/spr/prf/gzsd1/inf.html
- Goethe-Institut — **A1 Modellsatz PDF**  
  https://www.goethe.de/pro/relaunch/prf/materialien/A1_sd1/sd_1_modellsatz.pdf
- Goethe-Institut — **Wortliste Goethe-Zertifikat A1: Start Deutsch 1 PDF**  
  https://www.goethe.de/pro/relaunch/prf/de/A1_SD1_Wortliste_02.pdf
- Goethe-Institut — **A1 online accessible exam training**  
  https://bfu.goethe.de/a1_sd1/

##### telc

- telc — **Start Deutsch 1 / telc Deutsch A1**  
  https://www.telc.net/sprachpruefungen/zertifikatspruefung/deutsch/start-deutsch-1-/-telc-deutsch-a1/
- telc — **Start German 1 / telc German A1**  
  https://www.telc.net/en/language-examinations/certificate-exams/german/start-german1-telc-german-a1/
- telc — **Übungstest / mock exam download area**  
  disponible desde la página oficial anterior.

---

#### 1. Resumen ejecutivo para construir la app

La app debe enseñar A1 como **microhabilidades**, no como teoría suelta. El examen A1 no mide “saber gramática” de forma abstracta, sino poder hacer tareas simples:

- entender avisos, números, horarios, precios y conversaciones breves;
- leer emails, notas, carteles, anuncios, páginas web simples y formularios;
- completar formularios con datos personales;
- escribir un mensaje corto con saludo, motivo, petición/pregunta y despedida;
- presentarse oralmente;
- pedir información y responder;
- formular una petición simple y reaccionar.

La app debería tener cinco grandes modos:

1. **Aprender**: explicación breve + ejemplos.
2. **Memorizar**: tarjetas alemán → español y español → alemán.
3. **Practicar**: ejercicios interactivos con feedback inmediato.
4. **Simular examen**: bloques cronometrados por sección.
5. **Producción guiada**: escribir y hablar con plantillas.

---

#### 2. Comparación rápida Goethe A1 vs telc A1

| Aspecto | Goethe-Zertifikat A1: Start Deutsch 1 | Start Deutsch 1 / telc Deutsch A1 | Implicación para la app |
|---|---|---|---|
| Nivel | A1 del MCER/GER | A1 del MCER/GER | El mismo core de contenidos sirve para ambos. |
| Público | Adultos, recomendado desde 16 años | Adultos / público general según centro | Usar situaciones adultas cotidianas. |
| Skills | Hören, Lesen, Schreiben, Sprechen | Hören, Lesen/Schreiben, Sprechen | La app debe cubrir las 4 habilidades. |
| Hören | aprox. 20 min | aprox. 20 min | Necesitas ejercicios de audio simulado o lectura en voz alta. |
| Lesen | aprox. 25 min | integrado en Lesen und Schreiben, 45 min | Practicar lectura de textos cortos. |
| Schreiben | aprox. 20 min | integrado en Lesen und Schreiben, 45 min | Formularios + mensaje corto. |
| Sprechen | aprox. 15 min, grupo | aprox. 15 min, normalmente grupo | Practicar con tarjetas y respuestas modelo. |
| Tipo de certificado | Examen estandarizado Goethe | Examen estandarizado telc | Preparación muy compatible. |
| Diferencia práctica | Goethe organiza claramente Lesen y Schreiben como partes separadas | telc muestra Lesen und Schreiben juntos en la parte escrita | La app puede tener un modo Goethe y modo telc, pero el contenido base es común. |

---

#### 3. Qué significa A1 en términos prácticos

Un estudiante A1 debe poder:

- entender y usar expresiones cotidianas muy frecuentes;
- presentarse a sí mismo y presentar a otra persona;
- preguntar y responder sobre información personal básica;
- comunicarse de forma simple si la otra persona habla despacio, claro y ayuda;
- manejar situaciones básicas: comprar, pedir, preguntar direcciones, dar datos, entender horarios, leer avisos.

##### Traducción a objetivos de app

| Competencia A1 | Actividad didáctica recomendada |
|---|---|
| Presentarse | Constructor de presentación personal con huecos. |
| Preguntar datos | Quiz de W-Fragen: Wie? Wo? Wann? Was? Wer? Wie viel? |
| Entender números | Juego de precios, teléfonos, horarios y fechas. |
| Leer anuncios | Matching: necesidad → anuncio correcto. |
| Leer notas/emails | Verdadero/Falso con textos breves. |
| Completar formularios | Formulario interactivo con datos de una persona ficticia. |
| Escribir mensaje | Plantilla con saludo + 3 puntos + despedida. |
| Speaking | Tarjetas de pregunta/respuesta y petición/reacción. |

---

### PARTE A — ESTRUCTURA DEL EXAMEN

---

#### 4. Goethe-Zertifikat A1: Start Deutsch 1

##### 4.1 Estructura general

El examen Goethe A1 para adultos tiene cuatro partes:

1. **Hören** — comprensión auditiva.
2. **Lesen** — comprensión lectora.
3. **Schreiben** — escritura.
4. **Sprechen** — examen oral en grupo.

##### 4.2 Goethe A1 — Hören

**Duración aproximada:** 20 minutos.  
**Formato típico:** tres partes.  
**Textos:** conversaciones muy breves, mensajes telefónicos, anuncios públicos, avisos de tren/aeropuerto/tienda, diálogos de compra o cita.

###### Tipos de tarea

| Parte | Qué escucha el candidato | Tipo de respuesta | Qué entrena |
|---|---|---|---|
| Hören Teil 1 | Conversaciones breves | Selección múltiple a/b/c | Números, precios, horas, lugares, objetos. |
| Hören Teil 2 | Anuncios o avisos públicos | Richtig/Falsch | Captar la instrucción principal. |
| Hören Teil 3 | Mensajes breves | Selección múltiple a/b/c | Datos concretos: día, hora, teléfono, objeto, lugar. |

###### Contenidos que debes entrenar

- números cardinales: 0–1000;
- precios: 1,50 €, 19,95 €, 120 €;
- horarios: halb fünf, Viertel nach drei, 15 Uhr, um 8.30 Uhr;
- días y fechas: Montag, am Freitag, der 12. Mai;
- lugares: Bahnhof, Flughafen, Supermarkt, Arztpraxis, Schule, Büro;
- verbos básicos en presente: kommen, gehen, fahren, kaufen, kosten, warten, treffen;
- expresiones de cortesía: Entschuldigung, bitte, danke, gern, tut mir leid.

###### Mecánica didáctica para app

```yaml
module_id: hoeren_core
skill: listening
level: A1
exam_relevance: Goethe_A1_and_telc_A1
activities:
  - audio_number_recognition
  - price_recognition
  - time_recognition
  - announcement_true_false
  - voicemail_data_extraction
feedback_style: immediate
```

###### Ejemplos originales para practicar

**Mini audio simulado 1**  
Texto para TTS:  
> Entschuldigung, wie spät ist es? — Es ist halb neun. — Danke schön.

Pregunta: Wie spät ist es?  
Opciones:
- a) 8:30
- b) 9:30
- c) 8:00

Respuesta: a) 8:30

**Mini audio simulado 2**  
Texto para TTS:  
> Der Zug nach Köln fährt heute von Gleis 4 ab. Abfahrt ist um 17 Uhr 20.

Pregunta: Von welchem Gleis fährt der Zug?  
Opciones:
- a) Gleis 3
- b) Gleis 4
- c) Gleis 14

Respuesta: b) Gleis 4

---

##### 4.3 Goethe A1 — Lesen

**Duración aproximada:** 25 minutos.  
**Formato típico:** tres partes.  
**Textos:** notas, emails, carteles, avisos, páginas web simples, anuncios, horarios.

###### Tipos de tarea

| Parte | Texto | Tipo de respuesta | Habilidad central |
|---|---|---|---|
| Lesen Teil 1 | Dos textos cortos tipo email/nota | Richtig/Falsch | Entender información explícita. |
| Lesen Teil 2 | Anuncios, webs o informaciones breves | Matching o a/b | Elegir dónde encontrar información. |
| Lesen Teil 3 | Carteles/avisos/señales | Richtig/Falsch | Entender instrucciones y prohibiciones. |

###### Contenidos que debes entrenar

- mensajes personales: Einladung, Termin, Absage, Bitte;
- avisos públicos: Rauchen verboten, Öffnungszeiten, Eingang, Ausgang;
- información práctica: precios, horarios, direcciones, habitaciones, trenes;
- webs simples: Kontakt, Preise, Öffnungszeiten, Kurse, Buchung;
- conectores simples: und, oder, aber, denn, dann;
- negación: nicht, kein/keine;
- vocabulario de lugares y servicios.

###### Mecánica didáctica para app

```yaml
module_id: lesen_core
skill: reading
level: A1
activity_types:
  - true_false_short_email
  - find_information_in_ads
  - sign_interpretation
  - opening_hours_logic
  - match_need_to_website
```

###### Ejemplo original

Texto:

> Hallo Marta,  
> ich komme am Samstag um 18 Uhr in Berlin an. Kannst du mich am Bahnhof abholen? Ich habe nur einen kleinen Koffer. Viele Grüße, Leo

Pregunta: Leo kommt am Sonntag nach Berlin.  
Respuesta: Falsch.

Pregunta: Leo bittet Marta um Hilfe.  
Respuesta: Richtig.

---

##### 4.4 Goethe A1 — Schreiben

**Duración aproximada:** 20 minutos.  
**Formato típico:** dos partes.

| Parte | Tarea | Qué evalúa |
|---|---|---|
| Schreiben Teil 1 | Completar un formulario | Datos personales, dirección, fecha, número, nombres. |
| Schreiben Teil 2 | Escribir un mensaje corto de unas 30 palabras | Saludo, motivo, información/pregunta/petición, despedida. |

###### Qué debe dominar el estudiante

- escribir datos personales sin errores graves: Name, Vorname, Adresse, Geburtsdatum, Telefonnummer;
- usar mayúsculas en sustantivos alemanes;
- saludar y despedirse;
- escribir frases cortas con verbo en posición 2;
- formular preguntas simples;
- pedir información o ayuda;
- responder a invitaciones, citas o situaciones simples.

###### Plantilla base de mensaje A1

```text
Liebe/r [Name], / Sehr geehrte Damen und Herren,

ich möchte [situación / motivo].
Ich habe eine Frage: [pregunta].
Können Sie mir bitte [petición]?

Vielen Dank.
Viele Grüße / Mit freundlichen Grüßen
[Nombre]
```

###### Frases útiles

| Función | Alemán | Español |
|---|---|---|
| Abrir informal | Liebe Anna, / Lieber Paul, | Querida Anna / Querido Paul |
| Abrir formal | Sehr geehrte Damen und Herren, | Estimados señores: |
| Motivo | ich schreibe, weil ... | escribo porque ... |
| Quiero información | Ich möchte Informationen über ... | Quiero información sobre ... |
| Preguntar | Können Sie mir bitte sagen, ...? | ¿Me puede decir por favor ...? |
| Pedir | Bitte schicken Sie mir ... | Por favor envíeme ... |
| Cerrar formal | Mit freundlichen Grüßen | Atentamente |
| Cerrar informal | Viele Grüße | Muchos saludos |

###### Ejercicio original

Situación:

> Quieres visitar una escuela de alemán. Escribe un email y menciona:  
> 1. Por qué escribes.  
> 2. Pregunta por el precio.  
> 3. Pregunta por los horarios.

Respuesta modelo A1:

```text
Sehr geehrte Damen und Herren,

ich möchte Deutsch lernen. Können Sie mir bitte Informationen schicken?
Was kostet der Kurs? Wann beginnt der Kurs?

Vielen Dank.
Mit freundlichen Grüßen
Jorge Arce
```

---

##### 4.5 Goethe A1 — Sprechen

**Duración aproximada:** 15 minutos.  
**Formato:** examen oral en grupo.  
**Partes:** tres.

| Parte | Objetivo | Ejemplo |
|---|---|---|
| Teil 1 | Presentarse | Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobby. |
| Teil 2 | Pedir y dar información | Thema: Essen und Trinken. Karte: Frühstück. |
| Teil 3 | Formular una petición y reaccionar | “Geben Sie mir bitte das Buch?” — “Ja, gern.” |

###### Presentación personal base

```text
Guten Tag. Mein Name ist Jorge.
Ich bin 35 Jahre alt.
Ich komme aus Chile.
Ich wohne in Köln.
Ich spreche Spanisch, Englisch und ein bisschen Deutsch.
Ich arbeite als Data und Analytics Engineer.
Meine Hobbys sind Sport, Musik und Reisen.
```

###### Preguntas frecuentes en Teil 1

| Alemán | Español | Respuesta modelo |
|---|---|---|
| Wie heißen Sie? | ¿Cómo se llama usted? | Ich heiße Jorge. |
| Woher kommen Sie? | ¿De dónde viene? | Ich komme aus Chile. |
| Wo wohnen Sie? | ¿Dónde vive? | Ich wohne in Köln. |
| Welche Sprachen sprechen Sie? | ¿Qué idiomas habla? | Ich spreche Spanisch und Englisch. |
| Was sind Ihre Hobbys? | ¿Cuáles son sus hobbies? | Meine Hobbys sind Sport und Musik. |
| Was sind Sie von Beruf? | ¿Cuál es su profesión? | Ich bin Data Analyst. |

###### Teil 2: pedir información

Estructuras clave:

```text
Was essen Sie gern?
Trinken Sie gern Kaffee?
Wann frühstücken Sie?
Wo kaufen Sie Brot?
Wie viel kostet das?
Haben Sie ...?
```

###### Teil 3: petición y reacción

Petición:

```text
Geben Sie mir bitte das Buch.
Öffnen Sie bitte das Fenster.
Können Sie mir bitte helfen?
Bringen Sie mir bitte ein Glas Wasser.
```

Reacción:

```text
Ja, gern.
Natürlich.
Bitte schön.
Tut mir leid, das geht nicht.
Einen Moment, bitte.
```

---

#### 5. Start Deutsch 1 / telc Deutsch A1

##### 5.1 Estructura general

El examen telc Deutsch A1 / Start Deutsch 1 mide las mismas competencias A1. Según la información oficial de telc, incluye tareas de lectura, escucha, elementos de lengua, escritura y speaking; la página oficial describe una parte escrita con **Hören** y **Lesen und Schreiben**, y una parte oral de **Sprechen**.

##### 5.2 telc A1 — distribución típica

| Bloque | Subtest | Partes | Duración aproximada | Puntos |
|---|---|---:|---:|---:|
| Schriftliche Prüfung | Hören | 3 | 20 min | 15 |
| Schriftliche Prüfung | Lesen und Schreiben | 3 + 2 | 45 min | 30 |
| Mündliche Prüfung | Sprechen | 3 | 15 min | 15 |
| Total | — | — | aprox. 90 min incluyendo oral | 60 |

> Nota: telc puede incluir formalidades administrativas antes del bloque escrito. La app debe centrarse en las tareas lingüísticas.

##### 5.3 telc A1 — puntuación orientativa

| Puntos | Predicado |
|---:|---|
| 54–60 | sehr gut |
| 48–53,5 | gut |
| 42–47,5 | befriedigend |
| 36–41,5 | ausreichend |
| 0–35,5 | teilgenommen / no suficiente |

Regla práctica: para aprobar, apunta a superar con seguridad los 36 puntos, pero en entrenamiento la app debe considerar “zona segura” desde 42 puntos.

##### 5.4 telc A1 — Writing

En telc, el writing suele tener:

1. **Formulario o datos escritos**: completar información a partir de una situación.
2. **Mensaje corto**: escribir un texto breve con varios puntos obligatorios.

Criterios típicos de evaluación:

- cumplimiento de los puntos solicitados;
- claridad y comprensión;
- formato adecuado: saludo, cierre, tono apropiado;
- errores tolerables si no impiden entender.

##### 5.5 telc A1 — Speaking

Partes típicas:

| Parte | Función | Ejemplo de microhabilidad |
|---|---|---|
| Teil 1 | Presentarse | decir nombre, país, ciudad, trabajo, idiomas; deletrear; decir números. |
| Teil 2 | Pedir y dar información | preguntar sobre un tema cotidiano. |
| Teil 3 | Formular peticiones y reaccionar | pedir objeto/acción y responder. |

---

### PARTE B — CONTENIDOS LINGÜÍSTICOS A1

---

#### 6. Mapa global de contenidos A1

Para aprobar Goethe/TELC A1, la app debe cubrir estos bloques:

1. **Pronunciación y lectura básica**
2. **Alfabeto y deletreo**
3. **Números, precios, horas y fechas**
4. **Pronombres personales**
5. **Presente de verbos regulares e irregulares comunes**
6. **Sein, haben y werden básico**
7. **Modalverbos básicos: können, müssen, wollen, möchten, dürfen, sollen**
8. **Nominativo y acusativo básico**
9. **Artículos definidos e indefinidos**
10. **Negación: nicht / kein**
11. **Preguntas W y preguntas sí/no**
12. **Verbo en posición 2**
13. **Satzklammer básica con modales y Perfekt introductorio**
14. **Preposiciones frecuentes de lugar y tiempo**
15. **Adjetivos predicativos básicos**
16. **Imperativo y peticiones corteses**
17. **Vocabulario por temas cotidianos**
18. **Funciones comunicativas del examen**

---

#### 7. Pronunciación y ortografía funcional

##### 7.1 Letras problemáticas

| Grafía | Sonido aproximado | Ejemplo | Nota para hispanohablante |
|---|---|---|---|
| ch | variable | ich, Buch | No suena como “ch” chilena/española. |
| sch | sh | Schule | Similar a “sh”. |
| sp / st inicial | shp / sht | sprechen, Stadt | Al inicio suele sonar “shp/sht”. |
| z | ts | Zeit | No suena como z española. |
| v | f o v | Vater, Video | En palabras alemanas frecuentes suele sonar f. |
| w | v | Wasser | Como v inglesa/latina suave. |
| ie | i larga | sieben | No leer “ie” separado. |
| ei | ai | mein | Como “mai”. |
| eu / äu | oi | heute, Häuser | Como “hoy” sin h. |
| ä | e abierta | Mädchen | Similar a e. |
| ö | vocal redondeada | schön | Difícil: labios de o, lengua de e. |
| ü | vocal redondeada | fünf | Difícil: labios de u, lengua de i. |
| ß | ss | Straße | Se escribe “ss” si no tienes teclado alemán. |

##### 7.2 Alfabeto y deletreo

En el speaking A1 pueden pedirte deletrear tu apellido, ciudad o email.

| Letra | Nombre alemán aproximado |
|---|---|
| A | a |
| B | be |
| C | tse |
| D | de |
| E | e |
| F | ef |
| G | ge |
| H | ha |
| I | i |
| J | yot |
| K | ka |
| L | el |
| M | em |
| N | en |
| O | o |
| P | pe |
| Q | ku |
| R | er |
| S | es |
| T | te |
| U | u |
| V | fau |
| W | ve |
| X | iks |
| Y | ypsilon |
| Z | tset |

###### Actividad de app

```yaml
activity: spelling_drill
prompt: "Buchstabieren Sie Ihren Namen."
input_type: voice_or_text
examples:
  - name: "Arce"
    expected: "A - R - C - E"
  - name: "Köln"
    expected: "K - Ö - L - N"
```

---

#### 8. Números, precios, horarios y fechas

##### 8.1 Números cardinales

| Número | Alemán |
|---:|---|
| 0 | null |
| 1 | eins |
| 2 | zwei |
| 3 | drei |
| 4 | vier |
| 5 | fünf |
| 6 | sechs |
| 7 | sieben |
| 8 | acht |
| 9 | neun |
| 10 | zehn |
| 11 | elf |
| 12 | zwölf |
| 13 | dreizehn |
| 14 | vierzehn |
| 15 | fünfzehn |
| 16 | sechzehn |
| 17 | siebzehn |
| 18 | achtzehn |
| 19 | neunzehn |
| 20 | zwanzig |
| 21 | einundzwanzig |
| 22 | zweiundzwanzig |
| 30 | dreißig |
| 40 | vierzig |
| 50 | fünfzig |
| 60 | sechzig |
| 70 | siebzig |
| 80 | achtzig |
| 90 | neunzig |
| 100 | hundert |
| 1000 | tausend |

##### 8.2 Precios

| Alemán | Español |
|---|---|
| Das kostet zehn Euro. | Eso cuesta diez euros. |
| neunzehn Euro fünfundneunzig | 19,95 € |
| drei Euro fünfzig | 3,50 € |
| ein Euro zwanzig | 1,20 € |
| Wie viel kostet das? | ¿Cuánto cuesta eso? |
| Was kostet der Pullover? | ¿Cuánto cuesta el suéter? |

##### 8.3 Horas

| Alemán | Hora |
|---|---|
| Es ist acht Uhr. | 8:00 |
| Es ist halb neun. | 8:30 |
| Es ist Viertel nach acht. | 8:15 |
| Es ist Viertel vor neun. | 8:45 |
| Es ist zehn nach acht. | 8:10 |
| Es ist zwanzig vor neun. | 8:40 |
| um acht Uhr | a las 8:00 |
| von acht bis zehn Uhr | de 8 a 10 |

**Ojo para hispanohablantes:** `halb neun` significa 8:30, no 9:30. Es “media hora hacia las nueve”.

##### 8.4 Fechas y días

| Alemán | Español |
|---|---|
| Montag | lunes |
| Dienstag | martes |
| Mittwoch | miércoles |
| Donnerstag | jueves |
| Freitag | viernes |
| Samstag / Sonnabend | sábado |
| Sonntag | domingo |
| heute | hoy |
| morgen | mañana |
| gestern | ayer |
| am Montag | el lunes |
| im Januar | en enero |
| der erste Mai | primero de mayo |

---

#### 9. Pronombres personales

| Persona | Alemán | Español |
|---|---|---|
| 1ª singular | ich | yo |
| 2ª singular informal | du | tú |
| 3ª singular masculino | er | él |
| 3ª singular femenino | sie | ella |
| 3ª singular neutro | es | ello / eso |
| 1ª plural | wir | nosotros/as |
| 2ª plural informal | ihr | ustedes/vosotros informal |
| 3ª plural | sie | ellos/as |
| formal | Sie | usted / ustedes formal |

##### Ejemplos

```text
Ich wohne in Köln.
Du kommst aus Chile.
Er arbeitet heute.
Sie lernt Deutsch.
Wir gehen ins Kino.
Sie sprechen Deutsch.
```

---

#### 10. Verbos esenciales A1

##### 10.1 Sein

| Persona | Conjugación |
|---|---|
| ich | bin |
| du | bist |
| er/sie/es | ist |
| wir | sind |
| ihr | seid |
| sie/Sie | sind |

Ejemplos:

```text
Ich bin Jorge.
Du bist müde.
Er ist Lehrer.
Wir sind in Köln.
Sind Sie Herr Arce?
```

##### 10.2 Haben

| Persona | Conjugación |
|---|---|
| ich | habe |
| du | hast |
| er/sie/es | hat |
| wir | haben |
| ihr | habt |
| sie/Sie | haben |

Ejemplos:

```text
Ich habe eine Frage.
Haben Sie Zeit?
Sie hat ein Auto.
Wir haben Deutschkurs.
```

##### 10.3 Verbos regulares modelo: machen

| Persona | Conjugación |
|---|---|
| ich | mache |
| du | machst |
| er/sie/es | macht |
| wir | machen |
| ihr | macht |
| sie/Sie | machen |

##### 10.4 Verbos frecuentes para examen A1

| Verbo | Español | Ejemplo A1 |
|---|---|---|
| arbeiten | trabajar | Ich arbeite bei FSC. |
| wohnen | vivir/residir | Ich wohne in Köln. |
| leben | vivir | Ich lebe in Deutschland. |
| kommen | venir | Ich komme aus Chile. |
| gehen | ir/caminar | Ich gehe zur Arbeit. |
| fahren | ir en transporte | Ich fahre mit dem Zug. |
| machen | hacer | Was machst du heute? |
| kaufen | comprar | Ich kaufe Brot. |
| kosten | costar | Was kostet das? |
| trinken | beber | Ich trinke Kaffee. |
| essen | comer | Ich esse gern Fisch. |
| sprechen | hablar | Ich spreche Spanisch. |
| lernen | aprender | Ich lerne Deutsch. |
| schreiben | escribir | Ich schreibe eine E-Mail. |
| lesen | leer | Ich lese den Text. |
| hören | escuchar | Ich höre Musik. |
| sehen | ver | Ich sehe den Bus. |
| suchen | buscar | Ich suche ein Hotel. |
| finden | encontrar | Ich finde die Adresse. |
| brauchen | necesitar | Ich brauche Hilfe. |
| möchten | quisiera | Ich möchte einen Kaffee. |
| können | poder/saber | Ich kann Deutsch sprechen. |
| müssen | tener que | Ich muss arbeiten. |
| wollen | querer | Ich will nach Hause. |
| dürfen | tener permiso | Darf ich fragen? |
| sollen | deber/se supone | Sie sollen warten. |
| helfen | ayudar | Können Sie mir helfen? |
| geben | dar | Geben Sie mir bitte das Formular. |
| nehmen | tomar/llevar | Ich nehme den Bus. |
| bringen | traer | Bringen Sie bitte Wasser. |
| warten | esperar | Ich warte am Bahnhof. |
| treffen | encontrarse | Wir treffen uns um 8 Uhr. |
| bezahlen | pagar | Ich bezahle bar. |
| buchen | reservar | Ich buche ein Zimmer. |
| reservieren | reservar | Ich reserviere einen Tisch. |
| anrufen | llamar por teléfono | Ich rufe dich morgen an. |
| heißen | llamarse | Ich heiße Jorge. |
| bleiben | quedarse | Ich bleibe zu Hause. |
| öffnen | abrir | Öffnen Sie bitte das Fenster. |
| schließen | cerrar | Schließen Sie bitte die Tür. |

##### 10.5 Verbos separables básicos

| Verbo | Español | Ejemplo |
|---|---|---|
| anrufen | llamar | Ich rufe dich an. |
| einkaufen | hacer compras | Ich kaufe heute ein. |
| aufstehen | levantarse | Ich stehe um 7 Uhr auf. |
| einsteigen | subir | Steigen Sie bitte ein. |
| aussteigen | bajar | Ich steige am Bahnhof aus. |
| mitbringen | traer consigo | Bring bitte Brot mit. |
| anfangen | empezar | Der Kurs fängt um 9 Uhr an. |

Regla A1: en oración principal, el prefijo separable va al final.

```text
Ich rufe dich morgen an.
Der Kurs fängt um neun Uhr an.
```

---

#### 11. Modalverbos básicos

| Modal | Español | Ejemplo |
|---|---|---|
| können | poder / saber hacer | Ich kann Deutsch sprechen. |
| müssen | tener que | Ich muss heute arbeiten. |
| wollen | querer | Ich will nach Berlin fahren. |
| möchten | quisiera | Ich möchte einen Kaffee. |
| dürfen | poder / tener permiso | Darf ich hier rauchen? |
| sollen | deber / se espera que | Sie sollen bitte warten. |

##### Estructura

```text
Sujeto + modal conjugado + complementos + infinitivo final.
```

Ejemplos:

```text
Ich möchte Deutsch lernen.
Sie können hier bezahlen.
Wir müssen um acht Uhr kommen.
Darf ich eine Frage stellen?
```

---

#### 12. Artículos y casos básicos

##### 12.1 Género de sustantivos

| Género | Artículo definido | Artículo indefinido | Ejemplo |
|---|---|---|---|
| masculino | der | ein | der Mann, ein Mann |
| femenino | die | eine | die Frau, eine Frau |
| neutro | das | ein | das Kind, ein Kind |
| plural | die | — | die Kinder |

##### 12.2 Nominativo

Usado para el sujeto.

```text
Der Mann kommt.
Die Frau arbeitet.
Das Kind spielt.
Die Kinder lernen.
```

##### 12.3 Acusativo

Usado para el objeto directo.

| Género | Definido nominativo | Definido acusativo | Indefinido acusativo |
|---|---|---|---|
| masculino | der | den | einen |
| femenino | die | die | eine |
| neutro | das | das | ein |
| plural | die | die | — |

Ejemplos:

```text
Ich kaufe den Pullover.
Ich habe eine Frage.
Ich suche ein Hotel.
Ich lese die E-Mail.
```

**Regla rápida:** en A1, el cambio más visible es **der → den** y **ein → einen** para masculino acusativo.

---

#### 13. Negación: nicht y kein

##### 13.1 Kein

Usa `kein` para negar sustantivos con artículo indefinido o sin artículo.

```text
Ich habe ein Auto. → Ich habe kein Auto.
Das ist eine Frage. → Das ist keine Frage.
Ich trinke Kaffee. → Ich trinke keinen Kaffee.
```

##### 13.2 Nicht

Usa `nicht` para negar verbos, adjetivos, frases o información específica.

```text
Ich komme nicht.
Das ist nicht teuer.
Ich wohne nicht in Berlin.
Heute kann ich nicht.
```

##### Actividad para app

```yaml
activity: nicht_vs_kein
prompt: "Elige la negación correcta"
items:
  - positive: "Ich habe ein Fahrrad."
    correct: "Ich habe kein Fahrrad."
  - positive: "Ich komme am Montag."
    correct: "Ich komme am Montag nicht."
```

---

#### 14. Orden de la oración

##### 14.1 Oración afirmativa simple

```text
Ich wohne in Köln.
Wir lernen Deutsch.
Der Kurs beginnt um neun Uhr.
```

Regla: el verbo conjugado va en posición 2.

##### 14.2 Pregunta sí/no

```text
Kommen Sie aus Chile?
Haben Sie Zeit?
Möchten Sie Kaffee?
```

Regla: el verbo conjugado va en posición 1.

##### 14.3 Preguntas W

| Pregunta | Uso | Ejemplo |
|---|---|---|
| Wer? | quién | Wer ist das? |
| Was? | qué | Was machen Sie? |
| Wo? | dónde | Wo wohnen Sie? |
| Woher? | de dónde | Woher kommen Sie? |
| Wohin? | hacia dónde | Wohin fahren Sie? |
| Wann? | cuándo | Wann beginnt der Kurs? |
| Wie? | cómo | Wie heißen Sie? |
| Wie viel? | cuánto | Wie viel kostet das? |
| Warum? | por qué | Warum lernen Sie Deutsch? |

Estructura:

```text
W-Frage + verbo conjugado + sujeto + complementos?
```

Ejemplos:

```text
Wo wohnen Sie?
Wann kommt der Bus?
Wie viel kostet der Kurs?
```

---

#### 15. Preposiciones frecuentes A1

##### 15.1 Tiempo

| Preposición | Uso | Ejemplo |
|---|---|---|
| am | días / partes del día | am Montag, am Abend |
| um | hora exacta | um 8 Uhr |
| im | meses / estaciones | im Januar, im Sommer |
| von ... bis | desde ... hasta | von 9 bis 17 Uhr |
| nach | después de / hacia ciudad/país sin artículo | nach dem Kurs, nach Berlin |
| vor | antes de | vor dem Kurs |

##### 15.2 Lugar y dirección

| Preposición | Uso A1 | Ejemplo |
|---|---|---|
| in | en / a | Ich wohne in Köln. Ich gehe in die Schule. |
| aus | de origen | Ich komme aus Chile. |
| nach | hacia ciudad/país | Ich fahre nach Berlin. |
| zu | hacia persona/lugar funcional | Ich gehe zum Arzt. |
| bei | en casa de / en empresa | Ich arbeite bei FSC. |
| mit | con / medio de transporte | Ich fahre mit dem Zug. |
| ohne | sin | Kaffee ohne Milch. |
| für | para | Das ist für dich. |

##### 15.3 Contracciones útiles

| Forma | Significado |
|---|---|
| im | in dem |
| am | an dem |
| zum | zu dem |
| zur | zu der |
| ins | in das |

---

#### 16. Imperativo y peticiones

En el examen oral, muchas tareas se resuelven con peticiones simples.

##### 16.1 Petición con Sie

```text
Öffnen Sie bitte das Fenster.
Schließen Sie bitte die Tür.
Geben Sie mir bitte den Stift.
Warten Sie bitte einen Moment.
```

##### 16.2 Petición con können

```text
Können Sie mir bitte helfen?
Können Sie das bitte wiederholen?
Können Sie bitte langsamer sprechen?
```

##### 16.3 Reacciones

```text
Ja, gern.
Natürlich.
Bitte schön.
Einen Moment, bitte.
Tut mir leid, ich habe keinen Stift.
Leider nicht.
```

---

### PARTE C — VOCABULARIO POR DOMINIOS

---

#### 17. Personas, identidad y datos personales

| Alemán | Español |
|---|---|
| der Name | nombre |
| der Vorname | nombre de pila |
| der Familienname / Nachname | apellido |
| die Adresse | dirección |
| die Straße | calle |
| die Hausnummer | número de casa |
| die Postleitzahl / PLZ | código postal |
| der Wohnort | lugar de residencia |
| das Geburtsdatum | fecha de nacimiento |
| der Geburtsort | lugar de nacimiento |
| das Land | país |
| die Nationalität | nacionalidad |
| die Sprache | idioma |
| der Beruf | profesión |
| die Telefonnummer | número de teléfono |
| die E-Mail-Adresse | dirección de email |
| ledig | soltero/a |
| verheiratet | casado/a |
| geschieden | divorciado/a |

##### Frases

```text
Wie ist Ihr Name?
Mein Name ist Jorge Arce.
Wo wohnen Sie?
Ich wohne in Köln.
Wann sind Sie geboren?
Ich bin am 15. November geboren.
Welche Sprachen sprechen Sie?
Ich spreche Spanisch und Englisch.
```

---

#### 18. Familia y relaciones

| Alemán | Español |
|---|---|
| die Familie | familia |
| die Mutter | madre |
| der Vater | padre |
| die Eltern | padres |
| der Bruder | hermano |
| die Schwester | hermana |
| das Kind | niño/a, hijo/a |
| der Sohn | hijo |
| die Tochter | hija |
| der Mann | hombre / marido |
| die Frau | mujer / esposa |
| der Freund | amigo / novio |
| die Freundin | amiga / novia |
| verheiratet | casado/a |
| zusammen | juntos |

##### Frases

```text
Haben Sie Kinder?
Ich habe keine Kinder.
Meine Familie lebt in Chile.
Mein Bruder wohnt in Santiago.
```

---

#### 19. Casa y vivienda

| Alemán | Español |
|---|---|
| die Wohnung | departamento / vivienda |
| das Haus | casa |
| das Zimmer | habitación |
| das Wohnzimmer | sala de estar |
| das Schlafzimmer | dormitorio |
| die Küche | cocina |
| das Bad | baño |
| die Dusche | ducha |
| die Toilette | baño/WC |
| der Tisch | mesa |
| der Stuhl | silla |
| das Bett | cama |
| der Schlüssel | llave |
| die Miete | arriendo/alquiler |
| teuer | caro |
| billig | barato |
| frei | libre |
| ruhig | tranquilo |

##### Frases

```text
Ich suche eine Wohnung.
Die Wohnung ist teuer.
Das Zimmer ist frei.
Haben Sie ein Zimmer frei?
```

---

#### 20. Comida y bebida

| Alemán | Español |
|---|---|
| das Essen | comida |
| das Frühstück | desayuno |
| das Mittagessen | almuerzo |
| das Abendessen | cena |
| das Brot | pan |
| das Brötchen | panecillo |
| die Butter | mantequilla |
| der Käse | queso |
| die Wurst | embutido/salchicha |
| das Fleisch | carne |
| der Fisch | pescado |
| das Gemüse | verdura |
| das Obst | fruta |
| der Apfel | manzana |
| die Banane | banana |
| der Kaffee | café |
| der Tee | té |
| das Wasser | agua |
| der Saft | jugo |
| die Milch | leche |
| das Bier | cerveza |
| die Rechnung | cuenta |
| die Speisekarte | menú/carta |

##### Frases

```text
Ich hätte gern einen Kaffee.
Was möchten Sie trinken?
Die Rechnung, bitte.
Ich esse kein Fleisch.
Haben Sie Wasser ohne Gas?
```

---

#### 21. Compras y dinero

| Alemán | Español |
|---|---|
| kaufen | comprar |
| verkaufen | vender |
| bezahlen | pagar |
| kosten | costar |
| der Preis | precio |
| das Geld | dinero |
| die Kasse | caja |
| der Supermarkt | supermercado |
| das Geschäft | tienda |
| der Markt | mercado |
| die Rechnung | cuenta/factura |
| bar | en efectivo |
| mit Karte | con tarjeta |
| teuer | caro |
| billig | barato |
| geöffnet | abierto |
| geschlossen | cerrado |

##### Frases

```text
Was kostet das?
Ich bezahle mit Karte.
Kann ich bar bezahlen?
Der Supermarkt ist geschlossen.
Ich suche eine Apotheke.
```

---

#### 22. Transporte y ciudad

| Alemán | Español |
|---|---|
| der Bahnhof | estación de tren |
| der Flughafen | aeropuerto |
| der Zug | tren |
| der Bus | bus |
| die Straßenbahn | tranvía |
| die U-Bahn | metro |
| die S-Bahn | tren urbano |
| das Gleis | andén/vía |
| die Haltestelle | parada |
| die Fahrkarte | billete |
| das Ticket | ticket |
| die Abfahrt | salida |
| die Ankunft | llegada |
| pünktlich | puntual |
| spät | tarde |
| einsteigen | subir |
| aussteigen | bajar |
| umsteigen | hacer transbordo |

##### Frases

```text
Wann fährt der Zug nach Köln?
Der Bus kommt um 8 Uhr.
Ich steige am Bahnhof aus.
Wo ist die Haltestelle?
Ein Ticket nach Bonn, bitte.
```

---

#### 23. Tiempo, calendario y citas

| Alemán | Español |
|---|---|
| die Zeit | tiempo |
| die Uhr | reloj |
| der Termin | cita |
| heute | hoy |
| morgen | mañana |
| gestern | ayer |
| früh | temprano |
| spät | tarde |
| der Morgen | mañana |
| der Mittag | mediodía |
| der Nachmittag | tarde |
| der Abend | tarde/noche |
| die Nacht | noche |
| die Woche | semana |
| das Wochenende | fin de semana |
| der Monat | mes |
| das Jahr | año |

##### Frases

```text
Haben Sie morgen Zeit?
Der Termin ist am Freitag.
Ich komme um 15 Uhr.
Am Wochenende habe ich frei.
```

---

#### 24. Salud y cuerpo

| Alemán | Español |
|---|---|
| der Arzt | médico |
| die Ärztin | médica |
| die Apotheke | farmacia |
| das Krankenhaus | hospital |
| krank | enfermo |
| gesund | sano |
| müde | cansado |
| der Kopf | cabeza |
| der Bauch | estómago/barriga |
| der Hals | garganta/cuello |
| der Zahn | diente |
| die Schmerzen | dolores |
| Kopfschmerzen | dolor de cabeza |
| Bauchschmerzen | dolor de estómago |

##### Frases

```text
Ich bin krank.
Ich habe Kopfschmerzen.
Ich brauche einen Termin beim Arzt.
Gibt es hier eine Apotheke?
```

---

#### 25. Trabajo y curso

| Alemán | Español |
|---|---|
| die Arbeit | trabajo |
| der Beruf | profesión |
| das Büro | oficina |
| die Firma | empresa |
| der Kollege | colega masculino |
| die Kollegin | colega femenina |
| der Chef | jefe |
| die Chefin | jefa |
| der Kurs | curso |
| der Deutschkurs | curso de alemán |
| die Schule | escuela |
| der Lehrer | profesor |
| die Lehrerin | profesora |
| lernen | aprender |
| studieren | estudiar en universidad |
| unterrichten | enseñar |
| die Pause | pausa |

##### Frases

```text
Ich arbeite im Büro.
Ich habe heute Deutschkurs.
Der Kurs beginnt um 9 Uhr.
Meine Kollegin kommt aus Spanien.
```

---

#### 26. Ocio, deporte y viajes

| Alemán | Español |
|---|---|
| das Hobby | hobby |
| die Musik | música |
| der Sport | deporte |
| Fußball | fútbol |
| schwimmen | nadar |
| laufen | correr |
| reisen | viajar |
| der Urlaub | vacaciones |
| das Hotel | hotel |
| das Zimmer | habitación |
| die Reise | viaje |
| das Kino | cine |
| das Konzert | concierto |
| das Museum | museo |
| Freunde treffen | juntarse con amigos |

##### Frases

```text
Ich mache gern Sport.
Am Wochenende gehe ich ins Kino.
Ich reise gern.
Ich möchte ein Zimmer buchen.
```

---

### PARTE D — FUNCIONES COMUNICATIVAS DEL EXAMEN

---

#### 27. Presentarse

##### Plantilla mínima

```text
Guten Tag.
Ich heiße [Name].
Ich komme aus [Land].
Ich wohne in [Stadt].
Ich spreche [Sprachen].
Ich bin [Beruf].
Meine Hobbys sind [Hobbys].
```

##### Plantilla extendida

```text
Guten Tag. Mein Name ist [Name].
Ich bin [Alter] Jahre alt.
Ich komme aus [Land], aber ich wohne jetzt in [Stadt].
Ich spreche [Sprache 1], [Sprache 2] und ein bisschen Deutsch.
Ich arbeite als [Beruf].
In meiner Freizeit mache ich gern [Hobby 1] und [Hobby 2].
```

##### Checklist

- [ ] dije mi nombre;
- [ ] dije de dónde vengo;
- [ ] dije dónde vivo;
- [ ] dije idiomas;
- [ ] dije trabajo/estudios;
- [ ] dije un hobby;
- [ ] pronuncié claro y lento.

---

#### 28. Pedir información

##### Estructuras clave

```text
Wie viel kostet ...?
Wann beginnt ...?
Wo ist ...?
Wie komme ich zu ...?
Haben Sie ...?
Gibt es ...?
Können Sie mir bitte sagen, ...?
```

##### Ejemplos

```text
Wie viel kostet der Deutschkurs?
Wann beginnt der Film?
Wo ist der Bahnhof?
Gibt es hier eine Apotheke?
Haben Sie ein Zimmer frei?
Können Sie mir bitte helfen?
```

---

#### 29. Dar información

```text
Der Kurs beginnt um 9 Uhr.
Das kostet 20 Euro.
Der Bahnhof ist links.
Ich wohne in Köln.
Meine Telefonnummer ist 0176 12345678.
Das Geschäft ist heute geschlossen.
```

---

#### 30. Pedir ayuda o formular una petición

```text
Helfen Sie mir bitte.
Wiederholen Sie bitte.
Sprechen Sie bitte langsam.
Schreiben Sie das bitte auf.
Öffnen Sie bitte das Fenster.
Geben Sie mir bitte den Stift.
```

---

#### 31. Reaccionar

```text
Ja, gern.
Natürlich.
Bitte schön.
Danke schön.
Kein Problem.
Tut mir leid.
Leider nicht.
Ich weiß nicht.
Einen Moment, bitte.
```

---

#### 32. Invitar, aceptar y rechazar

```text
Kommst du zu meiner Party?
Hast du am Samstag Zeit?
Möchtest du Kaffee trinken?
Ja, gern.
Ja, ich komme gern.
Leider kann ich nicht.
Tut mir leid, ich habe keine Zeit.
```

---

#### 33. Escribir un email corto

##### Estructura universal A1

| Parte | Contenido | Ejemplos |
|---|---|---|
| Saludo | formal o informal | Liebe Maria, / Sehr geehrte Damen und Herren, |
| Motivo | por qué escribo | Ich schreibe, weil ... / Ich möchte ... |
| Punto 1 | información/pregunta | Ich komme am Samstag. |
| Punto 2 | pregunta/petición | Können Sie mir bitte ...? |
| Punto 3 | pregunta adicional | Was kostet ...? |
| Cierre | gracias/despedida | Vielen Dank. Viele Grüße. |

##### Banco de inicios

```text
Ich schreibe, weil ich Informationen brauche.
Ich möchte einen Deutschkurs machen.
Ich möchte ein Zimmer buchen.
Ich kann leider nicht kommen.
Ich habe eine Frage.
```

##### Banco de cierres

```text
Vielen Dank.
Danke für Ihre Hilfe.
Ich freue mich auf Ihre Antwort.
Viele Grüße
Mit freundlichen Grüßen
```

---

### PARTE E — TIPOS DE EJERCICIOS PARA LA APP

---

#### 34. Taxonomía de ejercicios

```yaml
exercise_types:
  flashcard:
    goal: memorizar vocabulario y frases
    feedback: mostrar traducción y ejemplo
  multiple_choice:
    goal: reconocer respuesta correcta
    feedback: explicar por qué
  true_false:
    goal: comprensión lectora/auditiva
    feedback: mostrar pista en texto
  cloze:
    goal: completar huecos gramaticales
    feedback: mostrar regla breve
  matching:
    goal: asociar necesidad con anuncio o palabra con traducción
    feedback: comparar pares
  reorder_sentence:
    goal: practicar verbo en posición 2
    feedback: mostrar estructura
  form_fill:
    goal: completar formularios A1
    feedback: validar campos
  writing_prompt:
    goal: escribir email breve
    feedback: checklist, no corrección excesiva
  speaking_card:
    goal: practicar oral con tarjetas
    feedback: respuesta modelo
  timed_mock:
    goal: simular presión de examen
    feedback: puntuación y debilidades
```

---

#### 35. Modelo de datos sugerido para una app HTML

##### 35.1 Flashcard

```json
{
  "id": "vocab_food_001",
  "type": "flashcard",
  "level": "A1",
  "exam": ["goethe_a1", "telc_a1"],
  "category": "food_drink",
  "front": "das Brot",
  "back": "el pan",
  "example_de": "Ich kaufe Brot.",
  "example_es": "Compro pan.",
  "tags": ["noun", "neuter", "shopping", "restaurant"]
}
```

##### 35.2 Multiple choice

```json
{
  "id": "grammar_modal_001",
  "type": "multiple_choice",
  "skill": "grammar",
  "prompt": "Elige la frase correcta.",
  "options": [
    "Ich möchte Deutsch lernen.",
    "Ich möchte lerne Deutsch.",
    "Ich Deutsch lernen möchte."
  ],
  "answer": "Ich möchte Deutsch lernen.",
  "explanation": "Con modal, el verbo principal va al final en infinitivo."
}
```

##### 35.3 Reading true/false

```json
{
  "id": "reading_email_001",
  "type": "true_false",
  "skill": "reading",
  "text_de": "Hallo Ana, ich komme am Freitag um 19 Uhr. Kannst du mich am Bahnhof abholen? Viele Grüße, Tom",
  "statement_de": "Tom kommt am Samstag.",
  "answer": false,
  "explanation_es": "El texto dice Freitag, no Samstag."
}
```

##### 35.4 Writing prompt

```json
{
  "id": "writing_email_001",
  "type": "writing_prompt",
  "skill": "writing",
  "prompt_es": "Escribe a una escuela de alemán. Pregunta por precio, horario y fecha de inicio.",
  "requirements": [
    "saludo formal",
    "motivo",
    "pregunta por precio",
    "pregunta por horario",
    "pregunta por fecha de inicio",
    "despedida"
  ],
  "model_answer_de": "Sehr geehrte Damen und Herren, ich möchte Deutsch lernen. Was kostet der Kurs? Wann beginnt der Kurs? Wie sind die Zeiten? Vielen Dank. Mit freundlichen Grüßen, Jorge Arce"
}
```

##### 35.5 Speaking card

```json
{
  "id": "speaking_request_001",
  "type": "speaking_card",
  "skill": "speaking",
  "exam_part": "Sprechen Teil 3",
  "card_word": "Fenster",
  "task_es": "Formula una petición con la palabra dada.",
  "model_request": "Öffnen Sie bitte das Fenster.",
  "model_reactions": ["Ja, gern.", "Natürlich.", "Tut mir leid, es ist kalt."]
}
```

---

### PARTE F — BANCO INICIAL DE EJERCICIOS ORIGINALES

---

#### 36. Flashcards esenciales

| ID | Alemán | Español | Categoría |
|---|---|---|---|
| fc_001 | der Bahnhof | estación de tren | transporte |
| fc_002 | die Fahrkarte | billete | transporte |
| fc_003 | das Gleis | andén/vía | transporte |
| fc_004 | die Haltestelle | parada | transporte |
| fc_005 | die Wohnung | vivienda/departamento | vivienda |
| fc_006 | das Zimmer | habitación | vivienda/viaje |
| fc_007 | der Termin | cita | tiempo/salud |
| fc_008 | die Apotheke | farmacia | salud |
| fc_009 | die Rechnung | cuenta/factura | compras/restaurante |
| fc_010 | der Preis | precio | compras |
| fc_011 | die Öffnungszeiten | horario de atención | ciudad/compras |
| fc_012 | geschlossen | cerrado | avisos |
| fc_013 | geöffnet | abierto | avisos |
| fc_014 | verboten | prohibido | avisos |
| fc_015 | erlaubt | permitido | avisos |
| fc_016 | die Einladung | invitación | comunicación |
| fc_017 | die Antwort | respuesta | comunicación |
| fc_018 | die Frage | pregunta | comunicación |
| fc_019 | die Hilfe | ayuda | comunicación |
| fc_020 | die Adresse | dirección | datos personales |

---

#### 37. Ejercicios de gramática

##### 37.1 Sein o haben

Completa:

1. Ich ___ Jorge.  
2. Sie ___ eine Frage.  
3. Wir ___ in Köln.  
4. Er ___ ein Auto.  
5. ___ Sie Zeit?

Respuestas:

1. bin  
2. hat  
3. sind  
4. hat  
5. Haben

##### 37.2 Artículo correcto

1. ___ Mann kommt aus Chile.  
2. Ich kaufe ___ Pullover.  
3. ___ Frau arbeitet heute.  
4. Ich suche ___ Hotel.  
5. Haben Sie ___ Frage?

Respuestas:

1. Der  
2. den / einen  
3. Die  
4. ein  
5. eine

##### 37.3 Nicht o kein

1. Ich habe ___ Auto.  
2. Ich komme heute ___.  
3. Das ist ___ teuer.  
4. Wir haben ___ Zeit.  
5. Ich trinke ___ Kaffee.

Respuestas:

1. kein  
2. nicht  
3. nicht  
4. keine  
5. keinen

##### 37.4 Modal + infinitivo

Ordena:

1. möchte / ich / Kaffee / trinken  
2. Sie / helfen / können / mir / bitte  
3. muss / heute / arbeiten / ich  
4. wir / Deutsch / lernen / wollen  
5. darf / fragen / ich

Respuestas:

1. Ich möchte Kaffee trinken.  
2. Können Sie mir bitte helfen?  
3. Ich muss heute arbeiten.  
4. Wir wollen Deutsch lernen.  
5. Darf ich fragen?

---

#### 38. Ejercicios de lectura

##### 38.1 Email corto

Texto:

```text
Liebe Sofia,
am Samstag habe ich Geburtstag. Ich mache eine Party um 20 Uhr. Kannst du einen Salat mitbringen? Die Party ist im Garten.
Viele Grüße
Lena
```

Preguntas:

1. Lena hat am Samstag Geburtstag.  
2. Die Party beginnt um 18 Uhr.  
3. Sofia soll einen Salat mitbringen.  
4. Die Party ist in der Wohnung.

Respuestas:

1. Richtig  
2. Falsch  
3. Richtig  
4. Falsch

##### 38.2 Cartel

Texto:

```text
Apotheke am Markt
Öffnungszeiten:
Montag–Freitag 8:00–18:00
Samstag 9:00–13:00
Sonntag geschlossen
```

Preguntas:

1. Die Apotheke ist am Sonntag geöffnet.  
2. Am Samstag öffnet die Apotheke um 9 Uhr.  
3. Von Montag bis Freitag ist die Apotheke bis 18 Uhr geöffnet.

Respuestas:

1. Falsch  
2. Richtig  
3. Richtig

##### 38.3 Matching necesidad → lugar

Necesidades:

1. Quieres comprar pan.  
2. Quieres enviar una carta.  
3. Quieres tomar un tren.  
4. Quieres comprar medicamentos.  
5. Quieres aprender alemán.

Lugares:

A. die Apotheke  
B. der Bahnhof  
C. die Bäckerei  
D. die Post  
E. die Sprachschule

Respuestas:

1-C, 2-D, 3-B, 4-A, 5-E

---

#### 39. Ejercicios de escritura

##### 39.1 Formulario

Situación:

> Ana Torres vive en Köln, en Venloer Straße 20, 50672. Nació el 03.04.1995 en Madrid. Su teléfono es 0176 4567890.

Campos:

| Campo | Respuesta esperada |
|---|---|
| Familienname | Torres |
| Vorname | Ana |
| Straße, Hausnummer | Venloer Straße 20 |
| PLZ | 50672 |
| Wohnort | Köln |
| Geburtsdatum | 03.04.1995 |
| Geburtsort | Madrid |
| Telefonnummer | 0176 4567890 |

##### 39.2 Email formal

Prompt:

> Quieres reservar una habitación en un hotel en Dresden. Escribe un email. Menciona: fecha, número de noches, pregunta por precio.

Modelo:

```text
Sehr geehrte Damen und Herren,

ich möchte ein Zimmer in Dresden buchen. Ich komme am 12. August und bleibe zwei Nächte. Was kostet ein Einzelzimmer?

Vielen Dank.
Mit freundlichen Grüßen
Jorge Arce
```

##### 39.3 Email informal

Prompt:

> No puedes ir a una fiesta. Escribe a tu amiga. Menciona: no puedes venir, tienes que trabajar, pregunta por otra fecha.

Modelo:

```text
Liebe Maria,

leider kann ich am Samstag nicht zu deiner Party kommen. Ich muss arbeiten. Hast du am Sonntag Zeit?

Viele Grüße
Jorge
```

---

#### 40. Ejercicios de speaking

##### 40.1 Teil 1 — presentación

Tarjetas:

```yaml
speaking_intro_cards:
  - Name?
  - Alter?
  - Land?
  - Wohnort?
  - Sprachen?
  - Beruf?
  - Hobby?
```

Respuesta modelo:

```text
Mein Name ist Jorge. Ich bin 35 Jahre alt. Ich komme aus Chile. Ich wohne in Köln. Ich spreche Spanisch, Englisch und ein bisschen Deutsch. Ich arbeite als Data Analyst. Meine Hobbys sind Sport und Musik.
```

##### 40.2 Teil 2 — pedir información

Tema: Essen und Trinken

| Tarjeta | Pregunta posible |
|---|---|
| Frühstück | Was essen Sie zum Frühstück? |
| Kaffee | Trinken Sie gern Kaffee? |
| Restaurant | Gehen Sie gern ins Restaurant? |
| Wasser | Trinken Sie Wasser mit Gas? |
| Brot | Kaufen Sie oft Brot? |

Tema: Freizeit

| Tarjeta | Pregunta posible |
|---|---|
| Kino | Gehen Sie gern ins Kino? |
| Musik | Hören Sie gern Musik? |
| Sport | Machen Sie Sport? |
| Wochenende | Was machen Sie am Wochenende? |
| Freunde | Treffen Sie gern Freunde? |

##### 40.3 Teil 3 — peticiones

| Tarjeta | Petición | Reacción positiva | Reacción negativa |
|---|---|---|---|
| Fenster | Öffnen Sie bitte das Fenster. | Ja, gern. | Tut mir leid, es ist kalt. |
| Tür | Schließen Sie bitte die Tür. | Natürlich. | Einen Moment, bitte. |
| Stift | Geben Sie mir bitte den Stift. | Bitte schön. | Tut mir leid, ich habe keinen Stift. |
| Wasser | Bringen Sie mir bitte Wasser. | Ja, gern. | Leider habe ich kein Wasser. |
| Handy | Geben Sie mir bitte Ihr Handy. | Bitte. | Tut mir leid, das geht nicht. |

---

### PARTE G — ROADMAP DE APP

---

#### 41. Estructura recomendada de la aplicación HTML

##### Pantallas principales

1. **Dashboard**
   - progreso total;
   - puntos fuertes/débiles;
   - streak de estudio;
   - botón “simular examen”.

2. **Modo examen**
   - Goethe A1;
   - telc A1;
   - secciones cronometradas;
   - puntaje estimado.

3. **Vocabulario**
   - tarjetas por dominio;
   - modo alemán → español;
   - modo español → alemán;
   - repaso espaciado.

4. **Gramática A1**
   - microlecciones;
   - ejercicios;
   - errores frecuentes.

5. **Hören**
   - audios generados con TTS;
   - números, horarios, precios;
   - mensajes de voz;
   - anuncios públicos.

6. **Lesen**
   - emails;
   - carteles;
   - horarios;
   - anuncios.

7. **Schreiben**
   - formularios;
   - emails guiados;
   - checklist automático.

8. **Sprechen**
   - presentación;
   - preguntas por tema;
   - peticiones y reacciones;
   - grabación opcional.

---

#### 42. Diseño de progreso

```yaml
progress_model:
  total_score: 0-100
  sections:
    vocab: 20
    grammar: 20
    hoeren: 15
    lesen: 15
    schreiben: 15
    sprechen: 15
  mastery_levels:
    0: "nuevo"
    1: "visto"
    2: "practicado"
    3: "estable"
    4: "listo para examen"
```

---

#### 43. Reglas de feedback didáctico

La app no debe limitarse a decir “correcto/incorrecto”. Debe explicar con una mini-regla.

Ejemplos:

| Error | Feedback útil |
|---|---|
| Ich habe nicht Auto. | Usa `kein` para negar sustantivos: Ich habe kein Auto. |
| Ich möchte lerne Deutsch. | Con modal, el segundo verbo va al final en infinitivo: Ich möchte Deutsch lernen. |
| halb neun = 9:30 | En alemán, halb neun = 8:30. |
| der Pullover en acusativo | Masculino acusativo: der → den. Ich kaufe den Pullover. |
| Email sin saludo | En Schreiben A1 necesitas saludo y despedida. |

---

#### 44. Plan de estudio de 4 semanas usando la app

##### Semana 1 — Base comunicativa

- Presentación personal.
- Números, horas, precios.
- Sein/haben.
- Vocabulario de identidad, familia, ciudad.
- 10 minutos diarios de flashcards.

Meta: poder presentarse y entender datos básicos.

##### Semana 2 — Vida cotidiana

- Compras, comida, transporte.
- Preguntas W.
- Artículos y acusativo básico.
- Hören con precios/horarios.
- Lesen de carteles y anuncios.

Meta: entender información práctica.

##### Semana 3 — Producción escrita y oral

- Emails cortos.
- Formularios.
- Peticiones con Sie.
- Modalverbos.
- Speaking Teil 2 y Teil 3.

Meta: producir frases A1 claras.

##### Semana 4 — Simulación de examen

- Simulacro Goethe.
- Simulacro telc.
- Corrección de debilidades.
- Repetición intensiva de speaking.
- 3 emails cronometrados.

Meta: llegar a zona segura.

---


> **Nota editorial (2026-07-31):** las secciones *Parte H — Prompt para generar la app HTML*, *Parte G — Roadmap de app* y *Parte E/F* de este documento reflejan una planificación anterior. La arquitectura vigente de la app es la del prompt completo entregado por Jorge (motor SRS único, Satzbau-Trainer de 7 niveles, entrenadores dedicados de género/conjugación/declinación, esquema de datos con `lessons/library/vocab/sentenceTrainer/writingPrompts/speakingPrompts`). Se deja el contenido íntegro porque el marco de examen, el mapa de contenidos y los errores frecuentes siguen siendo válidos; al curar contenido, prioriza el prompt de arquitectura por sobre el roadmap/prompt antiguo de esta sección.
>

### PARTE H — PROMPT PARA GENERAR LA APP HTML

---

#### 45. Prompt base para Claude / Cursor / ChatGPT

```text
Quiero crear una aplicación HTML/CSS/JavaScript local, sin backend, para estudiar alemán A1 y preparar Goethe-Zertifikat A1: Start Deutsch 1 y Start Deutsch 1 / telc Deutsch A1.

Usa el contenido de este Markdown como base de conocimiento.

Objetivo de la app:
- Que sea didáctica, simple, rápida y entretenida.
- Que funcione offline como archivo local.
- Que tenga módulos de vocabulario, gramática, Hören, Lesen, Schreiben y Sprechen.
- Que incluya un modo simulacro Goethe y un modo simulacro telc.
- Que use ejercicios interactivos con feedback inmediato.
- Que tenga progreso local usando localStorage.
- Que permita estudiar en sesiones cortas de 5–15 minutos.

Requisitos técnicos:
- Crear un solo archivo index.html, con CSS y JS embebidos.
- No usar frameworks externos.
- No depender de internet.
- Usar Web Speech API si está disponible para leer textos en alemán.
- Guardar progreso en localStorage.
- Incluir botón para resetear progreso.

Pantallas:
1. Dashboard.
2. Flashcards.
3. Quiz de gramática.
4. Hören con texto leído por TTS.
5. Lesen con verdadero/falso y matching.
6. Schreiben con checklist.
7. Sprechen con tarjetas.
8. Simulacro de examen.

Estilo:
- Español como idioma de instrucciones.
- Alemán como idioma de práctica.
- Visual limpio, tipo app de estudio.
- Botones grandes.
- Feedback claro y motivador.

Importante:
- No copies exámenes oficiales completos.
- Usa ejercicios originales inspirados en los tipos de tarea.
- Mantén el nivel A1 realista.
```

---

#### 46. Checklist de cobertura para la app

##### Goethe A1

- [ ] Hören Teil 1: selección múltiple con números/precios/horas.
- [ ] Hören Teil 2: Richtig/Falsch con anuncios.
- [ ] Hören Teil 3: mensajes cortos con datos concretos.
- [ ] Lesen Teil 1: emails/notas con Richtig/Falsch.
- [ ] Lesen Teil 2: matching de necesidad a anuncio/web.
- [ ] Lesen Teil 3: señales/carteles con Richtig/Falsch.
- [ ] Schreiben Teil 1: formularios.
- [ ] Schreiben Teil 2: mensaje de 30 palabras.
- [ ] Sprechen Teil 1: presentación.
- [ ] Sprechen Teil 2: pedir/dar información.
- [ ] Sprechen Teil 3: petición/reacción.

##### telc A1

- [ ] Hören: 3 partes.
- [ ] Lesen und Schreiben: lectura + formularios + mensaje.
- [ ] Sprechen: 3 partes.
- [ ] Puntuación total sobre 60.
- [ ] Zona segura desde 42 puntos.

---

### PARTE I — ERRORES FRECUENTES DE HISPANOHABLANTES

---

#### 47. Errores de pronunciación

| Error | Corrección |
|---|---|
| leer `sp` como “sp” español | al inicio suele sonar “shp”: sprechen |
| leer `st` como “st” español | al inicio suele sonar “sht”: Stadt |
| confundir `ei` y `ie` | mein = main; sieben = siiben |
| olvidar umlaut | schon ≠ schön; funf debe ser fünf |
| pronunciar `z` como z española | Zeit suena “tsait” |

---

#### 48. Errores de gramática

| Error | Forma correcta | Explicación |
|---|---|---|
| Ich bin 35 Jahre. | Ich bin 35 Jahre alt. | En alemán se dice “años viejo”. |
| Ich habe nicht Auto. | Ich habe kein Auto. | Sustantivo negado con kein. |
| Ich möchte lerne Deutsch. | Ich möchte Deutsch lernen. | Modal + infinitivo al final. |
| Ich wohne in Köln seit 3 Jahre. | Ich wohne seit 3 Jahren in Köln. | `seit` usa dativo; para A1 basta memorizar frase. |
| Ich komme von Chile. | Ich komme aus Chile. | Origen: aus. |
| Ich fahre zu Berlin. | Ich fahre nach Berlin. | Ciudad/país sin artículo: nach. |
| Was kostet? | Was kostet das? | Necesitas sujeto/objeto. |
| Der Frau kommt. | Die Frau kommt. | Frau es femenino. |
| Ich kaufe der Pullover. | Ich kaufe den Pullover. | Masculino acusativo. |

---

#### 49. Errores de Schreiben

| Error | Consecuencia | Solución |
|---|---|---|
| No escribir saludo | Pierde adecuación textual | Añadir Liebe/r... o Sehr geehrte... |
| No responder los 3 puntos | Pierde contenido | Checklist antes de enviar. |
| Escribir demasiado complejo | Más errores | Frases cortas A1. |
| Olvidar despedida | Texto incompleto | Viele Grüße / Mit freundlichen Grüßen. |
| Preguntas sin signo o verbo mal puesto | Menor claridad | Wann beginnt der Kurs? |

---

#### 50. Errores de Sprechen

| Error | Solución |
|---|---|
| Hablar demasiado rápido | Habla lento y claro. |
| Intentar frases largas | Usa frases cortas. |
| Bloquearse si no entiendes | Di: Können Sie bitte wiederholen? |
| No reaccionar en Teil 3 | Memoriza 5 reacciones: Ja, gern; Natürlich; Bitte schön; Tut mir leid; Einen Moment. |
| No saber deletrear | Practica alfabeto con tu nombre, apellido, ciudad y email. |

---

### PARTE J — CONTENIDO LISTO PARA IMPORTAR COMO DATASET

---

#### 51. Dataset inicial de speaking cards

```json
[
  {"id":"sp_intro_001","part":"teil_1","prompt":"Name?","model":"Mein Name ist Jorge."},
  {"id":"sp_intro_002","part":"teil_1","prompt":"Alter?","model":"Ich bin 35 Jahre alt."},
  {"id":"sp_intro_003","part":"teil_1","prompt":"Land?","model":"Ich komme aus Chile."},
  {"id":"sp_intro_004","part":"teil_1","prompt":"Wohnort?","model":"Ich wohne in Köln."},
  {"id":"sp_intro_005","part":"teil_1","prompt":"Sprachen?","model":"Ich spreche Spanisch, Englisch und ein bisschen Deutsch."},
  {"id":"sp_intro_006","part":"teil_1","prompt":"Beruf?","model":"Ich arbeite als Data Analyst."},
  {"id":"sp_intro_007","part":"teil_1","prompt":"Hobby?","model":"Meine Hobbys sind Sport und Musik."},
  {"id":"sp_info_001","part":"teil_2","topic":"Essen und Trinken","card":"Kaffee","model_question":"Trinken Sie gern Kaffee?","model_answer":"Ja, ich trinke gern Kaffee."},
  {"id":"sp_info_002","part":"teil_2","topic":"Freizeit","card":"Kino","model_question":"Gehen Sie gern ins Kino?","model_answer":"Ja, manchmal gehe ich ins Kino."},
  {"id":"sp_req_001","part":"teil_3","card":"Fenster","model_request":"Öffnen Sie bitte das Fenster.","model_reaction":"Ja, gern."},
  {"id":"sp_req_002","part":"teil_3","card":"Stift","model_request":"Geben Sie mir bitte den Stift.","model_reaction":"Bitte schön."}
]
```

---

#### 52. Dataset inicial de grammar quiz

```json
[
  {
    "id":"g001",
    "prompt":"Completa: Ich ___ Jorge.",
    "options":["bin","bist","ist"],
    "answer":"bin",
    "explanation":"Con ich, el verbo sein es bin."
  },
  {
    "id":"g002",
    "prompt":"Elige la frase correcta.",
    "options":["Ich möchte Deutsch lernen.","Ich möchte lerne Deutsch.","Ich Deutsch möchte lernen."],
    "answer":"Ich möchte Deutsch lernen.",
    "explanation":"Con möchte, el verbo principal va al final en infinitivo."
  },
  {
    "id":"g003",
    "prompt":"Niega: Ich habe ein Auto.",
    "options":["Ich habe kein Auto.","Ich habe nicht Auto.","Ich habe keine Auto."],
    "answer":"Ich habe kein Auto.",
    "explanation":"Auto es neutro: das Auto → kein Auto."
  },
  {
    "id":"g004",
    "prompt":"Completa: Ich kaufe ___ Pullover.",
    "options":["der","den","dem"],
    "answer":"den",
    "explanation":"Pullover es masculino y aquí es objeto directo: der → den."
  },
  {
    "id":"g005",
    "prompt":"Pregunta correcta para '¿Dónde vive usted?'",
    "options":["Wo wohnen Sie?","Woher wohnen Sie?","Wann wohnen Sie?"],
    "answer":"Wo wohnen Sie?",
    "explanation":"Wo pregunta por ubicación."
  }
]
```

---

#### 53. Dataset inicial de reading items

```json
[
  {
    "id":"r001",
    "text":"Hallo Tom, ich komme am Freitag um 18 Uhr nach Köln. Kannst du mich am Bahnhof abholen? Viele Grüße, Ana",
    "statement":"Ana kommt am Samstag nach Köln.",
    "answer":false,
    "explanation":"Im Text steht Freitag, nicht Samstag."
  },
  {
    "id":"r002",
    "text":"Bäckerei Müller: Montag bis Freitag 7–18 Uhr, Samstag 8–13 Uhr, Sonntag geschlossen.",
    "statement":"Am Sonntag kann man Brot kaufen.",
    "answer":false,
    "explanation":"Die Bäckerei ist am Sonntag geschlossen."
  },
  {
    "id":"r003",
    "text":"Deutschkurse A1: Beginn 3. März. Unterricht Montag und Mittwoch, 18–20 Uhr. Preis: 220 Euro.",
    "statement":"Der Kurs kostet 220 Euro.",
    "answer":true,
    "explanation":"Der Preis ist 220 Euro."
  }
]
```

---

#### 54. Dataset inicial de writing prompts

```json
[
  {
    "id":"w001",
    "context_es":"Quieres información sobre un curso de alemán.",
    "points_es":["di por qué escribes","pregunta por el precio","pregunta cuándo empieza"],
    "model_de":"Sehr geehrte Damen und Herren, ich möchte Deutsch lernen. Was kostet der Kurs? Wann beginnt der Kurs? Vielen Dank. Mit freundlichen Grüßen, Jorge Arce"
  },
  {
    "id":"w002",
    "context_es":"No puedes ir a una fiesta.",
    "points_es":["di que no puedes venir","explica que tienes que trabajar","pregunta por otra fecha"],
    "model_de":"Liebe Anna, leider kann ich am Samstag nicht kommen. Ich muss arbeiten. Hast du am Sonntag Zeit? Viele Grüße, Jorge"
  },
  {
    "id":"w003",
    "context_es":"Quieres reservar una habitación de hotel.",
    "points_es":["fecha de llegada","número de noches","pregunta por el precio"],
    "model_de":"Sehr geehrte Damen und Herren, ich möchte ein Zimmer buchen. Ich komme am 10. Juli und bleibe zwei Nächte. Was kostet das Zimmer? Mit freundlichen Grüßen, Jorge Arce"
  }
]
```

---

#### 55. Dataset inicial de vocabulario mínimo

```json
[
  {"de":"der Name","es":"nombre","cat":"personal_data","gender":"der"},
  {"de":"die Adresse","es":"dirección","cat":"personal_data","gender":"die"},
  {"de":"das Geburtsdatum","es":"fecha de nacimiento","cat":"personal_data","gender":"das"},
  {"de":"der Bahnhof","es":"estación de tren","cat":"transport","gender":"der"},
  {"de":"das Gleis","es":"andén / vía","cat":"transport","gender":"das"},
  {"de":"die Fahrkarte","es":"billete","cat":"transport","gender":"die"},
  {"de":"der Arzt","es":"médico","cat":"health","gender":"der"},
  {"de":"die Apotheke","es":"farmacia","cat":"health","gender":"die"},
  {"de":"das Zimmer","es":"habitación","cat":"housing_travel","gender":"das"},
  {"de":"die Wohnung","es":"vivienda / departamento","cat":"housing","gender":"die"},
  {"de":"der Kaffee","es":"café","cat":"food_drink","gender":"der"},
  {"de":"das Wasser","es":"agua","cat":"food_drink","gender":"das"},
  {"de":"die Rechnung","es":"cuenta / factura","cat":"shopping_restaurant","gender":"die"},
  {"de":"der Preis","es":"precio","cat":"shopping","gender":"der"},
  {"de":"die Öffnungszeiten","es":"horarios de atención","cat":"public_signs","gender":"plural"},
  {"de":"geschlossen","es":"cerrado","cat":"public_signs","pos":"adjective"},
  {"de":"geöffnet","es":"abierto","cat":"public_signs","pos":"adjective"},
  {"de":"verboten","es":"prohibido","cat":"public_signs","pos":"adjective"},
  {"de":"erlaubt","es":"permitido","cat":"public_signs","pos":"adjective"},
  {"de":"helfen","es":"ayudar","cat":"verbs","pos":"verb"}
]
```

---

### PARTE K — QUÉ NO HACER

---

#### 56. No sobrecomplicar el A1

Evitar en la primera versión de la app:

- declinación completa de adjetivos;
- genitivo;
- Konjunktiv II más allá de `möchte`;
- pasiva;
- oraciones subordinadas complejas;
- Perfekt intensivo con listas enormes de participios;
- vocabulario abstracto avanzado;
- explicaciones largas sin práctica.

La app debe enseñar **lo que mueve puntos en examen** y lo que permite comunicarse en situaciones simples.

---

#### 57. Prioridad de implementación MVP

##### MVP 1 — Muy útil y simple

- Flashcards por categoría.
- Quiz de gramática básica.
- Reading true/false.
- Writing con checklist.
- Speaking cards.
- Progreso local.

##### MVP 2 — Más didáctico

- TTS para Hören.
- Simulador Goethe/TELC.
- Repaso espaciado.
- Modo errores frecuentes.
- Banco ampliado de vocabulario.

##### MVP 3 — Más entretenido

- Rachas.
- Logros.
- “Boss fight” por sección del examen.
- Modo contra reloj.
- Estadísticas por tema.

---

#### 58. Resumen final para app

La app debe convertir el A1 en tareas pequeñas y repetibles:

```text
Escucho → identifico dato.
Leo → extraigo información.
Escribo → completo formulario o email breve.
Hablo → me presento, pregunto, pido algo y reacciono.
```

El contenido central para Goethe A1 y telc A1 es casi el mismo. La diferencia principal está en cómo se presenta la estructura del examen y la puntuación. Por eso conviene construir una app con un **core común A1** y dos modos de simulación:

- **Modo Goethe A1:** Hören, Lesen, Schreiben, Sprechen.
- **Modo telc A1:** Hören, Lesen und Schreiben, Sprechen, puntaje /60.


---

## Parte 2 — Núcleo A1: contenido esencial de examen

#### 1. Alfabeto y deletreo

**Alfabeto**
* A – a
* B – be
* C – tse
* D – de
* E – e
* F – ef
* G – ge
* H – ha
* I – i
* J – jot
* K – ka
* L – el
* M – em
* N – en
* O – o
* P – pe
* Q – ku
* R – er
* S – es
* T – te
* U – u
* V – fau
* W – ve
* X – iks
* Y – ypsilon
* Z – zett / tset 

**Umlauts y ß**
* ä = ae
* ö = oe
* ü = ue
* ß = ss 

**Vocabulario útil**
* der Buchstabe – la letra
* buchstabieren – deletrear
* der Vorname – el nombre de pila
* der Familienname – el apellido 

**Frases útiles**
* Ich buchstabiere ... – Deletreo ...
* Können Sie das bitte buchstabieren? – ¿Puede deletrear eso, por favor?
* Wie schreibt man das? – ¿Cómo se escribe eso? 

---

#### 2. Sustantivos básicos

**Personas y familia**
* der Mann (Männer) – el hombre
* die Frau (Frauen) – la mujer
* das Kind (Kinder) – el niño / la niña
* die Eltern – los padres
* der Vater (Väter) – el padre
* die Mutter (Mütter) – la madre
* der Sohn (Söhne) – el hijo
* die Tochter (Töchter) – la hija
* der Freund (Freunde) – el amigo
* die Freundin (Freundinnen) – la amiga
* der Chef (Chefs) – el jefe
* die Mitarbeiterin (Mitarbeiterinnen) – la empleada
* der Kollege (Kollegen) – el colega
* die Kollegin (Kolleginnen) – la colega
* der Lehrer (Lehrer) – el profesor / maestro
* die Lehrerin (Lehrerinnen) – la profesora / maestra
* der Schüler (Schüler) – el alumno
* die Schülerin (Schülerinnen) – la alumna
* der Verkäufer (Verkäufer) – el vendedor
* die Verkäuferin (Verkäuferinnen) – la vendedora
* der Arzt (Ärzte) – el médico 

**Datos personales y formularios**
* der Name – el nombre
* der Vorname – el nombre de pila
* der Familienname – el apellido
* der Geburtsort – el lugar de nacimiento
* das Geburtsdatum – la fecha de nacimiento
* die Muttersprache – la lengua materna
* andere Sprachen – otros idiomas
* der Familienstand – el estado civil
* ledig – soltero / soltera
* verheiratet – casado / casada
* geschieden – divorciado / divorciada
* die Adresse – la dirección
* die Straße – la calle
* die Hausnummer – el número
* die Postleitzahl / PLZ – el código postal
* der Wohnort – el lugar de residencia
* die Bank – el banco
* die Bankverbindung – los datos bancarios
* die IBAN – el IBAN
* die BIC – el BIC
* der Kurstermin – la fecha del curso
* die Kurszeit – el horario del curso
* die Zimmernummer – el número de habitación
* die Telefonnummer – el número de teléfono
* die E-Mail-Adresse – la dirección de correo electrónico 

**Casa y ciudad**
* das Haus (Häuser) – la casa
* die Wohnung (Wohnungen) – el departamento / la vivienda
* der Tisch (Tische) – la mesa
* der Stuhl (Stühle) – la silla
* das Bett (Betten) – la cama
* die Tür (Türen) – la puerta
* das Fenster (Fenster) – la ventana
* die Küche (Küchen) – la cocina
* der Garten (Gärten) – el jardín
* die Straße (Straßen) – la calle
* die Ecke (Ecken) – la esquina
* die Stadt (Städte) – la ciudad
* das Dorf (Dörfer) – el pueblo
* das Zentrum (Zentren) – el centro
* der See (Seen) – el lago
* das Meer (Meere) – el mar
* der Stadtplan (Stadtpläne) – el plano de la ciudad
* der Stock / das Stockwerk – el piso / la planta 

**Lugares públicos y transporte**
* die Auskunft / die Information – la información
* die Rezeption – la recepción
* der Eingang – la entrada
* der Ausgang – la salida
* der Schalter – la ventanilla
* die Haltestelle – la parada
* die Linie – la línea
* die Fahrkarte / das Ticket – el billete / ticket
* der Fahrkartenautomat – la máquina de billetes
* die Abfahrt – la salida
* die Ankunft – la llegada
* der Treffpunkt – el punto de encuentro
* das Rathaus – el ayuntamiento
* der Bahnhof (Bahnhöfe) – la estación de tren
* der Flughafen (Flughäfen) – el aeropuerto
* der Zug (Züge) – el tren
* das Flugzeug (Flugzeuge) – el avión
* das Auto (Autos) – el auto / coche
* das Taxi (Taxis) – el taxi
* das Fahrrad (Fahrräder) – la bicicleta
* der Flug (Flüge) – el vuelo
* der Urlaub – las vacaciones
* der Ausflug (Ausflüge) – la excursión
* das Wochenende (Wochenenden) – el fin de semana 

**Estudio, trabajo y documentos**
* die Arbeit – el trabajo
* der Job (Jobs) – el empleo
* das Büro (Büros) – la oficina
* die Schule (Schulen) – la escuela
* die Klasse (Klassen) – la clase
* die Sprachschule (Sprachschulen) – la escuela de idiomas
* der Arbeitsplatz (Arbeitsplätze) – el lugar de trabajo
* die Arbeitszeit (Arbeitszeiten) – el horario de trabajo
* die Aufgabe (Aufgaben) – la tarea
* die Hausaufgabe (Hausaufgaben) – la tarea escolar
* das Dokument (Dokumente) – el documento
* der Computer (Computer) – el computador
* das Wörterbuch (Wörterbücher) – el diccionario
* der Stift (Stifte) – el lápiz / bolígrafo
* die Sprache (Sprachen) – el idioma / la lengua
* der Sommerkurs (Sommerkurse) – el curso de verano
* die Arbeitskleidung – la ropa de trabajo 

**Comida, bebida y compras**
* das Essen – la comida
* das Getränk (Getränke) – la bebida
* das Frühstück – el desayuno
* das Brötchen (Brötchen) – el panecillo
* das Brot (Brote) – el pan
* das Gemüse – la verdura
* der Salat (Salate) – la ensalada
* der Fisch (Fische) – el pescado
* die Wurst (Würste) – la salchicha
* die Pommes – las papas fritas
* die Milch – la leche
* der Apfel (Äpfel) – la manzana
* die Banane (Bananen) – el plátano / banana
* der Kuchen (Kuchen) – el pastel
* der Saft (Säfte) – el jugo
* das Restaurant (Restaurants) – el restaurante
* das Café (Cafés) – la cafetería
* die Bäckerei (Bäckereien) – la panadería
* der Supermarkt (Supermärkte) – el supermercado
* das Kaufhaus (Kaufhäuser) – la tienda por departamentos
* die Kasse (Kassen) – la caja
* der Preis (Preise) – el precio
* die Rechnung (Rechnungen) – la cuenta / factura
* das Geld – el dinero
* der Euro (Euro) – el euro
* der Cent (Cent) – el centavo 

**Ocio y vida diaria**
* die Zeitung (Zeitungen) – el periódico
* das Buch (Bücher) – el libro
* der Fernseher (Fernseher) – el televisor
* das Handy (Handys) – el celular / móvil
* der Film (Filme) – la película
* die CD (CDs) – el CD
* das Konzert (Konzerte) – el concierto
* die Disco (Discos) – la discoteca
* der Sport – el deporte
* der Spaß – la diversión
* das Geschenk (Geschenke) – el regalo
* die Geburtstagsparty (Geburtstagspartys) – la fiesta de cumpleaños
* die Brille (Brillen) – las gafas
* die Kleidung – la ropa
* die Nachricht (Nachrichten) – el mensaje
* die Briefmarke (Briefmarken) – la estampilla / sello postal
* die Karte (Karten) – el mapa / la entrada / la tarjeta
* die Öffnungszeiten – los horarios de apertura
* der Ball – la pelota 

**Tiempo y naturaleza**
* der Tag (Tage) – el día
* die Nacht (Nächte) – la noche
* das Jahr (Jahre) – el año
* der Monat (Monate) – el mes
* die Woche (Wochen) – la semana
* das Wetter – el clima
* die Sonne – el sol
* der Regen – la lluvia
* der Schnee – la nieve
* die Blume (Blumen) – la flor 

---

#### 3. Días, meses, colores y números

**Días de la semana**
* Montag – lunes
* Dienstag – martes
* Mittwoch – miércoles
* Donnerstag – jueves
* Freitag – viernes
* Samstag – sábado
* Sonntag – domingo 

**Meses**
* Januar – enero
* Februar – febrero
* März – marzo
* April – abril
* Mai – mayo
* Juni – junio
* Juli – julio
* August – agosto
* September – septiembre
* Oktober – octubre
* November – noviembre
* Dezember – diciembre 

**Colores**
* rot – rojo
* blau – azul
* gelb – amarillo
* grün – verde
* orange – naranja
* lila – morado
* rosa – rosado
* braun – café / marrón
* grau – gris
* weiß – blanco
* schwarz – negro 

**Números**
* 0 null
* 1 eins
* 2 zwei
* 3 drei
* 4 vier
* 5 fünf
* 6 sechs
* 7 sieben
* 8 acht
* 9 neun
* 10 zehn
* 11 elf
* 12 zwölf
* 13 dreizehn
* 14 vierzehn
* 15 fünfzehn
* 16 sechzehn
* 17 siebzehn
* 18 achtzehn
* 19 neunzehn
* 20 zwanzig
* 30 dreißig
* 40 vierzig
* 50 fünfzig
* 60 sechzig
* 70 siebzig
* 80 achtzig
* 90 neunzig
* 100 einhundert / hundert
* 1000 eintausend / tausend
* 1.000.000 eine Million
* 2.000.000 zwei Millionen
* 1.000.000.000 eine Milliarde 

---

#### 4. Adjetivos básicos
* groß – grande / alto
* klein – pequeño / bajo
* alt – viejo / antiguo
* jung – joven
* neu – nuevo
* schnell – rápido
* langsam – lento
* schön – bonito
* hässlich – feo
* gut – bueno
* schlecht – malo
* toll – genial
* wunderbar – maravilloso
* teuer – caro
* billig – barato
* preiswert – económico
* geöffnet – abierto
* geschlossen – cerrado 

**Adjetivo atributivo y predicativo**
* **atributivo**: va con sustantivo y se declina 

  * der alte Mann – el hombre viejo 

  * eine schöne Stadt – una ciudad bonita
* **predicativo**: va con sein / bleiben / werden y no se declina 

  * Der Mann ist alt. – El hombre es viejo. 

  * Die Stadt ist schön. – La ciudad es bonita. 

**Terminaciones básicas del adjetivo en nominativo**

**Con artículo definido**
* masculino: -e
* femenino: -e
* neutro: -e
* plural: -en 

**Con artículo indefinido**
* masculino: -er
* femenino: -e
* neutro: -es
* plural: -en 

---

#### 5. Artículos

**Artículos definidos**

| Caso | Masculino | Femenino | Neutro | Plural |
| :---- | :---- | :---- | :---- | :---- |
| Nominativ | der | die | das | die |
| Akkusativ | den | die | das | die |
| Dativ | dem | der | dem | den |

**Artículos indefinidos**

| Caso | Masculino | Femenino | Neutro |
| :---- | :---- | :---- | :---- |
| Nominativ | ein | eine | ein |
| Akkusativ | einen | eine | ein |
| Dativ | einem | einer | einem |

**kein**

| Caso | Masculino | Femenino | Neutro | Plural |
| :---- | :---- | :---- | :---- | :---- |
| Nominativ | kein | keine | kein | keine |
| Akkusativ | keinen | keine | kein | keine |
| Dativ | keinem | keiner | keinem | keinen |

**Posesivos (modelo: mein)**

| Caso | Masculino | Femenino | Neutro | Plural |
| :---- | :---- | :---- | :---- | :---- |
| Nominativ | mein | meine | mein | meine |
| Akkusativ | meinen | meine | mein | meine |
| Dativ | meinem | meiner | meinem | meinen |

**Posesivos frecuentes**
* mein – mi
* dein – tu
* sein – su (de él)
* ihr – su (de ella)
* unser – nuestro
* euer – vuestro 

**Nota importante**
* en dativo plural se añade normalmente **-n** 

  * mit meinen Freunden – con mis amigos 

---

#### 6. Pronombres interrogativos
* wer – quién
* was – qué
* wo – dónde
* wohin – a dónde
* woher – de dónde
* wann – cuándo
* wie – cómo
* wie alt – cuántos años
* wie viel – cuánto
* wie viele – cuántos / cuántas
* warum – por qué
* welcher / welche / welches – cuál 

**Diferencias clave**
* wo = ubicación
* wohin = dirección
* woher = origen
* wie viel = no contable
* wie viele = contable 

---

#### 7. Preposiciones

**Dativ**
* aus – de / desde
* bei – en casa de / con / cerca de
* mit – con
* nach – a / hacia / después de
* seit – desde
* von – de / desde
* zu – a / hacia / donde alguien 

**Akkusativ**
* durch – a través de
* für – para / por
* gegen – contra / hacia
* ohne – sin
* um – alrededor de / a (la hora)
* bis – hasta 

**Wechselpräpositionen (Akkusativ / Dativ)**
* an – en / junto a
* auf – sobre / en
* hinter – detrás de
* in – en / dentro de
* neben – al lado de
* über – sobre / encima de
* unter – debajo de
* vor – delante de / antes de
* zwischen – entre 

**Otras útiles**
* ab – desde
* bis zu + Dativ – hasta
* nur – solo 

**Regla clave**
* movimiento / dirección → normalmente **Akkusativ**
* posición / lugar fijo → normalmente **Dativ** 

Ejemplos:
* Ich gehe in die Schule. – Voy a la escuela.
* Ich bin in der Schule. – Estoy en la escuela. 

---

#### 8. Conjunciones y conectores

**Coordinantes**
* und – y
* oder – o
* aber – pero
* sondern – sino
* denn – porque / pues 

**Subordinantes**
* als – cuando (una vez en el pasado)
* bevor – antes de que
* da – ya que
* dass – que
* ob – si
* obwohl – aunque
* seitdem – desde que
* sobald – en cuanto
* solange – mientras
* während – mientras
* weil – porque
* wenn – si / cuando
* wie – como 

**Otros conectores frecuentes**
* dann – entonces
* zuerst – primero
* später – más tarde
* vielleicht – quizás 

**Regla importante**
* **coordinantes**: no cambian el orden
* **subordinantes**: mandan el verbo al final 

Ejemplos:
* Ich bleibe zu Hause, denn ich bin müde. – Me quedo en casa, porque estoy cansado.
* Ich bleibe zu Hause, weil ich müde bin. – Me quedo en casa, porque estoy cansado. 

---

#### 9. Orden de la oración

**Oración normal**

Sujeto + verbo + resto
* Ich gehe heute nach Hause. – Voy hoy a casa. 

**Con tiempo al inicio**

Tiempo + verbo + sujeto + resto
* Heute gehe ich nach Hause. – Hoy voy a casa. 

**Negación**
* **nicht** → niega verbos, adjetivos o frases 

  * Ich gehe nicht. – No voy.
* **kein** → niega sustantivos 

  * Ich habe kein Auto. – No tengo auto. 

---

#### 10. Preguntas

**Ja / Nein Fragen**

Verbo conjugado + sujeto + complemento
* Schaust du Netflix? – ¿Ves Netflix?
* Isst sie kein Fleisch? – ¿Ella no come carne? 

**Con verbos modales**

Modal conjugado + sujeto + complemento + infinitivo
* Möchten Sie ein Glas Wasser trinken? – ¿Le gustaría tomar un vaso de agua?
* Darf ich nach Hause gehen? – ¿Puedo ir a casa? 

**W-Fragen**

W-Wort + verbo conjugado + sujeto + complemento
* Was lernen wir heute? – ¿Qué aprendemos hoy?
* Wo wohnst du? – ¿Dónde vives?
* Woher kommst du? – ¿De dónde vienes? 

**Preguntas modelo para pedir información**
* Wo kann ich ... kaufen? – ¿Dónde puedo comprar ...?
* Wo kann ich ... bekommen? – ¿Dónde puedo conseguir ...?
* Wo ist ...? – ¿Dónde está ...?
* Wann beginnt ...? – ¿Cuándo empieza ...?
* Wann hast du ...? – ¿Cuándo tienes ...?
* Wie viel kostet ...? – ¿Cuánto cuesta ...?
* Wie lange dauert ...? – ¿Cuánto dura ...?
* Mit wem arbeitest du? – ¿Con quién trabajas?
* Hast du ...? – ¿Tienes ...?
* Gibt es ...? – ¿Hay ...? 

---

#### 11. Sein, haben y conjugación básica

**sein**
* ich bin
* du bist
* er / sie / es ist
* wir sind
* ihr seid
* sie / Sie sind 

**haben**
* ich habe
* du hast
* er / sie / es hat
* wir haben
* ihr habt
* sie / Sie haben 

**Verbos regulares**
* ich -e
* du -st
* er / sie / es -t
* wir -en
* ihr -t
* sie / Sie -en 

Ejemplo con **lernen**
* ich lerne
* du lernst
* er lernt
* wir lernen
* ihr lernt
* sie lernen 

---

#### 12. Verbos modales

**Verbos**
* dürfen – poder / tener permiso
* können – poder / ser capaz
* mögen – gustar
* möchten – quisiera / me gustaría
* müssen – deber / tener que
* sollen – deber
* wollen – querer 

**Conjugación básica**
* ich kann / muss / will / darf / soll / möchte
* du kannst / musst / willst / darfst / sollst / möchtest
* er / sie / es kann / muss / will / darf / soll / möchte
* wir können / müssen / wollen / dürfen / sollen / möchten
* ihr könnt / müsst / wollt / dürft / sollt / möchtet
* sie / Sie können / müssen / wollen / dürfen / sollen / möchten 

**Estructura con modal**

Sujeto + modal + complemento + infinitivo
* Ich kann Deutsch sprechen. – Puedo hablar alemán.
* Ich möchte einen Kaffee trinken. – Me gustaría tomar un café. 

---

#### 13. Konjunktiv II básico

**Con würden**

Sujeto + würden + complemento + infinitivo
* Ich würde Pizza essen. – Yo comería pizza.
* Ich würde nicht kommen. – Yo no vendría. 

**Formas útiles**
* sein → wäre / wären
* haben → hätte / hätten
* können → könnte / könnten
* dürfen → dürfte / dürften
* müssen → müsste / müssten
* sollen → sollte / sollten
* möchten → quisiera / me gustaría 

**Frases muy útiles**
* Ich hätte gern ... – Quisiera ...
* Ich würde gern ... – Me gustaría ... 

---

#### 14. Perfekt básico

**Estructura**

haben / sein + Partizip II

Ejemplos:
* Ich habe gearbeitet. – He trabajado.
* Ich habe Deutsch gelernt. – He estudiado alemán.
* Ich bin gegangen. – He ido / me fui. 

**Regla básica**

Se usa **sein** sobre todo con:
* movimiento
* cambio de estado 

---

#### 15. Verbos frecuentes

**Verbos muy básicos**
* sein – ser / estar
* haben – tener
* heißen – llamarse
* kommen – venir
* wohnen – vivir
* arbeiten – trabajar
* lernen – aprender / estudiar
* verstehen – entender
* hören – escuchar
* schreiben – escribir
* fragen – preguntar
* antworten – responder
* danken – agradecer
* helfen – ayudar
* machen – hacer
* suchen – buscar
* kaufen – comprar
* bezahlen – pagar
* kosten – costar
* brauchen – necesitar
* dauern – durar
* öffnen – abrir
* schließen – cerrar
* reparieren – reparar
* besuchen – visitar
* reisen – viajar
* spielen – jugar / tocar
* tanzen – bailar
* kochen – cocinar
* feiern – celebrar
* mieten – alquilar
* putzen – limpiar
* reagieren – reaccionar
* formulieren – formular
* wählen – elegir / marcar
* organisieren – organizar
* sagen – decir
* schenken – regalar
* buchstabieren – deletrear
* nennen – nombrar / citar
* glauben – creer / pensar
* kennen – conocer
* telefonieren – hablar por teléfono
* passen – quedar bien
* gehören – pertenecer
* fehlen – faltar 

**Verbos irregulares frecuentes**
* sprechen – hablar
* lesen – leer
* essen – comer
* trinken – beber
* gehen – ir
* fahren – ir en vehículo / conducir
* fliegen – volar
* sehen – ver
* treffen – encontrarse / quedar
* finden – encontrar / opinar
* geben – dar / haber (es gibt)
* nehmen – tomar
* bringen – traer
* wissen – saber
* gefallen – gustar / agradar
* bleiben – quedarse
* schwimmen – nadar
* singen – cantar
* laufen – correr
* waschen – lavar 

**Verbos separables**
* anrufen – llamar por teléfono
* mitbringen – traer consigo
* ausfüllen – rellenar un formulario
* ankreuzen – marcar con una cruz
* einladen – invitar
* anfangen – empezar
* aufstehen – levantarse
* einkaufen – ir de compras
* fernsehen – ver televisión
* umziehen – mudarse / cambiarse
* anmachen – encender
* ausmachen – apagar
* mitnehmen – llevar(se)
* eintreten – entrar
* zumachen – cerrar
* aufmachen – abrir 

**Verbos útiles con nota especial**
* sich vorstellen – presentarse
* zeigen – mostrar / enseñar
* schmecken – saber / gustar
* gratulieren – felicitar
* warten – esperar 

---

#### 16. Verbos y caso importante

**Verbos con Dativ**
* antworten + Dativ
* danken + Dativ
* helfen + Dativ
* gefallen + Dativ
* schmecken + Dativ
* gratulieren + Dativ
* passen + Dativ
* gehören + Dativ
* fehlen + Dativ 

Ejemplos:
* Ich helfe dir. – Te ayudo.
* Das schmeckt mir. – Eso me gusta / me sabe bien.
* Das gehört mir. – Eso me pertenece. 

**Verbos con Dativ + Akkusativ**
* zeigen – mostrar algo a alguien
* sagen – decir algo a alguien 

Ejemplos:
* Ich zeige dir das Buch. – Te muestro el libro.
* Ich sage dir die Wahrheit. – Te digo la verdad. 

**Construcciones importantes**
* warten auf + Akkusativ 

  * Ich warte auf dich. – Te espero.
* telefonieren mit + Dativ 

  * Ich telefoniere mit meiner Mutter. – Hablo por teléfono con mi madre. 

---

#### 17. Hora, fecha y partes del día

**Preguntas**
* Wie spät ist es? – ¿Qué hora es?
* Wie viel Uhr ist es? – ¿Qué hora es?
* Wann? – ¿Cuándo?
* Um wie viel Uhr? – ¿A qué hora?
* Von wann bis wann? – ¿Desde cuándo hasta cuándo? 

**Respuestas**
* Es ist eins. – Es la una.
* Es ist zwei Uhr. – Son las dos.
* Es ist halb drei. – Son las dos y media.
* Es ist Viertel nach zwei. – Son las dos y cuarto.
* Es ist Viertel vor drei. – Son las tres menos cuarto.
* Es ist zwanzig nach acht. – Son las ocho y veinte.
* Es ist acht Uhr dreißig. – Son las ocho y treinta.
* Es ist vierzehn Uhr fünfzehn. – Son las catorce quince. 

**Importante**
* no digas **Es ist ein Uhr**
* la forma correcta es: **Es ist eins** 

**Días relativos**
* heute – hoy
* morgen – mañana
* übermorgen – pasado mañana
* gestern – ayer
* vorgestern – anteayer 

**Partes del día**
* am Morgen – por la mañana
* am Vormittag – en la mañana
* am Mittag – al mediodía
* am Nachmittag – en la tarde
* am Abend – en la tarde / noche
* in der Nacht – en la noche 

**Fechas**
* der erste Januar – el primero de enero
* der zweite Mai – el dos de mayo 

Formato:
* am ersten Januar – el primero de enero
* am zweiten Mai – el dos de mayo 

---

#### 18. Países, idiomas y origen

**Ejemplos de origen**
* aus Chile – de Chile
* aus Spanien – de España
* aus Syrien – de Siria
* aus Russland – de Rusia
* aus Frankreich – de Francia 

**Frases útiles**
* Ich komme aus ... – Vengo de ...
* Ich lebe in ... – Vivo en ...
* Ich wohne in ... – Vivo en ...
* Ich spreche Spanisch. – Hablo español.
* Ich spreche auch Englisch. – También hablo inglés.
* Meine Muttersprache ist Spanisch. – Mi lengua materna es el español. 

---

#### 19. Frases para presentarse
* Ich heiße ... – Me llamo ...
* Mein Name ist ... – Mi nombre es ...
* Ich bin ... Jahre alt. – Tengo ... años.
* Ich komme aus ... – Vengo de ...
* Ich wohne in ... – Vivo en ...
* Ich spreche ... – Hablo ...
* Ich lerne Deutsch. – Estudio alemán.
* Ich arbeite als ... – Trabajo como ...
* Ich bin verheiratet. – Estoy casado / casada.
* Ich bin ledig. – Soy soltero / soltera.
* Ich habe keine Kinder. – No tengo hijos.
* Mein Hobby ist ... – Mi hobby es ...
* Meine Telefonnummer ist ... – Mi número de teléfono es ...
* Meine E-Mail-Adresse ist ... – Mi correo electrónico es ... 

**Preguntas típicas**
* Wie heißt du? – ¿Cómo te llamas?
* Wo wohnst du? – ¿Dónde vives?
* Woher kommst du? – ¿De dónde vienes?
* Welche Sprachen sprichst du? – ¿Qué idiomas hablas?
* Was machst du beruflich? – ¿A qué te dedicas? 

**Formularios y curso**
* Schon Deutsch gelernt? – ¿Ya ha estudiado alemán?
* Wie lange? – ¿Cuánto tiempo? 

---

#### 20. Frases para pedir cosas
* Ich möchte ... – Me gustaría ...
* Ich hätte gern ... – Quisiera ...
* Kann ich bitte ... haben? – ¿Me puede dar ... por favor?
* Können Sie mir bitte helfen? – ¿Puede ayudarme, por favor?
* Darf ich ...? – ¿Puedo ...?
* Ich brauche ... – Necesito ...
* Ich suche ... – Busco ...
* Ich möchte ... kaufen. – Quiero comprar ... 

---

#### 21. Frases para sprechen: pedir, ofrecer, proponer, reaccionar

**Pedir / ofrecer / proponer**
* Kannst du mir bitte ...? – ¿Puedes ... por favor?
* Können Sie mir bitte ...? – ¿Puede ... por favor?
* Kann ich dir helfen? – ¿Puedo ayudarte?
* Kann ich Ihnen helfen? – ¿Puedo ayudarle?
* Soll ich ...? – ¿Debo / quiere que ...?
* Möchtest du ...? – ¿Te gustaría ...?
* Wollen wir ...? – ¿Quieres / quieren que ...?
* Vielleicht ... – Quizás ...
* Du kannst ... – Tú puedes ...
* Sie können ... – Usted puede ... 

**Respuestas**
* Ja, gern. – Sí, con gusto.
* Gerne. – Con gusto.
* Natürlich. – Por supuesto.
* Gute Idee. – Buena idea.
* Das ist sehr nett. – Eso es muy amable.
* Danke. – Gracias.
* Leider nicht. – Lamentablemente no.
* Tut mir leid, ich kann nicht. – Lo siento, no puedo. 

---

#### 22. Cortesía y respuestas cortas

**Cortesía**
* bitte – por favor
* danke – gracias
* vielen Dank – muchas gracias
* gern / gerne – con gusto
* natürlich – por supuesto
* Entschuldigung – disculpe
* Es tut mir leid – lo siento 

**Respuestas cortas útiles**
* Herzlichen Glückwunsch! – ¡Felicitaciones!
* Ach, das tut mir leid. – Ay, lo siento.
* Gern. – Con gusto.
* Gerne. – Con gusto.
* Natürlich. – Por supuesto.
* Für mich nicht, danke. – Para mí no, gracias.
* Danke, es geht mir gut. – Gracias, estoy bien.
* Nein, das gehört mir nicht. – No, eso no me pertenece.
* Ein Glas Apfelsaft, bitte. – Un vaso de jugo de manzana, por favor.
* Nein, da habe ich einen Termin. – No, ahí tengo una cita.
* Ist alles in Ordnung? – ¿Está todo bien?
* Ja, alles gut. – Sí, todo bien.
* Leider nicht. – Lamentablemente no.
* Tut mir leid, ich kann nicht. – Lo siento, no puedo. 

**Otras respuestas cortas**
* ja – sí
* nein – no
* doch – sí (para contradecir una negación)
* vielleicht – quizás
* ein bisschen – un poco
* kein Problem – ningún problema
* Ich verstehe nicht. – No entiendo. 

---

#### 23. Frases cortas que conviene memorizar
* Wie bitte? – ¿Cómo?
* Bitte langsamer. – Más lento, por favor.
* Bitte noch einmal. – Otra vez, por favor.
* Können Sie das bitte wiederholen? – ¿Puede repetir eso, por favor?
* Wie schreibt man das? – ¿Cómo se escribe eso?
* Was bedeutet das? – ¿Qué significa eso?
* Ich weiß nicht. – No sé.
* Ich habe eine Frage. – Tengo una pregunta.
* Das verstehe ich nicht. – Eso no lo entiendo. 

---

#### 24. Carteles y expresiones frecuentes
* geöffnet – abierto
* geschlossen – cerrado
* Rauchen verboten – prohibido fumar
* nur – solo
* ab – desde
* bis – hasta 

---

#### 25. Frases modelo para Schreiben

**Inicio / motivo**
* Vielen Dank für ... – Muchas gracias por ...
* Danke für deine Einladung. – Gracias por tu invitación.
* Danke für Ihre Hilfe. – Gracias por su ayuda.
* Ich schreibe, weil ... – Escribo porque ...
* Ich möchte ... einladen. – Me gustaría invitar ...
* Ich möchte Informationen über ... – Me gustaría información sobre ...
* Können Sie mir ... schicken? – ¿Puede enviarme ...?
* Ich komme leider später. – Lamentablemente llegaré más tarde.
* Kann ich helfen? – ¿Puedo ayudar?
* Wollen wir uns am ... um ... treffen? – ¿Nos juntamos el ... a las ...?
* Wir treffen uns im Café. – Nos juntamos en el café.
* Wir treffen uns im Restaurant. – Nos juntamos en el restaurante.
* Wir treffen uns bei mir. – Nos juntamos en mi casa.
* Wir treffen uns im Büro. – Nos juntamos en la oficina.
* Ich möchte im August ... besuchen. – Me gustaría visitar ... en agosto.
* Können Sie mir Hoteladressen schicken? – ¿Puede enviarme direcciones de hoteles? 

**Cierres**
* Liebe Grüße – Saludos / cariños
* Viele Grüße – Muchos saludos
* Mit freundlichen Grüßen – Atentamente 

**Estructura básica de correo A1**
* saludo
* motivo
* 2–3 frases simples
* despedida 

---

#### 26. Palabras pequeñas muy frecuentes
* dich – te / a ti
* dir – te / a ti
* mir – me / a mí
* bin – soy / estoy
* bist – eres / estás
* ist – es / está
* hast – tienes
* hat – tiene
* helfe – ayudo
* helfen – ayudar
* oder – o
* auf – sobre / en
* in – en / dentro de
* wann – cuándo
* wo – dónde
* ein – un
* eine – una
* Gruß – saludo
* Grüße – saludos
* Dank – agradecimiento / gracias 

---

#### 27. Temas de tarjetas orales

**Wochenende**
* der Sonntag – el domingo
* das Frühstück – el desayuno
* der Sport – el deporte
* die Familie – la familia
* der Ausflug – la excursión
* die Bücher – los libros 

**Schule**
* die Freunde – los amigos
* der Lehrer – el profesor
* der Computer – el computador
* die Sprachen – los idiomas
* das Essen – la comida
* die Hausaufgaben – las tareas 

**Beruf**
* die Arbeitszeit – el horario de trabajo
* die Kollegen – los colegas
* der Spaß – la diversión
* die Arbeitskleidung – la ropa de trabajo
* der Arbeitsplatz – el lugar de trabajo
* die Aufgaben – las tareas 

**Sport**
* der Lieblingssport – el deporte favorito
* schwimmen – nadar
* das Wochenende – el fin de semana
* der Abend – la tarde / noche
* der Ball – la pelota
* das Fahrrad – la bicicleta 

**Deutschkurs**
* das Buch – el libro
* der Lehrer – el profesor
* der Computer – el computador
* das Lesen – la lectura
* die Hausaufgaben – las tareas
* der Stift – el lápiz / bolígrafo 

**Einkaufen**
* der Supermarkt – el supermercado
* das Geld – el dinero
* das Gemüse – la verdura
* das Kaufhaus – la tienda por departamentos
* das Brot – el pan
* die Kasse – la caja 

---

#### 28. Frases clave de examen

**Speaking / presentación**
* Ich heiße ... – Me llamo ...
* Ich bin ... Jahre alt. – Tengo ... años.
* Ich komme aus ... – Vengo de ...
* Ich wohne in ... – Vivo en ...
* Ich spreche ... – Hablo ...
* Ich arbeite als ... – Trabajo como ... 

**Compras / restaurante**
* Ich hätte gern ... – Quisiera ...
* Ich möchte ... – Me gustaría ...
* Wie viel kostet das? – ¿Cuánto cuesta eso?
* Kann ich bitte ... haben? – ¿Me puede dar ... por favor? 

**Ayuda / aclaración**
* Können Sie das bitte wiederholen? – ¿Puede repetir eso, por favor?
* Bitte langsamer. – Más lento, por favor.
* Bitte noch einmal. – Otra vez, por favor.
* Ich verstehe nicht. – No entiendo. 

---

#### 29. Resumen de reglas clave que sí o sí debes recordar

1. **Verbo en segunda posición** en oración normal. 

   * Heute gehe ich nach Hause. – Hoy voy a casa. 

2. **weil** manda el verbo al final. 

   * Ich bleibe zu Hause, weil ich müde bin. – Me quedo en casa porque estoy cansado. 

3. **Modal + infinitivo al final**. 

   * Ich will Deutsch lernen. – Quiero aprender alemán. 

4. **Verbos separables**: el prefijo va al final en presente. 

   * Ich rufe meine Mutter an. – Llamo a mi madre. 

5. **nicht** niega verbos o frases; **kein** niega sustantivos. 

   * Ich gehe nicht. – No voy. 

   * Ich habe kein Auto. – No tengo auto. 

6. **wo / wohin / woher** no son lo mismo. 

   * Wo wohnst du? – ¿Dónde vives? 

   * Wohin gehst du? – ¿A dónde vas? 

   * Woher kommst du? – ¿De dónde vienes? 

7. **wie viel** y **wie viele** no son lo mismo. 

   * Wie viel Wasser? – ¿Cuánta agua? 

   * Wie viele Bücher? – ¿Cuántos libros? 

8. **Dativ plural** normalmente lleva **-n**. 

   * mit meinen Freunden – con mis amigos 

9. **Es ist eins**, no **Es ist ein Uhr**. 

10. **warten auf + Akkusativ**
* Ich warte auf den Bus. – Espero el bus. 

11. **telefonieren mit + Dativ**
* Ich telefoniere mit meiner Freundin. – Hablo por teléfono con mi novia / amiga. 

12. **schmecken / gefallen** funcionan con dativo.
* Das schmeckt mir. – Eso me gusta / me sabe bien.
* Das gefällt mir. – Eso me gusta. 

---

#### 30. Mini checklist final A1
* alfabeto y deletreo
* artículos definidos
* artículos indefinidos
* kein
* posesivos
* nominativ / akkusativ / dativ
* verbos regulares
* sein / haben
* modales
* verbos separables
* preguntas ja / nein
* W-Fragen
* negación
* preposiciones más comunes
* conjunciones básicas
* orden de la oración
* Perfekt básico
* hora y fecha
* datos personales y formularios
* presentación personal
* frases de cortesía
* pedir información
* escribir un correo simple
* frases útiles para speaking
* temas de tarjetas orales

#### 50 VERBOS REGULARES MUY USADOS – A1

Presente

Orden de las formas:

ich / du / er-sie-es / wir / ihr / sie-Sie

1) arbeiten – trabajar

arbeite / arbeitest / arbeitet / arbeiten / arbeitet / arbeiten

2) lernen – aprender, estudiar

lerne / lernst / lernt / lernen / lernt / lernen

3) wohnen – vivir

wohne / wohnst / wohnt / wohnen / wohnt / wohnen

4) machen – hacer

mache / machst / macht / machen / macht / machen

5) kaufen – comprar

kaufe / kaufst / kauft / kaufen / kauft / kaufen

6) brauchen – necesitar

brauche / brauchst / braucht / brauchen / braucht / brauchen

7) kosten – costar

koste / kostest / kostet / kosten / kostet / kosten

8) zahlen – pagar

zahle / zahlst / zahlt / zahlen / zahlt / zahlen

9) bezahlen – pagar

bezahle / bezahlst / bezahlt / bezahlen / bezahlt / bezahlen

10) fragen – preguntar

frage / fragst / fragt / fragen / fragt / fragen

11) sagen – decir

sage / sagst / sagt / sagen / sagt / sagen

12) suchen – buscar

suche / suchst / sucht / suchen / sucht / suchen

13) spielen – jugar

spiele / spielst / spielt / spielen / spielt / spielen

14) tanzen – bailar

tanze / tanzt / tanzt / tanzen / tanzt / tanzen

15) reisen – viajar

reise / reist / reist / reisen / reist / reisen

16) kochen – cocinar

koche / kochst / kocht / kochen / kocht / kochen

17) feiern – celebrar

feiere / feierst / feiert / feiern / feiert / feiern

18) mieten – alquilar

miete / mietest / mietet / mieten / mietet / mieten

19) putzen – limpiar

putze / putzt / putzt / putzen / putzt / putzen

20) studieren – estudiar en la universidad

studiere / studierst / studiert / studieren / studiert / studieren

21) telefonieren – hablar por teléfono

telefoniere / telefonierst / telefoniert / telefonieren / telefoniert / telefonieren

22) buchstabieren – deletrear

buchstabiere / buchstabierst / buchstabiert / buchstabieren / buchstabiert / buchstabieren

23) gratulieren – felicitar

gratuliere / gratulierst / gratuliert / gratulieren / gratuliert / gratulieren

24) organisieren – organizar

organisiere / organisierst / organisiert / organisieren / organisiert / organisieren

25) formulieren – formular, redactar

formuliere / formulierst / formuliert / formulieren / formuliert / formulieren

26) reagieren – reaccionar

reagiere / reagierst / reagiert / reagieren / reagiert / reagieren

27) reparieren – reparar

repariere / reparierst / repariert / reparieren / repariert / reparieren

28) reservieren – reservar

reserviere / reservierst / reserviert / reservieren / reserviert / reservieren

29) trainieren – entrenar

trainiere / trainierst / trainiert / trainieren / trainiert / trainieren

30) probieren – probar, intentar

probiere / probierst / probiert / probieren / probiert / probieren

31) bestellen – pedir, encargar

bestelle / bestellst / bestellt / bestellen / bestellt / bestellen

32) besuchen – visitar

besuche / besuchst / besucht / besuchen / besucht / besuchen

33) glauben – creer

glaube / glaubst / glaubt / glauben / glaubt / glauben

34) leben – vivir

lebe / lebst / lebt / leben / lebt / leben

35) warten – esperar

warte / wartest / wartet / warten / wartet / warten

36) antworten – responder

antworte / antwortest / antwortet / antworten / antwortet / antworten

37) sammeln – juntar, coleccionar

sammle / sammelst / sammelt / sammeln / sammelt / sammeln

38) packen – empacar

packe / packst / packt / packen / packt / packen

39) öffnen – abrir

öffne / öffnest / öffnet / öffnen / öffnet / öffnen

40) zeigen – mostrar

zeige / zeigst / zeigt / zeigen / zeigt / zeigen

41) hören – escuchar

höre / hörst / hört / hören / hört / hören

42) üben – practicar

übe / übst / übt / üben / übt / üben

43) planen – planear

plane / planst / plant / planen / plant / planen

44) erklären – explicar

erkläre / erklärst / erklärt / erklären / erklärt / erklären

45) wechseln – cambiar

wechsle / wechselst / wechselt / wechseln / wechselt / wechseln

46) malen – dibujar, pintar

male / malst / malt / malen / malt / malen

47) duschen – ducharse, duchar

dusche / duschst / duscht / duschen / duscht / duschen

48) baden – bañarse

bade / badest / badet / baden / badet / baden

49) fotografieren – fotografiar

fotografiere / fotografierst / fotografiert / fotografieren / fotografiert / fotografieren

50) danken – agradecer

danke / dankst / dankt / danken / dankt / danken

#### 50 VERBOS IRREGULARES / FUERTES / MIXTOS MUY USADOS – A1

Presente

Orden:

ich / du / er-sie-es / wir / ihr / sie-Sie

1) sein – ser, estar

bin / bist / ist / sind / seid / sind

2) haben – tener

habe / hast / hat / haben / habt / haben

3) werden – llegar a ser

werde / wirst / wird / werden / werdet / werden

4) heißen – llamarse

heiße / heißt / heißt / heißen / heißt / heißen

5) wissen – saber

weiß / weißt / weiß / wissen / wisst / wissen

6) können – poder

kann / kannst / kann / können / könnt / können

7) müssen – tener que

muss / musst / muss / müssen / müsst / müssen

8) wollen – querer

will / willst / will / wollen / wollt / wollen

9) dürfen – poder, tener permiso

darf / darfst / darf / dürfen / dürft / dürfen

10) sollen – deber

soll / sollst / soll / sollen / sollt / sollen

11) mögen – gustar

mag / magst / mag / mögen / mögt / mögen

12) nehmen – tomar

nehme / nimmst / nimmt / nehmen / nehmt / nehmen

13) geben – dar

gebe / gibst / gibt / geben / gebt / geben

14) lesen – leer

lese / liest / liest / lesen / lest / lesen

15) sehen – ver

sehe / siehst / sieht / sehen / seht / sehen

16) sprechen – hablar

spreche / sprichst / spricht / sprechen / sprecht / sprechen

17) helfen – ayudar

helfe / hilfst / hilft / helfen / helft / helfen

18) treffen – encontrarse

treffe / triffst / trifft / treffen / trefft / treffen

19) essen – comer

esse / isst / isst / essen / esst / essen

20) fahren – ir en vehículo

fahre / fährst / fährt / fahren / fahrt / fahren

21) schlafen – dormir

schlafe / schläfst / schläft / schlafen / schlaft / schlafen

22) tragen – llevar

trage / trägst / trägt / tragen / tragt / tragen

23) waschen – lavar

wasche / wäschst / wäscht / waschen / wascht / waschen

24) laufen – correr

laufe / läufst / läuft / laufen / lauft / laufen

25) halten – parar, sostener

halte / hältst / hält / halten / haltet / halten

26) gefallen – gustar, agradar

gefalle / gefällst / gefällt / gefallen / gefallt / gefallen

27) vergessen – olvidar

vergesse / vergisst / vergisst / vergessen / vergesst / vergessen

28) lassen – dejar

lasse / lässt / lässt / lassen / lasst / lassen

29) gehen – ir

gehe / gehst / geht / gehen / geht / gehen

30) kommen – venir

komme / kommst / kommt / kommen / kommt / kommen

31) finden – encontrar

finde / findest / findet / finden / findet / finden

32) bleiben – quedarse

bleibe / bleibst / bleibt / bleiben / bleibt / bleiben

33) trinken – beber

trinke / trinkst / trinkt / trinken / trinkt / trinken

34) schreiben – escribir

schreibe / schreibst / schreibt / schreiben / schreibt / schreiben

35) denken – pensar

denke / denkst / denkt / denken / denkt / denken

36) bringen – traer

bringe / bringst / bringt / bringen / bringt / bringen

37) kennen – conocer

kenne / kennst / kennt / kennen / kennt / kennen

38) nennen – nombrar, decir

nenne / nennst / nennt / nennen / nennt / nennen

39) tun – hacer

tue / tust / tut / tun / tut / tun

40) verstehen – entender

verstehe / verstehst / versteht / verstehen / versteht / verstehen

41) einladen – invitar

lade ein / lädst ein / lädt ein / laden ein / ladet ein / laden ein

42) mitnehmen – llevar(se)

nehme mit / nimmst mit / nimmt mit / nehmen mit / nehmt mit / nehmen mit

43) fernsehen – ver televisión

sehe fern / siehst fern / sieht fern / sehen fern / seht fern / sehen fern

44) anfangen – empezar

fange an / fängst an / fängt an / fangen an / fangt an / fangen an

45) aufstehen – levantarse

stehe auf / stehst auf / steht auf / stehen auf / steht auf / stehen auf

46) einschlafen – dormirse

schlafe ein / schläfst ein / schläft ein / schlafen ein / schlaft ein / schlafen ein

47) wegfahren – irse, partir

fahre weg / fährst weg / fährt weg / fahren weg / fahrt weg / fahren weg

48) abfahren – salir, partir

fahre ab / fährst ab / fährt ab / fahren ab / fahrt ab / fahren ab

49) vorschlagen – proponer

schlage vor / schlägst vor / schlägt vor / schlagen vor / schlagt vor / schlagen vor

50) eintragen – inscribir, anotar

trage ein / trägst ein / trägt ein / tragen ein / tragt ein / tragen ein

---

## Parte 3 — Vocabulario base A1 (estructurado)

---
title: "Vocabulario alemán A1 — base didáctica para app HTML"
language: "es-DE"
level: "A1"
purpose: "Base de estudio y estructura de datos para crear una aplicación HTML didáctica"
created: "2026-06-29"
sources_basis:
  - "Goethe-Institut: Goethe-Zertifikat A1 exam training and vocabulary list"
  - "Goethe-Institut: Deutsch Online A1 glossary"
  - "telc: Start Deutsch 1 / telc Deutsch A1"
  - "telc: Einfach gut! Deutsch für die Integration A1.1 / A1.2 word lists"
---

### Vocabulario alemán A1 — base didáctica para app HTML

> **Objetivo:** tener una base clara, útil y reutilizable para aprender vocabulario A1 en alemán y después convertir este contenido en una app HTML interactiva.  
> **Enfoque:** español → alemán, con artículos, plurales, verbos, adjetivos, preposiciones, frases útiles, ejemplos y ejercicios.

---

#### 1. Cómo usar este archivo

Este archivo está diseñado para tres usos:

1. **Estudiar manualmente**: leer tablas, frases y ejemplos.
2. **Crear flashcards**: artículo + palabra + plural + traducción + ejemplo.
3. **Generar una app HTML**: usar las secciones `APP_DATA_*` como base para preguntas, filtros y juegos.

##### Reglas de oro para aprender vocabulario A1

- Aprende siempre los sustantivos con **artículo**: `der Tisch`, `die Frau`, `das Haus`.
- Aprende también el **plural**: `der Tisch, -e`; `die Frau, -en`; `das Haus, Häuser`.
- Aprende los verbos con una mini-frase: `ich komme aus Chile`, `ich wohne in Köln`.
- Aprende las preposiciones con caso y ejemplo: `mit + Dativ → mit dem Bus`.
- No estudies palabras aisladas solamente; estudia **bloques útiles**:
  - `Ich hätte gern ...`
  - `Wo ist ...?`
  - `Wie viel kostet ...?`
  - `Ich brauche einen Termin.`

---

#### 2. Qué se espera en A1

En A1 debes poder:

- Presentarte y presentar a otra persona.
- Decir de dónde eres, dónde vives, qué haces y qué idiomas hablas.
- Hablar de familia, trabajo, estudios, comida, compras, transporte, vivienda, salud y tiempo libre.
- Entender frases cortas y avisos simples.
- Hacer preguntas básicas y responder con frases simples.
- Escribir mensajes breves: SMS, email informal, formulario, nota.

---

#### 3. Categorías centrales de vocabulario A1

| Categoría | Para qué sirve | Ejemplos |
|---|---|---|
| Saludos y cortesía | iniciar/cerrar conversaciones | Hallo, Guten Tag, Danke |
| Identidad personal | presentarte | Name, Adresse, Alter |
| Familia | hablar de relaciones | Mutter, Vater, Kind |
| Países e idiomas | decir origen e idioma | Chile, Deutschland, Spanisch |
| Números, fechas y hora | citas, compras, horarios | eins, Montag, Uhr |
| Casa y vivienda | describir dónde vives | Wohnung, Zimmer, Küche |
| Comida y bebida | supermercado/restaurante | Brot, Wasser, Kaffee |
| Compras y precios | pagar/pedir | kaufen, kosten, Euro |
| Ciudad y transporte | moverse | Bahnhof, Bus, Straße |
| Trabajo y profesión | ocupación | arbeiten, Beruf, Büro |
| Escuela/curso | aprender alemán | Kurs, Aufgabe, Frage |
| Salud | médico/farmacia | Arzt, Apotheke, Schmerzen |
| Tiempo libre | gustos y actividades | Kino, Musik, Sport |
| Verbos básicos | comunicar acciones | sein, haben, gehen |
| Adjetivos básicos | describir | gut, schlecht, groß |
| Preposiciones | construir frases | in, auf, mit, zu |
| Conectores | unir ideas | und, aber, oder |

---

### PARTE A — Sustantivos A1 con artículo y plural

#### 4. Personas, identidad y documentos

| Alemán | Plural | Español | Ejemplo A1 |
|---|---:|---|---|
| der Name | -n | nombre | Mein Name ist Jorge. |
| der Vorname | -n | nombre de pila | Mein Vorname ist Jorge. |
| der Familienname | -n | apellido | Mein Familienname ist Arce. |
| die Adresse | -n | dirección | Wie ist Ihre Adresse? |
| die Straße | -n | calle | Ich wohne in der Venloer Straße. |
| die Hausnummer | -n | número de casa | Die Hausnummer ist 15. |
| die Postleitzahl | -en | código postal | Meine Postleitzahl ist 50672. |
| der Ort | -e | lugar / localidad | Der Ort ist Köln. |
| die Stadt | Städte | ciudad | Köln ist eine Stadt. |
| das Land | Länder | país | Deutschland ist ein Land. |
| die Nationalität | -en | nacionalidad | Meine Nationalität ist chilenisch. |
| die Sprache | -n | idioma | Ich spreche drei Sprachen. |
| das Alter | — | edad | Mein Alter? Ich bin 35. |
| das Geburtsdatum | -daten | fecha de nacimiento | Mein Geburtsdatum ist der 5. November. |
| der Geburtstag | -e | cumpleaños | Mein Geburtstag ist im November. |
| der Pass | Pässe | pasaporte | Ich brauche meinen Pass. |
| der Ausweis | -e | documento de identidad | Haben Sie Ihren Ausweis? |
| das Formular | -e | formulario | Bitte füllen Sie das Formular aus. |
| die Unterschrift | -en | firma | Hier fehlt Ihre Unterschrift. |
| das Foto | -s | foto | Ich brauche ein Foto. |

##### Mini-bloques útiles

- `Wie heißen Sie?` — ¿Cómo se llama usted?
- `Ich heiße ...` — Me llamo ...
- `Woher kommen Sie?` — ¿De dónde viene usted?
- `Ich komme aus Chile.` — Vengo de Chile.
- `Wo wohnen Sie?` — ¿Dónde vive usted?
- `Ich wohne in Köln.` — Vivo en Colonia.

---

#### 5. Familia y relaciones

| Alemán | Plural | Español | Ejemplo A1 |
|---|---:|---|---|
| die Familie | -n | familia | Meine Familie wohnt in Chile. |
| die Mutter | Mütter | madre | Meine Mutter heißt Ana. |
| der Vater | Väter | padre | Mein Vater arbeitet viel. |
| die Eltern | — | padres | Meine Eltern wohnen in Santiago. |
| das Kind | -er | niño/a; hijo/a | Das Kind ist fünf Jahre alt. |
| der Sohn | Söhne | hijo | Mein Sohn ist klein. |
| die Tochter | Töchter | hija | Seine Tochter ist acht. |
| der Bruder | Brüder | hermano | Ich habe einen Bruder. |
| die Schwester | -n | hermana | Ich habe keine Schwester. |
| der Mann | Männer | hombre; marido | Der Mann ist mein Bruder. |
| die Frau | -en | mujer; esposa; señora | Die Frau heißt Maria. |
| der Freund | -e | amigo; novio | Mein Freund kommt aus Spanien. |
| die Freundin | -nen | amiga; novia | Meine Freundin lernt Deutsch. |
| der Partner | - | pareja | Mein Partner ist zu Hause. |
| die Partnerin | -nen | pareja femenina | Meine Partnerin arbeitet heute. |
| der Nachbar | -n | vecino | Der Nachbar ist nett. |
| die Nachbarin | -nen | vecina | Die Nachbarin ist freundlich. |
| der Kollege | -n | colega masculino | Mein Kollege kommt später. |
| die Kollegin | -nen | colega femenina | Meine Kollegin ist im Büro. |
| der Mensch | -en | persona / ser humano | Viele Menschen lernen Deutsch. |

---

#### 6. Casa y vivienda

| Alemán | Plural | Español | Ejemplo A1 |
|---|---:|---|---|
| die Wohnung | -en | departamento / piso | Meine Wohnung ist klein. |
| das Haus | Häuser | casa | Das Haus ist alt. |
| das Zimmer | - | habitación | Das Zimmer ist hell. |
| das Wohnzimmer | - | sala de estar | Das Wohnzimmer ist groß. |
| das Schlafzimmer | - | dormitorio | Das Schlafzimmer ist ruhig. |
| das Bad | Bäder | baño | Das Bad ist sauber. |
| die Küche | -n | cocina | Die Küche ist klein. |
| der Balkon | -e | balcón | Der Balkon ist schön. |
| die Tür | -en | puerta | Die Tür ist offen. |
| das Fenster | - | ventana | Das Fenster ist zu. |
| der Tisch | -e | mesa | Der Tisch ist rund. |
| der Stuhl | Stühle | silla | Der Stuhl ist bequem. |
| das Bett | -en | cama | Das Bett ist neu. |
| der Schrank | Schränke | armario | Der Schrank ist voll. |
| die Lampe | -n | lámpara | Die Lampe ist kaputt. |
| der Schlüssel | - | llave | Wo ist mein Schlüssel? |
| die Miete | -n | arriendo / alquiler | Die Miete ist teuer. |
| der Vermieter | - | arrendador | Der Vermieter wohnt nicht hier. |
| die Vermieterin | -nen | arrendadora | Die Vermieterin ist freundlich. |
| die Adresse | -n | dirección | Die Adresse ist richtig. |

##### Frases útiles de vivienda

- `Ich suche eine Wohnung.` — Busco departamento.
- `Die Wohnung hat zwei Zimmer.` — El departamento tiene dos habitaciones.
- `Wie hoch ist die Miete?` — ¿Cuánto cuesta el arriendo?
- `Der Schlüssel ist auf dem Tisch.` — La llave está sobre la mesa.

---

#### 7. Comida y bebida

| Alemán | Plural | Español | Ejemplo A1 |
|---|---:|---|---|
| das Essen | — | comida | Das Essen ist gut. |
| das Frühstück | -e | desayuno | Das Frühstück ist fertig. |
| das Brot | -e | pan | Ich kaufe Brot. |
| das Brötchen | - | panecillo | Ich nehme zwei Brötchen. |
| der Käse | — | queso | Der Käse ist teuer. |
| die Butter | — | mantequilla | Ich brauche Butter. |
| die Milch | — | leche | Die Milch ist im Kühlschrank. |
| das Ei | -er | huevo | Ich esse ein Ei. |
| der Fisch | -e | pescado | Ich esse gern Fisch. |
| das Fleisch | — | carne | Ich esse kein Fleisch. |
| das Gemüse | — | verduras | Gemüse ist gesund. |
| die Kartoffel | -n | papa | Ich kaufe Kartoffeln. |
| die Tomate | -n | tomate | Die Tomate ist rot. |
| die Banane | -n | banana | Die Banane ist gelb. |
| der Apfel | Äpfel | manzana | Der Apfel ist frisch. |
| die Orange | -n | naranja | Ich nehme eine Orange. |
| der Kuchen | - | pastel | Der Kuchen schmeckt gut. |
| das Wasser | — | agua | Ich trinke Wasser. |
| der Kaffee | -s | café | Ich trinke Kaffee. |
| der Tee | -s | té | Der Tee ist heiß. |
| der Saft | Säfte | jugo | Ich trinke Apfelsaft. |
| das Bier | -e | cerveza | Ein Bier, bitte. |
| das Getränk | -e | bebida | Getränke sind dort. |
| das Glas | Gläser | vaso | Ein Glas Wasser, bitte. |
| die Flasche | -n | botella | Eine Flasche Wasser, bitte. |
| der Teller | - | plato | Der Teller ist leer. |
| die Tasse | -n | taza | Die Tasse ist blau. |
| der Löffel | - | cuchara | Ich brauche einen Löffel. |
| die Gabel | -n | tenedor | Die Gabel liegt hier. |
| das Messer | - | cuchillo | Das Messer ist scharf. |

##### Frases útiles de comida

- `Ich hätte gern ...` — Quisiera ...
- `Ich nehme ...` — Tomo / llevo ...
- `Ich esse gern ...` — Me gusta comer ...
- `Ich trinke keinen Kaffee.` — No tomo café.
- `Das schmeckt gut.` — Eso sabe bien.

---

#### 8. Supermercado, compras y dinero

| Alemán | Plural | Español | Ejemplo A1 |
|---|---:|---|---|
| der Supermarkt | Supermärkte | supermercado | Der Supermarkt ist offen. |
| das Geschäft | -e | tienda | Das Geschäft ist geschlossen. |
| der Laden | Läden | tienda | Der Laden ist klein. |
| die Kasse | -n | caja | Ich bezahle an der Kasse. |
| der Kunde | -n | cliente masculino | Der Kunde bezahlt. |
| die Kundin | -nen | cliente femenina | Die Kundin fragt etwas. |
| der Preis | -e | precio | Der Preis ist gut. |
| das Geld | — | dinero | Ich habe kein Geld. |
| der Euro | -s | euro | Das kostet zehn Euro. |
| der Cent | - | centavo | Das kostet fünfzig Cent. |
| die Karte | -n | tarjeta | Zahlen Sie mit Karte? |
| das Bargeld | — | efectivo | Ich zahle bar. |
| der Einkaufszettel | - | lista de compras | Wo ist mein Einkaufszettel? |
| das Angebot | -e | oferta | Das Angebot ist gut. |
| die Rechnung | -en | cuenta / factura | Die Rechnung, bitte. |
| die Quittung | -en | recibo | Brauchen Sie die Quittung? |
| die Größe | -n | talla / tamaño | Welche Größe haben Sie? |
| die Farbe | -n | color | Die Farbe ist schön. |
| die Kleidung | — | ropa | Kleidung ist hier. |
| die Hose | -n | pantalón | Die Hose ist schwarz. |
| das Hemd | -en | camisa | Das Hemd ist weiß. |
| das Kleid | -er | vestido | Das Kleid ist rot. |
| die Jacke | -n | chaqueta | Die Jacke ist warm. |
| der Schuh | -e | zapato | Der Schuh ist bequem. |

##### Frases útiles de compras

- `Wie viel kostet das?` — ¿Cuánto cuesta eso?
- `Das ist zu teuer.` — Eso es demasiado caro.
- `Ich suche eine Jacke.` — Busco una chaqueta.
- `Kann ich mit Karte zahlen?` — ¿Puedo pagar con tarjeta?
- `Ich brauche eine Tüte.` — Necesito una bolsa.

---

#### 9. Ciudad, transporte y lugares

| Alemán | Plural | Español | Ejemplo A1 |
|---|---:|---|---|
| die Stadt | Städte | ciudad | Die Stadt ist groß. |
| das Zentrum | Zentren | centro | Das Zentrum ist hier. |
| die Straße | -n | calle | Die Straße ist lang. |
| der Platz | Plätze | plaza / lugar | Der Platz ist schön. |
| der Bahnhof | Bahnhöfe | estación de tren | Der Bahnhof ist links. |
| die Haltestelle | -n | parada | Die Haltestelle ist dort. |
| die Bushaltestelle | -n | parada de bus | Die Bushaltestelle ist nah. |
| der Bus | -se | bus | Der Bus kommt um acht. |
| die Bahn | -en | tren / metro / tranvía | Ich fahre mit der Bahn. |
| der Zug | Züge | tren | Der Zug kommt spät. |
| das Auto | -s | auto | Das Auto ist neu. |
| das Fahrrad | Fahrräder | bicicleta | Ich fahre Fahrrad. |
| die Fahrkarte | -n | billete / ticket | Ich brauche eine Fahrkarte. |
| die Einzelfahrkarte | -n | billete sencillo | Eine Einzelfahrkarte, bitte. |
| der Plan | Pläne | plano / plan | Haben Sie einen Stadtplan? |
| die Apotheke | -n | farmacia | Die Apotheke ist rechts. |
| die Bank | -en | banco | Die Bank ist am Platz. |
| das Café | -s | café | Das Café ist offen. |
| das Restaurant | -s | restaurante | Das Restaurant ist gut. |
| das Kino | -s | cine | Das Kino ist in der Stadt. |
| der Park | -s | parque | Wir gehen in den Park. |
| die Schule | -n | escuela | Die Schule ist dort. |
| die Universität | -en | universidad | Die Universität ist groß. |
| das Büro | -s | oficina | Ich bin im Büro. |
| das Krankenhaus | Krankenhäuser | hospital | Das Krankenhaus ist weit. |

##### Frases útiles para orientarse

- `Wo ist der Bahnhof?` — ¿Dónde está la estación?
- `Gehen Sie geradeaus.` — Siga recto.
- `Links / rechts.` — Izquierda / derecha.
- `Ich fahre mit dem Bus.` — Voy en bus.
- `Wann kommt der Zug?` — ¿Cuándo llega el tren?

---

#### 10. Trabajo, curso y estudio

| Alemán | Plural | Español | Ejemplo A1 |
|---|---:|---|---|
| die Arbeit | -en | trabajo | Die Arbeit beginnt um neun. |
| der Beruf | -e | profesión | Was sind Sie von Beruf? |
| der Job | -s | trabajo | Mein Job ist interessant. |
| das Büro | -s | oficina | Ich arbeite im Büro. |
| der Chef | -s | jefe | Mein Chef ist im Meeting. |
| die Chefin | -nen | jefa | Die Chefin ist nett. |
| der Kollege | -n | colega | Mein Kollege hilft mir. |
| die Kollegin | -nen | colega | Meine Kollegin spricht Deutsch. |
| der Termin | -e | cita | Ich habe einen Termin. |
| die Pause | -n | pausa | Die Pause ist kurz. |
| die Firma | Firmen | empresa | Die Firma ist groß. |
| der Computer | - | computador | Der Computer ist neu. |
| das Handy | -s | celular | Mein Handy ist kaputt. |
| die E-Mail | -s | correo electrónico | Ich schreibe eine E-Mail. |
| der Kurs | -e | curso | Mein Deutschkurs beginnt heute. |
| die Schule | -n | escuela | Ich gehe zur Schule. |
| der Lehrer | - | profesor | Der Lehrer erklärt die Grammatik. |
| die Lehrerin | -nen | profesora | Die Lehrerin ist freundlich. |
| der Schüler | - | alumno | Der Schüler lernt Deutsch. |
| die Schülerin | -nen | alumna | Die Schülerin schreibt. |
| die Aufgabe | -n | tarea / ejercicio | Die Aufgabe ist leicht. |
| die Frage | -n | pregunta | Ich habe eine Frage. |
| die Antwort | -en | respuesta | Die Antwort ist richtig. |
| das Wort | Wörter | palabra | Das Wort ist neu. |
| der Satz | Sätze | frase / oración | Der Satz ist einfach. |
| die Grammatik | — | gramática | Grammatik ist wichtig. |

---

#### 11. Salud y cuerpo

| Alemán | Plural | Español | Ejemplo A1 |
|---|---:|---|---|
| der Körper | - | cuerpo | Der Körper braucht Wasser. |
| der Kopf | Köpfe | cabeza | Mein Kopf tut weh. |
| das Auge | -n | ojo | Meine Augen sind müde. |
| das Ohr | -en | oreja / oído | Mein Ohr tut weh. |
| die Nase | -n | nariz | Meine Nase ist zu. |
| der Mund | Münder | boca | Machen Sie den Mund auf. |
| der Zahn | Zähne | diente | Mein Zahn tut weh. |
| der Hals | Hälse | garganta / cuello | Mein Hals tut weh. |
| der Arm | -e | brazo | Mein Arm tut weh. |
| die Hand | Hände | mano | Meine Hand ist kalt. |
| der Finger | - | dedo | Der Finger tut weh. |
| der Bauch | Bäuche | barriga / estómago | Mein Bauch tut weh. |
| das Bein | -e | pierna | Mein Bein tut weh. |
| der Fuß | Füße | pie | Mein Fuß tut weh. |
| der Arzt | Ärzte | médico | Ich gehe zum Arzt. |
| die Ärztin | -nen | médica | Die Ärztin ist da. |
| die Apotheke | -n | farmacia | Ich gehe in die Apotheke. |
| die Medizin | -en | medicina | Ich brauche Medizin. |
| die Tablette | -n | pastilla | Nehmen Sie eine Tablette. |
| der Schmerz | -en | dolor | Ich habe Schmerzen. |
| das Fieber | — | fiebre | Ich habe Fieber. |
| die Erkältung | -en | resfrío | Ich habe eine Erkältung. |
| der Termin | -e | cita | Ich brauche einen Termin. |
| die Krankenversicherung | -en | seguro médico | Haben Sie eine Krankenversicherung? |

##### Frases útiles de salud

- `Mir geht es nicht gut.` — No me siento bien.
- `Ich habe Kopfschmerzen.` — Tengo dolor de cabeza.
- `Mein Hals tut weh.` — Me duele la garganta.
- `Ich brauche einen Termin.` — Necesito una cita.
- `Wo ist die nächste Apotheke?` — ¿Dónde está la farmacia más cercana?

---

#### 12. Tiempo, calendario y frecuencia

| Alemán | Plural | Español | Ejemplo A1 |
|---|---:|---|---|
| die Zeit | -en | tiempo | Ich habe keine Zeit. |
| die Uhr | -en | reloj / hora | Es ist acht Uhr. |
| die Stunde | -n | hora | Der Kurs dauert eine Stunde. |
| die Minute | -n | minuto | Ich komme in zehn Minuten. |
| der Tag | -e | día | Heute ist ein guter Tag. |
| die Woche | -n | semana | Die Woche ist lang. |
| der Monat | -e | mes | Der Monat hat vier Wochen. |
| das Jahr | -e | año | Ein Jahr hat zwölf Monate. |
| der Morgen | - | mañana | Am Morgen trinke ich Kaffee. |
| der Mittag | -e | mediodía | Um Mittag esse ich. |
| der Abend | -e | tarde / noche | Am Abend bin ich zu Hause. |
| die Nacht | Nächte | noche | Die Nacht ist ruhig. |
| der Montag | -e | lunes | Am Montag arbeite ich. |
| der Dienstag | -e | martes | Dienstag habe ich Deutschkurs. |
| der Mittwoch | -e | miércoles | Mittwoch ist frei. |
| der Donnerstag | -e | jueves | Donnerstag habe ich Zeit. |
| der Freitag | -e | viernes | Freitag gehe ich ins Kino. |
| der Samstag | -e | sábado | Samstag kaufe ich ein. |
| der Sonntag | -e | domingo | Sonntag schlafe ich lange. |
| der Januar | — | enero | Im Januar ist es kalt. |
| der Februar | — | febrero | Im Februar habe ich Geburtstag. |
| der März | — | marzo | Im März beginnt der Frühling. |
| der April | — | abril | Im April regnet es oft. |
| der Mai | — | mayo | Im Mai ist es schön. |
| der Juni | — | junio | Im Juni ist es warm. |
| der Juli | — | julio | Im Juli habe ich Urlaub. |
| der August | — | agosto | Im August ist Sommer. |
| der September | — | septiembre | Im September beginnt der Kurs. |
| der Oktober | — | octubre | Im Oktober ist Herbst. |
| der November | — | noviembre | Im November ist es kalt. |
| der Dezember | — | diciembre | Im Dezember ist Weihnachten. |

##### Adverbios de tiempo A1

| Alemán | Español | Ejemplo |
|---|---|---|
| heute | hoy | Heute arbeite ich. |
| morgen | mañana | Morgen habe ich Zeit. |
| gestern | ayer | Gestern war ich krank. |
| jetzt | ahora | Jetzt lerne ich Deutsch. |
| später | más tarde | Ich komme später. |
| bald | pronto | Bis bald! |
| immer | siempre | Ich trinke immer Kaffee. |
| oft | a menudo | Ich gehe oft spazieren. |
| manchmal | a veces | Manchmal koche ich. |
| nie | nunca | Ich rauche nie. |

---

#### 13. Tiempo atmosférico

| Alemán | Español | Ejemplo |
|---|---|---|
| das Wetter | el clima | Das Wetter ist gut. |
| die Sonne | el sol | Die Sonne scheint. |
| der Regen | la lluvia | Der Regen ist stark. |
| der Schnee | la nieve | Schnee ist schön. |
| der Wind | el viento | Der Wind ist kalt. |
| warm | cálido | Heute ist es warm. |
| kalt | frío | Es ist kalt. |
| heiß | caluroso / caliente | Der Kaffee ist heiß. |
| schön | bonito / agradable | Das Wetter ist schön. |
| schlecht | malo | Das Wetter ist schlecht. |
| regnen | llover | Es regnet. |
| schneien | nevar | Es schneit. |

---

### PARTE B — Verbos A1 esenciales

#### 14. Verbos más importantes

| Infinitivo | Español | ich | du | er/sie/es | Ejemplo A1 |
|---|---|---:|---:|---:|---|
| sein | ser / estar | bin | bist | ist | Ich bin müde. |
| haben | tener | habe | hast | hat | Ich habe Zeit. |
| heißen | llamarse | heiße | heißt | heißt | Ich heiße Jorge. |
| kommen | venir | komme | kommst | kommt | Ich komme aus Chile. |
| wohnen | vivir / residir | wohne | wohnst | wohnt | Ich wohne in Köln. |
| leben | vivir | lebe | lebst | lebt | Ich lebe in Deutschland. |
| sprechen | hablar | spreche | sprichst | spricht | Ich spreche Spanisch. |
| lernen | aprender | lerne | lernst | lernt | Ich lerne Deutsch. |
| arbeiten | trabajar | arbeite | arbeitest | arbeitet | Ich arbeite im Büro. |
| machen | hacer | mache | machst | macht | Was machst du? |
| gehen | ir | gehe | gehst | geht | Ich gehe nach Hause. |
| fahren | ir en vehículo | fahre | fährst | fährt | Ich fahre mit dem Bus. |
| essen | comer | esse | isst | isst | Ich esse gern Brot. |
| trinken | beber | trinke | trinkst | trinkt | Ich trinke Wasser. |
| kaufen | comprar | kaufe | kaufst | kauft | Ich kaufe Milch. |
| kosten | costar | kostet | kostest | kostet | Das kostet zehn Euro. |
| brauchen | necesitar | brauche | brauchst | braucht | Ich brauche Hilfe. |
| suchen | buscar | suche | suchst | sucht | Ich suche den Bahnhof. |
| finden | encontrar | finde | findest | findet | Ich finde das gut. |
| nehmen | tomar / llevar | nehme | nimmst | nimmt | Ich nehme einen Kaffee. |
| geben | dar / haber | gebe | gibst | gibt | Es gibt ein Problem. |
| lesen | leer | lese | liest | liest | Ich lese eine E-Mail. |
| schreiben | escribir | schreibe | schreibst | schreibt | Ich schreibe einen Satz. |
| hören | escuchar / oír | höre | hörst | hört | Ich höre Musik. |
| sehen | ver | sehe | siehst | sieht | Ich sehe den Bus. |
| verstehen | entender | verstehe | verstehst | versteht | Ich verstehe Deutsch. |
| fragen | preguntar | frage | fragst | fragt | Ich frage den Lehrer. |
| antworten | responder | antworte | antwortest | antwortet | Bitte antworten Sie. |
| helfen | ayudar | helfe | hilfst | hilft | Können Sie mir helfen? |
| bezahlen | pagar | bezahle | bezahlst | bezahlt | Ich bezahle mit Karte. |
| öffnen | abrir | öffne | öffnest | öffnet | Ich öffne die Tür. |
| schließen | cerrar | schließe | schließt | schließt | Ich schließe das Fenster. |
| warten | esperar | warte | wartest | wartet | Ich warte auf den Bus. |
| schlafen | dormir | schlafe | schläfst | schläft | Ich schlafe gut. |
| aufstehen | levantarse | stehe auf | stehst auf | steht auf | Ich stehe um sieben auf. |
| anrufen | llamar por teléfono | rufe an | rufst an | ruft an | Ich rufe dich an. |
| einkaufen | hacer compras | kaufe ein | kaufst ein | kauft ein | Ich kaufe am Samstag ein. |
| ausfüllen | rellenar | fülle aus | füllst aus | füllt aus | Ich fülle das Formular aus. |

---

#### 15. Verbos modales A1

| Modal | Español | ich | du | er/sie/es | Ejemplo |
|---|---|---:|---:|---:|---|
| können | poder / saber hacer | kann | kannst | kann | Ich kann Deutsch sprechen. |
| müssen | tener que | muss | musst | muss | Ich muss arbeiten. |
| wollen | querer | will | willst | will | Ich will Kaffee trinken. |
| möchten | quisiera | möchte | möchtest | möchte | Ich möchte bezahlen. |
| dürfen | tener permiso | darf | darfst | darf | Darf ich hier sitzen? |
| sollen | deber / se supone | soll | sollst | soll | Ich soll den Arzt anrufen. |

##### Regla práctica

Con modal, el segundo verbo va al final en infinitivo:

- `Ich kann Deutsch sprechen.`
- `Ich muss morgen arbeiten.`
- `Ich möchte einen Kaffee trinken.`

---

#### 16. Verbos separables A1

| Verbo | Español | Ejemplo |
|---|---|---|
| aufstehen | levantarse | Ich stehe um sieben auf. |
| einkaufen | hacer compras | Wir kaufen im Supermarkt ein. |
| anrufen | llamar | Ich rufe meine Mutter an. |
| mitkommen | venir con alguien | Kommst du mit? |
| aufmachen | abrir | Mach bitte die Tür auf. |
| zumachen | cerrar | Mach bitte das Fenster zu. |
| anfangen | empezar | Der Kurs fängt um neun an. |
| aufhören | terminar / parar | Der Kurs hört um zwölf auf. |
| abfahren | salir un transporte | Der Zug fährt um acht ab. |
| ankommen | llegar | Der Bus kommt um neun an. |

---

### PARTE C — Adjetivos y adverbios A1

#### 17. Adjetivos básicos

| Alemán | Español | Contrario | Ejemplo |
|---|---|---|---|
| gut | bueno | schlecht | Das Essen ist gut. |
| schlecht | malo | gut | Das Wetter ist schlecht. |
| schön | bonito | hässlich | Die Stadt ist schön. |
| neu | nuevo | alt | Mein Handy ist neu. |
| alt | viejo; de edad | neu / jung | Das Haus ist alt. |
| jung | joven | alt | Meine Schwester ist jung. |
| groß | grande | klein | Die Wohnung ist groß. |
| klein | pequeño | groß | Das Zimmer ist klein. |
| lang | largo | kurz | Die Straße ist lang. |
| kurz | corto | lang | Die Pause ist kurz. |
| teuer | caro | billig | Die Miete ist teuer. |
| billig | barato | teuer | Das Brot ist billig. |
| warm | cálido | kalt | Der Tee ist warm. |
| kalt | frío | warm | Das Wasser ist kalt. |
| heiß | caliente | kalt | Der Kaffee ist heiß. |
| richtig | correcto | falsch | Die Antwort ist richtig. |
| falsch | incorrecto | richtig | Das ist falsch. |
| leicht | fácil / ligero | schwer | Die Aufgabe ist leicht. |
| schwer | difícil / pesado | leicht | Deutsch ist schwer. |
| schnell | rápido | langsam | Der Zug ist schnell. |
| langsam | lento | schnell | Bitte sprechen Sie langsam. |
| offen | abierto | geschlossen | Der Laden ist offen. |
| geschlossen | cerrado | offen | Die Tür ist geschlossen. |
| voll | lleno | leer | Der Bus ist voll. |
| leer | vacío | voll | Die Flasche ist leer. |
| krank | enfermo | gesund | Ich bin krank. |
| gesund | sano | krank | Gemüse ist gesund. |
| müde | cansado | wach | Ich bin müde. |
| freundlich | amable | unfreundlich | Die Ärztin ist freundlich. |
| nett | simpático | — | Mein Nachbar ist nett. |

---

#### 18. Colores

| Alemán | Español | Ejemplo |
|---|---|---|
| weiß | blanco | Das Hemd ist weiß. |
| schwarz | negro | Die Hose ist schwarz. |
| rot | rojo | Die Tomate ist rot. |
| blau | azul | Das Auto ist blau. |
| grün | verde | Der Apfel ist grün. |
| gelb | amarillo | Die Banane ist gelb. |
| braun | café / marrón | Der Tisch ist braun. |
| grau | gris | Der Himmel ist grau. |
| orange | naranja | Die Jacke ist orange. |
| rosa | rosado | Das Kleid ist rosa. |
| lila | morado | Die Tasche ist lila. |

---

### PARTE D — Preposiciones A1

#### 19. Preposiciones con dativo muy frecuentes

| Preposición | Español | Ejemplo | Nota |
|---|---|---|---|
| aus | de / desde origen | Ich komme aus Chile. | origen |
| bei | en casa de / junto a | Ich wohne bei meiner Freundin. | persona/lugar |
| mit | con / en transporte | Ich fahre mit dem Bus. | medio/compañía |
| nach | a / hacia | Ich fahre nach Berlin. | ciudades/países sin artículo |
| seit | desde hace | Ich lerne seit Januar Deutsch. | tiempo |
| von | de / desde | Ich komme von der Arbeit. | origen |
| zu | a / hacia | Ich gehe zum Arzt. | persona/institución |

##### Contracciones útiles

| Forma | Viene de | Español |
|---|---|---|
| im | in + dem | en el |
| am | an + dem | en el / el día |
| zum | zu + dem | al |
| zur | zu + der | a la |
| vom | von + dem | del / desde el |
| beim | bei + dem | en casa de / junto al |

---

#### 20. Preposiciones con acusativo frecuentes

| Preposición | Español | Ejemplo |
|---|---|---|
| durch | por / a través de | Ich gehe durch den Park. |
| für | para | Das ist für dich. |
| gegen | contra / alrededor de | Der Bus kommt gegen acht. |
| ohne | sin | Kaffee ohne Zucker, bitte. |
| um | a / alrededor de | Der Kurs beginnt um neun. |

---

#### 21. Preposiciones mixtas A1/A2 útiles

Estas pueden usar acusativo o dativo. Para A1, apréndelas primero con frases fijas.

| Preposición | Español | Ejemplo simple |
|---|---|---|
| in | en / a | Ich wohne in Köln. |
| an | en / junto a | Der Kurs ist am Montag. |
| auf | sobre / en | Das Buch liegt auf dem Tisch. |
| vor | delante de / antes de | Ich bin vor dem Bahnhof. |
| hinter | detrás de | Der Park ist hinter dem Haus. |
| neben | al lado de | Die Apotheke ist neben der Bank. |
| über | encima de / sobre | Die Lampe ist über dem Tisch. |
| unter | debajo de | Die Tasche ist unter dem Stuhl. |
| zwischen | entre | Der Bahnhof ist zwischen Bank und Café. |

---

### PARTE E — Pronombres, artículos y determinantes

#### 22. Pronombres personales

| Alemán | Español | Ejemplo |
|---|---|---|
| ich | yo | Ich bin Jorge. |
| du | tú | Du bist nett. |
| er | él | Er kommt aus Deutschland. |
| sie | ella | Sie wohnt in Köln. |
| es | ello | Es ist klein. |
| wir | nosotros/as | Wir lernen Deutsch. |
| ihr | vosotros/as | Ihr seid im Kurs. |
| sie | ellos/as | Sie kommen heute. |
| Sie | usted/ustedes formal | Wo wohnen Sie? |

---

#### 23. Artículos definidos

| Caso | Masculino | Femenino | Neutro | Plural |
|---|---|---|---|---|
| Nominativo | der | die | das | die |
| Acusativo | den | die | das | die |
| Dativo | dem | der | dem | den + -n |

##### Ejemplos

- `Der Mann kommt.` — El hombre viene.
- `Ich sehe den Mann.` — Veo al hombre.
- `Ich helfe dem Mann.` — Ayudo al hombre.
- `Die Frau kommt.` — La mujer viene.
- `Ich sehe die Frau.` — Veo a la mujer.
- `Ich helfe der Frau.` — Ayudo a la mujer.

---

#### 24. Artículos indefinidos

| Caso | Masculino | Femenino | Neutro | Plural |
|---|---|---|---|---|
| Nominativo | ein | eine | ein | — |
| Acusativo | einen | eine | ein | — |
| Dativo | einem | einer | einem | — |

##### Ejemplos

- `Das ist ein Tisch.` — Eso es una mesa.
- `Ich kaufe einen Tisch.` — Compro una mesa.
- `Das ist eine Lampe.` — Eso es una lámpara.
- `Ich brauche ein Bett.` — Necesito una cama.

---

#### 25. Negación con kein

| Caso | Masculino | Femenino | Neutro | Plural |
|---|---|---|---|---|
| Nominativo | kein | keine | kein | keine |
| Acusativo | keinen | keine | kein | keine |
| Dativo | keinem | keiner | keinem | keinen + -n |

##### Ejemplos

- `Ich habe keinen Bruder.` — No tengo hermano.
- `Ich habe keine Schwester.` — No tengo hermana.
- `Ich habe kein Auto.` — No tengo auto.
- `Ich habe keine Kinder.` — No tengo hijos.

---

#### 26. Posesivos básicos

| Persona | Masculino/Neutro | Femenino/Plural | Español |
|---|---|---|---|
| ich | mein | meine | mi |
| du | dein | deine | tu |
| er/es | sein | seine | su |
| sie | ihr | ihre | su |
| wir | unser | unsere | nuestro |
| ihr | euer | eure | vuestro |
| sie/Sie | ihr/Ihr | ihre/Ihre | su / de usted |

##### Ejemplos

- `Das ist mein Bruder.`
- `Das ist meine Schwester.`
- `Meine Eltern wohnen in Chile.`
- `Wie ist Ihre Adresse?`

---

### PARTE F — Palabras funcionales A1

#### 27. Preguntas W

| Alemán | Español | Ejemplo |
|---|---|---|
| wer? | ¿quién? | Wer bist du? |
| was? | ¿qué? | Was ist das? |
| wo? | ¿dónde? | Wo wohnen Sie? |
| woher? | ¿de dónde? | Woher kommen Sie? |
| wohin? | ¿a dónde? | Wohin gehst du? |
| wann? | ¿cuándo? | Wann beginnt der Kurs? |
| wie? | ¿cómo? | Wie geht es Ihnen? |
| wie viel? | ¿cuánto? | Wie viel kostet das? |
| wie viele? | ¿cuántos? | Wie viele Kinder haben Sie? |
| warum? | ¿por qué? | Warum lernst du Deutsch? |
| welche/r/s? | ¿cuál? | Welche Sprache sprechen Sie? |

---

#### 28. Conectores y partículas

| Alemán | Español | Ejemplo |
|---|---|---|
| und | y | Kaffee und Kuchen. |
| oder | o | Tee oder Kaffee? |
| aber | pero | Ich komme, aber später. |
| denn | porque / pues | Ich lerne Deutsch, denn ich wohne in Deutschland. |
| auch | también | Ich spreche auch Englisch. |
| nicht | no | Ich verstehe nicht. |
| kein | ningún / no un | Ich habe kein Auto. |
| ja | sí | Ja, das stimmt. |
| nein | no | Nein, danke. |
| bitte | por favor / de nada | Einen Kaffee, bitte. |
| danke | gracias | Danke schön. |
| sehr | muy | Sehr gut. |
| nur | solo | Ich habe nur zehn Euro. |
| schon | ya | Ich bin schon da. |
| noch | todavía / aún | Noch einmal, bitte. |
| vielleicht | quizás | Vielleicht komme ich später. |
| zusammen | juntos | Wir lernen zusammen. |

---

### PARTE G — Frases completas A1 por situación

#### 29. Saludos y despedidas

| Alemán | Español |
|---|---|
| Hallo! | ¡Hola! |
| Guten Morgen! | ¡Buenos días! |
| Guten Tag! | ¡Buen día! |
| Guten Abend! | ¡Buenas tardes/noches! |
| Gute Nacht! | ¡Buenas noches! |
| Tschüss! | ¡Chao! |
| Auf Wiedersehen! | ¡Hasta luego! |
| Bis bald! | ¡Hasta pronto! |
| Bis morgen! | ¡Hasta mañana! |
| Schönes Wochenende! | ¡Buen fin de semana! |

---

#### 30. Cortesía básica

| Alemán | Español |
|---|---|
| Bitte. | Por favor. / De nada. |
| Danke. | Gracias. |
| Danke schön. | Muchas gracias. |
| Entschuldigung. | Disculpe. / Perdón. |
| Kein Problem. | No hay problema. |
| Es tut mir leid. | Lo siento. |
| Noch einmal, bitte. | Otra vez, por favor. |
| Langsam, bitte. | Lento, por favor. |
| Ich verstehe nicht. | No entiendo. |
| Können Sie das bitte wiederholen? | ¿Puede repetir eso, por favor? |

---

#### 31. Presentarse

| Alemán | Español |
|---|---|
| Ich heiße ... | Me llamo ... |
| Mein Name ist ... | Mi nombre es ... |
| Ich komme aus ... | Vengo de ... |
| Ich wohne in ... | Vivo en ... |
| Ich bin ... Jahre alt. | Tengo ... años. |
| Ich spreche Spanisch, Englisch und ein bisschen Deutsch. | Hablo español, inglés y un poco de alemán. |
| Ich bin Ingenieur. | Soy ingeniero. |
| Ich arbeite bei ... | Trabajo en ... |
| Ich lerne Deutsch. | Aprendo alemán. |
| Ich bin verheiratet / ledig. | Estoy casado/a / soltero/a. |

---

#### 32. En un curso de alemán

| Alemán | Español |
|---|---|
| Ich habe eine Frage. | Tengo una pregunta. |
| Was bedeutet das? | ¿Qué significa eso? |
| Wie schreibt man das? | ¿Cómo se escribe eso? |
| Wie sagt man ... auf Deutsch? | ¿Cómo se dice ... en alemán? |
| Können Sie bitte langsamer sprechen? | ¿Puede hablar más lento, por favor? |
| Ich verstehe die Aufgabe nicht. | No entiendo el ejercicio. |
| Ist das richtig? | ¿Eso está correcto? |
| Ich bin fertig. | Terminé. |
| Noch einmal, bitte. | Otra vez, por favor. |
| Ich brauche Hilfe. | Necesito ayuda. |

---

#### 33. En el supermercado

| Alemán | Español |
|---|---|
| Ich suche Milch. | Busco leche. |
| Wo finde ich Brot? | ¿Dónde encuentro pan? |
| Ich hätte gern ein Kilo Kartoffeln. | Quisiera un kilo de papas. |
| Wie viel kostet das? | ¿Cuánto cuesta eso? |
| Das ist zu teuer. | Eso es demasiado caro. |
| Ich nehme das. | Me llevo eso. |
| Zahlen Sie bar oder mit Karte? | ¿Paga en efectivo o con tarjeta? |
| Mit Karte, bitte. | Con tarjeta, por favor. |
| Brauchen Sie eine Tüte? | ¿Necesita una bolsa? |
| Nein, danke. | No, gracias. |

---

#### 34. En transporte y ciudad

| Alemán | Español |
|---|---|
| Wo ist der Bahnhof? | ¿Dónde está la estación? |
| Wie komme ich zum Bahnhof? | ¿Cómo llego a la estación? |
| Gehen Sie geradeaus. | Siga recto. |
| Dann links. | Luego a la izquierda. |
| Die Haltestelle ist rechts. | La parada está a la derecha. |
| Wann fährt der Bus? | ¿Cuándo sale el bus? |
| Der Zug kommt um acht Uhr. | El tren llega a las ocho. |
| Eine Fahrkarte nach Bonn, bitte. | Un billete a Bonn, por favor. |
| Ist das weit? | ¿Está lejos? |
| Ich fahre mit der Bahn. | Voy en tren/metro/tranvía. |

---

#### 35. En el médico

| Alemán | Español |
|---|---|
| Ich brauche einen Termin. | Necesito una cita. |
| Mir geht es nicht gut. | No me siento bien. |
| Ich bin krank. | Estoy enfermo/a. |
| Ich habe Fieber. | Tengo fiebre. |
| Mein Kopf tut weh. | Me duele la cabeza. |
| Mein Hals tut weh. | Me duele la garganta. |
| Ich habe Bauchschmerzen. | Tengo dolor de estómago. |
| Nehmen Sie Medikamente? | ¿Toma medicamentos? |
| Ich nehme keine Medikamente. | No tomo medicamentos. |
| Wo ist die nächste Apotheke? | ¿Dónde está la farmacia más cercana? |

---

### PARTE H — Números y cantidades

#### 36. Números 0–100

| Número | Alemán | Número | Alemán |
|---:|---|---:|---|
| 0 | null | 11 | elf |
| 1 | eins | 12 | zwölf |
| 2 | zwei | 13 | dreizehn |
| 3 | drei | 14 | vierzehn |
| 4 | vier | 15 | fünfzehn |
| 5 | fünf | 16 | sechzehn |
| 6 | sechs | 17 | siebzehn |
| 7 | sieben | 18 | achtzehn |
| 8 | acht | 19 | neunzehn |
| 9 | neun | 20 | zwanzig |
| 10 | zehn | 21 | einundzwanzig |
| 30 | dreißig | 40 | vierzig |
| 50 | fünfzig | 60 | sechzig |
| 70 | siebzig | 80 | achtzig |
| 90 | neunzig | 100 | hundert |

##### Cantidades útiles

| Alemán | Español | Ejemplo |
|---|---|---|
| ein Kilo | un kilo | Ein Kilo Äpfel, bitte. |
| ein Liter | un litro | Ein Liter Milch. |
| ein Gramm | un gramo | 500 Gramm Käse. |
| eine Flasche | una botella | Eine Flasche Wasser. |
| ein Glas | un vaso | Ein Glas Saft. |
| eine Tasse | una taza | Eine Tasse Kaffee. |
| ein Stück | un trozo / una unidad | Ein Stück Kuchen. |
| ein bisschen | un poco | Ich spreche ein bisschen Deutsch. |
| viel | mucho | Ich habe viel Arbeit. |
| wenig | poco | Ich habe wenig Zeit. |

---

### PARTE I — Mini-gramática de vocabulario A1

#### 37. Género: der, die, das

Aprende el sustantivo siempre como una unidad:

- `der Tisch`
- `die Lampe`
- `das Bett`

##### Patrones útiles, no perfectos

| Suele ser | Terminaciones / grupos | Ejemplos |
|---|---|---|
| der | días, meses, estaciones, profesiones masculinas | der Montag, der Januar, der Lehrer |
| die | palabras en `-ung`, `-heit`, `-keit`, `-in`, muchas en `-e` | die Wohnung, die Freiheit, die Lehrerin, die Straße |
| das | diminutivos `-chen`, infinitivos sustantivados, muchos objetos neutros | das Mädchen, das Essen, das Zimmer |

---

#### 38. Plural: patrones frecuentes

| Patrón | Ejemplos |
|---|---|
| `-e` | der Tag → die Tage |
| `-er` | das Kind → die Kinder |
| `-n / -en` | die Frau → die Frauen; die Straße → die Straßen |
| `-s` | das Auto → die Autos; das Foto → die Fotos |
| sin cambio | der Lehrer → die Lehrer; das Zimmer → die Zimmer |
| cambio de vocal | der Apfel → die Äpfel; der Vater → die Väter |

---

#### 39. Acusativo: el cambio clave

En A1 el cambio más importante es:

- `der` → `den`
- `ein` → `einen`
- `kein` → `keinen`
- `mein` → `meinen`

Ejemplos:

- `Der Tisch ist groß.`  
- `Ich kaufe den Tisch.`

- `Das ist ein Kaffee.`  
- `Ich nehme einen Kaffee.`

---

### PARTE J — Ejercicios para app HTML

#### 40. Tipos de ejercicios recomendados

| Tipo | Mecánica | Ejemplo |
|---|---|---|
| Flashcard | mostrar español → responder alemán | “la estación” → `der Bahnhof` |
| Artículo correcto | elegir der/die/das | `___ Bahnhof` |
| Plural correcto | escribir plural | `der Apfel → die ___` |
| Traducción rápida | alemán → español | `Ich brauche Hilfe.` |
| Cloze | completar hueco | `Ich komme ___ Chile.` |
| Ordenar frase | ordenar palabras | `Deutsch / ich / lerne` |
| Matching | unir verbo con frase | `fahren` → `mit dem Bus` |
| Situación | elegir frase adecuada | “pagar en tienda” → `Ich möchte bezahlen.` |

---

#### 41. Ejercicios: artículos

1. `___ Bahnhof` → **der Bahnhof**
2. `___ Wohnung` → **die Wohnung**
3. `___ Haus` → **das Haus**
4. `___ Straße` → **die Straße**
5. `___ Kind` → **das Kind**
6. `___ Apfel` → **der Apfel**
7. `___ Tomate` → **die Tomate**
8. `___ Wasser` → **das Wasser**
9. `___ Arzt` → **der Arzt**
10. `___ Apotheke` → **die Apotheke**

---

#### 42. Ejercicios: verbos

Completa la forma correcta:

1. Ich ___ aus Chile. → **komme**
2. Du ___ Deutsch. → **lernst**
3. Er ___ in Köln. → **wohnt**
4. Ich ___ einen Kaffee. → **nehme**
5. Sie ___ mit Karte. → **bezahlt**
6. Wir ___ im Büro. → **arbeiten**
7. Ich ___ eine Frage. → **habe**
8. Der Kurs ___ um neun an. → **fängt**
9. Ich ___ um sieben auf. → **stehe**
10. Kannst du mir ___? → **helfen**

---

#### 43. Ejercicios: preposiciones

1. Ich komme ___ Chile. → **aus**
2. Ich wohne ___ Köln. → **in**
3. Ich fahre ___ dem Bus. → **mit**
4. Ich gehe ___ Arzt. → **zum**
5. Der Kurs beginnt ___ Montag. → **am**
6. Ich habe Deutschkurs ___ neun Uhr. → **um**
7. Das ist ___ dich. → **für**
8. Kaffee ___ Zucker, bitte. → **ohne**
9. Ich gehe ___ Hause. → **nach**
10. Die Apotheke ist ___ der Bank. → **neben**

---

### PARTE K — APP_DATA: datasets iniciales

Estas estructuras pueden copiarse a JavaScript como arrays de objetos.

#### APP_DATA_NOUNS_SAMPLE

```json
[
  {
    "id": "n001",
    "level": "A1",
    "category": "identity",
    "word": "Name",
    "article": "der",
    "plural": "Namen",
    "translation_es": "nombre",
    "example_de": "Mein Name ist Jorge.",
    "example_es": "Mi nombre es Jorge.",
    "tags": ["persona", "formulario", "presentacion"]
  },
  {
    "id": "n002",
    "level": "A1",
    "category": "city_transport",
    "word": "Bahnhof",
    "article": "der",
    "plural": "Bahnhöfe",
    "translation_es": "estación de tren",
    "example_de": "Wo ist der Bahnhof?",
    "example_es": "¿Dónde está la estación?",
    "tags": ["ciudad", "transporte", "direcciones"]
  },
  {
    "id": "n003",
    "level": "A1",
    "category": "home",
    "word": "Wohnung",
    "article": "die",
    "plural": "Wohnungen",
    "translation_es": "departamento / piso",
    "example_de": "Meine Wohnung ist klein.",
    "example_es": "Mi departamento es pequeño.",
    "tags": ["vivienda", "casa"]
  },
  {
    "id": "n004",
    "level": "A1",
    "category": "food",
    "word": "Wasser",
    "article": "das",
    "plural": null,
    "translation_es": "agua",
    "example_de": "Ich trinke Wasser.",
    "example_es": "Tomo agua.",
    "tags": ["comida", "bebida"]
  }
]
```

#### APP_DATA_VERBS_SAMPLE

```json
[
  {
    "id": "v001",
    "level": "A1",
    "verb": "sein",
    "translation_es": "ser / estar",
    "forms": {
      "ich": "bin",
      "du": "bist",
      "er_sie_es": "ist",
      "wir": "sind",
      "ihr": "seid",
      "sie_Sie": "sind"
    },
    "example_de": "Ich bin müde.",
    "example_es": "Estoy cansado.",
    "tags": ["irregular", "basico"]
  },
  {
    "id": "v002",
    "level": "A1",
    "verb": "haben",
    "translation_es": "tener",
    "forms": {
      "ich": "habe",
      "du": "hast",
      "er_sie_es": "hat",
      "wir": "haben",
      "ihr": "habt",
      "sie_Sie": "haben"
    },
    "example_de": "Ich habe Zeit.",
    "example_es": "Tengo tiempo.",
    "tags": ["irregular", "basico"]
  },
  {
    "id": "v003",
    "level": "A1",
    "verb": "brauchen",
    "translation_es": "necesitar",
    "forms": {
      "ich": "brauche",
      "du": "brauchst",
      "er_sie_es": "braucht"
    },
    "example_de": "Ich brauche Hilfe.",
    "example_es": "Necesito ayuda.",
    "tags": ["compras", "salud", "curso"]
  }
]
```

#### APP_DATA_QUIZ_SAMPLE

```json
[
  {
    "id": "q001",
    "type": "article_choice",
    "prompt": "___ Bahnhof",
    "options": ["der", "die", "das"],
    "answer": "der",
    "explanation": "Bahnhof es masculino: der Bahnhof."
  },
  {
    "id": "q002",
    "type": "cloze",
    "prompt": "Ich komme ___ Chile.",
    "options": ["aus", "in", "mit", "für"],
    "answer": "aus",
    "explanation": "Para origen se usa: aus + país/ciudad."
  },
  {
    "id": "q003",
    "type": "verb_form",
    "prompt": "Ich ___ Deutsch. (lernen)",
    "answer": "lerne",
    "explanation": "Con ich, los verbos regulares suelen terminar en -e."
  }
]
```

---

### PARTE L — Prompt para generar una app HTML

Usa este prompt después, pegando este Markdown como fuente:

```text
Crea una aplicación HTML/CSS/JavaScript local y autocontenida para estudiar alemán A1 usando exclusivamente el contenido del Markdown proporcionado.

Requisitos:
1. Debe funcionar offline en un solo archivo index.html.
2. Debe incluir modos:
   - Flashcards
   - Quiz de artículos der/die/das
   - Quiz de plurales
   - Quiz de verbos
   - Quiz de preposiciones
   - Frases por situación
3. Debe permitir filtrar por categoría:
   - identidad
   - familia
   - vivienda
   - comida
   - compras
   - ciudad/transporte
   - trabajo/curso
   - salud
   - tiempo
4. Cada tarjeta debe mostrar:
   - palabra alemana
   - artículo si aplica
   - plural si aplica
   - traducción al español
   - ejemplo en alemán
   - traducción del ejemplo
5. Debe guardar progreso en localStorage:
   - palabras estudiadas
   - respuestas correctas
   - errores frecuentes
   - última fecha de práctica
6. Debe tener diseño simple, limpio y usable en celular.
7. Debe incluir un modo “repasar errores”.
8. Debe incluir botones:
   - mostrar respuesta
   - lo sabía
   - me equivoqué
   - siguiente
9. No uses librerías externas.
10. Entrega el código completo del archivo HTML.
```

---

### PARTE M — Checklist de dominio A1

Marca cuando puedas hacerlo sin mirar:

#### Sustantivos

- [ ] Sé al menos 100 sustantivos con artículo.
- [ ] Sé el plural de los sustantivos más frecuentes.
- [ ] Puedo distinguir persona, lugar, objeto, comida, transporte y salud.
- [ ] Puedo usar `kein/keine/keinen` con sustantivos.

#### Verbos

- [ ] Sé conjugar `sein`, `haben`, `kommen`, `wohnen`, `sprechen`.
- [ ] Sé usar modales: `können`, `müssen`, `möchten`.
- [ ] Sé usar verbos separables básicos: `aufstehen`, `einkaufen`, `anrufen`.
- [ ] Puedo hacer frases con verbo en segunda posición.

#### Situaciones

- [ ] Puedo presentarme.
- [ ] Puedo pedir algo en una tienda.
- [ ] Puedo preguntar por una dirección.
- [ ] Puedo decir qué me duele.
- [ ] Puedo pedir una cita.
- [ ] Puedo escribir un mensaje corto.

---

### PARTE N — Fuentes consultadas

Estas fuentes sirvieron como base para definir el alcance A1, las categorías y el formato didáctico:

1. Goethe-Institut — Goethe-Zertifikat A1: Start Deutsch 1 exam training and vocabulary list.  
   https://www.goethe.de/en/spr/prf/ueb/pa1.html

2. Goethe-Institut — German language levels, A1 descriptors.  
   https://www.goethe.de/ins/de/en/uun/dln/ger.html

3. Goethe-Institut — Deutsch Online A1 glossary, chapters 1–18.  
   https://lernen.goethe.de/deutschonline/A1/PDF/EN/A1_deutschonline_course_vocabulary_1-18.pdf

4. telc — Start Deutsch 1 / telc Deutsch A1 structure and CEFR level.  
   https://www.telc.net/en/language-examinations/certificate-exams/german/start-german1-telc-german-a1/

5. telc — Einfach gut! Deutsch für die Integration A1.1 word list.  
   https://www.telc.net/fileadmin/user_upload/Downloads_Verlag/Einfach_gut/Wortschatzlisten/Einfach_gut_A1.1_Wortschatzliste_Englisch.pdf

6. telc — Einfach gut! Deutsch für die Integration A1.2 word list.  
   https://www.telc.net/fileadmin/user_upload/Downloads_Verlag/Einfach_gut/Wortschatzlisten/Einfach_gut_A1.2_Wortschatzliste_Englisch.pdf

---

#### Nota final

Este documento no pretende copiar exhaustivamente ninguna lista oficial palabra por palabra. Es una **selección didáctica estructurada** para aprendizaje práctico A1 y para generar una app HTML personal. Para preparación formal de examen, conviene contrastar con la Wortliste oficial del Goethe-Institut y con los modelos de examen telc/Goethe.


---

## Parte 4 — Reglas de artículos der/die/das

> **Objetivo del documento:** darte una base clara, estructurada y reutilizable para construir una app HTML de estudio sobre artículos alemanes.  
> Está pensado para hispanohablantes que quieren aprender a usar **der / die / das**, **ein / eine**, **kein / keine**, posesivos y el **artículo cero**.

---

#### 0. Idea central

En alemán, casi siempre debes aprender cada sustantivo con su artículo:

- **der Mann** = el hombre → masculino
- **die Frau** = la mujer → femenino
- **das Kind** = el niño / la niña / el hijo → neutro

El artículo no solo indica género. También cambia según:

1. **Género**: masculino, femenino, neutro.
2. **Número**: singular o plural.
3. **Caso**: nominativo, acusativo, dativo, genitivo.
4. **Tipo de artículo**: definido, indefinido, negativo, posesivo, demostrativo, etc.

Una regla práctica:

> No memorices “Mann = hombre”. Memoriza **der Mann**.  
> No memorices “Frau = mujer”. Memoriza **die Frau**.  
> No memorices “Kind = niño”. Memoriza **das Kind**.

---

#### 1. Qué es un artículo en alemán

Un **artículo** acompaña a un sustantivo. No funciona solo. En alemán, los artículos principales son:

| Tipo | Alemán | Español aproximado |
|---|---|---|
| Artículo definido | der, die, das | el, la |
| Artículo indefinido | ein, eine, ein | un, una |
| Artículo negativo | kein, keine, kein | ningún / ninguna / no un |
| Artículo posesivo | mein, dein, sein, ihr... | mi, tu, su... |
| Artículo demostrativo | dieser, diese, dieses | este, esta |

Ejemplos:

| Alemán | Español |
|---|---|
| **der** Tisch | la mesa / el escritorio |
| **ein** Tisch | una mesa / un escritorio |
| **kein** Tisch | ninguna mesa / ningún escritorio |
| **mein** Tisch | mi mesa / mi escritorio |
| **dieser** Tisch | esta mesa / este escritorio |

---

#### 2. Los tres géneros: der, die, das

En alemán hay tres géneros gramaticales:

| Género | Artículo definido en nominativo | Ejemplo | Español |
|---|---:|---|---|
| Masculino | **der** | der Mann | el hombre |
| Femenino | **die** | die Frau | la mujer |
| Neutro | **das** | das Kind | el niño / la niña |
| Plural | **die** | die Kinder | los niños / las niñas |

Importante:

- El género gramatical **no siempre coincide** con el sexo o con la lógica del español.
- **das Mädchen** = la niña, pero gramaticalmente es neutro porque termina en **-chen**.
- **die Person** = la persona, gramaticalmente femenino, aunque puede referirse a un hombre.
- **der Tisch** = la mesa, masculino en alemán aunque “mesa” sea femenino en español.

---

#### 3. Masculino, femenino y neutro no equivalen al español

No traduzcas el género desde español. Muchos sustantivos cambian:

| Español | Alemán | Género alemán |
|---|---|---|
| la mesa | der Tisch | masculino |
| el sol | die Sonne | femenino |
| la luna | der Mond | masculino |
| el coche | das Auto | neutro |
| la niña | das Mädchen | neutro |
| el problema | das Problem | neutro |
| la flor | die Blume | femenino |
| el árbol | der Baum | masculino |

Regla práctica:

> El artículo alemán pertenece al sustantivo alemán, no a su traducción española.

---

#### 4. Los artículos definidos: der, die, das

El artículo definido se usa cuando hablamos de algo conocido, específico, mencionado antes o único en el contexto.

##### 4.1 Tabla completa del artículo definido

| Caso | Masculino | Femenino | Neutro | Plural |
|---|---:|---:|---:|---:|
| Nominativo | **der** | **die** | **das** | **die** |
| Acusativo | **den** | **die** | **das** | **die** |
| Dativo | **dem** | **der** | **dem** | **den** |
| Genitivo | **des** | **der** | **des** | **der** |

##### 4.2 Ejemplos por caso

###### Nominativo: sujeto

| Alemán | Español |
|---|---|
| **Der Mann** kommt. | El hombre viene. |
| **Die Frau** kommt. | La mujer viene. |
| **Das Kind** kommt. | El niño viene. |
| **Die Kinder** kommen. | Los niños vienen. |

###### Acusativo: objeto directo

| Alemán | Español |
|---|---|
| Ich sehe **den Mann**. | Veo al hombre. |
| Ich sehe **die Frau**. | Veo a la mujer. |
| Ich sehe **das Kind**. | Veo al niño. |
| Ich sehe **die Kinder**. | Veo a los niños. |

Observa:

> En acusativo solo cambia claramente el masculino: **der → den**.

###### Dativo: objeto indirecto o después de ciertas preposiciones

| Alemán | Español |
|---|---|
| Ich helfe **dem Mann**. | Ayudo al hombre. |
| Ich helfe **der Frau**. | Ayudo a la mujer. |
| Ich helfe **dem Kind**. | Ayudo al niño. |
| Ich helfe **den Kindern**. | Ayudo a los niños. |

Observa:

> En dativo plural, el artículo es **den** y el sustantivo suele añadir **-n** si no termina ya en **-n** o **-s**:  
> **die Kinder → mit den Kindern**  
> **die Autos → mit den Autos**

###### Genitivo: posesión o relación

| Alemán | Español |
|---|---|
| das Auto **des Mannes** | el auto del hombre |
| das Auto **der Frau** | el auto de la mujer |
| das Auto **des Kindes** | el auto del niño |
| das Auto **der Eltern** | el auto de los padres |

En A1/A2 el genitivo aparece menos que nominativo, acusativo y dativo, pero conviene reconocerlo.

---

#### 5. Los artículos indefinidos: ein, eine, ein

El artículo indefinido se usa para introducir algo nuevo, no específico o uno entre muchos.

| Alemán | Español |
|---|---|
| Ich habe **einen Hund**. | Tengo un perro. |
| Sie kauft **eine Tasche**. | Ella compra un bolso. |
| Wir suchen **ein Hotel**. | Buscamos un hotel. |

##### 5.1 Tabla completa del artículo indefinido

| Caso | Masculino | Femenino | Neutro | Plural |
|---|---:|---:|---:|---:|
| Nominativo | **ein** | **eine** | **ein** | — |
| Acusativo | **einen** | **eine** | **ein** | — |
| Dativo | **einem** | **einer** | **einem** | — |
| Genitivo | **eines** | **einer** | **eines** | — |

Importante:

> **ein/eine** no tiene plural.  
> Singular: **Ich habe einen Hund.**  
> Plural indefinido: **Ich habe Hunde.**  
> No: ~~Ich habe eine Hunde.~~

---

#### 6. El artículo negativo: kein, keine, kein

**kein** se usa para negar sustantivos, especialmente cuando en positivo usarías **ein/eine** o ningún artículo.

| Positivo | Negativo |
|---|---|
| Ich habe **einen Hund**. | Ich habe **keinen Hund**. |
| Das ist **eine Katze**. | Das ist **keine Katze**. |
| Wir haben **ein Auto**. | Wir haben **kein Auto**. |
| Ich habe **Kinder**. | Ich habe **keine Kinder**. |

##### 6.1 Tabla de kein

| Caso | Masculino | Femenino | Neutro | Plural |
|---|---:|---:|---:|---:|
| Nominativo | **kein** | **keine** | **kein** | **keine** |
| Acusativo | **keinen** | **keine** | **kein** | **keine** |
| Dativo | **keinem** | **keiner** | **keinem** | **keinen** |
| Genitivo | **keines** | **keiner** | **keines** | **keiner** |

Regla práctica:

> **kein** se declina como **ein**, pero sí tiene plural: **keine**.

---

#### 7. Artículos posesivos: mein, dein, sein, ihr...

Los posesivos funcionan como artículos porque acompañan al sustantivo y cambian por género, caso y número.

| Pronombre | Posesivo base | Español |
|---|---|---|
| ich | mein | mi |
| du | dein | tu |
| er | sein | su, de él |
| sie | ihr | su, de ella |
| es | sein | su, de ello |
| wir | unser | nuestro |
| ihr | euer | vuestro / su de ustedes informal |
| sie / Sie | ihr / Ihr | su / su formal |

##### 7.1 Ejemplo con mein

| Caso | Masculino | Femenino | Neutro | Plural |
|---|---:|---:|---:|---:|
| Nominativo | mein Vater | meine Mutter | mein Kind | meine Eltern |
| Acusativo | meinen Vater | meine Mutter | mein Kind | meine Eltern |
| Dativo | meinem Vater | meiner Mutter | meinem Kind | meinen Eltern |
| Genitivo | meines Vaters | meiner Mutter | meines Kindes | meiner Eltern |

Regla:

> **mein, dein, sein, ihr, unser, euer** se comportan como **ein**.  
> Masculino nominativo y neutro nominativo/acusativo no llevan terminación: **mein Vater**, **mein Kind**.

---

#### 8. Cómo decidir si usar der, die o das

No existe una regla perfecta para todos los sustantivos. Hay que combinar:

1. Significado.
2. Terminación.
3. Familia de palabras.
4. Palabra compuesta.
5. Memorización con artículo.

---

### PARTE A — REGLAS DE GÉNERO

---

#### 9. Reglas frecuentes para sustantivos masculinos: der

##### 9.1 Personas y animales masculinos

Suelen ser masculinos los sustantivos que designan personas o animales biológicamente masculinos.

| Alemán | Español |
|---|---|
| der Mann | el hombre |
| der Vater | el padre |
| der Sohn | el hijo |
| der Bruder | el hermano |
| der Onkel | el tío |
| der Lehrer | el profesor |
| der Arzt | el médico |
| der Hund | el perro |
| der Löwe | el león |

Pero cuidado:

| Alemán | Comentario |
|---|---|
| das Kind | neutro, aunque sea niño o niña |
| das Baby | neutro |
| die Person | femenino, aunque pueda referirse a un hombre |
| das Mädchen | neutro por la terminación -chen |

---

##### 9.2 Días, meses y estaciones

Suelen ser masculinos:

| Tipo | Ejemplos |
|---|---|
| Días | der Montag, der Dienstag, der Mittwoch |
| Meses | der Januar, der Februar, der März |
| Estaciones | der Frühling, der Sommer, der Herbst, der Winter |

Ejemplos:

- **Der Montag** ist stressig. = El lunes es estresante.
- **Der Sommer** ist warm. = El verano es cálido.
- **Im Winter** ist es kalt. = En invierno hace frío.  
  Nota: **im = in + dem**.

---

##### 9.3 Puntos cardinales y muchos fenómenos climáticos

| Alemán | Español |
|---|---|
| der Norden | el norte |
| der Süden | el sur |
| der Osten | el este |
| der Westen | el oeste |
| der Regen | la lluvia |
| der Schnee | la nieve |
| der Wind | el viento |
| der Nebel | la niebla |

Excepciones útiles:

| Alemán | Español |
|---|---|
| die Sonne | el sol |
| die Wolke | la nube |
| das Wetter | el tiempo / clima |
| das Gewitter | la tormenta eléctrica |

---

##### 9.4 Bebidas alcohólicas

Muchas bebidas alcohólicas son masculinas:

| Alemán | Español |
|---|---|
| der Wein | el vino |
| der Wodka | el vodka |
| der Rum | el ron |
| der Sekt | el espumante |
| der Schnaps | el aguardiente |

Excepción muy importante:

| Alemán | Español |
|---|---|
| das Bier | la cerveza |

---

##### 9.5 Terminaciones típicamente masculinas

Estas terminaciones suelen indicar masculino.

| Terminación | Ejemplos | Comentario |
|---|---|---|
| **-er** | der Lehrer, der Computer, der Drucker | Frecuente en profesiones, personas, máquinas. No siempre. |
| **-ling** | der Frühling, der Liebling | Bastante fiable. |
| **-ismus** | der Kapitalismus, der Sozialismus | Muy fiable. |
| **-ist** | der Tourist, der Polizist | Personas, profesiones o roles. |
| **-or** | der Motor, der Autor, der Doktor | Muy frecuente. |
| **-ant** | der Praktikant, der Diamant | Frecuente. |
| **-ent** | der Student, der Präsident | Frecuente. |
| **-eur** | der Ingenieur, der Friseur | Frecuente. |

Cuidado con **-er**:

| Palabra | Género | Español |
|---|---:|---|
| der Lehrer | masculino | profesor |
| der Computer | masculino | computador |
| die Butter | femenino | mantequilla |
| die Leiter | femenino | escalera |
| das Messer | neutro | cuchillo |
| das Zimmer | neutro | habitación |

---

#### 10. Reglas frecuentes para sustantivos femeninos: die

##### 10.1 Personas y animales femeninos

Suelen ser femeninos los sustantivos que designan personas o animales biológicamente femeninos.

| Alemán | Español |
|---|---|
| die Frau | la mujer |
| die Mutter | la madre |
| die Tochter | la hija |
| die Schwester | la hermana |
| die Tante | la tía |
| die Lehrerin | la profesora |
| die Ärztin | la médica |
| die Katze | la gata / el gato como especie cotidiana |
| die Löwin | la leona |

---

##### 10.2 La terminación -in para profesiones y personas femeninas

| Masculino | Femenino |
|---|---|
| der Lehrer | die Lehrerin |
| der Arzt | die Ärztin |
| der Student | die Studentin |
| der Freund | die Freundin |
| der Kollege | die Kollegin |

Plural frecuente:

| Singular | Plural |
|---|---|
| die Lehrerin | die Lehrerinnen |
| die Ärztin | die Ärztinnen |
| die Studentin | die Studentinnen |

---

##### 10.3 Sustantivos terminados en -e

Muchos sustantivos terminados en **-e** son femeninos.

| Alemán | Español |
|---|---|
| die Tasche | el bolso |
| die Lampe | la lámpara |
| die Straße | la calle |
| die Blume | la flor |
| die Schule | la escuela |
| die Sprache | el idioma |
| die Frage | la pregunta |
| die Reise | el viaje |

Pero hay excepciones importantes:

| Alemán | Español | Comentario |
|---|---|---|
| der Name | el nombre | masculino débil |
| der Junge | el chico | masculino débil |
| der Käse | el queso | masculino |
| das Ende | el final | neutro |
| das Auge | el ojo | neutro |
| das Interesse | el interés | neutro |

Regla práctica:

> Si una palabra termina en **-e**, sospecha **die**, pero verifica.

---

##### 10.4 Terminaciones muy fiables para femenino

Estas terminaciones suelen ser femeninas y son muy útiles para aprender rápido.

| Terminación | Ejemplos | Español |
|---|---|---|
| **-ung** | die Wohnung, die Meinung, die Prüfung | vivienda, opinión, examen |
| **-heit** | die Freiheit, die Gesundheit | libertad, salud |
| **-keit** | die Möglichkeit, die Schwierigkeit | posibilidad, dificultad |
| **-schaft** | die Freundschaft, die Gesellschaft | amistad, sociedad |
| **-ei** | die Bäckerei, die Polizei | panadería, policía |
| **-ion** | die Information, die Situation | información, situación |
| **-tät** | die Universität, die Aktivität | universidad, actividad |
| **-ik** | die Musik, die Politik | música, política |
| **-ur** | die Kultur, die Natur | cultura, naturaleza |
| **-enz** | die Konferenz, die Existenz | conferencia, existencia |
| **-anz** | die Distanz, die Toleranz | distancia, tolerancia |
| **-ie** | die Familie, die Industrie | familia, industria |

Estas terminaciones son de las más valiosas para una app de aprendizaje, porque permiten ejercicios automáticos con alta precisión.

---

##### 10.5 Números usados como sustantivos

Los números como nombres suelen ser femeninos:

| Alemán | Español |
|---|---|
| die Eins | el uno |
| die Zwei | el dos |
| die Drei | el tres |

Ejemplo:

- Ich habe **eine Eins** in Deutsch. = Saqué un uno en alemán.  
  Nota: el sistema de notas alemán usa 1 como mejor nota.

---

#### 11. Reglas frecuentes para sustantivos neutros: das

##### 11.1 Terminaciones -chen y -lein

Los diminutivos terminados en **-chen** y **-lein** son siempre neutros.

| Alemán | Español |
|---|---|
| das Mädchen | la niña |
| das Brötchen | el panecillo |
| das Häuschen | la casita |
| das Fräulein | la señorita |
| das Büchlein | el librito |

Regla importantísima:

> **-chen** y **-lein** ganan sobre el significado biológico.  
> Por eso **das Mädchen** es neutro.

---

##### 11.2 Verbos sustantivados

Los infinitivos usados como sustantivos son neutros.

| Verbo | Sustantivo | Español |
|---|---|---|
| essen | das Essen | la comida / el comer |
| trinken | das Trinken | el beber |
| lernen | das Lernen | el aprendizaje / aprender |
| lesen | das Lesen | la lectura / leer |
| schlafen | das Schlafen | el dormir |

Ejemplos:

- **Das Essen** ist gut. = La comida está buena.
- **Das Lernen** ist wichtig. = Aprender es importante.

---

##### 11.3 Colores, idiomas y letras como sustantivos

Cuando se usan como sustantivos, suelen ser neutros.

| Alemán | Español |
|---|---|
| das Deutsch | el alemán |
| das Spanisch | el español |
| das Englisch | el inglés |
| das Rot | el rojo |
| das Blau | el azul |
| das A | la A |
| das B | la B |

Ejemplos:

- **Das Deutsch** der Schweiz ist anders. = El alemán de Suiza es diferente.
- **Das Rot** gefällt mir. = Me gusta el rojo.

---

##### 11.4 Sustantivos de origen extranjero con ciertas terminaciones

Muchas palabras terminadas en estas formas son neutras:

| Terminación | Ejemplos | Comentario |
|---|---|---|
| **-ment** | das Dokument, das Instrument, das Medikament | Bastante frecuente. Excepción: der Moment. |
| **-um** | das Zentrum, das Museum, das Studium | Muy frecuente. |
| **-ma** | das Thema, das Klima, das Drama | Frecuente. |
| **-o** | das Auto, das Radio, das Kino, das Foto | Frecuente en palabras comunes. |

Excepciones:

| Alemán | Género |
|---|---:|
| der Moment | masculino |
| der Euro | masculino |
| die Avocado | femenino |
| die Disco | femenino |

---

##### 11.5 Jóvenes, crías y seres no adultos

Algunas palabras para seres jóvenes son neutras:

| Alemán | Español |
|---|---|
| das Kind | niño / niña |
| das Baby | bebé |
| das Kalb | ternero |
| das Lamm | cordero |
| das Fohlen | potro |

No es una regla universal, pero ayuda.

---

##### 11.6 Metales y materiales

Muchos metales son neutros:

| Alemán | Español |
|---|---|
| das Gold | oro |
| das Silber | plata |
| das Eisen | hierro |
| das Kupfer | cobre |
| das Aluminium | aluminio |

Cuidado: no todos los elementos químicos son neutros en alemán.

---

#### 12. Palabras compuestas: el género lo decide la última palabra

Esta es una de las reglas más útiles y fiables del alemán.

> En una palabra compuesta, el género lo determina la última parte.

| Palabra compuesta | Última palabra | Género | Español |
|---|---|---:|---|
| der Apfelsaft | der Saft | der | jugo de manzana |
| die Haustür | die Tür | die | puerta de casa |
| das Schlafzimmer | das Zimmer | das | dormitorio |
| die Kaffeetasse | die Tasse | die | taza de café |
| der Bahnhof | der Hof | der | estación |
| das Wörterbuch | das Buch | das | diccionario |
| die Sonnenbrille | die Brille | die | gafas de sol |
| der Arbeitstag | der Tag | der | día laboral |

Ejemplos:

- **die Tür** → **die Haustür**
- **das Zimmer** → **das Badezimmer**
- **der Tag** → **der Geburtstag**

Regla para app:

```json
{
  "rule_id": "compound_gender_final_head",
  "rule": "En palabras compuestas, el género lo determina el último sustantivo.",
  "examples": [
    {"word": "Haustür", "head": "Tür", "article": "die"},
    {"word": "Schlafzimmer", "head": "Zimmer", "article": "das"},
    {"word": "Apfelsaft", "head": "Saft", "article": "der"}
  ]
}
```

---

#### 13. Palabras con doble género o cambio de significado

Algunas palabras pueden tener más de un artículo. A veces cambia el significado; a veces es variación regional o de uso.

| Artículo | Palabra | Significado |
|---|---|---|
| der See | lago | agua interior |
| die See | mar | uso más literario o marítimo |
| das Meer | mar | palabra común para mar |
| der Band | tomo / volumen de libro |
| die Band | banda musical |
| das Band | cinta / lazo |
| der Leiter | director / jefe |
| die Leiter | escalera |
| der Kiefer | mandíbula |
| die Kiefer | pino |
| der Pony | flequillo |
| das Pony | poni |
| der Laster | vicio / camión coloquial |
| das Laster | vicio / camión según uso |
| der Gehalt | contenido |
| das Gehalt | sueldo |

También existen palabras con variación aceptada:

| Variantes | Comentario |
|---|---|
| der/das Joghurt | Regional. En Alemania suele ser más común **der Joghurt**; en Austria puede aparecer **das Joghurt**. |
| der/das Laptop | Ambas se oyen; diccionarios pueden aceptar variantes. |
| der/das Virus | En lenguaje común se oye **der Virus**; en lenguaje técnico puede aparecer **das Virus**. |

Regla:

> Si una palabra tiene dos artículos, no asumas que da igual. Puede cambiar el significado o sonar regional.

---

### PARTE B — CASOS Y CAMBIOS DE ARTÍCULO

---

#### 14. El caso decide la forma del artículo

El género te dice la familia: masculino, femenino o neutro.  
El caso te dice la función en la frase.

| Caso | Pregunta útil | Función típica |
|---|---|---|
| Nominativo | ¿Quién? ¿Qué? | Sujeto |
| Acusativo | ¿A quién? ¿Qué? | Objeto directo |
| Dativo | ¿A quién? ¿Para quién? ¿Dónde? | Objeto indirecto / lugar |
| Genitivo | ¿De quién? | Posesión / relación |

---

#### 15. Nominativo

Se usa para el sujeto de la oración.

| Alemán | Español |
|---|---|
| **Der Hund** schläft. | El perro duerme. |
| **Die Katze** spielt. | La gata juega. |
| **Das Kind** lacht. | El niño se ríe. |

También se usa después de verbos como **sein**, **werden**, **bleiben**:

| Alemán | Español |
|---|---|
| Er ist **ein Lehrer**. | Él es profesor. |
| Sie wird **eine Ärztin**. | Ella será médica. |
| Das bleibt **ein Problem**. | Eso sigue siendo un problema. |

Nota: con profesiones, muchas veces se omite el artículo:

- Er ist Lehrer. = Él es profesor.
- Sie ist Ärztin. = Ella es médica.

---

#### 16. Acusativo

Se usa para el objeto directo: aquello que recibe directamente la acción.

| Alemán | Español |
|---|---|
| Ich kaufe **den Tisch**. | Compro la mesa. |
| Ich lese **die Zeitung**. | Leo el periódico. |
| Ich sehe **das Haus**. | Veo la casa. |

##### 16.1 Cambio clave en acusativo

| Nominativo | Acusativo |
|---|---|
| der Mann | den Mann |
| ein Mann | einen Mann |
| kein Mann | keinen Mann |
| mein Mann | meinen Mann |

Pero:

| Nominativo | Acusativo |
|---|---|
| die Frau | die Frau |
| das Kind | das Kind |
| die Kinder | die Kinder |

Regla práctica:

> En acusativo, el cambio más importante para A1/A2 es:  
> **der/ein/kein/mein → den/einen/keinen/meinen**.

---

#### 17. Dativo

El dativo se usa mucho después de ciertos verbos y preposiciones.

##### 17.1 Verbos comunes con dativo

| Verbo | Ejemplo | Español |
|---|---|---|
| helfen | Ich helfe **dem Mann**. | Ayudo al hombre. |
| danken | Ich danke **der Frau**. | Agradezco a la mujer. |
| gefallen | Das gefällt **dem Kind**. | Eso le gusta al niño. |
| gehören | Das gehört **dem Lehrer**. | Eso pertenece al profesor. |
| antworten | Ich antworte **dem Chef**. | Respondo al jefe. |

##### 17.2 Preposiciones siempre con dativo

Memoriza este grupo:

> **aus, außer, bei, mit, nach, seit, von, zu**

| Preposición | Ejemplo |
|---|---|
| aus | Ich komme **aus der Schweiz**. |
| bei | Ich bin **bei dem Arzt** / **beim Arzt**. |
| mit | Ich fahre **mit dem Bus**. |
| nach | Ich fahre **nach Deutschland**. |
| seit | Ich lerne **seit einem Jahr** Deutsch. |
| von | Das ist **von meinem Bruder**. |
| zu | Ich gehe **zu der Schule** / **zur Schule**. |

Contracciones comunes:

| Forma larga | Contracción |
|---|---|
| bei dem | beim |
| von dem | vom |
| zu dem | zum |
| zu der | zur |

---

#### 18. Acusativo con preposiciones

Estas preposiciones suelen exigir acusativo:

> **durch, für, gegen, ohne, um**

| Preposición | Ejemplo | Español |
|---|---|---|
| durch | Ich gehe **durch den Park**. | Paso por el parque. |
| für | Das Geschenk ist **für die Frau**. | El regalo es para la mujer. |
| gegen | Ich bin **gegen den Plan**. | Estoy contra el plan. |
| ohne | Ich komme **ohne meinen Bruder**. | Vengo sin mi hermano. |
| um | Wir sitzen **um den Tisch**. | Estamos sentados alrededor de la mesa. |

---

#### 19. Wechselpräpositionen: acusativo o dativo según movimiento

Estas preposiciones pueden ir con acusativo o dativo:

> **an, auf, hinter, in, neben, über, unter, vor, zwischen**

Regla:

| Situación | Caso | Pregunta |
|---|---|---|
| Movimiento hacia un destino | Acusativo | ¿A dónde? |
| Ubicación fija | Dativo | ¿Dónde? |

##### 19.1 Ejemplo con in

| Alemán | Caso | Español |
|---|---|---|
| Ich gehe **in den Park**. | Acusativo | Voy al parque. |
| Ich bin **in dem Park** / **im Park**. | Dativo | Estoy en el parque. |

##### 19.2 Ejemplo con auf

| Alemán | Caso | Español |
|---|---|---|
| Ich lege das Buch **auf den Tisch**. | Acusativo | Pongo el libro sobre la mesa. |
| Das Buch liegt **auf dem Tisch**. | Dativo | El libro está sobre la mesa. |

---

#### 20. Genitivo

El genitivo expresa posesión o relación, especialmente en lenguaje escrito.

| Alemán | Español |
|---|---|
| das Auto **des Mannes** | el auto del hombre |
| die Tasche **der Frau** | el bolso de la mujer |
| das Zimmer **des Kindes** | la habitación del niño |
| die Namen **der Kinder** | los nombres de los niños |

En alemán cotidiano, muchas veces se usa **von + dativo**:

| Genitivo formal | Alternativa cotidiana |
|---|---|
| das Auto des Mannes | das Auto von dem Mann |
| die Tasche der Frau | die Tasche von der Frau |

Pero para leer textos y aprobar exámenes, conviene reconocer el genitivo.

---

### PARTE C — CUÁNDO USAR ARTÍCULO DEFINIDO, INDEFINIDO O CERO

---

#### 21. Artículo definido: cuándo usar der/die/das

Usa artículo definido cuando:

##### 21.1 Algo ya fue mencionado

| Alemán | Español |
|---|---|
| Ich sehe **einen Hund**. **Der Hund** ist klein. | Veo un perro. El perro es pequeño. |

Primera mención: **einen Hund**.  
Segunda mención: **der Hund**.

---

##### 21.2 Algo es conocido por hablante y oyente

| Alemán | Español |
|---|---|
| Wo ist **der Schlüssel**? | ¿Dónde está la llave? |
| Ich gehe in **die Küche**. | Voy a la cocina. |
| Mach bitte **das Fenster** zu. | Cierra la ventana, por favor. |

---

##### 21.3 Algo es único o se entiende como único

| Alemán | Español |
|---|---|
| **die Sonne** | el sol |
| **der Mond** | la luna |
| **die Erde** | la Tierra |
| **der Bahnhof** | la estación, si ya se sabe cuál |

---

##### 21.4 Para hablar de categorías completas

| Alemán | Español |
|---|---|
| **Der Hund** ist ein treues Tier. | El perro es un animal fiel. |
| **Die Katze** schläft viel. | El gato/la gata duerme mucho. |
| **Das Auto** ist praktisch. | El coche es práctico. |

---

#### 22. Artículo indefinido: cuándo usar ein/eine

Usa artículo indefinido cuando:

##### 22.1 Introduces algo nuevo

| Alemán | Español |
|---|---|
| Ich habe **einen Bruder**. | Tengo un hermano. |
| Sie kauft **eine Tasche**. | Ella compra un bolso. |
| Wir suchen **ein Hotel**. | Buscamos un hotel. |

---

##### 22.2 Hablas de uno cualquiera entre varios

| Alemán | Español |
|---|---|
| Ich brauche **einen Stift**. | Necesito un lápiz/bolígrafo. |
| Kannst du mir **eine Frage** beantworten? | ¿Puedes responderme una pregunta? |
| Wir nehmen **ein Taxi**. | Tomamos un taxi. |

---

##### 22.3 Con profesiones si hay adjetivo o clasificación

Normalmente:

| Alemán | Español |
|---|---|
| Er ist Lehrer. | Él es profesor. |
| Sie ist Ärztin. | Ella es médica. |

Pero con adjetivo:

| Alemán | Español |
|---|---|
| Er ist **ein guter Lehrer**. | Él es un buen profesor. |
| Sie ist **eine erfahrene Ärztin**. | Ella es una médica experimentada. |

---

#### 23. Artículo cero: cuándo no usar artículo

El **artículo cero** significa que el sustantivo aparece sin artículo.

##### 23.1 Plural indefinido

| Singular | Plural |
|---|---|
| Ich habe **einen Hund**. | Ich habe **Hunde**. |
| Sie kauft **eine Blume**. | Sie kauft **Blumen**. |
| Wir brauchen **ein Formular**. | Wir brauchen **Formulare**. |

No existe plural de **ein/eine**.

---

##### 23.2 Profesiones, roles y nacionalidades después de sein/werden/als

| Alemán | Español |
|---|---|
| Ich bin Ingenieur. | Soy ingeniero. |
| Sie ist Lehrerin. | Ella es profesora. |
| Er wird Arzt. | Él será médico. |
| Ich arbeite als Berater. | Trabajo como consultor. |
| Sie ist Chilenin. | Ella es chilena. |

Pero:

| Alemán | Español |
|---|---|
| Er ist **ein guter Ingenieur**. | Él es un buen ingeniero. |
| Sie ist **eine sehr bekannte Ärztin**. | Ella es una médica muy conocida. |

---

##### 23.3 Idiomas

| Alemán | Español |
|---|---|
| Ich spreche Deutsch. | Hablo alemán. |
| Sie lernt Spanisch. | Ella aprende español. |
| Wir sprechen Englisch. | Hablamos inglés. |

Pero como sustantivo conceptual:

| Alemán | Español |
|---|---|
| **Das Deutsche** ist schwierig. | El alemán es difícil. |
| **Das Spanische** gefällt mir. | Me gusta el español. |

---

##### 23.4 Ciudades, países y continentes sin artículo

La mayoría de nombres de ciudades, países y continentes no llevan artículo.

| Alemán | Español |
|---|---|
| Ich wohne in Köln. | Vivo en Colonia. |
| Ich komme aus Chile. | Vengo de Chile. |
| Deutschland liegt in Europa. | Alemania está en Europa. |

Pero algunos países sí llevan artículo:

| Alemán | Género | Ejemplo |
|---|---:|---|
| die Schweiz | femenino | Ich wohne in der Schweiz. |
| die Türkei | femenino | Ich fahre in die Türkei. |
| die Ukraine | femenino | Sie kommt aus der Ukraine. |
| der Iran | masculino | Er kommt aus dem Iran. |
| der Irak | masculino | Sie reist in den Irak. |
| die USA | plural | Ich fliege in die USA. |
| die Niederlande | plural | Ich fahre in die Niederlande. |

---

##### 23.5 Materiales, sustancias y conceptos generales

| Alemán | Español |
|---|---|
| Ich trinke Wasser. | Bebo agua. |
| Ich brauche Geld. | Necesito dinero. |
| Sie isst Brot. | Ella come pan. |
| Wir kaufen Milch. | Compramos leche. |
| Er hat Angst. | Él tiene miedo. |
| Ich habe Zeit. | Tengo tiempo. |

Pero si se habla de algo específico:

| General | Específico |
|---|---|
| Ich trinke Wasser. | Das Wasser ist kalt. |
| Ich brauche Geld. | Das Geld liegt auf dem Tisch. |
| Er hat Angst. | Die Angst ist groß. |

---

##### 23.6 Expresiones fijas

| Alemán | Español |
|---|---|
| Auto fahren | conducir |
| Fahrrad fahren | andar en bicicleta |
| Musik hören | escuchar música |
| Zeitung lesen | leer el periódico |
| Tennis spielen | jugar tenis |
| Fußball spielen | jugar fútbol |
| zu Hause | en casa |
| nach Hause | a casa |

---

### PARTE D — CONTRACCIONES CON ARTÍCULOS

---

#### 24. Contracciones frecuentes

En alemán, algunas preposiciones se combinan con el artículo.

| Forma larga | Contracción | Caso |
|---|---|---|
| in dem | im | dativo |
| in das | ins | acusativo |
| an dem | am | dativo |
| an das | ans | acusativo |
| bei dem | beim | dativo |
| von dem | vom | dativo |
| zu dem | zum | dativo |
| zu der | zur | dativo |
| auf das | aufs | acusativo |
| um das | ums | acusativo |
| für das | fürs | acusativo |

Ejemplos:

| Alemán | Español |
|---|---|
| Ich bin **im Büro**. | Estoy en la oficina. |
| Ich gehe **ins Büro**. | Voy a la oficina. |
| Wir treffen uns **am Montag**. | Nos vemos el lunes. |
| Ich gehe **zum Arzt**. | Voy al médico. |
| Sie kommt **vom Bahnhof**. | Ella viene de la estación. |

---

#### 25. Contracción vs forma larga

A veces ambas son posibles, pero no siempre significan exactamente lo mismo.

| Contracción | Suele sonar como... |
|---|---|
| im Park | en el parque, de forma normal |
| in dem Park | en ese parque específico, con énfasis |
| zum Arzt | al médico |
| zu dem Arzt | a ese médico específico |

Regla práctica:

> En alemán cotidiano, usa las contracciones comunes: **im, ins, am, ans, beim, vom, zum, zur**.

---

### PARTE E — ERRORES TÍPICOS DE HISPANOHABLANTES

---

#### 26. Error 1: traducir el género desde español

Incorrecto:

- ~~die Tisch~~ porque “mesa” es femenina en español.

Correcto:

- **der Tisch**

---

#### 27. Error 2: olvidar que acusativo cambia el masculino

Incorrecto:

- ~~Ich sehe der Mann.~~

Correcto:

- **Ich sehe den Mann.**

---

#### 28. Error 3: usar ein/eine en plural

Incorrecto:

- ~~Ich habe eine Hunde.~~

Correcto:

- **Ich habe Hunde.**
- **Ich habe keine Hunde.**

---

#### 29. Error 4: usar artículo con profesiones simples

No suena natural:

- ~~Ich bin ein Ingenieur.~~  
  Puede ser gramatical en algunos contextos, pero normalmente suena traducido del español/inglés.

Más natural:

- **Ich bin Ingenieur.**

Con adjetivo sí:

- **Ich bin ein guter Ingenieur.**

---

#### 30. Error 5: olvidar el dativo después de mit, bei, von, zu

Incorrecto:

- ~~mit der Bus~~
- ~~mit den Auto~~

Correcto:

- **mit dem Bus**
- **mit dem Auto**

---

#### 31. Error 6: confundir dirección y ubicación

| Español | Alemán correcto | Caso |
|---|---|---|
| Voy al parque. | Ich gehe **in den Park**. | acusativo |
| Estoy en el parque. | Ich bin **im Park**. | dativo |

---

#### 32. Error 7: no aprender el plural junto al artículo

Aprende:

| Singular | Plural |
|---|---|
| der Tisch | die Tische |
| die Lampe | die Lampen |
| das Kind | die Kinder |
| der Mann | die Männer |
| die Frau | die Frauen |
| das Auto | die Autos |

Formato recomendado de memorización:

> **der Tisch, -e**  
> **die Lampe, -n**  
> **das Kind, -er**

---

### PARTE F — TABLAS DE REFERENCIA RÁPIDA

---

#### 33. Tabla maestra: definido, indefinido, negativo

##### 33.1 Masculino

| Caso | Definido | Indefinido | Negativo | Ejemplo |
|---|---:|---:|---:|---|
| Nom | der | ein | kein | der/ein/kein Mann |
| Acc | den | einen | keinen | den/einen/keinen Mann |
| Dat | dem | einem | keinem | dem/einem/keinem Mann |
| Gen | des | eines | keines | des/eines/keines Mannes |

##### 33.2 Femenino

| Caso | Definido | Indefinido | Negativo | Ejemplo |
|---|---:|---:|---:|---|
| Nom | die | eine | keine | die/eine/keine Frau |
| Acc | die | eine | keine | die/eine/keine Frau |
| Dat | der | einer | keiner | der/einer/keiner Frau |
| Gen | der | einer | keiner | der/einer/keiner Frau |

##### 33.3 Neutro

| Caso | Definido | Indefinido | Negativo | Ejemplo |
|---|---:|---:|---:|---|
| Nom | das | ein | kein | das/ein/kein Kind |
| Acc | das | ein | kein | das/ein/kein Kind |
| Dat | dem | einem | keinem | dem/einem/keinem Kind |
| Gen | des | eines | keines | des/eines/keines Kindes |

##### 33.4 Plural

| Caso | Definido | Indefinido | Negativo | Ejemplo |
|---|---:|---:|---:|---|
| Nom | die | — | keine | die/keine Kinder |
| Acc | die | — | keine | die/keine Kinder |
| Dat | den | — | keinen | den/keinen Kindern |
| Gen | der | — | keiner | der/keiner Kinder |

---

#### 34. Mini algoritmo para elegir artículo

```text
1. ¿El sustantivo es plural?
   Sí → usa die en nominativo/acusativo, den en dativo, der en genitivo.
   No → sigue.

2. ¿Conoces el género?
   Sí → der/die/das según género.
   No → mira terminación, significado o diccionario.

3. ¿Es algo específico/conocido?
   Sí → artículo definido: der/die/das...
   No → artículo indefinido: ein/eine/ein...
   Negativo → kein/keine/kein...

4. ¿Qué caso exige la frase?
   Sujeto → nominativo.
   Objeto directo → acusativo.
   Dativo por verbo/preposición → dativo.
   Posesión formal → genitivo.

5. ¿Hay una razón para no usar artículo?
   Profesión simple, idioma, país sin artículo, plural indefinido, material general, expresión fija → artículo cero.
```

---

#### 35. Árbol de decisión simplificado para app

```json
{
  "decision_tree": {
    "question_1": "¿El sustantivo aparece en plural?",
    "if_yes": {
      "question": "¿Es definido, negativo o indefinido?",
      "defined": "die/den/der según caso",
      "negative": "keine/keinen/keiner según caso",
      "indefinite": "sin artículo"
    },
    "if_no": {
      "question_2": "¿Cuál es el género del sustantivo?",
      "masculine": "der/ein/kein según caso",
      "feminine": "die/eine/keine según caso",
      "neuter": "das/ein/kein según caso"
    },
    "question_3": "¿La frase exige nominativo, acusativo, dativo o genitivo?",
    "question_4": "¿Hay una regla de artículo cero?"
  }
}
```

---

### PARTE G — BANCO DE EJERCICIOS

---

#### 36. Ejercicio 1: elige der, die o das

Completa con **der**, **die** o **das**.

| Nº | Frase | Respuesta |
|---:|---|---|
| 1 | ___ Mann | der |
| 2 | ___ Frau | die |
| 3 | ___ Kind | das |
| 4 | ___ Tisch | der |
| 5 | ___ Lampe | die |
| 6 | ___ Auto | das |
| 7 | ___ Mädchen | das |
| 8 | ___ Wohnung | die |
| 9 | ___ Problem | das |
| 10 | ___ Lehrer | der |
| 11 | ___ Lehrerin | die |
| 12 | ___ Universität | die |
| 13 | ___ Zentrum | das |
| 14 | ___ Frühling | der |
| 15 | ___ Information | die |
| 16 | ___ Brötchen | das |
| 17 | ___ Computer | der |
| 18 | ___ Musik | die |
| 19 | ___ Museum | das |
| 20 | ___ Regen | der |

---

#### 37. Ejercicio 2: acusativo masculino

Transforma al acusativo.

| Nº | Nominativo | Frase | Respuesta |
|---:|---|---|---|
| 1 | der Mann | Ich sehe ___. | den Mann |
| 2 | ein Hund | Ich habe ___. | einen Hund |
| 3 | kein Bruder | Ich habe ___. | keinen Bruder |
| 4 | mein Vater | Ich besuche ___. | meinen Vater |
| 5 | dieser Tisch | Ich kaufe ___. | diesen Tisch |

---

#### 38. Ejercicio 3: dativo con mit

Completa con el artículo correcto.

| Nº | Frase | Respuesta |
|---:|---|---|
| 1 | Ich fahre mit ___ Bus. | dem |
| 2 | Ich spreche mit ___ Frau. | der |
| 3 | Ich spiele mit ___ Kind. | dem |
| 4 | Ich reise mit ___ Freunden. | den |
| 5 | Ich komme mit ___ Auto. | dem |

---

#### 39. Ejercicio 4: definido o indefinido

Elige la opción más natural.

| Nº | Contexto | Respuesta |
|---:|---|---|
| 1 | Primera vez que mencionas un perro: Ich sehe ___ Hund. | einen |
| 2 | Ya mencionaste el perro: ___ Hund ist klein. | der |
| 3 | Buscas un hotel cualquiera: Wir suchen ___ Hotel. | ein |
| 4 | Hablas de tu hotel específico: ___ Hotel ist teuer. | das |
| 5 | No tienes perro: Ich habe ___ Hund. | keinen |

---

#### 40. Ejercicio 5: artículo cero

Decide si falta artículo o no.

| Nº | Frase | Respuesta | Explicación |
|---:|---|---|---|
| 1 | Ich bin ___ Ingenieur. | — | Profesión simple. |
| 2 | Sie spricht ___ Deutsch. | — | Idioma. |
| 3 | Ich trinke ___ Wasser. | — | Sustancia general. |
| 4 | Ich habe ___ Freunde. | — | Plural indefinido. |
| 5 | Ich bin ___ guter Ingenieur. | ein | Profesión con adjetivo. |
| 6 | Das ist ___ Wasser aus Chile. | das | Agua específica. |
| 7 | Sie kommt aus ___ Schweiz. | der | País con artículo femenino. |
| 8 | Ich komme aus ___ Deutschland. | — | País normalmente sin artículo. |

---

#### 41. Ejercicio 6: Wechselpräpositionen

Elige acusativo o dativo.

| Nº | Frase | Respuesta | Caso |
|---:|---|---|---|
| 1 | Ich gehe in ___ Park. | den | acusativo |
| 2 | Ich bin in ___ Park. | dem / im | dativo |
| 3 | Ich lege das Buch auf ___ Tisch. | den | acusativo |
| 4 | Das Buch liegt auf ___ Tisch. | dem | dativo |
| 5 | Sie geht an ___ Fenster. | das / ans | acusativo |
| 6 | Sie steht an ___ Fenster. | dem / am | dativo |

---

#### 42. Ejercicio 7: palabras compuestas

Identifica el artículo por la última palabra.

| Palabra | Última palabra | Respuesta |
|---|---|---|
| Haustür | die Tür | die Haustür |
| Schlafzimmer | das Zimmer | das Schlafzimmer |
| Arbeitstag | der Tag | der Arbeitstag |
| Kaffeetasse | die Tasse | die Kaffeetasse |
| Wörterbuch | das Buch | das Wörterbuch |
| Apfelsaft | der Saft | der Apfelsaft |
| Sonnenbrille | die Brille | die Sonnenbrille |
| Badezimmer | das Zimmer | das Badezimmer |

---

### PARTE H — DATASETS PARA APP HTML

---

#### 43. Dataset de reglas por género

```json
[
  {
    "id": "masc_male_people",
    "gender": "masculine",
    "article": "der",
    "rule_es": "Personas o animales masculinos suelen ser masculinos.",
    "examples": ["der Mann", "der Vater", "der Bruder", "der Lehrer"],
    "reliability": "alta",
    "exceptions": ["das Kind", "das Baby", "die Person"]
  },
  {
    "id": "fem_ung",
    "gender": "feminine",
    "article": "die",
    "rule_es": "Los sustantivos terminados en -ung son femeninos.",
    "examples": ["die Wohnung", "die Meinung", "die Prüfung"],
    "reliability": "muy alta",
    "exceptions": []
  },
  {
    "id": "fem_heit_keit",
    "gender": "feminine",
    "article": "die",
    "rule_es": "Los sustantivos terminados en -heit y -keit son femeninos.",
    "examples": ["die Freiheit", "die Gesundheit", "die Möglichkeit"],
    "reliability": "muy alta",
    "exceptions": []
  },
  {
    "id": "neut_chen_lein",
    "gender": "neuter",
    "article": "das",
    "rule_es": "Los diminutivos terminados en -chen y -lein son neutros.",
    "examples": ["das Mädchen", "das Brötchen", "das Büchlein"],
    "reliability": "muy alta",
    "exceptions": []
  },
  {
    "id": "compound_final_noun",
    "gender": "depends_on_final_component",
    "article": "variable",
    "rule_es": "En palabras compuestas, el género lo decide la última palabra.",
    "examples": ["die Haustür", "das Schlafzimmer", "der Apfelsaft"],
    "reliability": "muy alta",
    "exceptions": []
  }
]
```

---

#### 44. Dataset de declinación

```json
{
  "definite_article": {
    "nominative": {"masculine": "der", "feminine": "die", "neuter": "das", "plural": "die"},
    "accusative": {"masculine": "den", "feminine": "die", "neuter": "das", "plural": "die"},
    "dative": {"masculine": "dem", "feminine": "der", "neuter": "dem", "plural": "den"},
    "genitive": {"masculine": "des", "feminine": "der", "neuter": "des", "plural": "der"}
  },
  "indefinite_article": {
    "nominative": {"masculine": "ein", "feminine": "eine", "neuter": "ein", "plural": null},
    "accusative": {"masculine": "einen", "feminine": "eine", "neuter": "ein", "plural": null},
    "dative": {"masculine": "einem", "feminine": "einer", "neuter": "einem", "plural": null},
    "genitive": {"masculine": "eines", "feminine": "einer", "neuter": "eines", "plural": null}
  },
  "negative_article": {
    "nominative": {"masculine": "kein", "feminine": "keine", "neuter": "kein", "plural": "keine"},
    "accusative": {"masculine": "keinen", "feminine": "keine", "neuter": "kein", "plural": "keine"},
    "dative": {"masculine": "keinem", "feminine": "keiner", "neuter": "keinem", "plural": "keinen"},
    "genitive": {"masculine": "keines", "feminine": "keiner", "neuter": "keines", "plural": "keiner"}
  }
}
```

---

#### 45. Dataset de ejercicios tipo flashcard

```json
[
  {
    "id": "art_001",
    "type": "choose_article",
    "prompt": "___ Tisch",
    "options": ["der", "die", "das"],
    "answer": "der",
    "explanation": "Tisch es masculino: der Tisch."
  },
  {
    "id": "art_002",
    "type": "choose_article",
    "prompt": "___ Wohnung",
    "options": ["der", "die", "das"],
    "answer": "die",
    "explanation": "Los sustantivos terminados en -ung suelen ser femeninos."
  },
  {
    "id": "art_003",
    "type": "case_fill",
    "prompt": "Ich sehe ___ Mann.",
    "options": ["der", "den", "dem"],
    "answer": "den",
    "explanation": "sehen usa objeto directo; masculino acusativo: den."
  },
  {
    "id": "art_004",
    "type": "case_fill",
    "prompt": "Ich fahre mit ___ Bus.",
    "options": ["der", "den", "dem"],
    "answer": "dem",
    "explanation": "mit siempre exige dativo; der Bus → mit dem Bus."
  },
  {
    "id": "art_005",
    "type": "zero_article",
    "prompt": "Ich bin ___ Ingenieur.",
    "options": ["ein", "der", "—"],
    "answer": "—",
    "explanation": "Las profesiones simples después de sein suelen ir sin artículo."
  }
]
```

---

### PARTE I — PLAN DE APRENDIZAJE PARA APP

---

#### 46. Módulos recomendados

##### Módulo 1: Reconocer género

Objetivo:

- Aprender **der/die/das** con sustantivos frecuentes.
- Usar pistas por terminación.

Ejercicios:

- Selección múltiple: der/die/das.
- Clasificar por género.
- Relacionar palabra + imagen + artículo.
- Repetición espaciada.

---

##### Módulo 2: Cambios por caso

Objetivo:

- Entender nominativo, acusativo y dativo.
- Dominar el cambio masculino acusativo.

Ejercicios:

- Completar frases.
- Transformar nominativo → acusativo.
- Elegir artículo después de preposiciones.

---

##### Módulo 3: Definido vs indefinido

Objetivo:

- Diferenciar **der/die/das** vs **ein/eine/ein**.

Ejercicios:

- Mini historias:
  - Primera mención → ein/eine.
  - Segunda mención → der/die/das.

Ejemplo:

```text
Ich sehe einen Hund. Der Hund ist klein.
```

---

##### Módulo 4: Kein y negación

Objetivo:

- Usar **kein** para negar sustantivos.

Ejercicios:

- Convertir frases positivas en negativas.
- Elegir kein/keine/keinen/keinem.

---

##### Módulo 5: Artículo cero

Objetivo:

- Saber cuándo no usar artículo.

Ejercicios:

- Profesiones.
- Idiomas.
- Plurales indefinidos.
- Países/ciudades.
- Sustancias y conceptos generales.

---

##### Módulo 6: Palabras compuestas

Objetivo:

- Aplicar la regla del último sustantivo.

Ejercicios:

- Mostrar palabra compuesta.
- Dividir componentes.
- Elegir artículo según el componente final.

---

#### 47. Sistema de dificultad

| Nivel | Contenido |
|---:|---|
| 1 | der/die/das en nominativo |
| 2 | patrones por terminación |
| 3 | ein/eine/kein |
| 4 | acusativo masculino |
| 5 | dativo con mit, bei, von, zu |
| 6 | Wechselpräpositionen |
| 7 | artículo cero |
| 8 | excepciones y palabras con doble género |
| 9 | genitivo |
| 10 | frases mixtas con contexto |

---

#### 48. Feedback recomendado para app

Cada respuesta debería mostrar:

1. Respuesta correcta.
2. Género.
3. Caso.
4. Regla aplicable.
5. Ejemplo adicional.
6. Error típico relacionado.

Ejemplo:

```json
{
  "user_answer": "der",
  "correct_answer": "den",
  "feedback": "Aquí necesitas acusativo porque 'sehen' toma objeto directo. En masculino, der cambia a den: Ich sehe den Mann."
}
```

---

### PARTE J — LISTA DE SUSTANTIVOS A1/A2 PARA PRACTICAR ARTÍCULOS

---

#### 49. Masculinos frecuentes

| Alemán | Español |
|---|---|
| der Mann | hombre |
| der Vater | padre |
| der Sohn | hijo |
| der Bruder | hermano |
| der Freund | amigo |
| der Lehrer | profesor |
| der Arzt | médico |
| der Student | estudiante |
| der Chef | jefe |
| der Kollege | colega |
| der Hund | perro |
| der Tisch | mesa |
| der Stuhl | silla |
| der Schrank | armario |
| der Schlüssel | llave |
| der Bahnhof | estación |
| der Zug | tren |
| der Bus | bus |
| der Flug | vuelo |
| der Tag | día |
| der Abend | tarde/noche |
| der Morgen | mañana |
| der Monat | mes |
| der Sommer | verano |
| der Winter | invierno |
| der Regen | lluvia |
| der Schnee | nieve |
| der Kaffee | café |
| der Tee | té |
| der Wein | vino |
| der Saft | jugo |
| der Computer | computador |
| der Drucker | impresora |
| der Fehler | error |
| der Termin | cita |
| der Kurs | curso |
| der Unterricht | clase |
| der Preis | precio |
| der Markt | mercado |
| der Supermarkt | supermercado |

---

#### 50. Femeninos frecuentes

| Alemán | Español |
|---|---|
| die Frau | mujer |
| die Mutter | madre |
| die Tochter | hija |
| die Schwester | hermana |
| die Freundin | amiga/novia |
| die Lehrerin | profesora |
| die Ärztin | médica |
| die Studentin | estudiante |
| die Kollegin | colega |
| die Katze | gato/gata |
| die Tasche | bolso |
| die Lampe | lámpara |
| die Tür | puerta |
| die Wand | pared |
| die Küche | cocina |
| die Wohnung | vivienda |
| die Schule | escuela |
| die Universität | universidad |
| die Stadt | ciudad |
| die Straße | calle |
| die Haltestelle | parada |
| die Reise | viaje |
| die Frage | pregunta |
| die Antwort | respuesta |
| die Sprache | idioma |
| die Prüfung | examen |
| die Übung | ejercicio |
| die Arbeit | trabajo |
| die Zeit | tiempo |
| die Woche | semana |
| die Minute | minuto |
| die Stunde | hora/clase |
| die Nacht | noche |
| die Sonne | sol |
| die Musik | música |
| die Information | información |
| die Situation | situación |
| die Familie | familia |
| die Polizei | policía |
| die Bäckerei | panadería |

---

#### 51. Neutros frecuentes

| Alemán | Español |
|---|---|
| das Kind | niño/niña |
| das Baby | bebé |
| das Mädchen | niña |
| das Haus | casa |
| das Zimmer | habitación |
| das Badezimmer | baño |
| das Schlafzimmer | dormitorio |
| das Wohnzimmer | sala |
| das Fenster | ventana |
| das Bett | cama |
| das Sofa | sofá |
| das Auto | coche |
| das Fahrrad | bicicleta |
| das Ticket | billete |
| das Geld | dinero |
| das Handy | celular |
| das Telefon | teléfono |
| das Buch | libro |
| das Heft | cuaderno |
| das Papier | papel |
| das Formular | formulario |
| das Dokument | documento |
| das Problem | problema |
| das Thema | tema |
| das Beispiel | ejemplo |
| das Wort | palabra |
| das Essen | comida |
| das Wasser | agua |
| das Brot | pan |
| das Bier | cerveza |
| das Hotel | hotel |
| das Restaurant | restaurante |
| das Café | café/local |
| das Museum | museo |
| das Kino | cine |
| das Zentrum | centro |
| das Wetter | clima |
| das Jahr | año |
| das Wochenende | fin de semana |
| das Gespräch | conversación |
| das Geschenk | regalo |

---

#### 52. Plurales útiles

| Singular | Plural | Español |
|---|---|---|
| der Mann | die Männer | hombres |
| die Frau | die Frauen | mujeres |
| das Kind | die Kinder | niños |
| der Tisch | die Tische | mesas |
| die Lampe | die Lampen | lámparas |
| das Auto | die Autos | coches |
| der Bus | die Busse | buses |
| der Zug | die Züge | trenes |
| die Stadt | die Städte | ciudades |
| das Haus | die Häuser | casas |
| das Buch | die Bücher | libros |
| die Frage | die Fragen | preguntas |
| das Problem | die Probleme | problemas |
| der Termin | die Termine | citas |
| die Übung | die Übungen | ejercicios |

---

### PARTE K — PROMPT PARA CREAR UNA APP HTML

Puedes usar este prompt después en Claude, ChatGPT o un generador de código:

```text
Crea una aplicación HTML/CSS/JS local, de un solo archivo, para estudiar los artículos alemanes der/die/das.

Usa como contenido base este documento Markdown. La app debe incluir:

1. Modo flashcards:
   - Mostrar sustantivo sin artículo.
   - Usuario elige der/die/das.
   - Mostrar respuesta, traducción, regla y ejemplo.

2. Modo casos:
   - Frases con huecos.
   - Usuario elige artículo correcto según nominativo, acusativo o dativo.
   - Feedback explicando género + caso.

3. Modo reglas:
   - Tarjetas de reglas por terminación: -ung, -heit, -keit, -chen, -lein, -ismus, etc.
   - Ejemplos y excepciones.

4. Modo artículo cero:
   - Profesiones, idiomas, países, plurales indefinidos y sustancias.
   - Usuario decide si usar artículo o dejar vacío.

5. Sistema de progreso:
   - Guardar estadísticas en localStorage.
   - Repetición espaciada simple: mostrar más seguido los errores.
   - Etiquetas por dificultad: A1, A2, B1.

6. Diseño:
   - Interfaz simple y limpia.
   - Responsive para celular.
   - Botones grandes.
   - Feedback inmediato.
   - Sin backend.
   - Sin dependencias externas.

7. Dataset:
   - Convertir las tablas y JSON de este Markdown en arrays JavaScript.
   - Cada item debe tener: id, word, article, gender, plural, translation_es, rule, exceptions, examples.
```

---

### PARTE L — CHECKLIST FINAL

#### 53. Checklist para dominar artículos

Marca cuando puedas hacerlo sin pensar demasiado.

##### Género

- [ ] Sé que **der** = masculino.
- [ ] Sé que **die** = femenino.
- [ ] Sé que **das** = neutro.
- [ ] Sé que plural nominativo/acusativo usa **die**.
- [ ] Aprendo sustantivos con artículo.
- [ ] No traduzco el género desde español.
- [ ] Reconozco terminaciones femeninas: **-ung, -heit, -keit, -schaft, -ei, -ion, -tät**.
- [ ] Reconozco terminaciones neutras: **-chen, -lein, -ment, -um, -ma**.
- [ ] Reconozco terminaciones masculinas frecuentes: **-ling, -ismus, -ist, -or, -ant, -ent**.
- [ ] Sé que en palabras compuestas manda la última palabra.

##### Casos

- [ ] Sé usar nominativo para el sujeto.
- [ ] Sé que acusativo masculino cambia **der → den**.
- [ ] Sé que **ein Mann → einen Mann** en acusativo.
- [ ] Sé que **mit, bei, von, zu, seit, nach, aus** usan dativo.
- [ ] Sé que **für, ohne, gegen, durch, um** usan acusativo.
- [ ] Sé la diferencia entre **in den Park** e **im Park**.

##### Uso del artículo

- [ ] Sé cuándo usar artículo definido.
- [ ] Sé cuándo usar artículo indefinido.
- [ ] Sé cuándo usar **kein**.
- [ ] Sé que **ein/eine** no tiene plural.
- [ ] Sé usar artículo cero con profesiones simples.
- [ ] Sé usar artículo cero con idiomas.
- [ ] Sé usar artículo cero con países sin artículo.
- [ ] Sé que algunos países sí llevan artículo: **die Schweiz, die Türkei, der Iran, die USA**.

---

### Fuentes consultadas

Estas fuentes se usaron para verificar la base gramatical y contrastar explicaciones didácticas:

1. Duden – **Artikel**  
   https://www.duden.de/sprachwissen/fuer-lernende/wortarten-artikel

2. Duden – **Nomen**  
   https://www.duden.de/sprachwissen/fuer-lernende/wortarten-nomen

3. Duden – **Die Verteilung der Artikel im Rechtschreibduden**  
   https://www.duden.de/sprachwissen/sprachratgeber/Die-Verteilung-der-Artikel-Genusangabe-im-Rechtschreibduden

4. Lingolia – **Nouns and Articles in German Grammar**  
   https://deutsch.lingolia.com/en/grammar/nouns-and-articles

5. Lingolia – **Deklination von deutschen Nomen und Artikeln**  
   https://deutsch.lingolia.com/de/grammatik/nomen/deklination

6. University of Michigan German Resources – **Basic Chart: der/das/die, ein-words, Pronouns**  
   https://sites.lsa.umich.edu/german-resources/grammatik/basic-chart/

7. Mango Languages – **The zero article: When to omit an article in German?**  
   https://mangolanguages.com/resources/learn/grammar/german/the-zero-article-when-to-omit-an-article-in-german-/the-zero-article-when-to-omit-an-article-in-german-

---

### Nota final

Para aprender artículos en alemán, no basta con memorizar tablas. La estrategia más eficiente es combinar:

1. Sustantivo + artículo + plural.
2. Reglas de terminación.
3. Práctica de casos con frases reales.
4. Repetición espaciada.
5. Feedback inmediato sobre el error.

Formato ideal:

> **der Tisch, die Tische**  
> **die Wohnung, die Wohnungen**  
> **das Kind, die Kinder**

Así aprendes género, plural y uso real al mismo tiempo.

---

## Parte 5 — Referencia gramatical detallada por unidad

Índice con nivel CEFR orientativo y si la unidad entra en el alcance estricto A1 de esta app. `✅` = usar como fuente directa de contenido A1. `📚` = mantener como referencia / posible ampliación A2-B1 futura.

| # | Unidad | Nivel orientativo | ¿Alcance A1? | Nota |
|---|---|---|---|---|
| 01 | Pronunciación en alemán | A1 | ✅ |  |
| 02 | Personalpronomen: pronombres personales | A1 | ✅ |  |
| 03 | El caso nominativo | A1 | ✅ |  |
| 04 | El caso acusativo | A1 | ✅ |  |
| 05 | Verbos y preposiciones que rigen acusativo | A1 | ✅ |  |
| 06 | Posesivos: determinantes y pronombres | A1 | ✅ |  |
| 07 | El tiempo verbal Präsens | A1 | ✅ |  |
| 08 | El tiempo verbal Präteritum | A1/A2 | ✅ | En el examen A1 solo se exige Präteritum de sein/haben/modales; el resto refuerza A2. |
| 09 | Lista de verbos irregulares | A1 | ✅ |  |
| 10 | La estructura básica de la oración | A1 | ✅ |  |
| 11 | El caso dativo: verbos y preposiciones | A1 | ✅ |  |
| 12 | El caso genitivo: posesión, preposiciones y verbos | A2/B1 | 📚 | El genitivo no se examina en Goethe/telc A1. Referencia futura. |
| 13 | Ejemplos de oraciones con los cuatro casos | A2 | 📚 | Repaso comparativo de los 4 casos (incluye genitivo); puente útil, no exigible en A1. |
| 14 | La N-Deklination: sustantivos masculinos débiles | A2/B1 | 📚 | Fuera del alcance A1. |
| 15 | Posición de los complementos en acusativo y dativo | A1/A2 | ✅ | El orden básico Dativ antes de Akkusativ con pronombres simples sí aparece en A1. |
| 16 | Wechselpräpositionen: acusativo o dativo | A1/A2 | ✅ | Las preposiciones de dos casos más frecuentes (in, an, auf...) son A1; el detalle fino es A2. |
| 17 | Adjetivos: tipos, formación y grados | A2 | 📚 | Declinación completa del adjetivo: A2. En A1 solo formas predicativas simples. |
| 18 | TeKaMoLo: orden de los complementos | A2/B1 | 📚 | Orden de adverbios más propio de A2/B1. |
| 19 | La regla ADUSO: conjunciones en posición cero | A1 | ✅ | und/aber/oder/denn/sondern sí son A1. |
| 20 | Sustantivación de verbos | B1 | 📚 |  |
| 21 | Sustantivación de adjetivos | B1 | 📚 |  |
| 22 | Formación de preguntas cerradas | A1 | ✅ |  |
| 23 | La negación en alemán | A1 | ✅ |  |
| 24 | Formación de preguntas abiertas | A1 | ✅ |  |
| 25 | Adverbios de lugar | A2 | 📚 | hier/dort ya cubiertos en el núcleo A1 (Parte 2); el resto es A2. |
| 26 | Adverbios de tiempo (Temporaladverbien) | A2 | 📚 | heute/morgen/gestern ya cubiertos en el núcleo A1; el resto es A2. |
| 27 | Adverbios de causa y repaso general de adverbios | A2/B1 | 📚 |  |
| 28 | Adverbios modales (Modaladverbien) | A2/B1 | 📚 |  |
| 29 | El imperativo (Der Imperativ) | A1 | ✅ | Imperativo informal (du/ihr) y de cortesía (Sie) básico sí es A1. |
| 30 | El tiempo verbal Perfekt | A1/A2 | ✅ | Perfekt con verbos frecuentes es A1; matices (doble infinitivo, verbos sin ge-) son A2. |
| 31 | El tiempo verbal Plusquamperfekt | B1 | 📚 |  |
| 32 | Los tiempos verbales Futur I y Futur II | A2/B1 | 📚 | En A1 el futuro se expresa con presente + marcador temporal. |
| 33 | Verbos separables e inseparables (Trennbare und untrennbare Verben) | A1/A2 | ✅ | Los verbos separables más frecuentes (aufstehen, einkaufen...) sí son A1. |
| 34 | Verbos reflexivos (Reflexive Verben) | A2 | 📚 | Versión mínima (sich heißen, sich freuen) es A1; el resto es A2. |
| 35 | Pronombres reflexivos (Reflexivpronomen) | A1/A2 | ✅ | Acompaña a los verbos reflexivos frecuentes de A1. |
| 36 | Todo sobre la voz pasiva (Passiv) | B1 | 📚 |  |
| 37 | Pronombres interrogativos (Interrogativpronomen) | A1 | ✅ |  |
| 38 | Pronombres demostrativos (Demonstrativpronomen) | A2 | 📚 |  |
| 39 | Pronombres indefinidos (Indefinitpronomen) | A2 | 📚 |  |
| 40 | Oraciones subordinadas: estructura y tipos (Parte 1) | A2 | 📚 | weil/dass/wenn se consolidan en A2; en A1 aparecen solo como frases fijas de examen. |
| 41 | Pronombres relativos (Relativpronomen) | B1 | 📚 |  |
| 42 | Adverbios relativos (Relativadverbien) | B1 | 📚 |  |
| 43 | Adverbios conjuntivos (Konjunktionaladverbien) | B1 | 📚 |  |
| 44 | Oraciones subordinadas: tipos (Parte 2) | B1 | 📚 |  |
| 45 | Preguntas indirectas cerradas (Indirekte Ja-/Nein-Fragen) | A2/B1 | 📚 |  |
| 46 | Preguntas indirectas abiertas (Indirekte W-Fragen) | A2/B1 | 📚 |  |
| 47 | Conjunciones y conectores (Konjunktionen und Konnektoren) | A2/B1 | 📚 |  |
| 48 | Todo sobre el Konjunktiv I | B1 | 📚 |  |
| 49 | Todo sobre el Konjunktiv II | A2 | 📚 | Formas fijas möchte/könnte/würde sí son A1 (Parte 2); el Konjunktiv II productivo es A2. |
| 50 | Las oraciones relativas | B1 | 📚 |  |
| 51 | Oraciones subordinadas con Konjunktiv II | B1 | 📚 |  |


---


### Unidad 01 — Pronunciación en alemán

*Nivel orientativo:* **A1** · *Alcance A1 de esta app:* ✅

---
class_id: 001
title: "Pronunciación en alemán"
level: "A1"
topics: ["Pronunciación", "Vocabulario", "Acentuación"]
target_exam: "Telc / Goethe A1"
---

### Pronunciación en alemán

#### 1. 🎯 Resumen / Objetivos de la Lección
- Reconocer y pronunciar los principales diptongos y las vocales con Umlaut.
- Identificar los sonidos consonánticos característicos del alemán.
- Aplicar reglas básicas de acentuación y ensordecimiento final.
- Practicar palabras de dificultad progresiva.
- Desarrollar la pronunciación mediante escucha, repetición y autoevaluación.

#### 2. 📚 Vocabulario Clave (Wortschatz)
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Euro, -s | el euro | Sustantivo | **Euro** contiene el diptongo `eu` → /ɔʏ̯/. |
| das Museum, Museen | el museo | Sustantivo | En **Museum**, `e` y `u` pertenecen a sílabas distintas. |
| der Apfel, Äpfel | la manzana | Sustantivo | **Äpfel** comienza con el sonido /ɛ/. |
| die Öffnung, -en | la abertura | Sustantivo | La `ö` corta se pronuncia /œ/. |
| die Übung, -en | el ejercicio | Sustantivo | La `Ü` larga se pronuncia /yː/. |
| das Haus, Häuser | la casa | Sustantivo | `äu` se pronuncia /ɔʏ̯/. |
| der Urlaub, -e | las vacaciones | Sustantivo | La `b` final se pronuncia como /p/. |
| der Mund, Münder | la boca | Sustantivo | La `d` final se pronuncia como /t/. |
| der Ausflug, Ausflüge | la excursión | Sustantivo | La `g` final se ensordece y suena /k/. |
| die Wohnung, -en | la vivienda | Sustantivo | En la terminación `-ung`, la `g` se pronuncia /ŋ/. |
| die Ahnung, -en | la idea; el presentimiento | Sustantivo | La `h` alarga la vocal anterior y no se pronuncia. |
| der Delfin, -e | el delfín | Sustantivo | También puede escribirse **Delphin**; `ph` se pronuncia /f/. |
| das Schiff, -e | el barco | Sustantivo | `sch` se pronuncia /ʃ/. |
| der Fluss, Flüsse | el río | Sustantivo | `ss` indica normalmente que la vocal anterior es corta. |
| der Fuß, Füße | el pie | Sustantivo | `ß` aparece después de una vocal larga o un diptongo. |
| das Brötchen, - | el panecillo | Sustantivo | El sufijo diminutivo `-chen` se pronuncia /çən/. |
| das Rührei, -er | el huevo revuelto | Sustantivo | Contiene `üh` /yː/ y `ei` /aɪ̯/. |
| das Eichhörnchen, - | la ardilla | Sustantivo | Palabra útil para practicar `ei`, `ch`, `ö` y `r`. |
| das Streichholzschächtelchen, - | la cajita de cerillas | Sustantivo | Palabra compuesta y diminutiva. |
| sehen | ver | Verbo irregular + Akkusativ | `h` alarga la primera `e`: **sehen** /ˈzeːən/. |
| fahren | conducir; ir en vehículo | Verbo irregular | **fahren – fuhr – ist gefahren**. |
| protestieren | protestar | Verbo regular en `-ieren` | No recibe `ge-` en el participio: **protestiert**. |
| nachfragen | volver a preguntar | Verbo regular separable | **Ich frage nach.** |
| vorkommen | ocurrir; aparecer | Verbo irregular separable | **Das kommt oft vor.** |
| besuchen | visitar | Verbo regular inseparable + Akkusativ | **Ich besuche Berlin.** |
| zerstören | destruir | Verbo regular inseparable + Akkusativ | **zer-** no se separa. |
| üben | practicar | Verbo regular + Akkusativ | **Ich übe die Aussprache.** |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### Vocales y diptongos

| Grafía | Pronunciación aproximada / IPA | Ejemplo |
| :--- | :--- | :--- |
| `ei`, `ai` | /aɪ̯/ | **bei**, **Datei** |
| `eu`, `äu` | /ɔʏ̯/ | **Euro**, **Häuser** |
| `ie` | /iː/ | **protestieren** |
| `ä` | /ɛ/ o /ɛː/ | **Äpfel** |
| `ö` | /œ/ o /øː/ | **Öffnung**, **Brötchen** |
| `ü` | /ʏ/ o /yː/ | **fünf**, **Übung** |

- **Regla / Concepto:** `eu` forma un diptongo, pero no cuando las vocales pertenecen a sílabas diferentes.
- **Ejemplo:** **Euro** /ˈɔʏ̯ʁoː/, pero **Museum** /muˈzeːʊm/.

##### Consonantes

| Grafía / posición | Pronunciación | Ejemplo |
| :--- | :--- | :--- |
| `b`, `d`, `g` al final de sílaba | /p/, /t/, /k/ | **Urlaub**, **Mund**, **Ausflug** |
| `ch` después de `a`, `o`, `u`, `au` | /x/ | **doch**, **hoch** |
| `ch` después de vocales anteriores, consonantes o diptongos | /ç/ | **ich**, **Brötchen**, **Eichhörnchen** |
| `chs` en muchas palabras alemanas | /ks/ | **sechs** |
| `h` al inicio de sílaba | /h/ aspirada | **hoch**, **Halle** |
| `h` después de una vocal | No se pronuncia; alarga la vocal | **Ahnung**, **sehen** |
| `j` | /j/, similar a la «y» de «yo» | **jetzt** |
| `ph` | /f/ | **Delphin** |
| `sch` | /ʃ/ | **Schiff** |
| `sp`, `st` al comienzo de sílaba | /ʃp/, /ʃt/ | **Spanien**, **Stein** |
| `v` | Generalmente /f/ en palabras alemanas | **viel** |
| `w` | /v/ | **wieder** |
| `z` | /ts/ | **Zink** |
| `ss`, `ß` | /s/ | **Fluss**, **Fuß** |

- **Regla / Concepto:** Las consonantes sonoras `b`, `d` y `g` se ensordecen al final de una sílaba.
- **Estructura / Fórmula:** `b → /p/`, `d → /t/`, `g → /k/`
- **Nota:** La `r` presenta variantes regionales. Al final de `-er` suele vocalizarse como /ɐ/, por ejemplo en **Lehrer**.

##### Acentuación de palabras

- **Palabras alemanas simples:** normalmente se acentúa la primera sílaba: **FAH-ren**.
- **Formas conjugadas:** conservan generalmente la raíz acentuada: **GE-fah-ren**.
- **Verbos terminados en `-ieren`:** se acentúa la sílaba anterior a `-ren`: pro-tes-**TIE**-ren.
- **Palabras terminadas en `-ei` o `-ion`:** suelen llevar el acento al final: Da-**TEI**, Na-**TION**.
- **Palabras compuestas:** el acento principal suele recaer en el primer componente: **STREICH**holzschächtelchen.
- **Verbos separables:** el prefijo recibe el acento: **NACH**fragen, **VOR**kommen.
- **Verbos inseparables:** el prefijo no recibe el acento: be-**SU**chen, zer-**STÖ**ren.
- **Préstamos lingüísticos:** conservan con frecuencia un patrón de acentuación no germánico: Proto-**KOLL**.

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Üben, üben und mehr üben!**  
> *Traducción:* ¡Practicar, practicar y practicar aún más!  
> *Uso:* Animar a alguien a seguir practicando.

> **Viel Erfolg!**  
> *Traducción:* ¡Mucho éxito!  
> *Uso:* Desear éxito antes de una tarea, examen o ejercicio.

> **Ich übe die Aussprache.**  
> *Traducción:* Practico la pronunciación.  
> *Uso:* Explicar qué aspecto del alemán se está practicando.

> **Wie spricht man das aus?**  
> *Traducción:* ¿Cómo se pronuncia esto?  
> *Uso:* Preguntar por la pronunciación de una palabra.

> **Kannst du das bitte wiederholen?**  
> *Traducción:* ¿Puedes repetirlo, por favor?  
> *Uso:* Pedir que alguien repita una palabra o frase.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** `eu` y `äu` representan el mismo diptongo: /ɔʏ̯/.
- ⚠️ **Atención:** La `j` alemana no se pronuncia como la jota española, sino como /j/, similar a la «y» de «yo».
- ⚠️ **Atención:** La `h` inicial es aspirada; no equivale exactamente a la jota española.
- ⚠️ **Atención:** La `w` alemana se pronuncia /v/, mientras que la `v` suele pronunciarse /f/ en palabras de origen alemán.
- ⚠️ **Atención:** `ss` y `ß` representan /s/. Generalmente, `ss` sigue a una vocal corta y `ß` a una vocal larga o un diptongo.
- ⚠️ **Atención:** `ch` no tiene siempre el mismo sonido: puede pronunciarse /ç/ o /x/ según los sonidos anteriores.
- ⚠️ **Atención:** En **Wohnung**, la terminación `-ng` se pronuncia /ŋ/; no debe añadirse una /k/.
- Lee despacio y divide las palabras largas en componentes o sílabas.
- Escucha modelos nativos y repite las palabras en voz alta.
- Grábate, compara tu pronunciación con el modelo y corrige un sonido cada vez.
- Practica especialmente: **Brötchen**, **Rührei**, **Eichhörnchen**, **Schleswig-Holstein**, **Schlittschuhlaufen**, **fünfhundertfünfundfünfzig** y **Streichholzschächtelchen**.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: ¿Cómo se pronuncia el diptongo `ei` en alemán?
  A: /aɪ̯/, parecido a «ai».
  Type: flashcard
- Q: ¿Cómo se pronuncian `eu` y `äu`?
  A: /ɔʏ̯/.
  Type: flashcard
- Q: Completa la regla: La combinación `ie` representa normalmente una ____ larga.
  A: i
  Type: fill-in-the-blank
- Q: ¿Cómo se pronuncia la `b` final de **Urlaub**?
  A: Como /p/.
  Type: flashcard
- Q: ¿Cómo se pronuncia la `d` final de **Mund**?
  A: Como /t/.
  Type: flashcard
- Q: ¿Cómo se pronuncia `sch` en **Schiff**?
  A: /ʃ/.
  Type: flashcard
- Q: ¿Cómo se pronuncia la `w` de **wieder**?
  A: /v/.
  Type: flashcard
- Q: ¿Cómo se pronuncia la `z` de **Zink**?
  A: /ts/.
  Type: flashcard
- Q: ¿Qué sílaba recibe el acento en los verbos separables?
  A: El prefijo separable.
  Type: flashcard
- Q: Marca la sílaba tónica de **nachfragen**.
  A: NACH-fragen.
  Type: flashcard
- Q: Marca la sílaba tónica de **besuchen**.
  A: be-SU-chen.
  Type: flashcard
- Q: Traduce al alemán: ¡Mucho éxito!
  A: Viel Erfolg!
  Type: flashcard
- Q: Traduce al alemán: ¿Cómo se pronuncia esto?
  A: Wie spricht man das aus?
  Type: flashcard
- Q: ¿Qué artículo corresponde a ____ Brötchen?
  A: das
  Type: fill-in-the-blank
- Q: Completa el plural: das Haus, ____.
  A: Häuser
  Type: fill-in-the-blank
<!-- DATA_QUIZ_END -->


---


### Unidad 02 — Personalpronomen: pronombres personales

*Nivel orientativo:* **A1** · *Alcance A1 de esta app:* ✅

---
class_id: 002
title: "Personalpronomen: nominativo, acusativo y dativo"
level: "A2"
topics: ["Gramática", "Pronombres personales", "Casos", "Orden de complementos"]
target_exam: "Telc / Goethe A2"
---

### Personalpronomen: pronombres personales

#### 1. 🎯 Resumen / Objetivos de la Lección
- Reconocer los pronombres personales alemanes en nominativo, acusativo y dativo.
- Elegir el caso según la función del pronombre en la oración.
- Sustituir sustantivos y grupos nominales por el pronombre adecuado.
- Usar correctamente el tratamiento formal **Sie / Sie / Ihnen**.
- Ordenar los complementos de acusativo y dativo.
- Emplear **es** como pronombre neutro y en oraciones impersonales.

#### 2. 📚 Vocabulario Clave (Wortschatz)
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Vater, Väter | el padre | Sustantivo | **Er** gibt der Tochter ein Geschenk. |
| die Mutter, Mütter | la madre | Sustantivo | **Sie** umarmt den Sohn. |
| die Tochter, Töchter | la hija | Sustantivo | Der Vater gibt **ihr** ein Geschenk. |
| der Sohn, Söhne | el hijo | Sustantivo | Die Mutter umarmt **ihn**. |
| die Familie, -n | la familia | Sustantivo | Ich esse mit meiner Familie. |
| der Hund, -e | el perro | Sustantivo | Herr Schneider hatte einen Hund. |
| die Katze, -n | el gato; la gata | Sustantivo | Ich habe eine Katze. **Sie** ist niedlich. |
| die Decke, -n | la manta | Sustantivo | Ich brauche eine Decke. |
| das Geschenk, -e | el regalo | Sustantivo | Der Vater gibt es der Tochter. |
| das Auto, -s | el coche | Sustantivo | Er braucht **es** heute. |
| der Chef, -s | el jefe | Sustantivo | Ich habe **ihm** die Nachricht gesagt. |
| die Mitarbeiterin, -nen | la empleada | Sustantivo | Der Chef dankt **ihr**. |
| der Junge, -n | el chico | Sustantivo | **Er** liest das Gedicht. |
| das Gedicht, -e | el poema | Sustantivo | Der Junge liest **es**. |
| die Lehrerin, -nen | la profesora | Sustantivo | **Sie** erklärt den Satzbau. |
| der Schüler, - | el alumno | Sustantivo | Plural: **die Schüler**; dativo plural: **den Schülern**. |
| der Satzbau | la estructura de la oración | Sustantivo | Die Lehrerin erklärt **ihn** den Schülern. |
| der Tourist, -en | el turista | Sustantivo | Plural: **die Touristen**. |
| der Reiseleiter, - | el guía turístico | Sustantivo | Die Touristen folgen **ihm**. |
| der Flug, Flüge | el vuelo | Sustantivo | Wir buchen **sie**. |
| die Geburtstagsparty, -s | la fiesta de cumpleaños | Sustantivo | Meine Eltern organisieren **sie**. |
| das Dokument, -e | el documento | Sustantivo | Ich habe **es** nicht. |
| die Brille, -n | las gafas | Sustantivo singular en alemán | Ich kann **sie** nicht finden. |
| geben | dar | Verbo irregular + Dativ + Akkusativ | **geben – gibt – gab – hat gegeben** |
| danken | dar las gracias | Verbo regular + Dativ | Ich danke **dir**. |
| folgen | seguir | Verbo regular + Dativ | Wir folgen **ihm**. |
| gefallen | gustar | Verbo irregular + Dativ | Welche Musik gefällt **euch**? |
| helfen | ayudar | Verbo irregular + Dativ | Kann ich **Ihnen** helfen? |
| umarmen | abrazar | Verbo regular + Akkusativ | Die Mutter umarmt **ihn**. |
| brauchen | necesitar | Verbo regular + Akkusativ | Er braucht **es**. |
| anrufen | llamar por teléfono | Verbo irregular separable + Akkusativ | Er ruft **ihn** an. |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### Tabla de pronombres personales

| Persona | Nominativ (sujeto) | Akkusativ (objeto directo) | Dativ (objeto indirecto) | Español aproximado |
| :--- | :--- | :--- | :--- | :--- |
| 1.ª singular | ich | mich | mir | yo / me |
| 2.ª singular informal | du | dich | dir | tú / te |
| 3.ª singular masculino | er | ihn | ihm | él / lo / le |
| 3.ª singular femenino | sie | sie | ihr | ella / la / le |
| 3.ª singular neutro | es | es | ihm | ello / lo / le |
| 1.ª plural | wir | uns | uns | nosotros/as / nos |
| 2.ª plural informal | ihr | euch | euch | vosotros/as / os |
| 3.ª plural | sie | sie | ihnen | ellos/as / los, las / les |
| Tratamiento formal | Sie | Sie | Ihnen | usted(es) / lo, la, los, las / le, les |

- **Nominativo:** identifica quién realiza o protagoniza la acción.
  - **Die Mutter** umarmt den Sohn. → **Sie** umarmt den Sohn.
- **Acusativo:** suele indicar la persona o cosa directamente afectada.
  - Die Mutter umarmt **den Sohn**. → Die Mutter umarmt **ihn**.
- **Dativo:** suele indicar el destinatario o receptor; algunos verbos lo exigen.
  - Der Chef dankt **der Mitarbeiterin**. → Der Chef dankt **ihr**.
- El pronombre sujeto normalmente debe aparecer en alemán:
  - **Ich esse mit meiner Familie.**
  - No se omite **ich** como puede omitirse «yo» en español.

##### Tratamiento formal

- **Sie** se escribe siempre con mayúscula cuando significa «usted» o «ustedes».
- Se conjuga como la tercera persona del plural.
- **Estructura:** `Sie + verbo en 3.ª persona plural`
- **Declinación:** `Sie (Nominativ) – Sie (Akkusativ) – Ihnen (Dativ)`
- **Ejemplos:**
  - **Können Sie das bitte wiederholen?**
  - **Kann ich Ihnen helfen?**

##### El pronombre neutro «es»

- Sustituye sustantivos neutros:
  - Braucht dein Papa heute **das Auto**? → Ja, er braucht **es** heute.
- Forma parte de expresiones impersonales:
  - **Es regnet.** → Llueve.
  - **Es ist schon spät.** → Ya es tarde.
- Puede anticipar una oración subordinada:
  - **Es freut mich, dass du mich besuchst.**
  - Me alegra que me visites.

##### Concordancia con el género gramatical

- El pronombre concuerda con el género del sustantivo alemán, no necesariamente con el sexo o el género natural.
- `der` → **er / ihn / ihm**
- `die` → **sie / sie / ihr**
- `das` → **es / es / ihm**
- Plural → **sie / sie / ihnen**
- **Ejemplo:** **die Katze** → **sie**, aunque en español se traduzca como «el gato».

##### Orden de los complementos

El verbo **geben** rige dativo para el receptor y acusativo para la cosa entregada.

| Tipo de complementos | Orden habitual | Ejemplo |
| :--- | :--- | :--- |
| Dos sustantivos | Dativ + Akkusativ | Der Vater gibt **der Tochter** **ein Geschenk**. |
| Pronombre de dativo + sustantivo | Pronombre + sustantivo | Der Vater gibt **ihr** **ein Geschenk**. |
| Pronombre de acusativo + sustantivo | Pronombre + sustantivo | Der Vater gibt **es** **der Tochter**. |
| Dos pronombres | Akkusativ + Dativ | Der Vater gibt **es** **ihr**. |

- **Fórmula con sustantivos:** `Sujeto + verbo + Dativ + Akkusativ`
- **Fórmula con dos pronombres:** `Sujeto + verbo + Akkusativpronomen + Dativpronomen`
- **Sustitución completa:**  
  **Der Vater gibt der Tochter ein Geschenk.** → **Er gibt es ihr.**

##### Referencias ambiguas

- Debe quedar claro a qué sustantivo se refiere cada pronombre.
- **Herr Schneider hatte einen Hund. Er ist gestorben.** es ambiguo: **er** puede referirse al señor Schneider o al perro.
- Si existe ambigüedad, es preferible repetir el sustantivo.

##### Ejercicios integrados y soluciones

| Oración original | Sustitución con pronombres |
| :--- | :--- |
| Meine Eltern organisieren meine Geburtstagsparty. | **Sie organisieren sie.** |
| Er hat seinen Vater gestern Abend angerufen. | **Er hat ihn gestern Abend angerufen.** |
| Ich habe meinem Chef gesagt, dass ich das Dokument nicht habe. | **Ich habe ihm gesagt, dass ich es nicht habe.** |
| Max und ich haben ein Geschenk für deinen Sohn. | **Wir haben es für ihn.** |
| Ich kann meine Brille nicht finden. | **Ich kann sie nicht finden.** |

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Wie heißt du?**  
> *Traducción:* ¿Cómo te llamas?  
> *Uso:* Preguntar informalmente el nombre.

> **Wie geht es dir?**  
> *Traducción:* ¿Cómo estás?  
> *Uso:* Preguntar informalmente por el estado de una persona; **dir** está en dativo.

> **Woher kommt ihr?**  
> *Traducción:* ¿De dónde venís?  
> *Uso:* Dirigirse informalmente a varias personas.

> **Welche Musik gefällt euch?**  
> *Traducción:* ¿Qué música os gusta?  
> *Uso:* **gefallen** exige dativo; **euch** se refiere a «vosotros/as».

> **Können Sie das bitte wiederholen?**  
> *Traducción:* ¿Puede repetir eso, por favor?  
> *Uso:* Petición formal.

> **Kann ich Ihnen helfen?**  
> *Traducción:* ¿Puedo ayudarle?  
> *Uso:* Ofrecer ayuda formalmente; **Ihnen** está en dativo.

> **Mir ist kalt.**  
> *Traducción:* Tengo frío.  
> *Uso:* Expresar una sensación; la persona aparece en dativo.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** **sie** puede significar «ella», «ellos» o «ellas»; **Sie** significa «usted» o «ustedes».
- ⚠️ **Atención:** **ihr** puede ser pronombre personal, determinante posesivo o pronombre posesivo. El contexto determina su función.
- ⚠️ **Atención:** No confundas **ihnen** («a ellos/as») con **Ihnen** («a usted/es»).
- ⚠️ **Atención:** No elijas el pronombre según la traducción española; comprueba el género y el número del sustantivo alemán.
- ⚠️ **Atención:** **danken**, **folgen**, **gefallen** y **helfen** rigen dativo.
- ⚠️ **Atención:** Si hay dos pronombres objeto, el acusativo precede al dativo: **Er gibt es ihr.**
- ⚠️ **Atención:** **der Satzbau** es masculino; por tanto, su pronombre de acusativo es **ihn**, no **es**.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: Sustituye el sujeto: Die Mutter umarmt den Sohn.
  A: Sie umarmt den Sohn.
  Type: transformation
- Q: Sustituye el acusativo: Die Mutter umarmt den Sohn.
  A: Die Mutter umarmt ihn.
  Type: transformation
- Q: Sustituye ambos grupos nominales: Die Mutter umarmt den Sohn.
  A: Sie umarmt ihn.
  Type: transformation
- Q: Sustituye el dativo: Der Chef dankt der Mitarbeiterin.
  A: Der Chef dankt ihr.
  Type: transformation
- Q: Sustituye todos los grupos posibles: Der Chef dankt der Mitarbeiterin.
  A: Er dankt ihr.
  Type: transformation
- Q: Sustituye el acusativo: Der Junge liest das Gedicht.
  A: Der Junge liest es.
  Type: transformation
- Q: Sustituye todos los grupos posibles: Der Junge liest das Gedicht.
  A: Er liest es.
  Type: transformation
- Q: Sustituye todos los grupos posibles: Die Touristen folgen dem Reiseleiter.
  A: Sie folgen ihm.
  Type: transformation
- Q: Sustituye todos los grupos posibles: Meine Freundin und ich buchen die Flüge.
  A: Wir buchen sie.
  Type: transformation
- Q: Sustituye todos los grupos posibles: Meine Eltern organisieren meine Geburtstagsparty.
  A: Sie organisieren sie.
  Type: transformation
- Q: Sustituye el acusativo: Er hat seinen Vater gestern Abend angerufen.
  A: Er hat ihn gestern Abend angerufen.
  Type: transformation
- Q: Sustituye el dativo y el acusativo: Ich habe meinem Chef gesagt, dass ich das Dokument nicht habe.
  A: Ich habe ihm gesagt, dass ich es nicht habe.
  Type: transformation
- Q: Sustituye todos los grupos posibles: Max und ich haben ein Geschenk für deinen Sohn.
  A: Wir haben es für ihn.
  Type: transformation
- Q: Sustituye el acusativo: Ich kann meine Brille nicht finden.
  A: Ich kann sie nicht finden.
  Type: transformation
- Q: Completa: Wie geht es ____? (du)
  A: dir
  Type: fill-in-the-blank
- Q: Completa formalmente: Kann ich ____ helfen? (Sie)
  A: Ihnen
  Type: fill-in-the-blank
- Q: Completa: Der Vater gibt der Tochter ein Geschenk. Er gibt ____ ____.
  A: es ihr
  Type: fill-in-the-blank
- Q: ¿Qué caso exige el verbo danken?
  A: Dativ.
  Type: flashcard
- Q: ¿Cuál es el pronombre de acusativo de der Satzbau?
  A: ihn
  Type: flashcard
- Q: ¿Cuál es el orden habitual cuando ambos complementos son pronombres?
  A: Akkusativpronomen + Dativpronomen.
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 03 — El caso nominativo

*Nivel orientativo:* **A1** · *Alcance A1 de esta app:* ✅

---
class_id: 003
title: "El caso nominativo"
level: "A1"
topics: ["Gramática", "Nominativo", "Determinantes", "Posesivos", "Declinación de adjetivos"]
target_exam: "Telc / Goethe A1"
---

### El caso nominativo

#### 1. 🎯 Resumen / Objetivos de la Lección
- Reconocer el nominativo como caso del sujeto.
- Identificar el predicativo en nominativo con **sein**, **werden** y **bleiben**.
- Usar artículos determinados, indeterminados y negativos en nominativo.
- Emplear correctamente los determinantes posesivos.
- Declinar adjetivos en nominativo con y sin determinante.

#### 2. 📚 Vocabulario Clave (Wortschatz)
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Name, -n | el nombre | Sustantivo | Mein Name hat vier Buchstaben. |
| der Buchstabe, -n | la letra | Sustantivo | Das Wort hat fünf Buchstaben. |
| der Sohn, Söhne | el hijo | Sustantivo | Mein Sohn wird Pilot. |
| der Pilot, -en | el piloto | Sustantivo | Er ist ein guter Pilot. |
| der Lehrer, - | el profesor | Sustantivo | Er bleibt Lehrer. |
| der Junge, -n | el chico | Sustantivo | Der Junge spielt Fußball. |
| der Bruder, Brüder | el hermano | Sustantivo | Sein kleiner Bruder spielt Fußball. |
| der Hund, -e | el perro | Sustantivo | Sein alter Hund ist braun. |
| der Fußball, Fußbälle | el balón de fútbol; el fútbol | Sustantivo | Fußball spielen = jugar al fútbol. |
| die Waschmaschine, -n | la lavadora | Sustantivo | Die Waschmaschine ist kaputt. |
| das Buch, Bücher | el libro | Sustantivo | Ein blaues Buch ist da. |
| die Wohnung, -en | la vivienda; el apartamento | Sustantivo | Unsere schönen Wohnungen sind weit weg. |
| sein | ser; estar | Verbo irregular/copulativo | **sein – ist – war – ist gewesen** |
| werden | convertirse; llegar a ser | Verbo irregular/copulativo | **werden – wird – wurde – ist geworden** |
| bleiben | quedarse; permanecer | Verbo irregular/copulativo | **bleiben – bleibt – blieb – ist geblieben** |
| spielen | jugar; tocar | Verbo regular | Der Junge spielt Fußball. |
| heißen | llamarse; significar | Verbo irregular | Wie heißt du? |
| klein | pequeño | Adjetivo | ein kleines Buch |
| alt | viejo; de edad | Adjetivo | eine alte Waschmaschine |
| blau | azul | Adjetivo | ein blaues Buch |
| schön | bonito | Adjetivo | schöne Wohnungen |
| rot | rojo | Adjetivo | mein rotes Buch |
| braun | marrón | Adjetivo | Sein Hund ist braun. |
| kaputt | roto; averiado | Adjetivo | Die Waschmaschine ist kaputt. |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### Función principal del nominativo

- El nominativo marca normalmente el **sujeto**, es decir, la persona o cosa que realiza la acción o sobre la que se afirma algo.
- **Pregunta de identificación:** `Wer?` para personas y `Was?` para cosas.
- **Estructura / Fórmula:** `Sujeto en Nominativ + verbo + complementos`
- **Ejemplo:** **Der Junge** spielt Fußball.
  - `Wer spielt Fußball?` → **Der Junge**.
- Una palabra presentada de forma aislada suele aparecer en nominativo:
  - **der Name**, **die Wohnung**, **das Buch**.

> **Corrección conceptual:** el nominativo sí tiene formas declinadas. Se considera el caso básico, pero artículos, posesivos y adjetivos cambian según género y número.

##### Nominativo con verbos copulativos

Los verbos **sein**, **werden** y **bleiben** enlazan el sujeto con una identidad, profesión o característica. El sustantivo predicativo permanece en nominativo.

| Verbo | Ejemplo | Análisis |
| :--- | :--- | :--- |
| sein | Andy ist mein Name. | **Andy** y **mein Name** están en nominativo. |
| werden | Mein Sohn wird ein Pilot. | **Mein Sohn** y **ein Pilot** están en nominativo. |
| bleiben | Er bleibt Lehrer. | **Er** y **Lehrer** están en nominativo. |

- **Fórmula:** `Nominativ + sein/werden/bleiben + Nominativ`
- Las profesiones suelen aparecer sin artículo después de estos verbos:
  - **Mein Sohn wird Pilot.**
  - **Er bleibt Lehrer.**
- El artículo puede aparecer cuando el sustantivo lleva una descripción:
  - **Er ist ein guter Lehrer.**

##### Artículos y determinantes en nominativo

| Significado | Masculino | Femenino | Neutro | Plural |
| :--- | :--- | :--- | :--- | :--- |
| Artículo determinado | der | die | das | die |
| Artículo indeterminado | ein | eine | ein | — |
| Negación con `kein-` | kein | keine | kein | keine |

- **Masculino:** **Der Junge** spielt Fußball.
- **Femenino:** **Die Waschmaschine** ist kaputt.
- **Neutro:** **Kein Buch** ist blau.
- **Plural:** **Die Wohnungen** sind klein.
- El artículo indeterminado no tiene forma plural. Para una cantidad indefinida pueden usarse, según el contexto, el sustantivo sin artículo o palabras como **einige**:
  - **Wohnungen sind teuer.**
  - **Einige Wohnungen sind klein.**

##### Determinantes posesivos en nominativo

Los posesivos siguen el patrón de **ein-**. La forma depende del género y número del sustantivo poseído.

| Poseedor | Masculino | Femenino | Neutro | Plural |
| :--- | :--- | :--- | :--- | :--- |
| ich | mein | meine | mein | meine |
| du | dein | deine | dein | deine |
| er / es | sein | seine | sein | seine |
| sie (ella) | ihr | ihre | ihr | ihre |
| wir | unser | unsere | unser | unsere |
| ihr (vosotros/as) | euer | eure | euer | eure |
| sie (ellos/as) | ihr | ihre | ihr | ihre |
| Sie (formal) | Ihr | Ihre | Ihr | Ihre |

- **Sein Bruder** spielt Fußball. → Su hermano (de él).
- **Meine Waschmaschine** ist kaputt. → Mi lavadora.
- **Dein Buch** ist blau. → Tu libro.
- **Unsere Wohnungen** sind klein. → Nuestros apartamentos.
- **Ihr Buch** puede significar «su libro» de ella o de ellos, según el contexto.
- **Ihr Buch** con mayúscula puede significar «su libro» de usted.

##### Declinación de adjetivos en nominativo

###### Después de artículo determinado

| Género / número | Estructura | Ejemplo |
| :--- | :--- | :--- |
| Masculino | der + adjetivo-**e** | der kleine Bruder |
| Femenino | die + adjetivo-**e** | die alte Waschmaschine |
| Neutro | das + adjetivo-**e** | das blaue Buch |
| Plural | die + adjetivo-**en** | die schönen Wohnungen |

###### Después de `ein-`, `kein-` o posesivo

| Género / número | Terminación | Ejemplo |
| :--- | :--- | :--- |
| Masculino | -**er** | ein kleiner Bruder |
| Femenino | -**e** | eine alte Waschmaschine |
| Neutro | -**es** | mein blaues Buch |
| Plural | -**en** | unsere schönen Wohnungen |

###### Sin determinante

| Género / número | Terminación | Ejemplo |
| :--- | :--- | :--- |
| Masculino | -**er** | kleiner Hund |
| Femenino | -**e** | alte Waschmaschine |
| Neutro | -**es** | blaues Buch |
| Plural | -**e** | schöne Wohnungen |

- **Regla / Concepto:** cuando el determinante no muestra claramente el género, el adjetivo lleva una terminación informativa.
- **Comparación:**
  - **der kleine Bruder**
  - **ein kleiner Bruder**
  - **kleiner Bruder**

##### Adjetivo atributivo y predicativo

- Delante de un sustantivo, el adjetivo se declina:
  - **Das blaue Buch** ist da.
- Después de **sein**, **werden** o **bleiben**, el adjetivo no recibe terminación:
  - Das Buch ist **blau**.
  - Die Waschmaschine bleibt **kaputt**.

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Wie ist dein Name?**  
> *Traducción:* ¿Cuál es tu nombre?  
> *Uso:* Preguntar el nombre; en conversación es más habitual **Wie heißt du?**

> **Mein Name ist Andy.**  
> *Traducción:* Mi nombre es Andy.  
> *Uso:* Presentarse.

> **Wie heißt du?**  
> *Traducción:* ¿Cómo te llamas?  
> *Uso:* Preguntar informalmente el nombre.

> **Was ist das?**  
> *Traducción:* ¿Qué es eso?  
> *Uso:* Identificar un objeto.

> **Das ist mein Buch.**  
> *Traducción:* Este es mi libro.  
> *Uso:* Identificar una pertenencia.

> **Wer spielt Fußball?**  
> *Traducción:* ¿Quién juega al fútbol?  
> *Uso:* Localizar el sujeto de persona.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** no confundas el nominativo masculino **der** con el acusativo masculino **den**.
- ⚠️ **Atención:** después de **sein**, **werden** y **bleiben**, un sustantivo predicativo se mantiene en nominativo.
- ⚠️ **Atención:** no existe el artículo indeterminado plural; evita construcciones como `*eine Wohnungen`.
- ⚠️ **Atención:** **euer** pierde una `e` al recibir ciertas terminaciones: **eure**, no `*euere` en el uso estándar habitual.
- ⚠️ **Atención:** el posesivo concuerda con el objeto poseído: **sein Bruder**, pero **seine Schwester**.
- ⚠️ **Atención:** el adjetivo predicativo no se declina: **Das Buch ist blau**, no `*Das Buch ist blaues`.
- ⚠️ **Atención:** **Mein Sohn wird Pilot** es la formulación más natural para indicar profesión; **ein Pilot** es posible cuando se clasifica o describe.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: ¿Qué caso se usa normalmente para el sujeto?
  A: Nominativ.
  Type: flashcard
- Q: Identifica el nominativo: Der Junge spielt Fußball.
  A: Der Junge.
  Type: identification
- Q: Completa: ____ Junge spielt Fußball. (artículo determinado)
  A: Der
  Type: fill-in-the-blank
- Q: Completa: ____ Waschmaschine ist kaputt. (artículo determinado)
  A: Die
  Type: fill-in-the-blank
- Q: Completa: ____ Buch ist blau. (negación con kein-)
  A: Kein
  Type: fill-in-the-blank
- Q: Completa: ____ Wohnungen sind klein. (artículo determinado)
  A: Die
  Type: fill-in-the-blank
- Q: Completa: Das ist ____ Buch. (ich)
  A: mein
  Type: fill-in-the-blank
- Q: Completa: ____ Bruder spielt Fußball. (er)
  A: Sein
  Type: fill-in-the-blank
- Q: Completa: ____ Waschmaschine ist kaputt. (ich)
  A: Meine
  Type: fill-in-the-blank
- Q: Completa: ____ Wohnungen sind klein. (wir)
  A: Unsere
  Type: fill-in-the-blank
- Q: Completa: der klein____ Bruder.
  A: kleine
  Type: fill-in-the-blank
- Q: Completa: ein klein____ Bruder.
  A: kleiner
  Type: fill-in-the-blank
- Q: Completa: die alt____ Waschmaschine.
  A: alte
  Type: fill-in-the-blank
- Q: Completa: mein blau____ Buch.
  A: blaues
  Type: fill-in-the-blank
- Q: Completa: unsere schön____ Wohnungen.
  A: schönen
  Type: fill-in-the-blank
- Q: Completa sin determinante: ____ Buch ist da. (blau)
  A: Blaues
  Type: fill-in-the-blank
- Q: Elige la opción correcta: Das Buch ist blau / Das Buch ist blaues.
  A: Das Buch ist blau.
  Type: multiple-choice
- Q: Corrige el error: Eine Wohnungen sind klein.
  A: Einige Wohnungen sind klein. / Wohnungen sind klein.
  Type: correction
- Q: Completa con nominativo: Mein Sohn wird _____. (Pilot)
  A: Pilot
  Type: fill-in-the-blank
- Q: ¿Qué tres verbos suelen unir dos elementos en nominativo?
  A: sein, werden y bleiben.
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 04 — El caso acusativo

*Nivel orientativo:* **A1** · *Alcance A1 de esta app:* ✅

---
class_id: 004
title: "El caso acusativo"
level: "A1"
topics: ["Gramática", "Acusativo", "Pronombres personales", "Determinantes", "Posesivos", "Declinación de adjetivos", "Verbos", "Preposiciones"]
target_exam: "Telc / Goethe A1"
---

### El caso acusativo

#### 1. 🎯 Resumen / Objetivos de la Lección
- Reconocer el acusativo como caso habitual del objeto directo.
- Distinguir el sujeto en nominativo del objeto en acusativo.
- Declinar pronombres, artículos, posesivos y adjetivos en acusativo.
- Identificar verbos frecuentes que exigen acusativo.
- Usar las preposiciones de acusativo más importantes del nivel A1.
- Evitar errores frecuentes, especialmente en el masculino singular.

#### 2. 📚 Vocabulario Clave (Wortschatz)
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Hund, -e | el perro | Sustantivo | Er liebt **den Hund**. |
| die Katze, -n | el gato; la gata | Sustantivo | Wir haben **eine Katze**. |
| das Auto, -s | el coche | Sustantivo | Unser Vater braucht **ein Auto**. |
| das Gemüse, - | la verdura; las verduras | Sustantivo colectivo | Meine Oma isst **das Gemüse**. |
| die Hausaufgabe, -n | el deber; la tarea | Sustantivo | Plural habitual: **die Hausaufgaben**. |
| der Kaffee, -s | el café | Sustantivo | Ich trinke **einen Kaffee**. |
| der Film, -e | la película | Sustantivo | Wir sehen **einen Film**. |
| die Fahrkarte, -n | el billete de transporte | Sustantivo | Ich kaufe **eine Fahrkarte**. |
| das Brot, -e | el pan | Sustantivo | Er kauft **das Brot**. |
| der Park, -s | el parque | Sustantivo | Wir gehen durch **den Park**. |
| der Bahnhof, Bahnhöfe | la estación de tren | Sustantivo | Sie gehen um **den Bahnhof**. |
| haben | tener | Verbo irregular + Akkusativ | Ich habe **einen Bruder**. |
| brauchen | necesitar | Verbo regular + Akkusativ | Wir brauchen **ein Auto**. |
| lieben | amar; encantar | Verbo regular + Akkusativ | Er liebt **seinen Hund**. |
| sehen | ver | Verbo irregular + Akkusativ | Ich sehe **meine Katze**. |
| essen | comer | Verbo irregular + Akkusativ | Sie isst **das Gemüse**. |
| trinken | beber | Verbo irregular + Akkusativ | Er trinkt **einen Tee**. |
| kaufen | comprar | Verbo regular + Akkusativ | Ich kaufe **eine Fahrkarte**. |
| machen | hacer | Verbo regular + Akkusativ | Lisa macht **die Hausaufgaben**. |
| finden | encontrar; opinar | Verbo irregular + Akkusativ | Ich finde **den Schlüssel**. |
| besuchen | visitar | Verbo regular inseparable + Akkusativ | Wir besuchen **unsere Freunde**. |
| fahren | conducir; ir en vehículo | Verbo irregular | Sie fährt **ihr neues Auto**. |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### Cómo reconocer el acusativo

- El acusativo marca frecuentemente el objeto directo: la persona o cosa afectada directamente por la acción.
- **Preguntas:** `Wen?` para personas y `Was?` para cosas.
- **Estructura / Fórmula:** `Sujeto (Nominativ) + verbo + objeto (Akkusativ)`
- **Ejemplo:** Lisa macht **die Hausaufgaben**.
  - `Wer macht die Hausaufgaben?` → **Lisa** (nominativo).
  - `Was macht Lisa?` → **die Hausaufgaben** (acusativo).
- En español suele corresponder al complemento directo y puede sustituirse por «lo, la, los, las», pero esta equivalencia no debe aplicarse mecánicamente.
- Los complementos nominales de **sein**, **werden** y **bleiben** no son objetos de acusativo:
  - Er ist **ein Lehrer**. (nominativo)

##### Pronombres personales en acusativo

| Persona | Nominativ | Akkusativ | Español aproximado |
| :--- | :--- | :--- | :--- |
| ich | ich | mich | me |
| du | du | dich | te |
| er | er | ihn | lo / a él |
| sie (ella) | sie | sie | la / a ella |
| es | es | es | lo |
| wir | wir | uns | nos |
| ihr | ihr | euch | os |
| sie (ellos/as) | sie | sie | los / las |
| Sie (formal) | Sie | Sie | lo / la / los / las / a usted(es) |

- Er liebt **dich**. → Te quiere.
- Ich sehe **ihn**. → Lo veo.
- Sie besucht **uns**. → Nos visita.
- Ich frage **Sie**. → Le pregunto a usted.

##### Determinantes en acusativo

| Tipo | Masculino | Femenino | Neutro | Plural |
| :--- | :--- | :--- | :--- | :--- |
| Artículo determinado | den | die | das | die |
| Artículo indeterminado | einen | eine | ein | — |
| Negación con `kein-` | keinen | keine | kein | keine |

- Solo el masculino singular muestra una diferencia visible respecto al nominativo:
  - `der Hund` → Ich sehe **den Hund**.
  - `ein Hund` → Ich sehe **einen Hund**.
  - `kein Hund` → Ich sehe **keinen Hund**.
- Femenino, neutro y plural mantienen las mismas formas externas que en nominativo:
  - **eine Katze**, **ein Auto**, **die Bücher**.
- No existe artículo indeterminado plural. Puede usarse el sustantivo sin artículo o **einige**:
  - Ich kaufe **Bücher**.
  - Ich kaufe **einige Bücher**.

##### Determinantes posesivos en acusativo

| Poseedor | Masculino | Femenino | Neutro | Plural |
| :--- | :--- | :--- | :--- | :--- |
| ich | meinen | meine | mein | meine |
| du | deinen | deine | dein | deine |
| er / es | seinen | seine | sein | seine |
| sie (ella) | ihren | ihre | ihr | ihre |
| wir | unseren | unsere | unser | unsere |
| ihr | euren | eure | euer | eure |
| sie (ellos/as) | ihren | ihre | ihr | ihre |
| Sie (formal) | Ihren | Ihre | Ihr | Ihre |

- Er liebt **seinen Hund**.
- Ich sehe **meine Katze**.
- Unser Vater braucht **euer Auto**.
- Wir besuchen **unsere Freunde**.

##### Declinación de adjetivos en acusativo

###### Después de artículo determinado

| Género / número | Estructura | Ejemplo |
| :--- | :--- | :--- |
| Masculino | den + adjetivo-**en** | den alten Hund |
| Femenino | die + adjetivo-**e** | die schöne Katze |
| Neutro | das + adjetivo-**e** | das neue Auto |
| Plural | die + adjetivo-**en** | die leckeren Äpfel |

###### Después de `ein-`, `kein-` o posesivo

| Género / número | Terminación | Ejemplo |
| :--- | :--- | :--- |
| Masculino | -**en** | einen alten Hund / meinen roten Hund |
| Femenino | -**e** | eine schöne Katze / meine rote Tasche |
| Neutro | -**es** | ein neues Auto / mein rotes Buch |
| Plural | -**en** | keine alten Autos / unsere roten Bücher |

###### Sin determinante

| Género / número | Terminación | Ejemplo |
| :--- | :--- | :--- |
| Masculino | -**en** | roten Wein |
| Femenino | -**e** | kalte Milch |
| Neutro | -**es** | frisches Brot |
| Plural | -**e** | rote Äpfel |

##### Verbos frecuentes con acusativo

| Verbo | Significado | Ejemplo |
| :--- | :--- | :--- |
| haben | tener | Ich habe **einen Hund**. |
| brauchen | necesitar | Wir brauchen **einen Tisch**. |
| sehen | ver | Sie sieht **den Mann**. |
| hören | oír; escuchar | Ich höre **die Musik**. |
| finden | encontrar | Er findet **den Schlüssel**. |
| kaufen | comprar | Wir kaufen **das Brot**. |
| essen | comer | Sie isst **einen Apfel**. |
| trinken | beber | Er trinkt **einen Kaffee**. |
| lieben | amar; encantar | Ich liebe **diese Stadt**. |
| mögen | gustar | Ich mag **diesen Film**. |
| besuchen | visitar | Wir besuchen **unsere Oma**. |
| fragen | preguntar a alguien | Ich frage **den Lehrer**. |

##### Preposiciones que rigen acusativo

| Preposición | Significado básico | Ejemplo |
| :--- | :--- | :--- |
| durch | por; a través de | Wir gehen durch **den Park**. |
| für | para | Das Geschenk ist für **meinen Vater**. |
| gegen | contra; aproximadamente | Er fährt gegen **die Wand**. |
| ohne | sin | Ich trinke Kaffee ohne **Milch**. |
| um | alrededor de; a | Wir gehen um **den See**. |

- **Fórmula mnemotécnica:** `durch – für – gegen – ohne – um + Akkusativ`
- Contracciones frecuentes:
  - `für das` → **fürs**
  - `um das` → **ums**

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Ich brauche einen Termin.**  
> *Traducción:* Necesito una cita.  
> *Uso:* Solicitar una cita o turno.

> **Ich hätte gern einen Kaffee.**  
> *Traducción:* Quisiera un café.  
> *Uso:* Pedir algo cortésmente.

> **Wie findest du den Film?**  
> *Traducción:* ¿Qué te parece la película?  
> *Uso:* Pedir una opinión.

> **Das ist für dich.**  
> *Traducción:* Esto es para ti.  
> *Uso:* Entregar algo a otra persona.

> **Ich verstehe Sie nicht.**  
> *Traducción:* No le entiendo.  
> *Uso:* Indicar formalmente que no se ha comprendido.

> **Kannst du mich hören?**  
> *Traducción:* ¿Puedes oírme?  
> *Uso:* Comprobar el audio o la comunicación.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** en acusativo masculino: `der → den`, `ein → einen`, `kein → keinen`.
- ⚠️ **Atención:** el pronombre masculino cambia de **er** a **ihn**, no a `*ihm`; **ihm** es dativo.
- ⚠️ **Atención:** **Gemüse** se usa normalmente como sustantivo colectivo neutro singular: **das Gemüse**, no `*die Gemüse`.
- ⚠️ **Atención:** **lieben** significa «amar» o «encantar»; no equivale en todos los contextos al verbo español «querer».
- ⚠️ **Atención:** **fragen** rige acusativo para la persona: **Ich frage ihn**.
- ⚠️ **Atención:** las preposiciones **durch, für, gegen, ohne, um** exigen acusativo.
- ⚠️ **Atención:** **euer** se convierte en **euren** ante un sustantivo masculino en acusativo.
- ⚠️ **Atención:** con un posesivo y un sustantivo masculino, tanto el posesivo como el adjetivo terminan en `-en`: **meinen alten Hund**.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: Identifica el acusativo: Lisa macht die Hausaufgaben.
  A: die Hausaufgaben
  Type: identification
- Q: Completa: Ich sehe ____ Hund. (der)
  A: den
  Type: fill-in-the-blank
- Q: Completa: Er hat ____ Bruder. (ein)
  A: einen
  Type: fill-in-the-blank
- Q: Completa: Wir haben ____ Katze. (ein)
  A: eine
  Type: fill-in-the-blank
- Q: Completa: Unser Vater braucht ____ Auto. (ein)
  A: ein
  Type: fill-in-the-blank
- Q: Sustituye el objeto: Ich sehe den Mann.
  A: Ich sehe ihn.
  Type: transformation
- Q: Sustituye el objeto: Er liebt die Frau.
  A: Er liebt sie.
  Type: transformation
- Q: Sustituye el objeto: Wir kaufen das Brot.
  A: Wir kaufen es.
  Type: transformation
- Q: Sustituye el objeto: Sie besucht ihre Freunde.
  A: Sie besucht sie.
  Type: transformation
- Q: Completa: Kannst du ____ hören? (ich)
  A: mich
  Type: fill-in-the-blank
- Q: Completa: Ich liebe ____. (du)
  A: dich
  Type: fill-in-the-blank
- Q: Completa: Er besucht ____. (wir)
  A: uns
  Type: fill-in-the-blank
- Q: Completa: Ich sehe ____ alten Hund. (mein)
  A: meinen
  Type: fill-in-the-blank
- Q: Completa: Wir kaufen ein neu____ Auto.
  A: neues
  Type: fill-in-the-blank
- Q: Completa: Sie sieht die schön____ Katze.
  A: schöne
  Type: fill-in-the-blank
- Q: Completa: Er kauft frisch____ Brot. (sin determinante)
  A: frisches
  Type: fill-in-the-blank
- Q: Completa: Das Geschenk ist ____ meinen Vater.
  A: für
  Type: fill-in-the-blank
- Q: Completa: Wir gehen ____ den Park.
  A: durch
  Type: fill-in-the-blank
- Q: Corrige el error: Meine Oma isst die Gemüse.
  A: Meine Oma isst das Gemüse.
  Type: correction
- Q: ¿Qué preposiciones exigen siempre acusativo?
  A: durch, für, gegen, ohne y um.
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 05 — Verbos y preposiciones que rigen acusativo

*Nivel orientativo:* **A1** · *Alcance A1 de esta app:* ✅

---
class_id: 005
title: "Verbos y preposiciones que rigen acusativo"
level: "A2"
topics: ["Gramática", "Acusativo", "Verbos", "Preposiciones", "Vocabulario"]
target_exam: "Telc / Goethe A2"
---

### Verbos y preposiciones que rigen acusativo

#### 1. 🎯 Resumen / Objetivos de la Lección
- Reconocer verbos frecuentes que pueden llevar un objeto en acusativo.
- Distinguir verbos separables, inseparables, irregulares y reflexivos.
- Usar correctamente **bis, durch, entlang, für, gegen, ohne, um** y **wider**.
- Aplicar el acusativo a sustantivos, pronombres y expresiones de uso cotidiano.
- Consolidar el vocabulario del bloque con artículos y plurales corregidos.

#### 2. 📚 Vocabulario Clave (Wortschatz)
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Name, -n | el nombre | Sustantivo | Tragen Sie **Ihren Namen** ein. |
| der Buchstabe, -n | la letra | Sustantivo | Kreuzen Sie **den Buchstaben** an. |
| der Hund, -e | el perro | Sustantivo | Die Familie liebt **ihren Hund**. |
| der Pilot, -en | el piloto | Sustantivo | Sustantivo masculino débil. |
| der Lehrer, - | el profesor | Sustantivo | Ich frage **den Lehrer**. |
| der Bruder, Brüder | el hermano | Sustantivo | Ich habe **einen Bruder**. |
| der Fußball, Fußbälle | el balón de fútbol; el fútbol | Sustantivo | Fußball spielen. |
| der Sohn, Söhne | el hijo | Sustantivo | Sie besucht **ihren Sohn**. |
| der Job, -s | el trabajo; el empleo | Sustantivo | Sie beginnt **einen neuen Job**. |
| der Kuchen, - | la tarta; el pastel | Sustantivo | Wir essen **den Kuchen**. |
| der Partner, - | el compañero; la pareja | Sustantivo | Fragen Sie **Ihren Partner**. |
| der Orangensaft, Orangensäfte | el zumo de naranja | Sustantivo | Anna trinkt **einen Orangensaft**. |
| der Termin, -e | la cita | Sustantivo | Ich sage **den Termin** ab. |
| der Schlüssel, - | la llave | Sustantivo | Ich habe **meinen Schlüssel** verloren. |
| der Weg, -e | el camino | Sustantivo | Ich gehe **diesen Weg** entlang. |
| der Fluss, Flüsse | el río | Sustantivo | Wir fahren durch **den Fluss**. |
| der See, -n | el lago | Sustantivo | Sie geht um **den See**. |
| der Preis, -e | el precio | Sustantivo | Die Preise steigen um 1,75 %. |
| die Waschmaschine, -n | la lavadora | Sustantivo | Ich suche **eine Waschmaschine**. |
| die Wohnung, -en | el apartamento; la vivienda | Sustantivo | Sie mieten **eine Wohnung**. |
| die Klausur, -en | el examen escrito | Sustantivo | Sie besteht **die Klausur**. |
| die Schwester, -n | la hermana | Sustantivo | Meine Schwester beginnt einen Job. |
| die Katze, -n | el gato; la gata | Sustantivo | Ich nehme **meine Katze** auf. |
| die Oma, -s | la abuela | Sustantivo | Wir besuchen **unsere Oma**. |
| die Karotte, -n | la zanahoria | Sustantivo | Sie kauft fünf Karotten. |
| das Getränk, -e | la bebida | Sustantivo | Sie bringt **die Getränke**. |
| die Bäckerei, -en | la panadería | Sustantivo | Wo finde ich **eine Bäckerei**? |
| die Brille, -n | las gafas | Sustantivo singular en alemán | Ohne **die Brille** sieht sie nichts. |
| das Medikament, -e | el medicamento | Sustantivo | Er nimmt **seine Medikamente**. |
| die Reise, -n | el viaje | Sustantivo | Wir planen **eine Reise**. |
| die Kamera, -s | la cámara | Sustantivo | Ich will **eine neue Kamera**. |
| die Stadt, Städte | la ciudad | Sustantivo | Ich zeige euch **die Stadt**. |
| die Bewerbung, -en | la solicitud; la candidatura | Sustantivo | Ich schicke **die Bewerbung**. |
| die Erwartung, -en | la expectativa | Sustantivo | wider alle Erwartungen |
| die Prognose, -n | el pronóstico | Sustantivo | wider alle Prognosen |
| das Buch, Bücher | el libro | Sustantivo | Er liest **ein Buch**. |
| das Fahrrad, Fahrräder | la bicicleta | Sustantivo | Wo stellst du **dein Fahrrad** ab? |
| das Auto, -s | el coche | Sustantivo | Ich fahre **dieses Auto** nicht. |
| das Zimmer, - | la habitación | Sustantivo | Ich räume **mein Zimmer** auf. |
| das Handy, -s | el teléfono móvil | Sustantivo | Ich habe **ein Handy**. |
| das Bügeleisen, - | la plancha | Sustantivo | Er kauft **ein Bügeleisen**. |
| das Gemüse, - | la verdura; las verduras | Sustantivo colectivo | Normalmente neutro singular. |
| das Gefühl, -e | el sentimiento; la sensación | Sustantivo | Ich kenne **das Gefühl**. |
| das Wochenende, -n | el fin de semana | Sustantivo | am Wochenende |
| das Geschenk, -e | el regalo | Sustantivo | Das Geschenk ist für dich. |
| das Gesetz, -e | la ley | Sustantivo | wider das Gesetz |
| kaputt | roto; averiado | Adjetivo | Die Waschmaschine ist kaputt. |
| blau | azul | Adjetivo | ein blaues Fahrrad |
| klein | pequeño | Adjetivo | ein kleines Zimmer |
| rot | rojo | Adjetivo | eine rote Kamera |
| schön | bonito | Adjetivo | eine schöne Stadt |
| alt | viejo; antiguo | Adjetivo | ein alter Hund |
| braun | marrón | Adjetivo | Der Hund ist braun. |
| neu | nuevo | Adjetivo | ein neues Auto |
| da | ahí; allí | Adverbio | Das Buch ist da. |
| weit weg | lejos | Expresión adverbial | Die Stadt ist weit weg. |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### Verbos frecuentes con objeto en acusativo

| Verbo | Clasificación | Español | Ejemplo |
| :--- | :--- | :--- | :--- |
| abgeben | regular separable + Akk. | entregar | Sie gibt einen Kinderwagen ab. |
| abholen | regular separable + Akk. | recoger | Er holt sie ab. |
| absagen | regular separable + Akk. | cancelar | Ich sage meinen Arzttermin ab. |
| abschließen | irregular separable + Akk. | cerrar con llave; terminar | Schließen Sie die Haustür ab. |
| abstellen | regular separable + Akk. | dejar; estacionar | Wo stellst du dein Fahrrad ab? |
| anbraten | irregular separable + Akk. | sofreír | Er brät die Zwiebel an. |
| angeben | irregular separable + Akk. | indicar | Geben Sie die Uhrzeit an. |
| anhalten | irregular separable + Akk. | detener | Er hält das Taxi an. |
| ankreuzen | regular separable + Akk. | marcar con una cruz | Kreuzen Sie das Wort an. |
| anmachen | regular separable + Akk. | encender | Lukas macht den Fernseher an. |
| anmelden | regular separable + Akk. | inscribir; registrar | Ich melde meinen Urlaub an. |
| anrufen | irregular separable + Akk. | llamar por teléfono | Er ruft sie an. |
| anschauen | regular separable + Akk. | mirar | Schauen Sie die Fotos an. |
| anstellen | regular separable + Akk. | contratar | Die Firma stellt viele Menschen an. |
| aufnehmen | irregular separable + Akk. | grabar; acoger | Ich nehme das Gespräch auf. |
| aufräumen | regular separable + Akk. | ordenar | Ich räume mein Zimmer auf. |
| ausdrücken | regular separable + Akk. | expresar | Er drückt seine Wünsche aus. |
| ausfüllen | regular separable + Akk. | rellenar | Füllen Sie das Formular aus. |
| ausgeben | irregular separable + Akk. | gastar | Die Familie gibt viel Geld aus. |
| ausmachen | regular separable + Akk. | apagar; acordar | Er macht den Computer aus. |
| auspacken | regular separable + Akk. | desembalar | Sie packen die Kartons aus. |
| auswählen | regular separable + Akk. | elegir | Wählen Sie ein Foto aus. |
| backen | irregular + Akk. | hornear | Hast du drei Kuchen gebacken? |
| beginnen | irregular inseparable + Akk. | comenzar | Sie beginnt einen neuen Job. |
| begrüßen | regular inseparable + Akk. | saludar | Sie begrüßt Frau Wohlfahrt. |
| bekommen | irregular inseparable + Akk. | recibir | Er bekommt wenig Geld. |
| benutzen | regular inseparable + Akk. | usar | Sie benutzt die Schere. |
| beschreiben | irregular inseparable + Akk. | describir | Sie beschreibt den Gegenstand. |
| besuchen | regular inseparable + Akk. | visitar | Sie besucht ihren Vater. |
| bestehen | irregular inseparable + Akk. | aprobar | Sie hat die Klausur bestanden. |
| bezahlen | regular inseparable + Akk. | pagar | Ich bezahle meine Miete. |
| brauchen | regular + Akk. | necesitar | Wir brauchen ein Auto. |
| bringen | irregular + Akk. | traer | Sie bringt die Getränke. |
| einkaufen | regular separable + Akk. | comprar | Sie kauft fünf Tomaten ein. |
| einladen | irregular separable + Akk. | invitar | Ich lade dich ein. |
| eintragen | irregular separable + Akk. | anotar; inscribir | Tragen Sie Ihren Namen ein. |
| erklären | regular + Akk.; también Dat. + Akk. | explicar | Können Sie das erklären? |
| erzählen | regular + Akk.; también Dat. + Akk. | contar | Meine Oma erzählt uns viele Geschichten. |
| essen | irregular + Akk. | comer | Wir essen den leckeren Kuchen. |
| fahren | irregular; transitivo o intransitivo | conducir; viajar | Ich fahre dieses Auto nicht. |
| finden | irregular + Akk. | encontrar | Wo finde ich eine Bäckerei? |
| fragen | regular + Akk. | preguntar a alguien | Fragen Sie Ihren Partner. |
| geben | irregular + Dat. + Akk. | dar | Geben Sie mir sechs Eier. |
| haben | irregular + Akk. | tener | Ich habe ein Handy. |
| heiraten | regular + Akk. | casarse con | Sie heiratet ihren Freund. |
| holen | regular + Akk. | ir a buscar | Ich hole ein Kilo Zwiebeln. |
| hören | regular + Akk. | oír | Ich höre dich. |
| kaufen | regular + Akk. | comprar | Er kauft ein Bügeleisen. |
| kennen | irregular + Akk. | conocer | Ich kenne das Gefühl. |
| kennenlernen | regular separable + Akk. | conocer a alguien | Ich lerne viele Leute kennen. |
| kochen | regular + Akk. | cocinar | Wir kochen eine Suppe. |
| korrigieren | regular en `-ieren` + Akk. | corregir | Ich korrigiere die Hausaufgaben. |
| lernen | regular + Akk. | aprender | Wir lernen die neuen Wörter. |
| lesen | irregular + Akk. | leer | Er liest ein Buch. |
| lieben | regular + Akk. | amar; encantar | Die Familie liebt ihren Hund. |
| machen | regular + Akk. | hacer | Ich mache die Hausaufgaben. |
| mieten | regular + Akk. | alquilar | Sie mieten eine Wohnung. |
| möchten | forma de cortesía + Akk. | quisiera | Ich möchte eine Tasse Kaffee. |
| mögen | modal irregular + Akk. | gustar | Ich mag deine Brille. |
| nehmen | irregular + Akk. | tomar | Er nimmt seine Medikamente. |
| nennen | irregular + doble Akk. | llamar; denominar | Sie nennt ihre Katze Missy. |
| organisieren | regular en `-ieren` + Akk. | organizar | Die Eltern organisieren die Spiele. |
| planen | regular + Akk. | planear | Wir planen eine Reise. |
| reservieren | regular en `-ieren` + Akk. | reservar | Wir reservieren ein Doppelzimmer. |
| schicken | regular + Akk. | enviar | Die Ärztin schickt die Frau ins Krankenhaus. |
| schreiben | irregular + Akk. | escribir | Sie schreibt das Wort. |
| sehen | irregular + Akk. | ver | Er sieht seine Freundin. |
| suchen | regular + Akk. | buscar | Ich suche eine Waschmaschine. |
| sich treffen | irregular reflexivo (Akk.) | encontrarse | Wir treffen uns im Café. |
| trinken | irregular + Akk. | beber | Anna trinkt einen Orangensaft. |
| üben | regular + Akk. | practicar | Wir üben die Dialoge. |
| unterschreiben | irregular inseparable + Akk. | firmar | Ich unterschreibe den Vertrag. |
| verstehen | irregular inseparable + Akk. | entender | Ich verstehe dich nicht. |
| vergessen | irregular inseparable + Akk. | olvidar | Sie hat den Termin vergessen. |
| verkaufen | regular inseparable + Akk. | vender | Wir verkaufen den Kühlschrank. |
| verlieren | irregular inseparable + Akk. | perder | Ich habe meinen Schlüssel verloren. |
| wiederholen | regular inseparable + Akk. | repetir | Wiederholen Sie die Geschichte. |
| wollen | modal irregular + Akk. | querer | Ich will eine neue Kamera. |
| zeigen | regular + Dat. + Akk. | mostrar | Ich zeige euch die Stadt. |

> **Nota:** que un verbo pueda llevar acusativo no significa que todos sus usos sean transitivos. Algunos admiten también dativo, complementos preposicionales u oraciones subordinadas.

##### Preposiciones que rigen acusativo

| Preposición | Uso | Ejemplo | Traducción |
| :--- | :--- | :--- | :--- |
| bis | límite temporal o local | bis nächsten Montag | hasta el lunes que viene |
| durch | movimiento a través; medio | durch den Fluss | a través del río |
| entlang | recorrido paralelo; suele ir después | den Fluss entlang | a lo largo del río |
| für | destinatario, finalidad, precio o duración | für dich; für fünf Euro | para ti; por cinco euros |
| gegen | oposición, dirección o tiempo aproximado | gegen die Wand; gegen neun Uhr | contra la pared; sobre las nueve |
| ohne | ausencia | ohne dich; ohne die Brille | sin ti; sin las gafas |
| um | hora, alrededor o variación | um neun Uhr; um den See | a las nueve; alrededor del lago |
| wider | contra; registro formal | wider das Gesetz | contra la ley |

- **bis** suele aparecer sin artículo: **bis Montag**, **bis Berlin**. Con artículo se combina frecuentemente con otra preposición: **bis zum Montag**.
- **durch** también expresa división: **Zehn geteilt durch fünf ist zwei.**
- **entlang** se enseña en A1 como posposición con acusativo: **diesen Weg entlang**.
- Contracción: `für das` → **fürs**.
- **wider** no es **wieder**:
  - **wider** = contra.
  - **wieder** = de nuevo.

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Füllen Sie bitte das Formular aus.**  
> *Traducción:* Rellene el formulario, por favor.  
> *Uso:* Instrucción formal en trámites.

> **Können Sie das bitte noch einmal erklären?**  
> *Traducción:* ¿Puede explicarlo otra vez, por favor?  
> *Uso:* Pedir una aclaración formal.

> **Ich verstehe dich nicht.**  
> *Traducción:* No te entiendo.  
> *Uso:* Indicar falta de comprensión.

> **Das Geschenk ist für dich.**  
> *Traducción:* El regalo es para ti.  
> *Uso:* Entregar un regalo.

> **Ich kann ohne dich nicht leben.**  
> *Traducción:* No puedo vivir sin ti.  
> *Uso:* Expresar dependencia afectiva.

> **Er kommt gegen neun Uhr.**  
> *Traducción:* Viene sobre las nueve.  
> *Uso:* Indicar una hora aproximada.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** **das Gemüse** es normalmente neutro singular colectivo, no `die Gemüse`.
- ⚠️ **Atención:** se escribe **das Gesetz**, no `das Gesetzt`.
- ⚠️ **Atención:** el plural correcto es **viele Geschichten**, no `viele Geschichte`.
- ⚠️ **Atención:** en alemán estándar es más natural **den Weg kennen** que `den Weg wissen`.
- ⚠️ **Atención:** **die Brille** es singular gramatical aunque se traduzca como «las gafas».
- ⚠️ **Atención:** los verbos separables colocan el prefijo al final en una oración principal: **Ich rufe dich an.**
- ⚠️ **Atención:** **entlang** suele colocarse después del sustantivo en el patrón de esta lección: **den Fluss entlang**.
- ⚠️ **Atención:** **wider** («contra») y **wieder** («otra vez») no son intercambiables.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: Completa: Ich rufe ____ an. (du)
  A: dich
  Type: fill-in-the-blank
- Q: Completa: Füllen Sie bitte ____ Formular aus. (das)
  A: das
  Type: fill-in-the-blank
- Q: Completa: Wir essen ____ leckeren Kuchen. (der)
  A: den
  Type: fill-in-the-blank
- Q: Completa: Geben Sie ____ bitte sechs Eier. (ich)
  A: mir
  Type: fill-in-the-blank
- Q: ¿Qué caso tiene mir en Geben Sie mir sechs Eier?
  A: Dativ.
  Type: flashcard
- Q: ¿Qué caso tiene sechs Eier en Geben Sie mir sechs Eier?
  A: Akkusativ.
  Type: flashcard
- Q: Ordena: an / ich / dich / rufe.
  A: Ich rufe dich an.
  Type: ordering
- Q: Completa: Das Geschenk ist ____ dich.
  A: für
  Type: fill-in-the-blank
- Q: Completa: Wir fahren ____ den Fluss.
  A: durch
  Type: fill-in-the-blank
- Q: Completa: Ich gehe diesen Weg ____.
  A: entlang
  Type: fill-in-the-blank
- Q: Completa: Sie kann ____ die Brille nicht sehen.
  A: ohne
  Type: fill-in-the-blank
- Q: Completa: Er kommt ____ neun Uhr.
  A: gegen
  Type: fill-in-the-blank
- Q: Completa: Sie geht ____ den See.
  A: um
  Type: fill-in-the-blank
- Q: Completa: Er handelt ____ das Gesetz.
  A: wider
  Type: fill-in-the-blank
- Q: Corrige: Meine Oma erzählt viele Geschichte.
  A: Meine Oma erzählt viele Geschichten.
  Type: correction
- Q: Corrige: Ich esse die Gemüse.
  A: Ich esse das Gemüse.
  Type: correction
- Q: Corrige la ortografía: wider das Gesetzt.
  A: wider das Gesetz.
  Type: correction
- Q: Traduce: ¿Puede repetir la historia?
  A: Können Sie die Geschichte wiederholen?
  Type: flashcard
- Q: ¿Qué diferencia hay entre wider y wieder?
  A: wider significa «contra»; wieder significa «de nuevo».
  Type: flashcard
- Q: ¿Dónde se coloca el prefijo de un verbo separable en una oración principal?
  A: Al final de la oración.
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 06 — Posesivos: determinantes y pronombres

*Nivel orientativo:* **A1** · *Alcance A1 de esta app:* ✅

---
class_id: 006
title: "Possessivartikel und Possessivpronomen"
level: "A2"
topics: ["Gramática", "Determinantes posesivos", "Pronombres posesivos", "Declinación", "Posesión"]
target_exam: "Telc / Goethe A2"
---

### Posesivos: determinantes y pronombres

#### 1. 🎯 Resumen / Objetivos de la Lección
- Distinguir los determinantes posesivos de los pronombres posesivos.
- Elegir la raíz posesiva según la persona que posee.
- Declinar el posesivo según el género, número y caso del elemento poseído.
- Preguntar y responder de quién es algo mediante **wessen**, **von wem** y **gehören**.
- Resolver ejercicios de posesivos en nominativo, acusativo y dativo.

#### 2. 📚 Vocabulario Clave (Wortschatz)
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Koffer, - | la maleta | Sustantivo | Das ist mein Koffer. |
| der Vater, Väter | el padre | Sustantivo | Das ist mein Vater. |
| die Mutter, Mütter | la madre | Sustantivo | Das ist meine Mutter. |
| die Katze, -n | el gato; la gata | Sustantivo | Meine Katzen heißen Monkey und Zoe. |
| der Hund, -e | el perro | Sustantivo | Wie heißt dein Hund? |
| das Auto, -s | el coche | Sustantivo | Er ist mit seinem Auto gekommen. |
| die Wohnung, -en | el apartamento; la vivienda | Sustantivo | Unsere Wohnung ist klein. |
| der Bruder, Brüder | el hermano | Sustantivo | Wo arbeitet Ihr Bruder? |
| die Tasche, -n | el bolso; la bolsa | Sustantivo | Ist das deine Tasche? |
| der Tisch, -e | la mesa | Sustantivo | Meine Tasche steht unter dem Tisch. |
| die Werkstatt, Werkstätten | el taller | Sustantivo | Mein Auto ist in der Werkstatt. |
| der Bleistift, -e | el lápiz | Sustantivo | Hast du meinen Bleistift gesehen? |
| die Uhr, -en | el reloj | Sustantivo | Wessen Uhr ist das? |
| die Frau, -en | la mujer; la esposa | Sustantivo | Er hat seine Frau kennengelernt. |
| das Haus, Häuser | la casa | Sustantivo | Wir haben unser Haus verkauft. |
| der Urlaub, -e | las vacaciones | Sustantivo | Wie war dein Urlaub? |
| die Lieblingsfarbe, -n | el color favorito | Sustantivo | Meine Lieblingsfarbe ist blau. |
| die Großmutter, Großmütter | la abuela | Sustantivo | Sie schicken ihrer Großmutter eine Postkarte. |
| die Postkarte, -n | la postal | Sustantivo | eine Postkarte schicken |
| die Freizeit | el tiempo libre | Sustantivo | Was macht ihr in eurer Freizeit? |
| der Schuh, -e | el zapato | Sustantivo | Wo sind meine Schuhe? |
| das Regal, -e | la estantería | Sustantivo | Sind sie in deinem Regal? |
| der Ball, Bälle | la pelota; el balón | Sustantivo | Wem gehört der Ball? |
| gehören | pertenecer | Verbo regular + Dativ | Die Uhr gehört mir. |
| leihen | prestar | Verbo irregular + Dat. + Akk. | Kannst du mir deins leihen? |
| verkaufen | vender | Verbo regular inseparable + Akk. | Wir haben unser Haus verkauft. |
| kennenlernen | conocer a alguien | Verbo regular separable + Akk. | Er hat seine Frau kennengelernt. |
| vergessen | olvidar | Verbo irregular inseparable + Akk. | Wir haben unsere vergessen. |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### Dos decisiones distintas

Para formar un posesivo hay que responder dos preguntas:

1. **¿Quién posee?** Esto determina la raíz: `mein-`, `dein-`, `sein-`, etc.
2. **¿Qué se posee y qué función cumple?** El género, número y caso del sustantivo poseído determinan la terminación.

- **Yo** poseo + **der Vater** en nominativo → **mein Vater**.
- **Yo** poseo + **die Mutter** en nominativo → **meine Mutter**.
- **Yo** poseo + **der Hund** en acusativo → **meinen Hund**.
- El posesivo no concuerda con el sexo de quien habla:
  - ✅ **Das ist mein Vater.**
  - ❌ `Das ist meine Vater.`

##### Raíces posesivas

| Poseedor | Raíz | Español aproximado |
| :--- | :--- | :--- |
| ich | mein- | mi |
| du | dein- | tu |
| er / es | sein- | su, de él / ello |
| sie (ella) | ihr- | su, de ella |
| wir | unser- | nuestro |
| ihr | euer- | vuestro |
| sie (ellos/as) | ihr- | su, de ellos/as |
| Sie (formal) | Ihr- | su, de usted(es) |

- **ihr-** puede corresponder a «de ella» o «de ellos/as».
- **Ihr-**, con mayúscula, corresponde al tratamiento formal.
- `euer-` pierde normalmente una `e` al añadir una terminación: **eure**, **euren**, **eurem**.

##### Possessivartikel: determinantes posesivos

El **Possessivartikel** acompaña a un sustantivo:

- **mein Koffer**
- **deine Tasche**
- **unser Haus**

Sigue el patrón de declinación de **ein-**.

| Caso | Masculino | Femenino | Neutro | Plural |
| :--- | :--- | :--- | :--- | :--- |
| Nominativ | mein | meine | mein | meine |
| Akkusativ | meinen | meine | mein | meine |
| Dativ | meinem | meiner | meinem | meinen |
| Genitiv | meines | meiner | meines | meiner |

El mismo patrón se aplica a las demás raíces:

| Caso / género | dein- | sein- | ihr- | unser- | euer- | Ihr- |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Nom. masc./neutro | dein | sein | ihr | unser | euer | Ihr |
| Nom. fem./plural | deine | seine | ihre | unsere | eure | Ihre |
| Akk. masculino | deinen | seinen | ihren | unseren | euren | Ihren |
| Akk. neutro | dein | sein | ihr | unser | euer | Ihr |
| Akk. fem./plural | deine | seine | ihre | unsere | eure | Ihre |
| Dat. masc./neutro | deinem | seinem | ihrem | unserem | eurem | Ihrem |
| Dat. femenino | deiner | seiner | ihrer | unserer | eurer | Ihrer |
| Dat. plural | deinen | seinen | ihren | unseren | euren | Ihren |
| Gen. masc./neutro | deines | seines | ihres | unseres | eures | Ihres |
| Gen. fem./plural | deiner | seiner | ihrer | unserer | eurer | Ihrer |

> En dativo plural, el sustantivo recibe además `-n` cuando es posible: **mit meinen Freunden**.

##### Possessivpronomen: pronombres posesivos

El **Possessivpronomen** sustituye al sustantivo ya mencionado:

- Ist das dein Auto? → Ja, das ist **meins**.
- Ist das deine Tasche? → Ja, das ist **meine**.

| Caso | Masculino | Femenino | Neutro | Plural |
| :--- | :--- | :--- | :--- | :--- |
| Nominativ | meiner | meine | meins | meine |
| Akkusativ | meinen | meine | meins | meine |
| Dativ | meinem | meiner | meinem | meinen |
| Genitiv | meines | meiner | meines | meiner |

Ejemplos con otras raíces:

| Referente omitido | ich | du | er / es | sie / sie | wir | ihr |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Nom. masculino | meiner | deiner | seiner | ihrer | unserer | eurer |
| Nom. femenino | meine | deine | seine | ihre | unsere | eure |
| Nom. neutro | meins | deins | seins | ihres | unseres | eures |
| Nom. plural | meine | deine | seine | ihre | unsere | eure |
| Akk. masculino | meinen | deinen | seinen | ihren | unseren | euren |
| Akk. fem./plural | meine | deine | seine | ihre | unsere | eure |
| Akk. neutro | meins | deins | seins | ihres | unseres | eures |
| Dat. masc./neutro | meinem | deinem | seinem | ihrem | unserem | eurem |
| Dat. femenino | meiner | deiner | seiner | ihrer | unserer | eurer |
| Dat. plural | meinen | deinen | seinen | ihren | unseren | euren |

- **Das ist meiner.** → Es el mío; el referente es masculino, por ejemplo **der Koffer**.
- **Das ist meine.** → Es la mía; el referente es femenino, por ejemplo **die Uhr**.
- **Das ist meins.** → Es el mío; el referente es neutro, por ejemplo **das Auto**.
- **Das sind meine.** → Son los míos / las mías; el referente es plural.

##### Preguntar y responder por la posesión

###### Con `wessen`

- **Wessen Uhr ist das?** → ¿De quién es este reloj?
- **Das ist meine.** → Es el mío / la mía; aquí **die Uhr** es femenino.

###### Con `von wem`

- **Von wem ist die Uhr?** → ¿De quién es el reloj?
- **Die Uhr ist von mir.** → El reloj es mío; literalmente, «es de mí».

`von + Dativ` es muy frecuente en la lengua hablada. No sustituye automáticamente al genitivo en todos los registros y construcciones.

###### Con `gehören`

- **Wem gehört die Uhr?** → ¿A quién pertenece el reloj?
- **Die Uhr gehört mir.** → El reloj me pertenece.

El verbo **gehören** exige dativo:

| Persona | Dativo |
| :--- | :--- |
| ich | mir |
| du | dir |
| er / es | ihm |
| sie | ihr |
| wir | uns |
| ihr | euch |
| sie | ihnen |
| Sie | Ihnen |

##### Ejercicios resueltos: Possessivartikel

| Ejercicio | Solución | Explicación |
| :--- | :--- | :--- |
| Nachmittags gehe ich mit ____ Hund spazieren. | **meinem** | `mit` + dativo; `der Hund` es masculino. |
| Er hat ____ Frau in Deutschland kennengelernt. | **seine** | `die Frau` está en acusativo femenino. |
| Wir haben ____ Haus verkauft. | **unser** | `das Haus` está en acusativo neutro. |
| Ich habe einen Bruder. ____ Bruder ist 14 Jahre alt. | **Mein** | `der Bruder` es sujeto en nominativo. |
| Hallo Vanessa, wie war ____ Urlaub? | **dein** | `der Urlaub` está en nominativo masculino. |
| Ich mag Blau. ____ Lieblingsfarbe ist Blau. | **Meine** | `die Lieblingsfarbe` es femenino nominativo. |
| Sie haben ____ Großmutter eine Postkarte geschickt. | **ihrer / Ihrer** | `ihrer` si «ellos»; `Ihrer` si «usted(es)». Dativo femenino. |
| Was macht ihr in ____ Freizeit? | **eurer** | `in` expresa ubicación; dativo femenino. |

##### Ejercicios resueltos: Possessivpronomen

| Ejercicio | Solución | Explicación |
| :--- | :--- | :--- |
| Ist das dein Auto? - Ja, das ist ____. | **meins** | `das Auto`: neutro nominativo. |
| Ist das die Tasche von Katrina? - Nein, das ist nicht ____. | **ihre** | `die Tasche`: femenino nominativo; poseedora `sie`. |
| Sind meine Schuhe in deinem Regal? - Nein, in ____ sind sie nicht. | **meinem** | Se omite `Regal`; dativo neutro tras `in` locativo. |
| Hast du in ____ geschaut? | **deinem** | Se omite `Regal`; dativo neutro. |
| Habt ihr eure Bücher mitgebracht? - Nein, wir haben ____ vergessen. | **unsere** | `die Bücher`: plural acusativo. |
| Wem gehört der Ball? - Das ist ____! | **meiner** | `der Ball`: masculino nominativo. |

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Wem gehört das?**  
> *Traducción:* ¿A quién pertenece esto?  
> *Uso:* Preguntar por el propietario.

> **Wessen Uhr ist das?**  
> *Traducción:* ¿De quién es este reloj?  
> *Uso:* Preguntar directamente por la posesión.

> **Das ist meins.**  
> *Traducción:* Es mío.  
> *Uso:* Sustituir un sustantivo neutro mencionado anteriormente.

> **Ist das deine Tasche?**  
> *Traducción:* ¿Es ese tu bolso?  
> *Uso:* Confirmar si un objeto pertenece a alguien.

> **Kannst du mir deins leihen?**  
> *Traducción:* ¿Puedes prestarme el tuyo?  
> *Uso:* Pedir prestado un objeto neutro.

> **Übung macht den Meister.**  
> *Traducción:* La práctica hace al maestro.  
> *Uso:* Animar a seguir practicando.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** el posesivo concuerda con lo poseído, no con el sexo de quien posee o habla.
- ⚠️ **Atención:** **ihr** puede significar «su, de ella» o «su, de ellos/as»; el contexto lo aclara.
- ⚠️ **Atención:** **Ihr** con mayúscula expresa posesión formal: **Ihr Bruder**.
- ⚠️ **Atención:** **euer** cambia a **eure**, **euren**, **eurem** o **eurer** al recibir terminación.
- ⚠️ **Atención:** no confundas el determinante **mein Auto** con el pronombre **meins**.
- ⚠️ **Atención:** después de **mit** siempre se usa dativo: **mit meinem Hund**.
- ⚠️ **Atención:** **gehören** exige dativo: **Das gehört mir**, no `*Das gehört mich`.
- ⚠️ **Atención:** los sustantivos y los tratamientos formales se escriben con mayúscula, pero los posesivos normales no: **ihr Bruder** frente a **Ihr Bruder**.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: ¿Qué determina la raíz de un posesivo alemán?
  A: La persona que posee.
  Type: flashcard
- Q: ¿Qué determina la terminación de un posesivo?
  A: El género, el número y el caso del elemento poseído.
  Type: flashcard
- Q: Completa: Das ist ____ Vater. (ich)
  A: mein
  Type: fill-in-the-blank
- Q: Completa: Das ist ____ Mutter. (ich)
  A: meine
  Type: fill-in-the-blank
- Q: Completa: Ich sehe ____ Vater. (du)
  A: deinen
  Type: fill-in-the-blank
- Q: Completa: Ich gehe mit ____ Hund spazieren. (ich)
  A: meinem
  Type: fill-in-the-blank
- Q: Completa: Wir haben ____ Haus verkauft. (wir)
  A: unser
  Type: fill-in-the-blank
- Q: Completa: Was macht ihr in ____ Freizeit? (ihr)
  A: eurer
  Type: fill-in-the-blank
- Q: Ist das dein Auto? - Ja, das ist ____.
  A: meins
  Type: fill-in-the-blank
- Q: Ist das deine Tasche? - Ja, das ist ____.
  A: meine
  Type: fill-in-the-blank
- Q: Wem gehört der Ball? - Das ist ____! (ich)
  A: meiner
  Type: fill-in-the-blank
- Q: Sind die Schuhe in deinem Regal? - Nein, in ____ sind sie nicht. (ich)
  A: meinem
  Type: fill-in-the-blank
- Q: Habt ihr eure Bücher? - Nein, wir haben ____ vergessen.
  A: unsere
  Type: fill-in-the-blank
- Q: Traduce: ¿De quién es este reloj?
  A: Wessen Uhr ist das? / Von wem ist die Uhr?
  Type: flashcard
- Q: Completa: Die Uhr gehört ____. (ich)
  A: mir
  Type: fill-in-the-blank
- Q: Corrige: Das ist meine Vater.
  A: Das ist mein Vater.
  Type: correction
- Q: Corrige: Das gehört mich.
  A: Das gehört mir.
  Type: correction
- Q: ¿Cuál es la diferencia entre ihr Bruder e Ihr Bruder?
  A: ihr Bruder significa «su hermano» de ella; Ihr Bruder es la forma formal «su hermano» de usted(es).
  Type: flashcard
- Q: ¿Es correcta la forma euer Freizeit?
  A: No. Debe ser eure Freizeit en nominativo/acusativo o eurer Freizeit en dativo/genitivo.
  Type: flashcard
- Q: Completa con las dos posibilidades: Sie haben ____ Großmutter eine Postkarte geschickt.
  A: ihrer (ellos) / Ihrer (usted o ustedes)
  Type: fill-in-the-blank
<!-- DATA_QUIZ_END -->


---


### Unidad 07 — El tiempo verbal Präsens

*Nivel orientativo:* **A1** · *Alcance A1 de esta app:* ✅

---
class_id: 007
title: "El tiempo verbal Präsens"
level: "A1"
topics: ["Gramática", "Präsens", "Conjugación", "Verbos regulares", "Verbos irregulares", "Futuro cercano"]
target_exam: "Telc / Goethe A1"
---

### El tiempo verbal Präsens

#### 1. 🎯 Resumen / Objetivos de la Lección
- Comprender los usos principales del **Präsens** alemán.
- Conjugar verbos regulares en presente.
- Memorizar la conjugación de **sein** y **haben**.
- Aplicar reglas ortográficas y reconocer cambios vocálicos.
- Expresar hábitos, hechos actuales, situaciones permanentes y acciones en curso.
- Hablar de un futuro cercano mediante el presente y una expresión temporal.
- Describir acciones iniciadas en el pasado que continúan con **seit**.

#### 2. 📚 Vocabulario Clave (Wortschatz)
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| das Präsens | el presente | Sustantivo | Das Präsens ist eine Zeitform. |
| die Gegenwart | el presente; la actualidad | Sustantivo | eine Handlung in der Gegenwart |
| die Handlung, -en | la acción | Sustantivo | Die Handlung passiert jetzt. |
| die Gewohnheit, -en | el hábito | Sustantivo | eine regelmäßige Gewohnheit |
| die Mannschaft, -en | el equipo | Sustantivo | Seine Mannschaft hat ein Spiel. |
| das Spiel, -e | el partido; el juego | Sustantivo | ein wichtiges Spiel |
| das Fußballtraining, -s | el entrenamiento de fútbol | Sustantivo | Er geht zum Fußballtraining. |
| die Arbeit, -en | el trabajo | Sustantivo | von der Arbeit zurückkommen |
| die Hausaufgabe, -n | el deber; la tarea | Sustantivo | Plural habitual: die Hausaufgaben. |
| der Monat, -e | el mes | Sustantivo | seit drei Monaten |
| das Jahr, -e | el año | Sustantivo | seit fünf Jahren |
| die Zukunft | el futuro | Sustantivo | in der Zukunft |
| die Couch, -s | el sofá | Sustantivo | Bernd sitzt auf der Couch. |
| das Buch, Bücher | el libro | Sustantivo | Er liest ein spannendes Buch. |
| die Tür, -en | la puerta | Sustantivo | Jemand klingelt an der Tür. |
| das Dorf, Dörfer | el pueblo | Sustantivo | ein kleines Dorf |
| der Biologe, -n | el biólogo | Sustantivo masculino débil | Er ist Biologe von Beruf. |
| der Beruf, -e | la profesión | Sustantivo | von Beruf |
| lernen | aprender; estudiar | Verbo regular | Ich lerne Deutsch. |
| warten | esperar | Verbo regular con `-e-` de apoyo | Du wartest. |
| laden | cargar; invitar | Verbo irregular con cambio vocálico | Du lädst, er lädt. |
| halten | sostener; parar | Verbo irregular con cambio vocálico | Du hältst, er hält. |
| tanzen | bailar | Verbo regular con ajuste ortográfico | Du tanzt. |
| lesen | leer | Verbo irregular con cambio vocálico | Du liest, er liest. |
| knien | arrodillarse | Verbo regular en `-ien` | Ich knie, wir knien. |
| lächeln | sonreír | Verbo regular en `-eln` | Ich lächle, wir lächeln. |
| wandern | hacer senderismo | Verbo regular en `-ern` | Ich wandere, wir wandern. |
| sitzen | estar sentado | Verbo irregular | Bernd sitzt auf der Couch. |
| klingeln | llamar; sonar | Verbo regular en `-eln` | Jemand klingelt an der Tür. |
| wohnen | vivir; residir | Verbo regular | Er wohnt in München. |
| heißen | llamarse | Verbo irregular | Der Mann heißt Jürgen. |
| zurückkommen | volver | Verbo irregular separable | Gleich kommt dein Vater zurück. |
| volljährig | mayor de edad | Adjetivo | Ihr Sohn ist volljährig. |
| spannend | emocionante; interesante | Adjetivo | ein spannendes Buch |
| schwanger | embarazada | Adjetivo | Sie ist schwanger. |
| gerade | ahora mismo | Adverbio | Er liest gerade. |
| plötzlich | de repente | Adverbio | Plötzlich klingelt jemand. |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### Usos del Präsens

| Uso | Ejemplo | Traducción |
| :--- | :--- | :--- |
| Acción actual | Bernd sitzt gerade auf der Couch. | Bernd está sentado ahora mismo en el sofá. |
| Hecho o estado | Das ist Felix. | Este es Felix. |
| Hábito o rutina | Jeden Dienstag geht er zum Fußballtraining. | Cada martes va al entrenamiento de fútbol. |
| Validez permanente | Er ist Biologe von Beruf. | Es biólogo de profesión. |
| Acción iniciada antes que continúa | Luis lernt seit drei Monaten Deutsch. | Luis estudia alemán desde hace tres meses. |
| Futuro cercano con marcador temporal | Morgen geht Max ins Kino. | Mañana Max va al cine. |

- El alemán no posee una forma progresiva obligatoria equivalente a «estar + gerundio».
- Según el contexto, **Er liest** puede significar «él lee» o «él está leyendo».
- Adverbios como **gerade** hacen explícito que la acción ocurre ahora.

##### Conjugación regular

Para la mayoría de los verbos regulares se elimina `-en` del infinitivo y se añade la terminación personal.

- **Infinitivo:** `lernen`
- **Raíz:** `lern-`
- **Fórmula:** `raíz verbal + terminación personal`

| Persona | Pronombre | Terminación | `lernen` |
| :--- | :--- | :--- | :--- |
| 1.ª singular | ich | `-e` | ich lerne |
| 2.ª singular | du | `-st` | du lernst |
| 3.ª singular | er / sie / es | `-t` | er lernt |
| 1.ª plural | wir | `-en` | wir lernen |
| 2.ª plural | ihr | `-t` | ihr lernt |
| 3.ª plural / formal | sie / Sie | `-en` | sie / Sie lernen |

##### Conjugación de sein y haben

| Persona | `sein` | `haben` |
| :--- | :--- | :--- |
| ich | bin | habe |
| du | bist | hast |
| er / sie / es | ist | hat |
| wir | sind | haben |
| ihr | seid | habt |
| sie / Sie | sind | haben |

- **Ich bin Andy.**
- **Wir sind Menschen.**
- **Er hat heute ein wichtiges Spiel.**

##### Reglas ortográficas de conjugación

###### Raíces terminadas en `-d` o `-t`

Se añade una `e` de apoyo antes de `-st` y `-t` para facilitar la pronunciación.

| Persona | `warten` |
| :--- | :--- |
| ich | warte |
| du | wartest |
| er / sie / es | wartet |
| wir | warten |
| ihr | wartet |
| sie / Sie | warten |

###### Raíces terminadas en sonido sibilante

Si la raíz termina en `-s`, `-ß`, `-x` o `-z`, la forma de **du** no añade otra `s`.

- **tanzen** → du **tanzt**
- **heißen** → du **heißt**

###### Verbos terminados en `-eln` o `-ern`

- En `-eln`, la primera persona singular suele perder la `e` de la raíz:
  - **lächeln** → ich **lächle**, wir **lächeln**
- En `-ern`, la primera persona singular conserva normalmente la forma:
  - **wandern** → ich **wandere**, wir **wandern**

###### Verbos terminados en `-ien`

La `e` de la terminación no se duplica:

- **knien** → ich **knie**, wir **knien**, sie **knien**

##### Verbos con cambio vocálico

Algunos verbos fuertes cambian la vocal de la raíz únicamente en **du** y **er / sie / es**.

| Cambio | Infinitivo | du | er / sie / es |
| :--- | :--- | :--- | :--- |
| `a → ä` | fahren | fährst | fährt |
| `a → ä` | laden | lädst | lädt |
| `a → ä` | halten | hältst | hält |
| `e → i` | sprechen | sprichst | spricht |
| `e → i` | geben | gibst | gibt |
| `e → ie` | lesen | liest | liest |
| `e → ie` | sehen | siehst | sieht |
| `au → äu` | laufen | läufst | läuft |

Conjugación completa de **lesen**:

| Persona | Forma |
| :--- | :--- |
| ich | lese |
| du | liest |
| er / sie / es | liest |
| wir | lesen |
| ihr | lest |
| sie / Sie | lesen |

> El cambio vocálico no aparece en **wir**, **ihr** ni **sie / Sie**.

##### Präsens con `seit`

Para una situación que empezó en el pasado y continúa en el presente, el alemán usa **Präsens + seit**.

- **Luis lernt seit drei Monaten Deutsch.**
- **Er wohnt seit vier Wochen in München.**
- **Estructura:** `Sujeto + verbo en Präsens + seit + periodo en Dativ`

| Expresión | Significado |
| :--- | :--- |
| seit einem Tag | desde hace un día |
| seit einer Woche | desde hace una semana |
| seit drei Monaten | desde hace tres meses |
| seit fünf Jahren | desde hace cinco años |

##### Futuro cercano con Präsens

El presente puede expresar futuro cuando el contexto o una expresión temporal lo deja claro.

- **Estructura:** `Marcador temporal + verbo en Präsens + ...`
- **Morgen geht Max ins Kino.**
- **Übermorgen fliegt er nach Berlin.**
- **Bald heiratet er sie.**

| Alemán | Español |
| :--- | :--- |
| sofort | inmediatamente |
| gleich | enseguida |
| in fünf Minuten | en cinco minutos |
| in einer Stunde | en una hora |
| bald | pronto |
| nachher | después |
| später | más tarde |
| heute Abend | esta tarde / noche |
| morgen | mañana |
| morgen früh | mañana por la mañana |
| morgen Mittag | mañana al mediodía |
| morgen Abend | mañana por la tarde / noche |
| übermorgen | pasado mañana |
| in zwei Tagen | dentro de dos días |
| am kommenden Wochenende | el fin de semana que viene |
| nächste Woche | la próxima semana |
| nächstes Wochenende | el próximo fin de semana |
| übernächste Woche | dentro de dos semanas |
| demnächst | próximamente |
| in ein paar Tagen | dentro de unos días |
| im nächsten Monat | el próximo mes |
| in einem halben Jahr | dentro de medio año |
| nächstes Jahr | el próximo año |
| in der Zukunft | en el futuro |

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Was machst du gerade?**  
> *Traducción:* ¿Qué estás haciendo ahora mismo?  
> *Uso:* Preguntar por una acción actual.

> **Ich lerne Deutsch.**  
> *Traducción:* Estudio alemán.  
> *Uso:* Hablar de una actividad actual o habitual.

> **Seit wann lernst du Deutsch?**  
> *Traducción:* ¿Desde cuándo estudias alemán?  
> *Uso:* Preguntar por una acción que continúa.

> **Ich lerne seit drei Monaten Deutsch.**  
> *Traducción:* Estudio alemán desde hace tres meses.  
> *Uso:* Indicar la duración hasta el presente.

> **Gleich kommt dein Vater zurück.**  
> *Traducción:* Tu padre vuelve enseguida.  
> *Uso:* Expresar futuro inmediato.

> **Was machst du morgen?**  
> *Traducción:* ¿Qué haces mañana?  
> *Uso:* Preguntar por planes futuros.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** el verbo conjugado ocupa normalmente la segunda posición en una oración enunciativa.
- ⚠️ **Atención:** la terminación de **ihr** es `-t`, no `-en`: **ihr lernt**.
- ⚠️ **Atención:** **ihr seid** pertenece a `sein`; no se dice `*ihr sind`.
- ⚠️ **Atención:** el cambio vocálico aparece solo en **du** y **er / sie / es**: **du liest**, pero **ihr lest**.
- ⚠️ **Atención:** con **seit**, una acción que continúa se expresa en presente: **Ich wohne seit einem Jahr hier**.
- ⚠️ **Atención:** para expresar futuro con Präsens debe existir un contexto o marcador temporal claro.
- ⚠️ **Atención:** no todos los cambios de forma son irregularidades; **wartest** y **tanzt** obedecen a reglas ortográficas regulares.
- ⚠️ **Atención:** los verbos separables no se desarrollan en esta lección, aunque aparecen ejemplos como **zurückkommen**.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: Completa: Ich ____ Deutsch. (lernen)
  A: lerne
  Type: fill-in-the-blank
- Q: Completa: Du ____ Deutsch. (lernen)
  A: lernst
  Type: fill-in-the-blank
- Q: Completa: Ihr ____ Deutsch. (lernen)
  A: lernt
  Type: fill-in-the-blank
- Q: Completa: Wir ____ Menschen. (sein)
  A: sind
  Type: fill-in-the-blank
- Q: Completa: Ihr ____ heute ein Spiel. (haben)
  A: habt
  Type: fill-in-the-blank
- Q: Completa: Du ____ auf den Bus. (warten)
  A: wartest
  Type: fill-in-the-blank
- Q: Completa: Er ____ auf den Bus. (warten)
  A: wartet
  Type: fill-in-the-blank
- Q: Completa: Du ____ gern. (tanzen)
  A: tanzt
  Type: fill-in-the-blank
- Q: Completa: Du ____ ein Buch. (lesen)
  A: liest
  Type: fill-in-the-blank
- Q: Completa: Ihr ____ ein Buch. (lesen)
  A: lest
  Type: fill-in-the-blank
- Q: Completa: Er ____ nach Berlin. (fahren)
  A: fährt
  Type: fill-in-the-blank
- Q: Completa: Ich ____ seit drei Monaten Deutsch. (lernen)
  A: lerne
  Type: fill-in-the-blank
- Q: Traduce: Vivo en Múnich desde hace cuatro semanas.
  A: Ich wohne seit vier Wochen in München.
  Type: flashcard
- Q: Traduce: Mañana Max va al cine.
  A: Morgen geht Max ins Kino.
  Type: flashcard
- Q: Traduce: Tu padre vuelve enseguida.
  A: Gleich kommt dein Vater zurück.
  Type: flashcard
- Q: ¿En qué personas aparece normalmente el cambio vocálico?
  A: En du y er / sie / es.
  Type: flashcard
- Q: Corrige: Ihr sind Menschen.
  A: Ihr seid Menschen.
  Type: correction
- Q: Corrige: Ihr liest ein Buch.
  A: Ihr lest ein Buch.
  Type: correction
- Q: Corrige: Ich wohne seit einem Jahr hier gewesen.
  A: Ich wohne seit einem Jahr hier.
  Type: correction
- Q: ¿Qué tiempo se usa para un futuro cercano con un marcador como morgen?
  A: Präsens.
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 08 — El tiempo verbal Präteritum

*Nivel orientativo:* **A1/A2** · *Alcance A1 de esta app:* ✅

> En el examen A1 solo se exige Präteritum de sein/haben/modales; el resto refuerza A2.

---
class_id: 008
title: "El tiempo verbal Präteritum"
level: "B1"
topics: ["Gramática", "Präteritum", "Pasado", "Verbos regulares", "Verbos irregulares", "Verbos modales", "Vocabulario"]
target_exam: "Telc / Goethe B1"
---

### El tiempo verbal Präteritum

#### 1. 🎯 Resumen / Objetivos de la Lección
- Comprender el uso del **Präteritum** para hablar del pasado.
- Diferenciar su uso del **Perfekt** en registros escritos y orales.
- Conjugar verbos regulares, fuertes y mixtos.
- Memorizar el Präteritum de **sein**, **haben** y los verbos modales.
- Reconocer formas frecuentes como **war**, **hatte**, **ging**, **fuhr** y **wusste**.
- Comprender narraciones y producir frases sencillas sobre hechos pasados.

#### 2. 📚 Vocabulario Clave (Wortschatz)
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Fußball, Fußbälle | el fútbol; el balón de fútbol | Sustantivo | Wir spielten Fußball. |
| der Mensch, -en | la persona; el ser humano | Sustantivo masculino débil | Plural: die Menschen. |
| der Montag, -e | el lunes | Sustantivo | am Montag |
| der Dienstag, -e | el martes | Sustantivo | jeden Dienstag |
| der Mittwoch, -e | el miércoles | Sustantivo | letzten Mittwoch |
| der Donnerstag, -e | el jueves | Sustantivo | am Donnerstag |
| der Freitag, -e | el viernes | Sustantivo | letzten Freitag |
| der Samstag, -e | el sábado | Sustantivo | am Samstag |
| der Sonntag, -e | el domingo | Sustantivo | jeden Sonntag |
| der Sohn, Söhne | el hijo | Sustantivo | Ihr Sohn war volljährig. |
| der Monat, -e | el mes | Sustantivo | im zweiten Monat |
| der Beruf, -e | la profesión | Sustantivo | Er war Biologe von Beruf. |
| der Urlaub, -e | las vacaciones | Sustantivo | Normalmente se usa en singular. |
| die Mannschaft, -en | el equipo | Sustantivo | Die Mannschaft hatte ein Spiel. |
| die Hausaufgabe, -n | el deber; la tarea | Sustantivo | Plural habitual: die Hausaufgaben. |
| die Couch, -s / Couchen | el sofá | Sustantivo | Er saß auf der Couch. |
| die Tür, -en | la puerta | Sustantivo | Jemand klingelte an der Tür. |
| die Woche, -n | la semana | Sustantivo | letzte Woche |
| die Strecke, -n | la ruta; el recorrido | Sustantivo | Die Strecke war fantastisch. |
| das Kinderspiel, -e | el juego de niños | Sustantivo | Das war ein Kinderspiel. |
| das Fußballtraining, -s | el entrenamiento de fútbol | Sustantivo | Er ging zum Fußballtraining. |
| das Spiel, -e | el juego; el partido | Sustantivo | ein wichtiges Spiel |
| das Buch, Bücher | el libro | Sustantivo | Er las ein Buch. |
| das Dorf, Dörfer | el pueblo | Sustantivo | Er kam aus einem Dorf. |
| das Kino, -s | el cine | Sustantivo | Die Kinder durften ins Kino gehen. |
| das Jahr, -e | el año | Sustantivo | letztes Jahr |
| das Fahrrad, Fahrräder | la bicicleta | Sustantivo | Mit dem Fahrrad fuhr ich nach Dresden. |
| das Wetter | el tiempo; el clima | Sustantivo | Normalmente sin plural. |
| das Opfer, - | la víctima | Sustantivo | Das Opfer atmete schwach. |
| arbeiten | trabajar | Verbo regular | Er arbeitete bei Amazon. |
| atmen | respirar | Verbo regular con `-e-` de apoyo | Das Opfer atmete schwach. |
| beobachten | observar | Verbo regular + Akkusativ | Wir beobachteten die Vögel. |
| einstellen | contratar | Verbo regular separable + Akkusativ | Wir stellten einen Mitarbeiter ein. |
| fahren | conducir; viajar | Verbo fuerte | **fahren – fuhr – ist gefahren** |
| feuern | despedir | Verbo regular + Akkusativ | Der Chef feuerte den Rezeptionisten. |
| fliegen | volar | Verbo fuerte | **fliegen – flog – ist geflogen** |
| gehen | ir | Verbo fuerte | **gehen – ging – ist gegangen** |
| halten | sostener; parar | Verbo fuerte | **halten – hielt – hat gehalten** |
| sich hinknien | arrodillarse | Verbo reflexivo separable | Er kniete sich vor dem König hin. |
| kündigen | dimitir; cancelar | Verbo regular | Sie kündigte ihren Job. |
| lächeln | sonreír | Verbo regular | Sie lächelte freundlich. |
| lachen | reír | Verbo regular | Er lachte über den Witz. |
| laden | cargar; invitar | Verbo fuerte | **laden – lud – hat geladen** |
| lernen | aprender | Verbo regular | Damals lernte ich Deutsch. |
| lesen | leer | Verbo fuerte | **lesen – las – hat gelesen** |
| spielen | jugar; tocar | Verbo regular | Wir spielten Fußball. |
| suchen | buscar | Verbo regular + Akkusativ | Sie suchte einen Job. |
| tanzen | bailar | Verbo regular | Wir tanzten auf der Hochzeit. |
| unterschreiben | firmar | Verbo fuerte inseparable | **unterschreiben – unterschrieb – hat unterschrieben** |
| wandern | hacer senderismo | Verbo regular | Wir wanderten um den See. |
| warten | esperar | Verbo regular | Ihr wartetet stundenlang. |
| draußen | fuera | Adverbio | Die Kinder spielten draußen. |
| damals | entonces; en aquella época | Adverbio | Damals lernte ich in Berlin Deutsch. |
| plötzlich | de repente | Adverbio | Plötzlich klingelte es. |
| schwach | débil; débilmente | Adjetivo / adverbio | Das Opfer atmete schwach. |
| spannend | emocionante; interesante | Adjetivo | Das Buch war spannend. |
| stundenlang | durante horas | Adverbio | Sie warteten stundenlang. |
| volljährig | mayor de edad | Adjetivo | Er war volljährig. |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### Uso del Präteritum

El **Präteritum**, también llamado **Imperfekt**, expresa hechos, estados y acciones del pasado.

- Es muy frecuente en narraciones, noticias, informes y lengua escrita.
- En la conversación cotidiana, muchos verbos se sustituyen por el **Perfekt**.
- **sein**, **haben** y los verbos modales se usan habitualmente en Präteritum incluso al hablar:
  - **Ich war müde.**
  - **Ich hatte keine Zeit.**
  - **Ich musste arbeiten.**

| Präteritum | Perfekt | Español |
| :--- | :--- | :--- |
| Letztes Jahr machte ich Urlaub in Deutschland. | Letztes Jahr habe ich Urlaub in Deutschland gemacht. | El año pasado estuve de vacaciones en Alemania. |
| Mit dem Fahrrad fuhr ich nach Dresden. | Mit dem Fahrrad bin ich nach Dresden gefahren. | Fui en bicicleta a Dresde. |

> No existe una equivalencia absoluta entre los tiempos alemanes y españoles. Según el contexto, el Präteritum puede traducirse mediante pretérito perfecto simple o imperfecto.

##### Verbos regulares o débiles

Se elimina `-en` y se añade `-te` más la terminación personal.

- **Fórmula:** `raíz + te + terminación`
- **lernen** → raíz `lern-` → **lernte**

| Persona | Terminación | `lernen` |
| :--- | :--- | :--- |
| ich | `-te` | lernte |
| du | `-test` | lerntest |
| er / sie / es | `-te` | lernte |
| wir | `-ten` | lernten |
| ihr | `-tet` | lerntet |
| sie / Sie | `-ten` | lernten |

- La primera y tercera personas del singular son iguales.
- La primera y tercera personas del plural también son iguales.

##### Verbos con raíz terminada en `-d` o `-t`

Se inserta una `e` para facilitar la pronunciación:

| Persona | `warten` |
| :--- | :--- |
| ich | wartete |
| du | wartetest |
| er / sie / es | wartete |
| wir | warteten |
| ihr | wartetet |
| sie / Sie | warteten |

##### Verbos fuertes

Los verbos fuertes cambian la vocal o la raíz y no añaden `-te`.

| Persona | Terminación | `sehen → sah-` |
| :--- | :--- | :--- |
| ich | — | sah |
| du | `-st` | sahst |
| er / sie / es | — | sah |
| wir | `-en` | sahen |
| ihr | `-t` | saht |
| sie / Sie | `-en` | sahen |

Otros ejemplos:

| Infinitiv | Präteritum | Partizip II | Tipo |
| :--- | :--- | :--- | :--- |
| gehen | ging | gegangen | fuerte |
| fahren | fuhr | gefahren | fuerte |
| lesen | las | gelesen | fuerte |
| lassen | ließ | gelassen | fuerte |
| fliegen | flog | geflogen | fuerte |
| halten | hielt | gehalten | fuerte |
| schreiben | schrieb | geschrieben | fuerte |
| bitten | bat | gebeten | fuerte |

- **lesen:** ich las, du **lasest**, er las, wir lasen, ihr last, sie lasen.
- **bitten:** ich bat, du batest, er bat, wir baten, ihr batet, sie baten.
- **schreien:** ich schrie, wir schrien; no se duplica la `e`.

##### Verbos mixtos

Los verbos mixtos cambian la raíz y añaden terminaciones de verbo débil.

| Infinitiv | Präteritum | Partizip II |
| :--- | :--- | :--- |
| bringen | brachte | gebracht |
| denken | dachte | gedacht |
| wissen | wusste | gewusst |
| kennen | kannte | gekannt |

> **bringen → brachte** es mixto, no un verbo fuerte puro.

##### Sein y haben

| Persona | `sein` | `haben` |
| :--- | :--- | :--- |
| ich | war | hatte |
| du | warst | hattest |
| er / sie / es | war | hatte |
| wir | waren | hatten |
| ihr | wart | hattet |
| sie / Sie | waren | hatten |

- **Die Strecke war fantastisch.**
- **Ich hatte tolles Wetter.**

##### Verbos modales

Los modales pierden el Umlaut en Präteritum y reciben terminaciones regulares.

| Persona | müssen | können | dürfen | sollen | wollen | mögen |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| ich / er / sie / es | musste | konnte | durfte | sollte | wollte | mochte |
| du | musstest | konntest | durftest | solltest | wolltest | mochtest |
| wir / sie / Sie | mussten | konnten | durften | sollten | wollten | mochten |
| ihr | musstet | konntet | durftet | solltet | wolltet | mochtet |

Con otro verbo, el infinitivo se coloca al final:

- **Die Kinder durften ins Kino gehen.**
- **Die Mitarbeiter konnten nicht arbeiten.**
- **Alle Arbeitnehmer mussten Überstunden leisten.**

##### Verbos frecuentes en Präteritum

| Infinitiv | ich / er / sie / es | du | wir / sie / Sie | ihr |
| :--- | :--- | :--- | :--- | :--- |
| sein | war | warst | waren | wart |
| haben | hatte | hattest | hatten | hattet |
| werden | wurde | wurdest | wurden | wurdet |
| wissen | wusste | wusstest | wussten | wusstet |
| denken | dachte | dachtest | dachten | dachtet |
| gehen | ging | gingst | gingen | gingt |
| fahren | fuhr | fuhrst | fuhren | fuhrt |
| bringen | brachte | brachtest | brachten | brachtet |
| lassen | ließ | ließest | ließen | ließt |

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Wie war dein Urlaub?**  
> *Traducción:* ¿Cómo fueron tus vacaciones?  
> *Uso:* Preguntar por una experiencia pasada.

> **Ich war in Deutschland.**  
> *Traducción:* Estuve en Alemania.  
> *Uso:* Indicar dónde se estuvo.

> **Ich hatte keine Zeit.**  
> *Traducción:* No tenía tiempo.  
> *Uso:* Explicar una situación pasada.

> **Damals lernte ich in Berlin Deutsch.**  
> *Traducción:* Por aquel entonces estudiaba alemán en Berlín.  
> *Uso:* Introducir un recuerdo.

> **Wie alt warst du, als du geheiratet hast?**  
> *Traducción:* ¿Qué edad tenías cuando te casaste?  
> *Uso:* Preguntar por la edad en un momento pasado.

> **Warum wartetet ihr stundenlang auf ihn?**  
> *Traducción:* ¿Por qué lo esperasteis durante horas?  
> *Uso:* Preguntar por una acción prolongada del pasado.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** no añadas `-te` a los verbos fuertes: **ging**, no `*gingte`.
- ⚠️ **Atención:** los verbos mixtos cambian la raíz y añaden `-te`: **brachte**, **dachte**, **wusste**.
- ⚠️ **Atención:** la forma estándar es **du lasest**; **ihr last** corresponde a la segunda persona plural.
- ⚠️ **Atención:** **ihr wart** es Präteritum de `sein`; **ihr wartet** es Präsens de `warten`.
- ⚠️ **Atención:** los modales pierden el Umlaut: **musste**, **konnte**, **durfte**.
- ⚠️ **Atención:** el infinitivo dependiente de un modal va al final: **Wir mussten arbeiten**.
- ⚠️ **Atención:** se escribe **die Mannschaft**, **der Mittwoch** y **das Wetter**.
- ⚠️ **Atención:** en el alemán hablado suelen preferirse formas de Perfekt, excepto especialmente con **sein**, **haben** y los modales.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: Completa: Ich ____ Deutsch. (lernen, Präteritum)
  A: lernte
  Type: fill-in-the-blank
- Q: Completa: Wir ____ Deutsch. (lernen, Präteritum)
  A: lernten
  Type: fill-in-the-blank
- Q: Completa: Ihr ____ stundenlang. (warten, Präteritum)
  A: wartetet
  Type: fill-in-the-blank
- Q: Completa: Ich ____ gestern müde. (sein, Präteritum)
  A: war
  Type: fill-in-the-blank
- Q: Completa: Ihr ____ keine Zeit. (haben, Präteritum)
  A: hattet
  Type: fill-in-the-blank
- Q: Completa: Er ____ nach Berlin. (gehen, Präteritum)
  A: ging
  Type: fill-in-the-blank
- Q: Completa: Wir ____ nach Dresden. (fahren, Präteritum)
  A: fuhren
  Type: fill-in-the-blank
- Q: Completa: Du ____ ein Buch. (lesen, Präteritum)
  A: lasest
  Type: fill-in-the-blank
- Q: Completa: Sie ____ das Geschenk. (bringen, Präteritum)
  A: brachte
  Type: fill-in-the-blank
- Q: Completa: Ich ____ arbeiten. (müssen, Präteritum)
  A: musste
  Type: fill-in-the-blank
- Q: Completa: Die Kinder ____ ins Kino gehen. (dürfen, Präteritum)
  A: durften
  Type: fill-in-the-blank
- Q: Transforma a Präteritum: Die Strecke ist fantastisch.
  A: Die Strecke war fantastisch.
  Type: transformation
- Q: Transforma a Präteritum: Ich habe tolles Wetter.
  A: Ich hatte tolles Wetter.
  Type: transformation
- Q: Transforma a Perfekt: Mit dem Fahrrad fuhr ich nach Dresden.
  A: Mit dem Fahrrad bin ich nach Dresden gefahren.
  Type: transformation
- Q: Corrige: Er gingte nach Hause.
  A: Er ging nach Hause.
  Type: correction
- Q: Corrige: Ich wusste es nicht. (Comprueba si contiene Umlaut)
  A: La frase ya es correcta; wusste no lleva Umlaut.
  Type: correction
- Q: ¿Qué verbos se usan frecuentemente en Präteritum incluso al hablar?
  A: sein, haben y los verbos modales.
  Type: flashcard
- Q: ¿Qué tipo de verbo es bringen por su formación del pasado?
  A: Verbo mixto.
  Type: flashcard
- Q: ¿Dónde se coloca el infinitivo cuando aparece con un verbo modal?
  A: Al final de la oración.
  Type: flashcard
- Q: Traduce: Por aquel entonces estudiaba alemán en Berlín.
  A: Damals lernte ich in Berlin Deutsch.
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 09 — Lista de verbos irregulares

*Nivel orientativo:* **A1** · *Alcance A1 de esta app:* ✅

---
class_id: 009
title: "Lista de verbos irregulares"
level: "B1"
topics: ["Gramática", "Verbos irregulares", "Präteritum", "Partizip II", "Perfekt"]
target_exam: "Telc / Goethe B1"
---

### Lista de verbos irregulares

#### 1. 🎯 Resumen / Objetivos de la Lección
- Reconocer las formas principales de los verbos irregulares alemanes.
- Relacionar infinitivo, cambio vocálico en Präsens, Präteritum y Partizip II.
- Elegir correctamente **haben** o **sein** para formar el Perfekt.
- Distinguir verbos fuertes, mixtos y verbos con variantes según el significado.
- Priorizar las formas más frecuentes para la comprensión y producción en nivel A1.

#### 2. 📚 Vocabulario Clave (Wortschatz)
| Infinitiv | Español | Präsens especial (du / er) | Präteritum | Perfekt | Clasificación / Nota |
| :--- | :--- | :--- | :--- | :--- | :--- |
| backen | hornear | bäckst / bäckt | backte / buk | hat gebacken | Fuerte con variante débil |
| befehlen | ordenar | befiehlst / befiehlt | befahl | hat befohlen | Fuerte inseparable |
| beginnen | comenzar | — | begann | hat begonnen | Fuerte inseparable |
| beißen | morder | — | biss | hat gebissen | Fuerte |
| biegen | doblar; girar | — | bog | hat/ist gebogen | Auxiliar según uso |
| bieten | ofrecer | — | bot | hat geboten | Fuerte |
| binden | atar; unir | — | band | hat gebunden | Fuerte |
| bitten | pedir | — | bat | hat gebeten | Fuerte + Akk. + `um` |
| blasen | soplar | bläst / bläst | blies | hat geblasen | Fuerte |
| bleiben | quedarse | — | blieb | ist geblieben | Fuerte, cambio de estado |
| braten | asar; freír | brätst / brät | briet | hat gebraten | Fuerte |
| brechen | romper | brichst / bricht | brach | hat/ist gebrochen | Auxiliar según uso |
| brennen | arder; quemar | — | brannte | hat gebrannt | Mixto |
| bringen | traer | — | brachte | hat gebracht | Mixto |
| denken | pensar | — | dachte | hat gedacht | Mixto + `an` + Akk. |
| dürfen | poder; tener permiso | darfst / darf | durfte | hat gedurft | Modal; Perfekt poco frecuente solo |
| empfehlen | recomendar | empfiehlst / empfiehlt | empfahl | hat empfohlen | Fuerte + Dat. + Akk. |
| erschrecken | asustarse | erschrickst / erschrickt | erschrak | ist erschrocken | Fuerte, intransitivo |
| erschrecken | asustar | — | erschreckte | hat erschreckt | Débil, transitivo |
| essen | comer | isst / isst | aß | hat gegessen | Fuerte |
| erwägen | considerar | — | erwog | hat erwogen | Fuerte, registro formal |
| fahren | conducir; viajar | fährst / fährt | fuhr | ist/hat gefahren | `sein` movimiento; `haben` transitivo |
| fallen | caer | fällst / fällt | fiel | ist gefallen | Fuerte |
| fangen | atrapar | fängst / fängt | fing | hat gefangen | Fuerte |
| finden | encontrar | — | fand | hat gefunden | Fuerte |
| fliegen | volar | — | flog | ist/hat geflogen | Auxiliar según uso |
| fliehen | huir | — | floh | ist geflohen | Fuerte |
| fließen | fluir | — | floss | ist geflossen | Fuerte |
| fressen | comer; devorar (animales) | frisst / frisst | fraß | hat gefressen | Fuerte |
| frieren | tener frío; congelarse | — | fror | hat/ist gefroren | Auxiliar según significado |
| gebären | dar a luz | gebierst / gebiert | gebar | hat geboren | Fuerte |
| geben | dar | gibst / gibt | gab | hat gegeben | Fuerte + Dat. + Akk. |
| gehen | ir | — | ging | ist gegangen | Fuerte |
| gelingen | salir bien; lograr | — | gelang | ist gelungen | Fuerte + Dativ |
| gelten | valer; ser válido | giltst / gilt | galt | hat gegolten | Fuerte |
| genießen | disfrutar | — | genoss | hat genossen | Fuerte |
| geschehen | suceder | geschiehst / geschieht | geschah | ist geschehen | Fuerte |
| gewinnen | ganar | — | gewann | hat gewonnen | Fuerte |
| gießen | verter; regar | — | goss | hat gegossen | Fuerte |
| gleichen | parecerse | — | glich | hat geglichen | Fuerte + Dativ |
| graben | cavar | gräbst / gräbt | grub | hat gegraben | Fuerte |
| greifen | agarrar | — | griff | hat gegriffen | Fuerte |
| haben | tener; haber | hast / hat | hatte | hat gehabt | Irregular |
| halten | sostener; parar | hältst / hält | hielt | hat gehalten | Fuerte |
| hängen | estar colgado | — | hing | hat gehangen | Fuerte, intransitivo |
| hängen | colgar algo | — | hängte | hat gehängt | Débil, transitivo |
| hauen | golpear; tallar | — | haute / hieb | hat gehauen | Variantes |
| heben | levantar | — | hob | hat gehoben | Fuerte |
| heißen | llamarse; significar | heißt / heißt | hieß | hat geheißen | Fuerte |
| helfen | ayudar | hilfst / hilft | half | hat geholfen | Fuerte + Dativ |
| kennen | conocer | — | kannte | hat gekannt | Mixto |
| klingen | sonar | — | klang | hat geklungen | Fuerte |
| können | poder; saber hacer | kannst / kann | konnte | hat gekonnt | Modal |
| laden | cargar; invitar | lädst / lädt | lud | hat geladen | Fuerte |
| lassen | dejar; permitir | lässt / lässt | ließ | hat gelassen | Fuerte |
| laufen | correr; caminar | läufst / läuft | lief | ist gelaufen | Fuerte |
| leiden | sufrir | — | litt | hat gelitten | Fuerte + `an/unter` |
| leihen | prestar; pedir prestado | — | lieh | hat geliehen | Fuerte |
| lesen | leer | liest / liest | las | hat gelesen | Fuerte |
| liegen | estar tumbado; estar situado | — | lag | hat gelegen | Fuerte |
| lügen | mentir | — | log | hat gelogen | Fuerte |
| meiden | evitar; rehuir | — | mied | hat gemieden | Fuerte |
| messen | medir | misst / misst | maß | hat gemessen | Fuerte |
| misslingen | fracasar; salir mal | — | misslang | ist misslungen | Fuerte + Dativ |
| mögen | gustar | magst / mag | mochte | hat gemocht | Modal |
| müssen | tener que | musst / muss | musste | hat gemusst | Modal |
| nehmen | tomar; coger | nimmst / nimmt | nahm | hat genommen | Fuerte |
| nennen | llamar; denominar | — | nannte | hat genannt | Mixto, doble Akk. |
| pfeifen | silbar | — | pfiff | hat gepfiffen | Fuerte |
| preisen | alabar | — | pries | hat gepriesen | Fuerte |
| quellen | brotar; hincharse | quillst / quillt | quoll | ist gequollen | Fuerte |
| raten | aconsejar; adivinar | rätst / rät | riet | hat geraten | Fuerte + Dativ |
| reißen | rasgar; romper | — | riss | hat/ist gerissen | Auxiliar según uso |
| reiten | montar a caballo | — | ritt | ist/hat geritten | Auxiliar según uso |
| rennen | correr | — | rannte | ist gerannt | Mixto |
| riechen | oler | — | roch | hat gerochen | Fuerte |
| rufen | llamar; gritar | — | rief | hat gerufen | Fuerte |
| saufen | beber alcohol (coloquial) | säufst / säuft | soff | hat gesoffen | Fuerte |
| schaffen | conseguir | — | schaffte | hat geschafft | Débil |
| schaffen | crear | — | schuf | hat geschaffen | Fuerte |
| scheiden | separar; divorciarse | — | schied | hat/ist geschieden | Auxiliar según uso |
| scheinen | brillar; parecer | — | schien | hat geschienen | Fuerte |
| schieben | empujar | — | schob | hat geschoben | Fuerte |
| schießen | disparar | — | schoss | hat geschossen | Fuerte |
| schlafen | dormir | schläfst / schläft | schlief | hat geschlafen | Fuerte |
| schlagen | golpear | schlägst / schlägt | schlug | hat geschlagen | Fuerte |
| schließen | cerrar | — | schloss | hat geschlossen | Fuerte |
| schmeißen | tirar; lanzar | — | schmiss | hat geschmissen | Fuerte, coloquial |
| schmelzen | derretir(se) | schmilzt / schmilzt | schmolz | ist/hat geschmolzen | Auxiliar según uso |
| schneiden | cortar | — | schnitt | hat geschnitten | Fuerte |
| schreiben | escribir | — | schrieb | hat geschrieben | Fuerte |
| schreien | gritar | — | schrie | hat geschrien | Fuerte |
| schreiten | avanzar; caminar | — | schritt | ist geschritten | Fuerte, formal |
| schwellen | hincharse | schwillst / schwillt | schwoll | ist geschwollen | Fuerte |
| schwimmen | nadar | — | schwamm | ist/hat geschwommen | Auxiliar según uso |
| schwinden | disminuir; desaparecer | — | schwand | ist geschwunden | Fuerte |
| schwingen | oscilar; blandir | — | schwang | hat/ist geschwungen | Auxiliar según uso |
| schwören | jurar | — | schwor | hat geschworen | Fuerte |
| sehen | ver | siehst / sieht | sah | hat gesehen | Fuerte |
| sein | ser; estar | bist / ist | war | ist gewesen | Irregular |
| singen | cantar | — | sang | hat gesungen | Fuerte |
| sinken | hundirse; descender | — | sank | ist gesunken | Fuerte |
| sitzen | estar sentado | — | saß | hat gesessen | Fuerte |
| sollen | deber; se supone que | sollst / soll | sollte | hat gesollt | Modal |
| spinnen | hilar; estar loco | — | spann | hat gesponnen | Fuerte |
| sprechen | hablar | sprichst / spricht | sprach | hat gesprochen | Fuerte |
| springen | saltar | — | sprang | ist gesprungen | Fuerte |
| stechen | pinchar; picar | stichst / sticht | stach | hat gestochen | Fuerte |
| stehen | estar de pie | — | stand | hat gestanden | Fuerte |
| stehlen | robar | stiehlst / stiehlt | stahl | hat gestohlen | Fuerte |
| steigen | subir; aumentar | — | stieg | ist gestiegen | Fuerte |
| sterben | morir | stirbst / stirbt | starb | ist gestorben | Fuerte |
| streichen | pintar; tachar; cancelar | — | strich | hat gestrichen | Fuerte |
| streiten | discutir; pelear | — | stritt | hat gestritten | Fuerte |
| tragen | llevar; cargar | trägst / trägt | trug | hat getragen | Fuerte |
| treffen | encontrarse; acertar | triffst / trifft | traf | hat getroffen | Fuerte |
| treiben | impulsar; practicar | — | trieb | hat/ist getrieben | Auxiliar según uso |
| treten | pisar; dar un paso | trittst / tritt | trat | hat/ist getreten | Auxiliar según uso |
| trinken | beber | — | trank | hat getrunken | Fuerte |
| trügen | engañar | — | trog | hat getrogen | Fuerte, poco frecuente |
| tun | hacer | — | tat | hat getan | Fuerte |
| vergessen | olvidar | vergisst / vergisst | vergaß | hat vergessen | Fuerte inseparable |
| verlieren | perder | — | verlor | hat verloren | Fuerte inseparable |
| wachsen | crecer | wächst / wächst | wuchs | ist gewachsen | Fuerte |
| waschen | lavar | wäschst / wäscht | wusch | hat gewaschen | Fuerte |
| weichen | ceder; retirarse | — | wich | ist gewichen | Fuerte |
| weisen | señalar; indicar | — | wies | hat gewiesen | Fuerte |
| werben | anunciar; captar | wirbst / wirbt | warb | hat geworben | Fuerte |
| werden | convertirse; llegar a ser | wirst / wird | wurde | ist geworden | Irregular |
| werfen | lanzar | wirfst / wirft | warf | hat geworfen | Fuerte |
| wiegen | pesar | — | wog | hat gewogen | Fuerte |
| wissen | saber | weißt / weiß | wusste | hat gewusst | Mixto |
| wollen | querer | willst / will | wollte | hat gewollt | Modal |
| ziehen | tirar; mudarse | — | zog | hat/ist gezogen | Auxiliar según uso |
| zwingen | obligar | — | zwang | hat gezwungen | Fuerte + Akk. + `zu` |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### Las formas principales

Conviene aprender cada verbo como una unidad:

`Infinitiv – Präteritum – Partizip II – auxiliar`

- `gehen – ging – gegangen – sein`
- `sehen – sah – gesehen – haben`
- `bringen – brachte – gebracht – haben`

##### Verbos fuertes

- Cambian la vocal o la raíz en Präteritum.
- El Partizip II termina normalmente en `-en`.
- Ejemplo: `sprechen – sprach – gesprochen`.

##### Verbos mixtos

- Cambian la raíz y reciben terminaciones propias de los verbos débiles.
- El Partizip II termina normalmente en `-t`.
- Ejemplos:
  - `bringen – brachte – gebracht`
  - `denken – dachte – gedacht`
  - `wissen – wusste – gewusst`
  - `kennen – kannte – gekannt`

##### Cambio vocálico en Präsens

El cambio aparece normalmente solo con **du** y **er / sie / es**:

| Patrón | Ejemplos |
| :--- | :--- |
| `a → ä` | fahren → du fährst; schlafen → er schläft |
| `e → i` | geben → du gibst; sprechen → er spricht |
| `e → ie` | lesen → du liest; sehen → er sieht |
| `au → äu` | laufen → du läufst |

Los modales presentan formas propias:

- dürfen → du **darfst**
- können → du **kannst**
- mögen → du **magst**
- müssen → du **musst**
- wollen → du **willst**

##### Elección del auxiliar

- **sein:** movimiento con cambio de lugar, cambio de estado y algunos verbos específicos.
  - Ich **bin** gegangen.
  - Er **ist** geblieben.
  - Das **ist** geschehen.
- **haben:** la mayoría de los verbos y los usos transitivos.
  - Ich **habe** das Buch gelesen.
  - Sie **hat** das Auto gefahren.

Algunos verbos cambian de auxiliar según el uso:

- **Ich bin nach Berlin gefahren.** → desplazamiento.
- **Ich habe das Auto gefahren.** → objeto directo.

##### Verbos con dos paradigmas

| Verbo | Uso | Formas |
| :--- | :--- | :--- |
| hängen | estar colgado | hing – hat gehangen |
| hängen | colgar algo | hängte – hat gehängt |
| erschrecken | asustarse | erschrak – ist erschrocken |
| erschrecken | asustar | erschreckte – hat erschreckt |
| schaffen | conseguir | schaffte – hat geschafft |
| schaffen | crear | schuf – hat geschaffen |

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Ich bin nach Hause gegangen.**  
> *Traducción:* Me fui a casa.  
> *Uso:* Hablar de un desplazamiento pasado.

> **Hast du das Buch gelesen?**  
> *Traducción:* ¿Has leído el libro?  
> *Uso:* Preguntar por una acción terminada.

> **Das habe ich nicht gewusst.**  
> *Traducción:* Eso no lo sabía.  
> *Uso:* Expresar desconocimiento previo.

> **Was ist passiert?**  
> *Traducción:* ¿Qué ha pasado?  
> *Uso:* Preguntar por un acontecimiento.

> **Er hat mir geholfen.**  
> *Traducción:* Me ha ayudado.  
> *Uso:* Hablar de ayuda recibida; **helfen** rige dativo.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** el PDF repetía **hängen**; aquí se distinguen correctamente sus dos paradigmas.
- ⚠️ **Atención:** **schaffen** cambia de conjugación según signifique «conseguir» o «crear».
- ⚠️ **Atención:** **erschrecken** es fuerte como intransitivo y débil como transitivo.
- ⚠️ **Atención:** no todos los verbos de movimiento usan siempre **sein**; un uso transitivo puede exigir **haben**.
- ⚠️ **Atención:** **sinken** significa «hundirse» o «descender», no simplemente «hundir» transitivo.
- ⚠️ **Atención:** **zwingen** no cambia la vocal en Präsens: **du zwingst**, **er zwingt**.
- ⚠️ **Atención:** los verbos modales forman normalmente el Perfekt con doble infinitivo cuando acompañan a otro verbo: **Ich habe arbeiten müssen**.
- ⚠️ **Atención:** aprende siempre el verbo junto con su régimen cuando corresponda: **helfen + Dativ**, **denken an + Akkusativ**.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: Completa la serie: gehen – ____ – gegangen.
  A: ging
  Type: fill-in-the-blank
- Q: Completa la serie: sehen – sah – ____.
  A: gesehen
  Type: fill-in-the-blank
- Q: Completa la serie: bringen – ____ – gebracht.
  A: brachte
  Type: fill-in-the-blank
- Q: Completa la serie: wissen – wusste – ____.
  A: gewusst
  Type: fill-in-the-blank
- Q: Elige el auxiliar: Ich ____ nach Berlin gefahren.
  A: bin
  Type: fill-in-the-blank
- Q: Elige el auxiliar: Ich ____ das Auto gefahren.
  A: habe
  Type: fill-in-the-blank
- Q: Completa: Du ____ ein Buch. (lesen, Präsens)
  A: liest
  Type: fill-in-the-blank
- Q: Completa: Er ____ Deutsch. (sprechen, Präsens)
  A: spricht
  Type: fill-in-the-blank
- Q: Completa: Sie ____ nach Hause. (laufen, Präsens)
  A: läuft
  Type: fill-in-the-blank
- Q: ¿Qué tipo de verbo es bringen?
  A: Mixto.
  Type: flashcard
- Q: ¿Cuál es el pasado de schaffen con el significado «conseguir»?
  A: schaffte – hat geschafft.
  Type: flashcard
- Q: ¿Cuál es el pasado de schaffen con el significado «crear»?
  A: schuf – hat geschaffen.
  Type: flashcard
- Q: Completa para «El cuadro estaba colgado»: Das Bild ____ an der Wand.
  A: hing
  Type: fill-in-the-blank
- Q: Completa para «Colgué el cuadro»: Ich ____ das Bild an die Wand.
  A: hängte
  Type: fill-in-the-blank
- Q: Completa: Das Kind ____ über den Lärm. (erschrecken, asustarse)
  A: erschrak
  Type: fill-in-the-blank
- Q: Completa: Der Lärm ____ das Kind. (erschrecken, asustar)
  A: erschreckte
  Type: fill-in-the-blank
- Q: Corrige: Du zwingst cambia la vocal del verbo.
  A: No hay cambio vocálico; du zwingst es correcto.
  Type: correction
- Q: ¿Qué auxiliar usa bleiben?
  A: sein.
  Type: flashcard
- Q: ¿Qué caso exige helfen?
  A: Dativ.
  Type: flashcard
- Q: Traduce: Eso no lo sabía.
  A: Das habe ich nicht gewusst.
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 10 — La estructura básica de la oración

*Nivel orientativo:* **A1** · *Alcance A1 de esta app:* ✅

---
class_id: 010
title: "La estructura básica de la oración"
level: "A1"
topics: ["Gramática", "Orden de palabras", "Verbo en posición 2", "Inversión", "Satzklammer", "Verbos modales"]
target_exam: "Telc / Goethe A1"
---

### La estructura básica de la oración

#### 1. 🎯 Resumen / Objetivos de la Lección
- Construir oraciones principales simples en alemán.
- Aplicar la regla del verbo conjugado en segunda posición.
- Distinguir una posición sintáctica de una palabra individual.
- Colocar diferentes elementos en la primera posición para dar énfasis.
- Reconocer la inversión entre sujeto y otros elementos.
- Formar la pinza verbal con auxiliares, modales y verbos principales.
- Ordenar correctamente oraciones en Präsens, Perfekt y con verbos modales.

#### 2. 📚 Vocabulario Clave (Wortschatz)
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Satz, Sätze | la oración; la frase | Sustantivo | ein einfacher Satz |
| der Hauptsatz, Hauptsätze | la oración principal | Sustantivo | Im Hauptsatz steht das Verb auf Position 2. |
| das Subjekt, -e | el sujeto | Sustantivo | Ich es el sujeto de Ich lerne Deutsch. |
| das Verb, -en | el verbo | Sustantivo | El verbo conjugado ocupa la posición 2. |
| das Vollverb, -en | el verbo principal o léxico | Sustantivo | El infinitivo puede aparecer al final. |
| das Hilfsverb, -en | el verbo auxiliar | Sustantivo | haben, sein, werden |
| das Modalverb, -en | el verbo modal | Sustantivo | können, müssen, dürfen |
| das Objekt, -e | el objeto; el complemento | Sustantivo | eine Katze es objeto en Ich habe eine Katze. |
| die Ergänzung, -en | el complemento | Sustantivo | temporale Ergänzung |
| die Position, -en | la posición | Sustantivo | Position 1 y Position 2 |
| die Satzklammer, -n | la pinza verbal | Sustantivo | hat ... gekauft |
| die Arbeit, -en | el trabajo | Sustantivo | zur Arbeit fahren |
| der Bus, -se | el autobús | Sustantivo | mit dem Bus |
| die Kamera, -s | la cámara | Sustantivo | mit dieser Kamera |
| das Video, -s | el vídeo | Sustantivo | ein Video aufnehmen |
| der Deutschkurs, -e | el curso de alemán | Sustantivo | für den Deutschkurs |
| das Theater, - | el teatro | Sustantivo | ins Theater |
| der Tisch, -e | la mesa | Sustantivo | einen Tisch reservieren |
| das Geschenk, -e | el regalo | Sustantivo | ein Geschenk kaufen |
| die Hausaufgabe, -n | el deber; la tarea | Sustantivo | Plural habitual: die Hausaufgaben. |
| das Seminar, -e | el seminario | Sustantivo | alle Seminare besuchen |
| das Konzert, -e | el concierto | Sustantivo | zum Konzert gehen |
| die Braut, Bräute | la novia en una boda | Sustantivo | die Braut küssen |
| heißen | llamarse | Verbo irregular | Ich heiße Andrea. |
| fahren | ir en vehículo; conducir | Verbo irregular | Ich fahre zur Arbeit. |
| aufnehmen | grabar | Verbo irregular separable + Akk. | ein Video aufnehmen |
| reservieren | reservar | Verbo regular en `-ieren` + Akk. | einen Tisch reservieren |
| einladen | invitar | Verbo irregular separable + Akk. | jemanden ins Theater einladen |
| anrufen | llamar por teléfono | Verbo irregular separable + Akk. | deine Mutter anrufen |
| küssen | besar | Verbo regular + Akk. | die Braut küssen |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### Estructura básica

Una oración transitiva sencilla puede seguir el patrón:

`Sujeto + verbo conjugado + objeto`

| Sujeto | Verbo | Objeto / complemento |
| :--- | :--- | :--- |
| Ich | heiße | Andrea. |
| Ich | habe | eine Katze. |
| Wir | lernen | Deutsch. |
| Thomas | fährt | zur Arbeit. |

Este patrón es un punto de partida, pero la regla fundamental del alemán no es “SVO” en todos los casos, sino la posición del verbo conjugado.

##### El sujeto explícito

- En una oración enunciativa independiente, el sujeto suele expresarse:
  - ✅ **Ich komme aus Mexiko.**
  - ❌ `Komme aus Mexiko.`
- Puede omitirse en una coordinación si ambas proposiciones comparten claramente el sujeto:
  - **Ich heiße Ricardo und komme aus Mexiko.**
  - **Tanja kommt aus Deutschland und arbeitet als Lehrerin.**
- En el imperativo informal se omite normalmente el pronombre:
  - **Komm bitte!**
  - **Kommt bitte!**
- En el imperativo formal se conserva **Sie**:
  - **Kommen Sie bitte!**

##### Regla V2: el verbo conjugado en segunda posición

En una oración principal enunciativa, el verbo finito ocupa la segunda **posición sintáctica**.

`[Posición 1] + [verbo finito] + [resto de la oración]`

| Posición 1 | Posición 2 | Campo medio |
| :--- | :--- | :--- |
| Ich | fahre | heute Morgen mit dem Bus zur Arbeit. |
| Heute Morgen | fahre | ich mit dem Bus zur Arbeit. |
| Mit dem Bus | fahre | ich heute Morgen zur Arbeit. |
| Zur Arbeit | fahre | ich heute Morgen mit dem Bus. |

- Una posición puede contener varias palabras:
  - **Heute Morgen** constituye una sola unidad temporal.
  - **Mit dem Bus** constituye una sola unidad modal.
- La regla es “segundo elemento”, no “segunda palabra”.

##### Primera posición y énfasis

La primera posición puede contener casi cualquier constituyente. El elemento inicial establece el tema o recibe énfasis.

| Elemento inicial | Pregunta implícita | Ejemplo |
| :--- | :--- | :--- |
| Sujeto | ¿Quién? | **Ich** fahre heute Morgen zur Arbeit. |
| Tiempo | ¿Cuándo? | **Heute Morgen** fahre ich zur Arbeit. |
| Modo / medio | ¿Cómo? | **Mit dem Bus** fahre ich zur Arbeit. |
| Destino | ¿Adónde? | **Zur Arbeit** fahre ich mit dem Bus. |

Cuando otro elemento ocupa la posición 1, el sujeto suele colocarse después del verbo:

`Heute Morgen + fahre + ich + ...`

Esto se denomina habitualmente **inversión**, aunque el verbo continúa en su posición V2.

##### Orden no marcado: TeKaMoLo

Como orientación general para varios complementos:

`Temporal + Kausal + Modal + Lokal`

- **Temporal:** wann? → heute Morgen
- **Kausal:** warum? → wegen des Wetters
- **Modal:** wie? → mit dem Bus
- **Lokal:** wo / wohin? → zur Arbeit

Ejemplo:

**Ich fahre heute Morgen wegen des Regens mit dem Bus zur Arbeit.**

TeKaMoLo es una guía para el orden neutro, no una regla absoluta. El contexto y el énfasis permiten otras posiciones.

##### La pinza verbal: Satzklammer

Cuando hay dos partes verbales, el verbo conjugado ocupa la posición 2 y la parte no conjugada aparece al final.

`[Posición 1] + [verbo conjugado] + [campo medio] + [parte verbal final]`

| Construcción | Posición 1 | Verbo conjugado | Campo medio | Parte final |
| :--- | :--- | :--- | :--- | :--- |
| Perfekt | Die Kinder | sind | in die Schule | gegangen. |
| Perfekt | Ich | habe | die Aufgaben | verstanden. |
| Modal | Wir | möchten | einen Tisch | reservieren. |
| Modal | Maria | will | ihren Freund ins Theater | einladen. |
| Modal | Ich | muss | meinem Vater ein Geschenk | kaufen. |
| Futur I | Ich | werde | morgen ein Video | aufnehmen. |

##### Perfekt: haben o sein

- **haben** es el auxiliar de la mayoría de los verbos:
  - **Ich habe gegessen.**
  - **Ich habe die Aufgaben verstanden.**
- **sein** se usa con determinados verbos intransitivos de desplazamiento o cambio de estado y con algunos verbos específicos:
  - **Ich bin gegangen.**
  - **Die Kinder sind in die Schule gefahren.**

La elección no se reduce a “estado frente a movimiento”; conviene aprender el auxiliar con cada verbo.

##### Verbos modales

Los principales verbos modales son:

| Modalverb | Significado básico |
| :--- | :--- |
| dürfen | poder; tener permiso |
| können | poder; saber hacer |
| mögen | gustar |
| müssen | tener que |
| sollen | deber; recibir una indicación |
| wollen | querer |

**möchten** es la forma de Konjunktiv II de **mögen** y se usa cortésmente como «quisiera».

Con un modal:

- El modal se conjuga y ocupa la posición 2.
- El verbo principal va en infinitivo al final.

`Sujeto + modal conjugado + complementos + infinitivo`

##### Ejercicios resueltos

| Elementos | Solución |
| :--- | :--- |
| möchte – gehen – ins Kino – Anna | **Anna möchte ins Kino gehen.** |
| die Hausaufgaben – die Schüler – machen – müssen | **Die Schüler müssen die Hausaufgaben machen.** |
| gefahren – Frau Müller – in den Urlaub – ist | **Frau Müller ist in den Urlaub gefahren.** |
| dürfen – gehen – zum Konzert – wir | **Wir dürfen zum Konzert gehen.** |
| Marta – besucht – alle Seminare – hat | **Marta hat alle Seminare besucht.** |
| seiner Frau – Michael – hat – gekauft – Blumen | **Michael hat seiner Frau Blumen gekauft.** |
| deine Mutter – anrufen – sollst – du | **Du sollst deine Mutter anrufen.** |
| dürfen – küssen – Sie – die Braut | **Sie dürfen die Braut küssen.** |

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Ich komme aus Mexiko.**  
> *Traducción:* Soy de México / Vengo de México.  
> *Uso:* Indicar procedencia.

> **Wie fährst du heute zur Arbeit?**  
> *Traducción:* ¿Cómo vas hoy al trabajo?  
> *Uso:* Preguntar por el medio de transporte.

> **Mit dem Bus fahre ich zur Arbeit.**  
> *Traducción:* Voy al trabajo en autobús.  
> *Uso:* Destacar el medio de transporte.

> **Wir möchten einen Tisch reservieren.**  
> *Traducción:* Nos gustaría reservar una mesa.  
> *Uso:* Solicitud cortés en un restaurante.

> **Du sollst deine Mutter anrufen.**  
> *Traducción:* Debes llamar a tu madre.  
> *Uso:* Transmitir una recomendación o indicación.

> **Sie dürfen die Braut küssen.**  
> *Traducción:* Puede besar a la novia.  
> *Uso:* Dar permiso formalmente.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** V2 significa segunda posición sintáctica, no necesariamente segunda palabra.
- ⚠️ **Atención:** si un complemento ocupa la posición 1, el sujeto no puede permanecer delante del verbo: **Heute fahre ich**, no `*Heute ich fahre`.
- ⚠️ **Atención:** con un modal, el infinitivo va al final: **Ich muss arbeiten**.
- ⚠️ **Atención:** en Perfekt, el participio va normalmente al final: **Ich habe das verstanden**.
- ⚠️ **Atención:** el sujeto puede omitirse en coordinaciones con sujeto compartido y en imperativos informales.
- ⚠️ **Atención:** **haben** no es solo para “verbos de estado”; es el auxiliar de Perfekt más frecuente.
- ⚠️ **Atención:** el pronombre formal **Sie** se escribe con mayúscula.
- ⚠️ **Atención:** TeKaMoLo orienta el orden neutro, pero el contexto puede modificarlo.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: Ordena: komme – ich – aus Mexiko.
  A: Ich komme aus Mexiko.
  Type: ordering
- Q: Ordena: heute Morgen – ich – zur Arbeit – fahre.
  A: Ich fahre heute Morgen zur Arbeit. / Heute Morgen fahre ich zur Arbeit.
  Type: ordering
- Q: Corrige: Heute Morgen ich fahre zur Arbeit.
  A: Heute Morgen fahre ich zur Arbeit.
  Type: correction
- Q: ¿Qué ocupa la segunda posición en una oración principal enunciativa?
  A: El verbo conjugado o finito.
  Type: flashcard
- Q: ¿Puede una posición contener varias palabras?
  A: Sí. Por ejemplo, heute Morgen ocupa una sola posición.
  Type: flashcard
- Q: Ordena: möchte – gehen – ins Kino – Anna.
  A: Anna möchte ins Kino gehen.
  Type: ordering
- Q: Ordena: die Hausaufgaben – die Schüler – machen – müssen.
  A: Die Schüler müssen die Hausaufgaben machen.
  Type: ordering
- Q: Ordena: gefahren – Frau Müller – in den Urlaub – ist.
  A: Frau Müller ist in den Urlaub gefahren.
  Type: ordering
- Q: Ordena: dürfen – gehen – zum Konzert – wir.
  A: Wir dürfen zum Konzert gehen.
  Type: ordering
- Q: Ordena: Marta – besucht – alle Seminare – hat.
  A: Marta hat alle Seminare besucht.
  Type: ordering
- Q: Ordena: seiner Frau – Michael – hat – gekauft – Blumen.
  A: Michael hat seiner Frau Blumen gekauft.
  Type: ordering
- Q: Ordena: deine Mutter – anrufen – sollst – du.
  A: Du sollst deine Mutter anrufen.
  Type: ordering
- Q: Ordena: dürfen – küssen – Sie – die Braut.
  A: Sie dürfen die Braut küssen.
  Type: ordering
- Q: Completa: Ich ____ die Aufgaben verstanden.
  A: habe
  Type: fill-in-the-blank
- Q: Completa: Die Kinder ____ in die Schule gegangen.
  A: sind
  Type: fill-in-the-blank
- Q: Completa: Wir möchten einen Tisch ____.
  A: reservieren
  Type: fill-in-the-blank
- Q: ¿Dónde se coloca el verbo principal no conjugado con un modal?
  A: Al final de la oración.
  Type: flashcard
- Q: ¿Qué significa TeKaMoLo?
  A: Temporal – Kausal – Modal – Lokal.
  Type: flashcard
- Q: Corrige: Ich muss kaufen meinem Vater ein Geschenk.
  A: Ich muss meinem Vater ein Geschenk kaufen.
  Type: correction
- Q: ¿Cuándo puede omitirse normalmente el sujeto?
  A: En coordinaciones con sujeto compartido y en el imperativo informal.
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 11 — El caso dativo: verbos y preposiciones

*Nivel orientativo:* **A1** · *Alcance A1 de esta app:* ✅

---
class_id: 011
title: "El caso dativo: verbos y preposiciones"
level: "A2"
topics: ["Gramática", "Dativo", "Verbos", "Preposiciones", "Vocabulario", "Expresiones"]
target_exam: "Telc / Goethe A2"
---

### El caso dativo: verbos y preposiciones

#### 1. 🎯 Resumen / Objetivos de la Lección
- Reconocer el dativo y formular la pregunta **Wem?**.
- Declinar pronombres personales, determinantes, posesivos y adjetivos en dativo.
- Usar correctamente verbos frecuentes que rigen dativo.
- Emplear las preposiciones de dativo **ab, aus, bei, mit, nach, seit, von** y **zu**.
- Distinguir estructuras como **Mir gefällt ...**, en las que la persona aparece en dativo.

#### 2. 📚 Vocabulario Clave (Wortschatz)
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Schüler, - | el alumno | Sustantivo | Der Lehrer antwortet dem Schüler. |
| die Schülerin, -nen | la alumna | Sustantivo | Ich helfe der Schülerin. |
| der Lehrer, - | el profesor | Sustantivo | Der Schüler widerspricht dem Lehrer. |
| die Geschichte, -n | la historia | Sustantivo | Die Oma erzählt den Kindern eine Geschichte. |
| der Besitzer, - | el dueño | Sustantivo | Der Hund gehorcht seinem Besitzer. |
| die Organisation, -en | la organización | Sustantivo | Er tritt einer Organisation bei. |
| das Argument, -e | el argumento | Sustantivo | Ich stimme deinem Argument zu. |
| die Argumentation, -en | la argumentación | Sustantivo | Ich kann deiner Argumentation nicht zustimmen. |
| die Uhrzeit, -en | la hora | Sustantivo | Passt Ihnen die Uhrzeit? |
| der Unterricht, sin plural | la clase / enseñanza | Sustantivo | Nach dem Unterricht gehe ich nach Hause. |
| die Ankunft, Ankünfte | la llegada | Sustantivo | seit seiner Ankunft |
| die Hochzeit, -en | la boda | Sustantivo | seit ihrer Hochzeit |
| das Jahrhundert, -e | el siglo | Sustantivo | aus dem zwölften Jahrhundert |
| die Fahrkarte, -n | el billete | Sustantivo | Die Fahrkarte ist ab Montag gültig. |
| das Gold, sin plural | el oro | Sustantivo | Der Ring ist aus reinem Gold. |
| das Weihnachten, - | la Navidad | Sustantivo | Normalmente se usa sin artículo: zu Weihnachten. |
| bundesweit | en todo el país | Adverbio | bundesweit gültig |
| gültig | válido | Adjetivo | Die Fahrkarte ist gültig. |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1 Función y reconocimiento del dativo
- **Regla / Concepto:** El dativo marca con frecuencia al destinatario, beneficiario o experimentante. También aparece obligatoriamente tras determinados verbos y preposiciones.
- **Pregunta:** `Wem?` = ¿a quién? / ¿para quién? La traducción exacta depende del contexto.
- **Estructura / Fórmula:** `Sujeto (Nominativ) + verbo + complemento (Dativ)`
- **Ejemplo:** `Der Lehrer antwortet dem Schüler.` → El profesor contesta al alumno.
- **Atención:** El dativo no funciona como sujeto. Con **sein, werden** y **bleiben**, el atributo permanece en nominativo.

##### 3.2 Pronombres personales en dativo
| Persona | Nominativo | Acusativo | Dativo |
| :--- | :--- | :--- | :--- |
| 1.ª sing. | ich | mich | **mir** |
| 2.ª sing. | du | dich | **dir** |
| 3.ª sing. masc. | er | ihn | **ihm** |
| 3.ª sing. fem. | sie | sie | **ihr** |
| 3.ª sing. neut. | es | es | **ihm** |
| 1.ª plural | wir | uns | **uns** |
| 2.ª plural | ihr | euch | **euch** |
| 3.ª plural | sie | sie | **ihnen** |
| Formal | Sie | Sie | **Ihnen** |

##### 3.3 Determinantes en dativo
| Tipo | Masculino | Femenino | Neutro | Plural |
| :--- | :--- | :--- | :--- | :--- |
| Artículo determinado | dem | der | dem | den + sustantivo en **-n** |
| Artículo indeterminado | einem | einer | einem | — |
| Negación con **kein-** | keinem | keiner | keinem | keinen + sustantivo en **-n** |

- `dem Schüler` → al alumno
- `einer Frau` → a una mujer
- `keinem Hund` → a ningún perro
- `den Kindern` → a los niños

##### 3.4 La marca **-n** del plural
- **Regla / Concepto:** En dativo plural, el sustantivo suele recibir una **-n** adicional.
- `die Kinder` → `mit den Kindern`
- `die Freunde` → `bei meinen Freunden`
- No se añade otra **-n** si el plural ya termina en **-n/-en**, ni normalmente a plurales en **-s**:
  - `die Frauen` → `mit den Frauen`
  - `die Autos` → `mit den Autos`

##### 3.5 Posesivos en dativo
| Poseedor | Masculino / Neutro | Femenino | Plural |
| :--- | :--- | :--- | :--- |
| ich | meinem | meiner | meinen + sustantivo en **-n** |
| du | deinem | deiner | deinen + sustantivo en **-n** |
| er / es | seinem | seiner | seinen + sustantivo en **-n** |
| sie (ella) | ihrem | ihrer | ihren + sustantivo en **-n** |
| wir | unserem | unserer | unseren + sustantivo en **-n** |
| ihr | eurem | eurer | euren + sustantivo en **-n** |
| sie / Sie | ihrem / Ihrem | ihrer / Ihrer | ihren / Ihren + sustantivo en **-n** |

##### 3.6 Adjetivos en dativo
| Construcción | Masculino | Femenino | Neutro | Plural |
| :--- | :--- | :--- | :--- | :--- |
| Con artículo determinado | dem kleinen Hund | der netten Frau | dem kleinen Kind | den kleinen Kindern |
| Con **ein-** / posesivo | einem kleinen Hund | einer netten Frau | einem kleinen Kind | meinen kleinen Kindern |
| Sin determinante | kleinem Hund | netter Frau | kaltem Wasser | kleinen Kindern |

- Tras un artículo o posesivo, el adjetivo lleva normalmente **-en** en dativo.
- Sin determinante: masculino/neutro **-em**, femenino **-er**, plural **-en**.

##### 3.7 Verbos frecuentes que rigen dativo
| Verbo | Clasificación | Español | Ejemplo |
| :--- | :--- | :--- | :--- |
| antworten | Regular + Dativ | contestar | Ich antworte dir. |
| ähneln | Regular + Dativ | parecerse a | Das Kind ähnelt seinem Vater. |
| begegnen | Regular + Dativ; Perfekt con **sein** | encontrarse con | Ich bin einer Frau begegnet. |
| beistehen | Irregular, separable + Dativ | apoyar | Ich stehe meinem Bruder bei. |
| beitreten | Irregular, separable + Dativ | afiliarse / unirse | Er tritt einer Organisation bei. |
| danken | Regular + Dativ | dar las gracias | Ich danke Ihnen. |
| drohen | Regular + Dativ | amenazar | Willst du mir drohen? |
| einfallen | Irregular, separable + Dativ | ocurrírsele | Mir fällt nichts ein. |
| fehlen | Regular + Dativ | hacerle falta a | Seine Frau fehlt ihm. |
| folgen | Regular + Dativ | seguir | Folgen Sie mir, bitte. |
| gefallen | Irregular + Dativ | gustar | Mir gefällt die Schokolade. |
| gehorchen | Regular + Dativ | obedecer | Der Hund gehorcht seinem Besitzer. |
| gehören | Regular + Dativ | pertenecer | Das Spiel gehört ihm. |
| genügen | Regular + Dativ | bastar | Das genügt mir. |
| glauben | Regular + Dativ | creer a alguien | Seine Frau glaubt ihm nicht. |
| gratulieren | Regular + Dativ | felicitar | Ich gratuliere meinem Vater zum Geburtstag. |
| guttun | Irregular, separable + Dativ | sentar bien | Die Reise tut dir gut. |
| helfen | Irregular + Dativ | ayudar | Können Sie mir helfen? |
| hinterherlaufen | Irregular, separable + Dativ | correr detrás de | Das Kind läuft dem Ball hinterher. |
| nachlaufen | Irregular, separable + Dativ | correr detrás de | Ich laufe dem Hund nach. |
| sich nähern | Reflexivo + Dativ | acercarse a | Der Hurrikan nähert sich der Insel. |
| passen | Regular + Dativ | quedarle bien / venirle bien | Das Kleid passt deiner Schwester. |
| passieren | Regular + Dativ; Perfekt con **sein** | sucederle a | Das ist uns noch nie passiert. |
| raten | Irregular + Dativ | aconsejar | Ich rate dir, zum Arzt zu gehen. |
| schaden | Regular + Dativ | perjudicar | Rauchen schadet der Gesundheit. |
| schenken | Regular; Dativ + Akkusativ | regalar | Sie schenkt ihrer Mutter ein Buch. |
| schmecken | Regular + Dativ | saberle / gustarle | Das bayerische Bier schmeckt meinem Vater. |
| vergeben | Irregular + Dativ | perdonar | Er kann seiner Frau nicht vergeben. |
| vertrauen | Regular + Dativ | confiar en | Ich vertraue deinem Freund. |
| verzeihen | Irregular + Dativ | perdonar | Das werde ich dir nie verzeihen. |
| wehtun | Irregular, separable + Dativ | doler | Mein Zahn tut mir weh. |
| widersprechen | Irregular + Dativ | contradecir | Der Schüler widerspricht dem Lehrer. |
| zuhören | Regular, separable + Dativ | escuchar atentamente | Kannst du mir zuhören? |
| zusehen | Irregular, separable + Dativ | observar | Der Chef sieht den Mitarbeitern zu. |
| zustimmen | Regular, separable + Dativ | estar de acuerdo con | Ich stimme dir zu. |

##### 3.8 Verbos con perspectiva especial
- **Regla / Concepto:** Con **gefallen, schmecken, passen, fehlen, einfallen** y **wehtun**, la persona afectada aparece en dativo; la cosa es el sujeto en nominativo.
- **Estructura / Fórmula:** `Persona (Dativ) + verbo + cosa (Nominativ)`
- `Mir gefällt die Schokolade.` → Me gusta el chocolate.
- `Meinem Vater schmeckt das Bier.` → A mi padre le gusta la cerveza.
- `Das Kleid passt meiner Schwester.` → El vestido le queda bien a mi hermana.
- `Meine Familie fehlt mir.` → Echo de menos a mi familia.
- `Mir fällt keine Antwort ein.` → No se me ocurre ninguna respuesta.
- `Mein Zahn tut mir weh.` → Me duele el diente.

##### 3.9 Dativo y acusativo en una misma oración
- **Estructura / Fórmula:** `Sujeto + verbo + destinatario (Dativ) + objeto (Akkusativ)`
- `Die Oma erzählt den Kindern eine Geschichte.`
- `Sie schenkt ihrer Mutter ein Buch.`
- Con dos sustantivos, el dativo suele preceder al acusativo.

##### 3.10 Preposiciones que siempre rigen dativo
| Preposición | Uso principal | Ejemplo |
| :--- | :--- | :--- |
| **ab** | desde / a partir de | Ab dem ersten September ändern sich die Preise. |
| **aus** | procedencia; material; motivo | Der Ring ist aus reinem Gold. |
| **bei** | en casa de; junto a; durante una actividad | Ich bin bei meinen Eltern. |
| **mit** | con; mediante; en un medio de transporte | Er fährt mit dem Auto zur Arbeit. |
| **nach** | hacia ciudades/países sin artículo; después de | Nach dem Unterricht fahre ich nach Berlin. |
| **seit** | desde / desde hace; acción todavía vigente | Seit ihrer Hochzeit wohnt sie in Köln. |
| **von** | de / desde; pertenencia, autor u origen | Sylvia kommt vom Arzt. |
| **zu** | a / hacia una persona o destino concreto; en festividades | Du solltest zum Arzt gehen. |

##### 3.11 Contracciones frecuentes
| Forma completa | Contracción | Ejemplo |
| :--- | :--- | :--- |
| bei dem | **beim** | beim Spülen |
| von dem | **vom** | vom Arzt |
| zu dem | **zum** | zum Arzt |
| zu der | **zur** | zur Arbeit |

- `zu Hause` = en casa.
- `nach Hause` = hacia casa / a casa.
- `nach Spanien`, pero `in die Schweiz`: con países que llevan artículo se usa **in + Akkusativ** para indicar dirección.

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)
> **Können Sie mir bitte helfen?**  
> *Traducción:* ¿Puede ayudarme, por favor?  
> *Uso:* Pedir ayuda formalmente.

> **Ich danke Ihnen.**  
> *Traducción:* Se lo agradezco.  
> *Uso:* Dar las gracias formalmente.

> **Passt Ihnen die Uhrzeit?**  
> *Traducción:* ¿Le viene bien la hora?  
> *Uso:* Concertar una cita.

> **Bitte folgen Sie mir.**  
> *Traducción:* Sígame, por favor.  
> *Uso:* Indicar a alguien que nos acompañe.

> **Ich stimme dir zu.**  
> *Traducción:* Estoy de acuerdo contigo.  
> *Uso:* Expresar acuerdo.

> **Mir fällt nichts ein.**  
> *Traducción:* No se me ocurre nada.  
> *Uso:* Indicar que no se encuentra una idea o respuesta.

> **Ab jetzt rauche ich nicht mehr.**  
> *Traducción:* A partir de ahora ya no fumo.  
> *Uso:* Anunciar un cambio desde el momento presente.

> **Nach dem Unterricht gehe ich nach Hause.**  
> *Traducción:* Después de clase me voy a casa.  
> *Uso:* Hablar de una rutina o plan.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** No traduzcas el dativo mecánicamente como «a + persona». El verbo o la preposición determinan el caso.
- ⚠️ **Atención:** Se dice `Ich helfe dir`, no `Ich helfe dich`.
- ⚠️ **Atención:** En `Mir gefällt das Buch`, **das Buch** es el sujeto nominativo y **mir** es dativo.
- ⚠️ **Atención:** Añade **-n** al sustantivo en dativo plural cuando corresponda: `mit den Kindern`.
- ⚠️ **Atención:** `seit` se usa para una situación que comenzó en el pasado y continúa: `Ich wohne seit einem Jahr hier.`
- ⚠️ **Atención:** `nach Hause` expresa movimiento; `zu Hause` expresa ubicación.
- ⚠️ **Atención:** **Ihnen** con mayúscula es la forma formal; **ihnen** con minúscula significa «a ellos/as».
- ⚠️ **Pronunciación:** En `Schüler`, la **ü** se articula con la lengua de **i** y los labios redondeados como para **u**.
- ⚠️ **Corrección del material:** La forma correcta es **schmecken**, y `einfallen` significa «ocurrírsele / venir a la mente».

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: ¿Qué pregunta identifica normalmente el dativo?
  A: Wem?
  Type: flashcard
- Q: Ich helfe _____. (du)
  A: dir
  Type: fill-in-the-blank
- Q: Der Hund gehört _____. (sie, ella)
  A: ihr
  Type: fill-in-the-blank
- Q: Können Sie _____ bitte helfen? (ich)
  A: mir
  Type: fill-in-the-blank
- Q: Ich danke _____. (Sie, formal)
  A: Ihnen
  Type: fill-in-the-blank
- Q: Wir fahren mit _____ Auto. (das)
  A: dem
  Type: fill-in-the-blank
- Q: Ich helfe _____ Frau. (eine)
  A: einer
  Type: fill-in-the-blank
- Q: Die Oma erzählt den _____ eine Geschichte. (die Kinder)
  A: Kindern
  Type: fill-in-the-blank
- Q: Ich vertraue _____ Freundin. (du)
  A: deiner
  Type: fill-in-the-blank
- Q: Der Lehrer antwortet seinem _____ Schüler. (blond)
  A: blonden
  Type: fill-in-the-blank
- Q: Traducción: Me gusta el chocolate.
  A: Mir gefällt die Schokolade.
  Type: flashcard
- Q: Traducción: El diente me duele.
  A: Mein Zahn tut mir weh.
  Type: flashcard
- Q: Das Kleid passt _____ Schwester. (mein)
  A: meiner
  Type: fill-in-the-blank
- Q: Sie schenkt _____ Mutter ein Buch. (ihr)
  A: ihrer
  Type: fill-in-the-blank
- Q: Nach dem Unterricht gehe ich _____ Hause.
  A: nach
  Type: fill-in-the-blank
- Q: Ich bin _____ Hause.
  A: zu
  Type: fill-in-the-blank
- Q: Sylvia kommt _____ Arzt. (von + dem)
  A: vom
  Type: fill-in-the-blank
- Q: Du solltest _____ Arzt gehen. (zu + dem)
  A: zum
  Type: fill-in-the-blank
- Q: Wir fahren _____ dem Auto.
  A: mit
  Type: fill-in-the-blank
- Q: Seit _____ Hochzeit wohnt sie in Köln. (ihr)
  A: ihrer
  Type: fill-in-the-blank
- Q: Corrige la oración: Ich helfe dich.
  A: Ich helfe dir.
  Type: correction
- Q: Corrige la oración: Mir gefällt den Film.
  A: Mir gefällt der Film.
  Type: correction
- Q: Traducción: No se me ocurre nada.
  A: Mir fällt nichts ein.
  Type: flashcard
- Q: Traducción: Estoy de acuerdo contigo.
  A: Ich stimme dir zu.
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 12 — El caso genitivo: posesión, preposiciones y verbos

*Nivel orientativo:* **A2/B1** · *Alcance A1 de esta app:* 📚

> El genitivo no se examina en Goethe/telc A1. Referencia futura.

---
class_id: 012
title: "El caso genitivo: posesión, preposiciones y verbos"
level: "B2"
topics: ["Gramática", "Genitivo", "Posesión", "Preposiciones", "Verbos", "Vocabulario"]
target_exam: "Telc / Goethe B2"
---

### El caso genitivo: posesión, preposiciones y verbos

#### 1. 🎯 Resumen / Objetivos de la Lección
- Reconocer el genitivo y formular la pregunta **Wessen?**.
- Expresar pertenencia con genitivo, nombres propios y la alternativa **von + Dativ**.
- Declinar artículos, posesivos y adjetivos en genitivo.
- Aplicar correctamente **-(e)s** a sustantivos masculinos y neutros.
- Identificar preposiciones y verbos formales que rigen genitivo.
- Diferenciar el alemán cotidiano de estructuras formales, literarias o anticuadas.

> **Nota de nivel:** El genitivo básico puede aparecer en A1 al expresar posesión, pero muchas preposiciones y casi todos los verbos de esta lección corresponden a niveles superiores y a registros formales.

#### 2. 📚 Vocabulario Clave (Wortschatz)
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Vater, Väter | el padre | Sustantivo | das Auto meines Vaters |
| der Sohn, Söhne | el hijo | Sustantivo | das Zimmer meines Sohnes |
| die Eltern (Pl.) | los padres | Sustantivo | das Haus meiner Eltern |
| die Großeltern (Pl.) | los abuelos | Sustantivo | die Geschichte der Großeltern |
| der Schüler, - | el alumno | Sustantivo | die Fragen des Schülers |
| die Lehrerin, -nen | la profesora | Sustantivo | die Schüler ihrer Lehrerin |
| der Autor, -en | el autor | Sustantivo | der Autor des Buches |
| das Buch, Bücher | el libro | Sustantivo | der Titel des Buches |
| das Kind, -er | el niño / la niña | Sustantivo | das Spielzeug des Kindes |
| der Hund, -e | el perro | Sustantivo | der Ball unseres Hundes |
| der Täter, - | el autor de un delito | Sustantivo | Mithilfe der Polizei wurde der Täter festgenommen. |
| der Mord, -e | el asesinato | Sustantivo | des Mordes angeklagt |
| der Diebstahl, Diebstähle | el robo | Sustantivo | des Diebstahls beschuldigt |
| der Betrug, Betrüge | el fraude | Sustantivo | des Betrugs verdächtigt |
| das Amt, Ämter | el cargo / la función | Sustantivo | seines Amtes enthoben |
| der Besitz, sin plural | la posesión / propiedad | Sustantivo | sich seines Besitzes rühmen |
| die Verpflichtung, -en | la obligación | Sustantivo | sich einer Verpflichtung entledigen |
| die Bemerkung, -en | el comentario | Sustantivo | sich einer Bemerkung enthalten |
| der Vorfall, Vorfälle | el incidente | Sustantivo | sich des Vorfalls schämen |
| die Gesundheit, sin plural | la salud | Sustantivo | sich bester Gesundheit erfreuen |
| die Universität, -en | la universidad | Sustantivo | außerhalb der Universität |
| der Fluss, Flüsse | el río | Sustantivo | oberhalb eines Flusses |
| der Weg, -e | el camino | Sustantivo | entlang des Weges |
| die Aussicht, -en | la vista / perspectiva | Sustantivo | schöne Aussichten |
| der Sturm, Stürme | la tormenta | Sustantivo | aufgrund eines heftigen Sturms |
| der Streik, -s | la huelga | Sustantivo | infolge eines Streiks |
| die Verspätung, -en | el retraso | Sustantivo | Flugverspätungen |
| der Reisepass, Reisepässe | el pasaporte | Sustantivo | mangels eines Reisepasses |
| das Wetter, sin plural | el tiempo / clima | Sustantivo | wegen des schlechten Wetters |
| die Statistik, -en | la estadística | Sustantivo | laut der Statistik |
| die Hausarbeit, -en | el trabajo académico | Sustantivo | fünf Hausarbeiten abgeben |
| der Unterricht, sin plural | la clase / enseñanza | Sustantivo | während des Unterrichts |
| günstig | económico / favorable | Adjetivo | ein günstiger Preis |
| heftig | fuerte / intenso | Adjetivo | ein heftiger Sturm |
| unbekannt | desconocido | Adjetivo | Der Autor ist unbekannt. |
| festnehmen | detener | Verbo separable irregular | Die Polizei nimmt den Täter fest. |
| abgeben | entregar | Verbo separable irregular | eine Hausarbeit abgeben |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1 Función y reconocimiento del genitivo
- **Regla / Concepto:** El genitivo expresa principalmente posesión, pertenencia o relación.
- **Pregunta:** `Wessen?` = ¿de quién?
- **Estructura / Fórmula:** `sustantivo principal + complemento en Genitiv`
- `Das ist das Auto meines Vaters.` → Este es el coche de mi padre.
- `Die Geschichte der Großeltern ist faszinierend.` → La historia de los abuelos es fascinante.
- El genitivo no es el sujeto; el sujeto permanece en nominativo.

##### 3.2 Genitivo y **von + Dativ**
- En alemán estándar escrito se usa con frecuencia el genitivo:
  - `das Auto meines Vaters`
- En el habla cotidiana es muy común **von + Dativ**:
  - `das Auto von meinem Vater`
- Ambas construcciones expresan aquí pertenencia, pero el genitivo resulta más compacto y formal.

##### 3.3 Determinantes en genitivo
| Tipo | Masculino | Femenino | Neutro | Plural |
| :--- | :--- | :--- | :--- | :--- |
| Artículo determinado | **des** | **der** | **des** | **der** |
| Artículo indeterminado | **eines** | **einer** | **eines** | — |
| Negación con **kein-** | **keines** | **keiner** | **keines** | **keiner** |

- Masculino: `die Fragen des Schülers`
- Femenino: `die Tochter einer Freundin`
- Neutro: `der Autor des Buches`
- Plural: `die Geschichte der Großeltern`

##### 3.4 Terminación del sustantivo masculino y neutro
- **Regla / Concepto:** Los sustantivos masculinos y neutros suelen añadir **-s** o **-es** en genitivo singular.
- Generalmente se usa **-es** con palabras monosilábicas:
  - `das Kind` → `des Kindes`
  - `das Buch` → `des Buches`
  - `der Mann` → `des Mannes`
- Generalmente se usa **-s** con palabras polisilábicas:
  - `das Auto` → `des Autos`
  - `das Studium` → `des Studiums`
  - `der Vater` → `des Vaters`
- Se usa normalmente **-es** tras sonidos sibilantes escritos **-s, -ss, -ß, -x, -z, -tz**:
  - `das Glas` → `des Glases`
  - `der Reflex` → `des Reflexes`
  - `der Arzt` → `des Arztes`
- Los sustantivos terminados en **-nis** duplican la **s**:
  - `das Ergebnis` → `des Ergebnisses`
  - `das Verhältnis` → `des Verhältnisses`
- Algunos sustantivos admiten ambas variantes según el uso: `des Tags / des Tages`.

##### 3.5 Sustantivos masculinos débiles
- Algunos masculinos no añaden **-(e)s**, sino **-n/-en** en todos los casos salvo el nominativo singular:
  - `der Student` → `des Studenten`
  - `der Junge` → `des Jungen`
  - `der Mensch` → `des Menschen`
- Caso especial:
  - `der Name` → `des Namens`

##### 3.6 Nombres propios
- Los nombres propios suelen colocarse delante del objeto poseído y añadir **-s**, sin apóstrofo:
  - `Petras Kinder` → los hijos de Petra
  - `Stefans Frau` → la mujer de Stefan
- Si el nombre termina en sonido de **s, ß, x, z**, se escribe solo apóstrofo:
  - `Max' Auto`
  - `Hans' Fahrrad`

##### 3.7 Posesivos en genitivo
| Poseedor | Masculino / Neutro | Femenino / Plural |
| :--- | :--- | :--- |
| ich | meines | meiner |
| du | deines | deiner |
| er / es | seines | seiner |
| sie (ella) | ihres | ihrer |
| wir | unseres | unserer |
| ihr | eures | eurer |
| sie / Sie | ihres / Ihres | ihrer / Ihrer |

- `der Ball unseres Hundes` → la pelota de nuestro perro
- `der Bruder seiner Frau` → el hermano de su mujer
- `die Fehler ihrer Schüler` → los errores de sus alumnos

##### 3.8 Adjetivos en genitivo
| Construcción | Masculino | Femenino | Neutro | Plural |
| :--- | :--- | :--- | :--- | :--- |
| Artículo determinado | des guten Weins | der blauen Bluse | des kleinen Kindes | der kleinen Kinder |
| **ein-** / posesivo | eines guten Weins | einer blauen Bluse | meines kleinen Kindes | meiner kleinen Kinder |
| Sin determinante | guten Weins | blauer Farbe | kalten Wassers | kleiner Kinder |

- Tras artículos y posesivos, el adjetivo lleva normalmente **-en** en genitivo.

##### 3.9 Preposiciones que rigen genitivo
| Preposición | Significado | Ejemplo |
| :--- | :--- | :--- |
| **anhand** | mediante / basándose en | Anhand eines Beispiels erkläre ich den Genitiv. |
| **mithilfe** | con ayuda de | Mithilfe der Polizei wurde der Täter festgenommen. |
| **außerhalb** | fuera de | Außerhalb der Universität gibt es Supermärkte. |
| **innerhalb** | dentro de / en un plazo de | Innerhalb der nächsten zehn Tage muss ich die Arbeit abgeben. |
| **oberhalb** | por encima de | Die Wohnung liegt oberhalb eines Flusses. |
| **unterhalb** | por debajo de | Unterhalb des Hauses fließt ein Bach. |
| **entlang** | a lo largo de | Entlang des Weges gibt es schöne Aussichten. |
| **aufgrund** | debido a | Aufgrund eines heftigen Sturms bleiben wir zu Hause. |
| **infolge** | a consecuencia de | Infolge eines Streiks gibt es Verspätungen. |
| **mangels** | por falta de | Mangels eines Reisepasses darf man nicht fliegen. |
| **wegen** | a causa de | Wegen des schlechten Wetters bleiben wir zu Hause. |
| **statt / anstatt** | en lugar de | Statt eines Autos kaufte er ein Fahrrad. |
| **trotz** | a pesar de | Trotz des schlechten Wetters gehen wir spazieren. |
| **bezüglich** | con respecto a | Bezüglich des Termins hat sich nichts geändert. |
| **hinsichtlich** | en lo referente a | Hinsichtlich der Kosten gibt es Fragen. |
| **laut** | según | Laut der Statistik verdienen Frauen weniger. |
| **während** | durante | Während des Unterrichts bleiben Handys ausgeschaltet. |

###### Variación de uso
- **wegen** y **trotz** aparecen a veces con dativo en la lengua coloquial, pero en alemán estándar se recomienda el genitivo.
- **laut** admite genitivo o dativo.
- **entlang** también es muy frecuente detrás del sustantivo con acusativo: `den Weg entlang`.

##### 3.10 Verbos y expresiones que rigen genitivo
Estas construcciones pertenecen principalmente al alemán formal, jurídico o literario.

| Verbo / expresión | Clasificación | Significado | Ejemplo normalizado |
| :--- | :--- | :--- | :--- |
| jemanden einer Sache anklagen | Separable, jurídico | acusar formalmente | Der Staatsanwalt klagt ihn des Mordes an. |
| sich einer Sache bedienen | Reflexivo, formal | servirse de | Er bediente sich ihrer Kontakte. |
| einer Sache bedürfen | Irregular, formal | necesitar | Das bedarf keiner weiteren Erklärung. |
| sich einer Sache befleißigen | Reflexivo, muy formal | esforzarse en | Sie befleißigt sich großer Zurückhaltung. |
| jemanden eines Besseren belehren | Expresión fija | demostrarle que se equivoca | Die Erfahrung belehrte ihn eines Besseren. |
| sich einer Sache bemächtigen | Reflexivo, formal | apoderarse de | Sie bemächtigten sich des Geldes. |
| jemanden einer Sache beschuldigen | Regular, jurídico | acusar de | Er wurde des Diebstahls beschuldigt. |
| sich eines Besseren besinnen | Irregular, expresión fija | reconsiderarlo | Sie besann sich eines Besseren. |
| sich einer Sache bewusst sein | Expresión fija | ser consciente de | Sie ist sich ihrer Fehler bewusst. |
| jemanden einer Sache bezichtigen | Regular, jurídico | acusar de | Er bezichtigte sie des Diebstahls. |
| sich einer Sache brüsten | Reflexivo | presumir de | Sie brüstet sich ihres Geldes. |
| einer Sache entbehren | Irregular, formal | carecer de | Die Behauptung entbehrt jeder Grundlage. |
| jemanden einer Sache entheben | Irregular, formal | destituir de | Er wurde seines Amtes enthoben. |
| sich einer Sache enthalten | Reflexivo, irregular | abstenerse de | Ich enthielt mich jeder Bemerkung. |
| sich einer Sache entledigen | Reflexivo, formal | librarse de | Sie entledigte sich ihrer Verpflichtung. |
| sich einer Sache erfreuen | Reflexivo, formal | gozar de | Sie erfreut sich bester Gesundheit. |
| einer Sache ermangeln | Regular, muy formal | carecer de | Der Plan ermangelt jeder Vernunft. |
| einer Person / Sache gedenken | Irregular, solemne | conmemorar / recordar | Wir gedenken der Opfer. |
| sich einer Sache rühmen | Reflexivo, formal | jactarse de | Er rühmt sich seines Besitzes. |
| sich einer Sache schämen | Reflexivo | avergonzarse de | Ich schäme mich meines Fehlers. |
| jemanden einer Sache verdächtigen | Regular, jurídico | sospechar de | Wir verdächtigen ihn des Betrugs. |
| jemanden des Landes verweisen | Irregular, jurídico | expulsar del país | Das Gericht verwies ihn des Landes. |
| seines Amtes walten | Irregular, solemne | ejercer su cargo | Er waltet seines Amtes. |
| jemanden keines Blickes würdigen | Regular, expresión fija | no dignarse a mirar | Sie würdigte mich keines Blickes. |
| jemanden einer Sache zeihen | Irregular, anticuado | acusar de | Man zieh ihn des Verrats. |

##### 3.11 Correcciones esenciales del material de origen
- **bedenken** no rige genitivo: `Ich muss diese Sache bedenken.` (**Akkusativ**)
- En alemán moderno se dice normalmente `sich an etwas erinnern`:
  - `Ich erinnere mich an den Termin.` (**an + Akkusativ**)
- `sich einer Prüfung unterziehen` significa «someterse a un examen», no «tomar»:
  - `Sie unterzieht sich einer Prüfung.`
- La forma correcta del participio de **entheben** es **enthoben**:
  - `Er wurde seines Amtes enthoben.`
- Para «vale la pena» se usa normalmente:
  - `Es lohnt sich.` / `Es lohnt sich nicht.`

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)
> **Wessen Auto ist das?**  
> *Traducción:* ¿De quién es ese coche?  
> *Uso:* Preguntar por el propietario.

> **Das ist das Auto meines Vaters.**  
> *Traducción:* Este es el coche de mi padre.  
> *Uso:* Expresar pertenencia.

> **Wegen des schlechten Wetters bleiben wir zu Hause.**  
> *Traducción:* Debido al mal tiempo nos quedamos en casa.  
> *Uso:* Explicar una causa.

> **Trotz des Regens gehen wir spazieren.**  
> *Traducción:* A pesar de la lluvia salimos a pasear.  
> *Uso:* Expresar una dificultad que no impide la acción.

> **Während des Unterrichts sind die Handys ausgeschaltet.**  
> *Traducción:* Durante la clase los móviles están apagados.  
> *Uso:* Expresar una norma temporal.

> **Laut der Statistik ...**  
> *Traducción:* Según la estadística...  
> *Uso:* Introducir una fuente de información.

> **Das bedarf keiner weiteren Erklärung.**  
> *Traducción:* Eso no requiere más explicación.  
> *Uso:* Registro formal.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** Masculino y neutro usan **des/eines** y el sustantivo suele añadir **-(e)s**: `des Kindes`.
- ⚠️ **Atención:** Femenino y plural usan **der/einer**, sin añadir **-(e)s** al sustantivo: `der Frau`, `der Kinder`.
- ⚠️ **Atención:** No añadas apóstrofo ante la **-s** de un nombre propio: `Petras Auto`, no `Petra's Auto`.
- ⚠️ **Atención:** `des Studenten` pertenece a la declinación débil; no se dice `des Students`.
- ⚠️ **Atención:** En conversación, `von + Dativ` es frecuente, pero conviene reconocer el genitivo en textos.
- ⚠️ **Atención:** Los verbos con genitivo de esta lección no son vocabulario productivo prioritario para A1.
- ⚠️ **Pronunciación:** En **Wessen?**, la **w** alemana suena como la **v** española.
- ⚠️ **Pronunciación:** La terminación **-es** forma una sílaba audible en `Kindes` y `Buches`.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: ¿Qué pregunta identifica una relación de genitivo?
  A: Wessen?
  Type: flashcard
- Q: Das ist das Auto _____ Vaters. (mein)
  A: meines
  Type: fill-in-the-blank
- Q: Die Farbe _____ Autos ist rot. (das)
  A: des
  Type: fill-in-the-blank
- Q: Der Titel des _____ ist interessant. (das Buch)
  A: Buches
  Type: fill-in-the-blank
- Q: Das Spielzeug des _____ liegt hier. (das Kind)
  A: Kindes
  Type: fill-in-the-blank
- Q: Die Geschichte _____ Großeltern ist spannend. (die)
  A: der
  Type: fill-in-the-blank
- Q: Das ist der Mantel _____ Freundin. (sein)
  A: seiner
  Type: fill-in-the-blank
- Q: Traducción: ¿De quién es el libro?
  A: Wessen Buch ist das?
  Type: flashcard
- Q: Traducción: Es el coche de Petra.
  A: Es ist Petras Auto.
  Type: flashcard
- Q: Forma el genitivo: das Ergebnis
  A: des Ergebnisses
  Type: flashcard
- Q: Forma el genitivo: der Student
  A: des Studenten
  Type: flashcard
- Q: Forma el genitivo: der Arzt
  A: des Arztes
  Type: flashcard
- Q: Wegen _____ schlechten Wetters bleiben wir zu Hause. (das)
  A: des
  Type: fill-in-the-blank
- Q: Trotz _____ heftigen Sturms gehen sie spazieren. (ein)
  A: eines
  Type: fill-in-the-blank
- Q: Während _____ Unterrichts bleiben die Handys aus. (der)
  A: des
  Type: fill-in-the-blank
- Q: _____ der Statistik verdienen Frauen weniger. (Según)
  A: Laut
  Type: fill-in-the-blank
- Q: Er wurde _____ Diebstahls beschuldigt. (der)
  A: des
  Type: fill-in-the-blank
- Q: Sie ist sich _____ Fehler bewusst. (ihr, plural)
  A: ihrer
  Type: fill-in-the-blank
- Q: Corrige la oración: Ich muss einer Sache bedenken.
  A: Ich muss eine Sache bedenken.
  Type: correction
- Q: Corrige la oración: Ich erinnere mich des Termins. (alemán moderno)
  A: Ich erinnere mich an den Termin.
  Type: correction
- Q: Corrige la oración: Er wurde seines Amtes enthebt.
  A: Er wurde seines Amtes enthoben.
  Type: correction
- Q: Completa la alternativa coloquial: das Auto _____ meinem Vater
  A: von
  Type: fill-in-the-blank
- Q: Traducción: Debido a una tormenta fuerte.
  A: Aufgrund eines heftigen Sturms.
  Type: flashcard
- Q: Traducción: Durante la clase.
  A: Während des Unterrichts.
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 13 — Ejemplos de oraciones con los cuatro casos

*Nivel orientativo:* **A2** · *Alcance A1 de esta app:* 📚

> Repaso comparativo de los 4 casos (incluye genitivo); puente útil, no exigible en A1.

---
class_id: 013
title: "Ejemplos de oraciones con los cuatro casos"
level: "B1"
topics: ["Gramática", "Nominativo", "Acusativo", "Dativo", "Genitivo", "Orden de la oración"]
target_exam: "Telc / Goethe B1"
---

### Ejemplos de oraciones con los cuatro casos

#### 1. 🎯 Resumen / Objetivos de la Lección
- Identificar la función del nominativo, acusativo, dativo y genitivo dentro de una oración.
- Analizar oraciones con destinatario en dativo y objeto directo en acusativo.
- Reconocer complementos de posesión en genitivo dentro de grupos nominales.
- Distinguir el caso de un grupo completo de los casos que aparecen dentro de él.
- Aplicar el orden básico de los complementos sin confundirlo con una regla absolutamente fija.

#### 2. 📚 Vocabulario Clave (Wortschatz)
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Vater, Väter | el padre | Sustantivo | meinem Vater |
| die Oma, -s | la abuela | Sustantivo | seiner Oma |
| der Hund, -e | el perro | Sustantivo | ihrem schönen Hund |
| die Großeltern (Pl.) | los abuelos | Sustantivo | unseren Großeltern |
| das Mädchen, - | la chica / niña | Sustantivo | dem Mädchen |
| der Student, -en | el estudiante | Sustantivo débil | seinen Studenten |
| der Freund, -e | el amigo / novio | Sustantivo | eines Freundes |
| die Freundin, -nen | la amiga / novia | Sustantivo | meiner besten Freundin |
| der Chef, -s | el jefe | Sustantivo | seines Chefs |
| der Minister, - | el ministro | Sustantivo | das Haus des Ministers |
| der Bruder, Brüder | el hermano | Sustantivo | meines alten Bruders |
| die Schwester, -n | la hermana | Sustantivo | Eriks Schwester |
| das Geschenk, -e | el regalo | Sustantivo | ein kleines Geschenk |
| das Abendessen, - | la cena | Sustantivo | das Abendessen kochen |
| der Ball, Bälle | la pelota | Sustantivo | einen roten Ball |
| der Brief, -e | la carta | Sustantivo | einen Brief schicken |
| der Kuchen, - | el pastel / la tarta | Sustantivo | einen großen Kuchen |
| das Geld, sin plural | el dinero | Sustantivo | das Geld ihres Vaters |
| die Uhr, -en | el reloj | Sustantivo | Die Uhr gehört ... |
| die Reise, -n | el viaje | Sustantivo | eine Reise machen |
| der Tango, -s | el tango | Sustantivo | einen Tango tanzen |
| kaufen | comprar | Verbo regular + Akk./Dat. | jemandem etwas kaufen |
| kochen | cocinar | Verbo regular + Akk./Dat. | jemandem das Abendessen kochen |
| geben | dar | Verbo irregular + Akk./Dat. | du gibst |
| schicken | enviar | Verbo regular + Akk./Dat. | jemandem einen Brief schicken |
| bringen | llevar / traer | Verbo irregular + Akk./Dat. | jemandem einen Kuchen bringen |
| empfehlen | recomendar | Verbo irregular + Akk./Dat. | jemandem etwas empfehlen |
| beobachten | observar | Verbo regular + Akk. | ein Haus beobachten |
| verlieren | perder | Verbo irregular + Akk. | Geld verlieren |
| gehören | pertenecer | Verbo regular + Dat. | Die Uhr gehört Eriks Schwester. |
| eine Reise machen | hacer un viaje | Expresión | Er machte eine Reise. |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1 Función básica de los cuatro casos
| Caso | Pregunta | Función frecuente | Ejemplo |
| :--- | :--- | :--- | :--- |
| Nominativo | Wer? / Was? | Sujeto | **Ich** kaufe ein Geschenk. |
| Acusativo | Wen? / Was? | Objeto directo | Ich kaufe **ein Geschenk**. |
| Dativo | Wem? | Destinatario / objeto indirecto | Ich kaufe **meinem Vater** ein Geschenk. |
| Genitivo | Wessen? | Posesión / relación | das Auto **meines Bruders** |

##### 3.2 Patrón con nominativo, dativo y acusativo
- **Estructura / Fórmula:** `Sujeto (Nom.) + verbo + destinatario (Dat.) + objeto (Akk.)`
- Este orden es muy frecuente cuando ambos complementos son sustantivos.
- El verbo conjugado ocupa la segunda posición de la oración principal.

| Oración | Nominativo | Verbo | Dativo | Acusativo | Otro complemento |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Ich kaufe meinem Vater ein kleines Geschenk. | ich | kaufe | meinem Vater | ein kleines Geschenk | — |
| Mein Freund kocht seiner Oma das Abendessen um 10 Uhr. | mein Freund | kocht | seiner Oma | das Abendessen | um 10 Uhr |
| Du gibst ihrem schönen Hund einen roten Ball. | du | gibst | ihrem schönen Hund | einen roten Ball | — |
| Meine Mutter schickt unseren Großeltern einen Brief am Wochenende. | meine Mutter | schickt | unseren Großeltern | einen Brief | am Wochenende |
| Die Kinder bringen dem Mädchen einen großen Kuchen zum Geburtstag. | die Kinder | bringen | dem Mädchen | einen großen Kuchen | zum Geburtstag |
| Der Lehrer empfiehlt seinen Studenten gute Bücher. | der Lehrer | empfiehlt | seinen Studenten | gute Bücher | — |

##### 3.3 Traducción de los ejemplos
| Alemán | Español |
| :--- | :--- |
| Ich kaufe meinem Vater ein kleines Geschenk. | Le compro un pequeño regalo a mi padre. |
| Mein Freund kocht seiner Oma das Abendessen um 10 Uhr. | Mi amigo le prepara la cena a su abuela a las diez. |
| Du gibst ihrem schönen Hund einen roten Ball. | Le das una pelota roja a su bonito perro. |
| Meine Mutter schickt unseren Großeltern einen Brief am Wochenende. | Mi madre envía una carta a nuestros abuelos el fin de semana. |
| Die Kinder bringen dem Mädchen einen großen Kuchen zum Geburtstag. | Los niños le llevan a la chica una tarta grande por su cumpleaños. |
| Der Lehrer empfiehlt seinen Studenten gute Bücher. | El profesor recomienda buenos libros a sus estudiantes. |

##### 3.4 Concordancia dentro de cada grupo
- El determinante y el adjetivo concuerdan con el género, número y caso del sustantivo.

| Grupo | Análisis |
| :--- | :--- |
| meinem Vater | masculino singular, dativo |
| ihrer schönen Hund | incorrecto |
| ihrem schönen Hund | masculino singular, dativo |
| einen roten Ball | masculino singular, acusativo |
| unseren Großeltern | plural, dativo |
| dem Mädchen | neutro singular, dativo |
| einen großen Kuchen | masculino singular, acusativo |
| seinen Studenten | masculino plural, dativo |
| gute Bücher | neutro plural, acusativo sin artículo |

##### 3.5 Genitivo dentro de otro complemento
- Un grupo nominal puede tener un caso por su función en la oración y contener otro grupo en genitivo.
- **Estructura / Fórmula:** `núcleo en Nom./Akk./Dat. + complemento posesivo en Gen.`

###### Ejemplo 1
`Ich kaufe dem Vater meiner besten Freundin ein kleines Geschenk.`

- `ich` = sujeto, nominativo.
- `dem Vater meiner besten Freundin` = destinatario, dativo.
- `dem Vater` = núcleo del grupo en dativo.
- `meiner besten Freundin` = complemento en genitivo: indica de quién es el padre.
- `ein kleines Geschenk` = objeto directo, acusativo.
- Traducción: Le compro un pequeño regalo al padre de mi mejor amiga.

###### Ejemplo 2
`Erwin tanzt mit der Frau seines Chefs einen Tango.`

- `Erwin` = sujeto, nominativo.
- `mit der Frau seines Chefs` = complemento introducido por **mit**.
- `der Frau` = dativo exigido por **mit**.
- `seines Chefs` = genitivo; indica de quién es la mujer.
- `einen Tango` = acusativo.
- Traducción: Erwin baila un tango con la mujer de su jefe.

También es correcto:

`Erwin tanzt einen Tango mit der Frau seines Chefs.`

##### 3.6 Oraciones con acusativo y genitivo
| Oración | Sujeto (Nom.) | Objeto (Akk.) | Posesivo (Gen.) |
| :--- | :--- | :--- | :--- |
| Jemand beobachtet das Haus des Ministers. | jemand | das Haus | des Ministers |
| Lisa verliert das Geld ihres Vaters. | Lisa | das Geld | ihres Vaters |
| Ich kaufe das Auto meines alten Bruders. | ich | das Auto | meines alten Bruders |

- `Jemand beobachtet das Haus des Ministers.`  
  Alguien observa la casa del ministro.
- `Lisa verliert das Geld ihres Vaters.`  
  Lisa pierde el dinero de su padre.
- `Ich kaufe das Auto meines alten Bruders.`  
  Compro el coche de mi hermano de edad avanzada.

##### 3.7 Posesión con nombre propio
`Die Uhr gehört Eriks Schwester.`

- `die Uhr` = sujeto, nominativo.
- `gehört` = verbo que rige dativo.
- `Eriks Schwester` = grupo completo en dativo; la forma de `Schwester` coincide visualmente con nominativo.
- `Eriks` = genitivo de nombre propio y significa «de Erik».
- Traducción: El reloj pertenece a la hermana de Erik.

Comparación:

`Die Uhr gehört der Schwester eines Freundes.`

- `der Schwester eines Freundes` = grupo completo en dativo.
- `der Schwester` = núcleo en dativo.
- `eines Freundes` = posesivo en genitivo.
- Traducción: El reloj pertenece a la hermana de un amigo.

##### 3.8 Complemento con preposición y genitivo interno
`Er machte mit dem Auto seiner Mutter eine Reise.`

- `er` = sujeto, nominativo.
- `mit dem Auto seiner Mutter` = complemento preposicional.
- `dem Auto` = dativo exigido por **mit**.
- `seiner Mutter` = genitivo; indica de quién es el coche.
- `eine Reise` = acusativo.
- Traducción: Hizo un viaje con el coche de su madre.

También es correcto:

`Er machte eine Reise mit dem Auto seiner Mutter.`

##### 3.9 Orden de los complementos
- Con dos sustantivos, suele aparecer primero el dativo y después el acusativo:
  - `Ich gebe dem Kind einen Ball.`
- Si el acusativo es un pronombre, suele ir antes:
  - `Ich gebe ihn dem Kind.`
- Si ambos son pronombres, el acusativo suele preceder al dativo:
  - `Ich gebe ihn ihm.`
- Los complementos preposicionales pueden cambiar de posición según la información que se quiera destacar:
  - `Er macht mit dem Auto eine Reise.`
  - `Er macht eine Reise mit dem Auto.`

##### 3.10 El caso depende de la función, no de la posición
- Mover un complemento no cambia automáticamente su caso:
  - `Erwin tanzt mit der Frau einen Tango.`
  - `Erwin tanzt einen Tango mit der Frau.`
- `mit der Frau` sigue en dativo porque **mit** siempre rige dativo.

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)
> **Ich kaufe meinem Vater ein Geschenk.**  
> *Traducción:* Le compro un regalo a mi padre.  
> *Uso:* Hablar de compras destinadas a otra persona.

> **Was schenkst du deiner Mutter zum Geburtstag?**  
> *Traducción:* ¿Qué le regalas a tu madre por su cumpleaños?  
> *Uso:* Preguntar por un regalo.

> **Der Lehrer empfiehlt seinen Studenten gute Bücher.**  
> *Traducción:* El profesor recomienda buenos libros a sus estudiantes.  
> *Uso:* Hacer una recomendación.

> **Wem gehört die Uhr?**  
> *Traducción:* ¿A quién pertenece el reloj?  
> *Uso:* Preguntar por el propietario.

> **Die Uhr gehört Eriks Schwester.**  
> *Traducción:* El reloj pertenece a la hermana de Erik.  
> *Uso:* Indicar pertenencia.

> **Wessen Auto ist das?**  
> *Traducción:* ¿De quién es este coche?  
> *Uso:* Preguntar por posesión.

> **Das ist das Auto meines Bruders.**  
> *Traducción:* Es el coche de mi hermano.  
> *Uso:* Expresar posesión.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** En `meinem Vater` se usa dativo; en `meines Vaters` se usa genitivo.
- ⚠️ **Atención:** `gehören` rige dativo: `Die Uhr gehört der Schwester`, no `die Schwester`.
- ⚠️ **Atención:** En `dem Vater meiner Freundin`, **dem Vater** es dativo y **meiner Freundin** es genitivo.
- ⚠️ **Atención:** El plural dativo suele añadir **-n**: `unseren Großeltern`, `seinen Studenten`.
- ⚠️ **Atención:** El masculino acusativo lleva **-en** en determinante y adjetivo: `einen roten Ball`.
- ⚠️ **Atención:** `das Mädchen` es neutro, aunque se refiera a una persona femenina: `dem Mädchen`.
- ⚠️ **Atención:** El orden de los elementos ayuda a interpretar la oración, pero las terminaciones indican el caso.
- ⚠️ **Pronunciación:** En **Großeltern**, la letra **ß** suena como una **s** sorda.
- ⚠️ **Pronunciación:** En **Bücher**, la **ü** se articula con labios redondeados y **ch** tiene un sonido suave.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: En «Ich kaufe meinem Vater ein Geschenk», ¿qué caso tiene «ich»?
  A: Nominativo.
  Type: flashcard
- Q: En «Ich kaufe meinem Vater ein Geschenk», ¿qué caso tiene «meinem Vater»?
  A: Dativo.
  Type: flashcard
- Q: En «Ich kaufe meinem Vater ein Geschenk», ¿qué caso tiene «ein Geschenk»?
  A: Acusativo.
  Type: flashcard
- Q: Ich kaufe _____ Vater ein Geschenk. (mein)
  A: meinem
  Type: fill-in-the-blank
- Q: Du gibst _____ schönen Hund einen Ball. (ihr)
  A: ihrem
  Type: fill-in-the-blank
- Q: Du gibst ihrem Hund _____ roten Ball. (ein)
  A: einen
  Type: fill-in-the-blank
- Q: Meine Mutter schickt unseren _____ einen Brief. (die Großeltern)
  A: Großeltern
  Type: fill-in-the-blank
- Q: Die Kinder bringen _____ Mädchen einen Kuchen. (das)
  A: dem
  Type: fill-in-the-blank
- Q: Der Lehrer empfiehlt seinen _____ gute Bücher. (der Student, plural)
  A: Studenten
  Type: fill-in-the-blank
- Q: En «dem Vater meiner Freundin», ¿qué caso tiene «dem Vater»?
  A: Dativo.
  Type: flashcard
- Q: En «dem Vater meiner Freundin», ¿qué caso tiene «meiner Freundin»?
  A: Genitivo.
  Type: flashcard
- Q: Das ist das Haus _____ Ministers. (der)
  A: des
  Type: fill-in-the-blank
- Q: Lisa verliert das Geld _____ Vaters. (ihr)
  A: ihres
  Type: fill-in-the-blank
- Q: Erwin tanzt mit der Frau _____ Chefs. (sein)
  A: seines
  Type: fill-in-the-blank
- Q: Die Uhr gehört _____ Schwester. (der)
  A: der
  Type: fill-in-the-blank
- Q: Die Uhr gehört der Schwester _____ Freundes. (ein)
  A: eines
  Type: fill-in-the-blank
- Q: Ich kaufe das Auto _____ alten Bruders. (mein)
  A: meines
  Type: fill-in-the-blank
- Q: Er machte eine Reise mit dem Auto _____ Mutter. (sein)
  A: seiner
  Type: fill-in-the-blank
- Q: Traducción: Le compro un regalo a mi padre.
  A: Ich kaufe meinem Vater ein Geschenk.
  Type: flashcard
- Q: Traducción: El reloj pertenece a la hermana de Erik.
  A: Die Uhr gehört Eriks Schwester.
  Type: flashcard
- Q: Traducción: Alguien observa la casa del ministro.
  A: Jemand beobachtet das Haus des Ministers.
  Type: flashcard
- Q: Corrige la oración: Ich gebe meinem Hund einen rote Ball.
  A: Ich gebe meinem Hund einen roten Ball.
  Type: correction
- Q: Corrige la oración: Die Uhr gehört die Schwester.
  A: Die Uhr gehört der Schwester.
  Type: correction
- Q: Ordena: einen Brief / meinen Großeltern / ich / schicke
  A: Ich schicke meinen Großeltern einen Brief.
  Type: sentence-order
<!-- DATA_QUIZ_END -->


---


### Unidad 14 — La N-Deklination: sustantivos masculinos débiles

*Nivel orientativo:* **A2/B1** · *Alcance A1 de esta app:* 📚

> Fuera del alcance A1.

---
class_id: 014
title: "La N-Deklination: sustantivos masculinos débiles"
level: "B1"
topics: ["Gramática", "N-Deklination", "Sustantivos", "Casos", "Vocabulario"]
target_exam: "Telc / Goethe B1"
---

### La N-Deklination: sustantivos masculinos débiles

#### 1. 🎯 Resumen / Objetivos de la Lección
- Reconocer los sustantivos masculinos de la **N-Deklination** o declinación débil.
- Añadir correctamente **-n** o **-en** en acusativo, dativo y genitivo singular.
- Distinguir el singular declinado del plural mediante el artículo y el contexto.
- Identificar grupos frecuentes: personas, profesiones, nacionalidades y animales.
- Diferenciar la declinación débil pura de la declinación mixta.
- Aprender la forma especial de **das Herz**.

#### 2. 📚 Vocabulario Clave (Wortschatz)

##### Personas, profesiones y funciones
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Student, -en | el estudiante | Sustantivo débil | Ich sehe den Studenten. |
| der Assistent, -en | el asistente | Sustantivo débil | mit dem Assistenten |
| der Präsident, -en | el presidente | Sustantivo débil | des Präsidenten |
| der Praktikant, -en | el becario / estudiante en prácticas | Sustantivo débil | einen Praktikanten |
| der Lieferant, -en | el proveedor | Sustantivo débil | dem Lieferanten |
| der Doktorand, -en | el doctorando | Sustantivo débil | der Doktorand / den Doktoranden |
| der Polizist, -en | el policía | Sustantivo débil | mit dem Polizisten |
| der Egoist, -en | el egoísta | Sustantivo débil | einen Egoisten |
| der Journalist, -en | el periodista | Sustantivo débil | des Journalisten |
| der Kandidat, -en | el candidato | Sustantivo débil | dem Kandidaten |
| der Soldat, -en | el soldado | Sustantivo débil | einen Soldaten |
| der Diplomat, -en | el diplomático | Sustantivo débil | mit einem Diplomaten |
| der Demokrat, -en | el demócrata | Sustantivo débil | der Demokrat / die Demokraten |
| der Kamerad, -en | el compañero / camarada | Sustantivo débil | seinem Kameraden |
| der Biologe, -n | el biólogo | Sustantivo débil | mit dem Biologen |
| der Pädagoge, -n | el pedagogo | Sustantivo débil | einen Pädagogen |
| der Soziologe, -n | el sociólogo | Sustantivo débil | des Soziologen |
| der Herr, -en | el señor | Sustantivo débil irregular | Guten Tag, meine Herren! |
| der Nachbar, -n | el vecino | Sustantivo débil | Ich helfe dem Nachbarn. |
| der Bauer, -n | el campesino / agricultor | Sustantivo débil | auf dem Feld des Bauern |
| der Kollege, -n | el compañero de trabajo | Sustantivo débil | mit meinem Kollegen |
| der Experte, -n | el experto | Sustantivo débil | einen Experten fragen |
| der Junge, -n | el chico | Sustantivo débil | Ich sehe den Jungen. |
| der Zeuge, -n | el testigo | Sustantivo débil | Der Polizist fragt den Zeugen. |
| der Kunde, -n | el cliente | Sustantivo débil | dem Kunden helfen |
| der Erbe, -n | el heredero | Sustantivo débil | des Erben |
| der Mensch, -en | la persona / el ser humano | Sustantivo débil | alle Menschen |
| der Architekt, -en | el arquitecto | Sustantivo débil | mit dem Architekten |
| der Chaot, -en | la persona caótica | Sustantivo débil | einen Chaoten |
| der Depp, -en | el necio / idiota | Sustantivo débil, coloquial | einen Deppen |
| der Favorit, -en | el favorito | Sustantivo débil | mein Favorit / meinen Favoriten |
| der Fotograf, -en | el fotógrafo | Sustantivo débil | beim Fotografen |
| der Idiot, -en | el idiota | Sustantivo débil | einen Idioten |
| der Narr, -en | el necio / bufón | Sustantivo débil | des Narren |
| der Pilot, -en | el piloto | Sustantivo débil | mit dem Piloten |
| der Prinz, -en | el príncipe | Sustantivo débil | den Prinzen |

##### Nacionalidades
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Pole, -n | el polaco | Sustantivo débil | Ich kenne einen Polen. |
| der Franzose, -n | el francés | Sustantivo débil | der Sohn des Franzosen |
| der Chinese, -n | el chino | Sustantivo débil | mit einem Chinesen |
| der Spanier, - | el español | Sustantivo regular | No pertenece a la N-Deklination. |
| der Mexikaner, - | el mexicano | Sustantivo regular | Ich kenne einen Mexikaner. |
| der Kolumbianer, - | el colombiano | Sustantivo regular | mit einem Kolumbianer |
| der Argentinier, - | el argentino | Sustantivo regular | der Argentinier / die Argentinier |
| der Venezolaner, - | el venezolano | Sustantivo regular | eines Venezolaners |
| der Deutsche, die Deutschen | el alemán | Adjetivo sustantivado | ein Deutscher / einen Deutschen |

##### Animales y otros sustantivos
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Affe, -n | el mono | Sustantivo débil | den Affen |
| der Bär, -en | el oso | Sustantivo débil | des Bären |
| der Coyote, -n | el coyote | Sustantivo débil | dem Coyoten |
| der Hase, -n | la liebre | Sustantivo débil | einen Hasen |
| der Löwe, -n | el león | Sustantivo débil | des Löwen |
| der Diamant, -en | el diamante | Sustantivo débil | der Wert des Diamanten |
| der Konsonant, -en | la consonante | Sustantivo débil | einen Konsonanten |
| der Automat, -en | la máquina automática | Sustantivo débil | am Automaten |
| der Planet, -en | el planeta | Sustantivo débil | auf einem anderen Planeten |

##### Sustantivos de declinación mixta y caso especial
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Name, -n | el nombre | Declinación mixta | den Namen; des Namens |
| der Buchstabe, -n | la letra | Declinación mixta | den Buchstaben; des Buchstabens |
| der Gedanke, -n | el pensamiento / idea | Declinación mixta | den Gedanken; des Gedankens |
| der Glaube, generalmente sin plural | la fe / creencia | Declinación mixta | den Glauben; des Glaubens |
| der Wille, generalmente sin plural | la voluntad | Declinación mixta | den Willen; des Willens |
| der Friede / Frieden, generalmente sin plural | la paz | Declinación mixta | den Frieden; des Friedens |
| das Herz, -en | el corazón | Neutro especial | das Herz; dem Herzen; des Herzens |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1 Regla básica
- **Regla / Concepto:** Los sustantivos masculinos débiles añaden **-n** o **-en** en todos los casos del singular excepto el nominativo.
- **Estructura / Fórmula:** `Nominativ: der Student` → `Akk./Dat./Gen.: Studenten`

| Caso | Pregunta | Artículo + sustantivo |
| :--- | :--- | :--- |
| Nominativo | Wer? | der Student |
| Acusativo | Wen? | den Studenten |
| Dativo | Wem? | dem Studenten |
| Genitivo | Wessen? | des Studenten |
| Plural nominativo/acusativo | Wer? / Wen? | die Studenten |
| Plural dativo | Wem? | den Studenten |
| Plural genitivo | Wessen? | der Studenten |

##### 3.2 Singular o plural
- La forma del sustantivo puede ser idéntica:
  - `Ich sehe den Präsidenten.` → Veo **al presidente**.
  - `Ich sehe die Präsidenten.` → Veo **a los presidentes**.
- El artículo, el verbo y el contexto indican el número.
- El plural sí se declina mediante artículos y determinantes, aunque la forma del sustantivo normalmente permanezca igual.

##### 3.3 Terminación **-n**
Los sustantivos débiles que ya terminan en **-e** reciben normalmente solo **-n**:

| Nominativo | Acusativo / Dativo / Genitivo |
| :--- | :--- |
| der Biologe | den / dem / des Biologen |
| der Kollege | den / dem / des Kollegen |
| der Junge | den / dem / des Jungen |
| der Löwe | den / dem / des Löwen |
| der Franzose | den / dem / des Franzosen |

##### 3.4 Terminación **-en**
Muchos masculinos débiles terminados en consonante reciben **-en**:

| Terminación frecuente | Ejemplos |
| :--- | :--- |
| -ant / -and / -ent | der Lieferant, der Doktorand, der Student |
| -ist | der Polizist, der Journalist, der Egoist |
| -at | der Kandidat, der Soldat, der Diplomat |
| otras formas | der Mensch, der Architekt, der Pilot, der Prinz |

##### 3.5 Genitivo de la declinación débil
- Los sustantivos débiles puros terminan en **-n/-en**, sin añadir **-s**:
  - `des Studenten`
  - `des Präsidenten`
  - `des Bären`
  - `des Löwen`
- Para alemán estándar actual, evita formas como `des Präsidentens`.

##### 3.6 Declinación mixta
- Algunos sustantivos se comportan como débiles en acusativo y dativo, pero añaden **-ns/-ens** en genitivo.

| Sustantivo | Nominativo | Acusativo | Dativo | Genitivo |
| :--- | :--- | :--- | :--- | :--- |
| der Name | der Name | den Namen | dem Namen | des Namens |
| der Buchstabe | der Buchstabe | den Buchstaben | dem Buchstaben | des Buchstabens |
| der Gedanke | der Gedanke | den Gedanken | dem Gedanken | des Gedankens |
| der Glaube | der Glaube | den Glauben | dem Glauben | des Glaubens |
| der Wille | der Wille | den Willen | dem Willen | des Willens |
| der Friede / Frieden | der Friede / Frieden | den Frieden | dem Frieden | des Friedens |

##### 3.7 Caso especial: **das Herz**
- **das Herz** es neutro, pero presenta formas semejantes a la declinación mixta.

| Caso | Forma |
| :--- | :--- |
| Nominativo | das Herz |
| Acusativo | das Herz |
| Dativo | dem Herzen |
| Genitivo | des Herzens |
| Plural | die Herzen |

- `Mein Herz schlägt schnell.` → Mi corazón late rápido.
- `Ich habe Schmerzen im Herzen.` → Tengo dolores en el corazón.

##### 3.8 **der Deutsche**: adjetivo sustantivado
- **der Deutsche** no es un sustantivo débil normal, sino un adjetivo usado como sustantivo.
- Por eso su terminación depende también del determinante:

| Caso | Con artículo determinado | Con artículo indeterminado |
| :--- | :--- | :--- |
| Nominativo | der Deutsche | ein Deutscher |
| Acusativo | den Deutschen | einen Deutschen |
| Dativo | dem Deutschen | einem Deutschen |
| Genitivo | des Deutschen | eines Deutschen |

##### 3.9 Nacionalidades que no son débiles
- No todas las nacionalidades masculinas pertenecen a la N-Deklination:
  - `der Spanier` → `den Spanier` → `des Spaniers`
  - `der Mexikaner` → `den Mexikaner` → `des Mexikaners`
  - `der Argentinier` → `den Argentinier` → `des Argentiniers`

##### 3.10 Cómo reconocerlos
- Son masculinos.
- Muchos designan personas, profesiones, nacionalidades o animales.
- Son frecuentes las terminaciones **-e, -ant, -and, -ent, -ist, -at, -oge**.
- También existen palabras no animadas: `der Planet`, `der Diamant`, `der Automat`.
- La terminación ofrece una pista, pero conviene aprender cada sustantivo junto con su plural:
  - `der Student, -en`
  - `der Löwe, -n`

##### 3.11 Ejemplos analizados
| Oración | Caso del sustantivo débil | Explicación |
| :--- | :--- | :--- |
| Der Student lernt Deutsch. | Nominativo | Es el sujeto; no lleva **-en**. |
| Ich sehe den Studenten. | Acusativo | Objeto directo; lleva **-en**. |
| Ich helfe dem Studenten. | Dativo | **helfen** rige dativo. |
| Das Buch des Studenten ist neu. | Genitivo | Expresa posesión. |
| Ich frage einen Experten. | Acusativo | `der Experte` → `einen Experten`. |
| Wir sprechen mit dem Nachbarn. | Dativo | **mit** rige dativo. |

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)
> **Ich frage einen Experten.**  
> *Traducción:* Le pregunto a un experto.  
> *Uso:* Solicitar información especializada.

> **Kann ich mit dem Chef sprechen?**  
> *Traducción:* ¿Puedo hablar con el jefe?  
> *Uso:* Pedir hablar con una persona responsable.  
> *Nota:* `der Chef` no pertenece a la N-Deklination: `mit dem Chef`.

> **Ich helfe meinem Nachbarn.**  
> *Traducción:* Ayudo a mi vecino.  
> *Uso:* Hablar de ayuda cotidiana.

> **Der Polizist fragt den Zeugen.**  
> *Traducción:* El policía interroga al testigo.  
> *Uso:* Describir una situación policial.

> **Wie ist Ihr Name?**  
> *Traducción:* ¿Cuál es su nombre?  
> *Uso:* Preguntar formalmente el nombre.

> **Bitte schreiben Sie Ihren Namen hier.**  
> *Traducción:* Escriba aquí su nombre, por favor.  
> *Uso:* Formularios y trámites.

> **Von ganzem Herzen!**  
> *Traducción:* ¡De todo corazón!  
> *Uso:* Expresar sinceridad o afecto.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** Se dice `Ich sehe den Studenten`, no `den Student`.
- ⚠️ **Atención:** El genitivo débil estándar es `des Präsidenten`, no `des Präsidentens`.
- ⚠️ **Atención:** `der Bär` forma `den Bären`, `dem Bären` y `des Bären`; no se añade **-s**.
- ⚠️ **Atención:** `der Name` es mixto: `den Namen`, pero `des Namens`.
- ⚠️ **Atención:** `das Herz` mantiene la forma simple en acusativo: `Ich höre das Herz`.
- ⚠️ **Atención:** `der Deutsche` cambia como un adjetivo: `ein Deutscher`, pero `einen Deutschen`.
- ⚠️ **Atención:** `der Bauer` significa campesino o agricultor; “obrero de la construcción” es `der Bauarbeiter`.
- ⚠️ **Atención:** `der Automat` es una máquina automática; un cajero automático es específicamente `der Geldautomat`.
- ⚠️ **Pronunciación:** En `Studenten`, el grupo **st** al inicio suena aproximadamente **sht**.
- ⚠️ **Pronunciación:** En `Löwen`, la **ö** se articula con la lengua de **e** y los labios redondeados.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: Der Student lernt. ¿Qué forma corresponde al nominativo?
  A: der Student
  Type: flashcard
- Q: Ich sehe den _____. (der Student)
  A: Studenten
  Type: fill-in-the-blank
- Q: Ich helfe dem _____. (der Student)
  A: Studenten
  Type: fill-in-the-blank
- Q: Das Buch des _____ ist neu. (der Student)
  A: Studenten
  Type: fill-in-the-blank
- Q: Wir sprechen mit dem _____. (der Präsident)
  A: Präsidenten
  Type: fill-in-the-blank
- Q: Ich frage einen _____. (der Experte)
  A: Experten
  Type: fill-in-the-blank
- Q: Der Polizist sieht den _____. (der Zeuge)
  A: Zeugen
  Type: fill-in-the-blank
- Q: Ich helfe meinem _____. (der Nachbar)
  A: Nachbarn
  Type: fill-in-the-blank
- Q: Das Fahrrad des _____ ist neu. (der Junge)
  A: Jungen
  Type: fill-in-the-blank
- Q: Wir fotografieren einen _____. (der Löwe)
  A: Löwen
  Type: fill-in-the-blank
- Q: Der Wert des _____ ist hoch. (der Diamant)
  A: Diamanten
  Type: fill-in-the-blank
- Q: Ich kenne einen _____. (der Pole)
  A: Polen
  Type: fill-in-the-blank
- Q: Ich spreche mit einem _____. (der Deutsche)
  A: Deutschen
  Type: fill-in-the-blank
- Q: Ich kenne einen _____. (der Spanier)
  A: Spanier
  Type: fill-in-the-blank
- Q: Bitte schreiben Sie Ihren _____. (der Name)
  A: Namen
  Type: fill-in-the-blank
- Q: Die Bedeutung des _____ ist klar. (der Name)
  A: Namens
  Type: fill-in-the-blank
- Q: Ich verstehe den _____. (der Gedanke)
  A: Gedanken
  Type: fill-in-the-blank
- Q: Die Kraft des _____ ist groß. (der Glaube)
  A: Glaubens
  Type: fill-in-the-blank
- Q: Ich höre das _____. (das Herz)
  A: Herz
  Type: fill-in-the-blank
- Q: Er trägt die Hoffnung im _____. (das Herz)
  A: Herzen
  Type: fill-in-the-blank
- Q: Corrige la oración: Ich sehe den Präsident.
  A: Ich sehe den Präsidenten.
  Type: correction
- Q: Corrige la oración: Das Auto des Studenten ist neu.
  A: La oración ya es correcta.
  Type: correction
- Q: Corrige la oración: Der Name des Studentens ist Paul.
  A: Der Name des Studenten ist Paul.
  Type: correction
- Q: ¿Cuál es el plural de «der Präsident»?
  A: die Präsidenten
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 15 — Posición de los complementos en acusativo y dativo

*Nivel orientativo:* **A1/A2** · *Alcance A1 de esta app:* ✅

> El orden básico Dativ antes de Akkusativ con pronombres simples sí aparece en A1.

---
class_id: 015
title: "Posición de los complementos en acusativo y dativo"
level: "B1"
topics: ["Gramática", "Orden de la oración", "Acusativo", "Dativo", "Pronombres", "Ejercicios"]
target_exam: "Telc / Goethe B1"
---

### Posición de los complementos en acusativo y dativo

#### 1. 🎯 Resumen / Objetivos de la Lección
- Ordenar complementos en dativo y acusativo dentro de una oración.
- Distinguir entre complementos expresados mediante sustantivos y pronombres.
- Aplicar las tres reglas básicas del orden **Dat./Akk.**.
- Sustituir objetos por sus pronombres personales correspondientes.
- Reconocer cambios de orden motivados por información conocida o énfasis.
- Resolver y corregir ejercicios de traducción con ambos casos.

#### 2. 📚 Vocabulario Clave (Wortschatz)
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Vater, Väter | el padre | Sustantivo | seinem Sohn ein Geschenk geben |
| der Sohn, Söhne | el hijo | Sustantivo | seinem Sohn |
| der Chef, -s | el jefe | Sustantivo | Der Chef schickt ... |
| der Mitarbeiter, - | el empleado / colaborador | Sustantivo | den Mitarbeitern |
| das Kind, -er | el niño / la niña | Sustantivo | den Kindern |
| die Familie, -n | la familia | Sustantivo | der ganzen Familie |
| die Kollegin, -nen | la compañera de trabajo | Sustantivo | meiner Kollegin |
| der Abteilungsleiter, - | el jefe de departamento | Sustantivo | dem Abteilungsleiter |
| der Lehrer, - | el profesor | Sustantivo | dem Lehrer |
| die Eltern (Pl.) | los padres | Sustantivo | meinen Eltern |
| die Freundin, -nen | la amiga / novia | Sustantivo | seiner Freundin |
| der Cousin, -s | el primo | Sustantivo | ihrem Cousin |
| der Kellner, - | el camarero | Sustantivo | Der Kellner bringt ... |
| der Schüler, - | el alumno | Sustantivo | den Schülern |
| das Geschenk, -e | el regalo | Sustantivo | ein Geschenk |
| die E-Mail, -s | el correo electrónico | Sustantivo | eine E-Mail schicken |
| die Geschichte, -n | la historia | Sustantivo | eine Geschichte erzählen |
| die Wohnung, -en | el piso / vivienda | Sustantivo | ihre neue Wohnung |
| die Urlaubsreise, -n | el viaje de vacaciones | Sustantivo | eine Urlaubsreise schenken |
| das Studium, Studien | los estudios / la carrera | Sustantivo | mein Studium finanzieren |
| die Grammatik, -en | la gramática | Sustantivo | die deutsche Grammatik |
| das Dokument, -e | el documento | Sustantivo | das Dokument geben |
| der Blumenstrauß, Blumensträuße | el ramo de flores | Sustantivo | einen Blumenstrauß |
| das Wochenende, -n | el fin de semana | Sustantivo | ein schönes Wochenende |
| das Projekt, -e | el proyecto | Sustantivo | sein Projekt erklären |
| die Lüge, -n | la mentira | Sustantivo | Lügen erzählen |
| die Speisekarte, -n | la carta / el menú | Sustantivo | die Speisekarte bringen |
| der Nachtisch, -e | el postre | Sustantivo | einen Nachtisch empfehlen |
| die Hausaufgabe, -n | el deber / tarea | Sustantivo | normalmente en plural: die Hausaufgaben |
| geben | dar | Verbo irregular + Dat./Akk. | jemandem etwas geben |
| schicken | enviar | Verbo regular + Dat./Akk. | jemandem eine E-Mail schicken |
| erzählen | contar | Verbo regular + Dat./Akk. | jemandem eine Geschichte erzählen |
| zeigen | mostrar | Verbo regular + Dat./Akk. | jemandem etwas zeigen |
| schenken | regalar | Verbo regular + Dat./Akk. | jemandem etwas schenken |
| finanzieren | financiar | Verbo regular + Dat./Akk. | jemandem etwas finanzieren |
| erklären | explicar | Verbo regular + Dat./Akk. | jemandem etwas erklären |
| wünschen | desear | Verbo regular + Dat./Akk. | jemandem etwas wünschen |
| bringen | traer / llevar | Verbo irregular + Dat./Akk. | jemandem etwas bringen |
| empfehlen | recomendar | Verbo irregular + Dat./Akk. | jemandem etwas empfehlen |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1 Función de los complementos
- **Acusativo:** suele representar la cosa o persona directamente afectada.
- **Dativo:** suele representar al destinatario o beneficiario.
- **Pregunta de acusativo:** `Wen? / Was?`
- **Pregunta de dativo:** `Wem?`

`Der Vater gibt seinem Sohn ein Geschenk.`

- `der Vater` = sujeto en nominativo.
- `seinem Sohn` = destinatario en dativo.
- `ein Geschenk` = objeto en acusativo.

##### 3.2 Las tres reglas básicas
| Tipo de complementos | Orden habitual | Ejemplo |
| :--- | :--- | :--- |
| Dos sustantivos | **Dativ + Akkusativ** | Ich gebe **dem Lehrer** **das Dokument**. |
| Un pronombre y un sustantivo | **Pronombre + sustantivo** | Ich gebe **ihm** **das Dokument**. / Ich gebe **es** **dem Lehrer**. |
| Dos pronombres | **Akkusativ + Dativ** | Ich gebe **es** **ihm**. |

##### 3.3 Dos sustantivos: dativo antes de acusativo
- **Estructura / Fórmula:** `Sujeto + verbo + persona (Dativ) + cosa (Akkusativ)`

| Oración | Dativo | Acusativo | Traducción |
| :--- | :--- | :--- | :--- |
| Der Chef schickt den Mitarbeitern eine E-Mail. | den Mitarbeitern | eine E-Mail | El jefe envía un correo a los empleados. |
| Die Mutter erzählt den Kindern eine Geschichte. | den Kindern | eine Geschichte | La madre cuenta una historia a los niños. |
| Meine Schwester zeigt der ganzen Familie ihre neue Wohnung. | der ganzen Familie | ihre neue Wohnung | Mi hermana enseña su nuevo piso a toda la familia. |
| Mark schenkt Maria eine Urlaubsreise. | Maria | eine Urlaubsreise | Mark regala a María un viaje de vacaciones. |
| Meine Eltern finanzieren mir mein Studium. | mir | mein Studium | Mis padres me financian los estudios. |
| Andy erklärt uns die deutsche Grammatik. | uns | die deutsche Grammatik | Andy nos explica la gramática alemana. |

> Los nombres propios sin artículo, como **Maria**, no muestran una terminación visible de caso.

##### 3.4 Un pronombre: el pronombre va primero
Si solo uno de los dos objetos es pronombre, normalmente se coloca antes del sustantivo.

| Forma completa | Dativo como pronombre | Acusativo como pronombre |
| :--- | :--- | :--- |
| Ich gebe dem Lehrer das Dokument. | Ich gebe **ihm** das Dokument. | Ich gebe **es** dem Lehrer. |
| Wir zeigen meinen Eltern unsere Wohnung. | Wir zeigen **ihnen** unsere Wohnung. | Wir zeigen **sie** meinen Eltern. |

##### 3.5 Dos pronombres: acusativo antes de dativo
- **Estructura / Fórmula:** `Sujeto + verbo + pronombre Akk. + pronombre Dat.`

| Forma completa | Dos pronombres |
| :--- | :--- |
| Ich gebe dem Lehrer das Dokument. | Ich gebe **es ihm**. |
| Wir zeigen meinen Eltern unsere Wohnung. | Wir zeigen **sie ihnen**. |
| Martin schenkt seiner Freundin einen Blumenstrauß. | Martin schenkt **ihn ihr**. |

##### 3.6 Pronombres personales necesarios
| Referente | Acusativo | Dativo |
| :--- | :--- | :--- |
| der Blumenstrauß / der Film | ihn | ihm |
| die E-Mail / die Wohnung | sie | ihr |
| das Buch / das Geschenk | es | ihm |
| die Bücher / die Hausaufgaben | sie | ihnen |
| ich | mich | mir |
| du | dich | dir |
| wir | uns | uns |
| ihr | euch | euch |
| Sie | Sie | Ihnen |

##### 3.7 Información conocida y énfasis
- Los pronombres suelen representar información ya conocida y aparecen pronto en la oración.
- Si una pregunta trata sobre un objeto concreto, ese objeto puede adelantarse para mantener el tema:

`Was hast du mit dem Buch gemacht?`  
`Ich habe das Buch meiner Kollegin gegeben.`

- Una respuesta más natural evita repetir el sustantivo:

`Ich habe es meiner Kollegin gegeben.`

##### 3.8 Orden en el Perfekt
- En el **Perfekt**, los complementos aparecen entre el auxiliar y el participio.
- **Estructura / Fórmula:** `Sujeto + haben/sein + complementos + participio`

`Ich habe es meiner Kollegin gegeben.`

- `habe` ocupa la segunda posición.
- `gegeben` aparece al final.
- `es` va antes de `meiner Kollegin` porque es pronombre.

##### 3.9 El orden es una regla general, no una prohibición absoluta
- El alemán permite variar el orden por énfasis, contraste o contexto.
- Para producir oraciones neutrales y naturales en A1, conviene aplicar:
  1. dos sustantivos → **Dat. + Akk.**
  2. un pronombre → **pronombre primero**
  3. dos pronombres → **Akk. + Dat.**

##### 3.10 Ejercicios resueltos: traducción
| # | Español | Alemán | Dativo | Acusativo |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Martin le regala un ramo de flores a su novia. | Martin schenkt seiner Freundin einen Blumenstrauß. | seiner Freundin | einen Blumenstrauß |
| 2 | ¡Os deseo un buen fin de semana! | Ich wünsche euch ein schönes Wochenende! | euch | ein schönes Wochenende |
| 3 | Mi marido me explica su proyecto. | Mein Mann erklärt mir sein Projekt. | mir | sein Projekt |
| 4 | Mis hijos me cuentan mentiras. | Meine Kinder erzählen mir Lügen. | mir | Lügen |
| 5 | Anna compra un regalo a su primo. | Anna kauft ihrem Cousin ein Geschenk. | ihrem Cousin | ein Geschenk |
| 6a | El camarero nos trae el menú. | Der Kellner bringt uns die Speisekarte. | uns | die Speisekarte |
| 6b | El camarero nos recomienda un postre. | Der Kellner empfiehlt uns einen Nachtisch. | uns | einen Nachtisch |
| 7 | ¿Puede recomendarme esta película alemana? | Können Sie mir diesen deutschen Film empfehlen? | mir | diesen deutschen Film |
| 8 | El profesor explica los deberes a los alumnos. | Der Lehrer erklärt den Schülern die Hausaufgaben. | den Schülern | die Hausaufgaben |

##### 3.11 Ejercicios resueltos: sustitución por pronombres
| # | Oración completa | Con dos pronombres | Orden |
| :--- | :--- | :--- | :--- |
| 1 | Martin schenkt seiner Freundin einen Blumenstrauß. | Martin schenkt **ihn ihr**. | Akk. + Dat. |
| 2 | Ich wünsche euch ein schönes Wochenende. | Ich wünsche **es euch**. | Akk. + Dat. |
| 3 | Mein Mann erklärt mir sein Projekt. | Mein Mann erklärt **es mir**. | Akk. + Dat. |
| 4 | Meine Kinder erzählen mir Lügen. | Meine Kinder erzählen **sie mir**. | Akk. + Dat. |
| 5 | Anna kauft ihrem Cousin ein Geschenk. | Anna kauft **es ihm**. | Akk. + Dat. |
| 6a | Der Kellner bringt uns die Speisekarte. | Der Kellner bringt **sie uns**. | Akk. + Dat. |
| 6b | Der Kellner empfiehlt uns einen Nachtisch. | Der Kellner empfiehlt **ihn uns**. | Akk. + Dat. |
| 7 | Können Sie mir diesen deutschen Film empfehlen? | Können Sie **ihn mir** empfehlen? | Akk. + Dat. |
| 8 | Der Lehrer erklärt den Schülern die Hausaufgaben. | Der Lehrer erklärt **sie ihnen**. | Akk. + Dat. |

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)
> **Ich wünsche euch ein schönes Wochenende!**  
> *Traducción:* ¡Os deseo un buen fin de semana!  
> *Uso:* Despedirse antes del fin de semana.

> **Können Sie mir diesen Film empfehlen?**  
> *Traducción:* ¿Puede recomendarme esta película?  
> *Uso:* Pedir una recomendación formalmente.

> **Wem hast du die E-Mail geschickt?**  
> *Traducción:* ¿A quién le has enviado el correo?  
> *Uso:* Preguntar por el destinatario.

> **Ich habe sie dem Abteilungsleiter geschickt.**  
> *Traducción:* Se lo he enviado al jefe de departamento.  
> *Uso:* Responder sin repetir `die E-Mail`.

> **Was hast du mit dem Buch gemacht?**  
> *Traducción:* ¿Qué has hecho con el libro?  
> *Uso:* Preguntar por un objeto conocido.

> **Ich habe es meiner Kollegin gegeben.**  
> *Traducción:* Se lo he dado a mi compañera.  
> *Uso:* Explicar qué se hizo con el libro.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** Con dos sustantivos, usa normalmente dativo antes de acusativo: `dem Kind einen Ball`.
- ⚠️ **Atención:** Con dos pronombres, invierte ese orden: `ihn ihm`, no `ihm ihn`.
- ⚠️ **Atención:** El pronombre **es** representa sustantivos neutros: `das Geschenk` → `es`.
- ⚠️ **Atención:** **ihn** es acusativo masculino; **ihm** es dativo masculino o neutro.
- ⚠️ **Atención:** **ihnen** significa «a ellos/as»; **Ihnen** con mayúscula es formal.
- ⚠️ **Atención:** El dativo plural suele añadir **-n** al sustantivo: `den Schülern`, `den Kindern`.
- ⚠️ **Atención:** La grafía recomendada es **E-Mail**, con mayúscula y guion.
- ⚠️ **Pronunciación:** En `schicken`, **sch** suena aproximadamente como la “sh” inglesa.
- ⚠️ **Pronunciación:** En `wünschen`, la **w** suena como **v** y la **ü** se pronuncia con labios redondeados.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: Si dativo y acusativo son sustantivos, ¿cuál suele ir primero?
  A: El dativo.
  Type: flashcard
- Q: Si ambos complementos son pronombres, ¿cuál suele ir primero?
  A: El pronombre acusativo.
  Type: flashcard
- Q: Ich gebe dem Lehrer das Dokument. Sustituye solo el dativo.
  A: Ich gebe ihm das Dokument.
  Type: transformation
- Q: Ich gebe dem Lehrer das Dokument. Sustituye solo el acusativo.
  A: Ich gebe es dem Lehrer.
  Type: transformation
- Q: Ich gebe dem Lehrer das Dokument. Sustituye ambos objetos.
  A: Ich gebe es ihm.
  Type: transformation
- Q: Wir zeigen meinen Eltern unsere Wohnung. Sustituye ambos objetos.
  A: Wir zeigen sie ihnen.
  Type: transformation
- Q: Martin schenkt seiner Freundin einen Blumenstrauß. Sustituye ambos objetos.
  A: Martin schenkt ihn ihr.
  Type: transformation
- Q: Mein Mann erklärt mir sein Projekt. Sustituye ambos objetos.
  A: Mein Mann erklärt es mir.
  Type: transformation
- Q: Anna kauft ihrem Cousin ein Geschenk. Sustituye ambos objetos.
  A: Anna kauft es ihm.
  Type: transformation
- Q: Der Kellner bringt uns die Speisekarte. Sustituye ambos objetos.
  A: Der Kellner bringt sie uns.
  Type: transformation
- Q: Der Kellner empfiehlt uns einen Nachtisch. Sustituye ambos objetos.
  A: Der Kellner empfiehlt ihn uns.
  Type: transformation
- Q: Der Lehrer erklärt den Schülern die Hausaufgaben. Sustituye ambos objetos.
  A: Der Lehrer erklärt sie ihnen.
  Type: transformation
- Q: Traducción: Martin le regala un ramo de flores a su novia.
  A: Martin schenkt seiner Freundin einen Blumenstrauß.
  Type: flashcard
- Q: Traducción: ¡Os deseo un buen fin de semana!
  A: Ich wünsche euch ein schönes Wochenende!
  Type: flashcard
- Q: Traducción: Mi marido me explica su proyecto.
  A: Mein Mann erklärt mir sein Projekt.
  Type: flashcard
- Q: Traducción: Mis hijos me cuentan mentiras.
  A: Meine Kinder erzählen mir Lügen.
  Type: flashcard
- Q: Traducción: ¿Puede recomendarme esta película alemana?
  A: Können Sie mir diesen deutschen Film empfehlen?
  Type: flashcard
- Q: Ordena: einen Brief / seinem Vater / er / schickt
  A: Er schickt seinem Vater einen Brief.
  Type: sentence-order
- Q: Ordena: ihm / er / ihn / gibt
  A: Er gibt ihn ihm.
  Type: sentence-order
- Q: Corrige: Ich gebe ihm es.
  A: Ich gebe es ihm.
  Type: correction
- Q: Corrige: Wir zeigen meinen Eltern sie.
  A: Wir zeigen sie meinen Eltern.
  Type: correction
- Q: Was hast du mit dem Buch gemacht? Responde usando «es» y «meiner Kollegin».
  A: Ich habe es meiner Kollegin gegeben.
  Type: fill-in-the-blank
- Q: ¿Qué pronombre sustituye a «die E-Mail» en acusativo?
  A: sie
  Type: flashcard
- Q: ¿Qué pronombre sustituye a «der Film» en acusativo?
  A: ihn
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 16 — Wechselpräpositionen: acusativo o dativo

*Nivel orientativo:* **A1/A2** · *Alcance A1 de esta app:* ✅

> Las preposiciones de dos casos más frecuentes (in, an, auf...) son A1; el detalle fino es A2.

---
class_id: 016
title: "Wechselpräpositionen: acusativo o dativo"
level: "A2"
topics: ["Gramática", "Preposiciones", "Acusativo", "Dativo", "Ubicación", "Dirección", "Vocabulario"]
target_exam: "Telc / Goethe A2"
---

### Wechselpräpositionen: acusativo o dativo

#### 1. 🎯 Resumen / Objetivos de la Lección
- Reconocer las nueve **Wechselpräpositionen**.
- Elegir acusativo para expresar destino, dirección o cambio de posición.
- Elegir dativo para expresar una ubicación sin cambio de lugar.
- Formular y responder las preguntas **Wohin?** y **Wo?**.
- Distinguir pares verbales como **legen/liegen**, **stellen/stehen** y **setzen/sitzen**.
- Utilizar correctamente varios usos temporales de estas preposiciones.

#### 2. 📚 Vocabulario Clave (Wortschatz)

##### Lugares y objetos de los ejemplos
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Tisch, -e | la mesa | Sustantivo | auf dem Tisch |
| der Stuhl, Stühle | la silla | Sustantivo | hinter dem Stuhl |
| der Mann, Männer | el hombre | Sustantivo | neben dem Mann |
| der Hund, -e | el perro | Sustantivo | unter dem Tisch |
| der Fluss, Flüsse | el río | Sustantivo | am Fluss |
| der Fuß, Füße | el pie | Sustantivo | zu Fuß |
| die Wand, Wände | la pared | Sustantivo | an der Wand |
| die Tasche, -n | el bolso / la bolsa | Sustantivo | in der Tasche |
| die Lampe, -n | la lámpara | Sustantivo | über dem Tisch |
| die Wohnung, -en | el piso / apartamento | Sustantivo | in der Wohnung |
| die Halle, -n | la sala / pabellón | Sustantivo | in der Halle |
| die Streichholzschachtel, -n | la caja de cerillas | Sustantivo | in der Schachtel |
| das Bild, -er | el cuadro / la imagen | Sustantivo | an die Wand hängen |
| das Buch, Bücher | el libro | Sustantivo | auf den Tisch legen |
| das Geld, sin plural | el dinero | Sustantivo | in die Tasche stecken |
| das Fenster, - | la ventana | Sustantivo | vor dem Fenster |
| das Haus, Häuser | la casa | Sustantivo | hinter dem Haus |
| das Museum, Museen | el museo | Sustantivo | ins Museum gehen |
| das Schiff, -e | el barco | Sustantivo | auf dem Schiff |
| das Wetter, sin plural | el tiempo / clima | Sustantivo | Das Wetter ist schön. |
| das Wochenende, -n | el fin de semana | Sustantivo | vor dem Wochenende |
| das Essen, - | la comida | Sustantivo | vor dem Essen |
| die Großeltern (Pl.) | los abuelos | Sustantivo | unsere Großeltern |

##### Vocabulario adicional del bloque
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Lebenslauf, Lebensläufe | el currículum | Sustantivo | einen Lebenslauf schreiben |
| die Bewerbung, -en | la candidatura / solicitud de empleo | Sustantivo | eine Bewerbung schicken |
| die Öffnung, -en | la apertura | Sustantivo | die Öffnung des Fensters |
| die Übung, -en | el ejercicio | Sustantivo | eine Übung machen |
| der Urlaub, Urlaube | las vacaciones | Sustantivo | normalmente singular: im Urlaub |
| der Chef, -s | el jefe | Sustantivo | beim Chef |
| die Chefin, -nen | la jefa | Sustantivo | bei der Chefin |
| der Ausflug, Ausflüge | la excursión | Sustantivo | einen Ausflug machen |
| die Ahnung, -en | la idea / sospecha | Sustantivo | Ich habe keine Ahnung. |
| der Delfin, -e | el delfín | Sustantivo | Variante: Delphin |
| die Datei, -en | el archivo informático | Sustantivo | eine Datei öffnen |
| die Nation, -en | la nación | Sustantivo | zwischen den Nationen |
| das Protokoll, -e | el acta / protocolo | Sustantivo | ein Protokoll schreiben |
| das Rührei, -er | los huevos revueltos | Sustantivo | Rührei zum Frühstück |
| das Brot, -e | el pan | Sustantivo | das Brötchen, - |
| das Chrom, sin plural | el cromo | Sustantivo químico | Elemento químico, no “cromo” coleccionable. |
| das Zink, sin plural | el cinc | Sustantivo químico | ein Metall |
| der Zentimeter, - | el centímetro | Sustantivo | zehn Zentimeter |
| der Sommer, - | el verano | Sustantivo | im Sommer |
| der Monat, -e | el mes | Sustantivo | zwischen April und Juni |
| die Woche, -n | la semana | Sustantivo | unter der Woche |
| der Kaffee, -s | el café | Sustantivo | Plural para tipos o consumiciones. |
| der Tee, -s | el té | Sustantivo | Plural para tipos o consumiciones. |
| chronologisch | cronológico | Adjetivo / adverbio | in chronologischer Reihenfolge |
| ausführlich | detallado | Adjetivo / adverbio | eine ausführliche Erklärung |
| funktional | funcional | Adjetivo | ein funktionales Design |
| circa / ca. | aproximadamente | Adverbio | circa zehn Minuten |
| hoch | alto / elevado | Adjetivo | ein hoher Tisch |
| attraktiv | atractivo | Adjetivo | eine attraktive Stadt |
| zu Fuß | a pie | Expresión adverbial | Ich gehe zu Fuß. |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1 Las nueve Wechselpräpositionen
`an, auf, hinter, in, neben, über, unter, vor, zwischen`

Se llaman **Wechselpräpositionen** porque pueden regir acusativo o dativo según el significado espacial.

##### 3.2 La regla correcta
| Pregunta | Significado | Caso | Ejemplo |
| :--- | :--- | :--- | :--- |
| **Wohin?** | destino, dirección o cambio de posición | Acusativo | Ich gehe in **den** Park. |
| **Wo?** | lugar donde ocurre o se mantiene algo | Dativo | Ich laufe in **dem** Park. |

- El acusativo no significa simplemente “movimiento”.
- `Ich laufe im Park.` tiene movimiento físico, pero no expresa salir hacia un destino: la acción ocurre **dentro del parque**, por eso lleva dativo.
- `Ich laufe in den Park.` expresa la entrada al parque y responde a **Wohin?**, por eso lleva acusativo.

##### 3.3 Formas de artículos
| Género / número | Acusativo | Dativo |
| :--- | :--- | :--- |
| Masculino | den / einen | dem / einem |
| Femenino | die / eine | der / einer |
| Neutro | das / ein | dem / einem |
| Plural | die / — | den + sustantivo en **-n** |

##### 3.4 Comparación completa
| Preposición | Wohin? + Akkusativ | Wo? + Dativ |
| :--- | :--- | :--- |
| **an** | Er hängt das Bild **an die Wand**. | Das Bild hängt **an der Wand**. |
| **auf** | Sie legt das Buch **auf den Tisch**. | Das Buch liegt **auf dem Tisch**. |
| **hinter** | Sie stellen sich **hinter den Stuhl**. | Sie stehen **hinter dem Stuhl**. |
| **in** | Ich stecke das Geld **in die Tasche**. | Das Geld ist **in der Tasche**. |
| **neben** | Peter setzt sich **neben den Mann**. | Peter sitzt **neben dem Mann**. |
| **über** | Er hängt die Lampe **über den Tisch**. | Die Lampe hängt **über dem Tisch**. |
| **unter** | Der Hund legt sich **unter den Tisch**. | Der Hund liegt **unter dem Tisch**. |
| **vor** | Die Frau stellt sich **vor das Fenster**. | Die Frau steht **vor dem Fenster**. |
| **zwischen** | Er setzt sich **zwischen die Frauen**. | Er sitzt **zwischen den Frauen**. |

##### 3.5 Verbos de colocación y posición
| Acción: cambio de posición + Akk. | Estado: ubicación + Dat. | Significado |
| :--- | :--- | :--- |
| legen | liegen | poner tumbado / estar tumbado |
| stellen | stehen | colocar de pie / estar de pie |
| setzen | sitzen | sentar(se) / estar sentado |
| hängen | hängen | colgar / estar colgado |
| stecken | stecken | meter / estar metido |

###### Conjugación en Präsens
| Pronombre | legen | liegen | stellen | stehen | setzen | sitzen |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| ich | lege | liege | stelle | stehe | setze | sitze |
| du | legst | liegst | stellst | stehst | setzt | sitzt |
| er/sie/es | legt | liegt | stellt | steht | setzt | sitzt |
| wir/sie/Sie | legen | liegen | stellen | stehen | setzen | sitzen |
| ihr | legt | liegt | stellt | steht | setzt | sitzt |

##### 3.6 Contracciones frecuentes
| Forma completa | Contracción | Ejemplo |
| :--- | :--- | :--- |
| an dem | **am** | am Fenster |
| an das | **ans** | ans Fenster |
| in dem | **im** | im Haus |
| in das | **ins** | ins Haus |

- `Das Bild hängt am Fenster.` → El cuadro está colgado junto a/en la ventana.
- `Ich hänge das Bild ans Fenster.` → Cuelgo el cuadro en la ventana.

##### 3.7 Significados espaciales básicos
| Preposición | Español aproximado | Ejemplo |
| :--- | :--- | :--- |
| an | en, pegado a, junto a | an der Wand |
| auf | encima de, sobre una superficie | auf dem Tisch |
| hinter | detrás de | hinter dem Haus |
| in | en, dentro de | in der Tasche |
| neben | al lado de | neben dem Stuhl |
| über | encima de, sin contacto | über dem Tisch |
| unter | debajo de | unter dem Bett |
| vor | delante de | vor dem Fenster |
| zwischen | entre | zwischen den Stühlen |

##### 3.8 Usos temporales frecuentes
Los usos temporales se aprenden como construcciones propias; no todos siguen una única regla.

| Construcción | Caso | Ejemplo | Traducción |
| :--- | :--- | :--- | :--- |
| an + día/fecha | Dativo | am Montag; am 18. März | el lunes; el 18 de marzo |
| in + mes/estación | Dativo | im September; im Sommer | en septiembre; en verano |
| in + plazo futuro | Dativo | in drei Wochen | dentro de tres semanas |
| über + festividad/periodo | Acusativo | über Weihnachten; über Ostern | durante la Navidad; durante la Pascua |
| unter der Woche | Dativo | unter der Woche | entre semana |
| vor + acontecimiento | Dativo | vor dem Essen | antes de comer |
| zwischen + límites | Dativo | zwischen drei und vier Uhr | entre las tres y las cuatro |

##### 3.9 Ejemplos temporales normalizados
- `Am Montag fahre ich wieder nach Hause.`  
  El lunes vuelvo a casa.
- `Ich bin am 18. März geboren.`  
  Nací el 18 de marzo.
- `Im September möchte ich nach Deutschland fliegen.`  
  En septiembre me gustaría volar a Alemania.
- `In drei Wochen wollen sie nach Berlin fahren.`  
  Dentro de tres semanas quieren viajar a Berlín.
- `Über Weihnachten wollen wir in den Schwarzwald fahren.`  
  Durante la Navidad queremos ir a la Selva Negra.
- `Unter der Woche musste ich sehr viel arbeiten.`  
  Tuve que trabajar mucho entre semana.
- `Vor dem Essen muss man sich die Hände waschen.`  
  Antes de comer hay que lavarse las manos.
- `Ich habe zwischen drei und vier Uhr Zeit.`  
  Tengo tiempo entre las tres y las cuatro.

##### 3.10 Direcciones geográficas
- `nach Deutschland / nach Berlin` se usa con países sin artículo y ciudades.
- `in den Schwarzwald` usa **in + Akkusativ** porque expresa destino y `der Schwarzwald` lleva artículo.
- `in der Schweiz` expresa ubicación; `in die Schweiz` expresa destino.

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)
> **Wo ist das Buch?**  
> *Traducción:* ¿Dónde está el libro?  
> *Uso:* Preguntar por una ubicación.

> **Das Buch liegt auf dem Tisch.**  
> *Traducción:* El libro está sobre la mesa.  
> *Uso:* Indicar una posición.

> **Wohin legst du das Buch?**  
> *Traducción:* ¿Dónde pones el libro?  
> *Uso:* Preguntar por el destino de un objeto.

> **Ich lege es auf den Tisch.**  
> *Traducción:* Lo pongo sobre la mesa.  
> *Uso:* Indicar un cambio de posición.

> **Ich habe keine Ahnung.**  
> *Traducción:* No tengo ni idea.  
> *Uso:* Expresar desconocimiento.

> **Ich gehe zu Fuß.**  
> *Traducción:* Voy a pie.  
> *Uso:* Hablar del medio de desplazamiento.

> **Am Wochenende machen wir einen Ausflug.**  
> *Traducción:* El fin de semana hacemos una excursión.  
> *Uso:* Hablar de planes.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** No memorices “movimiento = acusativo”. Pregunta si hay destino (**Wohin?**) o ubicación (**Wo?**).
- ⚠️ **Atención:** `Ich gehe im Park` significa que camino dentro del parque; `Ich gehe in den Park` significa que voy hacia el parque.
- ⚠️ **Atención:** `legen` lleva normalmente un destino; `liegen` describe una posición.
- ⚠️ **Atención:** El dativo plural añade normalmente **-n**: `zwischen den Frauen`.
- ⚠️ **Atención:** Los meses se escriben con minúscula en español, pero con mayúscula en alemán: `im September`.
- ⚠️ **Atención:** `über Weihnachten` es temporal y lleva acusativo, aunque el caso no sea visible sin artículo.
- ⚠️ **Atención:** `das Chrom` es el elemento químico cromo; una estampa o cromo coleccionable es `das Sammelbild`.
- ⚠️ **Atención:** El plural correcto es `die Streichholzschachteln`, no una forma invariable.
- ⚠️ **Pronunciación:** En **zwischen**, la **z** inicial suena aproximadamente **ts**.
- ⚠️ **Pronunciación:** En **über**, la **ü** se articula con los labios redondeados.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: ¿Qué pregunta suele llevar acusativo con una Wechselpräposition?
  A: Wohin?
  Type: flashcard
- Q: ¿Qué pregunta suele llevar dativo con una Wechselpräposition?
  A: Wo?
  Type: flashcard
- Q: Enumera las nueve Wechselpräpositionen.
  A: an, auf, hinter, in, neben, über, unter, vor, zwischen
  Type: flashcard
- Q: Ich lege das Buch auf _____ Tisch. (der)
  A: den
  Type: fill-in-the-blank
- Q: Das Buch liegt auf _____ Tisch. (der)
  A: dem
  Type: fill-in-the-blank
- Q: Er hängt das Bild an _____ Wand. (die)
  A: die
  Type: fill-in-the-blank
- Q: Das Bild hängt an _____ Wand. (die)
  A: der
  Type: fill-in-the-blank
- Q: Ich stecke das Geld in _____ Tasche. (die)
  A: die
  Type: fill-in-the-blank
- Q: Das Geld ist in _____ Tasche. (die)
  A: der
  Type: fill-in-the-blank
- Q: Peter setzt sich neben _____ Mann. (der)
  A: den
  Type: fill-in-the-blank
- Q: Peter sitzt neben _____ Mann. (der)
  A: dem
  Type: fill-in-the-blank
- Q: Der Hund legt sich unter _____ Tisch. (der)
  A: den
  Type: fill-in-the-blank
- Q: Der Hund liegt unter _____ Tisch. (der)
  A: dem
  Type: fill-in-the-blank
- Q: Er setzt sich zwischen _____ Frauen. (die, plural)
  A: die
  Type: fill-in-the-blank
- Q: Er sitzt zwischen _____ Frauen. (die, plural)
  A: den
  Type: fill-in-the-blank
- Q: Traducción: El libro está sobre la mesa.
  A: Das Buch liegt auf dem Tisch.
  Type: flashcard
- Q: Traducción: Pongo el libro sobre la mesa.
  A: Ich lege das Buch auf den Tisch.
  Type: flashcard
- Q: Corrige según el significado «Voy hacia el parque»: Ich gehe im Park.
  A: Ich gehe in den Park.
  Type: correction
- Q: ¿Por qué «Ich laufe im Park» lleva dativo aunque haya movimiento?
  A: Porque expresa el lugar donde ocurre la acción, no un destino.
  Type: flashcard
- Q: _____ Montag fahre ich nach Hause. (an + dem)
  A: Am
  Type: fill-in-the-blank
- Q: _____ September ist das Wetter schön. (in + dem)
  A: Im
  Type: fill-in-the-blank
- Q: Wir fahren _____ Weihnachten in den Schwarzwald.
  A: über
  Type: fill-in-the-blank
- Q: Vor _____ Essen wasche ich mir die Hände. (das)
  A: dem
  Type: fill-in-the-blank
- Q: Traducción: No tengo ni idea.
  A: Ich habe keine Ahnung.
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 17 — Adjetivos: tipos, formación y grados

*Nivel orientativo:* **A2** · *Alcance A1 de esta app:* 📚

> Declinación completa del adjetivo: A2. En A1 solo formas predicativas simples.

---
class_id: 017
title: "Adjetivos: tipos, formación y grados"
level: "B1"
topics: ["Gramática", "Adjetivos", "Declinación", "Formación de palabras", "Comparativo", "Superlativo", "Ejercicios"]
target_exam: "Telc / Goethe B1"
---

### Adjetivos: tipos, formación y grados

#### 1. 🎯 Resumen / Objetivos de la Lección
- Distinguir adjetivos predicativos, adverbiales y atributivos.
- Reconocer cuándo un adjetivo permanece invariable y cuándo debe declinarse.
- Aplicar terminaciones básicas con artículo determinado, palabras tipo **ein** y sin artículo.
- Formar adjetivos frecuentes a partir de sustantivos y verbos.
- Construir comparaciones de igualdad, superioridad e inferioridad.
- Formar el superlativo predicativo/adverbial y el superlativo atributivo.
- Resolver los ejercicios de los PDF con respuestas corregidas.

#### 2. 📚 Vocabulario Clave (Wortschatz)

##### Adjetivos frecuentes
| Alemán | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| alt | viejo / antiguo | Adjetivo | ein altes Haus |
| jung | joven | Adjetivo | jünger, am jüngsten |
| schön | bonito | Adjetivo | schöner, am schönsten |
| groß | grande / alto | Adjetivo irregular | größer, am größten |
| klein | pequeño | Adjetivo | kleiner, am kleinsten |
| gut | bueno / bien | Adjetivo irregular | besser, am besten |
| schlecht | malo / mal | Adjetivo irregular | schlechter, am schlechtesten |
| schnell | rápido | Adjetivo / adverbio | schneller, am schnellsten |
| langsam | lento | Adjetivo / adverbio | langsamer, am langsamsten |
| laut | alto / ruidoso | Adjetivo / adverbio | laute Musik |
| leise | silencioso / bajo | Adjetivo / adverbio | leise sprechen |
| kalt | frío | Adjetivo | kälter, am kältesten |
| warm | cálido | Adjetivo | wärmer, am wärmsten |
| teuer | caro | Adjetivo | teurer, am teuersten |
| günstig | económico / favorable | Adjetivo / adverbio | günstig einkaufen |
| hoch | alto / elevado | Adjetivo irregular | höher, am höchsten |
| nah | cercano | Adjetivo irregular | näher, am nächsten |
| neu | nuevo | Adjetivo | neuer, am neuesten |
| spannend | emocionante / interesante | Adjetivo | ein spannender Film |
| langweilig | aburrido | Adjetivo | Der Film ist langweilig. |
| anstrengend | agotador / exigente | Adjetivo | ein anstrengendes Studium |
| einfach | fácil / sencillo | Adjetivo | einfacher, am einfachsten |
| kompliziert | complicado | Adjetivo | komplizierter |
| interessant | interesante | Adjetivo | ein interessantes Buch |
| sympathisch | simpático | Adjetivo | einen sympathischen Mann |
| attraktiv | atractivo | Adjetivo | eine attraktive Freundin |
| frech | descarado / travieso | Adjetivo | freche Kinder |
| unverschämt | descarado / insolente | Adjetivo | Die Kinder sind unverschämt. |
| fließend | fluido | Adjetivo / adverbio | fließend Deutsch sprechen |
| miserabel | pésimo / de manera pésima | Adjetivo / adverbio | miserabel spielen |

##### Sustantivos empleados
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Mann, Männer | el hombre | Sustantivo | ein sympathischer Mann |
| der Nachbar, -n | el vecino | Sustantivo débil | den alten Nachbarn |
| der Mantel, Mäntel | el abrigo | Sustantivo | einen langen Mantel |
| der Schal, -s | la bufanda | Sustantivo | meinen roten Schal |
| der Kanal, Kanäle | el canal | Sustantivo | einen guten Kanal |
| der Sessel, - | el sillón | Sustantivo | auf dem blauen Sessel |
| der Schauspieler, - | el actor | Sustantivo | die Schauspieler |
| die Frau, -en | la mujer | Sustantivo | eine schöne Frau |
| die Stadt, Städte | la ciudad | Sustantivo | eine sehenswerte Stadt |
| die Küche, -n | la cocina | Sustantivo | eine neue Küche |
| die Katze, -n | el gato / la gata | Sustantivo | eine graue Katze |
| die Tasche, -n | el bolso / la bolsa | Sustantivo | die schwarze Tasche |
| die Aussprache, -n | la pronunciación | Sustantivo | ihre Aussprache |
| das Haus, Häuser | la casa | Sustantivo | in einem großen Haus |
| das Dorf, Dörfer | el pueblo | Sustantivo | in einem kleinen Dorf |
| das Buch, Bücher | el libro | Sustantivo | ein interessantes Buch |
| das Einkaufszentrum, Einkaufszentren | el centro comercial | Sustantivo | im neuen Einkaufszentrum |
| das Restaurant, -s | el restaurante | Sustantivo | im italienischen Restaurant |
| das Gericht, -e | el plato / tribunal | Sustantivo | leckere Gerichte |
| das Handy, -s | el móvil | Sustantivo | das neue Handy |
| das Viertel, - | el barrio | Sustantivo | das schönste Viertel |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1 Los tres usos del adjetivo
| Tipo | Función | ¿Se declina? | Ejemplo |
| :--- | :--- | :--- | :--- |
| Predicativo | Describe al sujeto mediante un verbo copulativo | No | Die Musik ist **laut**. |
| Adverbial | Describe cómo se realiza una acción | No | Der Lehrer spricht **laut**. |
| Atributivo | Modifica directamente a un sustantivo | Sí | Man hört **laute Musik**. |

##### 3.2 Adjetivos predicativos
- Aparecen sobre todo con **sein, bleiben** y **werden**.
- Permanecen en su forma básica, sin concordar con género o número.

| Ejemplo | Traducción |
| :--- | :--- |
| Der Computer ist alt. | El ordenador es viejo. |
| Die Maschine ist alt. | La máquina es vieja. |
| Das Auto ist alt. | El coche es viejo. |
| Jan ist sehr sportlich. | Jan es muy deportista. |
| Die Situation bleibt schwierig. | La situación sigue siendo difícil. |
| Das Wetter wird kalt. | El tiempo se está poniendo frío. |

##### 3.3 Adjetivos con función adverbial
- Describen el verbo o la manera en que ocurre la acción.
- No reciben terminación.

| Ejemplo | Traducción |
| :--- | :--- |
| Die Gäste tanzen fröhlich. | Los invitados bailan alegremente. |
| Wir lernen schnell und einfach Deutsch. | Aprendemos alemán rápida y fácilmente. |
| Der Schauspieler spielt miserabel. | El actor actúa de manera pésima. |
| Man kann hier gut und günstig einkaufen. | Aquí se puede comprar bien y barato. |

##### 3.4 Adjetivos atributivos
- Aparecen delante del sustantivo y reciben una terminación.
- Pueden modificar al sujeto, al objeto o a un sustantivo dentro de cualquier complemento.
- Pueden aparecer con artículo determinado, con una palabra tipo **ein** o sin determinante.

`der alte Mann`  
`ein alter Mann`  
`alter Wein`

##### 3.5 Con artículo determinado
| Caso | Masculino | Femenino | Neutro | Plural |
| :--- | :--- | :--- | :--- | :--- |
| Nominativo | der nette Mann | die schöne Frau | das große Haus | die kleinen Kinder |
| Acusativo | den netten Mann | die schöne Frau | das große Haus | die kleinen Kinder |
| Dativo | dem netten Mann | der schönen Frau | dem großen Haus | den kleinen Kindern |
| Genitivo | des netten Mannes | der schönen Frau | des großen Hauses | der kleinen Kinder |

##### 3.6 Con **ein**, **kein** o posesivo
| Caso | Masculino | Femenino | Neutro | Plural con posesivo/kein |
| :--- | :--- | :--- | :--- | :--- |
| Nominativo | ein netter Mann | eine schöne Frau | ein großes Haus | meine kleinen Kinder |
| Acusativo | einen netten Mann | eine schöne Frau | ein großes Haus | meine kleinen Kinder |
| Dativo | einem netten Mann | einer schönen Frau | einem großen Haus | meinen kleinen Kindern |
| Genitivo | eines netten Mannes | einer schönen Frau | eines großen Hauses | meiner kleinen Kinder |

##### 3.7 Sin artículo
| Caso | Masculino | Femenino | Neutro | Plural |
| :--- | :--- | :--- | :--- | :--- |
| Nominativo | guter Wein | frische Milch | kaltes Wasser | gute Bücher |
| Acusativo | guten Wein | frische Milch | kaltes Wasser | gute Bücher |
| Dativo | gutem Wein | frischer Milch | kaltem Wasser | guten Büchern |
| Genitivo | guten Weins | frischer Milch | kalten Wassers | guter Bücher |

##### 3.8 Ejercicios resueltos: tipos y declinación

###### Traducción
| Español | Alemán |
| :--- | :--- |
| María es una mujer guapa. | Maria ist eine schöne Frau. |
| Ayudamos a los vecinos ancianos. | Wir helfen den alten Nachbarn. |
| El gato blanco duerme en el sofá viejo. | Die weiße Katze schläft auf dem alten Sofa. |
| El centro histórico es muy bonito. | Das historische Zentrum ist sehr schön. |
| ¿Conoces al hombre joven? | Kennst du den jungen Mann? |

###### Completar
| Ejercicio | Solución | Tipo |
| :--- | :--- | :--- |
| Der ___ Kaffee schmeckt mir nicht. (schwarz) | Der **schwarze** Kaffee schmeckt mir nicht. | Atributivo |
| Sarah liest ein ___ Buch. (interessant) | Sarah liest ein **interessantes** Buch. | Atributivo |
| Der ___ Hund liegt auf dem ___ Sessel. (klein, blau) | Der **kleine** Hund liegt auf dem **blauen** Sessel. | Atributivos |
| Wir haben eine ___ Katze und einen ___ Hund. (grau, braun) | Wir haben eine **graue** Katze und einen **braunen** Hund. | Atributivos |
| Meine Großeltern wohnen in einem ___ Haus in einem ___ Dorf. (groß, klein) | ... in einem **großen** Haus in einem **kleinen** Dorf. | Atributivos |
| Hast du den ___ ___ Film gesehen? (spannend, deutsch) | Hast du den **spannenden deutschen** Film gesehen? | Atributivos |
| Ich fand ihn ___. (langweilig) | Ich fand ihn **langweilig**. | Predicativo del objeto |
| Die Schauspieler haben ___ gespielt. (miserabel) | Die Schauspieler haben **miserabel** gespielt. | Adverbial |

##### 3.9 Más ejercicios resueltos
| Oración completa | Explicación |
| :--- | :--- |
| Kannst du mir einen **guten** Kanal empfehlen? | Masculino acusativo con `einen`. |
| Ich habe einen **langen** Mantel, ein **enges** T-Shirt und **bequeme** Schuhe gekauft. | Acusativo masculino, neutro y plural sin artículo. |
| In dem **italienischen** Restaurant gibt es viele **leckere** Gerichte. | Dativo neutro; plural acusativo tras `viele`. |
| Im **neuen** Einkaufszentrum kann man **gut** und **günstig** shoppen. | Atributivo; dos adverbiales. |
| Ich habe einen sehr **sympathischen** Mann kennengelernt. | Masculino acusativo. |
| Er hat eine sehr **attraktive** Freundin. | Femenino acusativo. |
| Die **frechen** Kinder der **neuen** Nachbarn sind **unverschämt**. | Nominativo plural; genitivo plural; predicativo. |
| Sie hören den ganzen Tag **laute** Musik. | Acusativo femenino sin artículo. |
| Hast du meinen **roten** Schal und die **schwarze** Tasche gesehen? | Dos adjetivos atributivos en acusativo. |
| Wo hast du das **neue** Handy gekauft? | Neutro acusativo con artículo determinado. |
| Die **deutsche** Grammatik ist nicht so **schrecklich**. | Atributivo + predicativo. |

##### 3.10 Formación a partir de sustantivos
Los sufijos ayudan a reconocer familias de palabras, pero no pueden añadirse libremente a cualquier base.

| Sufijo | Base | Adjetivo | Significado |
| :--- | :--- | :--- | :--- |
| -ig | der Fleiß | fleißig | trabajador / aplicado |
| -ig | der Schmutz | schmutzig | sucio |
| -lich | das Fest | festlich | festivo |
| -lich | das Glück | glücklich | feliz / afortunado |
| -lich | das Herz | herzlich | cordial / afectuoso |
| -isch | Spanien | spanisch | español |
| -isch | die Laune | launisch | caprichoso / cambiante |
| -los | der Sinn | sinnlos | sin sentido |
| -los | der Rat | ratlos | desconcertado |
| -ern | das Eisen | eisern | de hierro / férreo |
| -ern | das Silber | silbern | de plata / plateado |
| -haft | der Traum | traumhaft | maravilloso / de ensueño |
| -haft | der Zauber | zauberhaft | encantador / mágico |
| -sam | das Grauen | grausam | cruel |
| -sam | die Mühe | mühsam | laborioso / arduo |

##### 3.11 Formación a partir de verbos
| Sufijo | Verbo | Adjetivo | Significado |
| :--- | :--- | :--- | :--- |
| -ig | rutschen | rutschig | resbaladizo |
| -ig | von etwas abhängen | abhängig von | dependiente de |
| -lich | nachdenken | nachdenklich | pensativo |
| -lich | vergessen | vergesslich | olvidadizo |
| -haft | glauben | glaubhaft | creíble |
| -haft | zweifeln | zweifelhaft | dudoso |
| -sam | schweigen | schweigsam | callado |
| -sam | bedeuten | bedeutsam | significativo |
| -bar | essen | essbar | comestible |
| -bar | heilen | heilbar | curable |
| -wert | lieben | liebenswert | digno de cariño / encantador |
| -wert | sehen | sehenswert | digno de ver |

##### 3.12 Comparativo de igualdad
- **Estructura / Fórmula:** `so + adjetivo/adverbio + wie`
- El adjetivo no recibe terminación comparativa.

| Ejemplo | Traducción |
| :--- | :--- |
| Paul ist so groß wie Christoph. | Paul es tan alto como Christoph. |
| Julia läuft so schnell wie Claudia. | Julia corre tan rápido como Claudia. |
| Berlin ist nicht so groß wie London. | Berlín no es tan grande como Londres. |
| Madrid ist etwa so groß wie Berlin. | Madrid es aproximadamente tan grande como Berlín. |
| Meine Wohnung ist ungefähr so teuer wie deine. | Mi piso es aproximadamente tan caro como el tuyo. |
| Ich spreche fast so gut Französisch wie mein Partner. | Hablo francés casi tan bien como mi pareja. |

- `genauso ... wie` se escribe junto cuando funciona como adverbio: `Meine Wohnung ist genauso groß wie deine.`

##### 3.13 Comparativo de superioridad
- **Estructura / Fórmula:** `adjetivo + -er + als`

`Frankfurt ist kleiner als München.`  
`Julia läuft schneller als Claudia.`

- No se usa `mehr + adjetivo` con los adjetivos normales.
- Para expresar inferioridad se prefiere:
  - `nicht so ... wie`
  - o un comparativo con **weniger** cuando el significado lo permite.

##### 3.14 Umlaut en algunos comparativos
Varios adjetivos cortos con **a, o, u** reciben umlaut, pero no todos. Conviene aprender la forma comparativa con cada palabra.

| Positivo | Comparativo | Superlativo |
| :--- | :--- | :--- |
| alt | älter | am ältesten |
| kalt | kälter | am kältesten |
| groß | größer | am größten |
| jung | jünger | am jüngsten |
| kurz | kürzer | am kürzesten |
| warm | wärmer | am wärmsten |
| schlank | schlanker | am schlanksten |

##### 3.15 Superlativo predicativo o adverbial
- **Estructura / Fórmula:** `am + adjetivo-(e)sten`
- Se usa sin sustantivo directamente detrás.

`Dieses Viertel ist am schönsten.`  
`Lisa läuft am schnellsten.`

- Se añade normalmente **-esten** tras **-d, -t, -s, -ß, -x, -z**:
  - `kalt → am kältesten`
  - `heiß → am heißesten`
  - `kurz → am kürzesten`

##### 3.16 Superlativo atributivo
- Se usa la raíz superlativa **-st/-est** más la terminación de declinación correspondiente.

| Ejemplo | Análisis |
| :--- | :--- |
| das schönste Viertel | Nominativo/acusativo neutro |
| die teuerste Stadt | Nominativo femenino |
| der höchste Berg | Nominativo masculino |
| mit dem schnellsten Zug | Dativo masculino |

##### 3.17 Formas irregulares importantes
| Positivo | Comparativo | Superlativo |
| :--- | :--- | :--- |
| gut | besser | am besten |
| viel | mehr | am meisten |
| gern | lieber | am liebsten |
| hoch | höher | am höchsten |
| nah | näher | am nächsten |
| groß | größer | am größten |
| teuer | teurer | am teuersten |

##### 3.18 Soluciones de los ejercicios guiados de grados

###### Traducción
| Español | Alemán |
| :--- | :--- |
| Mi nuevo coche va más rápido que el viejo. | Mein neues Auto fährt schneller als das alte. |
| Mi marido cocina mejor que yo. | Mein Mann kocht besser als ich. |
| Mi hermana es la mejor cocinera. | Meine Schwester ist die beste Köchin. |
| Mi novio prefiere beber cerveza antes que vino. | Mein Freund trinkt lieber Bier als Wein. |

###### Completar
| Ejercicio | Solución |
| :--- | :--- |
| Mein Mann isst ___ (= viel) ich. | Mein Mann isst **genauso viel wie** ich. |
| Mein Studium war ___ (> spannend) die Schule. | Mein Studium war **spannender als** die Schule. |
| Es war auch viel ___ (> anstrengend). | Es war auch viel **anstrengender**. |
| Sofia ist ___ (+ gut) Studentin im Kurs. | Sofia ist **die beste** Studentin im Kurs. |
| Mit YouTube habe ich ___ (+ viel) Deutsch gelernt. | Mit YouTube habe ich **am meisten** Deutsch gelernt. |
| Davids Motorrad fährt ___ (= schnell) mein Auto. | ... fährt **genauso schnell wie** mein Auto. |
| Ich esse ___ (- gern) Pasta wie Reis. | Ich esse Pasta **nicht so gern wie** Reis. |
| Pizza schmeckt mir ___ (+ gut). | Pizza schmeckt mir **am besten**. |

##### 3.19 Soluciones de los ejercicios adicionales
| Oración resuelta |
| :--- |
| Die schwarze Jacke steht dir **besser als** die weiße. |
| Marco ist **jünger als** Lena. Max ist **das jüngste** Kind. |
| Der Mount Everest ist **der höchste** Berg der Welt. |
| Ich arbeite **mehr als** mein Kollege, aber ich verdiene **nicht so viel wie** er. |
| Mit dem Auto komme ich **schneller** zur Arbeit als mit der Bahn. |
| Im Februar ist es **kälter als** im November, aber **der Dezember** ist der **kälteste** Monat. |
| Potsdam liegt **näher an** Berlin als Hamburg. |
| Ich schaue **lieber** Filme als Serien. **Am liebsten** sehe ich Dokumentarfilme. |
| Linda spricht **nicht so gut Englisch wie** Thomas. |
| Sie versteht die Grammatik **genauso gut wie** er, aber ihre Aussprache ist **schlechter**. |
| Manchmal ist Deutsch **einfacher als** Spanisch, aber einiges ist auch **komplizierter**. |
| Jetzt verstehe ich die Regeln **am besten**! |

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)
> **Wie findest du den Film?**  
> *Traducción:* ¿Qué te parece la película?  
> *Uso:* Pedir una opinión.

> **Ich finde ihn spannend.**  
> *Traducción:* Me parece emocionante.  
> *Uso:* Dar una opinión con adjetivo invariable.

> **Kannst du mir einen guten Kanal empfehlen?**  
> *Traducción:* ¿Puedes recomendarme un buen canal?  
> *Uso:* Pedir una recomendación.

> **Das ist genauso teuer wie das andere.**  
> *Traducción:* Esto es igual de caro que lo otro.  
> *Uso:* Comparar precios iguales.

> **Dieses Modell ist günstiger als das andere.**  
> *Traducción:* Este modelo es más barato que el otro.  
> *Uso:* Comparar dos productos.

> **Welches gefällt dir am besten?**  
> *Traducción:* ¿Cuál te gusta más?  
> *Uso:* Preguntar por una preferencia máxima.

> **Ich habe keine Ahnung.**  
> *Traducción:* No tengo ni idea.  
> *Uso:* Expresar desconocimiento.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** Los adjetivos predicativos y adverbiales no se declinan: `Das Haus ist groß`; `Er spricht laut`.
- ⚠️ **Atención:** Los atributivos van delante del sustantivo: `die alte Stadt`, no `die Stadt alte`.
- ⚠️ **Atención:** Un adjetivo atributivo puede aparecer sin artículo: `laute Musik`, `gute Bücher`.
- ⚠️ **Atención:** En comparaciones de igualdad usa **wie**; en superioridad usa **als**.
- ⚠️ **Atención:** Se dice `schneller als`, no `mehr schnell als` ni `schneller wie` en alemán estándar.
- ⚠️ **Atención:** No todos los adjetivos cortos con **a/o/u** reciben umlaut; aprende las formas individualmente.
- ⚠️ **Atención:** `teuer` forma `teurer`, no `teuerer`.
- ⚠️ **Atención:** El idioma se escribe **Englisch**, no `English`.
- ⚠️ **Atención:** `kennenlernen` se escribe junto según la ortografía actual: `kennengelernt`.
- ⚠️ **Pronunciación:** En `höher`, la **h** entre vocales se pronuncia y separa las sílabas: `hö-her`.
- ⚠️ **Pronunciación:** En `größer`, **ß** representa una **s** sorda.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: Die Musik ist laut. ¿Qué tipo de uso tiene «laut»?
  A: Predicativo.
  Type: flashcard
- Q: Der Lehrer spricht laut. ¿Qué tipo de uso tiene «laut»?
  A: Adverbial.
  Type: flashcard
- Q: Man hört laute Musik. ¿Qué tipo de uso tiene «laute»?
  A: Atributivo.
  Type: flashcard
- Q: Sarah liest ein _____ Buch. (interessant)
  A: interessantes
  Type: fill-in-the-blank
- Q: Wir helfen den _____ Nachbarn. (alt)
  A: alten
  Type: fill-in-the-blank
- Q: Ich habe einen _____ Mantel gekauft. (lang)
  A: langen
  Type: fill-in-the-blank
- Q: Sie wohnen in einem _____ Haus. (groß)
  A: großen
  Type: fill-in-the-blank
- Q: Die Schauspieler haben _____ gespielt. (miserabel)
  A: miserabel
  Type: fill-in-the-blank
- Q: Der Film ist _____. (langweilig)
  A: langweilig
  Type: fill-in-the-blank
- Q: Forma un adjetivo a partir de «der Schmutz».
  A: schmutzig
  Type: flashcard
- Q: Forma un adjetivo a partir de «das Glück».
  A: glücklich
  Type: flashcard
- Q: Forma un adjetivo a partir de «essen».
  A: essbar
  Type: flashcard
- Q: Forma un adjetivo a partir de «sehen» con el sentido “digno de ver”.
  A: sehenswert
  Type: flashcard
- Q: Paul ist _____ groß _____ Christoph. (igualdad)
  A: so / wie
  Type: fill-in-the-blank
- Q: Frankfurt ist _____ als München. (klein)
  A: kleiner
  Type: fill-in-the-blank
- Q: Berlin ist nicht _____ groß _____ London.
  A: so / wie
  Type: fill-in-the-blank
- Q: gut → comparativo → superlativo
  A: besser → am besten
  Type: flashcard
- Q: gern → comparativo → superlativo
  A: lieber → am liebsten
  Type: flashcard
- Q: hoch → comparativo → superlativo
  A: höher → am höchsten
  Type: flashcard
- Q: Das ist _____ Viertel der Stadt. (schön, superlativo)
  A: das schönste
  Type: fill-in-the-blank
- Q: Lisa läuft _____. (schnell, superlativo)
  A: am schnellsten
  Type: fill-in-the-blank
- Q: Corrige: Lisa läuft mehr schnell als Anna.
  A: Lisa läuft schneller als Anna.
  Type: correction
- Q: Corrige: Anna ist größer wie Carina.
  A: Anna ist größer als Carina.
  Type: correction
- Q: Traducción: Mi hermana es la mejor cocinera.
  A: Meine Schwester ist die beste Köchin.
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 18 — TeKaMoLo: orden de los complementos

*Nivel orientativo:* **A2/B1** · *Alcance A1 de esta app:* 📚

> Orden de adverbios más propio de A2/B1.

---
class_id: 018
title: "TeKaMoLo: orden de los complementos"
level: "B1"
topics: ["Gramática", "Orden de la oración", "TeKaMoLo", "Complementos circunstanciales", "Acusativo", "Dativo", "Ejercicios"]
target_exam: "Telc / Goethe B1"
---

### TeKaMoLo: orden de los complementos

#### 1. 🎯 Resumen / Objetivos de la Lección
- Ordenar complementos temporales, causales, modales y locales.
- Formular las preguntas **Wann?**, **Warum?**, **Wie?** y **Wo/Wohin?**.
- Mantener el verbo conjugado en segunda posición al adelantar un complemento.
- Integrar objetos en acusativo y dativo dentro de oraciones largas.
- Distinguir entre orden neutro y orden enfático.
- Resolver los ejercicios con variantes naturales y gramaticalmente correctas.

#### 2. 📚 Vocabulario Clave (Wortschatz)
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| die Arbeit, -en | el trabajo | Sustantivo | nach der Arbeit |
| die Entspannung, -en | la relajación | Sustantivo | zur Entspannung |
| die Prüfung, -en | el examen | Sustantivo | wegen der Prüfungen |
| die Bibliothek, -en | la biblioteca | Sustantivo | in der Bibliothek |
| das Büro, -s | la oficina | Sustantivo | im Büro |
| das Projekt, -e | el proyecto | Sustantivo | aufgrund eines Projekts |
| das Wetter, sin plural | el tiempo / clima | Sustantivo | wegen des schlechten Wetters |
| die Erschöpfung, sin plural | el agotamiento | Sustantivo | aus Erschöpfung |
| der Fernseher, - | el televisor | Sustantivo | vor dem Fernseher |
| der Umzug, Umzüge | la mudanza | Sustantivo | wegen seines Umzugs |
| der Vortrag, Vorträge | la ponencia / conferencia | Sustantivo | wegen der schlechten Vorträge |
| das Seminar, -e | el seminario | Sustantivo | Das Seminar hat mir gefallen. |
| die Kantine, -n | el comedor de empresa | Sustantivo | in der Kantine |
| der Professor, -en | el profesor universitario | Sustantivo débil | einem Professor begegnen |
| der Kunde, -n | el cliente | Sustantivo débil | einem Kunden antworten |
| der Mitarbeiter, - | el empleado / colaborador | Sustantivo | einem Mitarbeiter kündigen |
| der Praktikant, -en | el estudiante en prácticas | Sustantivo débil | die Praktikantin |
| die Agentur, -en | la agencia | Sustantivo | bei einer Agentur |
| das Praktikum, Praktika | las prácticas | Sustantivo | ein Praktikum machen |
| der Blumenstrauß, Blumensträuße | el ramo de flores | Sustantivo | einen Blumenstrauß schicken |
| die Lieferverzögerung, -en | el retraso en la entrega | Sustantivo | wegen Lieferverzögerungen |
| das Lieblingsrestaurant, -s | el restaurante favorito | Sustantivo | in unser Lieblingsrestaurant |
| der Spaziergang, Spaziergänge | el paseo | Sustantivo | einen Spaziergang machen |
| das Einkaufszentrum, Einkaufszentren | el centro comercial | Sustantivo | im Einkaufszentrum |
| der Supermarkt, Supermärkte | el supermercado | Sustantivo | im Supermarkt |
| die Sehnsucht, sin plural | la añoranza | Sustantivo | aus Sehnsucht |
| die E-Mail, -s | el correo electrónico | Sustantivo | E-Mails schicken |
| die Neugier, sin plural | la curiosidad | Sustantivo | aus Neugier |
| momentan | actualmente | Adverbio temporal | Ich lerne momentan viel. |
| täglich | diariamente | Adverbio temporal | täglich lernen |
| intensiv | intensamente | Adverbio modal | intensiv arbeiten |
| zufällig | por casualidad | Adverbio modal | zufällig treffen |
| spontan | espontáneamente | Adverbio modal | spontan einladen |
| überraschend | de forma inesperada | Adverbio modal | überraschend kündigen |
| eifrig | con aplicación / diligentemente | Adverbio modal | eifrig helfen |
| kurzfristig | con poca antelación | Adverbio modal | kurzfristig absagen |
| einladen | invitar | Verbo separable irregular | jemanden einladen |
| begegnen | encontrarse con | Verbo + Dativ; Perfekt con sein | jemandem begegnen |
| kündigen | despedir / renunciar | Verbo regular | jemandem kündigen |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1 ¿Qué significa TeKaMoLo?
| Abreviatura | Tipo | Pregunta | Ejemplos |
| :--- | :--- | :--- | :--- |
| **Te** | Temporal | Wann? Wie lange? Wie oft? | heute, nach der Arbeit, jeden Tag |
| **Ka** | Kausal | Warum? Weshalb? | wegen des Wetters, aus Neugier |
| **Mo** | Modal | Wie? Womit? Mit wem? | schnell, mit Freude, mit Freunden |
| **Lo** | Lokal | Wo? Wohin? Woher? | im Büro, in den Park, aus Spanien |

- **Orden neutro:** `Temporal + Kausal + Modal + Lokal`
- **Fórmula:** `Sujeto + verbo + Te + Ka + Mo + Lo`

##### 3.2 Ejemplos básicos
| Oración | Te | Ka | Mo | Lo |
| :--- | :--- | :--- | :--- | :--- |
| Anna geht nach der Arbeit zur Entspannung in den Park. | nach der Arbeit | zur Entspannung | — | in den Park |
| Ich lerne momentan wegen der Prüfungen täglich in der Bibliothek. | momentan | wegen der Prüfungen | täglich | in der Bibliothek |
| Wir arbeiten diese Woche aufgrund eines Projekts sehr intensiv im Büro. | diese Woche | aufgrund eines Projekts | sehr intensiv | im Büro |
| Ich konnte heute wegen des schlechten Wetters nur sehr schwer zur Arbeit kommen. | heute | wegen des schlechten Wetters | nur sehr schwer | zur Arbeit |
| Martin ist gestern aus Erschöpfung vor dem Fernseher eingeschlafen. | gestern | aus Erschöpfung | — | vor dem Fernseher |

##### 3.3 La posición inicial y el verbo en segunda posición
Un complemento puede ocupar la primera posición para destacarlo. El verbo conjugado debe seguir en la segunda posición.

| Elemento destacado | Oración |
| :--- | :--- |
| Sujeto | Anna geht nach der Arbeit zur Entspannung in den Park. |
| Tiempo | Nach der Arbeit geht Anna zur Entspannung in den Park. |
| Causa/finalidad | Zur Entspannung geht Anna nach der Arbeit in den Park. |
| Lugar | In den Park geht Anna nach der Arbeit zur Entspannung. |

- Solo un constituyente ocupa la primera posición.
- El sujeto pasa detrás del verbo cuando otro elemento abre la oración.

##### 3.4 TeKaMoLo es un orden neutro, no una regla absoluta
- El contexto, el énfasis y la información conocida pueden modificar el orden.
- Los complementos cortos suelen aparecer antes que los muy largos.
- Un elemento contrastado puede adelantarse.
- Para A1-A2, TeKaMoLo es una guía segura para construir una oración neutral.

##### 3.5 El marco verbal
En tiempos compuestos, con verbos modales y con verbos separables, los complementos quedan dentro del marco verbal.

| Tipo | Estructura | Ejemplo |
| :--- | :--- | :--- |
| Perfekt | auxiliar + complementos + participio | Ich habe gestern im Park Fußball gespielt. |
| Modal | modal + complementos + infinitivo | Ich muss heute wegen der Prüfung zu Hause lernen. |
| Separable | verbo conjugado + complementos + prefijo | Wir laden morgen unsere Freunde ein. |

##### 3.6 Objetos y TeKaMoLo
TeKaMoLo organiza principalmente los complementos circunstanciales. Los objetos siguen además sus propias tendencias.

- Los pronombres personales aparecen normalmente pronto:
  - `Ich habe **ihm** gestern geholfen.`
  - `Ich habe **es** ihm gestern erklärt.`
- Con dos objetos expresados mediante sustantivos, el dativo suele preceder al acusativo:
  - `Wir kaufen **der Chefin** am Montag **ein Geschenk**.`
- La información conocida suele preceder a la nueva.
- Los objetos indefinidos o informativamente nuevos suelen aparecer más tarde.

##### 3.7 Dativo determinado
Un objeto dativo conocido aparece con frecuencia antes de TeKaMoLo:

`Ich habe meinem Nachbarn letzte Woche wegen seines Umzugs gern in seiner Wohnung geholfen.`

| Elemento | Función |
| :--- | :--- |
| meinem Nachbarn | Dativo |
| letzte Woche | Temporal |
| wegen seines Umzugs | Kausal |
| gern | Modal |
| in seiner Wohnung | Lokal |

También es posible colocar un dativo después de varios complementos cuando el contexto lo favorece:

`Ich bin gestern zufällig in der Kantine dem Chef begegnet.`

El orden más neutral y ligero suele ser:

`Ich bin dem Chef gestern zufällig in der Kantine begegnet.`

##### 3.8 Dativo indeterminado
`Ich bin gestern zufällig einem Professor in der Bibliothek begegnet.`

- `gestern` = temporal.
- `zufällig` = modal.
- `einem Professor` = objeto dativo nuevo.
- `in der Bibliothek` = local.

Otra variante posible:

`Ich bin gestern zufällig in der Bibliothek einem Professor begegnet.`

La segunda enfatiza más el encuentro con ese profesor.

##### 3.9 Acusativo determinado e indeterminado
| Tipo | Ejemplo neutro |
| :--- | :--- |
| Determinado | Wir haben unseren Lehrer am Freitag zufällig im Park getroffen. |
| Indeterminado | Ich habe letzte Woche aus Neugier spontan eine junge Frau im Internet kennengelernt. |

- Un acusativo determinado puede aparecer temprano porque representa información conocida.
- Un acusativo indefinido suele aparecer después de los complementos iniciales y antes o cerca del lugar.

##### 3.10 Más de un objeto
- Con dos sustantivos: normalmente `Dativ + Akkusativ`.
- Con dos pronombres: normalmente `Akkusativ + Dativ`.

| Oración | Dativo | Acusativo | TeKaMoLo |
| :--- | :--- | :--- | :--- |
| Wir haben der Chefin am Montag zu ihrem Geburtstag schnell ein Geschenk im Laden gekauft. | der Chefin | ein Geschenk | am Montag - zu ihrem Geburtstag - schnell - im Laden |
| Felix hat seiner Freundin gestern aus Liebe spontan einen Blumenstrauß ins Büro geschickt. | seiner Freundin | einen Blumenstrauß | gestern - aus Liebe - spontan - ins Büro |
| Andy hat uns heute sehr geduldig die Grammatik im Webinar erklärt. | uns | die Grammatik | heute - sehr geduldig - im Webinar |

##### 3.11 Clasificación de expresiones frecuentes
| Expresión | Tipo |
| :--- | :--- |
| gestern Abend | Temporal |
| jeden Sonntag | Temporal |
| den ganzen Tag | Temporal |
| am Samstag | Temporal |
| letzte Woche | Temporal |
| aus Neugier | Kausal |
| aus Sehnsucht | Kausal |
| wegen des Wetters | Kausal |
| zum Geburtstag | Kausal/final |
| spontan | Modal |
| zufällig | Modal |
| laut | Modal |
| mit seinem Vater | Modal/compañía |
| im Büro | Local |
| in Spanien | Local |
| aus Spanien | Local de origen |
| in den Park | Local de destino |

##### 3.12 Ejercicios resueltos

###### 1. Invitar a los amigos
Elementos: `eingeladen - in unser Lieblingsrestaurant - wir - spontan - unsere Freunde - gestern Abend - haben`

- **Orden neutro:** `Wir haben gestern Abend spontan unsere Freunde in unser Lieblingsrestaurant eingeladen.`
- Tiempo al inicio: `Gestern Abend haben wir spontan unsere Freunde in unser Lieblingsrestaurant eingeladen.`
- Objeto al inicio: `Unsere Freunde haben wir gestern Abend spontan in unser Lieblingsrestaurant eingeladen.`
- Lugar al inicio: `In unser Lieblingsrestaurant haben wir gestern Abend spontan unsere Freunde eingeladen.`

###### 2. El compañero molesta
Elementos: `nervt - mein Kollege - den ganzen Tag - mich - im Büro`

- **Orden neutro:** `Mein Kollege nervt mich den ganzen Tag im Büro.`
- Tiempo al inicio: `Den ganzen Tag nervt mich mein Kollege im Büro.`
- Lugar al inicio: `Im Büro nervt mich mein Kollege den ganzen Tag.`

###### 3. Ver fútbol
Elementos: `Stefan - im Fernsehen - Fußball - jeden Sonntag - schaut - mit seinem Vater`

- **Orden neutro:** `Stefan schaut jeden Sonntag mit seinem Vater im Fernsehen Fußball.`
- Tiempo al inicio: `Jeden Sonntag schaut Stefan mit seinem Vater im Fernsehen Fußball.`
- Compañía al inicio: `Mit seinem Vater schaut Stefan jeden Sonntag im Fernsehen Fußball.`
- Objeto al inicio: `Fußball schaut Stefan jeden Sonntag mit seinem Vater im Fernsehen.`

###### 4. Dar un paseo
Elementos: `mit den Kindern - im Park - machen - einen Spaziergang - wir - am Samstag`

- **Orden neutro:** `Wir machen am Samstag mit den Kindern einen Spaziergang im Park.`
- Tiempo al inicio: `Am Samstag machen wir mit den Kindern einen Spaziergang im Park.`
- Compañía al inicio: `Mit den Kindern machen wir am Samstag einen Spaziergang im Park.`
- Lugar al inicio: `Im Park machen wir am Samstag mit den Kindern einen Spaziergang.`
- Variante: `Wir machen am Samstag mit den Kindern im Park einen Spaziergang.`

###### 5. Comprar un bolso
Elementos: `habe - diese Tasche - gekauft - im Einkaufszentrum - letzte Woche - ich - meiner Frau`

- **Orden neutro:** `Ich habe meiner Frau letzte Woche diese Tasche im Einkaufszentrum gekauft.`
- Tiempo al inicio: `Letzte Woche habe ich meiner Frau diese Tasche im Einkaufszentrum gekauft.`
- Lugar al inicio: `Im Einkaufszentrum habe ich meiner Frau letzte Woche diese Tasche gekauft.`
- Objeto al inicio: `Diese Tasche habe ich meiner Frau letzte Woche im Einkaufszentrum gekauft.`

> El PDF de soluciones añadía `spontan`, aunque no aparece entre los elementos. Se ha omitido.

###### 6. Encontrarse con un compañero
Elementos: `meinen Kollegen - zufällig - ich - getroffen - habe - im Supermarkt - gestern`

- **Orden neutro:** `Ich habe gestern zufällig meinen Kollegen im Supermarkt getroffen.`
- Tiempo al inicio: `Gestern habe ich zufällig meinen Kollegen im Supermarkt getroffen.`
- Objeto al inicio: `Meinen Kollegen habe ich gestern zufällig im Supermarkt getroffen.`
- Lugar al inicio: `Im Supermarkt habe ich gestern zufällig meinen Kollegen getroffen.`

###### 7. Comer paella
Elementos: `Paella - gegessen - ich - in Spanien - letztes Jahr - habe`

- **Orden neutro:** `Ich habe letztes Jahr in Spanien Paella gegessen.`
- Tiempo al inicio: `Letztes Jahr habe ich in Spanien Paella gegessen.`
- Lugar al inicio: `In Spanien habe ich letztes Jahr Paella gegessen.`
- Objeto al inicio: `Paella habe ich letztes Jahr in Spanien gegessen.`

###### 8. Enviar correos por añoranza
Elementos: `Marco - seiner Freundin - aus Spanien - E-Mails - schickt - aus Sehnsucht - jeden Tag`

- **Orden neutro:** `Marco schickt seiner Freundin jeden Tag aus Sehnsucht E-Mails aus Spanien.`
- Tiempo al inicio: `Jeden Tag schickt Marco seiner Freundin aus Sehnsucht E-Mails aus Spanien.`
- Dativo al inicio: `Seiner Freundin schickt Marco jeden Tag aus Sehnsucht E-Mails aus Spanien.`
- Causa al inicio: `Aus Sehnsucht schickt Marco seiner Freundin jeden Tag E-Mails aus Spanien.`
- Origen al inicio: `Aus Spanien schickt Marco seiner Freundin jeden Tag aus Sehnsucht E-Mails.`

###### 9. Escuchar música
Elementos: `laut - hört - mein Nachbar - immer - Musik - in seinem Wohnzimmer`

- **Orden neutro:** `Mein Nachbar hört immer laute Musik in seinem Wohnzimmer.`
- Tiempo al inicio: `Immer hört mein Nachbar laute Musik in seinem Wohnzimmer.`
- Lugar al inicio: `In seinem Wohnzimmer hört mein Nachbar immer laute Musik.`

> `laut` modifica aquí al sustantivo **Musik** y debe declinarse: `laute Musik`. Si describiera el verbo, sería posible `Mein Nachbar hört die Musik laut`.

###### 10. Ir al parque
Elementos: `geht - nach der Schule - zum Sport - Max - in den Park - mit seinen Freunden`

- **Orden neutro:** `Max geht nach der Schule zum Sport mit seinen Freunden in den Park.`
- Tiempo al inicio: `Nach der Schule geht Max zum Sport mit seinen Freunden in den Park.`
- Finalidad al inicio: `Zum Sport geht Max nach der Schule mit seinen Freunden in den Park.`
- Compañía al inicio: `Mit seinen Freunden geht Max nach der Schule zum Sport in den Park.`
- Lugar al inicio: `In den Park geht Max nach der Schule zum Sport mit seinen Freunden.`

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)
> **Was machst du nach der Arbeit?**  
> *Traducción:* ¿Qué haces después del trabajo?  
> *Uso:* Preguntar por planes.

> **Nach der Arbeit gehe ich mit Freunden in den Park.**  
> *Traducción:* Después del trabajo voy al parque con amigos.  
> *Uso:* Responder destacando el tiempo.

> **Wegen des schlechten Wetters bleibe ich heute zu Hause.**  
> *Traducción:* Debido al mal tiempo hoy me quedo en casa.  
> *Uso:* Explicar una causa.

> **Ich habe ihn gestern zufällig im Supermarkt getroffen.**  
> *Traducción:* Ayer me lo encontré por casualidad en el supermercado.  
> *Uso:* Relatar un encuentro.

> **Wir machen am Samstag mit den Kindern einen Spaziergang im Park.**  
> *Traducción:* El sábado damos un paseo con los niños por el parque.  
> *Uso:* Hablar de un plan familiar.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** TeKaMoLo significa temporal, causal, modal y local.
- ⚠️ **Atención:** Si un complemento ocupa la primera posición, el verbo sigue en segunda: `Heute arbeite ich ...`
- ⚠️ **Atención:** TeKaMoLo es el orden neutro; el contexto permite otras posiciones.
- ⚠️ **Atención:** Los pronombres personales suelen aparecer antes que los sustantivos y complementos largos.
- ⚠️ **Atención:** Con dos sustantivos, el dativo suele preceder al acusativo.
- ⚠️ **Atención:** La forma actual es `kennengelernt`, escrita en una sola palabra.
- ⚠️ **Atención:** La grafía correcta es `E-Mails`, no `E-mails`.
- ⚠️ **Atención:** `kündigen` puede significar renunciar (`Ich kündige.`) o despedir a alguien (`Ich kündige einem Mitarbeiter.`).
- ⚠️ **Pronunciación:** En **kausal**, `au` se pronuncia aproximadamente como “ao”.
- ⚠️ **Pronunciación:** En **zufällig**, la `z` inicial suena `ts` y `ä` es una vocal abierta.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: ¿Qué significa TeKaMoLo?
  A: Temporal - Kausal - Modal - Lokal.
  Type: flashcard
- Q: ¿Qué pregunta identifica un complemento temporal?
  A: Wann? / Wie lange? / Wie oft?
  Type: flashcard
- Q: ¿Qué pregunta identifica un complemento causal?
  A: Warum? / Weshalb?
  Type: flashcard
- Q: ¿Qué pregunta identifica un complemento modal?
  A: Wie? / Womit? / Mit wem?
  Type: flashcard
- Q: ¿Qué preguntas identifican un complemento local?
  A: Wo? / Wohin? / Woher?
  Type: flashcard
- Q: Ordena: im Büro / heute / wegen des Projekts / intensiv / wir / arbeiten
  A: Wir arbeiten heute wegen des Projekts intensiv im Büro.
  Type: sentence-order
- Q: Coloca «Heute» al inicio: Ich arbeite heute im Büro.
  A: Heute arbeite ich im Büro.
  Type: transformation
- Q: Corrige: Heute ich arbeite im Büro.
  A: Heute arbeite ich im Büro.
  Type: correction
- Q: Clasifica «gestern Abend».
  A: Temporal.
  Type: flashcard
- Q: Clasifica «wegen des Wetters».
  A: Kausal.
  Type: flashcard
- Q: Clasifica «mit seinen Freunden».
  A: Modal / compañía.
  Type: flashcard
- Q: Clasifica «in den Park».
  A: Lokal de destino.
  Type: flashcard
- Q: Ordena: wir / gestern Abend / spontan / unsere Freunde / eingeladen / haben
  A: Wir haben gestern Abend spontan unsere Freunde eingeladen.
  Type: sentence-order
- Q: Ordena: mein Kollege / mich / den ganzen Tag / im Büro / nervt
  A: Mein Kollege nervt mich den ganzen Tag im Büro.
  Type: sentence-order
- Q: Ordena: ich / gestern / zufällig / meinen Kollegen / im Supermarkt / getroffen / habe
  A: Ich habe gestern zufällig meinen Kollegen im Supermarkt getroffen.
  Type: sentence-order
- Q: Ordena: ich / letztes Jahr / in Spanien / Paella / gegessen / habe
  A: Ich habe letztes Jahr in Spanien Paella gegessen.
  Type: sentence-order
- Q: Ordena: mein Nachbar / immer / laute Musik / in seinem Wohnzimmer / hört
  A: Mein Nachbar hört immer laute Musik in seinem Wohnzimmer.
  Type: sentence-order
- Q: ¿Por qué se escribe «laute Musik» y no «laut Musik»?
  A: Porque «laut» es atributivo y debe declinarse delante del sustantivo.
  Type: flashcard
- Q: Traducción: Ayer me encontré por casualidad con mi compañero en el supermercado.
  A: Ich habe gestern zufällig meinen Kollegen im Supermarkt getroffen.
  Type: flashcard
- Q: Traducción: Debido al mal tiempo hoy me quedo en casa.
  A: Wegen des schlechten Wetters bleibe ich heute zu Hause.
  Type: flashcard
- Q: Completa: Ich habe _____ gestern geholfen. (er, dativo)
  A: ihm
  Type: fill-in-the-blank
- Q: Con dos objetos sustantivos, ¿cuál suele aparecer primero?
  A: El objeto en dativo.
  Type: flashcard
- Q: Corrige la grafía: E-mails
  A: E-Mails
  Type: correction
- Q: Corrige la grafía: kennen gelernt (participio según la ortografía actual)
  A: kennengelernt
  Type: correction
<!-- DATA_QUIZ_END -->


---


### Unidad 19 — La regla ADUSO: conjunciones en posición cero

*Nivel orientativo:* **A1** · *Alcance A1 de esta app:* ✅

> und/aber/oder/denn/sondern sí son A1.

---
class_id: 019
title: "La regla ADUSO: conjunciones en posición cero"
level: "A2"
topics: ["Gramática", "Conjunciones", "Posición cero", "Orden de la oración", "Oraciones coordinadas", "Ejercicios"]
target_exam: "Telc / Goethe A2"
---

### La regla ADUSO: conjunciones en posición cero

#### 1. 🎯 Resumen / Objetivos de la Lección
- Reconocer las conjunciones coordinantes de la regla **ADUSO**.
- Unir dos oraciones principales sin alterar la posición del verbo.
- Diferenciar **aber/doch**, **denn**, **und**, **sondern** y **oder**.
- Aplicar correctamente la negación previa necesaria para **sondern**.
- Distinguir **denn** de **weil** y **also**.
- Utilizar correctamente la coma entre oraciones coordinadas.

#### 2. 📚 Vocabulario Clave (Wortschatz)
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| die Position, -en | la posición | Sustantivo | Position null |
| die Konjunktion, -en | la conjunción | Sustantivo | eine koordinierende Konjunktion |
| der Hauptsatz, Hauptsätze | la oración principal | Sustantivo | zwei Hauptsätze verbinden |
| der Nebensatz, Nebensätze | la oración subordinada | Sustantivo | `weil` introduce un Nebensatz |
| die Eselsbrücke, -n | la regla mnemotécnica | Sustantivo | ADUSO ist eine Eselsbrücke. |
| die Party, -s | la fiesta | Sustantivo | zur Party kommen |
| das Fitnessstudio, Fitnessstudios | el gimnasio | Sustantivo | ins Fitnessstudio gehen |
| das Kino, -s | el cine | Sustantivo | ins Kino gehen |
| der Film, -e | la película | Sustantivo | einen Film schauen |
| die Brille, -n | las gafas | Sustantivo | En alemán se usa en singular. |
| der Kaffee, -s | el café | Sustantivo | keinen Kaffee trinken |
| der Tee, -s | el té | Sustantivo | lieber Tee trinken |
| der Deutschunterricht, sin plural | la clase de alemán | Sustantivo | Deutschunterricht haben |
| anrufen | llamar por teléfono | Verbo separable irregular | Ich rufe ihn an. |
| frühstücken | desayunar | Verbo regular | Ich frühstücke um sieben. |
| sich ausruhen | descansar | Verbo reflexivo separable | Ich ruhe mich aus. |
| suchen | buscar | Verbo regular + Akkusativ | meine Brille suchen |
| finden | encontrar | Verbo irregular + Akkusativ | Ich finde sie nicht. |
| mitkommen | venir con alguien | Verbo separable irregular | Kannst du mitkommen? |
| krank | enfermo | Adjetivo | Ich bin krank. |
| lieber | con preferencia / mejor | Adverbio comparativo | Ich trinke lieber Tee. |
| danach | después / luego | Adverbio | Danach habe ich Unterricht. |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1 ¿Qué significa ADUSO?
| Letra | Conjunción | Significado |
| :--- | :--- | :--- |
| A | **aber** | pero |
| D | **denn** | porque / pues |
| U | **und** | y |
| S | **sondern** | sino / sino que |
| O | **oder** | o |

**Regla mnemotécnica:** `ADUSO und der Satz bleibt so!`  
ADUSO y la oración mantiene su orden.

##### 3.2 La posición cero
- Las conjunciones ADUSO conectan dos oraciones principales.
- La conjunción ocupa la llamada **posición cero**.
- No cuenta como la primera posición de la segunda oración.
- El verbo conjugado mantiene su posición habitual.

**Estructura / Fórmula:**

`Hauptsatz 1 + , + Konjunktion (Pos. 0) + Pos. 1 + Verb (Pos. 2) + ...`

`Ich habe ihn angerufen, aber er war nicht da.`

| Segmento | Posición cero | Posición 1 | Posición 2 | Resto |
| :--- | :--- | :--- | :--- | :--- |
| Segunda oración | aber | er | war | nicht da |

##### 3.3 **aber** y **doch**
- Expresan contraste: «pero».
- **aber** es la opción más neutra y frecuente.
- **doch** como conjunción coordinante suele expresar una oposición algo más marcada.

`Ich habe ihn angerufen, aber er war nicht da.`  
Lo llamé, pero no estaba.

`Ich wollte kommen, doch ich war krank.`  
Quería venir, pero estaba enfermo.

> **doch** también puede funcionar como adverbio o partícula modal. En esos usos no se analiza necesariamente como posición cero.

##### 3.4 **denn**
- Introduce la razón de lo dicho en la primera oración.
- Significa «porque», «pues» o «ya que».
- Une dos oraciones principales; el verbo no va al final.

`Ich konnte nicht zur Party kommen, denn ich war krank.`

| Conjunción | Estructura |
| :--- | :--- |
| denn | ..., denn ich **war** krank. |
| weil | ..., weil ich krank **war**. |

Ambas expresan causa, pero **weil** introduce una subordinada con el verbo al final.

##### 3.5 **und**
- Suma información, acciones o elementos.
- Significa «y».

`Ich stehe um sechs Uhr auf und ich frühstücke.`

- Si el sujeto es el mismo, puede omitirse en la segunda parte:
  - `Ich stehe um sechs Uhr auf und frühstücke.`
- Los infinitivos o participios finales mantienen la estructura correspondiente:
  - `Ich möchte ins Kino gehen und einen Film sehen.`

##### 3.6 **sondern**
- Corrige o sustituye una información negada previamente.
- Significa «sino» o «sino que».
- Requiere una negación explícita en el primer elemento: **nicht, kein-**, etc.

`Heute gehe ich nicht ins Fitnessstudio, sondern ich ruhe mich aus.`

`Ich trinke keinen Kaffee, sondern lieber Tee.`

Comparación:

| Conjunción | Uso | Ejemplo |
| :--- | :--- | :--- |
| aber | contraste general | Er ist müde, aber er arbeitet. |
| sondern | sustitución tras negación | Er trinkt keinen Kaffee, sondern Tee. |

##### 3.7 **oder**
- Presenta una alternativa.
- Significa «o».

`Wir können ins Kino gehen oder wir schauen zu Hause einen Film.`

Si el sujeto y el verbo auxiliar coinciden, pueden omitirse:

`Wir können ins Kino gehen oder zu Hause einen Film schauen.`

##### 3.8 Comas
- Se escribe coma delante de **aber, doch, denn** y **sondern** cuando conectan oraciones:
  - `Ich komme, aber ich bleibe nicht lange.`
- Delante de **und** y **oder** normalmente no se escribe coma:
  - `Ich lerne und meine Schwester arbeitet.`
- Puede usarse una coma delante de **und/oder** para hacer más clara la estructura de oraciones principales extensas, pero no es la opción básica de A1.

##### 3.9 ADUSO frente a **also**
- **also** no forma parte de ADUSO.
- **denn** introduce una causa:
  - `Ich bleibe zu Hause, denn ich bin krank.`  
    Me quedo en casa porque estoy enfermo.
- **also** introduce una consecuencia y ocupa la primera posición:
  - `Ich bin krank, also bleibe ich zu Hause.`  
    Estoy enfermo, así que me quedo en casa.
- Tras **also**, el verbo aparece inmediatamente:
  - `also bleibe ich`, no `also ich bleibe`.

##### 3.10 ADUSO con el marco verbal
La conjunción no modifica las reglas de los tiempos verbales, verbos modales o verbos separables.

| Tipo | Ejemplo |
| :--- | :--- |
| Perfekt | Ich habe ihn angerufen, aber er hat nicht geantwortet. |
| Modal | Ich kann nicht kommen, denn ich muss lernen. |
| Separable | Ich stehe früh auf und ich kaufe Brötchen ein. |

##### 3.11 Omisión de elementos repetidos
Cuando ambas oraciones comparten sujeto, este puede omitirse con **und**, **oder**, **aber** y **sondern** si el resultado es claro.

| Forma completa | Forma reducida |
| :--- | :--- |
| Ich suche meine Brille, aber ich finde sie nicht. | Ich suche meine Brille, finde sie aber nicht. |
| Ich trinke keinen Kaffee, sondern ich trinke Tee. | Ich trinke keinen Kaffee, sondern Tee. |
| Wir gehen ins Kino oder wir schauen einen Film. | Wir gehen ins Kino oder schauen einen Film. |

> La forma reducida puede cambiar la posición visible de la conjunción, especialmente con **aber**. Para practicar la posición cero, conviene empezar con dos oraciones completas.

##### 3.12 Ejercicios resueltos
| # | Español | Alemán | Posición cero |
| :--- | :--- | :--- | :--- |
| 1 | Estoy buscando mis gafas, pero no las encuentro. | Ich suche meine Brille, **aber** ich finde sie nicht. | aber |
| 2 | No bebo café, sino que prefiero beber té. | Ich trinke keinen Kaffee, **sondern** ich trinke lieber Tee. | sondern |
| 3 | Esta mañana voy al gimnasio y luego tengo clase de alemán. | Heute Morgen gehe ich ins Fitnessstudio **und** danach habe ich Deutschunterricht. | und |
| 4 | ¿Usted trabaja o estudia? | Arbeiten Sie **oder** studieren Sie? | oder |
| 5 | No puedo venir con vosotros porque tengo que estudiar. | Ich kann nicht mit euch kommen, **denn** ich muss lernen. | denn |

###### Variantes naturales
- `Ich trinke keinen Kaffee, sondern lieber Tee.`
- `Heute Morgen gehe ich ins Fitnessstudio und habe danach Deutschunterricht.`
- `Arbeiten oder studieren Sie?`
- Con subordinada causal: `Ich kann nicht mit euch kommen, weil ich lernen muss.`

##### 3.13 Análisis de las soluciones

###### `Ich suche meine Brille, aber ich finde sie nicht.`
- Primera oración: `ich` ocupa la posición 1; `suche` la posición 2.
- `aber` ocupa la posición cero.
- Segunda oración: `ich` vuelve a ocupar la posición 1; `finde` la posición 2.
- `die Brille` se sustituye por el pronombre acusativo femenino `sie`.

###### `Ich kann nicht mit euch kommen, denn ich muss lernen.`
- En la primera oración, `kann` es el verbo modal conjugado y `kommen` queda al final.
- `denn` no altera la segunda oración.
- En la segunda oración, `muss` ocupa la posición 2 y `lernen` queda al final.

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)
> **Ich möchte kommen, aber ich habe keine Zeit.**  
> *Traducción:* Me gustaría ir, pero no tengo tiempo.  
> *Uso:* Rechazar una invitación explicando un impedimento.

> **Ich kann nicht kommen, denn ich muss arbeiten.**  
> *Traducción:* No puedo ir porque tengo que trabajar.  
> *Uso:* Dar una razón.

> **Möchtest du Kaffee oder Tee?**  
> *Traducción:* ¿Quieres café o té?  
> *Uso:* Ofrecer alternativas.

> **Keinen Kaffee, sondern Tee, bitte.**  
> *Traducción:* Café no, sino té, por favor.  
> *Uso:* Corregir una elección.

> **Ich gehe ins Fitnessstudio und danach habe ich Deutschunterricht.**  
> *Traducción:* Voy al gimnasio y después tengo clase de alemán.  
> *Uso:* Enumerar planes.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** ADUSO significa **aber, denn, und, sondern, oder**.
- ⚠️ **Atención:** La conjunción ocupa posición cero; después empieza una oración principal normal.
- ⚠️ **Atención:** `denn` mantiene el verbo en segunda posición; `weil` envía el verbo al final.
- ⚠️ **Atención:** Usa `sondern` solo después de una negación.
- ⚠️ **Atención:** `aber` expresa contraste; no necesita una negación previa.
- ⚠️ **Atención:** Normalmente no se escribe coma delante de `und` u `oder`.
- ⚠️ **Atención:** `also` no pertenece a ADUSO y provoca inversión: `also gehe ich`.
- ⚠️ **Atención:** En alemán, «las gafas» se expresa normalmente en singular: `die Brille`.
- ⚠️ **Pronunciación:** En **sondern**, la `r` final puede vocalizarse en la pronunciación estándar.
- ⚠️ **Pronunciación:** **oder** empieza con una vocal larga.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: ¿Qué significa la sigla ADUSO?
  A: aber, denn, und, sondern, oder
  Type: flashcard
- Q: ¿Qué posición ocupan las conjunciones ADUSO?
  A: La posición cero.
  Type: flashcard
- Q: Ich bin müde, _____ ich arbeite weiter. (pero)
  A: aber
  Type: fill-in-the-blank
- Q: Ich bleibe zu Hause, _____ ich bin krank. (porque)
  A: denn
  Type: fill-in-the-blank
- Q: Ich lerne Deutsch _____ meine Schwester lernt Spanisch. (y)
  A: und
  Type: fill-in-the-blank
- Q: Ich trinke keinen Kaffee, _____ Tee. (sino)
  A: sondern
  Type: fill-in-the-blank
- Q: Möchtest du Kaffee _____ Tee? (o)
  A: oder
  Type: fill-in-the-blank
- Q: Corrige: Ich bin müde, aber arbeite ich weiter.
  A: Ich bin müde, aber ich arbeite weiter.
  Type: correction
- Q: Corrige: Ich bleibe zu Hause, denn ich krank bin.
  A: Ich bleibe zu Hause, denn ich bin krank.
  Type: correction
- Q: Completa con weil: Ich bleibe zu Hause, weil _____.
  A: ich krank bin
  Type: fill-in-the-blank
- Q: Convierte a «also»: Ich bleibe zu Hause, denn ich bin krank.
  A: Ich bin krank, also bleibe ich zu Hause.
  Type: transformation
- Q: Traducción: Busco mis gafas, pero no las encuentro.
  A: Ich suche meine Brille, aber ich finde sie nicht.
  Type: flashcard
- Q: Traducción: No bebo café, sino té.
  A: Ich trinke keinen Kaffee, sondern Tee.
  Type: flashcard
- Q: Traducción: ¿Usted trabaja o estudia?
  A: Arbeiten Sie oder studieren Sie?
  Type: flashcard
- Q: Traducción: No puedo venir porque tengo que estudiar. (denn)
  A: Ich kann nicht kommen, denn ich muss lernen.
  Type: flashcard
- Q: Traducción: No puedo venir porque tengo que estudiar. (weil)
  A: Ich kann nicht kommen, weil ich lernen muss.
  Type: flashcard
- Q: ¿Qué conjunción exige una negación previa?
  A: sondern
  Type: flashcard
- Q: ¿Qué conjunción causal mantiene el verbo en posición 2?
  A: denn
  Type: flashcard
- Q: ¿Se escribe normalmente coma delante de «und»?
  A: No.
  Type: flashcard
- Q: ¿Se escribe coma delante de «aber» entre dos oraciones?
  A: Sí.
  Type: flashcard
- Q: Ordena: ich / muss / denn / lernen
  A: denn ich muss lernen
  Type: sentence-order
- Q: Ordena: also / ich / zu Hause / bleibe
  A: also bleibe ich zu Hause
  Type: sentence-order
- Q: Corrige: Ich trinke Kaffee, sondern Tee.
  A: Ich trinke keinen Kaffee, sondern Tee.
  Type: correction
- Q: ¿Cuál es la diferencia básica entre «aber» y «sondern»?
  A: Aber expresa contraste general; sondern sustituye una información previamente negada.
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 20 — Sustantivación de verbos

*Nivel orientativo:* **B1** · *Alcance A1 de esta app:* 📚

---
class_id: 020
title: "Sustantivación de verbos"
level: "B1"
topics: ["Gramática", "Nominalización", "Sustantivos", "Infinitivo", "zum", "Formación de palabras", "Ejercicios"]
target_exam: "Telc / Goethe B1"
---

### Sustantivación de verbos

#### 1. 🎯 Resumen / Objetivos de la Lección
- Convertir un infinitivo alemán en sustantivo.
- Aplicar correctamente la mayúscula inicial y el artículo neutro **das**.
- Formar expresiones con **zum + infinitivo sustantivado**.
- Crear compuestos frecuentes como **das Kofferpacken** o **das Tennisspielen**.
- Distinguir un verbo sustantivado de un infinitivo verbal normal.
- Reconocer cuándo existe un sustantivo léxico más habitual.
- Resolver y corregir los ejercicios de los PDF.

#### 2. 📚 Vocabulario Clave (Wortschatz)

##### Verbos y nominalizaciones
| Verbo | Sustantivación | Español | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| rauchen | das Rauchen | fumar / el acto de fumar | Rauchen ist ungesund. |
| aufwachen | das Aufwachen | despertarse / el despertar | Das Aufwachen fällt mir schwer. |
| parken | das Parken | aparcar | Das Parken ist verboten. |
| sehen | das Sehen | ver / la visión | beim Sehen |
| renovieren | das Renovieren | renovar | Material zum Renovieren |
| schwimmen | das Schwimmen | nadar / la natación | Schwimmen ist erlaubt. |
| einschlafen | das Einschlafen | dormirse | ein Buch zum Einschlafen |
| lesen | das Lesen | leer / la lectura como actividad | Zeit zum Lesen |
| arbeiten | das Arbeiten | trabajar / el acto de trabajar | Ruhe zum Arbeiten |
| spielen | das Spielen | jugar | Zeit zum Spielen |
| warten | das Warten | esperar / la espera | das Warten auf den Bus |
| werfen | das Werfen | lanzar / el lanzamiento | beim Werfen |
| aufgeben | das Aufgeben | entregar / facturar / rendirse | das Aufgeben des Gepäcks |
| essen | das Essen | comer / la comida | Zeit zum Essen |
| trinken | das Trinken | beber / el acto de beber | Wasser zum Trinken |
| schreiben | das Schreiben | escribir / el escrito | ein Stift zum Schreiben |
| gehen | das Gehen | irse / caminar | der Moment zum Gehen |
| packen | das Packen | hacer / guardar el equipaje | das Kofferpacken |
| Tennis spielen | das Tennisspielen | jugar al tenis | Lust zum Tennisspielen |
| Deutsch lernen | das Deutschlernen | aprender alemán | beim Deutschlernen |
| Auto fahren | das Autofahren | conducir | Autofahren macht Spaß. |

##### Sustantivos de los ejercicios
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Koffer, - | la maleta | Sustantivo | meinen Koffer packen |
| das Material, Materialien | el material | Sustantivo | Material zum Renovieren |
| die Zeit, -en | el tiempo | Sustantivo | Zeit zum Lesen |
| das Buch, Bücher | el libro | Sustantivo | ein gutes Buch |
| die PlayStation, -s | la consola PlayStation | Nombre propio / sustantivo | die PlayStation ausmachen |
| der Fußball, Fußbälle | el balón de fútbol | Sustantivo | zu wenig Luft haben |
| die Luft, Lüfte | el aire | Sustantivo | Der Ball hat wenig Luft. |
| der Bus, -se | el autobús | Sustantivo | auf den Bus warten |
| der Ball, Bälle | la pelota | Sustantivo | den Ball werfen |
| der Zaun, Zäune | la valla | Sustantivo | über den Zaun |
| das Gepäck, sin plural | el equipaje | Sustantivo | das Gepäck aufgeben |
| der Hunger, sin plural | el hambre | Sustantivo | Hunger haben |
| das Wasser, sin plural | el agua | Sustantivo | Wasser zum Trinken |
| der Schläger, - | la raqueta / bate | Sustantivo | ein Tennisschläger |
| der Tennisball, Tennisbälle | la pelota de tenis | Sustantivo | keine Tennisbälle |
| der Stift, -e | el bolígrafo / lápiz | Sustantivo | ein Stift zum Schreiben |
| die Party, -s | la fiesta | Sustantivo | die Party verlassen |
| der Moment, -e | el momento | Sustantivo | der richtige Moment |
| die Lust, Lüste | las ganas / el deseo | Sustantivo | Lust auf etwas haben |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1 Formación básica
- Se toma el infinitivo completo.
- Se escribe con mayúscula inicial.
- El sustantivo resultante es neutro: **das**.
- Generalmente designa la actividad o el proceso.

**Estructura / Fórmula:** `infinitivo → das + Infinitivo con mayúscula`

| Verbo | Sustantivo |
| :--- | :--- |
| rauchen | das Rauchen |
| lesen | das Lesen |
| schwimmen | das Schwimmen |
| arbeiten | das Arbeiten |
| aufwachen | das Aufwachen |

##### 3.2 De verbo a sustantivo
`Rauchen ist ungesund.`  
Fumar no es sano.

`Das lange Warten ist anstrengend.`  
La larga espera es agotadora.

`Beim Lesen höre ich Musik.`  
Mientras leo, escucho música.

- Como cualquier sustantivo, la nominalización puede llevar artículo, adjetivo y preposición.
- Cuando se habla de una actividad en general, el artículo puede omitirse:
  - `Das Rauchen ist hier verboten.`
  - `Rauchen ist hier verboten.`

##### 3.3 Género, número y declinación
- Los infinitivos sustantivados son neutros.
- Normalmente no tienen plural porque designan una actividad abstracta.
- El infinitivo no recibe terminaciones de caso; el caso se observa en el artículo.

| Caso | Forma |
| :--- | :--- |
| Nominativo | das Lesen |
| Acusativo | das Lesen |
| Dativo | dem Lesen |
| Genitivo | des Lesens |

##### 3.4 Verbos separables y no separables
Se conserva la forma completa del infinitivo:

| Verbo | Sustantivación |
| :--- | :--- |
| aufwachen | das Aufwachen |
| einkaufen | das Einkaufen |
| einschlafen | das Einschlafen |
| ausruhen | das Ausruhen |
| verstehen | das Verstehen |

- El prefijo no se separa dentro del sustantivo.
- Toda la palabra empieza con mayúscula.

##### 3.5 Expresiones con **zum**
- **zu** rige dativo.
- Como la nominalización es neutra, se usa `zu dem`.
- `zu dem` se contrae a **zum**.

**Estructura / Fórmula:** `zum + Infinitivo sustantivado`

| Ejemplo | Traducción |
| :--- | :--- |
| Zeit zum Lesen | tiempo para leer |
| Wasser zum Trinken | agua para beber |
| ein Stift zum Schreiben | un bolígrafo para escribir |
| Material zum Renovieren | material para renovar |
| ein Buch zum Einschlafen | un libro para dormirse |

##### 3.6 Significados de **zum + nominalización**
La construcción puede indicar:

1. **Finalidad o uso**
   - `Wasser zum Trinken` → agua para beber.
   - `ein Stift zum Schreiben` → un bolígrafo para escribir.

2. **Momento apropiado**
   - `Zeit zum Essen` → hora/momento de comer.
   - `der Moment zum Gehen` → el momento de irse.

3. **Actividad asociada**
   - `Musik zum Tanzen` → música para bailar.
   - `ein Buch zum Einschlafen` → un libro para dormirse.

##### 3.7 Compuestos con objeto + verbo
Algunas combinaciones frecuentes se escriben como una sola palabra:

| Construcción verbal | Compuesto |
| :--- | :--- |
| den Koffer packen | das Kofferpacken |
| Auto fahren | das Autofahren |
| Tennis spielen | das Tennisspielen |
| Deutsch lernen | das Deutschlernen |
| Kaffee trinken | das Kaffeetrinken |

`Wir brauchen viel Zeit zum Kofferpacken.`  
Necesitamos mucho tiempo para hacer las maletas.

- No todas las combinaciones se lexicalizan con la misma naturalidad.
- En caso de duda, una estructura verbal o un sustantivo ya existente suele ser más segura.

##### 3.8 Nominalización frente a sustantivo léxico
Muchos verbos tienen un sustantivo propio. Las dos formas pueden tener matices diferentes.

| Verbo | Nominalización: actividad/proceso | Sustantivo habitual |
| :--- | :--- | :--- |
| arbeiten | das Arbeiten | die Arbeit |
| fahren | das Fahren | die Fahrt |
| entscheiden | das Entscheiden | die Entscheidung |
| anmelden | das Anmelden | die Anmeldung |
| prüfen | das Prüfen | die Prüfung |

- `Das Arbeiten im Homeoffice ist angenehm.`  
  El hecho de trabajar desde casa es agradable.
- `Die Arbeit ist interessant.`  
  El trabajo es interesante.

##### 3.9 Cómo reconocer una nominalización
Indicadores frecuentes:

- Está escrita con mayúscula.
- Aparece con `das`, `ein`, un posesivo o un adjetivo.
- Aparece después de una preposición contraída:
  - `beim` = bei dem
  - `zum` = zu dem
- Puede ocupar el lugar de sujeto u objeto.

##### 3.10 No confundir artículo y pronombre
`Du kannst das sehen, wie du willst.`

- `das` sustituye una idea anterior y es un pronombre.
- `sehen` es un verbo normal en infinitivo y se escribe con minúscula.
- No significa `das Sehen`.

Comparación:

| Oración | Análisis |
| :--- | :--- |
| Du kannst das sehen, wie du willst. | `das` = pronombre; `sehen` = verbo |
| Das Sehen fällt ihm schwer. | `das Sehen` = sustantivo |

##### 3.11 Ejercicios de 044 resueltos

###### ¿Verbo o sustantivo?
| Ejercicio | Solución | Explicación |
| :--- | :--- | :--- |
| Das ___ von Autos ist hier verboten. (parken) | Das **Parken** von Autos ist hier verboten. | Sustantivo neutro. |
| Du kannst das ___, wie du willst. (sehen) | Du kannst das **sehen**, wie du willst. | Infinitivo verbal tras `kannst`. |
| Ich brauche viel Material zum ___. (renovieren) | ... zum **Renovieren**. | Sustantivo tras `zum`. |
| ___ ist hier nicht erlaubt. (schwimmen) | **Schwimmen** ist hier nicht erlaubt. | Sujeto sustantivado. |

###### Completar con una actividad
| Contexto | Solución |
| :--- | :--- |
| Wenn ich nicht einschlafen kann, lese ich ein gutes Buch. | Gute Bücher sind sehr gut **zum Einschlafen**. |
| Früher habe ich vor dem Schlafen gelesen. | Heute finde ich keine Zeit **zum Lesen**. |
| Das Haus ist ruhig; ich kann ungestört arbeiten. | Das ist die beste Zeit **zum Arbeiten**. |
| Karl, mach die PlayStation sofort aus! | Jetzt ist nicht die Zeit **zum Spielen**. |
| Dieser Fußball hat zu wenig Luft. | Er ist nicht gut **zum Spielen**. |

##### 3.12 Ejercicios de 045 resueltos y corregidos

###### ¿Verbo o sustantivo?
| Ejercicio | Solución normalizada | Explicación |
| :--- | :--- | :--- |
| Das ___ auf den Bus macht keinen Spaß. (warten) | Das **Warten** auf den Bus macht keinen Spaß. | `Warten` es sustantivo; `auf` rige acusativo. |
| Lilly ___ den Ball über den Zaun. (werfen) | Lilly **wirft** den Ball über den Zaun. | Es un verbo conjugado, no una nominalización. |
| Für das ___ des Gepäcks muss man extra bezahlen. (aufgeben) | Für das **Aufgeben** des Gepäcks muss man extra bezahlen. | Sustantivo neutro. |

###### Completar con **zum**
| Contexto | Solución |
| :--- | :--- |
| Ich habe Hunger und es ist schon halb drei. | Es ist jetzt die richtige Zeit **zum Essen**. |
| Dieses Wasser ist schmutzig und riecht schlecht. | Dieses Wasser ist nicht **zum Trinken**. |
| Ich habe keinen Schläger und keine Tennisbälle. | Außerdem habe ich keine Lust **zum Spielen / zum Tennisspielen**. |
| Dieser Stift ist zu dick und schwer. | Er ist nicht gut **zum Schreiben**. |
| Die Party ist langweilig und es ist spät. | Es ist der richtige Moment **zum Gehen**. |

##### 3.13 Alternativas más idiomáticas
Aunque `Lust zum Spielen` es gramatical en ciertos contextos, en alemán cotidiano se usa a menudo:

- `Ich habe keine Lust zu spielen.`
- `Ich habe keine Lust auf Tennis.`

Para el equipaje, existe además el sustantivo:

- `die Gepäckaufgabe` → la facturación de equipaje.
- `Für die Gepäckaufgabe muss man extra bezahlen.`

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)
> **Rauchen ist hier verboten.**  
> *Traducción:* Aquí está prohibido fumar.  
> *Uso:* Señales y normas.

> **Schwimmen ist hier nicht erlaubt.**  
> *Traducción:* Aquí no está permitido nadar.  
> *Uso:* Indicar una prohibición.

> **Ich habe keine Zeit zum Lesen.**  
> *Traducción:* No tengo tiempo para leer.  
> *Uso:* Hablar de falta de tiempo.

> **Ist das Wasser zum Trinken?**  
> *Traducción:* ¿El agua es potable?  
> *Uso:* Preguntar si se puede beber el agua.

> **Es ist Zeit zum Essen.**  
> *Traducción:* Es hora de comer.  
> *Uso:* Anunciar una actividad.

> **Ich habe keine Lust zu spielen.**  
> *Traducción:* No tengo ganas de jugar.  
> *Uso:* Expresar falta de ganas.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** Los infinitivos sustantivados se escriben con mayúscula: `das Lesen`.
- ⚠️ **Atención:** Siempre son neutros: `das Rauchen`, `das Schwimmen`.
- ⚠️ **Atención:** Después de `zum`, la nominalización lleva mayúscula: `zum Essen`.
- ⚠️ **Atención:** No escribas mayúscula si sigue siendo verbo: `Du kannst das sehen`.
- ⚠️ **Atención:** Se dice `meinen Koffer packen`, no `mein Koffer packen`.
- ⚠️ **Atención:** `warten auf` rige acusativo: `auf den Bus`.
- ⚠️ **Atención:** Se dice `Das Warten macht keinen Spaß`, porque `Spaß` es masculino.
- ⚠️ **Atención:** Para indicar trayectoria sobre una barrera se usa `über den Zaun`.
- ⚠️ **Atención:** La grafía correcta es `Spaghetti`, no `Spaguetti`.
- ⚠️ **Pronunciación:** En `Schwimmen`, `schw` comienza aproximadamente con el sonido “shv”.
- ⚠️ **Pronunciación:** En `Aufgeben`, el diptongo `au` suena aproximadamente “ao”.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: ¿Qué género tienen los infinitivos sustantivados?
  A: Neutro.
  Type: flashcard
- Q: Convierte «rauchen» en sustantivo.
  A: das Rauchen
  Type: transformation
- Q: Convierte «lesen» en sustantivo.
  A: das Lesen
  Type: transformation
- Q: Convierte «aufwachen» en sustantivo.
  A: das Aufwachen
  Type: transformation
- Q: Convierte «Tennis spielen» en sustantivo compuesto.
  A: das Tennisspielen
  Type: transformation
- Q: Das _____ von Autos ist verboten. (parken)
  A: Parken
  Type: fill-in-the-blank
- Q: Du kannst das _____, wie du willst. (sehen)
  A: sehen
  Type: fill-in-the-blank
- Q: Ich brauche Material zum _____. (renovieren)
  A: Renovieren
  Type: fill-in-the-blank
- Q: _____ ist hier nicht erlaubt. (schwimmen)
  A: Schwimmen
  Type: fill-in-the-blank
- Q: Ich habe keine Zeit zum _____. (lesen)
  A: Lesen
  Type: fill-in-the-blank
- Q: Das ist die beste Zeit zum _____. (arbeiten)
  A: Arbeiten
  Type: fill-in-the-blank
- Q: Gute Bücher sind gut zum _____. (einschlafen)
  A: Einschlafen
  Type: fill-in-the-blank
- Q: Es ist Zeit zum _____. (essen)
  A: Essen
  Type: fill-in-the-blank
- Q: Dieses Wasser ist nicht zum _____. (trinken)
  A: Trinken
  Type: fill-in-the-blank
- Q: Der Stift ist gut zum _____. (schreiben)
  A: Schreiben
  Type: fill-in-the-blank
- Q: Es ist der richtige Moment zum _____. (gehen)
  A: Gehen
  Type: fill-in-the-blank
- Q: Corrige: Das warten auf den Bus macht kein Spaß.
  A: Das Warten auf den Bus macht keinen Spaß.
  Type: correction
- Q: Corrige: Das Warten auf dem Bus macht keinen Spaß.
  A: Das Warten auf den Bus macht keinen Spaß.
  Type: correction
- Q: Corrige: Lilly werft den Ball über der Zaun.
  A: Lilly wirft den Ball über den Zaun.
  Type: correction
- Q: Corrige: Ich packe mein Koffer.
  A: Ich packe meinen Koffer.
  Type: correction
- Q: Traducción: Fumar no es sano.
  A: Rauchen ist ungesund. / Das Rauchen ist ungesund.
  Type: flashcard
- Q: Traducción: Necesitamos mucho tiempo para hacer las maletas.
  A: Wir brauchen viel Zeit zum Kofferpacken.
  Type: flashcard
- Q: ¿De qué contracción procede «zum»?
  A: zu + dem
  Type: flashcard
- Q: ¿Cuál es la diferencia entre «das Arbeiten» y «die Arbeit»?
  A: Das Arbeiten destaca la actividad o proceso; die Arbeit es el sustantivo habitual para el trabajo.
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 21 — Sustantivación de adjetivos

*Nivel orientativo:* **B1** · *Alcance A1 de esta app:* 📚

---
class_id: 021
title: "Sustantivación de adjetivos"
level: "B2"
topics: ["Gramática", "Nominalización", "Adjetivos sustantivados", "Declinación", "Formación de palabras", "Ejercicios"]
target_exam: "Telc / Goethe B2"
---

### Sustantivación de adjetivos

#### 1. 🎯 Resumen / Objetivos de la Lección
- Convertir adjetivos en sustantivos para designar personas o conceptos.
- Escribir los adjetivos sustantivados con mayúscula.
- Declinar estas formas según género, número, caso y determinante.
- Usar el neutro abstracto: **das Gute**, **etwas Neues**, **nichts Wichtiges**.
- Distinguir sustantivación de derivación con **-heit, -keit** e **-igkeit**.
- Reconocer cuándo una palabra sigue siendo un adjetivo predicativo.
- Resolver y corregir los ejercicios de los PDF.

#### 2. 📚 Vocabulario Clave (Wortschatz)

##### Adjetivos sustantivados frecuentes
| Adjetivo | Sustantivación | Español | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| schön | der/die Schöne; das Schöne | el/la bello/a; lo bello | das Schöne an diesem Bild |
| seltsam | das Seltsame | lo extraño | das Seltsame an der Sache |
| bekannt | der/die Bekannte | el conocido / la conocida | eine Bekannte von mir |
| angestellt | der/die Angestellte | el empleado / la empleada | mit einem Angestellten |
| selbstständig | der/die Selbstständige | el autónomo / la autónoma | Selbstständige arbeiten viel. |
| reich | der/die Reiche | el rico / la rica | die Reichsten des Dorfes |
| mutig | der/die Mutige | el valiente / la valiente | den Mutigen treffen |
| lustig | der/die Lustige; das Lustige | el/la gracioso/a; lo divertido | die Lustige / das Lustige daran |
| hübsch | der/die Hübsche | el/la guapo/a | Die Hübsche ist Schauspielerin. |
| rot | der/die/das Rote | el/la rojo/a; lo rojo | Ich nehme die Rote. |
| unmöglich | das Unmögliche | lo imposible | das Unmögliche schaffen |
| glücklich | der/die Glückliche; etwas Glückliches | el/la feliz; algo feliz | etwas sehr Glückliches |
| neu | etwas Neues | algo nuevo | Ich habe etwas Neues. |
| wichtig | nichts Wichtiges | nada importante | Das ist nichts Wichtiges. |
| gut | alles Gute / das Gute | todo lo bueno / lo bueno | Alles Gute! |

##### Sustantivos derivados de adjetivos
| Adjetivo | Sustantivo | Español | Formación |
| :--- | :--- | :--- | :--- |
| schön | die Schönheit, -en | la belleza | schön + -heit |
| frei | die Freiheit, -en | la libertad | frei + -heit |
| wahr | die Wahrheit, -en | la verdad | wahr + -heit |
| klug | die Klugheit, sin plural habitual | la inteligencia / sensatez | klug + -heit |
| freundlich | die Freundlichkeit, -en | la amabilidad | freundlich + -keit |
| höflich | die Höflichkeit, -en | la cortesía | höflich + -keit |
| abhängig | die Abhängigkeit, -en | la dependencia | abhängig + -keit |
| aufmerksam | die Aufmerksamkeit, -en | la atención | aufmerksam + -keit |
| gerecht | die Gerechtigkeit, sin plural habitual | la justicia | gerecht + -igkeit |
| lautlos | die Lautlosigkeit, sin plural habitual | la ausencia de ruido | lautlos + -igkeit |
| boshaft | die Boshaftigkeit, -en | la maldad | boshaft + -igkeit |

##### Vocabulario de los ejercicios
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Verkäufer, - | el vendedor | Sustantivo | Der Verkäufer ist sympathisch. |
| der Koreanischkurs, -e | el curso de coreano | Sustantivo | aus dem Koreanischkurs |
| die Jugend, sin plural | la juventud | Sustantivo | in ihrer Jugend |
| das Dorf, Dörfer | el pueblo | Sustantivo | die Reichsten des Dorfes |
| der Wegrand, Wegränder | el borde del camino | Sustantivo | am Wegrand |
| die Romanze, -n | el romance | Sustantivo | eine Romanze |
| der Profit, -e | el beneficio | Sustantivo | Profit machen |
| die Schauspielerin, -nen | la actriz | Sustantivo | Sie ist Schauspielerin. |
| das Plätzchen, - | la galleta | Sustantivo | süße Plätzchen |
| sich verlieben | enamorarse | Verbo reflexivo separable | sich in jemanden verlieben |
| betören | cautivar / seducir | Verbo regular | jemanden betören |
| jemanden ansprechen | dirigirse a alguien | Verbo separable irregular | Sie spricht ihn an. |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1 Regla básica
- Un adjetivo puede usarse como sustantivo cuando el nombre se omite porque se conoce o se entiende por el contexto.
- Se escribe con mayúscula.
- Conserva las terminaciones de la declinación adjetival.

`die schöne Frau` → `die Schöne`  
`ein bekannter Mann` → `ein Bekannter`

##### 3.2 Personas
Para personas, el género gramatical suele corresponder al sexo o identidad de la persona mencionada.

| Género / número | Ejemplo | Traducción |
| :--- | :--- | :--- |
| Masculino | der Bekannte | el conocido |
| Femenino | die Bekannte | la conocida |
| Neutro | ein Kleines | un pequeño / una pequeña criatura, según contexto |
| Plural | die Bekannten | los conocidos / las conocidas |

##### 3.3 Declinación con artículo determinado
Ejemplo: **bekannt**

| Caso | Masculino | Femenino | Neutro abstracto | Plural |
| :--- | :--- | :--- | :--- | :--- |
| Nominativo | der Bekannte | die Bekannte | das Bekannte | die Bekannten |
| Acusativo | den Bekannten | die Bekannte | das Bekannte | die Bekannten |
| Dativo | dem Bekannten | der Bekannten | dem Bekannten | den Bekannten |
| Genitivo | des Bekannten | der Bekannten | des Bekannten | der Bekannten |

##### 3.4 Declinación con **ein**, **kein** o posesivo
| Caso | Masculino | Femenino | Neutro |
| :--- | :--- | :--- | :--- |
| Nominativo | ein Bekannter | eine Bekannte | etwas Bekanntes |
| Acusativo | einen Bekannten | eine Bekannte | etwas Bekanntes |
| Dativo | einem Bekannten | einer Bekannten | etwas Bekanntem |
| Genitivo | eines Bekannten | einer Bekannten | etwas Bekannten |

- `Sie ist eine Bekannte von mir.`  
  Ella es una conocida mía.
- `Mit diesem Angestellten habe ich gesprochen.`  
  Ya he hablado con este empleado.

##### 3.5 Formas neutras abstractas
El neutro sustantivado expresa «lo + adjetivo» o una cualidad considerada como concepto.

| Forma | Traducción |
| :--- | :--- |
| das Gute | lo bueno |
| das Schöne | lo bello / lo bonito |
| das Seltsame | lo extraño |
| das Unmögliche | lo imposible |
| das Wichtigste | lo más importante |

`Das Schöne an diesem Bild sind seine Farben.`  
Lo bonito de este cuadro son sus colores.

`Das Seltsame an der Sache ist, dass er nicht Bescheid gesagt hat.`  
Lo extraño del asunto es que no haya avisado.

##### 3.6 Después de **etwas, nichts, viel, wenig, alles**
El adjetivo sustantivado se escribe con mayúscula.

| Palabra previa | Terminación frecuente | Ejemplo |
| :--- | :--- | :--- |
| etwas | -es | etwas Neues |
| nichts | -es | nichts Wichtiges |
| viel | -es | viel Gutes |
| wenig | -es | wenig Interessantes |
| alles | -e | alles Gute |

- `Ich möchte dir etwas Wichtiges sagen.`  
  Quiero decirte algo importante.
- `Das ist nichts Neues.`  
  Eso no es nada nuevo.

##### 3.7 Nacionalidades y grupos de personas
Los adjetivos de nacionalidad pueden sustantivarse y se declinan como adjetivos:

| Forma | Ejemplo |
| :--- | :--- |
| der Deutsche | Der Deutsche wohnt in Berlin. |
| ein Deutscher | Ich kenne einen Deutschen. |
| die Deutsche | Sie ist Deutsche. |
| die Deutschen | Viele Deutsche trinken Kaffee. |

Lo mismo ocurre con:

- `der/die Arbeitslose` → desempleado/a.
- `der/die Reisende` → viajero/a.
- `der/die Erwachsene` → adulto/a.
- `der/die Jugendliche` → joven/adolescente.

##### 3.8 Sustantivación frente a adjetivo predicativo
No todo adjetivo debe escribirse con mayúscula.

| Oración | Función | Escritura |
| :--- | :--- | :--- |
| Der Verkäufer ist sehr sympathisch. | Adjetivo predicativo | minúscula |
| Der Sympathische arbeitet im Café. | Adjetivo sustantivado | mayúscula |
| Meine Großeltern waren mutig. | Adjetivo predicativo | minúscula |
| Die Mutigen helfen anderen. | Adjetivo sustantivado | mayúscula |

##### 3.9 Sustantivación frente a derivación
Son dos procesos diferentes:

1. **Sustantivación:** el adjetivo mantiene una terminación de declinación.
   - `bekannt` → `die Bekannte`
   - `schön` → `das Schöne`

2. **Derivación:** se crea un sustantivo con un sufijo fijo.
   - `freundlich` → `die Freundlichkeit`
   - `schön` → `die Schönheit`

Los sustantivos en **-heit, -keit, -igkeit** son femeninos.

##### 3.10 Formación con **-heit**
Se usa frecuentemente con adjetivos simples o monosilábicos.

| Adjetivo | Sustantivo |
| :--- | :--- |
| frei | die Freiheit |
| wahr | die Wahrheit |
| klug | die Klugheit |
| schön | die Schönheit |

##### 3.11 Formación con **-keit** e **-igkeit**
- **-keit** aparece frecuentemente tras **-ig, -lich, -sam, -bar**:
  - `höflich → die Höflichkeit`
  - `aufmerksam → die Aufmerksamkeit`
  - `abhängig → die Abhängigkeit`
- **-igkeit** aparece frecuentemente con bases en **-los, -haft** y otras formaciones:
  - `lautlos → die Lautlosigkeit`
  - `boshaft → die Boshaftigkeit`
  - `gerecht → die Gerechtigkeit`

> Estas son tendencias productivas, no reglas sin excepciones. Conviene aprender el sustantivo completo con su artículo.

##### 3.12 Ejercicios de 047 resueltos
| Ejercicio | Solución | Explicación |
| :--- | :--- | :--- |
| Ich mag die ___. (rot) | Ich mag die **Rote**. | Sustituye a un sustantivo femenino conocido. |
| Der Verkäufer ist sehr ___. (sympathisch) | ... sehr **sympathisch**. | Predicativo; no se sustantiva. |
| All deine ___ macht mich schüchtern. (freundlich) | All deine **Freundlichkeit** ... | Sustantivo derivado con `-keit`. |
| Meine Großeltern waren sehr ___. (mutig) | ... sehr **mutig**. | Predicativo; minúscula. |
| Meine ___ aus dem Koreanischkurs heißt Fuka. (bekannt) | Meine **Bekannte** ... | Sustantivación femenina. |
| ___ arbeiten mehr als ___. (selbstständig, angestellt) | **Selbstständige** arbeiten in der Regel mehr als **Angestellte**. | Plural sustantivado. |

##### 3.13 Nominalizaciones del texto de 048

###### Adjetivos sustantivados
- `etwas Geschichtliches`
- `die Schöne`
- `die Reichsten`
- `den Mutigen`
- `der Mutige`
- `etwas sehr Glückliches`
- `der Schönen`

###### Otras nominalizaciones o sustantivos relacionados
- `die Schönheit` = sustantivo derivado de `schön`.
- `am Spazierengehen` = construcción con verbo sustantivado.
- `das Verliebtsein` = compuesto sustantivado.
- `am Planen` = verbo sustantivado.

###### Texto normalizado
`Es gab einmal ein Mädchen, genannt „die Schöne“. Sie war sehr hübsch. Ihre Schönheit ging sogar so weit, dass sich selbst die Reichsten ihres Dorfes in sie verliebten. Als sie wieder einmal spazieren ging, traf sie einen Jungen am Wegrand. Ihre Schönheit betörte den Mutigen sofort. Der Mutige sprach die Schöne direkt an, und es entwickelte sich etwas sehr Glückliches für beide: eine Romanze. Ihr Verliebtsein hielt leider nicht lange an, denn der Vater der Schönen plante schon lange, wie er den größten Profit aus der Schönheit seiner Tochter ziehen konnte.`

##### 3.14 Transformaciones de 048 corregidas
| Original | Transformación | Nota |
| :--- | :--- | :--- |
| Das lustige Mädchen hat viele Freunde. | **Die Lustige** hat viele Freunde. | Sigue designando a la chica. |
| Ich bin sehr abenteuerlich. Ich mag das ... | Ich mag **das Abenteuerliche**. | “Me gusta lo aventurero.” |
| Nein, das ist total unmöglich! Aber der Mann schaffte das ... | Der Mann schaffte **das Unmögliche**. | “El hombre logró lo imposible.” |
| Die hübsche Frau ist eine Schauspielerin. | **Die Hübsche** ist Schauspielerin. | Sustituye a `die hübsche Frau`. |
| Welche Plätzchen magst du? | Ich liebe **die süßen Plätzchen** meiner Mutter. | Esta es la forma más clara y natural. |

También sería posible `Ich liebe die Süßen meiner Mutter` si el contexto deja completamente claro que **die Süßen** significa «las galletas dulces», pero la expresión aislada resulta ambigua y puede entenderse como «los/las dulces» o incluso «los seres queridos».

##### 3.15 Diferencia entre **die Lustige** y **das Lustige**
- `die Lustige` = la chica/mujer graciosa.
- `der Lustige` = el hombre/chico gracioso.
- `das Lustige` = lo divertido.

Por eso:

`Das lustige Mädchen hat viele Freunde.` → `Die Lustige hat viele Freunde.`

La solución `Das Lustige hat viele Freunde` cambiaría el significado a «Lo divertido tiene muchos amigos».

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)
> **Ich möchte dir etwas Wichtiges sagen.**  
> *Traducción:* Quiero decirte algo importante.  
> *Uso:* Introducir información relevante.

> **Das ist nichts Neues.**  
> *Traducción:* Eso no es nada nuevo.  
> *Uso:* Indicar que una información ya se conocía.

> **Alles Gute zum Geburtstag!**  
> *Traducción:* ¡Todo lo mejor por tu cumpleaños!  
> *Uso:* Felicitar.

> **Sie ist eine Bekannte von mir.**  
> *Traducción:* Es una conocida mía.  
> *Uso:* Explicar la relación con una persona.

> **Was ist das Schönste an deiner Stadt?**  
> *Traducción:* ¿Qué es lo más bonito de tu ciudad?  
> *Uso:* Preguntar por el aspecto más positivo.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** Los adjetivos sustantivados se escriben con mayúscula: `die Bekannte`.
- ⚠️ **Atención:** Conservan las terminaciones de los adjetivos: `ein Bekannter`, `einen Bekannten`.
- ⚠️ **Atención:** Después de `etwas` y `nichts` se usa frecuentemente **-es**: `etwas Neues`.
- ⚠️ **Atención:** Un adjetivo tras `sein` sigue en minúscula: `Er ist sympathisch`.
- ⚠️ **Atención:** `die Freundlichkeit` es un sustantivo derivado, no un adjetivo declinado.
- ⚠️ **Atención:** Se escribe `Selbstständige`; la variante `Selbständige` también está admitida.
- ⚠️ **Atención:** El plural de `das Plätzchen` es `die Plätzchen`, no `Plätzen`.
- ⚠️ **Atención:** `die Lustige` designa a una mujer/chica; `das Lustige` significa “lo divertido”.
- ⚠️ **Pronunciación:** En `Höflichkeit`, la **ö** se pronuncia con labios redondeados.
- ⚠️ **Pronunciación:** En `Reichsten`, el grupo `ch` tiene el sonido suave de `ich`.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: ¿Cómo se escriben los adjetivos sustantivados?
  A: Con mayúscula inicial.
  Type: flashcard
- Q: die schöne Frau → sustituye el sustantivo.
  A: die Schöne
  Type: transformation
- Q: ein bekannter Mann → sustituye el sustantivo.
  A: ein Bekannter
  Type: transformation
- Q: Ich mag die _____. (rot; referente femenino)
  A: Rote
  Type: fill-in-the-blank
- Q: Der Verkäufer ist sehr _____. (sympathisch)
  A: sympathisch
  Type: fill-in-the-blank
- Q: All deine _____ macht mich schüchtern. (freundlich)
  A: Freundlichkeit
  Type: fill-in-the-blank
- Q: Meine Großeltern waren sehr _____. (mutig)
  A: mutig
  Type: fill-in-the-blank
- Q: Meine _____ heißt Fuka. (bekannt)
  A: Bekannte
  Type: fill-in-the-blank
- Q: _____ arbeiten mehr als _____. (selbstständig, angestellt; plural)
  A: Selbstständige / Angestellte
  Type: fill-in-the-blank
- Q: Traducción: algo nuevo
  A: etwas Neues
  Type: flashcard
- Q: Traducción: nada importante
  A: nichts Wichtiges
  Type: flashcard
- Q: Traducción: todo lo bueno / ¡todo lo mejor!
  A: alles Gute
  Type: flashcard
- Q: Traducción: lo imposible
  A: das Unmögliche
  Type: flashcard
- Q: Traducción: lo más importante
  A: das Wichtigste
  Type: flashcard
- Q: Forma el sustantivo derivado de «schön».
  A: die Schönheit
  Type: transformation
- Q: Forma el sustantivo derivado de «frei».
  A: die Freiheit
  Type: transformation
- Q: Forma el sustantivo derivado de «höflich».
  A: die Höflichkeit
  Type: transformation
- Q: Forma el sustantivo derivado de «gerecht».
  A: die Gerechtigkeit
  Type: transformation
- Q: Corrige: Ich möchte etwas wichtiges sagen.
  A: Ich möchte etwas Wichtiges sagen.
  Type: correction
- Q: Corrige: Er ist sehr Sympathisch.
  A: Er ist sehr sympathisch.
  Type: correction
- Q: Sustituye «Das lustige Mädchen» sin cambiar el referente femenino.
  A: die Lustige
  Type: transformation
- Q: ¿Qué significa «das Lustige»?
  A: Lo divertido.
  Type: flashcard
- Q: Corrige: Welche Plätzen magst du?
  A: Welche Plätzchen magst du?
  Type: correction
- Q: ¿Cuál es la diferencia entre «die Bekannte» y «die Bekanntheit»?
  A: Die Bekannte es una conocida; die Bekanntheit es la fama o notoriedad.
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 22 — Formación de preguntas cerradas

*Nivel orientativo:* **A1** · *Alcance A1 de esta app:* ✅

---
class_id: 022
title: "Formación de preguntas cerradas"
level: "A1"
topics: ["Gramática", "Preguntas cerradas", "Orden de la oración", "Verbos modales", "Perfekt", "Registro formal e informal"]
target_exam: "Telc / Goethe A1"
---

### Formación de preguntas cerradas

#### 1. 🎯 Resumen / Objetivos de la Lección
- Formar preguntas cerradas o preguntas de sí/no.
- Colocar el verbo conjugado en primera posición.
- Mantener el infinitivo, participio o prefijo separable al final.
- Transformar afirmaciones en preguntas informales y formales.
- Adaptar pronombres personales, posesivos y reflexivos al interlocutor.
- Responder con **ja**, **nein** y **doch**.

#### 2. 📚 Vocabulario Clave (Wortschatz)
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| die Frage, -n | la pregunta | Sustantivo | eine Frage stellen |
| die Antwort, -en | la respuesta | Sustantivo | eine Antwort geben |
| der Hund, -e | el perro | Sustantivo | Habt ihr einen Hund? |
| die Übung, -en | el ejercicio | Sustantivo | die Übung verstehen |
| die Grammatikübung, -en | el ejercicio de gramática | Sustantivo | alle Grammatikübungen |
| die Eltern (Pl.) | los padres | Sustantivo | Sind deine Eltern zu Hause? |
| die Party, -s | la fiesta | Sustantivo | auf die Party gehen |
| der Kollege, -n | el compañero de trabajo | Sustantivo débil | Muss dein Kollege arbeiten? |
| der Nachbar, -n | el vecino | Sustantivo débil | meine Nachbarn |
| der Kaffee, -s | el café | Sustantivo | noch einen Kaffee |
| der Urlaub, Urlaube | las vacaciones | Sustantivo | mein letzter Urlaub |
| Berlin | Berlín | Nombre propio | in Berlin wohnen |
| Kolumbien | Colombia | Nombre propio | aus Kolumbien kommen |
| Mexiko | México | Nombre propio | in Mexiko liegen |
| Deutschland | Alemania | Nombre propio | nach Deutschland umziehen |
| wohnen | vivir / residir | Verbo regular | Wohnst du in Berlin? |
| haben | tener | Verbo irregular / auxiliar | Habt ihr einen Hund? |
| kommen | venir | Verbo irregular | Kommt Pablo aus Kolumbien? |
| verstehen | entender | Verbo irregular | Hast du das verstanden? |
| fahren | ir / conducir | Verbo irregular | nach Hause fahren |
| tanzen | bailar | Verbo regular | Kann sie tanzen? |
| arbeiten | trabajar | Verbo regular | Musst du arbeiten? |
| umziehen | mudarse | Verbo separable irregular | nach Deutschland umziehen |
| sich erinnern an | acordarse de | Verbo reflexivo + Akkusativ | sich an den Urlaub erinnern |
| verheiratet | casado | Adjetivo | Bist du verheiratet? |
| laut | ruidoso | Adjetivo | Sind die Nachbarn laut? |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1 Preguntas cerradas
- Son preguntas que pueden responderse básicamente con **ja** o **nein**.
- No comienzan con una palabra interrogativa.
- El verbo conjugado ocupa la primera posición.
- El sujeto aparece normalmente justo después.

**Estructura / Fórmula:** `Verbo conjugado + sujeto + complementos + ?`

| Afirmación | Pregunta |
| :--- | :--- |
| Du wohnst in Berlin. | Wohnst du in Berlin? |
| Ihr habt einen Hund. | Habt ihr einen Hund? |
| Pablo kommt aus Kolumbien. | Kommt Pablo aus Kolumbien? |

##### 3.2 Transformación básica
Para transformar una afirmación:

1. Identifica el verbo conjugado.
2. Colócalo al inicio.
3. Sitúa el sujeto detrás del verbo.
4. Mantén los demás complementos.
5. Añade el signo de interrogación.

`Du wohnst in Berlin.`  
`Wohnst du in Berlin?`

##### 3.3 Con **sein**
| Afirmación | Pregunta |
| :--- | :--- |
| Ich bin verheiratet. | Bist du verheiratet? |
| Die Nachbarn sind laut. | Sind die Nachbarn laut? |
| Ihr seid zu Hause. | Seid ihr zu Hause? |
| Sie sind Herr Meier. | Sind Sie Herr Meier? |

##### 3.4 Con el Perfekt
- El auxiliar conjugado **haben** o **sein** pasa a la primera posición.
- El participio permanece al final.

**Estructura / Fórmula:** `Auxiliar + sujeto + complementos + participio?`

| Afirmación | Pregunta |
| :--- | :--- |
| Ihr habt die Übung gut verstanden. | Habt ihr die Übung gut verstanden? |
| Deine Eltern sind nach Hause gefahren. | Sind deine Eltern nach Hause gefahren? |
| Du hast alle Übungen gemacht. | Hast du alle Übungen gemacht? |

##### 3.5 Con verbos modales
- El modal conjugado pasa a la primera posición.
- El infinitivo permanece al final.

**Estructura / Fórmula:** `Modal + sujeto + complementos + infinitivo?`

| Afirmación | Pregunta |
| :--- | :--- |
| Ihr wollt auf die Party gehen. | Wollt ihr auf die Party gehen? |
| Valentina kann gut tanzen. | Kann Valentina gut tanzen? |
| Dein Kollege muss viel arbeiten. | Muss dein Kollege viel arbeiten? |

##### 3.6 Con verbos separables
- La parte conjugada pasa a la primera posición.
- El prefijo separable permanece al final.

| Afirmación | Pregunta |
| :--- | :--- |
| Du kommst heute mit. | Kommst du heute mit? |
| Ihr steht früh auf. | Steht ihr früh auf? |
| Er ruft seine Mutter an. | Ruft er seine Mutter an? |

En Perfekt, el participio completo queda al final:

`Bist du nach Deutschland umgezogen?`

##### 3.7 Con verbos reflexivos
- El verbo conjugado ocupa la primera posición.
- Después del sujeto aparece el pronombre reflexivo correspondiente.

| Persona | Ejemplo |
| :--- | :--- |
| du | Erinnerst du **dich** an den Urlaub? |
| Sie | Erinnern Sie **sich** an den Urlaub? |
| ihr | Erinnert ihr **euch** an den Urlaub? |

##### 3.8 Registro informal y formal
| Informal singular | Formal |
| :--- | :--- |
| Bist **du** verheiratet? | Sind **Sie** verheiratet? |
| Hast **du** Zeit? | Haben **Sie** Zeit? |
| Möchtest **du** Kaffee? | Möchten **Sie** Kaffee? |
| Erinnerst du **dich**? | Erinnern Sie **sich**? |

- **Sie, Ihnen, Ihr-** se escriben con mayúscula en el trato formal.
- El verbo con **Sie** tiene la misma forma que con **sie** plural.

##### 3.9 Cambio de posesivos al preguntar
Si una afirmación habla desde la perspectiva de `ich`, al preguntar al interlocutor se cambia el posesivo.

| Afirmación | Pregunta informal | Pregunta formal |
| :--- | :--- | :--- |
| Meine Nachbarn sind laut. | Sind **deine** Nachbarn laut? | Sind **Ihre** Nachbarn laut? |
| Ich erinnere mich an meinen Urlaub. | Erinnerst du dich an **deinen** Urlaub? | Erinnern Sie sich an **Ihren** Urlaub? |

##### 3.10 Respuestas con **ja**, **nein** y **doch**
| Pregunta | Respuesta | Significado |
| :--- | :--- | :--- |
| Wohnst du in Berlin? | Ja, ich wohne in Berlin. | Sí. |
| Wohnst du in Berlin? | Nein, ich wohne in Hamburg. | No. |
| Wohnst du nicht in Berlin? | Doch, ich wohne in Berlin. | Sí que vivo allí. |
| Wohnst du nicht in Berlin? | Nein, ich wohne in Hamburg. | No vivo allí. |

- **doch** contradice una pregunta o afirmación negativa.

##### 3.11 Respuestas cortas naturales
No es necesario repetir toda la oración:

| Pregunta | Respuesta corta |
| :--- | :--- |
| Hast du einen Hund? | Ja. / Ja, habe ich. |
| Kann sie tanzen? | Nein. / Nein, kann sie nicht. |
| Bist du verheiratet? | Ja, bin ich. / Nein, bin ich nicht. |

Para nivel A1, una respuesta completa ayuda a practicar:

`Ja, ich habe einen Hund.`  
`Nein, ich bin nicht verheiratet.`

##### 3.12 Entonación
- En las preguntas cerradas, la entonación suele subir al final.
- El orden verbal, no solo la entonación, marca claramente que se trata de una pregunta.

##### 3.13 Ejercicios resueltos

###### 1. `Ich bin verheiratet.`
- Informal: `Bist du verheiratet?`
- Formal: `Sind Sie verheiratet?`

###### 2. `Acapulco liegt in Mexiko.`
- `Liegt Acapulco in Mexiko?`

###### 3. `Meine Nachbarn sind sehr laut.`
- Informal: `Sind deine Nachbarn sehr laut?`
- Formal: `Sind Ihre Nachbarn sehr laut?`

###### 4. `Ich habe alle Grammatikübungen gemacht.`
- Informal: `Hast du alle Grammatikübungen gemacht?`
- Formal: `Haben Sie alle Grammatikübungen gemacht?`

###### 5. `Ich möchte noch einen Kaffee.`
- Informal: `Möchtest du noch einen Kaffee?`
- Formal: `Möchten Sie noch einen Kaffee?`

###### 6. `Morgen muss ich den ganzen Tag arbeiten.`
- Informal: `Musst du morgen den ganzen Tag arbeiten?`
- Formal: `Müssen Sie morgen den ganzen Tag arbeiten?`

###### 7. `Wir sind nach Deutschland umgezogen.`
- Informal plural: `Seid ihr nach Deutschland umgezogen?`
- Formal: `Sind Sie nach Deutschland umgezogen?`

###### 8. `Ich erinnere mich an meinen letzten Urlaub.`
- Informal: `Erinnerst du dich an deinen letzten Urlaub?`
- Formal: `Erinnern Sie sich an Ihren letzten Urlaub?`

##### 3.14 Errores típicos
| Incorrecto | Correcto | Motivo |
| :--- | :--- | :--- |
| Du wohnst in Berlin? | Wohnst du in Berlin? | El verbo inicia la pregunta neutral. |
| Hast gemacht du die Übung? | Hast du die Übung gemacht? | El participio queda al final. |
| Kann tanzen Valentina gut? | Kann Valentina gut tanzen? | El infinitivo queda al final. |
| Erinnerst dich du daran? | Erinnerst du dich daran? | El sujeto precede al reflexivo. |
| Umziehst du morgen? | Ziehst du morgen um? | El prefijo separable queda al final. |

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)
> **Sprechen Sie Deutsch?**  
> *Traducción:* ¿Habla usted alemán?  
> *Uso:* Pregunta formal.

> **Kannst du mir helfen?**  
> *Traducción:* ¿Puedes ayudarme?  
> *Uso:* Pedir ayuda informalmente.

> **Möchten Sie noch einen Kaffee?**  
> *Traducción:* ¿Desea otro café?  
> *Uso:* Ofrecer algo formalmente.

> **Hast du das verstanden?**  
> *Traducción:* ¿Has entendido eso?  
> *Uso:* Comprobar comprensión.

> **Kommst du morgen mit?**  
> *Traducción:* ¿Vienes mañana con nosotros?  
> *Uso:* Invitar a alguien.

> **Sind Sie verheiratet?**  
> *Traducción:* ¿Está casado/a?  
> *Uso:* Pregunta personal formal.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** La pregunta cerrada neutral comienza con el verbo conjugado.
- ⚠️ **Atención:** Con Perfekt, solo el auxiliar pasa al principio; el participio queda al final.
- ⚠️ **Atención:** Con un modal, el infinitivo permanece al final.
- ⚠️ **Atención:** Con un verbo separable, el prefijo permanece al final: `Kommst du mit?`
- ⚠️ **Atención:** Adapta el posesivo: `mein` → `dein` o `Ihr`.
- ⚠️ **Atención:** En preguntas formales, escribe `Sie`, `Ihr-` y `Ihnen` con mayúscula.
- ⚠️ **Atención:** `doch` contradice una pregunta negativa.
- ⚠️ **Atención:** En alemán solo se escribe `?` al final, no el signo inicial español `¿`.
- ⚠️ **Pronunciación:** La entonación suele ascender al final de una pregunta cerrada.
- ⚠️ **Pronunciación:** En `möchten`, la `ö` se articula con labios redondeados y `ch` es suave.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: ¿En qué posición va el verbo conjugado en una pregunta cerrada?
  A: En la primera posición.
  Type: flashcard
- Q: Transforma: Du wohnst in Berlin.
  A: Wohnst du in Berlin?
  Type: transformation
- Q: Transforma: Ihr habt einen Hund.
  A: Habt ihr einen Hund?
  Type: transformation
- Q: Transforma: Pablo kommt aus Kolumbien.
  A: Kommt Pablo aus Kolumbien?
  Type: transformation
- Q: Transforma: Ihr habt die Übung verstanden.
  A: Habt ihr die Übung verstanden?
  Type: transformation
- Q: Transforma: Deine Eltern sind nach Hause gefahren.
  A: Sind deine Eltern nach Hause gefahren?
  Type: transformation
- Q: Transforma: Ihr wollt auf die Party gehen.
  A: Wollt ihr auf die Party gehen?
  Type: transformation
- Q: Transforma: Valentina kann gut tanzen.
  A: Kann Valentina gut tanzen?
  Type: transformation
- Q: Transforma: Du kommst morgen mit.
  A: Kommst du morgen mit?
  Type: transformation
- Q: Pregunta informal: Ich bin verheiratet.
  A: Bist du verheiratet?
  Type: transformation
- Q: Pregunta formal: Ich bin verheiratet.
  A: Sind Sie verheiratet?
  Type: transformation
- Q: Pregunta informal: Meine Nachbarn sind laut.
  A: Sind deine Nachbarn laut?
  Type: transformation
- Q: Pregunta formal: Meine Nachbarn sind laut.
  A: Sind Ihre Nachbarn laut?
  Type: transformation
- Q: Pregunta informal: Ich möchte einen Kaffee.
  A: Möchtest du einen Kaffee?
  Type: transformation
- Q: Pregunta formal: Ich möchte einen Kaffee.
  A: Möchten Sie einen Kaffee?
  Type: transformation
- Q: Pregunta informal: Morgen muss ich arbeiten.
  A: Musst du morgen arbeiten?
  Type: transformation
- Q: Pregunta informal plural: Wir sind umgezogen.
  A: Seid ihr umgezogen?
  Type: transformation
- Q: Pregunta formal: Wir sind umgezogen.
  A: Sind Sie umgezogen?
  Type: transformation
- Q: Pregunta informal: Ich erinnere mich an meinen Urlaub.
  A: Erinnerst du dich an deinen Urlaub?
  Type: transformation
- Q: Pregunta formal: Ich erinnere mich an meinen Urlaub.
  A: Erinnern Sie sich an Ihren Urlaub?
  Type: transformation
- Q: Corrige: Hast gemacht du die Übungen?
  A: Hast du die Übungen gemacht?
  Type: correction
- Q: Corrige: Kann tanzen sie gut?
  A: Kann sie gut tanzen?
  Type: correction
- Q: Responde contradiciendo: Kommst du nicht mit?
  A: Doch, ich komme mit.
  Type: flashcard
- Q: ¿Qué ocurre con el participio en una pregunta en Perfekt?
  A: Permanece al final de la oración.
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 23 — La negación en alemán

*Nivel orientativo:* **A1** · *Alcance A1 de esta app:* ✅

---
class_id: 023
title: "La negación en alemán"
level: "B1"
topics: ["Gramática", "Negación", "nicht", "kein", "Pronombres negativos", "Posición en la oración", "Ejercicios"]
target_exam: "Telc / Goethe B1"
---

### La negación en alemán

#### 1. 🎯 Resumen / Objetivos de la Lección
- Elegir correctamente entre **kein-** y **nicht**.
- Declinar **kein-** según género, número y caso.
- Colocar **nicht** según el elemento que se desea negar.
- Utilizar **nichts, niemand, nie, noch nicht** y **noch nie**.
- Evitar la concordancia negativa incorrecta en alemán estándar.
- Negar conocimientos lingüísticos y acciones realizadas en un idioma.
- Resolver y corregir los ejercicios de los PDF.

#### 2. 📚 Vocabulario Clave (Wortschatz)
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| das Haustier, -e | la mascota | Sustantivo | keine Haustiere |
| der Hund, -e | el perro | Sustantivo | keinen Hund haben |
| die Katze, -n | el gato / la gata | Sustantivo | keine Katze |
| der Durst, sin plural | la sed | Sustantivo | Durst haben |
| das Fahrrad, Fahrräder | la bicicleta | Sustantivo | mit dem Fahrrad |
| die Hausaufgabe, -n | el deber / tarea | Sustantivo | die Hausaufgaben machen |
| der Kunde, -n | el cliente | Sustantivo débil | den Kunden anrufen |
| das Kaufhaus, Kaufhäuser | los grandes almacenes | Sustantivo | im Kaufhaus |
| der Film, -e | la película | Sustantivo | Der Film gefällt mir. |
| das Bier, -e | la cerveza | Sustantivo | kein Bier trinken |
| der Alkohol, sin plural | el alcohol | Sustantivo | keinen Alkohol trinken |
| das Kind, -er | el niño / hijo | Sustantivo | keine Kinder haben |
| das Konzert, -e | el concierto | Sustantivo | zum Konzert gehen |
| der Führerschein, -e | el permiso de conducir | Sustantivo | keinen Führerschein haben |
| das Paar, -e | la pareja | Sustantivo | kein Paar sein |
| die Wohnung, -en | el piso / apartamento | Sustantivo | Die Wohnung gefällt mir nicht. |
| der Platz, Plätze | el espacio / lugar | Sustantivo | keinen Platz haben |
| das Möbel, - | el mueble | Sustantivo | normalmente plural: die Möbel |
| das Gebäude, - | el edificio | Sustantivo | Das Gebäude hat ... |
| der Aufzug, Aufzüge | el ascensor | Sustantivo | keinen Aufzug haben |
| die Sorge, -n | la preocupación | Sustantivo | Mach dir keine Sorgen! |
| Französisch | francés | Idioma | kein Französisch sprechen |
| Englisch | inglés | Idioma | auf Englisch sprechen |
| Spanisch | español | Idioma | Sein Spanisch ist gut. |
| Portugiesisch | portugués | Idioma | Portugiesisch lernen |
| anrufen | llamar por teléfono | Verbo separable irregular | jemanden anrufen |
| sich fühlen | sentirse | Verbo reflexivo | sich nicht gut fühlen |
| gefallen | gustar | Verbo irregular + Dativ | Das gefällt mir nicht. |
| sich Sorgen machen | preocuparse | Expresión reflexiva | Mach dir keine Sorgen. |
| zusammen | juntos / siendo pareja | Adverbio | Sie sind nicht zusammen. |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1 **kein-** o **nicht**
| Negación | Uso principal | Ejemplo |
| :--- | :--- | :--- |
| **kein-** | Sustantivo con artículo indeterminado o sin artículo | Ich habe **keinen Hund**. |
| **nicht** | Verbo, adjetivo, adverbio, complemento o sustantivo determinado | Ich komme **nicht**. / Das ist **nicht mein Hund**. |

Comparación:

`Ich habe einen Hund.` → `Ich habe keinen Hund.`  
`Ich sehe den Hund.` → `Ich sehe den Hund nicht.`

##### 3.2 Declinación de **kein-**
**kein-** se declina como **ein-**. En plural no existe `ein-`, pero sí se usan las formas de `kein-`.

| Caso | Masculino | Femenino | Neutro | Plural |
| :--- | :--- | :--- | :--- | :--- |
| Nominativo | kein Hund | keine Katze | kein Auto | keine Tiere |
| Acusativo | keinen Hund | keine Katze | kein Auto | keine Tiere |
| Dativo | keinem Hund | keiner Katze | keinem Auto | keinen Tieren |
| Genitivo | keines Hundes | keiner Katze | keines Autos | keiner Tiere |

- El dativo con **kein-** es completamente normal:
  - `Ich fahre mit keinem Auto.`
  - `Ich spreche mit keinem Kunden.`

##### 3.3 **kein-** con adjetivo
El adjetivo recibe las terminaciones correspondientes a una palabra tipo **ein**.

| Caso / género | Ejemplo |
| :--- | :--- |
| Acusativo masculino | keinen netten Nachbarn |
| Acusativo femenino | keine hohe Rechnung |
| Acusativo neutro | kein schönes Auto |
| Acusativo plural | keine netten Nachbarn |
| Dativo neutro | mit keinem schönen Auto |

##### 3.4 Cuándo usar **kein-**
Se usa para negar:

1. Un sustantivo que afirmativamente llevaría **ein/eine**:
   - `Ich habe ein Auto.` → `Ich habe kein Auto.`

2. Un sustantivo sin artículo:
   - `Ich trinke Kaffee.` → `Ich trinke keinen Kaffee.`

3. Un plural indefinido:
   - `Ich habe Haustiere.` → `Ich habe keine Haustiere.`

##### 3.5 Cuándo usar **nicht**
Se usa para negar:

- Una acción: `Ich arbeite nicht.`
- Un adjetivo: `Ich bin nicht krank.`
- Un adverbio: `Er singt nicht gut.`
- Un complemento preposicional: `Ich fahre nicht nach Spanien.`
- Una circunstancia concreta: `Ich fahre nicht mit dem Fahrrad.`
- Un sustantivo determinado o posesivo: `Das ist nicht der Bus.` / `Das ist nicht mein Buch.`

##### 3.6 Posición de **nicht**
No existe una única posición válida para todos los casos. La posición depende de qué se niega.

###### Negación global
En una oración simple, **nicht** suele aparecer hacia el final del campo central:

`Ich komme heute nicht.`  
`Meine Schwester arbeitet nicht.`

###### Antes del elemento negado
| Elemento negado | Ejemplo | Significado |
| :--- | :--- | :--- |
| Tiempo | Ich fahre **nicht diesen Sommer** nach Spanien. | No este verano. |
| Compañía | Ich fahre **nicht mit meiner Familie** nach Spanien. | No con mi familia. |
| Destino | Ich fahre **nicht nach Spanien**. | No a España. |
| Adjetivo | Ich bin **nicht krank**. | No estoy enfermo. |
| Adverbio | Carlos kocht **nicht gern**. | No le gusta cocinar. |
| Calidad | Carlos kocht **nicht gut**. | No cocina bien. |

##### 3.7 **nicht** en el marco verbal
**nicht** aparece antes del infinitivo, participio o prefijo final cuando se niega el predicado.

| Tipo | Ejemplo |
| :--- | :--- |
| Perfekt | Ich habe das Buch **nicht gekauft**. |
| Perfekt con `sein` | Er ist **nicht gekommen**. |
| Modal | Wir müssen den Kunden **nicht anrufen**. |
| Separable | Ich rufe ihn heute **nicht an**. |

##### 3.8 Cambio de significado por la posición
Oración afirmativa:

`Ich fahre diesen Sommer mit meiner Familie nach Spanien.`

| Negación | Contraste implícito |
| :--- | :--- |
| Ich fahre **nicht diesen Sommer** ... | en otro momento |
| Ich fahre diesen Sommer **nicht mit meiner Familie** ... | con otras personas |
| Ich fahre diesen Sommer mit meiner Familie **nicht nach Spanien**. | a otro destino |

##### 3.9 Otras palabras negativas
| Forma | Significado | Ejemplo |
| :--- | :--- | :--- |
| nichts | nada | Ich habe nichts getrunken. |
| niemand | nadie, nominativo | Niemand ist gekommen. |
| niemanden | a nadie, acusativo | Ich sehe niemanden. |
| niemandem | a nadie, dativo | Ich spreche mit niemandem. |
| nie / niemals | nunca | Er raucht nie. |
| noch nicht | todavía no | Wir sind noch nicht fertig. |
| noch nie | nunca hasta ahora | Ich war noch nie in den USA. |
| nirgendwo / nirgends | en ninguna parte | Ich finde es nirgendwo. |

##### 3.10 **nicht mehr** y **noch nicht**
| Expresión | Significado | Ejemplo |
| :--- | :--- | :--- |
| noch nicht | todavía no | Ich bin noch nicht fertig. |
| nicht mehr | ya no | Ich rauche nicht mehr. |

##### 3.11 Sin concordancia negativa en alemán estándar
En español se dice «No conozco a nadie». En alemán estándar se emplea una sola marca negativa:

`Ich kenne hier niemanden.`

No:

`Ich kenne hier nicht niemanden.`

Una doble negación deliberada puede tener significado lógico positivo:

`Niemand ist nicht gekommen.`  
Literalmente: no hay nadie que no haya venido; es decir, todos vinieron.

Por tanto, la regla práctica es: no copies la concordancia negativa del español.

##### 3.12 Negar conocimientos de idiomas
Cuando se niega la competencia en un idioma, es frecuente usar **kein**:

`Ich spreche kein Portugiesisch.`  
No hablo portugués / no sé portugués.

Cuando se niega el idioma usado en una situación concreta, se usa **nicht**:

`Ich spreche gerade nicht Portugiesisch, sondern Spanisch.`  
Ahora no estoy hablando portugués, sino español.

Otros contrastes:

| Oración | Significado |
| :--- | :--- |
| Ich spreche kein Deutsch. | No sé/hablo nada de alemán. |
| Ich spreche nicht gut Deutsch. | Hablo alemán, pero no bien. |
| Er spricht jetzt nicht Französisch. | Ahora no está hablando francés. |

##### 3.13 Ejercicios: negar el significado
| # | Afirmación / pregunta | Negación normalizada |
| :--- | :--- | :--- |
| 1 | Wir haben zwei Haustiere, einen Hund und eine Katze. | Wir haben keine Haustiere, keinen Hund und keine Katze. |
| 2 | Hast du Durst? Willst du etwas trinken? | Hast du keinen Durst? Willst du nichts trinken? |
| 3 | Heute fahre ich mit dem Fahrrad zur Arbeit. | Heute fahre ich nicht mit dem Fahrrad zur Arbeit. |
| 4 | Die Schüler haben die Hausaufgaben gemacht. | Die Schüler haben die Hausaufgaben nicht gemacht. |
| 5 | Ich habe schon etwas gegessen. | Ich habe noch nichts gegessen. |
| 6 | Camilla kann gut singen. | Camilla kann nicht gut singen. |
| 7 | Wir müssen den Kunden anrufen. | Wir müssen den Kunden nicht anrufen. |
| 8 | Alex spricht Französisch und Englisch; sein Spanisch ist sehr gut. | Alex spricht kein Französisch und kein Englisch; sein Spanisch ist nicht sehr gut. |
| 9 | Im Kaufhaus habe ich schicke Schuhe gefunden. | Im Kaufhaus habe ich keine schicken Schuhe gefunden. |
| 10 | Der Film hat mir sehr gut gefallen. | Der Film hat mir nicht sehr gut gefallen. |

> En el ejercicio 9 se corrige el OCR/original `Ihm Kaufhaus` por `Im Kaufhaus`.

##### 3.14 Ejercicios de traducción resueltos
| # | Español | Alemán normalizado |
| :--- | :--- | :--- |
| 1 | No quiero beber cerveza; no bebo alcohol. | Ich möchte kein Bier trinken; ich trinke keinen Alkohol. |
| 2 | ¿Ustedes no quieren tener hijos? | Wollen Sie keine Kinder haben? |
| 3 | Anoche no fui al concierto porque no me sentía bien. | Gestern Abend bin ich nicht zum Konzert gegangen, weil ich mich nicht gut gefühlt habe. |
| 4 | No sé conducir; no tengo permiso. | Ich kann nicht Auto fahren; ich habe keinen Führerschein. |
| 5 | A Elena no le gusta cocinar. | Elena kocht nicht gern. |
| 6 | Nina y Philip no son pareja. | Nina und Philip sind kein Paar. / Nina und Philip sind nicht zusammen. |
| 7 | Este apartamento no me gusta; no hay espacio para todos mis muebles. | Diese Wohnung gefällt mir nicht; es gibt keinen Platz für alle meine Möbel. |
| 8 | El edificio no tiene ascensor. | Das Gebäude hat keinen Aufzug. |
| 9 | No te preocupes; no estoy enfermo/a. | Mach dir keine Sorgen; ich bin nicht krank! |

También puede usarse una coordinada causal:

`Gestern Abend bin ich nicht zum Konzert gegangen, denn ich habe mich nicht gut gefühlt.`

##### 3.15 Matices importantes
- `Camilla kann nicht gut singen.` = Camilla no canta bien.
- `Camilla kann nicht singen.` = Camilla no sabe/no puede cantar.
- `Wir müssen den Kunden nicht anrufen.` = No es necesario llamar al cliente.
- `Wir dürfen den Kunden nicht anrufen.` = No tenemos permitido llamar al cliente.

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)
> **Ich habe keine Ahnung.**  
> *Traducción:* No tengo ni idea.  
> *Uso:* Expresar desconocimiento.

> **Ich habe noch nichts gegessen.**  
> *Traducción:* Todavía no he comido nada.  
> *Uso:* Hablar de una acción pendiente.

> **Ich war noch nie in Deutschland.**  
> *Traducción:* Nunca he estado en Alemania.  
> *Uso:* Hablar de experiencias.

> **Mach dir keine Sorgen!**  
> *Traducción:* ¡No te preocupes!  
> *Uso:* Tranquilizar a alguien.

> **Ich spreche nicht so gut Deutsch.**  
> *Traducción:* No hablo alemán tan bien.  
> *Uso:* Explicar el nivel lingüístico con cortesía.

> **Nein, danke. Ich möchte nichts trinken.**  
> *Traducción:* No, gracias. No quiero beber nada.  
> *Uso:* Rechazar una bebida.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** **kein-** se declina como **ein-**, no como el artículo determinado.
- ⚠️ **Atención:** El dativo con `kein-` es normal: `mit keinem Auto`.
- ⚠️ **Atención:** Usa `kein-` con sustantivos indefinidos; usa `nicht` con sustantivos determinados.
- ⚠️ **Atención:** Coloca `nicht` inmediatamente delante del elemento que quieras contrastar.
- ⚠️ **Atención:** En alemán estándar no se traduce literalmente «no... nadie» como `nicht niemand`.
- ⚠️ **Atención:** `noch nicht` significa “todavía no”; `nicht mehr`, “ya no”.
- ⚠️ **Atención:** `müssen nicht` significa “no ser necesario”; `nicht dürfen`, “estar prohibido”.
- ⚠️ **Atención:** Se escribe `Im Kaufhaus`, no `Ihm Kaufhaus`.
- ⚠️ **Atención:** `gestern Abend` significa “anoche”; `gestern` solo significa “ayer”.
- ⚠️ **Pronunciación:** En `nicht`, `ch` tiene el sonido suave de `ich`.
- ⚠️ **Pronunciación:** En `niemand`, el grupo `ie` representa una vocal larga.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: Ich habe einen Hund. Niega la oración.
  A: Ich habe keinen Hund.
  Type: transformation
- Q: Ich sehe den Hund. Niega la oración.
  A: Ich sehe den Hund nicht.
  Type: transformation
- Q: Wir haben _____ Haustiere. (ninguna mascota)
  A: keine
  Type: fill-in-the-blank
- Q: Ich fahre mit _____ Auto. (ningún coche)
  A: keinem
  Type: fill-in-the-blank
- Q: Ich habe _____ schönen Mantel. (ningún abrigo bonito)
  A: keinen
  Type: fill-in-the-blank
- Q: Ich bin _____ krank.
  A: nicht
  Type: fill-in-the-blank
- Q: Ich habe das Buch _____ gekauft.
  A: nicht
  Type: fill-in-the-blank
- Q: Ich sehe hier _____. (a nadie)
  A: niemanden
  Type: fill-in-the-blank
- Q: Ich spreche mit _____. (con nadie)
  A: niemandem
  Type: fill-in-the-blank
- Q: Ich habe _____ getrunken. (nada)
  A: nichts
  Type: fill-in-the-blank
- Q: Wir sind _____ fertig. (todavía no)
  A: noch nicht
  Type: fill-in-the-blank
- Q: Ich rauche _____. (ya no)
  A: nicht mehr
  Type: fill-in-the-blank
- Q: Ich war _____ in Berlin. (nunca hasta ahora)
  A: noch nie
  Type: fill-in-the-blank
- Q: Corrige: Ich kenne nicht niemanden.
  A: Ich kenne niemanden.
  Type: correction
- Q: Corrige: Ich habe nicht keinen Hund.
  A: Ich habe keinen Hund.
  Type: correction
- Q: Traducción: No hablo portugués. (competencia)
  A: Ich spreche kein Portugiesisch.
  Type: flashcard
- Q: Traducción: Ahora no estoy hablando portugués.
  A: Ich spreche gerade nicht Portugiesisch.
  Type: flashcard
- Q: Traducción: Todavía no he comido nada.
  A: Ich habe noch nichts gegessen.
  Type: flashcard
- Q: Traducción: El edificio no tiene ascensor.
  A: Das Gebäude hat keinen Aufzug.
  Type: flashcard
- Q: Traducción: No te preocupes.
  A: Mach dir keine Sorgen.
  Type: flashcard
- Q: ¿Qué significa «Wir müssen ihn nicht anrufen»?
  A: No es necesario que lo llamemos.
  Type: flashcard
- Q: ¿Qué significa «Wir dürfen ihn nicht anrufen»?
  A: No tenemos permitido llamarlo.
  Type: flashcard
- Q: Corrige: Ihm Kaufhaus habe ich nichts gefunden.
  A: Im Kaufhaus habe ich nichts gefunden.
  Type: correction
- Q: Niega solo el destino: Ich fahre diesen Sommer mit meiner Familie nach Spanien.
  A: Ich fahre diesen Sommer mit meiner Familie nicht nach Spanien.
  Type: transformation
<!-- DATA_QUIZ_END -->


---


### Unidad 24 — Formación de preguntas abiertas

*Nivel orientativo:* **A1** · *Alcance A1 de esta app:* ✅

---
class_id: 024
title: "Formación de preguntas abiertas"
level: "A1"
topics: ["Gramática", "W-Fragen", "Preguntas abiertas", "Pronombres interrogativos", "Preposiciones", "Orden de la oración", "Ejercicios"]
target_exam: "Telc / Goethe A1"
---

### Formación de preguntas abiertas

#### 1. 🎯 Resumen / Objetivos de la Lección
- Formular preguntas abiertas con palabras interrogativas.
- Distinguir **wer, wen, wem** y **wessen** según el caso.
- Preguntar por lugar, origen y destino con **wo, woher** y **wohin**.
- Usar correctamente **wie viel**, **wie viele** y **welch-**.
- Formar preguntas con preposición para personas y cosas.
- Mantener el verbo conjugado en segunda posición.
- Resolver y corregir los ejercicios de los PDF.

#### 2. 📚 Vocabulario Clave (Wortschatz)
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| die Frage, -n | la pregunta | Sustantivo | eine offene Frage |
| die Antwort, -en | la respuesta | Sustantivo | ausführlich antworten |
| der Mann, Männer | el hombre | Sustantivo | Wer kennt diesen Mann? |
| die Tasche, -n | el bolso / bolsa | Sustantivo | Wessen Tasche ist das? |
| die Nachricht, -en | la noticia / mensaje | Sustantivo | jemandem eine Nachricht erzählen |
| das Portemonnaie, -s | la cartera / monedero | Sustantivo | Variante: das Portmonee |
| das Handy, -s | el móvil | Sustantivo | Wo ist mein Handy? |
| der Geburtstag, -e | el cumpleaños | Sustantivo | Wann hast du Geburtstag? |
| das Sandwich, -es / -s | el bocadillo / sándwich | Sustantivo | Wie viel kostet es? |
| der Student, -en | el estudiante | Sustantivo débil | Wie viele Studenten ...? |
| der Kurs, -e | el curso | Sustantivo | in eurem Kurs |
| das Zentrum, Zentren | el centro | Sustantivo | ins Zentrum fahren |
| die Stadt, Städte | la ciudad | Sustantivo | Welche Stadt ...? |
| der Film, -e | la película | Sustantivo | Welchen Film ...? |
| die Bahn, -en | el tren / ferrocarril | Sustantivo | Mit welcher Bahn ...? |
| der Beruf, -e | la profesión | Sustantivo | von Beruf |
| das Lieblingsessen, - | la comida favorita | Sustantivo | Was ist dein Lieblingsessen? |
| der Deutschkurs, -e | el curso de alemán | Sustantivo | im Deutschkurs |
| die Universität, -en | la universidad | Sustantivo | Abreviatura: die Uni |
| die Sprache, -n | el idioma / lengua | Sustantivo | Welche Sprachen ...? |
| das Geschäft, -e | la tienda / negocio | Sustantivo | in welchem Geschäft |
| der Unterricht, sin plural | la clase / enseñanza | Sustantivo | nach dem Unterricht |
| kennenlernen | conocer por primera vez | Verbo irregular | jemanden kennenlernen |
| gehören | pertenecer | Verbo regular + Dativ | Wem gehört das? |
| sich treffen | quedar / encontrarse | Verbo reflexivo irregular | sich mit jemandem treffen |
| vorstellen | presentar | Verbo separable regular + Dat./Akk. | jemandem jemanden vorstellen |
| erzählen | contar | Verbo regular + Dativ/Akk. | jemandem von etwas erzählen |
| sich entscheiden | decidirse | Verbo reflexivo separable | sich für etwas entscheiden |
| beruflich | profesionalmente | Adverbio | Was machen Sie beruflich? |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1 Preguntas abiertas o W-Fragen
- Comienzan con una palabra o expresión interrogativa.
- La respuesta aporta información; no basta normalmente con **ja** o **nein**.
- La palabra interrogativa sustituye al elemento desconocido.

**Estructura / Fórmula:** `W-Wort + verbo conjugado + sujeto + complementos + ?`

`Wo wohnst du?`  
`Wann beginnt der Kurs?`

##### 3.2 Posición del verbo
| Posición 1 | Posición 2 | Sujeto | Resto |
| :--- | :--- | :--- | :--- |
| Wo | wohnst | du | jetzt? |
| Wann | beginnt | der Kurs | heute? |
| Warum | lernst | du | Deutsch? |

- La palabra interrogativa ocupa la primera posición.
- El verbo conjugado ocupa la segunda.
- El sujeto suele aparecer después del verbo.

##### 3.3 Cuando la palabra interrogativa es el sujeto
Si **wer** o **was** representa al sujeto, no aparece otro sujeto.

`Wer kennt diesen Mann?`

- `wer` = sujeto.
- `kennt` = verbo.
- `diesen Mann` = objeto acusativo.

No se dice: `Wer kennt er diesen Mann?`

##### 3.4 **wer, wen, wem, wessen**
| Caso | Pregunta | Función | Ejemplo |
| :--- | :--- | :--- | :--- |
| Nominativo | wer? | quién, sujeto | Wer kommt heute? |
| Acusativo | wen? | a quién, objeto directo | Wen kennst du hier? |
| Dativo | wem? | a quién, destinatario | Wem hast du das erzählt? |
| Genitivo | wessen? | de quién | Wessen Tasche ist das? |

##### 3.5 Pertenencia: **wem** o **wessen**
Dos estructuras frecuentes:

`Wem gehört diese Jacke?`  
¿A quién pertenece esta chaqueta?

`Wessen Jacke ist das?`  
¿De quién es esta chaqueta?

- **gehören** rige dativo: `wem`.
- **wessen** introduce directamente una relación posesiva.

##### 3.6 Lugar, origen y destino
| Pregunta | Significado | Ejemplo |
| :--- | :--- | :--- |
| wo? | dónde | Wo ist mein Handy? |
| woher? | de dónde | Woher kommen deine Eltern? |
| wohin? | adónde | Wohin geht ihr? |

También son posibles formas separadas coloquiales:

- `Wo kommen deine Eltern her?`
- `Wo geht ihr hin?`

##### 3.7 El caso no depende solo de **wo/wohin**
El caso lo determina la preposición y su significado.

| Pregunta | Respuesta | Caso / estructura |
| :--- | :--- | :--- |
| Wo bist du? | im Park | `in + Dativ` |
| Wohin gehst du? | in den Park | `in + Akkusativ` |
| Wohin fährst du? | nach Berlin | `nach`, sin artículo |
| Wohin gehst du? | zum Arzt | `zu + Dativ` |
| Woher kommst du? | aus Deutschland | `aus + Dativ` |
| Woher kommst du? | vom Arzt | `von + Dativ` |

Por eso no es correcto memorizar simplemente `Wohin = Akkusativ`.

##### 3.8 Preguntas frecuentes con **wie**
| Pregunta | Significado | Ejemplo |
| :--- | :--- | :--- |
| wie? | cómo | Wie hast du Deutsch gelernt? |
| wie alt? | qué edad | Wie alt bist du? |
| wie spät? | qué hora | Wie spät ist es? |
| wie lange? | cuánto tiempo | Wie lange lebst du hier? |
| wie oft? | con qué frecuencia | Wie oft lernst du Deutsch? |
| wie viel? | cuánto | Wie viel kostet das? |
| wie viele? | cuántos/as | Wie viele Studenten sind da? |

##### 3.9 **wie viel** y **wie viele**
- **wie viel** se usa con cantidades no contables o como cantidad general:
  - `Wie viel Wasser trinkst du?`
  - `Wie viel hast du gegessen?`
- **wie viele** se usa con sustantivos contables en plural:
  - `Wie viele Bücher hast du?`
  - `Wie viele Studenten sind im Kurs?`

##### 3.10 **welch-**
**welch-** significa «qué/cuál» y se declina como el artículo determinado.

| Caso | Masculino | Femenino | Neutro | Plural |
| :--- | :--- | :--- | :--- | :--- |
| Nominativo | welcher Bus | welche Stadt | welches Buch | welche Städte |
| Acusativo | welchen Bus | welche Stadt | welches Buch | welche Städte |
| Dativo | welchem Bus | welcher Stadt | welchem Buch | welchen Städten |
| Genitivo | welches Busses | welcher Stadt | welches Buches | welcher Städte |

Ejemplos:

- `Welcher Bus fährt ins Zentrum?`
- `Welche Stadt gefällt dir am besten?`
- `Welches Buch hast du gelesen?`
- `Welchen Film hast du gesehen?`
- `Mit welcher Bahn kommst du?`

##### 3.11 Preguntar por causas y finalidades
| Pregunta | Significado | Ejemplo |
| :--- | :--- | :--- |
| warum? | por qué | Warum lernst du Deutsch? |
| wieso? | por qué / cómo es que | Wieso kommst du nicht? |
| weshalb? | por qué / por qué motivo | Weshalb bist du hier? |
| wozu? | para qué | Wozu brauchst du das? |
| wofür? | para qué | Wofür brauchst du dieses Buch? |

- **warum, wieso** y **weshalb** son muy cercanos en uso.
- **wozu/wofür** preguntan por finalidad o uso.

##### 3.12 Preguntas con preposición: personas
Para personas se usa normalmente `preposición + pronombre interrogativo`.

| Preposición | Pregunta | Ejemplo |
| :--- | :--- | :--- |
| mit + Dativ | mit wem? | Mit wem gehst du ins Kino? |
| für + Akkusativ | für wen? | Für wen ist das Geschenk? |
| auf + Akkusativ | auf wen? | Auf wen wartest du? |
| von + Dativ | von wem? | Von wem ist die Nachricht? |
| über + Akkusativ | über wen? | Über wen sprecht ihr? |

##### 3.13 Preguntas con preposición: cosas
Para cosas se forman compuestos con **wo(r)-**.

| Preposición | Pregunta | Respuesta con da(r)- |
| :--- | :--- | :--- |
| mit | womit? | damit |
| für | wofür? | dafür |
| auf | worauf? | darauf |
| von | wovon? | davon |
| über | worüber? | darüber |
| an | woran? | daran |

- Se añade **r** si la preposición comienza por vocal:
  - `wo + auf → worauf`
  - `da + über → darüber`

Ejemplo:

`Worauf wartest du?` – `Ich warte auf den Bus.` / `Darauf.`

Para una persona:

`Auf wen wartest du?` – `Auf meinen Freund.`

##### 3.14 Expresiones que no se traducen literalmente
| Español | Alemán |
| :--- | :--- |
| ¿Cuántos años tienes? | Wie alt bist du? |
| ¿Qué hora es? | Wie spät ist es? / Wie viel Uhr ist es? |
| ¿A qué se dedica? | Was machen Sie beruflich? |
| ¿Cuál es su profesión? | Was sind Sie von Beruf? |
| ¿Cuál es tu comida favorita? | Was ist dein Lieblingsessen? |
| ¿Cómo estás? | Wie geht es dir? |

##### 3.15 Con auxiliar o modal
La palabra interrogativa ocupa la primera posición y el auxiliar/modal la segunda. El participio o infinitivo permanece al final.

| Tipo | Estructura | Ejemplo |
| :--- | :--- | :--- |
| Perfekt | W-Wort + auxiliar + sujeto + ... + participio? | Was habt ihr heute gelernt? |
| Perfekt | W-Wort + auxiliar + sujeto + ... + participio? | Warum bist du weggegangen? |
| Modal | W-Wort + modal + sujeto + ... + infinitivo? | Wann willst du ihn vorstellen? |

##### 3.16 Ejemplos analizados
`Was habt ihr heute im Deutschkurs gelernt?`

- `was` = objeto preguntado.
- `habt` = auxiliar en posición 2.
- `ihr` = sujeto.
- `gelernt` = participio al final.

`Wann willst du mir endlich deinen Freund vorstellen?`

- `wann` = interrogativo temporal.
- `willst` = modal en posición 2.
- `du` = sujeto.
- `mir` = dativo.
- `deinen Freund` = acusativo.
- `vorstellen` = infinitivo al final.

##### 3.17 Ejercicios resueltos
| # | Español | Alemán normalizado |
| :--- | :--- | :--- |
| 1 | ¿Cómo estás? | Wie geht es dir? |
| 2a | ¿En qué trabaja el señor Berger? | Was macht Herr Berger beruflich? |
| 2b | ¿Cuál es la profesión del señor Berger? | Was ist Herr Berger von Beruf? |
| 3 | ¿Cuánto has comido? | Wie viel hast du gegessen? |
| 4 | ¿Por qué no viniste a mi fiesta el sábado? | Warum bist du am Samstag nicht zu meiner Party gekommen? |
| 5 | ¿Adónde va de vacaciones? | Wohin fahren / fliegen Sie in den Urlaub? |
| 6 | ¿Dónde está mi cartera? ¿La has visto? | Wo ist mein Portemonnaie? Hast du es gesehen? |
| 7 | ¿En qué tienda ha comprado usted este bolso? | In welchem Geschäft haben Sie diese Tasche gekauft? |
| 8 | ¿Qué hiciste ayer después de clase? | Was hast du gestern nach dem Unterricht gemacht? |
| 9a | ¿A quién pertenece esta chaqueta? | Wem gehört diese Jacke? |
| 9b | ¿De quién es esta chaqueta? | Wessen Jacke ist das? |
| 10 | ¿Qué idiomas habla usted? | Welche Sprachen sprechen Sie? |

##### 3.18 Corrección de la pregunta profesional
La solución `Was macht Herr Berger von Beruf?` se entiende, pero las combinaciones idiomáticas recomendadas son:

- `Was macht Herr Berger beruflich?`
- `Was ist Herr Berger von Beruf?`

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)
> **Wie geht es dir?**  
> *Traducción:* ¿Cómo estás?  
> *Uso:* Saludo informal.

> **Was machen Sie beruflich?**  
> *Traducción:* ¿A qué se dedica?  
> *Uso:* Preguntar formalmente por la profesión.

> **Woher kommen Sie?**  
> *Traducción:* ¿De dónde es usted?  
> *Uso:* Preguntar por el origen.

> **Welche Sprachen sprechen Sie?**  
> *Traducción:* ¿Qué idiomas habla?  
> *Uso:* Preguntar por conocimientos lingüísticos.

> **Wie viel kostet das?**  
> *Traducción:* ¿Cuánto cuesta esto?  
> *Uso:* Preguntar un precio.

> **Mit wem kommst du?**  
> *Traducción:* ¿Con quién vienes?  
> *Uso:* Preguntar por acompañantes.

> **Worauf wartest du?**  
> *Traducción:* ¿Qué estás esperando?  
> *Uso:* Preguntar por una cosa esperada.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** En una W-Frage, el verbo conjugado ocupa la segunda posición.
- ⚠️ **Atención:** Si `wer` es el sujeto, no añadas otro sujeto.
- ⚠️ **Atención:** El caso de una respuesta a `wo/wohin/woher` depende de la preposición.
- ⚠️ **Atención:** Usa `wen` para acusativo y `wem` para dativo.
- ⚠️ **Atención:** **welch-** debe declinarse: `welcher`, `welchen`, `welchem`.
- ⚠️ **Atención:** Para personas: `mit wem`; para cosas: `womit`.
- ⚠️ **Atención:** La forma estándar es `Portemonnaie` o `Portmonee`.
- ⚠️ **Atención:** Se escribe `Welche Stadt`, no `Welche cuidad`; el original contenía una errata en español.
- ⚠️ **Pronunciación:** La `w` alemana de `wer`, `wie` y `wo` suena como una `v`.
- ⚠️ **Pronunciación:** En `welche`, `ch` tiene el sonido suave de `ich`.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: _____ kommt heute? (¿Quién?)
  A: Wer
  Type: fill-in-the-blank
- Q: _____ kennst du hier? (¿A quién?, acusativo)
  A: Wen
  Type: fill-in-the-blank
- Q: _____ hast du das erzählt? (¿A quién?, dativo)
  A: Wem
  Type: fill-in-the-blank
- Q: _____ Tasche ist das? (¿De quién?)
  A: Wessen
  Type: fill-in-the-blank
- Q: _____ ist mein Handy? (¿Dónde?)
  A: Wo
  Type: fill-in-the-blank
- Q: _____ kommen deine Eltern? (¿De dónde?)
  A: Woher
  Type: fill-in-the-blank
- Q: _____ geht ihr? (¿Adónde?)
  A: Wohin
  Type: fill-in-the-blank
- Q: _____ hast du Deutsch gelernt? (¿Cómo?)
  A: Wie
  Type: fill-in-the-blank
- Q: _____ lebst du schon hier? (¿Cuánto tiempo?)
  A: Wie lange
  Type: fill-in-the-blank
- Q: _____ kostet das? (¿Cuánto?)
  A: Wie viel
  Type: fill-in-the-blank
- Q: _____ Bücher hast du? (¿Cuántos?)
  A: Wie viele
  Type: fill-in-the-blank
- Q: _____ Film hast du gesehen? (welch-, acusativo masculino)
  A: Welchen
  Type: fill-in-the-blank
- Q: Mit _____ Bahn kommst du? (welch-, dativo femenino)
  A: welcher
  Type: fill-in-the-blank
- Q: Traducción: ¿Cómo estás?
  A: Wie geht es dir?
  Type: flashcard
- Q: Traducción: ¿A qué se dedica usted?
  A: Was machen Sie beruflich? / Was sind Sie von Beruf?
  Type: flashcard
- Q: Traducción: ¿Qué idiomas habla usted?
  A: Welche Sprachen sprechen Sie?
  Type: flashcard
- Q: Traducción: ¿Dónde está mi cartera?
  A: Wo ist mein Portemonnaie?
  Type: flashcard
- Q: Traducción: ¿De quién es esta chaqueta? (genitivo)
  A: Wessen Jacke ist das?
  Type: flashcard
- Q: Traducción: ¿A quién pertenece esta chaqueta?
  A: Wem gehört diese Jacke?
  Type: flashcard
- Q: ¿Cómo se pregunta “con quién”?
  A: Mit wem?
  Type: flashcard
- Q: ¿Cómo se pregunta “con qué”?
  A: Womit?
  Type: flashcard
- Q: ¿Cómo se pregunta “qué estás esperando” si se trata de una cosa?
  A: Worauf wartest du?
  Type: flashcard
- Q: Corrige: Wer kennt er diesen Mann?
  A: Wer kennt diesen Mann?
  Type: correction
- Q: Corrige: Was macht Herr Berger von Beruf? (forma idiomática con «von Beruf»)
  A: Was ist Herr Berger von Beruf?
  Type: correction
<!-- DATA_QUIZ_END -->


---


### Unidad 25 — Adverbios de lugar

*Nivel orientativo:* **A2** · *Alcance A1 de esta app:* 📚

> hier/dort ya cubiertos en el núcleo A1 (Parte 2); el resto es A2.

---
class_id: 025
title: "Adverbios de lugar"
level: "A2"
topics: ["Gramática", "Adverbios", "Lugar", "Dirección", "Origen", "Wo", "Wohin", "Woher", "Ejercicios"]
target_exam: "Telc / Goethe A2"
---

### Adverbios de lugar

#### 1. 🎯 Resumen / Objetivos de la Lección
- Reconocer adverbios que responden a **Wo?**, **Wohin?** y **Woher?**.
- Distinguir ubicación, destino y procedencia.
- Utilizar correctamente **hier, da** y **dort**.
- Expresar posiciones relativas: arriba, abajo, delante, detrás, derecha e izquierda.
- Diferenciar **drinnen/draußen** de **innen/außen**.
- Comprender la oposición direccional entre **her** y **hin**.
- Resolver los ejercicios y producir frases naturales.

#### 2. 📚 Vocabulario Clave (Wortschatz)

##### Adverbios de ubicación
| Alemán | Español | Pregunta | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| hier | aquí | Wo? | Ich bin hier. |
| da | ahí / allí | Wo? | Es ist niemand da. |
| dort | allí / allá | Wo? | Dort waren viele Leute. |
| überall | por todas partes | Wo? | Überall gibt es Geschäfte. |
| irgendwo | en algún sitio | Wo? | Hast du sie irgendwo gesehen? |
| nirgendwo / nirgends | en ninguna parte | Wo? | Ich finde es nirgendwo. |
| vorn / vorne | delante / en la parte delantera | Wo? | Wir sitzen vorne. |
| hinten | detrás / en la parte trasera | Wo? | Die Kinder sitzen hinten. |
| rechts | a la derecha | Wo?/Wohin? | Biegen Sie rechts ab. |
| links | a la izquierda | Wo?/Wohin? | Das Büro ist links. |
| oben | arriba | Wo? | Die Katze ist oben. |
| unten | abajo | Wo? | Die Koffer sind unten. |
| drinnen | dentro / en el interior | Wo? | Ich bleibe drinnen. |
| draußen | fuera / al aire libre | Wo? | Draußen ist es kalt. |

##### Adverbios de dirección
| Alemán | Español | Perspectiva |
| :--- | :--- | :--- |
| hierher | hacia aquí | hacia el hablante |
| hierhin | hacia aquí | hacia este lugar; menos centrado en el hablante |
| dahin | hacia ahí / allí | alejándose o hacia un lugar indicado |
| dorthin | hacia allí | hacia un lugar más distante o preciso |
| herein | hacia dentro, hacia el hablante | entrar |
| hinein | hacia dentro, alejándose del hablante | entrar |
| heraus | hacia fuera, hacia el hablante | salir |
| hinaus | hacia fuera, alejándose del hablante | salir |
| herauf | hacia arriba, hacia aquí | movimiento ascendente hacia el hablante |
| hinauf | hacia arriba, hacia allí | movimiento ascendente alejándose |
| herunter | hacia abajo, hacia aquí | movimiento descendente hacia el hablante |
| hinunter | hacia abajo, hacia allí | movimiento descendente alejándose |

##### Sustantivos y verbos de los ejercicios
| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Garten, Gärten | el jardín | Sustantivo | draußen im Garten |
| das Geschäft, -e | la tienda / negocio | Sustantivo | überall Geschäfte |
| der Keller, - | el sótano | Sustantivo | unten im Keller |
| der Koffer, - | la maleta | Sustantivo | unsere Koffer |
| das Büro, -s | la oficina | Sustantivo | rechts von meinem Büro |
| das Konzert, -e | el concierto | Sustantivo | draußen stattfinden |
| die Reihe, -n | la fila | Sustantivo | in der ersten Reihe |
| der Schrank, Schränke | el armario | Sustantivo | hinten im Schrank |
| der Wein, -e | el vino | Sustantivo | Im Schrank steht Wein. |
| die Brille, -n | las gafas | Sustantivo | irgendwo gesehen |
| spielen | jugar | Verbo regular | draußen spielen |
| essen | comer | Verbo irregular | drinnen essen |
| abbiegen | girar | Verbo separable irregular | rechts abbiegen |
| stattfinden | celebrarse / tener lugar | Verbo separable irregular | Das Konzert findet statt. |
| stehen | estar de pie / estar colocado | Verbo irregular | Wein steht im Schrank. |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1 Adjetivo o adverbio
- Un adjetivo atributivo modifica un sustantivo y se declina:
  - `ein ehrgeiziger Student`
- Un adverbio modifica un verbo, un adjetivo u otro adverbio y no se declina:
  - `Christian lernt ehrgeizig.`
- Los adverbios de lugar son invariables:
  - `hier, dort, oben, draußen`

##### 3.2 Las tres preguntas locales
| Pregunta | Significado | Tipo de información | Ejemplo |
| :--- | :--- | :--- | :--- |
| Wo? | ¿Dónde? | ubicación | Wo bist du? - Hier. |
| Wohin? | ¿Adónde? | destino | Wohin gehst du? - Dorthin. |
| Woher? | ¿De dónde? | origen | Woher kommst du? - Von dort. |

##### 3.3 **hier, da, dort**
| Adverbio | Uso habitual | Ejemplo |
| :--- | :--- | :--- |
| hier | lugar del hablante o muy cercano | Komm bitte hierher. |
| da | lugar señalado, conocido por el contexto o disponible | Da ist Frau Müller. |
| dort | lugar más distante o contrastado | Dort ist der Bahnhof. |

- **da** y **dort** pueden traducirse como «ahí/allí».
- **dort** suele ser más espacial y preciso.
- **da** también puede significar «presente/disponible»:
  - `Ist Frau Müller da?` → ¿Está la Sra. Müller?

##### 3.4 Cantidad o ausencia de lugares
| Adverbio | Significado | Ejemplo |
| :--- | :--- | :--- |
| überall | en todas partes | Hier gibt es überall Cafés. |
| irgendwo | en algún lugar | Ich habe sie irgendwo gesehen. |
| nirgendwo / nirgends | en ningún lugar | Sie ist nirgends zu finden. |

En alemán estándar no se añade otra negación:

`Ich habe sie nirgendwo gesehen.`  
No: `Ich habe sie nicht nirgendwo gesehen.`

##### 3.5 Posición vertical y frontal
| Posición | Adverbio | Ejemplo |
| :--- | :--- | :--- |
| arriba | oben | Die Katze ist oben auf dem Schrank. |
| abajo | unten | Wir warten unten. |
| delante | vorn / vorne | Wir sitzen vorne im Auto. |
| detrás | hinten | Die Kinder sitzen hinten. |

- El adverbio puede precisar la zona general y una frase preposicional el lugar exacto:
  - `unten im Keller`
  - `vorne in der ersten Reihe`
  - `hinten im Schrank`

##### 3.6 Derecha e izquierda
| Adverbio | Ejemplo |
| :--- | :--- |
| rechts | Biegen Sie rechts ab. |
| links | Halten Sie links. |
| rechts von + Dativ | Das Büro liegt rechts von der Kantine. |
| links von + Dativ | Die Bank ist links vom Museum. |

También puede expresarse dirección con:

- `nach rechts`
- `nach links`

`Müssen wir nach rechts oder nach links abbiegen?`

##### 3.7 **drinnen/draußen** y **innen/außen**
| Forma | Uso | Ejemplo |
| :--- | :--- | :--- |
| drinnen | dentro, como lugar independiente | Wir essen drinnen. |
| draußen | fuera, como lugar independiente | Die Kinder spielen draußen. |
| innen | por dentro / en la cara interior | Die Tür ist innen weiß. |
| außen | por fuera / en la cara exterior | Das Haus ist außen blau. |

- En el habla cotidiana, para responder a **Wo?** se prefieren normalmente **drinnen** y **draußen**.
- **innen/außen** son frecuentes en contrastes técnicos, compuestos y descripciones de superficies.

##### 3.8 **her** y **hin**
- **her** indica movimiento hacia el hablante o su punto de referencia.
- **hin** indica movimiento alejándose del hablante o hacia otro lugar.

| Situación | Ejemplo | Traducción |
| :--- | :--- | :--- |
| Hacia mí | Komm her! | ¡Ven aquí! |
| Hacia otro lugar | Geh hin! | ¡Ve allí! |
| Entrar hacia mí | Komm herein! | ¡Entra! |
| Meter algo / entrar alejándose | Geh hinein! | ¡Entra ahí dentro! |
| Salir hacia mí | Komm heraus! | ¡Sal! |
| Salir alejándose | Geh hinaus! | ¡Sal afuera! |

##### 3.9 Combinaciones con verbos
Muchos adverbios direccionales forman combinaciones separables con verbos:

| Combinación | Ejemplo |
| :--- | :--- |
| hereinkommen | Komm bitte herein. |
| hinausgehen | Wir gehen hinaus. |
| herunterkommen | Komm bitte herunter. |
| hinaufgehen | Sie geht die Treppe hinauf. |
| dorthin fahren | Wir fahren morgen dorthin. |

##### 3.10 Posición en la oración
En orden neutro, el complemento local suele aparecer hacia el final conforme a TeKaMoLo:

`Die Kinder spielen heute draußen im Garten.`

Puede ocupar la primera posición para recibir énfasis:

`Draußen spielen die Kinder im Garten.`

El verbo conjugado permanece en la segunda posición.

##### 3.11 Traducciones resueltas
| Español | Alemán |
| :--- | :--- |
| Los niños están jugando fuera en el jardín. | Die Kinder spielen draußen im Garten. |
| Hay tiendas por todas partes. | Überall gibt es Geschäfte. |
| ¿Prefieres comer fuera o dentro? | Isst du lieber draußen oder drinnen? |
| ¿Tenemos que girar a la derecha o a la izquierda? | Müssen wir rechts oder links abbiegen? |
| ¿Has visto a la Sra. Müller en algún sitio? | Hast du Frau Müller irgendwo gesehen? |
| ¿Sabes si está aquí? | Weißt du, ob sie hier ist? |

Variante direccional igualmente natural:

`Müssen wir nach rechts oder nach links abbiegen?`

##### 3.12 Traducción inversa resuelta
| Alemán | Español |
| :--- | :--- |
| Unsere Koffer sind unten im Keller. | Nuestras maletas están abajo, en el sótano. |
| Ich bleibe heute lieber drinnen; draußen ist es zu heiß. | Hoy prefiero quedarme dentro; fuera hace demasiado calor. |
| Frau Schneider arbeitet rechts von meinem Büro. | La Sra. Schneider trabaja a la derecha de mi oficina. |
| Das Konzert findet draußen statt. | El concierto se celebra al aire libre. |
| Wir stehen vorne in der ersten Reihe. | Estamos delante, en la primera fila. |
| Hinten im Schrank steht noch Wein. | Al fondo del armario todavía hay vino. |
| Wohin geht ihr? | ¿Adónde vais? / ¿Adónde van ustedes? |

##### 3.13 **draußen** no siempre significa simplemente «fuera»
Según el contexto puede traducirse como:

- fuera;
- en el exterior;
- al aire libre;
- fuera de casa.

`Das Konzert findet draußen statt.`  
El concierto se celebra al aire libre.

##### 3.14 Adverbio y frase preposicional juntos
No hay redundancia incorrecta en:

`draußen im Garten`

- `draußen` contrasta exterior/interior.
- `im Garten` identifica el lugar concreto.

Lo mismo ocurre con:

- `unten im Keller`
- `oben auf dem Schrank`
- `vorne in der ersten Reihe`
- `hinten im Auto`

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)
> **Ist Frau Müller da?**  
> *Traducción:* ¿Está la Sra. Müller?  
> *Uso:* Preguntar si alguien está presente o disponible.

> **Komm bitte herein!**  
> *Traducción:* ¡Entra, por favor!  
> *Uso:* Invitar a alguien a entrar.

> **Wo ist die Toilette?**  
> *Traducción:* ¿Dónde está el baño?  
> *Uso:* Pedir una ubicación.

> **Dort hinten, links.**  
> *Traducción:* Allí al fondo, a la izquierda.  
> *Uso:* Dar indicaciones breves.

> **Müssen wir hier rechts abbiegen?**  
> *Traducción:* ¿Tenemos que girar aquí a la derecha?  
> *Uso:* Confirmar una ruta.

> **Ich bleibe lieber drinnen.**  
> *Traducción:* Prefiero quedarme dentro.  
> *Uso:* Hablar de una preferencia.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** Los adverbios no se declinan: `hier`, `dort`, `draußen`.
- ⚠️ **Atención:** **her** indica movimiento hacia el hablante; **hin**, alejándose de él.
- ⚠️ **Atención:** Para una ubicación interior/exterior cotidiana, usa normalmente `drinnen/draußen`.
- ⚠️ **Atención:** `irgendwo` significa “en algún lugar”; `nirgendwo`, “en ninguno”.
- ⚠️ **Atención:** No combines `nirgendwo` con otra negación en una frase negativa simple.
- ⚠️ **Atención:** `vorn` y `vorne` son variantes correctas.
- ⚠️ **Atención:** `rechts von` y `links von` rigen dativo por la preposición `von`.
- ⚠️ **Atención:** `draußen im Garten` es correcto: el adverbio da una orientación general y la frase precisa el lugar.
- ⚠️ **Pronunciación:** En `draußen`, `au` suena aproximadamente “ao” y `ß` como una `s` sorda.
- ⚠️ **Pronunciación:** En `irgendwo`, el acento principal suele recaer en la primera sílaba.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: ¿Qué pregunta solicita una ubicación?
  A: Wo?
  Type: flashcard
- Q: ¿Qué pregunta solicita un destino?
  A: Wohin?
  Type: flashcard
- Q: ¿Qué pregunta solicita un origen?
  A: Woher?
  Type: flashcard
- Q: Traducción: aquí
  A: hier
  Type: flashcard
- Q: Traducción: allí
  A: dort / da
  Type: flashcard
- Q: Traducción: por todas partes
  A: überall
  Type: flashcard
- Q: Traducción: en algún sitio
  A: irgendwo
  Type: flashcard
- Q: Traducción: en ningún sitio
  A: nirgendwo / nirgends
  Type: flashcard
- Q: Traducción: arriba / abajo
  A: oben / unten
  Type: flashcard
- Q: Traducción: delante / detrás
  A: vorn(e) / hinten
  Type: flashcard
- Q: Traducción: dentro / fuera
  A: drinnen / draußen
  Type: flashcard
- Q: Die Kinder spielen _____ im Garten. (fuera)
  A: draußen
  Type: fill-in-the-blank
- Q: _____ gibt es Geschäfte. (por todas partes)
  A: Überall
  Type: fill-in-the-blank
- Q: Isst du lieber _____ oder _____? (fuera / dentro)
  A: draußen / drinnen
  Type: fill-in-the-blank
- Q: Hast du Frau Müller _____ gesehen? (en algún sitio)
  A: irgendwo
  Type: fill-in-the-blank
- Q: Ich habe sie _____ gesehen. (en ningún sitio)
  A: nirgendwo
  Type: fill-in-the-blank
- Q: Traducción: Nuestras maletas están abajo en el sótano.
  A: Unsere Koffer sind unten im Keller.
  Type: flashcard
- Q: Traducción: El concierto se celebra al aire libre.
  A: Das Konzert findet draußen statt.
  Type: flashcard
- Q: Traducción: ¿Adónde vais?
  A: Wohin geht ihr?
  Type: flashcard
- Q: ¿Qué diferencia hay entre «Komm her!» y «Geh hin!»?
  A: Komm her indica movimiento hacia el hablante; Geh hin, movimiento alejándose hacia otro lugar.
  Type: flashcard
- Q: Completa: Das Büro ist rechts _____ der Kantine.
  A: von
  Type: fill-in-the-blank
- Q: Ordena: draußen / heute / spielen / die Kinder / im Garten
  A: Die Kinder spielen heute draußen im Garten.
  Type: sentence-order
- Q: Corrige: Draußen die Kinder spielen im Garten.
  A: Draußen spielen die Kinder im Garten.
  Type: correction
- Q: ¿Por qué es correcto «draußen im Garten»?
  A: Draußen indica exterior y im Garten precisa el lugar concreto.
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 26 — Adverbios de tiempo (Temporaladverbien)

*Nivel orientativo:* **A2** · *Alcance A1 de esta app:* 📚

> heute/morgen/gestern ya cubiertos en el núcleo A1; el resto es A2.

---
class_id: 026
title: "Adverbios de tiempo"
level: "A2"
topics: ["Gramática", "Vocabulario", "Expresiones", "Adverbios temporales", "Frecuencia"]
target_exam: "Telc / Goethe A2"
---

### Adverbios de tiempo (Temporaladverbien)

#### 1. 🎯 Resumen / Objetivos de la Lección
- Reconocer los adverbios temporales más frecuentes del alemán.
- Responder preguntas con **wann?**, **wie lange?**, **wie oft?**, **bis wann?** y **seit wann?**.
- Distinguir expresiones próximas como **bald**, **gleich** y **sofort**.
- Diferenciar **neulich** de **in letzter Zeit** y **früher** de **damals**.
- Expresar que una acción está desarrollándose mediante **gerade**.
- Hablar de hábitos y frecuencia desde **immer** hasta **nie**.
- Colocar correctamente los adverbios temporales dentro de la oración.

#### 2. 📚 Vocabulario Clave (Wortschatz)

##### Adverbios y expresiones temporales

| Alemán | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| bald | pronto | Adverbio temporal | **Wir sehen uns bald!** — ¡Nos vemos pronto! |
| bereits / schon | ya | Adverbio temporal | **Ich habe mein Studium schon abgeschlossen.** — Ya he terminado mis estudios. |
| gerade | ahora mismo; en este momento | Adverbio temporal | **Ich esse gerade.** — Estoy comiendo ahora mismo. |
| früher | antes; antiguamente | Adverbio temporal | **Früher habe ich in einem Dorf gewohnt.** — Antes vivía en un pueblo. |
| damals | en aquel entonces | Adverbio temporal | **Damals hatten wir kein Internet.** — En aquel entonces no teníamos internet. |
| gleich | enseguida; en un momento | Adverbio temporal | **Ich rufe dich gleich an.** — Te llamo enseguida. |
| sofort | inmediatamente; ahora mismo | Adverbio temporal | **Ich komme sofort!** — ¡Voy inmediatamente! |
| neulich | hace poco; el otro día | Adverbio temporal | **Neulich habe ich einen deutschen Film gesehen.** — Hace poco vi una película alemana. |
| in letzter Zeit | últimamente; en los últimos tiempos | Expresión temporal | **In letzter Zeit bin ich sehr beschäftigt.** — Últimamente estoy muy ocupado. |
| heute | hoy | Adverbio temporal | **Heute bin ich sehr müde.** — Hoy estoy muy cansado. |
| gestern | ayer | Adverbio temporal | **Gestern habe ich mich krank gefühlt.** — Ayer me sentí enfermo. |
| gestern Abend | anoche; ayer por la tarde-noche | Expresión temporal | **Gestern Abend bin ich spät nach Hause gekommen.** — Anoche volví tarde a casa. |
| vorgestern | anteayer | Adverbio temporal | **Vorgestern haben uns unsere Freunde besucht.** — Anteayer nos visitaron nuestros amigos. |
| morgen | mañana | Adverbio temporal | **Hast du morgen etwas vor?** — ¿Tienes algo pensado para mañana? |
| übermorgen | pasado mañana | Adverbio temporal | **Übermorgen ist ein Feiertag.** — Pasado mañana es festivo. |

##### Adverbios de frecuencia

| Alemán | Español | Frecuencia aproximada | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| immer | siempre | 100 % | **Wir machen immer viel Sport.** — Siempre hacemos mucho deporte. |
| fast immer | casi siempre | Muy alta | **Ich gehe fast immer zu Fuß.** — Casi siempre voy a pie. |
| täglich | diariamente; cada día | Periodicidad diaria | **Stefan geht täglich ins Fitnessstudio.** — Stefan va diariamente al gimnasio. |
| wöchentlich | semanalmente; cada semana | Periodicidad semanal | **Der Kurs findet wöchentlich statt.** — El curso tiene lugar cada semana. |
| monatlich | mensualmente; cada mes | Periodicidad mensual | **Ich bezahle monatlich.** — Pago mensualmente. |
| jährlich | anualmente; cada año | Periodicidad anual | **Das Festival findet jährlich statt.** — El festival se celebra anualmente. |
| meistens | la mayoría de las veces; normalmente | Alta | **Meistens esse ich Müsli zum Frühstück.** — Normalmente desayuno muesli. |
| immer wieder | una y otra vez; repetidamente | Repetición | **Ich verlaufe mich immer wieder.** — Me pierdo una y otra vez. |
| oft / häufig | a menudo; frecuentemente | Media-alta | **Am Wochenende gehe ich oft mit meinen Freunden aus.** — Los fines de semana salgo a menudo con mis amigos. |
| manchmal | a veces | Media | **Manchmal haben die Schüler keine Lust zu lernen.** — A veces los alumnos no tienen ganas de estudiar. |
| ab und zu | de vez en cuando | Media-baja | **Ab und zu gehen wir ins Kino.** — De vez en cuando vamos al cine. |
| gelegentlich | ocasionalmente; de vez en cuando | Baja | **Ich arbeite gelegentlich im Büro.** — De vez en cuando trabajo en la oficina. |
| selten | raramente; pocas veces | Muy baja | **Unsere Kinder räumen selten ihr Zimmer auf.** — Nuestros hijos rara vez ordenan su habitación. |
| fast nie | casi nunca | Mínima | **Wir streiten uns fast nie.** — Casi nunca discutimos. |
| nie / niemals | nunca; jamás | 0 % | **Sie isst nie Fleisch.** — Ella nunca come carne. |

##### Palabras útiles de los ejemplos

| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| das Studium, Studien | los estudios universitarios / la carrera | Sustantivo neutro | **das Studium abschließen** — terminar los estudios |
| der Film, -e | la película | Sustantivo masculino | **einen Film schauen** — ver una película |
| der Deutschkurs, -e | el curso de alemán | Sustantivo masculino | **einen Deutschkurs machen** |
| das Fitnessstudio, -s | el gimnasio | Sustantivo neutro | **ins Fitnessstudio gehen** |
| die Mittagspause, -n | la pausa del mediodía | Sustantivo femenino | **in der Mittagspause** |
| das Wochenende, -n | el fin de semana | Sustantivo neutro | **am Wochenende** |
| der Zweifel, - | la duda | Sustantivo masculino | Frecuente en plural: **Zweifel haben** |
| der Feiertag, -e | el día festivo | Sustantivo masculino | **Übermorgen ist ein Feiertag.** |
| sich ernähren | alimentarse | Verbo regular reflexivo | **sich gesund ernähren** — alimentarse de forma saludable |
| stattfinden | tener lugar; celebrarse | Verbo irregular separable | **Das Festival findet jährlich statt.** |
| sich verlaufen | perderse | Verbo irregular reflexivo separable | **Ich verlaufe mich in der Stadt.** |
| aufräumen | ordenar; recoger | Verbo regular separable, Akkusativ | **das Zimmer aufräumen** |
| sich beeilen | darse prisa | Verbo regular reflexivo | **Beeil dich!** — ¡Date prisa! |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1. Preguntas temporales

| Pregunta | Significado | Tipo de respuesta | Ejemplo |
| :--- | :--- | :--- | :--- |
| **Wann?** | ¿Cuándo? | Momento | **Wann kommst du? — Morgen.** |
| **Wie lange?** | ¿Cuánto tiempo? | Duración | **Wie lange bleibst du? — Zwei Tage.** |
| **Wie oft?** | ¿Con qué frecuencia? | Frecuencia | **Wie oft trainierst du? — Dreimal pro Woche.** |
| **Bis wann?** | ¿Hasta cuándo? | Límite final | **Bis wann arbeitest du? — Bis 18 Uhr.** |
| **Seit wann?** | ¿Desde cuándo? | Inicio de una situación vigente | **Seit wann lernst du Deutsch? — Seit einem Jahr.** |

- **Regla / Concepto:** **wann** pregunta por un momento; **wie lange**, por una duración; **wie oft**, por la frecuencia.
- **Atención:** **seit wann** se usa cuando la situación comenzó en el pasado y continúa en el presente.

##### 3.2. Posición del adverbio temporal

- **Regla / Concepto:** El adverbio puede aparecer en el campo medio o al principio para destacarlo.
- **Estructura neutra:** `Sujeto + verbo conjugado + adverbio temporal + complemento`
- **Ejemplo:** **Ich lerne heute Deutsch.** — Hoy estudio alemán.
- **Estructura con énfasis temporal:** `Adverbio temporal + verbo conjugado + sujeto + complemento`
- **Ejemplo:** **Heute lerne ich Deutsch.**
- Si el elemento temporal ocupa la posición 1, el verbo sigue en la posición 2 y el sujeto pasa detrás del verbo.

##### 3.3. Diferencia entre bald, gleich y sofort

| Adverbio | Idea principal | Ejemplo |
| :--- | :--- | :--- |
| **bald** | pronto, en un futuro cercano no necesariamente inmediato | **Wir sehen uns bald.** |
| **gleich** | en un momento, dentro de muy poco | **Das Essen ist gleich fertig.** |
| **sofort** | inmediatamente, sin esperar | **Komm sofort!** |

##### 3.4. Diferencia entre schon y gerade

- **schon / bereits** significa **ya** e indica que algo ha sucedido o está completado antes del momento de referencia.
  - **Ich habe die Wohnung schon geputzt.** — Ya he limpiado el piso.
- **gerade** indica que una acción se desarrolla en este momento.
  - **Ich putze gerade die Wohnung.** — Estoy limpiando el piso ahora mismo.

##### 3.5. Gerade y el gerundio español

- **Regla / Concepto:** El alemán no posee un tiempo progresivo equivalente general a «estar + gerundio». En nivel A1, el presente con **gerade** expresa normalmente una acción en curso.
- **Estructura:** `Sujeto + verbo en Präsens + gerade + complemento`
- **Ejemplos:**
  - **Ich fahre gerade.** — Estoy conduciendo ahora mismo.
  - **Ich schaue gerade einen Film.** — Estoy viendo una película.
  - **Ihr macht gerade einen Deutschkurs.** — Actualmente estáis haciendo un curso de alemán.
- Según el contexto, **gerade** puede significar «justo» o «precisamente», pero aquí se estudia su valor temporal.

##### 3.6. Diferencia entre früher y damals

- **früher** compara el pasado con el presente: «antes», «antiguamente».
  - **Früher hatte ich mehr Zeit.** — Antes tenía más tiempo.
- **damals** se refiere a un periodo pasado concreto conocido por el contexto: «en aquel entonces».
  - **Damals wohnte ich in Berlin.** — En aquel entonces vivía en Berlín.

##### 3.7. Diferencia entre neulich e in letzter Zeit

- **neulich** se refiere normalmente a una ocasión reciente y concreta: «hace poco», «el otro día».
  - **Neulich habe ich Anna getroffen.**
- **in letzter Zeit** abarca un periodo reciente que llega hasta el presente: «últimamente».
  - **In letzter Zeit lerne ich viel Deutsch.**

##### 3.8. Escala orientativa de frecuencia

`immer → fast immer → meistens → oft/häufig → manchmal → ab und zu/gelegentlich → selten → fast nie → nie`

- Esta escala es orientativa: la frecuencia exacta depende del contexto.
- **nie / niemals** ya expresan negación; no se añade **nicht**.
- Los adverbios terminados en **-lich**, como **täglich**, **wöchentlich**, **monatlich** y **jährlich**, indican periodicidad.

##### 3.9. Soluciones de los ejercicios (Aufgaben)

1. **In letzter Zeit lerne ich viel Deutsch.**  
   *Últimamente estudio mucho alemán.*  
   **Razón:** se describe un periodo reciente que continúa en el presente.

2. **Morgen wird das Wetter besser als heute.**  
   *Mañana hará mejor tiempo que hoy.*  
   **Razón:** el futuro expresado con **wird** y la comparación con **heute** apuntan a mañana.

3. **Carina ist nicht sehr sportlich und geht fast nie laufen. Nur ab und zu geht sie schwimmen.**  
   *Carina no es muy deportista y casi nunca sale a correr. Solo va a nadar de vez en cuando.*

4. **Johannes ernährt sich sehr gesund und isst meistens Obst und Gemüse.**  
   *Johannes se alimenta de forma muy saludable y come fruta y verdura la mayoría de las veces.*

5. **Ich habe meine Wohnung schon geputzt.**  
   *Ya he limpiado mi piso.*  
   **Razón:** el perfecto indica una acción terminada y **schon** recalca que ya se completó.

6. **Das Essen ist gleich fertig!**  
   *¡La comida estará lista enseguida!*  
   **Razón:** **gleich** anticipa algo que ocurrirá dentro de muy poco; **gerade fertig** no expresa aquí una acción en curso.

7. **Lukas ist ein sehr fauler Student. Er lernt nur selten für die Uni.**  
   *Lukas es un estudiante muy perezoso. Solo estudia raramente para la universidad.*

8. **Ich verstehe die Grammatik fast immer, aber ab und zu habe ich Zweifel.**  
   *Casi siempre entiendo la gramática, pero de vez en cuando tengo dudas.*  
   **Razón:** ambas frecuencias forman un contraste lógico.

9. **„Beeil dich, wir müssen los!“ — „Ja, ich komme sofort!“**  
   *«¡Date prisa, tenemos que irnos!» — «Sí, ¡voy inmediatamente!»*

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Wann kommst du? — Ich komme morgen.**  
> *Traducción:* ¿Cuándo vienes? — Vengo mañana.  
> *Uso:* Preguntar e indicar un momento.

> **Wie oft gehst du ins Fitnessstudio? — Zweimal pro Woche.**  
> *Traducción:* ¿Con qué frecuencia vas al gimnasio? — Dos veces por semana.  
> *Uso:* Hablar de hábitos.

> **Seit wann lernst du Deutsch? — Seit einem Jahr.**  
> *Traducción:* ¿Desde cuándo estudias alemán? — Desde hace un año.  
> *Uso:* Indicar desde cuándo continúa una actividad.

> **Ich bin gerade beschäftigt.**  
> *Traducción:* Ahora mismo estoy ocupado.  
> *Uso:* Explicar que no se está disponible en este momento.

> **Das Essen ist gleich fertig.**  
> *Traducción:* La comida estará lista enseguida.  
> *Uso:* Anunciar que algo ocurrirá dentro de muy poco.

> **Ich komme sofort!**  
> *Traducción:* ¡Voy inmediatamente!  
> *Uso:* Responder a una petición urgente.

> **In letzter Zeit lerne ich viel Deutsch.**  
> *Traducción:* Últimamente estudio mucho alemán.  
> *Uso:* Describir una tendencia reciente.

> **Ab und zu gehen wir ins Kino.**  
> *Traducción:* De vez en cuando vamos al cine.  
> *Uso:* Expresar una actividad ocasional.

#### 5. 💡 Notas de Pronunciación o Errores Comunes

- ⚠️ **morgen / Morgen:** **morgen** con minúscula significa «mañana»; **der Morgen** con mayúscula significa «la mañana».
- ⚠️ **schon / schön:** **schon** significa «ya» y tiene vocal larga /oː/; **schön** significa «bonito» y contiene **ö**.
- ⚠️ **gleich no equivale siempre a bald:** **gleich** suele ser más inmediato que **bald**.
- ⚠️ **sofort** expresa ausencia de espera: no debe traducirse simplemente como «pronto» cuando la intención es «inmediatamente».
- ⚠️ **neulich / in letzter Zeit:** **neulich** suele señalar una ocasión; **in letzter Zeit**, un periodo reciente.
- ⚠️ **nie** ya niega la oración: **Ich esse nie Fleisch**, no *Ich esse nicht nie Fleisch*.
- ⚠️ **seit + presente:** en alemán se usa Präsens para una situación que comenzó antes y continúa: **Ich lerne seit einem Jahr Deutsch.**
- ⚠️ **Posición del verbo:** **Heute ich lerne Deutsch** es incorrecto; debe ser **Heute lerne ich Deutsch**.
- ⚠️ **OCR normalizado:** se corrigió «frecuencia, regularidad o ruina» por «frecuencia, regularidad o rutina».

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: ¿Qué pregunta alemana significa «¿Cuándo?»?
  A: Wann?
  Type: flashcard
- Q: ¿Qué pregunta alemana significa «¿Con qué frecuencia?»?
  A: Wie oft?
  Type: flashcard
- Q: ¿Cómo se dice «¿Desde cuándo?» en alemán?
  A: Seit wann?
  Type: flashcard
- Q: Completa: ____ lerne ich viel Deutsch. (Últimamente)
  A: In letzter Zeit
  Type: fill-in-the-blank
- Q: Completa: ____ wird das Wetter besser als heute. (mañana)
  A: Morgen
  Type: fill-in-the-blank
- Q: Completa: Ich habe meine Wohnung ____ geputzt. (ya)
  A: schon / bereits
  Type: fill-in-the-blank
- Q: Completa: Ich schaue ____ einen Film. (ahora mismo)
  A: gerade
  Type: fill-in-the-blank
- Q: Traduce: La comida estará lista enseguida.
  A: Das Essen ist gleich fertig.
  Type: flashcard
- Q: Traduce: ¡Voy inmediatamente!
  A: Ich komme sofort!
  Type: flashcard
- Q: ¿Cuál expresa mayor inmediatez, bald o sofort?
  A: sofort
  Type: flashcard
- Q: Completa: ____ habe ich in einem Dorf gewohnt. (Antes)
  A: Früher
  Type: fill-in-the-blank
- Q: Completa: ____ hatten wir kein Internet. (En aquel entonces)
  A: Damals
  Type: fill-in-the-blank
- Q: Traduce: anteayer
  A: vorgestern
  Type: flashcard
- Q: Traduce: pasado mañana
  A: übermorgen
  Type: flashcard
- Q: Completa: Carina geht ____ laufen. (casi nunca)
  A: fast nie
  Type: fill-in-the-blank
- Q: Completa: Johannes isst ____ Obst und Gemüse. (la mayoría de las veces)
  A: meistens
  Type: fill-in-the-blank
- Q: Traduce: de vez en cuando
  A: ab und zu / gelegentlich
  Type: flashcard
- Q: Ordena por frecuencia, de mayor a menor: nie, immer, manchmal.
  A: immer → manchmal → nie
  Type: ordering
- Q: Completa: Stefan geht ____ ins Fitnessstudio. (diariamente)
  A: täglich
  Type: fill-in-the-blank
- Q: Traduce: El festival se celebra anualmente.
  A: Das Festival findet jährlich statt.
  Type: flashcard
- Q: Corrige: Heute ich lerne Deutsch.
  A: Heute lerne ich Deutsch.
  Type: correction
- Q: ¿Qué adverbio suele referirse a una ocasión reciente concreta: neulich o in letzter Zeit?
  A: neulich
  Type: multiple-choice
- Q: Completa: Ich esse ____ Fleisch. (nunca)
  A: nie / niemals
  Type: fill-in-the-blank
- Q: Traduce: Desde hace un año estudio alemán.
  A: Ich lerne seit einem Jahr Deutsch.
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 27 — Adverbios de causa y repaso general de adverbios

*Nivel orientativo:* **A2/B1** · *Alcance A1 de esta app:* 📚

---
class_id: 027
title: "Adverbios de causa y repaso general de adverbios"
level: "B1"
topics: ["Gramática", "Vocabulario", "Expresiones", "Adverbios causales", "Repaso de adverbios"]
target_exam: "Telc / Goethe B1"
---

### Adverbios de causa y repaso general de adverbios

#### 1. 🎯 Resumen / Objetivos de la Lección
- Preguntar por una causa mediante **warum?**, **wieso?** y **weshalb?**.
- Expresar consecuencia con **also**, **darum**, **deshalb**, **deswegen**, **dadurch** y **somit**.
- Expresar una consecuencia contraria a lo esperado mediante **trotzdem**.
- Mantener el verbo conjugado en la posición 2 cuando un adverbio ocupa la primera posición.
- Diferenciar conectores causales, consecutivos y concesivos.
- Repasar adverbios de lugar, tiempo, frecuencia, modo y valoración.
- Resolver y traducir los ejercicios de los PDF 060 y 061.

#### 2. 📚 Vocabulario Clave (Wortschatz)

##### Preguntas por la causa o la condición

| Alemán | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| warum? | ¿por qué? | Adverbio interrogativo | Es la forma más frecuente. |
| wieso? | ¿por qué?; ¿cómo es que...? | Adverbio interrogativo | Muy habitual en el lenguaje cotidiano. |
| weshalb? | ¿por qué?; ¿por qué motivo? | Adverbio interrogativo | Algo más formal que **warum**. |
| unter welcher Bedingung? | ¿bajo qué condición? | Expresión interrogativa | **die Bedingung, -en** = la condición. |

##### Adverbios de causa, consecuencia y contraste

| Alemán | Español | Relación | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| also | así que; entonces; por tanto | Consecuencia | **Claudia will abnehmen, also ernährt sie sich gesund.** |
| darum | por eso; por ese motivo | Consecuencia causal | **Ich bin krank. Darum bleibe ich zu Hause.** |
| deshalb | por eso; por ese motivo | Consecuencia causal | **Ich möchte in Deutschland studieren. Deshalb nehme ich Deutschunterricht.** |
| deswegen | por eso; por ese motivo | Consecuencia causal | Es prácticamente sinónimo de **darum** y **deshalb**. |
| dadurch | de esta manera; haciendo eso; por ello | Medio o causa que produce un resultado | **Ich lese täglich deutsche Artikel. Dadurch verbessert sich mein Deutsch.** |
| somit | por lo tanto; por consiguiente | Consecuencia lógica | Más frecuente en registros formales o escritos. |
| trotzdem | sin embargo; aun así; no obstante | Contraste concesivo | **Sandra ist müde. Trotzdem geht sie zur Party.** |

##### Adverbios del ejercicio general

| Alemán | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| gestern | ayer | Tiempo | **Gestern wollte ich meinen Freund anrufen.** |
| meistens | la mayoría de las veces; normalmente | Frecuencia | **wo ich es meistens hinlege** |
| manchmal | a veces | Frecuencia | **manchmal auch in der Küche** |
| fast | casi | Grado | **fast wahnsinnig** — casi loco/a |
| wirklich | realmente | Modo / valoración | **wirklich verloren** — perdido de verdad |
| hoffentlich | ojalá; esperemos que | Modal / valoración | Expresa esperanza. |
| überall | en todas partes | Lugar | **überall im Haus** |
| nirgendwo | en ninguna parte | Lugar con valor negativo | No requiere **nicht** adicional. |
| irgendwo | en alguna parte | Lugar indefinido | **Es muss irgendwo sein.** |
| oben | arriba; encima | Lugar | **oben auf dem Nachttisch** |
| unten | abajo | Lugar | **unten auf der Mülltonne** según la perspectiva del relato. |
| hinten | atrás; al fondo | Lugar | **ganz hinten im Hof** |
| links | a la izquierda | Lugar / dirección | **links und rechts** |
| rechts | a la derecha | Lugar / dirección | **links und rechts** |
| draußen | fuera; en el exterior | Lugar | **draußen im Hauseingang** |
| da | ahí; allí | Lugar | Cercanía o referencia ya conocida. |
| dort | allí | Lugar | Suele señalar un lugar algo más distante. |
| wo | donde; ¿dónde? | Adverbio relativo / interrogativo | **das Schlafzimmer, wo ich es hinlege** |

##### Sustantivos y verbos útiles

| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Grund, Gründe | el motivo; la razón | Sustantivo masculino | **aus diesem Grund** — por este motivo |
| die Ursache, -n | la causa | Sustantivo femenino | Causa que origina un efecto. |
| die Bedingung, -en | la condición | Sustantivo femenino | **unter einer Bedingung** |
| die Folge, -n | la consecuencia | Sustantivo femenino | **zur Folge haben** |
| das Problem, -e | el problema | Sustantivo neutro | **ein Problem lösen** |
| der Arzt, Ärzte | el médico | Sustantivo masculino | **zum Arzt gehen** |
| die Ärztin, -nen | la médica | Sustantivo femenino | **zur Ärztin gehen** |
| die Party, -s | la fiesta | Sustantivo femenino | **zu einer Party gehen** |
| der Marathon, -s | el maratón | Sustantivo masculino | **einen Marathon laufen** |
| das Handy, -s | el teléfono móvil | Sustantivo neutro | **das Handy suchen** |
| der Nachttisch, -e | la mesita de noche | Sustantivo masculino | **auf dem Nachttisch** |
| der Hauseingang, Hauseingänge | la entrada del edificio / de la casa | Sustantivo masculino | **im Hauseingang** |
| der Hof, Höfe | el patio | Sustantivo masculino | **hinten im Hof** |
| die Mülltonne, -n | el cubo / contenedor de basura | Sustantivo femenino | **auf der Mülltonne** |
| sich beschweren | quejarse | Verbo irregular reflexivo | **sich über etwas beschweren** + Akkusativ |
| lösen | resolver | Verbo regular, Akkusativ | **das Problem lösen** |
| abnehmen | adelgazar; perder peso | Verbo irregular separable | **Claudia will abnehmen.** |
| sich ernähren | alimentarse | Verbo regular reflexivo | **sich gesund ernähren** |
| verbessern | mejorar algo | Verbo regular, Akkusativ | **mein Deutsch verbessern** |
| sich verbessern | mejorar | Verbo regular reflexivo | **Mein Deutsch verbessert sich.** |
| absagen | cancelar | Verbo regular separable, Akkusativ | **den Urlaub absagen** |
| hinlegen | poner; dejar tumbado | Verbo regular separable, Akkusativ | **das Handy hinlegen** |
| hingehen | ir allí | Verbo irregular separable | **Wie ist es dort hingekommen?** usa **hinkommen**. |
| hinkommen | llegar allí | Verbo irregular separable | Perfecto: **ist hingekommen**. |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1. Preguntar por la causa

- **warum?**, **wieso?** y **weshalb?** significan esencialmente «¿por qué?».
- **warum** es la variante más neutra y frecuente.
- **wieso** es muy común en la conversación y puede transmitir sorpresa: «¿cómo es que...?».
- **weshalb** es algo más formal y equivale a «¿por qué motivo?».

| Pregunta | Respuesta posible |
| :--- | :--- |
| **Warum bleibst du zu Hause?** | **Weil ich krank bin.** |
| **Wieso lernst du Deutsch?** | **Ich möchte in Deutschland studieren.** |
| **Weshalb gehst du zum Arzt?** | **Ich fühle mich krank.** |

##### 3.2. Los adverbios conectores ocupan una posición

- **Regla / Concepto:** **also**, **darum**, **deshalb**, **deswegen**, **dadurch**, **somit** y **trotzdem** son adverbios conectores. Si aparecen al principio de la oración, ocupan la posición 1.
- **Estructura:** `Oración 1. Adverbio conector + verbo conjugado + sujeto + complementos.`
- **Ejemplo:** **Ich bin krank. Deshalb bleibe ich zu Hause.**
- También pueden unir dos oraciones separadas por coma:
  - **Ich bin krank, deshalb bleibe ich zu Hause.**
- El verbo conjugado va inmediatamente después del conector.

| Correcto | Incorrecto |
| :--- | :--- |
| **Deshalb gehe ich zum Arzt.** | *Deshalb ich gehe zum Arzt.* |
| **Trotzdem wollen die Kinder rausgehen.** | *Trotzdem die Kinder wollen rausgehen.* |

##### 3.3. Darum, deshalb y deswegen

- Los tres expresan una consecuencia motivada por lo dicho anteriormente.
- En nivel A1 pueden tratarse como sinónimos:
  - **Es regnet. Darum bleiben wir zu Hause.**
  - **Es regnet. Deshalb bleiben wir zu Hause.**
  - **Es regnet. Deswegen bleiben wir zu Hause.**
- Traducción habitual: «por eso», «por ese motivo».

##### 3.4. Also

- Como conector, **also** expresa una conclusión o consecuencia: «así que», «entonces».
  - **Martin fühlt sich krank, also geht er zum Arzt.**
- En la conversación también funciona como marcador discursivo o muletilla:
  - **Also, ich weiß nicht ...** — Pues / Bueno, no sé...
- En ese uso introductorio no expresa necesariamente una consecuencia.

##### 3.5. Dadurch

- **dadurch** señala el medio, la acción o la circunstancia que produce un resultado.
- Puede traducirse como «de esta manera», «haciendo eso» o «por ello».
- **Estructura:** `Acción o circunstancia. Dadurch + resultado.`
- **Ejemplo:** **Sie übt jeden Tag. Dadurch spricht sie besser Deutsch.**
- No debe confundirse con **deshalb**:
  - **deshalb** = esa es la razón de la consecuencia;
  - **dadurch** = ese medio o hecho provoca el resultado.

##### 3.6. Somit

- **somit** introduce una conclusión lógica: «por lo tanto», «por consiguiente».
- Es correcto en el habla, pero resulta más formal que **also**, **darum** o **deshalb**.
- **Ejemplo:** **Es gibt keine Plätze mehr. Somit können wir nicht mitfahren.**

##### 3.7. Trotzdem

- **trotzdem** no presenta una causa, sino un resultado contrario a lo esperado.
- **Estructura:** `Situación que crea una expectativa. Trotzdem + verbo + sujeto + resultado contrario.`
- **Ejemplo:** **Es regnet. Trotzdem wollen die Kinder rausgehen.**
- Traducción: «sin embargo», «aun así», «no obstante».

##### 3.8. Adverbio conector frente a weil

| Forma | Tipo | Posición verbal | Ejemplo |
| :--- | :--- | :--- | :--- |
| deshalb / darum / deswegen | Adverbio conector | Verbo en posición 2 | **Ich bin krank. Deshalb bleibe ich zu Hause.** |
| weil | Conjunción subordinante | Verbo al final | **Ich bleibe zu Hause, weil ich krank bin.** |

- Ambas construcciones relacionan causa y consecuencia, pero enfocan información distinta:
  - **Warum bleibst du zu Hause? — Weil ich krank bin.**
  - **Ich bin krank. Deshalb bleibe ich zu Hause.**

##### 3.9. Soluciones: adverbios causales (PDF 060)

1. **Martin fühlt sich krank, also geht er zum Arzt.**  
   *Martin se siente enfermo, así que va al médico.*

2. **Gestern Abend hatte ich viel Arbeit, deshalb bin ich nicht zur Party gegangen.**  
   *Anoche tenía mucho trabajo, por eso no fui a la fiesta.*  
   También son posibles **darum** y **deswegen**.

3. **Es regnet. Trotzdem wollen die Kinder rausgehen.**  
   *Está lloviendo. Sin embargo, los niños quieren salir.*

4. **Hör auf, dich zu beschweren! Dadurch wird das Problem nicht gelöst.**  
   *¡Deja de quejarte! Haciendo eso no se resolverá el problema.*  
   Alternativa más coloquial: **So wird das Problem nicht gelöst.**

5. **Er will einen Marathon laufen, deshalb trainiert er viel.**  
   *Quiere correr un maratón, por eso entrena mucho.*  
   También es natural: **Er will einen Marathon laufen, also trainiert er viel.**

##### 3.10. Solución: ejercicio general de adverbios (PDF 061)

> **Gestern** wollte ich meinen Freund anrufen, **also** habe ich mein Handy gesucht. Zuerst bin ich ins Schlafzimmer gegangen, **wo** ich es **meistens** hinlege. Normalerweise liegt es **oben** auf dem Nachttisch, **manchmal** auch in der Küche, aber **da** war es nicht. Ich habe es **überall** im Haus gesucht, im Bad, im Wohnzimmer und sogar **draußen** im Hauseingang, aber ich konnte es **nirgendwo** finden.
>
> Dann habe ich in allen Ecken, **links** und **rechts** geschaut. Ich bin **fast** wahnsinnig geworden! **Trotzdem** wusste ich, dass es **irgendwo** sein musste. Ich dachte: „**Hoffentlich** habe ich es nicht **wirklich** verloren!“, also bin ich vor die Tür gegangen.
>
> Ganz **hinten** im Hof habe ich es gefunden. Meine Katze saß **unten** auf der Mülltonne und spielte damit. Ich war **sehr** erleichtert, aber ich weiß immer noch nicht, wie es **dort** hingekommen ist! Sehr seltsam ...

**Traducción:**

> Ayer quería llamar a mi novio, así que busqué mi teléfono móvil. Primero fui al dormitorio, donde lo dejo la mayoría de las veces. Normalmente está arriba, sobre la mesita de noche, y a veces también en la cocina, pero allí no estaba. Lo busqué por todas partes de la casa: en el baño, en el salón e incluso fuera, en la entrada, pero no pude encontrarlo en ninguna parte.
>
> Después miré en todos los rincones, a izquierda y derecha. ¡Casi me volví loca! Aun así, sabía que tenía que estar en alguna parte. Pensé: «¡Ojalá no lo haya perdido de verdad!», así que salí por la puerta.
>
> Lo encontré al fondo del patio. Mi gata estaba abajo, sentada sobre el contenedor de basura, y jugaba con él. Me sentí muy aliviada, pero todavía no sé cómo llegó allí. Muy extraño...

**Distribución de las 21 opciones:**

| Nº | Respuesta | Nº | Respuesta | Nº | Respuesta |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | gestern | 8 | überall | 15 | irgendwo |
| 2 | also | 9 | draußen | 16 | hoffentlich |
| 3 | wo | 10 | nirgendwo | 17 | wirklich |
| 4 | meistens | 11 | links | 18 | hinten |
| 5 | oben | 12 | rechts | 19 | unten |
| 6 | manchmal | 13 | fast | 20 | sehr |
| 7 | da | 14 | trotzdem | 21 | dort |

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Warum lernst du Deutsch?**  
> *Traducción:* ¿Por qué estudias alemán?  
> *Uso:* Preguntar por una causa o motivación.

> **Ich bin krank. Deshalb bleibe ich zu Hause.**  
> *Traducción:* Estoy enfermo. Por eso me quedo en casa.  
> *Uso:* Presentar una consecuencia.

> **Es regnet. Trotzdem gehen wir spazieren.**  
> *Traducción:* Llueve. Aun así, vamos a pasear.  
> *Uso:* Expresar un resultado contrario a lo esperado.

> **Also, ich weiß nicht ...**  
> *Traducción:* Bueno / Pues, no sé...  
> *Uso:* Ganar tiempo o expresar duda en una conversación.

> **Hör auf, dich zu beschweren!**  
> *Traducción:* ¡Deja de quejarte!  
> *Uso:* Pedir a alguien que deje de protestar.

> **Hoffentlich habe ich es nicht verloren!**  
> *Traducción:* ¡Ojalá no lo haya perdido!  
> *Uso:* Expresar esperanza o preocupación.

> **Ich konnte es nirgendwo finden.**  
> *Traducción:* No pude encontrarlo en ninguna parte.  
> *Uso:* Expresar ausencia total de un lugar.

#### 5. 💡 Notas de Pronunciación o Errores Comunes

- ⚠️ **Verbo en posición 2:** se dice **Deshalb gehe ich**, no *Deshalb ich gehe*.
- ⚠️ **Trotzdem no significa «por eso»:** expresa contraste, no una consecuencia esperable.
- ⚠️ **weil cambia la posición verbal:** **weil ich krank bin**, pero **deshalb bin ich...**
- ⚠️ **also tiene dos usos:** puede significar «así que» o funcionar como «bueno / pues» al comenzar una intervención.
- ⚠️ **wieso** se escribe con una sola palabra.
- ⚠️ **deshalb** contiene **-halb**; no debe confundirse con **weshalb**, que es interrogativo.
- ⚠️ **nirgendwo** ya tiene valor negativo: **Ich finde es nirgendwo**, sin añadir **nicht**.
- ⚠️ **da / dort:** ambos pueden significar «allí»; **dort** suele ser más explícito o distante.
- ⚠️ **Corrección del ejercicio general:** la solución original omite el hueco después de **Meine Katze saß** y deja **unten** sin usar. Se normalizó como **Meine Katze saß unten auf der Mülltonne**, de modo que las 21 opciones se emplean una sola vez.
- ⚠️ **OCR y tipografía:** se corrigieron signos de interrogación, comillas, Umlauts y el error español **osea** por **o sea**.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: ¿Cuál es el adverbio interrogativo más frecuente para preguntar «por qué»?
  A: warum
  Type: flashcard
- Q: Traduce: ¿Por qué estudias alemán?
  A: Warum lernst du Deutsch?
  Type: flashcard
- Q: Completa: Ich bin krank. ____ bleibe ich zu Hause. (por eso)
  A: Deshalb / Darum / Deswegen
  Type: fill-in-the-blank
- Q: Corrige: Deshalb ich gehe zum Arzt.
  A: Deshalb gehe ich zum Arzt.
  Type: correction
- Q: Traduce: Está lloviendo. Sin embargo, los niños quieren salir.
  A: Es regnet. Trotzdem wollen die Kinder rausgehen.
  Type: flashcard
- Q: ¿Qué expresa trotzdem: causa, consecuencia esperable o contraste?
  A: contraste
  Type: multiple-choice
- Q: Completa: Claudia will abnehmen, ____ ernährt sie sich gesund.
  A: also
  Type: fill-in-the-blank
- Q: ¿Qué conector significa «de esta manera / haciendo eso»?
  A: dadurch
  Type: flashcard
- Q: Traduce: Por consiguiente, tenemos que cancelar las vacaciones.
  A: Somit müssen wir unseren Urlaub absagen.
  Type: flashcard
- Q: Completa con el orden correcto: Deshalb ____ ich Deutschunterricht. (nehmen)
  A: nehme
  Type: fill-in-the-blank
- Q: ¿Dónde se coloca el verbo en una subordinada introducida por weil?
  A: Al final de la subordinada.
  Type: flashcard
- Q: Completa: Ich bleibe zu Hause, weil ich krank ____.
  A: bin
  Type: fill-in-the-blank
- Q: Traduce: Ayer quería llamar a mi novio.
  A: Gestern wollte ich meinen Freund anrufen.
  Type: flashcard
- Q: Completa: Ich habe mein Handy ____ im Haus gesucht. (en todas partes)
  A: überall
  Type: fill-in-the-blank
- Q: Completa: Ich konnte es ____ finden. (en ninguna parte)
  A: nirgendwo
  Type: fill-in-the-blank
- Q: Completa: Es muss ____ sein. (en alguna parte)
  A: irgendwo
  Type: fill-in-the-blank
- Q: Traduce: Ojalá no lo haya perdido de verdad.
  A: Hoffentlich habe ich es nicht wirklich verloren.
  Type: flashcard
- Q: Completa: Ich bin ____ wahnsinnig geworden. (casi)
  A: fast
  Type: fill-in-the-blank
- Q: Completa: Ganz ____ im Hof habe ich es gefunden. (al fondo)
  A: hinten
  Type: fill-in-the-blank
- Q: ¿Qué adverbio faltaba en la solución impresa después de Meine Katze saß?
  A: unten
  Type: flashcard
- Q: Traduce: Deja de quejarte.
  A: Hör auf, dich zu beschweren.
  Type: flashcard
- Q: Completa: Dadurch ____ sich mein Deutsch. (verbessern)
  A: verbessert
  Type: fill-in-the-blank
- Q: ¿Qué forma es más formal para «por consiguiente»: also o somit?
  A: somit
  Type: multiple-choice
- Q: Ordena: deshalb / ich / zum Arzt / gehe
  A: Deshalb gehe ich zum Arzt.
  Type: ordering
<!-- DATA_QUIZ_END -->


---


### Unidad 28 — Adverbios modales (Modaladverbien)

*Nivel orientativo:* **A2/B1** · *Alcance A1 de esta app:* 📚

---
class_id: 028
title: "Adverbios modales"
level: "B1"
topics: ["Gramática", "Vocabulario", "Expresiones", "Adverbios modales", "Cantidad e intensidad"]
target_exam: "Telc / Goethe B1"
---

### Adverbios modales (Modaladverbien)

#### 1. 🎯 Resumen / Objetivos de la Lección
- Identificar adverbios que expresan modo, cantidad, intensidad, valoración y probabilidad.
- Formular preguntas con **wie?**, **wie sehr?**, **wie viel?** y **wie viele?**.
- Diferenciar cantidades contables e incontables.
- Comparar mediante **anders als** y **genauso ... wie**.
- Distinguir **fast / beinahe**, **kaum** y **genug**.
- Expresar gusto con **gern / gerne**.
- Expresar esperanza, posibilidad y probabilidad mediante **hoffentlich**, **vielleicht**, **möglicherweise** y **wahrscheinlich**.
- Resolver y justificar todos los ejercicios del PDF 063.

#### 2. 📚 Vocabulario Clave (Wortschatz)

##### Adverbios modales principales

| Alemán | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| anders (als) | de otra manera; diferente (de) | Modo / comparación | **Oft kommt alles anders als erwartet.** — Muchas veces todo sale de forma diferente a lo esperado. |
| besonders | especialmente; particularmente | Intensidad / focalización | **Hier kann man besonders günstig essen.** — Aquí se puede comer especialmente barato. |
| fast / beinahe | casi | Grado | **Beinahe habe ich den Zug verpasst.** — Casi perdí el tren. |
| ganz | completamente; del todo; muy | Grado | **Die Situation war ganz anders.** — La situación era completamente diferente. |
| genauso | exactamente igual; de la misma manera | Igualdad | **Ich mache es genauso wie mein Kollege.** |
| genug | suficiente; suficientemente | Cantidad / grado | **Hast du genug gegessen?** — ¿Has comido lo suficiente? |
| gern / gerne | de buena gana; con gusto | Preferencia | **Ich helfe dir gerne.** — Te ayudo con gusto. |
| hoffentlich | esperemos que; ojalá | Esperanza | **Hoffentlich kannst du kommen!** |
| kaum | apenas; casi no | Grado bajo | **Ich habe kaum Geld.** — Apenas tengo dinero. |
| leider | lamentablemente; por desgracia | Valoración | **Leider kann ich heute nicht kommen.** |
| möglicherweise | posiblemente | Posibilidad | **Möglicherweise wird alles anders.** |
| sehr | muy; mucho | Intensidad | **Das Buch ist sehr spannend.** |
| vielleicht | quizá; tal vez | Posibilidad | **Vielleicht machen wir einen Ausflug.** |
| wahrscheinlich | probablemente | Probabilidad | **Wahrscheinlich muss ich arbeiten.** |
| wirklich | realmente; de verdad | Confirmación / intensidad | **Glaubst du das wirklich?** |

##### Preguntas sobre modo, cantidad e intensidad

| Alemán | Español | Uso | Ejemplo |
| :--- | :--- | :--- | :--- |
| wie? | ¿cómo?; ¿de qué modo? | Manera o cualidad | **Wie lernst du Deutsch?** |
| wie sehr? | ¿cuánto?; ¿en qué grado? | Intensidad sin contar unidades | **Wie sehr willst du das?** |
| wie viel? | ¿cuánto? | Cantidad incontable o cantidad en general | **Wie viel Zeit hast du?** |
| wie viele? | ¿cuántos/as? | Sustantivo contable en plural | **Wie viele Zimmer hat deine Wohnung?** |

##### Sustantivos y verbos útiles

| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Arbeitskollege, -n | el compañero de trabajo | Sustantivo masculino, N-Deklination | Acusativo: **meinen Arbeitskollegen** |
| die Arbeitskollegin, -nen | la compañera de trabajo | Sustantivo femenino | Plural: **die Arbeitskolleginnen** |
| das Wochenende, -n | el fin de semana | Sustantivo neutro | **am Wochenende** |
| die Nachricht, -en | la noticia; el mensaje | Sustantivo femenino | **schlechte Nachrichten** |
| das Konzert, -e | el concierto | Sustantivo neutro | **ein Konzert verpassen** |
| das Gespräch, -e | la conversación | Sustantivo neutro | **ein Gespräch führen** |
| der Wetterbericht, -e | el pronóstico del tiempo | Sustantivo masculino | **Der Wetterbericht sieht gut aus.** |
| das Geld | el dinero | Sustantivo neutro sin plural habitual | **genug Geld zum Leben** |
| die Sehenswürdigkeit, -en | el lugar de interés / monumento | Sustantivo femenino | **Sehenswürdigkeiten besichtigen** |
| der Zug, Züge | el tren | Sustantivo masculino | **den Zug verpassen** |
| verpassen | perder; no alcanzar | Verbo regular, Akkusativ | **das Konzert / den Zug verpassen** |
| verdienen | ganar; cobrar | Verbo irregular, Akkusativ | **Geld verdienen** |
| führen | llevar; mantener | Verbo regular, Akkusativ | **ein Gespräch führen** |
| besichtigen | visitar | Verbo regular, Akkusativ | Para monumentos y lugares de interés. |
| gefallen | gustar | Verbo irregular, Dativ | **Deutschland gefällt mir.** |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1. Función de los adverbios modales

- **Regla / Concepto:** Los adverbios modales describen cómo se realiza una acción o precisan su intensidad, cantidad, probabilidad o valoración.
- Son invariables: no cambian según género, número o caso.
- **Estructura frecuente:** `Sujeto + verbo conjugado + adverbio modal + complemento`
- **Ejemplos:**
  - **Mein Vater spricht kaum Englisch.**
  - **Ich helfe dir gerne.**
  - **Das Buch ist sehr spannend.**

##### 3.2. Wie sehr, wie viel y wie viele

| Forma | Se usa con | Ejemplo | Traducción |
| :--- | :--- | :--- | :--- |
| **wie sehr** | Intensidad de un sentimiento, deseo o acción | **Wie sehr willst du das?** | ¿Cuánto deseas eso? |
| **wie viel** | Sustantivo incontable o cantidad no dividida en unidades | **Wie viel Zeit hast du?** | ¿Cuánto tiempo tienes? |
| **wie viele** | Sustantivo contable en plural | **Wie viele Zimmer hat die Wohnung?** | ¿Cuántas habitaciones tiene el piso? |

- **viel** no lleva terminación delante de un sustantivo incontable en esta construcción.
- **viele** concuerda aquí con un sustantivo plural contable.

##### 3.3. Anders als

- **anders** significa «de otra manera» o «diferente».
- Para comparar dos elementos diferentes se usa **anders als**.
- **Estructura:** `A + verbo + anders als + B`
- **Ejemplo:** **Das mexikanische Spanisch ist anders als das kastilische Spanisch.**
- No se usa **wie** en una comparación de desigualdad estándar.

##### 3.4. Genauso ... wie

- **genauso** expresa igualdad: «exactamente igual», «de la misma manera».
- **Estructura de modo:** `genauso + wie`
  - **Ich mache es genauso wie mein Kollege.**
- **Estructura de cantidad:** `genauso + viel/viele + wie`
  - **Matthias kocht genauso viel wie seine Freundin.**
- **Estructura con adjetivo o adverbio:** `genauso + adjetivo/adverbio + wie`
  - **Deutschland gefällt mir genauso gut wie Österreich.**

##### 3.5. Fast / beinahe y kaum

| Forma | Significado | Idea |
| :--- | :--- | :--- |
| **fast / beinahe** | casi | Falta poco para alcanzar un punto. |
| **kaum** | apenas; casi no | Existe una cantidad o frecuencia mínima. |

- **Fast alle Kollegen sind nett.** — Casi todos los compañeros son simpáticos.
- **Ich habe kaum Geld.** — Apenas tengo dinero.
- **Herr Schmidt verdient kaum genug Geld zum Leben.** — El señor Schmidt apenas gana suficiente dinero para vivir.
- **beinahe** y **fast** suelen ser intercambiables con el sentido de «casi», aunque **fast** es más frecuente en el habla cotidiana.

##### 3.6. Genug

- **genug** significa «suficiente» o «lo suficiente».
- Después de un verbo, funciona como adverbio:
  - **Du lernst nicht genug.**
- Delante de un sustantivo, suele aparecer sin terminación:
  - **Ich habe genug Zeit.**
  - **Er verdient genug Geld.**
- Con un adjetivo o adverbio, aparece después:
  - **Das Zimmer ist groß genug.**

##### 3.7. Gern / gerne

- **gern** y **gerne** son equivalentes.
- Expresan que se realiza una acción con gusto.
- **Estructura:** `Sujeto + verbo + gern/gerne + complemento`
- **Ejemplo:** **Elena singt sehr gerne.** — A Elena le gusta mucho cantar.
- Con **mögen**, se expresa preferencia por un sustantivo; con **gern**, preferencia por una acción:
  - **Ich mag Musik.**
  - **Ich höre gern Musik.**

##### 3.8. Hoffentlich

- **hoffentlich** expresa una esperanza considerada posible o realista.
- Puede ocupar la posición 1:
  - **Hoffentlich kannst du dieses Wochenende kommen!**
- El verbo continúa en posición 2.
- No exige una forma especial equivalente al subjuntivo español.
- Para deseos irreales o contrarios a la realidad se necesitan estructuras más avanzadas con **Konjunktiv II**, fuera del alcance principal de esta lección A1.

##### 3.9. Posibilidad y probabilidad

| Adverbio | Significado | Grado orientativo |
| :--- | :--- | :--- |
| **vielleicht** | quizá; tal vez | Posibilidad abierta |
| **möglicherweise** | posiblemente | Posibilidad, registro algo más formal |
| **wahrscheinlich** | probablemente | Probabilidad alta |

- Si el pronóstico es muy bueno, resulta lógico decir:
  - **Wahrscheinlich wird es morgen sehr sonnig.**

##### 3.10. Leider y wirklich

- **leider** expresa una valoración negativa del hablante:
  - **Leider haben wir schlechte Nachrichten.**
- **wirklich** refuerza que algo es verdadero o real:
  - **Glaubst du das wirklich?**
- **wirklich** también puede intensificar un adjetivo:
  - **Das ist wirklich interessant.**

##### 3.11. Soluciones: traducción (PDF 063)

1. **Fast alle meine Arbeitskollegen sind sehr nett.**  
   *Casi todos mis compañeros de trabajo son muy simpáticos.*  
   También es posible **sympathisch**, pero **nett** es muy natural para describir a una persona amable.

2. **Hoffentlich kannst du dieses Wochenende kommen!**  
   *¡Ojalá puedas venir este finde!*

3. **Das mexikanische Spanisch ist anders als das kastilische Spanisch.**  
   *El español de México es diferente del español castellano.*  
   Alternativa: **Das Spanisch in Mexiko ist anders als das Spanisch in Spanien.**

4. **Leider haben wir schlechte Nachrichten.**  
   *Lamentablemente, tenemos malas noticias.*

5. **Mein Vater spricht kaum Englisch.**  
   *Mi padre apenas habla inglés.*

6. **Meine Tochter lernt nie genug für die Schule.**  
   *Mi hija nunca estudia lo suficiente para la escuela.*

##### 3.12. Soluciones: elección correcta (PDF 063)

1. **Leider habe ich das Konzert verpasst!**  
   *¡Lamentablemente, me perdí el concierto!*  
   **Razón:** perder el concierto es un hecho negativo; **hoffentlich** expresaría una esperanza.

2. **Ich habe noch nicht genug Deutsch gelernt, um ein längeres Gespräch zu führen.**  
   *Todavía no he aprendido suficiente alemán para mantener una conversación más larga.*  
   **Razón:** se habla de una cantidad insuficiente de aprendizaje.

3. **Matthias kocht genauso viel wie seine Freundin.**  
   *Matthias cocina tanto como su novia.*  
   **Razón:** la estructura de igualdad cuantitativa es **genauso viel wie**.

4. **Herr Schmidt verdient in seinem Job kaum genug Geld zum Leben.**  
   *El señor Schmidt apenas gana suficiente dinero para vivir.*  
   **Razón:** **kaum genug** significa que alcanza por muy poco o casi no alcanza.

5. **Der Wetterbericht sieht sehr gut aus. Wahrscheinlich wird es morgen sehr sonnig.**  
   *El pronóstico del tiempo tiene muy buena pinta. Probablemente mañana estará muy soleado.*  
   **Razón:** un pronóstico favorable aporta una probabilidad alta, no una mera posibilidad.

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Wie viel Zeit hast du?**  
> *Traducción:* ¿Cuánto tiempo tienes?  
> *Uso:* Preguntar por una cantidad incontable.

> **Wie viele Zimmer hat deine Wohnung?**  
> *Traducción:* ¿Cuántas habitaciones tiene tu piso?  
> *Uso:* Preguntar por elementos contables.

> **Ich helfe dir gerne.**  
> *Traducción:* Te ayudo con gusto.  
> *Uso:* Ofrecer ayuda amablemente.

> **Hoffentlich kannst du kommen!**  
> *Traducción:* ¡Ojalá puedas venir!  
> *Uso:* Expresar una esperanza realista.

> **Leider kann ich heute nicht kommen.**  
> *Traducción:* Por desgracia, hoy no puedo venir.  
> *Uso:* Comunicar una noticia negativa.

> **Glaubst du das wirklich?**  
> *Traducción:* ¿Realmente crees eso?  
> *Uso:* Pedir confirmación o mostrar sorpresa.

> **Vielleicht machen wir am Wochenende einen Ausflug.**  
> *Traducción:* Quizá hagamos una excursión el fin de semana.  
> *Uso:* Expresar una posibilidad.

#### 5. 💡 Notas de Pronunciación o Errores Comunes

- ⚠️ **wie viel / wie viele:** usa **wie viel** con incontables y **wie viele** con plurales contables.
- ⚠️ **anders als:** para una diferencia se usa **als**, no **wie**.
- ⚠️ **genauso ... wie:** para igualdad se usa **wie**, no **als**.
- ⚠️ **Ortografía normalizada:** en la comparación «tanto como», se escribe **genauso viel wie**. La forma separada **genau so** se reserva normalmente para cuando **genau** enfatiza de manera independiente «exactamente así».
- ⚠️ **kaum no es fast:** **kaum** equivale a «apenas»; **fast**, a «casi».
- ⚠️ **genug cambia de posición:** **genug Zeit**, pero **groß genug**.
- ⚠️ **gern / gerne:** ambas formas son correctas y no cambian el significado.
- ⚠️ **hoffentlich:** expresa una esperanza posible; los deseos irreales requieren otra construcción.
- ⚠️ **wahrscheinlich** indica más probabilidad que **vielleicht**.
- ⚠️ **OCR normalizado:** se corrigieron signos, Umlauts y el error español **osea** por **o sea**.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: ¿Qué pregunta se usa con sustantivos contables en plural?
  A: Wie viele?
  Type: flashcard
- Q: Completa: Wie ____ Zeit hast du?
  A: viel
  Type: fill-in-the-blank
- Q: Completa: Wie ____ Zimmer hat deine Wohnung?
  A: viele
  Type: fill-in-the-blank
- Q: Traduce: Casi todos mis compañeros de trabajo son muy simpáticos.
  A: Fast alle meine Arbeitskollegen sind sehr nett.
  Type: flashcard
- Q: Completa: Das mexikanische Spanisch ist anders ____ das kastilische Spanisch.
  A: als
  Type: fill-in-the-blank
- Q: Completa: Matthias kocht genauso viel ____ seine Freundin.
  A: wie
  Type: fill-in-the-blank
- Q: Corrige: Matthias kocht genauso viel als seine Freundin.
  A: Matthias kocht genauso viel wie seine Freundin.
  Type: correction
- Q: Traduce: Mi padre apenas habla inglés.
  A: Mein Vater spricht kaum Englisch.
  Type: flashcard
- Q: ¿Qué significa kaum?
  A: apenas / casi no
  Type: flashcard
- Q: Completa: Hast du ____ gegessen? (lo suficiente)
  A: genug
  Type: fill-in-the-blank
- Q: Completa: Das Zimmer ist groß ____. (suficientemente grande)
  A: genug
  Type: fill-in-the-blank
- Q: Traduce: Te ayudo con gusto.
  A: Ich helfe dir gern. / Ich helfe dir gerne.
  Type: flashcard
- Q: Completa: ____ kannst du dieses Wochenende kommen! (Ojalá)
  A: Hoffentlich
  Type: fill-in-the-blank
- Q: Traduce: Lamentablemente, tenemos malas noticias.
  A: Leider haben wir schlechte Nachrichten.
  Type: flashcard
- Q: Completa: ____ habe ich das Konzert verpasst! (Lamentablemente)
  A: Leider
  Type: fill-in-the-blank
- Q: Completa: Ich habe noch nicht ____ Deutsch gelernt.
  A: genug
  Type: fill-in-the-blank
- Q: ¿Qué adverbio expresa mayor probabilidad: vielleicht o wahrscheinlich?
  A: wahrscheinlich
  Type: multiple-choice
- Q: Completa: ____ wird es morgen sehr sonnig. (Probablemente)
  A: Wahrscheinlich
  Type: fill-in-the-blank
- Q: Traduce: Posiblemente, todo será diferente el próximo año.
  A: Möglicherweise wird im nächsten Jahr alles anders.
  Type: flashcard
- Q: ¿Qué dos adverbios significan «casi»?
  A: fast / beinahe
  Type: flashcard
- Q: Completa: Deutschland gefällt mir genauso gut ____ Österreich.
  A: wie
  Type: fill-in-the-blank
- Q: Traduce: ¿Realmente crees eso?
  A: Glaubst du das wirklich?
  Type: flashcard
- Q: Completa: Hier kann man ____ günstig essen. (especialmente)
  A: besonders
  Type: fill-in-the-blank
- Q: Ordena: leider / heute / ich / nicht / kommen / kann
  A: Leider kann ich heute nicht kommen.
  Type: ordering
<!-- DATA_QUIZ_END -->


---


### Unidad 29 — El imperativo (Der Imperativ)

*Nivel orientativo:* **A1** · *Alcance A1 de esta app:* ✅

> Imperativo informal (du/ihr) y de cortesía (Sie) básico sí es A1.

---
class_id: 029
title: "El imperativo"
level: "A2"
topics: ["Gramática", "Vocabulario", "Expresiones", "Imperativo", "Peticiones y propuestas"]
target_exam: "Telc / Goethe A2"
---

### El imperativo (Der Imperativ)

#### 1. 🎯 Resumen / Objetivos de la Lección
- Formar el imperativo para **du**, **ihr**, **Sie** y **wir**.
- Dar órdenes, instrucciones, consejos y recomendaciones.
- Formular peticiones corteses con **bitte**.
- Construir propuestas mediante **Lass uns ...** y **Lasst uns ...**.
- Aplicar correctamente el imperativo a verbos separables.
- Reconocer las formas irregulares más importantes: **sei**, **iss**, **gib**, **nimm**, **lies** y **sieh**.
- Resolver y comprender los diez ejercicios del PDF 065.

#### 2. 📚 Vocabulario Clave (Wortschatz)

##### Verbos frecuentes en imperativo

| Alemán | Español | Clasificación | Imperativo / Nota |
| :--- | :--- | :--- | :--- |
| machen | hacer | Regular, Akkusativ | **Mach! / Macht! / Machen Sie!** |
| kommen | venir | Irregular | **Komm! / Kommt! / Kommen Sie!** |
| trinken | beber | Irregular, Akkusativ | **Trink! / Trinkt! / Trinken Sie!** |
| essen | comer | Irregular, Akkusativ | Cambio e → i: **Iss! / Esst! / Essen Sie!** |
| geben | dar | Irregular, Dativ + Akkusativ | **Gib mir das Salz!** |
| nehmen | tomar | Irregular, Akkusativ | **Nimm! / Nehmt! / Nehmen Sie!** |
| lesen | leer | Irregular, Akkusativ | **Lies! / Lest! / Lesen Sie!** |
| sehen | ver | Irregular, Akkusativ | **Sieh! / Seht! / Sehen Sie!** |
| fahren | ir; conducir | Irregular | Sin Umlaut en **du**: **Fahr!** |
| sein | ser; estar | Irregular | **Sei! / Seid! / Seien Sie!** |
| fühlen | sentir | Regular reflexivo | **Fühlen Sie sich wie zu Hause!** |
| geben | pasar; dar | Irregular, Dativ + Akkusativ | **Geben Sie mir bitte das Salz!** |
| bringen | traer | Mixto, Dativ + Akkusativ | **Bringen Sie mir einen Kaffee!** |
| schreiben | escribir | Irregular, Akkusativ | **Schreib! / Schreibt! / Schreiben Sie!** |
| anrufen | llamar por teléfono | Irregular separable, Akkusativ | **Ruf mich an!** |
| aufpassen | prestar atención; cuidarse | Regular separable | **Pass auf dich auf!** |
| zumachen | cerrar | Regular separable, Akkusativ | **Mach die Tür zu!** |
| ausmachen | apagar | Regular separable, Akkusativ | **Mach das Licht aus!** |
| ausziehen | quitarse; desvestirse | Irregular separable, Akkusativ | **Zieh die Schuhe aus!** |
| anfangen | empezar | Irregular separable | **Fangen wir an!** |
| vorbereiten | preparar | Regular separable, Akkusativ | **Bereiten Sie die Präsentation vor!** |
| abonnieren | suscribirse a | Regular, Akkusativ | **Abonnier(e) meinen Kanal!** |

##### Sustantivos útiles

| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| die Suppe, -n | la sopa | Sustantivo femenino | **Iss die Suppe!** |
| der Schuh, -e | el zapato | Sustantivo masculino | Frecuente en plural: **die Schuhe** |
| das Fenster, - | la ventana | Sustantivo neutro | **Mach das Fenster zu!** |
| das Licht, -er | la luz | Sustantivo neutro | **Mach das Licht aus!** |
| die Hausaufgabe, -n | los deberes / la tarea | Sustantivo femenino | Normalmente plural: **die Hausaufgaben** |
| der Bahnhof, Bahnhöfe | la estación de tren | Sustantivo masculino | **zum Bahnhof** |
| die Bushaltestelle, -n | la parada de autobús | Sustantivo femenino | **zur Bushaltestelle** |
| die Tür, -en | la puerta | Sustantivo femenino | **Mach die Tür zu!** |
| das Salz | la sal | Sustantivo neutro sin plural habitual | **Gib mir das Salz!** |
| der Strand, Strände | la playa | Sustantivo masculino | **an den Strand gehen** |
| der Kaffee, -s | el café | Sustantivo masculino | **noch einen Kaffee** |
| die Frage, -n | la pregunta | Sustantivo femenino | **Ihre Fragen** |
| der Kanal, Kanäle | el canal | Sustantivo masculino | **meinen Kanal abonnieren** |
| die Sorge, -n | la preocupación | Sustantivo femenino | **Machen Sie sich keine Sorgen!** |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1. Visión general

| Destinatario | Formación básica | Sujeto | Ejemplo con machen |
| :--- | :--- | :--- | :--- |
| **du** | Raíz verbal, a veces + **-e** | Se omite | **Mach die Tür zu!** |
| **ihr** | Forma de Präsens de **ihr** | Se omite | **Macht eure Hausaufgaben!** |
| **Sie** | Infinitivo + **Sie** | Obligatorio | **Machen Sie die Tür zu!** |
| **wir** | Infinitivo + **wir** | Obligatorio | **Machen wir eine Pause!** |

- El verbo imperativo aparece normalmente al principio.
- Los pronombres **du** e **ihr** se omiten.
- Los pronombres **Sie** y **wir** no pueden omitirse en estas construcciones.
- El signo de exclamación es frecuente, pero no obligatorio en peticiones suaves.

##### 3.2. Imperativo de du

- **Regla general:** se toma la raíz de la forma de **du** y se elimina **-st**.
- **du machst → Mach!**
- **du kommst → Komm!**
- La terminación **-e** es posible con muchos verbos:
  - **Mach! / Mache!**
  - **Komm! / Komme!**
- En el habla cotidiana suele preferirse la forma corta.

**Estructura:** `Raíz verbal (+ e) + complementos`

| Infinitivo | Präsens con du | Imperativo |
| :--- | :--- | :--- |
| machen | du machst | **Mach! / Mache!** |
| kommen | du kommst | **Komm! / Komme!** |
| lernen | du lernst | **Lern! / Lerne!** |
| abonnieren | du abonnierst | **Abonnier! / Abonniere!** |

##### 3.3. Cuándo se mantiene -e

- Con raíces difíciles de pronunciar, especialmente terminadas en **-d**, **-t**, **-m** o **-n**, suele ser necesaria o muy recomendable la terminación **-e**:
  - **Arbeite!** — ¡Trabaja!
  - **Warte!** — ¡Espera!
  - **Atme!** — ¡Respira!
  - **Öffne!** — ¡Abre!
- Con verbos terminados en **-eln**, suele perderse una **e** de la raíz:
  - **sammeln → Sammle!**

##### 3.4. Cambios vocálicos en el imperativo de du

###### Verbos con e → i / ie

- Conservan el cambio vocálico del Präsens de **du**.
- No añaden normalmente **-e**.

| Infinitivo | du | Imperativo |
| :--- | :--- | :--- |
| essen | du isst | **Iss!** |
| geben | du gibst | **Gib!** |
| nehmen | du nimmst | **Nimm!** |
| lesen | du liest | **Lies!** |
| sehen | du siehst | **Sieh!** |
| helfen | du hilfst | **Hilf!** |

###### Verbos con a / au → ä / äu

- El Umlaut del Präsens desaparece en el imperativo de **du**:

| Infinitivo | du | Imperativo |
| :--- | :--- | :--- |
| fahren | du fährst | **Fahr!** |
| laufen | du läufst | **Lauf!** |
| schlafen | du schläfst | **Schlaf!** |

##### 3.5. Imperativo de ihr

- Coincide exactamente con la forma de Präsens de **ihr**, pero sin el pronombre.
- **ihr macht → Macht!**
- **ihr kommt → Kommt!**
- **ihr esst → Esst!**
- **ihr seid → Seid!**

**Estructura:** `Verbo en forma ihr + complementos`

> **Ruft mich an, wenn ihr zu Hause seid!**  
> ¡Llamadme cuando estéis en casa!

##### 3.6. Imperativo formal con Sie

- Se usa el infinitivo seguido de **Sie**.
- **Sie** se escribe con mayúscula.
- Sirve tanto para una persona como para varias personas tratadas formalmente.

**Estructura:** `Infinitivo + Sie + complementos`

- **Probieren Sie den Wein!**
- **Nehmen Sie Platz!**
- **Schreiben Sie Ihre Fragen in den Chat!**

##### 3.7. Imperativo exhortativo con wir

- Se forma con el infinitivo seguido de **wir**.
- Expresa una propuesta que incluye al hablante.

**Estructura:** `Infinitivo + wir + complementos`

- **Trinken wir ein Bier!**
- **Fangen wir mit dem Unterricht an!**
- **Machen wir eine Pause!**

- Esta forma existe y es correcta, aunque en la conversación suele competir con construcciones más habituales como **Lass uns ...** o **Lasst uns ...**.

##### 3.8. Lass uns / Lasst uns

- Esta estructura equivale a «vamos a...».
- **Lass uns** se dirige a una sola persona.
- **Lasst uns** se dirige a varias personas.
- El verbo principal aparece en infinitivo al final.

| Destinatario | Estructura | Ejemplo |
| :--- | :--- | :--- |
| Una persona | `Lass uns + ... + infinitivo` | **Lass uns ein Bier trinken!** |
| Varias personas | `Lasst uns + ... + infinitivo` | **Lasst uns an den Strand gehen!** |

##### 3.9. Verbos separables

- El prefijo separable aparece al final de la oración.

| Infinitivo | Imperativo |
| :--- | :--- |
| anrufen | **Ruf mich an!** |
| zumachen | **Mach die Tür zu!** |
| ausmachen | **Mach das Licht aus!** |
| aufpassen | **Pass gut auf!** |
| vorbereiten | **Bereiten Sie die Präsentation vor!** |

##### 3.10. El verbo sein

**sein** tiene formas completamente irregulares:

| Destinatario | Imperativo | Ejemplo |
| :--- | :--- | :--- |
| du | **sei** | **Sei vorsichtig!** |
| ihr | **seid** | **Seid pünktlich!** |
| Sie | **seien Sie** | **Seien Sie vorsichtig!** |
| wir | **seien wir** | **Seien wir ehrlich!** |

##### 3.11. Negación

- Se usa **nicht** para negar verbos, adjetivos o determinados complementos.
  - **Kommt nicht zu spät!**
  - **Sei nicht traurig!**
- Se usa **kein** delante de sustantivos sin artículo determinado.
  - **Mach keinen Lärm!**
  - **Machen Sie sich keine Sorgen!**

##### 3.12. Peticiones corteses con bitte

Dos posiciones comunes y correctas:

1. `Bitte + imperativo + ...`
2. `Imperativo + bitte + ...`

- **Bitte mach die Tür zu!**
- **Mach bitte die Tür zu!**
- **Bitte bringen Sie mir einen Kaffee!**
- **Bringen Sie mir bitte einen Kaffee!**

Con personas desconocidas o en contextos formales, **bitte** y la forma **Sie** suavizan la petición.

##### 3.13. Soluciones de los ejercicios (PDF 065)

1. **Fühlen Sie sich wie zu Hause!**  
   *¡Siéntase / Siéntanse como en casa!*

2. **Bitte mach die Tür zu! / Mach bitte die Tür zu!**  
   *¡Cierra la puerta, por favor!*

3. **Kommt um 8:00 Uhr zur Bushaltestelle!**  
   *¡Venid a la parada de autobús a las ocho!*

4. **Geben Sie mir bitte das Salz! / Bitte geben Sie mir das Salz!**  
   *¡Por favor, páseme / pásenme la sal!*

5. **Trinkt nicht zu viel!**  
   *¡No bebáis demasiado!*

6. **Lasst uns an den Strand gehen!**  
   *¡Vamos a la playa!*  
   Se usa **Lasst** porque la propuesta se dirige a varias personas.

7. **Seid vor 21:00 Uhr zu Hause!**  
   *¡Estad en casa antes de las nueve!*

8. **Bringen Sie mir bitte noch einen Kaffee! / Bitte bringen Sie mir noch einen Kaffee!**  
   *¡Tráigame / tráiganme otro café, por favor!*

9. **Schreiben Sie Ihre Fragen in den Chat!**  
   *¡Escriba / escriban sus preguntas en el chat!*

10. **Bitte abonnier meinen Kanal! / Abonnier bitte meinen Kanal!**  
    *¡Por favor, suscríbete a mi canal!*  
    También es correcto **abonniere**: **Bitte abonniere meinen Kanal!**

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Mach bitte die Tür zu!**  
> *Traducción:* ¡Cierra la puerta, por favor!  
> *Uso:* Petición informal a una persona.

> **Kommen Sie bitte herein!**  
> *Traducción:* ¡Entre / entren, por favor!  
> *Uso:* Invitación formal.

> **Seid bitte pünktlich!**  
> *Traducción:* ¡Sed puntuales, por favor!  
> *Uso:* Instrucción informal a varias personas.

> **Lass uns eine Pause machen!**  
> *Traducción:* ¡Hagamos una pausa!  
> *Uso:* Propuesta dirigida a una persona.

> **Lasst uns anfangen!**  
> *Traducción:* ¡Empecemos!  
> *Uso:* Propuesta dirigida a varias personas.

> **Machen Sie sich keine Sorgen!**  
> *Traducción:* ¡No se preocupe / preocupen!  
> *Uso:* Tranquilizar formalmente.

> **Pass auf dich auf!**  
> *Traducción:* ¡Cuídate!  
> *Uso:* Despedida afectuosa o consejo.

> **Nehmen Sie Platz!**  
> *Traducción:* ¡Tome / tomen asiento!  
> *Uso:* Invitación formal.

#### 5. 💡 Notas de Pronunciación o Errores Comunes

- ⚠️ **du e ihr se omiten:** **Komm!**, no *Komm du!* salvo que se quiera contrastar o enfatizar.
- ⚠️ **Sie permanece:** **Kommen Sie!**, no *Kommen!*, cuando se trata formalmente a alguien.
- ⚠️ **Sie formal va en mayúscula:** **Schreiben Sie Ihre Fragen.**
- ⚠️ **e → i/ie se conserva:** **Iss!**, **Gib!**, **Nimm!**, **Lies!**, **Sieh!**
- ⚠️ **El Umlaut desaparece:** **Fahr!**, no *Fähr!*
- ⚠️ **sein es irregular:** **Sei! / Seid! / Seien Sie!**
- ⚠️ **Prefijo al final:** **Mach die Tür zu!**, no *Zumach die Tür!*
- ⚠️ **Lass / Lasst:** **Lass** para una persona; **Lasst** para varias.
- ⚠️ **Infinitivo al final:** **Lass uns ein Bier trinken!**
- ⚠️ **abonnier / abonniere:** ambas formas son correctas.
- ⚠️ **OCR normalizado:** en el PDF se corrigió **un** por **und** en **Mach das Fenster zu und das Licht aus!**, además de signos y caracteres alemanes.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: Forma el imperativo de du de machen.
  A: Mach! / Mache!
  Type: flashcard
- Q: Forma el imperativo de ihr de machen.
  A: Macht!
  Type: flashcard
- Q: Forma el imperativo formal de machen.
  A: Machen Sie!
  Type: flashcard
- Q: Completa: ____ die Suppe! (essen, du)
  A: Iss
  Type: fill-in-the-blank
- Q: Completa: ____ mir das Salz! (geben, du)
  A: Gib
  Type: fill-in-the-blank
- Q: Completa: ____ Platz! (nehmen, Sie)
  A: Nehmen Sie
  Type: fill-in-the-blank
- Q: Corrige: Fähr vorsichtig!
  A: Fahr vorsichtig!
  Type: correction
- Q: Forma el imperativo de du de lesen.
  A: Lies!
  Type: flashcard
- Q: Forma el imperativo de du de sein.
  A: Sei!
  Type: flashcard
- Q: Forma el imperativo de ihr de sein.
  A: Seid!
  Type: flashcard
- Q: Forma el imperativo formal de sein.
  A: Seien Sie!
  Type: flashcard
- Q: Traduce: ¡Cierra la puerta, por favor!
  A: Bitte mach die Tür zu! / Mach bitte die Tür zu!
  Type: flashcard
- Q: Completa: Ruft mich ____, wenn ihr zu Hause seid! (anrufen)
  A: an
  Type: fill-in-the-blank
- Q: Traduce: ¡No bebáis demasiado!
  A: Trinkt nicht zu viel!
  Type: flashcard
- Q: Completa: ____ uns an den Strand gehen! (propuesta a varias personas)
  A: Lasst
  Type: fill-in-the-blank
- Q: Completa: ____ uns einen Kaffee trinken! (propuesta a una persona)
  A: Lass
  Type: fill-in-the-blank
- Q: ¿Dónde aparece el verbo principal en Lass uns ein Bier trinken?
  A: Al final, en infinitivo.
  Type: flashcard
- Q: Traduce: ¡Estad en casa antes de las nueve!
  A: Seid vor 21:00 Uhr zu Hause!
  Type: flashcard
- Q: Completa: ____ Sie mir bitte noch einen Kaffee! (bringen)
  A: Bringen
  Type: fill-in-the-blank
- Q: Traduce: ¡Escriban sus preguntas en el chat!
  A: Schreiben Sie Ihre Fragen in den Chat!
  Type: flashcard
- Q: ¿Son correctas abonnier y abonniere?
  A: Sí, ambas son formas correctas del imperativo de du.
  Type: true-false
- Q: Corrige: Zumach die Tür!
  A: Mach die Tür zu!
  Type: correction
- Q: Completa: Machen Sie sich ____ Sorgen! (ninguna)
  A: keine
  Type: fill-in-the-blank
- Q: Ordena: bitte / Sie / die Präsentation / bereiten / vor
  A: Bitte bereiten Sie die Präsentation vor.
  Type: ordering
<!-- DATA_QUIZ_END -->


---


### Unidad 30 — El tiempo verbal Perfekt

*Nivel orientativo:* **A1/A2** · *Alcance A1 de esta app:* ✅

> Perfekt con verbos frecuentes es A1; matices (doble infinitivo, verbos sin ge-) son A2.

---
class_id: 030
title: "El tiempo verbal Perfekt"
level: "B1"
topics: ["Gramática", "Vocabulario", "Expresiones", "Perfekt", "Partizip II", "Verbos auxiliares"]
target_exam: "Telc / Goethe B1"
---

### El tiempo verbal Perfekt

#### 1. 🎯 Resumen / Objetivos de la Lección
- Comprender los usos principales del **Perfekt** en alemán.
- Formar oraciones con **haben / sein + Partizip II**.
- Elegir correctamente entre los auxiliares **haben** y **sein**.
- Formar el **Partizip II** de verbos regulares, irregulares, mixtos, separables e inseparables.
- Colocar el auxiliar conjugado y el participio en las posiciones correctas.
- Formular afirmaciones, negaciones y preguntas en Perfekt.
- Entender la relación entre **Perfekt** y **Präteritum**.
- Reconocer el Perfekt de los verbos modales, incluido el patrón de doble infinitivo.

#### 2. 📚 Vocabulario Clave (Wortschatz)

##### Verbos frecuentes con haben

| Alemán | Español | Clasificación | Partizip II / Ejemplo |
| :--- | :--- | :--- | :--- |
| machen | hacer | Regular, Akkusativ | **gemacht** — Ich habe eine Pizza gemacht. |
| lernen | aprender; estudiar | Regular, Akkusativ | **gelernt** — Ich habe Deutsch gelernt. |
| spielen | jugar | Regular | **gespielt** — Wir haben Volleyball gespielt. |
| kaufen | comprar | Regular, Akkusativ | **gekauft** |
| arbeiten | trabajar | Regular | **gearbeitet** |
| beobachten | observar | Regular, Akkusativ | **beobachtet** |
| aufräumen | ordenar | Regular separable, Akkusativ | **aufgeräumt** |
| ankommen | llegar | Irregular separable; normalmente con sein | **angekommen** |
| essen | comer | Irregular, Akkusativ | **gegessen** |
| lesen | leer | Irregular, Akkusativ | **gelesen** |
| sehen | ver | Irregular, Akkusativ | **gesehen** |
| vergessen | olvidar | Irregular inseparable, Akkusativ | **vergessen** |
| verstehen | entender | Irregular inseparable, Akkusativ | **verstanden** |
| bringen | traer | Mixto, Dativ + Akkusativ | **gebracht** |
| denken | pensar | Mixto | **gedacht** |
| kennen | conocer | Mixto, Akkusativ | **gekannt** |
| studieren | estudiar en la universidad | Regular en **-ieren** | **studiert**, sin **ge-** |

##### Verbos frecuentes con sein

| Alemán | Español | Clasificación | Partizip II / Ejemplo |
| :--- | :--- | :--- | :--- |
| gehen | ir | Irregular, movimiento | **gegangen** — Ich bin nach Hause gegangen. |
| kommen | venir | Irregular, movimiento | **gekommen** |
| fahren | ir; viajar; conducir | Irregular, movimiento | **gefahren** |
| fliegen | volar | Irregular, movimiento | **geflogen** |
| reisen | viajar | Regular, movimiento | **gereist** |
| aufstehen | levantarse | Irregular separable, cambio de estado | **aufgestanden** |
| aufwachen | despertarse | Regular separable, cambio de estado | **aufgewacht** |
| einschlafen | dormirse | Irregular separable, cambio de estado | **eingeschlafen** |
| sterben | morir | Irregular, cambio de estado | **gestorben** |
| bleiben | quedarse | Irregular | **geblieben** |
| sein | ser; estar | Irregular | **gewesen** |
| werden | convertirse; llegar a ser | Irregular | **geworden** |
| passieren | ocurrir | Regular en **-ieren** | **passiert** |
| geschehen | suceder | Irregular | **geschehen** |
| gelingen | salir bien; lograr(se) | Irregular, Dativ | **gelungen** |

##### Sustantivos y expresiones de los ejemplos

| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| das Büro, -s | la oficina | Sustantivo neutro | **das Büro aufräumen** |
| das Sportzentrum, Sportzentren | el polideportivo | Sustantivo neutro | **zum Sportzentrum gehen** |
| der Vogel, Vögel | el pájaro | Sustantivo masculino | **die Vögel beobachten** |
| das Zimmer, - | la habitación | Sustantivo neutro | **das Zimmer aufräumen** |
| die Hausaufgabe, -n | los deberes / la tarea | Sustantivo femenino | Frecuente en plural. |
| der Zahnarzt, Zahnärzte | el dentista | Sustantivo masculino | **den Zahnarzt besuchen** |
| die Schokolade, -n | el chocolate | Sustantivo femenino | **Schokolade essen** |
| stundenlang | durante horas | Adverbio | **stundenlang warten** |
| vor zwei Monaten | hace dos meses | Expresión temporal | **vor + Dativ** |
| gestern | ayer | Adverbio temporal | Suele acompañar un pasado. |
| damals | en aquel entonces | Adverbio temporal | Periodo pasado conocido. |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1. Qué es el Perfekt

- El **Perfekt** presenta normalmente una acción o un acontecimiento del pasado.
- Es el tiempo de pasado más habitual en la conversación cotidiana.
- Puede describir:
  - una acción terminada: **Ich habe gestern meine Eltern gesehen.**
  - un acontecimiento pasado: **Das Schlimmste ist passiert.**
  - una acción pasada cuyo resultado importa en el presente: **Michael hat sein Büro aufgeräumt.**
- En determinados contextos, una expresión temporal puede darle referencia futura de acción completada:
  - **Bis nächste Woche hat er das bestimmt wieder vergessen.**
  - *Para la próxima semana seguramente ya lo habrá olvidado.*

##### 3.2. Fórmula básica

`Sujeto + haben/sein conjugado + complementos + Partizip II`

> **Michael hat das Büro aufgeräumt.**  
> Michael ha ordenado / ordenó la oficina.

- El auxiliar conjugado ocupa la posición 2.
- El **Partizip II** aparece al final.
- El auxiliar contiene la información de persona y número; el participio no cambia.

##### 3.3. Conjugación de los auxiliares

| Persona | Pronombre | haben | sein |
| :--- | :--- | :--- | :--- |
| 1.ª sing. | ich | habe | bin |
| 2.ª sing. | du | hast | bist |
| 3.ª sing. | er / sie / es | hat | ist |
| 1.ª plural | wir | haben | sind |
| 2.ª plural | ihr | habt | seid |
| 3.ª plural / formal | sie / Sie | haben | sind |

##### 3.4. Orden de la oración

###### Oración enunciativa

`Posición 1 + auxiliar en posición 2 + complementos + Partizip II`

- **Michael hat das Büro aufgeräumt.**
- **Gestern hat Michael das Büro aufgeräumt.**
- **Das Büro hat Michael gestern aufgeräumt.**

###### Pregunta cerrada

`Auxiliar + sujeto + complementos + Partizip II?`

- **Hat Michael das Büro aufgeräumt?**

###### Pregunta abierta

`Palabra interrogativa + auxiliar + sujeto + complementos + Partizip II?`

- **Warum hat Michael das Büro aufgeräumt?**
- **Wann seid ihr nach Hause gegangen?**

##### 3.5. Haben o sein

###### Se usa haben en la mayoría de los casos

- Verbos transitivos con complemento de acusativo:
  - **Michael hat das Büro aufgeräumt.**
- Verbos reflexivos:
  - **Michael hat sich das vorgenommen.**
- Verbos que describen una actividad sin cambio de lugar:
  - **Wir haben lange gearbeitet.**
- Verbos modales:
  - **Das habe ich nicht machen dürfen.**

###### Se usa sein principalmente con

1. Movimiento que implica desplazamiento de un lugar a otro:
   - **Ich bin zum Sportzentrum gegangen.**
   - **Wir sind durch Deutschland gefahren.**
2. Cambio de estado:
   - **Ich bin um neun Uhr aufgewacht.**
   - **Das Kind ist eingeschlafen.**
3. Los verbos **sein**, **bleiben** y **werden**:
   - **Ich bin bei meinen Eltern gewesen.**
   - **Sie ist zu Hause geblieben.**
   - **Er ist Arzt geworden.**
4. Algunos verbos de acontecimiento o resultado:
   - **Was ist passiert?**
   - **Das ist geschehen.**
   - **Der Kuchen ist gelungen.**

##### 3.6. Movimiento no significa siempre sein

- No basta con que el cuerpo se mueva: debe existir normalmente un desplazamiento o cambio de lugar.
- **Ich bin nach Berlin gefahren.** — He ido a Berlín.
- **Ich habe das Auto gefahren.** — He conducido el coche.  
  Aquí **fahren** es transitivo y lleva acusativo.
- **Wir haben drei Stunden getanzt.** — Hemos bailado tres horas.  
  Es una actividad, no un desplazamiento con destino.

##### 3.7. Partizip II de verbos regulares

**Fórmula:** `ge- + raíz + -t`

| Infinitivo | Raíz | Partizip II |
| :--- | :--- | :--- |
| lernen | lern- | gelernt |
| machen | mach- | gemacht |
| spielen | spiel- | gespielt |
| kaufen | kauf- | gekauft |

- Con raíces terminadas en **-d** o **-t**, se añade normalmente **-et** para facilitar la pronunciación:
  - **arbeiten → gearbeitet**
  - **warten → gewartet**

##### 3.8. Partizip II de verbos irregulares y mixtos

###### Irregulares fuertes

**Patrón frecuente:** `ge- + raíz modificada + -en`

| Infinitivo | Partizip II |
| :--- | :--- |
| essen | gegessen |
| lesen | gelesen |
| sehen | gesehen |
| gehen | gegangen |
| trinken | getrunken |
| schreiben | geschrieben |

###### Verbos mixtos

Cambian la raíz y terminan en **-t**:

| Infinitivo | Partizip II |
| :--- | :--- |
| bringen | gebracht |
| denken | gedacht |
| kennen | gekannt |
| nennen | genannt |
| wissen | gewusst |

##### 3.9. Verbos sin ge-

###### Verbos terminados en -ieren

- No reciben **ge-** y terminan en **-t**:
  - **studieren → studiert**
  - **probieren → probiert**
  - **telefonieren → telefoniert**

###### Verbos con prefijo inseparable

- Los prefijos **be-**, **emp-**, **ent-**, **er-**, **ge-**, **miss-**, **ver-** y **zer-** bloquean **ge-**.

| Infinitivo | Partizip II |
| :--- | :--- |
| besuchen | besucht |
| erzählen | erzählt |
| verstehen | verstanden |
| vergessen | vergessen |
| zerstören | zerstört |

##### 3.10. Verbos separables

- En los verbos separables, **ge** aparece entre el prefijo y la raíz:

`prefijo + ge + raíz + terminación`

| Infinitivo | Partizip II |
| :--- | :--- |
| aufräumen | aufgeräumt |
| ankommen | angekommen |
| einkaufen | eingekauft |
| einschlafen | eingeschlafen |
| aufstehen | aufgestanden |

##### 3.11. Negación en Perfekt

- **nicht** se coloca delante del elemento negado o hacia el final del campo medio:
  - **Ich habe das Zimmer nicht aufgeräumt.**
  - **Wir sind gestern nicht zur Schule gegangen.**
- **kein** niega un sustantivo sin artículo definido:
  - **Ich habe keine Pizza gegessen.**

##### 3.12. Perfekt y Präteritum

- En la lengua hablada, el **Perfekt** es normalmente la opción preferida para narrar hechos pasados:
  - **Ich bin gestern zum Sportzentrum gegangen.**
- El **Präteritum** aparece con mayor frecuencia:
  - en textos escritos y narrativos;
  - con **sein**, **haben** y los verbos modales, incluso al hablar.
- Ejemplos muy habituales:
  - **Ich war müde.**
  - **Ich hatte keine Zeit.**
  - **Ich musste arbeiten.**
- No existe una correspondencia automática uno a uno con los tiempos del español. La traducción depende del contexto:
  - **Ich habe gegessen.** — He comido / comí.

##### 3.13. Perfekt de un modal usado sin otro verbo

Cuando el modal funciona como verbo principal, puede formar un Partizip II:

| Modal | Partizip II | Ejemplo |
| :--- | :--- | :--- |
| dürfen | gedurft | **Das hast du nicht gedurft.** |
| können | gekonnt | **Das habe ich nicht gekonnt.** |
| mögen | gemocht | **Das habe ich nie gemocht.** |
| müssen | gemusst | **Das habe ich gemusst.** |
| sollen | gesollt | **Das habe ich nicht gesollt.** |
| wollen | gewollt | **Das habe ich nicht gewollt.** |

- En el habla cotidiana suele preferirse el Präteritum:
  - **Das durftest du nicht.**
  - **Das konnte ich nicht.**
  - **Das wollte ich nicht.**
- **Corrección de la fuente:** **gesollt** sí existe. Es poco frecuente y a menudo se sustituye por **sollte** o por una construcción contextual más natural.

##### 3.14. Perfekt con modal y otro verbo: doble infinitivo

Cuando aparece un verbo modal junto a otro verbo, se usa normalmente el **Ersatzinfinitiv** o doble infinitivo.

**Fórmula:** `haben conjugado + complementos + verbo principal en infinitivo + modal en infinitivo`

| Modal | Ejemplo |
| :--- | :--- |
| dürfen | **Das hast du nicht machen dürfen.** |
| können | **Alle Schüler haben die Hausaufgaben lösen können.** |
| mögen | **Die Studenten haben nicht zur Schule gehen mögen.** |
| müssen | **Klaus hat auf die Toilette gehen müssen.** |
| sollen | **Ich habe das Zimmer aufräumen sollen.** |
| wollen | **Das habe ich gar nicht machen wollen.** |

- No se dice en este patrón: *Ich habe das Zimmer aufräumen gesollt.*
- En conversación, el Präteritum suele ser más sencillo y natural:
  - **Ich sollte das Zimmer aufräumen.**
  - **Klaus musste auf die Toilette gehen.**

##### 3.15. Ejemplos normalizados de la lección

###### Sin verbos modales

| Alemán | Español |
| :--- | :--- |
| **Damals habe ich in Berlin Deutsch gelernt.** | En aquel entonces aprendí / estudiaba alemán en Berlín. |
| **Wir haben die Vögel sehr lange beobachtet.** | Hemos observado a los pájaros durante mucho tiempo. |
| **Meine Schwester hat eine Pizza gemacht.** | Mi hermana ha hecho una pizza. |
| **Ich bin vor zwei Monaten nach Madrid gefahren.** | Fui a Madrid hace dos meses. |
| **Das Kind ist am Samstag um sieben Uhr aufgewacht.** | El niño se despertó el sábado a las siete. |
| **Warum habt ihr stundenlang auf ihn gewartet?** | ¿Por qué lo esperasteis durante horas? |
| **Die Frauen haben ihnen nicht geantwortet.** | Las mujeres no les han respondido. |

###### Con verbos modales

| Alemán | Español |
| :--- | :--- |
| **Damals habe ich in Berlin Deutsch lernen müssen.** | En aquel entonces tuve que estudiar alemán en Berlín. |
| **Wir haben die Vögel beobachten können.** | Hemos podido observar a los pájaros. |
| **Meine Schwester hat eine Pizza machen wollen.** | Mi hermana ha querido hacer una pizza. |
| **Ich habe vor zwei Monaten nach Madrid fahren sollen.** | Se suponía que tenía que ir a Madrid hace dos meses. |
| **Als Kind habe ich den Zahnarzt nicht besuchen mögen.** | De niño no me gustaba ir al dentista. |
| **Als Kind habe ich keine Schokolade essen dürfen.** | De niño no tenía permitido comer chocolate. |

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Was hast du gestern gemacht?**  
> *Traducción:* ¿Qué hiciste ayer?  
> *Uso:* Preguntar por actividades pasadas.

> **Ich habe meine Freunde besucht.**  
> *Traducción:* Visité / he visitado a mis amigos.  
> *Uso:* Narrar una acción terminada.

> **Wann bist du nach Hause gekommen?**  
> *Traducción:* ¿Cuándo llegaste a casa?  
> *Uso:* Preguntar por un desplazamiento pasado.

> **Ich bin um neun Uhr aufgestanden.**  
> *Traducción:* Me levanté a las nueve.  
> *Uso:* Hablar de la rutina de un día pasado.

> **Das habe ich nicht verstanden.**  
> *Traducción:* No he entendido eso.  
> *Uso:* Pedir indirectamente una repetición o explicación.

> **Was ist passiert?**  
> *Traducción:* ¿Qué ha pasado?  
> *Uso:* Preguntar por un acontecimiento.

> **Ich habe lange arbeiten müssen.**  
> *Traducción:* Tuve que trabajar durante mucho tiempo.  
> *Uso:* Expresar una obligación pasada.

#### 5. 💡 Notas de Pronunciación o Errores Comunes

- ⚠️ **Participio al final:** **Ich habe Deutsch gelernt**, no *Ich habe gelernt Deutsch*.
- ⚠️ **Auxiliar conjugado:** **Ich bin gegangen**, pero **Wir sind gegangen**.
- ⚠️ **No todo movimiento usa sein:** **Ich habe drei Stunden getanzt**.
- ⚠️ **-ieren sin ge-:** **studiert**, no *gestudiert*.
- ⚠️ **Prefijo inseparable sin ge-:** **verstanden**, no *geverstanden*.
- ⚠️ **Prefijo separable alrededor de ge:** **aufgeräumt**, no *geaufräumt*.
- ⚠️ **Cambio de auxiliar:** **Ich bin nach Madrid gefahren**, pero **Ich habe das Auto gefahren**.
- ⚠️ **Perfekt no equivale siempre al pretérito perfecto español:** puede traducirse como «he comido» o «comí».
- ⚠️ **Modales con otro verbo:** **Ich habe arbeiten müssen**, no *Ich habe arbeiten gemusst* en el patrón estándar.
- ⚠️ **gesollt existe:** la afirmación contraria del PDF fue corregida.
- ⚠️ **sein y haben en Präteritum:** al hablar son muy frecuentes **war** y **hatte**, aunque el Perfekt sea habitual con muchos otros verbos.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: ¿Cuál es la fórmula básica del Perfekt?
  A: haben/sein conjugado + Partizip II
  Type: flashcard
- Q: Completa: Ich ____ Deutsch gelernt.
  A: habe
  Type: fill-in-the-blank
- Q: Completa: Wir ____ nach Hause gegangen.
  A: sind
  Type: fill-in-the-blank
- Q: Forma el Partizip II de machen.
  A: gemacht
  Type: flashcard
- Q: Forma el Partizip II de essen.
  A: gegessen
  Type: flashcard
- Q: Forma el Partizip II de studieren.
  A: studiert
  Type: flashcard
- Q: Forma el Partizip II de aufräumen.
  A: aufgeräumt
  Type: flashcard
- Q: Forma el Partizip II de verstehen.
  A: verstanden
  Type: flashcard
- Q: Completa: Gestern ____ Michael sein Büro aufgeräumt.
  A: hat
  Type: fill-in-the-blank
- Q: Traduce: ¿Qué hiciste ayer?
  A: Was hast du gestern gemacht?
  Type: flashcard
- Q: Ordena: gestern / ich / meine Eltern / habe / gesehen
  A: Gestern habe ich meine Eltern gesehen.
  Type: ordering
- Q: ¿Qué auxiliar usa normalmente gehen en Perfekt?
  A: sein
  Type: flashcard
- Q: ¿Qué auxiliar usan normalmente los verbos reflexivos?
  A: haben
  Type: flashcard
- Q: Completa: Das Kind ____ um sieben Uhr aufgewacht.
  A: ist
  Type: fill-in-the-blank
- Q: Corrige: Ich habe nach Berlin gegangen.
  A: Ich bin nach Berlin gegangen.
  Type: correction
- Q: Corrige: Ich habe Deutsch gelernen.
  A: Ich habe Deutsch gelernt.
  Type: correction
- Q: ¿Por qué studiert no lleva ge-?
  A: Porque los verbos terminados en -ieren forman el Partizip II sin ge-.
  Type: flashcard
- Q: Traduce: No he entendido eso.
  A: Das habe ich nicht verstanden.
  Type: flashcard
- Q: Completa: Wann ____ ihr nach Hause gekommen?
  A: seid
  Type: fill-in-the-blank
- Q: Forma el Partizip II de bringen.
  A: gebracht
  Type: flashcard
- Q: Traduce: Tuve que trabajar mucho tiempo.
  A: Ich habe lange arbeiten müssen.
  Type: flashcard
- Q: Completa el doble infinitivo: Ich habe das Zimmer ____ ____. (tener que ordenar)
  A: aufräumen müssen
  Type: fill-in-the-blank
- Q: ¿Existe la forma gesollt?
  A: Sí, aunque es poco frecuente y con otro verbo se usa normalmente el doble infinitivo.
  Type: true-false
- Q: Corrige: Wir haben nach Madrid fahren gemusst.
  A: Wir haben nach Madrid fahren müssen.
  Type: correction
<!-- DATA_QUIZ_END -->


---


### Unidad 31 — El tiempo verbal Plusquamperfekt

*Nivel orientativo:* **B1** · *Alcance A1 de esta app:* 📚

---
class_id: 031
title: "El tiempo verbal Plusquamperfekt"
level: "B2"
topics: ["Gramática", "Vocabulario", "Expresiones", "Plusquamperfekt", "Anterioridad en el pasado"]
target_exam: "Telc / Goethe B2"
---

### El tiempo verbal Plusquamperfekt

#### 1. 🎯 Resumen / Objetivos de la Lección
- Comprender que el **Plusquamperfekt** expresa una acción anterior a otra acción pasada.
- Formarlo con **hatte / war + Partizip II**.
- Elegir correctamente entre **hatte** y **war**.
- Ordenar dos acontecimientos pasados de forma cronológica.
- Construir oraciones con **nachdem**, **bevor** y **als**.
- Colocar correctamente el verbo en oraciones principales y subordinadas.
- Formular el Plusquamperfekt con verbos modales simples y con doble infinitivo.
- Evitar el uso innecesario del llamado «doble Plusquamperfekt».

#### 2. 📚 Vocabulario Clave (Wortschatz)

##### Verbos frecuentes

| Alemán | Español | Clasificación | Plusquamperfekt / Nota |
| :--- | :--- | :--- | :--- |
| machen | hacer | Regular, Akkusativ | **hatte gemacht** |
| lernen | aprender; estudiar | Regular, Akkusativ | **hatte gelernt** |
| essen | comer | Irregular, Akkusativ | **hatte gegessen** |
| sehen | ver | Irregular, Akkusativ | **hatte gesehen** |
| anrufen | llamar por teléfono | Irregular separable, Akkusativ | **hatte angerufen** |
| kaufen | comprar | Regular, Akkusativ | **hatte gekauft** |
| benutzen | utilizar | Regular inseparable, Akkusativ | **hatte benutzt** |
| warten | esperar | Regular | **hatte gewartet**; **auf + Akk.** |
| üben | practicar | Regular, Akkusativ | **hatte geübt** |
| reparieren | reparar | Regular en -ieren, Akkusativ | **hatte repariert** |
| kommen | venir | Irregular, movimiento | **war gekommen** |
| ankommen | llegar | Irregular separable, movimiento | **war angekommen** |
| gehen | ir | Irregular, movimiento | **war gegangen** |
| einkaufen gehen | ir de compras | Locución verbal | **war einkaufen gegangen** |
| zurückkommen | regresar | Irregular separable, movimiento | **war zurückgekommen** |
| sein | ser; estar | Irregular | **war gewesen** |

##### Conectores y expresiones temporales

| Alemán | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| nachdem | después de que | Conjunción subordinante | Introduce normalmente la acción anterior. |
| bevor | antes de que | Conjunción subordinante | Introduce la acción posterior respecto a la principal. |
| als | cuando | Conjunción subordinante | Para un hecho único o periodo concreto del pasado. |
| vorher | antes; previamente | Adverbio temporal | **Vorher hatte ich gegessen.** |
| danach | después; a continuación | Adverbio temporal | **Danach ging ich spazieren.** |
| schon | ya | Adverbio temporal | **Ich hatte schon gegessen.** |
| noch nie | nunca antes | Expresión temporal | **Ich hatte das noch nie gesehen.** |
| einen Monat zuvor | un mes antes | Expresión temporal | **zuvor** marca anterioridad. |
| ein paar Stunden | unas horas | Expresión de duración | **ein paar Stunden warten** |

##### Sustantivos útiles

| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Staubsauger, - | la aspiradora | Sustantivo masculino | **den Staubsauger benutzen** |
| das Klavier, -e | el piano | Sustantivo neutro | **Klavier spielen** |
| die Pizza, -s | la pizza | Sustantivo femenino | **eine Pizza machen** |
| die Hausaufgabe, -n | los deberes / la tarea | Sustantivo femenino | Frecuente en plural. |
| der Mechaniker, - | el mecánico | Sustantivo masculino | **Der Mechaniker hatte das Auto repariert.** |
| das Auto, -s | el coche | Sustantivo neutro | **das Auto reparieren** |
| der Chef, -s | el jefe | Sustantivo masculino | **Der Chef fragte nach ihm.** |
| der Mitarbeiter, - | el empleado | Sustantivo masculino | **Der Mitarbeiter war gegangen.** |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1. Qué expresa el Plusquamperfekt

- El **Plusquamperfekt** expresa una acción que ya había sucedido antes de otro momento o acontecimiento pasado.
- En español suele corresponder a «había + participio»:
  - **Ich hatte gegessen.** — Yo había comido.
  - **Sie war gegangen.** — Ella se había ido.
- Su función esencial es marcar la **anterioridad en el pasado**.

##### 3.2. Línea temporal

`Acción anterior: Plusquamperfekt → Acción posterior: Präteritum o Perfekt → Presente`

> **Ich hatte schon gegessen, als du kamst.**  
> Yo ya había comido cuando llegaste.

1. Primero comí.
2. Después llegaste.

##### 3.3. Fórmula básica

`Sujeto + hatte/war conjugado + complementos + Partizip II`

- **Ich hatte Deutsch gelernt.**
- **Sie war nach Hause gegangen.**

El Plusquamperfekt se parece al Perfekt. La diferencia está en el tiempo del auxiliar:

| Tiempo | Auxiliar | Ejemplo |
| :--- | :--- | :--- |
| Perfekt | haben / sein en Präsens | **Ich habe gegessen.** |
| Plusquamperfekt | haben / sein en Präteritum | **Ich hatte gegessen.** |

##### 3.4. Conjugación de los auxiliares

| Persona | Pronombre | haben en Präteritum | sein en Präteritum |
| :--- | :--- | :--- | :--- |
| 1.ª sing. | ich | hatte | war |
| 2.ª sing. | du | hattest | warst |
| 3.ª sing. | er / sie / es | hatte | war |
| 1.ª plural | wir | hatten | waren |
| 2.ª plural | ihr | hattet | wart |
| 3.ª plural / formal | sie / Sie | hatten | waren |

##### 3.5. Elegir hatte o war

- La elección sigue las mismas reglas que **haben** y **sein** en Perfekt.
- Se usa **hatte** con:
  - la mayoría de los verbos;
  - verbos transitivos;
  - verbos reflexivos;
  - actividades sin desplazamiento.
- Se usa **war** con:
  - movimiento con cambio de lugar;
  - cambio de estado;
  - **sein**, **bleiben** y **werden**;
  - ciertos verbos como **passieren** y **geschehen**.

| Perfekt | Plusquamperfekt |
| :--- | :--- |
| **Ich habe das Auto repariert.** | **Ich hatte das Auto repariert.** |
| **Ich bin nach Hause gegangen.** | **Ich war nach Hause gegangen.** |
| **Das Kind ist eingeschlafen.** | **Das Kind war eingeschlafen.** |

##### 3.6. Orden de la oración principal

**Fórmula:** `Posición 1 + hatte/war + sujeto + complementos + Partizip II`

- **Der Mitarbeiter war schon gegangen.**
- **Als der Chef nach ihm fragte, war der Mitarbeiter schon gegangen.**
- **Vorher hatte ich meine Hausaufgaben gemacht.**

El auxiliar conjugado ocupa la posición 2 y el **Partizip II** aparece al final.

##### 3.7. Orden en la oración subordinada

Las conjunciones **nachdem**, **bevor** y **als** envían el auxiliar conjugado al final.

**Fórmula:** `Conjunción + sujeto + complementos + Partizip II + hatte/war`

- **Nachdem ich dich angerufen hatte, bin ich einkaufen gegangen.**
- **Ich bin einkaufen gegangen, nachdem ich dich angerufen hatte.**

Si la subordinada aparece primero, la oración principal comienza inmediatamente con el verbo conjugado:

> **Nachdem sie die Pizza gemacht hatte, aßen wir sie.**

- **Nachdem ... hatte** ocupa la posición 1 completa.
- Por eso, la principal empieza con **aßen**, no con *wir*.

##### 3.8. Nachdem

- **nachdem** significa «después de que».
- Introduce normalmente la acción que ocurrió primero.
- Para dejar clara la secuencia:
  - acción anterior: Plusquamperfekt;
  - acción posterior: Präteritum o Perfekt.

> **Nachdem sie die Pizza gemacht hatte, aßen wir sie.**  
> Después de que ella había hecho la pizza, nos la comimos.

En español es más natural traducirlo como «después de que hizo/hubiera hecho la pizza».

##### 3.9. Bevor

- **bevor** significa «antes de que».
- La oración con **bevor** expresa el acontecimiento posterior respecto de la acción principal.

> **Bevor sie zu Hause ankam, hatte ich schon gegessen.**  
> Antes de que ella llegara a casa, yo ya había comido.

- **había comido** ocurrió primero.
- **llegó** ocurrió después.

##### 3.10. Als

- **als** significa «cuando» y se usa para:
  - un acontecimiento único del pasado;
  - un periodo pasado ya terminado.
- Permite contrastar la acción anterior con la posterior:

> **Als ich um 23 Uhr nach Hause kam, hatte meine Familie schon gegessen.**

La familia comió antes de mi llegada.

##### 3.11. Plusquamperfekt sin mencionar las dos acciones

- Puede aparecer sin una segunda acción explícita si el contexto ya proporciona el punto pasado de referencia:
  - **Ich war müde, denn ich hatte kaum geschlafen.**
- La información previa permite entender que dormir poco ocurrió antes de estar cansado.
- Sin contexto, una frase aislada como **Ich hatte gegessen** puede parecer incompleta porque invita a preguntar «¿antes de qué?».

##### 3.12. No usar dos Plusquamperfekt sin necesidad

- Si hay solamente dos acciones pasadas y una sucede antes que la otra:
  - la anterior va en Plusquamperfekt;
  - la posterior va normalmente en Präteritum o Perfekt.

| Recomendado | Problema |
| :--- | :--- |
| **Ich hatte schon zwei Stunden gewartet, als du kamst.** | *Ich hatte schon zwei Stunden gewartet, als du gekommen warst.* |
| **Er hatte den Staubsauger gekauft, bevor ich ihn benutzte.** | *Er hatte den Staubsauger gekauft, bevor ich ihn benutzt hatte.* |

- Dos Plusquamperfekt pueden ser posibles si ambas acciones son anteriores a un tercer punto pasado, pero ese contexto debe estar claro.
- **Corrección de la fuente:** los ejemplos denominados «doble Plusquamperfekt» no son el patrón recomendable para expresar simplemente dos acciones consecutivas.

##### 3.13. Preguntas y negación

###### Pregunta cerrada

`Hatte/War + sujeto + complementos + Partizip II?`

- **Hattest du schon gegessen?**
- **War sie schon gegangen?**

###### Pregunta abierta

`Palabra interrogativa + hatte/war + sujeto + complementos + Partizip II?`

- **Wie lange hattest du gewartet?**
- **Warum war er nach Hause gegangen?**

###### Negación

- **Ich hatte die Nachricht nicht gelesen.**
- **Sie war noch nicht angekommen.**
- **Wir hatten keine Pizza bestellt.**

##### 3.14. Plusquamperfekt con un modal usado solo

Cuando el modal no acompaña a otro verbo, se usa **hatte + Partizip II**:

| Modal | Partizip II | Ejemplo |
| :--- | :--- | :--- |
| dürfen | gedurft | **Das hattest du nicht gedurft.** |
| können | gekonnt | **Alle Schüler hatten das gekonnt.** |
| mögen | gemocht | **Die Studenten hatten den Lehrer nicht gemocht.** |
| müssen | gemusst | **Klaus hatte das gemusst.** |
| sollen | gesollt | **Das hatte ich nicht gesollt.** |
| wollen | gewollt | **Das hatte ich nicht gewollt.** |

- Estas construcciones son posibles, pero el Präteritum suele resultar más natural:
  - **Das durftest du nicht.**
  - **Das konnte ich nicht.**
  - **Das wollte ich nicht.**
- **gesollt** existe, aunque es poco frecuente.

##### 3.15. Plusquamperfekt con modal y otro verbo

Con un verbo modal y otro verbo se usa un doble infinitivo:

**Fórmula:** `hatte + complementos + verbo principal en infinitivo + modal en infinitivo`

| Modal | Ejemplo | Traducción |
| :--- | :--- | :--- |
| können | **Der Mechaniker hatte das Auto nicht reparieren können.** | El mecánico no había podido reparar el coche. |
| müssen | **Ich hatte gestern Sport machen müssen.** | Yo había tenido que hacer deporte el día anterior. |
| wollen | **Das Kind hatte seine Hausaufgaben nicht machen wollen.** | El niño no había querido hacer sus deberes. |
| dürfen | **Sie hatte nicht ausgehen dürfen.** | Ella no había tenido permitido salir. |
| sollen | **Ich hatte das Zimmer aufräumen sollen.** | Se suponía que yo tenía que ordenar la habitación. |

- No se usa aquí el participio del modal:
  - correcto: **hatte reparieren können**;
  - incorrecto: *hatte reparieren gekonnt*.

##### 3.16. Doble infinitivo en subordinada

Con un modal y otro verbo, el auxiliar aparece delante de los dos infinitivos al final de la subordinada:

> **..., weil der Mechaniker das Auto nicht hatte reparieren können.**

Este orden es más avanzado, pero conviene reconocerlo:

`conjunción + sujeto + complementos + hatte + infinitivo principal + infinitivo modal`

##### 3.17. Ejemplos normalizados de la lección

| Alemán | Español |
| :--- | :--- |
| **Gestern habe ich zum ersten Mal den Staubsauger benutzt, den ich einen Monat zuvor gekauft hatte.** | Ayer utilicé por primera vez la aspiradora que había comprado un mes antes. |
| **Als ich um 23 Uhr nach Hause kam, hatte meine Familie schon gegessen.** | Cuando llegué a casa a las once, mi familia ya había cenado. |
| **Sie hatte lange geübt, bevor sie gut Klavier spielen konnte.** | Había practicado mucho antes de poder tocar bien el piano. |
| **Ich hatte schon Deutsch gelernt, als ich nach Madrid zurückkam.** | Ya había aprendido alemán cuando volví a Madrid. |
| **Sie hatte uns angerufen, als wir schon unterwegs waren.** | Ella nos había llamado cuando ya estábamos de camino. |
| **Nachdem sie die Pizza gemacht hatte, aßen wir sie.** | Después de que ella hizo la pizza, nos la comimos. |
| **Bevor sie zu Hause ankam, hatte ich schon gegessen.** | Antes de que ella llegara a casa, yo ya había comido. |
| **Wie lange hattest du schon gewartet, als ich dich sah?** | ¿Cuánto tiempo llevabas esperando cuando te vi? |

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Was hattest du vorher gemacht?**  
> *Traducción:* ¿Qué habías hecho antes?  
> *Uso:* Preguntar por una acción anterior a otra pasada.

> **Ich hatte schon gegessen.**  
> *Traducción:* Yo ya había comido.  
> *Uso:* Explicar que una acción ya estaba terminada.

> **Als ich ankam, war er schon gegangen.**  
> *Traducción:* Cuando llegué, él ya se había ido.  
> *Uso:* Contrastar dos acciones pasadas.

> **Nachdem ich gearbeitet hatte, ging ich nach Hause.**  
> *Traducción:* Después de trabajar, me fui a casa.  
> *Uso:* Narrar acontecimientos en orden cronológico.

> **Bevor der Film begann, hatten wir Popcorn gekauft.**  
> *Traducción:* Antes de que empezara la película, habíamos comprado palomitas.  
> *Uso:* Expresar anterioridad con **bevor**.

> **Das hatte ich noch nie gesehen.**  
> *Traducción:* Nunca había visto eso.  
> *Uso:* Hablar de una experiencia inexistente hasta un punto pasado.

#### 5. 💡 Notas de Pronunciación o Errores Comunes

- ⚠️ **Plusquamperfekt = pasado anterior:** necesita explícita o implícitamente otro punto de referencia pasado.
- ⚠️ **Auxiliar en Präteritum:** **hatte / war**, no **habe / bin**.
- ⚠️ **Participio al final:** **Ich hatte schon gegessen.**
- ⚠️ **Movimiento con war:** **Sie war gegangen**, no *Sie hatte gegangen*.
- ⚠️ **Subordinada:** **nachdem ich gegessen hatte**, con **hatte** al final.
- ⚠️ **Inversión tras la subordinada:** **Nachdem ich gegessen hatte, ging ich...**, no *..., ich ging...*
- ⚠️ **Solo la acción anterior:** normalmente no se ponen las dos acciones en Plusquamperfekt.
- ⚠️ **als para un pasado único:** no se usa **wenn** en estos ejemplos de un acontecimiento único terminado.
- ⚠️ **Modal compuesto:** **hatte machen müssen**, no *hatte gemacht müssen*.
- ⚠️ **gesollt existe:** es una forma válida, aunque poco frecuente.
- ⚠️ **Traducción contextual:** el alemán no siempre se traduce palabra por palabra; **Nachdem sie die Pizza gemacht hatte** puede traducirse naturalmente como «después de que hizo/hubiera hecho la pizza».

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: ¿Qué expresa principalmente el Plusquamperfekt?
  A: Una acción anterior a otro momento o acción del pasado.
  Type: flashcard
- Q: ¿Cuál es la fórmula básica del Plusquamperfekt?
  A: hatte/war + Partizip II
  Type: flashcard
- Q: Completa: Ich ____ schon gegessen.
  A: hatte
  Type: fill-in-the-blank
- Q: Completa: Sie ____ nach Hause gegangen.
  A: war
  Type: fill-in-the-blank
- Q: Transforma a Plusquamperfekt: Ich habe Deutsch gelernt.
  A: Ich hatte Deutsch gelernt.
  Type: transformation
- Q: Transforma a Plusquamperfekt: Wir sind angekommen.
  A: Wir waren angekommen.
  Type: transformation
- Q: Traduce: Cuando llegué, él ya se había ido.
  A: Als ich ankam, war er schon gegangen.
  Type: flashcard
- Q: Completa: Nachdem ich gegessen ____, ging ich spazieren.
  A: hatte
  Type: fill-in-the-blank
- Q: ¿Dónde se coloca hatte en una subordinada normal con nachdem?
  A: Al final de la subordinada.
  Type: flashcard
- Q: Corrige: Nachdem ich hatte gegessen, ging ich nach Hause.
  A: Nachdem ich gegessen hatte, ging ich nach Hause.
  Type: correction
- Q: Completa: Bevor sie zu Hause ____, hatte ich schon gegessen. (ankommen)
  A: ankam
  Type: fill-in-the-blank
- Q: Traduce: Yo nunca había visto eso.
  A: Ich hatte das noch nie gesehen.
  Type: flashcard
- Q: Completa: Wie lange ____ du schon gewartet?
  A: hattest
  Type: fill-in-the-blank
- Q: Forma una pregunta cerrada con sie / gehen.
  A: War sie gegangen?
  Type: transformation
- Q: ¿Qué acción va normalmente en Plusquamperfekt: la anterior o la posterior?
  A: La anterior.
  Type: multiple-choice
- Q: Corrige: Ich hatte gegessen, als du gekommen warst.
  A: Ich hatte gegessen, als du kamst.
  Type: correction
- Q: Traduce: Ella nos había llamado.
  A: Sie hatte uns angerufen.
  Type: flashcard
- Q: Completa: Der Mitarbeiter ____ schon gegangen, als der Chef fragte.
  A: war
  Type: fill-in-the-blank
- Q: Traduce: El mecánico no había podido reparar el coche.
  A: Der Mechaniker hatte das Auto nicht reparieren können.
  Type: flashcard
- Q: Completa el doble infinitivo: Ich hatte lange ____ ____. (tener que trabajar)
  A: arbeiten müssen
  Type: fill-in-the-blank
- Q: Corrige: Ich hatte das Zimmer aufgeräumt müssen.
  A: Ich hatte das Zimmer aufräumen müssen.
  Type: correction
- Q: ¿Existe la forma gesollt?
  A: Sí, aunque es poco frecuente.
  Type: true-false
- Q: Traduce: Antes de que comenzara la película, habíamos comprado palomitas.
  A: Bevor der Film begann, hatten wir Popcorn gekauft.
  Type: flashcard
- Q: Ordena: nachdem / sie / die Pizza / gemacht / hatte / aßen / wir / sie
  A: Nachdem sie die Pizza gemacht hatte, aßen wir sie.
  Type: ordering
<!-- DATA_QUIZ_END -->


---


### Unidad 32 — Los tiempos verbales Futur I y Futur II

*Nivel orientativo:* **A2/B1** · *Alcance A1 de esta app:* 📚

> En A1 el futuro se expresa con presente + marcador temporal.

---
class_id: 032
title: "Los tiempos verbales Futur I y Futur II"
level: "B2"
topics: ["Gramática", "Vocabulario", "Expresiones", "Futur I", "Futur II", "Suposiciones"]
target_exam: "Telc / Goethe B2"
---

### Los tiempos verbales Futur I y Futur II

#### 1. 🎯 Resumen / Objetivos de la Lección
- Formar el **Futur I** con **werden + infinitivo**.
- Expresar intenciones, predicciones y suposiciones sobre el presente.
- Reconocer cuándo el alemán prefiere **Präsens + expresión temporal**.
- Formar el **Futur II** con **werden + Partizip II + haben/sein**.
- Expresar una acción que estará terminada en un momento futuro.
- Formular suposiciones sobre acciones pasadas.
- Colocar correctamente los componentes verbales en oraciones principales y subordinadas.
- Diferenciar **werden** de **wollen**.

#### 2. 📚 Vocabulario Clave (Wortschatz)

##### Marcadores de probabilidad y futuro

| Alemán | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| wohl | probablemente; seguramente; supongo que | Partícula modal / adverbio | **Es wird wohl spät sein.** |
| sicher | seguramente | Adverbio modal | **Sie wird sicher keine Zeit haben.** |
| bestimmt | sin duda; seguramente | Adverbio modal | Expresa mucha seguridad. |
| wahrscheinlich | probablemente | Adverbio modal | **Wahrscheinlich kommt er später.** |
| vielleicht | quizá; tal vez | Adverbio modal | Probabilidad menor. |
| morgen | mañana | Adverbio temporal | **Morgen arbeite ich.** |
| bis morgen | para mañana; hasta mañana | Expresión temporal | Con Futur II señala un límite. |
| in einer Woche | dentro de una semana | Expresión temporal | **in + Dativ** |
| nächstes Jahr | el año que viene | Expresión temporal | Acusativo temporal sin preposición. |
| irgendwann | algún día; en algún momento | Adverbio temporal | Futuro indeterminado. |
| schon | ya | Adverbio temporal | Frecuente en suposiciones. |

##### Verbos y participios frecuentes

| Alemán | Español | Clasificación | Partizip II / Auxiliar |
| :--- | :--- | :--- | :--- |
| machen | hacer | Regular, Akkusativ | **gemacht haben** |
| schaffen | conseguir; terminar | Regular, Akkusativ | **geschafft haben** |
| arbeiten | trabajar | Regular | **gearbeitet haben** |
| bauen | construir | Regular, Akkusativ | **gebaut haben** |
| bestellen | pedir; encargar | Regular inseparable, Akkusativ | **bestellt haben** |
| aufräumen | ordenar | Regular separable, Akkusativ | **aufgeräumt haben** |
| lesen | leer | Irregular, Akkusativ | **gelesen haben** |
| essen | comer | Irregular, Akkusativ | **gegessen haben** |
| kommen | venir | Irregular, movimiento | **gekommen sein** |
| gehen | ir | Irregular, movimiento | **gegangen sein** |
| aufwachen | despertarse | Regular separable, cambio de estado | **aufgewacht sein** |
| einschlafen | dormirse | Irregular separable, cambio de estado | **eingeschlafen sein** |
| aussehen | parecer; tener aspecto | Irregular separable | **ausgesehen haben** |
| umziehen | mudarse | Irregular separable, movimiento | **umgezogen sein** |

##### Sustantivos útiles

| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| die Arbeit, -en | el trabajo | Sustantivo femenino | **die Arbeit schaffen** |
| die Hausaufgabe, -n | los deberes / la tarea | Sustantivo femenino | Frecuente en plural. |
| die Pizza, -s | la pizza | Sustantivo femenino | **eine Pizza machen** |
| das Büro, -s | la oficina | Sustantivo neutro | **das Büro aufräumen** |
| der Einbrecher, - | el ladrón que entra a robar | Sustantivo masculino | **Die Einbrecher sind gekommen.** |
| das Fenster, - | la ventana | Sustantivo neutro | **durch das Fenster** + Akkusativ |
| die Feier, -n | la celebración | Sustantivo femenino | **eine Feier machen** |
| der Feierabend | el fin de la jornada laboral | Sustantivo masculino | Normalmente sin plural. |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1. Futur I: formación

**Fórmula:** `Sujeto + werden conjugado + complementos + infinitivo`

> **Ich werde morgen eine Pizza machen.**  
> Mañana haré una pizza.

- **werden** se conjuga y ocupa la posición 2.
- El verbo principal aparece en infinitivo al final.

##### 3.2. Conjugación de werden

| Persona | Pronombre | werden | Ejemplo |
| :--- | :--- | :--- | :--- |
| 1.ª sing. | ich | werde | ich werde gehen |
| 2.ª sing. | du | wirst | du wirst lesen |
| 3.ª sing. | er / sie / es | wird | er wird kommen |
| 1.ª plural | wir | werden | wir werden arbeiten |
| 2.ª plural | ihr | werdet | ihr werdet schwimmen |
| 3.ª plural / formal | sie / Sie | werden | sie werden lernen |

##### 3.3. Usos del Futur I

###### Intención o plan

> **Morgen werde ich eine Pizza machen.**  
> Mañana haré una pizza.

No garantiza que la acción ocurra; expresa una intención o anuncio.

###### Predicción

> **In Zukunft werden viele Menschen von zu Hause arbeiten.**  
> En el futuro muchas personas trabajarán desde casa.

###### Suposición sobre el presente

> **Er wird wohl im Büro sein.**  
> Probablemente estará en la oficina.

En este uso, la forma es futura, pero el significado se refiere al presente.

##### 3.4. El futuro también se expresa con Präsens

En alemán cotidiano, un plan futuro con una expresión temporal suele expresarse en presente:

| Futur I | Präsens con valor futuro |
| :--- | :--- |
| **Ich werde morgen arbeiten.** | **Ich arbeite morgen.** |
| **Wir werden nächstes Jahr umziehen.** | **Wir ziehen nächstes Jahr um.** |
| **Sie wird morgen keine Zeit haben.** | **Sie hat morgen keine Zeit.** |

- El **Präsens** es especialmente natural para citas, horarios y planes ya fijados.
- El **Futur I** puede añadir énfasis, promesa, predicción, intención o incertidumbre.

##### 3.5. Werden no es wollen

- **werden + infinitivo** forma el Futur I:
  - **Ich werde morgen arbeiten.** — Mañana trabajaré.
- **wollen + infinitivo** expresa voluntad o intención:
  - **Ich will morgen arbeiten.** — Quiero / tengo intención de trabajar mañana.
- No son equivalentes y no deben intercambiarse automáticamente.

##### 3.6. Marcadores de suposición

| Marcador | Valor aproximado | Ejemplo |
| :--- | :--- | :--- |
| **vielleicht** | quizá | **Vielleicht ist er zu Hause.** |
| **wohl** | probablemente; supongo que | **Er wird wohl zu Hause sein.** |
| **wahrscheinlich** | probablemente | **Er ist wahrscheinlich zu Hause.** |
| **sicher** | seguramente | **Er wird sicher zu Hause sein.** |
| **bestimmt** | sin duda; casi seguro | **Er wird bestimmt zu Hause sein.** |

Estos grados son orientativos y dependen del contexto y de la entonación.

##### 3.7. Orden del Futur I

###### Oración principal

`Posición 1 + werden conjugado + sujeto + complementos + infinitivo`

- **Morgen werde ich eine Pizza machen.**
- **Sein Büro wird genauso chaotisch aussehen wie immer.**

###### Pregunta cerrada

`Werden conjugado + sujeto + complementos + infinitivo?`

- **Wirst du morgen kommen?**

###### Pregunta abierta

`Interrogativo + werden conjugado + sujeto + complementos + infinitivo?`

- **Wann werdet ihr nach Berlin fahren?**

###### Oración subordinada

`Conjunción + sujeto + complementos + infinitivo + werden conjugado`

- **Ich glaube, dass er morgen kommen wird.**

##### 3.8. Futur I con verbo modal

Con un modal, aparecen dos infinitivos al final:

`werden conjugado + complementos + verbo principal en infinitivo + modal en infinitivo`

- **Ich werde morgen arbeiten müssen.**
- **Sie wird das Problem lösen können.**
- **Wir werden früher gehen dürfen.**

##### 3.9. Futur II: formación

El **Futur II** expresa que una acción estará terminada antes de un punto futuro o formula una suposición sobre el pasado.

**Fórmula:** `werden conjugado + complementos + Partizip II + haben/sein en infinitivo`

| Tipo de verbo | Estructura | Ejemplo |
| :--- | :--- | :--- |
| Verbo con haben | `werden + Partizip II + haben` | **Ich werde die Arbeit geschafft haben.** |
| Verbo con sein | `werden + Partizip II + sein` | **Er wird nach Hause gegangen sein.** |

##### 3.10. Elegir haben o sein en Futur II

Se aplican las mismas reglas que en Perfekt:

- La mayoría de los verbos usa **haben**.
- Los movimientos con cambio de lugar y los cambios de estado suelen usar **sein**.
- También usan **sein** los verbos **sein**, **bleiben** y **werden**.

| Perfekt | Futur II |
| :--- | :--- |
| **Ich habe die Arbeit gemacht.** | **Ich werde die Arbeit gemacht haben.** |
| **Er ist aufgewacht.** | **Er wird aufgewacht sein.** |
| **Sie ist gegangen.** | **Sie wird gegangen sein.** |

##### 3.11. Futur II: acción terminada en el futuro

- Se combina a menudo con un límite temporal:
  - **bis morgen**
  - **bis nächste Woche**
  - **in einer Woche**
  - **bis Ende des Jahres**

> **Bis morgen werde ich die Hausaufgaben gemacht haben.**  
> Para mañana habré hecho los deberes.

> **In einer Woche werden wir die Prüfung bestanden haben.**  
> Dentro de una semana habremos aprobado el examen.

El foco está en que la acción estará completada antes del punto indicado.

##### 3.12. Futur II: suposición sobre el pasado

El Futur II también permite deducir o suponer qué ocurrió:

> **Die Einbrecher werden wohl durch das Fenster gekommen sein.**  
> Los ladrones probablemente habrán entrado por la ventana.

> **Sie wird die Nachricht schon gelesen haben.**  
> Seguramente ya habrá leído el mensaje.

- **wohl**, **sicher**, **bestimmt** y **schon** ayudan a expresar la suposición.
- No se afirma el hecho con certeza absoluta.

##### 3.13. Orden del Futur II en oración principal

`Posición 1 + werden conjugado + sujeto + complementos + Partizip II + haben/sein`

- **Morgen werden wir die Arbeit geschafft haben.**
- **Er wird schon nach Hause gegangen sein.**

El grupo final se mantiene unido:

- **geschafft haben**
- **gegangen sein**

##### 3.14. Orden del Futur II en subordinada

`Conjunción + sujeto + complementos + Partizip II + haben/sein + werden conjugado`

- **Morgen feiern wir, weil wir die Arbeit geschafft haben werden.**
- **Ich rufe sie an, weil sie bestimmt schon Feierabend gemacht haben wird.**
- **Ich bestelle etwas, denn meine Familie wird sicher schon gegessen haben.**

Con **denn** no hay subordinación: el verbo sigue en posición 2.

##### 3.15. Preguntas en Futur II

###### Pregunta cerrada

`Werden conjugado + sujeto + complementos + Partizip II + haben/sein?`

- **Wirst du die Arbeit bis morgen beendet haben?**

###### Pregunta abierta

`Interrogativo + werden conjugado + sujeto + complementos + Partizip II + haben/sein?`

- **Wann werdet ihr das Haus gebaut haben?**

##### 3.16. Negación

- Futur I:
  - **Ich werde morgen nicht arbeiten.**
  - **Sie wird keine Pizza machen.**
- Futur II:
  - **Ich werde die Arbeit bis morgen nicht beendet haben.**
  - **Er wird noch nicht angekommen sein.**

##### 3.17. Comparación de tiempos

| Tiempo | Fórmula | Ejemplo | Idea |
| :--- | :--- | :--- | :--- |
| Präsens | verbo conjugado | **Ich arbeite morgen.** | Futuro fijado por el contexto |
| Futur I | werden + infinitivo | **Ich werde morgen arbeiten.** | Intención, predicción o suposición |
| Perfekt | haben/sein + Partizip II | **Ich habe gearbeitet.** | Acción pasada |
| Futur II | werden + Partizip II + haben/sein | **Ich werde gearbeitet haben.** | Acción futura terminada o suposición pasada |

##### 3.18. Ejemplos normalizados de la lección

###### Futur I

| Alemán | Español |
| :--- | :--- |
| **Es wird wohl schon spät sein.** | Probablemente ya será tarde. |
| **Sie wird sicher nächste Woche keine Zeit haben.** | Seguramente la semana que viene no tendrá tiempo. |
| **Wir werden morgen bestimmt zu Hause sein.** | Seguramente mañana estaremos en casa. |
| **Morgen werde ich eine Pizza machen.** | Mañana haré una pizza. |
| **Ich werde alles auf keinen Fall an einem Tag schaffen.** | De ninguna manera conseguiré hacerlo todo en un día. |
| **Sein Büro wird genauso chaotisch aussehen wie immer.** | Su oficina estará igual de caótica que siempre. |

###### Futur II

| Alemán | Español |
| :--- | :--- |
| **Die Einbrecher werden wohl durch das Fenster gekommen sein.** | Los ladrones probablemente habrán entrado por la ventana. |
| **Bis morgen werde ich die Hausaufgaben gemacht haben.** | Para mañana habré hecho los deberes. |
| **Morgen werden wir die Arbeit sicher geschafft haben.** | Mañana seguramente habremos terminado el trabajo. |
| **In einer Woche werde ich die Prüfung bestimmt bestanden haben.** | Dentro de una semana seguramente habré aprobado el examen. |
| **Um 19 Uhr wird sie schon Feierabend gemacht haben.** | A las siete ya habrá terminado su jornada laboral. |
| **Er wird schon nach Hause gegangen sein.** | Seguramente ya se habrá ido a casa. |

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Was wirst du morgen machen?**  
> *Traducción:* ¿Qué harás mañana?  
> *Uso:* Preguntar por una intención futura.

> **Ich werde morgen arbeiten.**  
> *Traducción:* Mañana trabajaré.  
> *Uso:* Anunciar una acción futura.

> **Er wird wohl zu Hause sein.**  
> *Traducción:* Probablemente estará en casa.  
> *Uso:* Formular una suposición sobre el presente.

> **Bis morgen werde ich fertig sein.**  
> *Traducción:* Para mañana estaré listo.  
> *Uso:* Indicar un límite temporal futuro.

> **Sie wird das schon gemacht haben.**  
> *Traducción:* Seguramente ya habrá hecho eso.  
> *Uso:* Formular una suposición sobre el pasado.

> **Wirst du bis Freitag alles erledigt haben?**  
> *Traducción:* ¿Habrás terminado todo para el viernes?  
> *Uso:* Preguntar si una tarea estará completada.

#### 5. 💡 Notas de Pronunciación o Errores Comunes

- ⚠️ **Infinitivo al final:** **Ich werde morgen arbeiten**, no *Ich werde arbeiten morgen* como orden neutro.
- ⚠️ **werden no significa automáticamente querer:** **Ich werde arbeiten** = trabajaré; **Ich will arbeiten** = quiero trabajar.
- ⚠️ **El Präsens puede expresar futuro:** **Morgen arbeite ich** es completamente correcto.
- ⚠️ **Futur I para suposición presente:** **Er wird wohl schlafen** puede significar «probablemente está durmiendo».
- ⚠️ **Futur II necesita dos elementos finales:** **gemacht haben** o **gegangen sein**.
- ⚠️ **Elegir el auxiliar correcto:** **Er wird gegangen sein**, no *Er wird gegangen haben*.
- ⚠️ **Subordinada de Futur I:** **..., dass er kommen wird.**
- ⚠️ **Subordinada de Futur II:** **..., weil er die Arbeit gemacht haben wird.**
- ⚠️ **denn mantiene posición 2:** **..., denn er wird schon gegessen haben.**
- ⚠️ **No sobrecargar el habla:** para planes cotidianos, el Präsens suele sonar más natural que Futur I.
- ⚠️ **Suposición no es certeza:** partículas como **wohl** o **wahrscheinlich** marcan que el hablante deduce la información.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: ¿Cuál es la fórmula del Futur I?
  A: werden conjugado + infinitivo
  Type: flashcard
- Q: Completa: Ich ____ morgen arbeiten.
  A: werde
  Type: fill-in-the-blank
- Q: Completa: Du ____ das Buch lesen.
  A: wirst
  Type: fill-in-the-blank
- Q: Completa: Ihr ____ nach Berlin fahren.
  A: werdet
  Type: fill-in-the-blank
- Q: Traduce: ¿Qué harás mañana?
  A: Was wirst du morgen machen?
  Type: flashcard
- Q: Corrige: Ich werde wollen morgen arbeiten.
  A: Ich werde morgen arbeiten. / Ich will morgen arbeiten.
  Type: correction
- Q: ¿Qué tiempo suele usarse para planes futuros ya fijados en el habla cotidiana?
  A: Präsens con una expresión temporal.
  Type: flashcard
- Q: Traduce: Probablemente estará en casa.
  A: Er wird wohl zu Hause sein.
  Type: flashcard
- Q: Completa: Ich glaube, dass er morgen kommen ____.
  A: wird
  Type: fill-in-the-blank
- Q: Ordena: morgen / ich / werde / arbeiten
  A: Morgen werde ich arbeiten.
  Type: ordering
- Q: ¿Cuál es la fórmula del Futur II?
  A: werden conjugado + Partizip II + haben/sein
  Type: flashcard
- Q: Completa: Bis morgen werde ich die Arbeit gemacht ____.
  A: haben
  Type: fill-in-the-blank
- Q: Completa: Er wird schon nach Hause gegangen ____.
  A: sein
  Type: fill-in-the-blank
- Q: Traduce: Para mañana habré hecho los deberes.
  A: Bis morgen werde ich die Hausaufgaben gemacht haben.
  Type: flashcard
- Q: Traduce: Los ladrones probablemente habrán entrado por la ventana.
  A: Die Einbrecher werden wohl durch das Fenster gekommen sein.
  Type: flashcard
- Q: ¿Qué auxiliar final usa gehen en Futur II?
  A: sein
  Type: flashcard
- Q: ¿Qué auxiliar final usa machen en Futur II?
  A: haben
  Type: flashcard
- Q: Corrige: Sie wird die Pizza gemacht sein.
  A: Sie wird die Pizza gemacht haben.
  Type: correction
- Q: Completa: Morgen feiern wir, weil wir die Arbeit geschafft haben ____.
  A: werden
  Type: fill-in-the-blank
- Q: Traduce: Seguramente ya habrá leído el mensaje.
  A: Sie wird die Nachricht sicher schon gelesen haben.
  Type: flashcard
- Q: Forma el Futur I con modal: Ich / morgen / arbeiten / müssen.
  A: Ich werde morgen arbeiten müssen.
  Type: transformation
- Q: Completa: Wirst du die Arbeit bis Freitag beendet ____?
  A: haben
  Type: fill-in-the-blank
- Q: ¿Puede el Futur II expresar una suposición sobre el pasado?
  A: Sí.
  Type: true-false
- Q: Ordena: wird / schon / er / angekommen / sein
  A: Er wird schon angekommen sein.
  Type: ordering
<!-- DATA_QUIZ_END -->


---


### Unidad 33 — Verbos separables e inseparables (Trennbare und untrennbare Verben)

*Nivel orientativo:* **A1/A2** · *Alcance A1 de esta app:* ✅

> Los verbos separables más frecuentes (aufstehen, einkaufen...) sí son A1.

---
class_id: 033
title: "Verbos separables e inseparables"
level: "B2"
topics: ["Gramática", "Vocabulario", "Expresiones", "Verbos separables", "Verbos inseparables", "Prefijos"]
target_exam: "Telc / Goethe B2"
---

### Verbos separables e inseparables (Trennbare und untrennbare Verben)

#### 1. 🎯 Resumen / Objetivos de la Lección
- Reconocer los prefijos separables e inseparables más frecuentes.
- Colocar el prefijo separable correctamente en oraciones principales.
- Mantener unido el verbo en infinitivo y en oraciones subordinadas.
- Formar el **Partizip II** de ambos tipos de verbo.
- Usar verbos con prefijo en Präsens, Präteritum, Perfekt, Plusquamperfekt y Futur.
- Construir oraciones con verbos modales.
- Formar infinitivos con **zu**.
- Distinguir verbos de escritura idéntica cuyo acento y significado determinan si son separables.

#### 2. 📚 Vocabulario Clave (Wortschatz)

##### Verbos separables frecuentes

| Alemán | Español | Régimen / Clasificación | Ejemplo |
| :--- | :--- | :--- | :--- |
| abfahren | salir; partir | Irregular separable | **Der Zug fährt um acht Uhr ab.** |
| anrufen | llamar por teléfono | Irregular separable, Akkusativ | **Ich rufe dich morgen an.** |
| anfangen | empezar | Irregular separable | **Der Kurs fängt um neun Uhr an.** |
| aufstehen | levantarse | Irregular separable | **Ich stehe um acht Uhr auf.** |
| aufräumen | ordenar | Regular separable, Akkusativ | **Sie räumt ihr Zimmer auf.** |
| aufnehmen | grabar; admitir; recoger | Irregular separable, Akkusativ | **Ich nehme ein Video auf.** |
| aussteigen | bajarse | Irregular separable | **Wir steigen hier aus.** |
| einkaufen | hacer compras | Regular separable | **Ich kaufe am Samstag ein.** |
| fernsehen | ver la televisión | Irregular separable | **Er sieht abends fern.** |
| losfahren | ponerse en marcha | Irregular separable | **Wir fahren jetzt los.** |
| mitkommen | venir con alguien | Irregular separable | **Kommst du mit?** |
| nachfragen | volver a preguntar; consultar | Regular separable | **Ich frage beim Lehrer nach.** |
| vorbeikommen | pasarse; venir de visita | Irregular separable | **Komm morgen vorbei!** |
| weggehen | irse | Irregular separable | **Sie geht früh weg.** |
| zumachen | cerrar | Regular separable, Akkusativ | **Mach bitte die Tür zu.** |
| zurückkommen | volver; regresar | Irregular separable | **Wann kommst du zurück?** |

##### Verbos inseparables frecuentes

| Alemán | Español | Régimen / Clasificación | Ejemplo |
| :--- | :--- | :--- | :--- |
| beantworten | responder | Regular inseparable, Akkusativ | **Ich beantworte die Frage.** |
| bekommen | recibir | Irregular inseparable, Akkusativ | **Sie bekommt eine Nachricht.** |
| bestehen | aprobar; consistir; existir | Irregular inseparable | **Ich bestehe die Prüfung.** |
| empfehlen | recomendar | Irregular inseparable, Dativ + Akkusativ | **Ich empfehle dir das Buch.** |
| entdecken | descubrir | Regular inseparable, Akkusativ | **Wir entdecken eine neue Stadt.** |
| erklären | explicar | Regular inseparable, Dativ + Akkusativ | **Er erklärt mir die Regel.** |
| gefallen | gustar | Irregular inseparable, Dativ | **Das gefällt mir.** |
| missverstehen | malinterpretar | Irregular inseparable, Akkusativ | **Du hast mich missverstanden.** |
| vergessen | olvidar | Irregular inseparable, Akkusativ | **Ich vergesse den Termin.** |
| verkaufen | vender | Regular inseparable, Akkusativ | **Er verkauft sein Auto.** |
| verstehen | entender | Irregular inseparable, Akkusativ | **Ich verstehe die Frage.** |
| zerstören | destruir | Regular inseparable, Akkusativ | **Der Sturm zerstört das Dach.** |

##### Prefijos principales

| Tipo | Prefijos frecuentes | Acento |
| :--- | :--- | :--- |
| Separables | **ab-, an-, auf-, aus-, ein-, los-, mit-, nach-, her-, hin-, vor-, weg-, zu-, zurück-** | El prefijo suele llevar el acento. |
| Inseparables | **be-, emp-, ent-, er-, ge-, miss-, ver-, zer-** | El prefijo no lleva el acento. |
| Variables | **durch-, hinter-, über-, um-, unter-, wider-, wieder-** | Depende del verbo y del significado. |

##### Sustantivos útiles

| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| die Prüfung, -en | el examen | Sustantivo femenino | **eine Prüfung bestehen** |
| das Video, -s | el vídeo | Sustantivo neutro | **ein Video aufnehmen** |
| die Haltestelle, -n | la parada | Sustantivo femenino | **an der Haltestelle aussteigen** |
| der Termin, -e | la cita | Sustantivo masculino | **einen Termin vergessen** |
| die Nachricht, -en | el mensaje; la noticia | Sustantivo femenino | **eine Nachricht bekommen** |
| die Bedeutung, -en | el significado | Sustantivo femenino | **eine andere Bedeutung** |
| der Wortakzent, -e | el acento de palabra | Sustantivo masculino | Determina la separabilidad en prefijos variables. |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1. Qué son los verbos con prefijo

- Un prefijo se combina con una raíz verbal y crea un nuevo verbo.
- El significado nuevo no siempre puede deducirse literalmente:
  - **stehen** — estar de pie
  - **aufstehen** — levantarse
  - **bestehen** — aprobar; consistir; existir
- El comportamiento gramatical depende de si el prefijo es:
  - separable;
  - inseparable;
  - variable según el acento y el significado.

##### 3.2. Cómo reconocerlos en el diccionario

- Muchos diccionarios señalan la separación con una barra:
  - **an|rufen**
  - **auf|stehen**
- Un verbo inseparable aparece sin barra:
  - **verstehen**
  - **bestehen**
- También conviene consultar:
  - la marca de acento;
  - el Partizip II;
  - el auxiliar del Perfekt;
  - el significado concreto.

##### 3.3. Verbos separables en Präsens

En una oración principal, el verbo conjugado ocupa la posición 2 y el prefijo aparece al final.

**Fórmula:** `Posición 1 + raíz conjugada + complementos + prefijo`

> **Ich stehe um acht Uhr auf.**  
> Me levanto a las ocho.

> **Wann rufst du mich an?**  
> ¿Cuándo me llamas?

La conjugación se aplica a la raíz:

| Infinitivo | Präsens |
| :--- | :--- |
| aufstehen | ich stehe auf |
| anrufen | du rufst an |
| anfangen | er fängt an |
| fernsehen | sie sieht fern |

##### 3.4. Verbos separables en Präteritum

En una oración principal, el prefijo también se separa:

- **Ich stand um acht Uhr auf.**
- **Er rief mich gestern an.**
- **Der Kurs fing um neun Uhr an.**

**Fórmula:** `Posición 1 + verbo en Präteritum + complementos + prefijo`

##### 3.5. Con verbos modales

Cuando hay un verbo modal, el verbo separable aparece unido en infinitivo al final:

> **Ich muss um acht Uhr aufstehen.**  
> Tengo que levantarme a las ocho.

> **Du kannst mich später anrufen.**  
> Puedes llamarme más tarde.

No se dice: *Ich muss um acht Uhr stehen auf.*

##### 3.6. Verbos separables en Futur I

El verbo aparece unido en infinitivo:

> **Ich werde morgen um acht Uhr aufstehen.**

> **Ich werde ein neues Video aufnehmen.**

**Fórmula:** `werden conjugado + complementos + infinitivo completo`

##### 3.7. Partizip II de los verbos separables

La partícula **ge** se coloca entre el prefijo y la raíz:

`prefijo + ge + raíz + terminación`

| Infinitivo | Partizip II |
| :--- | :--- |
| aufstehen | aufgestanden |
| anrufen | angerufen |
| aufräumen | aufgeräumt |
| einkaufen | eingekauft |
| aufnehmen | aufgenommen |

- **Perfekt:** **Ich bin um acht Uhr aufgestanden.**
- **Plusquamperfekt:** **Ich war um acht Uhr aufgestanden.**
- **Futur II:** **Ich werde um acht Uhr aufgestanden sein.**

El prefijo no se coloca separado al final cuando forma parte del Partizip II.

##### 3.8. Verbos separables con modal en tiempos compuestos

Con un modal y otro verbo, el infinitivo separable permanece unido:

- **Perfekt:** **Ich habe um acht Uhr aufstehen müssen.**
- **Plusquamperfekt:** **Ich hatte um acht Uhr aufstehen müssen.**
- **Futur I:** **Ich werde um acht Uhr aufstehen müssen.**

No se introduce **ge** en el infinitivo **aufstehen**.

##### 3.9. Oraciones subordinadas

En una subordinada, el verbo separable conjugado vuelve a unirse y aparece al final:

> **Ich weiß, dass du morgen früh aufstehst.**

> **Sie sagt, dass sie mich später anruft.**

> **Wenn der Zug ankommt, steigen wir ein.**

- Principal: **Du stehst früh auf.**
- Subordinada: **..., weil du früh aufstehst.**

##### 3.10. Infinitivo con zu

###### Verbo separable

**zu** aparece entre el prefijo y la raíz:

- **aufzustehen**
- **anzurufen**
- **einzukaufen**
- **aufzuräumen**

> **Ich versuche, früh aufzustehen.**

###### Verbo inseparable

**zu** aparece delante del infinitivo completo:

- **zu verstehen**
- **zu bestehen**
- **zu verkaufen**

> **Ich versuche, die Regel zu verstehen.**

##### 3.11. Verbos inseparables

Los prefijos **be-, emp-, ent-, er-, ge-, miss-, ver-** y **zer-** permanecen siempre unidos a la raíz.

| Tiempo / estructura | Ejemplo con bestehen |
| :--- | :--- |
| Präsens | **Ich bestehe die Prüfung.** |
| Präteritum | **Ich bestand die Prüfung.** |
| Con modal | **Ich muss die Prüfung bestehen.** |
| Futur I | **Ich werde die Prüfung bestehen.** |
| Subordinada | **..., weil ich die Prüfung bestehe.** |

No se dice: *Ich stehe die Prüfung be.*

##### 3.12. Partizip II de verbos inseparables

Los prefijos inseparables bloquean la partícula **ge-**:

| Infinitivo | Partizip II |
| :--- | :--- |
| bestehen | bestanden |
| verstehen | verstanden |
| besuchen | besucht |
| erklären | erklärt |
| verkaufen | verkauft |
| zerstören | zerstört |

- **Perfekt:** **Ich habe die Prüfung bestanden.**
- **Plusquamperfekt:** **Ich hatte die Prüfung bestanden.**
- **Futur II:** **Ich werde die Prüfung bestanden haben.**

No se dice: *gebestanden* ni *geverstanden*.

##### 3.13. El acento como señal

- En verbos separables, el prefijo suele estar acentuado:
  - **AUFstehen**
  - **ANrufen**
  - **EINkaufen**
- En verbos inseparables, el acento recae normalmente en la raíz o sílaba posterior:
  - be**STEH**en
  - ver**STEH**en
  - be**SUCH**en
- Esta diferencia resulta especialmente importante con prefijos variables.

##### 3.14. Prefijos variables

Los prefijos **durch-, hinter-, über-, um-, unter-, wider-** y **wieder-** pueden formar verbos separables o inseparables.

###### Regla orientativa

- Prefijo acentuado → normalmente separable.
- Raíz acentuada → normalmente inseparable.
- El significado puede cambiar por completo.

##### 3.15. Umfahren: dos verbos diferentes

| Verbo | Acento | Tipo | Significado | Ejemplo |
| :--- | :--- | :--- | :--- | :--- |
| **UMfahren** | en **um** | Separable | atropellar; derribar con un vehículo | **Er fährt den Mann um.** |
| um**FAH**ren | en **fahr** | Inseparable | rodear; evitar pasando alrededor | **Er umfährt den Mann.** |

###### Partizip II

- separable: **umgefahren**
  - **Er hat den Mann umgefahren.**
- inseparable: **umfahren**
  - **Er hat den Mann umfahren.**

La ortografía del infinitivo es idéntica; el acento, la estructura y el contexto aclaran el significado.

##### 3.16. Otros pares útiles

| Separable | Significado | Inseparable | Significado |
| :--- | :--- | :--- | :--- |
| **ÜBERsetzen** | cruzar a la otra orilla; transportar en ferry | über**SETZ**en | traducir |
| **UMschreiben** | reescribir | um**SCHREIB**en | parafrasear; describir con otras palabras |
| **DURCHschauen** | mirar a través | durch**SCHAU**en | comprender; calar una intención |
| **WIEDERholen** | volver a traer / recuperar | wieder**HO**len | repetir |

La distinción exacta debe aprenderse junto con el significado y la pronunciación de cada verbo.

##### 3.17. Comparación general

| Propiedad | Separable | Inseparable |
| :--- | :--- | :--- |
| Acento | Prefijo | Raíz / sílaba posterior |
| Principal en Präsens | Prefijo al final | Todo unido |
| Subordinada | Todo unido al final | Todo unido al final |
| Con modal | Infinitivo unido al final | Infinitivo unido al final |
| Partizip II | **ge** entre prefijo y raíz | Sin **ge** |
| Infinitivo con zu | **zu** entre prefijo y raíz | **zu** delante del verbo |

##### 3.18. Ejemplos normalizados de la lección

| Tiempo / estructura | Verbo separable | Verbo inseparable |
| :--- | :--- | :--- |
| Präsens | **Ich stehe um acht Uhr auf.** | **Ich bestehe die Prüfung.** |
| Präteritum | **Ich stand um acht Uhr auf.** | **Ich bestand die Prüfung.** |
| Modal | **Ich muss um acht Uhr aufstehen.** | **Ich muss die Prüfung bestehen.** |
| Futur I | **Ich werde um acht Uhr aufstehen.** | **Ich werde die Prüfung bestehen.** |
| Perfekt | **Ich bin um acht Uhr aufgestanden.** | **Ich habe die Prüfung bestanden.** |
| Plusquamperfekt | **Ich war um acht Uhr aufgestanden.** | **Ich hatte die Prüfung bestanden.** |
| Futur II | **Ich werde um acht Uhr aufgestanden sein.** | **Ich werde die Prüfung bestanden haben.** |

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Wann stehst du morgen auf?**  
> *Traducción:* ¿Cuándo te levantas mañana?  
> *Uso:* Preguntar por una rutina o un plan.

> **Ruf mich bitte später an!**  
> *Traducción:* Llámame más tarde, por favor.  
> *Uso:* Petición informal.

> **Kommst du mit?**  
> *Traducción:* ¿Vienes conmigo?  
> *Uso:* Invitar a alguien.

> **Ich muss noch einkaufen.**  
> *Traducción:* Todavía tengo que hacer la compra.  
> *Uso:* Hablar de una obligación.

> **Ich habe die Frage nicht verstanden.**  
> *Traducción:* No he entendido la pregunta.  
> *Uso:* Pedir una aclaración.

> **Ich hoffe, die Prüfung zu bestehen.**  
> *Traducción:* Espero aprobar el examen.  
> *Uso:* Expresar una esperanza con infinitivo.

#### 5. 💡 Notas de Pronunciación o Errores Comunes

- ⚠️ **Principal:** **Ich stehe früh auf**, con el prefijo al final.
- ⚠️ **Modal:** **Ich muss früh aufstehen**, con el infinitivo unido.
- ⚠️ **Subordinada:** **..., weil ich früh aufstehe**, con el verbo unido al final.
- ⚠️ **Partizip separable:** **aufgestanden**, no *geaufstanden*.
- ⚠️ **Partizip inseparable:** **verstanden**, no *geverstanden*.
- ⚠️ **Infinitivo con zu:** **aufzustehen**, pero **zu verstehen**.
- ⚠️ **-ieren:** aunque el verbo tenga apariencia compleja, los verbos en **-ieren** no reciben **ge-**: **telefoniert**.
- ⚠️ **Prefijos variables:** no se pueden clasificar solo por la escritura; hay que conocer acento y significado.
- ⚠️ **umfahren:** **UMfahren** se separa y significa atropellar; um**FAH**ren no se separa y significa rodear.
- ⚠️ **Diccionario:** aprende cada verbo junto con su Partizip II, auxiliar, régimen y marca de separación.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: Separa correctamente en Präsens: Ich ____ um acht Uhr ____. (aufstehen)
  A: stehe / auf
  Type: fill-in-the-blank
- Q: Completa: Du ____ mich morgen ____. (anrufen)
  A: rufst / an
  Type: fill-in-the-blank
- Q: Traduce: Tengo que levantarme a las ocho.
  A: Ich muss um acht Uhr aufstehen.
  Type: flashcard
- Q: Corrige: Ich muss um acht Uhr stehen auf.
  A: Ich muss um acht Uhr aufstehen.
  Type: correction
- Q: Completa la subordinada: ..., weil ich früh ____. (aufstehen)
  A: aufstehe
  Type: fill-in-the-blank
- Q: Forma el Partizip II de aufstehen.
  A: aufgestanden
  Type: flashcard
- Q: Forma el Partizip II de anrufen.
  A: angerufen
  Type: flashcard
- Q: Forma el Partizip II de verstehen.
  A: verstanden
  Type: flashcard
- Q: Corrige: Ich habe die Frage geverstanden.
  A: Ich habe die Frage verstanden.
  Type: correction
- Q: Forma el infinitivo con zu de aufstehen.
  A: aufzustehen
  Type: flashcard
- Q: Forma el infinitivo con zu de verstehen.
  A: zu verstehen
  Type: flashcard
- Q: ¿Dónde suele caer el acento en un verbo separable?
  A: En el prefijo.
  Type: flashcard
- Q: ¿Dónde suele caer el acento en un verbo inseparable?
  A: En la raíz o en una sílaba posterior al prefijo.
  Type: flashcard
- Q: Nombra cuatro prefijos inseparables.
  A: be-, emp-, ent-, er-, ge-, miss-, ver-, zer- (cualquier cuatro)
  Type: flashcard
- Q: Nombra cuatro prefijos separables.
  A: ab-, an-, auf-, aus-, ein-, mit-, vor-, zu- (cualquier cuatro)
  Type: flashcard
- Q: Traduce: He aprobado el examen.
  A: Ich habe die Prüfung bestanden.
  Type: flashcard
- Q: Completa: Ich werde ein Video ____. (aufnehmen)
  A: aufnehmen
  Type: fill-in-the-blank
- Q: Completa: Ich habe ein Video ____. (aufnehmen)
  A: aufgenommen
  Type: fill-in-the-blank
- Q: ¿Qué significa UMfahren, con acento en el prefijo?
  A: atropellar / derribar con un vehículo
  Type: flashcard
- Q: ¿Qué significa umFAHren, con acento en la raíz?
  A: rodear / evitar pasando alrededor
  Type: flashcard
- Q: Completa el Perfekt separable: Er hat den Mann ____. (atropellar)
  A: umgefahren
  Type: fill-in-the-blank
- Q: Completa el Perfekt inseparable: Er hat den Mann ____. (rodear)
  A: umfahren
  Type: fill-in-the-blank
- Q: Corrige: Ich bin um acht Uhr geaufstanden.
  A: Ich bin um acht Uhr aufgestanden.
  Type: correction
- Q: Ordena: weil / sie / mich / später / anruft
  A: weil sie mich später anruft
  Type: ordering
<!-- DATA_QUIZ_END -->


---


### Unidad 34 — Verbos reflexivos (Reflexive Verben)

*Nivel orientativo:* **A2** · *Alcance A1 de esta app:* 📚

> Versión mínima (sich heißen, sich freuen) es A1; el resto es A2.

---
class_id: 034
title: "Verbos reflexivos"
level: "B1"
topics: ["Gramática", "Vocabulario", "Expresiones", "Verbos reflexivos", "Pronombres reflexivos"]
target_exam: "Telc / Goethe B1"
---

### Verbos reflexivos (Reflexive Verben)

#### 1. 🎯 Resumen / Objetivos de la Lección
- Comprender cómo funcionan los verbos reflexivos en alemán.
- Elegir el pronombre reflexivo adecuado para cada persona.
- Diferenciar los pronombres reflexivos en Akkusativ y Dativ.
- Reconocer cuándo el reflexivo pasa a Dativ por existir otro objeto en Akkusativ.
- Colocar el pronombre reflexivo correctamente en oraciones simples y subordinadas.
- Conjugar verbos reflexivos en distintos tiempos verbales.
- Distinguir verbos obligatoriamente reflexivos, usos opcionales y cambios de significado.
- Evitar traducciones literales entre los verbos reflexivos españoles y alemanes.

#### 2. 📚 Vocabulario Clave (Wortschatz)

##### Verbos obligatoriamente o habitualmente reflexivos

| Alemán | Español | Régimen / Clasificación | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| sich bedanken bei + Dat. / für + Akk. | dar las gracias a alguien por algo | Regular reflexivo | **Ich bedanke mich bei dir für die Hilfe.** |
| sich beeilen | darse prisa | Regular reflexivo | **Ich muss mich beeilen.** |
| sich befinden | encontrarse; estar situado | Irregular reflexivo | **Das Hotel befindet sich im Zentrum.** |
| sich benehmen | comportarse | Irregular reflexivo | **Das Kind benimmt sich gut.** |
| sich betrinken | emborracharse | Irregular reflexivo | **Er hat sich betrunken.** |
| sich eignen für + Akk. | ser adecuado para | Regular reflexivo | **Das Buch eignet sich für Anfänger.** |
| sich erholen | descansar; recuperarse | Regular reflexivo | **Wir erholen uns im Urlaub.** |
| sich erkälten | resfriarse | Regular reflexivo | **Ich habe mich erkältet.** |
| sich schämen für + Akk. | avergonzarse de | Regular reflexivo | **Er schämt sich für seinen Fehler.** |
| sich verspäten | llegar tarde; retrasarse | Regular reflexivo | **Der Zug verspätet sich.** |
| sich weigern, ... zu + Inf. | negarse a | Regular reflexivo | **Sie weigert sich zu kommen.** |
| sich verabreden mit + Dat. | quedar con alguien | Regular reflexivo | **Wir haben uns mit Freunden verabredet.** |
| sich mit jdm. treffen | quedar / encontrarse con alguien | Irregular reflexivo | **Ich treffe mich mit meinen Freunden.** |
| sich fürchten vor + Dat. | tener miedo de | Regular reflexivo | **Fürchtest du dich vor Hunden?** |

##### Verbos reflexivos frecuentes de rutina y estado

| Alemán | Español | Régimen / Clasificación | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| sich anziehen | vestirse | Irregular reflexivo separable | **Ich ziehe mich an.** |
| sich ausziehen | desvestirse | Irregular reflexivo separable | **Das Kind zieht sich aus.** |
| sich waschen | lavarse | Irregular reflexivo | **Ich wasche mich.** |
| sich kämmen | peinarse | Regular reflexivo | **Ich kämme mich.** |
| sich schminken | maquillarse | Regular reflexivo | **Sie schminkt sich.** |
| sich rasieren | afeitarse | Regular reflexivo en -ieren | **Er rasiert sich.** |
| sich setzen | sentarse | Regular reflexivo | **Setz dich bitte!** |
| sich hinlegen | tumbarse | Regular reflexivo separable | **Ich lege mich hin.** |
| sich fühlen | sentirse | Regular reflexivo | **Wie fühlst du dich?** |
| sich freuen auf + Akk. | alegrarse por algo futuro | Regular reflexivo | **Ich freue mich auf den Urlaub.** |
| sich freuen über + Akk. | alegrarse por algo presente/pasado | Regular reflexivo | **Ich freue mich über das Geschenk.** |
| sich ärgern über + Akk. | enfadarse por | Regular reflexivo | **Ich ärgere mich über den Fehler.** |
| sich interessieren für + Akk. | interesarse por | Regular reflexivo | **Sie interessiert sich für Musik.** |
| sich erinnern an + Akk. | acordarse de | Regular reflexivo | **Er erinnert sich an seine Kindheit.** |

##### Verbos cuyo significado cambia con y sin reflexivo

| Verbo | Reflexivo | Significado | Ejemplo |
| :--- | :--- | :--- | :--- |
| verlaufen | sí | equivocarse de camino; perderse | **Ich habe mich verlaufen.** |
| verlaufen | no | desarrollarse; transcurrir | **Die Prüfung verlief gut.** |
| ärgern | sí | enfadarse; irritarse | **Ich ärgere mich über meinen Fehler.** |
| ärgern | no | molestar; enfadar a alguien | **Er ärgert seine Schwester.** |
| sich aufhalten | sí | encontrarse; permanecer | **Wir halten uns gerade in München auf.** |
| aufhalten | no | detener; entretener | **Ich will Sie nicht aufhalten.** |
| sich ausziehen | sí | desvestirse | **Das Kind hat sich ausgezogen.** |
| ausziehen | no | mudarse de una vivienda | **Ich bin bei meinen Eltern ausgezogen.** |
| sich verlassen auf + Akk. | sí | confiar en | **Ich verlasse mich auf dich.** |
| verlassen | no | dejar; abandonar | **Sie hat ihren Freund verlassen.** |
| sich baden | sí, posible | darse un baño | **Ich bade mich.** |
| baden | no | bañarse / nadar en un lugar | **Ich bade im See.** |

##### Verbos reflexivos en alemán, pero no en español

| Alemán | Español | Régimen | Ejemplo |
| :--- | :--- | :--- | :--- |
| sich ändern | cambiar | Reflexivo | **Warum ändert sich das Klima?** |
| sich auswirken auf + Akk. | repercutir en | Reflexivo separable | **Die Ernährung wirkt sich auf die Gesundheit aus.** |
| sich belaufen auf + Akk. | ascender a | Reflexivo separable | **Die Kosten belaufen sich auf 300 Euro.** |
| sich bessern | mejorar | Reflexivo | **Bessert sich das Wetter morgen?** |
| sich drehen | girar; dar vueltas | Reflexivo | **Mir dreht sich alles im Kopf.** |
| sich fürchten vor + Dat. | temer; tener miedo de | Reflexivo | **Fürchtest du dich vor Hunden?** |
| sich verabreden | quedar | Reflexivo | **Wir haben uns für heute Abend verabredet.** |
| sich verschlechtern | empeorar | Reflexivo | **Das Wetter verschlechtert sich.** |
| sich etwas wünschen | desear algo | Reflexivo en Dativ + Akkusativ | **Ich wünsche mir ein Fahrrad.** |

##### Verbos reflexivos en español, pero no en alemán

| Español | Alemán | Clasificación alemana | Ejemplo |
| :--- | :--- | :--- | :--- |
| abonarse a | abonnieren + Akk. | No reflexivo | **Ich habe diese Zeitschrift abonniert.** |
| apagarse (la luz) | ausgehen | Separable, con sein | **Das Licht ist ausgegangen.** |
| arrepentirse de | bereuen + Akk. | No reflexivo | **Wir bereuen nichts.** |
| bañarse | baden | No necesariamente reflexivo | **Die Kinder baden im See.** |
| caerse | fallen | No reflexivo, con sein | **Ich bin vom Stuhl gefallen.** |
| callarse | schweigen | No reflexivo | **Warum schweigst du?** |
| casarse | heiraten | No reflexivo | **Er heiratet nächste Woche.** |
| componerse de | bestehen aus + Dat. | No reflexivo | **Der Text besteht aus drei Teilen.** |
| creerse algo | etwas glauben | No reflexivo | **Ich glaube das nicht.** |
| deberse a | zurückzuführen sein auf + Akk. | No reflexivo | **Der Erfolg ist auf harte Arbeit zurückzuführen.** |
| despertarse | aufwachen | No reflexivo, con sein | **Ich bin früh aufgewacht.** |
| dormirse | einschlafen | No reflexivo, con sein | **Das Kind ist eingeschlafen.** |
| ducharse | duschen | No reflexivo | **Ich dusche abends.** |
| encargarse de | übernehmen + Akk. | No reflexivo | **Kannst du diese Aufgabe übernehmen?** |
| encenderse (la luz) | angehen | No reflexivo, con sein | **Das Licht ist angegangen.** |
| enterarse de | erfahren von + Dat. / durch + Akk. | No reflexivo | **Ich habe davon erfahren.** |
| entrenarse para | trainieren für + Akk. | No reflexivo | **Wir trainieren für den Marathon.** |
| hundirse | untergehen | No reflexivo, con sein | **Das Schiff ist untergegangen.** |
| iniciarse / comenzar | beginnen | No reflexivo | **Die Schule beginnt im August.** |
| irse | gehen / weggehen | No reflexivo | **Ich gehe jetzt.** |
| levantarse | aufstehen | No reflexivo | **Sie steht früh auf.** |
| llamarse | heißen | No reflexivo | **Ich heiße Carolina.** |
| mudarse | umziehen | No reflexivo | **Ich ziehe morgen um.** |
| olvidarse | vergessen + Akk. | No reflexivo | **Wir haben deinen Namen vergessen.** |
| quedarse | bleiben | No reflexivo, con sein | **Wie lange bleibt ihr in Berlin?** |
| reírse | lachen | No reflexivo | **Sie hat viel gelacht.** |

##### Sustantivos útiles

| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Zahn, Zähne | el diente | Sustantivo masculino | **sich die Zähne putzen** |
| das Haar, -e | el cabello / pelo | Sustantivo neutro | Frecuente en plural: **die Haare** |
| die Hand, Hände | la mano | Sustantivo femenino | **sich die Hände waschen** |
| der Fehler, - | el error | Sustantivo masculino | **sich über einen Fehler ärgern** |
| die Gesundheit | la salud | Sustantivo femenino | Sin plural habitual. |
| die Kosten (Pl.) | los costes | Sustantivo plural | **Die Kosten belaufen sich auf...** |
| das Klima, Klimata / Klimate | el clima | Sustantivo neutro | **Das Klima ändert sich.** |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1. Qué es un verbo reflexivo

- En una construcción reflexiva, el sujeto realiza una acción que recae sobre él mismo.
- El pronombre reflexivo concuerda con el sujeto en persona y número:
  - **Ich wasche mich.**
  - **Du wäschst dich.**
  - **Wir waschen uns.**
- El infinitivo se aprende con **sich**:
  - **sich beeilen**
  - **sich freuen**
  - **sich erinnern**

##### 3.2. Pronombres reflexivos en Akkusativ

| Sujeto | Pronombre reflexivo | Ejemplo |
| :--- | :--- | :--- |
| ich | mich | **Ich kämme mich.** |
| du | dich | **Du ziehst dich an.** |
| er / sie / es | sich | **Sie beeilt sich.** |
| wir | uns | **Wir verspäten uns.** |
| ihr | euch | **Ihr schminkt euch.** |
| sie / Sie | sich | **Sie freuen sich.** |

- El Akkusativ es el caso reflexivo más frecuente.
- **sich** sirve para tercera persona singular, tercera persona plural y tratamiento formal.

##### 3.3. Pronombres reflexivos en Dativ

| Sujeto | Pronombre reflexivo | Ejemplo |
| :--- | :--- | :--- |
| ich | mir | **Ich putze mir die Zähne.** |
| du | dir | **Du putzt dir die Zähne.** |
| er / sie / es | sich | **Er putzt sich die Zähne.** |
| wir | uns | **Wir putzen uns die Zähne.** |
| ihr | euch | **Ihr putzt euch die Zähne.** |
| sie / Sie | sich | **Sie putzen sich die Zähne.** |

- Solo cambian claramente respecto al Akkusativ:
  - **mich → mir**
  - **dich → dir**

##### 3.4. Cuándo usar Akkusativ o Dativ

###### Sin otro objeto en Akkusativ

El pronombre reflexivo suele ir en Akkusativ:

> **Ich wasche mich.**  
> Me lavo.

###### Con otro objeto en Akkusativ

Si ya existe un objeto directo, el reflexivo suele ir en Dativ:

> **Ich wasche mir die Hände.**

- **mir** = Dativ, persona afectada;
- **die Hände** = Akkusativ, objeto lavado.

Otros ejemplos:

- **Ich putze mir die Zähne.**
- **Sie kämmt sich die Haare.**
- **Du ziehst dir die Jacke an.**
- **Wir wünschen uns einen Urlaub.**

##### 3.5. Partes del cuerpo y prendas

En alemán se usa con frecuencia:

`Pronombre reflexivo en Dativ + artículo determinado + parte del cuerpo/prenda`

- **Ich wasche mir die Hände.**
- **Er putzt sich die Zähne.**
- **Sie zieht sich die Schuhe an.**

No suele repetirse un posesivo cuando la relación con la persona ya está clara:

- natural: **Ich putze mir die Zähne.**
- posible pero marcado: **Ich putze meine Zähne.**

##### 3.6. Posición en la oración principal

El pronombre reflexivo aparece normalmente cerca del verbo conjugado:

- **Ich setze mich.**
- **Ich ziehe mich an.**
- **Heute setze ich mich ans Fenster.**

Con un pronombre sujeto, el orden básico es:

`Sujeto + verbo + pronombre reflexivo + complementos`

##### 3.7. Posición con tiempo compuesto

El pronombre reflexivo aparece después del auxiliar conjugado y antes del participio:

- **Ich habe mich geschminkt.**
- **Du hast dich beeilt.**
- **Wir hatten uns verabredet.**

**Fórmula:** `Sujeto + auxiliar + pronombre reflexivo + complementos + Partizip II`

##### 3.8. Posición con verbo modal y Futur

- Modal:
  - **Ich muss mich beeilen.**
- Futur I:
  - **Ich werde mich setzen.**
- Futur II:
  - **Ich werde mich gesetzt haben.**

El pronombre aparece después del verbo conjugado; el infinitivo o grupo verbal queda al final.

##### 3.9. Posición en la oración subordinada

Con un sujeto pronominal, el reflexivo suele aparecer inmediatamente después del sujeto:

> **Ich muss mich beeilen, damit ich mich nicht verspäte.**

> **Du kommst zu spät, weil du dich nicht beeilt hast.**

**Estructura básica:** `Conjunción + sujeto + pronombre reflexivo + complementos + verbo(s)`

##### 3.10. Tiempos verbales

| Tiempo | Reflexivo en Akkusativ | Reflexivo en Dativ |
| :--- | :--- | :--- |
| Präsens | **Ich setze mich.** | **Du föhnst dir die Haare.** |
| Präteritum | **Ich setzte mich.** | **Du föhntest dir die Haare.** |
| Perfekt | **Ich habe mich gesetzt.** | **Du hast dir die Haare geföhnt.** |
| Plusquamperfekt | **Ich hatte mich gesetzt.** | **Du hattest dir die Haare geföhnt.** |
| Futur I | **Ich werde mich setzen.** | **Du wirst dir die Haare föhnen.** |
| Futur II | **Ich werde mich gesetzt haben.** | **Du wirst dir die Haare geföhnt haben.** |
| Modal | **Ich muss mich setzen.** | **Du sollst dir die Haare föhnen.** |

##### 3.11. Verbos siempre reflexivos y usos opcionales

###### Obligatoriamente reflexivos

Algunos verbos no se usan con el mismo significado sin pronombre:

- **sich beeilen**
- **sich bedanken**
- **sich befinden**
- **sich erholen**
- **sich schämen**
- **sich verspäten**

###### Opcionalmente reflexivos

Otros verbos pueden actuar sobre el propio sujeto o sobre otra persona:

- **Die Friseurin kämmt sich.** — La peluquera se peina.
- **Die Friseurin kämmt die Kundin.** — La peluquera peina a la clienta.

- **Die Friseurin schneidet sich die Haare.** — La peluquera se corta el pelo.
- **Die Friseurin schneidet der Kundin die Haare.** — La peluquera le corta el pelo a la clienta.

##### 3.12. Preposiciones fijas

El verbo reflexivo debe aprenderse junto con su preposición y caso:

| Verbo | Pregunta | Ejemplo |
| :--- | :--- | :--- |
| sich freuen auf + Akk. | worauf? | **Ich freue mich auf den Urlaub.** |
| sich freuen über + Akk. | worüber? | **Ich freue mich über das Geschenk.** |
| sich interessieren für + Akk. | wofür? | **Sie interessiert sich für Kunst.** |
| sich erinnern an + Akk. | woran? | **Er erinnert sich an den Tag.** |
| sich ärgern über + Akk. | worüber? | **Wir ärgern uns über den Lärm.** |
| sich fürchten vor + Dat. | wovor? | **Das Kind fürchtet sich vor dem Hund.** |
| sich treffen mit + Dat. | mit wem? | **Ich treffe mich mit meinen Freunden.** |
| sich verlassen auf + Akk. | worauf? | **Du kannst dich auf mich verlassen.** |

##### 3.13. Ejemplo completo de rutina

> **Am Wochenende stehe ich spät auf. Ich ziehe mich an, kämme mich und putze mir die Zähne. Ich schminke mich, weil ich mich heute mit meinen Freunden treffe. Ich muss mich jetzt beeilen, damit ich mich nicht verspäte.**

*Los fines de semana me levanto tarde. Me visto, me peino y me lavo los dientes. Me maquillo porque hoy he quedado con mis amigos. Ahora tengo que darme prisa para no llegar tarde.*

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Wie fühlst du dich?**  
> *Traducción:* ¿Cómo te sientes?  
> *Uso:* Preguntar por el estado de alguien.

> **Ich muss mich beeilen.**  
> *Traducción:* Tengo que darme prisa.  
> *Uso:* Explicar que se dispone de poco tiempo.

> **Ich freue mich auf den Urlaub.**  
> *Traducción:* Tengo ganas de que lleguen las vacaciones.  
> *Uso:* Alegría por algo futuro.

> **Ich freue mich über das Geschenk.**  
> *Traducción:* Me alegro por el regalo.  
> *Uso:* Alegría por algo recibido o presente.

> **Wir treffen uns um acht Uhr.**  
> *Traducción:* Nos encontramos a las ocho.  
> *Uso:* Acordar un encuentro.

> **Du kannst dich auf mich verlassen.**  
> *Traducción:* Puedes confiar en mí.  
> *Uso:* Ofrecer apoyo.

> **Ich habe mich verlaufen.**  
> *Traducción:* Me he perdido.  
> *Uso:* Explicar que se ha tomado un camino equivocado.

#### 5. 💡 Notas de Pronunciación o Errores Comunes

- ⚠️ **Concordancia:** **ich → mich/mir**, **du → dich/dir**, **wir → uns**.
- ⚠️ **Objeto directo presente:** **Ich putze mir die Zähne**, no *Ich putze mich die Zähne*.
- ⚠️ **Artículo, no posesivo:** normalmente **mir die Hände**, no *mir meine Hände*.
- ⚠️ **Tercera persona:** **sich** sirve para singular, plural y **Sie** formal.
- ⚠️ **Posición en Perfekt:** **Ich habe mich beeilt**, no *Ich habe beeilt mich*.
- ⚠️ **Subordinada:** **weil du dich beeilt hast**.
- ⚠️ **No traducir literalmente:** «me caso» es **ich heirate**, no *ich heirate mich*.
- ⚠️ **Levantarse:** **aufstehen** no es reflexivo: **Ich stehe auf**.
- ⚠️ **Quedar con amigos:** **sich mit Freunden treffen** sí es reflexivo.
- ⚠️ **Caso después de preposición:** **vor dem Hund** (Dativ), pero **auf den Urlaub** (Akkusativ).
- ⚠️ **Corrección del PDF:** se normalizó **mit meinen Freunde** como **mit meinen Freunden**.
- ⚠️ **OCR:** se restauraron Umlauts, terminaciones y palabras cortadas en las listas.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: Completa: Ich kämme ____.
  A: mich
  Type: fill-in-the-blank
- Q: Completa: Du beeilst ____.
  A: dich
  Type: fill-in-the-blank
- Q: Completa: Wir freuen ____.
  A: uns
  Type: fill-in-the-blank
- Q: Completa: Ihr verspätet ____.
  A: euch
  Type: fill-in-the-blank
- Q: ¿Cuál es el reflexivo en Dativ de ich?
  A: mir
  Type: flashcard
- Q: ¿Cuál es el reflexivo en Dativ de du?
  A: dir
  Type: flashcard
- Q: Completa: Ich putze ____ die Zähne.
  A: mir
  Type: fill-in-the-blank
- Q: Corrige: Ich wasche mich die Hände.
  A: Ich wasche mir die Hände.
  Type: correction
- Q: Traduce: Tengo que darme prisa.
  A: Ich muss mich beeilen.
  Type: flashcard
- Q: Traduce: Nos encontramos a las ocho.
  A: Wir treffen uns um acht Uhr.
  Type: flashcard
- Q: Completa: Ich freue mich ____ den Urlaub. (futuro)
  A: auf
  Type: fill-in-the-blank
- Q: Completa: Ich freue mich ____ das Geschenk.
  A: über
  Type: fill-in-the-blank
- Q: Completa: Das Kind fürchtet sich ____ dem Hund.
  A: vor
  Type: fill-in-the-blank
- Q: Completa: Ich treffe mich mit meinen ____.
  A: Freunden
  Type: fill-in-the-blank
- Q: Traduce: Me he perdido.
  A: Ich habe mich verlaufen.
  Type: flashcard
- Q: ¿Qué significa Die Prüfung verlief gut?
  A: El examen transcurrió bien.
  Type: flashcard
- Q: Corrige: Ich habe beeilt mich.
  A: Ich habe mich beeilt.
  Type: correction
- Q: Completa la subordinada: ..., weil du ____ nicht beeilt hast.
  A: dich
  Type: fill-in-the-blank
- Q: Traduce: Me lavo el pelo.
  A: Ich wasche mir die Haare.
  Type: flashcard
- Q: ¿Es heiraten reflexivo en alemán?
  A: No.
  Type: true-false
- Q: ¿Es sich verabreden reflexivo en alemán?
  A: Sí.
  Type: true-false
- Q: Completa: Du kannst dich ____ mich verlassen.
  A: auf
  Type: fill-in-the-blank
- Q: Traduce: El clima está cambiando.
  A: Das Klima ändert sich.
  Type: flashcard
- Q: Ordena: weil / ich / mich / heute / mit meinen Freunden / treffe
  A: weil ich mich heute mit meinen Freunden treffe
  Type: ordering
<!-- DATA_QUIZ_END -->


---


### Unidad 35 — Pronombres reflexivos (Reflexivpronomen)

*Nivel orientativo:* **A1/A2** · *Alcance A1 de esta app:* ✅

> Acompaña a los verbos reflexivos frecuentes de A1.

---
class_id: 035
title: "Pronombres reflexivos"
level: "A2"
topics: ["Gramática", "Vocabulario", "Expresiones", "Pronombres reflexivos", "Reciprocidad", "Akkusativ", "Dativ"]
target_exam: "Telc / Goethe A2"
---

### Pronombres reflexivos (Reflexivpronomen)

#### 1. 🎯 Resumen / Objetivos de la Lección
- Identificar los pronombres reflexivos alemanes en Akkusativ y Dativ.
- Hacer concordar el pronombre reflexivo con el sujeto.
- Elegir entre **mich / mir** y **dich / dir**.
- Usar Dativ cuando ya existe un objeto en Akkusativ.
- Diferenciar el significado reflexivo del recíproco.
- Reconocer la posible ambigüedad de **uns**, **euch** y **sich**.
- Completar y justificar los siete ejercicios del PDF 073.

#### 2. 📚 Vocabulario Clave (Wortschatz)

##### Verbos reflexivos del material

| Alemán | Español | Régimen / Clasificación | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| sich duschen | ducharse | Regular, reflexivo en Akkusativ | También es habitual simplemente **duschen**. |
| sich anziehen | vestirse | Irregular separable, reflexivo en Akkusativ | **Ich ziehe mich an.** |
| sich setzen | sentarse | Regular, reflexivo en Akkusativ | **Wir setzen uns.** |
| sich treffen mit + Dat. | encontrarse / quedar con | Irregular reflexivo o recíproco | **Wir treffen uns um acht.** |
| sich kennenlernen | conocerse | Regular separable, recíproco | **Wo habt ihr euch kennengelernt?** |
| sich kennen | conocerse | Irregular, recíproco | **Sie kennen sich seit der Schulzeit.** |
| sich sehen | verse; verse mutuamente | Irregular | **Wir sehen uns morgen.** |
| sich lieben | quererse; amarse | Regular, recíproco | **Sie lieben sich.** |
| sich streiten | pelearse | Irregular, recíproco | **Tom und Albert streiten sich.** |
| sich einigen auf + Akk. | ponerse de acuerdo sobre | Regular reflexivo / recíproco | **Wir einigen uns auf einen Termin.** |
| sich die Zähne putzen | lavarse los dientes | Reflexivo en Dativ + Akkusativ | **Ich putze mir die Zähne.** |
| sich die Hände waschen | lavarse las manos | Reflexivo en Dativ + Akkusativ | **Wasch dir die Hände!** |
| sich die Haare föhnen | secarse el pelo | Reflexivo en Dativ + Akkusativ | **Du föhnst dir die Haare.** |

##### Sustantivos y expresiones

| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Zahn, Zähne | el diente | Sustantivo masculino | Normalmente plural en esta expresión. |
| die Hand, Hände | la mano | Sustantivo femenino | **die Hände waschen** |
| das Haar, -e | el cabello / pelo | Sustantivo neutro | Frecuente en plural: **die Haare** |
| das Frühstück, -e | el desayuno | Sustantivo neutro | **nach dem Frühstück** + Dativ |
| die Schulzeit | la época escolar | Sustantivo femenino | **seit der Schulzeit** + Dativ |
| halb acht | las siete y media | Expresión horaria | En alemán se cuenta hacia la hora siguiente. |
| einander | el uno al otro / mutuamente | Pronombre recíproco | Forma inequívocamente recíproca. |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1. Tabla completa

| Sujeto | Akkusativ | Dativ |
| :--- | :--- | :--- |
| ich | mich | mir |
| du | dich | dir |
| er / sie / es | sich | sich |
| wir | uns | uns |
| ihr | euch | euch |
| sie / Sie | sich | sich |

- Solamente **ich** y **du** cambian de forma entre ambos casos:
  - **mich → mir**
  - **dich → dir**
- Las demás formas son iguales en Akkusativ y Dativ.

##### 3.2. Concordancia con el sujeto

El pronombre reflexivo siempre se selecciona a partir del sujeto:

| Sujeto | Ejemplo |
| :--- | :--- |
| ich | **Ich wasche mich.** |
| du | **Du wäschst dich.** |
| er | **Er wäscht sich.** |
| wir | **Wir waschen uns.** |
| ihr | **Ihr wascht euch.** |
| sie | **Sie waschen sich.** |

- No depende del género:
  - **Er setzt sich.**
  - **Sie setzt sich.**
  - **Das Kind setzt sich.**

##### 3.3. Uso reflexivo

El pronombre es reflexivo cuando el sujeto realiza la acción sobre sí mismo:

- **Ich sehe mich im Spiegel.** — Me veo en el espejo.
- **Sie zieht sich an.** — Ella se viste.
- **Wir setzen uns.** — Nos sentamos.

**Estructura básica:** `Sujeto + verbo + pronombre reflexivo + complementos`

##### 3.4. Akkusativ: regla general

Si no hay otro objeto directo en la oración, el pronombre reflexivo suele ir en Akkusativ:

- **Ich dusche mich.**
- **Du ziehst dich an.**
- **Er setzt sich.**
- **Wir treffen uns.**

Preguntas de control:

- **Wen dusche ich? — Mich selbst.**
- **Wen siehst du? — Dich selbst.**

##### 3.5. Dativ: otro objeto ocupa el Akkusativ

Si la oración ya contiene un objeto directo en Akkusativ, el pronombre reflexivo suele pasar a Dativ.

> **Ich putze mir die Zähne.**

| Elemento | Función | Caso |
| :--- | :--- | :--- |
| ich | sujeto | Nominativ |
| mir | persona afectada | Dativ |
| die Zähne | objeto que se lava | Akkusativ |

Otros ejemplos:

- **Du wäschst dir die Hände.**
- **Er kämmt sich die Haare.**
- **Wir ziehen uns die Jacken an.**
- **Ihr föhnt euch die Haare.**

##### 3.6. Partes del cuerpo

La construcción natural suele ser:

`Pronombre reflexivo en Dativ + artículo determinado + parte del cuerpo`

- **Ich putze mir die Zähne.**
- **Wasch dir die Hände!**
- **Sie kämmt sich die Haare.**

El Dativ indica a quién pertenece o afecta la parte del cuerpo. Por eso no suele necesitarse un posesivo.

##### 3.7. Uso recíproco

El pronombre es recíproco cuando dos o más personas realizan la acción la una sobre la otra:

- **Wir sehen uns.** — Nos vemos el uno al otro.
- **Sie lieben sich.** — Se quieren mutuamente.
- **Tom und Albert streiten sich.** — Tom y Albert se pelean entre sí.
- **Ihr kennt euch.** — Os conocéis.

El uso recíproco exige lógicamente un sujeto plural o varios sujetos coordinados.

##### 3.8. Reflexivo o recíproco

Algunas frases pueden ser ambiguas:

> **Wir sehen uns.**

Puede significar:

1. Nos vemos a nosotros mismos, por ejemplo, en un espejo.
2. Nos vemos el uno al otro.

El contexto suele resolver la ambigüedad. Para marcar reciprocidad sin duda puede usarse **einander**:

- **Wir sehen einander.**
- **Sie helfen einander.**

##### 3.9. Pronombre reflexivo frente a pronombre personal

La tercera persona permite ver bien la diferencia:

- **Anna sieht sie.** — Anna la ve a ella, a otra mujer.
- **Anna sieht sich.** — Anna se ve a sí misma.

- **Paul wäscht ihn.** — Paul lo lava a él.
- **Paul wäscht sich.** — Paul se lava.

El reflexivo obliga a que el referente coincida con el sujeto.

##### 3.10. Posición en una oración simple

Con un sujeto pronominal:

`Sujeto + verbo conjugado + pronombre reflexivo + complementos`

- **Ich ziehe mich danach an.**
- **Wir treffen uns um halb acht.**
- **Sie kennen sich seit der Schulzeit.**

Si otro elemento ocupa la posición 1, el verbo permanece en posición 2:

- **Danach ziehe ich mich an.**
- **Um halb acht treffen wir uns.**

##### 3.11. Posición en Perfekt

`Sujeto + haben + pronombre reflexivo + complementos + Partizip II`

- **Wo habt ihr euch kennengelernt?**
- **Wir haben uns in Berlin getroffen.**
- **Sie haben sich lange nicht gesehen.**

El pronombre aparece después del auxiliar conjugado y antes del participio.

##### 3.12. Posición con modal

`Sujeto + modal + pronombre reflexivo + complementos + infinitivo`

- **Ich muss mich beeilen.**
- **Du sollst dir die Hände waschen.**
- **Wir wollen uns morgen treffen.**

##### 3.13. Imperativo

El pronombre concuerda con la persona a la que se dirige la orden:

| Destinatario | Ejemplo |
| :--- | :--- |
| du | **Setz dich! / Wasch dir die Hände!** |
| ihr | **Setzt euch! / Wascht euch die Hände!** |
| Sie | **Setzen Sie sich! / Waschen Sie sich die Hände!** |

##### 3.14. Soluciones de los ejercicios (PDF 073)

1. **Nach dem Frühstück putze ich mir die Zähne.**  
   *Después del desayuno me lavo los dientes.*  
   **mir** está en Dativ porque **die Zähne** ya ocupa el Akkusativ.

2. **Danach ziehe ich mich an.**  
   *Después me visto.*  
   No existe otro objeto directo; se usa **mich** en Akkusativ.

3. **Wann treffen wir uns?**  
   *¿Cuándo nos encontramos?*

4. **Hm ... wir treffen uns um halb acht.**  
   *Mmm... quedamos a las siete y media.*  
   **uns** tiene aquí sentido recíproco.

5. **Wo habt ihr euch kennengelernt?**  
   *¿Dónde os conocisteis?*

6. **Sie kennen sich seit der Schulzeit!**  
   *¡Se conocen desde la época escolar!*  
   **sich** expresa reciprocidad entre varias personas.

7. **Wasch dir die Hände schnell und komm runter!**  
   *¡Lávate las manos rápido y baja!*  
   **dir** es Dativ; **die Hände** es Akkusativ.

##### 3.15. Resumen para decidir el pronombre

1. Identifica el sujeto.
2. Elige su fila en la tabla.
3. Comprueba si ya existe un objeto en Akkusativ.
4. Si no existe, usa normalmente el reflexivo en Akkusativ.
5. Si existe, usa normalmente el reflexivo en Dativ.
6. Decide por el contexto si el significado es reflexivo o recíproco.

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Wann treffen wir uns?**  
> *Traducción:* ¿Cuándo quedamos?  
> *Uso:* Organizar un encuentro.

> **Wir treffen uns um halb acht.**  
> *Traducción:* Quedamos a las siete y media.  
> *Uso:* Fijar una hora.

> **Wo habt ihr euch kennengelernt?**  
> *Traducción:* ¿Dónde os conocisteis?  
> *Uso:* Preguntar por el inicio de una relación.

> **Wir sehen uns morgen!**  
> *Traducción:* ¡Nos vemos mañana!  
> *Uso:* Despedida informal.

> **Setzen Sie sich bitte!**  
> *Traducción:* ¡Siéntese / siéntense, por favor!  
> *Uso:* Invitación formal.

> **Wasch dir die Hände!**  
> *Traducción:* ¡Lávate las manos!  
> *Uso:* Instrucción informal.

#### 5. 💡 Notas de Pronunciación o Errores Comunes

- ⚠️ **mich / mir:** **Ich wasche mich**, pero **Ich wasche mir die Hände**.
- ⚠️ **dich / dir:** **Du ziehst dich an**, pero **Du putzt dir die Zähne**.
- ⚠️ **sich es invariable:** vale para **er, sie, es, sie** plural y **Sie** formal.
- ⚠️ **uns y euch:** tienen la misma forma en Akkusativ y Dativ.
- ⚠️ **Concordancia:** se dice **ihr kennt euch**, no *ihr kennt sich*.
- ⚠️ **Perfekt:** **Wo habt ihr euch kennengelernt?**, con **euch** después de **habt**.
- ⚠️ **Reciprocidad:** **Wir sehen uns** suele significar «nos vemos el uno al otro», pero el contexto manda.
- ⚠️ **Partes del cuerpo:** se prefiere **mir die Zähne**, no *mich die Zähne*.
- ⚠️ **halb acht:** significa las siete y media, no las ocho y media.
- ⚠️ **OCR normalizado:** se restauraron espacios, signos de interrogación y formas pronominales de los ejercicios.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: ¿Cuál es el reflexivo en Akkusativ de ich?
  A: mich
  Type: flashcard
- Q: ¿Cuál es el reflexivo en Dativ de ich?
  A: mir
  Type: flashcard
- Q: ¿Cuál es el reflexivo en Akkusativ de du?
  A: dich
  Type: flashcard
- Q: ¿Cuál es el reflexivo en Dativ de du?
  A: dir
  Type: flashcard
- Q: Completa: Ich ziehe ____ an.
  A: mich
  Type: fill-in-the-blank
- Q: Completa: Ich putze ____ die Zähne.
  A: mir
  Type: fill-in-the-blank
- Q: Completa: Du wäschst ____ die Hände.
  A: dir
  Type: fill-in-the-blank
- Q: Completa: Er setzt ____.
  A: sich
  Type: fill-in-the-blank
- Q: Completa: Wir treffen ____ morgen.
  A: uns
  Type: fill-in-the-blank
- Q: Completa: Ihr kennt ____ seit der Schulzeit.
  A: euch
  Type: fill-in-the-blank
- Q: Corrige: Ihr trefft sich um acht.
  A: Ihr trefft euch um acht.
  Type: correction
- Q: Traduce: ¿Cuándo quedamos?
  A: Wann treffen wir uns?
  Type: flashcard
- Q: Traduce: ¿Dónde os conocisteis?
  A: Wo habt ihr euch kennengelernt?
  Type: flashcard
- Q: Completa: Sie kennen ____ seit der Schulzeit.
  A: sich
  Type: fill-in-the-blank
- Q: Traduce: ¡Lávate las manos!
  A: Wasch dir die Hände!
  Type: flashcard
- Q: ¿Por qué se usa mir en Ich putze mir die Zähne?
  A: Porque die Zähne ya es el objeto en Akkusativ y el reflexivo pasa a Dativ.
  Type: flashcard
- Q: ¿Qué puede significar Wir sehen uns?
  A: Nos vemos a nosotros mismos o nos vemos el uno al otro, según el contexto.
  Type: flashcard
- Q: ¿Qué pronombre expresa reciprocidad sin ambigüedad?
  A: einander
  Type: flashcard
- Q: Corrige: Wo habt euch ihr kennengelernt?
  A: Wo habt ihr euch kennengelernt?
  Type: correction
- Q: Completa: Ich muss ____ beeilen.
  A: mich
  Type: fill-in-the-blank
- Q: Completa: Du sollst ____ die Hände waschen.
  A: dir
  Type: fill-in-the-blank
- Q: Traduce: Siéntense, por favor.
  A: Setzen Sie sich bitte!
  Type: flashcard
- Q: ¿Qué hora es halb acht?
  A: Las siete y media.
  Type: flashcard
- Q: Ordena: um halb acht / wir / uns / treffen
  A: Wir treffen uns um halb acht.
  Type: ordering
<!-- DATA_QUIZ_END -->


---


### Unidad 36 — Todo sobre la voz pasiva (Passiv)

*Nivel orientativo:* **B1** · *Alcance A1 de esta app:* 📚

---
class_id: 036
title: "Todo sobre la voz pasiva"
level: "B2"
topics: ["Gramática", "Vocabulario", "Expresiones", "Vorgangspassiv", "Zustandspassiv", "Pasiva impersonal"]
target_exam: "Telc / Goethe B2"
---

### Todo sobre la voz pasiva (Passiv)

#### 1. 🎯 Resumen / Objetivos de la Lección
- Diferenciar una oración activa de una oración pasiva.
- Distinguir **Vorgangspassiv** (pasiva de proceso) y **Zustandspassiv** (pasiva de estado).
- Formar ambos tipos de pasiva en los tiempos verbales principales.
- Transformar una oración activa en pasiva sin cambiar su tiempo verbal.
- Expresar el agente mediante **von + Dativ** y el medio o causa mediante **durch + Akkusativ**.
- Construir la pasiva con verbos modales.
- Entender qué ocurre con los objetos en Akkusativ y Dativ.
- Formar pasivas impersonales con verbos intransitivos.
- Reconocer restricciones semánticas, falsos pasivos y la forma especial **worden**.

#### 2. 📚 Vocabulario Clave (Wortschatz)

##### Conceptos esenciales

| Alemán | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| die Aktivform, -en | la forma activa | Sustantivo femenino | El sujeto realiza la acción. |
| die Passivform, -en | la forma pasiva | Sustantivo femenino | Se destaca el proceso o resultado. |
| das Vorgangspassiv | la pasiva de proceso | Sustantivo neutro | **werden + Partizip II** |
| das Zustandspassiv | la pasiva de estado | Sustantivo neutro | **sein + Partizip II** |
| der Vorgang, Vorgänge | el proceso; acontecimiento | Sustantivo masculino | Acción en desarrollo o realizada. |
| der Zustand, Zustände | el estado | Sustantivo masculino | Resultado existente tras una acción. |
| der Handelnde, -n | el agente; quien actúa | Sustantivo, N-Deklination | Puede omitirse en pasiva. |
| das Ergebnis, -se | el resultado | Sustantivo neutro | Central en el Zustandspassiv. |
| der Empfänger, - | el receptor | Sustantivo masculino | Un objeto en Dativ permanece en Dativ. |

##### Verbos frecuentes en construcciones pasivas

| Alemán | Español | Clasificación | Partizip II |
| :--- | :--- | :--- | :--- |
| backen | hornear | Irregular / mixto, Akkusativ | gebacken |
| reparieren | reparar | Regular en -ieren, Akkusativ | repariert |
| packen | empaquetar | Regular, Akkusativ | gepackt |
| verletzen | herir | Regular inseparable, Akkusativ | verletzt |
| verbinden | vendar; unir | Irregular inseparable, Akkusativ | verbunden |
| operieren | operar | Regular en -ieren, Akkusativ | operiert |
| bauen | construir | Regular, Akkusativ | gebaut |
| öffnen | abrir | Regular, Akkusativ | geöffnet |
| schließen | cerrar | Irregular, Akkusativ | geschlossen |
| renovieren | renovar | Regular en -ieren, Akkusativ | renoviert |
| untersuchen | examinar | Regular inseparable, Akkusativ | untersucht |
| verkaufen | vender | Regular inseparable, Akkusativ | verkauft |
| helfen | ayudar | Irregular, Dativ | geholfen |
| antworten | responder | Regular, Dativ | geantwortet |
| zuhören | escuchar atentamente | Regular separable, Dativ | zugehört |
| warten auf + Akk. | esperar a / por | Regular con preposición | gewartet |
| kämpfen gegen + Akk. | luchar contra | Regular con preposición | gekämpft |

##### Sustantivos de los ejemplos

| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Kuchen, - | el pastel | Sustantivo masculino | **Der Kuchen wird gebacken.** |
| das Auto, -s | el coche | Sustantivo neutro | **Das Auto wird repariert.** |
| der Koffer, - | la maleta | Sustantivo masculino | **Die Koffer werden gepackt.** |
| der Verband, Verbände | la venda; el vendaje | Sustantivo masculino | **einen Verband anlegen** |
| das Krankenhaus, Krankenhäuser | el hospital | Sustantivo neutro | **ins Krankenhaus bringen** |
| das Oktoberfest | la Fiesta de Octubre | Nombre propio neutro | **Das Oktoberfest wird eröffnet.** |
| das Fenster, - | la ventana | Sustantivo neutro | **Das Fenster ist geöffnet.** |
| die Hausaufgabe, -n | los deberes / la tarea | Sustantivo femenino | Frecuente en plural. |
| der Rassismus | el racismo | Sustantivo masculino | **gegen Rassismus kämpfen** |
| der Regen | la lluvia | Sustantivo masculino | **auf Regen warten** |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1. Activa frente a pasiva

###### Oración activa

El sujeto realiza la acción:

> **Der Bäcker backt den Kuchen.**  
> El panadero hornea el pastel.

- **Der Bäcker** = agente y sujeto.
- **den Kuchen** = objeto en Akkusativ.

###### Oración pasiva

El proceso o el elemento afectado ocupa el centro:

> **Der Kuchen wird gebacken.**  
> El pastel se hornea / está siendo horneado.

- El agente puede omitirse.
- El antiguo objeto acusativo se convierte en sujeto nominativo.

##### 3.2. Dos tipos principales

| Tipo | Fórmula | Pregunta | Foco |
| :--- | :--- | :--- | :--- |
| Vorgangspassiv | **werden + Partizip II** | **Was passiert?** | Acción o proceso |
| Zustandspassiv | **sein + Partizip II** | **Wie ist der Zustand?** | Estado resultante |

Comparación:

- **Die Tür wird geschlossen.** — La puerta está siendo cerrada.
- **Die Tür ist geschlossen.** — La puerta está cerrada.

##### 3.3. Vorgangspassiv en Präsens

**Fórmula:** `Sujeto + werden conjugado + complementos + Partizip II`

| Persona / número | werden | Ejemplo |
| :--- | :--- | :--- |
| ich | werde | **Ich werde gefragt.** |
| du | wirst | **Du wirst gefragt.** |
| er / sie / es | wird | **Der Mann wird verletzt.** |
| wir / sie / Sie | werden | **Die Häuser werden gebaut.** |
| ihr | werdet | **Ihr werdet gefragt.** |

El participio permanece invariable.

##### 3.4. Vorgangspassiv en todos los tiempos

| Tiempo | Fórmula | Ejemplo |
| :--- | :--- | :--- |
| Präsens | werden + Partizip II | **Der Mann wird verletzt.** |
| Präteritum | wurde + Partizip II | **Der Mann wurde verletzt.** |
| Perfekt | sein + Partizip II + worden | **Der Mann ist verletzt worden.** |
| Plusquamperfekt | war + Partizip II + worden | **Der Mann war verletzt worden.** |
| Futur I | werden + Partizip II + werden | **Der Mann wird verletzt werden.** |
| Futur II | werden + Partizip II + worden sein | **Der Mann wird verletzt worden sein.** |

##### 3.5. Worden y geworden

- En el Perfekt y Plusquamperfekt del Vorgangspassiv se usa **worden**:
  - **Das Haus ist gebaut worden.**
  - **Das Haus war gebaut worden.**
- **geworden** pertenece al verbo pleno **werden** con el significado «convertirse / llegar a ser»:
  - **Er ist Arzt geworden.**

| Correcto | Incorrecto |
| :--- | :--- |
| **Das Haus ist gebaut worden.** | *Das Haus ist gebaut geworden.* |

##### 3.6. Agente, causa y medio

###### Von + Dativ

Presenta a la persona, institución o entidad considerada agente:

- **Der Kuchen wird vom Bäcker gebacken.**
- **Das Auto wird von der Mechanikerin repariert.**
- **Der Brief wird von der Post zugestellt.**

###### Durch + Akkusativ

Presenta frecuentemente el medio, mecanismo o causa que produce el proceso:

- **Die Kerzen wurden durch den Wind ausgeblasen.**
- **Der Alarm wurde durch Rauch ausgelöst.**
- **Die Nachricht wurde durch einen Boten überbracht.**

La distinción depende del papel semántico, no solo de si el sustantivo designa una persona.

##### 3.7. Transformación de activa a pasiva personal

Ejemplo:

> **Der Tierarzt operiert den Hund.**

Pasos:

1. El objeto en Akkusativ **den Hund** pasa a Nominativ: **der Hund**.
2. El verbo se convierte en **werden + Partizip II**.
3. El sujeto activo puede omitirse o aparecer como **vom Tierarzt**.

> **Der Hund wird vom Tierarzt operiert.**

##### 3.8. Tabla de transformación

| Activa | Pasiva |
| :--- | :--- |
| **Sie verletzt den Mann.** | **Der Mann wird von ihr verletzt.** |
| **Er fragte mich.** | **Ich wurde von ihm gefragt.** |
| **Der Bauarbeiter baut Häuser.** | **Häuser werden vom Bauarbeiter gebaut.** |
| **Der Tierarzt operiert den Hund.** | **Der Hund wird vom Tierarzt operiert.** |

- El tiempo verbal debe conservarse.
- El caso del nuevo sujeto cambia de Akkusativ a Nominativ.

##### 3.9. El Dativ permanece en Dativ

Un objeto dativo no se convierte en sujeto:

| Activa | Pasiva |
| :--- | :--- |
| **Mein Vater hilft mir.** | **Mir wird von meinem Vater geholfen.** |
| **Die Schülerin antwortet dem Lehrer nicht.** | **Dem Lehrer wird nicht geantwortet.** |
| **Niemand hört ihm zu.** | **Ihm wird nicht zugehört.** |

La oración pasiva no tiene aquí un sujeto léxico nominativo. Es una pasiva impersonal.

##### 3.10. Complementos preposicionales y circunstanciales

Los complementos conservan su preposición y caso:

| Activa | Pasiva |
| :--- | :--- |
| **Sie diskutieren über Politik.** | **Über Politik wird diskutiert.** |
| **Die Menschen kämpfen gegen Rassismus.** | **Gegen Rassismus wird gekämpft.** |
| **Die Bauern warten täglich auf Regen.** | **Täglich wird auf Regen gewartet.** |
| **Morgen schreiben wir einen Test.** | **Morgen wird ein Test geschrieben.** |

##### 3.11. Pasiva impersonal

Los verbos intransitivos pueden formar Vorgangspassiv si describen una actividad controlada:

- **Es wird getanzt.** — Se baila.
- **Es wurde viel gearbeitet.** — Se trabajó mucho.
- **Es wird über das Problem gesprochen.** — Se habla del problema.
- **Mir wird geholfen.** — Se me ayuda.

###### Función de es

- **Es** puede ocupar la primera posición como elemento formal:
  - **Es wird heute getanzt.**
- Si otro elemento ocupa la primera posición, **es** desaparece:
  - **Heute wird getanzt.**

**Corrección importante:** no es cierto que solo los verbos con Akkusativ puedan formar pasiva. Solo ellos pueden formar la pasiva personal típica con promoción del objeto; muchos intransitivos admiten pasiva impersonal.

##### 3.12. Pasiva con verbo modal

###### Präsens

`Modal conjugado + complementos + Partizip II + werden`

- **Das Auto muss in Berlin gebaut werden.**
- **Die Fenster können geöffnet werden.**

###### Präteritum

- **Das Auto musste in Berlin gebaut werden.**
- **Die Fenster konnten geöffnet werden.**

###### Perfekt

`haben + complementos + Partizip II + werden + modal en infinitivo`

- **Das Auto hat in Berlin gebaut werden müssen.**
- **Die Fenster haben geöffnet werden können.**

###### Plusquamperfekt

- **Das Auto hatte in Berlin gebaut werden müssen.**
- **Die Fenster hatten geöffnet werden können.**

###### Futur I

- **Das Auto wird in Berlin gebaut werden müssen.**
- **Die Fenster werden geöffnet werden können.**

Estas cadenas verbales son propias de niveles intermedios y avanzados.

##### 3.13. Usos frecuentes del Vorgangspassiv

1. Instrucciones, recetas y procesos:
   - **Zuerst werden die Kartoffeln gewaschen.**
   - **Danach werden sie geschnitten.**
2. Noticias y accidentes:
   - **Ein Mann wurde angefahren.**
   - **Der Verletzte wurde ins Krankenhaus gebracht.**
3. Textos científicos, técnicos y administrativos:
   - **Die Daten werden analysiert.**
4. Cuando el agente es desconocido, irrelevante u obvio:
   - **Mein Auto wurde gewaschen.**
   - **Der Täter wurde festgenommen.**
5. Para evitar nombrar al responsable:
   - **Mir wird einfach nicht geholfen.**

##### 3.14. Zustandspassiv: estado resultante

**Fórmula:** `Sujeto + sein conjugado + complementos + Partizip II`

> **Die Tür ist geschlossen.**  
> La puerta está cerrada.

> **Der Mann ist verletzt.**  
> El hombre está herido.

El proceso previo se presupone; el foco está en el estado actual.

##### 3.15. Zustandspassiv en todos los tiempos

| Tiempo | Fórmula | Ejemplo |
| :--- | :--- | :--- |
| Präsens | sein + Partizip II | **Der Mann ist verletzt.** |
| Präteritum | war + Partizip II | **Der Mann war verletzt.** |
| Perfekt | ist + Partizip II + gewesen | **Der Mann ist verletzt gewesen.** |
| Plusquamperfekt | war + Partizip II + gewesen | **Der Mann war verletzt gewesen.** |
| Futur I | wird + Partizip II + sein | **Der Mann wird verletzt sein.** |
| Futur II | wird + Partizip II + gewesen sein | **Der Mann wird verletzt gewesen sein.** |

En la práctica, las formas complejas del Zustandspassiv son menos frecuentes y dependen mucho del contexto.

##### 3.16. Vorgangspassiv frente a Zustandspassiv

| Acción / estado | Alemán | Traducción |
| :--- | :--- | :--- |
| Proceso presente | **Das Fenster wird geöffnet.** | La ventana está siendo abierta. |
| Estado presente | **Das Fenster ist geöffnet.** | La ventana está abierta. |
| Proceso pasado | **Das Fenster wurde geöffnet.** | La ventana fue abierta. |
| Estado pasado | **Das Fenster war geöffnet.** | La ventana estaba abierta. |
| Proceso completado | **Das Fenster ist geöffnet worden.** | La ventana ha sido abierta. |
| Estado que existió | **Das Fenster ist geöffnet gewesen.** | La ventana ha estado abierta. |

##### 3.17. Sein + Partizip II no siempre es pasiva

Una forma con **sein + Partizip II** puede funcionar como:

- Zustandspassiv: **Die Tür ist geschlossen.**
- Adjetivo resultativo: **Er ist interessiert.**
- Perfekt activo de un verbo que usa **sein**: **Ein Unfall ist passiert.**

###### Ein Unfall ist passiert

Esta oración no es pasiva:

- **passieren** forma su Perfekt activo con **sein**;
- **passiert** es su Partizip II;
- no existe aquí una acción externa aplicada al accidente.

No puede analizarse sustituyendo simplemente **ist** por **wird**.

##### 3.18. Verbos y construcciones con restricciones

###### Verbos reflexivos

Normalmente no forman pasiva estándar porque el sujeto y el objeto reflexivo tienen el mismo referente:

- activa: **Ich verstecke mich.**
- no estándar: *Ich werde mich versteckt.*

###### Verbos de posesión y relación

Verbos como **haben**, **besitzen**, **kennen**, **wissen** y la expresión **es gibt** suelen rechazar una pasiva natural por razones semánticas:

- **Ich habe einen Hund.**
- no natural: *Ein Hund wird von mir gehabt.*

###### Verbos intransitivos no agentivos

Los acontecimientos sin agente controlador suelen resistir la pasiva:

- **Er schläft.**
- *Es wird von ihm geschlafen* es posible solo en contextos marcados o contrastivos, no como equivalente neutro.

La posibilidad de formar pasiva depende tanto de la estructura como del significado del verbo.

##### 3.19. Mantener el tiempo verbal

| Activa | Vorgangspassiv | Zustandspassiv |
| :--- | :--- | :--- |
| **Jemand verletzt den Mann.** | **Der Mann wird verletzt.** | **Der Mann ist verletzt.** |
| **Jemand verletzte den Mann.** | **Der Mann wurde verletzt.** | **Der Mann war verletzt.** |
| **Jemand hat den Mann verletzt.** | **Der Mann ist verletzt worden.** | **Der Mann ist verletzt gewesen.** |
| **Jemand hatte den Mann verletzt.** | **Der Mann war verletzt worden.** | **Der Mann war verletzt gewesen.** |
| **Jemand wird den Mann verletzen.** | **Der Mann wird verletzt werden.** | **Der Mann wird verletzt sein.** |
| **Jemand wird den Mann verletzt haben.** | **Der Mann wird verletzt worden sein.** | **Der Mann wird verletzt gewesen sein.** |

##### 3.20. Ejemplos normalizados

###### Vorgangspassiv

- **Das Fenster wird vom Lehrer geöffnet.**
- **Die Hausaufgaben werden vom Schüler gemacht.**
- **Das Schwimmbad war geschlossen worden.**
- **Das Haus wird schon seit über drei Jahren renoviert.**
- **Die Bilder sind in der Kunstgalerie verkauft worden.**
- **Die Kinder werden vom Arzt untersucht.**

###### Zustandspassiv

- **Das Fenster ist geöffnet.**
- **Die Hausaufgaben sind gemacht.**
- **Das Schwimmbad ist geschlossen gewesen.**
- **Das Haus war schon seit über drei Jahren renoviert.**
- **Die Bilder werden in der Kunstgalerie verkauft sein.**
- **Die Kinder werden vom Arzt untersucht gewesen sein.**

Las últimas formas son gramaticales, pero muy poco frecuentes; normalmente se reformulan de manera más sencilla.

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Was ist passiert?**  
> *Traducción:* ¿Qué ha pasado?  
> *Uso:* Preguntar por un acontecimiento; esta frase es activa, no pasiva.

> **Hier wird Deutsch gesprochen.**  
> *Traducción:* Aquí se habla alemán.  
> *Uso:* Indicar una actividad general sin agente.

> **Die Tür ist geschlossen.**  
> *Traducción:* La puerta está cerrada.  
> *Uso:* Describir un estado.

> **Die Tür wird geschlossen.**  
> *Traducción:* La puerta está siendo cerrada.  
> *Uso:* Describir un proceso.

> **Mir wurde nicht geholfen.**  
> *Traducción:* No me ayudaron / no se me ayudó.  
> *Uso:* Pasiva impersonal con Dativ.

> **Das muss noch gemacht werden.**  
> *Traducción:* Eso todavía tiene que hacerse.  
> *Uso:* Expresar una obligación sin mencionar al agente.

#### 5. 💡 Notas de Pronunciación o Errores Comunes

- ⚠️ **Proceso:** **werden + Partizip II**.
- ⚠️ **Estado:** **sein + Partizip II**.
- ⚠️ **Perfekt pasivo:** **ist gemacht worden**, no *ist gemacht geworden*.
- ⚠️ **El objeto acusativo cambia de caso:** **den Mann → der Mann**.
- ⚠️ **El Dativ no asciende:** **Mir wird geholfen**, no *Ich werde geholfen*.
- ⚠️ **Modal al final:** **Das muss gemacht werden**.
- ⚠️ **Pasiva impersonal:** los verbos sin Akkusativ sí pueden admitirla: **Es wird getanzt**.
- ⚠️ **Es desaparece si hay otro elemento inicial:** **Heute wird getanzt**.
- ⚠️ **No todo sein + participio es Zustandspassiv:** **Ein Unfall ist passiert** es Perfekt activo.
- ⚠️ **von / durch:** **von** suele introducir al agente; **durch**, el medio o la causa.
- ⚠️ **Formas complejas:** Futur II pasivo y Zustandspassiv compuesto son gramaticales, pero raros en el uso cotidiano.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: ¿Cuál es la fórmula del Vorgangspassiv en Präsens?
  A: werden conjugado + Partizip II
  Type: flashcard
- Q: ¿Cuál es la fórmula del Zustandspassiv en Präsens?
  A: sein conjugado + Partizip II
  Type: flashcard
- Q: Traduce: La puerta está siendo cerrada.
  A: Die Tür wird geschlossen.
  Type: flashcard
- Q: Traduce: La puerta está cerrada.
  A: Die Tür ist geschlossen.
  Type: flashcard
- Q: Transforma: Der Bäcker backt den Kuchen.
  A: Der Kuchen wird vom Bäcker gebacken.
  Type: transformation
- Q: Transforma: Der Tierarzt operierte den Hund.
  A: Der Hund wurde vom Tierarzt operiert.
  Type: transformation
- Q: Completa el Perfekt pasivo: Das Haus ist gebaut ____.
  A: worden
  Type: fill-in-the-blank
- Q: Corrige: Das Haus ist gebaut geworden.
  A: Das Haus ist gebaut worden.
  Type: correction
- Q: Completa: Mir ____ geholfen.
  A: wird
  Type: fill-in-the-blank
- Q: ¿Qué ocurre con un objeto en Dativ al transformar a pasiva?
  A: Permanece en Dativ.
  Type: flashcard
- Q: Traduce: Aquí se habla alemán.
  A: Hier wird Deutsch gesprochen.
  Type: flashcard
- Q: Traduce: Hoy se baila.
  A: Heute wird getanzt.
  Type: flashcard
- Q: ¿Puede un verbo sin objeto acusativo formar pasiva impersonal?
  A: Sí.
  Type: true-false
- Q: Completa: Das muss noch gemacht ____.
  A: werden
  Type: fill-in-the-blank
- Q: Forma el Präteritum pasivo de Der Mann wird verletzt.
  A: Der Mann wurde verletzt.
  Type: transformation
- Q: Forma el Plusquamperfekt pasivo de Das Haus wird gebaut.
  A: Das Haus war gebaut worden.
  Type: transformation
- Q: Forma el Futur I pasivo de Das Haus wird gebaut.
  A: Das Haus wird gebaut werden.
  Type: transformation
- Q: Completa: Die Fenster haben geöffnet werden ____.
  A: können
  Type: fill-in-the-blank
- Q: ¿Qué introduce normalmente von + Dativ?
  A: El agente.
  Type: flashcard
- Q: ¿Qué introduce frecuentemente durch + Akkusativ?
  A: El medio, mecanismo o causa.
  Type: flashcard
- Q: ¿Es Ein Unfall ist passiert una oración pasiva?
  A: No, es Perfekt activo.
  Type: true-false
- Q: Corrige: Ich werde geholfen.
  A: Mir wird geholfen.
  Type: correction
- Q: Completa el Zustandspassiv: Die Fenster ____ geöffnet.
  A: sind
  Type: fill-in-the-blank
- Q: Ordena: wird / über Politik / diskutiert
  A: Über Politik wird diskutiert.
  Type: ordering
<!-- DATA_QUIZ_END -->


---


### Unidad 37 — Pronombres interrogativos (Interrogativpronomen)

*Nivel orientativo:* **A1** · *Alcance A1 de esta app:* ✅

---
class_id: 037
title: "Pronombres interrogativos"
level: "B1"
topics: ["Gramática", "Pronombres interrogativos", "Casos", "Declinación", "Expresiones"]
target_exam: "Telc / Goethe B1"
---

### Pronombres interrogativos (Interrogativpronomen)

#### 1. 🎯 Resumen / Objetivos de la Lección
- Formular preguntas sobre personas y cosas con **wer, wen, wem, wessen** y **was**.
- Elegir el pronombre interrogativo según el caso: Nominativ, Akkusativ, Dativ o Genitiv.
- Declinar **welcher-** y **was für ein-** según género, número y caso.
- Distinguir entre una elección concreta (**welcher-**) y una pregunta por el tipo o la clase (**was für ein-**).

#### 2. 📚 Vocabulario Clave (Wortschatz)

| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| wer | quién | Pronombre interrogativo, Nominativ | **Wer hat das gesagt?** |
| wen | a quién | Pronombre interrogativo, Akkusativ | **Wen habt ihr angerufen?** |
| wem | a quién | Pronombre interrogativo, Dativ | **Wem hast du das Buch gegeben?** |
| wessen | de quién | Pronombre interrogativo, Genitiv | **Wessen Tasche ist das?** |
| was | qué | Pronombre interrogativo | **Was hast du gegessen?** |
| welcher / welches / welche | cuál; qué | Pronombre o determinante interrogativo | Selección entre opciones concretas. |
| was für ein- | qué tipo de; qué clase de | Expresión interrogativa | Pregunta por las características o la categoría. |
| der Computer, - | el ordenador | Sustantivo masculino | **Wessen Computer ist kaputt?** |
| der Lehrer, - | el profesor | Sustantivo masculino | **Wem antworten die Schüler?** |
| der Kellner, - | el camarero | Sustantivo masculino, N-Deklination | **Wen kennt Max?** |
| die Tür, -en | la puerta | Sustantivo femenino | **Was hast du zugemacht?** |
| der Schuh, -e | el zapato | Sustantivo masculino | **Welche Schuhe gehören ihr?** |
| das Auto, -s | el coche | Sustantivo neutro | **Was für ein Auto fährst du?** |
| der Wein, -e | el vino | Sustantivo masculino | **Was für einen Wein möchten Sie?** |
| der Hund, -e | el perro | Sustantivo masculino | **Welcher Hund gehört Manuela?** |
| anrufen | llamar por teléfono | Verbo irregular separable, Akkusativ | **jemanden anrufen** |
| antworten | responder | Verbo regular, Dativ | **jemandem antworten** |
| geben | dar | Verbo irregular, Dativ + Akkusativ | **jemandem etwas geben** |
| gehören | pertenecer | Verbo regular, Dativ | **Das Auto gehört mir.** |
| treffen | encontrarse con; ver | Verbo irregular, Akkusativ | **jemanden treffen** |
| besuchen | visitar | Verbo regular, Akkusativ | **jemanden besuchen** |
| zumachen | cerrar | Verbo regular separable, Akkusativ | **die Tür zumachen** |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1. Pronombres interrogativos y casos

| Caso | Persona | Cosa | Función | Ejemplo |
| :--- | :--- | :--- | :--- | :--- |
| Nominativ | wer | was | Sujeto | **Wer fährt nach Berlin?** |
| Akkusativ | wen | was | Objeto directo | **Wen kennt Max?** |
| Dativ | wem | — | Objeto indirecto | **Wem antworten die Schüler?** |
| Genitiv | wessen | wessen | Posesión o pertenencia | **Wessen Computer ist kaputt?** |

- **Regla / Concepto:** el pronombre interrogativo sustituye exactamente al elemento desconocido y conserva su función sintáctica.
- **Estructura / Fórmula:** `Interrogativpronomen + verbo conjugado + sujeto + complementos?`
- Si el pronombre interrogativo es el sujeto, el verbo aparece inmediatamente después: `Wer + Verb + Ergänzung?`
- Con una preposición, esta se mantiene delante del pronombre: **Mit wem sprichst du?**, **Auf wen wartest du?**

##### 3.2. Declinación de welcher-

| Caso | Masculino | Neutro | Femenino | Plural |
| :--- | :--- | :--- | :--- | :--- |
| Nominativ | welcher | welches | welche | welche |
| Akkusativ | welchen | welches | welche | welche |
| Dativ | welchem | welchem | welcher | welchen |
| Genitiv | welches | welches | welcher | welcher |

- **welcher-** adopta las terminaciones del artículo determinado.
- Puede acompañar a un sustantivo o sustituirlo: **Welches Auto?** / **Welches?**
- Las formas genitivas existen, pero son poco frecuentes en preguntas cotidianas.

##### 3.3. Declinación de was für ein-

| Caso | Masculino | Neutro | Femenino | Plural |
| :--- | :--- | :--- | :--- | :--- |
| Nominativ | was für ein / was für einer | was für ein / was für eins | was für eine | was für welche |
| Akkusativ | was für einen | was für ein / was für eins | was für eine | was für welche |
| Dativ | was für einem | was für einem | was für einer | was für welchen |
| Genitiv | was für eines | was für eines | was für einer | was für welcher |

- La terminación se añade a **ein-**; **was für** no cambia.
- Las formas después de la barra se usan cuando se omite el sustantivo: **Was für ein Auto fährst du?** → **Was für eins fährst du?**
- En plural no aparece **ein**: **Was für Schuhe suchst du?** Cuando el sustantivo se omite: **Was für welche suchst du?**
- Las formas genitivas son gramaticalmente posibles, pero prácticamente no se emplean en el uso corriente.

##### 3.4. Welcher- frente a was für ein-

- **welcher-** pregunta cuál de varias opciones concretas:  
  **Welches Auto gehört dir, der Porsche oder der BMW?**
- **was für ein-** pregunta por el tipo, la clase o las características:  
  **Was für ein Auto fährst du? – Einen kleinen Fiat.**

##### 3.5. Soluciones de los ejercicios

###### Elección entre welcher- y was für ein-

1. **Welches Auto fährt deine Frau? – Den kleinen Fiat da hinten.**
2. **Was für ein Auto fährt deine Frau? – Einen kleinen Fiat.**
3. **Was für einen Wein möchten Sie trinken? – Einen trockenen Weißwein.**
4. **Welches Auto gehört dir, der Porsche oder der BMW? – Der Porsche natürlich.**

###### Sustitución por el pronombre interrogativo adecuado

1. **Wessen Computer ist kaputt? – Christinas Computer.**
2. **Wem antworten die Schüler? – Dem Lehrer.**
3. **Wen kennt Max? – Den Kellner.**
4. **Was habe ich schon zugemacht? – Die Tür.**
5. **Wer fährt nach Berlin? – Meine Freundin.**
6. **Was ist heute schön? – Das Wetter.**
7. **Wen haben meine Eltern getroffen? – Max.**
8. **Wer besucht ihn am Samstag? – Seine Großeltern.**
9. **Wer hat morgen Geburtstag? – Meine Katze.**
10. **Welche Schuhe gehören seiner Schwester? – Die blauen Schuhe.**
11. **Was lernen die Studenten? – Die Deutschvokabeln.**
12. **Wen hat ihre Mama im Supermarkt getroffen? – Meinen Vater.**

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Was ist das?**  
> *Traducción:* ¿Qué es eso?  
> *Uso:* Preguntar por la identidad de una cosa.

> **Wer hat das gesagt?**  
> *Traducción:* ¿Quién ha dicho eso?  
> *Uso:* Preguntar por el sujeto de una acción.

> **Wem hast du das Buch gegeben?**  
> *Traducción:* ¿A quién le has dado el libro?  
> *Uso:* Preguntar por el destinatario en Dativ.

> **Wessen Tasche ist das?**  
> *Traducción:* ¿De quién es este bolso?  
> *Uso:* Preguntar por el poseedor.

> **Was für einen Wein möchten Sie trinken?**  
> *Traducción:* ¿Qué tipo de vino le gustaría beber?  
> *Uso:* Preguntar formalmente por una clase o característica.

> **Welcher Hund gehört Manuela, der große oder der kleine?**  
> *Traducción:* ¿Cuál perro pertenece a Manuela, el grande o el pequeño?  
> *Uso:* Elegir entre opciones concretas.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** no elijas **wer, wen** o **wem** por la traducción española, sino por el caso exigido por el verbo: **jemanden anrufen** → **Wen?**; **jemandem antworten** → **Wem?**
- ⚠️ **Atención:** **wessen** no lleva apóstrofo y normalmente precede al sustantivo sin artículo: **Wessen Tasche?**
- ⚠️ **Atención:** **welcher-** selecciona una opción identificable; **was für ein-** pregunta por el tipo.
- ⚠️ **Atención:** en **was für ein-**, el caso modifica a **ein-**, no a **was für**: **was für einen Wein**.
- ⚠️ **Atención:** con animales domésticos personificados es habitual preguntar **wer**; **was** también puede aparecer si se los trata simplemente como animales.
- La **w** alemana de **wer, wen, wem, was** se pronuncia aproximadamente como una **v** española.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: ____ fährt nach Berlin? (meine Freundin)
  A: Wer
  Type: fill-in-the-blank
- Q: ____ kennt Max? (den Kellner)
  A: Wen
  Type: fill-in-the-blank
- Q: ____ antworten die Schüler? (dem Lehrer)
  A: Wem
  Type: fill-in-the-blank
- Q: ____ Computer ist kaputt? (Christinas Computer)
  A: Wessen
  Type: fill-in-the-blank
- Q: ____ Auto gehört dir, der Porsche oder der BMW?
  A: Welches
  Type: fill-in-the-blank
- Q: ____ ____ ____ Wein möchten Sie trinken? (einen trockenen Weißwein)
  A: Was für einen
  Type: fill-in-the-blank
- Q: ¿Qué diferencia hay entre "welcher-" y "was für ein-"?
  A: "Welcher-" selecciona entre opciones concretas; "was für ein-" pregunta por el tipo o la clase.
  Type: flashcard
- Q: Traduce: ¿A quién le has dado el libro?
  A: Wem hast du das Buch gegeben?
  Type: flashcard
- Q: Traduce: ¿De quién es este bolso?
  A: Wessen Tasche ist das?
  Type: flashcard
- Q: ¿Qué caso representa "wen"?
  A: Akkusativ.
  Type: flashcard
- Q: ¿Qué caso representa "wem"?
  A: Dativ.
  Type: flashcard
- Q: Completa la declinación: welcher (Nom. masc.) → ____ (Akk. masc.) → ____ (Dat. masc.)
  A: welchen → welchem
  Type: fill-in-the-blank
<!-- DATA_QUIZ_END -->


---


### Unidad 38 — Pronombres demostrativos (Demonstrativpronomen)

*Nivel orientativo:* **A2** · *Alcance A1 de esta app:* 📚

---
class_id: 038
title: "Pronombres demostrativos"
level: "B2"
topics: ["Gramática", "Pronombres demostrativos", "Declinación", "Casos", "Oraciones relativas"]
target_exam: "Telc / Goethe B2"
---

### Pronombres demostrativos (Demonstrativpronomen)

#### 1. 🎯 Resumen / Objetivos de la Lección
- Señalar, identificar o destacar personas, objetos e ideas mediante pronombres demostrativos.
- Declinar **dieser-**, **jener-** y **der / die / das** según género, número y caso.
- Emplear la forma invariable **dies** para retomar una idea o una oración completa.
- Diferenciar **derjenige-** (aquel que / la persona que) de **derselbe-** (el mismo).
- Usar demostrativos como pronombres o como determinantes que acompañan a un sustantivo.

#### 2. 📚 Vocabulario Clave (Wortschatz)

| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| dieser / dieses / diese | este / esto / esta | Pronombre o determinante demostrativo | Selecciona o destaca un elemento. |
| jener / jenes / jene | aquel / aquello / aquella | Pronombre o determinante demostrativo | Es correcto, pero poco frecuente en el habla coloquial. |
| der / das / die | ese / eso / esa; aquel / aquello / aquella | Pronombre demostrativo | Recibe énfasis al hablar. |
| dies | esto; eso | Pronombre demostrativo invariable | Retoma una idea o una oración completa. |
| derjenige / dasjenige / diejenige | aquel / aquello / aquella que | Pronombre demostrativo compuesto | Suele introducir un referente explicado por una oración relativa. |
| derselbe / dasselbe / dieselbe | el mismo / lo mismo / la misma | Pronombre demostrativo compuesto | Indica identidad, no solo semejanza. |
| die Kaffeemaschine, -n | la máquina de café | Sustantivo femenino | **diese Kaffeemaschine** |
| der Flohmarkt, Flohmärkte | el mercadillo | Sustantivo masculino | **auf dem Flohmarkt** |
| das Kleid, -er | el vestido | Sustantivo neutro | **Welches Kleid? - Dieses.** |
| die Kleidung | la ropa | Sustantivo femenino, sin plural habitual | **mit der Kleidung** |
| das Rätsel, - | el acertijo | Sustantivo neutro | **ein Rätsel lösen** |
| die Prüfung, -en | el examen | Sustantivo femenino | **die Prüfung bestehen** |
| der Preis, -e | el premio; el precio | Sustantivo masculino | **einen Preis bekommen** |
| anprobieren | probarse | Verbo regular separable, Akkusativ | **Schuhe anprobieren** |
| anziehen | ponerse; vestirse | Verbo irregular separable, Akkusativ | **ein Kleid anziehen** |
| halten von + Dativ | opinar de | Verbo irregular con preposición | **Was hältst du von ihnen?** |
| gehören | pertenecer | Verbo regular, Dativ | **Das Auto gehört mir.** |
| gratulieren | felicitar | Verbo regular, Dativ | **jemandem gratulieren** |
| bestehen | aprobar; superar | Verbo irregular intransitivo | **eine Prüfung bestehen** |
| Schluss machen mit + Dativ | terminar una relación con | Expresión verbal | **mit jemandem Schluss machen** |
| mit jemandem nichts zu tun haben | no tener relación con alguien | Expresión | **Mit denen habe ich nichts zu tun.** |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1. Dieser-, jener- y der / die / das

| Caso | Masculino | Neutro | Femenino | Plural |
| :--- | :--- | :--- | :--- | :--- |
| Nominativ | dieser / der | dieses / das | diese / die | diese / die |
| Akkusativ | diesen / den | dieses / das | diese / die | diese / die |
| Dativ | diesem / dem | diesem / dem | dieser / der | diesen / denen |
| Genitiv | dieses / dessen | dieses / dessen | dieser / deren | dieser / deren |

- **Regla / Concepto:** el demostrativo concuerda con el género y el número del referente, y adopta el caso exigido por su función o por la preposición.
- **Estructura / Fórmula:** `Demonstrativpronomen declinado + verbo + complementos`
- **jener-** sigue las mismas terminaciones que **dieser-**: **jener, jenes, jene, jenen, jenem, jener**.
- En el alemán coloquial se prefieren con frecuencia **der / die / das** o **dieser-** en lugar de **jener-**.
- En Dativ plural, **die** se transforma en **denen**: **Von denen habe ich lange nichts gehört.**

##### 3.2. Pronombre o determinante

- Como pronombre, reemplaza al sustantivo: **Welches Kleid soll ich anziehen? - Dieses.**
- Como determinante, acompaña al sustantivo: **Mit dieser Kleidung kommst du nicht in diesen Club.**
- Los demostrativos **der / die / das** tienen las mismas formas visibles que el artículo determinado, pero reciben un énfasis especial al hablar y señalan un referente concreto.

##### 3.3. La forma invariable dies

- **dies** no se declina cuando retoma una situación, idea u oración completa.
- **Man sollte weniger Fleisch essen. - Dies finde ich auch wichtig.**
- **Dies habe ich ihr nicht gesagt!**

##### 3.4. Declinación de derjenige-

| Caso | Masculino | Neutro | Femenino | Plural |
| :--- | :--- | :--- | :--- | :--- |
| Nominativ | derjenige | dasjenige | diejenige | diejenigen |
| Akkusativ | denjenigen | dasjenige | diejenige | diejenigen |
| Dativ | demjenigen | demjenigen | derjenigen | denjenigen |
| Genitiv | desjenigen | desjenigen | derjenigen | derjenigen |

- **derjenige-** destaca a una persona o cosa concreta y suele ir seguido de una oración relativa.
- Sus dos componentes se declinan: el artículo y la terminación de **-jenige**.
- **Derjenige, der das Rätsel zuerst löst, bekommt einen Preis.**
- **Wir gratulieren denjenigen, die die Prüfung bestanden haben.**

##### 3.5. Declinación de derselbe-

| Caso | Masculino | Neutro | Femenino | Plural |
| :--- | :--- | :--- | :--- | :--- |
| Nominativ | derselbe | dasselbe | dieselbe | dieselben |
| Akkusativ | denselben | dasselbe | dieselbe | dieselben |
| Dativ | demselben | demselben | derselben | denselben |
| Genitiv | desselben | desselben | derselben | derselben |

- **derselbe-** se refiere exactamente a la misma persona o cosa ya mencionada.
- Sus dos componentes también se declinan.
- **Warum fragst du mich jeden Tag dasselbe?**
- **Es ist derselbe wie immer.**

##### 3.6. Soluciones de los ejercicios

1. **Ich möchte gerne diese Kaffeemaschine kaufen.**
2. **Kennst du jenen Jungen dort? - Ja, den kenne ich.**
3. **Das ist dieselbe Person, die gestern schon angerufen hat.**
4. **Wieso fragst du mich immer dasselbe?**
5. **Wie gefällt dir die Jacke? - Diese finde ich nicht schön, aber jene schon.**
6. **Wie findest du Max und Lisa? - Uff, mit denen habe ich nichts zu tun.**
7. **Derjenige, der etwas weiß, soll es mir sagen.**
8. **Ich gratuliere denjenigen, die die Hausaufgaben richtig machen!**
9. **Ich habe denselben Mann zwei Tage nacheinander gesehen.**

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Wo hast du den Tisch gekauft? - Den habe ich auf dem Flohmarkt gekauft.**  
> *Traducción:* ¿Dónde compraste la mesa? - La compré en el mercadillo.  
> *Uso:* Retomar enfáticamente un sustantivo masculino en Akkusativ.

> **Wie findest du diese Schuhe? - Die finde ich sehr schön!**  
> *Traducción:* ¿Qué te parecen estos zapatos? - ¡Me parecen muy bonitos!  
> *Uso:* Sustituir un referente plural ya conocido.

> **Was hältst du von Maria und Laura? - Mit denen habe ich noch nicht viel gesprochen.**  
> *Traducción:* ¿Qué opinas de Maria y Laura? - Todavía no he hablado mucho con ellas.  
> *Uso:* Referirse a varias personas después de una preposición con Dativ.

> **Möchten Sie diese Schuhe anprobieren? - Nein, lieber die.**  
> *Traducción:* ¿Le gustaría probarse estos zapatos? - No, mejor esos.  
> *Uso:* Elegir entre opciones concretas.

> **Warum fragst du mich jeden Tag dasselbe?**  
> *Traducción:* ¿Por qué me preguntas todos los días lo mismo?  
> *Uso:* Referirse exactamente al mismo contenido.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** no confundas **derselbe** con **der gleiche**. **Derselbe** significa exactamente el mismo objeto; **der gleiche** puede ser otro objeto del mismo tipo.
- ⚠️ **Atención:** después de una preposición, el demostrativo adopta el caso exigido: **mit der**, **von denen**, **mit denjenigen**.
- ⚠️ **Atención:** el Dativ plural de **die** es **denen**, no *den* cuando funciona como pronombre.
- ⚠️ **Atención:** **dies** es invariable si sustituye una idea completa; para un sustantivo concreto se usa una forma declinada: **dieser / dieses / diese**.
- ⚠️ **Atención:** se escribe **derselbe**, **dieselbe**, **dasselbe**; no *der selbe* ni *das gleiche* si se quiere expresar identidad estricta.
- En el habla, los demostrativos **der / die / das** se pronuncian con énfasis para distinguirlos de los artículos.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: Ich möchte gerne ____ Kaffeemaschine kaufen. (diese)
  A: diese
  Type: fill-in-the-blank
- Q: Kennst du ____ Jungen dort? (jener)
  A: jenen
  Type: fill-in-the-blank
- Q: Max und Lisa? Mit ____ habe ich nichts zu tun.
  A: denen
  Type: fill-in-the-blank
- Q: Das ist ____ Person, die gestern angerufen hat. (dieselbe)
  A: dieselbe
  Type: fill-in-the-blank
- Q: Warum fragst du mich immer ____? (lo mismo)
  A: dasselbe
  Type: fill-in-the-blank
- Q: ____, der etwas weiß, soll es mir sagen.
  A: Derjenige
  Type: fill-in-the-blank
- Q: Ich gratuliere ____, die bestanden haben.
  A: denjenigen
  Type: fill-in-the-blank
- Q: Ich habe ____ Mann zwei Tage nacheinander gesehen. (el mismo)
  A: denselben
  Type: fill-in-the-blank
- Q: ¿Cuándo se utiliza la forma invariable "dies"?
  A: Cuando retoma una idea, situación u oración completa.
  Type: flashcard
- Q: ¿Qué diferencia hay entre "derjenige" y "derselbe"?
  A: "Derjenige" destaca a una persona o cosa concreta, a menudo definida por una relativa; "derselbe" indica exactamente la misma persona o cosa.
  Type: flashcard
- Q: Traduce: Con ellos no he hablado mucho.
  A: Mit denen habe ich noch nicht viel gesprochen.
  Type: flashcard
- Q: Completa: derselbe (Nom. masc.) → ____ (Akk. masc.) → ____ (Dat. masc.)
  A: denselben → demselben
  Type: fill-in-the-blank
<!-- DATA_QUIZ_END -->


---


### Unidad 39 — Pronombres indefinidos (Indefinitpronomen)

*Nivel orientativo:* **A2** · *Alcance A1 de esta app:* 📚

---
class_id: 039
title: "Pronombres indefinidos"
level: "B2"
topics: ["Gramática", "Pronombres indefinidos", "Declinación", "Casos", "Expresiones"]
target_exam: "Telc / Goethe B2"
---

### Pronombres indefinidos (Indefinitpronomen)

#### 1. 🎯 Resumen / Objetivos de la Lección
- Expresar personas, cosas o cantidades indeterminadas.
- Diferenciar pronombres referidos solo a personas, solo a cosas o a ambos grupos.
- Usar correctamente **man, jemand, niemand, etwas, nichts** y sus variantes con **irgend-**.
- Declinar **all-, einig-, jed-, ein-/kein-, manch-, mehrere-** y el indefinido **welch-**.
- Elegir entre formas cercanas como **jemand / irgendjemand** y **einige / manche / mehrere**.

#### 2. 📚 Vocabulario Clave (Wortschatz)

| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| man | uno; se; la gente | Pronombre indefinido impersonal | El verbo va en 3.ª persona del singular. |
| jemand | alguien | Pronombre indefinido, persona | **Jemand kommt zu uns.** |
| niemand | nadie | Pronombre indefinido, persona | **Niemand ist bereit.** |
| irgendjemand / irgendwer | alguien; quienquiera | Pronombre indefinido, persona | Refuerza la indeterminación. |
| etwas | algo | Pronombre indefinido, cosa | **Hast du etwas gehört?** |
| nichts | nada | Pronombre indefinido, cosa | **Ich habe nichts gehört.** |
| irgendetwas / irgendwas | algo; cualquier cosa | Pronombre indefinido, cosa | El hablante no identifica qué es. |
| alles | todo | Pronombre indefinido | **Alles hat ein Ende.** |
| welch- | algo de; alguno(s) | Pronombre indefinido | Sustituye un sustantivo conocido. |
| all- | todo(s) | Pronombre o determinante indefinido | Expresa totalidad. |
| einig- | alguno(s); unas cuantas cosas | Pronombre o determinante indefinido | Cantidad limitada e imprecisa. |
| jed- | cada; cada uno | Pronombre o determinante indefinido | Normalmente se refiere a unidades singulares. |
| ein- / kein- | uno / ninguno | Pronombre indefinido | Retoma un sustantivo ya conocido. |
| manch- | algún; algunos | Pronombre o determinante indefinido | Cercano a **einig-**. |
| mehrere- | varios; unos cuantos | Pronombre o determinante indefinido | Solo existe en plural. |
| die Traube, -n | la uva | Sustantivo femenino | **Hast du noch welche?** |
| der Käse, - | el queso | Sustantivo masculino | **Haben wir noch welchen?** |
| die Geduld | la paciencia | Sustantivo femenino, sin plural habitual | **Ich habe keine.** |
| der Grund, Gründe | el motivo | Sustantivo masculino | **aus mehreren Gründen** |
| die Auswahl | la selección; elección | Sustantivo femenino | **zur Auswahl stehen** |
| vertrauen | confiar | Verbo regular, Dativ | **jemandem vertrauen** |
| festnehmen | detener; arrestar | Verbo irregular separable, Akkusativ | **Menschen festnehmen** |
| ablehnen | rechazar | Verbo regular separable, Akkusativ | **einen Vorschlag ablehnen** |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1. Clasificación general

| Referente | Formas principales |
| :--- | :--- |
| Solo personas | **man, jemand, niemand, irgendjemand, irgendwer** |
| Solo cosas | **etwas, nichts, alles, irgendetwas, irgendwas, welch-** |
| Personas y cosas | **all-, einig-, jed-, ein-/kein-, manch-, mehrere-** |

##### 3.2. Man, jemand y niemand

| Caso | man | jemand | niemand |
| :--- | :--- | :--- | :--- |
| Nominativ | man | jemand | niemand |
| Akkusativ | einen | jemanden | niemanden |
| Dativ | einem | jemandem | niemandem |

- **man** solo puede ser sujeto y exige el verbo en 3.ª persona singular: **Man darf hier nicht rauchen.**
- Cuando se retoma a **man** como objeto se emplea **einen** o **einem**.
- El posesivo que remite a **man** es **sein-**: **Man kann seine eigene Stimme kaum hören.**
- **jemand** y **niemand** también son singulares. En el uso coloquial pueden aparecer sin terminación en Akkusativ o Dativ, pero las formas declinadas son las recomendadas en esta clase.
- **Regla / Fórmula:** `man + verbo en 3.ª persona singular + complementos`

##### 3.3. El prefijo irgend-

- **irgend-** aumenta la indeterminación: el referente no se conoce o no importa.
- **jemand**: se sabe o se presupone que existe una persona.
- **irgendjemand / irgendwer**: podría ser cualquier persona.
- **etwas**: alguna cosa no especificada.
- **irgendetwas / irgendwas**: cualquier cosa o algo que no se logra identificar.

##### 3.4. Etwas, nichts, alles y welch-

- **etwas, nichts** y **alles** no se declinan en sus usos habituales.
- **welch-** indefinido sustituye a un sustantivo conocido y significa “algo de eso” o “alguno(s)”.
- Ejemplos: **Hast du noch welche?** (uvas, plural); **Haben wir noch welchen?** (queso, masculino Akkusativ).
- No debe confundirse con **welcher-** interrogativo: **Welchen möchtest du?** pregunta cuál; **Hast du noch welchen?** pregunta si queda algo del referente.

##### 3.5. Declinación de all-

| Caso | Masculino | Neutro | Femenino | Plural |
| :--- | :--- | :--- | :--- | :--- |
| Nominativ | aller | alles | alle | alle |
| Akkusativ | allen | alles | alle | alle |
| Dativ | allem | allem | aller | allen |
| Genitiv | allen / alles | allen / alles | aller | aller |

- **all-** expresa totalidad: **Alle wollen den Film sehen.**
- El Dativ plural es **allen**: **Der Film gefällt allen.**
- En expresiones establecidas aparece el Genitiv plural: **aller Zeiten**.

##### 3.6. Declinación de einig-

| Caso | Masculino | Neutro | Femenino | Plural |
| :--- | :--- | :--- | :--- | :--- |
| Nominativ | einiger | einiges | einige | einige |
| Akkusativ | einigen | einiges | einige | einige |
| Dativ | einigem | einigem | einiger | einigen |
| Genitiv | einigen / einiges | einigen / einiges | einiger | einiger |

- **einig-** indica una cantidad indeterminada y limitada.
- **Einiges** suele equivaler a “algunas cosas”: **Ich würde einiges anders machen.**
- **Einige von uns** significa “algunos de nosotros”.

##### 3.7. Declinación de jed-

| Caso | Masculino | Neutro | Femenino | Equivalente plural |
| :--- | :--- | :--- | :--- | :--- |
| Nominativ | jeder | jedes | jede | alle |
| Akkusativ | jeden | jedes | jede | alle |
| Dativ | jedem | jedem | jeder | allen |
| Genitiv | jedes | jedes | jeder | aller |

- **jed-** distribuye una afirmación entre los miembros individuales de un conjunto.
- No tiene un plural ordinario con el sentido de “cada”; para generalizar se emplea **alle**.
- **Jeder darf hinein.** = **Alle dürfen hinein.**

##### 3.8. Declinación pronominal de ein- y kein-

| Caso | Masculino | Neutro | Femenino | Plural |
| :--- | :--- | :--- | :--- | :--- |
| Nominativ | einer / keiner | eins / keins | eine / keine | welche / keine |
| Akkusativ | einen / keinen | eins / keins | eine / keine | welche / keine |
| Dativ | einem / keinem | einem / keinem | einer / keiner | welchen / keinen |
| Genitiv | eines / keines | eines / keines | einer / keiner | welcher / keiner |

- Estas formas reemplazan a un sustantivo ya mencionado.
- En plural, **ein-** se sustituye por **welch-**: **Hast du noch welche?**
- **Du hast ein schönes Auto. Ich will auch eins.**
- **Gibst du mir einen? - Ich habe keinen mehr.**

##### 3.9. Declinación de manch-

| Caso | Masculino | Neutro | Femenino | Plural |
| :--- | :--- | :--- | :--- | :--- |
| Nominativ | mancher | manches | manche | manche |
| Akkusativ | manchen | manches | manche | manche |
| Dativ | manchem | manchem | mancher | manchen |
| Genitiv | manches | manches | mancher | mancher |

- **manch-** significa “algún” o “algunos” y puede acompañar o sustituir al sustantivo.
- Se aproxima a **einig-**, aunque **manch-** suele presentar los casos como parte de una observación general: **Manche glauben, perfekt zu sein.**

##### 3.10. Declinación de mehrere-

| Caso | Plural |
| :--- | :--- |
| Nominativ | mehrere |
| Akkusativ | mehrere |
| Dativ | mehreren |
| Genitiv | mehrerer |

- **mehrere-** solo existe en plural y expresa una cantidad de más de uno, sin precisar cuántos.
- **Mehrere von uns gehen ins Kino.**
- **Aus mehreren Gründen muss ich ablehnen.**

##### 3.11. Soluciones de los ejercicios

1. **Darf man hier rauchen?**
2. **Hier in der Firma muss man einem alles zweimal sagen.**
3. **Als Athlet muss man hart trainieren.**
4. **„Ist hier jemand?“, fragte er vorsichtig. „Niemand“, hörte er.**
5. **Jemand muss diese Arbeit tun, aber niemand ist bereit.**
6. **Psst, sei ruhig. Da ist irgendetwas.**
7. **Es gibt mehrere Filme zur Auswahl. Welchen möchtest du sehen?**
8. **Ich habe mich aus mehreren Gründen für Deutschland entschieden.**
9. **Welches Kleid soll ich kaufen? Mir gefallen mehrere.**
10. **Alles hat ein Ende, nur die Wurst hat zwei Enden.**
11. **Es liegt im Interesse aller, das Problem zu lösen.**
12. **Scheinbar haben einige von euch die Situation nicht verstanden.**
13. **Die Muffins riechen sehr lecker! Gibst du mir einen?**
14. **Mein Partner hat unendliche Geduld, aber ich habe keine.**
15. **Das weiß doch jeder.**
16. **Heutzutage würde ich einiges anders machen.**

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **So etwas macht man nicht!**  
> *Traducción:* ¡Eso no se hace!  
> *Uso:* Expresar una norma social de forma impersonal.

> **Man kann wirklich niemandem vertrauen!**  
> *Traducción:* ¡De verdad que no se puede confiar en nadie!  
> *Uso:* Combinar **man** con un objeto en Dativ.

> **Möchten Sie noch etwas essen? - Nein, ich möchte nichts mehr, danke.**  
> *Traducción:* ¿Desea comer algo más? - No quiero nada más, gracias.  
> *Uso:* Ofrecer y rechazar algo cortésmente.

> **In der Liebe will ich alles oder nichts.**  
> *Traducción:* En el amor lo quiero todo o nada.  
> *Uso:* Expresar totalidad frente a ausencia.

> **Das geht gar nicht.**  
> *Traducción:* Eso es totalmente inaceptable.  
> *Uso:* Rechazar o criticar enérgicamente una situación.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** **man** lleva una sola *n*; **der Mann, Männer** significa “el hombre”.
- ⚠️ **Atención:** el verbo con **man, jemand** y **niemand** aparece en singular.
- ⚠️ **Atención:** no existe *manen* ni *manem*: las formas que retoman a **man** son **einen** y **einem**.
- ⚠️ **Atención:** **niemand** ya expresa negación; no se añade **nicht** para negar la misma función.
- ⚠️ **Atención:** en plural, la forma positiva pronominal de **ein-** es **welche**, no *eine*.
- ⚠️ **Atención:** **mehrere** no significa “muchos”, sino “varios” o “más de uno”.
- ⚠️ **Atención:** **jeder** se combina con verbo singular; **alle**, con verbo plural.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: Darf ____ hier rauchen?
  A: man
  Type: fill-in-the-blank
- Q: Der Stress macht ____ krank. (man, Akkusativ)
  A: einen
  Type: fill-in-the-blank
- Q: Man kann ____ vertrauen. (niemand, Dativ)
  A: niemandem
  Type: fill-in-the-blank
- Q: Ist hier ____? - Nein, ____.
  A: jemand → niemand
  Type: fill-in-the-blank
- Q: Die Trauben waren lecker. Hast du noch ____?
  A: welche
  Type: fill-in-the-blank
- Q: Ich habe keine Geduld. Mein Partner hat viel, aber ich habe ____.
  A: keine
  Type: fill-in-the-blank
- Q: Aus ____ Gründen muss ich ablehnen. (mehrere, Dativ)
  A: mehreren
  Type: fill-in-the-blank
- Q: Es liegt im Interesse ____. (alle, Genitiv plural)
  A: aller
  Type: fill-in-the-blank
- Q: ¿Qué diferencia aporta "irgend-" en "irgendjemand"?
  A: Refuerza la indeterminación; la identidad de la persona es totalmente desconocida o irrelevante.
  Type: flashcard
- Q: ¿Qué pronombre indefinido solo existe en plural?
  A: mehrere-
  Type: flashcard
- Q: Traduce: Todo el mundo lo sabe.
  A: Das weiß jeder. / Alle wissen das.
  Type: flashcard
- Q: Completa: einige (Nom. plural) → ____ (Dat. plural) → ____ (Gen. plural)
  A: einigen → einiger
  Type: fill-in-the-blank
<!-- DATA_QUIZ_END -->


---


### Unidad 40 — Oraciones subordinadas: estructura y tipos (Parte 1)

*Nivel orientativo:* **A2** · *Alcance A1 de esta app:* 📚

> weil/dass/wenn se consolidan en A2; en A1 aparecen solo como frases fijas de examen.

---
class_id: 040
title: "Oraciones subordinadas: estructura y tipos (Parte 1)"
level: "B2"
topics: ["Gramática", "Oraciones subordinadas", "Orden verbal", "Verbos separables", "Causales", "Condicionales", "Consecutivas", "Concesivas"]
target_exam: "Telc / Goethe B2"
---

### Oraciones subordinadas: estructura y tipos (Parte 1)

#### 1. 🎯 Resumen / Objetivos de la Lección
- Reconocer una oración subordinada y colocar el verbo conjugado al final.
- Separar la oración principal y la subordinada mediante una coma.
- Anteponer una subordinada y aplicar la inversión verbo-sujeto en la principal.
- Ordenar correctamente infinitivos, participios, auxiliares y verbos modales.
- Usar verbos separables y no separables dentro de una subordinada.
- Formar subordinadas causales, condicionales, consecutivas y concesivas.

#### 2. 📚 Vocabulario Clave (Wortschatz)

| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Hauptsatz, Hauptsätze | la oración principal | Sustantivo masculino | Puede funcionar de forma independiente. |
| der Nebensatz, Nebensätze | la oración subordinada | Sustantivo masculino | Depende sintácticamente de otra oración. |
| die Konjunktion, -en | la conjunción | Sustantivo femenino | Introduce la subordinada. |
| die Ursache, -n | la causa | Sustantivo femenino | Se expresa con **weil** o **da**. |
| die Bedingung, -en | la condición | Sustantivo femenino | Se expresa con **wenn** o **falls**. |
| die Folge, -n | la consecuencia | Sustantivo femenino | Se expresa con **sodass** o **so ..., dass**. |
| der Gegensatz, Gegensätze | el contraste; la oposición | Sustantivo masculino | Se expresa con **obwohl**. |
| weil | porque | Conjunción subordinante causal | Introduce una causa nueva o destacada. |
| da | puesto que; dado que | Conjunción subordinante causal | Frecuente en registros formales y con causa conocida. |
| wenn | si; cuando | Conjunción subordinante | Condición o repetición temporal. |
| falls | en caso de que | Conjunción subordinante condicional | Condición posible o eventual. |
| sodass | de modo que; por lo que | Conjunción subordinante consecutiva | Destaca la consecuencia completa. |
| so ..., dass | tan ... que | Construcción consecutiva | Destaca el grado de un adjetivo o adverbio. |
| obwohl | aunque; a pesar de que | Conjunción subordinante concesiva | Expresa contraste inesperado. |
| auch wenn | incluso si; aunque | Locución subordinante concesiva | Puede tener matiz hipotético. |
| damit | para que | Conjunción subordinante final | Los sujetos pueden ser distintos. |
| dass | que | Conjunción subordinante completiva | Introduce el contenido de una idea o emoción. |
| ob | si | Conjunción subordinante interrogativa | Introduce una pregunta indirecta cerrada. |
| Bescheid sagen | avisar | Expresión verbal | **Sag mir bitte Bescheid.** |
| sich vorbereiten auf + Akk. | prepararse para | Verbo regular separable y reflexivo | **sich auf die Prüfung vorbereiten** |
| teilnehmen an + Dat. | participar en | Verbo irregular separable con preposición | **an einer Konferenz teilnehmen** |
| aufräumen | ordenar; recoger | Verbo regular separable, Akkusativ | **die Küche aufräumen** |
| ankommen | llegar | Verbo irregular separable | Perfekt con **sein**: **ist angekommen**. |
| anrufen | llamar por teléfono | Verbo irregular separable, Akkusativ | **jemanden anrufen** |
| abschließen | cerrar con llave; finalizar | Verbo irregular separable, Akkusativ | **hat abgeschlossen** |
| bestehen | aprobar; consistir | Verbo irregular no separable | **die Prüfung bestehen** |
| sich leisten | permitirse económicamente | Verbo regular reflexivo, Dativ + Akkusativ | **sich einen Laptop leisten** |
| durchfallen | suspender | Verbo irregular separable | Perfekt: **ist durchgefallen**. |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1. Cómo reconocer una subordinada

Una oración subordinada:

1. depende de una oración principal;
2. suele estar introducida por una conjunción subordinante;
3. coloca el verbo conjugado al final;
4. se separa de la principal mediante una coma.

- **Estructura / Fórmula:** `Hauptsatz, + Konjunktion + Subjekt + Ergänzungen + Verb.`
- **Frau Müller geht heute nicht zur Arbeit, weil sie krank ist.**
- **Ich habe gehört, dass Deutsch eine schwere Sprache ist.**
- **Der Chef hat mich gefragt, ob sich der Kunde schon gemeldet hat.**

##### 3.2. Posición del verbo

| Tipo | Estructura | Ejemplo |
| :--- | :--- | :--- |
| Verbo simple | `..., conjunción + sujeto + complementos + verbo.` | **..., weil sie krank ist.** |
| Verbo modal | `..., conjunción + sujeto + complementos + infinitivo + modal.` | **..., weil er lernen muss.** |
| Perfekt | `..., conjunción + sujeto + complementos + Partizip II + auxiliar.` | **..., dass du den Job bekommen hast.** |
| Pasiva con modal | `..., conjunción + sujeto + Partizip II + werden + modal.` | **..., weil die Maschine repariert werden muss.** |

- El elemento conjugado cierra normalmente la subordinada.
- En grupos verbales más complejos puede aparecer la regla del **Ersatzinfinitiv**; el orden exacto se estudia como estructura avanzada.

##### 3.3. Subordinada en primera posición

- Toda la subordinada ocupa la posición 1 de la oración completa.
- La oración principal comienza entonces con el verbo conjugado y después aparece el sujeto.
- **Fórmula:** `Nebensatz, + verbo conjugado + sujeto + complementos.`

**Ich fliege nach Argentinien, wenn mein Chef mir Urlaub gibt.**  
→ **Wenn mein Chef mir Urlaub gibt, fliege ich nach Argentinien.**

**Obwohl ich sehr beschäftigt bin, lerne ich jeden Tag Deutsch.**

> Nota: con ciertos verbos que exigen un correlato preposicional, no basta con anteponer una subordinada de **dass**. Es natural decir: **Dass du den Job bekommen hast, darüber freue ich mich.**

##### 3.4. Verbos separables y no separables

###### Verbos separables

- Prefijos frecuentes: **ab-, an-, auf-, aus-, ein-, los-, mit-, nach-, her-, hin-, vor-, weg-, zu-, zurück-**.
- En Hauptsatz, Präsens y Präteritum, el prefijo se separa: **Ich stehe um 8 Uhr auf.**
- Con modal o Futur I permanece unido en infinitivo: **Ich muss aufstehen.**
- En Partizip II suele insertarse **-ge-** entre prefijo y raíz: **aufgestanden, angekommen, abgeschlossen**.
- En una subordinada, el verbo conjugado separable permanece unido al final:  
  **..., weil sie nächste Woche umzieht.**  
  **..., dass er morgen anruft.**

###### Verbos no separables

- Prefijos: **be-, emp-, ent-, er-, ge-, miss-, ver-, zer-**.
- El prefijo nunca se separa y el Partizip II no añade **ge-**:  
  **bestehen → bestanden**, **verstehen → verstanden**.

###### Prefijos variables

- **durch-, hinter-, über-, um-, unter-** pueden ser separables o inseparables según el significado y el acento.
- **um|fahren**: atropellar; **umfahren**: rodear o esquivar.

##### 3.5. Oraciones causales

- Responden a **Warum? / Wieso? / Weshalb?**
- **weil** es la conjunción causal neutra y muy frecuente.
- **da** aparece especialmente en registros escritos o formales y suele presentar una causa conocida o evidente.

**Ich habe mich für den Kurs angemeldet, weil ich mein Deutsch verbessern möchte.**  
**Da der Kunde nicht zahlen konnte, hat er seinen Auftrag storniert.**

##### 3.6. Oraciones condicionales

- Responden a **Unter welcher Bedingung?**
- **wenn** expresa “si” de forma general.
- **falls** significa “en caso de que” y subraya que la condición es eventual.

**Ruf mich an, falls du Zeit hast.**  
**Wenn du nicht kommen kannst, sag mir bitte Bescheid.**

##### 3.7. Oraciones consecutivas

- **sodass** introduce el resultado de toda la situación principal:  
  **Der Zug war ausgefallen, sodass wir ein Taxi nehmen mussten.**
- **so + adjetivo/adverbio, dass** destaca el grado que provoca el resultado:  
  **Die Vorlesung war so langweilig, dass einige Studenten eingeschlafen sind.**
- La anteposición de estas subordinadas suele resultar poco natural porque primero debe presentarse la causa o intensidad.

##### 3.8. Oraciones concesivas

- **obwohl** expresa un hecho contrario a lo esperado.
- **auch wenn** puede expresar concesión real o hipotética.
- **obgleich** es una alternativa menos frecuente y más formal.

**Ich helfe meiner Kollegin, obwohl ich sie nicht leiden kann.**  
**Obwohl das Wetter schlecht war, bin ich in den Park gegangen.**

##### 3.9. Soluciones: estructura básica

1. **Ich habe Angst vor der Prüfung, weil ich mich in Stresssituationen nicht konzentrieren kann.**
2. **Wir haben viel zu tun, weil wir ein wichtiges Meeting vorbereiten müssen.**
3. **Ich freue mich, dass meine Schwester ihr Kind bekommen hat.**
4. **Wenn du dein Deutsch verbessern willst, musst du die Sprache jeden Tag üben.**
5. **Philip ist im Krankenhaus, weil er sich beim Sport verletzt hat.**
6. **Der Chef ärgert sich darüber, dass der Kunde noch nicht geantwortet hat.**
7. **Ich war sehr enttäuscht, dass mein Freund nicht mit zur Party kommen wollte.**
8. **Christina ist mit ihren Freunden ins Kino gegangen, obwohl sie eigentlich zu Hause bleiben wollte.**

> En el ejercicio 6 se conserva la conjunción **dass**, pero se añade el correlato **darüber** exigido por la formulación natural. Sin reformular, también sería posible expresar la causa con **weil**: **Der Chef ist sauer, weil der Kunde noch nicht geantwortet hat.**

##### 3.10. Soluciones: inversión

1. **Wenn mein Auto rechtzeitig repariert wird, kann ich am Wochenende wegfahren.**
2. **Weil die Corona-Situation gefährlich bleibt, arbeiten wir von zu Hause.**
3. **Wenn du in der Klausur eine gute Note schreibst, bekommst du ein Geschenk.**
4. **Wenn du dich nicht meldest, werde ich sehr sauer.**
5. **Obwohl ich sehr müde war, bin ich am Wochenende ausgegangen.**
6. **Als ich ein Kind war, habe ich in einem kleinen Dorf gelebt.**
7. **Damit er die Prüfung besteht, lernt Carlos jeden Tag Deutsch.**
8. **Wenn wir mehr Geld und Zeit hätten, würden wir öfter in den Urlaub fahren.**

##### 3.11. Soluciones: verbos separables

1. **Es ärgert mich sehr, dass meine Kinder nie ihr Zimmer aufräumen.**
2. **Ich bin sehr stolz auf meinen Mann, weil er mit dem Rauchen aufhört.**
3. **Ich freue mich, dass wir nächste Woche wegfahren.**
4. **Ralf hat mir geschrieben, dass er um 15 Uhr ankommt.**
5. **Herr Schwarz kann den Job bekommen, wenn er sich gut vorbereitet.**
6. **Ist es okay, wenn ich später das Geschirr abwasche?**
7. **Wir würden uns freuen, wenn du am Wochenende vorbeikommst.**
8. **Der Kunde hat geantwortet, dass er uns morgen früh anruft.**

##### 3.12. Soluciones: causales

1. **Peter war heute nicht in der Schule, weil er erkältet war.**
2. **Ich kann nicht zur Party kommen, weil ich auf Geschäftsreise bin.**
3. **Die Veranstaltung wurde abgesagt, weil die Corona-Zahlen steigen.**
4. **Mein Vater liegt im Krankenhaus, weil er einen Unfall hatte.**
5. **Frau Meier geht heute nicht zur Arbeit, weil sie Urlaub hat.**
6. **Paul hat sich von Maria getrennt, weil sie ihn betrogen hat.**
7. **Ich brauche einen Handwerker, weil meine Waschmaschine repariert werden muss.**
8. **Ich kann mir diesen Laptop nicht leisten, weil er zu teuer ist.**

Cada solución admite la inversión: **Weil/Da + subordinada, + verbo + sujeto...**

##### 3.13. Soluciones: condicionales

1. **Wenn/Falls mir die Bank einen Kredit gibt, können wir die Eigentumswohnung kaufen.**
2. **Wenn du öfter Deutsch sprichst, lernst du mehr.**
3. **Wenn ich die Prüfung bestehe, gebe ich eine Party.**
4. **Wenn ich am Wochenende frei habe, besuche ich meine Schwester.**
5. **Wenn ich meine Lehrerin nicht verstehe, frage ich sie.**
6. **Wenn/Falls du dich krank fühlst, geh zum Arzt.**
7. **Wenn/Falls Sie Urlaub nehmen wollen, müssen Sie den Chef fragen.**
8. **Wenn Sie den Bus nehmen, kommen Sie schneller in die Stadt.**

##### 3.14. Soluciones: consecutivas

1. **Die Bahn hatte Verspätung, sodass Herr Schneider zu spät zur Arbeit kam.**
2. **Martin hat nicht für die Prüfung gelernt, sodass er durchgefallen ist.**
3. **Draußen ist es so kalt, dass ich lieber zu Hause bleibe.**
4. **Im Büro war das Internet ausgefallen, sodass wir nicht arbeiten konnten.**
5. **Mein Nachbar ist immer so laut, dass ich mich über ihn beschwert habe.**
6. **Der Film war so spannend, dass ich ihn mir zweimal angesehen habe.**
7. **Die Kinder haben im Regen gespielt, sodass sie krank geworden sind.**
8. **Sabine hat gestern den Wecker nicht gestellt, sodass sie heute verschlafen hat.**

##### 3.15. Soluciones: concesivas

1. **Obwohl die Sonne heute scheint, will ich nicht rausgehen.**
2. **Auch wenn das Wetter schlecht ist, muss ich mit dem Hund rausgehen.**
3. **Maria geht ins Fitnessstudio, obwohl ihr Ex-Freund dort arbeitet.**
4. **Obwohl ich viel Stress habe, möchte ich Deutsch lernen.**
5. **Meine Arbeit macht mir viel Spaß, auch wenn meine Kollegen nervig sind.**
6. **Obwohl sein Job anstrengend ist, ist Herr Müller immer freundlich.**
7. **Der Lehrer ist zum Unterricht gekommen, obwohl er krank war.**
8. **Obwohl mein Sohn fast nie die Hausaufgaben macht, hat er immer gute Noten.**

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Wenn du nicht kommen kannst, sag mir bitte Bescheid.**  
> *Traducción:* Si no puedes venir, avísame, por favor.  
> *Uso:* Pedir que alguien avise bajo una condición.

> **Falls Sie noch Fragen haben, teilen Sie uns dies bitte mit.**  
> *Traducción:* En caso de que tenga más preguntas, comuníquenoslo.  
> *Uso:* Comunicación formal.

> **Ich freue mich, dass du den Job bekommen hast.**  
> *Traducción:* Me alegro de que hayas conseguido el trabajo.  
> *Uso:* Expresar una reacción ante un hecho.

> **Wir würden uns freuen, wenn du am Wochenende vorbeikommst.**  
> *Traducción:* Nos alegraría que pasaras por aquí el fin de semana.  
> *Uso:* Invitación cortés.

> **Obwohl ich keine Lust hatte, bin ich zur Party gegangen.**  
> *Traducción:* Aunque no tenía ganas, fui a la fiesta.  
> *Uso:* Contrastar una acción con una circunstancia adversa.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** la coma entre Hauptsatz y Nebensatz es obligatoria.
- ⚠️ **Atención:** no coloques el verbo conjugado en posición 2 dentro de la subordinada: **weil er krank ist**, no *weil er ist krank*.
- ⚠️ **Atención:** si la subordinada va primero, la principal comienza con el verbo: **Wenn du kommst, freue ich mich.**
- ⚠️ **Atención:** el prefijo separable no se desprende dentro de la subordinada: **weil er anruft**, no *weil er ruft an*.
- ⚠️ **Atención:** **da** suele ser más formal o escrito que **weil**, no al revés.
- ⚠️ **Atención:** **damit** expresa finalidad (“para que”); **sodass** expresa consecuencia (“de modo que”).
- ⚠️ **Atención:** **wenn** condicional no debe confundirse con **ob**, que introduce una pregunta indirecta de sí/no.
- La conjunción **dass** se escribe con **ss**; **das** con una sola *s* es artículo o pronombre.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: Frau Müller bleibt zu Hause, weil sie krank ____.
  A: ist
  Type: fill-in-the-blank
- Q: Ich freue mich, dass du den Job bekommen ____.
  A: hast
  Type: fill-in-the-blank
- Q: Wenn mein Chef mir Urlaub gibt, ____ ich nach Argentinien.
  A: fliege
  Type: fill-in-the-blank
- Q: Conecta: Er ruft morgen an. Er hat es gesagt. (dass)
  A: Er hat gesagt, dass er morgen anruft.
  Type: flashcard
- Q: Die Maschine ist kaputt, weil sie repariert werden ____.
  A: muss
  Type: fill-in-the-blank
- Q: Completa con "weil" o "damit": Ich lerne viel, ____ ich die Prüfung bestehe.
  A: damit
  Type: fill-in-the-blank
- Q: Completa con "sodass" o "obwohl": Der Zug fiel aus, ____ wir ein Taxi nehmen mussten.
  A: sodass
  Type: fill-in-the-blank
- Q: Completa con "wenn" o "falls": ____ Sie Fragen haben, rufen Sie uns an.
  A: Falls
  Type: fill-in-the-blank
- Q: Corrige: Weil er ist krank, bleibt er zu Hause.
  A: Weil er krank ist, bleibt er zu Hause.
  Type: flashcard
- Q: Corrige: Wenn du Zeit hast, du kannst mich anrufen.
  A: Wenn du Zeit hast, kannst du mich anrufen.
  Type: flashcard
- Q: ¿Qué ocurre con un verbo separable conjugado dentro de una subordinada?
  A: El prefijo permanece unido al verbo y la forma completa se coloca al final.
  Type: flashcard
- Q: ¿Qué diferencia hay entre "sodass" y "so ..., dass"?
  A: "Sodass" destaca la consecuencia completa; "so ..., dass" destaca el grado de un adjetivo o adverbio que provoca esa consecuencia.
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 41 — Pronombres relativos (Relativpronomen)

*Nivel orientativo:* **B1** · *Alcance A1 de esta app:* 📚

---
class_id: 041
title: "Pronombres relativos"
level: "B2"
topics: ["Gramática", "Pronombres relativos", "Oraciones de relativo", "Casos", "Declinación"]
target_exam: "Telc / Goethe B2"
---

### Pronombres relativos (Relativpronomen)

#### 1. 🎯 Resumen / Objetivos de la Lección
- Unir dos ideas mediante una oración de relativo.
- Elegir el pronombre relativo según género, número y caso.
- Colocar el verbo conjugado al final de la oración relativa.
- Usar **der, die, das**, sus formas declinadas y las alternativas con **welcher-**.
- Expresar posesión mediante **dessen** y **deren**.
- Insertar una relativa en medio de una oración principal usando correctamente las comas.

#### 2. 📚 Vocabulario Clave (Wortschatz)

| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Relativsatz, Relativsätze | la oración de relativo | Sustantivo masculino | Añade información sobre un antecedente. |
| das Relativpronomen, Relativpronomen | el pronombre relativo | Sustantivo neutro | Introduce el Relativsatz. |
| das Bezugswort, Bezugswörter | el antecedente | Sustantivo neutro | Determina género y número. |
| der / die / das | que; el cual / la cual / lo cual | Pronombre relativo | Formas de Nominativ. |
| den / die / das | que; al cual / a la cual | Pronombre relativo | Formas de Akkusativ. |
| dem / der / denen | a quien; al cual / a la cual / a los cuales | Pronombre relativo | Formas de Dativ. |
| dessen / deren | cuyo / cuya / cuyos / cuyas | Pronombre relativo posesivo | Formas de Genitiv. |
| welcher / welche / welches | el cual / la cual / lo cual | Pronombre relativo alternativo | Más formal y menos frecuente. |
| die Polizei | la policía | Sustantivo femenino, normalmente singular | **Die Polizei sucht den Mann.** |
| die Zutat, -en | el ingrediente | Sustantivo femenino | **die Zutat, die ich vergessen habe** |
| die Kamera, -s | la cámara | Sustantivo femenino | **die Kamera, die ich gekauft habe** |
| der Pulli, -s | el jersey | Sustantivo masculino, coloquial | **einen roten Pulli tragen** |
| die Post | el correo; el servicio postal | Sustantivo femenino | **die Post austragen** |
| überfallen | atracar; asaltar | Verbo irregular no separable, Akkusativ | Perfekt: **hat überfallen** |
| vergessen | olvidar | Verbo irregular no separable, Akkusativ | Perfekt: **hat vergessen** |
| begegnen | encontrarse con; cruzarse con | Verbo regular, Dativ | Perfekt: **ist begegnet** |
| gehören | pertenecer | Verbo regular, Dativ | **Ihm gehören mehrere Häuser.** |
| austragen | repartir; distribuir | Verbo irregular separable, Akkusativ | **die Post austragen** |
| grüßen | saludar | Verbo regular, Akkusativ | **jemanden grüßen** |
| abholen | recoger | Verbo regular separable, Akkusativ | **jemanden abholen** |
| im Lotto gewinnen | ganar la lotería | Expresión verbal | **Ihr Mann hat im Lotto gewonnen.** |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1. Estructura básica

- La oración relativa describe o identifica un sustantivo mencionado previamente.
- Se separa del resto de la oración mediante coma o comas.
- El verbo conjugado se coloca al final.

- **Estructura / Fórmula:** `Bezugswort, + Relativpronomen + complementos + verbo, + continuación.`
- **Die Polizei sucht den Mann, der die Bank überfallen hat.**
- **Der Mann, der Max heißt, kommt aus Hamburg.**

##### 3.2. Tabla de pronombres relativos

| Caso | Masculino | Femenino | Neutro | Plural |
| :--- | :--- | :--- | :--- | :--- |
| Nominativ | der / welcher | die / welche | das / welches | die / welche |
| Akkusativ | den / welchen | die / welche | das / welches | die / welche |
| Dativ | dem / welchem | der / welcher | dem / welchem | denen / welchen |
| Genitiv | dessen | deren | dessen | deren |

##### 3.3. Cómo elegir la forma correcta

La elección se realiza en dos pasos:

1. El antecedente determina el **género** y el **número**.
2. La función del pronombre dentro de la relativa determina el **caso**.

**Das ist der Mann, dem wir begegnet sind.**

- Antecedente: **der Mann** → masculino singular.
- Función en la relativa: **jemandem begegnen** → Dativ.
- Resultado: **dem**.

El caso del antecedente en la oración principal no determina el caso del relativo:

**Ich sehe den Mann, der dort arbeitet.**

- **den Mann** está en Akkusativ en la principal.
- **der** es el sujeto de **arbeitet**, por lo que está en Nominativ.

##### 3.4. Nominativ

El pronombre relativo es el sujeto de la subordinada:

- **Die Frau, die aus Hannover kommt, heißt Lisa.**
- **Das Kind, das einen roten Pulli trägt, heißt Philipp.**
- **Der Hund, der schwarz ist, rennt sehr schnell.**

##### 3.5. Akkusativ

El pronombre relativo es el objeto directo:

- **Die Kamera, die ich vor drei Jahren gekauft habe, war sehr teuer.**
- **Der Tisch, den ich letzte Woche bestellt habe, ist noch nicht angekommen.**
- **Der Mann, den wir gegrüßt haben, ist mein Lehrer.**
- **Das Essen, das ich gestern gegessen habe, war sehr lecker.**

##### 3.6. Dativ

El verbo de la relativa exige Dativ:

- **Herr Maier, dem mehrere Häuser gehören, ist ziemlich reich.**
- **Meine Eltern, denen das Essen gut gefallen hat, sind sehr zufrieden.**
- **Wer ist der Mann, dem wir begegnet sind?**

##### 3.7. Genitiv: dessen y deren

**dessen** y **deren** expresan posesión y equivalen normalmente a “cuyo/a/os/as”.

- **Das ist der Mann, dessen Hund weggelaufen ist.**
- **Das Kind, dessen Vater es abholen muss, fühlt sich schlecht.**
- **Das ist meine Lehrerin, deren Mann im Lotto gewonnen hat.**

| Antecedente | Forma |
| :--- | :--- |
| Masculino o neutro singular | dessen |
| Femenino singular o plural | deren |

- El sustantivo posterior a **dessen/deren** aparece normalmente sin artículo.
- **dessen/deren** no cambia según el género del objeto poseído; concuerda con el poseedor, es decir, con el antecedente.

##### 3.8. Alternativas con welcher-

- **welcher / welche / welches** puede sustituir a **der / die / das** en Nominativ, Akkusativ y Dativ.
- Es más formal y menos frecuente en el alemán cotidiano.
- Puede evitar una secuencia visual como **die, die**, pero esta repetición es gramatical y completamente normal:

**Das ist die Frau, die die Post austrägt.**

También es posible, con un tono más formal:

**Das ist die Frau, welche die Post austrägt.**

##### 3.9. Soluciones de los ejercicios

###### Nominativ

1. **Die Frau, die aus Hannover kommt, heißt Lisa.**
2. **Das Kind, das einen roten Pulli trägt, heißt Philipp.**
3. **Der Hund, der schwarz ist, rennt sehr schnell.**

###### Akkusativ

1. **Die Kamera, die ich vor drei Jahren gekauft habe, war sehr teuer.**
2. **Der Tisch, den ich letzte Woche bestellt habe, ist noch nicht angekommen.**
3. **Der Mann, den wir gegrüßt haben, ist mein Lehrer.**
4. **Das Essen, das ich gestern gegessen habe, war sehr lecker.**

###### Dativ

1. **Herr Maier, dem mehrere Häuser gehören, ist ziemlich reich.**
2. **Meine Eltern, denen das Essen gut gefallen hat, sind sehr zufrieden.**

###### Genitiv

1. **Das Kind, dessen Vater es abholen muss, fühlt sich schlecht.**
2. **Das ist meine Lehrerin, deren Mann im Lotto gewonnen hat.**

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Das ist der Mann, dem wir begegnet sind.**  
> *Traducción:* Ese es el hombre con el que nos encontramos.  
> *Uso:* Describir a una persona con un verbo que rige Dativ.

> **Wer ist der Mann, dem wir begegnet sind?**  
> *Traducción:* ¿Quién es el hombre con el que nos encontramos?  
> *Uso:* Integrar una relativa dentro de una pregunta.

> **Der Mann, der Max heißt, kommt aus Hamburg.**  
> *Traducción:* El hombre que se llama Max viene de Hamburgo.  
> *Uso:* Insertar información explicativa en medio de la principal.

> **Das ist meine Lehrerin, deren Mann im Lotto gewonnen hat.**  
> *Traducción:* Esta es mi profesora, cuyo marido ganó la lotería.  
> *Uso:* Expresar posesión con antecedente femenino.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** son **Relativpronomen**, no *Reflexivpronomen*. Los primeros conectan una relativa; los segundos remiten al sujeto.
- ⚠️ **Atención:** el género y el número proceden del antecedente, pero el caso se decide dentro de la relativa.
- ⚠️ **Atención:** el verbo conjugado va al final: **der die Bank überfallen hat**, no *der hat die Bank überfallen*.
- ⚠️ **Atención:** una relativa incrustada necesita dos comas: **Der Mann, der Max heißt, kommt aus Hamburg.**
- ⚠️ **Atención:** **denen** es Dativ plural; **deren** es Genitiv femenino o plural.
- ⚠️ **Atención:** después de **dessen/deren** no se añade normalmente otro artículo posesivo.
- **welcher-** es correcto, pero **der/die/das** es la opción habitual incluso cuando se repiten formas como **die die**.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: Das ist der Mann, ____ die Bank überfallen hat.
  A: der
  Type: fill-in-the-blank
- Q: Ich kaufe die Zutat, ____ ich gestern vergessen habe.
  A: die
  Type: fill-in-the-blank
- Q: Das ist der Mann, ____ wir begegnet sind.
  A: dem
  Type: fill-in-the-blank
- Q: Meine Eltern, ____ das Essen gefallen hat, sind zufrieden.
  A: denen
  Type: fill-in-the-blank
- Q: Der Tisch, ____ ich bestellt habe, ist angekommen.
  A: den
  Type: fill-in-the-blank
- Q: Das ist meine Lehrerin, ____ Mann im Lotto gewonnen hat.
  A: deren
  Type: fill-in-the-blank
- Q: Das Kind, ____ Vater es abholt, wartet draußen.
  A: dessen
  Type: fill-in-the-blank
- Q: Une: Der Hund ist schwarz. Er rennt sehr schnell.
  A: Der Hund, der schwarz ist, rennt sehr schnell.
  Type: flashcard
- Q: ¿Qué determina el caso del pronombre relativo?
  A: Su función sintáctica o el régimen verbal/preposicional dentro de la oración relativa.
  Type: flashcard
- Q: ¿Qué determina el género y número del pronombre relativo?
  A: El antecedente al que se refiere.
  Type: flashcard
- Q: ¿Cuál es el Dativ plural del pronombre relativo?
  A: denen
  Type: flashcard
- Q: ¿Cuándo se usan "dessen" y "deren"?
  A: Para expresar una relación posesiva en Genitiv; "dessen" con antecedente masculino o neutro y "deren" con antecedente femenino o plural.
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 42 — Adverbios relativos (Relativadverbien)

*Nivel orientativo:* **B1** · *Alcance A1 de esta app:* 📚

---
class_id: 042
title: "Adverbios relativos"
level: "B2"
topics: ["Gramática", "Adverbios relativos", "Adverbios pronominales", "Régimen preposicional", "Oraciones de relativo"]
target_exam: "Telc / Goethe B2"
---

### Adverbios relativos (Relativadverbien)

#### 1. 🎯 Resumen / Objetivos de la Lección
- Formar adverbios relativos mediante **wo(r) + preposición**.
- Usarlos para retomar cosas, ideas, hechos o situaciones completas.
- Mantener el verbo conjugado al final de la oración relativa.
- Transformar adverbios relativos en adverbios interrogativos para formular preguntas.
- Distinguir la referencia a cosas de la referencia a personas.

#### 2. 📚 Vocabulario Clave (Wortschatz)

| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| wo | donde | Adverbio relativo o interrogativo | Se refiere a un lugar. |
| womit | con lo que; con lo cual | Adverbio pronominal | **mit etwas** |
| wofür | para lo que; para lo cual | Adverbio pronominal | **für etwas** |
| wonach | según lo que; aquello que se busca | Adverbio pronominal | **nach etwas** |
| worüber | sobre lo que; por lo cual | Adverbio pronominal | **über etwas** |
| woran | en lo que; de lo que | Adverbio pronominal | **an etwas** |
| worauf | en lo que; a lo que | Adverbio pronominal | **auf etwas** |
| wovon | de lo que; de lo cual | Adverbio pronominal | **von etwas** |
| woraus | de lo que; con qué material | Adverbio pronominal | **aus etwas** |
| der Ort, -e | el lugar | Sustantivo masculino | **der Ort, wo wir uns kennengelernt haben** |
| die Designermode | la moda de diseñador | Sustantivo femenino, sin plural habitual | **viel Geld für Designermode ausgeben** |
| der Luxus | el lujo | Sustantivo masculino | **Reisen ist ein Luxus.** |
| sich freuen über + Akk. | alegrarse por | Verbo regular reflexivo con preposición | **sich über eine Nachricht freuen** |
| sich ärgern über + Akk. | enfadarse por | Verbo regular reflexivo con preposición | **sich über die Verspätung ärgern** |
| rechnen mit + Dat. | contar con; esperar | Verbo regular con preposición | **mit etwas rechnen** |
| Geld ausgeben für + Akk. | gastar dinero en | Expresión verbal | **Geld für Kleidung ausgeben** |
| suchen nach + Dat. | buscar | Verbo regular con preposición | **nach einer Lösung suchen** |
| helfen mit + Dat. | ayudar con | Verbo irregular, Dativ + preposición | **mit etwas helfen** |
| Bescheid sagen | avisar | Expresión verbal | **Sag mir bitte Bescheid.** |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1. Qué es un adverbio relativo

Un adverbio relativo introduce una oración subordinada y retoma:

- una cosa;
- una idea o situación;
- el contenido completo de la oración anterior;
- un lugar, en el caso de **wo**.

- **Estructura / Fórmula:** `Antecedente u oración principal, + wo(r)+Präposition + complementos + verbo.`
- **Mein Sohn hat seine Prüfung bestanden, worüber ich mich sehr freue.**

##### 3.2. Formación con wo(r)-

| Preposición | Formación | Adverbio |
| :--- | :--- | :--- |
| mit | wo + mit | womit |
| für | wo + für | wofür |
| nach | wo + nach | wonach |
| von | wo + von | wovon |
| zu | wo + zu | wozu |
| bei | wo + bei | wobei |
| an | wo + r + an | woran |
| auf | wo + r + auf | worauf |
| aus | wo + r + aus | woraus |
| über | wo + r + über | worüber |
| unter | wo + r + unter | worunter |

- Si la preposición empieza por consonante: **wo + preposición**.
- Si empieza por vocal: **wor + preposición**.
- La preposición se elige según el régimen del verbo, sustantivo o adjetivo.

##### 3.3. Ejemplos relativos

| Régimen | Oración relativa | Traducción |
| :--- | :--- | :--- |
| **mit etwas rechnen** | **Ich habe im Lotto gewonnen, womit ich nie gerechnet hätte.** | Me ha tocado la lotería, algo con lo que nunca habría contado. |
| **Geld für etwas ausgeben** | **Anja liebt Designermode, wofür sie viel Geld ausgibt.** | A Anja le encanta la moda de diseñador, en la que gasta mucho dinero. |
| **nach etwas suchen** | **Dieser Deutschkurs ist genau das, wonach ich gesucht habe.** | Este curso de alemán es exactamente lo que buscaba. |
| **sich über etwas ärgern** | **Die Bahn kam wieder zu spät, worüber ich mich sehr geärgert habe.** | El tren volvió a llegar tarde, lo cual me enfadó mucho. |
| **mit etwas helfen** | **Sag mir Bescheid, wenn es etwas gibt, womit ich dir helfen kann.** | Avísame si hay algo con lo que pueda ayudarte. |

##### 3.4. Wo como adverbio relativo de lugar

- **wo** puede retomar un lugar:  
  **Ich erinnere mich gern an den Ort, wo wir uns kennengelernt haben.**
- En registro formal también puede emplearse una combinación de preposición y pronombre relativo:  
  **der Ort, an dem wir uns kennengelernt haben**.

##### 3.5. Uso interrogativo y uso relativo

La misma forma puede introducir una pregunta o una relativa:

| Uso | Ejemplo |
| :--- | :--- |
| Interrogativo | **Wofür hast du keine Zeit?** |
| Relativo | **Reisen ist ein Luxus, wofür mir das Geld fehlt.** |
| Interrogativo | **Wonach sucht der Kunde?** |
| Relativo / pregunta indirecta | **Wir verstehen nicht, wonach der Kunde sucht.** |

- En pregunta directa, el verbo conjugado ocupa la posición 2.
- En relativa o pregunta indirecta, el verbo conjugado va al final.

##### 3.6. Cosas frente a personas

- Para cosas, conceptos o situaciones: **wo(r) + preposición**.
- Para personas: **preposición + wen/wem** o **preposición + pronombre relativo**.

| Referente | Pregunta | Relativa |
| :--- | :--- | :--- |
| Cosa | **Womit arbeitest du?** | **Das Werkzeug, womit ich arbeite, ...** |
| Persona | **Mit wem arbeitest du?** | **Die Kollegin, mit der ich arbeite, ...** |

En estilo formal, también es frecuente **preposición + pronombre relativo** para cosas:  
**das Werkzeug, mit dem ich arbeite**.

##### 3.7. Soluciones de los ejercicios

1. **Ich habe keine Zeit fürs Kino.**  
   **Wofür hast du keine Zeit?**  
   *No tengo tiempo para ir al cine. - ¿Para qué no tienes tiempo?*

2. **Mein Sohn hat seine Prüfung bestanden, worüber ich mich sehr freue.**  
   **Worüber freust du dich sehr?**  
   *Mi hijo aprobó el examen, lo cual me alegra mucho. - ¿Por qué te alegras mucho?*

3. **Anja liebt Designermode, wofür sie viel Geld ausgibt.**  
   **Wofür gibt Anja viel Geld aus?**  
   *A Anja le encanta la moda de diseñador, en la que gasta mucho dinero. - ¿En qué gasta mucho dinero Anja?*

4. **Herr Müller kommt nie pünktlich zur Arbeit, worüber sich der Chef sehr ärgert.**  
   **Worüber ärgert sich der Chef sehr?**  
   *El señor Müller nunca llega puntual al trabajo, lo cual enfada mucho al jefe. - ¿Por qué se enfada mucho el jefe?*

5. **Wir verstehen nicht, wonach der Kunde sucht.**  
   **Wonach sucht der Kunde?**  
   *No entendemos qué busca el cliente. - ¿Qué busca el cliente?*

6. **Sag mir Bescheid, wenn es etwas gibt, womit ich dir helfen kann.**  
   **Womit kannst du mir helfen?**  
   *Avísame si hay algo con lo que pueda ayudarte. - ¿Con qué puedes ayudarme?*

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Wofür hast du keine Zeit?**  
> *Traducción:* ¿Para qué no tienes tiempo?  
> *Uso:* Preguntar por el complemento de **für**.

> **Wonach sucht der Kunde?**  
> *Traducción:* ¿Qué busca el cliente?  
> *Uso:* Preguntar con el régimen **nach etwas suchen**.

> **Mein Sohn hat seine Prüfung bestanden, worüber ich mich sehr freue.**  
> *Traducción:* Mi hijo aprobó el examen, lo cual me alegra mucho.  
> *Uso:* Comentar una situación completa.

> **Sag mir Bescheid, wenn es etwas gibt, womit ich dir helfen kann.**  
> *Traducción:* Avísame si hay algo con lo que pueda ayudarte.  
> *Uso:* Ofrecer ayuda.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** añade **-r-** delante de una preposición que empieza por vocal: **worüber**, no *woüber*.
- ⚠️ **Atención:** no uses normalmente **wo(r)-** para una persona: **Mit wem sprichst du?**, no *Womit sprichst du?*
- ⚠️ **Atención:** conserva la preposición exigida por el verbo: **suchen nach → wonach**, **sich freuen über → worüber**.
- ⚠️ **Atención:** en la subordinada el verbo va al final: **wonach der Kunde sucht**.
- ⚠️ **Atención:** **wofür** puede traducirse según el contexto como “para qué”, “por qué” o “para lo cual”; no siempre conviene una traducción literal.
- **womit** se pronuncia con el acento principal sobre la segunda parte cuando se contrasta la preposición: *wo-MIT*.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: sich freuen über etwas → ____ freust du dich?
  A: Worüber
  Type: fill-in-the-blank
- Q: nach etwas suchen → ____ sucht der Kunde?
  A: Wonach
  Type: fill-in-the-blank
- Q: mit etwas helfen → Gibt es etwas, ____ ich dir helfen kann?
  A: womit
  Type: fill-in-the-blank
- Q: Geld für etwas ausgeben → Das ist die Mode, ____ sie viel Geld ausgibt.
  A: wofür
  Type: fill-in-the-blank
- Q: an etwas denken → ____ denkst du?
  A: Woran
  Type: fill-in-the-blank
- Q: Corrige: Woüber ärgerst du dich?
  A: Worüber ärgerst du dich?
  Type: flashcard
- Q: ¿Por qué aparece una "r" en "worüber"?
  A: Porque la preposición "über" empieza por vocal; se forma con "wor-".
  Type: flashcard
- Q: ¿Se usa "womit" para preguntar por una persona?
  A: No normalmente; se usa "mit wem".
  Type: flashcard
- Q: Traduce: ¿Qué busca el cliente?
  A: Wonach sucht der Kunde?
  Type: flashcard
- Q: Traduce: No entiendo qué busca el cliente.
  A: Ich verstehe nicht, wonach der Kunde sucht.
  Type: flashcard
- Q: ¿Dónde va el verbo en una oración relativa introducida por "wofür"?
  A: Al final de la oración subordinada.
  Type: flashcard
- Q: Forma el adverbio pronominal de "auf etwas".
  A: worauf
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 43 — Adverbios conjuntivos (Konjunktionaladverbien)

*Nivel orientativo:* **B1** · *Alcance A1 de esta app:* 📚

---
class_id: 043
title: "Adverbios conjuntivos"
level: "B2"
topics: ["Gramática", "Adverbios conjuntivos", "Conectores", "Orden verbal", "Cohesión textual"]
target_exam: "Telc / Goethe B2"
---

### Adverbios conjuntivos (Konjunktionaladverbien)

#### 1. 🎯 Resumen / Objetivos de la Lección
- Conectar dos oraciones principales mediante adverbios conjuntivos.
- Aplicar la inversión cuando el conector ocupa la posición 1.
- Colocar el conector en el campo medio sin alterar la posición 2 del verbo.
- Distinguir relaciones de causa, consecuencia, contraste, adición y alternativa.
- Elegir el conector adecuado según el sentido y el registro.

#### 2. 📚 Vocabulario Clave (Wortschatz)

| Alemán | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| allerdings | sin embargo; eso sí | Adverbio conjuntivo concesivo | Introduce una limitación o contraste. |
| auch | también | Adverbio focal | Suele aparecer en el campo medio. |
| außerdem | además | Adverbio conjuntivo aditivo | Añade un argumento o dato. |
| daher | por eso; de ahí que | Adverbio conjuntivo consecutivo | Presenta una consecuencia. |
| dennoch | no obstante; pese a ello | Adverbio conjuntivo concesivo | Contraste con una circunstancia previa. |
| darum / deshalb / deswegen | por eso; por esa razón | Adverbios conjuntivos causales-consecutivos | Retoman una causa anterior. |
| doch | sin embargo; pero; sí que | Conector o partícula modal | Su función depende de la posición y el contexto. |
| ebenfalls / gleichfalls | igualmente | Adverbios conjuntivos aditivos | **Gleichfalls!** como respuesta cortés. |
| jedoch | sin embargo; no obstante | Adverbio conjuntivo adversativo | Registro algo más formal. |
| nur | solo; pero | Adverbio focal o conector restrictivo | El significado depende del contexto. |
| so | así; de ese modo | Adverbio conjuntivo modal o consecutivo | Puede introducir un resultado. |
| somit | por consiguiente; así pues | Adverbio conjuntivo consecutivo | Frecuente en registros formales. |
| sonst | si no; de lo contrario; aparte de eso | Adverbio conjuntivo | Puede expresar consecuencia negativa o adición residual. |
| stattdessen | en lugar de eso | Adverbio conjuntivo sustitutivo | Presenta una alternativa. |
| zudem | además | Adverbio conjuntivo aditivo | Frecuente en textos formales. |
| trotzdem | a pesar de ello; aun así | Adverbio conjuntivo concesivo | Contradice una expectativa. |
| die Verspätung, -en | el retraso | Sustantivo femenino | **Der Zug hatte Verspätung.** |
| die Buchhaltung | la contabilidad | Sustantivo femenino, sin plural habitual | **die Buchhaltung digitalisieren** |
| das Ergebnis, -se | el resultado | Sustantivo neutro | **stolz auf das Ergebnis sein** |
| die Schlange, -n | la cola; la serpiente | Sustantivo femenino | **vor der Kasse Schlange stehen** |
| die Brezel, -n | el pretzel | Sustantivo femenino | Variante regional: **die Breze, -n**. |
| vertrauenswürdig | digno de confianza | Adjetivo | **für viele Bürger vertrauenswürdig** |
| digitalisieren | digitalizar | Verbo regular inseparable, Akkusativ | **die Buchhaltung digitalisieren** |
| sich ärgern über + Akk. | enfadarse por | Verbo regular reflexivo con preposición | **sich über die Verspätung ärgern** |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1. Función

Los adverbios conjuntivos conectan dos oraciones principales completas y explicitan la relación lógica entre ellas.

- **Hauptsatz 1. Hauptsatz 2.**
- **Ich bin krank. Ich gehe morgen nicht zur Arbeit.**
- **Ich bin krank. Deshalb gehe ich morgen nicht zur Arbeit.**

A diferencia de una conjunción subordinante, el adverbio conjuntivo no envía el verbo al final.

##### 3.2. Conector en posición 1

- El adverbio ocupa la primera posición.
- El verbo conjugado aparece inmediatamente después.
- El sujeto se coloca después del verbo.

- **Estructura / Fórmula:** `Hauptsatz 1, Konjunktionaladverb + Verb + Subjekt + Ergänzungen.`
- **Ich bin krank, deshalb gehe ich morgen nicht zur Arbeit.**
- **Der Zug hatte Verspätung; daher kamen wir zu spät.**

##### 3.3. Conector en el campo medio

El sujeto puede ocupar la posición 1 y el verbo conserva la posición 2; el adverbio aparece normalmente después:

- **Estructura / Fórmula:** `Hauptsatz 1. Subjekt + Verb + Konjunktionaladverb + Ergänzungen.`
- **Ich bin krank. Ich gehe deshalb morgen nicht zur Arbeit.**
- **Wir waren nicht pünktlich fertig. Ich bin dennoch stolz auf unser Ergebnis.**

La posición exacta puede variar según el énfasis, los pronombres y otros complementos.

##### 3.4. Diferencia frente a conjunciones

| Tipo | Ejemplos | Orden de la segunda oración |
| :--- | :--- | :--- |
| Conjunción coordinante | aber, denn, oder, und, sondern | `conjunción + sujeto + verbo` |
| Adverbio conjuntivo | deshalb, trotzdem, außerdem, jedoch | `adverbio + verbo + sujeto` |
| Conjunción subordinante | weil, obwohl, dass, wenn | `conjunción + sujeto + ... + verbo final` |

**Ich bin krank, aber ich arbeite.**  
**Ich bin krank; trotzdem arbeite ich.**  
**Ich arbeite, obwohl ich krank bin.**

##### 3.5. Relaciones semánticas

| Relación | Conectores |
| :--- | :--- |
| Adición | auch, außerdem, ebenfalls, gleichfalls, zudem |
| Consecuencia / resultado | daher, darum, deshalb, deswegen, somit, so |
| Contraste / concesión | allerdings, dennoch, jedoch, trotzdem |
| Sustitución | stattdessen |
| Alternativa o consecuencia negativa | sonst |
| Restricción | nur |

##### 3.6. Matices importantes

- **darum, deshalb, deswegen** son ampliamente intercambiables y frecuentes en el habla.
- **daher** y **somit** son comunes en textos argumentativos o formales.
- **trotzdem / dennoch** expresan un resultado contrario a lo esperado.
- **allerdings / jedoch** introducen una objeción o limitación.
- **stattdessen** reemplaza una acción por otra.
- **sonst** significa a menudo “de lo contrario”: **Beeil dich, sonst verpasst du den Zug.**
- **doch** puede funcionar como conector adversativo, partícula modal o respuesta afirmativa a una pregunta negativa; no está limitado de manera absoluta al inicio de la oración.

##### 3.7. Soluciones de 092

Cada par admite dos posiciones del adverbio:

1. **Ich laufe gerne durch Florenz, allerdings sind meine Schuhe zu eng.**  
   **Ich laufe gerne durch Florenz. Meine Schuhe sind allerdings zu eng.**

2. **Ich bin krank, deshalb gehe ich morgen nicht zur Arbeit.**  
   **Ich bin krank. Ich gehe deshalb morgen nicht zur Arbeit.**  
   También: **deswegen / darum**.

3. **Der Zug hatte Verspätung, daher kamen wir zu spät.**  
   **Der Zug hatte Verspätung. Wir kamen daher zu spät.**

4. **Ich habe schon viele Leute gefragt, doch konnte mir niemand helfen.**  
   Más natural con **doch** como conjunción coordinante: **Ich habe schon viele Leute gefragt, doch niemand konnte mir helfen.**

5. **Das Wetter war sehr schön, trotzdem blieben wir zu Hause.**  
   **Das Wetter war sehr schön. Wir blieben trotzdem zu Hause.**

##### 3.8. Soluciones de 093

1. **Frau Merkel war für viele Bürger vertrauenswürdig, darum hat das Volk sie damals gewählt.**  
   **Frau Merkel war für viele Bürger vertrauenswürdig. Das Volk hat sie darum damals gewählt.**

2. **Wir waren nicht pünktlich fertig, dennoch bin ich stolz auf unser Ergebnis.**  
   **Wir waren nicht pünktlich fertig. Ich bin dennoch stolz auf unser Ergebnis.**

3. **Wir hätten gerne ein Kilogramm Brot. Außerdem packen Sie bitte sechs Brezen ein.**  
   **Wir hätten gerne ein Kilogramm Brot. Packen Sie bitte außerdem sechs Brezen ein.**

4. **Ich gratuliere dir zu deinem neuen Geschäft; zudem gratuliere ich dir zu deinem Geburtstag.**  
   **Ich gratuliere dir zu deinem neuen Geschäft. Ich gratuliere dir zudem zu deinem Geburtstag.**

5. **Ich habe die Suppe bestellt; stattdessen esse ich lieber den Kartoffelsalat.**  
   **Ich habe die Suppe bestellt. Ich esse stattdessen lieber den Kartoffelsalat.**

6. **Die Party war großartig; so hatten alle viel Spaß.**

7. **Du könntest deine Buchhaltung digitalisieren; somit hättest du mehr Zeit für dein Business.**  
   **Du könntest deine Buchhaltung digitalisieren. Du hättest somit mehr Zeit für dein Business.**

8. **Ich wollte diesen Kinofilm wirklich sehen, jedoch war die Schlange vor der Kasse viel zu lang.**  
   **Ich wollte diesen Kinofilm wirklich sehen. Die Schlange vor der Kasse war jedoch viel zu lang.**

9. **„Bis morgen, hab einen schönen Abend!“ - „Gleichfalls! Bis morgen.“**

10. **Ich muss arbeiten; sonst habe ich nichts anderes geplant.**  
    **Ich muss arbeiten. Ich habe sonst nichts anderes geplant.**

> En el ejercicio 7 se usa **hättest** para mantener el carácter hipotético de **könntest**. En el ejercicio 10, **sonst** significa “aparte de eso”; la combinación es gramatical, aunque semánticamente poco natural.

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Ich bin krank, deshalb gehe ich morgen nicht zur Arbeit.**  
> *Traducción:* Estoy enfermo; por eso mañana no voy a trabajar.  
> *Uso:* Expresar una consecuencia.

> **Das Wetter war schön, trotzdem blieben wir zu Hause.**  
> *Traducción:* Hacía buen tiempo; aun así nos quedamos en casa.  
> *Uso:* Expresar un resultado contrario a lo esperado.

> **Beeil dich, sonst verpasst du den Zug.**  
> *Traducción:* Date prisa; si no, perderás el tren.  
> *Uso:* Advertir de una consecuencia negativa.

> **Bis morgen! - Gleichfalls!**  
> *Traducción:* ¡Hasta mañana! - ¡Igualmente!  
> *Uso:* Responder a un deseo o despedida.

> **Außerdem möchte ich hinzufügen, dass ...**  
> *Traducción:* Además, quisiera añadir que...  
> *Uso:* Añadir un argumento en una exposición o examen oral.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** después de un adverbio conjuntivo en posición 1 viene el verbo, no el sujeto: **Deshalb gehe ich**, no *Deshalb ich gehe*.
- ⚠️ **Atención:** no envíes el verbo al final; estos conectores unen Hauptsätze.
- ⚠️ **Atención:** **trotzdem** es un adverbio con inversión; **obwohl** es una conjunción subordinante con verbo final.
- ⚠️ **Atención:** **deshalb** expresa consecuencia; **weil** introduce la causa.
- ⚠️ **Atención:** se dice **nichts anderes**, no *nichts anders*, cuando “otra cosa” funciona como sustantivo.
- ⚠️ **Atención:** **doch** puede pertenecer a categorías distintas; el orden depende de su función concreta.
- En **außerdem** y **deshalb**, el acento principal ayuda a destacar la relación lógica en el discurso.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: Ich bin krank. ____ gehe ich morgen nicht zur Arbeit.
  A: Deshalb / Deswegen / Darum
  Type: fill-in-the-blank
- Q: Das Wetter war schön. ____ blieben wir zu Hause.
  A: Trotzdem
  Type: fill-in-the-blank
- Q: Der Zug hatte Verspätung; ____ kamen wir zu spät.
  A: daher
  Type: fill-in-the-blank
- Q: Beeil dich, ____ verpasst du den Zug.
  A: sonst
  Type: fill-in-the-blank
- Q: Ich esse nicht die Suppe; ____ nehme ich den Salat.
  A: stattdessen
  Type: fill-in-the-blank
- Q: Corrige: Deshalb ich gehe nach Hause.
  A: Deshalb gehe ich nach Hause.
  Type: flashcard
- Q: Corrige: Wir waren spät, trotzdem wir kamen.
  A: Wir waren spät; trotzdem kamen wir.
  Type: flashcard
- Q: ¿Qué diferencia estructural hay entre "trotzdem" y "obwohl"?
  A: "Trotzdem" introduce una oración principal con verbo en posición 2; "obwohl" introduce una subordinada con verbo al final.
  Type: flashcard
- Q: Traduce: No terminamos a tiempo; aun así estoy orgulloso del resultado.
  A: Wir waren nicht pünktlich fertig; dennoch bin ich stolz auf das Ergebnis.
  Type: flashcard
- Q: ¿Dónde puede aparecer un adverbio conjuntivo además de la posición 1?
  A: En el campo medio de la segunda oración principal.
  Type: flashcard
- Q: Ordena: deshalb / ich / morgen / bleibe / zu Hause
  A: Deshalb bleibe ich morgen zu Hause.
  Type: fill-in-the-blank
- Q: ¿Qué conector formal expresa “por consiguiente”?
  A: somit
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 44 — Oraciones subordinadas: tipos (Parte 2)

*Nivel orientativo:* **B1** · *Alcance A1 de esta app:* 📚

---
class_id: 044
title: "Oraciones subordinadas: tipos (Parte 2)"
level: "B1"
topics: ["Gramática", "Oraciones finales", "Oraciones temporales", "Oraciones con dass", "Infinitivo con zu"]
target_exam: "Telc / Goethe B1"
---

### Oraciones subordinadas: tipos (Parte 2)

#### 1. 🎯 Resumen / Objetivos de la Lección
- Expresar finalidad con **damit** y **um ... zu**.
- Elegir la estructura final según coincidan o no los sujetos.
- Insertar **zu** correctamente en verbos separables.
- Relacionar acontecimientos temporales mediante **als, wenn, bevor, bis, nachdem, seitdem, solange** y **während**.
- Comunicar afirmaciones, pensamientos, emociones y conocimientos mediante **dass**.
- Formar construcciones impersonales con **zu + infinitivo**.

#### 2. 📚 Vocabulario Clave (Wortschatz)

| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| das Ziel, -e | la meta; el objetivo | Sustantivo neutro | Las oraciones finales expresan un objetivo. |
| der Zweck, -e | la finalidad | Sustantivo masculino | **zu diesem Zweck** |
| damit | para que | Conjunción subordinante final | Permite sujetos distintos. |
| um ... zu | para | Construcción de infinitivo final | Normalmente exige el mismo sujeto lógico. |
| als | cuando | Conjunción temporal | Hecho o periodo único en el pasado. |
| wenn | cuando; siempre que | Conjunción temporal/condicional | Repetición, presente, futuro o condición. |
| bevor | antes de que | Conjunción temporal | La subordinada expresa el hecho posterior. |
| bis | hasta que | Conjunción temporal | Marca el límite final. |
| nachdem | después de que | Conjunción temporal | La subordinada ocurre primero. |
| seit / seitdem | desde que | Conjunción temporal | Situación iniciada antes y vigente después. |
| solange | mientras; mientras que | Conjunción temporal/condicional | Duración coincidente o condición mantenida. |
| während | mientras | Conjunción temporal | Simultaneidad. |
| dass | que | Conjunción completiva | Introduce el contenido de una afirmación o idea. |
| die Umgangssprache | el lenguaje coloquial | Sustantivo femenino | **die Umgangssprache verstehen** |
| die Pfandflasche, -n | la botella retornable | Sustantivo femenino | **Pfandflaschen zurückbringen** |
| die Aufenthaltsgenehmigung, -en | el permiso de residencia | Sustantivo femenino | **eine Aufenthaltsgenehmigung haben** |
| der Studienplatz, Studienplätze | la plaza universitaria | Sustantivo masculino | **einen Studienplatz bekommen** |
| die Lebenshaltungskosten | el coste de vida | Sustantivo plural | **hohe Lebenshaltungskosten** |
| sich vorbereiten auf + Akk. | prepararse para | Verbo regular separable y reflexivo | **sich auf eine Prüfung vorbereiten** |
| wegbringen | llevarse; retirar | Verbo irregular separable, Akkusativ | Infinitivo con zu: **wegzubringen** |
| umsteigen | hacer transbordo | Verbo irregular separable | Infinitivo con zu: **umzusteigen** |
| vertreten | sustituir; representar | Verbo irregular no separable, Akkusativ | **eine Kollegin vertreten** |
| behaupten | afirmar; sostener | Verbo regular, Akkusativ / dass-Satz | **behaupten, dass ...** |
| vermuten | suponer | Verbo regular, Akkusativ / dass-Satz | **vermuten, dass ...** |
| unerlässlich | indispensable | Adjetivo | **Es ist unerlässlich, ...** |
| sinnvoll / sinnlos | razonable / absurdo | Adjetivos | **Es ist sinnvoll, ...** |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1. Oraciones finales con damit

**damit** introduce una subordinada que expresa la finalidad de la acción principal.

- **Estructura / Fórmula:** `Hauptsatz, + damit + sujeto + complementos + verbo conjugado.`
- **Ich besuche meine Oma, damit sie nicht allein ist.**
- **Die Lehrerin spricht langsam, damit alle sie verstehen.**

Se utiliza obligatoriamente cuando la principal y la subordinada tienen sujetos distintos:

**Ich gebe dir meine Nummer, damit du mich anrufen kannst.**

##### 3.2. Construcción final con um ... zu

Se usa cuando el sujeto lógico de ambas acciones es el mismo.

- **Estructura / Fórmula:** `Hauptsatz, + um + complementos + zu + infinitivo.`
- La construcción no expresa un sujeto propio.
- **Ich fliege nach Spanien, um meine Familie zu besuchen.**
- **Jennifer kauft Second-Hand-Kleidung, um Geld zu sparen.**

Cuando el sujeto coincide, **damit** también puede ser gramatical, pero **um ... zu** suele resultar más conciso y natural:

**Carmen braucht ein Visum, um in Deutschland zu arbeiten.**  
**Carmen braucht ein Visum, damit sie in Deutschland arbeiten kann.**

##### 3.3. Um ... zu con verbos separables

Con un verbo separable, **zu** se coloca entre el prefijo y la raíz:

| Infinitivo | Infinitivo con zu |
| :--- | :--- |
| sich vorbereiten | sich vorzubereiten |
| wegbringen | wegzubringen |
| umsteigen | umzusteigen |
| anrufen | anzurufen |
| zurückkommen | zurückzukommen |

- **Ich habe keine Zeit, um mich auf die Prüfung vorzubereiten.**
- **Wir brauchen genügend Zeit, um am Bahnhof umzusteigen.**

Con verbos inseparables y verbos terminados en **-ieren**, **zu** va delante del infinitivo completo: **zu verstehen, zu besuchen, zu informieren**.

##### 3.4. Comparación: damit y um ... zu

| Situación | Estructura adecuada | Ejemplo |
| :--- | :--- | :--- |
| Sujetos distintos | damit | **Mach die Musik aus, damit ich schlafen kann.** |
| Mismo sujeto | um ... zu, preferentemente | **Wir mieten ein Auto, um nach Spanien zu fahren.** |
| Mismo sujeto con modal explícito | damit + modal | **Sie lernt viel, damit sie bestehen kann.** |

##### 3.5. Oraciones temporales

| Conjunción | Uso principal | Ejemplo |
| :--- | :--- | :--- |
| als | Hecho o periodo único en el pasado | **Als ich fünf Jahre alt war, trennten sich meine Eltern.** |
| wenn | Repetición, presente o futuro | **Wenn ich Hunger habe, bekomme ich schlechte Laune.** |
| bevor | Acción anterior a otra | **Bevor ich aus dem Haus gehe, frühstücke ich.** |
| bis | Límite temporal | **Wir warten, bis der Chef zurückkommt.** |
| nachdem | Acción ya concluida antes de otra | **Nachdem er gegessen hat, ruft er an.** |
| seitdem | Inicio pasado con efecto o duración posterior | **Seitdem ich den Kurs gemacht habe, ist mein Deutsch besser.** |
| solange | Duración o condición mantenida | **Solange du nicht übst, wirst du dich nicht verbessern.** |
| während | Dos acciones simultáneas | **Ich höre Musik, während ich dusche.** |

###### Als frente a wenn

- **als**: una sola vez o etapa irrepetible en el pasado.
- **wenn**: acción repetida, presente, futuro o condición.

###### Nachdem frente a seitdem

- **nachdem** = después de que; destaca la secuencia.
- **seitdem** = desde que; conecta un punto inicial con un estado posterior que continúa.

###### Während frente a solange

- **während** destaca simultaneidad.
- **solange** destaca duración coincidente o la vigencia de una condición.

##### 3.6. Oraciones con dass

**dass** introduce el contenido de:

- una afirmación: **Sie sagt, dass ...**
- un pensamiento o una suposición: **Ich denke / vermute, dass ...**
- una emoción o percepción: **Ich hoffe / verstehe, dass ...**
- un conocimiento: **Ich weiß, dass ...**
- una valoración impersonal: **Es ist wichtig, dass ...**

- **Estructura / Fórmula:** `Hauptsatz, + dass + sujeto + complementos + verbo al final.`
- **Meine Schwester hat erzählt, dass ihr Mann einen neuen Job hat.**
- **Ich hoffe, dass du bald Arbeit findest.**
- **Es ist klar, dass man eine Sprache nicht über Nacht lernen kann.**

Esta construcción puede reproducir el contenido de lo dicho de manera neutra. El discurso indirecto formal con **Konjunktiv I** constituye un tema posterior.

##### 3.7. Zu + infinitivo como alternativa impersonal

Cuando no se necesita expresar un sujeto propio, una valoración con **dass** puede convertirse en una construcción de infinitivo:

**Es ist wichtig, dass man regelmäßig zum Unterricht kommt.**  
→ **Es ist wichtig, regelmäßig zum Unterricht zu kommen.**

Otros ejemplos:

- **Es ist unerlässlich, sich über die Kultur zu informieren.**
- **Es ist sinnvoll, einen Experten zu fragen.**
- **Es ist sinnlos, sich über das Wetter zu ärgern.**
- **Es ist inakzeptabel, sich nicht zu entschuldigen.**

El sujeto implícito se interpreta de manera general o se recupera del contexto; no es literalmente el pronombre impersonal **es**.

##### 3.8. Dass frente a das

| Forma | Función | Ejemplo |
| :--- | :--- | :--- |
| dass | Conjunción subordinante | **Ich weiß, dass du kommst.** |
| das | Artículo o pronombre | **Das Buch, das ich lese, ...** |

Prueba útil: si puede sustituirse por **dieses, jenes** o **welches**, se escribe **das**.

##### 3.9. Soluciones: oraciones finales

1. **Ich erkläre euch die Übungen noch einmal, damit ihr sie versteht.**
2. **Beeil dich, damit wir nicht zu spät kommen.**
3. **José verbringt ein Semester in den USA, um sein Englisch zu verbessern.**  
   También: **..., damit er sein Englisch verbessert.**
4. **Mach die Musik aus, damit ich schlafen kann.**
5. **Wir mieten ein Auto, um nach Spanien zu fahren.**  
   También: **..., damit wir nach Spanien fahren können.**
6. **Ich gebe dir meine Nummer, damit du mich anrufen kannst.**
7. **Abonniere meinen Kanal, um kein Video mehr zu verpassen.**  
   También: **..., damit du kein Video mehr verpasst.**

##### 3.10. Soluciones: oraciones temporales

1. **Solange ich keine Aufenthaltsgenehmigung habe, kann ich nicht in Deutschland studieren.**
2. **Als ich fünf Jahre alt war, haben sich meine Eltern getrennt.**
3. **Bis das Paket in Spanien ankommt, kann es eine Woche dauern.**
4. **Ich höre einen deutschen Podcast, während ich dusche.**
5. **Wenn ich Hunger habe, bekomme ich schlechte Laune.**
6. **Mein Deutsch hat sich sehr verbessert, seitdem ich den Kurs gemacht habe.**  
   **Nachdem ich den Kurs gemacht hatte, hat sich mein Deutsch sehr verbessert.**
7. **Bevor ich aus dem Haus gehe, frühstücke ich.**
8. **Dein Deutsch wird sich nicht verbessern, solange du nicht regelmäßig sprichst.**  
   Con **wenn** también es posible, pero significa “si no hablas regularmente”.
9. **Ich freue mich immer, wenn meine Kinder gute Noten haben.**
10. **Meine Frau hört immer Musik, wenn / während sie ihre E-Mails kontrolliert.**

##### 3.11. Soluciones: dass y zu + infinitivo

1. **Ich hoffe, dass ihr die Erklärungen gut verstanden habt.**
2. **Es ist wichtig, dass du die Regeln gut lernst.**
3. **Es ist normal, Fehler zu machen, wenn man eine Fremdsprache spricht.**  
   También: **Es ist normal, dass man Fehler macht, wenn man eine Fremdsprache spricht.**
4. **Mein Lehrer hat mir erzählt, dass seine Frau Mexikanerin ist.**
5. **Ich vermute, dass Max und Lisa ein Paar sind / zusammen sind.**
6. **Meine Mutter denkt, dass die Deutschen zu ernst sind.**
7. **Ich glaube nicht, dass es einfach ist, einen Studienplatz zu bekommen.**
8. **Ich verstehe, dass die wirtschaftliche Situation schwierig ist.**

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Beeil dich, damit wir nicht zu spät kommen.**  
> *Traducción:* Date prisa para que no lleguemos tarde.  
> *Uso:* Pedir una acción con una finalidad.

> **Ich gebe dir meine Nummer, damit du mich anrufen kannst.**  
> *Traducción:* Te doy mi número para que puedas llamarme.  
> *Uso:* Explicar el objetivo de una acción.

> **Seitdem ich aufgehört habe zu rauchen, fühle ich mich besser.**  
> *Traducción:* Desde que dejé de fumar, me siento mejor.  
> *Uso:* Relacionar un cambio pasado con el presente.

> **Ich hoffe, dass ihr alles gut verstanden habt.**  
> *Traducción:* Espero que lo hayáis entendido todo bien.  
> *Uso:* Expresar una esperanza o expectativa.

> **Es ist sinnvoll, einen Experten zu fragen.**  
> *Traducción:* Es razonable consultar a un experto.  
> *Uso:* Formular una recomendación impersonal.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** usa **damit** si cambian los sujetos; **um ... zu** no lleva sujeto propio.
- ⚠️ **Atención:** con verbos separables, **zu** se intercala: **vorzubereiten**, no *zu vorbereiten*.
- ⚠️ **Atención:** **als** se usa para un hecho único pasado; **wenn**, para repeticiones, presente, futuro o condiciones.
- ⚠️ **Atención:** **nachdem** y **seitdem** no son sinónimos exactos: secuencia frente a continuidad desde un punto inicial.
- ⚠️ **Atención:** **dass** lleva doble *s* y coloca el verbo al final.
- ⚠️ **Atención:** en alemán se dice **Fehler machen**, no una traducción literal con *tun*.
- ⚠️ **Atención:** la coma delante de **damit, dass, als, wenn** y de una construcción con **um ... zu** es obligatoria.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: Ich gebe dir meine Nummer, ____ du mich anrufen kannst.
  A: damit
  Type: fill-in-the-blank
- Q: Ich spare Geld, ____ eine Reise ____ machen.
  A: um → zu
  Type: fill-in-the-blank
- Q: sich vorbereiten → Infinitivo con "zu"
  A: sich vorzubereiten
  Type: flashcard
- Q: ____ ich fünf Jahre alt war, trennten sich meine Eltern.
  A: Als
  Type: fill-in-the-blank
- Q: ____ ich Hunger habe, werde ich schlecht gelaunt.
  A: Wenn
  Type: fill-in-the-blank
- Q: ____ ich dusche, höre ich einen Podcast.
  A: Während
  Type: fill-in-the-blank
- Q: ____ ich den Kurs gemacht habe, ist mein Deutsch besser.
  A: Seitdem
  Type: fill-in-the-blank
- Q: Ich hoffe, ____ ihr alles verstanden habt.
  A: dass
  Type: fill-in-the-blank
- Q: ¿Cuándo es obligatorio usar "damit" en lugar de "um ... zu"?
  A: Cuando la oración principal y la finalidad tienen sujetos distintos.
  Type: flashcard
- Q: ¿Qué diferencia hay entre "als" y "wenn"?
  A: "Als" expresa un hecho o periodo único del pasado; "wenn" expresa repetición, presente, futuro o condición.
  Type: flashcard
- Q: Corrige: Es ist wichtig, dass du lernst die Regeln.
  A: Es ist wichtig, dass du die Regeln lernst.
  Type: flashcard
- Q: Corrige: Ich lerne viel, um ich die Prüfung bestehe.
  A: Ich lerne viel, um die Prüfung zu bestehen.
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 45 — Preguntas indirectas cerradas (Indirekte Ja-/Nein-Fragen)

*Nivel orientativo:* **A2/B1** · *Alcance A1 de esta app:* 📚

---
class_id: 045
title: "Preguntas indirectas cerradas"
level: "B1"
topics: ["Gramática", "Preguntas indirectas", "Oraciones subordinadas", "ob", "wenn"]
target_exam: "Telc / Goethe B1"
---

### Preguntas indirectas cerradas (Indirekte Ja-/Nein-Fragen)

#### 1. 🎯 Resumen / Objetivos de la Lección
- Transformar preguntas directas de sí/no en preguntas indirectas con **ob**.
- Colocar el verbo conjugado al final de la pregunta indirecta.
- Usar fórmulas introductorias formales e informales.
- Expresar duda, incertidumbre e indiferencia.
- Distinguir **ob** interrogativo de **wenn** condicional o temporal.

#### 2. 📚 Vocabulario Clave (Wortschatz)

| Alemán | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| ob | si | Conjunción subordinante interrogativa | Introduce una pregunta indirecta de sí/no. |
| wenn | si; cuando | Conjunción subordinante | Expresa condición o repetición temporal. |
| Wissen Sie, ...? | ¿Sabe usted...? | Fórmula formal | **Wissen Sie, ob ...?** |
| Weißt du, ...? | ¿Sabes...? | Fórmula informal | **Weißt du, ob ...?** |
| Können Sie mir sagen, ...? | ¿Puede decirme...? | Fórmula formal | Petición cortés de información. |
| Ich würde gerne wissen, ... | Me gustaría saber... | Fórmula cortés | Introduce una pregunta indirecta. |
| Ich frage mich, ... | Me pregunto... | Expresión | Manifiesta una duda personal. |
| Ich bin mir nicht sicher, ... | No estoy seguro/a... | Expresión | Indica incertidumbre. |
| Ich weiß nicht, ... | No sé... | Expresión | **Ich weiß nicht, ob ...** |
| Es ist mir egal, ... | Me da igual... | Expresión | **Ob er kommt, ist mir egal.** |
| bezweifeln | dudar de; poner en duda | Verbo regular inseparable, Akkusativ / dass-Satz | Con **ob**, destaca incertidumbre entre alternativas. |
| die Entscheidung, -en | la decisión | Sustantivo femenino | **eine Entscheidung bezweifeln** |
| die Bewerbung, -en | la solicitud; candidatura | Sustantivo femenino | **eine Bewerbung erhalten** |
| der Feiertag, -e | el día festivo | Sustantivo masculino | **ein gesetzlicher Feiertag** |
| die Wahl, -en | la elección | Sustantivo femenino | **eine Wahl gewinnen** |
| die Pandemielage, -n | la situación pandémica | Sustantivo femenino | **sich verschlechtern** |
| stattfinden | tener lugar | Verbo irregular separable | **Die Veranstaltung findet statt.** |
| abhängen von + Dat. | depender de | Verbo irregular separable con preposición | **vom Wetter abhängen** |
| einverstanden sein mit + Dat. | estar de acuerdo con | Expresión | **mit etwas einverstanden sein** |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1. Pregunta directa frente a pregunta indirecta

Una pregunta cerrada directa coloca el verbo conjugado en primera posición y admite **ja** o **nein** como respuesta.

| Pregunta directa | Pregunta indirecta |
| :--- | :--- |
| **Ist der Chef morgen da?** | **Wissen Sie, ob der Chef morgen da ist?** |
| **Wird es morgen regnen?** | **Weißt du, ob es morgen regnen wird?** |
| **Hat das Schwimmbad morgen geöffnet?** | **Können Sie mir sagen, ob das Schwimmbad morgen geöffnet hat?** |

- **Estructura / Fórmula:** `Frase introductoria + ob + sujeto + complementos + verbo conjugado.`
- La subordinada con **ob** se separa mediante una coma.
- El verbo conjugado pasa al final.

##### 3.2. Frases introductorias frecuentes

| Registro / intención | Fórmula |
| :--- | :--- |
| Formal | **Können Sie mir sagen, ob ...?** |
| Neutral | **Wissen Sie, ob ...?** |
| Informal | **Weißt du, ob ...?** |
| Deseo de información | **Ich würde gerne wissen, ob ...** |
| Pregunta interna | **Ich frage mich, ob ...** |
| Desconocimiento | **Ich weiß nicht, ob ...** |
| Incertidumbre | **Ich bin mir nicht sicher, ob ...** |

La oración completa solo lleva signo de interrogación si la frase principal es interrogativa:

- **Weißt du, ob er kommt?**
- **Ich weiß nicht, ob er kommt.**

##### 3.3. Otros usos de ob

**ob** también introduce el contenido de una duda, una incertidumbre o una elección abierta:

- **Ich bin mir nicht sicher, ob dieser Satz richtig ist.**
- **Ich weiß nicht, ob ich die Prüfung bestehe.**
- **Ob er kommt, ist mir egal.**
- **Ob Barcelona oder Madrid gewinnt, ist mir egal.**

Con **bezweifeln**, el alemán estándar prefiere a menudo una subordinada con **dass** cuando se pone en duda una afirmación:

- **Ich bezweifle, dass diese Entscheidung richtig war.**

La construcción con **ob** es posible cuando se destaca la cuestión abierta de si algo es o no cierto:

- **Ich bezweifle, ob diese Lösung wirklich funktioniert.**

##### 3.4. Diferencia entre ob y wenn

| Conjunción | Función | Prueba útil |
| :--- | :--- | :--- |
| ob | Pregunta indirecta de sí/no; incertidumbre | Puede responderse con **ja / nein**. |
| wenn | Condición | Equivale a “en caso de que”. |
| wenn | Tiempo repetido, presente o futuro | Equivale a “cuando / cada vez que”. |

**Ich weiß nicht, ob er kommt.**  
*No sé si viene.*  

**Wenn er kommt, essen wir zusammen.**  
*Si viene, comemos juntos.*

**Ich freue mich, wenn meine Tochter mir schreibt.**  
*Me alegro cuando mi hija me escribe.*

##### 3.5. Ob-Satz en primera posición

La subordinada completa puede ocupar la posición 1. La principal empieza entonces con el verbo:

- **Ob die Party draußen stattfinden kann, hängt vom Wetter ab.**
- **Ob er kommt oder nicht, ist mir egal.**

- **Fórmula:** `Ob-Satz, + verbo de la principal + sujeto/complementos.`

##### 3.6. Soluciones: ob o wenn

1. **Ob die Party draußen stattfinden kann, hängt vom Wetter ab.**
2. **Wenn du kochst, mache ich nachher den Abwasch.**
3. **Ich freue mich jedes Mal, wenn meine Tochter mir eine Karte aus dem Urlaub schickt.**
4. **Ob der FC Barcelona oder Real Madrid das Spiel gewinnt, ist mir egal.**
5. **Können Sie mir sagen, ob der Zug auch sonntags um dieselbe Zeit fährt?**
6. **Ich würde gerne wissen, ob Sie meine Bewerbung erhalten haben.**
7. **Ruf mich an, wenn du kommst.**
8. **Wenn meine Eltern einverstanden sind, fahre ich gerne mit euch in den Urlaub.**
9. **Ich kann noch nicht sagen, ob ich an Weihnachten arbeiten muss.**
10. **Wenn sich die Pandemielage nicht verschlechtert, möchte ich dieses Jahr reisen.**

##### 3.7. Soluciones: transformar preguntas directas

1. **Können Sie mir sagen, ob ich die Übung richtig gemacht habe?**
2. **Weißt du, ob Maria in Manuel verliebt ist?**
3. **Wissen Sie, ob das Museum am Wochenende geschlossen ist?**
4. **Ich bin mir nicht sicher, ob der 1. Mai in Deutschland ein Feiertag ist.**
5. **Ich frage mich, ob es ein Leben nach dem Tod gibt.**
6. **Ich würde gerne wissen, ob du das Buch interessant fandest.**
7. **Ich frage mich, ob es Sinn ergibt, Grammatik zu lernen.**
8. **Ich bin mir nicht sicher, ob der Präsident die nächste Wahl gewinnen kann.**

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Können Sie mir sagen, ob der Zug pünktlich ist?**  
> *Traducción:* ¿Puede decirme si el tren es puntual?  
> *Uso:* Solicitar información formalmente.

> **Ich würde gerne wissen, ob Sie meine Bewerbung erhalten haben.**  
> *Traducción:* Me gustaría saber si ha recibido mi solicitud.  
> *Uso:* Consulta formal escrita u oral.

> **Ich bin mir nicht sicher, ob dieser Satz richtig ist.**  
> *Traducción:* No estoy seguro/a de si esta frase es correcta.  
> *Uso:* Expresar incertidumbre.

> **Ob er kommt oder nicht, ist mir egal.**  
> *Traducción:* Me da igual si viene o no.  
> *Uso:* Expresar indiferencia entre dos posibilidades.

> **Ich weiß nicht, ob man hier mit Karte zahlen kann.**  
> *Traducción:* No sé si aquí se puede pagar con tarjeta.  
> *Uso:* Preguntar indirectamente por una posibilidad.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** después de **ob**, el verbo conjugado va al final: **ob er kommt**, no *ob kommt er*.
- ⚠️ **Atención:** usa **ob** para “si” interrogativo y **wenn** para “si” condicional.
- ⚠️ **Atención:** la pregunta indirecta va precedida por una coma.
- ⚠️ **Atención:** no todas las frases con **ob** llevan signo de interrogación; depende de la oración principal.
- ⚠️ **Atención:** **ob** no significa “o”; para presentar alternativas se usa **ob ... oder ...**.
- ⚠️ **Atención:** **Hat das Schwimmbad geöffnet?** lleva **hat**, no *hast*.
- La vocal de **ob** es breve; la palabra se pronuncia de forma átona cuando introduce la subordinada.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: Weißt du, ____ der Chef morgen da ist?
  A: ob
  Type: fill-in-the-blank
- Q: ____ der Chef kommt, beginnen wir das Meeting.
  A: Wenn
  Type: fill-in-the-blank
- Q: Ich weiß nicht, ob man hier mit Karte zahlen ____.
  A: kann
  Type: fill-in-the-blank
- Q: Transforma: Regnet es morgen?
  A: Weißt du, ob es morgen regnet?
  Type: flashcard
- Q: Transforma: Hat sie meine Bewerbung erhalten?
  A: Ich würde gerne wissen, ob sie meine Bewerbung erhalten hat.
  Type: flashcard
- Q: Corrige: Ich weiß nicht, wenn er kommt.
  A: Ich weiß nicht, ob er kommt.
  Type: flashcard
- Q: Corrige: Können Sie sagen, ob fährt der Zug sonntags?
  A: Können Sie sagen, ob der Zug sonntags fährt?
  Type: flashcard
- Q: ¿Qué diferencia hay entre "ob" y "wenn"?
  A: "Ob" introduce una pregunta indirecta de sí/no o incertidumbre; "wenn" expresa condición o tiempo.
  Type: flashcard
- Q: ¿Lleva signo de interrogación "Ich weiß nicht, ob er kommt"?
  A: No, porque la oración principal es declarativa.
  Type: flashcard
- Q: Completa: ____ er kommt oder nicht, ist mir egal.
  A: Ob
  Type: fill-in-the-blank
- Q: Traduce: ¿Sabe usted si el museo está cerrado?
  A: Wissen Sie, ob das Museum geschlossen ist?
  Type: flashcard
- Q: ¿Dónde va el verbo conjugado dentro de una subordinada con "ob"?
  A: Al final.
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 46 — Preguntas indirectas abiertas (Indirekte W-Fragen)

*Nivel orientativo:* **A2/B1** · *Alcance A1 de esta app:* 📚

---
class_id: 046
title: "Preguntas indirectas abiertas"
level: "B1"
topics: ["Gramática", "Preguntas indirectas", "W-Fragen", "Oraciones subordinadas", "Orden verbal"]
target_exam: "Telc / Goethe B1"
---

### Preguntas indirectas abiertas (Indirekte W-Fragen)

#### 1. 🎯 Resumen / Objetivos de la Lección
- Transformar preguntas abiertas directas en preguntas indirectas.
- Conservar la palabra interrogativa como enlace subordinante.
- Colocar el verbo conjugado al final de la pregunta indirecta.
- Elegir correctamente entre **wer, wen, wem, wessen**, interrogativos locales y formas con preposición.
- Ajustar pronombres y perspectiva al reproducir la pregunta de otra persona.

#### 2. 📚 Vocabulario Clave (Wortschatz)

| Alemán | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| wer | quién | Pronombre interrogativo, Nominativ | **Wer kommt?** |
| wen | a quién | Pronombre interrogativo, Akkusativ | **Wen kennst du?** |
| wem | a quién | Pronombre interrogativo, Dativ | **Wem gehört das?** |
| wessen | de quién | Pronombre interrogativo, Genitiv | **Wessen Jacke ist das?** |
| was | qué | Pronombre interrogativo | **Was hast du gelernt?** |
| wo | dónde | Adverbio interrogativo local | Ubicación. |
| woher | de dónde | Adverbio interrogativo local | Procedencia. |
| wohin | adónde | Adverbio interrogativo local | Dirección. |
| wann | cuándo | Adverbio interrogativo temporal | Punto temporal. |
| wie lange | cuánto tiempo | Expresión interrogativa temporal | Duración. |
| wie viel | cuánto | Determinante/pronombre interrogativo | Cantidad no contable o singular. |
| wie viele | cuántos/as | Determinante interrogativo | Cantidad contable en plural. |
| welcher / welche / welches | cuál; qué | Determinante/pronombre interrogativo | Concuerda en género, número y caso. |
| warum / wieso / weshalb | por qué | Adverbios interrogativos causales | Variantes ampliamente equivalentes. |
| wozu / wofür | para qué | Adverbios interrogativos | Dependen del régimen o del sentido. |
| mit wem | con quién | Preposición + pronombre interrogativo | Referencia a persona. |
| Ich bin neugierig, ... | Tengo curiosidad por saber... | Fórmula introductoria | Registro neutral. |
| sich kümmern um + Akk. | ocuparse de | Verbo regular reflexivo con preposición | **sich um einen Artikel kümmern** |
| reservieren | reservar | Verbo regular en -ieren, Akkusativ | **ein Zimmer reservieren** |
| zurückkommen | regresar | Verbo irregular separable | En subordinada: **zurückkommt**. |
| aufräumen | ordenar; recoger | Verbo regular separable, Akkusativ | Perfekt: **hat aufgeräumt**. |
| gefallen | gustar | Verbo irregular, Dativ | **Der Kurs gefällt den Teilnehmern.** |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1. Pregunta directa frente a pregunta indirecta

| Pregunta directa | Pregunta indirecta |
| :--- | :--- |
| **Wer ist das?** | **Weißt du, wer das ist?** |
| **Wann kommst du nach Hause?** | **Sag mir bitte, wann du nach Hause kommst.** |
| **Was hast du gelernt?** | **Ich möchte wissen, was du gelernt hast.** |

- **Estructura / Fórmula:** `Frase introductoria + W-Wort + sujeto/complementos + verbo conjugado.`
- La palabra interrogativa se conserva.
- El verbo conjugado pasa al final de la subordinada.
- Una coma separa la frase introductoria de la pregunta indirecta.

##### 3.2. Pronombres interrogativos y casos

| Caso | Persona | Función | Ejemplo indirecto |
| :--- | :--- | :--- | :--- |
| Nominativ | wer | Sujeto | **Ich weiß nicht, wer kommt.** |
| Akkusativ | wen | Objeto directo | **Sag mir, wen du eingeladen hast.** |
| Dativ | wem | Objeto indirecto | **Wissen Sie, wem die Tasche gehört?** |
| Genitiv | wessen | Posesión | **Weiß jemand, wessen Jacke das ist?** |

Si la palabra interrogativa es el sujeto, no se añade otro sujeto:

**Wer kümmert sich darum?**  
→ **Die Chefin fragt, wer sich darum kümmert.**

##### 3.3. Interrogativos con preposición

La preposición exigida por el verbo o el contexto se mantiene:

- **Mit wem hast du gesprochen?**  
  → **Ich möchte wissen, mit wem du gesprochen hast.**
- **Für wen ist das Geschenk?**  
  → **Ich würde gerne wissen, für wen das Geschenk ist.**
- **Wofür brauchst du das?**  
  → **Ich verstehe nicht, wofür du das brauchst.**

Para personas se usa normalmente **preposición + wen/wem**; para cosas, **wo(r) + preposición**.

##### 3.4. Wo, woher y wohin

| Forma | Significado | Ejemplo |
| :--- | :--- | :--- |
| wo | ubicación | **Ich weiß nicht, wo Medellín liegt.** |
| woher | procedencia | **Sie fragt, woher mein Freund kommt.** |
| wohin | dirección | **Ich bin neugierig, wohin du fliegst.** |

Estas formas no “rigen” por sí mismas Dativ o Akkusativ. Expresan una relación espacial; el caso aparece cuando la construcción contiene una preposición o un complemento nominal.

##### 3.5. Cantidad, selección y causa

- **wie viel**: cantidad no contable o singular: **wie viel Geld**
- **wie viele**: elementos contables plurales: **wie viele Teilnehmer**
- **welcher-**: selección entre opciones; se declina según género, número y caso.
- **warum / wieso / weshalb**: causa.
- **wozu / wofür**: finalidad o régimen preposicional.

**Welcher Zug fährt nach München?**  
→ **Können Sie mir sagen, welcher Zug nach München fährt?**

**Warum ist Sarah nicht gekommen?**  
→ **Weißt du, warum Sarah nicht gekommen ist?**

##### 3.6. Cambio de perspectiva

Al reproducir la pregunta de otra persona pueden cambiar pronombres personales, posesivos y tratamientos:

**Die Kollegin fragt mich: „Was hast du gemacht?“**  
→ **Meine Kollegin fragt mich, was ich gemacht habe.**

**Die Rezeptionistin fragt den Gast: „Welches Zimmer haben Sie reserviert?“**  
→ **Die Rezeptionistin fragt den Gast, welches Zimmer er reserviert hat.**

El cambio depende de quién habla, a quién se dirige y de quién se habla.

##### 3.7. Signos de puntuación

- Si la principal es una pregunta, toda la oración termina con **?**:  
  **Weißt du, wann er kommt?**
- Si la principal es declarativa, termina con **.**:  
  **Ich weiß nicht, wann er kommt.**

##### 3.8. Soluciones de los ejercicios

1. **Frau Heinz möchte wissen, wann Herr Kaiser aus dem Urlaub zurückkommt.**
2. **Die Rezeptionistin fragt den Gast, welches Zimmer er reserviert hat.**
3. **Die Chefin fragt, wer sich um den Artikel kümmert.**
4. **Meine Kollegin fragt mich, was ich am Wochenende gemacht habe.**
5. **Der Lehrer fragt die Schüler, wo El Salvador liegt.**
6. **Mein Bruder möchte wissen, wie lange ich in Spanien bleibe.**
7. **Meine Mitbewohnerin fragt mich, warum ich die Küche nicht aufgeräumt habe.**
8. **Die Lehrerin fragt die Teilnehmer, wie ihnen der Kurs gefallen hat.**

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Können Sie mir sagen, welcher Zug nach München fährt?**  
> *Traducción:* ¿Puede decirme qué tren va a Múnich?  
> *Uso:* Solicitar información formalmente.

> **Ich würde gerne wissen, welche Musik du magst.**  
> *Traducción:* Me gustaría saber qué música te gusta.  
> *Uso:* Preguntar de forma indirecta y cortés.

> **Sag mir bitte, wann du nach Hause kommst.**  
> *Traducción:* Dime, por favor, cuándo vuelves a casa.  
> *Uso:* Pedir una hora o momento.

> **Ich frage mich, wie es deinen Eltern geht.**  
> *Traducción:* Me pregunto cómo están tus padres.  
> *Uso:* Expresar curiosidad o reflexión.

> **Weißt du, warum Sarah nicht gekommen ist?**  
> *Traducción:* ¿Sabes por qué Sarah no ha venido?  
> *Uso:* Preguntar indirectamente por una causa.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** el verbo conjugado va al final: **wann er kommt**, no *wann kommt er*.
- ⚠️ **Atención:** no añadas **ob** a una pregunta abierta; la propia W-Wort introduce la subordinada.
- ⚠️ **Atención:** distingue **wer, wen, wem** según el caso exigido dentro de la pregunta.
- ⚠️ **Atención:** si **wer** es el sujeto, el verbo va en singular: **wer kommt**.
- ⚠️ **Atención:** al pasar al estilo indirecto, adapta **du / ich / Sie / er / sie** a la nueva perspectiva.
- ⚠️ **Atención:** se escribe **Weiß jemand ...?**, no *Weißt jemand ...?*
- En alemán, las W-Wörter suelen recibir énfasis cuando representan la información desconocida.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: Weißt du, ____ das ist? (quién)
  A: wer
  Type: fill-in-the-blank
- Q: Ich möchte wissen, ____ du gesprochen hast. (con quién)
  A: mit wem
  Type: fill-in-the-blank
- Q: Wissen Sie, ____ diese Tasche gehört? (a quién)
  A: wem
  Type: fill-in-the-blank
- Q: Ich weiß nicht, ____ Jacke das ist. (de quién)
  A: wessen
  Type: fill-in-the-blank
- Q: Sag mir, ____ du nach Hause kommst. (cuándo)
  A: wann
  Type: fill-in-the-blank
- Q: Transforma: Wo liegt El Salvador?
  A: Der Lehrer fragt, wo El Salvador liegt.
  Type: flashcard
- Q: Transforma: Warum hast du nicht aufgeräumt?
  A: Sie fragt mich, warum ich nicht aufgeräumt habe.
  Type: flashcard
- Q: Corrige: Ich weiß nicht, wann kommt er.
  A: Ich weiß nicht, wann er kommt.
  Type: flashcard
- Q: ¿Se utiliza "ob" en una pregunta indirecta abierta?
  A: No; la palabra interrogativa introduce directamente la subordinada.
  Type: flashcard
- Q: ¿Qué diferencia hay entre "wie viel" y "wie viele"?
  A: "Wie viel" pregunta por cantidad no contable o singular; "wie viele", por elementos contables plurales.
  Type: flashcard
- Q: ¿Cómo se pregunta indirectamente “¿Adónde vuelas?”?
  A: Ich möchte wissen, wohin du fliegst.
  Type: flashcard
- Q: Completa: Die Lehrerin fragt die Teilnehmer, wie ____ der Kurs gefallen hat.
  A: ihnen
  Type: fill-in-the-blank
<!-- DATA_QUIZ_END -->


---


### Unidad 47 — Conjunciones y conectores (Konjunktionen und Konnektoren)

*Nivel orientativo:* **A2/B1** · *Alcance A1 de esta app:* 📚

---
class_id: 047
title: "Conjunciones y conectores"
level: "B1"
topics: ["Gramática", "Conjunciones coordinantes", "Conjunciones subordinantes", "Conectores dobles", "Vocabulario"]
target_exam: "Telc / Goethe B1"
---

### Conjunciones y conectores (Konjunktionen und Konnektoren)

#### 1. 🎯 Resumen / Objetivos de la Lección
- Distinguir oraciones principales (Hauptsätze) y subordinadas (Nebensätze).
- Unir elementos del mismo nivel con conjunciones coordinantes.
- Introducir subordinadas y colocar el verbo conjugado al final.
- Emplear conectores dobles para enumerar, negar, elegir y contrastar.
- Ampliar el vocabulario general del bloque con artículos y plurales correctos.

#### 2. 📚 Vocabulario Clave (Wortschatz)

##### Sustantivos masculinos

| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Lebenslauf, Lebensläufe | el currículum | Sustantivo masculino | **einen Lebenslauf schicken** |
| der Apfel, Äpfel | la manzana | Sustantivo masculino | Umlaut en plural. |
| der Urlaub, -e | las vacaciones | Sustantivo masculino | El plural es posible, pero poco frecuente. |
| der Chef, -s | el jefe | Sustantivo masculino | Femenino: **die Chefin, -nen**. |
| der Mund, Münder | la boca | Sustantivo masculino | **den Mund öffnen** |
| der Ausflug, Ausflüge | la excursión | Sustantivo masculino | **einen Ausflug machen** |
| der Delfin, -e | el delfín | Sustantivo masculino | También se encuentra la grafía **Delphin**. |
| der Fluss, Flüsse | el río | Sustantivo masculino | Umlaut y duplicación de *s*. |
| der Fuß, Füße | el pie | Sustantivo masculino | Conserva **ß**. |
| der Zentimeter, - | el centímetro | Sustantivo masculino | El plural no cambia. |
| der Tisch, -e | la mesa | Sustantivo masculino | **am Tisch sitzen** |
| der Stuhl, Stühle | la silla | Sustantivo masculino | Umlaut en plural. |
| der Sommer, - | el verano | Sustantivo masculino | El plural no cambia. |
| der Monat, -e | el mes | Sustantivo masculino | **jeden Monat** |
| der Bus, -se | el autobús | Sustantivo masculino | **mit dem Bus fahren** |
| der Kaffee, -s | el café | Sustantivo masculino | El plural suele indicar variedades o consumiciones. |
| der Tee, -s | el té | Sustantivo masculino | El plural suele indicar variedades. |

##### Sustantivos femeninos

| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| die Bewerbung, -en | la candidatura; solicitud de empleo | Sustantivo femenino | La carta de presentación es **das Bewerbungsschreiben / Anschreiben**. |
| die Öffnung, -en | la apertura; abertura | Sustantivo femenino | **die Öffnungszeiten** = horario de apertura. |
| die Übung, -en | el ejercicio | Sustantivo femenino | **eine Übung machen** |
| die Chefin, -nen | la jefa | Sustantivo femenino | Masculino: **der Chef, -s**. |
| die Wohnung, -en | el piso; apartamento | Sustantivo femenino | **eine Wohnung mieten** |
| die Ahnung, -en | la idea; sospecha | Sustantivo femenino | **Ich habe keine Ahnung.** |
| die Halle, -n | la sala; pabellón | Sustantivo femenino | **die Sporthalle** |
| die Datei, -en | el archivo informático | Sustantivo femenino | **eine Datei speichern** |
| die Nation, -en | la nación | Sustantivo femenino | **die Vereinten Nationen** |
| die Streichholzschachtel, -n | la caja de cerillas | Sustantivo femenino | Diminutivo: **das Streichholzschächtelchen, -**. |
| die Wand, Wände | la pared | Sustantivo femenino | **an der Wand** |
| die Tasche, -n | la bolsa; el bolso | Sustantivo femenino | **eine Tasche tragen** |
| die Lampe, -n | la lámpara | Sustantivo femenino | **die Lampe einschalten** |
| die Großeltern | los abuelos | Sustantivo plural | No tiene singular con el mismo significado colectivo. |
| die Woche, -n | la semana | Sustantivo femenino | **nächste Woche** |
| die Hand, Hände | la mano | Sustantivo femenino | **die Hände waschen** |

##### Sustantivos neutros

| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| das Museum, Museen | el museo | Sustantivo neutro | Plural irregular. |
| das Haus, Häuser | la casa | Sustantivo neutro | Umlaut en plural. |
| das Chrom | el cromo | Sustantivo neutro, sin plural habitual | Elemento químico. |
| das Schiff, -e | el barco | Sustantivo neutro | **mit dem Schiff fahren** |
| das Zink | el cinc / zinc | Sustantivo neutro, sin plural habitual | Elemento químico. |
| das Brot, -e | el pan | Sustantivo neutro | Diminutivo: **das Brötchen, -**. |
| das Protokoll, -e | el protocolo; acta | Sustantivo neutro | **ein Protokoll schreiben** |
| das Rührei, -er | el huevo revuelto | Sustantivo neutro | También se usa como nombre colectivo. |
| das Bild, -er | la imagen; foto; cuadro | Sustantivo neutro | El significado depende del contexto. |
| das Buch, Bücher | el libro | Sustantivo neutro | Umlaut en plural. |
| das Fenster, - | la ventana | Sustantivo neutro | El plural no cambia. |
| das Wetter | el tiempo; clima | Sustantivo neutro, sin plural habitual | **schönes Wetter** |
| das Jahr, -e | el año | Sustantivo neutro | **jedes Jahr** |
| das Essen, - | la comida; plato | Sustantivo neutro | El plural es posible para comidas o platos. |
| das Wochenende, -n | el fin de semana | Sustantivo neutro | **am Wochenende** |

##### Adjetivos, adverbios y expresiones

| Alemán | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| chronologisch | cronológico | Adjetivo/adverbio | **chronologisch ordnen** |
| ausführlich | detallado; exhaustivo | Adjetivo/adverbio | **ausführlich erklären** |
| funktional | funcional | Adjetivo | **ein funktionales Design** |
| circa / ca. | aproximadamente | Adverbio | **circa zehn Minuten** |
| nichts | nada | Pronombre indefinido | **nichts verstehen** |
| wenig | poco | Determinante/adverbio | **wenig Zeit** |
| hoch | alto; elevado | Adjetivo/adverbio | **hohe Kosten** |
| jetzt | ahora | Adverbio temporal | **jetzt anfangen** |
| rot | rojo | Adjetivo | **ein rotes Auto** |
| viel | mucho | Determinante/adverbio | **viel lernen** |
| wieder | otra vez; de nuevo | Adverbio | **wiederkommen** |
| attraktiv | atractivo | Adjetivo | **sehr attraktiv** |
| heute | hoy | Adverbio temporal | **heute Abend** |
| zu Fuß | a pie | Expresión adverbial | **zu Fuß gehen** |
| gestern | ayer | Adverbio temporal | **gestern arbeiten** |
| schön | bonito; agradable | Adjetivo/adverbio | **schönes Wetter** |
| kalt | frío | Adjetivo | **kaltes Wasser** |
| sehr | muy | Adverbio de grado | **sehr wichtig** |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1. Tres grupos de conectores

| Grupo | Función | Orden verbal |
| :--- | :--- | :--- |
| Nebenordnende Konjunktionen | Unen elementos u oraciones del mismo nivel | No cambian el orden de la oración principal. |
| Unterordnende Konjunktionen | Introducen una subordinada dependiente | El verbo conjugado va al final. |
| Doppelkonjunktionen | Conectores correlativos de dos o más partes | Conservan el orden propio de las unidades conectadas. |

##### 3.2. Conjunciones coordinantes

Las conjunciones **aber, denn, oder, sondern, und** se recuerdan mediante la regla **ADUSO**.

| Conjunción | Significado | Ejemplo |
| :--- | :--- | :--- |
| aber | pero | **Sie ist 44, aber sie ist noch sehr attraktiv.** |
| denn | porque; pues | **Wir gehen zu Fuß, denn der Bus ist schon weg.** |
| oder | o | **Wir fahren heute oder morgen.** |
| sondern | sino | **Ich möchte keinen Kaffee, sondern einen Tee.** |
| und | y | **Er hat eine Katze und einen Hund.** |

- **Estructura / Fórmula:** `Hauptsatz, + conjunción + sujeto + verbo + complementos.`
- La conjunción ocupa el campo de enlace, tradicionalmente llamado **posición 0**.
- Si se repiten sujeto o verbo, pueden omitirse cuando la estructura sigue siendo clara.
- **sondern** exige una negación o corrección previa: **nicht ..., sondern ... / kein ..., sondern ...**

##### 3.3. Conjunciones subordinantes

| Conjunción / enlace | Significado | Ejemplo |
| :--- | :--- | :--- |
| weil | porque | **Ich gehe nicht, weil ich keine Zeit habe.** |
| dass | que | **Ich weiß, dass du wenig geschlafen hast.** |
| bevor | antes de que | **Wasch deine Hände, bevor du isst.** |
| bis | hasta que | **Warte hier, bis ich wiederkomme.** |
| als | cuando, una vez en el pasado | **Sie war 20, als sie nach Deutschland umzog.** |
| wenn | si; cuando | **Sag mir Bescheid, wenn du zu Hause bist.** |
| von dem / von der / von denen | del cual / de la cual / de los cuales | **Das ist der Mann, von dem ich erzählt habe.** |

- **Estructura / Fórmula:** `Hauptsatz, + conjunción + sujeto + complementos + verbo.`
- El verbo conjugado aparece al final de la subordinada.
- En Dativ plural, el pronombre relativo es **denen**: **die Kinder, von denen ...**
- Una relativa no está introducida por una conjunción subordinante, sino por un pronombre o adverbio relativo, aunque también presenta verbo final.

##### 3.4. Conectores dobles

| Conector | Función | Traducción |
| :--- | :--- | :--- |
| sowohl ... als auch | Doble enumeración | tanto ... como |
| nicht nur ... sondern auch | Enumeración enfática | no solo ... sino también |
| weder ... noch | Doble negación | ni ... ni |
| entweder ... oder | Alternativa | o ... o |
| zwar ... aber | Concesión / contraste | es cierto que ..., pero |

Ejemplos:

- **Ich war sowohl in Spanien als auch in Deutschland.**
- **Ich war nicht nur in Spanien, sondern auch in Deutschland.**
- **Ich war weder in Spanien noch in Deutschland.**
- **Ich fahre entweder nach Spanien oder nach Deutschland.**
- **Deutschland ist zwar schön, aber auch sehr kalt.**

##### 3.5. Concordancia y posición con conectores dobles

- Los elementos unidos deben tener una estructura paralela.
- **sowohl ... als auch** suele combinarse con plural cuando coordina dos sujetos:  
  **Sowohl Anna als auch Max kommen.**
- **weder ... noch** ya contiene negación; no se añade normalmente **nicht**.
- **entweder** puede aparecer delante del primer elemento o en el campo medio:  
  **Entweder fahren wir heute oder wir fahren morgen.**  
  **Wir fahren entweder heute oder morgen.**

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Ich möchte keinen Kaffee, sondern einen Tee.**  
> *Traducción:* No quiero café, sino té.  
> *Uso:* Corregir o sustituir una opción negada.

> **Sag mir Bescheid, wenn du zu Hause bist.**  
> *Traducción:* Avísame cuando estés en casa.  
> *Uso:* Pedir una acción futura.

> **Ich weiß, dass du gestern nicht viel geschlafen hast.**  
> *Traducción:* Sé que ayer no dormiste mucho.  
> *Uso:* Introducir el contenido de un conocimiento.

> **Ich war weder in Spanien noch in Deutschland.**  
> *Traducción:* No estuve ni en España ni en Alemania.  
> *Uso:* Negar dos alternativas.

> **Deutschland ist zwar schön, aber sehr kalt.**  
> *Traducción:* Es cierto que Alemania es bonita, pero hace mucho frío.  
> *Uso:* Admitir un aspecto antes de presentar un contraste.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** **denn** mantiene el verbo en posición 2; **weil** lo coloca al final.
- ⚠️ **Atención:** **sondern** no equivale siempre a “pero”; corrige un elemento previamente negado.
- ⚠️ **Atención:** no añadas otra negación a **weder ... noch**.
- ⚠️ **Atención:** mantén estructuras paralelas a ambos lados de un conector doble.
- ⚠️ **Atención:** el Dativ plural relativo es **denen**, no *den*: **die Kinder, von denen ...**
- ⚠️ **Atención:** **die Bewerbung** es una solicitud/candidatura; la carta de presentación es **das Anschreiben**.
- **sowohl ... als auch** y **nicht nur ... sondern auch** reciben énfasis en ambas partes al hablar.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: Ich gehe nicht, ____ ich keine Zeit habe.
  A: weil
  Type: fill-in-the-blank
- Q: Wir gehen zu Fuß, ____ der Bus ist schon weg.
  A: denn
  Type: fill-in-the-blank
- Q: Ich möchte keinen Kaffee, ____ einen Tee.
  A: sondern
  Type: fill-in-the-blank
- Q: Ich war ____ in Spanien ____ in Deutschland. (ni... ni)
  A: weder → noch
  Type: fill-in-the-blank
- Q: Ich fahre ____ heute ____ morgen. (o... o)
  A: entweder → oder
  Type: fill-in-the-blank
- Q: Sie spricht ____ Deutsch ____ Englisch. (tanto... como)
  A: sowohl → als auch
  Type: fill-in-the-blank
- Q: Corrige: Ich bleibe zu Hause, weil ich bin krank.
  A: Ich bleibe zu Hause, weil ich krank bin.
  Type: flashcard
- Q: Corrige: Das sind die Kinder, von den ich erzählt habe.
  A: Das sind die Kinder, von denen ich erzählt habe.
  Type: flashcard
- Q: ¿Qué diferencia estructural hay entre "denn" y "weil"?
  A: "Denn" coordina y mantiene el verbo en posición 2; "weil" introduce una subordinada con verbo final.
  Type: flashcard
- Q: ¿Cuándo se usa "sondern"?
  A: Para corregir o sustituir un elemento previamente negado.
  Type: flashcard
- Q: ¿Cuál es el plural de "der Zentimeter"?
  A: die Zentimeter
  Type: flashcard
- Q: Traduce: No solo estudio alemán, sino también francés.
  A: Ich lerne nicht nur Deutsch, sondern auch Französisch.
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 48 — Todo sobre el Konjunktiv I

*Nivel orientativo:* **B1** · *Alcance A1 de esta app:* 📚

---
class_id: 048
title: "Todo sobre el Konjunktiv I"
level: "C1"
topics: ["Gramática", "Konjunktiv I", "Discurso indirecto", "Tiempos verbales", "Voz pasiva"]
target_exam: "Telc / Goethe C1"
---

### Todo sobre el Konjunktiv I

#### 1. 🎯 Resumen / Objetivos de la Lección
- Comprender la función del Konjunktiv I en el discurso indirecto.
- Formar el paradigma completo de verbos regulares, **sein**, **haben** y **werden**.
- Distinguir las formas inequívocas del Konjunktiv I de las que coinciden con el Indikativ.
- Aplicar formas sustitutivas del Konjunktiv II cuando sea necesario.
- Reproducir declaraciones en presente, pasado y futuro.
- Formar el Vorgangspassiv y el Zustandspassiv en Konjunktiv I.

#### 2. 📚 Vocabulario Clave (Wortschatz)

| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Konjunktiv I | el subjuntivo I | Sustantivo masculino | Modo verbal usado especialmente en discurso indirecto. |
| die indirekte Rede | el discurso indirecto | Sustantivo femenino | Reproduce palabras ajenas. |
| die direkte Rede | el discurso directo | Sustantivo femenino | Reproduce las palabras literalmente. |
| die Aussage, -n | la declaración; afirmación | Sustantivo femenino | **eine Aussage wiedergeben** |
| die Behauptung, -en | la afirmación; aseveración | Sustantivo femenino | El hablante no confirma necesariamente su veracidad. |
| die Distanzierung, -en | el distanciamiento | Sustantivo femenino | Efecto pragmático posible del Konjunktiv I. |
| die Ersatzform, -en | la forma sustitutiva | Sustantivo femenino | Konjunktiv II cuando K I coincide con Indikativ. |
| die Quelle, -n | la fuente | Sustantivo femenino | **laut einer Quelle** |
| die Presse | la prensa | Sustantivo femenino, sin plural habitual | Ámbito frecuente del discurso indirecto. |
| die Nachricht, -en | la noticia; mensaje | Sustantivo femenino | **in den Nachrichten** |
| das Geburtstagskind, -er | la persona que cumple años | Sustantivo neutro | **Hoch lebe das Geburtstagskind!** |
| der Besitzer, - | el propietario | Sustantivo masculino | **der Besitzer des Hauses** |
| renovieren | renovar | Verbo regular en -ieren, Akkusativ | **Er renoviere das Haus.** |
| berichten | informar; relatar | Verbo regular inseparable | **Die Zeitung berichtet, ...** |
| behaupten | afirmar; sostener | Verbo regular, dass-Satz | **Er behauptet, er sei unschuldig.** |
| erklären | explicar; declarar | Verbo regular inseparable | **Sie erklärte, sie habe keine Zeit.** |
| mitteilen | comunicar | Verbo regular separable, Dativ + Akkusativ | **jemandem etwas mitteilen** |
| zufolge | según | Posposición / preposición | **dem Bericht zufolge** |
| angeblich | supuestamente | Adverbio | Marca información no confirmada. |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1. Función principal

El Konjunktiv I reproduce una declaración ajena sin presentarla automáticamente como un hecho confirmado.

**Directo:** Der Schauspieler sagte: „Ich habe mich noch nie so jung gefühlt.“  
**Indirecto:** Der Schauspieler sagte, er habe sich noch nie so jung gefühlt.

Es habitual en:

- prensa y noticias;
- informes y textos académicos;
- actas y lenguaje administrativo;
- reproducción formal de declaraciones;
- algunas fórmulas fijas.

En la conversación cotidiana se usa con frecuencia el Indikativ, normalmente introducido por **dass**:

**Er sagt, dass er keine Zeit hat.**

##### 3.2. Formación regular

Se toma la raíz del infinitivo y se añaden las terminaciones:

| Persona | Terminación | machen | gehen |
| :--- | :--- | :--- | :--- |
| ich | -e | mache | gehe |
| du | -est | machest | gehest |
| er / sie / es | -e | mache | gehe |
| wir | -en | machen | gehen |
| ihr | -et | machet | gehet |
| sie / Sie | -en | machen | gehen |

- **Estructura / Fórmula:** `raíz verbal + e / est / e / en / et / en`
- Todos los verbos pueden formar Konjunktiv I; **sein** presenta un paradigma especialmente irregular.
- En el discurso indirecto predomina la 3.ª persona.

##### 3.3. Paradigmas de sein, haben y werden

| Persona | sein | haben | werden |
| :--- | :--- | :--- | :--- |
| ich | sei | habe | werde |
| du | seiest / seist | habest | werdest |
| er / sie / es | sei | habe | werde |
| wir | seien | haben | werden |
| ihr | seiet | habet | werdet |
| sie / Sie | seien | haben | werden |

Ejemplo:

**Er sagte, sie seien im Kino.**  
*Dijo que estaban en el cine.*

##### 3.4. Coincidencia con el Indikativ y formas sustitutivas

Algunas formas del Konjunktiv I coinciden gráficamente con el presente de Indikativ, especialmente:

- **ich**;
- **wir**;
- **sie / Sie**;
- algunos verbos en **ihr**.

Si la forma no permite reconocer el discurso indirecto, se usa normalmente el Konjunktiv II:

**Directo:** Sie sagen: „Wir gehen joggen.“  
**K I ambiguo:** Sie sagen, sie gehen joggen.  
**Forma marcada:** Sie sagen, sie gingen joggen.

Si el Konjunktiv II también resulta ambiguo o poco natural, puede emplearse **würde + infinitivo**, siempre que no distorsione el valor temporal o modal:

**Sie sagten, sie würden später kommen.**

Jerarquía habitual en discurso indirecto formal:

1. Konjunktiv I inequívoco;
2. Konjunktiv II como forma sustitutiva;
3. **würde + infinitivo** cuando sea necesario.

##### 3.5. Cambio de perspectiva

Al pasar del discurso directo al indirecto se adaptan:

- pronombres personales y posesivos;
- referencias de tiempo y lugar;
- persona verbal.

**Directo:** Maria sagt: „Ich komme morgen zu dir.“  
**Indirecto:** Maria sagt, sie komme am nächsten Tag zu mir.

El cambio de **morgen** a **am nächsten Tag** depende del momento desde el que se informa.

##### 3.6. Orden de la oración

###### Sin dass

La declaración indirecta puede conservar el orden de una Hauptsatz:

**Er sagt, er habe keine Zeit.**

###### Con dass

También puede introducirse mediante **dass**; el verbo va entonces al final:

**Er sagt, dass er keine Zeit habe.**

El Konjunktiv I marca la reproducción ajena; **dass** por sí solo no exige este modo.

##### 3.7. Relaciones temporales

El sistema del Konjunktiv I distingue principalmente simultaneidad, anterioridad y posterioridad.

| Relación / forma | Construcción | Ejemplo |
| :--- | :--- | :--- |
| Simultaneidad - Präsens | K I simple | **Er sage / gehe.** |
| Anterioridad - Perfekt | habe / sei + Partizip II | **Er habe gesagt. / Er sei gegangen.** |
| Posterioridad - Futur I | werde + infinitivo | **Er werde gehen.** |
| Futur II | werde + Partizip II + haben/sein | **Er werde gegangen sein. / Er werde gesagt haben.** |

No existe un Präteritum propio del Konjunktiv I para el discurso indirecto. La anterioridad se expresa normalmente mediante el Perfekt de Konjunktiv I.

##### 3.8. Verbos modales

| Directo | Indirecto |
| :--- | :--- |
| **„Ich muss arbeiten.“** | **Er sagt, er müsse arbeiten.** |
| **„Ich kann kommen.“** | **Er sagt, er könne kommen.** |
| **„Ich darf gehen.“** | **Er sagt, er dürfe gehen.** |
| **„Ich will helfen.“** | **Er sagt, er wolle helfen.** |
| **„Ich soll warten.“** | **Er sagt, er solle warten.** |
| **„Ich mag das.“** | **Er sagt, er möge das.** |

##### 3.9. Konjunktiv I en la voz activa

| Tiempo | gehen | sagen |
| :--- | :--- | :--- |
| Präsens | er gehe | er sage |
| Perfekt | er sei gegangen | er habe gesagt |
| Futur I | er werde gehen | er werde sagen |
| Futur II | er werde gegangen sein | er werde gesagt haben |

##### 3.10. Vorgangspassiv en Konjunktiv I

El Vorgangspassiv se forma con **werden + Partizip II**.

| Tiempo | Forma |
| :--- | :--- |
| Präsens | **Das Haus werde renoviert.** |
| Perfekt | **Das Haus sei renoviert worden.** |
| Futur I | **Das Haus werde renoviert werden.** |
| Futur II | **Das Haus werde renoviert worden sein.** |

##### 3.11. Zustandspassiv en Konjunktiv I

El Zustandspassiv se forma con **sein + Partizip II**.

| Tiempo | Forma |
| :--- | :--- |
| Präsens | **Das Haus sei renoviert.** |
| Perfekt | **Das Haus sei renoviert gewesen.** |
| Futur I | **Das Haus werde renoviert sein.** |
| Futur II | **Das Haus werde renoviert gewesen sein.** |

##### 3.12. Fórmulas fijas

El Konjunktiv I aparece en expresiones optativas o solemnes:

- **Hoch lebe das Geburtstagskind!** - ¡Viva la persona que cumple años!
- **Es lebe die Freiheit!** - ¡Viva la libertad!
- **Gott sei Dank!** - ¡Gracias a Dios!
- **Wie dem auch sei.** - Sea como sea.
- **Man nehme ...** - Tómese... / Se toma... (recetas e instrucciones tradicionales).

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Der Sprecher erklärte, die Lage sei unter Kontrolle.**  
> *Traducción:* El portavoz declaró que la situación estaba bajo control.  
> *Uso:* Reproducir formalmente una declaración.

> **Die Zeitung berichtet, der Minister habe seinen Rücktritt angekündigt.**  
> *Traducción:* El periódico informa de que el ministro anunció su dimisión.  
> *Uso:* Lenguaje periodístico con anterioridad.

> **Sie sagte, sie werde am nächsten Tag zurückkommen.**  
> *Traducción:* Dijo que regresaría al día siguiente.  
> *Uso:* Reproducir una acción futura desde un punto pasado.

> **Wie dem auch sei, wir müssen eine Lösung finden.**  
> *Traducción:* Sea como sea, tenemos que encontrar una solución.  
> *Uso:* Cerrar una discusión secundaria y volver al asunto principal.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** el Konjunktiv I no significa que la declaración sea falsa; indica que se reproduce información ajena sin asumirla expresamente.
- ⚠️ **Atención:** todos los verbos forman Konjunktiv I; **sein** no es el único.
- ⚠️ **Atención:** si K I coincide con Indikativ, utiliza K II para mantener inequívoco el discurso indirecto.
- ⚠️ **Atención:** **er habe gesagt** expresa anterioridad; no existe un Präteritum propio de K I.
- ⚠️ **Atención:** en el Perfekt del Vorgangspassiv se usa **worden**, no **geworden**.
- ⚠️ **Atención:** **sie seien im Kino** significa “ellos/ellas estaban en el cine”.
- ⚠️ **Atención:** el PDF enumera Präsens, Perfekt, Futur I y Futur II; son cuatro formas, aunque funcionalmente se organicen por relaciones temporales.
- Las formas **sei, habe, werde** suelen recibir énfasis claro en lectura informativa para marcar la distancia respecto de la fuente.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: Er sagt: „Ich bin müde.“ → Er sagt, er ____ müde.
  A: sei
  Type: fill-in-the-blank
- Q: Sie sagt: „Ich habe keine Zeit.“ → Sie sagt, sie ____ keine Zeit.
  A: habe
  Type: fill-in-the-blank
- Q: Er sagt: „Ich muss arbeiten.“ → Er sagt, er ____ arbeiten.
  A: müsse
  Type: fill-in-the-blank
- Q: Directo: „Ich bin nach Berlin gefahren.“ → Indirecto
  A: Er sagt, er sei nach Berlin gefahren.
  Type: flashcard
- Q: Directo: „Ich werde morgen kommen.“ → Indirecto
  A: Er sagt, er werde am nächsten Tag kommen.
  Type: flashcard
- Q: Forma el Präsens de Konjunktiv I de "gehen" para er.
  A: er gehe
  Type: flashcard
- Q: Forma el Perfekt de Konjunktiv I de "sagen" para er.
  A: er habe gesagt
  Type: flashcard
- Q: Forma el Präsens de Vorgangspassiv: Das Haus / renovieren.
  A: Das Haus werde renoviert.
  Type: flashcard
- Q: Forma el Perfekt de Vorgangspassiv: Das Haus / renovieren.
  A: Das Haus sei renoviert worden.
  Type: flashcard
- Q: ¿Qué se usa normalmente cuando una forma de K I coincide con el Indikativ?
  A: El Konjunktiv II como forma sustitutiva.
  Type: flashcard
- Q: ¿Qué función pragmática tiene el Konjunktiv I periodístico?
  A: Reproducir una declaración ajena manteniendo distancia respecto de su veracidad.
  Type: flashcard
- Q: Corrige: Die Zeitung berichtet, der Minister hat zurückgetreten. (discurso indirecto formal)
  A: Die Zeitung berichtet, der Minister sei zurückgetreten.
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 49 — Todo sobre el Konjunktiv II

*Nivel orientativo:* **A2** · *Alcance A1 de esta app:* 📚

> Formas fijas möchte/könnte/würde sí son A1 (Parte 2); el Konjunktiv II productivo es A2.

---
class_id: 049
title: "Todo sobre el Konjunktiv II"
level: "C1"
topics: ["Gramática", "Konjunktiv II", "Irrealidad", "Cortesía", "Verbos modales", "Tiempos verbales", "Voz pasiva"]
target_exam: "Telc / Goethe C1"
---

### Todo sobre el Konjunktiv II

#### 1. 🎯 Resumen / Objetivos de la Lección
- Expresar deseos, hipótesis, condiciones irreales, consejos y cortesía.
- Formar el Konjunktiv II simple y la construcción **würde + infinitivo**.
- Conjugar auxiliares, modales y verbos de uso frecuente.
- Distinguir irrealidad presente/futura de irrealidad pasada.
- Formar el pasado con verbos modales y Ersatzinfinitiv.
- Aplicar el Konjunktiv II al Vorgangspassiv y al Zustandspassiv.

#### 2. 📚 Vocabulario Clave (Wortschatz)

| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Wunsch, Wünsche | el deseo | Sustantivo masculino | **einen Wunsch äußern** |
| die Bedingung, -en | la condición | Sustantivo femenino | **unter einer Bedingung** |
| die Irrealität | la irrealidad | Sustantivo femenino, sin plural habitual | Situación contraria a los hechos. |
| die Höflichkeit | la cortesía | Sustantivo femenino, sin plural habitual | **eine höfliche Bitte** |
| der Ratschlag, Ratschläge | el consejo | Sustantivo masculino | **einen Ratschlag geben** |
| die Vermutung, -en | la suposición | Sustantivo femenino | Puede expresarse con formas modales. |
| der Ersatzinfinitiv, -e | el infinitivo sustitutivo | Sustantivo masculino | Aparece con modales en tiempos compuestos. |
| der Vorgang, Vorgänge | el proceso | Sustantivo masculino | Base del Vorgangspassiv. |
| der Zustand, Zustände | el estado | Sustantivo masculino | Base del Zustandspassiv. |
| die Wahrheit, -en | la verdad | Sustantivo femenino | **die Wahrheit sagen** |
| der Zahnschmerz, -en | el dolor de muelas | Sustantivo masculino | Frecuente en plural: **Zahnschmerzen haben**. |
| sich wünschen | desear | Verbo regular reflexivo, Akkusativ / dass-Satz | **Ich wünschte, ...** |
| bereuen | lamentar; arrepentirse de | Verbo regular, Akkusativ / dass-Satz | Irreales de pasado. |
| sich vorstellen | imaginarse | Verbo regular separable y reflexivo | **Stell dir vor, ...** |
| lassen | dejar; hacer que | Verbo irregular, Akkusativ + infinitivo | **etwas reparieren lassen** |
| gewinnen | ganar | Verbo irregular, Akkusativ | K II: **gewänne**, a menudo **würde gewinnen**. |
| geschehen | suceder | Verbo irregular | **Was wäre geschehen, wenn ...?** |
| an deiner Stelle | en tu lugar | Expresión | **An deiner Stelle würde ich ...** |
| wenn ich du wäre | si yo fuera tú | Expresión | Introduce un consejo. |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### 3.1. Funciones principales

El Konjunktiv II expresa:

- deseos: **Ich wünschte, ich hätte Ferien.**
- situaciones hipotéticas: **Was würdest du tun, wenn ...?**
- condiciones irreales: **Wenn ich Zeit hätte, würde ich kommen.**
- deseos contrarios a la realidad: **Wäre ich doch im Urlaub!**
- cortesía: **Könnten Sie mir helfen?**
- consejos: **Du solltest mehr schlafen.**
- discurso indirecto cuando el Konjunktiv I no es inequívoco.

##### 3.2. Formación del Konjunktiv II simple

La forma sintética se basa normalmente en el Präteritum. Los verbos fuertes suelen añadir Umlaut cuando es posible y reciben las terminaciones:

| Persona | Terminación |
| :--- | :--- |
| ich / er / sie / es | -e |
| du | -est |
| wir / sie / Sie | -en |
| ihr | -et |

Ejemplos:

| Infinitivo | Präteritum | Konjunktiv II |
| :--- | :--- | :--- |
| geben | gab | gäbe |
| gehen | ging | ginge |
| finden | fand | fände |
| kommen | kam | käme |
| wissen | wusste | wüsste |
| brauchen | brauchte | bräuchte |

Con muchos verbos débiles, la forma sintética coincide con el Präteritum y se prefiere **würde + infinitivo**.

##### 3.3. Auxiliares

| Persona | sein | haben | werden |
| :--- | :--- | :--- | :--- |
| ich / er / sie / es | wäre | hätte | würde |
| du | wärst / wärest | hättest | würdest |
| wir / sie / Sie | wären | hätten | würden |
| ihr | wärt / wäret | hättet | würdet |

Ejemplos:

- **Ich wäre jetzt lieber im Urlaub.**
- **Ich hätte gern meinen eigenen Laden.**
- **Ich würde nicht so spät schlafen gehen.**

##### 3.4. Verbos modales

| Infinitivo | K II, 3.ª persona singular | Uso frecuente |
| :--- | :--- | :--- |
| müssen | müsste | necesidad hipotética |
| können | könnte | posibilidad; petición |
| sollen | sollte | consejo; expectativa |
| dürfen | dürfte | permiso cortés; probabilidad |
| wollen | wollte | voluntad hipotética / discurso indirecto |
| mögen | möchte | deseo cortés |

> **möchte** es históricamente el Konjunktiv II de **mögen**, pero funciona en el alemán actual como una forma de deseo cortés.

##### 3.5. Würde + infinitivo

- **Estructura / Fórmula:** `würde conjugado + complementos + infinitivo al final`
- **Ich würde gerne nach Deutschland reisen.**
- **Wenn ich du wäre, würde ich das nicht machen.**

Se usa especialmente:

- con verbos débiles cuya forma sintética coincide con el Präteritum;
- con formas sintéticas raras o muy literarias;
- para facilitar la comprensión.

Se prefieren normalmente las formas simples de:

- **sein, haben, werden**;
- verbos modales;
- verbos frecuentes como **käme, ginge, fände, gäbe, wüsste**.

Evita la duplicación innecesaria: **ich würde haben** suele sustituirse por **ich hätte**.

##### 3.6. Condiciones irreales de presente o futuro

| Orden | Estructura |
| :--- | :--- |
| Hauptsatz + Nebensatz | **Ich würde reisen, wenn ich Geld hätte.** |
| Nebensatz + Hauptsatz | **Wenn ich Geld hätte, würde ich reisen.** |

- En la subordinada con **wenn**, el verbo va al final.
- Si la subordinada aparece primero, la principal comienza con el verbo conjugado.
- Ambas partes emplean Konjunktiv II porque la condición se presenta como irreal o improbable.

##### 3.7. Condición sin wenn

La subordinada condicional puede omitir **wenn** y comenzar con el verbo:

**Hätte ich mehr Zeit, würde ich öfter lesen.**  
= **Wenn ich mehr Zeit hätte, würde ich öfter lesen.**

Este patrón es frecuente en registros formales y escritos.

##### 3.8. Deseos irreales

- **Ich wünschte, ich hätte Ferien.**
- **Hätte ich doch Ferien!**
- **Wäre ich nur im Urlaub!**
- **Wenn ich doch mehr Zeit hätte!**

Las partículas **doch, nur, bloß** intensifican el deseo.

##### 3.9. Cortesía, propuestas y consejos

| Función | Ejemplo |
| :--- | :--- |
| Petición | **Könnten Sie mir bitte helfen?** |
| Pregunta cortés | **Wären Sie so freundlich, die Tür zu schließen?** |
| Permiso | **Dürfte ich hier sitzen?** |
| Deseo | **Ich hätte gern einen Kaffee.** |
| Propuesta | **Wir könnten ins Kino gehen.** |
| Consejo | **Du solltest nicht lügen.** |
| Consejo personal | **An deiner Stelle würde ich früher gehen.** |

##### 3.10. Irrealidad pasada

El pasado del Konjunktiv II se forma con:

- **hätte + Partizip II** para verbos con **haben**;
- **wäre + Partizip II** para verbos con **sein**.

| Indikativ | Irreal de pasado |
| :--- | :--- |
| **Eva hat die Schuhe gekauft.** | **Ich hätte die Schuhe nicht gekauft.** |
| **Susanne ist allein gefahren.** | **Ich wäre nicht allein gefahren.** |
| **Er ist spät gekommen.** | **Ich wäre nicht so spät gekommen.** |

Condicional completo:

**Wenn ich die richtigen Zahlen gewählt hätte, hätte ich im Lotto gewonnen.**

La acción ya no puede modificarse; se formula una condición contraria al pasado real.

##### 3.11. Pasado con verbos modales

Con modal se usa el Ersatzinfinitiv:

- **Estructura / Fórmula:** `hätte + complementos + infinitivo principal + infinitivo modal`
- **Ich hätte gestern arbeiten müssen.**
- **Du hättest früher kommen können.**
- **Ich hätte dir die Wahrheit sagen sollen.**

En una subordinada estándar:

**..., weil ich gestern hätte arbeiten müssen.**

El auxiliar conjugado aparece antes del grupo de infinitivos.

##### 3.12. Futuro y posterioridad

El Konjunktiv II de presente puede referirse al futuro mediante un complemento temporal:

**Ich würde nächstes Jahr gern ein Auto kaufen.**

Para una acción hipotética anterior a un punto futuro, son posibles construcciones complejas con infinitivo perfecto:

**Bis dahin würde er die Arbeit abgeschlossen haben.**

Sin embargo, para un condicional pasado ordinario se prefiere:

**Er hätte die Arbeit abgeschlossen.**

No debe enseñarse **würde + Partizip II + haben/sein** como sustituto general de **hätte/wäre + Partizip II**.

##### 3.13. Konjunktiv II en discurso indirecto

Se utiliza como forma sustitutiva cuando el Konjunktiv I coincide con el Indikativ:

**Direkt:** Sie sagen: „Wir haben keine Zeit.“  
**Indirekt:** Sie sagen, sie hätten keine Zeit.

También puede indicar distancia o duda más marcada, pero el contexto decide la interpretación.

##### 3.14. Vorgangspassiv

###### Presente / futuro contextual

- **würde + Partizip II**
- **Der Test würde bald korrigiert.**

###### Pasado irreal

- **wäre + Partizip II + worden**
- **Das Auto wäre gestern repariert worden.**

###### Futuro explícito, poco frecuente

- **würde + Partizip II + werden**
- **Der Test würde morgen korrigiert werden.**

###### Futuro perfecto, muy poco frecuente

- **würde + Partizip II + worden sein**
- **Der Test würde bis dahin korrigiert worden sein.**

Las formas futuras largas son correctas en contextos específicos, pero suelen evitarse mediante una formulación más clara.

##### 3.15. Zustandspassiv

###### Presente

- **wäre + Partizip II**
- **Das Buch wäre gelesen.**
- **Die Tür wäre geschlossen.**

###### Pasado

- **wäre + Partizip II + gewesen**
- **Das Auto wäre repariert gewesen.**
- **Die Bücher wären gefunden gewesen.**

###### Futuro contextual

- **würde + Partizip II + sein**
- **Die Tür würde später geschlossen sein.**

###### Futuro perfecto, muy poco frecuente

- **würde + Partizip II + gewesen sein**
- **Die Tür würde bis dahin geschlossen gewesen sein.**

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Wenn ich mehr Zeit hätte, würde ich jeden Tag Deutsch lernen.**  
> *Traducción:* Si tuviera más tiempo, estudiaría alemán todos los días.  
> *Uso:* Condición irreal de presente.

> **Hätte ich das früher gewusst, hätte ich anders gehandelt.**  
> *Traducción:* Si lo hubiera sabido antes, habría actuado de otra manera.  
> *Uso:* Irrealidad y arrepentimiento en el pasado.

> **Könnten Sie mir bitte sagen, wo der Bahnhof ist?**  
> *Traducción:* ¿Podría decirme dónde está la estación?  
> *Uso:* Petición cortés.

> **An deiner Stelle würde ich mit dem Chef sprechen.**  
> *Traducción:* En tu lugar hablaría con el jefe.  
> *Uso:* Dar un consejo.

> **Ich hätte gern einen Kaffee.**  
> *Traducción:* Quisiera un café.  
> *Uso:* Pedir algo cortésmente.

#### 5. 💡 Notas de Pronunciación o Errores Comunes
- ⚠️ **Atención:** no traduzcas mecánicamente cada subjuntivo español con Konjunktiv II; el sistema alemán tiene usos propios.
- ⚠️ **Atención:** usa **hätte/wäre + Partizip II** para la irrealidad pasada, no normalmente **würde + Partizip II + haben/sein**.
- ⚠️ **Atención:** con modales en pasado se emplean dos infinitivos: **hätte arbeiten müssen**.
- ⚠️ **Atención:** en una subordinada con doble infinitivo: **weil er hätte kommen können**.
- ⚠️ **Atención:** se escribe **gegessen**, no *gegesen*.
- ⚠️ **Atención:** **Ich wusste nicht, dass du kommen würdest** significa “No sabía que vendrías”; **kämest** necesita un contexto propiamente hipotético o un registro literario.
- ⚠️ **Atención:** no combines **würde** con **wäre, hätte** o un modal cuando la forma simple ya es natural.
- Las formas con Umlaut —**wäre, hätte, könnte, müsste, dürfte**— deben pronunciarse distinguiéndolas claramente de sus formas de pasado.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)
<!-- DATA_QUIZ_START -->
- Q: Wenn ich Zeit ____, ____ ich kommen.
  A: hätte → würde
  Type: fill-in-the-blank
- Q: Ich ____ gern einen Kaffee. (haben)
  A: hätte
  Type: fill-in-the-blank
- Q: ____ Sie mir bitte helfen? (können)
  A: Könnten
  Type: fill-in-the-blank
- Q: Du ____ mehr schlafen. (sollen)
  A: solltest
  Type: fill-in-the-blank
- Q: Irreal de pasado: Ich kaufe das Auto nicht.
  A: Ich hätte das Auto nicht gekauft.
  Type: flashcard
- Q: Completa: Wenn ich früher losgefahren ____, ____ ich pünktlich angekommen.
  A: wäre → wäre
  Type: fill-in-the-blank
- Q: Forma el pasado con modal: Ich muss arbeiten. (irreal)
  A: Ich hätte arbeiten müssen.
  Type: flashcard
- Q: Corrige: Wenn ich Geld würde haben, würde ich reisen.
  A: Wenn ich Geld hätte, würde ich reisen.
  Type: flashcard
- Q: Corrige: Ich würde das Haus gekauft haben. (condicional pasado)
  A: Ich hätte das Haus gekauft.
  Type: flashcard
- Q: Forma el Vorgangspassiv pasado irreal: Das Auto / reparieren.
  A: Das Auto wäre repariert worden.
  Type: flashcard
- Q: Forma el Zustandspassiv presente irreal: Die Tür / schließen.
  A: Die Tür wäre geschlossen.
  Type: flashcard
- Q: ¿Qué diferencia temporal hay entre "würde kaufen" y "hätte gekauft"?
  A: "Würde kaufen" expresa una acción hipotética presente o futura; "hätte gekauft", una acción irreal ya pasada.
  Type: flashcard
<!-- DATA_QUIZ_END -->


---


### Unidad 50 — Las oraciones relativas

*Nivel orientativo:* **B1** · *Alcance A1 de esta app:* 📚

---
class_id: 050
title: "Las oraciones relativas"
level: "B2"
topics: ["Gramática", "Oraciones relativas", "Pronombres relativos", "Casos", "Preposiciones"]
target_exam: "Telc / Goethe B2"
---

### Las oraciones relativas

#### 1. 🎯 Resumen / Objetivos de la Lección

- Formar oraciones relativas para describir con precisión a una persona, cosa o situación.
- Seleccionar el pronombre relativo según el género y número del antecedente y según su función dentro de la oración subordinada.
- Usar pronombres relativos en nominativo, acusativo, dativo y genitivo.
- Construir relativas con preposición y distinguir el uso de `der/die/das`, `was`, `wo` y los adverbios pronominales.
- Aplicar la posición final del verbo conjugado en las oraciones relativas.

#### 2. 📚 Vocabulario Clave (Wortschatz)

| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Relativsatz, Relativsätze | la oración relativa | Sustantivo | Der Relativsatz beschreibt ein Nomen genauer. |
| das Bezugswort, Bezugswörter | el antecedente / elemento de referencia | Sustantivo | Das Bezugswort bestimmt Genus und Numerus. |
| das Relativpronomen, Relativpronomen | el pronombre relativo | Sustantivo | `der`, `die`, `das`, `den`, `dem`, `dessen`… |
| der Fall, Fälle | el caso gramatical | Sustantivo | Nominativ, Akkusativ, Dativ oder Genitiv |
| die Präposition, Präpositionen | la preposición | Sustantivo | mit, für, auf, von… |
| der Bestseller, - | el superventas | Sustantivo | ein Buch, das ein Bestseller geworden ist |
| der Flohmarkt, Flohmärkte | el mercadillo | Sustantivo | etwas auf dem Flohmarkt kaufen |
| der Umzug, Umzüge | la mudanza | Sustantivo | jemandem beim Umzug helfen |
| die Friseurin, Friseurinnen | la peluquera | Sustantivo | die Friseurin, bei der ich mir die Haare schneiden lasse |
| der Salon, Salons | el salón / establecimiento | Sustantivo | Sie hat einen eigenen Salon. |
| der Zwilling, -e | el gemelo | Sustantivo | Die Kinder sind Zwillinge. |
| die Klausur, Klausuren | el examen escrito | Sustantivo | eine Klausur bestehen |
| der Steuerberater, - | el asesor fiscal | Sustantivo | mit einem Steuerberater zusammenarbeiten |
| die Steuerberaterin, Steuerberaterinnen | la asesora fiscal | Sustantivo | Sie berät ihre Mandanten. |
| die Nachhilfe, — | las clases de refuerzo | Sustantivo | jemandem Nachhilfe geben |
| das Seminar, Seminare | el seminario | Sustantivo | Das Seminar findet sonntags statt. |
| jemanden begrüßen | saludar a alguien | Verbo regular, Akkusativ | Der Mann, der uns begrüßt hat… |
| jemanden kennenlernen | conocer a alguien | Verbo regular separable, Akkusativ | die Leute, die ich kennengelernt habe |
| jemandem helfen | ayudar a alguien | Verbo irregular, Dativ | der Nachbar, dem ich geholfen habe |
| jemandem etwas schenken | regalar algo a alguien | Verbo regular, Dativ + Akkusativ | das Mädchen, dem du eine Rose geschenkt hast |
| mit jemandem zusammenarbeiten | colaborar con alguien | Verbo regular separable, régimen con `mit` + Dativ | der Berater, mit dem ich zusammenarbeite |
| jemandem von etwas erzählen | contarle a alguien algo | Verbo regular, Dativ + `von` + Dativ | die Seminare, von denen sie erzählt hat |
| auf jemanden stolz sein | estar orgulloso de alguien | Expresión, `auf` + Akkusativ | der Schüler, auf den du stolz bist |
| für etwas dankbar sein | estar agradecido por algo | Expresión, `für` + Akkusativ | wofür ich dir dankbar bin |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

- **Regla / Concepto:** Una oración relativa aporta información adicional sobre un antecedente. Se separa mediante coma y el verbo conjugado ocupa la posición final.
- **Estructura / Fórmula:** `Oración principal, + pronombre relativo + ... + verbo conjugado.`
- **Ejemplo:** `Das ist mein Freund, der in München studiert.`  
  Este es mi amigo, que estudia en Múnich.

##### Elección del pronombre relativo

La forma depende de dos factores diferentes:

1. El **género y número** proceden del antecedente.
2. El **caso** depende de la función del pronombre dentro de la oración relativa.

> `Ich kenne den Mann, der dort arbeitet.`  
> En la oración principal, `den Mann` está en acusativo; dentro de la relativa, `der` es el sujeto y está en nominativo.

| Caso | Masculino | Femenino | Neutro | Plural |
| :--- | :--- | :--- | :--- | :--- |
| Nominativo | der | die | das | die |
| Acusativo | den | die | das | die |
| Dativo | dem | der | dem | denen |
| Genitivo | dessen | deren | dessen | deren |

##### Nominativo

- Se emplea cuando el pronombre relativo es el **sujeto** de la subordinada.
- **Pregunta de control:** ¿Quién realiza la acción?

| Antecedente | Ejemplo | Traducción |
| :--- | :--- | :--- |
| der Mann | `Der Mann, der uns begrüßt hat, ist mein Chef.` | El hombre que nos ha saludado es mi jefe. |
| die Frau | `Die Frau, die mit mir arbeitet, heißt Beate Meier.` | La mujer que trabaja conmigo se llama Beate Meier. |
| das Museum | `Das Museum, das die deutsche Geschichte zeigt, ist sehr berühmt.` | El museo que muestra la historia alemana es muy famoso. |
| die Kinder | `Die Kinder, die uns gegenüber wohnen, sind Zwillinge.` | Los niños que viven enfrente de nosotros son gemelos. |

##### Acusativo

- Se emplea cuando el pronombre relativo es el **objeto directo** o cuando una preposición exige acusativo.
- El hecho de que aparezca otro sujeto no basta para determinar el caso: hay que comprobar la función del relativo.

| Antecedente | Ejemplo | Traducción |
| :--- | :--- | :--- |
| der Toaster | `Der Toaster, den du auf dem Flohmarkt gekauft hast, funktioniert nicht.` | La tostadora que compraste en el mercadillo no funciona. |
| die Tasche | `Die Tasche, die du mir aus dem Urlaub mitgebracht hast, gefällt mir.` | Me gusta el bolso que me trajiste de las vacaciones. |
| das T-Shirt | `Das T-Shirt, das ich im Laden gesehen habe, kostet 20 €.` | La camiseta que vi en la tienda cuesta 20 €. |
| die Leute | `Die Leute, die ich im Kurs kennengelernt habe, sind nett.` | La gente que conocí en el curso es amable. |

##### Dativo

- Se emplea cuando el verbo exige dativo o después de una preposición que rige dativo.
- En plural, la forma especial es `denen`.

| Motivo | Ejemplo | Traducción |
| :--- | :--- | :--- |
| `helfen` + Dativ | `Mein Nachbar, dem ich beim Umzug geholfen habe, zieht nach Berlin.` | Mi vecino, a quien ayudé con la mudanza, se muda a Berlín. |
| `bei` + Dativ | `Die Friseurin, bei der ich mir die Haare schneiden lasse, hat einen Salon.` | La peluquera con quien me corto el pelo tiene un salón. |
| `mit` + Dativ | `Das Fahrrad, mit dem ich früher gefahren bin, habe ich meinem Sohn geschenkt.` | Le regalé a mi hijo la bicicleta con la que iba antes. |
| `mit` + Dativ plural | `Die Studenten, mit denen ich gesprochen habe, waren zufrieden.` | Los estudiantes con quienes hablé estaban satisfechos. |

##### Preposición + pronombre relativo

- La preposición aparece inmediatamente delante del relativo y determina su caso.

> `Dein Schüler, auf den du sehr stolz bist, hat alles bestanden.`  
> Tu alumno, de quien estás muy orgulloso, lo ha aprobado todo.

> `Die Klausur, für die ich sehr viel gelernt habe, war einfach.`  
> El examen para el que estudié mucho fue fácil.

##### Genitivo: `dessen` y `deren`

- Expresa posesión o pertenencia.
- `dessen` se refiere a un antecedente masculino o neutro; `deren`, a uno femenino o plural.
- Después de `dessen/deren` no se añade otro artículo. La terminación se elige por el antecedente, no por el objeto poseído.

| Antecedente | Ejemplo | Traducción |
| :--- | :--- | :--- |
| masculino | `Der Junge, dessen Vater ich gut kenne, ist sechs Jahre alt.` | El niño, cuyo padre conozco bien, tiene seis años. |
| femenino | `Frau Meier, deren Tochter in meine Klasse geht, ist Lehrerin.` | La señora Meier, cuya hija va a mi clase, es profesora. |
| neutro | `Das Mädchen, dessen Eltern geschieden sind, lebt bei seinem Vater.` | La chica cuyos padres están divorciados vive con su padre. |
| plural | `Die Nachbarn, deren Kinder laut sind, haben sich nie entschuldigt.` | Los vecinos, cuyos hijos son ruidosos, nunca se han disculpado. |

##### `was`, `wo` y adverbios pronominales

- `was` no sustituye normalmente a `der/die/das` después de un sustantivo concreto.
- Se usa, entre otros contextos, después de `alles`, `etwas`, `nichts`, `manches`, de superlativos sustantivados y para referirse a toda una oración anterior.

> `Paul und Sabine haben spontan geheiratet, was mich überrascht hat.`  
> Paul y Sabine se casaron espontáneamente, lo cual me sorprendió.

- `wo` puede retomar un lugar: `Das ist das Haus, wo ich früher gewohnt habe.` En lengua formal suele preferirse `Das ist das Haus, in dem ich früher gewohnt habe`.
- Los adverbios pronominales como `worüber` y `wofür` se refieren normalmente a cosas, ideas o situaciones, no a personas.

> `Das Thema, worüber wir gesprochen haben, ist kompliziert.`  
> El tema del que hablamos es complicado.

> `Du hast mir sehr geholfen, wofür ich dir dankbar bin.`  
> Me has ayudado mucho, por lo cual te estoy agradecido.

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Das ist der Mann, der uns begrüßt hat.**  
> *Traducción:* Este es el hombre que nos saludó.  
> *Uso:* Identificar a una persona mediante una acción.

> **Das ist der Kollege, mit dem ich zusammenarbeite.**  
> *Traducción:* Este es el compañero con quien trabajo.  
> *Uso:* Describir una relación mediante una preposición.

> **Das ist die Frau, deren Tochter Ärztin ist.**  
> *Traducción:* Esta es la mujer cuya hija es médica.  
> *Uso:* Expresar posesión o parentesco.

> **Das ist alles, was ich darüber weiß.**  
> *Traducción:* Eso es todo lo que sé al respecto.  
> *Uso:* Referirse a un pronombre indefinido.

> **Das ist das Haus, in dem ich früher gewohnt habe.**  
> *Traducción:* Esta es la casa en la que vivía antes.  
> *Uso:* Referirse formalmente a un lugar.

> **Er hat die Prüfung bestanden, worüber wir uns sehr freuen.**  
> *Traducción:* Ha aprobado el examen, de lo cual nos alegramos mucho.  
> *Uso:* Retomar una situación completa con un adverbio pronominal.

#### 5. 💡 Notas de Pronunciación o Errores Comunes

- ⚠️ **Caso del relativo:** No copies automáticamente el caso del antecedente en la oración principal. Determina la función del relativo dentro de su propia subordinada.
- ⚠️ **No confundir artículo y relativo:** Las formas son parecidas, pero el dativo plural es `denen` y el genitivo usa `dessen/deren`.
- ⚠️ **Verbo al final:** `Das ist der Mann, den ich gestern gesehen habe`, no `… den ich habe gestern gesehen`.
- ⚠️ **Preposición obligatoria:** Conserva la preposición exigida: `mit dem`, `auf den`, `für die`, `von denen`.
- ⚠️ **Género gramatical:** `das Mädchen` es neutro; por eso se dice `das Mädchen, dem du eine Rose geschenkt hast`.
- ⚠️ **Genitivo sin artículo adicional:** `der Mann, dessen Sohn…`, no `dessen der Sohn`.
- ⚠️ **Uso de `was`:** No digas `mein Freund, was…`; usa `mein Freund, der…`.
- ⚠️ **Personas y adverbios pronominales:** Para personas se prefiere `mit dem`, `für die`, etc.; `womit`, `wofür` y formas semejantes suelen referirse a cosas o situaciones.
- ⚠️ **Pronunciación:** En `dessen` y `deren`, la primera sílaba lleva el acento: **DES**-sen, **DE**-ren. En `wofür` y `worüber`, el acento recae normalmente en la preposición: wo-**FÜR**, wo-**RÜ**-ber.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)

<!-- DATA_QUIZ_START -->
- Q: Der Film, ____ wir gestern im Kino gesehen haben, war sehr interessant.
  A: den
  Type: fill-in-the-blank
- Q: Das neue Büro, ____ mein Kollege mir gestern gezeigt hat, ist sehr modern.
  A: das
  Type: fill-in-the-blank
- Q: Der Mann, ____ meine Schwester mir vorgestellt hat, kommt aus Peru.
  A: den
  Type: fill-in-the-blank
- Q: Der Schüler, ____ ich Nachhilfe gebe, spricht noch nicht so gut Deutsch.
  A: dem
  Type: fill-in-the-blank
- Q: Das Mädchen, ____ du eine Rose geschenkt hast, ist sehr attraktiv.
  A: dem
  Type: fill-in-the-blank
- Q: Das Kleid, ____ Anna bei Amazon gekauft hat, war sehr günstig.
  A: das
  Type: fill-in-the-blank
- Q: Das ist mein Steuerberater, mit ____ ich schon lange zusammenarbeite.
  A: dem
  Type: fill-in-the-blank
- Q: Meine Nachbarin, ____ Mann fast nie zu Hause ist, kommt oft bei mir vorbei.
  A: deren
  Type: fill-in-the-blank
- Q: Die Seminare, von ____ mir eine Freundin erzählt hat, finden jeden Sonntag statt.
  A: denen
  Type: fill-in-the-blank
- Q: Herr Schwarz, ____ Sohn mit meiner Tochter befreundet ist, arbeitet bei der Polizei.
  A: dessen
  Type: fill-in-the-blank
- Q: Traduce «El hombre que nos ha saludado es mi jefe».
  A: Der Mann, der uns begrüßt hat, ist mein Chef.
  Type: flashcard
- Q: Traduce «Los estudiantes con quienes hablé estaban satisfechos».
  A: Die Studenten, mit denen ich gesprochen habe, waren zufrieden.
  Type: flashcard
- Q: ¿Qué determina el género y el número de un pronombre relativo?
  A: El antecedente o elemento de referencia.
  Type: flashcard
- Q: ¿Qué determina el caso de un pronombre relativo?
  A: Su función sintáctica o la preposición dentro de la oración relativa.
  Type: flashcard
- Q: Completa con una alternativa formal a `wo`: Das ist das Haus, ____ ich früher gewohnt habe.
  A: in dem
  Type: fill-in-the-blank
- Q: Paul und Sabine haben spontan geheiratet, ____ mich überrascht hat.
  A: was
  Type: fill-in-the-blank
<!-- DATA_QUIZ_END -->


---


### Unidad 51 — Oraciones subordinadas con Konjunktiv II

*Nivel orientativo:* **B1** · *Alcance A1 de esta app:* 📚

---
class_id: 051
title: "Oraciones subordinadas con Konjunktiv II"
level: "C1"
topics: ["Gramática", "Konjunktiv II", "Oraciones subordinadas", "Condicionales irreales", "Orden verbal"]
target_exam: "Telc / Goethe C1"
---

### Oraciones subordinadas con Konjunktiv II

#### 1. 🎯 Resumen / Objetivos de la Lección

- Construir condiciones irreales o poco probables con `wenn` y Konjunktiv II.
- Distinguir hipótesis de presente, irreales de pasado y condicionales mixtas.
- Combinar Konjunktiv II en la oración subordinada y en la principal.
- Aplicar correctamente la posición verbal con participios, infinitivos y verbos modales.
- Analizar oraciones complejas formadas por varias subordinadas.

#### 2. 📚 Vocabulario Clave (Wortschatz)

| Alemán (mit Artikel/Plural) | Español | Categoría | Nota / Ejemplo |
| :--- | :--- | :--- | :--- |
| der Konjunktiv II, — | el Konjunktiv II | Sustantivo | Expresa, entre otros usos, situaciones irreales o hipotéticas. |
| der Konditionalsatz, Konditionalsätze | la oración condicional | Sustantivo | Ein Konditionalsatz kann mit `wenn` beginnen. |
| die Bedingung, Bedingungen | la condición | Sustantivo | eine unerfüllbare Bedingung |
| die Annahme, Annahmen | la suposición | Sustantivo | eine irreale Annahme |
| die Voraussetzung, Voraussetzungen | el requisito / la condición previa | Sustantivo | unter dieser Voraussetzung |
| das Arbeitsrecht, — | el derecho laboral | Sustantivo | das Arbeitsrecht reformieren |
| die Prüfung, Prüfungen | el examen | Sustantivo | eine Prüfung bestehen |
| die Präsentation, Präsentationen | la presentación | Sustantivo | mit der Präsentation fertig werden |
| die Beziehung, Beziehungen | la relación | Sustantivo | eine Beziehung mit jemandem anfangen |
| der Flug, Flüge | el vuelo | Sustantivo | einen günstigeren Flug buchen |
| das Studium, Studien | los estudios universitarios | Sustantivo | Das Studium ist anstrengend. |
| die Wahrheit, Wahrheiten | la verdad | Sustantivo | jemandem die Wahrheit erzählen |
| der Job, Jobs | el empleo | Sustantivo | sich um einen Job bewerben |
| der Ex-Freund, Ex-Freunde | el exnovio | Sustantivo | eine Beziehung mit dem Ex-Freund |
| die Ex-Freundin, Ex-Freundinnen | la exnovia | Sustantivo | eine Beziehung mit der Ex-Freundin |
| etwas reformieren | reformar algo | Verbo regular, Akkusativ | das Arbeitsrecht reformieren |
| jemanden anrufen | llamar por teléfono a alguien | Verbo irregular separable, Akkusativ | Ich hätte dich angerufen. |
| jemandem Bescheid sagen | avisar a alguien | Expresión, Dativ + Akkusativ | Sag mir bitte rechtzeitig Bescheid. |
| sich auf etwas vorbereiten | prepararse para algo | Verbo reflexivo regular, `auf` + Akkusativ | sich auf die Prüfung vorbereiten |
| sich um etwas bewerben | solicitar algo / postularse a algo | Verbo reflexivo irregular, `um` + Akkusativ | sich um den Job bewerben |
| sich für/gegen etwas entscheiden | decidirse a favor/en contra de algo | Verbo irregular, `für/gegen` + Akkusativ | sich gegen das Studium entscheiden |
| etwas ahnen | intuir algo | Verbo regular, Akkusativ | Wenn ich das geahnt hätte… |
| etwas bestehen | aprobar / superar algo | Verbo irregular, Akkusativ | die Prüfung bestehen |
| etwas buchen | reservar algo | Verbo regular, Akkusativ | einen Flug buchen |
| mit etwas fertig werden | terminar algo / lograr manejar algo | Expresión, `mit` + Dativ | mit der Präsentation fertig werden |

#### 3. 🧩 Reglas Gramaticales (Grammatik)

##### Función del Konjunktiv II

- **Regla / Concepto:** El Konjunktiv II presenta una situación como irreal, improbable, imaginada o contraria a los hechos.
- En las condicionales irreales, tanto la condición como su consecuencia suelen aparecer en Konjunktiv II.
- **Estructura básica:** `Wenn + sujeto + ... + verbo(s) en K. II al final, + verbo en K. II + sujeto + ...`

> `Wenn ich Präsident der Vereinigten Staaten wäre, würde ich das Arbeitsrecht reformieren.`  
> Si fuera presidente de Estados Unidos, reformaría el derecho laboral.

##### Formas frecuentes

Las formas simples de `sein`, `haben` y de los verbos modales son habituales. Con muchos otros verbos se prefiere `würde + infinitivo`, especialmente cuando la forma simple resulta poco usual o coincide con el Präteritum.

| Infinitivo | Präteritum | Konjunktiv II | Español |
| :--- | :--- | :--- | :--- |
| sein | war | wäre | sería / estuviera |
| haben | hatte | hätte | tendría / hubiera |
| geben | gab | gäbe | habría / existiría |
| können | konnte | könnte | podría |
| dürfen | durfte | dürfte | podría / tendría permitido |
| mögen | mochte | möchte | quisiera / gustaría |
| müssen | musste | müsste | tendría que |
| wollen | wollte | wollte | querría |
| sollen | sollte | sollte | debería |

- Con `wollen` y `sollen`, la forma de Konjunktiv II coincide externamente con el Präteritum; el contexto determina la interpretación.
- No se suele sustituir `wäre`, `hätte` ni las formas modales frecuentes por construcciones como `würde sein` o `würde können` en estos contextos.

##### Condición irreal o improbable en presente

- **Subordinada:** forma simple del Konjunktiv II o `würde + infinitivo`, con el componente conjugado al final.
- **Principal:** forma simple del Konjunktiv II o `würde + infinitivo`.

> `Wenn du zwanzig Jahre jünger wärst, würdest du dein Leben noch einmal genauso leben?`  
> Si tuvieras veinte años menos, ¿volverías a vivir tu vida de la misma manera?

> `Wenn ich schon fließend Deutsch sprechen könnte, würde ich mich um den Job bewerben.`  
> Si ya pudiera hablar alemán con fluidez, solicitaría el empleo.

##### Irreal de pasado

- **Fórmula:** `hätte/wäre + Partizip II`
- Se refiere a una condición que ya no puede cumplirse.
- El auxiliar se elige como en Perfekt: la mayoría de los verbos usan `haben`; los verbos de desplazamiento o cambio de estado correspondientes usan `sein`.

> `Wenn ich gestern Abend nicht so müde gewesen wäre, hätte ich dich angerufen.`  
> Si anoche no hubiera estado tan cansado, te habría llamado.

| Subordinada con `wenn` | Oración principal |
| :--- | :--- |
| `Wenn du mir rechtzeitig Bescheid gesagt hättest,` | `wäre ich zur Party gekommen.` |
| `Wenn du dich besser vorbereitet hättest,` | `hättest du die Prüfung bestanden.` |
| `Wenn ich dich nicht kennengelernt hätte,` | `wäre ich wahrscheinlich immer einsam geblieben.` |

##### Condicional mixta

Una condición pasada puede producir una consecuencia presente:

> `Wenn Sie früher mit dem Projekt angefangen hätten, wären Sie jetzt nicht so gestresst.`  
> Si hubiera empezado antes con el proyecto, ahora no estaría tan estresado.

- `angefangen hätten`: irreal de pasado.
- `wären ... gestresst`: consecuencia irreal en el presente.

##### Orden de las oraciones

Si la subordinada con `wenn` aparece primero, ocupa la primera posición del conjunto. La oración principal empieza inmediatamente con el verbo conjugado: no se añade otro elemento delante de él.

> `Wenn du mir Bescheid gesagt hättest, wäre ich gekommen.`

Al invertir el orden, la principal conserva el verbo en segunda posición:

> `Ich wäre gekommen, wenn du mir Bescheid gesagt hättest.`

Transformaciones:

| Subordinada primero | Principal primero |
| :--- | :--- |
| `Wenn du dich besser vorbereitet hättest, hättest du die Prüfung bestanden.` | `Du hättest die Prüfung bestanden, wenn du dich besser vorbereitet hättest.` |
| `Wenn ich fließend Deutsch sprechen könnte, würde ich mich um den Job bewerben.` | `Ich würde mich um den Job bewerben, wenn ich fließend Deutsch sprechen könnte.` |
| `Wenn ich dich nicht kennengelernt hätte, wäre ich einsam geblieben.` | `Ich wäre einsam geblieben, wenn ich dich nicht kennengelernt hätte.` |

##### Verbos modales en el irreal de pasado

Con un verbo modal se usa normalmente un **doble infinitivo** en lugar del participio del modal:

> `Wir hätten einen günstigeren Flug bekommen können.`  
> Podríamos haber conseguido un vuelo más barato.

- **Oración principal:** `hätte + ... + infinitivo principal + infinitivo modal`
- **Subordinada:** `..., wenn wir einen günstigeren Flug hätten bekommen können.`
- En la subordinada, el auxiliar conjugado `hätte` se coloca delante del grupo de infinitivos. Esta es una excepción importante a la regla general de «verbo conjugado al final».

##### Subordinación múltiple

> `Wenn ich geahnt hätte, wie er reagieren würde, hätte ich ihm die Wahrheit nicht erzählt.`  
> Si hubiera intuido cómo reaccionaría, no le habría dicho la verdad.

> `Wenn ich gewusst hätte, wie anstrengend das Studium sein würde, hätte ich mich dagegen entschieden.`  
> Si hubiera sabido lo agotadores que serían los estudios, habría decidido no cursarlos.

Cada bloque conserva su propia regla:

| Bloque | Tipo | Orden verbal |
| :--- | :--- | :--- |
| `Wenn ich gewusst hätte,` | condicional irreal de pasado | `Partizip II + hätte` |
| `dass das Leben ... nicht so einfach sein würde,` | subordinada con `dass` y K. II | `sein + würde` |
| `wie ich gedacht hatte,` | interrogativa indirecta | `Partizip II + hatte` |
| `hätte ich mich besser informiert,` | principal con inversión | `hätte` al inicio, participio al final |
| `um mich gut vorzubereiten,` | oración final con `um ... zu` | infinitivo con `zu`; `vorzubereiten` |
| `bevor ich hierher gezogen bin.` | subordinada temporal | `Partizip II + bin` |

Ejemplo completo:

> `Wenn ich gewusst hätte, dass das Leben in Deutschland nicht so einfach sein würde, wie ich gedacht hatte, hätte ich mich sicherlich besser informiert, um mich gut vorzubereiten, bevor ich hierher gezogen bin.`  
> Si hubiera sabido que la vida en Alemania no sería tan fácil como había pensado, sin duda me habría informado mejor para prepararme bien antes de mudarme aquí.

#### 4. 💬 Frases y Expresiones Útiles (Redemittel)

> **Wenn ich das gewusst hätte, hätte ich anders gehandelt.**  
> *Traducción:* Si lo hubiera sabido, habría actuado de otra manera.  
> *Uso:* Expresar una consecuencia pasada contraria a los hechos.

> **Wenn ich mehr Zeit hätte, würde ich öfter Deutsch üben.**  
> *Traducción:* Si tuviera más tiempo, practicaría alemán más a menudo.  
> *Uso:* Formular una hipótesis presente.

> **An deiner Stelle würde ich früher anfangen.**  
> *Traducción:* En tu lugar empezaría antes.  
> *Uso:* Dar un consejo hipotético.

> **Ohne deine Hilfe hätte ich das nicht geschafft.**  
> *Traducción:* Sin tu ayuda no lo habría conseguido.  
> *Uso:* Expresar una condición sin una subordinada con `wenn`.

> **Hätte ich das nur früher gewusst!**  
> *Traducción:* ¡Si tan solo lo hubiera sabido antes!  
> *Uso:* Expresar arrepentimiento mediante una condicional sin `wenn`.

> **Wenn Sie früher angefangen hätten, wären Sie jetzt entspannter.**  
> *Traducción:* Si hubiera empezado antes, ahora estaría más tranquilo.  
> *Uso:* Construir una condicional mixta en registro formal.

#### 5. 💡 Notas de Pronunciación o Errores Comunes

- ⚠️ **No duplicar el sujeto:** `Du hättest die Prüfung bestanden`, no `Du hättest du die Prüfung bestanden`.
- ⚠️ **Inversión después de la subordinada:** `Wenn ..., wäre ich ...`, no `Wenn ..., ich wäre ...`.
- ⚠️ **Irreal de pasado:** Usa `hätte/wäre + Partizip II`; `würde + infinitivo` expresa normalmente una hipótesis presente o futura, no sustituye esta construcción.
- ⚠️ **Auxiliar correcto:** `wäre gekommen`, `wäre geblieben`, pero `hätte gelernt`, `hätte angerufen`.
- ⚠️ **Doble infinitivo modal:** `hätte bekommen können`, no `könnte bekommen gehabt`.
- ⚠️ **Subordinada con doble infinitivo:** `wenn ich es hätte machen können`; el auxiliar precede a los dos infinitivos.
- ⚠️ **`als` para una característica pasada:** En una traducción como «si hubiera sabido cómo era mi expareja», resulta natural `wie mein Ex-Partner wirklich war`, no necesariamente el presente `ist`.
- ⚠️ **Ortografía:** Se escribe `vor allem` y `vorzubereiten`; `sprechen` lleva una sola `h`.
- ⚠️ **Pronunciación:** Los umlauts distinguen formas: `wäre` /ˈvɛːʁə/, `hätte` /ˈhɛtə/, `könnte` /ˈkœntə/, `müsste` /ˈmʏstə/.

#### 6. 🧪 Tarjetas de Práctica / Q&A (Para Parser PWA)

<!-- DATA_QUIZ_START -->
- Q: Wenn ich früher angefangen ____, Deutsch zu lernen, wäre das Leben in Deutschland viel einfacher gewesen.
  A: hätte
  Type: fill-in-the-blank
- Q: Traduce «Si hubiera empezado antes a aprender alemán, la vida en Alemania habría sido mucho más fácil».
  A: Wenn ich früher angefangen hätte, Deutsch zu lernen, wäre das Leben in Deutschland viel einfacher gewesen.
  Type: flashcard
- Q: Traduce «Habrías aprobado el examen si te hubieras preparado mejor».
  A: Du hättest die Prüfung bestanden, wenn du dich besser vorbereitet hättest.
  Type: flashcard
- Q: Wenn Sie früher mit dem Projekt angefangen hätten, ____ Sie jetzt nicht so gestresst.
  A: wären
  Type: fill-in-the-blank
- Q: Traduce «Si no me hubieras ayudado, nunca habría terminado la presentación».
  A: Wenn du mir nicht geholfen hättest, wäre ich nie mit der Präsentation fertig geworden.
  Type: flashcard
- Q: Wenn du mehr gelernt hättest, ____ du sicherlich eine bessere Note bekommen.
  A: hättest
  Type: fill-in-the-blank
- Q: Traduce «Si hubiera sabido cómo era realmente mi expareja, nunca habría empezado una relación».
  A: Wenn ich gewusst hätte, wie mein Ex-Partner wirklich war, hätte ich nie eine Beziehung angefangen.
  Type: flashcard
- Q: Wir hätten einen günstigeren Flug bekommen ____, wenn wir früher gebucht hätten.
  A: können
  Type: fill-in-the-blank
- Q: Traduce «Podríamos haber conseguido un vuelo más barato si hubiéramos reservado antes».
  A: Wir hätten einen günstigeren Flug bekommen können, wenn wir früher gebucht hätten.
  Type: flashcard
- Q: Wenn ich gewusst hätte, dass die deutsche Grammatik nicht so kompliziert ist, ____ ich weniger Angst gehabt.
  A: hätte
  Type: fill-in-the-blank
- Q: Ordena la principal después de `Wenn du mir rechtzeitig Bescheid gesagt hättest`: ich / zur Party / wäre / gekommen
  A: wäre ich zur Party gekommen
  Type: sentence-order
- Q: Reescribe empezando por la principal: Wenn du dich besser vorbereitet hättest, hättest du die Prüfung bestanden.
  A: Du hättest die Prüfung bestanden, wenn du dich besser vorbereitet hättest.
  Type: transformation
- Q: ¿Cómo se forma normalmente el Konjunktiv II de pasado?
  A: Con `hätte` o `wäre` más el Partizip II.
  Type: flashcard
- Q: ¿Qué estructura se usa con un verbo modal en el Konjunktiv II de pasado?
  A: `hätte` más infinitivo principal más infinitivo modal; por ejemplo, `hätte machen können`.
  Type: flashcard
- Q: Completa la subordinada con doble infinitivo: wenn ich den Flug früher ____ buchen können
  A: hätte
  Type: fill-in-the-blank
- Q: Wenn ich geahnt hätte, wie er reagieren ____, hätte ich ihm die Wahrheit nicht erzählt.
  A: würde
  Type: fill-in-the-blank
<!-- DATA_QUIZ_END -->


---

## Parte 6 — Apéndice: tablas de declinación rápida

#### 1. Declinación de pronombres personales

| Caso | 1.ª sg (ich) | 2.ª sg (du) | 3.ª sg (masc.) (er) | 3.ª sg (fem.) (sie) | 3.ª sg (neut.) (es) | 1.ª pl (wir) | 2.ª pl (ihr) | 3.ª pl (sie) | Formal (Sie) |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **Nominativo** | ich | du | er | sie | es | wir | ihr | sie | Sie |
| **Acusativo** | mich | dich | ihn | sie | es | uns | euch | sie | Sie |
| **Dativo** | mir | dir | ihm | ihr | ihm | uns | euch | ihnen | Ihnen |
| **Genitivo** | meiner | deiner | seiner | ihrer | seiner | unser | euer | ihrer | Ihrer |
* **Sie** (mayúscula) se utiliza para tratamiento formal (singular y plural).
* “ihr” puede ser 3.ª sg fem (ella), 2.ª pl (vosotros) o 3.ª pl (ellas/ellos) según contexto.

---

#### 2. Nominativo

A continuación verás varias tablas específicas del **caso nominativo**.

---

##### 2.1 Determinantes en nominativo

**a) Artículos definidos**

| Género | Masculino | Neutro | Femenino | Plural |
| :---- | :---- | :---- | :---- | :---- |
| **Artículo** | d**er** | d**as** | d**ie** | d**ie** |

**b) Artículos indefinidos**

No existe forma de plural para el artículo indefinido.

| Género | Masculino | Neutro | Femenino | Plural |
| :---- | :---- | :---- | :---- | :---- |
| **Artículo** | **ein** | **ein** | **eine** | — |

**c) Negaciones (kein)**

| Género | Masculino | Neutro | Femenino | Plural |
| :---- | :---- | :---- | :---- | :---- |
| **Negación** | k**ein** | k**ein** | k**eine** | k**eine** |

---

##### 2.2 Posesivos en nominativo

En esta tabla se muestra **la forma del posesivo** (sin sustantivo) en **nominativo** para cada persona (fila) y género (columna). Observa cómo cambia la **terminación** en femenino y plural, resaltada en negrita.

|  | Masculino (M) | Neutro (N) | Femenino (F) | Plural (PL) |
| :---- | :---- | :---- | :---- | :---- |
| **1.ª sg (ich)** | mein | mein | mein**e** | mein**e** |
| **2.ª sg (du)** | dein | dein | dein**e** | dein**e** |
| **3.ª sg (er)** | sein | sein | sein**e** | sein**e** |
| **3.ª sg (sie)** | ihr | ihr | ihr**e** | ihr**e** |
| **3.ª sg (es)** | sein | sein | sein**e** | sein**e** |
| **1.ª pl (wir)** | unser | unser | unser**e** | unser**e** |
| **2.ª pl (ihr)** | euer | euer | eur**e** | eur**e** |
| **3.ª pl (sie)** | ihr | ihr | ihr**e** | ihr**e** |
| **Formal (Sie)** | Ihr | Ihr | Ihr**e** | Ihr**e** |
* Fíjate en **euer → eur**e en femenino y plural.
* En masculino y neutro singular no se añade terminación al posesivo en nominativo.

---

##### 2.3 Declinación de adjetivos (nominativo)

En alemán, la **persona gramatical** (ich, du, etc.) no altera la terminación del adjetivo; lo que importa es el género y si hay determinante. Sin embargo, se incluye aquí una tabla con filas para cada persona para que puedas ver que **la forma del adjetivo es la misma** en cada fila, dependiendo solo del **género**.

A modo de ejemplo, usaremos el **artículo definido** (**der/die/das**) con el adjetivo **groß** y el sustantivo (p.ej. *Hund, Haus, Katze, Hunde*). Destacamos las terminaciones en negrita.

|  | Masculino (der Hund) | Neutro (das Haus) | Femenino (die Katze) | Plural (die Hunde) |
| :---- | :---- | :---- | :---- | :---- |
| **1.ª sg (ich)** | der groß**e** Hund | das groß**e** Haus | die groß**e** Katze | die groß**en** Hunde |
| **2.ª sg (du)** | der groß**e** Hund | das groß**e** Haus | die groß**e** Katze | die groß**en** Hunde |
| **3.ª sg (er/sie/es)** | der groß**e** Hund | das groß**e** Haus | die groß**e** Katze | die groß**en** Hunde |
| **1.ª pl (wir)** | der groß**e** Hund | das groß**e** Haus | die groß**e** Katze | die groß**en** Hunde |
| **2.ª pl (ihr)** | der groß**e** Hund | das groß**e** Haus | die groß**e** Katze | die groß**en** Hunde |
| **3.ª pl (sie/Sie)** | der groß**e** Hund | das groß**e** Haus | die groß**e** Katze | die groß**en** Hunde |
* Este es un ejemplo de **declinación débil** (weak) tras el artículo definido.
* La terminación del adjetivo en plural nominativo suele ser **-en** con artículo definido.

---

##### 2.4 Declinación de adjetivos con posesivos (nominativo)

Ejemplo con el posesivo de cada persona y el adjetivo **groß** antes de un sustantivo. Aquí se aplica la **declinación mixta** (mixed), igual que con *ein/kein*. Resaltamos la terminación tanto del posesivo como del adjetivo.

Usaremos para **masculino** “Hund”, **neutro** “Haus”, **femenino** “Katze”, **plural** “Hunde”.

|  | Masculino (... Hund) | Neutro (... Haus) | Femenino (... Katze) | Plural (... Hunde) |
| :---- | :---- | :---- | :---- | :---- |
| **1.ª sg (ich)** | mein groß**er** Hund | mein groß**es** Haus | mein**e** groß**e** Katze | mein**e** groß**en** Hunde |
| **2.ª sg (du)** | dein groß**er** Hund | dein groß**es** Haus | dein**e** groß**e** Katze | dein**e** groß**en** Hunde |
| **3.ª sg (er)** | sein groß**er** Hund | sein groß**es** Haus | sein**e** groß**e** Katze | sein**e** groß**en** Hunde |
| **3.ª sg (sie)** | ihr groß**er** Hund | ihr groß**es** Haus | ihr**e** groß**e** Katze | ihr**e** groß**en** Hunde |
| **3.ª sg (es)** | sein groß**er** Hund | sein groß**es** Haus | sein**e** groß**e** Katze | sein**e** groß**en** Hunde |
| **1.ª pl (wir)** | unser groß**er** Hund | unser groß**es** Haus | unser**e** groß**e** Katze | unser**e** groß**en** Hunde |
| **2.ª pl (ihr)** | euer groß**er** Hund | euer groß**es** Haus | eur**e** groß**e** Katze | eur**e** groß**en** Hunde |
| **3.ª pl (sie)** | ihr groß**er** Hund | ihr groß**es** Haus | ihr**e** groß**e** Katze | ihr**e** groß**en** Hunde |
| **Formal (Sie)** | Ihr groß**er** Hund | Ihr groß**es** Haus | Ihr**e** groß**e** Katze | Ihr**e** groß**en** Hunde |

Observa las terminaciones:
* Masculino nominativo: **-er**
* Neutro nominativo: **-es**
* Femenino nominativo: posesivo acaba en **-e**, adjetivo en **-e**
* Plural nominativo: posesivo acaba en **-e**, adjetivo en **-en**

---

#### 3. Acusativo

A continuación, la misma estructura para el **caso acusativo**.

##### 3.1 Determinantes en acusativo

**a) Artículos definidos**

| Género | Masculino | Neutro | Femenino | Plural |
| :---- | :---- | :---- | :---- | :---- |
| **Artículo** | d**en** | d**as** | d**ie** | d**ie** |

**b) Artículos indefinidos**

| Género | Masculino | Neutro | Femenino | Plural |
| :---- | :---- | :---- | :---- | :---- |
| **Artículo** | ein**en** | ein | eine | — |

**c) Negaciones (kein)**

| Género | Masculino | Neutro | Femenino | Plural |
| :---- | :---- | :---- | :---- | :---- |
| **Negación** | k**ein**en | kein | keine | keine |

---

##### 3.2 Posesivos en acusativo

Igual que con los artículos indefinidos, **solo el masculino** singular sufre un cambio notable en acusativo (añade **-en**). Ejemplo:

|  | Masculino (M) | Neutro (N) | Femenino (F) | Plural (PL) |
| :---- | :---- | :---- | :---- | :---- |
| **1.ª sg (ich)** | mein**en** | mein | mein**e** | mein**e** |
| **2.ª sg (du)** | dein**en** | dein | dein**e** | dein**e** |
| **3.ª sg (er)** | sein**en** | sein | sein**e** | sein**e** |
| **3.ª sg (sie)** | ihr**en** | ihr | ihr**e** | ihr**e** |
| **3.ª sg (es)** | sein**en** | sein | sein**e** | sein**e** |
| **1.ª pl (wir)** | unser**en** | unser | unser**e** | unser**e** |
| **2.ª pl (ihr)** | euer**en** | euer | eur**e** | eur**e** |
| **3.ª pl (sie)** | ihr**en** | ihr | ihr**e** | ihr**e** |
| **Formal (Sie)** | Ihr**en** | Ihr | Ihr**e** | Ihr**e** |

---

##### 3.3 Declinación de adjetivos (acusativo)

Ejemplo con artículo definido (**den, das, die**) + adjetivo **groß** + sustantivo.

|  | M (den Hund) | N (das Haus) | F (die Katze) | PL (die Hunde) |
| :---- | :---- | :---- | :---- | :---- |
| **1.ª sg (ich)** | d**en** groß**en** Hund | d**as** groß**e** Haus | d**ie** groß**e** Katze | d**ie** groß**en** Hunde |
| **2.ª sg (du)** | den groß**en** Hund | das groß**e** Haus | die groß**e** Katze | die groß**en** Hunde |
| **3.ª sg (er/sie/es)** | den groß**en** Hund | das groß**e** Haus | die groß**e** Katze | die groß**en** Hunde |
| **1.ª pl (wir)** | den groß**en** Hund | das groß**e** Haus | die groß**e** Katze | die groß**en** Hunde |
| **2.ª pl (ihr)** | den groß**en** Hund | das groß**e** Haus | die groß**e** Katze | die groß**en** Hunde |
| **3.ª pl (sie/Sie)** | den groß**en** Hund | das groß**e** Haus | die groß**e** Katze | die groß**en** Hunde |

---

##### 3.4 Declinación de adjetivos con posesivos (acusativo)

Ejemplo con **posesivo** (mein, dein, etc.) + adjetivo **groß** + sustantivo (masc.: Hund, etc.). Se aplica la **declinación mixta**.

|  | M (… Hund) | N (… Haus) | F (… Katze) | PL (… Hunde) |
| :---- | :---- | :---- | :---- | :---- |
| **1.ª sg (ich)** | mein**en** groß**en** Hund | mein groß**es** Haus | mein**e** groß**e** Katze | mein**e** groß**en** Hunde |
| **2.ª sg (du)** | dein**en** groß**en** Hund | dein groß**es** Haus | dein**e** groß**e** Katze | dein**e** groß**en** Hunde |
| **3.ª sg (er)** | sein**en** groß**en** Hund | sein groß**es** Haus | sein**e** groß**e** Katze | sein**e** groß**en** Hunde |
| **3.ª sg (sie)** | ihr**en** groß**en** Hund | ihr groß**es** Haus | ihr**e** groß**e** Katze | ihr**e** groß**en** Hunde |
| **3.ª sg (es)** | sein**en** groß**en** Hund | sein groß**es** Haus | sein**e** groß**e** Katze | sein**e** groß**en** Hunde |
| **1.ª pl (wir)** | unser**en** groß**en** Hund | unser groß**es** Haus | unser**e** groß**e** Katze | unser**e** groß**en** Hunde |
| **2.ª pl (ihr)** | euer**en** groß**en** Hund | euer groß**es** Haus | eur**e** groß**e** Katze | eur**e** groß**en** Hunde |
| **3.ª pl (sie)** | ihr**en** groß**en** Hund | ihr groß**es** Haus | ihr**e** groß**e** Katze | ihr**e** groß**en** Hunde |
| **Formal (Sie)** | Ihr**en** groß**en** Hund | Ihr groß**es** Haus | Ihr**e** groß**e** Katze | Ihr**e** groß**en** Hunde |
* Observa nuevamente que el **masculino acusativo** lleva “-en” tanto en el posesivo como en el adjetivo.
* Femenino y plural se comportan como en nominativo, excepto que el artículo/posesivo no cambia (salvo en M.sg).

---

#### 4. Dativo

##### 4.1 Determinantes en dativo

**a) Artículos definidos**

| Género | Masculino | Neutro | Femenino | Plural |
| :---- | :---- | :---- | :---- | :---- |
| Artículo | d**em** | d**em** | d**er** | d**en** (+n) |

Al sustantivo en plural suele añadirse “-n” (si no lo tiene ya).

**b) Artículos indefinidos**

| Género | Masculino | Neutro | Femenino | Plural |
| :---- | :---- | :---- | :---- | :---- |
| Artículo | ein**em** | ein**em** | ein**er** | — |

**c) Negaciones (kein)**

| Género | Masculino | Neutro | Femenino | Plural |
| :---- | :---- | :---- | :---- | :---- |
| Negación | kein**em** | kein**em** | kein**er** | kein**en** (+n) |

---

##### 4.2 Posesivos en dativo

El patrón es similar al de *ein*. Solo en femenino y plural hay “-er” / “-en”, y en masculino/neutro “-em”.

|  | Masculino | Neutro | Femenino | Plural |
| :---- | :---- | :---- | :---- | :---- |
| **1.ª sg (ich)** | mein**em** | mein**em** | mein**er** | mein**en** (+n) |
| **2.ª sg (du)** | dein**em** | dein**em** | dein**er** | dein**en** (+n) |
| **3.ª sg (er)** | sein**em** | sein**em** | sein**er** | sein**en** (+n) |
| **3.ª sg (sie)** | ihr**em** | ihr**em** | ihr**er** | ihr**en** (+n) |
| **3.ª sg (es)** | sein**em** | sein**em** | sein**er** | sein**en** (+n) |
| **1.ª pl (wir)** | unser**em** | unser**em** | unser**er** | unser**en** (+n) |
| **2.ª pl (ihr)** | euer**em** | euer**em** | eur**er** | eur**en** (+n) |
| **3.ª pl (sie)** | ihr**em** | ihr**em** | ihr**er** | ihr**en** (+n) |
| **Formal (Sie)** | Ihr**em** | Ihr**em** | Ihr**er** | Ihr**en** (+n) |

---

##### 4.3 Declinación de adjetivos (dativo)

Ejemplo con artículo definido + adjetivo **groß**.

|  | M (dem Hund) | N (dem Haus) | F (der Katze) | PL (den Hunden) (añadir -n) |
| :---- | :---- | :---- | :---- | :---- |
| **1.ª sg (ich)** | d**em** groß**en** Hund | d**em** groß**en** Haus | d**er** groß**en** Katze | d**en** groß**en** Hunden |
| **2.ª sg (du)** | dem groß**en** Hund | dem groß**en** Haus | der groß**en** Katze | den groß**en** Hunden |
| … | … | … | … | … |

Para simplificar, todas las personas tienen la misma terminación del adjetivo en dativo con artículo definido: **-en** en todos los géneros.

---

##### 4.4 Declinación de adjetivos con posesivos (dativo)

Ejemplo: **mein + groß + sustantivo**.

|  | M (… Hund) | N (… Haus) | F (… Katze) | PL (… Hunde) (añadir -n) |
| :---- | :---- | :---- | :---- | :---- |
| **1.ª sg (ich)** | mein**em** groß**en** Hund | mein**em** groß**en** Haus | mein**er** groß**en** Katze | mein**en** groß**en** Hunde |
| **2.ª sg (du)** | dein**em** groß**en** Hund | dein**em** groß**en** Haus | dein**er** groß**en** Katze | dein**en** groß**en** Hunde |
| **3.ª sg (er)** | sein**em** groß**en** Hund | sein**em** groß**en** Haus | sein**er** groß**en** Katze | sein**en** groß**en** Hunde |
| **3.ª sg (sie)** | ihr**em** groß**en** Hund | ihr**em** groß**en** Haus | ihr**er** groß**en** Katze | ihr**en** groß**en** Hunde |
| **3.ª sg (es)** | sein**em** groß**en** Hund | sein**em** groß**en** Haus | sein**er** groß**en** Katze | sein**en** groß**en** Hunde |
| **1.ª pl (wir)** | unser**em** groß**en** Hund | unser**em** groß**en** Haus | unser**er** groß**en** Katze | unser**en** groß**en** Hunde |
| **2.ª pl (ihr)** | euer**em** groß**en** Hund | euer**em** groß**en** Haus | eur**er** groß**en** Katze | eur**en** groß**en** Hunde |
| **3.ª pl (sie)** | ihr**em** groß**en** Hund | ihr**em** groß**en** Haus | ihr**er** groß**en** Katze | ihr**en** groß**en** Hunde |
| **Formal (Sie)** | Ihr**em** groß**en** Hund | Ihr**em** groß**en** Haus | Ihr**er** groß**en** Katze | Ihr**en** groß**en** Hunde |

---

#### 5. Genitivo

##### 5.1 Determinantes en genitivo

**a) Artículos definidos**

| Género | Masculino | Neutro | Femenino | Plural |
| :---- | :---- | :---- | :---- | :---- |
| Artículo | d**es** | d**es** | d**er** | d**er** |

Además, el sustantivo masculino o neutro suele añadir “-s” o “-es”. (z.B. *des Hund**es, des Mann**es).

**b) Artículos indefinidos**

| Género | Masculino | Neutro | Femenino | Plural |
| :---- | :---- | :---- | :---- | :---- |
| Artículo | ein**es** | ein**es** | ein**er** | — |

**c) Negaciones (kein)**

| Género | Masculino | Neutro | Femenino | Plural |
| :---- | :---- | :---- | :---- | :---- |
| Negación | kein**es** | kein**es** | kein**er** | kein**er** |

---

##### 5.2 Posesivos en genitivo

Similar patrón de *ein*; para **masculino** y **neutro**: **-es**, para **femenino** y **plural**: **-er**.

|  | M | N | F | PL |
| :---- | :---- | :---- | :---- | :---- |
| **1.ª sg (ich)** | mein**es** | mein**es** | mein**er** | mein**er** |
| **2.ª sg (du)** | dein**es** | dein**es** | dein**er** | dein**er** |
| **3.ª sg (er)** | sein**es** | sein**es** | sein**er** | sein**er** |
| **3.ª sg (sie)** | ihr**es** | ihr**es** | ihr**er** | ihr**er** |
| **3.ª sg (es)** | sein**es** | sein**es** | sein**er** | sein**er** |
| **1.ª pl (wir)** | unser**es** | unser**es** | unser**er** | unser**er** |
| **2.ª pl (ihr)** | euer**es** | euer**es** | eur**er** | eur**er** |
| **3.ª pl (sie)** | ihr**es** | ihr**es** | ihr**er** | ihr**er** |
| **Formal (Sie)** | Ihr**es** | Ihr**es** | Ihr**er** | Ihr**er** |

---

##### 5.3 Declinación de adjetivos (genitivo)

Ejemplo con artículo definido + adjetivo **groß** + sustantivo (que también lleva “-s”/“-es” en M/N).

|  | M (des Hundes) | N (des Hauses) | F (der Katze) | PL (der Hunde) |
| :---- | :---- | :---- | :---- | :---- |
| **(todas las personas)** | d**es** groß**en** Hund**es** | d**es** groß**en** Haus**es** | d**er** groß**en** Katze | d**er** groß**en** Hunde |

Con artículo definido en genitivo, el adjetivo va en **-en** casi siempre.

---

##### 5.4 Declinación de adjetivos con posesivos (genitivo)

Ejemplo: **mein + groß + sustantivo**.  
En masculino/neutro, el sustantivo lleva **-s**/**-es** adicional.

|  | M (… Hundes) | N (… Hauses) | F (… Katze) | PL (… Hunde) |
| :---- | :---- | :---- | :---- | :---- |
| **1.ª sg (ich)** | mein**es** groß**en** Hund**es** | mein**es** groß**en** Haus**es** | mein**er** groß**en** Katze | mein**er** groß**en** Hunde |
| **2.ª sg (du)** | dein**es** groß**en** Hundes | dein**es** groß**en** Hauses | dein**er** groß**en** Katze | dein**er** groß**en** Hunde |
| **3.ª sg (er)** | sein**es** groß**en** Hundes | sein**es** groß**en** Hauses | sein**er** groß**en** Katze | sein**er** groß**en** Hunde |
| **3.ª sg (sie)** | ihr**es** groß**en** Hundes | ihr**es** groß**en** Hauses | ihr**er** groß**en** Katze | ihr**er** groß**en** Hunde |
| **3.ª sg (es)** | sein**es** groß**en** Hundes | sein**es** groß**en** Hauses | sein**er** groß**en** Katze | sein**er** groß**en** Hunde |
| **1.ª pl (wir)** | unser**es** groß**en** Hundes | unser**es** groß**en** Hauses | unser**er** groß**en** Katze | unser**er** groß**en** Hunde |
| **2.ª pl (ihr)** | euer**es** groß**en** Hundes | euer**es** groß**en** Hauses | eur**er** groß**en** Katze | eur**er** groß**en** Hunde |
| **3.ª pl (sie)** | ihr**es** groß**en** Hundes | ihr**es** groß**en** Hauses | ihr**er** groß**en** Katze | ihr**er** groß**en** Hunde |
| **Formal (Sie)** | Ihr**es** groß**en** Hundes | Ihr**es** groß**en** Hauses | Ihr**er** groß**en** Katze | Ihr**er** groß**en** Hunde |

---

#### Apuntes finales

1. **Pronombres personales**: revisa en la primera tabla (caso * persona) para no confundir “sie” (ella) con “sie” (ellas) o “Sie” (formal).

2. **Determinantes**:

   * Artículos definidos (der, die, das)

   * Artículos indefinidos (ein, eine)

   * Negaciones (kein, keine)

3. **Posesivos**: se declinan **como** los artículos indefinidos (ein).

4. **Declinación de adjetivos**:

   * **Débil (weak)**: tras artículo definido o demostrativos con terminación clara.

   * **Fuerte (strong)**: sin determinante o tras ciertos cuantificadores sin terminación.

   * **Mixta (mixed)**: tras artículo indefinido, “kein” o posesivos.

5. En **dativo plural** aparece la terminación “-n” en el sustantivo (si no la tiene).

6. En **genitivo** masc./neutro el sustantivo suele llevar “-s” o “-es”.

Este “Cheat Sheet” abarca las **formas esenciales** en tablas, resaltando las terminaciones más importantes (**-e, -en, -er, -es, -em**). Con esto podrás construir y reconocer la mayoría de estructuras declinadas en alemán. ¡Viel Erfolg!



---

## Parte 7 — Fuentes revisadas y no incluidas

Para que la decisión de qué entró en este documento sea trazable, estas dos fuentes
del proyecto se revisaron pero **no** se incorporaron:

- **`Gramatica_alemana.md`** (454 KB, 9 módulos, A1→B1). Es una extracción OCR/PDF
  curada que cubre exactamente los mismos temas que los archivos `001-051`, pero en
  formato más crudo (con comentarios `<!-- origen_pdf: p. X -->` de trazabilidad al
  PDF original) y sin el formato ya optimizado "para Parser PWA" que sí tienen los
  archivos `001-051` (con sus bloques `🎯 Resumen`, `📚 Vocabulario`, `🧪 Tarjetas de
  Práctica`). Se excluye por redundancia — los archivos `001-051` son la versión
  limpia y ya lista para consumir de este mismo contenido. Si en algún momento un
  tema de `001-051` resulta incompleto frente al original, `Gramatica_alemana.md`
  es el lugar donde buscar el detalle faltante.
- **`Aleman_docx.md`** (89 KB). Son tus propios apuntes de clase en formato "Cheat
  Sheet" (Clase 1 a Clase 9, más un resumen de tiempos verbales y de géneros/casos).
  Se excluye por redundancia con la Parte 2 (núcleo A1) y la Parte 5 (gramática
  detallada), que cubren el mismo contenido de forma más estructurada. Puede tener
  valor si quieres recuperar matices o ejemplos concretos tal como se explicaron en
  tu clase real — en ese caso vale la pena revisarlo aparte para esos temas puntuales
  en vez de fusionarlo aquí completo.

Ambas quedan intactas en `/mnt/project/` por si se necesita rescatar algo puntual.
