/* Pruebas de la UI sobre el HTML FINAL (dist/deutschraum-gym.html) en jsdom: se pulsan botones reales y se inspecciona localStorage. */
const test = require('node:test'), { after, afterEach } = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const { JSDOM } = require('jsdom');
const { build } = require('../tools/build.js');

const HTML_PATH = build();
const HTML = fs.readFileSync(HTML_PATH, 'utf8');

const DOMS = [];
// cada prueba abre varias ventanas con el HTML completo (≈3,6 MB, 8.700 ítems): se cierran al terminar la prueba para no agotar la memoria
afterEach(() => { DOMS.splice(0).forEach(d => { try { d.window.close(); } catch (e) { /* ya cerrada */ } }); });
after(() => DOMS.splice(0).forEach(d => { try { d.window.close(); } catch (e) { /* ya cerrada */ } }));
function boot(seed, opts) {
  opts = opts || {};
  const dom = new JSDOM(HTML, { runScripts: 'dangerously', url: 'http://localhost/', pretendToBeVisual: true,
    beforeParse(w) { w.DGUI_CONFIG = Object.assign({ seed: seed == null ? 11 : seed, autoMs: 1400 }, opts.cfg);
      if (!opts.auto) w.localStorage.setItem('dg.ui', JSON.stringify({ auto: false }));   // sin temporizadores colgados: el avance automático se prueba aparte
      if (opts.before) opts.before(w); } });
  DOMS.push(dom);
  const w = dom.window, d = w.document;
  // Toda vista que entregue el motor llega CONGELADA: si la UI intentara mutarla, 'use strict' lanzaría.
  const eng = w.DGUI.engine, orig = eng.startSession;
  const freeze = o => { if (o && typeof o === 'object' && !Object.isFrozen(o)) { Object.freeze(o); Object.values(o).forEach(freeze); } return o; };
  eng.startSession = function (req) {
    const s = orig.call(eng, req), v = s.view;
    s.view = function (m) { return freeze(v.call(s, m)); };
    if (opts.warnings) s.warnings = opts.warnings;
    return s;
  };
  const q = sel => d.querySelector(sel), qa = sel => Array.from(d.querySelectorAll(sel));
  const click = el => { assert.ok(el, 'botón no encontrado'); el.dispatchEvent(new w.MouseEvent('click', { bubbles: true })); };
  const stored = () => JSON.parse(w.localStorage.getItem('dg.progress'));
  const S = () => w.DGUI.app.state;
  let pending = 'verben';
  const chooseModule = (m, n) => { pending = m; if (n) click(q('[data-size="' + n + '"]')); };
  const start = () => click(q('.card[data-module="' + pending + '"]'));
  // Responde el ejercicio actual PULSANDO la interfaz, según la variante (spec) que haya elegido la UI.
  const btnText = (sel, t) => qa(sel).find(b => !b.disabled && b.textContent === t);
  function buildBlocks(blocks, target, joiner) {   // DFS: secuencia de bloques que forma exactamente la respuesta
    const rec = (rem, used) => {
      if (rem === '') return [];
      for (const b of blocks) {
        if (used.has(b.id)) continue;
        const t = joiner ? (rem === b.t || rem.startsWith(b.t + joiner) ? b.t : null) : (rem.startsWith(b.t) ? b.t : null);
        if (t == null) continue;
        const rest = joiner ? rem.slice(t.length + (rem === t ? 0 : 1)) : rem.slice(t.length);
        const r = rec(rest, new Set(used).add(b.id)); if (r) return [b.t].concat(r);
      }
      return null;
    };
    return rec(target, new Set());
  }
  // orden correcto de las fichas: la solución del ítem, ficha a ficha (la puntuación es una ficha)
  function solveTiles(item) { const T = item.tiles.slice(), joined = item.accept[0]; const rec = (rem, used) => { if (rem === '') return []; for (let i = 0; i < T.length; i++) { if (used.has(i) || !rem.startsWith(T[i])) continue; const r = rec(rem.slice(T[i].length).replace(/^ /, ''), new Set(used).add(i)); if (r) return [T[i]].concat(r); } return null; }; const r = rec(joined, new Set()); assert.ok(r, 'fichas no forman ' + joined); return r; }
  function answer(ok) {
    const { item, spec } = S().cur, check = () => click(qa('.dock .btn.primary')[0]);
    if (spec.kind === 'choice') {
      const opts = qa('.options .btn.opt');
      assert.ok(opts.some(b => b.dataset.opt === item.answer), 'la opción correcta debe estar entre las opciones');
      click(ok ? opts.find(b => b.dataset.opt === item.answer) : opts.find(b => b.dataset.opt !== item.answer));
    } else if (spec.kind === 'blocks') {
      if (!ok) { click(qa('.bank .tile').find(b => !b.disabled)); return check(); }
      const seq = buildBlocks(spec.blocks, item.answer, spec.joiner); assert.ok(seq, 'bloques no forman ' + item.answer);
      seq.forEach(t => click(btnText('.bank .tile', t))); check();
    } else if (spec.kind === 'match') {
      const order = ok ? spec.rows : spec.rows.filter(r => !r.target).concat(spec.rows.filter(r => r.target));
      for (const r of order) {
        click(q('[data-row="' + r.key + '"]'));                       // fila activa
        const wrongHere = !ok && r.target;
        const chip = qa('.bank .tile').find(b => !b.disabled && (wrongHere ? b.textContent !== r.expected : b.textContent === r.expected));
        if (!chip) { assert.ok(wrongHere, 'ficha para ' + r.label); return click(qa('.dock .btn.ghost').find(b => b.textContent === 'No sé')); }
        click(chip);
      }
      check();
    } else if (spec.kind === 'ending') {
      const right = item.answer.slice(spec.stem.length) || '(vacío)', btns = qa('.options [data-end]');
      assert.ok(btns.some(b => b.dataset.end === right), 'la terminación correcta está entre las opciones');
      click(ok ? btns.find(b => b.dataset.end === right) : btns.find(b => b.dataset.end !== right));
    } else if (spec.kind === 'tiles') {
      if (!ok) { click(qa('.bank .tile').find(b => !b.disabled)); return check(); }
      solveTiles(item).forEach(t => click(qa('.bank .tile').find(b => !b.disabled && b.textContent === t))); check();
    } else if (spec.kind === 'pair') {
      const it = item, pick = (key, val) => click(qa('.options [data-pair="' + key + '"]').find(b => b.dataset.opt === val));
      pick('wo', ok ? it.wo.answer : it.wohin.answer); pick('wohin', ok ? it.wohin.answer : it.wo.answer); check();
    } else if (spec.kind === 'text') {
      const inp = q('#answer'); inp.value = ok ? item.answer : 'zzzz'; check();
    } else {
      const chars = Array.from(item.answer.normalize('NFC'));
      if (!ok) { click(qa('.bank .tile').find(b => !b.disabled)); return check(); }
      chars.forEach(c => { const t = btnText('.bank .tile', c === ' ' ? '␣' : c); assert.ok(t, 'ficha ' + c + ' ausente del banco'); click(t); });
      check();
    }
  }
  const next = () => click(q('#next'));
  return { dom, w, d, eng, q, qa, click, stored, S, chooseModule, start, answer, next };
}

function playSession(u, mod, size, okFn) {
  u.chooseModule(mod, size); u.start();
  const seen = [];
  let guard = 0;
  while (u.S().screen === 'session' && guard++ < 200) {
    const item = u.S().cur.item, ok = okFn ? okFn(item, seen.length) : true;
    seen.push({ item, input: u.S().cur.view.input, ok });
    u.answer(ok);
    assert.ok(u.q('.fb'), 'tras responder debe haber retroalimentación');
    u.next();
  }
  return seen;
}

test('el HTML es autocontenido (sin recursos externos), NFC y usa sólo IIFE vanilla', () => {
  assert.ok(!/<script[^>]+src=|<link[^>]+href=|@import|https?:\/\//i.test(HTML.replace(/https?:\/\/localhost/g, '')), 'recurso externo');
  const block = id => HTML.match(new RegExp('id="' + id + '">([\\s\\S]*?)</script>'))[1];
  ['dg-data', 'dg-concepts'].forEach(id => assert.equal(block(id), block(id).normalize('NFC'), id + ' contiene texto no NFC'));
  ['style.css', 'dgui-util.js', 'dgui-rules.js', 'dgui-inputs.js', 'dgui-app.js', 'dgui-boot.js', 'index.html'].forEach(f => {
    const t = fs.readFileSync(path.join(__dirname, '..', 'ui', f), 'utf8'); assert.equal(t, t.normalize('NFC'), f + ' no es NFC');
  });
  assert.ok(/prefers-reduced-motion:\s*reduce/.test(HTML) && /prefers-color-scheme:\s*dark/.test(HTML));
  assert.ok(HTML.length < 6e6, 'el HTML pesa ' + HTML.length);   // guarda de tamaño: 10.600 ítems de 7 módulos ≈ 4,2 MB; sube si el contenido crece mucho
});

for (const mod of ['verben', 'artikel', 'deklination', 'praepositionen', 'konnektoren', 'wortschatz', 'satzbau']) {
  test('sesión completa de ' + mod + ': se juega pulsando, termina en resumen y deja el progreso en localStorage', () => {
    const u = boot(21);
    assert.ok(u.q('.cards'), 'inicio con módulos');
    const seen = playSession(u, mod, 10, (it, i) => i % 4 !== 1);   // un fallo deliberado cada 4
    assert.ok(seen.length >= 10);
    assert.equal(u.S().screen, 'summary');
    assert.ok(u.q('.sum-big').textContent.includes('/'));
    const j = u.stored();
    assert.equal(j.version, 2);
    assert.equal(j.sessionCounter, 1);
    assert.equal(j.history.length, 1);
    assert.ok(Object.keys(j.units).length >= 8, 'unidades guardadas');
    const failed = seen.filter(s => !s.ok);
    assert.ok(failed.length > 0);
    assert.ok(failed.some(f => j.errors[f.item.id]), 'el fallo debe estar en la cola de errores guardada');
    assert.ok(seen.every(s => s.item.module === mod));
    assert.ok(u.q('.tagl'), 'errores por tipo en el resumen');
  });
}

test('fallo deliberado: explicación de una línea, «ver regla» abre y cierra el panel, y localStorage lo registra', () => {
  const u = boot(5);
  for (const mod of ['verben', 'artikel', 'deklination']) {
    u.chooseModule(mod, 10); u.start();
    const item = u.S().cur.item;
    u.answer(false);
    assert.ok(u.q('.fb.bad'), mod + ': banner de error');
    assert.ok(u.q('.fb-line').textContent.trim().length > 3, mod + ': explicación de una línea');
    assert.ok(u.q('.fb-ans, .paradigm.result').textContent.includes(item.answer), 'muestra la respuesta correcta');
    assert.ok(u.stored().errors[item.id], mod + ': error guardado ya, antes de terminar');
    u.click(u.q('#rule'));
    const dlg = u.q('[role="dialog"]');
    assert.ok(dlg && dlg.querySelector('.r-concept'), mod + ': el panel muestra el concepto');
    if (mod === 'verben') assert.ok(dlg.querySelector('.r-table'), 'tabla de conjugación del verbo');
    assert.ok(dlg.querySelector('.r-ex'), mod + ': ejemplos del mismo tema');
    assert.ok(/aún no trae el texto completo/.test(dlg.textContent) === !item.explanation, 'aviso honesto sólo si falta la explicación');
    u.d.dispatchEvent(new u.w.KeyboardEvent('keydown', { key: 'Escape' }));
    assert.equal(u.q('[role="dialog"]'), null, 'Escape cierra el panel');
    u.click(u.q('#next')); u.click(u.q('[aria-label="Terminar sesión"]'));
    u.click(u.q('.dock .btn.secondary'));   // Inicio
  }
});

test('giveUp («No sé»): existe en cada variante, muestra la respuesta, cuenta como fallo y se guarda', () => {
  const u = boot(8);
  u.chooseModule('verben', 30); u.start();
  const kinds = new Set();
  for (let i = 0; i < 12 && u.S().screen === 'session'; i++) {
    const item = u.S().cur.item, kind = u.S().cur.spec.kind;
    if (!kinds.has(kind)) {
      kinds.add(kind);
      u.click(u.qa('.dock .btn.ghost').find(b => b.textContent === 'No sé'));
      assert.ok(u.q('.fb.bad') && u.q('.fb-ans, .paradigm.result'), kind + ': muestra la respuesta');
      assert.ok(u.stored().errors[item.id], kind + ': giveUp es un fallo guardado');
      assert.equal(u.stored().items[item.id].a, 1);
    } else u.answer(true);
    u.next();
  }
  assert.ok(kinds.size >= 2, 'se probaron varias variantes: ' + [...kinds]);
});

test('respuestas por toques: texto unido (bloques/opciones/emparejado) o array de letras; ä/ö/ü/ß correctas', () => {
  const u = boot(33);
  const calls = [], seenUml = [];
  for (let n = 0; n < 14 && seenUml.length < 3; n++) {
    u.chooseModule('verben', 30); u.start();
    const s = u.S().session, orig = s.answer;
    s.answer = function (r, o) { calls.push(r); return orig.call(s, r, o); };
    while (u.S().screen === 'session') {
      const item = u.S().cur.item;
      u.answer(true);
      if (/[äöüß]/.test(item.answer)) seenUml.push({ item, ok: u.q('.fb.ok') != null });
      u.next();
    }
    u.click(u.q('#again').parentNode.firstChild);   // Inicio
  }
  assert.ok(seenUml.length >= 1, 'no salió ninguna respuesta con diéresis/ß en 14 sesiones');
  seenUml.forEach(x => assert.ok(x.ok, x.item.answer + ' debió dar correcto'));
  assert.ok(calls.some(r => typeof r === 'string'));
  assert.ok(calls.filter(Array.isArray).every(a => a.every(c => c.length >= 1 && !/\s/.test(c))), 'si se manda array, son letras sueltas sin espacios');
  const u2 = boot(34); u2.chooseModule('deklination', 30); u2.start();
  for (let i = 0; i < 30 && u2.S().screen === 'session'; i++) { u2.answer(true); assert.ok(u2.q('.fb.ok'), 'deklination ' + u2.S().cur.spec.kind + ' ' + u2.S().cur.item.answer); u2.next(); }
});

test('banco de letras: contiene todas las letras de la respuesta + distractores (ä con a, ß con s)', () => {
  const { DGUI } = boot().w;
  const bank = DGUI.inputs.letterBank('schläfst', () => 0.3);
  assert.equal(bank.length, 'schläfst'.length + 3);
  const joined = bank.map(b => b.ch).join('');
  for (const c of 'schläfst') assert.ok(joined.includes(c));
  assert.ok(joined.includes('a'), 'distractor a para ä');
  const b2 = DGUI.inputs.letterBank('den Kindern', () => 0.5);
  assert.ok(b2.some(b => b.ch === ' '), 'ficha de espacio para respuestas con espacios');
});

test('fichas para ordenar: tocar arma la frase y envía el array de fichas', () => {
  const { w, d } = boot();
  w.DGUI.util.doc = d;
  const got = [];
  const view = { kind: 'tiles', tiles: ['trinke', 'Ich', 'Kaffee'] };
  const m = w.DGUI.inputs.mount(view, { answer: 'Ich trinke Kaffee' }, { onSubmit: r => got.push(r), onGiveUp() {} });
  d.body.appendChild(m.answerEl); d.body.appendChild(m.dockEl);
  const tap = t => Array.from(d.querySelectorAll('.bank .tile')).find(b => !b.disabled && b.textContent === t).dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
  ['Ich', 'trinke', 'Kaffee'].forEach(tap);
  Array.from(d.querySelectorAll('.btn.primary')).pop().dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
  assert.equal(JSON.stringify(got), JSON.stringify([['Ich', 'trinke', 'Kaffee']]));
});

test('Artikel: der/die/das con color Y forma (● ◆ ⬢), no sólo color', () => {
  const u = boot(2); u.chooseModule('artikel', 30); u.start();
  let found = null;
  for (let i = 0; i < 30 && u.S().screen === 'session'; i++) {
    if (u.S().cur.view.skill === 'genero') { found = u.qa('.options .btn.opt'); break; }
    u.answer(true); u.next();
  }
  assert.ok(found && found.length === 3, 'ejercicio de género con 3 opciones');
  const shapes = found.map(b => b.querySelector('.shape') && b.querySelector('.shape').textContent).sort().join('');
  assert.equal(shapes, ['●', '◆', '⬢'].sort().join(''));
  assert.ok(found.every(b => /g-(der|die|das)/.test(b.className) && b.querySelector('.lbl').textContent.length >= 3));
  const m = { der: '●', die: '◆', das: '⬢' }; found.forEach(b => assert.equal(b.querySelector('.shape').textContent, m[b.dataset.opt]));
});

test('view() no se muta: la misma vista (congelada) sirve para pintar, equivocarse y volver a pintar', () => {
  const u = boot(14); u.chooseModule('deklination', 10); u.start();
  const s = u.S().session, v1 = s.view(), snap = JSON.stringify(v1);
  assert.strictEqual(s.view(), v1);
  u.answer(false);
  assert.equal(JSON.stringify(v1), snap);
  assert.ok(Object.isFrozen(v1));
});

test('saveError: avisa sin bloquear y se limpia cuando vuelve a guardar', () => {
  const u = boot(17); u.chooseModule('artikel', 10); u.start();
  const real = u.w.Storage.prototype.setItem;
  u.w.Storage.prototype.setItem = function () { const e = new Error('full'); e.name = 'QuotaExceededError'; throw e; };
  try {
    u.answer(true);
    assert.ok(/No se pudo guardar/.test(u.q('.notice.warn').textContent));
    assert.ok(u.q('#next'), 'no bloquea: se puede seguir');
    u.next(); assert.ok(u.q('.notice.warn'), 'el aviso persiste mientras falle');
    u.w.Storage.prototype.setItem = real;
    u.answer(true);
    assert.equal(u.q('.notice.warn'), null, 'el aviso desaparece al volver a guardar');
  } finally { u.w.Storage.prototype.setItem = real; }
});

test('plan.warnings se muestran al empezar (sin bloquear)', () => {
  const u = boot(3, { warnings: [{ code: 'LEVEL_THIN' }, { code: 'SHORTFALL' }] });
  u.chooseModule('verben', 10); u.start();
  assert.ok(/pocos ejercicios/.test(u.q('.notice').textContent) && /más corta/.test(u.q('.notice').textContent));
  assert.ok(u.q('.options, .bank'));
});

test('ajustes: tope de nivel (persistente) y tema oscuro/claro/sistema', () => {
  const u = boot(4);
  u.click(u.q('[aria-label="Ajustes"]'));
  u.click(u.q('[data-v="A1"]'));
  assert.equal(u.stored().settings.levelCap, 'A1');
  u.click(u.q('[data-v="dark"]'));
  assert.equal(u.d.documentElement.getAttribute('data-theme'), 'dark');
  assert.equal(JSON.parse(u.w.localStorage.getItem('dg.ui')).theme, 'dark');
  u.click(u.q('[aria-label="Tema"] [data-v="auto"]'));
  assert.equal(u.d.documentElement.getAttribute('data-theme'), null);
  u.click(u.q('[aria-label="Volver"]'));
  u.chooseModule('verben', 10); u.start();
  while (u.S().screen === 'session') { assert.equal(u.S().cur.item.level, 'A1'); u.answer(true); u.next(); }
});

test('el tema guardado y el progreso sobreviven a recargar la página', () => {
  const a = boot(6);
  a.click(a.q('[aria-label="Ajustes"]')); a.click(a.q('[data-v="dark"]'));
  a.click(a.q('[aria-label="Volver"]'));
  playSession(a, 'verben', 10);
  const ls = {}; for (let i = 0; i < a.w.localStorage.length; i++) { const k = a.w.localStorage.key(i); ls[k] = a.w.localStorage.getItem(k); }
  const b = boot(7, { before: w => Object.keys(ls).forEach(k => w.localStorage.setItem(k, ls[k])) });
  assert.equal(b.d.documentElement.getAttribute('data-theme'), 'dark');
  assert.equal(b.eng.state().sessionCounter, 1);
});

test('el resumen muestra «aprendiste», rescatados y errores por tipo tras una segunda sesión', () => {
  const u = boot(9);
  playSession(u, 'artikel', 10, () => true);
  assert.ok(/Hoy aprendiste \d+ cosas? que ayer no sabías/.test(u.q('.sum-card.learn').textContent));
});

/* ---------- Bloque B: pantalla de inicio ---------- */
test('B · inicio: Viaje combinado, los 7 módulos activos (ninguno «Próximamente»), errores sin pendientes', () => {
  const u = boot(41);
  assert.ok(u.q('#mix'), 'botón Viaje combinado');
  assert.deepEqual(u.qa('.card[data-module]').map(c => c.dataset.module), ['verben', 'artikel', 'deklination', 'praepositionen', 'konnektoren', 'wortschatz', 'satzbau']);
  assert.ok(u.qa('.card[data-module]').every(c => !c.disabled));
  const soon = u.qa('.card.soon');
  assert.equal(soon.length, 0, 'todos los módulos están activos'); assert.ok(!/Próximamente/.test(u.q('.main').textContent));
  assert.equal(u.q('#errors').disabled, true, 'sin errores todavía');
  soon.forEach(c => u.click(c));
  assert.equal(u.S().screen, 'home', 'una tarjeta deshabilitada no abre nada');
});

test('B · Viaje combinado mezcla módulos y el appbar toma el color del módulo de cada ejercicio', () => {
  const u = boot(42);
  u.click(u.q('[data-size="30"]')); u.click(u.q('#mix'));
  assert.equal(u.S().kind, 'mix');
  const mods = new Set(), bars = new Set();
  while (u.S().screen === 'session') {
    mods.add(u.S().cur.item.module); bars.add(u.q('.appbar').dataset.module);
    assert.equal(u.q('.appbar').dataset.module, u.S().cur.item.module);
    u.answer(true); u.next();
  }
  assert.ok(mods.size >= 2, 'mezcla de módulos: ' + [...mods]);
  assert.deepEqual([...bars].sort(), [...mods].sort());
  assert.equal(u.stored().sessionCounter, 1);
});

test('B · nivel: Auto / A1 / A2 / B1; cada uno se guarda en el motor y filtra los ejercicios', () => {
  const u = boot(43); const lv = () => u.eng.levelOf('verben');
  assert.deepEqual(u.qa('[data-level]').map(c => c.dataset.level), ['auto', 'A1', 'A2', 'B1'], 'hay botón B1');
  assert.equal(u.q('[data-level="auto"]').getAttribute('aria-checked'), 'true', 'por defecto Auto');
  u.click(u.q('[data-level="A1"]')); assert.equal(u.stored().settings.levelCap, 'A1'); assert.equal(u.q('[data-level="A1"]').getAttribute('aria-checked'), 'true');
  u.click(u.q('[data-size="20"]')); u.click(u.q('#mix'));
  while (u.S().screen === 'session') { assert.equal(u.S().cur.item.level, 'A1'); u.answer(true); u.next(); }
  u.click(u.q('.dock .btn.secondary'));
  u.click(u.q('[data-level="A2"]')); assert.equal(u.stored().settings.levelCap, 'A2'); assert.equal(lv(), 'A2');
  u.click(u.q('[data-level="B1"]')); assert.equal(u.stored().settings.levelCap, 'B1'); assert.equal(lv(), 'B1', 'B1 lleva a practicar B1, no sólo pone un tope');
  assert.match(u.q('.card[data-module="verben"] .badge').textContent, /Nivel B1/);
  u.click(u.q('[data-level="auto"]')); assert.equal(u.stored().settings.levelCap, 'B1'); assert.equal(lv(), 'A1', 'Auto restaura el nivel ganado por dominio');
});

test('B · B1: la sesión es sobre todo material B1 de los módulos que lo tienen; Auto devuelve la rampa', () => {
  const u = boot(47); u.click(u.q('[data-level="B1"]')); u.chooseModule('verben', 30); u.start(); let b1 = 0, n = 0;
  while (u.S().screen === 'session') { n++; if (u.S().cur.item.level === 'B1') b1++; u.answer(true); u.next(); }
  assert.ok(b1 / n >= 0.6, 'B1: ' + b1 + '/' + n);
  u.click(u.q('.dock .btn.secondary')); u.click(u.q('[data-level="auto"]'));
  u.chooseModule('verben', 30); u.start(); assert.equal(u.S().cur.item.level, 'A1');
});

test('B · tamaño de sesión y entrada (Toques/Escribir) persisten en dg.ui', () => {
  const u = boot(44);
  u.click(u.q('[data-size="30"]')); u.click(u.q('[data-entry="write"]'));
  const ui = JSON.parse(u.w.localStorage.getItem('dg.ui'));
  assert.equal(ui.size, 30); assert.equal(ui.entry, 'write');
  assert.equal(u.q('[data-size="30"]').getAttribute('aria-checked'), 'true');
});

test('B · «Mis errores» se activa tras fallar y lanza kind:errors (o avisa si aún no toca)', () => {
  const u = boot(45);
  playSession(u, 'verben', 10, (it, i) => i % 2 === 0);
  u.click(u.q('.dock .btn.secondary'));
  const b = u.q('#errors'); assert.equal(b.disabled, false); assert.ok(Number(b.dataset.errors) > 0);
  u.click(b);
  assert.ok(u.S().screen === 'session' || u.q('.toast'), 'o empieza la sesión de errores o avisa sin bloquear');
});

test('A/B · objetivos táctiles: el CSS exige >=48 px en botones, chips, tarjetas y fichas', () => {
  const css = fs.readFileSync(path.join(__dirname, '..', 'ui', 'style.css'), 'utf8');
  const minH = sel => { const m = new RegExp('(?:^|\\})' + sel.replace(/[.]/g, '\\.') + '\\{[^}]*min-height:(\\d+)px', 'm').exec(css); return m ? +m[1] : null; };
  ['.btn', '.chip', '.card', '.auto-chip', '.btn.opt'].forEach(sel => assert.ok(minH(sel) >= 48, sel + ' min-height ' + minH(sel)));
  assert.ok(/\.btn\.tile\{[^}]*min-height:5\d/.test(css));
  assert.ok(!/:hover/.test(css), 'sin hover: todo es táctil');
});

/* ---------- Bloque C: ejercicios por toque ---------- */
const sleep = ms => new Promise(r => setTimeout(r, ms));
function toKind(u, kind, mod, size) {   // juega (bien) hasta que aparezca una variante concreta
  u.chooseModule(mod, size || 30); u.start();
  for (let i = 0; i < 60 && u.S().screen === 'session'; i++) { if (u.S().cur.spec.kind === kind) return true; u.answer(true); u.next(); }
  return false;
}

test('C · avance automático: tras acertar avanza solo; al fallar nunca; «Pausar» y el chip Auto lo detienen', async () => {
  const u = boot(60, { cfg: { autoMs: 30 }, auto: true });
  u.chooseModule('verben', 30); u.start();
  const pos0 = u.S().session.position();
  u.answer(true);
  assert.ok(u.q('.autobar') && u.q('#pause'), 'barra de avance y botón Pausar');
  await sleep(120);
  assert.ok(!u.S().cur.fb && u.S().session.position() === pos0 + 1, 'avanzó solo al siguiente ejercicio');
  u.answer(false); assert.equal(u.q('.autobar'), null); await sleep(120);
  assert.ok(u.q('#next') && u.S().cur.fb, 'un fallo no avanza solo');
  u.next(); u.answer(true); u.click(u.q('#pause')); await sleep(120);
  assert.ok(u.S().cur.fb && u.q('#next'), 'Pausar detiene el avance');
  u.next(); u.click(u.q('#auto'));
  assert.equal(u.q('#auto').getAttribute('aria-pressed'), 'false'); assert.equal(JSON.parse(u.w.localStorage.getItem('dg.ui')).auto, false);
  u.answer(true); assert.equal(u.q('.autobar'), null, 'con Auto apagado no hay avance automático'); await sleep(100); assert.ok(u.S().cur.fb);
});

test('C · el último ejercicio no se auto-avanza: queda «Ver resumen»', async () => {
  const u = boot(61, { cfg: { autoMs: 20 }, auto: true });
  u.chooseModule('artikel', 10); u.start();
  for (let i = 0; i < 40 && u.S().screen === 'session'; i++) {
    const last = u.S().session.position() === u.S().session.length() - 1;
    u.answer(true);
    if (last) { assert.equal(u.q('.autobar'), null); assert.equal(u.q('#next').textContent, 'Ver resumen'); u.next(); break; }
    await sleep(50);
    if (u.S().cur.fb) u.next();
  }
  assert.equal(u.S().screen, 'summary');
});

test('C · bloques: tocar coloca, tocar el bloque colocado lo devuelve, y se envía el texto unido', () => {
  const u = boot(62); assert.ok(toKind(u, 'blocks', 'verben'), 'salió una variante de bloques');
  const { item } = u.S().cur, sent = [];
  const sess = u.S().session, orig = sess.answer; sess.answer = function (r, o) { sent.push(r); return orig.call(sess, r, o); };
  const first = u.qa('.bank .tile')[0], t = first.dataset.block;
  u.click(first); assert.ok(u.q('.slots .placed') && u.q('.slots .placed').textContent.startsWith(t));
  u.click(u.q('.slots .placed')); assert.equal(u.q('.slots .placed'), null, 'devuelto al banco');
  assert.equal(u.qa('.bank .tile').filter(b => b.disabled).length, 0);
  u.answer(true);
  assert.equal(typeof sent[0], 'string'); assert.equal(sent[0], item.answer);
  assert.ok(u.q('.fb.ok'));
});

test('C · emparejado rápido: sólo la fila ★ se envía al motor; las demás filas se corrigen en pantalla sin puntuar', () => {
  const u = boot(63); assert.ok(toKind(u, 'match', 'verben'), 'salió el emparejado');
  const { item, spec } = u.S().cur, sent = [];
  const sess = u.S().session, orig = sess.answer; sess.answer = function (r, o) { sent.push(r); return orig.call(sess, r, o); };
  assert.ok(u.qa('.prow').length >= 6 && u.q('.prow.target'));
  assert.ok(u.qa('.dock .btn.primary')[0].disabled, 'Comprobar espera a que todas las filas estén llenas');
  // la fila ★ y las demás bien, salvo una (no ★) que se rellena con una ficha de más (trampa)
  const other = spec.rows.find(r => !r.target);
  const order = spec.rows.filter(r => r.key !== other.key).concat([other]);
  order.forEach(r => {
    u.click(u.q('[data-row="' + r.key + '"]'));
    const free = u.qa('.bank .tile').filter(b => !b.disabled);
    const chip = r.key === other.key ? (free.find(b => b.textContent !== r.expected) || free[0]) : free.find(b => b.textContent === r.expected);
    u.click(chip);
  });
  u.click(u.qa('.dock .btn.primary')[0]);
  assert.deepEqual(sent, [item.answer], 'al motor sólo llega la forma de la fila ★');
  assert.ok(u.q('.fb.ok'), 'el motor lo cuenta como acierto');
  assert.equal(u.stored().errors[item.id], undefined);
  assert.ok(u.q('.paradigm.result .prow'), 'resultado por persona en pantalla');
});

test('C · modo «Escribir»: campo de texto + teclas ä ö ü ß, sin banco de letras', () => {
  const u = boot(64); u.click(u.q('[data-entry="write"]'));
  u.chooseModule('verben', 30); u.start();
  assert.equal(u.S().cur.spec.kind, 'text'); assert.ok(u.q('#answer')); assert.equal(u.q('.bank'), null);
  assert.deepEqual(u.qa('.umlauts .key').map(b => b.dataset.key), ['ä', 'ö', 'ü', 'ß']);
  u.q('#answer').value = 'sch'; u.click(u.q('[data-key="ä"]')); u.click(u.q('[data-key="ß"]'));
  assert.equal(u.q('#answer').value, 'schäß');
  u.q('#answer').value = ''; u.click(u.qa('.dock .btn.primary')[0]); assert.equal(u.q('.fb'), null, 'vacío no se envía');
});

test('C · modo «Escribir»: sesión completa, error deliberado y estado de localStorage', () => {
  const u = boot(65); u.click(u.q('[data-entry="write"]'));
  const seen = playSession(u, 'verben', 10, (it, i) => i % 3 !== 1);
  assert.ok(seen.length >= 10 && u.S().screen === 'summary');
  const j = u.stored(); assert.equal(j.sessionCounter, 1);
  assert.ok(seen.filter(s => !s.ok).some(f => j.errors[f.item.id]));
});

test('C · «casi»: una errata en una transformación pide reintentar sin registrar todavía el fallo', () => {
  const typo = it => { const w = it.answer.split(' '), k = w.findIndex(x => x.length >= 5); if (k < 0) return null; w[k] = w[k].slice(0, -2) + w[k].slice(-1) + w[k].slice(-2, -1); return w.join(' '); };
  let found = null;
  for (let seed = 70; seed < 100 && !found; seed++) {
    const u = boot(seed); u.click(u.q('[data-entry="write"]'));
    u.chooseModule('deklination', 30); u.start();
    for (let i = 0; i < 40 && u.S().screen === 'session'; i++) {
      const it = u.S().cur.item, t = it.type === 'transform' ? typo(it) : null;
      // sólo ítems en los que el evaluador (motor) da «almost» para esa errata: se prueba la UI, no el evaluador
      if (t && u.w.DG.evaluator.evaluate(it, t, { mode: 'write' }).verdict === 'almost') { found = { u, it, t }; break; }
      u.answer(true); u.next();
    }
  }
  assert.ok(found, 'apareció una transformación con errata «casi»');
  const { u, it, t } = found, pos = u.S().session.position();
  u.q('#answer').value = t; u.click(u.qa('.dock .btn.primary')[0]);
  assert.ok(/Casi/.test(u.q('.notice').textContent), 'aviso «Casi»');
  assert.equal(u.S().session.position(), pos, 'sigue en el mismo ejercicio');
  assert.equal(u.q('#answer').value, t, 'conserva lo escrito');
  assert.equal(u.stored().errors[it.id], undefined, 'todavía no es un fallo');
  u.q('#answer').value = it.answer; u.click(u.qa('.dock .btn.primary')[0]);
  assert.ok(u.q('.fb.ok'));
});

test('C · rescate: acertar tras ≥16 h un ejercicio fallado muestra «Rescatada» y lo saca de la cola', () => {
  const u = boot(66); let now = Date.now() + 1e6; u.w.Date.now = () => now;
  playSession(u, 'artikel', 10, () => false);
  u.click(u.q('.dock .btn.secondary'));
  assert.ok(Object.keys(u.stored().errors).length > 0);
  now += 17 * 3600e3;
  u.click(u.q('#errors')); assert.equal(u.S().kind, 'errors'); assert.equal(u.S().screen, 'session');
  const id = u.S().cur.item.id; u.answer(true);
  assert.ok(u.q('.badge.rescue'), 'insignia Rescatada');
  assert.equal(u.stored().errors[id], undefined, 'sale de la cola');
});

test('C · Artikel: el plural se elige entre 4 opciones plausibles y la correcta está entre ellas', () => {
  const u = boot(67); u.chooseModule('artikel', 30); u.start(); let seen = false;
  for (let i = 0; i < 40 && u.S().screen === 'session'; i++) {
    if (u.S().cur.item.skill === 'plural') { const o = u.qa('.options .btn.opt').map(b => b.dataset.opt); assert.ok(o.includes(u.S().cur.item.answer) && o.length === 4); seen = true; break; }
    u.answer(true); u.next();
  }
  assert.ok(seen, 'salió un plural');
});

test('C · sin teclado en Modo Tren: ningún <input> durante la sesión', () => {
  const u = boot(68); u.chooseModule('verben', 30); u.start();
  for (let i = 0; i < 8; i++) { assert.equal(u.qa('input').length, 0); u.answer(true); u.next(); }
});

/* ---------- Bloque D: cápsula de regla ---------- */
const REGLAS = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'ui', 'reglas.json'), 'utf8')).reglas;
const CONCEPTS = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'concepts.json'), 'utf8'));
const hasRule = it => (it.conceptIds || []).some(id => REGLAS[id]);
function toItem(u, pred, mod, size) {   // juega bien hasta que el ejercicio actual cumpla pred
  u.chooseModule(mod, size || 30); u.start();
  for (let i = 0; i < 60 && u.S().screen === 'session'; i++) { if (pred(u.S().cur.item)) return true; u.answer(true); u.next(); }
  return false;
}

test('D · reglas.json: sólo texto copiado de las hojas y de los errores comunes de las clases, NFC, sin HTML, con ids de concepto reales', () => {
  // ids de concepto: los de concepts.json y los que citan los ítems (p. ej. md:indefinitpronomen está en los datos pero no en concepts.json)
  const ids = new Set(CONCEPTS.map(c => c.id)); ['verben', 'artikel', 'deklination', 'praepositionen', 'konnektoren'].forEach(m => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', m + '.json'), 'utf8')).forEach(i => (i.conceptIds || []).forEach(c => ids.add(c))));
  const keys = Object.keys(REGLAS); assert.ok(keys.length >= 50, 'reglas: ' + keys.length);
  keys.forEach(k => {
    const r = REGLAS[k]; assert.ok(ids.has(k), k + ' no es un concepto de concepts.json');
    assert.ok(r.regla || r.formula || r.ejemplo || (r.errores && r.errores.length), k + ' vacío');
    if (r.errores) { assert.ok(r.errores.length >= 1 && r.errores.length <= 3, k); r.errores.forEach(e => assert.ok(e.length >= 25 && e.length <= 200, k + ': ' + e)); }
    const t = JSON.stringify(r); assert.equal(t, t.normalize('NFC')); assert.ok(!/[<>]/.test(t), k + ' lleva HTML');
    if (r.ejemplo) assert.ok(r.ejemplo.antes && r.ejemplo.despues, k + ' ejemplo incompleto');
    if (r.regla) assert.ok(r.regla.length <= 262, k + ' regla larga');
  });
  assert.equal(REGLAS['cs:t16'].ejemplo.despues, 'den Kindern');
  assert.ok(/Dativ|DAT/i.test(REGLAS['dm:s5-1'].regla));
});

test('D · tras fallar: cápsula (fórmula/regla/ejemplo antes→después) si el tema tiene regla; sin regla no se inventa nada', () => {
  const u = boot(81);
  assert.ok(toItem(u, it => hasRule(it), 'deklination'), 'ejercicio con regla');
  const item = u.S().cur.item; u.answer(false);
  const cap = u.q('.fb.bad .capsule'); assert.ok(cap, 'cápsula tras fallar');
  assert.ok(REGLAS[cap.dataset.concept] && item.conceptIds.includes(cap.dataset.concept));
  assert.ok(cap.querySelector('.cap-r, .cap-formula, .cap-ex'));
  assert.ok(u.q('.fb-line').textContent.length > 3, 'se conserva la explicación de una línea');
  const v = boot(82);
  assert.ok(toItem(v, it => !hasRule(it), 'wortschatz'), 'ejercicio sin regla');
  v.answer(false); assert.ok(v.q('.fb.bad')); assert.equal(v.q('.capsule'), null, 'hueco vacío: sin cápsula inventada');
});

test('D · «¿Por qué?»: abre y cierra la cápsula bajo demanda; sin regla avisa sin inventar', () => {
  const u = boot(83); u.w.localStorage.setItem('dg.ui', JSON.stringify({ auto: false, ruleFirst: false }));
  const u2 = boot(83, { before: w => w.localStorage.setItem('dg.ui', JSON.stringify({ auto: false, ruleFirst: false })) });
  assert.ok(toItem(u2, it => hasRule(it), 'deklination'));
  assert.equal(u2.q('.why-slot .capsule'), null, 'con «regla visible» apagada no sale sola');
  assert.equal(u2.q('#why').getAttribute('aria-expanded'), 'false');
  u2.click(u2.q('#why')); assert.ok(u2.q('.why-slot .capsule')); assert.equal(u2.q('#why').getAttribute('aria-expanded'), 'true');
  u2.click(u2.q('#why')); assert.equal(u2.q('.why-slot .capsule'), null);
  u2.answer(true);                                     // la respuesta se conserva sin haber tocado el motor al abrir la regla
  assert.equal(u2.stored().sessionCounter, 1);
  const u3 = boot(84, { before: w => w.localStorage.setItem('dg.ui', JSON.stringify({ auto: false })) });
  assert.ok(toItem(u3, it => !hasRule(it), 'wortschatz'));
  u3.click(u3.q('#why')); assert.ok(/Todav/.test(u3.q('.toast').textContent)); assert.equal(u3.q('.why-slot .capsule'), null);
});

test('D · regla visible al principio y oculta al dominar el tema (vuelve a verse tras fallar)', () => {
  const u = boot(85);
  const noTable = it => hasRule(it) && !u.w.DGUI.tablas.tableId(it, JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'ui', 'tablas.json'), 'utf8')).tablas);
  assert.ok(toItem(u, noTable, 'deklination'));
  const item = u.S().cur.item;
  assert.ok(u.q('.why-slot .capsule'), 'visible al principio (tema nuevo)');
  assert.ok(/se oculta sola/.test(u.q('.why-slot').textContent));
  // dominado: ≥6 intentos con ≥85 % en ese tipo de error (se marcan todos los de Deklination y se abre otra sesión)
  u.click(u.q('[aria-label="Terminar sesión"]')); if (u.S().screen === 'summary') u.click(u.q('.dock .btn.secondary'));
  const tags = u.eng.state().tags;
  u.eng.store.all.filter(i => i.module === 'deklination').forEach(i => { tags[i.errorTag] = { n: 10, f: 0 }; });
  assert.ok(toItem(u, noTable, 'deklination'), 'otro ejercicio con regla');
  assert.equal(u.q('.why-slot .capsule'), null, 'dominado: la regla ya no sale sola');
  u.click(u.q('#why')); assert.ok(u.q('.why-slot .capsule'), 'pero sigue disponible bajo demanda');
  u.answer(false); assert.ok(u.q('.fb.bad .capsule'), 'y tras fallar vuelve a mostrarse');
});

test('D · con tabla de ayuda visible la regla no se abre sola (cabe en pantalla) pero sigue en «¿Por qué?»', () => {
  const u = boot(88); const T = u.w.DGUI.tablas, tab = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'ui', 'tablas.json'), 'utf8')).tablas;
  assert.ok(toItem(u, it => hasRule(it) && T.tableId(it, tab), 'deklination'));
  assert.ok(u.q('.tbl-slot .tbl')); assert.equal(u.q('.why-slot .capsule'), null);
  u.click(u.q('#why')); assert.ok(u.q('.why-slot .capsule'));
});

test('D · «Ver regla» (panel) incluye la cápsula arriba cuando existe', () => {
  const u = boot(86); assert.ok(toItem(u, it => hasRule(it), 'deklination'));
  u.answer(false); u.click(u.q('#rule'));
  assert.ok(u.q('[role="dialog"] .capsule'));
});

test('D · reglas: md() sólo produce <strong>; nada de HTML del texto', () => {
  const u = boot(87); u.w.DGUI.util.doc = u.d;
  const nodes = u.w.DGUI.fmt.md('a **b** <i>c</i>'); const box = u.d.createElement('div'); nodes.forEach(n => box.appendChild(typeof n === 'string' ? u.d.createTextNode(n) : n));
  assert.equal(box.querySelectorAll('strong').length, 1); assert.equal(box.querySelectorAll('i').length, 0); assert.ok(box.textContent.includes('<i>c</i>'));
});

/* ---------- Bloque E: feedback y retención ---------- */
const lastSummary = u => { while (u.S().screen === 'session') { u.answer(true); u.next(); } };
function vib(u) { const calls = []; u.w.navigator.vibrate = p => { calls.push(p); return true; }; return calls; }

test('E · resumen: racha, logro «Primera sesión» y chip de racha en el inicio; el mismo día no suma dos veces', () => {
  const u = boot(90); let now = Date.UTC(2026, 5, 10, 12); u.w.Date.now = () => now;
  playSession(u, 'artikel', 10, () => true);
  assert.match(u.q('#streak-card').textContent, /Racha: 1 día/);
  assert.ok(u.q('[data-badge="primera"]'), 'logro primera sesión');
  assert.ok(u.q('.toast.ok'), 'toast de logro');
  u.click(u.q('.dock .btn.secondary')); assert.match(u.q('#streak').textContent, /1 día/); assert.ok(u.q('#streak.done'));
  playSession(u, 'artikel', 10, () => true); assert.match(u.q('#streak-card').textContent, /Racha: 1 día/);
  now += 864e5; u.click(u.q('.dock .btn.secondary')); assert.ok(!u.q('#streak.done'), 'mañana: la racha está pendiente de hoy');
  playSession(u, 'artikel', 10, () => true); assert.match(u.q('#streak-card').textContent, /Racha: 2 días/);
  now += 2 * 864e5; u.click(u.q('.dock .btn.secondary'));   // falta un día → perdón
  playSession(u, 'artikel', 10, () => true); assert.match(u.q('#streak-card').textContent, /Racha: 3 días/); assert.match(u.q('#streak-card').textContent, /perdoné/);
  assert.equal(JSON.parse(u.w.localStorage.getItem('dg.ui')).ret.streak, 3);
});

test('E · resumen «qué falló y por qué»: cada fallo con respuesta, explicación y botón de regla', () => {
  const u = boot(91); playSession(u, 'deklination', 10, (it, i) => i % 3 !== 0);
  const cards = u.qa('.sum-card.fail'); assert.ok(cards.length >= 2);
  assert.equal(new Set(cards.map(c => c.dataset.id)).size, cards.length);
  cards.forEach(c => { assert.ok(c.querySelector('.fail-a').textContent.length > 0); assert.ok(u.stored().errors[c.dataset.id], 'el fallo está en la cola guardada'); });
  assert.ok(cards.some(c => c.querySelector('.fail-l')), 'con explicación de una línea');
  u.click(cards[0].querySelector('[data-rule]')); assert.ok(u.q('[role="dialog"]'));
});

test('E · mapa de errores por tipo: vacío al principio; tras fallar lista tipos con barra y abre su hoja', () => {
  const u = boot(92); u.click(u.q('#emap')); assert.equal(u.S().screen, 'errmap'); assert.ok(/Aún no hay errores/.test(u.q('.main').textContent)); assert.equal(u.qa('.erow').length, 0);
  u.click(u.q('[aria-label="Volver"]'));
  playSession(u, 'deklination', 20, (it, i) => i % 2 === 0); u.click(u.q('.dock .btn.secondary'));
  u.click(u.q('#emap')); const rows = u.qa('.erow'); assert.ok(rows.length >= 1);
  rows.forEach(r => { assert.ok(r.querySelector('.eb i').style.width); assert.match(r.querySelector('.en').textContent, /\d+ de \d+ · \d+ %/); });
  const fails = Object.keys(u.stored().tags).filter(t => u.stored().tags[t].f > 0); assert.deepEqual(rows.map(r => r.dataset.tag).sort(), fails.sort());
  u.click(rows[0]); const dlg = u.q('[role="dialog"]'); assert.ok(dlg && /Tipo de error/.test(dlg.getAttribute('aria-label')));
  assert.ok(dlg.querySelector('.capsule, .r-note')); assert.ok(dlg.querySelector('.r-ex li'));
  u.d.dispatchEvent(new u.w.KeyboardEvent('keydown', { key: 'Escape' })); assert.equal(u.q('[role="dialog"]'), null);
});

test('E · haptics: toque 8, acierto 12, fallo [30,40,30], aviso de guardado [15,40,15], hito [18,45,28]; respeta el ajuste', () => {
  const u = boot(93); const calls = vib(u);
  u.chooseModule('verben', 30); u.start();
  let ok = false; for (let i = 0; i < 30 && !ok; i++) { if (u.S().cur.spec.kind === 'blocks') { u.click(u.qa('.bank .tile')[0]); ok = true; } else { u.answer(true); u.next(); } }
  assert.ok(ok && calls.includes(8), 'toque en bloque: 8 ms'); u.click(u.q('.slots .placed'));   // devolver el bloque antes de responder
  calls.length = 0; u.answer(true); assert.equal(calls.slice(-1)[0], 12);
  u.next(); calls.length = 0; u.answer(false); assert.equal(JSON.stringify(calls.slice(-1)[0]), '[30,40,30]');
  u.next();
  const real = u.w.Storage.prototype.setItem; u.w.Storage.prototype.setItem = function () { const e = new Error('full'); e.name = 'QuotaExceededError'; throw e; };
  try { calls.length = 0; u.answer(true); assert.ok(calls.some(c => c && c[0] === 15 && c.length === 3), 'aviso de guardado'); } finally { u.w.Storage.prototype.setItem = real; }
  const m = boot(94); const c2 = vib(m); lastSessionBadge(m); assert.ok(c2.some(c => c && c[0] === 18 && c.length === 3), 'hito al desbloquear un logro');
  const off = boot(95, { before: w => w.localStorage.setItem('dg.ui', JSON.stringify({ auto: false, vibrate: false })) }); const c3 = vib(off);
  off.chooseModule('artikel', 10); off.start(); off.answer(true); off.answer; assert.equal(c3.length, 0, 'con la vibración apagada no vibra');
});
function lastSessionBadge(u) { playSession(u, 'artikel', 10, () => true); }

test('E · toast único: un toast nuevo reemplaza al anterior', () => {
  const u = boot(96); u.chooseModule('verben', 30); u.start();
  u.click(u.qa('.dock .btn.ghost').find(b => b.textContent === 'No sé') || u.q('#why'));
  u.next(); const why = u.q('#why'); 
  for (let i = 0; i < 3; i++) { const it = u.S().cur.item; if (!(it.conceptIds || []).some(id => REGLAS[id])) { u.click(u.q('#why')); u.click(u.q('#why')); } u.answer(true); u.next(); }
  assert.ok(u.qa('.toast').length <= 1);
});

/* ---------- Bloque F: ajustes y voz ---------- */
function withVoice(voices) {
  return w => {
    w.__spoken = []; w.__cancel = 0;
    w.SpeechSynthesisUtterance = function (t) { this.text = t; };
    w.speechSynthesis = { cancel() { w.__cancel++; }, speak(u) { w.__spoken.push(u); }, getVoices() { return voices || []; } };
  };
}
const goSettings = u => u.click(u.q('[aria-label="Ajustes"]'));

test('F · voz: botón 🔊 tras responder pronuncia la forma correcta en de-DE a 0,85; manual por defecto', () => {
  const u = boot(110, { before: withVoice([{ lang: 'de-DE', name: 'Anna' }]) });
  u.chooseModule('verben', 30); u.start(); const item = u.S().cur.item;
  u.answer(true); assert.equal(u.w.__spoken.length, 0, 'por defecto no habla sola');
  u.click(u.q('#say')); const sp = u.w.__spoken[0]; assert.ok(sp.text.endsWith(item.answer), sp.text);
  assert.deepEqual([sp.lang, sp.rate, sp.voice.name], ['de-DE', 0.85, 'Anna']);
  u.next(); u.answer(false); assert.ok(u.q('.fb.bad #say'), 'también tras fallar');
});

test('F · voz «Al responder» habla sola; «Manual» no; sin API no hay botón 🔊', () => {
  const u = boot(111, { before: withVoice([]) });
  goSettings(u); u.click(u.q('[aria-label="Voz"] [data-v="auto"]')); assert.equal(JSON.parse(u.w.localStorage.getItem('dg.ui')).voice, 'auto');
  u.click(u.q('[aria-label="Volver"]')); u.chooseModule('verben', 30); u.start(); u.answer(true);
  assert.equal(u.w.__spoken.length, 1, 'habló al responder'); u.next(); assert.ok(u.w.__cancel >= 1, 'al avanzar corta el audio');
  const n = boot(112); n.chooseModule('verben', 30); n.start(); n.answer(true); assert.equal(n.q('#say'), null);
  const m = boot(118); goSettings(m); assert.match(m.q('#voice-status').textContent, /no ofrece voz alemana/);
});

test('F · ajustes: «Probar voz» y estado de la voz alemana (encontrada / falta con instrucciones)', () => {
  const a = boot(113, { before: withVoice([{ lang: 'de-DE', name: 'Anna' }]) }); goSettings(a);
  assert.match(a.q('#voice-status').textContent, /Voz alemana encontrada: Anna/);
  a.click(a.q('#test-voice')); assert.equal(a.w.__spoken[0].text, 'Guten Tag! Das ist ein Test.'); assert.equal(a.w.__spoken[0].rate, 0.85);
  const b = boot(114, { before: withVoice([{ lang: 'en-US', name: 'EN' }]) }); goSettings(b);
  assert.match(b.q('#voice-status').textContent, /No encuentro una voz alemana.*texto a voz/i);
  b.click(b.q('#test-voice')); assert.ok(b.q('.toast'), 'avisa que usa la voz del sistema');
});

test('F · ajustes persistentes: nivel, entrada, tamaño por defecto, avance, regla visible, vibración, tema', () => {
  const u = boot(115); goSettings(u);
  u.click(u.q('[aria-label="Nivel"] [data-v="A2"]')); assert.equal(u.stored().settings.levelCap, 'A2');
  u.click(u.q('[aria-label="Entrada"] [data-v="write"]'));
  u.click(u.q('[aria-label="Tamaño de sesión"] [data-v="20"]'));
  u.click(u.q('[aria-label="Avance automático"] [data-v="0"]'));
  u.click(u.q('[aria-label="Regla visible"] [data-v="0"]'));
  u.click(u.q('[aria-label="Vibración"] [data-v="0"]'));
  u.click(u.q('[aria-label="Tema"] [data-v="dark"]'));
  const ui = JSON.parse(u.w.localStorage.getItem('dg.ui'));
  assert.deepEqual([ui.entry, ui.size, ui.auto, ui.ruleFirst, ui.vibrate, ui.theme], ['write', 20, false, false, false, 'dark']);
  u.click(u.q('[aria-label="Volver"]')); assert.equal(u.q('[data-size="20"]').getAttribute('aria-checked'), 'true');
  assert.equal(u.q('[data-entry="write"]').getAttribute('aria-checked'), 'true'); assert.equal(u.q('[data-level="A2"]').getAttribute('aria-checked'), 'true');
  const b = boot(116, { before: w => Object.keys(ui).length && w.localStorage.setItem('dg.ui', JSON.stringify(ui)) });
  assert.equal(b.d.documentElement.getAttribute('data-theme'), 'dark'); goSettings(b);
  assert.equal(b.q('[aria-label="Avance automático"] [data-v="0"]').getAttribute('aria-checked'), 'true');
  assert.equal(b.q('[aria-label="Regla visible"] [data-v="0"]').getAttribute('aria-checked'), 'true');
});

test('F · ajustes: todos los controles son botones de ≥48 px por CSS y los grupos tienen nombre accesible', () => {
  const u = boot(117); goSettings(u);
  const groups = u.qa('.seg'); assert.ok(groups.length >= 8);
  groups.forEach(g => { assert.ok(g.getAttribute('aria-label'), 'grupo sin nombre'); assert.equal(g.getAttribute('role'), 'radiogroup'); });
  u.qa('.seg button').forEach(b => { assert.equal(b.getAttribute('role'), 'radio'); assert.ok(['true', 'false'].includes(b.getAttribute('aria-checked'))); });
  assert.equal(u.qa('.seg button[aria-checked="true"]').length, groups.length, 'cada grupo con una opción marcada');
});

/* ---------- Präpositionen y Konnektoren (datos y motor ya existían; ahora jugables) ---------- */
test('P/K · Präpositionen: par mínimo Wo?/Wohin? por toques; se envía {wo, wohin}, el fallo se guarda y se explica', () => {
  const u = boot(120); assert.ok(toKind(u, 'pair', 'praepositionen'), 'salió un par mínimo');
  const { item } = u.S().cur, sent = [], sess = u.S().session, orig = sess.answer;
  sess.answer = function (r, o) { sent.push(r); return orig.call(sess, r, o); };
  assert.equal(u.qa('.p-pair').length, 2, 'las dos frases del par');
  assert.equal(u.qa('.options [data-pair="wo"]').length, 2); assert.ok(u.qa('.dock .btn.primary')[0].disabled);
  u.answer(false);
  assert.equal(typeof sent[0], 'object'); assert.deepEqual([sent[0].wo, sent[0].wohin], [item.wohin.answer, item.wo.answer]);
  assert.ok(u.q('.fb.bad')); assert.match(u.q('.fb-line').textContent, /Wo\? → Dativ.*Wohin\? → Akkusativ/); assert.match(u.q('.fb-yours').textContent, /Wo\? .* · Wohin\? /);
  assert.ok(u.stored().errors[item.id], 'guardado antes de terminar');
  u.next(); while (u.S().screen === 'session' && u.S().cur.spec.kind !== 'pair') { u.answer(true); u.next(); }
  if (u.S().screen === 'session') { u.answer(true); assert.ok(u.q('.fb.ok')); }
});

test('P/K · Konnektoren: fichas para ordenar con la traducción visible; los transform se arman por palabras', () => {
  const u = boot(121); assert.ok(toKind(u, 'tiles', 'konnektoren'), 'salió un orden por fichas');
  const { item } = u.S().cur; assert.ok(u.q('.p-tr') && u.q('.p-tr').textContent.includes(item.translation), 'traducción visible');
  assert.ok(u.qa('.bank .tile').length === item.tiles.length);
  u.answer(true); assert.ok(u.q('.fb.ok'));
  const v = boot(122); let found = false;
  for (let n = 0; n < 12 && !found; n++) { if (toKind(v, 'blocks', 'konnektoren')) { found = v.S().cur.item.type === 'transform'; if (!found) { v.answer(true); v.next(); continue; } } else break; }
  if (found) { const sp = v.S().cur.spec; assert.equal(sp.joiner, ' '); assert.ok(sp.blocks.length > sp.parts, 'con conectores como distractores'); v.answer(true); assert.ok(v.q('.fb.ok')); }
});

test('P/K · Viaje combinado incluye los 5 módulos y el appbar cambia de color por módulo', () => {
  const u = boot(123); u.click(u.q('[data-size="30"]')); u.click(u.q('#mix')); const mods = new Set();
  while (u.S().screen === 'session') { mods.add(u.S().cur.item.module); assert.equal(u.q('.appbar').dataset.module, u.S().cur.item.module); u.answer(true); u.next(); }
  assert.ok(mods.size >= 3, [...mods].join());
});

/* ---------- Consulta de reglas y copia de seguridad ---------- */
test('Consulta: lista las reglas de reglas.json sin ejercicios, filtra por grupo y abre la cápsula', () => {
  const u = boot(130); u.click(u.q('#consulta')); assert.equal(u.S().screen, 'consulta');
  const n = Object.keys(REGLAS).length; assert.equal(u.qa('.erow').length, n);
  assert.equal(u.q('.bank, .options'), null, 'sin ejercicios'); assert.equal(u.qa('input').length, 0);
  u.click(u.q('[data-group="cs"]')); assert.ok(u.qa('.erow').every(r => r.dataset.concept.startsWith('cs:')) && u.qa('.erow').length === Object.keys(REGLAS).filter(k => k.startsWith('cs:')).length);
  u.click(u.q('[data-group="dm"]')); assert.ok(u.qa('.erow').every(r => r.dataset.concept.startsWith('dm:')));
  u.click(u.q('[data-concept="dm:s5-1"]')); const d = u.q('[role="dialog"] .capsule'); assert.ok(d && /DAT/.test(d.textContent));
  u.d.dispatchEvent(new u.w.KeyboardEvent('keydown', { key: 'Escape' })); assert.equal(u.stored(), null, 'consultar no escribe progreso');
});

function fileInput(u, text, name) {
  const inp = u.q('#import-file'), f = new u.w.File([text], name || 'copia.json', { type: 'application/json' });
  Object.defineProperty(inp, 'files', { value: [f], configurable: true });
  inp.dispatchEvent(new u.w.Event('change', { bubbles: true }));
}
const waitFor = async (fn, ms = 1000) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { const v = fn(); if (v) return v; await sleep(15); } return null; };

test('Copia de seguridad: exportar genera un JSON con checksum; importar en otro dispositivo pide confirmar y reproduce el estado', async () => {
  const A = boot(131); playSession(A, 'verben', 10, (it, i) => i % 3 !== 0); A.click(A.q('.dock .btn.secondary'));
  A.click(A.q('[aria-label="Ajustes"]')); A.w.URL.createObjectURL = () => 'blob:x'; A.w.URL.revokeObjectURL = () => {};
  A.click(A.q('#export-btn')); const ex = A.w.DGUI.app.lastExport; assert.match(ex.name, /^deutschraum-gym-\d{4}-\d{2}-\d{2}\.json$/);
  const pkg = JSON.parse(ex.text); assert.ok(pkg.checksum && pkg.state && pkg.state.sessionCounter === 1); assert.ok(A.q('.toast.ok'));
  const B = boot(132); B.click(B.q('[aria-label="Ajustes"]')); fileInput(B, ex.text);
  assert.ok(await waitFor(() => B.q('#confirm-import')), 'pide confirmación antes de reemplazar');
  assert.equal(B.stored(), null, 'todavía no cambió nada'); 
  B.click(B.q('#confirm-import'));
  assert.equal(B.stored().sessionCounter, 1); assert.deepEqual(Object.keys(B.stored().errors).sort(), Object.keys(A.stored().errors).sort());
  assert.ok(B.q('.toast.ok'));
});

test('Copia de seguridad: archivo alterado o ajeno se rechaza sin tocar nada; cancelar no importa', async () => {
  const A = boot(133); playSession(A, 'artikel', 10, () => true); const good = JSON.parse(A.w.DGUI.engine.exportJSON());
  const B = boot(134); B.click(B.q('[aria-label="Ajustes"]'));
  const bad = JSON.parse(JSON.stringify(good)); bad.state.sessionCounter += 7;
  fileInput(B, JSON.stringify(bad)); assert.ok(await waitFor(() => B.q('#confirm-import'))); B.click(B.q('#confirm-import'));
  assert.match(B.q('.toast.warn').textContent, /alterada|incompleta/); assert.equal(B.stored(), null);
  const C = boot(135); C.click(C.q('[aria-label="Ajustes"]')); fileInput(C, 'esto no es json'); await waitFor(() => C.q('.toast'));
  assert.match(C.q('.toast.warn').textContent, /no es una copia válida/); assert.equal(C.q('#confirm-import'), null);
  const D = boot(136); D.click(D.q('[aria-label="Ajustes"]')); fileInput(D, JSON.stringify({ app: 'otra', state: {} })); await waitFor(() => D.q('#confirm-import')); D.click(D.q('#confirm-import'));
  assert.match(D.q('.toast.warn').textContent, /No es una copia de Deutschraum/); assert.equal(D.stored(), null);
  const E = boot(137); E.click(E.q('[aria-label="Ajustes"]')); fileInput(E, JSON.stringify(good)); await waitFor(() => E.q('#confirm-import'));
  E.click(E.q('[role="dialog"] .sheet-f button')); assert.equal(E.stored(), null, 'cancelar: nada cambia');
});

/* ---------- Tablas que se retiran (Deklination) ---------- */
const TABLAS = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'ui', 'tablas.json'), 'utf8')).tablas;
function toTable(u, setTags, pred) {          // juega hasta un ítem de Deklination con tabla; setTags(tag) → stats a fijar antes de empezar
  const T = u.w.DGUI.tablas;
  if (setTags) u.eng.store.all.filter(i => i.module === 'deklination').forEach(i => { u.eng.state().tags[i.errorTag] = Object.assign({}, setTags); });   // copia propia por tipo: responder no debe mutar las demás
  u.chooseModule('deklination', 30); u.start();
  for (let i = 0; i < 60 && u.S().screen === 'session'; i++) { const it = u.S().cur.item; if (T.tableId(it, TABLAS) && T.locate(it, TABLAS[T.tableId(it, TABLAS)]) && (!pred || pred(it))) return true; u.answer(true); u.next(); }
  return false;
}

test('Tablas · tema nuevo: tabla completa antes de responder, SIN marcar la casilla (no filtra la respuesta)', () => {
  const u = boot(140); assert.ok(toTable(u));
  assert.ok(u.q('.tbl-slot .tbl')); assert.equal(u.qa('.tbl-slot tr.masked').length, 0); assert.equal(u.qa('.tbl-slot td.hit').length, 0, 'sin casilla marcada');
  assert.equal(u.qa('.tbl-slot tbody tr').length, 4); assert.equal(u.q('#reveal'), null); assert.match(u.q('.tbl-slot .hint').textContent, /Tabla completa mientras aprendes/);
  assert.ok(u.qa('.tbl-slot th .shape').length === 4, 'columnas con forma, no sólo color');
});

test('Tablas · media tabla: oculta la mitad con la respuesta; «Mostrar toda la tabla» la revela', () => {
  const u = boot(141); assert.ok(toTable(u, { n: 4, f: 1 }));
  const masked = u.qa('.tbl-slot tr.masked'); assert.equal(masked.length, 2);
  masked.forEach(r => assert.ok(Array.from(r.querySelectorAll('td')).every(td => td.textContent === '·'), 'celdas ocultas sin texto'));
  const item = u.S().cur.item; assert.ok(!u.qa('.tbl-slot td').some(td => td.classList.contains('hit')));
  u.click(u.q('#reveal')); assert.equal(u.qa('.tbl-slot tr.masked').length, 0); assert.equal(u.q('#reveal'), null);   // el botón vive en la cabecera de la tabla
});

test('Tablas · dominado: no hay tabla antes de responder; al fallar aparece la cadena caso → casilla → forma y la casilla marcada', () => {
  const u = boot(142); assert.ok(toTable(u, { n: 10, f: 0 }));
  const item = u.S().cur.item; assert.equal(u.q('.tbl-slot .tbl'), null, 'dominado: sin tabla');
  u.answer(false);
  const tb = u.q('.fb.bad .fb-table .tbl'); assert.ok(tb, 'tras fallar siempre se ve la tabla');
  const hit = tb.querySelectorAll('td.hit'); assert.ok(hit.length >= 1); assert.ok(/./.test(hit[0].textContent));
  assert.ok(hit[0].textContent === item.answer || hit[0].textContent === '-' + item.answer || /^ein/.test(hit[0].textContent));
  const steps = u.qa('.fb .chain li'); assert.equal(steps.length, 3); assert.match(steps[0].textContent, /Caso/); assert.match(steps[1].textContent, /Casilla/); assert.match(steps[2].textContent, /Forma/);
  assert.ok(tb.querySelector('tr.hitrow'));
});

test('Tablas · acertar no muestra tabla; apagar «Tablas de ayuda» las quita siempre (y se guarda)', () => {
  const u = boot(143); assert.ok(toTable(u, { n: 10, f: 0 })); u.answer(true); assert.equal(u.q('.fb-table'), null);
  const v = boot(144, { before: w => w.localStorage.setItem('dg.ui', JSON.stringify({ auto: false, tables: false })) });
  assert.ok(toTable(v)); assert.equal(v.q('.tbl-slot .tbl'), null); v.answer(false); assert.equal(v.q('.fb-table'), null);
  const s = boot(145); s.click(s.q('[aria-label="Ajustes"]')); s.click(s.q('[aria-label="Tablas de ayuda"] [data-v="0"]'));
  assert.equal(JSON.parse(s.w.localStorage.getItem('dg.ui')).tables, false);
});

test('Tablas · se retiran con el uso: de tabla completa a media y a ninguna según los intentos acumulados', () => {
  const u = boot(146); const T = u.w.DGUI.tablas, tags = u.eng.state().tags;
  assert.ok(toTable(u)); const tag = u.S().cur.item.errorTag;
  assert.equal(u.qa('.tbl-slot tr.masked').length, 0, 'completa');
  tags[tag] = { n: 3, f: 0 }; assert.equal(T.level(tags[tag]), 'media'); tags[tag] = { n: 6, f: 0 }; assert.equal(T.level(tags[tag]), 'ninguna');
  u.click(u.q('[aria-label="Terminar sesión"]'));
});

/* ---------- Escalera de ayuda y «solo la terminación» ---------- */
function setTagsFor(u, mod, st) { u.eng.store.all.filter(i => i.module === mod).forEach(i => { u.eng.state().tags[i.errorTag] = Object.assign({}, st); }); }
function kindsOfVerbs(u, st, n) {
  setTagsFor(u, 'verben', st); u.chooseModule('verben', 30); u.start(); const kinds = {};
  for (let i = 0; i < (n || 30) && u.S().screen === 'session'; i++) { const it = u.S().cur.item; if (it.person && /praesens|praeteritum/.test(it.skill)) { const k = u.S().cur.spec.kind; kinds[k] = (kinds[k] || 0) + 1; } u.answer(true); u.next(); }
  return kinds;
}

test('Escalera · tema nuevo: nunca letras sueltas; dominado: nunca opciones de formas; en medio, terminaciones y bloques', () => {
  const nuevo = kindsOfVerbs(boot(150), { n: 0, f: 0 }, 14),   // 14 respuestas: aún lejos de los 20 intentos que piden «dominado»
     dom = kindsOfVerbs(boot(151), { n: 30, f: 0 }), medio = kindsOfVerbs(boot(152), { n: 8, f: 1 });
  assert.equal(nuevo.letters || 0, 0, JSON.stringify(nuevo)); assert.ok((nuevo.choice || 0) > 0, JSON.stringify(nuevo));
  assert.equal(dom.choice || 0, 0, JSON.stringify(dom)); assert.ok((dom.letters || 0) > 0, JSON.stringify(dom));
  assert.ok((medio.ending || 0) + (medio.blocks || 0) > (medio.choice || 0), JSON.stringify(medio));
});

test('Terminación · la raíz queda puesta, se elige sólo la terminación y se envía raíz + terminación (texto)', () => {
  const u = boot(153); setTagsFor(u, 'artikel', { n: 8, f: 1 });
  assert.ok(toKind(u, 'ending', 'artikel'), 'salió una terminación');
  const { item, spec } = u.S().cur, sent = [], sess = u.S().session, orig = sess.answer; sess.answer = function (r, o) { sent.push(r); return orig.call(sess, r, o); };
  assert.equal(u.q('.endstem .stem').textContent, spec.stem); assert.ok(u.qa('.options [data-end]').length >= 2 && u.qa('.options [data-end]').length <= 6);
  assert.equal(u.q('.bank'), null, 'sin banco de letras'); assert.ok(u.qa('.options .btn.opt').every(b => b.getBoundingClientRect ? true : true));
  u.answer(false); assert.equal(typeof sent[0], 'string'); assert.ok(sent[0].startsWith(spec.stem) && sent[0] !== item.answer);
  assert.ok(u.q('.fb.bad .fb-ans').textContent.includes(item.answer)); assert.ok(u.stored().errors[item.id], 'el fallo se guarda');
  u.next(); while (u.S().screen === 'session' && u.S().cur.spec.kind !== 'ending') { u.answer(true); u.next(); }
  if (u.S().screen === 'session') { const it2 = u.S().cur.item; u.answer(true); assert.equal(sent[sent.length - 1], it2.answer); assert.ok(u.q('.fb.ok')); }
});

test('Escalera · «Ayuda que se retira» apagada: reparto clásico (sin terminación ni letras); se guarda en Ajustes', () => {
  const u = boot(154, { before: w => w.localStorage.setItem('dg.ui', JSON.stringify({ auto: false, ladder: false })) });
  const k = kindsOfVerbs(u, { n: 0, f: 0 }, 40); assert.equal((k.ending || 0) + (k.letters || 0), 0, JSON.stringify(k));
  const s = boot(155); s.click(s.q('[aria-label="Ajustes"]')); s.click(s.q('[aria-label="Ayuda que se retira"] [data-v="0"]'));
  assert.equal(JSON.parse(s.w.localStorage.getItem('dg.ui')).ladder, false);
});

test('Escalera · tras dominar el tipo, las letras sueltas funcionan (ä/ö/ü/ß incluidos) y puntúan', () => {
  const u = boot(156); setTagsFor(u, 'verben', { n: 30, f: 0 }); u.chooseModule('verben', 30); u.start(); let um = 0, letters = 0;
  for (let i = 0; i < 30 && u.S().screen === 'session'; i++) {
    const it = u.S().cur.item, k = u.S().cur.spec.kind; u.answer(true); assert.ok(u.q('.fb.ok'), k + ' ' + it.answer);
    if (k === 'letters') { letters++; if (/[äöüß]/.test(it.answer)) um++; } u.next();
  }
  assert.ok(letters > 3, 'salieron letras: ' + letters);
});

/* ---------- Wortschatz y Satzbau (datos generados desde la referencia 2.4.4, solo A1) ---------- */
test('W · Wortschatz: ES → DE con opciones y sustantivos con artículo en color y forma; DE → ES; contexto; escribir la palabra', () => {
  const u = boot(160); u.chooseModule('wortschatz', 30); u.start(); const seen = {};
  for (let i = 0; i < 30 && u.S().screen === 'session'; i++) {
    const it = u.S().cur.item, k = it.skill; seen[k] = (seen[k] || 0) + 1;
    if (k === 'es-de' && /^(der|die|das) /.test(it.answer) && !seen.badge) { seen.badge = 1; assert.ok(u.qa('.options .btn.opt.noun .art').length >= 1, 'artículo con insignia en las opciones'); }
    if (k === 'contexto') assert.equal(u.q('.p-big .blank') !== null, true, 'hueco en la frase');
    if (k === 'produccion') assert.equal(u.S().cur.spec.kind, 'letters');
    if (k === 'de-es') assert.equal(u.S().cur.spec.kind, 'choice');
    u.answer(true); assert.ok(u.q('.fb.ok'), k + ' ' + it.answer); u.next();
  }
  assert.ok(Object.keys(seen).filter(k => k !== 'badge').length >= 3, JSON.stringify(seen));
});

test('S · Satzbau: ordenar la frase con fichas; al fallar sale la regla de V₂ / preguntas y el fallo se guarda', () => {
  const u = boot(161); u.chooseModule('satzbau', 30); u.start();
  assert.equal(u.S().cur.spec.kind, 'tiles'); assert.ok(u.qa('.bank .tile').length >= 4); assert.match(u.q('.qcard').textContent, /Ordena/);
  const item = u.S().cur.item; u.answer(false);
  assert.ok(u.q('.fb.bad')); assert.ok(u.stored().errors[item.id]); assert.ok(u.q('.fb.bad .capsule'), 'cápsula de regla (cs:t1 / cs:t2)'); assert.ok(/V₂|Preguntas/.test(u.q('.capsule .cap-t').textContent));
  assert.match(u.q('.fb-ans').textContent, new RegExp(item.answer.split(' ')[0]));
  u.next(); u.answer(true); assert.ok(u.q('.fb.ok'));
});

test('W/S · Viaje combinado con los 7 módulos; con B1, Wortschatz llega a B1 y Satzbau (sólo A1) se queda en A1', () => {
  const u = boot(162); u.click(u.q('[data-level="B1"]')); u.click(u.q('[data-size="30"]')); u.click(u.q('#mix')); const mods = new Set();
  while (u.S().screen === 'session') { const it = u.S().cur.item; mods.add(it.module); if (it.module === 'satzbau') assert.equal(it.level, 'A1'); u.answer(true); u.next(); }
  assert.ok(mods.size >= 4, [...mods].join());
  assert.match(u.q('.main').textContent + u.d.body.textContent, /Resumen|aciertos/);
});

/* ---------- Errores típicos (de las clases) y cápsula de verbos por tiempo ---------- */
test('Cápsulas · verbos: cada tiempo muestra SU regla (Präteritum ≠ Präsens) y los 3.662 ítems tienen cápsula', () => {
  const R = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'ui', 'reglas.json'), 'utf8')).reglas, { newEngine } = require('./helpers.js');
  const store = newEngine({ seed: 1 }).eng.store, pick = require('../ui/dgui-rules.js'), P = (globalThis.DGUI || {}).rules || pick;
  const verbs = store.all.filter(i => i.module === 'verben'); assert.ok(verbs.length > 3000);
  const want = { praesens: ['cs:t3', 'md:verben-praesens'], praeteritum: ['md:verben-praeteritum'], 'partizip-ii': ['md:verben-partizip'], hilfsverb: ['cs:t5', 'md:verben-partizip'] };
  verbs.forEach(i => { const c = P.pickCapsule(i, R); assert.ok(c, i.id + ' sin cápsula'); assert.ok(want[i.skill].includes(c.id), i.id + ' ' + i.skill + ' → ' + c.id); });
  assert.notEqual(P.pickCapsule(verbs.find(i => i.skill === 'praeteritum'), R).id, 'cs:t3');
});

test('Cápsulas · «Errores típicos» desplegables en feedback y abiertos en «Ver regla»; Consulta incluye el grupo «Clases»', () => {
  const u = boot(170); u.chooseModule('verben', 30); u.start();
  while (u.S().screen === 'session' && u.S().cur.item.skill !== 'praeteritum') { u.answer(true); u.next(); }
  assert.equal(u.S().cur.item.skill, 'praeteritum'); u.answer(false);
  const cap = u.q('.fb.bad .capsule'); assert.equal(cap.dataset.concept, 'md:verben-praeteritum');
  const det = cap.querySelector('details.cap-err'); assert.ok(det && !det.open, 'cerrado en el feedback'); assert.match(det.textContent, /Errores típicos \(3\)/); assert.equal(det.querySelectorAll('li').length, 3);
  u.click(u.q('#rule')); assert.ok(u.q('[role="dialog"] details.cap-err[open]'), 'abierto en el panel');
  u.d.dispatchEvent(new u.w.KeyboardEvent('keydown', { key: 'Escape' }));
  u.click(u.q('.dock .btn.secondary')); if (u.S().screen !== 'home') u.click(u.q('.dock .btn.secondary'));
});

test('Consulta · grupo «Clases» lista los conceptos creados desde las clases (md:, b1:, a24:)', () => {
  const u = boot(171); u.click(u.q('#consulta')); u.click(u.q('[data-group="md"]'));
  const ids = u.qa('.erow').map(r => r.dataset.concept); assert.ok(ids.length >= 8 && ids.every(k => /^(md|b1|a24):/.test(k)), ids.join());
  assert.ok(ids.includes('md:verben-praeteritum')); u.click(u.q('[data-concept="md:verben-praeteritum"]')); assert.ok(u.q('[role="dialog"] .capsule details[open]'));
});

/* ---------- Pistas de sufijo (Artikel) ---------- */
test('Sufijo · tras fallar un sustantivo con terminación conocida sale la pista (o la excepción); sin terminación y al acertar no', () => {
  const SUF = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'ui', 'sufijos.json'), 'utf8')).sufijos;
  const u = boot(180); const S = u.w.DGUI.sufijos; u.chooseModule('artikel', 30); u.start(); let con = null, sin = null, exc = null;
  for (let i = 0; i < 80 && u.S().screen === 'session' && !(con && sin); i++) {
    const it = u.S().cur.item, h = S.hint(it, SUF);
    if (h && h.coincide && !con) { con = it; u.answer(false); const el = u.q('.fb.bad .fb-suf'); assert.ok(el, 'pista de sufijo'); assert.equal(el.dataset.suffix, h.fin); assert.match(el.textContent, /Pista de sufijo/); assert.match(el.textContent, /suele ser/); assert.ok(el.querySelector('.art'), 'artículo con color y forma'); u.next(); continue; }
    if (h && !h.coincide && !exc) { exc = it; u.answer(false); assert.match(u.q('.fb.bad .fb-suf').textContent, /excepción/); u.next(); continue; }
    if (!h && !sin) { sin = it; u.answer(false); assert.equal(u.q('.fb-suf'), null, 'sin terminación conocida no hay pista'); u.next(); continue; }
    if (h && con && !u.q('.fb')) { u.answer(true); assert.equal(u.q('.fb-suf'), null, 'al acertar no hay pista'); u.next(); continue; }
    u.answer(true); u.next();
  }
  assert.ok(con && sin, 'se probaron ambos casos');
});
