import {el,t,tri,labels} from './shared.js';
const cityNames={astana:tri('Астана','Астана','Astana'),almaty:tri('Алматы','Алматы','Almaty'),shymkent:tri('Шымкент','Шымкент','Shymkent')};
const countries=[['am',tri('Армения','Армения','Armenia')],['az',tri('Азербайджан','Әзербайжан','Azerbaijan')],['by',tri('Беларусь','Беларусь','Belarus')],['kg',tri('Кыргызстан','Қырғызстан','Kyrgyzstan')],['md',tri('Молдова','Молдова','Moldova')],['ru',tri('Россия','Ресей','Russia')],['tj',tri('Таджикистан','Тәжікстан','Tajikistan')],['tm',tri('Туркменистан','Түрікменстан','Turkmenistan')],['ua',tri('Украина','Украина','Ukraine')],['uz',tri('Узбекистан','Өзбекстан','Uzbekistan')],['other',tri('Другая страна','Басқа ел','Another country')],['unknown',tri('Не знаю / уточню','Білмеймін / нақтылаймын','I do not know / will check')]];
const words={
 title:tri('С чего начнётся ваш путь?','Жолыңыз неден басталады?','Where does your journey begin?'),
 city:tri('Город','Қала','City'),citizen:tri('Гражданство','Азаматтық','Citizenship'),
 submit:tri('Настроить мой путеводитель','Жолсілтемемді баптау','Personalise my guide'),
 required:tri('Выберите вариант.','Нұсқаны таңдаңыз.','Choose an option.'),
 local:tri('Только настройки путеводителя. Имя, ИИН и контакты не нужны.','Тек жолсілтеме баптаулары. Атыңыз, ЖСН және байланыс деректері қажет емес.','Guide preferences only. No name, IIN or contact details needed.'),
 selected:tri('Ваш путеводитель','Жолсілтемеңіз','Your guide'),
 change:tri('Изменить профиль','Профильді өзгерту','Change profile'),
 student:tri('Документы для учёбы, жильё и повседневная жизнь.','Оқуға арналған құжаттар, баспана және күнделікті өмір.','Study documents, housing and everyday life.'),
 worker:tri('Порядок трудоустройства, документы, банк и жильё.','Жұмысқа орналасу тәртібі, құжаттар, банк және баспана.','Employment arrangements, documents, banking and housing.'),
 remote:tri('Основание пребывания, зарубежный доход и бытовые задачи.','Болу негізі, шетелдік табыс және күнделікті міндеттер.','Grounds for stay, overseas income and everyday tasks.'),
 relocate:tri('Последовательный план длительного переезда и обустройства.','Ұзақ мерзімге көшу мен орналасудың кезеңдік жоспары.','An ordered plan for a longer move and settling in.')
};
function selectField(ctx,id,title,options,value){
 const input=el('select',{id,required:true,'aria-describedby':id+'-error'},el('option',{value:''},t(ctx,labels.select)),options.map(([key,label])=>el('option',{value:key,selected:value===key},t(ctx,label))));
 input.value=value||'';
 const error=el('span',{id:id+'-error',class:'field-error',role:'alert'});
 return {input,error,node:el('div',{class:'field'},el('label',{for:id},t(ctx,title)),input,error)};
}
export function renderProfile(ctx){
 const host=document.getElementById('profile-panel');if(!host)return;
 host.replaceChildren();
 const profile=ctx.state.profile||{},ready=profile.ready&&ctx.state.category&&profile.city&&profile.citizenship;
 if(ready){
  host.append(el('section',{class:'profile-active'},el('p',{class:'eyebrow'},t(ctx,words.selected)),el('strong',{},t(ctx,labels[ctx.state.category])+' · '+t(ctx,cityNames[profile.city])),el('p',{},t(ctx,words[ctx.state.category])),el('button',{type:'button',class:'text-button',onclick:()=>{ctx.editProfile();document.getElementById('onboard-category')?.focus();}},t(ctx,words.change))));
  const summary=document.getElementById('profile-summary');if(summary)summary.textContent=t(ctx,labels[ctx.state.category])+' · '+t(ctx,cityNames[profile.city]);
  return;
 }
 const form=el('form',{class:'profile-form',novalidate:true},el('h2',{},t(ctx,words.title)));
 const category=selectField(ctx,'onboard-category',labels.category,['student','worker','remote','relocate'].map(id=>[id,labels[id]]),ctx.state.category);
 const city=selectField(ctx,'onboard-city',words.city,Object.entries(cityNames),profile.city);
 const citizen=selectField(ctx,'onboard-citizen',words.citizen,countries,profile.citizenship);
 const fields=[category,city,citizen];
 form.append(el('div',{class:'profile-fields'},fields.map(f=>f.node)),el('button',{type:'submit',class:'button button--primary'},t(ctx,words.submit)),el('p',{class:'profile-privacy'},t(ctx,words.local)));
 form.addEventListener('submit',event=>{
  event.preventDefault();let first;
  fields.forEach(f=>{const bad=!f.input.value;f.error.textContent=bad?t(ctx,words.required):'';f.input.setAttribute('aria-invalid',String(bad));if(bad&&!first)first=f.input;});
  if(first){first.focus();return;}
  ctx.applyProfile({category:category.input.value,city:city.input.value,citizenship:citizen.input.value});
 });
 host.append(form);
}

