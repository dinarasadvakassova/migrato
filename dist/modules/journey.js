import {sources} from '../data/content.js';
import {el,t,tri,button,note,sourceBox,taskList,download,planSummary} from './shared.js';
import {BARYS_SVG} from './barys.js';

const words={
 title:tri('Ваш путь к Байтереку','Бәйтерекке апарар жолыңыз','Your journey to Baiterek'),
 intro:tri('Пройдите пять этапов с Барысом. Достопримечательности Астаны — игровые ориентиры, а не адреса ведомств. Выбор этапа открывает инструкцию; выполненные дела отмечаете только вы.','Барыспен бес кезеңнен өтіңіз. Астананың көрікті жерлері — ойын бағдарлары, ведомстволардың мекенжайы емес. Кезеңді таңдау нұсқаулықты ашады; орындалған істерді тек өзіңіз белгілейсіз.','Follow five stages with Barys. Astana landmarks are game checkpoints, not government-office addresses. Selecting a stage opens its guide; only you mark real tasks complete.'),
 steps:tri('Этапы маршрута','Жоспар кезеңдері','Journey stages'),next:tri('Следующий этап','Келесі кезең','Next stage'),done:tri('Отмечено вами','Өзіңіз белгіледіңіз','Marked by you'),current:tri('Текущий этап','Ағымдағы кезең','Current stage'),pending:tri('Ещё не отмечено','Әлі белгіленбеген','Not yet marked'),
 tasks:tri('Что сделать','Не істеу керек','Actions to take'),materials:tri('Что подготовить для уточнения','Нақтылау үшін не дайындау керек','What to prepare for your enquiry'),authority:tri('К кому обратиться','Кімге жүгіну керек','Who to contact'),ask:tri('Какой вопрос задать','Қандай сұрақ қою керек','A question to ask'),
 materialNote:tri('Это ориентир для подготовки. Применимость и окончательный перечень документов уточняйте у принимающего органа. Не загружайте документы на сайт.','Бұл дайындық бағдары. Қолданылуы мен құжаттардың соңғы тізімін қабылдайтын органнан нақтылаңыз. Құжаттарды сайтқа жүктемеңіз.','This is a preparation guide. Confirm applicability and the final document list with the receiving authority. Do not upload documents to this site.'),
 download:tri('Скачать учебный чек-лист .txt','Оқу тізімін .txt түрінде жүктеу','Download learning checklist .txt'),sample:tri('УЧЕБНЫЙ ЧЕК-ЛИСТ — НЕ ОФИЦИАЛЬНАЯ ФОРМА','ОҚУ ТІЗІМІ — РЕСМИ НЫСАН ЕМЕС','LEARNING CHECKLIST — NOT AN OFFICIAL FORM'),
 finish:tri('Шаги отмечены вами','Қадамдарды өзіңіз белгіледіңіз','You have marked the steps'),
 finishNote:tri('Барыс дошёл до Байтерека по вашим отметкам. Сайт не проверяет подачу или правильность документов. Сверьте реальные подтверждения с принимающей стороной и соответствующими организациями.','Барыс белгілеріңіз бойынша Бәйтерекке жетті. Сайт құжаттардың берілуін немесе дұрыстығын тексермейді. Нақты растауларды қабылдаушы тараппен және тиісті ұйымдармен салыстырыңыз.','Barys reached Baiterek using your checkmarks. This site does not verify document submission or correctness. Check real confirmations with your host and the relevant organisations.'),
 confirmation:tri('Перед завершением сверьте свои реальные подтверждения: уведомление, основание пребывания и ответы организаций. Если подтверждения нет, вернитесь к нужному этапу и уточните вопрос.','Аяқтамас бұрын нақты растауларыңызды салыстырыңыз: хабарлама, болу негізі және ұйымдардың жауаптары. Растау болмаса, тиісті кезеңге оралып, мәселені нақтылаңыз.','Before finishing, review your real confirmations: notification, grounds for stay and organisations’ replies. If confirmation is missing, return to that stage and ask for clarification.'),
 runner:tri('Барыс на вашем маршруте','Барыс сіздің жолыңызда','Barys on your journey'),remaining:tri('Осталось действий','Қалған әрекеттер','Actions remaining'),official:tri('Открыть официальный источник','Ресми дереккөзді ашу','Open official source')
};
const definitions=[
 {id:'arrival',landmark:tri('Нұрлы жол','Нұрлы жол','Nurly Zhol'),title:tri('Прибытие и уведомление','Келу және хабарлама','Arrival and notification'),ids:['notify'],x:120,y:95,authority:tri('Принимающая сторона; при вопросах — миграционная служба по официальному каналу.','Қабылдаушы тарап; сұрақ болса — көші-қон қызметінің ресми арнасы.','Your host; for questions, the migration service through an official channel.'),ask:tri('Кто подаёт уведомление в моей ситуации и как мне получить подтверждение его подачи?','Менің жағдайымда хабарламаны кім береді және берілгенін қалай растай аламын?','Who submits the notification in my situation, and how can I obtain confirmation?'),materials:[tri('Подготовьте для своего обращения сведения о въезде и принимающей стороне; на Migrato их вводить не нужно.','Өз өтінішіңіз үшін кіру және қабылдаушы тарап туралы мәлімет дайындаңыз; оларды Migrato-ға енгізу қажет емес.','Prepare entry and host information for your own enquiry; do not enter it into Migrato.'),tri('Сохраните у себя подтверждение, которое предоставит принимающая сторона.','Қабылдаушы тарап берген растауды өзіңізде сақтаңыз.','Keep any confirmation provided by your host.')]},
 {id:'documents',landmark:tri('Пирамида','Пирамида','Pyramid'),title:tri('Основание пребывания и ИИН','Болу негізі және ЖСН','Stay grounds and IIN'),ids:['stay','iin'],x:380,y:225,authority:tri('Миграционная служба — условия пребывания; ЦОН и eGov — услуга по ИИН.','Көші-қон қызметі — болу шарттары; ХҚКО және eGov — ЖСН қызметі.','Migration service for stay conditions; public service centres and eGov for the IIN service.'),ask:tri('Какой порядок применяется к моему гражданству, цели и истории въездов? Какой актуальный перечень документов нужен для выбранной услуги?','Азаматтығыма, мақсатыма және кіру тарихыма қандай тәртіп қолданылады? Таңдалған қызметке қандай өзекті құжаттар қажет?','Which process applies to my citizenship, purpose and entry history? What is the current document list for the selected service?'),materials:[tri('Сверьте карточку услуги ИИН: заявление, документ, удостоверяющий личность, и предусмотренные для вашего случая требования к переводу.','ЖСН қызметінің карточкасын тексеріңіз: өтініш, жеке басты куәландыратын құжат және жағдайыңызға қатысты аударма талаптары.','Check the IIN service page for the application, identity document and translation requirements applicable to your case.'),tri('Для миграционного обращения подготовьте вопросы о визе, регистрации и основании пребывания.','Көші-қон өтініші үшін виза, тіркеу және болу негізі туралы сұрақтар дайындаңыз.','Prepare questions about your visa, registration and grounds for stay.')]},
 {id:'housing',landmark:tri('Хан Шатыр','Хан Шатыр','Khan Shatyr'),title:tri('Жильё и договор','Баспана және шарт','Housing and agreement'),ids:['housing'],x:140,y:380,authority:tri('Собственник или уполномоченный арендодатель; при споре — квалифицированный специалист.','Меншік иесі немесе уәкілетті жалға беруші; дау болса — білікті маман.','The owner or authorised landlord; a qualified professional if there is a dispute.'),ask:tri('Чем подтверждаются полномочия сдавать жильё и как в договоре описаны оплата, депозит, ремонт и прекращение аренды?','Баспананы жалға беру өкілеттігі немен расталады және шартта төлем, депозит, жөндеу мен тоқтату қалай көрсетілген?','How is the authority to let the home established, and how does the agreement describe payment, deposit, repairs and termination?'),materials:[tri('Проект договора, описание жилья и вопросы об оплате, депозите, ремонте и возврате жилья.','Шарт жобасы, баспана сипаттамасы және төлем, депозит, жөндеу мен қайтару туралы сұрақтар.','A draft agreement, property description and questions about payment, deposit, repairs and handover.'),tri('Используйте тренажёр аренды как учебный пример; он не заменяет проверку настоящего договора.','Жалдау тренажерін оқу мысалы ретінде қолданыңыз; ол нақты шартты тексеруді алмастырмайды.','Use the rental trainer as a learning example; it does not replace reviewing a real agreement.')]},
 {id:'work',landmark:tri('Астана Опера','Астана Опера','Astana Opera'),title:tri('Банк, работа или учёба','Банк, жұмыс немесе оқу','Banking, work or study'),ids:['bank','contract','study'],x:380,y:530,authority:tri('Выбранный банк; работодатель или международный отдел вашего вуза — в зависимости от цели.','Таңдалған банк; мақсатыңызға қарай жұмыс беруші немесе ЖОО халықаралық бөлімі.','Your selected bank; your employer or institution’s international office, depending on your purpose.'),ask:tri('Какие документы и условия применяются к моей ситуации, где опубликован официальный перечень и как получить подтверждение обращения?','Менің жағдайыма қандай құжаттар мен шарттар қолданылады, ресми тізім қайда жарияланған және өтінішті қалай растай аламын?','Which documents and conditions apply to my case, where is the official list, and how can I obtain confirmation of my enquiry?'),materials:[tri('Для банка получите его действующий перечень документов и тарифы; требования разных банков могут отличаться.','Банктен өзекті құжаттар тізімі мен тарифтерін алыңыз; банктердің талаптары әртүрлі болуы мүмкін.','Obtain the selected bank’s current document list and fees; banks may have different requirements.'),tri('Для работы или учёбы подготовьте вопросы об условиях договора, допуске к работе либо учебных документах.','Жұмыс немесе оқу үшін шарт талаптары, жұмысқа рұқсат не оқу құжаттары туралы сұрақтар дайындаңыз.','For work or study, prepare questions about agreement terms, work eligibility or institution documents.')]},
 {id:'life',landmark:tri('Байтерек','Бәйтерек','Baiterek'),title:tri('Быт и проверка подтверждений','Тұрмыс және растауларды тексеру','Everyday life and confirmation review'),ids:['health','safety','language'],x:260,y:700,authority:tri('Медицинская организация и соответствующие службы — по официальным контактам; принимающая сторона — по подтверждению уведомления.','Медициналық ұйым және тиісті қызметтер — ресми байланыстар арқылы; қабылдаушы тарап — хабарламаны растау бойынша.','Healthcare providers and relevant services through official contacts; your host for notification confirmation.'),ask:tri('Какие условия обслуживания действуют для меня и какие реальные подтверждения моих действий ещё нужно получить?','Маған қандай қызмет көрсету шарттары қолданылады және әрекеттерімнің қандай нақты растауларын әлі алу керек?','Which service conditions apply to me, and which real confirmations of my actions are still missing?'),materials:[tri('Подготовьте вопросы о записи, оплате и применимости страховки; условия подтверждает организация.','Жазылу, төлем және сақтандырудың қолданылуы туралы сұрақтар дайындаңыз; шарттарды ұйым растайды.','Prepare questions about appointments, payment and insurance applicability; the provider confirms the terms.'),tri('Сверьте собственные подтверждения и сохраните официальные контакты. Не передавайте пароли и коды посредникам.','Өз растауларыңызды салыстырып, ресми байланыстарды сақтаңыз. Құпиясөздер мен кодтарды делдалдарға бермеңіз.','Review your own confirmations and keep official contacts. Do not share passwords or codes with intermediaries.')]}
];
const selectedStages=new WeakMap(),compactMaps=new WeakMap();
export function journeyStages(list){const byId=new Map(list.map(action=>[action.id,action]));return definitions.map(stage=>({...stage,actions:stage.ids.map(id=>byId.get(id)).filter(Boolean)}));}
export function journeyPosition(stages,done){
 const index=stages.findIndex(stage=>stage.actions.some(action=>!done[action.id]));
 if(index<0)return {index:stages.length-1,x:260,y:700,finished:true};
 const stage=stages[index];
 return {index,x:stage.x,y:stage.y,finished:false};
}
function svgNode(tag,attrs={}){const node=document.createElementNS('http://www.w3.org/2000/svg',tag);Object.entries(attrs).forEach(([key,value])=>node.setAttribute(key,String(value)));return node;}
function landmark(stage){
 const g=svgNode('g',{class:'journey-landmark',transform:`translate(${stage.x+32} ${stage.y-70})`,'aria-hidden':'true'});
 const shapes=stage.id==='arrival'?[['path',{d:'M0 58 8 28 60 28 68 58ZM9 28Q34 0 59 28M8 58V38H60V58M19 38V58M34 38V58M49 38V58'}]]:stage.id==='documents'?[['path',{d:'M1 60 34 2 67 60ZM17 33H51M9 46H59M34 2V60M17 33 34 60 51 33'}]]:stage.id==='housing'?[['path',{d:'M0 60Q17 40 35 3Q46 41 68 60ZM35 3V0M35 3 14 60M35 3 53 60'}]]:stage.id==='work'?[['path',{d:'M0 21 34 3 68 21ZM5 60H63M8 53H60M12 24V53M24 24V53M44 24V53M56 24V53'}]]:[['circle',{cx:34,cy:16,r:15}],['path',{d:'M18 28 27 59H41L50 28M25 29 30 59M43 29 38 59M20 62H48M29 59V68M39 59V68'}]];
 shapes.forEach(([tag,attrs])=>g.append(svgNode(tag,attrs)));return g;
}
export function renderJourney(ctx,list){
 const stages=journeyStages(list),root=el('section',{class:'journey-section','data-journey':''},el('h3',{},t(ctx,words.title)),note(ctx,words.intro));
 const board=el('div',{class:'journey-map',id:'journey-board'}),svg=svgNode('svg',{viewBox:'0 0 520 780',class:'journey-map-svg','aria-hidden':'true'});
 svg.append(svgNode('polyline',{class:'journey-path',points:stages.map(s=>`${s.x},${s.y}`).join(' '),fill:'none'}));
 const dots=[];
 stages.forEach((stage,index)=>{
  svg.append(landmark(stage));
  const dot=svgNode('circle',{cx:stage.x,cy:stage.y,r:15,class:'journey-dot'});
  const label=svgNode('text',{x:stage.x,y:stage.y+43,'text-anchor':'middle',class:'journey-map-label'});label.textContent=`${index+1}. ${t(ctx,stage.landmark)}`;
  dots.push({stage,dot});svg.append(dot,label);
 });
 const runner=svgNode('g',{class:'journey-runner'});
 // Feet (SVG 160,376) anchor to the same coordinate system as the path and stops.
 runner.innerHTML=BARYS_SVG.replace('class="barys-svg"','class="journey-runner-svg" x="-40" y="-94" width="80" height="100"');
 svg.append(runner);board.append(svg);
 const viewport=el('div',{class:'journey-map-viewport',tabindex:'0','aria-label':t(ctx,tri('Игровая карта. Стрелки перемещают увеличенную область.','Ойын картасы. Үлкейтілген аймақты көрсеткілермен жылжытыңыз.','Learning map. Arrow keys pan the zoomed area.'))},board);
 let zoom=1;
 const zoomLabel=el('output',{class:'journey-zoom-label','aria-live':'polite'},'100%');
 const pan=(x,y)=>{viewport.scrollLeft=(Number(viewport.scrollLeft)||0)+x;viewport.scrollTop=(Number(viewport.scrollTop)||0)+y;};
 const setZoom=value=>{zoom=Math.max(1,Math.min(2.5,value));board.style.width=zoom===1?'':`${Math.max(130,viewport.clientWidth||460)*zoom}px`;viewport.classList.toggle('is-zoomed',zoom>1);zoomLabel.textContent=Math.round(zoom*100)+'%';fitViewport?.();};
 const zoomControls=el('div',{class:'journey-zoom-controls',role:'group','aria-label':t(ctx,tri('Масштаб и перемещение карты','Картаның масштабы мен жылжуы','Map zoom and pan'))},
  button(ctx,tri('−','−','−'),()=>setZoom(zoom-.25),{'aria-label':t(ctx,tri('Уменьшить карту','Картаны кішірейту','Zoom out'))}),zoomLabel,
  button(ctx,tri('+','+','+'),()=>setZoom(zoom+.25),{'aria-label':t(ctx,tri('Увеличить карту','Картаны үлкейту','Zoom in'))}),
  button(ctx,tri('100%','100%','100%'),()=>{setZoom(1);viewport.scrollLeft=0;viewport.scrollTop=0;},{'aria-label':t(ctx,tri('Исходный масштаб','Бастапқы масштаб','Reset zoom'))}),
  ...[['←',-100,0],['↑',0,-100],['↓',0,100],['→',100,0]].map(([label,x,y])=>button(ctx,tri(label,label,label),()=>pan(x,y),{'aria-label':t(ctx,tri(`Переместить карту ${label}`,`Картаны жылжыту ${label}`,`Pan map ${label}`))})));
 viewport.addEventListener('keydown',event=>{const direction={ArrowLeft:[-80,0],ArrowRight:[80,0],ArrowUp:[0,-80],ArrowDown:[0,80]}[event.key];if(direction&&zoom>1){event.preventDefault();pan(...direction);}});
 const panel=el('div',{class:'journey-panel'}),status=el('p',{class:'journey-status',role:'status','aria-live':'polite'}),stops=[],cards=[];
 const initial=journeyPosition(stages,ctx.state.actionDone);initial.finished=initial.finished&&planSummary(ctx.state).finished;
 let selected=selectedStages.get(ctx.state.route)||stages[initial.index]?.id||stages[0].id;
 const viewing=el('p',{class:'journey-viewing'}),currentTitle=el('strong',{class:'journey-current-title'}),marked=el('p',{class:'journey-marked'});
 const navigation=el('nav',{class:'journey-stage-nav','aria-label':t(ctx,words.steps)});
 const meta=el('div',{class:'journey-map-meta'},viewing,currentTitle,marked,navigation);
 let compact=compactMaps.get(ctx.state.route)===true,fitViewport;
 const modeText=()=>t(ctx,compact?tri('Развернуть карту','Картаны кеңейту','Expand map'):tri('Компактный вид','Ықшам көрініс','Compact view'));
 const mode=button(ctx,modeText(),()=>{compact=!compact;setZoom(1);compactMaps.set(ctx.state.route,compact);mapWrap.classList.toggle('is-compact',compact);mode.textContent=modeText();mode.setAttribute('aria-expanded',String(!compact));fitViewport?.();},{class:'button button-secondary journey-map-mode','aria-controls':'journey-board','aria-expanded':String(!compact)});
 const mapWrap=el('aside',{class:'journey-map-wrap'+(compact?' is-compact':''),'aria-label':t(ctx,words.runner)},el('div',{class:'journey-map-controls'},el('div',{class:'journey-map-toolbar'},mode),zoomControls),viewport,meta);
 let lastPosition=null,moveTimer,completedBefore=initial.finished,readyToNotify=false;
 function moveTo(stage){
  if(lastPosition&&(lastPosition.x!==stage.x||lastPosition.y!==stage.y)){
   runner.classList.add('is-moving');clearTimeout(moveTimer);moveTimer=setTimeout(()=>runner.classList.remove('is-moving'),820);
  }
  lastPosition={x:stage.x,y:stage.y};runner.style.transform=`translate(${stage.x}px, ${stage.y}px)`;
 }
 function choose(id,{focus=false}={}){
  const stage=stages.find(s=>s.id===id);if(!stage)return;
  selected=id;selectedStages.set(ctx.state.route,id);
  cards.forEach(({stage:s,card})=>{const open=s.id===id;if(card.open!==open)card.open=open;});
  stops.forEach(({stage:s,control})=>{control.setAttribute('aria-expanded',String(s.id===id));control.classList.toggle('is-selected',s.id===id);if(s.id===id)control.setAttribute('aria-current','step');else control.removeAttribute('aria-current');});
  const index=stages.indexOf(stage);
  viewing.textContent=t(ctx,tri(`Вы смотрите этап ${index+1} из ${stages.length}`,`${stages.length} кезеңнің ${index+1}-ін қарап отырсыз`,`Viewing stage ${index+1} of ${stages.length}`));
  currentTitle.textContent=t(ctx,stage.title);moveTo(stage);if(zoom>1){viewport.scrollLeft=Math.max(0,stage.x/520*(board.clientWidth||460*zoom)-(viewport.clientWidth||300)/2);viewport.scrollTop=Math.max(0,stage.y/780*(board.clientHeight||690*zoom)-(viewport.clientHeight||400)/2);}
  if(readyToNotify)ctx.notifyGuide?.({type:'stage',stageTitle:stage.title});
  if(focus){const summary=cards.find(s=>s.stage.id===id)?.card.querySelector('summary');summary?.focus({preventScroll:true});summary?.scrollIntoView({block:'nearest',behavior:'instant'});}
 }
 const taskContext={...ctx,updateProgress(){ctx.updateProgress();updateBoard();}};
 stages.forEach((stage,index)=>{
  const control=button(ctx,tri(`Этап ${index+1}`,`${index+1}-кезең`,`Stage ${index+1}`),()=>choose(stage.id,{focus:true}),{id:`journey-stop-${stage.id}`,class:'button journey-stage-control','aria-controls':`journey-card-${stage.id}`,'aria-expanded':String(stage.id===selected)});
  stops.push({stage,control});navigation.append(control);
  const summary=el('summary',{tabindex:'0'},`${index+1}. ${t(ctx,stage.landmark)} — ${t(ctx,stage.title)}`);
  const card=el('details',{id:`journey-card-${stage.id}`,class:'journey-card',open:stage.id===selected},summary,el('h4',{},t(ctx,words.tasks)),taskList(taskContext,stage.actions),el('h4',{},t(ctx,words.materials)),el('ul',{},stage.materials.map(text=>el('li',{},t(ctx,text)))),note(ctx,words.materialNote),el('h4',{},t(ctx,words.authority)),el('p',{},t(ctx,stage.authority)),el('h4',{},t(ctx,words.ask)),el('p',{},t(ctx,stage.ask)));
  if(stage.id==='life')card.append(note(ctx,words.confirmation));
  const ids=[...new Set(stage.actions.flatMap(action=>action.sourceIds||[]))];
  card.append(sourceBox(ctx,ids),button(ctx,words.download,()=>{
   const text=[t(ctx,words.sample),`${t(ctx,stage.landmark)} — ${t(ctx,stage.title)}`,'',t(ctx,words.tasks),...stage.actions.map(a=>`[ ] ${t(ctx,a.title)}\n${t(ctx,a.description)}`),'',t(ctx,words.materials),...stage.materials.map(text=>`- ${t(ctx,text)}`),'',t(ctx,words.authority),t(ctx,stage.authority),t(ctx,words.ask),t(ctx,stage.ask),'',...ids.map(id=>sources.find(source=>source.id===id)).filter(Boolean).map(source=>`${t(ctx,source.title)} — ${source.url}`),'',t(ctx,words.materialNote)].join('\n');
   download(`migrato-learning-${stage.id}-${ctx.lang}.txt`,text);
  }));
  if(index<stages.length-1)card.append(button(ctx,words.next,()=>choose(stages[index+1].id,{focus:true}),{class:'button button-secondary journey-next'}));
  // Native toggle events are queued; only a genuinely new open card selects a stage.
  card.addEventListener('toggle',()=>{if(card.open&&selected!==stage.id)choose(stage.id);});
  cards.push({stage,card});panel.append(card);
 });
 const finish=el('section',{class:'journey-finish',hidden:true},el('h4',{},t(ctx,words.finish)),el('p',{},t(ctx,words.finishNote)),button(ctx,tri('Открыть поздравление','Құттықтауды ашу','Open congratulations'),()=>ctx.celebrate?.()));
 function updateBoard(){
  const position=journeyPosition(stages,ctx.state.actionDone),summary=planSummary(ctx.state),done=summary.done;position.finished=position.finished&&summary.finished;
  if(position.finished&&!completedBefore)choose(stages[stages.length-1].id);
  completedBefore=position.finished;runner.classList.toggle('is-finished',position.finished);
  dots.forEach(({stage,dot})=>dot.classList.toggle('is-complete',stage.actions.every(action=>ctx.state.actionDone[action.id])));
  stops.forEach(({stage,control},index)=>{const complete=stage.actions.every(action=>ctx.state.actionDone[action.id]);control.classList.toggle('is-complete',complete);control.setAttribute('aria-label',`${index+1}. ${t(ctx,stage.landmark)}: ${t(ctx,complete?words.done:words.pending)}`);});
  marked.textContent=t(ctx,tri(`Отмечено вами: ${done} из ${list.length}`,`Өзіңіз белгіледіңіз: ${done} / ${list.length}`,`Marked by you: ${done} of ${list.length}`));
  status.textContent=!summary.supported?t(ctx,tri('Это общий учебный план. Уточните поддержанный профиль; отметки не определяют все ваши обязанности.','Бұл жалпы оқу жоспары. Қолдау көрсетілетін профильді нақтылаңыз; белгілер барлық міндетіңізді анықтамайды.','This is a general learning plan. Clarify a supported profile; checkmarks do not determine all your obligations.')):position.finished?t(ctx,words.finish):`${t(ctx,words.remaining)}: ${list.length-done}`;finish.hidden=!position.finished;
 }
 root.append(el('div',{class:'journey-layout'},mapWrap,panel),status,finish);updateBoard();choose(selected);readyToNotify=true;fitViewport=fitJourneyViewport(ctx,root,mapWrap);return root;
}

function fitJourneyViewport(ctx,root,wrap){
 const port=document.querySelector('.tool-dialog-body');if(!port)return;
 let disposed=false,resizeObserver,removalObserver;
 const fit=()=>{
  if(disposed)return;
  if(!root.isConnected)return;
  if(!port.clientHeight)return;
  const header=document.querySelector('.tool-dialog-header');const dialog=document.getElementById('tool-dialog');const available=Math.max(0,Math.min(port.clientHeight,dialog?.clientHeight?dialog.clientHeight-(header?.getBoundingClientRect?.().height||0):port.clientHeight)-24);
  const unpinned=available<360||wrap.scrollHeight>available;
  wrap.classList.toggle('is-unpinned',unpinned);
  root.style.setProperty('--journey-sticky-clearance',`${unpinned?16:wrap.scrollHeight+16}px`);
 };
 const dispose=()=>{disposed=true;resizeObserver?.disconnect();removalObserver?.disconnect();window.removeEventListener('resize',fit);document.getElementById('tool-dialog')?.removeEventListener('close',dispose);};
 if(typeof ResizeObserver!=='undefined'){resizeObserver=new ResizeObserver(fit);resizeObserver.observe(port);resizeObserver.observe(wrap);}
 else window.addEventListener('resize',fit,{passive:true});
 if(typeof MutationObserver!=='undefined'){removalObserver=new MutationObserver(()=>{if(!root.isConnected)dispose();});removalObserver.observe(ctx.container,{childList:true});}
 document.getElementById('tool-dialog')?.addEventListener('close',dispose,{once:true});
 requestAnimationFrame(fit);return fit;
}
