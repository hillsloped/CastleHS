import {enemyCanHit} from './hitboxes.js';import {hurtPlayer} from '../Entities/player.js';
export function enemyAttacks(enemies,player){for(const e of enemies){if(e.attackCooldown<=0&&enemyCanHit(e,player)){hurtPlayer(player,11,e.x);e.attackCooldown=1.4;}}}
