
const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

const localStorageTransaction  = JSON.parse( localStorage.getItem('transactions'))

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransaction : [];


function addTransactionDOM( transaction ) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    //Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')
    item.innerHTML = `${transaction.text} <span> ${sign}${Math.abs(transaction.amount)} </span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})"> x </button>`

    list.appendChild(item)
}
function removeTransaction( id) {

    console.log( transactions )
   

    transactions = transactions.filter( transaction => transaction.id !== id )
    
    updateLocalStorage()
    init()

}

function updateLocalStorage() {
    console.log( transactions)
    localStorage.setItem('transactions', JSON.stringify(transactions))
}
//Update the balance, income and expense
function updateValues(){
    const amounts = transactions.map( transaction => transaction.amount )
    const total = amounts.reduce( (acc, item ) => (acc += item), 0).toFixed(2)
    const income = amounts
            .filter( item => item > 0 )
            .reduce( (acc, item) => (acc + item), 0)
            .toFixed(2)
    const expenses =  (amounts
            .filter( item => item < 0 )
            .reduce(( acc, item ) => ( acc += item),0 ) * -1 ).toFixed(2)
    console.log( income, expenses, total)

    balance.innerText = `$${total}`
    money_minus.innerText = `$${income}`
    money_plus.innerText = `$${expenses}`
}
//Init App
function init(){
    list.innerHTML = ''
    transactions.forEach(addTransactionDOM);
}

function addTransaction( e){
    console.log(e)
    e.preventDefault();
    if(text.value.trim  === '' || amount.value.trim() ===  ''){
        alert( 'Enter a text or an amount')
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        }
        transactions.push( transaction )
        addTransactionDOM(transaction)
        updateValues()

        console.log( transactions)

        updateLocalStorage()
        text.value = ''
        amount.value = ''

        
    }
}
function generateID(){
    return Math.floor(Math.random() * 100000)
}

init()
form.addEventListener('submit', addTransaction )