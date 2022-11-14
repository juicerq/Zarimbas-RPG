class Mob {
  constructor(damage, hp, defense, goldLoot, name){
    this.damage = damage,
    this.hp = hp,
    this.defense = defense,
    this.goldLoot = goldLoot
    this.name = name
    Mob.allMobs.push(this);
  }
}
Mob.allMobs = [];