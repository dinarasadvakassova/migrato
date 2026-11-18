import test from 'node:test';
import assert from 'node:assert/strict';
import {faq} from '../dist/data/faq.js';
import {quiz,simulation,actions,actionFAQ} from '../dist/data/content.js';
import {quizForCategory} from '../dist/data/personas.js';
import {chatQuestions,chatReply} from '../dist/modules/barys-chat.js';

test('profile prioritisation retains twelve different learning situations',()=>{
 for(const category of ['student','worker','remote','relocate']){
  const questions=quizForCategory(category);
  assert.equal(questions.length,12);
  assert.equal(new Set(questions.map(item=>item.id)).size,12);
  for(const original of quiz)assert.deepEqual(questions.find(item=>item.id===original.id),original,'Prioritising a profile must not replace another question with a near-duplicate');
 }
 assert.equal(quizForCategory('student')[0].id,'q8');
 assert.equal(quizForCategory('worker')[0].id,'q7');
});

test('every published FAQ is reachable through Barys and uses the same answer',()=>{
 const groups=['temporary','residence','citizenship','protection','family','arrival','finance','work-study','health-life'];
 const reachable=new Set(groups.flatMap(group=>chatQuestions(group).map(item=>item.id)));
 for(const item of faq){
  assert.ok(reachable.has(item.id),`Barys cannot reach ${item.id}`);
  for(const lang of ['ru','kk','en']){
   const reply=chatReply(item.id,lang);
   assert.equal(reply.answer,item.answer[lang]);assert.deepEqual(reply.steps,item.steps.map(step=>step[lang]));
  }
 }
});

test('the housing scene teaches the migration address decision',()=>{
 const home=simulation.find(scene=>scene.id==='home');
 assert.ok(home.choices.every(choice=>choice.sourceIds.includes('rvp-apply')));
 assert.match(home.scene.ru,/РВП/);assert.doesNotMatch(home.scene.ru,/ремонт|залог/);
 assert.doesNotMatch(simulation.find(scene=>scene.id==='settle').choices[0].feedback.ru,/чек-лист/);
});

test('route summaries and help links use the published, reachable FAQ answers',()=>{
 for(const [actionId,faqId] of Object.entries(actionFAQ)){
  const item=faq.find(row=>row.id===faqId),action=actions.find(row=>row.id===actionId);
  assert.ok(item,`Broken help link: ${actionId} → ${faqId}`);
  assert.deepEqual(action.description,item.answer,`Stale summary for ${actionId}`);
  assert.deepEqual(action.sourceIds,item.sourceIds);
 }
});
