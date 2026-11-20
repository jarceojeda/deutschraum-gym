/* dgui-app.js — pantallas y flujo: inicio, sesión, resumen, ajustes y panel «ver regla».
 * mount(root, {win, engine, concepts, storageOk, prefs, rnd}) → controlador (go, state) para pruebas. */
(function (g) {
  'use strict';
  var D = g.DGUI, U = D.util, h = U.h, I = D.inputs;
  var MODULES = [
    { id: 'verben', name: 'Verben', desc: 'Conjugar con toques: Präsens, Präteritum, Partizip II, haben/sein' },
    { id: 'artikel', name: 'Artikel', desc: 'Género con color y forma, plural, artículo indefinido' },
    { id: 'deklination', name: 'Deklination', desc: 'Caso, artículo y terminaciones: Akk, Dat, Gen, N-Deklination' }
  ];
  var SIZES = [{ n: 10, label: '10' }, { n: 20, label: '20' }, { n: 30, label: '30' }];
  var WARN = {
    NO_ERRORS: 'No hay errores pendientes que repasar.', ERRORS_NOT_READY: 'Tus errores aún no están listos para repasar (hace falta esperar unas horas).',
    NO_MODULES: 'No hay módulo elegido.', POOL_UNDER_MIN: 'Hay pocos ejercicios disponibles en este módulo con tu tope de nivel.',
    MODULE_EMPTY_UNDER_CAP: 'Este módulo no tiene ejercicios con tu tope de nivel actual (cámbialo en Ajustes).',
    LEVEL_THIN: 'Hay pocos ejercicios en algún nivel; la sesión puede repetir más.', SHORTFALL: 'La sesión es más corta de lo pedido: no hay ejercicios suficientes.'
  };

  function mount(root, ctx) {
    var win = ctx.win, doc = win.document, eng = ctx.engine, prefs = ctx.prefs, rules = D.rules.create(eng.store, ctx.concepts);
    U.doc = doc;
    var S = { screen: 'home', module: prefs.get('module') || 'verben', size: prefs.get('size') || 10, session: null, cur: null, saveError: null, warnings: [] };
    var api = { state: S };

    function reducedMotion() { try { return win.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }
    function buzz(ms) { U.buzz(win, prefs, ms); }
    function saveBanner() {
      return S.saveError ? h('div.notice.warn', { role: 'status' }, 'No se pudo guardar tu progreso (almacenamiento lleno o bloqueado). Puedes seguir practicando, pero esta sesión podría perderse si cierras la pestaña.') : null;
    }
    function storageBanner() { return ctx.storageOk ? null : h('div.notice.warn', { role: 'status' }, 'Este navegador no deja guardar datos: tu progreso no se conservará al cerrar.'); }
    function shell(title, left, right, mainChildren, dockChildren, cls) {
      U.clear(root);
      root.className = 'app ' + (cls || '');
      var main = h('main.main', { id: 'main', tabindex: '-1' }, mainChildren);
      root.appendChild(h('header.top', left, h('h1.title', title), right || h('span.spacer')));
      root.appendChild(main);
      var dock = h('footer.dock', dockChildren);
      root.appendChild(dock);
      return { main: main, dock: dock };
    }
    function iconBtn(label, glyph, fn) { return h('button.btn.ghost.icon', { type: 'button', 'aria-label': label, onclick: fn }, glyph); }

    /* ---------- inicio ---------- */
    function home() {
      S.screen = 'home'; S.session = null; S.cur = null;
      var list = h('div.cards', { role: 'radiogroup', 'aria-label': 'Módulo' });
      MODULES.forEach(function (m) {
        var on = S.module === m.id, lvl = eng.levelOf(m.id);
        list.appendChild(h('button.card' + (on ? '.on' : ''), { type: 'button', role: 'radio', 'aria-checked': on ? 'true' : 'false', 'data-module': m.id,
          onclick: function () { S.module = m.id; prefs.set('module', m.id); home(); } },
          h('span.card-h', h('span.card-name', m.name), h('span.badge', 'Nivel ' + lvl)), h('span.card-d', m.desc)));
      });
      var chips = h('div.chips', { role: 'radiogroup', 'aria-label': 'Tamaño de sesión' });
      SIZES.forEach(function (z) {
        chips.appendChild(h('button.chip' + (S.size === z.n ? '.on' : ''), { type: 'button', role: 'radio', 'aria-checked': S.size === z.n ? 'true' : 'false', 'data-size': z.n,
          onclick: function () { S.size = z.n; prefs.set('size', z.n); home(); } }, z.label + ' ejercicios'));
      });
      var nerr = eng.errorQueue().length;
      shell('Deutschraum Gym', h('span.spacer'), iconBtn('Ajustes', '⚙', settings),
        [storageBanner(), h('p.lead', 'Elige qué practicar'), list, nerr ? h('p.hint', 'Errores pendientes: ' + nerr + '. Entran solos en tus próximas sesiones.') : null],
        [h('div.dock-in', chips, h('button.btn.primary.big', { type: 'button', id: 'start', onclick: start }, 'Empezar'))]);
    }

    /* ---------- sesión ---------- */
    function start() {
      var s;
      try { s = eng.startSession({ kind: 'module', modules: [S.module], size: S.size, mode: 'touch' }); }
      catch (e) { S.warnings = [{ code: 'ERROR', msg: String(e && e.message || e) }]; }
      if (!s || !s.length()) { toast('No hay ejercicios para esta sesión. ' + (s && s.warnings && s.warnings.length ? WARN[s.warnings[0].code] || '' : 'Revisa el tope de nivel en Ajustes.')); return; }
      S.session = s; S.saveError = null; S.answeredAny = false;
      S.warnings = (s.warnings || []).map(function (w) { return { code: w.code, msg: WARN[w.code] || w.code }; });
      question();
    }
    function toast(msg) {
      var t = h('div.toast', { role: 'status' }, msg); root.appendChild(t);
      win.setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 4000);
    }
    function promptNode(v, item) {
      var box = h('div.prompt');
      var parts = String(v.prompt).split(' · ');
      if (v.module === 'verben' && parts.length === 3) {
        box.appendChild(h('div.p-big', parts[0]));
        box.appendChild(h('div.p-sub', D.rules.skillLabel(parts[1]) + ' · ' + parts[2].replace('er_sie_es', 'er/sie/es').replace('sie_Sie', 'sie/Sie')));
      } else if (v.module === 'artikel' && v.skill === 'genero') {
        box.appendChild(h('div.p-big', h('span.blank', '___'), ' ', v.prompt));
      } else if (v.module === 'artikel') {
        var m = /^(der|die|das)\s+(.*)$/i.exec(v.prompt);
        box.appendChild(h('div.p-big', m ? [I.artikelBadge(m[1]), ' ', m[2]] : v.prompt));
      } else {
        var segs = String(v.prompt).split(/_{2,}/);
        box.appendChild(h('div.p-big.p-sent', segs.reduce(function (acc, sg, i) { if (i) acc.push(h('span.blank', '___')); acc.push(sg); return acc; }, [])));
      }
      if (v.showTranslation && v.translation) box.appendChild(h('div.p-tr', '“' + v.translation + '”'));
      if (v.hint) box.appendChild(h('div.p-hint', v.hint));
      return box;
    }
    function sessionFrame(mainChildren, dockNode) {
      var s = S.session, pos = Math.min(s.position() + (S.cur && S.cur.fb ? 1 : 0), s.length());
      var bar = h('div.progress', { role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': String(s.length()), 'aria-valuenow': String(pos) }, h('div.progress-fill', { style: 'width:' + Math.round(100 * pos / s.length()) + '%' }));
      var parts = shell(MODULES.filter(function (m) { return m.id === S.module; })[0].name,
        iconBtn('Terminar sesión', '✕', endEarly), h('span.count', pos + '/' + s.length()),
        [bar, saveBanner(), S.warnings.length && s.position() === 0 && !S.answeredAny ? h('div.notice', { role: 'status' }, S.warnings.map(function (w) { return h('div', w.msg); })) : null].concat(mainChildren), [dockNode], 'in-session');
      return parts;
    }
    function question(note) {
      var s = S.session; S.screen = 'session';
      if (s.done()) return summary();
      var v = s.view(), item = s.currentItem();
      S.cur = { view: v, item: item, fb: null };
      var inp = I.mount(v, item, { rnd: ctx.rnd, onSubmit: function (resp) { submit(resp); }, onGiveUp: giveUp });
      var tags = h('div.tags', h('span.tag', D.rules.skillLabel(v.skill)), h('span.tag', v.level), v.retry ? h('span.tag.retry', 'Otra vez') : null);
      sessionFrame([tags, promptNode(v, item), inp.answerEl, note ? h('div.notice', { role: 'status' }, note) : null], inp.dockEl);
    }
    function submit(resp) {
      var s = S.session, item = S.cur.item, v = S.cur.view;
      var out;
      try { out = s.answer(resp, { mode: 'touch' }); } catch (e) { toast('Error: ' + e.message); return; }
      S.answeredAny = true;
      if (out.saveError) S.saveError = out.saveError; else if (S.saveError) S.saveError = null;
      if (out.almost) { buzz(10); return question('Casi. Revisa tu respuesta e inténtalo otra vez.'); }
      var ok = out.evaluation.verdict === 'correct';
      buzz(ok ? 12 : [30, 40, 30]);
      feedback({ ok: ok, out: out, item: item, view: v, resp: resp, gaveUp: false });
    }
    function giveUp() {
      var s = S.session, item = S.cur.item, v = S.cur.view, out;
      try { out = s.giveUp(); } catch (e) { toast('Error: ' + e.message); return; }
      S.answeredAny = true;
      if (out.saveError) S.saveError = out.saveError; else if (S.saveError) S.saveError = null;
      feedback({ ok: false, out: out, item: item, view: v, resp: null, gaveUp: true });
    }
    function expectedText(item) {
      if (item.type === 'minimal-pair') return item.wo.answer + ' / ' + item.wohin.answer;
      return item.answer;
    }
    function feedback(f) {
      var s = S.session, item = f.item;
      S.cur.fb = f;
      var body = [];
      if (f.ok) {
        body.push(h('div.fb.ok', { role: 'status' }, h('span.fb-ico', { 'aria-hidden': 'true' }, '✓'), h('strong', '¡Correcto!'), f.out.rescued ? h('span.badge.rescue', 'Rescatada: la fallabas antes') : null, ' ', h('span.fb-ans', expectedText(item))));
      } else {
        var art = I.artikelBadge(item.answer);
        body.push(h('div.fb.bad', { role: 'status' },
          h('div.fb-h', h('span.fb-ico', { 'aria-hidden': 'true' }, '✗'), h('strong', f.gaveUp ? 'Respuesta' : 'No era esa')),
          h('div.fb-ans', art || expectedText(item)),
          !f.gaveUp && f.resp ? h('div.fb-yours', 'Tu respuesta: ' + (Array.isArray(f.resp) ? f.resp.join(item.type === 'order' ? ' ' : '') : typeof f.resp === 'object' ? JSON.stringify(f.resp) : f.resp)) : null,
          h('div.fb-line', rules.oneLine(item)),
          f.out.retryScheduled ? h('div.fb-retry', 'Volverá a salir en unos ejercicios.') : null));
      }
      var next = h('button.btn.primary.big', { type: 'button', id: 'next', onclick: function () { if (f.out.finished || s.done()) summary(); else question(); } }, f.out.finished || s.done() ? 'Ver resumen' : 'Siguiente');
      var dock = h('div.dock-in', h('div.row', f.ok ? null : h('button.btn.secondary', { type: 'button', id: 'rule', onclick: function () { openRule(item); } }, 'Ver regla'), next));
      var q = h('div.prompt.dim', promptNode(f.view, item));
      sessionFrame([q].concat(body), dock);
      var nb = root.querySelector('#next'); if (nb && nb.focus) nb.focus({ preventScroll: true });
    }
    function endEarly() {
      if (S.session && S.answeredAny) summary(); else { if (S.session) S.session.finish(); home(); }
    }

    /* ---------- panel «ver regla» ---------- */
    function openRule(item) {
      var p = rules.panel(item), opener = doc.activeElement;
      var back = h('div.sheet-back', { onclick: function (e) { if (e.target === back) close(); } });
      function close() { if (back.parentNode) back.parentNode.removeChild(back); doc.removeEventListener('keydown', onKey); if (opener && opener.focus) opener.focus(); }
      function onKey(e) { if (e.key === 'Escape') close(); }
      var content = [];
      if (p.concepts.length) content.push(h('div.r-concepts', p.concepts.map(function (c) { return h('div.r-concept', c); })));
      if (p.explanation) content.push(h('p.r-expl', p.explanation));
      if (p.table) content.push(h('table.r-table', h('caption', p.table.caption), h('tbody', p.table.rows.map(function (r) { return h('tr' + (r.hit ? '.hit' : ''), h('th', r.k), h('td', r.v)); }))));
      if (p.examples.length) content.push(h('div.r-ex', h('h3', 'Más ejemplos de este tema'), h('ul', p.examples.map(function (e) { return h('li', h('span', e.prompt), ' → ', h('strong', e.answer)); }))));
      if (!p.explanation) content.push(h('p.r-note', 'Esta versión aún no trae el texto completo de la regla: se muestran el tema, la forma correcta y ejemplos del mismo tema.'));
      var sheet = h('div.sheet', { role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Regla: ' + p.title },
        h('div.sheet-h', h('h2', p.title), h('button.btn.ghost.icon', { type: 'button', 'aria-label': 'Cerrar', onclick: close }, '✕')),
        h('div.sheet-b', content), h('div.sheet-f', h('button.btn.primary.big', { type: 'button', onclick: close }, 'Entendido')));
      back.appendChild(sheet); root.appendChild(back); doc.addEventListener('keydown', onKey);
      var cb = sheet.querySelector('.sheet-f button'); if (cb) cb.focus();
    }
    api.openRule = openRule;

    /* ---------- resumen ---------- */
    function summary() {
      var s = S.session, sm = s.finish();
      S.screen = 'summary'; S.summary = sm;
      if (sm.saveError) S.saveError = sm.saveError;
      var pct = sm.answered ? Math.round(100 * sm.correct / sm.answered) : 0, blocks = [];
      blocks.push(h('div.sum-score', h('div.sum-big', sm.correct + '/' + sm.answered), h('div.sum-sub', sm.answered ? pct + ' % de aciertos al primer intento' : 'Sin respuestas esta vez')));
      if (sm.newUnits > 0) blocks.push(h('div.sum-card.learn', h('strong', 'Hoy aprendiste ' + sm.newUnits + (sm.newUnits === 1 ? ' cosa' : ' cosas') + ' que ayer no sabías.')));
      if (sm.rescued && sm.rescued.length) {
        blocks.push(h('div.sum-card.rescue', h('strong', 'Rescataste ' + sm.rescued.length + (sm.rescued.length === 1 ? ' ejercicio' : ' ejercicios') + ' que fallabas.'),
          h('ul', sm.rescued.slice(0, 6).map(function (id) { var it = eng.store.byId[id]; return h('li', it ? it.prompt + ' → ' + expectedText(it) : id); }))));
      }
      var tags = Object.keys(sm.errorsByTag || {}).sort(function (a, b) { return sm.errorsByTag[b] - sm.errorsByTag[a]; });
      if (tags.length) blocks.push(h('div.sum-card', h('strong', 'Errores por tipo'), h('ul.tagl', tags.map(function (t) { return h('li', h('span', D.rules.tagLabel(t)), h('span.n', String(sm.errorsByTag[t]))); }))));
      else if (sm.answered) blocks.push(h('div.sum-card', h('strong', 'Sin errores. Muy bien.')));
      (sm.levelChanges || []).forEach(function (c) { blocks.push(h('div.sum-card', h('strong', (c.change === 'promote' || c.to > c.from ? 'Subiste de nivel' : 'Cambio de nivel') + ': ' + c.module + ' ' + c.from + ' → ' + c.to))); });
      shell('Resumen', h('span.spacer'), h('span.spacer'), [saveBanner(), blocks], [h('div.dock-in', h('div.row', h('button.btn.secondary', { type: 'button', onclick: home }, 'Inicio'), h('button.btn.primary.big', { type: 'button', id: 'again', onclick: start }, 'Otra sesión')))], 'summary');
    }

    /* ---------- ajustes ---------- */
    function settings() {
      S.screen = 'settings';
      var st = eng.state().settings, theme = prefs.get('theme');
      function seg(name, opts, cur, fn) {
        return h('div.seg', { role: 'radiogroup', 'aria-label': name }, opts.map(function (o) {
          return h('button.chip' + (cur === o[0] ? '.on' : ''), { type: 'button', role: 'radio', 'aria-checked': cur === o[0] ? 'true' : 'false', 'data-v': o[0], onclick: function () { fn(o[0]); settings(); } }, o[1]);
        }));
      }
      shell('Ajustes', iconBtn('Volver', '←', home), h('span.spacer'), [
        h('section.set', h('h2', 'Tope de nivel'), h('p.hint', 'No verás ejercicios por encima de este nivel.'),
          seg('Tope de nivel', [['A1', 'A1'], ['A2', 'A2'], ['B1', 'B1']], st.levelCap, function (v) { eng.setLevelCap(v); eng.progress.save(); })),
        h('section.set', h('h2', 'Tema'), seg('Tema', [['auto', 'Sistema'], ['light', 'Claro'], ['dark', 'Oscuro']], theme, function (v) { prefs.set('theme', v); U.applyTheme(doc, v); })),
        h('section.set', h('h2', 'Vibración suave'), seg('Vibración', [['1', 'Sí'], ['0', 'No']], prefs.get('vibrate') ? '1' : '0', function (v) { prefs.set('vibrate', v === '1'); })),
        h('p.hint', 'El movimiento reducido del sistema se respeta automáticamente' + (reducedMotion() ? ' (activo ahora).' : '.'))
      ], [h('div.dock-in', h('button.btn.primary.big', { type: 'button', onclick: home }, 'Listo'))]);
    }

    api.go = function (name) { ({ home: home, settings: settings }[name] || home)(); };
    U.applyTheme(doc, prefs.get('theme'));
    home();
    return api;
  }
  D.mount = mount; D.MODULES = MODULES;
})(typeof globalThis !== 'undefined' ? globalThis : this);
