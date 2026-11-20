# Guía Markdown para app didáctica: Goethe-Zertifikat A1 y telc Deutsch A1

**Propósito:** este archivo está diseñado como base de conocimiento para construir una aplicación HTML didáctica personal para aprender alemán A1 y preparar los exámenes **Goethe-Zertifikat A1: Start Deutsch 1** y **Start Deutsch 1 / telc Deutsch A1**.

**Idioma de apoyo:** español.  
**Idioma objetivo:** alemán A1.  
**Uso recomendado:** importar este `.md` en Claude, NotebookLM, Cursor, VS Code o cualquier generador de app HTML/JS para convertirlo en módulos interactivos, tarjetas, quizzes, ejercicios de escritura y simuladores de speaking.

---

## 0. Fuentes oficiales consultadas

> Este documento resume y reorganiza información oficial. No copia tests completos ni sustituye las páginas oficiales. Para practicar el formato real, descarga siempre los materiales oficiales.

### Goethe-Institut

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

### telc

- telc — **Start Deutsch 1 / telc Deutsch A1**  
  https://www.telc.net/sprachpruefungen/zertifikatspruefung/deutsch/start-deutsch-1-/-telc-deutsch-a1/
- telc — **Start German 1 / telc German A1**  
  https://www.telc.net/en/language-examinations/certificate-exams/german/start-german1-telc-german-a1/
- telc — **Übungstest / mock exam download area**  
  disponible desde la página oficial anterior.

---

## 1. Resumen ejecutivo para construir la app

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

## 2. Comparación rápida Goethe A1 vs telc A1

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

## 3. Qué significa A1 en términos prácticos

Un estudiante A1 debe poder:

- entender y usar expresiones cotidianas muy frecuentes;
- presentarse a sí mismo y presentar a otra persona;
- preguntar y responder sobre información personal básica;
- comunicarse de forma simple si la otra persona habla despacio, claro y ayuda;
- manejar situaciones básicas: comprar, pedir, preguntar direcciones, dar datos, entender horarios, leer avisos.

### Traducción a objetivos de app

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

# PARTE A — ESTRUCTURA DEL EXAMEN

---

## 4. Goethe-Zertifikat A1: Start Deutsch 1

### 4.1 Estructura general

El examen Goethe A1 para adultos tiene cuatro partes:

1. **Hören** — comprensión auditiva.
2. **Lesen** — comprensión lectora.
3. **Schreiben** — escritura.
4. **Sprechen** — examen oral en grupo.

### 4.2 Goethe A1 — Hören

**Duración aproximada:** 20 minutos.  
**Formato típico:** tres partes.  
**Textos:** conversaciones muy breves, mensajes telefónicos, anuncios públicos, avisos de tren/aeropuerto/tienda, diálogos de compra o cita.

#### Tipos de tarea

| Parte | Qué escucha el candidato | Tipo de respuesta | Qué entrena |
|---|---|---|---|
| Hören Teil 1 | Conversaciones breves | Selección múltiple a/b/c | Números, precios, horas, lugares, objetos. |
| Hören Teil 2 | Anuncios o avisos públicos | Richtig/Falsch | Captar la instrucción principal. |
| Hören Teil 3 | Mensajes breves | Selección múltiple a/b/c | Datos concretos: día, hora, teléfono, objeto, lugar. |

#### Contenidos que debes entrenar

- números cardinales: 0–1000;
- precios: 1,50 €, 19,95 €, 120 €;
- horarios: halb fünf, Viertel nach drei, 15 Uhr, um 8.30 Uhr;
- días y fechas: Montag, am Freitag, der 12. Mai;
- lugares: Bahnhof, Flughafen, Supermarkt, Arztpraxis, Schule, Büro;
- verbos básicos en presente: kommen, gehen, fahren, kaufen, kosten, warten, treffen;
- expresiones de cortesía: Entschuldigung, bitte, danke, gern, tut mir leid.

#### Mecánica didáctica para app

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

#### Ejemplos originales para practicar

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

### 4.3 Goethe A1 — Lesen

**Duración aproximada:** 25 minutos.  
**Formato típico:** tres partes.  
**Textos:** notas, emails, carteles, avisos, páginas web simples, anuncios, horarios.

#### Tipos de tarea

| Parte | Texto | Tipo de respuesta | Habilidad central |
|---|---|---|---|
| Lesen Teil 1 | Dos textos cortos tipo email/nota | Richtig/Falsch | Entender información explícita. |
| Lesen Teil 2 | Anuncios, webs o informaciones breves | Matching o a/b | Elegir dónde encontrar información. |
| Lesen Teil 3 | Carteles/avisos/señales | Richtig/Falsch | Entender instrucciones y prohibiciones. |

#### Contenidos que debes entrenar

- mensajes personales: Einladung, Termin, Absage, Bitte;
- avisos públicos: Rauchen verboten, Öffnungszeiten, Eingang, Ausgang;
- información práctica: precios, horarios, direcciones, habitaciones, trenes;
- webs simples: Kontakt, Preise, Öffnungszeiten, Kurse, Buchung;
- conectores simples: und, oder, aber, denn, dann;
- negación: nicht, kein/keine;
- vocabulario de lugares y servicios.

#### Mecánica didáctica para app

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

#### Ejemplo original

Texto:

> Hallo Marta,  
> ich komme am Samstag um 18 Uhr in Berlin an. Kannst du mich am Bahnhof abholen? Ich habe nur einen kleinen Koffer. Viele Grüße, Leo

Pregunta: Leo kommt am Sonntag nach Berlin.  
Respuesta: Falsch.

Pregunta: Leo bittet Marta um Hilfe.  
Respuesta: Richtig.

---

### 4.4 Goethe A1 — Schreiben

**Duración aproximada:** 20 minutos.  
**Formato típico:** dos partes.

| Parte | Tarea | Qué evalúa |
|---|---|---|
| Schreiben Teil 1 | Completar un formulario | Datos personales, dirección, fecha, número, nombres. |
| Schreiben Teil 2 | Escribir un mensaje corto de unas 30 palabras | Saludo, motivo, información/pregunta/petición, despedida. |

#### Qué debe dominar el estudiante

- escribir datos personales sin errores graves: Name, Vorname, Adresse, Geburtsdatum, Telefonnummer;
- usar mayúsculas en sustantivos alemanes;
- saludar y despedirse;
- escribir frases cortas con verbo en posición 2;
- formular preguntas simples;
- pedir información o ayuda;
- responder a invitaciones, citas o situaciones simples.

#### Plantilla base de mensaje A1

```text
Liebe/r [Name], / Sehr geehrte Damen und Herren,

ich möchte [situación / motivo].
Ich habe eine Frage: [pregunta].
Können Sie mir bitte [petición]?

Vielen Dank.
Viele Grüße / Mit freundlichen Grüßen
[Nombre]
```

#### Frases útiles

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

#### Ejercicio original

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

### 4.5 Goethe A1 — Sprechen

**Duración aproximada:** 15 minutos.  
**Formato:** examen oral en grupo.  
**Partes:** tres.

| Parte | Objetivo | Ejemplo |
|---|---|---|
| Teil 1 | Presentarse | Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobby. |
| Teil 2 | Pedir y dar información | Thema: Essen und Trinken. Karte: Frühstück. |
| Teil 3 | Formular una petición y reaccionar | “Geben Sie mir bitte das Buch?” — “Ja, gern.” |

#### Presentación personal base

```text
Guten Tag. Mein Name ist Jorge.
Ich bin 35 Jahre alt.
Ich komme aus Chile.
Ich wohne in Köln.
Ich spreche Spanisch, Englisch und ein bisschen Deutsch.
Ich arbeite als Data und Analytics Engineer.
Meine Hobbys sind Sport, Musik und Reisen.
```

#### Preguntas frecuentes en Teil 1

| Alemán | Español | Respuesta modelo |
|---|---|---|
| Wie heißen Sie? | ¿Cómo se llama usted? | Ich heiße Jorge. |
| Woher kommen Sie? | ¿De dónde viene? | Ich komme aus Chile. |
| Wo wohnen Sie? | ¿Dónde vive? | Ich wohne in Köln. |
| Welche Sprachen sprechen Sie? | ¿Qué idiomas habla? | Ich spreche Spanisch und Englisch. |
| Was sind Ihre Hobbys? | ¿Cuáles son sus hobbies? | Meine Hobbys sind Sport und Musik. |
| Was sind Sie von Beruf? | ¿Cuál es su profesión? | Ich bin Data Analyst. |

#### Teil 2: pedir información

Estructuras clave:

```text
Was essen Sie gern?
Trinken Sie gern Kaffee?
Wann frühstücken Sie?
Wo kaufen Sie Brot?
Wie viel kostet das?
Haben Sie ...?
```

#### Teil 3: petición y reacción

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

## 5. Start Deutsch 1 / telc Deutsch A1

### 5.1 Estructura general

El examen telc Deutsch A1 / Start Deutsch 1 mide las mismas competencias A1. Según la información oficial de telc, incluye tareas de lectura, escucha, elementos de lengua, escritura y speaking; la página oficial describe una parte escrita con **Hören** y **Lesen und Schreiben**, y una parte oral de **Sprechen**.

### 5.2 telc A1 — distribución típica

| Bloque | Subtest | Partes | Duración aproximada | Puntos |
|---|---|---:|---:|---:|
| Schriftliche Prüfung | Hören | 3 | 20 min | 15 |
| Schriftliche Prüfung | Lesen und Schreiben | 3 + 2 | 45 min | 30 |
| Mündliche Prüfung | Sprechen | 3 | 15 min | 15 |
| Total | — | — | aprox. 90 min incluyendo oral | 60 |

> Nota: telc puede incluir formalidades administrativas antes del bloque escrito. La app debe centrarse en las tareas lingüísticas.

### 5.3 telc A1 — puntuación orientativa

| Puntos | Predicado |
|---:|---|
| 54–60 | sehr gut |
| 48–53,5 | gut |
| 42–47,5 | befriedigend |
| 36–41,5 | ausreichend |
| 0–35,5 | teilgenommen / no suficiente |

Regla práctica: para aprobar, apunta a superar con seguridad los 36 puntos, pero en entrenamiento la app debe considerar “zona segura” desde 42 puntos.

### 5.4 telc A1 — Writing

En telc, el writing suele tener:

1. **Formulario o datos escritos**: completar información a partir de una situación.
2. **Mensaje corto**: escribir un texto breve con varios puntos obligatorios.

Criterios típicos de evaluación:

- cumplimiento de los puntos solicitados;
- claridad y comprensión;
- formato adecuado: saludo, cierre, tono apropiado;
- errores tolerables si no impiden entender.

### 5.5 telc A1 — Speaking

Partes típicas:

| Parte | Función | Ejemplo de microhabilidad |
|---|---|---|
| Teil 1 | Presentarse | decir nombre, país, ciudad, trabajo, idiomas; deletrear; decir números. |
| Teil 2 | Pedir y dar información | preguntar sobre un tema cotidiano. |
| Teil 3 | Formular peticiones y reaccionar | pedir objeto/acción y responder. |

---

# PARTE B — CONTENIDOS LINGÜÍSTICOS A1

---

## 6. Mapa global de contenidos A1

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

## 7. Pronunciación y ortografía funcional

### 7.1 Letras problemáticas

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

### 7.2 Alfabeto y deletreo

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

#### Actividad de app

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

## 8. Números, precios, horarios y fechas

### 8.1 Números cardinales

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

### 8.2 Precios

| Alemán | Español |
|---|---|
| Das kostet zehn Euro. | Eso cuesta diez euros. |
| neunzehn Euro fünfundneunzig | 19,95 € |
| drei Euro fünfzig | 3,50 € |
| ein Euro zwanzig | 1,20 € |
| Wie viel kostet das? | ¿Cuánto cuesta eso? |
| Was kostet der Pullover? | ¿Cuánto cuesta el suéter? |

### 8.3 Horas

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

### 8.4 Fechas y días

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

## 9. Pronombres personales

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

### Ejemplos

```text
Ich wohne in Köln.
Du kommst aus Chile.
Er arbeitet heute.
Sie lernt Deutsch.
Wir gehen ins Kino.
Sie sprechen Deutsch.
```

---

## 10. Verbos esenciales A1

### 10.1 Sein

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

### 10.2 Haben

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

### 10.3 Verbos regulares modelo: machen

| Persona | Conjugación |
|---|---|
| ich | mache |
| du | machst |
| er/sie/es | macht |
| wir | machen |
| ihr | macht |
| sie/Sie | machen |

### 10.4 Verbos frecuentes para examen A1

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

### 10.5 Verbos separables básicos

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

## 11. Modalverbos básicos

| Modal | Español | Ejemplo |
|---|---|---|
| können | poder / saber hacer | Ich kann Deutsch sprechen. |
| müssen | tener que | Ich muss heute arbeiten. |
| wollen | querer | Ich will nach Berlin fahren. |
| möchten | quisiera | Ich möchte einen Kaffee. |
| dürfen | poder / tener permiso | Darf ich hier rauchen? |
| sollen | deber / se espera que | Sie sollen bitte warten. |

### Estructura

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

## 12. Artículos y casos básicos

### 12.1 Género de sustantivos

| Género | Artículo definido | Artículo indefinido | Ejemplo |
|---|---|---|---|
| masculino | der | ein | der Mann, ein Mann |
| femenino | die | eine | die Frau, eine Frau |
| neutro | das | ein | das Kind, ein Kind |
| plural | die | — | die Kinder |

### 12.2 Nominativo

Usado para el sujeto.

```text
Der Mann kommt.
Die Frau arbeitet.
Das Kind spielt.
Die Kinder lernen.
```

### 12.3 Acusativo

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

## 13. Negación: nicht y kein

### 13.1 Kein

Usa `kein` para negar sustantivos con artículo indefinido o sin artículo.

```text
Ich habe ein Auto. → Ich habe kein Auto.
Das ist eine Frage. → Das ist keine Frage.
Ich trinke Kaffee. → Ich trinke keinen Kaffee.
```

### 13.2 Nicht

Usa `nicht` para negar verbos, adjetivos, frases o información específica.

```text
Ich komme nicht.
Das ist nicht teuer.
Ich wohne nicht in Berlin.
Heute kann ich nicht.
```

### Actividad para app

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

## 14. Orden de la oración

### 14.1 Oración afirmativa simple

```text
Ich wohne in Köln.
Wir lernen Deutsch.
Der Kurs beginnt um neun Uhr.
```

Regla: el verbo conjugado va en posición 2.

### 14.2 Pregunta sí/no

```text
Kommen Sie aus Chile?
Haben Sie Zeit?
Möchten Sie Kaffee?
```

Regla: el verbo conjugado va en posición 1.

### 14.3 Preguntas W

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

## 15. Preposiciones frecuentes A1

### 15.1 Tiempo

| Preposición | Uso | Ejemplo |
|---|---|---|
| am | días / partes del día | am Montag, am Abend |
| um | hora exacta | um 8 Uhr |
| im | meses / estaciones | im Januar, im Sommer |
| von ... bis | desde ... hasta | von 9 bis 17 Uhr |
| nach | después de / hacia ciudad/país sin artículo | nach dem Kurs, nach Berlin |
| vor | antes de | vor dem Kurs |

### 15.2 Lugar y dirección

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

### 15.3 Contracciones útiles

| Forma | Significado |
|---|---|
| im | in dem |
| am | an dem |
| zum | zu dem |
| zur | zu der |
| ins | in das |

---

## 16. Imperativo y peticiones

En el examen oral, muchas tareas se resuelven con peticiones simples.

### 16.1 Petición con Sie

```text
Öffnen Sie bitte das Fenster.
Schließen Sie bitte die Tür.
Geben Sie mir bitte den Stift.
Warten Sie bitte einen Moment.
```

### 16.2 Petición con können

```text
Können Sie mir bitte helfen?
Können Sie das bitte wiederholen?
Können Sie bitte langsamer sprechen?
```

### 16.3 Reacciones

```text
Ja, gern.
Natürlich.
Bitte schön.
Einen Moment, bitte.
Tut mir leid, ich habe keinen Stift.
Leider nicht.
```

---

# PARTE C — VOCABULARIO POR DOMINIOS

---

## 17. Personas, identidad y datos personales

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

### Frases

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

## 18. Familia y relaciones

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

### Frases

```text
Haben Sie Kinder?
Ich habe keine Kinder.
Meine Familie lebt in Chile.
Mein Bruder wohnt in Santiago.
```

---

## 19. Casa y vivienda

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

### Frases

```text
Ich suche eine Wohnung.
Die Wohnung ist teuer.
Das Zimmer ist frei.
Haben Sie ein Zimmer frei?
```

---

## 20. Comida y bebida

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

### Frases

```text
Ich hätte gern einen Kaffee.
Was möchten Sie trinken?
Die Rechnung, bitte.
Ich esse kein Fleisch.
Haben Sie Wasser ohne Gas?
```

---

## 21. Compras y dinero

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

### Frases

```text
Was kostet das?
Ich bezahle mit Karte.
Kann ich bar bezahlen?
Der Supermarkt ist geschlossen.
Ich suche eine Apotheke.
```

---

## 22. Transporte y ciudad

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

### Frases

```text
Wann fährt der Zug nach Köln?
Der Bus kommt um 8 Uhr.
Ich steige am Bahnhof aus.
Wo ist die Haltestelle?
Ein Ticket nach Bonn, bitte.
```

---

## 23. Tiempo, calendario y citas

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

### Frases

```text
Haben Sie morgen Zeit?
Der Termin ist am Freitag.
Ich komme um 15 Uhr.
Am Wochenende habe ich frei.
```

---

## 24. Salud y cuerpo

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

### Frases

```text
Ich bin krank.
Ich habe Kopfschmerzen.
Ich brauche einen Termin beim Arzt.
Gibt es hier eine Apotheke?
```

---

## 25. Trabajo y curso

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

### Frases

```text
Ich arbeite im Büro.
Ich habe heute Deutschkurs.
Der Kurs beginnt um 9 Uhr.
Meine Kollegin kommt aus Spanien.
```

---

## 26. Ocio, deporte y viajes

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

### Frases

```text
Ich mache gern Sport.
Am Wochenende gehe ich ins Kino.
Ich reise gern.
Ich möchte ein Zimmer buchen.
```

---

# PARTE D — FUNCIONES COMUNICATIVAS DEL EXAMEN

---

## 27. Presentarse

### Plantilla mínima

```text
Guten Tag.
Ich heiße [Name].
Ich komme aus [Land].
Ich wohne in [Stadt].
Ich spreche [Sprachen].
Ich bin [Beruf].
Meine Hobbys sind [Hobbys].
```

### Plantilla extendida

```text
Guten Tag. Mein Name ist [Name].
Ich bin [Alter] Jahre alt.
Ich komme aus [Land], aber ich wohne jetzt in [Stadt].
Ich spreche [Sprache 1], [Sprache 2] und ein bisschen Deutsch.
Ich arbeite als [Beruf].
In meiner Freizeit mache ich gern [Hobby 1] und [Hobby 2].
```

### Checklist

- [ ] dije mi nombre;
- [ ] dije de dónde vengo;
- [ ] dije dónde vivo;
- [ ] dije idiomas;
- [ ] dije trabajo/estudios;
- [ ] dije un hobby;
- [ ] pronuncié claro y lento.

---

## 28. Pedir información

### Estructuras clave

```text
Wie viel kostet ...?
Wann beginnt ...?
Wo ist ...?
Wie komme ich zu ...?
Haben Sie ...?
Gibt es ...?
Können Sie mir bitte sagen, ...?
```

### Ejemplos

```text
Wie viel kostet der Deutschkurs?
Wann beginnt der Film?
Wo ist der Bahnhof?
Gibt es hier eine Apotheke?
Haben Sie ein Zimmer frei?
Können Sie mir bitte helfen?
```

---

## 29. Dar información

```text
Der Kurs beginnt um 9 Uhr.
Das kostet 20 Euro.
Der Bahnhof ist links.
Ich wohne in Köln.
Meine Telefonnummer ist 0176 12345678.
Das Geschäft ist heute geschlossen.
```

---

## 30. Pedir ayuda o formular una petición

```text
Helfen Sie mir bitte.
Wiederholen Sie bitte.
Sprechen Sie bitte langsam.
Schreiben Sie das bitte auf.
Öffnen Sie bitte das Fenster.
Geben Sie mir bitte den Stift.
```

---

## 31. Reaccionar

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

## 32. Invitar, aceptar y rechazar

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

## 33. Escribir un email corto

### Estructura universal A1

| Parte | Contenido | Ejemplos |
|---|---|---|
| Saludo | formal o informal | Liebe Maria, / Sehr geehrte Damen und Herren, |
| Motivo | por qué escribo | Ich schreibe, weil ... / Ich möchte ... |
| Punto 1 | información/pregunta | Ich komme am Samstag. |
| Punto 2 | pregunta/petición | Können Sie mir bitte ...? |
| Punto 3 | pregunta adicional | Was kostet ...? |
| Cierre | gracias/despedida | Vielen Dank. Viele Grüße. |

### Banco de inicios

```text
Ich schreibe, weil ich Informationen brauche.
Ich möchte einen Deutschkurs machen.
Ich möchte ein Zimmer buchen.
Ich kann leider nicht kommen.
Ich habe eine Frage.
```

### Banco de cierres

```text
Vielen Dank.
Danke für Ihre Hilfe.
Ich freue mich auf Ihre Antwort.
Viele Grüße
Mit freundlichen Grüßen
```

---

# PARTE E — TIPOS DE EJERCICIOS PARA LA APP

---

## 34. Taxonomía de ejercicios

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

## 35. Modelo de datos sugerido para una app HTML

### 35.1 Flashcard

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

### 35.2 Multiple choice

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

### 35.3 Reading true/false

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

### 35.4 Writing prompt

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

### 35.5 Speaking card

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

# PARTE F — BANCO INICIAL DE EJERCICIOS ORIGINALES

---

## 36. Flashcards esenciales

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

## 37. Ejercicios de gramática

### 37.1 Sein o haben

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

### 37.2 Artículo correcto

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

### 37.3 Nicht o kein

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

### 37.4 Modal + infinitivo

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

## 38. Ejercicios de lectura

### 38.1 Email corto

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

### 38.2 Cartel

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

### 38.3 Matching necesidad → lugar

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

## 39. Ejercicios de escritura

### 39.1 Formulario

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

### 39.2 Email formal

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

### 39.3 Email informal

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

## 40. Ejercicios de speaking

### 40.1 Teil 1 — presentación

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

### 40.2 Teil 2 — pedir información

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

### 40.3 Teil 3 — peticiones

| Tarjeta | Petición | Reacción positiva | Reacción negativa |
|---|---|---|---|
| Fenster | Öffnen Sie bitte das Fenster. | Ja, gern. | Tut mir leid, es ist kalt. |
| Tür | Schließen Sie bitte die Tür. | Natürlich. | Einen Moment, bitte. |
| Stift | Geben Sie mir bitte den Stift. | Bitte schön. | Tut mir leid, ich habe keinen Stift. |
| Wasser | Bringen Sie mir bitte Wasser. | Ja, gern. | Leider habe ich kein Wasser. |
| Handy | Geben Sie mir bitte Ihr Handy. | Bitte. | Tut mir leid, das geht nicht. |

---

# PARTE G — ROADMAP DE APP

---

## 41. Estructura recomendada de la aplicación HTML

### Pantallas principales

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

## 42. Diseño de progreso

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

## 43. Reglas de feedback didáctico

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

## 44. Plan de estudio de 4 semanas usando la app

### Semana 1 — Base comunicativa

- Presentación personal.
- Números, horas, precios.
- Sein/haben.
- Vocabulario de identidad, familia, ciudad.
- 10 minutos diarios de flashcards.

Meta: poder presentarse y entender datos básicos.

### Semana 2 — Vida cotidiana

- Compras, comida, transporte.
- Preguntas W.
- Artículos y acusativo básico.
- Hören con precios/horarios.
- Lesen de carteles y anuncios.

Meta: entender información práctica.

### Semana 3 — Producción escrita y oral

- Emails cortos.
- Formularios.
- Peticiones con Sie.
- Modalverbos.
- Speaking Teil 2 y Teil 3.

Meta: producir frases A1 claras.

### Semana 4 — Simulación de examen

- Simulacro Goethe.
- Simulacro telc.
- Corrección de debilidades.
- Repetición intensiva de speaking.
- 3 emails cronometrados.

Meta: llegar a zona segura.

---

# PARTE H — PROMPT PARA GENERAR LA APP HTML

---

## 45. Prompt base para Claude / Cursor / ChatGPT

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

## 46. Checklist de cobertura para la app

### Goethe A1

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

### telc A1

- [ ] Hören: 3 partes.
- [ ] Lesen und Schreiben: lectura + formularios + mensaje.
- [ ] Sprechen: 3 partes.
- [ ] Puntuación total sobre 60.
- [ ] Zona segura desde 42 puntos.

---

# PARTE I — ERRORES FRECUENTES DE HISPANOHABLANTES

---

## 47. Errores de pronunciación

| Error | Corrección |
|---|---|
| leer `sp` como “sp” español | al inicio suele sonar “shp”: sprechen |
| leer `st` como “st” español | al inicio suele sonar “sht”: Stadt |
| confundir `ei` y `ie` | mein = main; sieben = siiben |
| olvidar umlaut | schon ≠ schön; funf debe ser fünf |
| pronunciar `z` como z española | Zeit suena “tsait” |

---

## 48. Errores de gramática

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

## 49. Errores de Schreiben

| Error | Consecuencia | Solución |
|---|---|---|
| No escribir saludo | Pierde adecuación textual | Añadir Liebe/r... o Sehr geehrte... |
| No responder los 3 puntos | Pierde contenido | Checklist antes de enviar. |
| Escribir demasiado complejo | Más errores | Frases cortas A1. |
| Olvidar despedida | Texto incompleto | Viele Grüße / Mit freundlichen Grüßen. |
| Preguntas sin signo o verbo mal puesto | Menor claridad | Wann beginnt der Kurs? |

---

## 50. Errores de Sprechen

| Error | Solución |
|---|---|
| Hablar demasiado rápido | Habla lento y claro. |
| Intentar frases largas | Usa frases cortas. |
| Bloquearse si no entiendes | Di: Können Sie bitte wiederholen? |
| No reaccionar en Teil 3 | Memoriza 5 reacciones: Ja, gern; Natürlich; Bitte schön; Tut mir leid; Einen Moment. |
| No saber deletrear | Practica alfabeto con tu nombre, apellido, ciudad y email. |

---

# PARTE J — CONTENIDO LISTO PARA IMPORTAR COMO DATASET

---

## 51. Dataset inicial de speaking cards

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

## 52. Dataset inicial de grammar quiz

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

## 53. Dataset inicial de reading items

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

## 54. Dataset inicial de writing prompts

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

## 55. Dataset inicial de vocabulario mínimo

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

# PARTE K — QUÉ NO HACER

---

## 56. No sobrecomplicar el A1

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

## 57. Prioridad de implementación MVP

### MVP 1 — Muy útil y simple

- Flashcards por categoría.
- Quiz de gramática básica.
- Reading true/false.
- Writing con checklist.
- Speaking cards.
- Progreso local.

### MVP 2 — Más didáctico

- TTS para Hören.
- Simulador Goethe/TELC.
- Repaso espaciado.
- Modo errores frecuentes.
- Banco ampliado de vocabulario.

### MVP 3 — Más entretenido

- Rachas.
- Logros.
- “Boss fight” por sección del examen.
- Modo contra reloj.
- Estadísticas por tema.

---

## 58. Resumen final para app

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

