const startScreen=document.getElementById('startScreen');
const gameScreen=document.getElementById('gameScreen');
const resultScreen=document.getElementById('resultScreen');
const board=document.getElementById('board');
const timerEl=document.getElementById('timer');
const timerProgress=document.getElementById('timerProgress');
const TIMER_TOTAL=45;
const TIMER_RADIUS=52;
const TIMER_CIRCUMFERENCE=2*Math.PI*TIMER_RADIUS;
const scoreEl=document.getElementById('score');
const pairsEl=document.getElementById('pairs');
const countdownEl=document.getElementById('countdown');
const finalScore=document.getElementById('finalScore');
const resultTitle=document.getElementById('resultTitle');
const resultText=document.getElementById('resultText');
const icons=['💎','🚀','👑','⚽','🦋','⭐','⚡','🏆'];
let deck=[],flipped=[],lock=false,score=0,pairs=0,time=TIMER_TOTAL,timerId=null,canPlay=false;

function updateTimerRing(){
  if(!timerProgress)return;
  const progress=Math.max(0,time)/TIMER_TOTAL;
  timerProgress.style.strokeDasharray=TIMER_CIRCUMFERENCE;
  timerProgress.style.strokeDashoffset=-TIMER_CIRCUMFERENCE*(1-progress);
}

function show(screen){[startScreen,gameScreen,resultScreen].forEach(s=>s.classList.remove('active'));screen.classList.add('active')}
function shuffle(a){return a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(v=>v[1])}
function fmt(n){return String(n).padStart(4,'0')}
function buildBoard(){board.innerHTML='';deck=shuffle([...icons,...icons]);deck.forEach((icon,i)=>{const card=document.createElement('button');card.className='card';card.dataset.icon=icon;card.innerHTML=`<div class="card-inner"><div class="card-face card-back"></div><div class="card-face card-front">${icon}</div></div>`;card.addEventListener('click',()=>flip(card));board.appendChild(card)})}
function reset(){score=0;pairs=0;time=TIMER_TOTAL;flipped=[];lock=false;canPlay=false;timerEl.textContent=TIMER_TOTAL+'s';timerEl.style.color='';scoreEl.textContent='0000';pairsEl.textContent='0/8';clearInterval(timerId);updateTimerRing();buildBoard()}
function startGame(){reset();show(gameScreen);const cards=[...document.querySelectorAll('.card')];cards.forEach((c,i)=>setTimeout(()=>c.classList.add('flipped'),80*i));let n=3;countdownEl.textContent=n;countdownEl.classList.add('show');const cd=setInterval(()=>{n--; if(n>0){countdownEl.textContent=n}else{clearInterval(cd);countdownEl.classList.remove('show');cards.forEach(c=>c.classList.remove('flipped'));setTimeout(()=>{canPlay=true;tick()},600)}},1000)}
function tick(){updateTimerRing();timerId=setInterval(()=>{time--;timerEl.textContent=time+'s';updateTimerRing();if(time<=10)timerEl.style.color='#ffd24d';if(time<=0){end(false)}},1000)}
function flip(card){if(!canPlay||lock||card.classList.contains('flipped')||card.classList.contains('matched'))return;card.classList.add('flipped');flipped.push(card);if(flipped.length===2)check()}
function check(){lock=true;const [a,b]=flipped;if(a.dataset.icon===b.dataset.icon){a.classList.add('correct');b.classList.add('correct');score+=100;pairs++;scoreEl.textContent=fmt(score);pairsEl.textContent=pairs+'/8';setTimeout(()=>{a.classList.add('matched');b.classList.add('matched');flipped=[];lock=false;if(pairs===8)end(true)},650)}else{a.classList.add('wrong');b.classList.add('wrong');setTimeout(()=>{a.classList.remove('flipped','wrong');b.classList.remove('flipped','wrong');flipped=[];lock=false},850)}}
function end(win){clearInterval(timerId);canPlay=false;finalScore.textContent=fmt(score);if(win){resultTitle.textContent='PARABÉNS!';resultText.textContent='VOCÊ VENCEU!'}else{resultTitle.textContent='TEMPO ESGOTADO!';resultText.textContent='TENTE NOVAMENTE!'}show(resultScreen)}
document.getElementById('startButton').onclick=startGame;document.getElementById('homeButton').onclick=()=>show(startScreen);document.getElementById('playAgain').onclick=startGame;document.getElementById('menuButton').onclick=()=>show(startScreen);
