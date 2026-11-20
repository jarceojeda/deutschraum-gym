/* dgui-app.js — pantallas y flujo: inicio, sesión, resumen, ajustes y panel «ver regla».
 * mount(root, {win, engine, concepts, storageOk, prefs, rnd}) → controlador (go, state) para pruebas. */
(function (g) {
  'use strict';
  var D = g.DGUI, U = D.util, h = U.h, I = D.inputs, F = D.fmt;
  var MODULES = [
    { id: 'verben', icon: 'V', name: 'Verben', desc: 'Conjugar con toques: Präsens, Präteritum, Partizip II, haben/sein' },
    { id: 'artikel', icon: 'A', name: 'Artikel', desc: 'Género con color y forma, plural, artículo indefinido' },
    { id: 'deklination', icon: 'D', name: 'Deklination', desc: 'Caso, artículo y terminaciones: Akk, Dat, Gen, N-Deklination' },
    { id: 'praepositionen', icon: 'P', name: 'Präpositionen', desc: 'Wo? / Wohin?, contracciones, verbos con preposición' },
    { id: 'konnektoren', icon: 'K', name: 'Konnektoren', desc: 'weil, dass, wenn… ordenar frases y partículas modales' },
    { id: 'wortschatz', icon: 'W', name: 'Wortschatz', desc: 'Vocabulario por situaciones: ES ↔ DE, en contexto y escribir la palabra' },
    { id: 'satzbau', icon: 'S', name: 'Satzbau', desc: 'Ordenar frases con toques: afirmaciones, preguntas y transformaciones' }
  ];
  var SIZES = [{ n: 10, label: '10' }, { n: 20, label: '20' }, { n: 30, label: '30' }];
  var SOON = [];   // todos los módulos del SPEC ya son jugables

  var LEVELS = [['auto', 'Auto'], ['A1', 'A1'], ['A2', 'A2'], ['B1', 'B1']];   // Auto = rampa por dominio hasta B1; A1/A2/B1 = practicar ese nivel (con repaso de los anteriores)
  var WARN = {
    NO_ERRORS: 'No hay errores pendientes que repasar.', ERRORS_NOT_READY: 'Tus errores aún no están listos para repasar (hace falta esperar unas horas).',
    NO_MODULES: 'No hay módulo elegido.', POOL_UNDER_MIN: 'Hay pocos ejercicios disponibles en este módulo con tu tope de nivel.',
    MODULE_EMPTY_UNDER_CAP: 'Este módulo no tiene ejercicios con tu tope de nivel actual (cámbialo en Ajustes).',
    LEVEL_THIN: 'Hay pocos ejercicios en algún nivel; la sesión puede repetir más.', SHORTFALL: 'La sesión es más corta de lo pedido: no hay ejercicios suficientes.'
  };

  function mount(root, ctx) {
    var win = ctx.win, doc = win.document, eng = ctx.engine, prefs = ctx.prefs, rules = D.rules.create(eng.store, ctx.concepts, ctx.reglas);
    U.doc = doc;
    var S = { screen: 'home', module: prefs.get('module') || 'verben', size: prefs.get('size') || 10, session: null, cur: null, saveError: null, warnings: [] };
    var ret = D.retention.create(prefs, function () { return win.Date.now(); });
    var voice = D.voice.create(win, prefs);
    var HAP = { tap: 8, ok: 12, warn: [15, 40, 15], bad: [30, 40, 30], milestone: [18, 45, 28] };
    var api = { state: S, ret: ret, voice: voice };

    function reducedMotion() { try { return win.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }
    function buzz(ms) { U.buzz(win, prefs, ms); }
    function saveBanner() {
      return S.saveError ? h('div.notice.warn', { role: 'status' }, 'No se pudo guardar tu progreso (almacenamiento lleno o bloqueado). Puedes seguir practicando, pero esta sesión podría perderse si cierras la pestaña.') : null;
    }
    function storageBanner() { return ctx.storageOk ? null : h('div.notice.warn', { role: 'status' }, 'Este navegador no deja guardar datos: tu progreso no se conservará al cerrar.'); }
    function shell(title, left, right, mainChildren, dockChildren, cls, module) {
      U.clear(root);
      root.className = 'app ' + (cls || '');
      var bar = h('header.appbar' + (module ? '.sess' : ''), module ? { 'data-module': module } : null, left, right);
      var main = h('main.main', { id: 'main', tabindex: '-1' }, mainChildren);
      root.appendChild(bar); root.appendChild(main);
      var dock = null;
      if (dockChildren && dockChildren.length) { dock = h('footer.dock', dockChildren); root.appendChild(dock); }
      return { main: main, dock: dock, bar: bar };
    }
    function brand(title, sub) { return h('div.brand', h('span.brand-mark', { 'aria-hidden': 'true' }, 'D'), h('div.brand-t', h('strong', title), sub ? h('small', sub) : null)); }
    function iconBtn(label, glyph, fn) { return h('button.btn.ghost.icon', { type: 'button', 'aria-label': label, onclick: fn }, glyph); }

    /* ---------- inicio ---------- */
    function chipRow(label, opts, cur, fn, attr) {
      return h('div.chips', { role: 'radiogroup', 'aria-label': label }, opts.map(function (o) {
        var a = { type: 'button', role: 'radio', 'aria-checked': String(cur) === String(o[0]) ? 'true' : 'false', onclick: function () { fn(o[0]); } };
        a['data-' + attr] = o[0];
        return h('button.chip' + (String(cur) === String(o[0]) ? '.on' : ''), a, o[1]);
      }));
    }
    // Nivel de trabajo. Auto = la rampa del motor (sube por dominio, tope B1). A1/A2/B1 = practicar ESE nivel: tope en ese nivel y nivel actual
    // en ese nivel (engine.setLevel), con 20 % de repaso de los anteriores. Al salir de Auto se recuerda el nivel ganado y Auto lo restaura.
    function levelMode() {
      var m = prefs.get('level') || 'auto', cap = eng.state().settings.levelCap;
      return m === 'auto' ? (cap === 'B1' ? 'auto' : cap) : m;
    }
    function chooseLevel(v) {
      if (v === 'auto') {
        var saved = prefs.get('autoRamp');
        eng.setLevelCap('B1');
        if (saved) Object.keys(saved).forEach(function (m) { try { eng.setLevel(saved[m], m); } catch (e) { /* módulo ya no existe */ } });
        prefs.set('autoRamp', null); prefs.set('level', 'auto');
      } else {
        if (!prefs.get('autoRamp') && levelMode() === 'auto') { var keep = {}; eng.store.modules().forEach(function (m) { keep[m] = eng.levelOf(m); }); prefs.set('autoRamp', keep); }
        eng.setLevelCap(v); eng.setLevel(v); prefs.set('level', v);
      }
      eng.progress.save();
    }
    function home() {
      S.screen = 'home'; S.session = null; S.cur = null;
      var list = h('div.cards'), lvMode = levelMode();
      MODULES.forEach(function (m) {
        list.appendChild(h('button.card', { type: 'button', 'data-module': m.id, onclick: function () { S.module = m.id; prefs.set('module', m.id); start({ kind: 'module' }); } },
          h('span.mi', { 'aria-hidden': 'true' }, m.icon), h('span.mt', h('strong', m.name), h('span', m.desc)), h('span.badge', 'Nivel ' + eng.levelOf(m.id)), h('span.go', { 'aria-hidden': 'true' }, '›')));
      });
      var soonList = h('div.cards');
      SOON.forEach(function (m) {
        soonList.appendChild(h('button.card.soon', { type: 'button', disabled: true, 'aria-disabled': 'true', 'data-soon': m.id },
          h('span.mi', { 'aria-hidden': 'true' }, m.icon), h('span.mt', h('strong', m.name), h('span', m.desc)), h('span.badge', 'Próximamente')));
      });
      var nerr = eng.errorQueue().length;
      var errCard = h('button.card.errs', { type: 'button', id: 'errors', disabled: !nerr, 'data-errors': nerr, onclick: function () { start({ kind: 'errors' }); } },
        h('span.mi', { 'aria-hidden': 'true' }, '↺'), h('span.mt', h('strong', 'Mis errores'), h('span', nerr ? 'Rehacer lo que fallaste: ' + nerr + ' pendientes' : 'Aún no hay errores que rehacer')), nerr ? h('span.badge', String(nerr)) : null);
      var rc = ret.current(), chip = rc.streak > 0 ? h('span.streak-chip' + (rc.today ? '.done' : ''), { id: 'streak', title: rc.today ? 'Hoy ya practicaste' : 'Practica hoy para mantenerla' }, h('span', { 'aria-hidden': 'true' }, '◆ '), rc.streak + (rc.streak === 1 ? ' día' : ' días')) : null;
      var refCard = h('button.card.errs.ref', { type: 'button', id: 'consulta', onclick: function () { consulta('all'); } }, h('span.mi', { 'aria-hidden': 'true' }, '≡'), h('span.mt', h('strong', 'Consulta de reglas'), h('span', 'Fórmulas y tiras de memoria, sin ejercicios')), h('span.go', { 'aria-hidden': 'true' }, '›'));
      var mapCard = h('button.card.errs', { type: 'button', id: 'emap', onclick: errmap }, h('span.mi', { 'aria-hidden': 'true' }, '▦'), h('span.mt', h('strong', 'Mapa de errores'), h('span', 'Qué tipos fallas más: Dativ plural, Präteritum…')), h('span.go', { 'aria-hidden': 'true' }, '›'));
      shell('Deutschraum Gym', brand('Deutschraum Gym', 'Modo Tren'), [chip, iconBtn('Ajustes', '⚙', settings)],
        [storageBanner(),
          h('section.hero', h('p.eyebrow', 'Modo Tren'), h('h1', 'Practica unos minutos'), h('p', 'Toques, una mano. Elige un módulo o mezcla todo.'),
            h('div.group', h('p.glabel', 'Ejercicios por sesión'), chipRow('Tamaño de sesión', SIZES.map(function (z) { return [z.n, z.label]; }), S.size, function (v) { S.size = v; prefs.set('size', v); home(); }, 'size')),
            h('div.group', h('p.glabel', 'Nivel · Auto sube solo de A1 a B1'), chipRow('Nivel', LEVELS, lvMode, function (v) { chooseLevel(v); home(); }, 'level')),
            h('div.group', h('p.glabel', 'Cómo respondes'), chipRow('Entrada', [['touch', 'Toques'], ['write', 'Escribir']], prefs.get('entry'), function (v) { prefs.set('entry', v); home(); }, 'entry')),
            h('button.btn.big.cta', { type: 'button', id: 'mix', onclick: function () { start({ kind: 'mix' }); } }, 'Viaje combinado ›')),
          h('h2.sec-h', 'Un módulo'), list, h('h2.sec-h', 'Repaso'), errCard, mapCard, h('h2.sec-h', 'Consulta'), refCard, SOON.length ? h('h2.sec-h', 'Próximamente') : null, SOON.length ? soonList : null], null);
    }

    /* ---------- sesión ---------- */
    function start(o) {
      o = o || {}; var kind = o.kind || S.kind || 'module';
      var s, req = { kind: kind, size: S.size, mode: prefs.get('entry') === 'write' ? 'write' : 'touch' };
      S.mode = req.mode; S.lastSpec = null;
      if (kind === 'module') req.modules = [S.module];
      if (kind === 'mix') req.modules = MODULES.map(function (m) { return m.id; });
      try { s = eng.startSession(req); } catch (e) { S.warnings = [{ code: 'ERROR', msg: String(e && e.message || e) }]; }
      if (!s || !s.length()) { toast('No hay ejercicios para esta sesión. ' + (s && s.warnings && s.warnings.length ? WARN[s.warnings[0].code] || '' : 'Revisa el nivel en Ajustes.')); return; }
      S.kind = kind; S.session = s; S.saveError = null; S.answeredAny = false;
      S.warnings = (s.warnings || []).map(function (w) { return { code: w.code, msg: WARN[w.code] || w.code }; });
      question();
    }
    function modName(id) { return MODULES.filter(function (m) { return m.id === id; })[0].name; }
    // Toast único: kind = info | ok | warn (la vibración acompaña a ok/warn, no a info).
    function toast(msg, kind) {
      var old = root.querySelector('.toast'); if (old && old.parentNode) old.parentNode.removeChild(old);
      var t = h('div.toast.' + (kind || 'info'), { role: 'status' }, msg); root.appendChild(t);
      if (kind === 'warn') buzz(HAP.warn); else if (kind === 'ok') buzz(HAP.milestone);
      win.setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 4000);
    }
    function sentNodes(text) {
      return String(text).split(/_{2,}/).reduce(function (acc, sg, i) { if (i) acc.push(h('span.blank', '___')); acc.push(F.rich(sg)); return acc; }, []);
    }
    function promptNode(v, item) {
      var box = h('div.qbody');
      var parts = String(v.prompt).split(' · ');
      if (v.module === 'verben' && parts.length === 3) {
        box.appendChild(h('div.p-big', parts[0]));
        box.appendChild(h('div.p-sub', D.rules.skillLabel(parts[1]) + ' · ' + parts[2].replace('er_sie_es', 'er/sie/es').replace('sie_Sie', 'sie/Sie')));
      } else if (v.module === 'artikel' && v.skill === 'genero') {
        box.appendChild(h('div.p-big', h('span.blank', '___'), ' ', v.prompt));
      } else if (v.module === 'artikel') {
        var m = /^(der|die|das)\s+(.*)$/i.exec(v.prompt);
        box.appendChild(h('div.p-big', m ? [F.genderBadge(m[1]), ' ', m[2]] : v.prompt));
      } else if (v.type === 'minimal-pair') {
        String(v.prompt).split('↔').forEach(function (line) { box.appendChild(h('div.p-big.p-sent.p-pair', sentNodes(line.trim()))); });
      } else {
        var long = v.type === 'order' || v.type === 'transform';
        box.appendChild(h('div.p-big.p-sent' + (long ? '.p-long' : ''), sentNodes(String(v.prompt))));
      }
      if (v.type === 'order' && item.translation) box.appendChild(h('div.p-tr', '“' + item.translation + '”'));
      if (v.showTranslation && v.translation) box.appendChild(h('div.p-tr', '“' + v.translation + '”'));
      if (v.hint) box.appendChild(h('div.p-hint', v.hint));
      return box;
    }
    /* ---------- tablas de referencia que se retiran (Deklination) ---------- */
    var TB = D.tablas;
    function tableInfo(item) {
      if (prefs.get('tables') === false || !ctx.tablas) return null;
      var id = TB.tableId(item, ctx.tablas); if (!id) return null;
      var table = ctx.tablas[id], loc = TB.locate(item, table, id);
      return { id: id, table: table, loc: loc, level: TB.level((eng.state().tags || {})[item.errorTag]) };
    }
    var COLSHAPE = { M: F.GENDER.der, F: F.GENDER.die, N: F.GENDER.das, PL: F.PLURAL };
    function tableNode(info, o) {
      o = o || {}; var t = info.table, masked = o.masked || [], hit = o.hit;
      return h('div.tbl-wrap', { 'data-table': info.id },
        h('div.tbl-cap', t.titulo),
        h('table.tbl', h('thead', h('tr', h('th'), t.cols.map(function (c) { var g = COLSHAPE[c]; return h('th.' + (g ? g.cls : ''), g ? h('span.shape', { 'aria-hidden': 'true' }, g.shape) : null, ' ' + c); }))),
          h('tbody', t.rows.map(function (r, ri) {
            var hideRow = masked.indexOf(ri) >= 0;
            return h('tr' + (hit && hit.r === ri ? '.hitrow' : '') + (hideRow ? '.masked' : ''), h('th.rowh', r.caso),
              r.celdas.map(function (c, ci) { return hideRow ? h('td.mask', { 'aria-label': 'oculto' }, '·') : h('td' + (hit && hit.r === ri && hit.cols.indexOf(ci) >= 0 ? '.hit' : ''), c); }));
          }))),
        t.nota ? h('p.hint', t.nota) : null);
    }
    function chainNode(item, info) {
      var steps = TB.chain(item, info.table, info.loc); if (!steps.length) return null;
      return h('ol.chain', { 'aria-label': 'Cadena de decisión' }, steps.map(function (st, i) {
        return h('li', h('b.n', String(i + 1)), h('span.k', st.k + ': '), st.caseKey ? F.caseBadge(st.caseKey) : h('strong', st.v));
      }));
    }

    /* ---------- cápsula de regla («memory-strip» / «formula» de las cheat sheets) ---------- */
    function capsuleNode(c) {
      if (!c) return null;
      return h('aside.capsule', { 'data-concept': c.id, 'aria-label': 'Regla' },
        h('div.cap-h', h('span.cap-k', 'Regla'), c.titulo ? h('span.cap-t', c.titulo) : null),
        c.formula ? h('div.cap-formula', c.formula.split(' + ').map(function (x, i) { return [i ? h('span.cap-op', '+') : null, h('span.cap-slot', x)]; })) : null,
        c.regla ? h('p.cap-r', F.md(c.regla)) : null,
        c.ejemplo ? h('div.cap-ex', h('span.cap-b', F.rich(c.ejemplo.antes.replace(/\*\*/g, '')).concat([]), ' '), h('span.cap-arrow', { 'aria-hidden': 'true' }, '→'), ' ', h('span.cap-a', F.md(c.ejemplo.despues))) : null);
    }
    // «Dominada» = ≥6 intentos con ≥85 % de aciertos en ese tipo de error (errorTag). Al dominarla la regla deja de mostrarse sola.
    function dominated(item) {
      var t = (eng.state().tags || {})[item.errorTag];
      return !!t && t.n >= 6 && (t.n - t.f) / t.n >= 0.85;
    }
    function sessionFrame(mainChildren, dockNode) {
      var s = S.session, pos = Math.min(s.position() + (S.cur && S.cur.fb ? 1 : 0), s.length());
      var bar = h('div.progress', { role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': String(s.length()), 'aria-valuenow': String(pos) }, h('div.progress-fill', { style: 'width:' + Math.round(100 * pos / s.length()) + '%' }));
      var auto = h('button.auto-chip', { type: 'button', id: 'auto', 'aria-pressed': prefs.get('auto') ? 'true' : 'false', 'aria-label': 'Avance automático al acertar', onclick: function () { prefs.set('auto', !prefs.get('auto')); this.setAttribute('aria-pressed', prefs.get('auto') ? 'true' : 'false'); } }, 'Auto');
      return shell('', iconBtn('Terminar sesión', '✕', endEarly), [bar, h('span.count', pos + '/' + s.length()), auto],
        [saveBanner(), S.warnings.length && s.position() === 0 && !S.answeredAny ? h('div.notice', { role: 'status' }, S.warnings.map(function (w) { return h('div', w.msg); })) : null].concat(mainChildren), [dockNode], 'in-session', S.cur && S.cur.item ? S.cur.item.module : S.module);
    }
    // Escalera de ayuda: nivel del tipo de error según los intentos acumulados (variants.ladderLevel). Apagable en Ajustes.
    function ladderLevel(item) {
      if (prefs.get('ladder') === false) return undefined;
      return D.variants.ladderLevel((eng.state().tags || {})[item.errorTag]);
    }
    function question(note, again) {
      var s = S.session; S.screen = 'session'; cancelAuto();
      if (s.done()) return summary();
      var v = s.view(), item = s.currentItem();
      // «Casi»: se vuelve a pintar el MISMO ejercicio y la misma variante (sin barajar otra vez), con lo escrito.
      var spec = again ? again.spec : D.variants.pick(item, v, { store: eng.store, rnd: ctx.rnd, mode: S.mode, last: S.lastSpec, level: ladderLevel(item) });
      if (again && again.prefill != null) spec = Object.assign({}, spec, { prefill: again.prefill });
      S.lastSpec = spec;
      S.cur = { view: v, item: item, spec: spec, fb: null };
      var inp = I.mount(spec, item, { rnd: ctx.rnd, tap: function () { buzz(HAP.tap); }, onSubmit: function (resp, extra) { submit(resp, extra); }, onGiveUp: giveUp });
      var tags = h('div.tags', S.kind === 'module' ? null : h('span.tag.mod', modName(v.module)), h('span.tag', D.rules.skillLabel(v.skill)), h('span.tag', v.level), v.retry ? h('span.tag.retry', 'Otra vez') : null);
      var tinfo = tableInfo(item), withTable = !!tinfo && tinfo.level !== 'ninguna';
      // la tabla es la ayuda principal de Deklination: con tabla visible la regla no se abre sola (queda en «¿Por qué?») para que quepa en pantalla
      var cap = rules.capsule(item), auto = !!cap && prefs.get('ruleFirst') !== false && !dominated(item) && !withTable;
      var slot = h('div.why-slot'), open = auto;
      var why = h('button.btn.secondary.why', { type: 'button', id: 'why', 'aria-expanded': 'false', onclick: function () {
        if (!cap) { toast('Todavía no hay regla escrita para este tema.'); return; }
        open = !open; paint();
      } }, '¿Por qué?');
      function paint() { U.clear(slot); why.setAttribute('aria-expanded', open ? 'true' : 'false'); if (open && cap) { slot.appendChild(capsuleNode(cap)); if (auto) slot.appendChild(h('p.hint.center', 'Regla visible mientras la aprendes; se oculta sola cuando la dominas.')); } }
      paint();
      var tslot = h('div.tbl-slot');
      if (withTable) {
        var showAll = tinfo.level === 'completa';
        (function paintT() {
          U.clear(tslot);
          tslot.appendChild(tableNode(tinfo, { masked: showAll ? [] : TB.maskedRows(tinfo.loc, tinfo.table) }));
          if (!showAll) tslot.firstChild.querySelector('.tbl-cap').appendChild(h('button.btn.ghost.reveal', { type: 'button', id: 'reveal', onclick: function () { showAll = true; paintT(); } }, 'Mostrar toda'));
          tslot.appendChild(h('p.hint.center', showAll && tinfo.level === 'media' ? 'Tabla completa (la pediste). La media tabla era parte del reto.' : tinfo.level === 'completa' ? 'Tabla completa mientras aprendes este tipo; después se retira a media tabla y luego desaparece.' : 'Media tabla: falta la mitad donde está la respuesta.'));
        })();
      }
      sessionFrame([h('div.qcard', tags, h('p.qkind', spec.label || ''), promptNode(v, item), why), slot, tslot, inp.answerEl, note ? h('div.notice', { role: 'status' }, note) : null], inp.dockEl);
    }
    function submit(resp, extra) {
      var s = S.session, item = S.cur.item, v = S.cur.view, spec = S.cur.spec;
      var out;
      try { out = s.answer(resp, { mode: S.mode }); } catch (e) { toast('Error: ' + e.message); return; }
      S.answeredAny = true;
      noteSave(out);
      if (out.almost) { buzz(HAP.warn); return question('Casi. Revisa una letra e inténtalo otra vez.', { spec: spec, prefill: typeof resp === 'string' ? resp : '' }); }
      var ok = out.evaluation.verdict === 'correct';
      buzz(ok ? HAP.ok : HAP.bad);
      feedback({ ok: ok, out: out, item: item, view: v, resp: resp, gaveUp: false, extra: extra, spec: spec });
    }
    function noteSave(out) {
      if (out.saveError) { if (!S.saveError) buzz(HAP.warn); S.saveError = out.saveError; } else if (S.saveError) S.saveError = null;
    }
    function giveUp() {
      var s = S.session, item = S.cur.item, v = S.cur.view, out;
      try { out = s.giveUp(); } catch (e) { toast('Error: ' + e.message); return; }
      S.answeredAny = true;
      noteSave(out);
      feedback({ ok: false, out: out, item: item, view: v, resp: null, gaveUp: true, spec: S.cur.spec });
    }
    function expectedText(item) {
      if (item.type === 'minimal-pair') return item.wo.answer + ' / ' + item.wohin.answer;
      return item.answer;
    }
    function cancelAuto() { if (S.timer) { win.clearTimeout(S.timer); S.timer = 0; } }
    function paradigmNode(rows) {
      return h('div.paradigm.result', { 'aria-label': 'Resultado por persona' }, rows.map(function (r) {
        return h('div.prow.' + (r.ok ? 'ok' : 'bad') + (r.target ? '.target' : ''), h('span.plabel', r.label, r.target ? ' ★' : ''),
          h('span.pres', h('strong', r.ok ? r.expected : r.expected), r.ok ? null : h('s', r.given == null ? '—' : r.given), h('span.mark', { 'aria-hidden': 'true' }, r.ok ? '✓' : '✗')));
      }));
    }
    function fbTable(item) {
      var info = tableInfo(item); if (!info) return null;
      return h('div.fb-table', chainNode(item, info), tableNode(info, { hit: info.loc }));
    }
    function feedback(f) {
      var s = S.session, item = f.item;
      S.cur.fb = f; cancelAuto();
      var body = [];
      var ck = F.caseOf(item), ansNodes = F.rich(expectedText(item), { case: ck }), cb = ck ? F.caseBadge(ck) : null;
      var say = voice.available() ? h('button.btn.icon.say', { type: 'button', id: 'say', 'aria-label': 'Escuchar en alemán', onclick: function () { var r = voice.speakItem(item); if (!r.ok) toast('No se pudo reproducir el audio.', 'warn'); } }, '🔊') : null;
      var autoOn = f.ok && prefs.get('auto') && !(f.out.finished || s.done()), ms = ctx.autoMs == null ? 1400 : ctx.autoMs;
      var par = f.extra && f.extra.rows ? paradigmNode(f.extra.rows) : null;
      if (f.ok) {
        body.push(h('div.fb.ok', { role: 'status' }, h('div.fb-h', h('span.fb-ico', { 'aria-hidden': 'true' }, '✓'), h('strong', '¡Correcto!'), f.out.rescued ? h('span.badge.rescue', 'Rescatada: la fallabas antes') : null, say),
          par ? null : h('div.fb-ans', ansNodes), cb, par, autoOn ? h('div.autobar', { style: '--auto-ms:' + ms + 'ms' }, h('i')) : null));
      } else {
        body.push(h('div.fb.bad', { role: 'status' },
          h('div.fb-h', h('span.fb-ico', { 'aria-hidden': 'true' }, '✗'), h('strong', f.gaveUp ? 'Respuesta' : 'No era esa'), say),
          par ? null : h('div.fb-ans', ansNodes), cb, par,
          !f.gaveUp && f.resp ? h('div.fb-yours', 'Tu respuesta: ' + (Array.isArray(f.resp) ? f.resp.join(item.type === 'order' ? ' ' : '') : typeof f.resp === 'object' ? 'Wo? ' + f.resp.wo + ' · Wohin? ' + f.resp.wohin : f.resp)) : null,
          h('div.fb-line', rules.oneLine(item)), fbTable(item), capsuleNode(rules.capsule(item)),
          f.out.retryScheduled ? h('div.fb-retry', 'Volverá a salir en unos ejercicios.') : null));
      }
      if (prefs.get('voice') === 'auto' && voice.available()) voice.speakItem(item);
      var go = function () { cancelAuto(); voice.stop(); if (f.out.finished || s.done()) summary(); else question(); };
      var next = h('button.btn.primary.big', { type: 'button', id: 'next', onclick: go }, f.out.finished || s.done() ? 'Ver resumen' : 'Siguiente');
      var pause = autoOn ? h('button.btn.secondary', { type: 'button', id: 'pause', onclick: function () { cancelAuto(); var bar = root.querySelector('.autobar'); if (bar) bar.parentNode.removeChild(bar); this.parentNode.removeChild(this); } }, '⏸ Pausar') : null;
      var dock = h('div.dock-in', h('div.row', f.ok ? pause : h('button.btn.secondary', { type: 'button', id: 'rule', onclick: function () { openRule(item); } }, 'Ver regla'), next));
      var q = h('div.qcard.still', promptNode(f.view, item));
      sessionFrame([q].concat(body), dock);
      var nb = root.querySelector('#next'); if (nb && nb.focus) nb.focus({ preventScroll: true });
      if (autoOn) S.timer = win.setTimeout(go, ms);
    }
    function endEarly() {
      cancelAuto();
      if (S.session && S.answeredAny) summary(); else { if (S.session) S.session.finish(); home(); }
    }

    /* ---------- panel «ver regla» ---------- */
    function openSheet(title, content, label, closeLabel) {
      var opener = doc.activeElement, back = h('div.sheet-back', { onclick: function (e) { if (e.target === back) close(); } });
      function close() { if (back.parentNode) back.parentNode.removeChild(back); doc.removeEventListener('keydown', onKey); if (opener && opener.focus) opener.focus(); }
      function onKey(e) { if (e.key === 'Escape') close(); }
      var sheet = h('div.sheet', { role: 'dialog', 'aria-modal': 'true', 'aria-label': (label || 'Regla') + ': ' + title },
        h('div.sheet-h', h('h2', title), h('button.btn.ghost.icon', { type: 'button', 'aria-label': 'Cerrar', onclick: close }, '✕')),
        h('div.sheet-b', content), h('div.sheet-f', h('button.btn.primary.big', { type: 'button', onclick: close }, closeLabel || 'Entendido')));
      back.appendChild(sheet); root.appendChild(back); doc.addEventListener('keydown', onKey);
      var cb = sheet.querySelector('.sheet-f button'); if (cb) cb.focus();
      return close;
    }
    function openRule(item) {
      var p = rules.panel(item), content = [], capn = capsuleNode(rules.capsule(item)); if (capn) content.push(capn);
      if (p.concepts.length) content.push(h('div.r-concepts', p.concepts.map(function (c) { return h('div.r-concept', c); })));
      if (p.explanation) content.push(h('p.r-expl', p.explanation));
      if (p.table) content.push(h('table.r-table', h('caption', p.table.caption), h('tbody', p.table.rows.map(function (r) { return h('tr' + (r.hit ? '.hit' : ''), h('th', r.k), h('td', r.v)); }))));
      if (p.examples.length) content.push(h('div.r-ex', h('h3', 'Más ejemplos de este tema'), h('ul', p.examples.map(function (e) { return h('li', h('span', e.prompt), ' → ', h('strong', e.answer)); }))));
      if (!p.explanation) content.push(h('p.r-note', 'Esta versión aún no trae el texto completo de la regla: se muestran el tema, la forma correcta y ejemplos del mismo tema.'));
      openSheet(p.title, content);
    }
    // Hoja de un TIPO de error (mapa de errores): cápsula si hay regla; si no, ejemplos reales de ese tipo. Sin inventar gramática.
    function openTag(tag) {
      var items = eng.store.all.filter(function (it) { return it.errorTag === tag; }), content = [], cap = null;
      for (var i = 0; i < items.length && !cap; i++) cap = rules.capsule(items[i]);
      if (cap) content.push(capsuleNode(cap)); else content.push(h('p.r-note', 'Todavía no hay una regla escrita para este tipo de error.'));
      var ex = []; for (var k = 0, step = Math.max(1, Math.floor(items.length / 4)); k < items.length && ex.length < 4; k += step) ex.push(items[k]);
      if (ex.length) content.push(h('div.r-ex', h('h3', 'Ejemplos de este tipo'), h('ul', ex.map(function (it) { return h('li', h('span', it.prompt), ' → ', h('strong', it.answer)); }))));
      openSheet(D.rules.tagLabel(tag), content, 'Tipo de error');
    }
    api.openRule = openRule; api.openTag = openTag;

    /* ---------- resumen ---------- */
    function summary() {
      cancelAuto();
      var s = S.session, sm = s.finish();
      S.screen = 'summary'; S.summary = sm;
      if (sm.saveError) S.saveError = sm.saveError;
      // racha y logros: una sola vez por sesión (el resumen puede repintarse)
      if (S.retFor !== sm.sessionNo) {
        S.retFor = sm.sessionNo; S.retInfo = { streak: ret.current().streak, perdonado: false, badges: [] };
        if (sm.answered > 0) {
          var t = ret.touch(); S.retInfo = { streak: t.streak, perdonado: t.perdonado, badges: ret.unlock({ stats: eng.state().stats, summary: sm }) };
          if (S.retInfo.badges.length || t.perdonado || [3, 7, 30].indexOf(t.streak) >= 0 && t.changed) S.retToast = S.retInfo.badges.length ? 'Logro: ' + S.retInfo.badges[0].title : t.perdonado ? 'Perdón usado: tu racha sigue.' : 'Racha de ' + t.streak + ' días';
        }
      }
      var info = S.retInfo, pct = sm.answered ? Math.round(100 * sm.correct / sm.answered) : 0, blocks = [];
      blocks.push(h('div.sum-score', h('div.sum-big', sm.correct + '/' + sm.answered), h('div.sum-sub', sm.answered ? pct + ' % de aciertos al primer intento' : 'Sin respuestas esta vez')));
      if (info.streak > 0 && sm.answered > 0) blocks.push(h('div.sum-card.streak', { id: 'streak-card' }, h('strong', 'Racha: ' + info.streak + (info.streak === 1 ? ' día' : ' días')), info.perdonado ? h('span.hint', ' · perdoné un día que faltaste (1 por semana)') : null));
      info.badges.forEach(function (b) { blocks.push(h('div.sum-card.badge', { 'data-badge': b.id }, h('strong', 'Logro: ' + b.title), h('span.hint', ' · ' + b.detail))); });
      if (sm.newUnits > 0) blocks.push(h('div.sum-card.learn', h('strong', 'Hoy aprendiste ' + sm.newUnits + (sm.newUnits === 1 ? ' cosa' : ' cosas') + ' que ayer no sabías.')));
      if (sm.rescued && sm.rescued.length) {
        blocks.push(h('div.sum-card.rescue', h('strong', 'Rescataste ' + sm.rescued.length + (sm.rescued.length === 1 ? ' ejercicio' : ' ejercicios') + ' que fallabas.'),
          h('ul', sm.rescued.slice(0, 6).map(function (id) { var it = eng.store.byId[id]; return h('li', it ? it.prompt + ' → ' + expectedText(it) : id); }))));
      }
      var tags = Object.keys(sm.errorsByTag || {}).sort(function (a, b) { return sm.errorsByTag[b] - sm.errorsByTag[a]; });
      if (tags.length) blocks.push(h('div.sum-card', h('strong', 'Errores por tipo'), h('ul.tagl', tags.map(function (t) { return h('li', h('span', D.rules.tagLabel(t)), h('span.n', String(sm.errorsByTag[t]))); }))));
      else if (sm.answered) blocks.push(h('div.sum-card', h('strong', 'Sin errores. Muy bien.')));
      // qué falló y por qué
      var failed = (sm.failed || []).filter(function (id, i, a) { return a.indexOf(id) === i && eng.store.byId[id]; });
      if (failed.length) {
        blocks.push(h('h2.sec-h', 'Qué falló y por qué'));
        failed.slice(0, 8).forEach(function (id) {
          var it = eng.store.byId[id], ck = F.caseOf(it), line = rules.oneLine(it), cap = rules.capsule(it);
          blocks.push(h('div.sum-card.fail', { 'data-id': id },
            h('div.fail-p', it.prompt.replace(/_{2,}/g, '___')), h('div.fail-a', F.rich(expectedText(it), { case: ck }), ck ? F.caseBadge(ck) : null),
            line ? h('div.fail-l', line) : null,
            h('button.btn.secondary.fail-b', { type: 'button', 'data-rule': id, onclick: function () { openRule(it); } }, cap ? 'Ver regla' : 'Ver tema')));
        });
        if (failed.length > 8) blocks.push(h('p.hint.center', 'y ' + (failed.length - 8) + ' más en «Mis errores».'));
      }
      (sm.levelChanges || []).forEach(function (c) { blocks.push(h('div.sum-card', h('strong', (c.change === 'promote' || c.to > c.from ? 'Subiste de nivel' : 'Cambio de nivel') + ': ' + c.module + ' ' + c.from + ' → ' + c.to))); });
      shell('Resumen', brand('Resumen', 'Sesión terminada'), null, [saveBanner(), blocks], [h('div.dock-in', h('div.row', h('button.btn.secondary', { type: 'button', onclick: home }, 'Inicio'), h('button.btn.primary.big', { type: 'button', id: 'again', onclick: function () { start({}); } }, 'Otra sesión')))], 'summary');
      if (S.retToast) { var m = S.retToast; S.retToast = null; toast(m, 'ok'); }   // después de pintar: shell() limpia la raíz
    }

    /* ---------- consulta de reglas (separada de los ejercicios) ---------- */
    function consulta(group) {
      S.screen = 'consulta'; var all = ctx.reglas || {};
      var num = function (k) { return k.replace(/^\D+/, '').split('-').map(Number); };
      var keys = Object.keys(all).filter(function (k) { return group === 'all' || k.indexOf(group + ':') === 0; }).sort(function (a, b) {
        if (a[0] !== b[0]) return a[0] < b[0] ? -1 : 1; var x = num(a), y = num(b); return x[0] - y[0] || (x[1] || 0) - (y[1] || 0);
      });
      var title = function (r) { return String(r.titulo || '').replace(/^\d+\.\d+\s*·\s*/, ''); };
      var chips = chipRow('Grupo', [['all', 'Todo'], ['dm', 'Declinación'], ['cs', 'A1 · gramática']], group, function (v) { consulta(v); }, 'group');
      var list = h('div.emap', keys.map(function (k) {
        var r = all[k], first = r.regla ? r.regla.replace(/\*\*/g, '') : (r.formula || '');
        return h('button.erow', { type: 'button', 'data-concept': k, onclick: function () { openSheet(title(r), [capsuleNode(Object.assign({ id: k }, r))], 'Regla'); } },
          h('span.el', title(r)), first ? h('span.en', first.length > 90 ? first.slice(0, 88).replace(/\s+\S*$/, '') + '…' : first) : null);
      }));
      shell('Consulta', [iconBtn('Volver', '←', home), brand('Consulta de reglas', keys.length + ' temas')], null,
        [chips, h('p.hint', 'Solo lectura: no cuenta como práctica. Los temas sin texto escrito no aparecen.'), list], [h('div.dock-in', h('button.btn.primary.big', { type: 'button', onclick: home }, 'Listo'))]);
    }
    api.consulta = consulta;

    /* ---------- copia de seguridad ---------- */
    var IMPORT_ERR = { NOT_JSON: 'Ese archivo no es una copia válida.', NOT_BACKUP: 'No es una copia de Deutschraum Gym.', CHECKSUM: 'La copia está alterada o incompleta: no se cambió nada.', MIGRATION: 'La copia es de una versión que no entiendo: no se cambió nada.', SAVE: 'No pude guardar la copia (almacenamiento lleno o bloqueado).' };
    function exportBackup() {
      var text = eng.exportJSON(), d = new win.Date(win.Date.now()), pad = function (n) { return (n < 10 ? '0' : '') + n; };
      var name = 'deutschraum-gym-' + d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + '.json';
      api.lastExport = { name: name, text: text };
      try {
        var url = win.URL.createObjectURL(new win.Blob([text], { type: 'application/json' })), a = h('a', { href: url, download: name });
        doc.body.appendChild(a); a.click(); doc.body.removeChild(a); win.setTimeout(function () { win.URL.revokeObjectURL(url); }, 4000);
        toast('Copia guardada: ' + name, 'ok');
      } catch (e) { toast('No pude crear el archivo en este navegador.', 'warn'); }
    }
    function applyImport(text) {
      var r = eng.importJSON(text);
      if (!r.ok) { toast(IMPORT_ERR[r.code] || 'No se pudo importar la copia.', 'warn'); return r; }
      eng.progress.reconcile(eng.store);          // quita ítems que ya no existen en esta versión
      settings(); toast('Copia importada: ' + (eng.state().stats.sessions || 0) + ' sesiones.', 'ok'); return r;   // primero repintar (shell limpia la raíz), luego el aviso
    }
    function askImport(text, filename) {
      // Primero se valida SIN tocar nada (importJSON es atómico, pero aquí se avisa antes de reemplazar).
      var pkg = null; try { pkg = JSON.parse(text); } catch (e) { /* se informa abajo */ }
      if (!pkg || typeof pkg !== 'object' || !pkg.state) { toast(IMPORT_ERR[pkg && typeof pkg === 'object' ? 'NOT_BACKUP' : 'NOT_JSON'], 'warn'); return; }   // el motor valida de verdad (app, checksum, versión) al reemplazar
      var close = openSheet('Importar copia', [h('p.r-expl', 'Esto reemplaza el progreso de este dispositivo por el de «' + filename + '». No se puede deshacer.'),
        h('p.hint', 'Ajustes de pantalla (tema, voz, racha) no van en la copia.'),
        h('button.btn.big.danger', { type: 'button', id: 'confirm-import', onclick: function () { close(); applyImport(text); } }, 'Reemplazar mi progreso')], 'Copia', 'Cancelar');
    }
    function backupSection() {
      var input = h('input.file', { type: 'file', id: 'import-file', accept: '.json,application/json', 'aria-label': 'Elegir archivo de copia', onchange: function () {
        var f = input.files && input.files[0]; if (!f) return;
        var rd = new win.FileReader(); rd.onload = function () { askImport(String(rd.result), f.name); }; rd.onerror = function () { toast('No pude leer el archivo.', 'warn'); }; rd.readAsText(f); input.value = '';
      } });
      return h('section.set', h('h2', 'Copia de seguridad'), h('p.hint', 'El progreso vive solo en este dispositivo. Guarda una copia antes de cambiar de teléfono o limpiar el navegador.'),
        h('div.row', h('button.btn.secondary', { type: 'button', id: 'export-btn', onclick: exportBackup }, 'Exportar copia'), h('label.btn.secondary.filelabel', { for: 'import-file' }, 'Importar copia', input)));
    }

    /* ---------- mapa de errores por tipo ---------- */
    function errmap() {
      S.screen = 'errmap';
      var rows = eng.errorMap(), max = rows.reduce(function (m, r) { return Math.max(m, r.f); }, 1);
      var list = h('div.emap', rows.map(function (r) {
        return h('button.erow', { type: 'button', 'data-tag': r.tag, onclick: function () { openTag(r.tag); } },
          h('span.el', D.rules.tagLabel(r.tag)), h('span.eb', h('i', { style: 'width:' + Math.max(6, Math.round(100 * r.f / max)) + '%' })),
          h('span.en', r.f + ' de ' + r.n + ' · ' + Math.round(100 * r.rate) + ' %'));
      }));
      shell('Mapa de errores', [iconBtn('Volver', '←', home), brand('Mapa de errores', 'Qué practicar')], null,
        [rows.length ? h('p.hint', 'Tipos donde más fallas (primer intento). Toca uno para ver su regla y ejemplos.') : h('div.notice', 'Aún no hay errores registrados. Cuando falles algo aparecerá aquí por tipo.'), list], [h('div.dock-in', h('button.btn.primary.big', { type: 'button', onclick: home }, 'Listo'))]);
    }
    api.errmap = errmap;

    /* ---------- ajustes ---------- */
    function settings() {
      S.screen = 'settings';
      var st = eng.state().settings, theme = prefs.get('theme');
      function seg(name, opts, cur, fn, attr) {
        return h('div.seg', { role: 'radiogroup', 'aria-label': name }, opts.map(function (o) {
          var a = { type: 'button', role: 'radio', 'aria-checked': String(cur) === String(o[0]) ? 'true' : 'false', 'data-v': o[0], onclick: function () { fn(o[0]); settings(); } };
          return h('button.chip' + (String(cur) === String(o[0]) ? '.on' : ''), a, o[1]);
        }));
      }
      var onoff = function (name, key, extra) { return seg(name, [['1', 'Sí'], ['0', 'No']], prefs.get(key) === false || !prefs.get(key) ? '0' : '1', function (v) { prefs.set(key, v === '1'); if (extra) extra(v === '1'); }); };
      var vv = voice.germanVoice(), vst = !voice.available() ? 'Este navegador no ofrece voz alemana.' : vv ? 'Voz alemana encontrada: ' + vv.name + '.' : 'No encuentro una voz alemana. En Android: Ajustes › Sistema › Idiomas › Salida de texto a voz › Motor de Google › Instalar datos de voz › alemán.';
      shell('Ajustes', [iconBtn('Volver', '←', home), brand('Ajustes')], null, [
        h('section.set', h('h2', 'Nivel'), h('p.hint', 'Auto: empiezas en A1 y subes por dominio hasta B1. A1, A2 o B1: practicas ese nivel (con 20 % de repaso de los anteriores) y no ves niveles superiores. Wortschatz y Satzbau solo tienen A1 por ahora.'), seg('Nivel', LEVELS, levelMode(), chooseLevel)),
        h('section.set', h('h2', 'Entrada'), h('p.hint', 'Toques es el modo del tren. Escribir pide teclear la respuesta.'), seg('Entrada', [['touch', 'Toques'], ['write', 'Escribir']], prefs.get('entry'), function (v) { prefs.set('entry', v); })),
        h('section.set', h('h2', 'Tamaño de sesión por defecto'), seg('Tamaño de sesión', SIZES.map(function (z) { return [z.n, z.label]; }), S.size, function (v) { S.size = Number(v); prefs.set('size', S.size); })),
        h('section.set', h('h2', 'Avance automático al acertar'), h('p.hint', 'Pasa solo al siguiente tras un acierto; al fallar nunca.'), seg('Avance automático', [['1', 'Sí'], ['0', 'No']], prefs.get('auto') ? '1' : '0', function (v) { prefs.set('auto', v === '1'); })),
        h('section.set', h('h2', 'Regla visible al empezar un tema'), h('p.hint', 'Muestra la regla mientras aprendes y la oculta al dominarla.'), seg('Regla visible', [['1', 'Sí'], ['0', 'No']], prefs.get('ruleFirst') === false ? '0' : '1', function (v) { prefs.set('ruleFirst', v === '1'); })),
        h('section.set', h('h2', 'Ayuda que se retira'), h('p.hint', 'Al empezar un tipo: opciones. Luego bloques y terminaciones. Al dominarlo: letras sueltas. Apagado: mezcla clásica.'), seg('Ayuda que se retira', [['1', 'Sí'], ['0', 'No']], prefs.get('ladder') === false ? '0' : '1', function (v) { prefs.set('ladder', v === '1'); })),
        h('section.set', h('h2', 'Tablas de ayuda en Deklination'), h('p.hint', 'Tabla completa al empezar un tipo, media tabla después y ninguna al dominarlo. Tras fallar siempre ves la casilla.'), seg('Tablas de ayuda', [['1', 'Sí'], ['0', 'No']], prefs.get('tables') === false ? '0' : '1', function (v) { prefs.set('tables', v === '1'); })),
        h('section.set', h('h2', 'Voz alemana'), h('p.hint', 'de-DE a velocidad 0,85. Siempre puedes pulsar 🔊 tras responder.'),
          seg('Voz', [['off', 'Manual'], ['auto', 'Al responder']], prefs.get('voice'), function (v) { prefs.set('voice', v); }),
          h('button.btn.secondary.test-voice', { type: 'button', id: 'test-voice', onclick: function () { var r = voice.speak('Guten Tag! Das ist ein Test.'); toast(r.ok ? (r.voice ? 'Voz: ' + r.voice : 'Voz del sistema (sin voz alemana específica)') : 'No se pudo reproducir el audio.', r.ok ? 'info' : 'warn'); } }, '🔊 Probar voz'),
          h('p.hint#voice-status', vst)),
        h('section.set', h('h2', 'Tema'), seg('Tema', [['auto', 'Sistema'], ['light', 'Claro'], ['dark', 'Oscuro']], theme, function (v) { prefs.set('theme', v); U.applyTheme(doc, v); })),
        h('section.set', h('h2', 'Vibración suave'), seg('Vibración', [['1', 'Sí'], ['0', 'No']], prefs.get('vibrate') ? '1' : '0', function (v) { prefs.set('vibrate', v === '1'); })),
        backupSection(),
        h('section.set', h('h2', 'Logros'), h('div.badges', D.retention.BADGES.map(function (b) { var got = ret.earned()[b.id]; return h('div.bdg' + (got ? '.got' : ''), { 'data-badge': b.id }, h('strong', b.title), h('span', got ? 'Desde ' + got : b.detail)); }))),
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
