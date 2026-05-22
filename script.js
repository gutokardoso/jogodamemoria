
const emojis=['⭐','⭐','🚀','🚀','👑','👑','💎','💎','⚽','⚽','🔥','🔥','🎯','🎯','🚗','🚗'];
let first=null;
let second=null;
let lock=false;
let score=0;
let pairs=0;
let time=45;

function shuffle(a){
return a.sort(()=>Math.random()-0.5);
}

function startGame(){
document.querySelector('.start-screen h1').style.display='none';
document.querySelector('.start-button').style.display='none';
document.getElementById('game').classList.remove('hidden');

const grid=document.getElementById('grid');
shuffle(emojis).forEach(e=>{
const c=document.createElement('div');
c.className='card';
c.dataset.value=e;
c.innerHTML='?';

c.onclick=()=>{
if(lock||c.classList.contains('done')) return;
c.innerHTML=e;

if(!first){
first=c;
}else{
second=c;
lock=true;

if(first.dataset.value===second.dataset.value){
score+=100;
pairs++;
document.getElementById('score').innerText=score;
document.getElementById('pairs').innerText=pairs;

setTimeout(()=>{
first.style.visibility='hidden';
second.style.visibility='hidden';
first.classList.add('done');
second.classList.add('done');
reset();
},500);

}else{
setTimeout(()=>{
first.innerHTML='?';
second.innerHTML='?';
reset();
},700);
}
}
};

grid.appendChild(c);
});

setInterval(()=>{
time--;
document.getElementById('time').innerText=time;
if(time<=0){
alert('Tempo esgotado!');
location.reload();
}
if(pairs===8){
alert('Você venceu!');
}
},1000);
}

function reset(){
first=null;
second=null;
lock=false;
}
