import test from 'node:test';
import assert from 'node:assert/strict';
import {planSummary} from '../dist/modules/shared.js';
import {calculateBudget} from '../dist/modules/practical.js';
import {calendarRules} from '../dist/data/content.js';
import {notificationDeadline} from '../dist/modules/planning.js';
import {createSimulationState,transitionSimulation} from '../dist/modules/learning.js';

test('a general or unsupported profile cannot finish merely by marking all known actions',()=>{
 const state={category:'worker',profile:{ready:false,citizenship:'ru'},actionDone:{},actionReview:{}};
 for(const action of planSummary(state).list)state.actionDone[action.id]=true;
 assert.equal(planSummary(state).finished,false);
 state.profile.ready=true;state.profile.citizenship='other';
 assert.equal(planSummary(state).supported,false);
 assert.equal(planSummary(state).finished,false);
 state.profile.citizenship='ru';
 assert.equal(planSummary(state).finished,true);
 state.route={ready:true,citizenship:'other'};assert.equal(planSummary(state).finished,false);
 state.route={ready:true,citizenship:'ru'};assert.equal(planSummary(state).finished,true);
});

test('reviewing a changed action and removing a checkmark revoke completion',()=>{
 const state={category:'student',profile:{ready:true,citizenship:'ua'},actionDone:{},actionReview:{}};
 const actions=planSummary(state).list;
 for(const action of actions)state.actionDone[action.id]=true;
 assert.equal(planSummary(state).finished,true);
 state.actionReview[actions[0].id]=true;
 assert.equal(planSummary(state).finished,false);
 assert.equal(planSummary(state).done,actions.length-1);
 delete state.actionReview[actions[0].id];state.actionDone[actions[0].id]=false;
 assert.equal(planSummary(state).finished,false);
});

test('first-month cash includes a separate refundable deposit and reserve with decimal-safe sums',()=>{
 assert.deepEqual(calculateBudget({rent:100,deposit:50,oneoff:5,reserve:10}),{monthly:100,first:165});
 assert.deepEqual(calculateBudget({rent:.1,food:.2,reserve:.1}),{monthly:.3,first:.4});
 assert.equal(calculateBudget({reserve:-1}),null);
});

test('automatic notification dates remain unavailable while the legal rule is not fully verified',()=>{
 assert.equal(calendarRules.notificationRuleVerified,false);
 assert.equal(notificationDeadline('2026-11-13'),null);
});

test('returning to an earlier simulation decision removes the unreachable downstream history',()=>{
 const state=createSimulationState();
 for(let index=0;index<2;index++){
  assert.equal(transitionSimulation(state,{type:'choose-main',choice:0}),true);
  assert.equal(transitionSimulation(state,{type:'advance'}),true);
 }
 assert.equal(state.index,2);assert.equal(state.path.length,2);
 assert.equal(transitionSimulation(state,{type:'back',index:0}),true);
 assert.equal(state.index,0);assert.deepEqual(state.choices,{});assert.deepEqual(state.path,[]);
 assert.equal(transitionSimulation(state,{type:'back',index:4}),false);
 assert.equal(transitionSimulation(state,{type:'choose-main',choice:1}),true);
 assert.equal(state.branch,'recovery');assert.equal('actionDone' in state,false);
});
