// Experimento de variedad (30 sesiones × 10, 5 módulos, 8 h entre sesiones, 80 % de aciertos): ¿mejoran memorySessions / futureGap / cupo de nuevas la proporción de ejercicios distintos?
// Resultado (ESTADO.md): no; todas las variantes dan 30–34 %. Uso: node tools/exp-variedad.js
const path = require('path').join(__dirname, '..') + '/';
const {newEngine,respond,manualClock}=require(path+'tests/helpers.js');
function run(label,{mem,sched,seed=7,hours=8,n=30,size=10}){
  const clock=manualClock(1.8e12);
  const {eng}=newEngine({seed,clock,schedulerConfig:sched});
  if(mem) eng.state().settings.memorySessions=mem;
  const mods=['verben','artikel','deklination','praepositionen','konnektoren'];
  const seen=[],bySess=[],modc={};let k=0;
  for(let i=0;i<n;i++){
    const s=eng.startSession({kind:'mix',modules:mods,size});const ids=new Set();
    while(!s.done()){const it=s.currentItem(),e=s.currentEntry();if(e.retry===0){seen.push(it.id);ids.add(it.id);modc[it.module]=(modc[it.module]||0)+1;}
      s.answer(respond(it,k++%5!==3),{mode:'touch'});}
    s.finish();bySess.push(ids);clock.advance(hours*3600e3);
  }
  let ov=0,tot=0;for(let i=1;i<bySess.length;i++)bySess[i].forEach(id=>{tot++;if(bySess[i-1].has(id))ov++});
  const uniq=new Set(seen).size,units=new Set(seen.map(id=>eng.store.byId[id].unit)).size;
  const sh=Object.fromEntries(Object.keys(modc).map(m=>[m,Math.round(100*modc[m]/seen.length)]));
  console.log(label.padEnd(34),'distintos',uniq+'/'+seen.length,(100*uniq/seen.length).toFixed(0)+'%','unidades',units,'solape',(100*ov/tot).toFixed(0)+'%',JSON.stringify(sh));
}
run('base (mem 5)',{});
run('mem 8',{mem:8});
run('mem 12',{mem:12});
run('futureGap 6',{sched:{futureGap:6}});
run('mem 12 + futureGap 8',{mem:12,sched:{futureGap:8}});
run('newShareMin .3 base .5',{sched:{newShareMin:0.3,newShareBase:0.5,newShareMax:0.7}});
run('mem 12 + nuevas altas',{mem:12,sched:{newShareMin:0.3,newShareBase:0.5,newShareMax:0.7}});
run('base seed 8',{seed:8}); run('mem 12 seed 8',{mem:12,seed:8});
