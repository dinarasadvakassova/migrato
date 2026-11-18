import {faq,faqSources} from '../data/faq.js';
import {pick} from '../data/content.js';
import {el,tri,button,sourceBox} from './shared.js';
import {revealMessage} from './message-motion.js';

const groups=[
 ['temporary',tri('РВП и цель пребывания','Уақытша тұру және келу мақсаты','Temporary residence and purpose')],
 ['residence',tri('ПМЖ и ВНЖ','Тұрақты тұру және ықтиярхат','Permanent residence and residence card')],
 ['citizenship',tri('Гражданство','Азаматтық','Citizenship')],
 ['protection',tri('Беженство и убежище','Босқын мәртебесі және баспана','Refugee status and asylum')],
 ['family',tri('Семья и дети','Отбасы және балалар','Family and children')],
 ['arrival',tri('Въезд, адрес и документы','Кіру, мекенжай және құжаттар','Arrival, address and documents')],
 ['finance',tri('Банк для иностранца','Шетелдікке банк қызметі','Banking as a foreign citizen')],
 ['work-study',tri('Работа и учёба','Жұмыс және оқу','Work and study')],
 ['health-life',tri('Страхование, дети и обращения','Сақтандыру, балалар және өтініштер','Insurance, children and enquiries')]
];
const words={
 open:tri('Задать вопрос Барысу','Барысқа сұрақ қою','Ask Barys a question'),
 title:tri('О чём хотите спросить?','Не туралы сұрағыңыз келеді?','What would you like to ask?'),
 scope:tri('Выберите тему и вопрос. Я покажу справочный ответ и источник. Личные сведения и документы сюда отправлять не нужно.','Тақырып пен сұрақты таңдаңыз. Ақпараттық жауап пен дереккөзді көрсетемін. Жеке мәліметтер мен құжаттарды жіберудің қажеті жоқ.','Choose a topic and question for a reference answer and its source. No personal details or documents are needed.'),
 back:tri('Другой вопрос','Басқа сұрақ','Another question'),
 topics:tri('Все темы','Барлық тақырыптар','All topics'),
 advice:tri('Вернуться к подсказке','Кеңеске оралу','Return to the page advice'),
 all:tri('Открыть полный ответ в FAQ','Толық жауапты FAQ бөлімінде ашу','Open the full answer in FAQ'),
 steps:tri('С чего начать','Неден бастау керек','Where to start'),
 authority:tri('Куда обратиться','Қайда жүгіну керек','Who to contact'),
 empty:tri('Откройте полный список FAQ или выберите другую тему.','Толық FAQ тізімін ашыңыз немесе басқа тақырыпты таңдаңыз.','Open the full FAQ or choose another topic.'),
 note:tri('Сценарный справочный диалог. Ответы подготовлены заранее и не являются индивидуальным юридическим заключением.','Алдын ала дайындалған ақпараттық диалог. Жауаптар жеке заң қорытындысы емес.','A guided reference dialogue with prepared answers, not an individual legal opinion.')
};
let instance;
export function chatQuestions(group,items=faq){
 if(!groups.some(([id])=>id===group))return [];
 const categories=group==='arrival'?['migration','documents']:group==='work-study'?['work','study']:group==='health-life'?['health','life']:[group];
 return items.filter(item=>categories.includes(item.category));
}
export function chatReply(id,lang='ru',items=faq){
 const item=items.find(row=>row.id===id);
 if(!item)return null;
 return {question:pick(item.question,lang),answer:pick(item.answer,lang),steps:(item.steps||[]).map(step=>pick(step,lang)),authority:pick(item.authority,lang),ask:pick(item.ask,lang),sourceIds:[...(item.sourceIds||[])]};
}
function sparkle(){
 const i=instance;if(!i||document.documentElement.dataset.motion==='paused'||globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;
 const layer=el('span',{class:'barys-sparkles','aria-hidden':'true'});
 for(let n=0;n<8;n++){const dot=el('span');dot.style.setProperty('--spark-x',`${Math.cos(n*Math.PI/4)*65}px`);dot.style.setProperty('--spark-y',`${Math.sin(n*Math.PI/4)*65-30}px`);dot.style.setProperty('--spark-delay',`${n*15}ms`);layer.append(dot);}
 i.host.append(layer);setTimeout(()=>layer.remove(),750);
}
function render(focus=false){
 const i=instance;if(!i)return;const ctx={lang:i.getState().lang,extraSources:faqSources},lang=ctx.lang;
 i.open.textContent=pick(words.open,lang);i.open.hidden=i.active;i.bubble.classList.toggle('is-chat',i.active);i.panel.hidden=!i.active;
 if(!i.active)return;
 i.panel.replaceChildren();
 i.panel.append(el('h3',{tabindex:'-1'},pick(words.title,lang)),el('p',{class:'guide-chat-scope'},pick(words.scope,lang)));
 const selected=faq.find(row=>row.id===i.question);
 if(selected){
  const reply=chatReply(selected.id,lang),response=el('div',{class:'guide-chat-answer',role:'status','aria-live':'polite'});
  response.append(el('h4',{},reply.question),el('p',{},reply.answer),el('h4',{},pick(words.steps,lang)),el('ol',{},reply.steps.map(text=>el('li',{},text))),el('h4',{},pick(words.authority,lang)),el('p',{},reply.authority),reply.ask?el('p',{},reply.ask):null,sourceBox(ctx,selected.sourceIds));
  i.panel.append(response,button(ctx,words.all,()=>{i.active=false;i.question=null;i.group=null;render();i.openHelp(reply.question,selected.id);}),button(ctx,words.back,()=>{i.question=null;render();i.panel.querySelector('h3')?.focus({preventScroll:true});}));
  revealMessage(response,selected.id+lang);
 }else if(i.group){
  const choices=el('div',{class:'guide-chat-choices'}),items=chatQuestions(i.group);
  for(const item of items)choices.append(button(ctx,item.question,()=>{i.question=item.id;render(true);},{class:'guide-chat-choice'}));
  i.panel.append(choices);
  if(!items.length)i.panel.append(el('p',{},pick(words.empty,lang)));
  i.panel.append(button(ctx,words.topics,()=>{i.group=null;render(true);}));
 }else{
  i.panel.append(el('div',{class:'guide-chat-choices'},groups.map(([id,title])=>button(ctx,title,()=>{i.group=id;render(true);},{class:'guide-chat-choice'}))));
 }
 i.panel.append(el('p',{class:'guide-chat-note'},pick(words.note,lang)),button(ctx,words.advice,()=>{i.active=false;render();i.open.focus({preventScroll:true});}));
 if(focus)i.panel.querySelector('h3')?.focus({preventScroll:true});
}
export function mountBarysChat({getState,openHelp}){
 if(instance)return instance;
 const host=document.getElementById('site-guide'),bubble=document.getElementById('site-guide-bubble');
 if(!host||!bubble)return null;
 const controls=host.querySelector('.guide-secondary'),toggle=host.querySelector('.site-guide-toggle');
 const open=el('button',{type:'button',class:'guide-chat-open'}),panel=el('section',{class:'guide-chat',hidden:true,'aria-label':pick(words.title,getState().lang)});
 controls.prepend(open);bubble.insertBefore(panel,controls);
 instance={host,bubble,toggle,open,panel,getState,openHelp,active:false,group:null,question:null};
 open.addEventListener('click',()=>{instance.active=true;render();panel.querySelector('button')?.focus({preventScroll:true});});
 toggle.addEventListener('click',sparkle);
 render();return instance;
}
export function refreshBarysChat(){render();}
export function openBarysChat(){if(!instance)return;instance.active=true;instance.bubble.hidden=false;instance.toggle.setAttribute('aria-expanded','true');render(true);}
