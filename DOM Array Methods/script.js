const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillonairesBtn = document.getElementById('show-millonaires')
const calculateWealthBtn = document.getElementById('calculate-wealth')
const sortBtn = document.getElementById('sort')
const main = document.getElementById('main')

let data = []
async function getRandomUser() {

    const res = await fetch('https://randomuser.me/api')
    const data = await res.json()
    const user = data.results[0]
    const  newUser  = {
        name : `${user.name.first} ${user.name.last}`,
        money : Math.floor(Math.random() * 1000000)
    }

    addData( newUser )
}

function addData( obj ){
    data.push(obj)
    updateDOM(data)
}

function updateDOM( providedData =  data ){
    main.innerHTML = '<h2> <strong>Person</strong> wealth</h2>'
    providedData.forEach( item => {
        const element  = document.createElement('div'); 
        element.classList.add('person')
        element.innerHTML = `<strong> ${item.name}</strong> ${ formatMoney(item.money)}`
        
        main.append(element)
    })
}

function formatMoney( number ){
    return '$'+number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function doubleWealth(){

    data = data.map( user => {
        return { ...user, money: user.money *2 }
    })
    updateDOM()
}

function sortRich( ){
    data = data.sort( (a, b) =>  b.money - a.money  )
    updateDOM()
    
}

function showMillonaires(){
    data = data.filter(( user) => {
        return  user.money < 1000000
    })

    updateDOM()
}

function calculateWealth(){
    const wealth = data.reduce( (acc, user) => ( acc += user.money), 0)

    console.log( formatMoney(wealth))

    const wealthEl = document.createElement('div')
    wealthEl.innerHTML=`<h3> Total Wealth: ${formatMoney(wealth)} </h3>`
    main.appendChild(wealthEl)
}

addUserBtn.addEventListener( 'click', getRandomUser )
doubleBtn.addEventListener( 'click', doubleWealth )
sortBtn.addEventListener( 'click', sortRich )
showMillonairesBtn.addEventListener( 'click', showMillonaires )
calculateWealthBtn.addEventListener( 'click', calculateWealth )