let rat = new Mob(1, 30, 0, 5, 'Rato')
let troll = new Mob(7, 70, 1, 10, 'Troll')
let esqueleto = new Mob(15, 60, 2, 30, 'Esqueleto')
let zumbi = new Mob(30, 90, 5, 60, 'Zumbi')
let cyclop = new Mob(60, 150, 10, 120, 'Ciclope')

function setMobTitle(array){
  array.forEach(function (mob){
    $(`.${mob.name}`).attr('title', `Dano: ${mob.damage} Vida: ${mob.hp} Defesa: ${mob.defense} Loot: ${mob.goldLoot}`)
  })
}

setMobTitle(Mob.allMobs)