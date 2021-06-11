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
//Set difficultu to value in ls or medium
let diffuculty = localStorage.getItem('difficulty') != null ? localStorage.getItem('difficulty') : 'medium' 

difficultSelect.value = diffuculty
//Countdown
const timeInterval = setInterval(() => {
    updateTime()
}, 1000);

//Get Random World
function getRandomWord(){
    return words[Math.floor(Math.random() * words.length )]
}

//Add Word to DOM object 
function addWordtoDOM(){
    randomWord =  getRandomWord()
    text.focus()
    word.innerHTML = randomWord
}

//Update Score
function updateScore(){
    score++;
    scoreEL.innerHTML = score
}

//Update time and clear time if time has reached to 0
function updateTime(){
    time--;
    timeEl.innerHTML = time+'s'

    if( time ===  0){
        clearInterval(timeInterval)
        //end game
        gameOver()
    }
}

//Show End Screen
function gameOver(){
    endgameEl.innerHTML = `<h1>Time Ran out</h1>
    <p> Your final score is ${score}</p>
    <button onclick="location.reload()"> Retry </button>
    `
    endgameEl.style.display = 'flex' 
    console.log( 'game over')
}


// On input text
text.addEventListener('input', e=>{
    const insertedText = e.target.value
    if( insertedText == randomWord ){
        addWordtoDOM()
        updateScore()
        e.target.value = ""

        switch(diffuculty){
            case 'easy':
                time += 5
            break;
            case 'medium':
                time += 3

            break;
            case 'hard':
                time += 2
            break;

        }
    }
})

settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide')

})

//settings select
settingsForm.addEventListener('change', e => {
    diffuculty = e.target.value
    localStorage.setItem('difficulty', diffuculty)
})


addWordtoDOM()