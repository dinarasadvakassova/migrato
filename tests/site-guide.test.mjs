import test from 'node:test';
import assert from 'node:assert/strict';

// Event-level regression checks. Browser layout is verified separately.
test('Barys keeps advice beside the floating mascot as the reader changes sections',async t=>{
 const names=['Node','document','window','requestAnimationFrame','innerHeight','visualViewport','matchMedia'];
 const previous=new Map(names.map(name=>[name,Object.getOwnPropertyDescriptor(globalThis,name)]));
 t.after(()=>{for(const [name,descriptor] of previous){if(descriptor)Object.defineProperty(globalThis,name,descriptor);else delete globalThis[name];}});
 let document;
 class Element {
  constructor(tag){this.tagName=tag;this.children=[];this.attrs={};this.dataset={};this.events={};this._text='';this.className='';this.classList={add:name=>{this.className+=' '+name;}};this.style={setProperty(key,value){this[key]=value;}};}
  get id(){return this.attrs.id;} get hidden(){return this.attrs.hidden!==undefined;}
  set hidden(value){if(value)this.attrs.hidden='';else delete this.attrs.hidden;}
  setAttribute(key,value){this.attrs[key]=String(value);} getAttribute(key){return this.attrs[key]??null;}
  get textContent(){return this._text+this.children.map(node=>node.textContent).join('');}
  set textContent(value){this._text=String(value);this.children=[];}
  get isConnected(){return document.body.contains(this);}
  append(...nodes){for(const node of nodes){if(node.parentNode)node.parentNode.children=node.parentNode.children.filter(child=>child!==node);node.parentNode=this;this.children.push(node);}}
  prepend(node){this.append(node);this.children.unshift(this.children.pop());}
  contains(node){return node===this||this.children.some(child=>child.contains(node));}
  querySelector(selector){return this.querySelectorAll(selector)[0]||null;}
  querySelectorAll(selector){return this.children.flatMap(node=>[...(selector.startsWith('.')?node.className.split(/\s+/).includes(selector.slice(1)):selector.startsWith('#')?node.id===selector.slice(1):node.tagName===selector)?[node]:[],...node.querySelectorAll(selector)]);}
  addEventListener(type,callback){(this.events[type]??=[]).push(callback);}
  click(){for(const callback of this.events.click||[])callback({target:this});}
  focus(){document.activeElement=this;}
  matches(selector){return selector.split(',').includes(this.tagName);}
  scrollIntoView(options){this.scrolled=options;}
  getBoundingClientRect(){return this.rect||{top:0,bottom:900};}
 }
 document={body:new Element('body'),documentElement:new Element('html'),activeElement:null,addEventListener(){},
  createElement:tag=>new Element(tag),createTextNode:text=>Object.assign(new Element('#text'),{_text:text}),
  getElementById(id){return this.body.querySelector('#'+id);},
  querySelectorAll(selector){return selector==='main > section'?sections:this.body.querySelectorAll(selector);}
 };
 const sections=['start','documents','life','faq','cities'].map((id,index)=>{const node=new Element('section');node.setAttribute('id',id);node.rect={top:index?1200:0,bottom:index?2100:900};document.body.append(node);return node;});
 Object.assign(globalThis,{Node:Element,document,innerHeight:900,requestAnimationFrame:fn=>fn(),window:{events:{},addEventListener(type,callback){(this.events[type]??=[]).push(callback);},dispatchEvent(event){for(const callback of this.events[event.type]||[])callback(event);}}});
 const {mountSiteGuide,guideEvent}=await import('../dist/modules/site-guide.js');
 const state={lang:'ru',profile:{ready:false}},guide=mountSiteGuide({getState:()=>state,openTool(){}});
 assert.match(guide.body.textContent,/Помогу составить план/);
 assert.equal(guide.bubble.hidden,false,'The initial greeting must be open');
 assert.equal(guide.host.parentNode,document.body,'The advice must not move into a section that can scroll off screen');
 for(const section of sections.slice(1)){
  guide.close.click();
  for(const node of sections)node.rect={top:node===section?-400:-1500,bottom:node===section?900:-500};
  const focus=document.createElement('input');document.body.append(focus);focus.focus();
  window.dispatchEvent({type:'scroll'});
  assert.equal(guide.current,section.id);
  assert.equal(guide.bubble.hidden,false,'A new section must provide fresh advice');
  assert.equal(guide.host.parentNode,document.body);
  assert.equal(document.activeElement,focus,'Automatic advice must not steal focus');
  guide.close.click();window.dispatchEvent({type:'scroll'});
  assert.equal(guide.bubble.hidden,true,'Scrolling within a section must respect dismissal');
  guide.toggle.click();
  assert.equal(guide.bubble.hidden,false);
  assert.equal(guide.bubble.scrolled,undefined,'Opening advice must not jump the reader to the start of a section');
 }
 for(const lang of ['ru','kk','en']){state.lang=lang;guideEvent('language');assert.ok(guide.title.textContent.length>10);assert.ok(guide.body.textContent.length>40);}
 let prevented=false,stopped=false;
 guide.action.focus();for(const listener of guide.host.events.keydown)listener({key:'Escape',preventDefault(){prevented=true;},stopPropagation(){stopped=true;}});
 assert.equal(prevented&&stopped,true);assert.equal(guide.bubble.hidden,true);assert.equal(document.activeElement,guide.toggle);
 guide.toggle.click();guide.action.focus();
 globalThis.visualViewport={height:320,scale:1,offsetTop:0};window.dispatchEvent({type:'resize'});
 assert.equal(guide.bubble.hidden,true);assert.equal(document.activeElement,guide.toggle,'Resizing must not leave keyboard focus inside hidden advice');
 globalThis.visualViewport.height=900;window.dispatchEvent({type:'resize'});
 globalThis.matchMedia=()=>({matches:true});
 const input=document.createElement('input');document.body.append(input);input.focus();
 guideEvent('section',{section:'start'});
 assert.equal(guide.bubble.hidden,true,'Mobile typing must not be covered by an automatic popup');
 guide.toggle.click();assert.equal(guide.bubble.hidden,false,'The reader can still request advice explicitly');
 globalThis.visualViewport={height:320,scale:1,offsetTop:0};
 window.dispatchEvent({type:'resize'});
 assert.equal(guide.bubble.hidden,true);assert.equal(guide.host.dataset.compact,'true');
 assert.equal(document.activeElement,input,'Collapsing advice must preserve focus in an external form');
 assert.equal(guide.host.style['--guide-keyboard-offset'],'580px');
 guideEvent('section',{section:'documents'});assert.equal(guide.bubble.hidden,true,'A short keyboard viewport must retain the collapsed helper');
});
