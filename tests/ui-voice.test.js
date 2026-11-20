/* Voz alemana (ui/dgui-voice.js): qué se pronuncia y cómo (de-DE, 0,85), con un doble de speechSynthesis. */
const test = require('node:test'), assert = require('node:assert/strict');
globalThis.DGUI = globalThis.DGUI || {};
const V = require('../ui/dgui-voice.js');
const { newEngine } = require('./helpers.js');
const { eng } = newEngine({ seed: 3 });
const st = eng.store;

function fakeWin(voices) {
  const calls = { cancel: 0, spoken: [] };
  class Utt { constructor(t) { this.text = t; } }
  return { calls, win: { SpeechSynthesisUtterance: Utt, speechSynthesis: { cancel() { calls.cancel++; }, speak(u) { calls.spoken.push(u); }, getVoices() { return voices; } } } };
}

test('speak(): de-DE a 0,85, cancela lo anterior y prefiere la voz de-DE', () => {
  const { win, calls } = fakeWin([{ lang: 'en-US', name: 'EN' }, { lang: 'de_AT', name: 'AT' }, { lang: 'de-DE', name: 'DE' }]);
  const v = V.create(win, {}), r = v.speak('Das ist ein   Name.');
  assert.deepEqual([r.ok, r.voice], [true, 'DE']);
  const u = calls.spoken[0]; assert.equal(u.text, 'Das ist ein Name.'); assert.equal(u.lang, 'de-DE'); assert.equal(u.rate, 0.85); assert.equal(u.voice.name, 'DE'); assert.equal(calls.cancel, 1);
  const w2 = fakeWin([{ lang: 'de-AT', name: 'AT' }]); assert.equal(V.create(w2.win, {}).speak('Hallo').voice, 'AT', 'sin de-DE vale otra voz alemana');
  const w3 = fakeWin([]); const r3 = V.create(w3.win, {}).speak('Hallo'); assert.deepEqual([r3.ok, r3.voice], [true, null], 'sin voz alemana usa la del sistema con lang de-DE'); assert.equal(w3.calls.spoken[0].lang, 'de-DE');
});

test('speak(): sin API, texto vacío o error → no lanza y lo dice', () => {
  assert.deepEqual(V.create({}, {}).speak('Hallo'), { ok: false, reason: 'unsupported' });
  assert.equal(V.create({}, {}).available(), false);
  const { win } = fakeWin([]); assert.equal(V.create(win, {}).speak('  ___  ').reason, 'empty');
  win.speechSynthesis.speak = () => { throw new Error('boom'); }; assert.equal(V.create(win, {}).speak('Hallo').reason, 'error');
});

test('spokenText(): la forma correcta de cada tipo de ejercicio, sin huecos ni pistas entre paréntesis', () => {
  const pick = f => st.all.find(f);
  const du = pick(i => i.module === 'verben' && i.skill === 'praesens' && i.person === 'du'); assert.equal(V.spokenText(du), 'du ' + du.answer);
  const er = pick(i => i.module === 'verben' && i.person === 'er_sie_es'); assert.equal(V.spokenText(er), 'er ' + er.answer);
  const pii = pick(i => i.skill === 'partizip-ii'); assert.equal(V.spokenText(pii), pii.answer);
  const g = pick(i => i.module === 'artikel' && i.skill === 'genero'); assert.equal(V.spokenText(g), g.answer + ' ' + g.lemma);
  const p = pick(i => i.module === 'artikel' && i.skill === 'plural'); assert.equal(V.spokenText(p), 'die ' + p.answer);
  const ind = pick(i => i.skill === 'indefinido'); const t = V.spokenText(ind); assert.ok(t.includes(ind.answer) && !/_/.test(t));
  const cl = pick(i => i.module === 'deklination' && i.type === 'cloze' && /\(.+\)\s*$/.test(i.prompt)); const tc = V.spokenText(cl);
  assert.ok(tc.includes(cl.answer) && !/_/.test(tc) && !/^Completa/i.test(tc) && !/\)\s*$/.test(tc), tc);
  const tr = pick(i => i.type === 'transform'); assert.equal(V.spokenText(tr), tr.answer);
  st.all.filter(i => ['verben', 'artikel', 'deklination'].includes(i.module)).forEach(i => { const s = V.spokenText(i); assert.ok(s.length > 0 && !/_{2,}/.test(s) && s === s.normalize('NFC'), i.id); });
});
