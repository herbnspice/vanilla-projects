const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelected = document.getElementById('movie')

let ticketPrice = movieSelected.value;

function updateSelectedCount () {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    const selectedSeatsCount = selectedSeats.length

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice
    const seatsIndex = [...selectedSeats].map( ( seat)=>  [...seats].indexOf(seat) )
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex) )
}
function setMovieData ( movieIndex, moviePrice ) {
    localStorage.setItem('selectedMovieIndex', movieIndex )
    localStorage.setItem('selectedMoviePrice', moviePrice )
}

function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    const selectedMovieIndex  = JSON.parse(localStorage.getItem('selectedMovieIndex'))

    if( selectedSeats !== null & selectedSeats.length > 0 ){
        seats.forEach( (seat, index ) => {
            if( selectedSeats.indexOf(index) > -1 ){
                seat.classList.add('selected')
            }
        })
    }

    if( selectedMovieIndex !== null  ){
        movieSelected.selectedIndex = selectedMovieIndex 
    }   
}
container.addEventListener('click', (e)=>{
    if( e.target.classList.contains('seat') && !e.target.classList.contains('occupied') ){
        e.target.classList.toggle('selected')
    }
    updateSelectedCount()
})

movieSelected.addEventListener('change', (e)=>{
    ticketPrice = e.target.value 
    const movieIndex = e.target.selectedIndex
    setMovieData(movieIndex,  ticketPrice  )
    localStorage.setItem('movie', JSON.stringify(seatsIndex) )
    updateSelectedCount()
})

populateUI()
updateSelectedCount()