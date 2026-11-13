import {BARYS_SVG} from './barys.js';
import {el,tri,labels} from './shared.js';
import {pick,actions} from '../data/content.js';
import {faq} from '../data/faq.js';
import {revealMessage} from './message-motion.js';
const texts={
 start:{title:tri('Начнём с вашего пути','Жолыңыздан бастайық','Let’s start your journey'),body:tri('Выберите статус, город и гражданство. Затем я помогу составить план переезда.','Санатыңызды, қалаңызды және азаматтығыңызды таңдаңыз. Содан кейін көшу жоспарын құруға көмектесемін.','Choose your status, city and citizenship. Then I can help you build a moving plan.'),action:tri('Составить план','Жоспар құру','Build my plan'),tool:'route',mood:'question'},
 documents:{title:tri('Документы по шагам','Құжаттар қадамдап','Documents, one step at a time'),body:tri('Здесь маршрут, календарь и разбор затруднений. Откройте нужный шаг: рядом будут источник и вопрос для обращения.','Мұнда жоспар, күнтізбе және қиындықтарды талдау бар. Қажетті қадамды ашыңыз: жанында дереккөз бен жүгінуге арналған сұрақ болады.','Find the route, calendar and situation navigator here. Open a step for its source and a question to ask the relevant office.'),action:tri('Открыть маршрут','Жоспарды ашу','Open my route'),tool:'route',mood:'explain'},
 life:{title:tri('Обустроимся без спешки','Асықпай орналасайық','Let’s settle in calmly'),body:tri('Здесь можно сравнить свои расходы, разобрать аренду, подготовить фразы и отметить выполненные дела.','Мұнда шығындарды салыстырып, жалдауды талдап, сөз тіркестерін дайындап, орындалған істерді белгілей аласыз.','Compare your costs, review rental terms, prepare phrases and mark completed tasks here.'),action:tri('Открыть чек-лист','Тізімді ашу','Open my checklist'),tool:'checklist',mood:'thinking'},
 faq:{title:tri('Найдём понятный ответ','Түсінікті жауап табайық','Let’s find a clear answer'),body:tri('В FAQ собраны частые вопросы с шагами, официальными источниками и адресатом. Введите тему и раскройте подходящий ответ.','FAQ бөлімінде қадамдар, ресми дереккөздер және жауапты ұйымдар бар. Тақырыпты енгізіп, сәйкес жауапты ашыңыз.','FAQ answers include steps, official sources and who to contact. Search a topic and open the matching answer.'),action:tri('Найти ответ','Жауап табу','Find an answer'),mood:'explain'},
 cities:{title:tri('Выберем нужную организацию','Қажетті ұйымды таңдайық','Let’s find the right organisation'),body:tri('Выберите город и тип организации. Проверьте адрес, источник и вопрос, с которым стоит обратиться.','Қала мен ұйым түрін таңдаңыз. Мекенжайды, дереккөзді және қоятын сұрақты тексеріңіз.','Choose a city and organisation type. Check the address, source and what to ask when contacting them.'),action:tri('Открыть адреса','Мекенжайларды ашу','View addresses'),tool:'map',mood:'explain'}
};
const ui={
 name:tri('Барыс · ваш консультант','Барыс · кеңесшіңіз','Barys · your consultant'),
 hello:tri('Сәлем! Я Барыс, ваш консультант.','Сәлем! Мен Барыспын, сіздің кеңесшіңіз.','Sälem! I’m Barys, your consultant.'),
 introduction:tri('Помогу составить план и разобраться в вопросах переезда: предложу понятные действия и официальные источники.','Көшу жоспарын құрып, сұрақтарды түсінуге көмектесемін: түсінікті әрекеттер мен ресми дереккөздер ұсынамын.','I can help you build a plan and understand moving questions with clear actions and official sources.'),
 readyStart:tri('Профиль выбран. Откройте маршрут, укажите планируемый срок и начните с первого этапа.','Профиль таңдалды. Жоспарды ашып, жоспарланған мерзімді көрсетіңіз де, бірінші кезеңнен бастаңыз.','Your profile is selected. Open your route, enter your planned duration and start with the first stage.'),
 collapse:tri('Свернуть совет консультанта','Кеңесшінің кеңесін жинау','Collapse the consultant’s advice'),
 toggle:tri('Совет Барыса','Барыстың кеңесі','Barys’s advice'),
 pause:tri('Пауза анимации','Анимацияны тоқтату','Pause animation'),resume:tri('Включить анимацию','Анимацияны қосу','Resume animation'),
 profileTitle:tri('Ваш путеводитель настроен','Жолсілтемеңіз бапталды','Your guide is ready'),
 profileBody:tri('Теперь инструменты учитывают выбранный профиль. Начните с маршрута: уточните цель и планируемый срок, затем откройте первую карточку.','Енді құралдар таңдалған профильді ескереді. Жоспардан бастаңыз: мақсат пен жоспарланған мерзімді нақтылап, бірінші карточканы ашыңыз.','The tools now use your selected profile. Start with the route: confirm your purpose and planned duration, then open the first card.'),
 editingTitle:tri('Осталось выбрать настройки','Баптауларды таңдау қалды','Choose your preferences'),
 editingBody:tri('Выберите статус, город и гражданство, затем нажмите «Настроить мой путеводитель». Имя и документы вводить не нужно.','Мәртебе, қала және азаматтықты таңдап, «Жолсілтемемді баптау» батырмасын басыңыз. Атыңыз бен құжаттарды енгізу қажет емес.','Choose your status, city and citizenship, then press “Personalise my guide”. No name or documents are needed.'),
 searchTitle:tri('Я посмотрел результаты поиска','Іздеу нәтижелерін қарастырдым','I’ve checked the search results'),
 emptySearch:tri('Совпадений нет. Попробуйте короткое слово или выберите все темы. Например: ИИН, аренда или банк.','Сәйкестік жоқ. Қысқа сөзді қолданыңыз немесе барлық тақырыпты таңдаңыз. Мысалы: ЖСН, жалдау немесе банк.','No matches. Try a short term or select all topics, such as IIN, rental or bank.'),
 answerTitle:tri('Разберём следующий шаг','Келесі қадамды қарастырайық','Let’s identify the next step'),
 stageTitle:tri('Вы открыли этап маршрута','Жоспар кезеңін аштыңыз','You opened a route stage'),
 stageBody:tri('Прочитайте действия, материалы, адресата и вопрос для обращения. Открытие карточки не означает, что дело выполнено.','Әрекеттерді, материалдарды, жауапты ұйым мен қоятын сұрақты оқыңыз. Карточканы ашу істің орындалғанын білдірмейді.','Read the actions, materials, responsible organisation and enquiry question. Opening a card does not mark a task complete.'),
 actionTitle:tri('Отметка обновлена','Белгі жаңартылды','Checkmark updated'),
 marked:tri('Вы отметили действие как выполненное. Сохраните реальные подтверждения у себя и переходите к следующему пункту.','Әрекетті орындалды деп белгіледіңіз. Нақты растауларды өзіңізде сақтап, келесі тармаққа өтіңіз.','You marked the action complete. Keep real confirmations yourself and move to the next item.'),
 unmarked:tri('Отметка снята. Вернитесь к карточке, если нужно уточнить документы или вопрос организации.','Белгі алынды. Құжаттарды немесе ұйымға сұрақты нақтылау керек болса, карточкаға оралыңыз.','The checkmark was removed. Return to the card if you need to clarify documents or your question for the organisation.')
};
let instance;
const combine=(...values)=>tri(...['ru','kk','en'].map(lang=>values.map(value=>pick(value,lang)).filter(Boolean).join(' ')));
function reducedMotion(){return document.documentElement.dataset.motion==='paused'||globalThis.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;}
function currentTip(){
 const i=instance,state=i.getState(),base=texts[i.current]||texts.start;
 if(i.event.type==='welcome')return {...base,title:ui.hello,body:combine(ui.introduction,i.current==='start'&&state.profile?.ready?ui.readyStart:base.body)};
 if(i.event.type==='profile')return {...texts.start,title:ui.profileTitle,body:ui.profileBody,mood:'success'};
 if(i.event.type==='profile-edit')return {...texts.start,title:ui.editingTitle,body:ui.editingBody};
 if(i.event.type==='faq-search'){
  const count=document.querySelectorAll('#faq-content .faq-item').length;
  return {...texts.faq,title:ui.searchTitle,body:count?tri(`Найдено ответов: ${count}. Раскройте подходящий вопрос — покажу, с какого действия начать и куда обратиться.`,`Табылған жауаптар: ${count}. Сәйкес сұрақты ашыңыз — неден бастап, қайда жүгіну керегін көрсетемін.`,`${count} answers found. Open a matching question and I’ll point out the first action and who to contact.`):ui.emptySearch};
 }
 if(i.event.type==='faq-answer'){
  const item=faq.find(item=>item.id===i.event.detail.id);
  if(item)return {...texts.faq,title:ui.answerTitle,body:tri(...['ru','kk','en'].map(lang=>`${pick(item.steps?.[0]||item.answer,lang)} ${pick(item.authority,lang)}`))};
 }
 if(i.event.type==='stage')return {...texts.documents,title:ui.stageTitle,body:combine(i.event.detail.stageTitle,ui.stageBody)};
 if(i.event.type==='action')return {...texts.life,title:ui.actionTitle,body:combine(actions.find(action=>action.id===i.event.detail.actionId)?.title,i.event.detail.checked?ui.marked:ui.unmarked),mood:i.event.detail.checked?'success':'thinking'};
 return {...base,body:i.current==='start'&&state.profile?.ready?ui.readyStart:base.body};
}
function displayEvent(type,detail={},key=type){
 if(!instance)return false;
 const i=instance,changed=i.key!==key;i.key=key;i.event={type,detail};
 if(changed){i.dismissedKey=null;i.bubble.hidden=false;i.toggle.setAttribute('aria-expanded','true');}
 refreshSiteGuide();return true;
}
export function guideEvent(type,detail={}){
 if(!instance)return false;
 if(type==='language'){refreshSiteGuide();return true;}
 if(type==='section'||type==='navigate'){
  const section=detail.section||detail.id;if(!texts[section])return false;
  instance.current=section;return displayEvent('section',{},`section:${section}`);
 }
 if(type==='profile'){
  const state=instance.getState();return displayEvent('profile',detail,`profile:${state.category}:${state.profile?.city}:${state.profile?.citizenship}`);
 }
 if(type==='profile-edit')return displayEvent(type,detail,'profile:edit');
 if(type==='faq-search'){instance.current='faq';return displayEvent(type,detail,'faq:search');}
 if(type==='faq-answer'){instance.current='faq';return displayEvent(type,detail,`faq:answer:${detail.id}`);}
 if(type==='stage'||type==='stage-select')return displayEvent('stage',detail,`stage:${detail.stageId||pick(detail.stageTitle,instance.getState().lang)}`);
 if(type==='action'||type==='task')return displayEvent('action',detail,`action:${detail.actionId}:${Boolean(detail.checked)}`);
 return false;
}
export function mountSiteGuide({getState,openTool}){
 if(instance)return instance;
 const host=el('aside',{id:'site-guide',class:'site-guide'}),toggle=el('button',{type:'button',class:'site-guide-toggle','aria-controls':'site-guide-bubble','aria-expanded':'true'});
 const character=el('span',{class:'barys-character barys--question','aria-hidden':'true'});character.innerHTML=BARYS_SVG;toggle.append(character);
 // Visible on first paint: no hidden attribute and no automatic dismissal timer.
 const bubble=el('section',{id:'site-guide-bubble',class:'site-guide-bubble'}),close=el('button',{type:'button',class:'guide-close'},'×');
 const message=el('div',{class:'site-guide-message',role:'status','aria-live':'polite','aria-atomic':'true'}),name=el('p',{class:'barys-name'}),title=el('h3'),body=el('p'),action=el('button',{type:'button',class:'button button-primary'});
 const controls=el('div',{class:'guide-secondary'}),motion=el('button',{type:'button',class:'guide-motion'});controls.append(motion);message.append(name,title,body);bubble.append(close,message,action,controls);host.append(toggle,bubble);document.body.append(host);
 instance={host,toggle,character,bubble,message,close,name,title,body,action,controls,motion,getState,openTool,current:'start',event:{type:'welcome',detail:{}},key:'welcome',dismissedKey:null};
 const collapse=()=>{instance.dismissedKey=instance.key;bubble.hidden=true;toggle.setAttribute('aria-expanded','false');};
 toggle.addEventListener('click',()=>{if(bubble.hidden){instance.dismissedKey=null;bubble.hidden=false;toggle.setAttribute('aria-expanded','true');bubble.scrollIntoView({block:'nearest',behavior:reducedMotion()?'auto':'smooth'});}else collapse();});
 close.addEventListener('click',()=>{collapse();toggle.focus({preventScroll:true});});
 motion.addEventListener('click',()=>{const paused=document.documentElement.dataset.motion!=='paused';document.documentElement.dataset.motion=paused?'paused':'on';try{localStorage.setItem('migrato-motion',paused?'paused':'on');}catch{}refreshSiteGuide();});
 action.addEventListener('click',()=>{
  const state=getState(),tip=currentTip();collapse();
  if(!tip.tool&&instance.current==='faq'){document.getElementById('faq-search')?.focus();document.getElementById('faq')?.scrollIntoView({block:'start',behavior:reducedMotion()?'auto':'smooth'});}
  else if(!state.profile?.ready){document.getElementById('profile-panel')?.scrollIntoView({block:'center',behavior:reducedMotion()?'auto':'smooth'});document.getElementById('onboard-category')?.focus({preventScroll:true});}
  else if(tip.tool)openTool(tip.tool);
 });
 const sections=[...document.querySelectorAll('main > section')];
 const locate=()=>{const y=Math.min((globalThis.innerHeight||800)*.35,300);return sections.find(node=>{const box=node.getBoundingClientRect();return box.top<=y&&box.bottom>y;});};
 const initial=locate();if(initial&&texts[initial.id])instance.current=initial.id;
 const update=()=>{const section=locate();if(section&&texts[section.id]&&instance.current!==section.id)guideEvent('section',{section:section.id});};
 if(typeof IntersectionObserver==='function'){const observer=new IntersectionObserver(update,{rootMargin:'-20% 0px -55% 0px',threshold:[0,.1,.5,1]});sections.forEach(section=>observer.observe(section));instance.observer=observer;}
 let ticking=false,searchTimer;
 window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(()=>{ticking=false;update();});}},{passive:true});window.addEventListener('hashchange',update);window.addEventListener('resize',()=>refreshSiteGuide(),{passive:true});
 document.addEventListener('input',event=>{if(event.target.id!=='faq-search')return;instance.current='faq';clearTimeout(searchTimer);searchTimer=setTimeout(()=>{if(instance.current==='faq')guideEvent('faq-search');},500);});
 document.addEventListener('change',event=>{if(event.target.id==='faq-category'){clearTimeout(searchTimer);guideEvent('faq-search');}else if(event.target.id?.startsWith('onboard-'))guideEvent('profile-edit');});
 document.addEventListener('toggle',event=>{const target=event.target;if(target.matches?.('.faq-item')&&target.open&&(instance.current==='faq'||document.activeElement?.closest?.('#faq'))){clearTimeout(searchTimer);guideEvent('faq-answer',{id:target.dataset.faqId});}},true);
 document.addEventListener('click',event=>{
  const anchor=event.target.closest?.('a[href^="#"]');if(anchor){const section=anchor.getAttribute('href').slice(1);if(texts[section])guideEvent('section',{section});}
 });
 document.addEventListener('submit',event=>{const inProfile=event.target.closest?.('#profile-panel')||event.composedPath?.().some(node=>node.id==='profile-panel');if(inProfile&&getState().profile?.ready)guideEvent('profile');});
 refreshSiteGuide();return instance;
}
export function refreshSiteGuide(){
 if(!instance)return;const i=instance,lang=i.getState().lang,tip=currentTip();
 // On narrow screens advice participates in the section's flow; the Barys button stays in the corner.
 {
  const section=document.getElementById(i.current)||document.getElementById('start');
  const slot=section?.querySelector('.hero-copy')||section?.querySelector('.container')||section;
  const profile=slot?.querySelector('#profile-panel');
  if(slot&&i.host.parentNode!==slot){if(profile&&typeof slot.insertBefore==='function')slot.insertBefore(i.host,profile);else slot.prepend(i.host);}
 }
 i.host.setAttribute('aria-label',pick(ui.name,lang));i.host.dataset.event=i.event.type;i.name.textContent=pick(ui.name,lang);i.title.textContent=pick(tip.title,lang);
 const body=pick(tip.body,lang);if(i.body.textContent!==body)i.body.textContent=body;
 i.action.textContent=pick(tip.action,lang);i.toggle.setAttribute('aria-label',pick(ui.toggle,lang));i.close.setAttribute('aria-label',pick(ui.collapse,lang));
 const mood=tip.mood||'explain';if(i.character.dataset.mood!==mood){i.character.className='barys-character barys--'+mood;i.character.dataset.mood=mood;}
 const paused=document.documentElement.dataset.motion==='paused';i.motion.textContent=pick(paused?ui.resume:ui.pause,lang);i.motion.setAttribute('aria-pressed',String(paused));
 revealMessage(i.message,[i.name.textContent,i.title.textContent,i.body.textContent].join('\n'));
}
