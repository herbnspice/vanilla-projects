const main = document.querySelector('main')
const voices = document.getElementById('voices')
const textarea = document.getElementById('text')
const readBtn = document.getElementById('read')
const toggleBtn = document.getElementById('toggle')
const closeBtn = document.getElementById('close')

const data = [
    {
        image: './images/drink.jpg',
        text: `I'am Thirsty`
    },
    {
        image: './images/angry.jpg',
        text: `I'am angry`
    },
    {
        image: './images/food.jpg',
        text: `I'am food`
    },
    {
        image: './images/happy.jpg',
        text: `I'am happy`
    },
    {
        image: './images/scared.jpg',
        text: `I'am scared`
    },
    {
        image: './images/sad.jpg',
        text: `I'am sad`
    },
    {
        image: './images/outside.jpg',
        text: `Someone is outside`
    },
]

data.forEach(createBox)

function createBox( item ){
    console.log(item )
    const box = document.createElement('div')
    const { image, text } = item

    box.classList.add('box')
    box.innerHTML = `<img src="${image}" alt="${text}"/>
        <p class="info"> ${text}</p>
        `
    main.appendChild(box)
}