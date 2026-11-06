import {Input} from './Scripts/Systems/input.js';
import {showScreen} from './Scripts/UI/menu.js';
import {makePlayer} from './Scripts/Entities/player.js';
import {makeEnemy,updateEnemies} from './Scripts/Entities/enemies.js';
import {movePlayer} from './Scripts/Movement/movement.js';
import {attack} from './Scripts/Combat/combat1.js';
import {enemyAttacks} from './Scripts/Combat/combat2.js';
import {usePotion,tickCombat} from './Scripts/Combat/combat-extras.js';
import {cameraX} from './Scripts/Systems/camera.js';
import {render} from './Scripts/Systems/renderer.js';

const canvas=document.getElementById('game');const g=canvas.getContext('2d');const input=new Input();
const $=id=>document.getElementById(id);
let game=null,activeScreen='title-screen';
function screen(name){activeScreen=name;showScreen(name);input.reset();}
function equip(kind){if(!game||game.done)return;game.player.equipped=kind;document.querySelectorAll('.slot').forEach(b=>b.classList.toggle('active',b.dataset.equip===kind));}
function useItem(){if(activeScreen!=='game-screen'||!game||game.done)return;if(game.player.equipped==='potion')usePotion(game.player);else attack(game.player,game.enemies);}
input.onEquip=n=>equip(['fists','sword','potion'][n]);input.onAttack=useItem;
canvas.addEventListener('pointerdown',e=>{if(e.pointerType!=='touch')useItem();});
document.querySelectorAll('.slot').forEach(b=>b.addEventListener('click',()=>equip(b.dataset.equip)));
$('play-button').onclick=()=>screen('map-screen');$('map-back').onclick=()=>screen('title-screen');$('exit-level').onclick=()=>screen('map-screen');$('map-button').onclick=()=>screen('map-screen');$('retry-button').onclick=()=>startLevel(game.mode);
document.querySelectorAll('[data-level]').forEach(b=>b.addEventListener('click',()=>startLevel(b.dataset.level)));
function startLevel(mode){const player=makePlayer();game={mode,player,enemies:[],time:0,cam:0,done:false,deepest:0,encounter:0,seconds:0,kills:0,spawnClock:0};if(mode==='simple'){[450,750,1060,1360,1720].forEach((x,i)=>game.enemies.push(makeEnemy(x,365+(i%3)*38)));}else{game.enemies=[makeEnemy(550,395),makeEnemy(790,421)];game.encounter=2;}$('game-overlay').classList.add('hidden');$('stage-name').textContent=mode==='simple'?'THE FIRST ROAD':'ENDLESS DESCENT';equip('fists');screen('game-screen');}
function finish(win){if(game.done)return;game.done=true;$('game-overlay').classList.remove('hidden');$('overlay-kicker').textContent=win?'STAGE COMPLETE':'RUN ENDED';$('overlay-title').textContent=win?'ROAD CLEARED!':'YOU FELL';if(game.mode==='endless'){$('overlay-message').textContent=`Deepest distance: ${Math.floor(game.deepest/12)} m · Enemies defeated: ${game.kills} · Survived: ${Math.floor(game.seconds)} seconds`;}else{$('overlay-message').textContent=win?'You defeated every enemy and reached the finish flag!':`Enemies defeated: ${game.kills} / 5. Try again!`;}}
function tick(dt){if(!game||game.done)return;const p=game.player;game.time+=dt;game.seconds+=dt;const axis=input.axis();movePlayer(p,axis,input.jump(),dt,game.mode==='simple'?2075:Infinity);tickCombat(p,dt);if(input.attack()&&p.attackCooldown<=0)useItem();updateEnemies(game.enemies,p,dt);enemyAttacks(game.enemies,p);const before=game.enemies.length;game.enemies=game.enemies.filter(e=>e.hp>0);game.kills+=before-game.enemies.length;
if(game.mode==='endless'){
 game.deepest=Math.max(game.deepest,p.x-135);
 game.spawnClock+=dt;
 // Progress spawns are driven by distance and time so standing still never stops the challenge.
 const expected=2+Math.floor(game.deepest/290)+Math.floor(game.seconds/18);
 if(game.encounter<expected&&game.enemies.length<15){const wave=Math.floor(game.encounter/4)+1;const count=Math.min(2,expected-game.encounter);for(let i=0;i<count;i++){const x=Math.max(p.x+360,game.encounter*275+340)+i*45;game.enemies.push(makeEnemy(x,345+((game.encounter+i)*37)%102,wave));}game.encounter+=count;}
 // Occasional replacement if enemies are continually defeated without advancing.
 if(game.spawnClock>12&&game.enemies.length===0){game.spawnClock=0;game.enemies.push(makeEnemy(p.x+500,390,Math.floor(game.seconds/35)+1));}
 if(game.kills>0&&game.kills%8===0&&game.lastReward!==game.kills){p.potions=Math.min(5,p.potions+1);game.lastReward=game.kills;}
} else if(game.enemies.length===0&&p.x>1990){finish(true);}
if(p.hp<=0)finish(false);game.cam=cameraX(p,game.mode);}
function updateHUD(){if(!game)return;const p=game.player;$('health-fill').style.width=`${p.hp/p.maxHp*100}%`;$('health-text').textContent=`${Math.ceil(p.hp)} / ${p.maxHp} HP`;$('potion-count').textContent=`×${p.potions}`;$('level-progress').textContent=game.mode==='endless'?`DEPTH ${Math.floor(game.deepest/12)} m  ·  KOs ${game.kills}  ·  ${Math.floor(game.seconds)}s`:`ENEMIES ${5-game.enemies.length}/5  ·  ${Math.floor(p.x/2075*100)}% ROAD`}
let previous=0;function frame(now){const dt=Math.min(.033,(now-previous)/1000||0);previous=now;if(activeScreen==='game-screen'&&game){tick(dt);updateHUD();render(g,game);}input.endFrame();requestAnimationFrame(frame);}requestAnimationFrame(frame);
screen('title-screen');
