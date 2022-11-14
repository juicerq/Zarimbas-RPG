let rat = new Mob(1, 30, 0, 5, 'rat')
let goblin = new Mob(5, 70, 1, 10, 'goblin')
let esqueleto = new Mob(20, 60, 2, 30, 'esqueleto')
let zumbi = new Mob(30, 90, 5, 60, 'zumbi')
let cyclop = new Mob(60, 150, 10, 120, 'cyclop')

function setMobTitle(array){
  array.forEach(function (mob){
    $(`.kill-${mob.name}`).attr('title', `Dano: ${mob.damage} Vida: ${mob.hp} Defesa: ${mob.defense} Loot: ${mob.goldLoot}`)
  })
}

setMobTitle(Mob.allMobs)