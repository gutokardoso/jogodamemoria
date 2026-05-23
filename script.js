
const startBtn = document.getElementById('startBtn');
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const grid = document.getElementById('grid');

const icons = ['⭐','⭐','🚀','🚀','👑','👑','💎','💎','⚽','⚽','🔥','🔥','🎯','🎯','🚗','🚗'];

let first = null;
let second = null;
let lock = false;
let score = 0;
let matches = 0;
let time = 45;
let timer;

function shuffle(arr){
 return arr.sort(()=>Math.random()-0.5);
}

startBtn.onclick = ()=>{
 startScreen.classList.add('hidden');
 gameScreen.classList.remove('hidden');
 startGame();
}

function startGame(){

 shuffle(icons).forEach(icon=>{

   const card = document.createElement('div');
   card.className='card preview';

   card.innerHTML = `
   <div class="card-inner">
      <div class="face back"></div>
      <div class="face front">${icon}</div>
   </div>
   `;

   grid.appendChild(card);

   setTimeout(()=>{
      card.classList.remove('preview');
      card.classList.remove('flip');
   },3000);

   card.classList.add('flip');

   card.onclick = ()=>{

      if(lock || card.classList.contains('done')) return;
      if(card === first) return;

      card.classList.add('flip');

      if(!first){
        first = {card, icon};
      }else{
        second = {card, icon};
        lock = true;

        if(first.icon === second.icon){

          score += 100;
          matches++;

          document.getElementById('score').innerText = score;
          document.getElementById('pairs').innerText = `${matches}/8`;

          setTimeout(()=>{
            first.card.style.opacity='0';
            second.card.style.opacity='0';

            first.card.classList.add('done');
            second.card.classList.add('done');

            reset();

            if(matches===8){
              alert('Você venceu!');
              location.reload();
            }

          },500);

        }else{

          setTimeout(()=>{
            first.card.classList.remove('flip');
            second.card.classList.remove('flip');
            reset();
          },700);

        }
      }
   };

 });

 timer = setInterval(()=>{
   time--;
   document.getElementById('time').innerText = time+'s';

   if(time<=0){
      clearInterval(timer);
      alert('Tempo esgotado!');
      location.reload();
   }

 },1000);

}

function reset(){
 first = null;
 second = null;
 lock = false;
}
