const word = document.getElementById('word')
const text = document.getElementById('text')
const scoreEL = document.getElementById('score')
const timeEl  =  document.getElementById('time')
const endgameEl  =  document.getElementById('end-game-container')

const settingsBtn = document.getElementById('settings-btn')
const settings = document.getElementById('settings')
const settingsForm = document.getElementById('settings-form')
const difficultSelect = document.getElementById('difficulty')


const words = [
    'sigh',
    'tense',
    'airplane'
    ];

let randomWord;
let score = 0
let time = 10

//Countdown
const timeInterval = setInterval(() => {
    updateTime()
}, 1000);

function getRandomWord(){
    return words[Math.floor(Math.random() * words.length )]
}

function addWordtoDOM(){
    randomWord =  getRandomWord()
    text.focus()
    word.innerHTML = randomWord
}

function updateScore(){
    score++;
    scoreEL.innerHTML = score
}

function updateTime(){
    time--;
    timeEl.innerHTML = time+'s'

    if( time ===  0){
        clearInterval(timeInterval)
        //end game
        gameOver()
    }
}

//Show Endscreen
function gameOver(){
    endgameEl.innerHTML = `<h1>Time Ran out</h1>
    <p> Your final score is ${score}</p>
    <button onclick="location.reload()"> Retry </button>
    `
    endgameEl.style.display = 'flex' 
    console.log( 'game over')
}

addWordtoDOM()
text.addEventListener('input', e=>{
    const insertedText = e.target.value
    if( insertedText == randomWord ){
        addWordtoDOM()
        updateScore()
        e.target.value = ""
        time += 5
    }
})