let amIResting = document.querySelector('.rest').classList.contains('resting')

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
function switchRest(quantity){
  $('main button').attr('disabled', true)
  amIResting? restOff() : restOn()
  amIResting = !amIResting
  if (getItemFromStorage('current-hp') >= getItemFromStorage('max-hp')){
    return writeInConsole('Você já está com a vida cheia!')
  }
  let resting = setInterval(function () {
    if (getItemFromStorage('current-hp') < getItemFromStorage('max-hp') && amIResting){
      increaseStatus('current-hp', quantity, 0)
    } else {
      $('main button').attr('disabled', false)
      clearInterval(resting)
    }},
    1000)
}

function restOn(){
  document.querySelector('.rest').classList.add('resting')
  writeInConsole('Você está descansando! (1 de vida por segundo)')
}

function restOff(){
  document.querySelector('.rest').classList.remove('resting')
  writeInConsole('Você parou de descansar!')
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

//Combat Functions
function fightMob(mob){
  disableHuntButtons()
  let mobTotalDmg = 0
  let mobHealth = mob.hp
  let earnedGold = (2 + Math.random().toFixed()) * mob.goldLoot
  if (getItemFromStorage('attack') == 0){
    return writeInConsole('Vá treinar mais!')
  }
  let round = setInterval(() => {
    updateHtmlStatus('current-hp')
      if (mobHealth <= 0){
        addGold(earnedGold)
        enableHuntButtons()
        clearInterval(round)
        return writeInConsole(`Você ganhou! Você perdeu ${mobTotalDmg} de vida e ganhou ${earnedGold} de gold!`)
      }
      writeInConsole('---------------------------')
      if (Math.random() > (0.35 - getItemFromStorage('attack')/100 + mob.defense/100)){
        mobHealth -= getItemFromStorage('attack')
        writeInConsole(`${mob.name} perdeu ${getItemFromStorage('attack')} de vida`)
      } else {
        writeInConsole('Você errou o ataque!')
      }
      if (getItemFromStorage('current-hp') <= 0){
        localStorage.setItem('current-hp', 0)
        enableHuntButtons()
        clearInterval(round)
        return death()
      }
      mobTotalDmg += mob.damage - getItemFromStorage('defense')
      takeDamage(mob.damage)
  }, 700);
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
