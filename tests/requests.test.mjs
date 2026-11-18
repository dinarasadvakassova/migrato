import test from 'node:test';
import assert from 'node:assert/strict';
import {requestGroups,buildRequestText} from '../dist/data/requests.js';

test('migration enquiry topics have complete distinct questions in all three languages',()=>{
 assert.equal(requestGroups.length,10);
 assert.equal(new Set(requestGroups.map(item=>item.situation)).size,10);
 assert.ok(requestGroups.some(item=>item.situation==='refugee-status'));
 assert.ok(requestGroups.some(item=>item.situation==='political-asylum'));
 for(const group of requestGroups){
  assert.ok(group.phrases.length>=3,'Keep targeted follow-ups without padding each topic to an arbitrary quota');
  assert.equal(new Set(group.phrases.map(item=>item.id)).size,group.phrases.length);
  for(const lang of ['ru','kk','en']){
   for(const field of ['title','description','opening'])assert.ok(group[field][lang]?.trim());
   const questions=group.phrases.map(item=>item.text[lang]);
   assert.ok(questions.every(text=>typeof text==='string'&&text.length>20));
   assert.equal(new Set(questions).size,questions.length);
  }
 }
});

test('enquiry text depends on the topic and the selected questions, not unrelated old selections',()=>{
 const group=requestGroups.find(item=>item.situation==='residence-card-replace');
 const selected=group.phrases.find(item=>item.id==='loss');
 const unselected=group.phrases.find(item=>item.id==='expiry');
 const text=buildRequestText({situation:group.situation,selectedIds:['loss','service:p1','not-real'],lang:'ru'});
 assert.ok(text.includes(group.opening.ru));
 assert.ok(text.includes(selected.text.ru));
 assert.ok(!text.includes(unselected.text.ru));
 assert.ok(!text.includes('service:p1'));
 const another=buildRequestText({situation:'citizenship',selectedIds:['procedure'],lang:'ru'});
 assert.notEqual(text,another);
 assert.ok(another.includes('гражданство'));
});

test('switching output language retains chosen questions and a coherent greeting and closing',()=>{
 const group=requestGroups.find(item=>item.situation==='rvp-first');
 const ids=['receipt','basis','basis'];
 for(const lang of ['ru','kk','en']){
  const text=buildRequestText({situation:group.situation,selectedIds:ids,lang});
  assert.ok(text.includes(group.opening[lang]));
  const basis=group.phrases.find(item=>item.id==='basis').text[lang];
  const receipt=group.phrases.find(item=>item.id==='receipt').text[lang];
  assert.ok(text.includes('1. '+basis));
  assert.ok(text.includes('2. '+receipt));
  assert.equal(text.split(basis).length-1,1);
  assert.ok(text.split('\n').at(-1).length>20);
 }
});

test('no draft is generated without a valid topic and at least one applicable question',()=>{
 assert.equal(buildRequestText(), '');
 assert.equal(buildRequestText({situation:'not-real',selectedIds:['basis']}),'');
 assert.equal(buildRequestText({situation:'rvp-first',selectedIds:[]}), '');
 assert.equal(buildRequestText({situation:'political-asylum',selectedIds:['old-id']}), '');
});
