const musicContainer =  document.getElementById('music-container')
const playBtn =  document.getElementById('play')
const prevBtn =  document.getElementById('prev')
const nextBtn =  document.getElementById('next')

const audio =  document.getElementById('audio')
const progress =  document.getElementById('progress')
const progressContainer =  document.getElementById('progress-container')
const title =  document.getElementById('title')
const cover =  document.getElementById('cover')

//Song Titles
const songs = ['summer', 'ukulele', 'hey']

//Keep track of songs
let songIndex = 2;


//Initial load song into DOM
loadSong = ( song ) => {
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`
}


playSong = ( ) => {
    musicContainer.classList.add('play')
        playBtn.querySelector('i.fa').classList.remove('fa-play')
    playBtn.querySelector('i.fa').classList.add('fa-pause')

    audio.play()
}

pauseSong = () => {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fa').classList.remove('fa-pause')
    playBtn.querySelector('i.fa').classList.add('fa-play')
    audio.pause()
}

prevSong = ( ) => {
    songIndex --;
    if( songIndex < 0 ){
        songIndex  = songs.length -1 
    } 
    loadSong( songs[songIndex ])
    playSong()
}
nextSong = ( ) => {
    songIndex ++;
    if( songIndex > songs.length - 2 ){
        songIndex  = 0
    } 
    loadSong( songs[songIndex ])
    playSong()

}

udpateProgress = ( e) =>  {
    const { duration, currentTime } = e.srcElement
    const progressPercent  =  ( currentTime / duration ) * 100
    progress.style.width  = `${progressPercent}%`
}

function setProgress (e)  {
    const width  = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration 
    audio.currentTime = (clickX / width ) * duration 
}

playBtn.addEventListener( 'click', () => {
    const isPlaying  = musicContainer.classList.contains('play')
    if( isPlaying ){
        pauseSong()
    } else{
        playSong()
    }
})

nextBtn.addEventListener( 'click', nextSong  )
prevBtn.addEventListener( 'click', prevSong )
audio.addEventListener('timeupdate', udpateProgress)
audio.addEventListener('ended', nextSong)
progressContainer.addEventListener('click', setProgress)
loadSong( songs[songIndex])