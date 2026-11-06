export function distance(a,b){return Math.hypot(a.x-b.x,a.y-b.y)}
export function clamp(value,min,max){return Math.max(min,Math.min(max,value))}
