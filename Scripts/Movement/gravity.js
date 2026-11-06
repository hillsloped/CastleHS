export const GRAVITY=1450;
export const JUMP_VELOCITY=560;
export function updateVertical(entity,dt){entity.height=Math.max(0,entity.height+entity.vz*dt);entity.vz-=GRAVITY*dt;if(entity.height<=0){entity.height=0;entity.vz=0;}}
