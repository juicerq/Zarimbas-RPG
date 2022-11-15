let rat = new Mob(1, 20, 0, 5, 'Rato')
let goblin = new Mob(7, 50, 1, 10, 'Goblin')
let esqueleto = new Mob(15, 60, 2, 30, 'Esqueleto')
let orc = new Mob(30, 90, 5, 60, 'Orc')
let cyclop = new Mob(60, 150, 10, 120, 'Ciclope')

function setMobTitle(array){
  array.forEach(function (mob){
    $(`.${mob.name}`).attr('title', `Dano: ${mob.damage} Vida: ${mob.hp} Defesa: ${mob.defense} Loot: ${mob.goldLoot}`)
  })
}

setMobTitle(Mob.allMobs)