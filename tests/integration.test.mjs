import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {actions} from '../dist/data/content.js';
import {journeyStages,journeyPosition} from '../dist/modules/journey.js';

const project=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');

test('the native ECMAScript linker resolves the complete app import graph without executing browser code',()=>{
 const script=`
  import fs from 'node:fs';
  import path from 'node:path';
  import vm from 'node:vm';
  const cache=new Map(),context=vm.createContext({});
  function moduleAt(filename){
   const full=path.resolve(filename);
   if(cache.has(full))return cache.get(full);
   const module=new vm.SourceTextModule(fs.readFileSync(full,'utf8'),{identifier:full,context});
   cache.set(full,module);return module;
  }
  try{
   const app=moduleAt(path.resolve('dist/app.js'));
   await app.link((specifier,parent)=>{
    if(!specifier.startsWith('.'))throw new Error('Unexpected non-local app import: '+specifier);
    return moduleAt(path.resolve(path.dirname(parent.identifier),specifier));
   });
   // Deliberately do not call evaluate(): document/window and the user's browser are untouched.
   console.log(JSON.stringify({status:app.status,modules:cache.size}));
  }catch(error){console.error(error.name+': '+error.message);process.exitCode=1;}
 `;
 const result=spawnSync(process.execPath,['--experimental-vm-modules','--input-type=module','-e',script],{
  cwd:project,encoding:'utf8',env:{...process.env,NODE_NO_WARNINGS:'1'}
 });
 assert.equal(result.status,0,result.stderr||result.error?.message||'Native module linking failed');
 const summary=JSON.parse(result.stdout.trim());
 assert.equal(summary.status,'linked');
 assert.ok(summary.modules>=10,'The test must link the full app graph, not just one module');
});

const categories=['student','worker','remote','relocate'];
const relevant=category=>actions.filter(action=>!action.categories?.length||action.categories.includes('all')||action.categories.includes(category));

for(const category of categories){
 test(`${category}: all relevant actions belong to exactly one of the five journey stages`,()=>{
  const list=relevant(category),stages=journeyStages(list),ids=stages.flatMap(stage=>stage.actions.map(action=>action.id));
  assert.equal(stages.length,5);
  assert.deepEqual(ids.slice().sort(),list.map(action=>action.id).sort(),'An action is missing from the journey or appears more than once');
  assert.equal(new Set(ids).size,ids.length);
  for(const stage of stages){assert.ok(stage.actions.length>0,`Unexpected empty stage ${stage.id}`);assert.ok(Number.isFinite(stage.x)&&Number.isFinite(stage.y));}
  assert.equal(stages.at(-1).id,'life');
 });

 test(`${category}: every completion combination positions the character at the first unfinished stage`,()=>{
  const list=relevant(category),stages=journeyStages(list);
  assert.ok(list.length<16,'Exhaustive completion checks must stay bounded');
  for(let mask=0;mask<2**list.length;mask++){
   const done=Object.fromEntries(list.map((action,index)=>[action.id,Boolean(mask&(1<<index))]));
   const expectedIndex=stages.findIndex(stage=>stage.actions.some(action=>!done[action.id]));
   const expected=expectedIndex<0?stages.at(-1):stages[expectedIndex];
   const position=journeyPosition(stages,done),context=`category=${category}, mask=${mask}, expected stage=${expected.id}`;
   assert.equal(position.index,expectedIndex<0?stages.length-1:expectedIndex,context);
   assert.equal(position.x,expected.x,context+' — x must be the checkpoint, not an interpolated location');
   assert.equal(position.y,expected.y,context+' — y must be the checkpoint, not an interpolated location');
   assert.equal(position.finished,expectedIndex<0,context);
  }
 });

 test(`${category}: unchecking an earlier task revokes completion and returns to that checkpoint`,()=>{
  const list=relevant(category),stages=journeyStages(list),done=Object.fromEntries(list.map(action=>[action.id,true]));
  const last=stages.at(-1);
  assert.deepEqual(journeyPosition(stages,done),{index:stages.length-1,x:last.x,y:last.y,finished:true});
  for(let index=stages.length-1;index>=0;index--){
   const id=stages[index].actions[0].id;done[id]=false;
   assert.deepEqual(journeyPosition(stages,done),{index,x:stages[index].x,y:stages[index].y,finished:false});
   done[id]=true;
  }
 });
}

test('calculating journey stages and position does not mutate actions or completion marks',()=>{
 const list=relevant('student'),done={notify:true,stay:true},before=JSON.stringify({list,done});
 const stages=journeyStages(list);journeyPosition(stages,done);
 assert.equal(JSON.stringify({list,done}),before);
});
