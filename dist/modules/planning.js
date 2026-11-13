import {actions,calendarRules} from '../data/content.js';
import {el,t,tri,labels,button,note,sourceBox,field,select,categorySelect,relevantActions,taskList,setProgress,planSummary,parseISO,localISO,download} from './shared.js';
import {renderJourney} from './journey.js';

const words={
 citizenship:tri('Гражданство','Азаматтық','Citizenship'),purpose:tri('Цель приезда','Келу мақсаты','Purpose of arrival'),stay:tri('Планируемая продолжительность, дней','Жоспарланған мерзім, күн','Planned stay, days'),stage:tri('Текущая ситуация','Қазіргі жағдай','Current situation'),before:tri('Готовлюсь к поездке','Сапарға дайындалып жатырмын','Preparing to travel'),arrived:tri('Уже в Казахстане','Қазақстанға келдім','Already in Kazakhstan'),ready:tri('Составить маршрут','Жоспар құру','Create my route'),required:tri('Заполните поле.','Өрісті толтырыңыз.','Complete this field.'),daysError:tri('Укажите целое число от 1 до 3650. Это план, а не разрешённый срок пребывания.','1 мен 3650 арасындағы бүтін санды енгізіңіз. Бұл жоспар, рұқсат етілген болу мерзімі емес.','Enter a whole number from 1 to 3650. This is a plan, not a permitted stay.'),
 scope:tri('Это справочный маршрут по выбранному учебному сценарию. Гражданство и цель сами по себе не определяют право на въезд, работу или срок пребывания. Проверьте визу, основание пребывания и историю въездов по источникам.','Бұл таңдалған оқу сценарийі бойынша ақпараттық жоспар. Азаматтық пен мақсат кіру, жұмыс істеу құқығын немесе болу мерзімін өздігінен анықтамайды. Визаны, болу негізін және кіру тарихын дереккөздер бойынша тексеріңіз.','This is a reference route for the selected learning scenario. Citizenship and purpose alone do not determine entry rights, work rights or permitted stay. Check visa, grounds for stay and entry history against the sources.'),
 priorities:tri('Ваш порядок действий','Іс-қимыл реті','Your action sequence'),plan:tri('Ваш план','Жоспарыңыз','Your plan'),edit:tri('Изменить ответы','Жауаптарды өзгерту','Edit answers'),arrival:tri('Дата въезда','Кіру күні','Entry date'),calculate:tri('Рассчитать даты','Күндерді есептеу','Calculate dates'),invalidDate:tri('Выберите существующую дату въезда.','Нақты кіру күнін таңдаңыз.','Choose a valid entry date.'),notification:tri('Плановая дата проверки уведомления','Хабарламаны тексерудің жоспарланған күні','Planned notification check date'),departure:tri('Плановая дата выезда — ваш ориентир','Жоспарланған шығу күні — жеке бағдарыңыз','Planned departure — your own target'),notLimit:tri('Плановая дата выезда не является юридическим пределом пребывания и не подтверждает законность нахождения в стране.','Жоспарланған шығу күні заңды болу шегі емес және елде болудың заңдылығын растамайды.','Your planned departure is not a legal stay limit and does not confirm lawful presence.'),unsupported:tri('Для этой даты нет полного проверенного рабочего календаря. Уточните выходные, переносы и порядок исчисления срока в официальных источниках. Автоматический срок уведомления не показан.','Бұл күнге толық тексерілген жұмыс күнтізбесі жоқ. Демалыс, ауыстырылған күндер мен мерзімді есептеу тәртібін ресми дереккөздерден нақтылаңыз. Хабарлау мерзімі автоматты түрде көрсетілмейді.','A complete verified working-day calendar is unavailable for this date. Confirm holidays, transferred days and counting rules with official sources. No notification deadline is calculated.'),
 export:tri('Скачать события .ics','Оқиғаларды .ics ретінде жүктеу','Download events .ics'),reminder:tri('Напоминание за день','Бір күн бұрын еске салу','Remind me one day before'),calendarScope:tri('Календарь помогает запланировать раннюю проверку уведомления и вашу дату выезда. Это не расчёт предельного юридического срока. РВП, визы и максимальное пребывание автоматически не рассчитываются.','Күнтізбе хабарламаны ертерек тексеруді және шығу күнін жоспарлауға көмектеседі. Бұл заңды шекті мерзімді есептеу емес. Уақытша тұру, виза және ең ұзақ болу мерзімі автоматты түрде есептелмейді.','This calendar helps plan an early notification check and your departure date. It does not calculate a final legal deadline. Residence, visa and maximum stay dates are not calculated.'),tasks:tri('Задачи по миграции','Көші-қон міндеттері','Migration tasks'),checklist:tri('Ваш чек-лист адаптации','Бейімделу тізіміңіз','Your adaptation checklist'),progress:tri('Общий прогресс','Жалпы прогресс','Overall progress'),days:tri('дней по вашему плану','жоспарланған күн','planned days'),noEvents:tri('Сначала рассчитайте даты.','Алдымен күндерді есептеңіз.','Calculate dates first.')
};
const citizenships=[['',labels.select],['am',tri('Армения','Армения','Armenia')],['az',tri('Азербайджан','Әзербайжан','Azerbaijan')],['by',tri('Беларусь','Беларусь','Belarus')],['kg',tri('Кыргызстан','Қырғызстан','Kyrgyzstan')],['md',tri('Молдова','Молдова','Moldova')],['ru',tri('Россия','Ресей','Russia')],['tj',tri('Таджикистан','Тәжікстан','Tajikistan')],['tm',tri('Туркменистан','Түрікменстан','Turkmenistan')],['ua',tri('Украина','Украина','Ukraine')],['uz',tri('Узбекистан','Өзбекстан','Uzbekistan')],['other',tri('Другая страна','Басқа ел','Another country')],['unknown',tri('Не знаю / уточню','Білмеймін / нақтылаймын','I do not know / will check')]];
const purposes=[['',labels.select],['study',tri('Учёба','Оқу','Study')],['work',tri('Работа в Казахстане','Қазақстанда жұмыс істеу','Work in Kazakhstan')],['remote',tri('Удалённая работа','Қашықтан жұмыс істеу','Remote work')],['settle',tri('Длительное проживание','Ұзақ тұру','Long-term residence')]];

function profileForm(ctx,store,onComplete,withDate=false) {
 const form=el('form',{class:'tool-stack',novalidate:true});
 const originalCategory=ctx.state.category;
 const category=categorySelect(ctx,()=>{store.ready=false;if(ctx.state.profile&&ctx.state.category!==originalCategory){ctx.state.profile.ready=false;ctx.save();ctx.editProfile?.();}});
 const citizen=select(ctx,'profile-citizenship',words.citizenship,citizenships,store.citizenship||'',v=>{store.citizenship=v;store.ready=false;ctx.save();});
 const purpose=select(ctx,'profile-purpose',words.purpose,purposes,store.purpose||'',v=>{store.purpose=v;store.ready=false;ctx.save();});
 const duration=field(ctx,'profile-days',words.stay,el('input',{type:'number',min:1,max:3650,step:1,inputmode:'numeric',value:store.days||'',oninput:e=>{store.days=e.target.value;store.ready=false;ctx.save();}}),words.notLimit);
 let arrival;
 if(withDate)arrival=field(ctx,'calendar-arrival',words.arrival,el('input',{type:'date',value:store.arrival||'',oninput:e=>{store.arrival=e.target.value;store.ready=false;ctx.save();}}));
 const situation=withDate?null:select(ctx,'profile-stage',words.stage,[['before',words.before],['arrived',words.arrived]],store.stage||'before',v=>{store.stage=v;store.ready=false;ctx.save();});
 form.append(el('div',{class:'tool-grid'},category,citizen,purpose,duration.wrap,arrival?.wrap,situation));
 form.append(el('button',{type:'submit',class:'button button-primary'},t(ctx,withDate?words.calculate:words.ready)));
 const invalidate=()=>{store.ready=false;ctx.container.querySelector('[data-profile-result]')?.remove();ctx.progress.replaceChildren();ctx.progress.hidden=true;};
 form.addEventListener('input',invalidate);form.addEventListener('change',invalidate);
 form.addEventListener('submit',event=>{
  event.preventDefault();let first=null;
  for(const id of ['profile-category','profile-citizenship','profile-purpose']){
   const node=form.querySelector(`#${id}`),error=form.querySelector(`#${id}-error`);const bad=!node.value;node.setAttribute('aria-invalid',String(bad));error.textContent=bad?t(ctx,words.required):'';if(bad&&!first)first=node;
  }
  const n=Number(store.days),badDays=!Number.isInteger(n)||n<1||n>3650;
  duration.error.textContent=badDays?t(ctx,words.daysError):'';duration.input.setAttribute('aria-invalid',String(badDays));if(badDays&&!first)first=duration.input;
  if(withDate){const bad=!parseISO(store.arrival);arrival.error.textContent=bad?t(ctx,words.invalidDate):'';arrival.input.setAttribute('aria-invalid',String(bad));if(bad&&!first)first=arrival.input;}
  if(first){first.focus();return;}
  store.ready=true;ctx.save();onComplete();
 });
 return form;
}
export function route(ctx) {
 const s=ctx.state.route;
 if(needsProfile(ctx))return;
 ctx.container.append(note(ctx,words.scope),profileForm(ctx,s,()=>ctx.render()));
 if(!s.ready)return;
 const order=s.stage==='arrived'?['migration','housing','finance','work','life']:['migration','work','housing','finance','life'];
 if(s.purpose==='study'||s.purpose==='work')order.splice(1,order.splice(order.indexOf('work'),1)[0]);
 const list=relevantActions(ctx).slice().sort((a,b)=>order.indexOf(a.group)-order.indexOf(b.group));
 ctx.container.append(el('section',{class:'route-result tool-stack','data-profile-result':''},el('h3',{},t(ctx,words.priorities)),el('p',{},`${t(ctx,labels[ctx.state.category])} · ${t(ctx,citizenships.find(([id])=>id===s.citizenship)?.[1])} · ${t(ctx,purposes.find(([id])=>id===s.purpose)?.[1])} · ${s.days} ${t(ctx,words.days)}`),renderJourney(ctx,list)),note(ctx,labels.local));
 const summary=planSummary(ctx.state);if(summary.supported)setProgress(ctx,summary.done,summary.total);else{ctx.progress.hidden=true;ctx.container.append(note(ctx,tri('Нужны уточнения профиля. Показаны общие задачи; полный процент и финиш недоступны.','Профильді нақтылау қажет. Жалпы тапсырмалар көрсетілген; толық пайыз бен мәреге жету қолжетімсіз.','Profile clarification is needed. General tasks are shown; a final percentage and completion are unavailable.')));}
}

export function notificationDeadline(value,rules=calendarRules) {
 const start=parseISO(value);if(!start||rules.notificationRuleVerified===false||!Array.isArray(rules.verifiedYears)||!Number.isInteger(rules.notificationBusinessDays)||rules.notificationBusinessDays<1)return null;
 let count=0,date=new Date(start),loops=0;
 if(rules.strategy!=='conservative-entry-inclusive'&&rules.countFromNextDay!==false)date.setDate(date.getDate()+1);
 while(loops++<370){
  if(!rules.verifiedYears.includes(date.getFullYear()))return null;
  const iso=localISO(date),weekend=date.getDay()===0||date.getDay()===6;
  const working=(rules.workingDates||[]).includes(iso)||(!weekend&&!(rules.nonWorkingDates||[]).includes(iso));
  if(working)count++;
  if(count===rules.notificationBusinessDays)return iso;
  date.setDate(date.getDate()+1);
 }
 return null;
}
export function escapeICS(value) {return String(value).replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');}
function foldICS(line) {const encoder=new TextEncoder();let current='',out=[];for(const character of line){if(encoder.encode(current+character).length>73){out.push(current);current=' '+character;}else current+=character;}out.push(current);return out.join('\r\n');}
export function buildICS(events,{reminder=false,lang='ru'}={}) {
 const stamp=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
 const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Migrato//Educational calendar//EN','CALSCALE:GREGORIAN'];
 for(const event of events){const date=parseISO(event.date);if(!date)continue;const end=new Date(date);end.setDate(end.getDate()+1);lines.push('BEGIN:VEVENT',`UID:${event.id}-${event.date}@migrato.local`,`DTSTAMP:${stamp}`,`DTSTART;VALUE=DATE:${event.date.replaceAll('-','')}`,`DTEND;VALUE=DATE:${localISO(end).replaceAll('-','')}`,`SUMMARY:${escapeICS(event.title)}`,`DESCRIPTION:${escapeICS(event.description||'')}`);if(reminder)lines.push('BEGIN:VALARM','TRIGGER:-P1D','ACTION:DISPLAY',`DESCRIPTION:${escapeICS(event.title)}`,'END:VALARM');lines.push('END:VEVENT');}
 lines.push('END:VCALENDAR');return lines.map(foldICS).join('\r\n')+'\r\n';
}
export function calendar(ctx) {
 const s=ctx.state.calendar;
 ctx.container.append(note(ctx,calendarRules.notificationExplanation||words.calendarScope),profileForm(ctx,s,()=>ctx.render(),true));
 if(!s.ready)return;
 const entry=parseISO(s.arrival),duration=Number(s.days);if(!entry||!Number.isInteger(duration)||duration<1)return;
 const departure=new Date(entry);departure.setDate(departure.getDate()+duration);
 const deadline=notificationDeadline(s.arrival);
 const events=[];
 if(deadline)events.push({id:'notification',date:deadline,title:t(ctx,words.notification),description:calendarRules.sourceIds.map(id=>id).join(', ')});
 events.push({id:'departure',date:localISO(departure),title:t(ctx,words.departure),description:t(ctx,words.notLimit)});
 const output=el('section',{class:'result-box','data-profile-result':''},el('h3',{},t(ctx,words.plan)));
 if(!deadline)output.append(note(ctx,calendarRules.notificationRuleVerified===false?tri('Автоматический срок уведомления отключён: актуальное правило и порядок отсчёта требуют полной проверки. Уточните срок у принимающей стороны и миграционной службы.','Хабарламаның автоматты мерзімі өшірілген: өзекті ереже мен есептеу тәртібі толық тексеруді қажет етеді. Мерзімді қабылдаушы тарап пен көші-қон қызметінен нақтылаңыз.','The automatic notification deadline is disabled: the current rule and counting method need full verification. Confirm the deadline with your host and migration services.'):words.unsupported,'warning'));
 const formatter=new Intl.DateTimeFormat(ctx.lang==='kk'?'kk-KZ':ctx.lang==='en'?'en-GB':'ru-RU',{dateStyle:'long'});
 output.append(el('ol',{class:'task-list'},events.slice().sort((a,b)=>a.date.localeCompare(b.date)).map(event=>el('li',{class:'task-row'},el('strong',{},event.title),el('time',{datetime:event.date},formatter.format(parseISO(event.date)))))));
 output.append(note(ctx,words.notLimit),sourceBox(ctx,calendarRules.sourceIds));
 const reminder=el('input',{type:'checkbox',checked:s.reminder,onchange:e=>{s.reminder=e.target.checked;ctx.save();}});
 output.append(el('label',{class:'task-row'},reminder,t(ctx,words.reminder)),button(ctx,words.export,()=>download('migrato-calendar.ics',buildICS(events,{reminder:s.reminder,lang:ctx.lang}),'text/calendar;charset=utf-8')));
 const notify=actions.find(a=>['notify','notification','arrival-notification'].includes(a.id));
 output.append(el('h4',{},t(ctx,words.tasks)),taskList(ctx,notify?[notify]:relevantActions(ctx).filter(a=>a.group==='migration')));
 ctx.container.append(output,note(ctx,labels.local));
}
export function checklist(ctx) {
 if(needsProfile(ctx))return;
 ctx.container.append(categorySelect(ctx,()=>{if(ctx.state.profile)ctx.state.profile.ready=false;ctx.save();if(ctx.editProfile)ctx.editProfile();else ctx.render();}),note(ctx,labels.local));
 if(!ctx.state.category){ctx.container.append(note(ctx,labels.empty));return;}
 const list=relevantActions(ctx);
 ctx.container.append(el('h3',{},t(ctx,words.checklist)));
 for(const group of ['migration','finance','housing','work','life']){
  const items=list.filter(a=>a.group===group);if(!items.length)continue;
  ctx.container.append(el('details',{open:true,class:'checklist-group'},el('summary',{},t(ctx,labels[group])),taskList(ctx,items)));
 }
 const summary=planSummary(ctx.state);if(summary.supported)setProgress(ctx,summary.done,summary.total);else{ctx.progress.hidden=true;ctx.container.append(note(ctx,tri('Нужны уточнения профиля. Показаны общие задачи; полный процент и финиш недоступны.','Профильді нақтылау қажет. Жалпы тапсырмалар көрсетілген; толық пайыз бен мәреге жету қолжетімсіз.','Profile clarification is needed. General tasks are shown; a final percentage and completion are unavailable.')));}
}

function needsProfile(ctx){
 if(ctx.state.profile?.ready)return false;
 ctx.container.append(note(ctx,tri('Сначала выберите статус, город и гражданство на главной странице. Затем вернитесь к своему маршруту.','Алдымен басты бетте мәртебе, қала және азаматтықты таңдаңыз. Содан кейін өз жоспарыңызға оралыңыз.','First choose your status, city and citizenship on the home page, then return to your route.')),button(ctx,tri('Выбрать свой профиль','Өз профилімді таңдау','Choose my profile'),()=>ctx.editProfile?.()));
 return true;
}
