import {el,t,tri,button,focusTarget,relevantActions,planSummary} from './shared.js';
import {BARYS_SVG} from './barys.js';

let pending=null,active=null;
const words={
 title:tri('Поздравляем! Вы у Байтерека!','Құттықтаймыз! Сіз Бәйтерекке жеттіңіз!','Congratulations! You reached Baiterek!'),
 kicker:tri('Ваш маршрут пройден','Жолыңыз аяқталды','Your journey is complete'),
 message:tri('Девять важных шагов позади. Барыс рад быть вашим проводником — пусть новая глава в Казахстане начнётся спокойно и уверенно.','Тоғыз маңызды қадам артта қалды. Барыс жолсерігіңіз болғанына қуанышты. Қазақстандағы жаңа өміріңіз жайлы әрі сенімді басталсын.','Nine important steps completed. Barys is happy to be your guide. May your new chapter in Kazakhstan begin with calm and confidence.'),
 note:tri('Вы отметили действия как выполненные. Подтверждения подачи и приёма документов выдаются соответствующими организациями.','Әрекеттерді орындалды деп өзіңіз белгіледіңіз. Құжаттардың берілгені мен қабылданғанын тиісті ұйымдар растайды.','You marked the actions complete. The relevant organisations provide confirmation of document submission and acceptance.'),
 close:tri('Вернуться к маршруту','Жоспарға оралу','Back to my journey'),dismiss:tri('Закрыть поздравление','Құттықтауды жабу','Close congratulations')
};
function paused(){return document.documentElement.dataset.motion==='paused'||globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;}
export function closeCelebration(){
 clearTimeout(pending);pending=null;
 if(active){const dialog=active;active=null;if(dialog.open&&typeof dialog.close==='function')dialog.close();dialog.remove();}
}
export function celebrateJourney(ctx,{delay=0,onShown}={}){
 closeCelebration();
 const trigger=document.activeElement,scheduledTool=ctx.toolId;
 const show=()=>{
  pending=null;
  if(!document.getElementById('tool-dialog')?.open||!planSummary(ctx.state).finished||ctx.toolId!==scheduledTool||document.querySelector('dialog[open]:not(#tool-dialog)'))return;
  const dialog=el('dialog',{class:'journey-celebration','aria-labelledby':'celebration-title','aria-describedby':'celebration-message'});
  const fireworks=el('div',{class:'celebration-fireworks','aria-hidden':'true'});
  for(let burst=0;burst<5;burst++){
   const group=el('span',{class:'firework-burst',style:`--burst-x:${[12,83,50,22,78][burst]}%;--burst-y:${[26,22,8,67,66][burst]}%;--delay:${burst*.16}s;--hue:${burst%2?'#91d3eb':'#f4d386'}`});
   for(let ray=0;ray<10;ray++)group.append(el('i',{style:`--angle:${ray*36}deg`}));
   fireworks.append(group);
  }
  const art=el('div',{class:'celebration-art','aria-hidden':'true'});
  art.innerHTML='<svg viewBox="0 0 140 180" class="celebration-baiterek"><circle cx="70" cy="37" r="30"/><path d="M39 62 57 145H83L101 62M49 60 63 145M91 60 77 145M35 151H105M59 145V167M81 145V167M44 172H96"/></svg>';
  const mascot=el('span',{class:'barys-character barys--success'});mascot.innerHTML=BARYS_SVG;art.append(mascot);
  const close=button(ctx,words.dismiss,()=>dialog.close(),{class:'celebration-close','aria-label':t(ctx,words.dismiss)});close.textContent='×';
  const content=el('div',{class:'celebration-content'},close,art,el('p',{class:'celebration-kicker'},t(ctx,words.kicker)),el('h2',{id:'celebration-title'},t(ctx,words.title)),el('p',{id:'celebration-message'},t(ctx,tri('Вы отметили все шаги своего учебного плана. Сверьте реальные подтверждения и актуальные требования у компетентных организаций.','Оқу жоспарының барлық қадамын белгіледіңіз. Нақты растаулар мен өзекті талаптарды құзыретті ұйымдардан тексеріңіз.','You marked every step of your learning plan. Check real confirmations and current requirements with the competent organisations.'))),button(ctx,words.close,()=>dialog.close(),{class:'button celebration-return'}),el('p',{class:'celebration-note'},t(ctx,words.note)));
  dialog.append(fireworks,content);document.body.append(dialog);active=dialog;
  dialog.addEventListener('close',()=>{if(active===dialog)active=null;dialog.remove();focusTarget(trigger?.isConnected?trigger:document.getElementById('journey-stop-life')||document.getElementById('tool-title'),{preventScroll:true});},{once:true});
  if(typeof dialog.showModal==='function')dialog.showModal();else{dialog.setAttribute('open','');dialog.setAttribute('role','dialog');dialog.setAttribute('aria-modal','true');}
  onShown?.();
  focusTarget(content.querySelector('.celebration-return'),{preventScroll:true});
 };
 if(delay&&!paused())pending=setTimeout(show,delay);else show();
}
