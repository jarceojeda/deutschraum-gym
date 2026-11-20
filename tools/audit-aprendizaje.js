// Auditoría de aprendizaje con el motor real y TODO el contenido: 60 sesiones simuladas (≈82 % de aciertos, 6 h entre sesiones).
// Mide rendimiento, cobertura de módulos/habilidades, repetición, progresión de nivel y errores acumulados. Uso: node tools/audit-aprendizaje.js [semilla]
const fs = require('fs'), path = require('path');
require('../src/dg-engine.js'); const DG = globalThis.DG, dir = path.join(__dirname, '..', 'data');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && !/^concepts|beyond/.test(f));
const data = []; files.forEach(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')).forEach(i => data.push(i)));
const concepts = JSON.parse(fs.readFileSync(path.join(dir, 'concepts.json'), 'utf8'));
const ACC_FAIL = +(process.argv[3] || 18); let t = 1.7e12; const clock = { now: () => t }; const seed = +process.argv[2] || 7;
const m = {}; const store = {}; const storage = { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } };
let t0 = Date.now(); const eng = DG.engine.createEngine({ data, concepts, storage, clock, rng: DG.rng.create(seed) }); console.log('createEngine:', Date.now() - t0, 'ms ·', eng.store.all.length, 'ítems');
const MODS = eng.store.modules(), seenSkill = {}, seenItem = {}, perSession = [], lat = []; let answers = 0, wrong = 0, k = 0; const lvTrace = [];
for (let s = 0; s < 60; s++) {
  const t1 = Date.now(); const ses = eng.startSession({ kind: 'mix', modules: MODS, size: 20, mode: 'touch' }); lat.push(Date.now() - t1);
  const ids = []; while (!ses.done()) { const it = ses.currentItem(); ids.push(it.id); const ok = (k++ % 100) >= ACC_FAIL; answers++; if (!ok) wrong++;
    ses.answer(ok ? (it.type === 'minimal-pair' ? { wo: it.wo.answer, wohin: it.wohin.answer } : it.answer) : (it.type === 'minimal-pair' ? { wo: 'x', wohin: 'x' } : 'zzz'), { mode: 'touch' });
    m[it.module] = (m[it.module] || 0) + 1; const sk = it.module + ':' + it.skill; seenSkill[sk] = (seenSkill[sk] || 0) + 1; seenItem[it.id] = (seenItem[it.id] || 0) + 1; }
  perSession.push(new Set(ids)); ses.finish(); t += 6 * 3600e3;
  if (s % 15 === 14) lvTrace.push(s + 1 + ': ' + MODS.map(x => x + '=' + eng.levelOf(x)).join(' '));
}
const total = answers; console.log('startSession ms (media/máx):', (lat.reduce((a, b) => a + b, 0) / lat.length).toFixed(1), '/', Math.max(...lat));
console.log('reparto por módulo:', MODS.map(x => x + ' ' + (100 * (m[x] || 0) / total).toFixed(0) + '%').join(' · '));
console.log('niveles por sesión:'); lvTrace.forEach(l => console.log('  ' + l));
const allSkills = {}; eng.store.all.forEach(i => { allSkills[i.module + ':' + i.skill] = 1; });
const never = Object.keys(allSkills).filter(x => !seenSkill[x]); console.log('habilidades vistas:', Object.keys(seenSkill).length, '/', Object.keys(allSkills).length, '· nunca vistas en 60 sesiones:', never.length, never.slice(0, 40).join(', '));
let sol = 0, tot = 0; for (let i = 1; i < perSession.length; i++) perSession[i].forEach(id => { tot++; if (perSession[i - 1].has(id)) sol++; }); console.log('solape con la sesión anterior:', (100 * sol / tot).toFixed(0) + ' %');
const rep = Object.values(seenItem); console.log('ítems distintos:', rep.length, '· máx repeticiones de un ítem:', Math.max(...rep), '· ítems vistos ≥4 veces:', rep.filter(x => x >= 4).length);
console.log('errores pendientes al final:', eng.errorQueue().length, '· aciertos simulados:', (100 * (answers - wrong) / answers).toFixed(0) + ' %');
const top = Object.entries(seenItem).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([id, n]) => id + '×' + n); console.log('más repetidos:', top.join(' | '));
const byMod = {}; Object.entries(seenItem).forEach(([id, n]) => { const it = eng.store.byId[id]; (byMod[it.module] = byMod[it.module] || []).push(n); });
console.log('ítems distintos por módulo (vistos / repeticiones medias):', Object.entries(byMod).map(([k, v]) => k + ' ' + v.length + '/' + (v.reduce((a, b) => a + b, 0) / v.length).toFixed(1)).join(' · '));
