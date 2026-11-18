import {simulation as baseScenes,problems,actions,rentalClauses} from '../data/content.js';
import {quizForCategory,simulationForCategory} from '../data/personas.js';
import {el,t,tri,labels,button,note,sourceBox,taskList,setProgress} from './shared.js';

const words={
 fiction:tri('Учебная история: персонажи и ситуации вымышлены. Действия в игре не означают выполнение реальных процедур.','Оқу оқиғасы: кейіпкерлер мен жағдайлар ойдан шығарылған. Ойындағы әрекеттер нақты рәсімдердің орындалғанын білдірмейді.','Learning story: people and situations are fictional. In-game actions do not complete real procedures.'),decision:tri('Как вы поступите?','Қалай әрекет етесіз?','What will you do?'),retry:tri('Вернуться к выбору','Таңдауға оралу','Try another choice'),help:tri('Разобрать безопасный вариант','Қауіпсіз нұсқаны талдау','Review the safer choice'),helpText:tri('Сравните объяснение с источниками, затем выберите подходящее действие.','Түсіндірмені дереккөздермен салыстырып, тиісті әрекетті таңдаңыз.','Compare the explanation with the sources, then choose an appropriate action.'),good:tri('Подходящее решение','Тиісті шешім','Appropriate decision'),caution:tri('В этой ветке возникла проблема','Бұл тармақта мәселе туындады','This branch leads to a problem'),completed:tri('Путь завершён','Жол аяқталды','Journey completed'),learning:tri('Вы разобрали все этапы. Теперь можно составить собственный справочный маршрут и проверить реальные требования.','Барлық кезеңдерді қарастырдыңыз. Енді өз ақпараттық жоспарыңызды құрып, нақты талаптарды тексеруге болады.','You have reviewed every stage. Build your reference route next and verify the real requirements.'),route:tri('Перейти к маршруту','Жоспарға өту','Open my route'),firstTry:tri('Решений с первой попытки','Алғашқы әрекеттен дұрыс шешімдер','First-attempt decisions'),correct:tri('Верно','Дұрыс','Correct'),incorrect:tri('Неверно','Дұрыс емес','Incorrect'),quizEnd:tri('Результат теста','Тест нәтижесі','Quiz result'),review:tri('Темы для повторения','Қайталауға арналған тақырыптар','Topics to review'),allCorrect:tri('Все ответы верны. Вернитесь к источникам перед применением информации в жизни.','Барлық жауап дұрыс. Ақпаратты өмірде қолданар алдында дереккөздерді қайта тексеріңіз.','All answers are correct. Revisit the sources before applying this information in real life.'),answer:tri('Выберите один ответ. Объяснение появится сразу.','Бір жауапты таңдаңыз. Түсіндірме бірден көрсетіледі.','Choose one answer. An explanation appears immediately.'),issue:tri('С какой темой нужна помощь?','Қай тақырып бойынша көмек қажет?','What do you need help with?'),resetIssue:tri('Выбрать другую проблему','Басқа мәселені таңдау','Choose another problem'),reference:tri('Это справочная инструкция по готовому сценарию. Для индивидуального решения обратитесь в компетентный орган или к специалисту.','Бұл дайын сценарий бойынша ақпараттық нұсқаулық. Жеке шешім үшін құзыретті органға немесе маманға жүгініңіз.','This is reference information for a preset scenario. Contact the competent authority or a qualified professional for an individual decision.'),rental:tri('Проверьте учебный договор','Оқу шартын тексеріңіз','Review a sample rental agreement'),rentalIntro:tri('Это вымышленный договор. Отметьте условия, которые требуют уточнения или создают риск. Затем сравните с объяснениями.','Бұл ойдан шығарылған шарт. Нақтылауды қажет ететін немесе тәуекел туғызатын талаптарды белгілеңіз. Содан кейін түсіндірмелермен салыстырыңыз.','This agreement is fictional. Mark clauses that need clarification or create a risk, then compare your choices with the explanations.'),evaluate:tri('Проверить выбор','Таңдауды тексеру','Check my choices'),attention:tri('Требует внимания','Назар аударуды қажет етеді','Needs attention'),neutral:tri('В этом учебном примере явного риска не отмечено','Бұл оқу мысалында айқын тәуекел көрсетілмеген','No clear risk is flagged in this learning example'),matched:tri('Верно распознано','Дұрыс анықталды','Correctly identified'),rentalNote:tri('Отсутствие отмеченного риска не подтверждает действительность или безопасность настоящего договора.','Белгіленген тәуекелдің болмауы нақты шарттың жарамдылығын немесе қауіпсіздігін растамайды.','An unflagged clause does not confirm that a real agreement is valid or safe.')
};

const recoveryWords={
 title:tri('Восстановительный этап','Қалпына келтіру кезеңі','Recovery stage'),
 decision:tri('Как исправите ситуацию в учебной истории?','Оқу оқиғасындағы жағдайды қалай түзетесіз?','How will you resolve this in the learning story?'),
 leave:tri('Продолжу путь, оставив вопрос нерешённым','Мәселені шешпей, әрі қарай жүремін','Continue while leaving this issue unresolved'),
 unresolved:tri('Вопрос остаётся нерешённым. Сравните объяснение с источниками и выберите действие, которое устраняет это затруднение.','Мәселе шешілмеді. Түсіндірмені дереккөздермен салыстырып, осы қиындықты жоятын әрекетті таңдаңыз.','The issue remains unresolved. Compare the explanation with the sources and choose an action that addresses it.'),
 retry:tri('Вернуться к решению проблемы','Мәселені шешуге оралу','Return to resolving the issue'),
 resolved:tri('В учебной истории найден следующий шаг','Оқу оқиғасында келесі қадам табылды','A next step is identified in the learning story'),
 return:tri('Вернуться на основной путь','Негізгі жолға оралу','Return to the main journey'),
 count:tri('Дополнительных восстановительных этапов','Қосымша қалпына келтіру кезеңдері','Additional recovery stages'),
 arrival:tri('После отложенного разговора у вас по-прежнему нет подтверждения уведомления. Вы возвращаетесь к принимающей стороне, чтобы выяснить следующий шаг.','Әңгіме кейінге қалған соң хабарламаның растауы әлі жоқ. Келесі қадамды анықтау үшін қабылдаушы тарапқа қайта ораласыз.','After postponing the conversation, you still have no notification confirmation. You return to your host to identify the next step.'),
 documents:tri('ИИН уже получен, а вопрос основания пребывания в истории остался открытым. Прежде чем продолжать обустройство, нужно разобраться именно с этим вопросом.','ЖСН алынды, бірақ оқиғада болу негізі туралы мәселе ашық қалды. Орналасуды жалғастырмас бұрын осы мәселені анықтау керек.','You have an IIN, but the story has left your grounds for stay unresolved. Address this issue before continuing to settle in.'),
 home:tri('Договор есть, но участие принимающей стороны и согласие на жильё для РВП остались нерешёнными. Вернитесь к согласованию до подачи документов.','Шарт бар, бірақ қабылдаушы тараптың қатысуы мен уақытша тұруға баспана келісімі шешілмеді. Құжат бермес бұрын бұларды келісуге оралыңыз.','You have a lease, but the host’s involvement and housing consent for temporary residence remain unresolved. Agree on them before submitting documents.'),
 money:tri('В истории выбран посредник из чата, а требования конкретного банка и официальный канал не проверены. Следующий шаг — изменить способ выяснения условий.','Оқиғада чаттағы делдал таңдалды, ал нақты банктің талаптары мен ресми арна тексерілмеді. Келесі қадам — шарттарды анықтау тәсілін өзгерту.','The story took you to a chat intermediary without checking the selected bank or its official channel. Your next step is to change how you obtain the requirements.'),
 settle:tri('Учебная игра подошла к концу, но реальные вопросы работы, учёбы и повседневной жизни ещё не выполнены. Разделите учебный результат и свои последующие действия.','Оқу ойыны аяқталуға жақын, бірақ жұмыс, оқу және күнделікті өмірдің нақты міндеттері әлі орындалмады. Оқу нәтижесін кейінгі нақты әрекеттерден ажыратыңыз.','The learning game is nearly over, but real work, study and everyday tasks are not complete. Separate the learning result from your practical next steps.')
};

export function createSimulationState(){return {index:0,choices:{},history:{},branch:'main',recoveryChoice:null,recoveryHistory:{},path:[]};}

// Transitions change only the educational story; real actionDone tasks are separate.
export function transitionSimulation(s,event,story=baseScenes){
 if(event.type==='back'){
  const index=Number.isInteger(event.index)?event.index:s.index-1;
  if(index<0||index>=story.length||index>s.index)return false;
  const removed=new Set(story.slice(index).map(scene=>scene.id));
  for(const key of ['choices','history','recoveryHistory'])for(const id of removed)if(s[key])delete s[key][id];
  s.path=(s.path||[]).filter(step=>!removed.has(step.sceneId));s.index=index;s.branch='main';s.recoveryChoice=null;return true;
 }
 const scene=story[s.index];if(!scene)return false;
 s.choices??={};s.history??={};s.recoveryHistory??={};s.path??=[];s.branch??='main';
 if(event.type==='choose-main'){
  const choice=scene.choices[event.choice];
  if(s.branch!=='main'||s.choices[scene.id]!==undefined||!Number.isInteger(event.choice)||!choice)return false;
  s.choices[scene.id]=event.choice;(s.history[scene.id]??=[]).push(event.choice);
  s.branch=choice.positive?'main':'recovery';s.recoveryChoice=null;
  s.path.push({sceneId:scene.id,phase:'main',choice:event.choice,outcome:choice.positive?'continue':'recovery'});return true;
 }
 if(event.type==='choose-recovery'){
  if(s.branch!=='recovery'||s.recoveryChoice!==null||![0,1].includes(event.choice))return false;
  s.recoveryChoice=event.choice;(s.recoveryHistory[scene.id]??=[]).push(event.choice);
  s.path.push({sceneId:scene.id,phase:'recovery',choice:event.choice,outcome:event.choice===0?'resolved':'retry'});return true;
 }
 if(event.type==='retry-recovery'){
  if(s.branch!=='recovery'||s.recoveryChoice!==1)return false;
  s.recoveryChoice=null;return true;
 }
 if(event.type==='advance'){
  const solved=s.branch==='recovery'?s.recoveryChoice===0:scene.choices[s.choices[scene.id]]?.positive;
  if(!solved)return false;
  s.index++;s.branch='main';s.recoveryChoice=null;return true;
 }
 return false;
}

function renderRecovery(ctx,scene,wrongChoice,dispatch){
 const s=ctx.state.simulation,safeChoice=scene.choices.find(choice=>choice.positive);
 const selected=s.recoveryChoice,answered=selected===0||selected===1;
 const section=el('section',{'data-simulation-branch':'recovery','data-simulation-scene':scene.id,class:'tool-stack'},
  el('p',{class:'tool-eyebrow'},t(ctx,recoveryWords.title)),
  el('h3',{},t(ctx,scene.title)),
  el('p',{class:'scenario-scene'},t(ctx,scene.recoveryScene||recoveryWords[scene.id]||words.helpText)),
  el('section',{class:'result-box warning'},el('h4',{},t(ctx,words.caution)),el('p',{},t(ctx,wrongChoice.feedback)),sourceBox(ctx,wrongChoice.sourceIds)),
  el('h4',{},t(ctx,recoveryWords.decision)));
 section.append(el('div',{class:'choice-list'},[safeChoice?.text||words.help,recoveryWords.leave].map((text,index)=>button(ctx,text,()=>dispatch({type:'choose-recovery',choice:index},index===0?recoveryWords.resolved:words.caution),{class:`option-button ${selected===index?'selected':''}`,disabled:answered,'aria-pressed':selected===index}))));
 if(answered){
  const solved=selected===0;
  section.append(el('section',{class:`result-box ${solved?'success':'warning'}`},el('h4',{},t(ctx,solved?recoveryWords.resolved:words.caution)),el('p',{},t(ctx,solved?safeChoice?.feedback:recoveryWords.unresolved)),sourceBox(ctx,solved?safeChoice?.sourceIds:wrongChoice.sourceIds),button(ctx,solved?recoveryWords.return:recoveryWords.retry,()=>dispatch({type:solved?'advance':'retry-recovery'}))));
 }
 ctx.container.append(section);
}

export function simulation(ctx) {
 const scenes=simulationForCategory(ctx.state.category);
 const s=ctx.state.simulation;
 ctx.container.append(note(ctx,words.fiction));
 if(s.index>0)ctx.container.append(button(ctx,tri('Вернуться к предыдущей главе','Алдыңғы тарауға оралу','Return to the previous chapter'),()=>{transitionSimulation(s,{type:'back'},scenes);ctx.save();ctx.render();},{class:'button button-secondary simulation-back'}));
 if(s.index>=scenes.length){
  const first=scenes.filter((scene,i)=>{const attempts=s.history[scene.id]||[];return attempts.length&&scene.choices[attempts[0]]?.positive;}).length;
  const recovered=scenes.filter(scene=>s.recoveryHistory?.[scene.id]?.includes(0)).length;
  ctx.container.append(el('section',{class:'result-box success'},el('h3',{},t(ctx,words.completed)),el('p',{},t(ctx,words.learning)),el('p',{},`${t(ctx,words.firstTry)}: ${first} / ${scenes.length}`),el('p',{},`${t(ctx,recoveryWords.count)}: ${recovered}`)),el('div',{class:'tool-actions'},button(ctx,words.route,()=>ctx.openTool('route')),button(ctx,labels.restart,()=>{ctx.state.simulation=createSimulationState();ctx.save();ctx.render();})));
  setProgress(ctx,scenes.length,scenes.length);return;
 }
 const scene=scenes[s.index];if(!scene){ctx.container.append(note(ctx,words.completed));return;}
 const choiceIndex=s.choices[scene.id],choice=scene.choices[choiceIndex];
 const dispatch=(event,message)=>{if(!transitionSimulation(s,event,scenes))return;ctx.save();ctx.render();if(message)ctx.announce(t(ctx,message));};
 // A pending incorrect choice from v1 also resumes in the recovery scene.
 if(choice&&!choice.positive&&s.branch!=='recovery'){s.branch='recovery';s.recoveryChoice=null;ctx.save();}
 if(s.branch==='recovery'&&choice&&!choice.positive){renderRecovery(ctx,scene,choice,dispatch);setProgress(ctx,s.index,scenes.length);return;}
 ctx.container.append(el('section',{'data-simulation-branch':'main','data-simulation-scene':scene.id},el('h3',{},t(ctx,scene.title)),el('p',{class:'scenario-scene'},t(ctx,scene.scene)),el('h4',{},t(ctx,words.decision))));
 const choices=el('div',{class:'choice-list'});
 scene.choices.forEach((item,index)=>choices.append(button(ctx,item.text,()=>dispatch({type:'choose-main',choice:index},item.positive?words.good:words.caution),{class:`option-button ${index===choiceIndex?'selected':''}`,disabled:choice!==undefined,'aria-pressed':index===choiceIndex})));
 ctx.container.append(choices);
 if(choice){
  const result=el('section',{class:`result-box ${choice.positive?'success':'warning'}`},el('h4',{},t(ctx,choice.positive?words.good:words.caution)),el('p',{},t(ctx,choice.feedback)),sourceBox(ctx,choice.sourceIds));
  if(choice.positive)result.append(button(ctx,s.index===scenes.length-1?words.completed:labels.next,()=>dispatch({type:'advance'})));
  ctx.container.append(result);
 }
 setProgress(ctx,s.index,scenes.length);
}

export function quiz(ctx) {
 const questions=quizForCategory(ctx.state.category);
 const s=ctx.state.quiz;
 if(s.index>=questions.length){
  const wrong=questions.filter(q=>s.answers[q.id]!==q.correct),score=questions.length-wrong.length;
  ctx.container.append(el('section',{class:'result-box'},el('h3',{},t(ctx,words.quizEnd)),el('p',{class:'result-score'},`${score} / ${questions.length}`)));
  if(wrong.length){ctx.container.append(el('h4',{},t(ctx,words.review)),el('ul',{},wrong.map(q=>el('li',{},el('strong',{},t(ctx,q.topic)),el('p',{},t(ctx,q.explanation)),sourceBox(ctx,q.sourceIds)))));}else ctx.container.append(note(ctx,words.allCorrect));
  ctx.container.append(button(ctx,labels.restart,()=>{ctx.state.quiz={index:0,answers:{}};ctx.save();ctx.render();}));setProgress(ctx,questions.length,questions.length);return;
 }
 const q=questions[s.index];if(!q)return;
 const selected=s.answers[q.id],answered=Number.isInteger(selected);
 ctx.container.append(el('p',{class:'tool-eyebrow'},t(ctx,q.topic)),el('h3',{},t(ctx,q.question)),note(ctx,words.answer));
 ctx.container.append(el('div',{class:'choice-list'},q.options.map((option,index)=>button(ctx,option,()=>{s.answers[q.id]=index;ctx.save();ctx.render();ctx.announce(t(ctx,index===q.correct?words.correct:words.incorrect));},{disabled:answered,class:`quiz-option option-button ${answered&&index===q.correct?'correct':''} ${answered&&selected===index&&selected!==q.correct?'incorrect':''}`,'aria-pressed':selected===index}))));
 if(answered)ctx.container.append(el('section',{class:`result-box ${selected===q.correct?'success':'warning'}`},el('h4',{},t(ctx,selected===q.correct?words.correct:words.incorrect)),el('p',{},t(ctx,q.explanation)),sourceBox(ctx,q.sourceIds),button(ctx,s.index===questions.length-1?words.quizEnd:labels.next,()=>{s.index++;ctx.save();ctx.render();})));
 setProgress(ctx,s.index,questions.length);
}

export function navigator(ctx) {
 const s=ctx.state.navigator;
 ctx.container.append(note(ctx,words.reference));
 if(!s.problem){ctx.container.append(el('h3',{},t(ctx,words.issue)),el('div',{class:'choice-list'},problems.map(problem=>button(ctx,problem.title,()=>{s.problem=problem.id;s.option=null;ctx.save();ctx.render();},{class:'option-button'}))));return;}
 const problem=problems.find(p=>p.id===s.problem);if(!problem){s.problem=null;return ctx.render();}
 ctx.container.append(el('h3',{},t(ctx,problem.title)),el('p',{},t(ctx,problem.question)),el('div',{class:'choice-list'},problem.options.map((option,index)=>button(ctx,option.label,()=>{s.option=index;ctx.save();ctx.render();},{class:`option-button ${s.option===index?'selected':''}`,'aria-pressed':s.option===index}))));
 const selected=problem.options[s.option];
 if(selected)ctx.container.append(el('section',{class:'result-box'},el('h4',{},t(ctx,selected.title)),el('p',{},t(ctx,selected.body)),taskList(ctx,(selected.actionIds||[]).map(id=>actions.find(a=>a.id===id)).filter(Boolean)),sourceBox(ctx,selected.sourceIds)));
 ctx.container.append(button(ctx,words.resetIssue,()=>{s.problem=null;s.option=null;ctx.save();ctx.render();}));
}

export function rental(ctx) {
 const s=ctx.state.rental;
 const housingWords={
  title:tri('Жильё и миграционные документы','Баспана және көші-қон құжаттары','Accommodation and immigration documents'),
  intro:tri('Перед вами восемь независимых учебных ситуаций. Отметьте условия, которые требуют внимания при подготовке миграционных документов. Это не проверка загруженного договора.','Алдыңызда сегіз тәуелсіз оқу жағдайы берілген. Көші-қон құжаттарын дайындағанда назар аударуды қажет ететін шарттарды белгілеңіз. Бұл жүктелген шартты тексеру емес.','These are eight independent learning situations. Mark the arrangements that need attention when preparing immigration documents. This does not review an uploaded agreement.'),
  source:tri('Проверить основание','Негізді тексеру','Check the source'),
  questions:tri('Конкретные вопросы принимающей стороне','Қабылдаушы тарапқа нақты сұрақтар','Specific questions for the host'),
  result:tri('Учебный результат','Оқу нәтижесі','Learning result'),
  note:tri('Оценка показывает, как вы распознали риски в учебных ситуациях. Она не подтверждает пригодность настоящего договора, законность пребывания или принятие документов. Порядок действий и перечень подтверждений уточняйте для своей процедуры.','Баға оқу жағдайларындағы тәуекелдерді қалай анықтағаныңызды көрсетеді. Ол нақты шарттың жарамдылығын, заңды болуды немесе құжаттардың қабылдануын растамайды. Әрекет тәртібі мен растау тізімін өз рәсіміңіз үшін нақтылаңыз.','The score shows how you recognised risks in these learning situations. It does not establish the suitability of a real agreement, lawful stay or acceptance of documents. Confirm the process and evidence for your own procedure.')
 };
 ctx.container.append(el('h3',{},t(ctx,housingWords.title)),note(ctx,housingWords.intro));
 const list=el('ol',{class:'rental-clauses'});
 rentalClauses.forEach((clause,index)=>{
  const checked=Boolean(s.marked[clause.id]);
  const item=el('li',{},el('label',{class:'task-row'},el('input',{id:`clause-${clause.id}`,type:'checkbox',checked,onchange:e=>{const wasEvaluated=s.evaluated;s.marked[clause.id]=e.target.checked;s.evaluated=false;ctx.save();if(wasEvaluated){ctx.render();document.getElementById(`clause-${clause.id}`)?.focus({preventScroll:true});}}}),el('span',{},el('strong',{},`${index+1}. `),t(ctx,clause.text))));
  if(s.evaluated)item.append(el('div',{class:`result-box ${checked===clause.needsAttention?'success':'warning'}`},el('strong',{},t(ctx,clause.needsAttention?words.attention:words.neutral)),el('p',{},t(ctx,clause.explanation)),el('details',{},el('summary',{},t(ctx,housingWords.source)),sourceBox(ctx,clause.sourceIds))));
  list.append(item);
 });
 ctx.container.append(list,button(ctx,words.evaluate,()=>{s.evaluated=true;ctx.save();ctx.render();ctx.announce(t(ctx,words.matched));}),note(ctx,housingWords.note));
 if(s.evaluated){
  const score=rentalClauses.filter(clause=>Boolean(s.marked[clause.id])===clause.needsAttention).length;
  ctx.container.append(el('p',{class:'result-score'},`${t(ctx,housingWords.result)}: ${score} / ${rentalClauses.length}`),el('section',{class:'result-box rental-questions'},el('h4',{},t(ctx,housingWords.questions)),el('ul',{},rentalClauses.filter(clause=>clause.needsAttention).map(clause=>el('li',{},t(ctx,clause.ask))))));
  setProgress(ctx,score,rentalClauses.length);
 }
}
