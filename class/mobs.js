let rat = new Mob(1, 20, 0, 5, 'Rato')
let goblin = new Mob(7, 50, 1, 10, 'Goblin')
let esqueleto = new Mob(15, 60, 5, 50, 'Esqueleto')
let orc = new Mob(30, 90, 10, 60, 'Orc')
let cyclop = new Mob(60, 150, 20, 120, 'Ciclope')

function setMobTitle(array){
  array.forEach(function (mob){
    $(`.${mob.name}`).attr('title', `Dano: ${mob.damage} Vida: ${mob.hp} Defesa: ${mob.defense} Loot: ${(mob.goldLoot * 0.5 ).toFixed() + '-' + mob.goldLoot}`)
  })
}

setMobTitle(Mob.allMobs)