if (localStorage.length == 0){
  createStorageItem('attack')
  createStorageItem('max-hp')
  createStorageItem('current-hp')
  createStorageItem('defense')
  createStorageItem('gold')
  writeInConsole('Você começou um novo jogo!')
} else {
  updateHtmlStatus('attack')
  updateHtmlStatus('max-hp')
  updateHtmlStatus('current-hp')
  updateHtmlStatus('defense')
  updateHtmlStatus('gold')
  writeInConsole('Bem-vindo de volta!')
}

//Gold Functions
function addGold(quantity){
  localStorage.setItem('gold', (getItemFromStorage('gold') + quantity))
  $(`.gold`).text(localStorage.getItem(`gold`))
}

function removeGold(quantity){
  localStorage.setItem('gold', (getItemFromStorage('gold') - quantity))
  $(`.gold`).text(localStorage.getItem(`gold`))
}

// Storage Functions
function increaseStatus(status, quantity, price){
  if (getItemFromStorage('gold') < price){
    return writeInConsole('Você não possui dinheiro o suficiente!')
  }
  localStorage.setItem(`${status}`, (Number(localStorage.getItem(`${status}`)) + quantity))
  $(`.${status}`).text(localStorage.getItem(`${status}`))
  removeGold(price)
  if (status != 'current-hp'){
    writeInConsole(`Você treinou ${quantity} em ${status}`)
  }
}

function createStorageItem(status){
  localStorage.setItem(`${status}`, $(`.${status}`).text())
}
function updateHtmlStatus(status){
  $(`.${status}`).text(localStorage.getItem(`${status}`))
}

function getItemFromStorage(status){
  return Number(localStorage.getItem(`${status}`))
}

// Rest Functions
let amIResting = document.querySelector('.rest').classList.contains('resting')
function switchRest(quantity){
  disableMain()
  if (getItemFromStorage('current-hp') >= getItemFromStorage('max-hp')){
    enableMain()
    writeInConsole('Você já está com a vida cheia!')
    return 
  }
  $('main button').attr('disabled', true)
  amIResting? restOff() : restOn()
  amIResting = !amIResting
  let resting = setInterval(function () {
    if (getItemFromStorage('current-hp') >= getItemFromStorage('max-hp')) {
      enableMain()
      console.log('elsif')
      amIResting = !amIResting
      clearInterval(resting)
      return
    }
    if (getItemFromStorage('current-hp') < getItemFromStorage('max-hp') && amIResting){
      increaseStatus('current-hp', quantity, 0)
      console.log('if')
    } else {
      enableMain()
      console.log('else')
      clearInterval(resting)
      return
    }},
    1000)
}

function restOn(){
  document.querySelector('.rest').classList.add('resting')
  writeInConsole('Você está descansando! (1 de vida por segundo)')
}

function restOff(){
  document.querySelector('.rest').classList.remove('resting')
}

function disableRest(){
  $('.rest').prop('disabled', true)
}

function enableRest(){
  $('.rest').prop('disabled', false)
}

// HTML Functions
function writeInConsole(message){
  $('.console').html($('.console').html() + `<p>${message}</p>`)
  for (let i = 0; i < 100; i++){
    document.querySelector('.console').scrollIntoView(false)
  }
}

function cleanConsole(){
  $('.console').html('')
}

function openAndClose(classname){
  $('main div div').each(function (index, div){
    if (this.classList.contains(classname)){
      if (!this.classList.contains('hide')) {
        this.classList.add('hide')
      } else {
        this.classList.remove('hide')
      }
    }
    if (!div.classList.contains(classname)){
      div.classList.add('hide')
    }
  })
}

function disableHuntButtons(){
  $('.hunt div button').each(function (index, btn){
    btn.setAttribute('disabled', true)
  })
}

function enableHuntButtons(){
  $('.hunt div button').each(function (index, btn){
    btn.removeAttribute('disabled')
  })
}

function disableMain(){
  $('main button').prop('disabled', true)
}

function enableMain(){
  $('main button').prop('disabled', false)
}

//Combat Functions
function fightMob(mob){
  disableRest()
  disableMain()
  let mobTotalDmg = 0
  let mobHealth = mob.hp
  let earnedGold = Number((Math.random() * (mob.goldLoot - (mob.goldLoot * 0.6)) + (mob.goldLoot * 0.6)).toFixed())
  if (getItemFromStorage('attack') == 0){
    enableMain()
    enableRest()
    return writeInConsole('Vá treinar mais!')
  }
  let round = setInterval(() => {
    updateHtmlStatus('current-hp')
      writeInConsole('---------------------------')
      if (Math.random() > (0.4 - getItemFromStorage('attack')/100 + mob.defense/100)){
        finalDamage = Number((Math.random() * (getItemFromStorage('attack') - (getItemFromStorage('attack') * 0.5)) + (getItemFromStorage('attack') * 0.5)).toFixed())
        mobHealth -= finalDamage
        if (mobHealth < 0){
          writeInConsole(`${mob.name} morreu!`)
        } else {
          writeInConsole(`${mob.name} perdeu ${finalDamage} de vida (${mobHealth})`)
        }
        if (mobHealth <= 0){
          addGold(earnedGold)
          enableRest()
          enableMain()
          clearInterval(round)
          return writeInConsole(`Você ganhou! Você perdeu ${mobTotalDmg} de vida e ganhou ${earnedGold} de gold!`)
        }
      } else {
        writeInConsole('Você errou o ataque!')
      }
      if (getItemFromStorage('current-hp') <= 0){
        localStorage.setItem('current-hp', 0)
        enableRest()
        enableMain()
        clearInterval(round)
        return death()
      }
      mobTotalDmg += mob.damage - getItemFromStorage('defense')
      takeDamage(mob.damage)
  }, 1000);
}

function death(){
  removeGold(getItemFromStorage('gold'))
  localStorage.setItem('current-hp', 0)
  updateHtmlStatus('current-hp')
  writeInConsole(`Você morreu! Você perdeu todo seu gold!`)
}

function takeDamage(damage){
  const damageTaken = damage - getItemFromStorage('defense')
  localStorage.setItem('current-hp', (getItemFromStorage('current-hp') - damageTaken))
  writeInConsole(`Você tomou ${damageTaken} de dano!`)
  return getItemFromStorage('current-hp')
}
