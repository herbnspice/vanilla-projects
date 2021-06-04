const postContainer =  document.getElementById('post-container')
const loader = document.querySelector('.loader')
const filter = document.getElementById('filter')

let limit = 3;
let page = 1;

// Fetch posts from API
async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    const data = await res.json()
    return data
}

async function showPosts(){
    const posts = await getPosts()
    posts.forEach(post => {
        const postEl  = document.createElement('div')
        postEl.classList.add('post')
        postEl.innerHTML = `<div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${ post.title }</h2>
                <h2 class="post-body">${ post.body }</h2>
            </div>
        `
        postContainer.appendChild(postEl)
    });
}

showPosts();

//Show Loader and Fetch more posts
function showLoading(){
    loader.classList.add('show')
    setTimeout(() => {
        loader.classList.remove('show')
        setTimeout(() => {
            page++;
            showPosts() 
        }, 300  )
    }, 1000)

}

//Filter Posts by input
function filterPosts( e) {
    console.log( e.target.value )
    const term = e.target.value.toUpperCase()
    const posts = document.querySelectorAll('.post')

    posts.forEach( post => {
            const title = post.querySelector('.post-title').innerText.toUpperCase()
            const body  = post.querySelector('.post-body').innerText.toUpperCase()
            if( title.indexOf(term) > -1  || body.indexOf(term) > -1 ){
                post.style.display = 'flex'
            } else{
                post.style.display = 'none'
            }
    })
}

//Add Scroll Element
window.addEventListener('scroll', () => {
   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

   if( scrollTop + clientHeight >= scrollHeight - 5 ){
       showLoading()
   }
})

filter.addEventListener('input', filterPosts )