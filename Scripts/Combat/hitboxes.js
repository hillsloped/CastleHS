export function attackHits(player,enemy,reach){const delta=(enemy.x-player.x)*player.facing;return delta>=-12&&delta<=reach&&Math.abs(enemy.y-player.y)<36&&Math.abs(enemy.height-player.height)<60;}
export function enemyCanHit(enemy,player){return Math.abs(enemy.x-player.x)<42&&Math.abs(enemy.y-player.y)<31&&player.height<45;}
