import {requestGroups,buildRequestText} from '../data/requests.js';
import {el,t,tri,labels,button,note,field,select,numberValue} from './shared.js';

const words={
 phrasesIntro:tri('Соберите обращение из готовых фраз. Личные данные и свободный текст не нужны.','Дайын тіркестерден өтініш құрыңыз. Жеке деректер мен еркін мәтін қажет емес.','Build a request from ready-made phrases. No personal details or free text are needed.'),situation:tri('Ситуация','Жағдай','Situation'),outputLanguage:tri('Язык обращения','Өтініш тілі','Request language'),rental:tri('Аренда жилья','Баспана жалдау','Renting a home'),phrasesSelect:tri('Выберите фразы','Тіркестерді таңдаңыз','Choose phrases'),output:tri('Ваше обращение','Өтінішіңіз','Your request'),copy:tri('Копировать текст','Мәтінді көшіру','Copy text'),print:tri('Распечатать','Басып шығару','Print'),copied:tri('Текст скопирован.','Мәтін көшірілді.','Text copied.'),copyFallback:tri('Автоматическое копирование недоступно. Текст выделен: нажмите Ctrl+C или ⌘C, на телефоне выберите «Копировать».','Автоматты көшіру қолжетімсіз. Мәтін таңдалды: Ctrl+C немесе ⌘C басыңыз, телефонда «Көшіру» таңдаңыз.','Automatic copying is unavailable. The text is selected: press Ctrl+C or ⌘C, or choose Copy on your phone.'),emptyPhrase:tri('Отметьте хотя бы одну фразу.','Кемінде бір тіркесті белгілеңіз.','Select at least one phrase.'),phraseDisclaimer:tri('Готовые фразы помогают задать вопрос. Они не являются заявлением установленной формы или юридическим заключением.','Дайын тіркестер сұрақ қоюға көмектеседі. Олар белгіленген нысандағы өтініш немесе заң қорытындысы емес.','These phrases help you ask a question. They are not an official application form or legal opinion.')
};
Object.assign(words,{
 service:tri('ЦОН и государственные услуги','ХҚКО және мемлекеттік қызметтер','Public service centre'),bank:tri('Банк','Банк','Bank'),medical:tri('Медицинская организация','Медициналық ұйым','Healthcare provider'),

});
export function calculateBudget(values) {
 const monthlyKeys=['rent','utilities','food','transport','connection','other'];
 const normalized={};for(const key of [...monthlyKeys,'deposit','oneoff','reserve']){const n=numberValue(values[key]);if(n===null)return null;normalized[key]=n;}
 const cents=key=>Math.round(normalized[key]*100);
 const monthly=monthlyKeys.reduce((sum,key)=>sum+cents(key),0);
 return {monthly:monthly/100,first:(monthly+cents('deposit')+cents('oneoff')+cents('reserve'))/100};
}
const budgetWords={
 intro:tri('Посчитайте, сколько денег вам нужно на переезд и жизнь в Казахстане. Введите собственные суммы в тенге: это личный план, а не средние цены или обязательные платежи.','Қазақстанға көшуге және онда тұруға қанша ақша қажет екенін есептеңіз. Өз сомаларыңызды теңгемен енгізіңіз: бұл орташа баға немесе міндетті төлем емес, жеке жоспар.','Plan how much money you need to move to and live in Kazakhstan. Enter your own amounts in tenge: these are not average prices or mandatory charges.'),
 monthlySection:tri('1. Расходы на обычный месяц','1. Әдеттегі айдың шығындары','1. Costs for a typical month'),
 monthlyHint:tri('Что будете оплачивать каждый месяц после переезда. Если расхода нет, укажите 0.','Көшкеннен кейін ай сайын төлейтін шығындар. Шығын болмаса, 0 енгізіңіз.','What you expect to pay each month after moving. Enter 0 for a cost you do not have.'),
 initialSection:tri('2. Дополнительные деньги на переезд','2. Көшуге қажет қосымша ақша','2. Extra cash for moving'),
 initialHint:tri('Эти суммы прибавляются только к первому месяцу. Не включайте сюда аренду и питание, уже указанные выше.','Бұл сомалар тек бірінші айға қосылады. Жоғарыда көрсетілген жалдау ақысы мен тамақты қайта қоспаңыз.','These amounts are added only to the first month. Do not enter rent or food again if they are already listed above.'),
 rent:tri('Аренда жилья за месяц, ₸','Бір айлық баспана ақысы, ₸','Monthly rent, ₸'),
 utilities:tri('Коммунальные услуги за месяц, ₸','Бір айлық коммуналдық төлемдер, ₸','Monthly utilities, ₸'),
 food:tri('Питание за месяц, ₸','Бір айлық тамақ шығыны, ₸','Monthly food, ₸'),
 transport:tri('Транспорт за месяц, ₸','Бір айлық көлік шығыны, ₸','Monthly transport, ₸'),
 connection:tri('Связь и интернет за месяц, ₸','Бір айлық байланыс пен интернет, ₸','Monthly phone and internet, ₸'),
 other:tri('Другие ежемесячные расходы, ₸','Басқа айлық шығындар, ₸','Other monthly costs, ₸'),
 deposit:tri('Обеспечительный платёж за жильё, если нужен, ₸','Баспана үшін кепіл төлемі, қажет болса, ₸','Housing security deposit, if required, ₸'),
 oneoff:tri('Разовые расходы на переезд, ₸','Көшуге арналған біржолғы шығындар, ₸','One-off moving costs, ₸'),
 reserve:tri('Сумма, которую хотите оставить в запасе, ₸','Қорда қалдырғыңыз келетін сома, ₸','Money you want to keep in reserve, ₸'),
 rentHint:tri('Сумма из выбранного предложения аренды. При проживании без арендной платы — 0.','Таңдалған жалдау ұсынысындағы сома. Баспанаға ақы төлемесеңіз — 0.','Use the amount from the rental offer you are considering. Enter 0 if you do not pay rent.'),
 utilitiesHint:tri('Вода, электричество, отопление и другие счета, если платите их отдельно от аренды.','Жалдау ақысынан бөлек төлесеңіз: су, электр, жылу және басқа шоттар.','Water, electricity, heating and other bills paid separately from rent.'),
 foodHint:tri('Ваш план на продукты и питание на один месяц.','Бір айға арналған азық-түлік пен тамақ жоспарыңыз.','Your own estimate for groceries and meals for one month.'),
 transportHint:tri('Проезд, такси или другие регулярные поездки за месяц.','Бір айлық жолақы, такси немесе тұрақты сапарлар.','Monthly public transport, taxis or other regular journeys.'),
 connectionHint:tri('Суммарно мобильный тариф и домашний интернет, которые будете оплачивать сами.','Өзіңіз төлейтін ұялы байланыс пен үй интернетінің жалпы сомасы.','The total phone plan and home internet bills you will pay yourself.'),
 otherHint:tri('Например, ваши регулярные расходы на учёбу или лекарства. Не дублируйте предыдущие поля.','Мысалы, оқуға немесе дәріге тұрақты шығындарыңыз. Алдыңғы өрістерді қайталамаңыз.','For example, your regular study or medication costs. Do not repeat amounts from the other fields.'),
 depositHint:tri('Иногда арендодатель просит отдельную сумму как обеспечение. Условия возврата определяются договором. Это не вторая арендная плата. Укажите сумму из своего договора; если такого платежа нет — 0.','Кейде жалға беруші бөлек кепіл сомасын сұрайды. Қайтару шарттары шартта анықталады. Бұл екінші жалдау ақысы емес. Шартыңыздағы соманы енгізіңіз; мұндай төлем болмаса — 0.','A landlord may ask for a separate security payment. Its return depends on the agreement. It is not a second rent payment. Enter the amount from your agreement, or 0 if there is no such payment.'),
 oneoffHint:tri('Например, дорога, перевод документов или покупка необходимых вещей. Введите общий план; тарифы здесь не установлены.','Мысалы, жол, құжат аудармасы немесе қажетті заттар. Жалпы жоспарыңызды енгізіңіз; мұнда тарифтер белгіленбеген.','For example, travel, document translations or essential items. Enter your own total estimate; no official tariffs are set here.'),
 reserveHint:tri('Необязательный запас на непредвиденное. Он остаётся вашими деньгами и не считается обязательной тратой. Если не планируете — 0.','Күтпеген жағдайға арналған міндетті емес қор. Бұл өз ақшаңыз болып қалады, міндетті шығын емес. Жоспарламасаңыз — 0.','An optional buffer for unexpected needs. It remains your money and is not a required expense. Enter 0 if you do not plan one.'),
 monthly:tri('Затем на каждый месяц','Кейінгі әр айға','For each following month'),
 first:tri('Подготовить к первому месяцу','Бірінші айға дайындау','Have available for the first month'),
 firstHint:tri('Обычный месяц + обеспечительный платёж + разовые расходы + запас. Это деньги, которые нужно иметь, а не сумма безвозвратных трат.','Әдеттегі ай + кепіл төлемі + біржолғы шығындар + қор. Бұл қайтарылмайтын шығын емес, қолда болуы қажет ақша.','Typical month + security deposit + one-off costs + reserve. This is cash to have available, not a total of non-refundable spending.'),
 empty:tri('Заполните суммы, чтобы увидеть расчёт. Пустое поле пока не учитывается; это не подтверждённый нулевой расход.','Есепті көру үшін сомаларды толтырыңыз. Бос өріс әзірге есепке алынбайды; ол расталған нөлдік шығын емес.','Enter your amounts to see the calculation. An empty field is not included yet; it is not a confirmed zero cost.'),
 partial:tri('Предварительный расчёт. Ещё не заполнено полей:','Алдын ала есеп. Толтырылмаған өрістер саны:','Provisional estimate. Fields still empty:'),
 complete:tri('Все суммы заполнены. Итог рассчитан по вашему плану.','Барлық сома толтырылған. Қорытынды жеке жоспарыңыз бойынша есептелді.','All amounts are filled in. The result is calculated from your plan.'),
 zeroHint:tri('Для точного итога заполните остальные суммы или укажите 0, если такого расхода нет.','Нақты қорытынды үшін қалған сомаларды толтырыңыз немесе шығын болмаса, 0 енгізіңіз.','For a complete total, fill in the remaining amounts or enter 0 if the cost does not apply.'),
 error:tri('Введите число от 0 до 1 000 000 000 000. Это техническая граница поля, не финансовый лимит.','0 мен 1 000 000 000 000 аралығындағы санды енгізіңіз. Бұл қаржылық шектеу емес, өрістің техникалық шегі.','Enter a number from 0 to 1,000,000,000,000. This is a technical field limit, not a financial restriction.'),
 fix:tri('Исправьте выделенные суммы: итог пока не рассчитан.','Белгіленген сомаларды түзетіңіз: қорытынды әзірге есептелмеді.','Correct the highlighted amounts before calculating the total.'),
 breakdown:tri('Из чего складывается первый месяц','Бірінші айдың сомасы неден тұрады','What makes up the first-month amount'),
 exampleTitle:tri('Показать учебный пример','Оқу мысалын көрсету','Show an example'),
 example:tri('Например: аренда 100 000 ₸ + питание 50 000 ₸ + коммунальные услуги 15 000 ₸ = 165 000 ₸ на обычный месяц. Если дополнительно нужны обеспечительный платёж 100 000 ₸ и разовые расходы 20 000 ₸, к первому месяцу понадобится 285 000 ₸. Остальные поля в этом примере равны 0. Эти цифры только объясняют арифметику, а не рекомендуют цены.','Мысалы: жалдау 100 000 ₸ + тамақ 50 000 ₸ + коммуналдық төлемдер 15 000 ₸ = әдеттегі айға 165 000 ₸. Қосымша кепіл төлемі 100 000 ₸ және біржолғы шығын 20 000 ₸ болса, бірінші айға 285 000 ₸ керек. Мысалдағы басқа өрістер 0. Бұл сандар баға ұсынбайды, тек есептеуді түсіндіреді.','For example: rent 100,000 ₸ + food 50,000 ₸ + utilities 15,000 ₸ = 165,000 ₸ for a typical month. If a 100,000 ₸ security deposit and 20,000 ₸ one-off costs are also needed, have 285,000 ₸ available for the first month. Other fields are 0 in this example. These figures explain the arithmetic; they are not suggested prices.')
};
export function budget(ctx) {
 const s=ctx.state.budget;
 s.scenarios??=[{},{}];
 const values=s.scenarios[0]??(s.scenarios[0]={});
 const keys=['rent','utilities','food','transport','connection','other','deposit','oneoff','reserve'];
 const fields=[];
 const formatter=new Intl.NumberFormat(ctx.lang==='kk'?'kk-KZ':ctx.lang==='en'?'en-GB':'ru-RU',{style:'currency',currency:'KZT',maximumFractionDigits:2});
 const form=el('form',{class:'budget-form',onsubmit:e=>e.preventDefault()});
 for(const [sectionKeys,title,hint] of [[keys.slice(0,6),budgetWords.monthlySection,budgetWords.monthlyHint],[keys.slice(6),budgetWords.initialSection,budgetWords.initialHint]]){
  const panel=el('fieldset',{class:'budget-scenario'},el('legend',{},t(ctx,title)),el('p',{class:'budget-section-hint'},t(ctx,hint)));
  const grid=el('div',{class:'tool-grid budget-fields'});
  for(const key of sectionKeys){
   const control=field(ctx,`budget-0-${key}`,budgetWords[key],el('input',{type:'number',min:0,max:1e12,step:'any',inputmode:'decimal',placeholder:'0',value:values[key]??'',oninput:e=>{values[key]=e.target.validity.badInput?'NaN':e.target.value;ctx.save();update();}}),budgetWords[key+'Hint']);
   fields.push({control,key});grid.append(control.wrap);
  }
  panel.append(grid);form.append(panel);
 }
 const status=el('p',{class:'tool-note budget-status','aria-live':'polite',role:'status'});
 const monthlyValue=el('strong',{'data-budget-total':'monthly'},'—');
 const firstValue=el('strong',{'data-budget-total':'first'},'—');
 const totals=el('div',{class:'metric-grid budget-totals'},el('div',{class:'metric'},el('span',{},t(ctx,budgetWords.monthly)),monthlyValue),el('div',{class:'metric'},el('span',{},t(ctx,budgetWords.first)),firstValue));
 const breakdown=el('dl',{class:'budget-breakdown'});
 const result=el('section',{class:'budget-summary','aria-label':t(ctx,budgetWords.breakdown)},status,totals,el('p',{class:'budget-section-hint'},t(ctx,budgetWords.firstHint)),el('details',{class:'budget-details'},el('summary',{},t(ctx,budgetWords.breakdown)),breakdown));
 function update(){
  fields.forEach(({control,key})=>{const invalid=numberValue(values[key])===null;control.error.textContent=invalid?t(ctx,budgetWords.error):'';control.input.setAttribute('aria-invalid',String(invalid));});
  const total=calculateBudget(values),empty=keys.filter(key=>values[key]===null||values[key]===undefined||String(values[key]).trim()==='').length;
  const untouched=empty===keys.length;
  status.className='tool-note budget-status'+(!total?' warning':'');
  status.textContent=!total?t(ctx,budgetWords.fix):untouched?t(ctx,budgetWords.empty):empty?`${t(ctx,budgetWords.partial)} ${empty}. ${t(ctx,budgetWords.zeroHint)}`:t(ctx,budgetWords.complete);
  monthlyValue.textContent=total&&!untouched?formatter.format(total.monthly):'—';
  firstValue.textContent=total&&!untouched?formatter.format(total.first):'—';
  breakdown.replaceChildren();
  if(!total||untouched)return;
  for(const key of keys){
   const blank=values[key]===null||values[key]===undefined||String(values[key]).trim()==='';
   breakdown.append(el('dt',{},t(ctx,budgetWords[key])),el('dd',{},blank?'—':formatter.format(numberValue(values[key]))));
  }
 }
 ctx.container.append(note(ctx,budgetWords.intro),el('details',{class:'budget-example'},el('summary',{},t(ctx,budgetWords.exampleTitle)),el('p',{},t(ctx,budgetWords.example))),form,result);
 update();
}

const requestWords={
 intro:tri('Подготовьте понятный запрос для официальной консультации: выберите миграционную тему, отметьте нужные вопросы и получите связный текст. Ничего не отправляется автоматически.','Ресми кеңеске түсінікті сұрау дайындаңыз: көші-қон тақырыбын таңдап, қажет сұрақтарды белгілеңіз. Мәтін автоматты түрде жіберілмейді.','Prepare a clear enquiry for an official consultation: choose a migration topic and the questions you need. Nothing is sent automatically.'),
 situation:tri('По какому вопросу хотите обратиться?','Қандай мәселе бойынша жүгінгіңіз келеді?','What would you like to ask about?'),
 questions:tri('Отметьте нужные вопросы','Қажет сұрақтарды белгілеңіз','Select the questions you need'),
 chooseAll:tri('Выбрать все вопросы этой темы','Осы тақырыптағы барлық сұрақты таңдау','Select all questions in this topic'),
 clear:tri('Снять выбор в этой теме','Осы тақырыптағы таңдауды алып тастау','Clear this topic’s selection'),
 preview:tri('Готовый текст для консультации','Кеңеске арналған дайын мәтін','Your enquiry for the consultation'),
 empty:tri('Отметьте вопросы выше — здесь появится запрос с целью обращения, выбранными вопросами и заключением.','Жоғарыдағы сұрақтарды белгілеңіз — мұнда мақсат, сұрақтар мен қорытындысы бар сұрау пайда болады.','Select questions above to create an enquiry with your purpose, chosen questions and a closing request.'),
 count:tri('Вопросов в обращении','Сұраудағы сұрақтар','Questions in the enquiry'),
 disclaimer:tri('Это шаблон вопросов для консультации. Он не заменяет заявление установленной формы, не подаёт документы и не определяет ваше право на статус. Личные данные на сайте не нужны.','Бұл кеңес алуға арналған сұрақтар үлгісі. Ол белгіленген өтініш нысанын алмастырмайды, құжаттарды тапсырмайды және мәртебеге құқықты анықтамайды. Сайтқа жеке деректер қажет емес.','This is a consultation enquiry template. It is not an official application, does not submit documents and does not determine eligibility. No personal details are needed on this site.')
};
export function phrases(ctx) {
 const s=ctx.state.phrases;
 s.selected??={};
 const group=requestGroups.find(item=>item.situation===s.situation)||requestGroups[0];
 s.situation=group.situation;
 const textLang=['ru','kk','en'].includes(s.lang)?s.lang:ctx.lang;
 const selectedKey=id=>group.situation+':'+id;
 ctx.container.append(note(ctx,requestWords.intro));
 ctx.container.append(el('div',{class:'tool-grid request-selectors'},select(ctx,'phrase-situation',requestWords.situation,requestGroups.map(item=>[item.situation,item.title]),group.situation,v=>{s.situation=v;ctx.save();ctx.render();}),select(ctx,'phrase-language',words.outputLanguage,[['ru',tri('Русский','Орысша','Russian')],['kk',tri('Қазақша','Қазақша','Kazakh')],['en',tri('English','Ағылшынша','English')]],textLang,v=>{s.lang=v;ctx.save();ctx.render();})));
 ctx.container.append(el('p',{class:'request-topic-description'},t(ctx,group.description)));
 const output=el('textarea',{class:'phrase-output request-output',rows:14,readonly:true,'aria-label':t(ctx,requestWords.preview),placeholder:t(ctx,requestWords.empty)});
 const printOutput=el('div',{class:'phrase-print-output','aria-hidden':'true'});
 const status=el('p',{class:'field-error','aria-live':'polite'});
 const count=el('p',{class:'request-count','aria-live':'polite'});
 const choices=el('fieldset',{class:'request-questions'},el('legend',{},t(ctx,requestWords.questions)));
 const controls=[];
 function selectedIds(){return group.phrases.filter(item=>s.selected[selectedKey(item.id)]===true).map(item=>item.id);}
 function update(){
  const ids=selectedIds();
  output.value=buildRequestText({situation:group.situation,selectedIds:ids,lang:textLang});
  printOutput.textContent=output.value;
  count.textContent=`${t(ctx,requestWords.count)}: ${ids.length} / ${group.phrases.length}`;
  status.textContent='';
 }
 group.phrases.forEach(phrase=>{
  const control=el('input',{type:'checkbox',checked:s.selected[selectedKey(phrase.id)]===true,onchange:e=>{s.selected[selectedKey(phrase.id)]=e.target.checked;ctx.save();update();}});
  controls.push({id:phrase.id,control});
  choices.append(el('label',{class:'task-row request-question'},control,el('span',{},t(ctx,phrase.text))));
 });
 function setAll(value){for(const {id,control} of controls){control.checked=value;s.selected[selectedKey(id)]=value;}ctx.save();update();}
 choices.append(el('div',{class:'request-selection-actions'},button(ctx,requestWords.chooseAll,()=>setAll(true)),button(ctx,requestWords.clear,()=>setAll(false))));
 const copy=button(ctx,words.copy,async()=>{
  if(!output.value){status.textContent=t(ctx,words.emptyPhrase);return;}
  try {if(!navigator.clipboard?.writeText)throw new Error('clipboard-unavailable');await navigator.clipboard.writeText(output.value);status.textContent=t(ctx,words.copied);ctx.announce(t(ctx,words.copied));}
  catch {output.focus();output.select();status.textContent=t(ctx,words.copyFallback);ctx.announce(t(ctx,words.copyFallback));}
 });
 const print=button(ctx,words.print,()=>{if(!output.value){status.textContent=t(ctx,words.emptyPhrase);return;}document.body.classList.add('printing-tool');window.print();document.body.classList.remove('printing-tool');});
 const result=el('section',{class:'request-preview'},el('h3',{},t(ctx,requestWords.preview)),count,output,printOutput,el('div',{class:'tool-actions'},copy,print),status);
 ctx.container.append(choices,result,note(ctx,requestWords.disclaimer));
 update();
}
