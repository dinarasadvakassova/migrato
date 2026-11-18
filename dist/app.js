import {celebrateJourney,closeCelebration} from './modules/celebration.js';
import {mountSiteGuide,refreshSiteGuide,guideEvent} from './modules/site-guide.js';
import {mountBarys,setupBarys,notifyBarys} from './modules/barys.js';
import {content,pick,actions,sources} from './data/content.js';
import {el,t,tri,labels,select,setProgress,planSummary,focusTarget,captureFocus,restoreFocus} from './modules/shared.js';
import {route} from './modules/planning.js';
import {compareStatuses,documentReadiness,documentExpiry} from './modules/migration-tools.js';
import {revisionUI} from './data/revision-ui.js';
import {requestGroups} from './data/requests.js';
import {mountBarysChat,refreshBarysChat,openBarysChat} from './modules/barys-chat.js';
import {simulation,createSimulationState,quiz,navigator as problemNavigator,rental} from './modules/learning.js';
import {budget,phrases} from './modules/practical.js';
import {map} from './modules/places-directory.js';
import {mountFAQ,openFAQAnswer} from './modules/faq.js';
import {faq,faqSources} from './data/faq.js';
import {renderProfile} from './modules/profile.js';
import {personas,mapDescription,faqForCategory} from './data/personas.js';

for(const [key,value] of Object.entries(revisionUI))for(const lang of ['ru','kk','en'])content[lang][key]=value[lang];
const releaseInfo={version:20,date:'18.11.2026'};
const storageKey='migrato-progress-v1';
const categories=new Set(['student','worker','remote','relocate']);
const profileCities=new Set(['astana','almaty','shymkent']);
const profileCitizenships=new Set(['am','az','by','kg','md','ru','tj','tm','ua','uz','other','unknown']);
const tools={simulation,route,quiz,calendar:documentExpiry,navigator:compareStatuses,map,checklist:documentReadiness,budget,rental,phrases};
const titles={simulation:tri('Жизнь в Казахстане: симуляция','Қазақстандағы өмір: симуляция','Life in Kazakhstan: simulation'),route:tri('Мой маршрут','Менің жоспарым','My route'),quiz:tri('Проверьте знания','Біліміңізді тексеріңіз','Test your knowledge'),calendar:tri('Календарь действий','Іс-қимыл күнтізбесі','Action calendar'),navigator:tri('Навигатор по ситуациям','Жағдайлар навигаторы','Situation navigator'),map:tri('Полезные адреса и 2ГИС','Пайдалы мекенжайлар және 2GIS','Useful addresses and 2GIS'),checklist:tri('Чек-лист адаптации','Бейімделу тізімі','Adaptation checklist'),budget:tri('Бюджет переезда','Көшу бюджеті','Moving budget'),rental:tri('Проверка учебного договора','Оқу шартын тексеру','Sample contract review'),phrases:tri('Конструктор обращений','Өтініш құрастыру','Request phrase builder')};
const descriptions={simulation:tri('Принимайте решения и сравнивайте их последствия с источниками.','Шешім қабылдап, салдарын дереккөздермен салыстырыңыз.','Make decisions and compare their consequences with the sources.'),route:tri('Выберите свою ситуацию и получите последовательность справочных шагов.','Жағдайыңызды таңдап, ақпараттық қадамдар ретін алыңыз.','Choose your situation and get an ordered reference checklist.'),quiz:tri('12 ситуаций с объяснениями и официальными источниками.','Түсіндірмелер мен ресми дереккөздері бар 12 жағдай.','12 situations with explanations and official sources.'),calendar:tri('Плановые ориентиры с источниками и ваши собственные даты.','Дереккөздері бар жоспарлы бағдарлар мен өз күндеріңіз.','Source-linked planning targets and your own dates.'),navigator:tri('Готовые сценарии помогают найти следующий шаг.','Дайын сценарийлер келесі қадамды табуға көмектеседі.','Preset scenarios help you find your next step.'),map:tri('Организации в Астане, Алматы и Шымкенте.','Астана, Алматы және Шымкент қалаларындағы ұйымдар.','Organisations in Astana, Almaty and Shymkent.'),checklist:tri('Отмечайте реальные действия по мере выполнения.','Нақты әрекеттерді орындалуына қарай белгілеңіз.','Check off real actions as you complete them.'),budget:tri('Два варианта с вашими суммами в тенге.','Өзіңіздің теңгедегі сомаларыңыз бар екі нұсқа.','Two scenarios using your own amounts in tenge.'),rental:tri('Найдите условия, которые требуют внимания.','Назар аударуды қажет ететін талаптарды табыңыз.','Find clauses that need attention.'),phrases:tri('Подготовьте вопрос на русском, казахском или английском.','Сұрақты орыс, қазақ немесе ағылшын тілінде дайындаңыз.','Prepare a request in Russian, Kazakh or English.')};
for(const id of Object.keys(tools)){if(revisionUI[`tool.${id}.title`])titles[id]=revisionUI[`tool.${id}.title`];if(revisionUI[`tool.${id}.description`])descriptions[id]=revisionUI[`tool.${id}.description`];}
const words={language:tri('Язык интерфейса','Интерфейс тілі','Interface language'),storageError:tri('Сохранение в браузере недоступно. Прогресс останется только до закрытия этой страницы.','Браузерде сақтау қолжетімсіз. Прогресс осы бет жабылғанша ғана сақталады.','Browser storage is unavailable. Progress will last only until this page is closed.'),restoredError:tri('Сохранённый прогресс не удалось прочитать. Начат новый сеанс.','Сақталған прогресті оқу мүмкін болмады. Жаңа сеанс басталды.','Saved progress could not be read. A new session was started.'),progress:tri('Выполнено задач','Орындалған міндеттер','Tasks completed'),error:tri('Не удалось открыть инструмент. Закройте его и попробуйте снова.','Құралды ашу мүмкін болмады. Оны жауып, қайталап көріңіз.','The tool could not be opened. Close it and try again.'),reset:tri('Сбросить локальный прогресс? Все отметки и ответы в этом браузере будут удалены.','Жергілікті прогресті қалпына келтіру керек пе? Осы браузердегі белгілер мен жауаптар жойылады.','Reset local progress? All checkmarks and answers in this browser will be cleared.')};
Object.assign(words,{futureSchema:tri('Сохранённые данные созданы другой версией Migrato. Они не будут перезаписаны. Можно читать сайт и работать в сеансе; для нового сохранения явно удалите локальный прогресс кнопкой внизу страницы.','Сақталған деректер Migrato-ның басқа нұсқасында жасалған. Олар қайта жазылмайды. Сайтты оқып, сеанста жұмыс істеуге болады; қайта сақтау үшін беттің төменіндегі батырмамен жергілікті прогресті өшіріңіз.','Saved data belongs to another Migrato version and will not be overwritten. You can browse and work in this session; explicitly delete local progress using the footer button to enable new saving.')});
function defaults(){return {version:1,lang:'ru',category:'',learningCategory:'',profile:{city:'',citizenship:'',category:'',ready:false},actionDone:{},actionReview:{},actionHistory:[],route:{citizenship:'',purpose:'',days:'',stage:'before',ready:false,celebrated:false},calendar:{citizenship:'',purpose:'',arrival:'',days:'',reminder:false,ready:false},simulation:createSimulationState(),quiz:{index:0,answers:{}},navigator:{problem:null,option:null},map:{city:'all',type:'all',selected:null},rental:{schema:2,marked:{},evaluated:false},budget:{scenarios:[{},{}]},phrases:{situation:'rvp-first',lang:'',selected:{}},migration:{compare:['rvp','vnz'],packageId:'pmzh',documents:{},expiryType:'vnz',expiryDate:'',remindDays:'30'}};}
function alignLearningCategory(target,category){if(target.learningCategory!==category){target.quiz={index:0,answers:{}};target.simulation=createSimulationState();}target.learningCategory=category;}
const isObj=x=>x&&typeof x==='object'&&!Array.isArray(x);
function safeRecord(value,type){const result={};if(!isObj(value))return result;for(const [key,v] of Object.entries(value)){if(key==='__proto__'||key==='constructor'||key==='prototype')continue;if(type==='boolean'&&typeof v==='boolean')result[key]=v;if(type==='integer'&&Number.isInteger(v)&&v>=0&&v<1000)result[key]=v;if(type==='history'&&Array.isArray(v))result[key]=v.filter(n=>Number.isInteger(n)&&n>=0&&n<10).slice(-100);}return result;}
function restore(raw){const state=defaults();if(!isObj(raw)||raw.version!==1)return state;
 if(['ru','kk','en'].includes(raw.lang))state.lang=raw.lang;if(categories.has(raw.category))state.category=raw.category;
 if(categories.has(raw.learningCategory))state.learningCategory=raw.learningCategory;
 if(isObj(raw.profile)){
  if(profileCities.has(raw.profile.city))state.profile.city=raw.profile.city;
  if(profileCitizenships.has(raw.profile.citizenship))state.profile.citizenship=raw.profile.citizenship;
  state.profile.ready=raw.profile.ready===true&&categories.has(state.category)&&Boolean(state.profile.city)&&Boolean(state.profile.citizenship);
 }
 state.actionDone=safeRecord(raw.actionDone,'boolean');state.actionReview=safeRecord(raw.actionReview,'boolean');
 if(Array.isArray(raw.actionHistory))state.actionHistory=raw.actionHistory.filter(x=>isObj(x)&&typeof x.taskId==='string'&&typeof x.recordedAt==='string').slice(-100);
 if(categories.has(raw.profile?.category))state.profile.category=raw.profile.category;
 for(const section of ['route','calendar','navigator','map'])if(isObj(raw[section]))for(const key of Object.keys(state[section])){const v=raw[section][key];if(v===null||typeof v==='boolean'||typeof v==='number'&&Number.isFinite(v)||typeof v==='string'&&v.length<500)state[section][key]=v;}
 if(isObj(raw.simulation)){
  state.simulation.index=Math.max(0,Math.min(100,Number.isInteger(raw.simulation.index)?raw.simulation.index:0));
  state.simulation.choices=safeRecord(raw.simulation.choices,'integer');state.simulation.history=safeRecord(raw.simulation.history,'history');
  state.simulation.branch=raw.simulation.branch==='recovery'?'recovery':'main';
  state.simulation.recoveryChoice=[0,1].includes(raw.simulation.recoveryChoice)?raw.simulation.recoveryChoice:null;
  state.simulation.recoveryHistory=safeRecord(raw.simulation.recoveryHistory,'history');
  if(Array.isArray(raw.simulation.path))state.simulation.path=raw.simulation.path.filter(step=>isObj(step)&&typeof step.sceneId==='string'&&step.sceneId.length<100&&['main','recovery'].includes(step.phase)&&Number.isInteger(step.choice)&&step.choice>=0&&step.choice<10&&['continue','recovery','resolved','retry'].includes(step.outcome)).slice(-200).map(({sceneId,phase,choice,outcome})=>({sceneId,phase,choice,outcome}));
 }
 if(isObj(raw.quiz)){state.quiz.index=Math.max(0,Math.min(100,Number.isInteger(raw.quiz.index)?raw.quiz.index:0));state.quiz.answers=safeRecord(raw.quiz.answers,'integer');}
 if(isObj(raw.rental)){state.rental.marked=safeRecord(raw.rental.marked,'boolean');state.rental.evaluated=raw.rental.schema===2&&raw.rental.evaluated===true;}
 if(Array.isArray(raw.budget?.scenarios))for(let i=0;i<2;i++)if(isObj(raw.budget.scenarios[i]))for(const key of ['rent','utilities','food','transport','connection','other','deposit','oneoff','reserve']){const value=raw.budget.scenarios[i][key];if(typeof value==='string'&&value.length<100||typeof value==='number'&&Number.isFinite(value))state.budget.scenarios[i][key]=value;}
 if(isObj(raw.phrases)){if(requestGroups.some(g=>g.situation===raw.phrases.situation))state.phrases.situation=raw.phrases.situation;if(['ru','kk','en'].includes(raw.phrases.lang))state.phrases.lang=raw.phrases.lang;state.phrases.selected=safeRecord(raw.phrases.selected,'boolean');}
 if(isObj(raw.migration)){
  if(Array.isArray(raw.migration.compare)&&raw.migration.compare.length===2&&raw.migration.compare.every(v=>typeof v==='string'&&v.length<40))state.migration.compare=raw.migration.compare;
  for(const key of ['packageId','expiryType','expiryDate','remindDays'])if(typeof raw.migration[key]==='string'&&raw.migration[key].length<60)state.migration[key]=raw.migration[key];
  if(isObj(raw.migration.documents))for(const [key,value] of Object.entries(raw.migration.documents))if(key.length<120&&!['__proto__','constructor','prototype'].includes(key)&&['have','missing','uncertain','renew'].includes(value))state.migration.documents[key]=value;
 }
 if(state.profile.ready){
  const purpose={student:'study',worker:'work',remote:'remote',relocate:'settle'}[state.category];
  if(state.route.citizenship!==state.profile.citizenship||state.calendar.citizenship!==state.profile.citizenship||state.route.purpose!==purpose||state.calendar.purpose!==purpose){state.route.ready=false;state.calendar.ready=false;}
  state.map.city=state.profile.city;Object.assign(state.route,{citizenship:state.profile.citizenship,purpose});Object.assign(state.calendar,{citizenship:state.profile.citizenship,purpose});
 }
 alignLearningCategory(state,state.category);
 return state;
}
let state=defaults(),storageAvailable=true,storageIssue=null;
try {const saved=localStorage.getItem(storageKey);if(saved){const raw=JSON.parse(saved);if(isObj(raw)&&raw.version!==1){storageAvailable=false;storageIssue='futureSchema';}else state=restore(raw);}}catch(error){storageIssue=error instanceof SyntaxError?'restoredError':'storageError';if(!(error instanceof SyntaxError))storageAvailable=false;}
let currentTool=null,previousFocus=null,renderedStep=null;
const dialog=document.getElementById('tool-dialog'),container=document.getElementById('tool-content'),progress=document.getElementById('tool-progress'),status=document.getElementById('tool-status');
function announce(message){if(status){status.textContent='';requestAnimationFrame(()=>{status.textContent=message;});}}
function storageMessage(){let n=document.getElementById('storage-status');if(!storageIssue){if(n)n.remove();return;}if(!n){n=el('p',{id:'storage-status',class:'storage-status',role:'status'});(document.querySelector('main')||document.body).prepend(n);}n.textContent=pick(words[storageIssue],state.lang);}
function save(){if(storageAvailable)try{localStorage.setItem(storageKey,JSON.stringify(state));}catch{storageAvailable=false;storageIssue='storageError';storageMessage();}updateProgress();}
function updateProgress(){const summary=planSummary(state),relevant=summary.list,done=summary.done,total=summary.total,percentage=summary.supported&&total?Math.floor(done/total*100):0;
 const bar=document.getElementById('overall-progress');if(bar){if(bar.tagName==='PROGRESS'){bar.max=total||1;bar.value=done;if(!summary.supported)bar.removeAttribute('value');}else{bar.setAttribute('role','progressbar');bar.setAttribute('aria-valuemin','0');bar.setAttribute('aria-valuemax',String(total));bar.setAttribute('aria-valuenow',String(done));bar.style.setProperty('--progress',`${percentage}%`);}bar.setAttribute('aria-label',`${pick(words.progress,state.lang)}: ${done} / ${total}`);}
 const label=document.getElementById('overall-progress-label');if(label)label.textContent=`${done} / ${total}`;
 if(currentTool==='route'&&state.route.ready||currentTool==='checklist'&&state.category){if(summary.supported)setProgress(ctx(),done,total);else if(progress)progress.hidden=true;}
 document.querySelectorAll('[data-category]').forEach(n=>n.setAttribute('aria-pressed',String(n.dataset.category===state.category)));
}

function renderSourceRegistry(){const target=document.getElementById('source-registry');if(!target)return;const title={ru:'Нормативные акты и официальные источники',kk:'Нормативтік актілер мен ресми дереккөздер',en:'Legal acts and official sources'};const date={ru:'Проверено',kk:'Тексерілді',en:'Checked'};target.replaceChildren(el('details',{class:'source-registry'},el('summary',{},title[state.lang]),el('ul',{},[...sources,...faqSources].map(source=>el('li',{},el('a',{href:source.url,target:'_blank',rel:'noopener noreferrer'},pick(source.title,state.lang)),el('small',{},pick(source.reference,state.lang)+' · '+date[state.lang]+': '+source.checked),source.verificationScope?el('small',{class:'source-verification'},pick(source.verificationScope,state.lang)):null)))));}

function renderPersonaContext(){
 const persona=state.profile.ready?personas[state.category]:null;
 document.querySelectorAll('.category-section').forEach(section=>{section.hidden=Boolean(persona);});
 if(persona){
  const overrides={'hero.description':persona.hero,'simulation.description':persona.description,'tool.simulation.description':persona.description,'tool.map.description':mapDescription(state.profile.city),'cities.description':mapDescription(state.profile.city)};
  Object.entries(overrides).forEach(([key,value])=>document.querySelectorAll(`[data-i18n="${key}"]`).forEach(node=>{node.textContent=pick(value,state.lang);}));
 }
 const dictionary=content[state.lang]||{};
 const meta=document.querySelector('meta[name="description"]');if(meta&&dictionary['page.description'])meta.setAttribute('content',dictionary['page.description']);
 for(const [selector,key] of [['.desktop-nav','access.mainNav'],['.mobile-menu nav','access.mobileNav'],['.brand','access.brandHome']]){
  const value=dictionary[key];if(value)document.querySelectorAll(selector).forEach(node=>node.setAttribute('aria-label',value));
 }
 const noScript=document.querySelector('.noscript-note');if(noScript&&dictionary['access.noscript'])noScript.textContent=dictionary['access.noscript'];
}

function translate(){document.documentElement.lang=state.lang;document.querySelectorAll('[data-i18n]').forEach(n=>{const key=n.dataset.i18n;if(content[state.lang]?.[key]!==undefined)n.textContent=pick(content[state.lang][key],state.lang);});
 for(const [attribute,dataKey] of [['placeholder','i18nPlaceholder'],['aria-label','i18nAria'],['title','i18nTitle']])document.querySelectorAll(`[data-${dataKey.replace(/[A-Z]/g,m=>'-'+m.toLowerCase())}]`).forEach(n=>{const value=content[state.lang]?.[n.dataset[dataKey]];if(value!==undefined)n.setAttribute(attribute,pick(value,state.lang));});
 document.querySelectorAll('#language-select').forEach(n=>{n.value=state.lang;});document.querySelectorAll('[data-lang]').forEach(n=>n.setAttribute('aria-pressed',String(n.dataset.lang===state.lang)));
 const title=content[state.lang]?.['meta.title'];if(title)document.title=pick(title,state.lang);
 renderProfile(ctx());refreshSiteGuide();refreshBarysChat();renderSourceRegistry();
 renderPersonaContext();
 const summary=document.getElementById('profile-summary');if(summary&&!state.profile.ready)summary.textContent=pick(tri('Выберите свой профиль','Өз профиліңізді таңдаңыз','Choose your profile'),state.lang);
 mountFAQ({lang:state.lang,container:document.getElementById('faq-content'),faq:state.profile.ready?faqForCategory(state.category,faq):faq,faqSources});
 updateProgress();storageMessage();
 let release=document.getElementById('release-meta');if(!release){release=el('p',{id:'release-meta',class:'release-note'});document.querySelector('.footer-bottom')?.append(release);}release.textContent=releaseLabel();
}
function releaseLabel(){return pick(tri(`Приложение v${releaseInfo.version} от ${releaseInfo.date}. Даты сверки источников указаны отдельно.`,`Қосымша v${releaseInfo.version}, ${releaseInfo.date}. Дереккөздерді тексеру күндері бөлек көрсетілген.`,`App v${releaseInfo.version}, ${releaseInfo.date}. Source review dates are listed separately.`),state.lang);}
function setLanguage(value){if(!['ru','kk','en'].includes(value))return;const bookmark=captureFocus(container);state.lang=value;save();translate();if(currentTool)render({bookmark});else restoreFocus(bookmark,container);guideEvent('language');}
function applyProfile({category,city,citizenship}={}){
 if(!categories.has(category)||!profileCities.has(city)||!profileCitizenships.has(citizenship))return false;
 const previous={category:state.profile.category||state.learningCategory||state.category,city:state.profile.city,citizenship:state.profile.citizenship};
 if(previous.city&&previous.citizenship){
  const affected=new Set();
  if(previous.citizenship!==citizenship)for(const id of ['notify','stay','iin','bank','contract','study'])affected.add(id);
  if(previous.city!==city)for(const id of ['notify','housing','bank','health'])affected.add(id);
  if(previous.category!==category)for(const id of ['stay','contract','study','bank'])affected.add(id);
  for(const id of affected)if(state.actionDone[id]){state.actionHistory.push({taskId:id,recordedAt:new Date().toISOString(),reason:'profile-changed'});state.actionDone[id]=false;state.actionReview[id]=true;}
  state.actionHistory=state.actionHistory.slice(-100);if(affected.size){closeCelebration();state.route.celebrated=false;}
 }
 alignLearningCategory(state,category);
 state.category=category;state.profile={city,citizenship,category,ready:true};
 const purpose={student:'study',worker:'work',remote:'remote',relocate:'settle'}[category];
 Object.assign(state.route,{citizenship,purpose,ready:false});Object.assign(state.calendar,{citizenship,purpose,ready:false});state.map.city=city;
 save();translate();guideEvent('profile');if(currentTool)render();else focusTarget(document.getElementById('profile-summary'));return true;
}
function editProfile(){
 if(dialog?.open){previousFocus=null;closeTool();currentTool=null;renderedStep=null;}
 state.profile.ready=false;state.route.ready=false;state.calendar.ready=false;save();translate();
 focusTarget(document.getElementById('onboard-category')||document.getElementById('profile-panel')?.querySelector('select,input,button'));guideEvent('profile-edit');
}
function ctx(){return {get lang(){return state.lang;},get state(){return state;},get toolId(){return currentTool;},container,progress,extraSources:faqSources,save,render,updateProgress,announce,openTool,openHelp,openConsultant:()=>{closeTool();requestAnimationFrame(()=>openBarysChat());},applyProfile,editProfile,celebrate:()=>celebrateJourney(ctx()),notifyGuide:detail=>notifyBarys(ctx(),currentTool,detail),onTaskChange};}
function openHelp(query='ВНЖ',faqId=null){
 if(dialog?.open)closeTool();
 guideEvent('section',{section:'faq'});
 if(faqId&&openFAQAnswer(document.getElementById('faq-content'),faqId))return;
 const search=document.getElementById('faq-search'),filter=document.getElementById('faq-category');
 if(filter){filter.value='all';filter.dispatchEvent(new Event('change',{bubbles:true}));}
 if(search){search.value=String(query);search.dispatchEvent(new Event('input',{bubbles:true}));}
 document.getElementById('faq')?.scrollIntoView({block:'start',behavior:document.documentElement.dataset.motion==='paused'?'auto':'smooth'});
 search?.focus({preventScroll:true});
}
function onTaskChange(id,checked){
 notifyBarys(ctx(),currentTool,{type:'action',actionId:id,checked});guideEvent('action',{actionId:id,checked});
 const summary=planSummary(state),relevant=summary.list;
 if(!checked){closeCelebration();state.route.celebrated=false;save();return;}
 if(!state.route.celebrated&&summary.finished){
  celebrateJourney(ctx(),{delay:currentTool==='route'?850:0,onShown(){state.route.celebrated=true;save();}});
 }
}
function stepSnapshot(){
 if(currentTool==='simulation'){const s=state.simulation;return {tool:currentTool,index:s.index,branch:s.branch,recoveryChoice:s.recoveryChoice,answers:JSON.stringify(s.choices)};}
 if(currentTool==='quiz')return {tool:currentTool,index:state.quiz.index,answers:JSON.stringify(state.quiz.answers)};
 if(currentTool==='navigator')return {tool:currentTool,problem:state.navigator.problem,option:state.navigator.option};
 if(currentTool==='route')return {tool:currentTool,ready:state.route.ready};
 return {tool:currentTool};
}
function focusStep(previous,next){
 if(!previous||previous.tool!==next.tool)return false;
 let target=null;
 if(next.tool==='simulation'){
  if(previous.index!==next.index)target=container.querySelector('h3');
  else if(previous.answers!==next.answers||previous.recoveryChoice!==next.recoveryChoice){
   if(next.branch==='recovery'&&next.recoveryChoice===null&&previous.recoveryChoice!==null)target=container.querySelector('[data-simulation-branch="recovery"] > h4');
   else target=[...container.querySelectorAll('.result-box > h4')].pop()||container.querySelector('h3');
  }
 }else if(next.tool==='quiz'){
  if(previous.index!==next.index)target=container.querySelector('h3');
  else if(previous.answers!==next.answers)target=container.querySelector('.result-box > h4');
 }else if(next.tool==='navigator'){
  if(previous.problem!==next.problem)target=container.querySelector('h3');
  else if(previous.option!==next.option)target=container.querySelector('.result-box > h4');
 }else if(next.tool==='route'&&!previous.ready&&next.ready){
  target=container.querySelector('[data-profile-result] h3');
 }
 return target?focusTarget(target):false;
}
function render({bookmark}={}){if(!currentTool||!container)return;const previous=renderedStep,context=ctx(),activeBookmark=bookmark||captureFocus(container);container.replaceChildren();progress?.replaceChildren();if(progress)progress.hidden=true;if(status)status.textContent='';
 document.getElementById('tool-title').textContent=t(context,titles[currentTool]);const summary=document.getElementById('tool-summary');if(summary)summary.textContent=t(context,currentTool==='simulation'&&state.profile.ready?personas[state.category].description:currentTool==='map'&&state.profile.ready?mapDescription(state.profile.city):descriptions[currentTool]);
 container.append(select(context,'tool-language',words.language,[['ru',tri('Русский','Орысша','Russian')],['kk',tri('Қазақша','Қазақша','Kazakh')],['en',tri('English','Ағылшынша','English')]],state.lang,setLanguage));
 try{tools[currentTool](context);mountBarys(context,currentTool);}catch(error){container.append(el('p',{class:'field-error',role:'alert'},t(context,words.error)));console.error('Migrato tool:',currentTool,error);}
 renderedStep=stepSnapshot();
 if(bookmark)restoreFocus(bookmark,container);else if(!focusStep(previous,renderedStep))restoreFocus(activeBookmark,container);
}
function openTool(id,trigger){if(!tools[id]||!dialog)return;closeCelebration();if(id==='map'&&trigger?.dataset.placeType==='medical'){state.map.type='medical';state.map.selected=null;save();}previousFocus=dialog.open?previousFocus:(trigger||document.activeElement);currentTool=id;renderedStep=null;render();if(!dialog.open){if(typeof dialog.showModal==='function')dialog.showModal();else{dialog.setAttribute('open','');dialog.setAttribute('role','dialog');dialog.setAttribute('aria-modal','true');}}document.body.classList.add('dialog-open');focusTarget(document.getElementById('tool-title'),{preventScroll:true});}
function closeTool(){if(dialog?.open&&typeof dialog.close==='function')dialog.close();else{dialog?.removeAttribute('open');finishClose();}}
function finishClose(){closeCelebration();currentTool=null;renderedStep=null;document.body.classList.remove('dialog-open','printing-tool');refreshSiteGuide();if(previousFocus?.isConnected)focusTarget(previousFocus,{preventScroll:true});previousFocus=null;}
window.openTool=openTool;
document.addEventListener('click',event=>{
 const control=event.target.closest('button,a');if(!control)return;
 if(control.matches('a[href^="#"]'))control.closest('details.mobile-menu')?.removeAttribute('open');
 if(control.dataset.tool){event.preventDefault();openTool(control.dataset.tool,control);}
 else if(control.dataset.category&&categories.has(control.dataset.category)){state.category=control.dataset.category;editProfile();}
 else if(control.dataset.lang)setLanguage(control.dataset.lang);
 else if(control.dataset.action==='close-tool'||control.hasAttribute('data-close-dialog'))closeTool();
 else if(control.dataset.action==='reset-progress'){if(window.confirm(pick(words.reset,state.lang))){const lang=state.lang;try{localStorage.removeItem(storageKey);storageAvailable=true;storageIssue=null;}catch{storageAvailable=false;storageIssue='storageError';}state=defaults();state.lang=lang;save();translate();if(currentTool)render();}}
 else if(control.dataset.action==='toggle-menu'){const menu=document.getElementById(control.getAttribute('aria-controls'));if(menu){const expanded=control.getAttribute('aria-expanded')==='true';control.setAttribute('aria-expanded',String(!expanded));menu.hidden=expanded;}}
});
document.getElementById('language-select')?.addEventListener('change',event=>setLanguage(event.target.value));
dialog?.addEventListener('close',finishClose);
dialog?.addEventListener('cancel',()=>{document.body.classList.remove('dialog-open');});
dialog?.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)closeTool();}});
setupBarys();
mountSiteGuide({getState:()=>state,openTool});
mountBarysChat({getState:()=>state,openHelp});
translate();
