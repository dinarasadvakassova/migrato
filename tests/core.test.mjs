import test from 'node:test';
import assert from 'node:assert/strict';
import {notificationDeadline,buildICS} from '../dist/modules/planning.js';
import {calculateBudget} from '../dist/modules/practical.js';
import {parseISO} from '../dist/modules/shared.js';
import {sources,actions,quiz,simulation,problems,rentalClauses,content,places,calendarRules} from '../dist/data/content.js';
import {createSimulationState,transitionSimulation} from '../dist/modules/learning.js';

test('a wrong decision takes a distinct recovery path without completing a real-world task',()=>{
 const state=createSimulationState();
 assert.equal(transitionSimulation(state,{type:'advance'}),false);
 assert.equal(transitionSimulation(state,{type:'choose-main',choice:1}),true);
 assert.equal(state.branch,'recovery');
 assert.equal(transitionSimulation(state,{type:'advance'}),false);
 const restored=JSON.parse(JSON.stringify(state));
 assert.equal(transitionSimulation(restored,{type:'choose-recovery',choice:1}),true);
 assert.equal(transitionSimulation(restored,{type:'advance'}),false);
 assert.equal(transitionSimulation(restored,{type:'retry-recovery'}),true);
 assert.equal(transitionSimulation(restored,{type:'choose-recovery',choice:0}),true);
 assert.equal(transitionSimulation(restored,{type:'advance'}),true);
 assert.equal(restored.index,1);assert.equal(restored.branch,'main');
 assert.ok(restored.path.some(event=>event.phase==='recovery'));
 assert.equal('actionDone' in restored,false);
 const direct=createSimulationState();
 for(let i=0;i<simulation.length;i++){assert.ok(transitionSimulation(direct,{type:'choose-main',choice:0}));assert.ok(transitionSimulation(direct,{type:'advance'}));}
 assert.equal(direct.index,simulation.length);
 assert.equal(direct.path.some(event=>event.phase==='recovery'),false);
});

test('unverified default rule fails closed; a synthetic planning fixture handles date boundaries',()=>{
 assert.equal(notificationDeadline('2026-11-11'),null);
 const fixture={...calendarRules,notificationRuleVerified:true};
 const planningDate=value=>notificationDeadline(value,fixture);
 assert.equal(planningDate('2026-11-11'),'2026-11-13');
 assert.equal(planningDate('2026-11-13'),'2026-11-17');
 assert.equal(planningDate('2026-12-16'),'2026-12-21');
 assert.equal(planningDate('2026-12-31'),null);
 assert.equal(planningDate('2027-01-04'),null);
 assert.equal(planningDate('2026-02-29'),null);
 assert.ok(parseISO('2028-02-29'));
});
test('budgets distinguish monthly costs from first-month cash including refundable deposit',()=>{
 assert.deepEqual(calculateBudget({}),{monthly:0,first:0});
 assert.deepEqual(calculateBudget({rent:200000,utilities:20000,food:80000,transport:20000,connection:10000,other:10000,deposit:200000,oneoff:50000}),{monthly:340000,first:590000});
 for(const rent of [-1,'NaN',Infinity,1e12+1])assert.equal(calculateBudget({rent}),null);
});
test('calendar export preserves all-day event boundaries and escapes input',()=>{
 const value=buildICS([{id:'test',date:'2026-12-31',title:'Астана, документы; проверка',description:'line 1\nline 2\\end'}],{reminder:true});
 assert.ok(value.includes('DTSTART;VALUE=DATE:20261231\r\n'));
 assert.ok(value.includes('DTEND;VALUE=DATE:20270101\r\n'));
 assert.ok(value.includes('Астана\\, документы\\; проверка'));
 assert.ok(value.includes('line 1\\nline 2\\\\end'));
 assert.ok(value.includes('BEGIN:VALARM\r\n'));
 assert.ok(!/(?<!\r)\n/.test(value));
 for(const line of value.split('\r\n'))assert.ok(Buffer.byteLength(line)<=75);
});
test('learning content has valid answers, real source references and complete language values',()=>{
 assert.equal(quiz.length,12);assert.equal(simulation.length,5);
 const ids=new Set(sources.map(s=>s.id));
 const walk=value=>{
  if(!value||typeof value!=='object')return;
  if('ru' in value){for(const lang of ['ru','kk','en'])assert.ok(typeof value[lang]==='string'&&value[lang].trim());}
  if(value.sourceIds)for(const id of value.sourceIds)assert.ok(ids.has(id),`Unknown source ${id}`);
  Object.values(value).forEach(walk);
 };
 [sources,actions,quiz,simulation,problems,rentalClauses,places].forEach(walk);
 for(const q of quiz)assert.ok(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<q.options.length);
 const keys=Object.keys(content.ru).sort();
 assert.deepEqual(Object.keys(content.kk).sort(),keys);assert.deepEqual(Object.keys(content.en).sort(),keys);
 for(const city of ['astana','almaty','shymkent'])for(const type of ['service','migration','bank','medical'])assert.ok(places.some(p=>p.city===city&&p.type===type));
});
