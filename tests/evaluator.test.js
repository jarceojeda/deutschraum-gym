const test = require('node:test'), assert = require('node:assert/strict');
const { DG, dataset } = require('./helpers.js');
const E = DG.evaluator, I = DG.items;
const store = I.createStore(dataset().data);
const byId = id => { const it = store.byId[id]; assert.ok(it, 'no existe ' + id); return it; };
const ev = (id, r, o) => E.evaluate(byId(id), r, o);

/* ---------- escritura: ä/ö/ü/ß ---------- */
test('write: la forma exacta y las variantes de accept[] son correctas (hattest / hattst)', () => {
  assert.equal(ev('gx-verb-haben-praeteritum-du', 'hattest').verdict, 'correct');
  const r = ev('gx-verb-haben-praeteritum-du', 'hattst');
  assert.equal(r.verdict, 'correct'); assert.equal(r.alt, true);
});
test('write: ß se acepta exacto y «ss» como equivalencia de teclado con nota', () => {
  const id = 'gx-verb-heißen-praeteritum-du';
  assert.equal(ev(id, 'hießest').verdict, 'correct');
  const r = ev(id, 'hiessest'); assert.equal(r.verdict, 'correct'); assert.deepEqual(r.notes, ['translit']);
  assert.equal(ev(id, 'hiessest', { strictDiacritics: true }).verdict, 'almost');
});
test('write: formas cerradas NO perdonan la diéresis (fährt ≠ fahrt) ni una letra', () => {
  const it = store.all.find(i => i.module === 'verben' && i.skill === 'praesens' && i.answer === 'fährt');
  assert.ok(it, 'falta un «fährt» en praesens');
  assert.equal(E.evaluate(it, 'fährt').verdict, 'correct');
  assert.equal(E.evaluate(it, 'faehrt').verdict, 'correct');          // teclado sin ä
  assert.equal(E.evaluate(it, 'fahrt').verdict, 'wrong');             // es OTRA forma (ihr fahrt)
  assert.equal(E.evaluate(it, 'fährst').verdict, 'wrong');
  assert.equal(E.evaluate(it, 'FÄHRT').verdict, 'correct');           // mayúsculas toleradas
});
test('write: den/dem/der/des jamás se confunden por «similitud»', () => {
  const it = byId('d244-decl-001'); // den
  ['dem', 'der', 'des', 'die', 'denn'].forEach(x => assert.equal(E.evaluate(it, x).verdict, 'wrong', x));
  assert.equal(E.evaluate(it, 'den').verdict, 'correct');
});
test('write: NFD (a + diéresis combinante) del teclado equivale a NFC', () => {
  const it = store.all.find(i => i.answer === 'fährt');
  assert.equal(E.evaluate(it, 'fährt').verdict, 'correct');
});
test('write: mayúsculas — correcto con nota; strictCase → casi', () => {
  const pl = store.all.find(i => i.module === 'artikel' && i.skill === 'plural' && i.answer === 'Namen');
  const a = E.evaluate(pl, 'namen'); assert.equal(a.verdict, 'correct'); assert.deepEqual(a.notes, ['case']);
  assert.equal(E.evaluate(pl, 'namen', { strictCase: true }).verdict, 'almost');
});
test('write: plural (tolerancia none) — diéresis perdida y errata = wrong; ae/oe/ue = correct (2b: ya no hay «casi» en plurales)', () => {
  const pl = store.all.find(i => i.module === 'artikel' && i.skill === 'plural' && /[äöü]/.test(i.answer));
  assert.ok(pl); assert.equal(E.toleranceOf(pl), 'none');
  assert.equal(E.evaluate(pl, pl.answer).verdict, 'correct');
  const noUml = pl.answer.replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u');
  const r = E.evaluate(pl, noUml); assert.equal(r.verdict, 'wrong'); assert.ok(!r.notes.includes('diacritic'));
  assert.equal(E.evaluate(pl, pl.answer.slice(0, -1)).verdict, 'wrong');           // errata de una letra
  const tr = pl.answer.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue');
  assert.equal(E.evaluate(pl, tr).verdict, 'correct');
});
test('P2 plural: Hund→Hunde y Apfel→Äpfel; el lema (singular) es distractor explícito en write', () => {
  const hund = byId('gx-art-pl-cs-a1-v4-884'), apfel = byId('gx-art-pl-noun-der-apfel-manzana');
  assert.equal(E.evaluate(hund, 'Hunde').verdict, 'correct');
  const h = E.evaluate(hund, 'Hund'); assert.equal(h.verdict, 'wrong'); assert.equal(h.distractor, 'Hund'); assert.ok(h.notes.includes('distractor'));
  assert.equal(E.evaluate(hund, 'hund').distractor, 'Hund', 'el distractor ignora mayúsculas');
  assert.equal(E.evaluate(apfel, 'Äpfel').verdict, 'correct'); assert.equal(E.evaluate(apfel, 'Aepfel').verdict, 'correct');
  const a = E.evaluate(apfel, 'Apfel'); assert.equal(a.verdict, 'wrong'); assert.equal(a.distractor, 'Apfel');
  assert.equal(E.evaluate(apfel, 'Apfeln').verdict, 'wrong'); assert.equal(E.evaluate(apfel, 'Epfel').verdict, 'wrong');
  assert.equal(E.evaluate(hund, 'Hund', { mode: 'touch' }).verdict, 'wrong');
  // dataset: todo plural con lema distinto de la respuesta → el lema es error con distractor; lema = respuesta (Zimmer) sigue siendo correcto
  let n = 0, same = 0;
  store.all.filter(i => i.module === 'artikel' && i.skill === 'plural').forEach(i => {
    const r = E.evaluate(i, i.lemma);
    if (i.accept.includes(i.lemma)) { assert.equal(r.verdict, 'correct', i.id); same++; } else { assert.equal(r.verdict, 'wrong', i.id); assert.equal(r.distractor, i.lemma, i.id); n++; }
  });
  assert.ok(n > 300 && same >= 1, `lema≠plural: ${n}, lema=plural: ${same}`);
});
test('write: respuesta vacía → wrong con nota', () => {
  const r = E.evaluate(byId('d244-decl-001'), '   '); assert.equal(r.verdict, 'wrong'); assert.deepEqual(r.notes, ['empty']);
});
test('write: un distractor conocido es error real, no «casi»', () => {
  const it = store.all.find(i => i.module === 'konnektoren' && i.skill === 'konnektor-wahl');
  const bad = it.options.find(o => !it.accept.includes(o));
  const r = E.evaluate(it, bad); assert.equal(r.verdict, 'wrong'); assert.equal(r.distractor, bad);
});

/* ---------- accept[], multi_ok ---------- */
test('multi_ok: todas las formas de accept valen (fahren: sein y haben)', () => {
  const it = byId('gx-verb-fahren-aux'); assert.equal(it.multiOk, true);
  assert.equal(E.evaluate(it, 'sein').verdict, 'correct'); assert.equal(E.evaluate(it, 'haben').verdict, 'correct');
  assert.equal(E.evaluate(it, 'haben').alt, true);
  assert.equal(E.evaluate(it, 'sein', { mode: 'touch' }).verdict, 'correct');
  assert.equal(E.evaluate(it, 'haben', { mode: 'touch' }).verdict, 'correct');
});
test('accept[] amplio en partículas: mal / eben / doch valen, ja no', () => {
  const it = byId('gx-konn-partikel-001');
  ['mal', 'eben', 'doch'].forEach(x => assert.equal(E.evaluate(it, x).verdict, 'correct', x));
  assert.equal(E.evaluate(it, 'ja').verdict, 'wrong');
});

/* ---------- táctil ---------- */
test('touch: sólo la opción válida; case-sensitive tal cual las opciones', () => {
  const it = byId('d244-decl-001');
  assert.equal(E.evaluate(it, 'den', { mode: 'touch' }).verdict, 'correct');
  assert.equal(E.evaluate(it, 'dem', { mode: 'touch' }).verdict, 'wrong');
  assert.equal(E.evaluate(it, 'dem', { mode: 'touch' }).distractor, 'dem');
});

/* ---------- frases ---------- */
test('transform: punto final y coma ausentes no penalizan (nota), pero el orden sí', () => {
  const it = byId('gx-konn-transform-weil-001'); // «… zu Hause, weil ich krank bin.»
  assert.equal(E.evaluate(it, 'Ich bleibe heute zu Hause, weil ich krank bin.').verdict, 'correct');
  assert.equal(E.evaluate(it, 'Ich bleibe heute zu Hause, weil ich krank bin').verdict, 'correct');
  const c = E.evaluate(it, 'Ich bleibe heute zu Hause weil ich krank bin.'); assert.equal(c.verdict, 'correct'); assert.ok(c.notes.includes('punctuation'));
  assert.equal(E.evaluate(it, 'Ich bleibe heute zu Hause weil ich krank bin.', { strictPunct: true }).verdict, 'almost');
  assert.equal(E.evaluate(it, 'Ich bleibe heute zu Hause, weil ich bin krank.').verdict, 'wrong');
});
test('transform: errata en palabra corta (bim/bin) es error; en palabra larga (≥5 letras) es «casi» y no da crédito', () => {
  const it = byId('gx-konn-transform-weil-001');           // «Ich bleibe heute zu Hause, weil ich krank bin.»
  assert.equal(E.evaluate(it, 'Ich bleibe heute zu Hause, weil ich krank bim.').verdict, 'wrong');
  const r = E.evaluate(it, 'Ich bleibe heute zu Hasue, weil ich krank bin.');       // transposición en «Hause» (5 letras)
  assert.equal(r.verdict, 'almost'); assert.equal(r.correct, false); assert.deepEqual(r.notes, ['typo']);
  assert.equal(E.evaluate(it, 'Ich bleibe heute zu Hause, weil ich krank bin.').verdict, 'correct');
});
test('order: fichas en orden correcto, desordenadas (con tileDiff) y texto escrito', () => {
  const it = store.all.find(i => i.type === 'order'); assert.ok(it);
  assert.equal(E.evaluate(it, it.tiles, { mode: 'touch' }).verdict, 'correct');
  const sw = it.tiles.slice(); [sw[0], sw[1]] = [sw[1], sw[0]];
  const r = E.evaluate(it, sw, { mode: 'touch' }); assert.equal(r.verdict, 'wrong');
  assert.equal(r.tileDiff[0], false); assert.equal(r.tileDiff[1], false); assert.equal(r.tileDiff[2], true);
  assert.equal(E.evaluate(it, it.answer).verdict, 'correct');
});
test('order en touch: la coma es una ficha y se exige', () => {
  const it = byId('gx-konn-denn-001');
  const noComma = it.tiles.filter(t => t !== ',');
  assert.equal(E.evaluate(it, noComma, { mode: 'touch' }).verdict, 'wrong');
});

/* ---------- par mínimo ---------- */
test('minimal-pair: ambas partes; una mala → wrong con detalle por parte', () => {
  const it = byId('gx-pair-001');
  const ok = E.evaluate(it, { wo: 'an der', wohin: 'an die' }); assert.equal(ok.verdict, 'correct');
  const sw = E.evaluate(it, { wo: 'an die', wohin: 'an die' }); assert.equal(sw.verdict, 'wrong'); assert.equal(sw.parts.wo.correct, false); assert.equal(sw.parts.wohin.correct, true);
  assert.equal(E.evaluate(it, { wo: 'an der', wohin: 'an die' }, { mode: 'touch' }).verdict, 'correct');
  assert.equal(E.evaluate(it, null).verdict, 'wrong');
});

/* ---------- needs_translation / impersonal en la vista ---------- */
test('view: needs_translation hace visible la traducción; si no, queda oculta', () => {
  const amb = byId('gx-konn-partikel-001'), plain = byId('d244-decl-001');
  const v1 = I.view(amb, 'write'), v2 = I.view(plain, 'write');
  assert.equal(v1.showTranslation, true); assert.ok(v1.translation.length > 3);
  assert.equal(v2.showTranslation, false); assert.equal(v2.translation, '');
});
test('view: touch con options → choice barajado sin perder opciones; order nunca llega resuelto', () => {
  const rng = DG.rng.create(5);
  const it = byId('d244-decl-001'), v = I.view(it, 'touch', rng);
  assert.equal(v.input, 'choice'); assert.deepEqual(v.options.slice().sort(), it.options.slice().sort());
  const o = store.all.find(i => i.type === 'order');
  for (let k = 0; k < 50; k++) { const vv = I.view(o, 'touch', rng); assert.notEqual(DG.text.normSentence(DG.text.joinTiles(vv.tiles)), DG.text.normSentence(o.answer)); }
  const verb = byId('gx-verb-sein-praesens-ich'); assert.equal(I.view(verb, 'touch', rng).input, 'letters');
});
test('impersonal: sólo 3.ª persona en los datos (regnen/geschehen/gelingen)', () => {
  const imp = store.all.filter(i => i.impersonal && (i.skill === 'praesens' || i.skill === 'praeteritum'));
  assert.ok(imp.length >= 8);
  imp.forEach(i => assert.ok(['er_sie_es', 'sie_Sie'].includes(i.person), i.id));
});

/* ---------- propiedades sobre TODO el dataset ---------- */
test('DATASET: answer y cada accept[] evalúan como correct en write; ninguna opción inválida pasa en touch', () => {
  let n = 0;
  store.all.forEach(it => {
    if (it.type === 'minimal-pair') {
      assert.equal(E.evaluate(it, { wo: it.wo.answer, wohin: it.wohin.answer }).verdict, 'correct', it.id);
      assert.equal(E.evaluate(it, { wo: it.wo.answer, wohin: it.wohin.answer }, { mode: 'touch' }).verdict, 'correct', it.id); n++; return;
    }
    it.accept.forEach(a => {
      assert.equal(E.evaluate(it, a).verdict, 'correct', it.id + ' write «' + a + '»'); n++;
      if (it.type !== 'order') assert.equal(E.evaluate(it, a, { mode: 'touch' }).verdict, 'correct', it.id + ' touch');
    });
    if (it.type === 'order') assert.equal(E.evaluate(it, it.tiles, { mode: 'touch' }).verdict, 'correct', it.id);
    if (it.type === 'cloze' && it.options.length) it.options.forEach(o => {
      const want = it.accept.includes(o) ? 'correct' : 'wrong';
      assert.equal(E.evaluate(it, o, { mode: 'touch' }).verdict, want, it.id + ' opción «' + o + '»');
    });
  });
  assert.ok(n > 6000);
});
test('DATASET: en formas cerradas con ä/ö/ü, quitar la diéresis nunca da correct (salvo que esa forma esté en accept)', () => {
  let n = 0;
  store.all.forEach(it => {
    if (it.type !== 'cloze' || E.toleranceOf(it) !== 'none') return;
    it.accept.forEach(a => {
      if (!/[äöü]/.test(a)) return;
      const dropped = a.replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u');
      if (it.accept.some(x => DG.text.fold(x) === DG.text.fold(dropped))) return;
      assert.notEqual(E.evaluate(it, dropped).verdict, 'correct', it.id + ' «' + dropped + '»'); n++;
    });
  });
  assert.ok(n > 300, 'casos comprobados: ' + n);
});

/* ===== 2b · punto 2: «casi» en frases ===== */
const mk = (answer, o) => I.createStore([Object.assign({ id: 'syn-' + Math.abs(answer.length * 31 + answer.charCodeAt(3)), module: 'konnektoren', level: 'A2', type: 'transform', skill: 'transform', pool: 'transform', prompt: 'p', answer, accept: [answer], options: [] }, o || {})]).all[0];
const V = (it, r) => E.evaluate(it, r).verdict;
test('P2 frases: das↔dass, den↔dem, fahrt↔fährt, ihm/ihn, seine/seiner, wenn/wen, denn/den, als/ob = wrong (nunca «casi»)', () => {
  assert.equal(V(mk('Er sagt, dass er kommt.'), 'Er sagt, das er kommt.'), 'wrong');
  assert.equal(V(mk('Er sagt, dass er kommt.'), 'das er kommt'), 'wrong');
  assert.equal(V(mk('Er sagt, das ist gut.'), 'Er sagt, dass ist gut.'), 'wrong');
  assert.equal(V(mk('Der Lehrer gibt dem Mann ein Buch.'), 'Der Lehrer gibt den Mann ein Buch.'), 'wrong');
  assert.equal(V(mk('Der Lehrer gibt dem Mann ein Buch.'), 'gibt den Mann'), 'wrong');
  assert.equal(V(mk('Er fährt morgen nach Berlin.'), 'Er fahrt morgen nach Berlin.'), 'wrong');
  assert.equal(V(mk('Er gibt ihm das Buch.'), 'Er gibt ihn das Buch.'), 'wrong');
  assert.equal(V(mk('Das ist seine Tasche.'), 'Das ist seiner Tasche.'), 'wrong');       // 5 letras, pero en la lista cerrada
  assert.equal(V(mk('Das ist seine Tasche.'), 'Das ist keine Tasche.'), 'wrong');
  assert.equal(V(mk('Wir fragen, wenn wir Zeit haben.'), 'Wir fragen, wen wir Zeit haben.'), 'wrong');
  assert.equal(V(mk('Ich bleibe, denn ich bin krank.'), 'Ich bleibe, den ich bin krank.'), 'wrong');
  assert.equal(V(mk('Ich weiß nicht, ob er kommt.'), 'Ich weiß nicht, als er kommt.'), 'wrong');
  assert.equal(V(mk('Er sagt uns die Wahrheit.'), 'Er sagt euch die Wahrheit.'), 'wrong');
  assert.equal(V(mk('Das ist unsere Idee.'), 'Das ist unseren Idee.'), 'wrong');
});
test('P2 frases: diéresis perdida = wrong también en frases; ae/oe/ue y ß→ss siguen siendo correct', () => {
  const it = mk('Das Mädchen spielt gern im Grünen.');
  assert.equal(V(it, 'Das Madchen spielt gern im Grünen.'), 'wrong');
  assert.equal(V(it, 'Das Mädchen spielt gern im Grunen.'), 'wrong');
  assert.equal(V(it, 'Das Maedchen spielt gern im Gruenen.'), 'correct');
  assert.equal(V(mk('Er schläft sehr lange.'), 'Er schlaft sehr lange.'), 'wrong');
  assert.equal(V(mk('Wir heißen Anna und Tom.'), 'Wir heissen Anna und Tom.'), 'correct');
  assert.equal(E.evaluate(mk('Er schläft sehr lange.', { type: 'order' }), 'Er schlaft sehr lange.').verdict, 'wrong');
});
test('P2 frases: «casi» sólo con 1 palabra distinta de ≥5 letras, OSA ≤1, fuera de la lista cerrada y mismo nº de palabras', () => {
  const it = mk('Wir besuchen die Hauptstadt im Sommer.');
  assert.equal(V(it, 'Wir besuchen die Hauptstadt im Sommer.'), 'correct');
  ['Wir besuchen die Hauptstatd im Sommer.', 'Wir besuchen die Hauptstad im Sommer.', 'Wir besuchen die Hauptstadtt im Sommer.', 'Wir besuchen die Hauptsadt im Sommer.', 'Wir besuchen die Hauptstadt im Sommmer.', 'Wir besuchen die Hauptstadt im Somer.']
    .forEach(r => { const x = E.evaluate(it, r); assert.equal(x.verdict, 'almost', r); assert.equal(x.correct, false); });
  assert.equal(V(it, 'Wir besuchen die Hauptsdatt im Sommer.'), 'wrong', 'OSA 2 en la misma palabra');
  assert.equal(V(it, 'Wir besuchn die Hauptstatd im Sommer.'), 'wrong', 'dos palabras distintas');
  assert.equal(V(it, 'Wir besuchen die Hauptstadt Sommer.'), 'wrong', 'distinto nº de palabras');
  assert.equal(V(it, 'Wir besuchen die Hauptstadtim Sommer.'), 'wrong', 'palabras unidas');
});
test('P2 DATASET: en TODAS las frases (transform/order) el «casi» sólo sale de erratas reales; los errores gramaticales nunca son «casi»', () => {
  const CL = [['dass', 'das'], ['das', 'dass'], ['dem', 'den'], ['den', 'dem'], ['der', 'den'], ['wenn', 'wen'], ['denn', 'den'], ['als', 'ob'], ['ob', 'als'], ['ihm', 'ihn'], ['seine', 'seiner'], ['keine', 'keiner'], ['einen', 'einem']];
  let swaps = 0, umls = 0, typos = 0;
  store.all.filter(i => (i.type === 'transform' || i.type === 'order') && i.accept.length).forEach(it => {
    const a = it.accept[0];
    CL.forEach(([from, to]) => {
      const re = new RegExp('(^|[^\\p{L}])' + from + '(?=[^\\p{L}]|$)', 'u');
      if (!re.test(a)) return;
      const r = a.replace(re, (m, p1) => p1 + to);
      if (it.accept.some(x => DG.text.fold(x) === DG.text.fold(r))) return;
      assert.equal(E.evaluate(it, r).verdict, 'wrong', it.id + ' «' + r + '»'); swaps++;
    });
    a.split(/(?=\s)/).forEach((w, k, arr) => {
      if (/[äöü]/.test(w)) {
        const r = arr.map((x, j) => j === k ? x.replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u') : x).join('');
        if (it.accept.some(x => DG.text.fold(x) === DG.text.fold(r))) return;
        assert.equal(E.evaluate(it, r).verdict, 'wrong', it.id + ' «' + r + '»'); umls++;
      }
    });
    // errata real: transposición interior en la palabra más larga sin diéresis/ß, fuera de la lista cerrada
    const words = a.replace(/[.,!?;:]/g, '').split(/\s+/).filter(w => /^[A-Za-z]{6,}$/.test(w) && !/^(dieser|dieses|diesen|diesem|keinen|keinem|keiner|keines|meinen|meinem|meiner|deinen|deinem|deiner|seinen|seinem|seiner|ihren|ihrem|ihrer|unsere|unseren|unserem|unserer|welcher|welchen|welchem|welches|jeden|jedem|jeder|jedes|einen|einem|einer|eines)$/i.test(w));
    if (words.length) {
      const w = words.sort((x, y) => y.length - x.length)[0], i = Math.floor(w.length / 2);
      if (w[i] !== w[i + 1]) {
        const t = w.slice(0, i) + w[i + 1] + w[i] + w.slice(i + 2), r = a.replace(w, t);
        if (!it.accept.some(x => DG.text.fold(x) === DG.text.fold(r))) { assert.equal(E.evaluate(it, r).verdict, 'almost', it.id + ' «' + r + '»'); typos++; }
      }
    }
  });
  assert.ok(swaps >= 20 && umls >= 3 && typos >= 100, `swaps=${swaps} umlaut=${umls} typos=${typos}`);
});
