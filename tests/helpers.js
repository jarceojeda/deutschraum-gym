const path = require('path');
const { loadAll } = require('../tools/load-data.js');
require('../src/dg-engine.js');
const DG = globalThis.DG;
let _cache = null;
function dataset() { return _cache || (_cache = loadAll()); }
function memStorage() { const m = {}; return { getItem: k => (k in m ? m[k] : null), setItem: (k, v) => { m[k] = String(v); }, removeItem: k => { delete m[k]; }, _m: m }; }
function manualClock(t0) { let t = t0 || 1.7e12; return { now: () => t, advance: ms => { t += ms; }, set: v => { t = v; } }; }
function newEngine(opts) {
  opts = opts || {};
  const { data, concepts } = dataset();
  const clock = opts.clock || manualClock();
  const storage = opts.storage || memStorage();
  const eng = DG.engine.createEngine({ data: opts.data || data, concepts, storage, clock, rng: DG.rng.create(opts.seed == null ? 1234 : opts.seed), config: opts.config, keepIds: opts.keepIds, schedulerConfig: opts.schedulerConfig });
  return { eng, clock, storage };
}
// Respuesta «del alumno» para un ítem (correcta o deliberadamente mala).
function respond(item, correct) {
  if (item.type === 'minimal-pair') return correct ? { wo: item.wo.answer, wohin: item.wohin.answer } : { wo: 'zzz', wohin: 'zzz' };
  return correct ? item.answer : '¿¿??';
}
module.exports = { DG, dataset, memStorage, manualClock, newEngine, respond };
