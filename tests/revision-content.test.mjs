import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {faq,faqSources} from '../dist/data/faq.js';
import {sources,quiz} from '../dist/data/content.js';
import {chatQuestions,chatReply} from '../dist/modules/barys-chat.js';

test('ten distinct entry points replace repeated task-list tools and stale global audit dates',()=>{
 const page=fs.readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
 const ids=[...new Set([...page.matchAll(/data-tool="([^"]+)"/g)].map(match=>match[1]))];
 assert.equal(ids.length,10);
 assert.ok(!page.includes('datetime="2026-11-11"'));
 for(const id of ['calendar','navigator','checklist'])assert.ok(page.includes(`data-tool="${id}"`));
 const app=fs.readFileSync(new URL('../dist/app.js',import.meta.url),'utf8');
 assert.ok(app.includes('calendar:documentExpiry'));assert.ok(app.includes('navigator:compareStatuses'));assert.ok(app.includes('checklist:documentReadiness'));
});
test('migration FAQ and scripted answers cover different residence and protection procedures without generic disputes',()=>{
 assert.equal(faq.length,43);assert.equal(quiz.length,12);
 for(const id of ['rental-dispute','correct-iin','unpaid-wages'])assert.ok(!faq.some(item=>item.id===id));
 const known=new Set([...sources,...faqSources].map(item=>item.id));
 for(const item of faq)for(const id of item.sourceIds)assert.ok(known.has(id),id);
 for(const group of ['temporary','residence','citizenship','protection','family']){
  const questions=chatQuestions(group);assert.ok(questions.length>=2,group);
  for(const lang of ['ru','kk','en']){const reply=chatReply(questions[0].id,lang);assert.ok(reply.answer&&reply.authority&&reply.steps.length>=3);}
 }
 assert.deepEqual(chatQuestions('unknown'),[]);assert.equal(chatReply('unknown'),null);
 for(const id of ['q5','q6','q11','q12'])assert.ok(quiz.find(item=>item.id===id).sourceIds.some(source=>source.includes('pmz')||source.includes('vnz')||source.includes('refugee')||source.includes('citizenship')));
});
