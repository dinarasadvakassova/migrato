import {residencePaths,documentPackages} from '../data/migration.js';
import {el,t,tri,button,note,field,select,sourceBox,download} from './shared.js';
import {buildICS} from './planning.js';

const words={
 compareIntro:tri('Выберите две процедуры и сравните их назначение, результат и порядок обращения. Сравнение не устанавливает вашу индивидуальную применимость.','Екі рәсімді таңдап, олардың мақсатын, нәтижесін және жүгіну тәртібін салыстырыңыз. Салыстыру сізге жеке қолданылуын анықтамайды.','Choose two procedures to compare their purpose, result and first point of contact. This does not determine your individual eligibility.'),
 left:tri('Первая процедура','Бірінші рәсім','First procedure'),right:tri('Вторая процедура','Екінші рәсім','Second procedure'),
 same:tri('Выбрана одна и та же процедура. Для сравнения выберите другую во втором поле.','Бір рәсім екі рет таңдалды. Салыстыру үшін екінші өрісте басқа рәсімді таңдаңыз.','The same procedure is selected twice. Choose a different one in the second field.'),
 comparison:tri('Сравнение процедур','Рәсімдерді салыстыру','Procedure comparison'),property:tri('Что сравниваем','Салыстыру өлшемі','Comparison point'),
 what:tri('Для чего нужна','Не үшін қажет','Purpose'),first:tri('С чего начинается','Неден басталады','First step'),proof:tri('Что получают в результате','Қандай нәтиже беріледі','Resulting document or decision'),authority:tri('Куда обращаться','Қайда жүгіну керек','Who handles it'),limits:tri('Что важно различать','Нені ажырату маңызды','Important distinctions'),
 sequence:tri('ПМЖ и карточка ВНЖ связаны последовательно: разрешение на постоянное проживание — основание, а ВНЖ — удостоверяющий документ, оформляемый после него. Это не два взаимоисключающих варианта.','Тұрақты тұруға рұқсат пен ықтиярхат бірізді байланысты: рұқсат — негіз, ал ықтиярхат одан кейін ресімделетін куәландырушы құжат. Бұлар бір-бірін жоққа шығаратын нұсқалар емес.','Permanent residence permission and the residence card are successive steps: permission is the basis, while the card is the identifying document issued afterwards. They are not mutually exclusive alternatives.'),
 scroll:tri('На узком экране таблицу можно прокрутить по горизонтали.','Тар экранда кестені көлденең айналдыруға болады.','On a narrow screen, scroll the table horizontally.'),
 packageIntro:tri('Отметьте наличие документов по выбранной процедуре. Получится список пробелов и вопросов для уточнения. Файлы и персональные данные загружать не нужно.','Таңдалған рәсім бойынша құжаттардың бар-жоғын белгілеңіз. Жетіспейтін құжаттар мен нақтылау сұрақтарының тізімі жасалады. Файлдар мен жеке деректерді жүктеу қажет емес.','Report which documents you have for the selected procedure. The result lists gaps and questions to clarify. Do not upload files or personal details.'),
 package:tri('Для какой процедуры готовитесь','Қай рәсімге дайындалып жатырсыз','Procedure you are preparing for'),
 have:tri('Подготовлено','Дайындалды','Prepared'),missing:tri('Пока не подготовлено','Әлі дайындалмады','Not prepared yet'),uncertain:tri('Нужно уточнить','Нақтылау қажет','Need to clarify'),renew:tri('Нужно обновить','Жаңарту қажет','Needs updating'),
 optional:tri('Дополнительно при применимости','Қолданылатын жағдайда қосымша','Additional item where applicable'),
 summary:tri('Сводка по вашим ответам','Жауаптарыңыз бойынша қорытынды','Your self-reported document review'),
 counted:tri('Отмечено актуальными','Өзекті деп белгіленген','Reported as current'),
 missingTitle:tri('Пока отсутствуют','Әлі жоқ','Not yet available'),uncertainTitle:tri('Требуют уточнения','Нақтылауды қажет етеді','Need clarification'),renewTitle:tri('Требуют обновления','Жаңартуды қажет етеді','Need updating'),
 noGaps:tri('В этой памятке не осталось отмеченных пробелов. Проверьте актуальный официальный перечень, требования к оформлению и применимые исключения перед обращением.','Бұл жадынамада белгіленген олқылықтар қалмады. Жүгінер алдында өзекті ресми тізімді, ресімдеу талаптарын және қолданылатын ерекшеліктерді тексеріңіз.','No gaps remain in this guide based on your answers. Check the current official list, format requirements and applicable exceptions before applying.'),
 listScope:tri('Это памятка для самопроверки, а не исчерпывающий официальный перечень и не решение о приёме документов. Дополнительные условия зависят от основания и ситуации. Отметки здесь не выполняют задачи маршрута.','Бұл өзін-өзі тексеру жадынамасы, толық ресми тізім немесе құжаттарды қабылдау шешімі емес. Қосымша талаптар негіз бен жағдайға байланысты. Мұндағы белгілер жоспар міндеттерін орындамайды.','This is a self-check guide, not an exhaustive official list or an acceptance decision. Further requirements depend on your grounds and circumstances. These answers do not complete route tasks.'),
 expiryIntro:tri('Перенесите дату окончания из уже имеющегося документа. Инструмент считает календарные дни и помогает поставить личное напоминание. Законный срок пребывания и дату подачи на продление он не определяет.','Бар құжаттан аяқталу күнін енгізіңіз. Құрал күнтізбелік күндерді есептеп, жеке еске салуды орнатуға көмектеседі. Ол заңды болу мерзімін және ұзартуға өтініш беру күнін анықтамайды.','Copy the expiry date from a document you already hold. This tool counts calendar days and helps create a personal reminder. It does not determine your lawful stay or a renewal application deadline.'),
 documentType:tri('Какой документ проверяем','Қай құжатты тексереміз','Document type'),
 vnz:tri('Карточка ВНЖ','Ықтиярхат картасы','Residence card'),rvp:tri('Документ РВП','Уақытша тұруға рұқсат құжаты','Temporary residence document'),passport:tri('Паспорт','Паспорт','Passport'),visa:tri('Виза','Виза','Visa'),other:tri('Другой документ с датой окончания','Аяқталу күні бар басқа құжат','Another document with an expiry date'),
 expiryDate:tri('Действителен до — дата с документа','Жарамдылық мерзімі — құжаттағы күн','Valid until — date printed on the document'),
 dateHint:tri('Введите только дату. Номер документа, имя и скан не нужны.','Тек күнді енгізіңіз. Құжат нөмірі, аты-жөні және скан қажет емес.','Enter only the date. No document number, name or scan is needed.'),
 invalidDate:tri('Укажите существующую дату в формате день, месяц и год.','Күн, ай және жыл форматында нақты күнді көрсетіңіз.','Enter a valid calendar date with day, month and year.'),
 todayLabel:tri('Сегодня по календарю вашего устройства','Құрылғы күнтізбесі бойынша бүгін','Today according to your device'),
 remaining:tri('Календарных дней до указанной даты','Көрсетілген күнге дейінгі күнтізбелік күн','Calendar days until the entered date'),
 expiresToday:tri('Указанная дата наступает сегодня.','Көрсетілген күн бүгін.','The entered expiry date is today.'),
 expired:tri('Указанная дата уже прошла.','Көрсетілген күн өтіп кетті.','The entered date has passed.'),
 ago:tri('Календарных дней после указанной даты','Көрсетілген күннен кейінгі күнтізбелік күн','Calendar days since the entered date'),
 dateScope:tri('Результат относится только к введённой дате, которую сайт не сверяет с документом. Истечение даты документа само по себе не определяет ваш миграционный статус; уточните дальнейшие действия в компетентном органе.','Нәтиже тек енгізілген күнге қатысты; сайт оны құжатпен тексермейді. Құжаттағы күннің өтуі көші-қон мәртебеңізді өздігінен анықтамайды; келесі әрекеттерді құзыретті органнан нақтылаңыз.','This result concerns only your entered date, which the site does not verify against a document. A document date passing does not by itself establish your immigration status; clarify next steps with the competent authority.'),
 remind:tri('Личное напоминание до указанной даты','Көрсетілген күнге дейінгі жеке еске салу','Personal reminder before that date'),
 remindDate:tri('Выбранная дата напоминания','Таңдалған еске салу күні','Selected reminder date'),
 download:tri('Скачать событие для календаря .ics','Күнтізбе оқиғасын .ics жүктеу','Download calendar event .ics'),
 pastReminder:tri('Дата выбранного напоминания уже прошла. Файл добавит только событие окончания документа без такого напоминания. Можно выбрать меньший интервал.','Таңдалған еске салу күні өтіп кетті. Файл тек құжаттың аяқталу оқиғасын осы еске салусыз қосады. Қысқарақ аралықты таңдауға болады.','The selected reminder date has passed. The file will contain the expiry event without that reminder. You can choose a shorter interval.'),
 importHint:tri('Откройте файл в своём календаре и проверьте настройки уведомлений. Сайт не отправляет push-уведомления и не гарантирует, что календарь покажет сигнал.','Файлды өз күнтізбеңізде ашып, хабарландыру параметрлерін тексеріңіз. Сайт push-хабарлама жібермейді және күнтізбенің ескерту көрсететініне кепілдік бермейді.','Open the file in your calendar and check its notification settings. This site does not send push notifications or guarantee that your calendar will show an alert.'),
 expiredExport:tri('Для прошедшей даты новое напоминание не создаётся. Уточните дальнейшие действия по этому документу.','Өткен күнге жаңа еске салу жасалмайды. Осы құжат бойынша келесі әрекеттерді нақтылаңыз.','A new reminder cannot be created for a past expiry date. Clarify the next steps for this document.'),
 calendarTitle:tri('Проверить документ','Құжатты тексеру','Check document'),
 empty:tri('Для этой процедуры пока нет данных. Выберите другую.','Бұл рәсім бойынша деректер әзірге жоқ. Басқасын таңдаңыз.','No data is available for this procedure. Choose another one.')
};
const documentTypes=['vnz','rvp','passport','visa','other'];
const reminderOptions=[7,14,30,60];
const dayMs=86400000;

function stateFor(ctx){
 const s=ctx.state.migration||(ctx.state.migration={});
 if(!Array.isArray(s.compare))s.compare=['rvp','vnz'];
 if(!s.documents||typeof s.documents!=='object')s.documents={};
 return s;
}
function clearProgress(ctx){if(ctx.progress){ctx.progress.replaceChildren();ctx.progress.hidden=true;}}
function currentISO(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function dateValue(value){
 if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return null;
 const [year,month,day]=value.split('-').map(Number);
 if(year<1||month<1||month>12||day<1||day>31)return null;
 const date=new Date(0);date.setUTCHours(0,0,0,0);date.setUTCFullYear(year,month-1,day);
 if(date.getUTCFullYear()!==year||date.getUTCMonth()!==month-1||date.getUTCDate()!==day)return null;
 return date;
}
export function calendarDayDifference(expiryDate,today){
 const expiry=dateValue(expiryDate),start=dateValue(today);
 return expiry&&start?Math.round((expiry-start)/dayMs):null;
}
export function documentExpiryResult(expiryDate,remindDays,today){
 const days=calendarDayDifference(expiryDate,today),interval=Number(remindDays);
 if(days===null||!reminderOptions.includes(interval))return null;
 const reminder=dateValue(expiryDate);reminder.setUTCDate(reminder.getUTCDate()-interval);
 const reminderDate=`${String(reminder.getUTCFullYear()).padStart(4,'0')}-${String(reminder.getUTCMonth()+1).padStart(2,'0')}-${String(reminder.getUTCDate()).padStart(2,'0')}`;
 return {days,status:days<0?'expired':days===0?'today':'upcoming',reminderDate,reminderDays:interval,reminderInPast:calendarDayDifference(reminderDate,today)<0};
}
export function documentReadinessSummary(items,answers,packageId){
 const groups={have:[],missing:[],uncertain:[],renew:[]};
 const required=(Array.isArray(items)?items:[]).filter(item=>item.required===true);
 for(const item of required){const value=answers?.[`${packageId}:${item.id}`];groups[Object.hasOwn(groups,value)?value:'uncertain'].push(item);}
 return {...groups,requiredCount:required.length,hasUnresolved:required.length===0||groups.missing.length+groups.uncertain.length+groups.renew.length>0};
}
export function buildDocumentExpiryICS({date,remindDays,today,documentLabel='',lang='ru'}){
 const result=documentExpiryResult(date,remindDays,today);
 if(!result||result.status==='expired')return null;
 const ctx={lang};
 const event={id:'personal-document-expiry',date,title:`${t(ctx,words.calendarTitle)}: ${documentLabel}`,description:`${t(ctx,words.expiryDate)}: ${date}. ${t(ctx,words.dateScope)}`};
 // buildICS provides escaping, UTF-8 folding and exclusive all-day DTEND.
 // Only this single event's alarm is adjusted to the user-selected interval.
 return buildICS([event],{lang,reminder:!result.reminderInPast}).replace('TRIGGER:-P1D\r\n',`TRIGGER:-P${result.reminderDays}D\r\n`);
}

export function compareStatuses(ctx){
 clearProgress(ctx);
 const s=stateFor(ctx),paths=Array.isArray(residencePaths)?residencePaths:[];
 ctx.container.append(note(ctx,words.compareIntro));
 if(paths.length<2){ctx.container.append(note(ctx,words.empty));return;}
 s.compare=s.compare.slice(0,2);
 for(let index=0;index<2;index++)if(!paths.some(path=>path.id===s.compare[index]))s.compare[index]=paths[index].id;
 const result=el('div',{class:'migration-comparison-result','aria-live':'polite'});
 const choices=paths.map(path=>[path.id,path.title]);
 const choose=(index,value)=>{s.compare[index]=value;ctx.save();draw();};
 ctx.container.append(el('div',{class:'tool-grid migration-controls'},select(ctx,'migration-compare-left',words.left,choices,s.compare[0],value=>choose(0,value)),select(ctx,'migration-compare-right',words.right,choices,s.compare[1],value=>choose(1,value))),result);
 function draw(){
  result.replaceChildren();
  const [left,right]=s.compare.map(id=>paths.find(path=>path.id===id));
  if(!left||!right)return;
  if(left.id===right.id){result.append(note(ctx,words.same,'warning'));return;}
  const selected=new Set(s.compare);
  if(selected.has('pmzh')&&selected.has('vnz'))result.append(note(ctx,words.sequence));
  const table=el('table',{class:'migration-comparison'},el('caption',{},t(ctx,words.comparison)),el('thead',{},el('tr',{},el('th',{scope:'col'},t(ctx,words.property)),el('th',{scope:'col'},t(ctx,left.title)),el('th',{scope:'col'},t(ctx,right.title)))));
  table.append(el('tbody',{},['what','first','proof','authority','limits'].map(key=>el('tr',{},el('th',{scope:'row'},t(ctx,words[key])),el('td',{},t(ctx,left[key])),el('td',{},t(ctx,right[key]))))));
  result.append(el('p',{class:'migration-scroll-hint'},t(ctx,words.scroll)),el('div',{class:'migration-table-scroll',tabindex:0,role:'region','aria-label':t(ctx,words.comparison)},table),sourceBox(ctx,[...(left.sourceIds||[]),...(right.sourceIds||[])]));
 }
 draw();
}

export function documentReadiness(ctx){
 clearProgress(ctx);
 const s=stateFor(ctx),packages=Array.isArray(documentPackages)?documentPackages:[];
 ctx.container.append(note(ctx,words.packageIntro));
 if(!packages.length){ctx.container.append(note(ctx,words.empty));return;}
 if(!packages.some(item=>item.id===s.packageId))s.packageId=packages[0].id;
 const body=el('section',{class:'migration-package'});
 ctx.container.append(select(ctx,'migration-package',words.package,packages.map(item=>[item.id,item.title]),s.packageId,value=>{s.packageId=value;ctx.save();draw();}),body,note(ctx,words.listScope));
 function draw(){
  const pack=packages.find(item=>item.id===s.packageId);
  if(!pack)return;
  body.replaceChildren(el('h3',{},t(ctx,pack.title)),note(ctx,pack.description));
  const result=el('section',{class:'migration-readiness-result','aria-live':'polite'});
  const controls=el('div',{class:'migration-document-list'});
  for(const item of pack.items||[]){
   const key=`${pack.id}:${item.id}`,value=['have','missing','uncertain','renew'].includes(s.documents[key])?s.documents[key]:'uncertain';
   const row=el('fieldset',{class:'migration-document-row'},el('legend',{},t(ctx,item.title)));
   if(item.required===false)row.append(el('p',{class:'migration-optional'},t(ctx,words.optional)));
   if(item.hint)row.append(el('p',{class:'migration-document-hint'},t(ctx,item.hint)));
   row.append(select(ctx,`migration-doc-${pack.id}-${item.id}`,tri('Состояние документа','Құжаттың күйі','Document availability'),['uncertain','have','missing','renew'].map(status=>[status,words[status]]),value,next=>{s.documents[key]=next;ctx.save();summary();}));
   controls.append(row);
  }
  body.append(controls,result,sourceBox(ctx,pack.sourceIds||[]));
  function summary(){
   const review=documentReadinessSummary(pack.items,s.documents,pack.id);
   result.replaceChildren(el('h3',{},t(ctx,words.summary)),el('p',{},`${t(ctx,words.counted)}: ${review.have.length} / ${review.requiredCount}`));
   for(const key of ['missing','renew','uncertain'])if(review[key].length)result.append(el('h4',{},t(ctx,words[key+'Title'])),el('ul',{},review[key].map(item=>el('li',{},t(ctx,item.title)))));
   if(!review.hasUnresolved&&review.requiredCount>0)result.append(note(ctx,words.noGaps));
  }
  summary();
 }
 draw();
}

export function documentExpiry(ctx){
 clearProgress(ctx);
 const s=stateFor(ctx);
 if(!documentTypes.includes(s.expiryType))s.expiryType='vnz';
 if(!reminderOptions.includes(Number(s.remindDays)))s.remindDays='30';
 const result=el('section',{class:'migration-expiry-result','aria-live':'polite'}),references=el('div',{class:'migration-expiry-sources'});
 const date=field(ctx,'migration-expiry-date',words.expiryDate,el('input',{type:'date',value:s.expiryDate||'',oninput:event=>{s.expiryDate=event.target.value;ctx.save();draw();}}),words.dateHint);
 const reminders=reminderOptions.map(days=>[String(days),tri(`За ${days} календарных дней`,`${days} күнтізбелік күн бұрын`,`${days} calendar days before`)]);
 ctx.container.append(note(ctx,words.expiryIntro),el('div',{class:'tool-grid migration-controls'},select(ctx,'migration-expiry-type',words.documentType,documentTypes.map(type=>[type,words[type]]),s.expiryType,value=>{s.expiryType=value;ctx.save();draw();}),date.wrap,select(ctx,'migration-expiry-reminder',words.remind,reminders,s.remindDays,value=>{s.remindDays=value;ctx.save();draw();})),result,note(ctx,words.dateScope),references);
 function draw(){
  result.replaceChildren();
  references.replaceChildren(sourceBox(ctx,(residencePaths.find(path=>path.id===s.expiryType)?.sourceIds)||[]));
  const today=currentISO(),review=documentExpiryResult(s.expiryDate,s.remindDays,today);
  const bad=Boolean(s.expiryDate)&&!review;
  date.error.textContent=bad?t(ctx,words.invalidDate):'';date.input.setAttribute('aria-invalid',String(bad));
  if(!review)return;
  const format=value=>new Intl.DateTimeFormat(ctx.lang==='kk'?'kk-KZ':ctx.lang==='en'?'en-GB':'ru-RU',{dateStyle:'long',timeZone:'UTC'}).format(dateValue(value));
  result.append(el('p',{class:'migration-device-date'},`${t(ctx,words.todayLabel)}: ${format(today)}`));
  const status=el('div',{class:`migration-date-state migration-date-state--${review.status}`});
  if(review.status==='upcoming')status.append(el('p',{class:'migration-day-number'},String(review.days)),el('p',{},t(ctx,words.remaining)));
  else if(review.status==='today')status.append(el('p',{class:'migration-day-number'},'0'),el('p',{},t(ctx,words.expiresToday)));
  else status.append(el('strong',{},t(ctx,words.expired)),el('p',{},`${t(ctx,words.ago)}: ${Math.abs(review.days)}`));
  result.append(status);
  if(review.status==='expired'){result.append(note(ctx,words.expiredExport));return;}
  result.append(el('p',{},`${t(ctx,words.remindDate)}: ${format(review.reminderDate)}`));
  if(review.reminderInPast)result.append(note(ctx,words.pastReminder,'warning'));
  result.append(button(ctx,words.download,()=>{
   const content=buildDocumentExpiryICS({date:s.expiryDate,remindDays:s.remindDays,today:currentISO(),documentLabel:t(ctx,words[s.expiryType]),lang:ctx.lang});
   if(content)download('migrato-document-reminder.ics',content,'text/calendar;charset=utf-8');else draw();
  }),note(ctx,words.importHint));
 }
 draw();
}
