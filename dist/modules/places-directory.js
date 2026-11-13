import {places} from '../data/content.js';
import {cityNames} from '../data/personas.js';
import {el,t,tri,labels,note,select,button} from './shared.js';

const words={
 title:tri('Полезные адреса и 2ГИС','Пайдалы мекенжайлар және 2GIS','Useful addresses and 2GIS'),
 medicalTitle:tri('Больницы в 2ГИС','Ауруханалар 2GIS-те','Hospitals on 2GIS'),
 intro:tri('Выберите город и организацию. Откройте её название и адрес в 2ГИС, чтобы найти вход и построить маршрут.','Қала мен ұйымды таңдаңыз. Кіреберісті тауып, бағыт құру үшін атауы мен мекенжайын 2GIS-те ашыңыз.','Choose a city and organisation. Open its name and address on 2GIS to find the entrance and directions.'),
 city:tri('Город','Қала','City'),type:tri('Тип организации','Ұйым түрі','Organisation type'),
 service:tri('ЦОН и государственные услуги','ХҚКО және мемлекеттік қызметтер','Public services'),migration:tri('Миграционная служба','Көші-қон қызметі','Migration service'),bank:tri('Банки','Банктер','Banks'),medical:tri('Больницы','Ауруханалар','Hospitals'),
 open:tri('Открыть в 2ГИС','2GIS-те ашу','Open in 2GIS'),official:tri('Официальная информация','Ресми ақпарат','Official information'),count:tri('Организаций','Ұйымдар','Organisations'),
 more:tri('Другие больницы города в 2ГИС','Қаладағы басқа ауруханалар 2GIS-те','Find more hospitals on 2GIS'),
 note:tri('2ГИС откроется в новой вкладке с поиском по названию и адресу. Перед визитом уточните приём, документы и условия обслуживания у организации.','2GIS жаңа қойындыда атауы мен мекенжайы бойынша іздеумен ашылады. Бармас бұрын қабылдау, құжаттар және қызмет шарттарын ұйымнан нақтылаңыз.','2GIS opens in a new tab with a search by name and address. Confirm reception, documents and service terms with the organisation before visiting.')
};
const types=['service','migration','bank','medical'];
export function directoryPlaces(city='all',type='all'){
 const validCity=Object.hasOwn(cityNames,city)?city:'all',validType=types.includes(type)?type:'all';
 return places.filter(place=>(validCity==='all'||place.city===validCity)&&(validType==='all'||place.type===validType));
}
export function place2gisUrl(place){
 if(!place||!Object.hasOwn(cityNames,place.city)||!types.includes(place.type)||!place.name?.ru||!place.address?.ru)return null;
 return `https://2gis.kz/${place.city}/search/${encodeURIComponent(`${place.name.ru} ${place.address.ru}`)}`;
}
export function map(ctx){
 const state=ctx.state.map;
 state.city=Object.hasOwn(cityNames,state.city)?state.city:'all';state.type=types.includes(state.type)?state.type:'all';
 const root=el('section',{class:'places-directory'}),heading=el('h3'),count=el('p',{class:'directory-count',role:'status','aria-live':'polite'}),cards=el('div',{class:'directory-grid'}),more=el('div',{class:'directory-more'});
 const cityField=select(ctx,'map-city',words.city,[['all',labels.all],...Object.entries(cityNames)],state.city,value=>{state.city=value;state.selected=null;ctx.save();renderCards();});
 const typeField=select(ctx,'map-type',words.type,[['all',labels.all],...types.map(type=>[type,words[type]])],state.type,value=>{state.type=value;state.selected=null;ctx.save();renderCards();});
 const quick=button(ctx,words.medicalTitle,()=>{state.type='medical';typeField.querySelector('select').value='medical';state.selected=null;ctx.save();renderCards();ctx.notifyGuide?.({type:'change'});},{class:'button button--plain medical-shortcut'});
 function renderCards(){
  const medical=state.type==='medical';root.classList.toggle('medical-links',medical);heading.textContent=t(ctx,medical?words.medicalTitle:words.title);quick.hidden=medical;
  const filtered=directoryPlaces(state.city,state.type);count.textContent=`${t(ctx,words.count)}: ${filtered.length}`;
  cards.replaceChildren(...filtered.map(place=>{
   const hospital=place.type==='medical';
   const card=el('article',{class:'directory-card','data-place':place.id,...(hospital?{'data-hospital':place.id}:{})},el('p',{class:'eyebrow'},`${t(ctx,cityNames[place.city])} · ${t(ctx,words[place.type])}`),el('h4',{},t(ctx,place.name)),el('p',{class:'directory-address'},t(ctx,place.address)),el('p',{},t(ctx,place.description)));
   if(place.phone)card.append(el('a',{class:'directory-phone',href:`tel:${place.phone.replace(/[^+\d]/g,'')}`},place.phone));
   card.append(el('a',{class:`button button--primary directory-2gis-link${hospital?' medical-2gis-link':''}`,href:place2gisUrl(place),target:'_blank',rel:'noopener noreferrer'},t(ctx,words.open),el('span',{'aria-hidden':'true'},' ↗')),el('a',{class:`directory-official${hospital?' medical-official':''}`,href:place.url,target:'_blank',rel:'noopener noreferrer'},t(ctx,words.official)),el('small',{class:'check-date'},`${t(ctx,labels.checked)}: ${place.checked}`));return card;
  }));
  const cities=medical?(state.city==='all'?Object.keys(cityNames):[state.city]):[];
  more.replaceChildren(...cities.map(city=>el('a',{class:'directory-more-link',href:`https://2gis.kz/${city}/search/${encodeURIComponent('Больницы')}`,target:'_blank',rel:'noopener noreferrer'},`${t(ctx,words.more)} · ${t(ctx,cityNames[city])} ↗`)));
 }
 root.append(heading,note(ctx,words.intro),el('div',{class:'tool-grid'},cityField,typeField),quick,count,cards,more,note(ctx,words.note));ctx.container.append(root);renderCards();
}
