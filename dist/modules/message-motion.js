// A whole-message effect. Text, layout, focus and live-region content stay intact.
const signatures=new WeakMap(),animations=new WeakMap(),active=new Set();
let watching=false,media;
function motionDisabled(){return globalThis.document?.documentElement?.dataset.motion==='paused'||Boolean(media?.matches);}
export function cancelMessageMotion(node){
 const record=animations.get(node);if(!record)return;
 animations.delete(node);active.delete(record);record.animation.cancel();
}
function cancelActive(){for(const record of [...active])cancelMessageMotion(record.node);}
function watchPreferences(){
 if(watching||!globalThis.document?.documentElement)return;watching=true;
 media=globalThis.matchMedia?.('(prefers-reduced-motion: reduce)');
 const changed=()=>{if(motionDisabled())cancelActive();};
 if(media?.addEventListener)media.addEventListener('change',changed);else media?.addListener?.(changed);
 if(typeof MutationObserver==='function')new MutationObserver(changed).observe(document.documentElement,{attributes:true,attributeFilter:['data-motion']});
}
export function revealMessage(node,signature=node?.textContent){
 if(!node?.isConnected)return false;watchPreferences();
 const text=String(signature??'');if(signatures.get(node)===text)return false;
 signatures.set(node,text);cancelMessageMotion(node);node.classList.add('consultant-message-motion');
 if(!text||motionDisabled()||typeof node.animate!=='function')return false;
 try{
  const animation=node.animate([{opacity:0,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:280,easing:'ease-out',fill:'none'}),record={node,animation};
  animations.set(node,record);active.add(record);
  const finished=()=>{active.delete(record);if(animations.get(node)===record)animations.delete(node);};
  animation.finished?.then(finished,finished);return true;
 }catch{return false;}
}
