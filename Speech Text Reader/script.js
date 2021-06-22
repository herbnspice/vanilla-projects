const main = document.querySelector('main')
const voicesSelect = document.getElementById('voices')
const textarea = document.getElementById('text')
const readBtn = document.getElementById('read')
const toggleBtn = document.getElementById('toggle')
const closeBtn = document.getElementById('close')
const data = [
    { image: './images/happy.jpg', text: `I'am happy` },
    { image: './images/hungry.jpg', text: `I'am hungry` },
    { image: './images/drink.jpg', text: `I'am thirsty` },
    { image: './images/home.jpg', text: `I'am home` },
    { image: './images/play.jpg', text: `I want to play` },
    { image: './images/sad.jpg', text: `I'am sad` },
    { image: './images/outside.jpg', text: `Someone is outside` },
    { image: './images/medicine.jpg', text: `Time to drink my medicine` },
    { image: './images/cuddles.jpg', text: `I want cuddles` },
    { image: './images/sleepy.jpg', text: `I am sleepy` },
    { image: './images/hurt.jpg', text: `I am hurt` },
    { image: './images/find.jpg', text: `Find me` },
]
// Init Speech synthesis
const message = new SpeechSynthesisUtterance;
let voices = []

function getVoices(){
    voices = speechSynthesis.getVoices()

    voices.forEach( voice  => {
        const option = document.createElement('option')
        option.value = voice.name

        option.innerText = `${ voice.name } ${voice.lang}`
        voicesSelect.appendChild(option)
    })
}

//Set the text
function setTextMessage( text ){
    message.text  = text 
}
//Speak text
function speakText(){
    speechSynthesis.speak(message)
}
//Create box
function createBox( item ){
    console.log(item )
    const box = document.createElement('div')
    const { image, text } = item

    box.classList.add('box')
    box.innerHTML = `<img src="${image}" alt="${text}"/>
                    <p class="info"> ${text}</p>
                    `
    box.addEventListener('click', () => {
        setTextMessage( text )
        speakText()
        box.classList.add('active')
        setTimeout( () => {
            box.classList.remove('active')
        }, 1000 )
    })
    main.appendChild(box)
}

// Set voice 
function setVoice( e ){
    message.voice =  voices.find( voice =>  voice.name === e.target.value )
} 
// Speech Synthesis 
speechSynthesis.addEventListener('voiceschanged',getVoices  )

//Add Toggle form show
toggleBtn.addEventListener('click', ()=>{
    document.getElementById('text-box').classList.toggle('show')
})
//Remove form show
closeBtn.addEventListener('click', ()=>{
    document.getElementById('text-box').classList.remove('show')
})
// Change voice
voicesSelect.addEventListener('change', setVoice)

// Read Text button 
readBtn.addEventListener('click', () => {
    setTextMessage( textarea.value )
    speakText()
})

data.forEach(createBox)
getVoices()