import {JUMP_VELOCITY} from './gravity.js';
export function tryJump(player,held){if(held&&player.height===0&&!player.jumpHeld){player.vz=JUMP_VELOCITY;}player.jumpHeld=held}
