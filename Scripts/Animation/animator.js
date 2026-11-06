import {poses} from './animation-data.js';
export function playerPose(p,time){if(p.attackTimer>0)return {...poses.attack,tilt:-.14};if(p.height>0)return poses.jump;if(p.walking)return {...poses.walk,bob:Math.sin(time*13)*3,tilt:Math.sin(time*13)*.035};return {...poses.idle,bob:Math.sin(time*3)*1.5};}
