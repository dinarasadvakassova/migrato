import {pick, sources, actions,actionFAQ} from '../data/content.js';

export const tri = (ru,kk,en) => ({ru,kk,en});
export const labels = {
  category:tri('Ваша категория','Санатыңыз','Your category'),
  student:tri('Студент','Студент','Student'),worker:tri('Трудовой мигрант','Еңбек мигранты','Migrant worker'),remote:tri('Удалённый работник','Қашықтан жұмыс істейтін адам','Remote worker'),relocate:tri('Релокант','Қоныс аударушы','Relocating resident'),
  next:tri('Продолжить','Жалғастыру','Continue'),back:tri('Назад','Артқа','Back'),restart:tri('Начать заново','Қайта бастау','Start again'),
  sources:tri('Источники и нормы','Дереккөздер мен нормалар','Sources and provisions'),checked:tri('Проверено','Тексерілді','Checked'),done:tri('Выполнено','Орындалды','Completed'),
  migration:tri('Миграционные вопросы','Көші-қон мәселелері','Migration'),finance:tri('Финансы и банковские услуги','Қаржы және банк қызметтері','Finance and banking'),housing:tri('Жильё','Баспана','Housing'),work:tri('Работа и учёба','Жұмыс және оқу','Work and study'),life:tri('Повседневная жизнь','Күнделікті өмір','Everyday life'),
  all:tri('Все','Барлығы','All'),select:tri('Выберите вариант','Нұсқаны таңдаңыз','Choose an option'),
  local:tri('Прогресс хранится только в этом браузере. Не вводите персональные данные.','Прогресс тек осы браузерде сақталады. Жеке деректерді енгізбеңіз.','Progress is saved only in this browser. Do not enter personal data.'),
  empty:tri('Выберите категорию, чтобы увидеть подходящие шаги.','Тиісті қадамдарды көру үшін санатты таңдаңыз.','Choose a category to see relevant steps.'),
};
export function el(tag, attrs={}, ...children) {
  const n=document.createElement(tag);
  for (const [key,value] of Object.entries(attrs)) {
    if (value===undefined||value===null||value===false) continue;
    if (key==='class') n.className=value;
    else if (key==='text') n.textContent=value;
    else if (key.startsWith('on')&&typeof value==='function') n.addEventListener(key.slice(2),value);
    else if (key==='checked'||key==='disabled'||key==='selected') n[key]=Boolean(value);
    else n.setAttribute(key,String(value));
  }
  children.flat(Infinity).forEach(c=>{if(c!==null&&c!==undefined&&c!==false)n.append(c instanceof Node?c:document.createTextNode(String(c)));});
  return n;
}
export function t(ctx,value) { return String(pick(value,ctx.lang)??''); }
export function button(ctx,label,fn,attrs={}) { return el('button',{type:'button',class:'button button-secondary',onclick:fn,...attrs},t(ctx,label)); }
export function note(ctx,text,kind='') {return el('p',{class:`tool-note ${kind}`},t(ctx,text));}
export function sourceBox(ctx,ids=[]) {
  const registry=[...sources,...(ctx.extraSources||[])];
  const items=[...new Set(ids)].map(id=>registry.find(s=>s.id===id)).filter(Boolean);
  if(!items.length)return document.createDocumentFragment();
  return el('aside',{class:'source-box'},el('h4',{},t(ctx,labels.sources)),el('ul',{class:'source-list'},items.map(s=>el('li',{},el('a',{href:s.url,target:'_blank',rel:'noopener noreferrer'},t(ctx,s.title)),el('small',{},` ${t(ctx,s.reference)} · ${t(ctx,labels.checked)}: ${s.checked}`),s.verificationScope?el('small',{class:'source-verification'},t(ctx,s.verificationScope)):null))));
}
export function field(ctx,id,label,node,hint) {
  node.id=id;
  const err=el('p',{id:`${id}-error`,class:'field-error',role:'alert'});
  const description=hint?el('small',{id:`${id}-hint`},t(ctx,hint)):null;
  node.setAttribute('aria-describedby',[hint?`${id}-hint`:null,`${id}-error`].filter(Boolean).join(' '));
  return {wrap:el('div',{class:'field'},el('label',{for:id},t(ctx,label)),node,description,err),input:node,error:err};
}
export function select(ctx,id,label,values,value,onchange) {
  const n=el('select',{onchange:e=>onchange(e.target.value)});
  values.forEach(([v,l])=>n.append(el('option',{value:v,selected:v===value},t(ctx,l))));
  n.value=value??'';
  return field(ctx,id,label,n).wrap;
}
export function categorySelect(ctx,onchange) {
  return select(ctx,'profile-category',labels.category,[['',labels.select],...['student','worker','remote','relocate'].map(v=>[v,labels[v]])],ctx.state.category,v=>{ctx.state.category=v;ctx.state.route.ready=false;ctx.state.calendar.ready=false;ctx.save();onchange?.(v);});
}
export function relevantActions(ctx) {return actions.filter(a=>!a.categories?.length||a.categories.includes('all')||a.categories.includes(ctx.state.category));}
export function planSummary(state) {
 const list=actions.filter(a=>!state.category||!a.categories?.length||a.categories.includes('all')||a.categories.includes(state.category));
 const done=list.filter(a=>state.actionDone?.[a.id]&&!state.actionReview?.[a.id]).length;
 const consistent=[state.route,state.calendar].every(context=>!context?.ready||!context.citizenship||context.citizenship===state.profile?.citizenship);
 const supported=Boolean(state.profile?.ready&&state.category&&state.profile.citizenship&&!['other','unknown'].includes(state.profile.citizenship)&&consistent);
 return {list,done,total:list.length,supported,finished:supported&&list.length>0&&done===list.length};
}
export function task(ctx,action) {
  const input=el('input',{type:'checkbox',checked:ctx.state.actionDone[action.id],onchange:e=>{ctx.state.actionDone[action.id]=e.target.checked;if(ctx.state.actionReview)delete ctx.state.actionReview[action.id];review?.remove();ctx.save();ctx.updateProgress();ctx.onTaskChange?.(action.id,e.target.checked);}});
  const review=ctx.state.actionReview?.[action.id]?el('p',{class:'tool-note warning'},t(ctx,tri('Условия изменились. Перепроверьте действие перед повторной отметкой.','Шарттар өзгерді. Қайта белгілемес бұрын әрекетті тексеріңіз.','Conditions changed. Review this action before confirming it again.'))):null;
  const help=()=>{if(action.id==='language'){ctx.openTool?.('phrases');return;}if(actionFAQ[action.id])ctx.openHelp?.('',actionFAQ[action.id]);};
  const doesNotFit=()=>{
   ctx.state.actionHistory??=[];ctx.state.actionReview??={};
   ctx.state.actionHistory.push({taskId:action.id,recordedAt:new Date().toISOString(),reason:'user-needs-clarification',previouslyDone:Boolean(ctx.state.actionDone[action.id])});
   ctx.state.actionHistory=ctx.state.actionHistory.slice(-100);ctx.state.actionDone[action.id]=false;ctx.state.actionReview[action.id]=true;
   ctx.save();ctx.updateProgress();ctx.onTaskChange?.(action.id,false);help();
  };
  const instruction=el('details',{},el('summary',{},t(ctx,tri('Инструкция и источники','Нұсқаулық және дереккөздер','Instructions and sources'))),el('p',{},t(ctx,action.description)),sourceBox(ctx,action.sourceIds));
  const controls=ctx.openTool&&action.id!=='safety'?el('div',{class:'task-actions'},button(ctx,tri('Нужна помощь','Көмек қажет','Get help'),help),button(ctx,tri('Не подходит','Сәйкес келмейді','Does not fit'),doesNotFit)):null;
  return el('li',{class:'task-row'},el('label',{},input,el('span',{},el('strong',{},t(ctx,action.title)))),review,instruction,controls);
}
export function taskList(ctx,list) {return el('ul',{class:'task-list'},list.map(a=>task(ctx,a)));}
export function setProgress(ctx,current,total) {
  if(!ctx.progress)return;
  ctx.progress.hidden=false;
  if(ctx.progress.tagName==='PROGRESS'){ctx.progress.max=Math.max(total,1);ctx.progress.value=Math.min(current,total);ctx.progress.setAttribute('aria-label',`${current} / ${total}`);ctx.progress.textContent=`${current} / ${total}`;}
  else ctx.progress.replaceChildren(el('span',{},`${Math.min(current,total)} / ${total}`),el('progress',{max:Math.max(total,1),value:Math.min(current,total),'aria-label':`${current} / ${total}`}));
}
export function localISO(date) {return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
export function parseISO(value) {if(!/^\d{4}-\d{2}-\d{2}$/.test(value??''))return null;const [y,m,d]=value.split('-').map(Number);const result=new Date(y,m-1,d,12);return localISO(result)===value?result:null;}
export function download(name,text,mime='text/plain;charset=utf-8') {const url=URL.createObjectURL(new Blob([text],{type:mime}));const a=el('a',{href:url,download:name});document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
export function numberValue(value) {if(value===''||value===null||value===undefined)return 0;const n=Number(value);return Number.isFinite(n)&&n>=0&&n<=1e12?n:null;}
const focusableSelector='button,input,select,textarea,a[href],[tabindex]';
export function focusTarget(node,{preventScroll=false}={}) {
  if(!node||node.disabled||typeof node.focus!=='function')return false;
  if(!/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(node.tagName)&&!node.hasAttribute('tabindex'))node.tabIndex=-1;
  node.focus({preventScroll});return document.activeElement===node;
}
export function captureFocus(scope) {
  const node=document.activeElement;if(!node||node===document.body)return null;
  const inside=scope?.contains(node),controls=inside?[...scope.querySelectorAll(focusableSelector)]:[];
  const bookmark={node,id:node.id||'',inside,index:controls.indexOf(node),tag:node.tagName,type:node.getAttribute('type')||''};
  try{if(typeof node.selectionStart==='number'){bookmark.start=node.selectionStart;bookmark.end=node.selectionEnd;bookmark.direction=node.selectionDirection;}}catch{}
  return bookmark;
}
export function restoreFocus(bookmark,scope) {
  if(!bookmark)return false;
  let node=bookmark.node?.isConnected?bookmark.node:null;
  if(!node&&bookmark.id)node=document.getElementById(bookmark.id);
  if(!node&&bookmark.inside&&bookmark.index>=0){const candidate=scope?.querySelectorAll(focusableSelector)[bookmark.index];if(candidate?.tagName===bookmark.tag&&(candidate.getAttribute('type')||'')===bookmark.type)node=candidate;}
  if(!focusTarget(node,{preventScroll:true}))return false;
  if(typeof bookmark.start==='number')try{node.setSelectionRange(bookmark.start,bookmark.end,bookmark.direction);}catch{}
  return true;
}
export function focusHeading(ctx) {focusTarget(ctx.container.querySelector('h3'));}
