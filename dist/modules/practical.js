import {phrasebook} from '../data/content.js';
import {el,t,tri,labels,button,note,field,select,numberValue} from './shared.js';

const words={
 budgetIntro:tri('Сравните два собственных бюджета в тенге. Поля не содержат средних рыночных цен. Суммы можно оставить пустыми — они будут равны нулю.','Теңгемен екі жеке бюджетті салыстырыңыз. Өрістерде орташа нарықтық бағалар жоқ. Өрісті бос қалдыруға болады — ол нөлге тең болады.','Compare two budgets using your own amounts in tenge. No average market prices are provided. Empty amounts count as zero.'),a:tri('Вариант A','A нұсқасы','Scenario A'),b:tri('Вариант B','B нұсқасы','Scenario B'),rent:tri('Аренда в месяц, ₸','Айлық жалдау ақысы, ₸','Monthly rent, ₸'),utilities:tri('Коммунальные услуги в месяц, ₸','Айлық коммуналдық төлемдер, ₸','Monthly utilities, ₸'),food:tri('Питание в месяц, ₸','Айлық тамақ шығыны, ₸','Monthly food, ₸'),transport:tri('Транспорт в месяц, ₸','Айлық көлік шығыны, ₸','Monthly transport, ₸'),connection:tri('Связь в месяц, ₸','Айлық байланыс шығыны, ₸','Monthly phone and internet, ₸'),other:tri('Другие расходы в месяц, ₸','Басқа айлық шығындар, ₸','Other monthly costs, ₸'),deposit:tri('Возвратный депозит, ₸','Қайтарылатын депозит, ₸','Refundable deposit, ₸'),oneoff:tri('Другие разовые расходы, ₸','Басқа біржолғы шығындар, ₸','Other one-off costs, ₸'),monthly:tri('Ежемесячно','Ай сайын','Monthly total'),first:tri('Деньги на первый месяц','Бірінші айға қажет ақша','Cash needed for the first month'),formula:tri('Первый месяц = ежемесячные расходы + депозит + разовые расходы. Возвратный депозит включён в потребность в деньгах, но не считается невозвратной тратой.','Бірінші ай = айлық шығындар + депозит + біржолғы шығындар. Қайтарылатын депозит қажетті ақшаға қосылады, бірақ қайтарылмайтын шығын болып саналмайды.','First month = monthly costs + deposit + one-off costs. The refundable deposit is included in the cash needed, but is not treated as a non-refundable expense.'),amountError:tri('Введите конечную сумму от 0 до 1 000 000 000 000.','0 мен 1 000 000 000 000 арасындағы ақырлы соманы енгізіңіз.','Enter a finite amount from 0 to 1,000,000,000,000.'),fix:tri('Исправьте выделенные суммы для расчёта.','Есептеу үшін белгіленген сомаларды түзетіңіз.','Correct the highlighted amounts to calculate.'),difference:tri('Разница первого месяца B − A','Бірінші ай айырмасы B − A','First-month difference B − A'),
 phrasesIntro:tri('Соберите обращение из готовых фраз. Личные данные и свободный текст не нужны.','Дайын тіркестерден өтініш құрыңыз. Жеке деректер мен еркін мәтін қажет емес.','Build a request from ready-made phrases. No personal details or free text are needed.'),situation:tri('Ситуация','Жағдай','Situation'),outputLanguage:tri('Язык обращения','Өтініш тілі','Request language'),rental:tri('Аренда жилья','Баспана жалдау','Renting a home'),phrasesSelect:tri('Выберите фразы','Тіркестерді таңдаңыз','Choose phrases'),output:tri('Ваше обращение','Өтінішіңіз','Your request'),copy:tri('Копировать текст','Мәтінді көшіру','Copy text'),print:tri('Распечатать','Басып шығару','Print'),copied:tri('Текст скопирован.','Мәтін көшірілді.','Text copied.'),copyFallback:tri('Автоматическое копирование недоступно. Текст выделен: нажмите Ctrl+C или ⌘C, на телефоне выберите «Копировать».','Автоматты көшіру қолжетімсіз. Мәтін таңдалды: Ctrl+C немесе ⌘C басыңыз, телефонда «Көшіру» таңдаңыз.','Automatic copying is unavailable. The text is selected: press Ctrl+C or ⌘C, or choose Copy on your phone.'),emptyPhrase:tri('Отметьте хотя бы одну фразу.','Кемінде бір тіркесті белгілеңіз.','Select at least one phrase.'),phraseDisclaimer:tri('Готовые фразы помогают задать вопрос. Они не являются заявлением установленной формы или юридическим заключением.','Дайын тіркестер сұрақ қоюға көмектеседі. Олар белгіленген нысандағы өтініш немесе заң қорытындысы емес.','These phrases help you ask a question. They are not an official application form or legal opinion.')
};
Object.assign(words,{
 service:tri('ЦОН и государственные услуги','ХҚКО және мемлекеттік қызметтер','Public service centre'),bank:tri('Банк','Банк','Bank'),medical:tri('Медицинская организация','Медициналық ұйым','Healthcare provider'),
 reserve:tri('Резерв на первый месяц, ₸','Бірінші айға резерв, ₸','First-month reserve, ₸'),
 formula:tri('Первый месяц = ежемесячные расходы + возвратный депозит + разовые расходы + резерв. Депозит включён в потребность в деньгах, но не считается невозвратной тратой. Резерв не дублируйте в других полях.','Бірінші ай = айлық шығындар + қайтарылатын депозит + біржолғы шығындар + резерв. Депозит қажетті ақшаға қосылады, бірақ қайтарылмайтын шығын емес. Резервті басқа өрістерде қайталамаңыз.','First-month cash = monthly costs + refundable deposit + one-off costs + reserve. The deposit is cash needed, not a non-refundable expense. Do not repeat the reserve in other fields.')
});
export function calculateBudget(values) {
 const monthlyKeys=['rent','utilities','food','transport','connection','other'];
 const normalized={};for(const key of [...monthlyKeys,'deposit','oneoff','reserve']){const n=numberValue(values[key]);if(n===null)return null;normalized[key]=n;}
 const cents=key=>Math.round(normalized[key]*100);
 const monthly=monthlyKeys.reduce((sum,key)=>sum+cents(key),0);
 return {monthly:monthly/100,first:(monthly+cents('deposit')+cents('oneoff')+cents('reserve'))/100};
}
export function budget(ctx) {
 const s=ctx.state.budget;
 ctx.container.append(note(ctx,words.budgetIntro));
 const form=el('form',{class:'tool-grid',onsubmit:e=>e.preventDefault()}),outputs=[],fields=[];
 const formatter=new Intl.NumberFormat(ctx.lang==='kk'?'kk-KZ':ctx.lang==='en'?'en-GB':'ru-RU',{style:'currency',currency:'KZT',maximumFractionDigits:2});
 function update(){
  fields.forEach(({control,key,index})=>{const invalid=numberValue(s.scenarios[index][key])===null;control.error.textContent=invalid?t(ctx,words.amountError):'';control.input.setAttribute('aria-invalid',String(invalid));});
  const totals=s.scenarios.map(calculateBudget);
  outputs.forEach((out,index)=>{const total=totals[index];out.replaceChildren(...(total?[el('div',{class:'metric'},el('span',{},t(ctx,words.monthly)),el('strong',{},formatter.format(total.monthly))),el('div',{class:'metric'},el('span',{},t(ctx,words.first)),el('strong',{},formatter.format(total.first)))]:[note(ctx,words.fix,'warning')]));});
  difference.textContent=totals.every(Boolean)?`${t(ctx,words.difference)}: ${formatter.format(totals[1].first-totals[0].first)}`:t(ctx,words.fix);
 }
 const difference=el('p',{class:'budget-difference','aria-live':'polite'});
 [0,1].forEach(index=>{
  const panel=el('fieldset',{class:'budget-scenario'},el('legend',{},t(ctx,index?words.b:words.a)));
  for(const key of ['rent','utilities','food','transport','connection','other','deposit','oneoff','reserve']){
   const control=field(ctx,`budget-${index}-${key}`,words[key],el('input',{type:'number',min:0,max:1e12,step:'any',inputmode:'decimal',value:s.scenarios[index][key]??'',oninput:e=>{s.scenarios[index][key]=e.target.validity.badInput?'NaN':e.target.value;ctx.save();update();}}));
   fields.push({control,key,index});panel.append(control.wrap);
  }
  const output=el('div',{class:'metric-grid','aria-live':'polite'});outputs.push(output);panel.append(output);form.append(panel);
 });
 ctx.container.append(form,difference,note(ctx,words.formula));update();
}

export function phrases(ctx) {
 const s=ctx.state.phrases;
 ctx.container.append(note(ctx,words.phrasesIntro));
 const available=Array.from(new Set(phrasebook.map(p=>p.situation)));
 if(!available.includes(s.situation))s.situation=available[0]||'service';
 ctx.container.append(el('div',{class:'tool-grid'},select(ctx,'phrase-situation',words.situation,available.map(k=>[k,words[k]||tri(k,k,k)]),s.situation,v=>{s.situation=v;ctx.save();ctx.render();}),select(ctx,'phrase-language',words.outputLanguage,[['ru',tri('Русский','Орысша','Russian')],['kk',tri('Қазақша','Қазақша','Kazakh')],['en',tri('English','Ағылшынша','English')]],s.lang||ctx.lang,v=>{s.lang=v;ctx.save();ctx.render();})));
 const groups=phrasebook.filter(g=>g.situation===s.situation),textLang=s.lang||ctx.lang;
 // Migrate old shared phrase IDs only into the currently selected situation.
 for(const key of Object.keys(s.selected)){if(!key.includes(':')){if(s.selected[key])s.selected[s.situation+':'+key]=true;delete s.selected[key];}}
 const selectedKey=id=>s.situation+':'+id;
 const output=el('textarea',{class:'phrase-output',rows:7,readonly:true,'aria-label':t(ctx,words.output)}),printOutput=el('div',{class:'phrase-print-output','aria-hidden':'true'}),status=el('p',{class:'field-error','aria-live':'polite'});
 const choices=el('fieldset',{},el('legend',{},t(ctx,words.phrasesSelect)));
 function update(){output.value=groups.flatMap(g=>g.phrases).filter(p=>s.selected[selectedKey(p.id)]).map(p=>typeof p.text==='string'?p.text:(p.text[textLang]||p.text.ru||'')).join('\n');printOutput.textContent=output.value;status.textContent='';}
 groups.forEach(group=>{choices.append(el('h4',{},t(ctx,group.title)));group.phrases.forEach(phrase=>choices.append(el('label',{class:'task-row'},el('input',{type:'checkbox',checked:s.selected[selectedKey(phrase.id)],onchange:e=>{s.selected[selectedKey(phrase.id)]=e.target.checked;ctx.save();update();}}),typeof phrase.text==='string'?phrase.text:(phrase.text[textLang]||phrase.text.ru||''))));});
 const copy=button(ctx,words.copy,async()=>{
  if(!output.value){status.textContent=t(ctx,words.emptyPhrase);return;}
  try {if(!navigator.clipboard?.writeText)throw new Error('clipboard-unavailable');await navigator.clipboard.writeText(output.value);status.textContent=t(ctx,words.copied);ctx.announce(t(ctx,words.copied));}
  catch {output.focus();output.select();output.setSelectionRange(0,output.value.length);status.textContent=t(ctx,words.copyFallback);ctx.announce(t(ctx,words.copyFallback));}
 });
 const print=button(ctx,words.print,()=>{if(!output.value){status.textContent=t(ctx,words.emptyPhrase);return;}document.body.classList.add('printing-tool');window.addEventListener('afterprint',()=>document.body.classList.remove('printing-tool'),{once:true});window.print();});
 ctx.container.append(choices,el('h3',{},t(ctx,words.output)),output,printOutput,status,el('div',{class:'tool-actions'},copy,print),note(ctx,words.phraseDisclaimer));update();
}
