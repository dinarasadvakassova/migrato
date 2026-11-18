import test from 'node:test';
import assert from 'node:assert/strict';
import {budget,phrases} from '../dist/modules/practical.js';
import {requestGroups} from '../dist/data/requests.js';

// A small DOM model exercises real renderers and input handlers, not browser layout.
class Element {
 constructor(tag,text=''){this.tagName=tag.toUpperCase();this.childNodes=[];this.attributes={};this.listeners={};this._text=text;this.value='';this.checked=false;this.validity={badInput:false};}
 setAttribute(key,value){this.attributes[key]=String(value);if(key==='class')this.className=String(value);if(key==='id')this.id=String(value);if(key==='value')this.value=String(value);}
 getAttribute(key){return key==='class'?this.className??null:key==='id'?this.id??null:this.attributes[key]??null;}
 addEventListener(type,handler){(this.listeners[type]??=[]).push(handler);}
 append(...nodes){for(const node of nodes.flat(Infinity))this.childNodes.push(node instanceof Element?node:new Element('#text',String(node)));}
 replaceChildren(...nodes){this.childNodes=[];this._text='';this.append(...nodes);}
 set textContent(value){this.childNodes=[];this._text=String(value);}
 get textContent(){return this._text+this.childNodes.map(node=>node.textContent).join('');}
 dispatch(type){for(const handler of this.listeners[type]||[])handler({target:this,preventDefault(){}});}
}
globalThis.Node=Element;
globalThis.document={createElement:tag=>new Element(tag),createTextNode:text=>new Element('#text',text)};
function all(node,predicate){return [node,...node.childNodes.flatMap(child=>all(child,predicate))].filter(predicate);}
function byId(root,id){return all(root,node=>node.id===id)[0];}
function hasClass(node,name){return (node.className||'').split(/\s+/).includes(name);}
function context(lang='en'){
 const ctx={lang,container:new Element('div'),state:{budget:{scenarios:[{},{}]},phrases:{situation:'rvp-first',lang,selected:{}}},save(){},announce(){}};
 return ctx;
}
function fill(ctx,key,value){const input=byId(ctx.container,'budget-0-'+key);input.value=String(value);input.dispatch('input');}
function total(ctx,name){return all(ctx.container,node=>node.getAttribute('data-budget-total')===name)[0].textContent;}

test('budget presents one plan and distinguishes missing amounts from explicit zero',()=>{
 const ctx=context();budget(ctx);
 assert.equal(all(ctx.container,node=>node.tagName==='INPUT').length,9);
 assert.ok(!ctx.container.textContent.includes('Scenario A'));
 assert.ok(!ctx.container.textContent.includes('Scenario B'));
 assert.equal(total(ctx,'monthly'),'—');
 assert.match(ctx.container.textContent,/not a confirmed zero/);
 fill(ctx,'rent',100000);
 assert.match(total(ctx,'monthly'),/100,000/);
 assert.match(ctx.container.textContent,/Provisional estimate/);
 for(const key of ['rent','utilities','food','transport','connection','other','deposit','oneoff','reserve'])fill(ctx,key,0);
 assert.match(total(ctx,'monthly'),/0/);
 assert.match(ctx.container.textContent,/All amounts are filled in/);
});

test('budget explains security cash and calculates the documented first-month example',()=>{
 const ctx=context();budget(ctx);
 for(const [key,value]of Object.entries({rent:100000,utilities:15000,food:50000,transport:0,connection:0,other:0,deposit:100000,oneoff:20000,reserve:0}))fill(ctx,key,value);
 assert.match(total(ctx,'monthly'),/165,000/);
 assert.match(total(ctx,'first'),/285,000/);
 assert.match(ctx.container.textContent,/not a second rent payment/);
 assert.match(ctx.container.textContent,/not a total of non-refundable/);
 fill(ctx,'deposit',0);
 assert.match(total(ctx,'first'),/185,000/);
 fill(ctx,'rent',-1);
 assert.equal(byId(ctx.container,'budget-0-rent').getAttribute('aria-invalid'),'true');
 assert.equal(total(ctx,'first'),'—');
 fill(ctx,'rent',100000);
 assert.equal(byId(ctx.container,'budget-0-rent').getAttribute('aria-invalid'),'false');
});

test('request topic and output-language changes preserve scoped selections without selecting stale phrases',()=>{
 const ctx=context();
 ctx.state.phrases.selected={'service:p1':true};
 ctx.render=()=>{ctx.container.replaceChildren();phrases(ctx);};
 ctx.render();
 let checkboxes=all(ctx.container,node=>node.getAttribute('type')==='checkbox');
 assert.equal(checkboxes.length,requestGroups.find(group=>group.situation==='rvp-first').phrases.length);
 assert.ok(checkboxes.every(node=>!node.checked));
 const output=()=>all(ctx.container,node=>node.tagName==='TEXTAREA')[0];
 assert.equal(output().value,'');
 checkboxes[0].checked=true;checkboxes[0].dispatch('change');
 assert.match(output().value,/first temporary residence permit/);
 let lang=byId(ctx.container,'phrase-language');lang.value='kk';lang.dispatch('change');
 assert.match(output().value,/Сәлеметсіз бе/);
 assert.equal(all(ctx.container,node=>node.getAttribute('type')==='checkbox')[0].checked,true);
 let topic=byId(ctx.container,'phrase-situation');topic.value='citizenship';topic.dispatch('change');
 assert.equal(output().value,'');
 checkboxes=all(ctx.container,node=>node.getAttribute('type')==='checkbox');
 checkboxes[0].checked=true;checkboxes[0].dispatch('change');
 assert.match(output().value,/азаматтығына/);
 topic=byId(ctx.container,'phrase-situation');topic.value='rvp-first';topic.dispatch('change');
 assert.match(output().value,/уақытша тұруға/);
 assert.equal(ctx.state.phrases.selected['service:p1'],true);
});
