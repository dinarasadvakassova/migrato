import {sources,pick} from '../data/content.js';
import {el,tri,labels} from './shared.js';

const instances=new WeakMap();
const words={
 count:tri('Найдено ответов','Табылған жауаптар','Answers found'),from:tri('из','ішінен','of'),empty:tri('Ответов по этому запросу нет. Попробуйте другое слово или выберите все темы.','Бұл сұрау бойынша жауап жоқ. Басқа сөзді қолданыңыз немесе барлық тақырыпты таңдаңыз.','No answers match this search. Try another word or select all topics.'),
 steps:tri('Что сделать','Не істеу керек','What to do'),authority:tri('Куда обратиться','Қайда жүгіну керек','Who to contact'),ask:tri('Что спросить','Не сұрау керек','What to ask'),official:tri('Официальная страница','Ресми парақша','Official page'),search:tri('Поиск по вопросам и ответам','Сұрақтар мен жауаптардан іздеу','Search questions and answers'),category:tri('Тема вопроса','Сұрақ тақырыбы','Question topic')
};
const categories={
 residence:tri('ПМЖ и ВНЖ','Тұрақты тұру және ықтиярхат','Permanent residence and residence card'),temporary:tri('РВП','Уақытша тұру','Temporary residence'),citizenship:tri('Гражданство','Азаматтық','Citizenship'),protection:tri('Беженство и политическое убежище','Босқын мәртебесі және саяси баспана','Refugee status and political asylum'),family:tri('Семья и дети','Отбасы және балалар','Family and children'),
 migration:tri('Миграция и документы','Көші-қон және құжаттар','Migration and documents'),documents:tri('Документы','Құжаттар','Documents'),registration:tri('Уведомление и регистрация','Хабарлама және тіркеу','Notification and registration'),
 banking:tri('Банки и финансы','Банктер және қаржы','Banking and finance'),bank:tri('Банковские услуги','Банк қызметтері','Banking'),finance:tri('Финансы','Қаржы','Finance'),
 housing:tri('Жильё и аренда','Баспана және жалдау','Housing and rental'),rental:tri('Аренда','Жалдау','Rental'),work:tri('Работа','Жұмыс','Work'),employment:tri('Работа','Жұмыс','Work'),study:tri('Учёба','Оқу','Study'),
 health:tri('Медицина','Медицина','Healthcare'),medical:tri('Медицина','Медицина','Healthcare'),life:tri('Повседневная жизнь','Күнделікті өмір','Everyday life'),safety:tri('Безопасность','Қауіпсіздік','Safety'),general:tri('Общие вопросы','Жалпы сұрақтар','General questions')
};
const normalize=(value,lang)=>String(value??'').normalize('NFKC').toLocaleLowerCase(lang==='kk'?'kk-KZ':lang==='en'?'en-GB':'ru-RU').replace(/ё/g,'е').replace(/\s+/g,' ').trim();
export function filterFAQ(items,{lang='ru',query='',category='all'}={}){
 const needle=normalize(query,lang);
 return items.filter(item=>(category==='all'||item.category===category)&&(!needle||normalize([pick(item.question,lang),pick(item.answer,lang),...(item.steps||[]).map(step=>pick(step,lang)),pick(item.authority,lang),pick(item.ask,lang)].join(' '),lang).includes(needle)));
}
function sourceList(item,state){
 const registry=[...state.faqSources,...sources],seen=new Set();
 const rows=(item.sourceIds||[]).map(id=>registry.find(source=>source.id===id)).filter(source=>source&&!seen.has(source.id)&&seen.add(source.id));
 const list=el('ul',{class:'source-list'},rows.map(source=>el('li',{},el('a',{href:source.url,target:'_blank',rel:'noopener noreferrer'},pick(source.title,state.lang)),el('small',{},` ${pick(source.reference,state.lang)}${source.checked?` · ${pick(labels.checked,state.lang)}: ${source.checked}`:''}`),source.verificationScope?el('small',{class:'source-verification'},pick(source.verificationScope,state.lang)):null)));
 if(item.url&&!rows.some(source=>source.url===item.url))list.append(el('li',{},el('a',{href:item.url,target:'_blank',rel:'noopener noreferrer'},pick(words.official,state.lang))));
 return el('aside',{class:'source-box'},el('h4',{},pick(labels.sources,state.lang)),list);
}
export function mountFAQ({lang='ru',container,faq=[],faqSources=[],search=document.getElementById('faq-search'),category=document.getElementById('faq-category')}={}){
 if(!container)return null;
 let state=instances.get(container);
 if(!state){
  state={lang,faq,faqSources,openIds:new Set(),query:search?.value||'',category:category?.value||'all',search,filter:category};
  state.count=el('p',{class:'faq-count','aria-live':'polite',role:'status'});state.results=el('div',{class:'faq-results'});container.replaceChildren(state.count,state.results);
  if(!search){state.search=el('input',{id:'faq-search',type:'search'});container.prepend(el('label',{for:'faq-search'},pick(words.search,lang)),state.search);}
  if(!category){state.filter=el('select',{id:'faq-category'});container.prepend(el('label',{for:'faq-category'},pick(words.category,lang)),state.filter);}
  state.search.addEventListener('input',()=>{state.query=state.search.value;renderFAQ(state);});
  state.filter.addEventListener('change',()=>{state.category=state.filter.value;renderFAQ(state);});
  instances.set(container,state);
 }
 state.lang=lang;state.faq=Array.isArray(faq)?faq:[];state.faqSources=Array.isArray(faqSources)?faqSources:Object.values(faqSources||{});
 const values=[...new Set(state.faq.map(item=>item.category))];
 if(state.category!=='all'&&!values.includes(state.category))state.category='all';
 state.filter.replaceChildren(el('option',{value:'all'},pick(labels.all,lang)),...values.map(value=>el('option',{value},pick(categories[value]||state.faq.find(item=>item.category===value)?.categoryLabel||tri(value,value,value),lang))));
 state.filter.value=state.category;state.search.value=state.query;
 renderFAQ(state);return {refresh:()=>renderFAQ(state),get query(){return state.query;},get category(){return state.category;}};
}
export function openFAQAnswer(container,id){
 const state=instances.get(container),item=state?.faq.find(row=>row.id===id);
 if(!item)return false;
 state.category='all';state.query=pick(item.question,state.lang);
 state.filter.value='all';state.search.value=state.query;renderFAQ(state);
 const details=[...state.results.querySelectorAll('details[data-faq-id]')].find(node=>node.dataset.faqId===id);
 if(!details)return false;
 state.openIds.add(id);details.open=true;
 details.scrollIntoView({block:'start',behavior:document.documentElement.dataset.motion==='paused'?'auto':'smooth'});
 details.querySelector('summary')?.focus({preventScroll:true});return true;
}
function renderFAQ(state){
 state.results.querySelectorAll('details[data-faq-id]').forEach(details=>{if(details.open)state.openIds.add(details.dataset.faqId);else state.openIds.delete(details.dataset.faqId);});
 const found=filterFAQ(state.faq,{lang:state.lang,query:state.query,category:state.category});
 state.count.textContent=`${pick(words.count,state.lang)}: ${found.length} ${pick(words.from,state.lang)} ${state.faq.length}`;
 state.results.replaceChildren();
 if(!found.length){state.results.append(el('p',{class:'faq-empty'},pick(words.empty,state.lang)));return;}
 found.forEach(item=>{
  const body=el('div',{class:'faq-answer'},el('p',{},pick(item.answer,state.lang)));
  if(item.steps?.length)body.append(el('h4',{},pick(words.steps,state.lang)),el('ol',{},item.steps.map(step=>el('li',{},pick(step,state.lang)))));
  body.append(el('h4',{},pick(words.authority,state.lang)),el('p',{},pick(item.authority,state.lang)));
  if(pick(item.ask,state.lang))body.append(el('h4',{},pick(words.ask,state.lang)),el('p',{},pick(item.ask,state.lang)));
  body.append(sourceList(item,state));
  const details=el('details',{class:'faq-item','data-faq-id':item.id,open:state.openIds.has(item.id)},el('summary',{id:`faq-question-${item.id}`},pick(item.question,state.lang)),body);
  details.addEventListener('toggle',()=>{if(details.open)state.openIds.add(item.id);else state.openIds.delete(item.id);});state.results.append(details);
 });
}
