const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')
const error = false
function showError( input, message ){
    const formControl = input.parentElement
    console.log(formControl)
    const small = formControl.querySelector('small')
    formControl.className = 'form-control error'
    small.innerText = message
    error = true
}
function showSuccess( input ){
    const formControl = input.parentElement
    formControl.className = 'form-control success'
}
function checkLength( input, min, max ){
    console.log(  input.value.length )
    if( input.value.length < min ){
        showError( input, `${ getFieldName(input) } must be ${ min} characters`)
    } else if( input.value.length < max ) {
        showError( input, `${ getFieldName(input) } must be ${ max} characters`)
    }
}
function checkRequired( inputArray ) {
    inputArray.forEach( ( input )=>{
        if( input.value.trim() === '' ){
            console.log( input)
            showError( input,  `${getFieldName(input)} is required`)
        } else{
            showSuccess(input)
        }
    })
}
function getFieldName( input ){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkPassword(input1, input2) {
    if( input1.value != input2.value){

        console.log( input1.value , input2.value)
        showError(input2, `${getFieldName(input2)} does not match`)
    } else{
        showSuccess(input2)
    }
}

function checkEmail( input ){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(  re.test(input.value) ) {
        showSuccess( input )
    } else {
        showError( input ,  `${getFieldName(input)} must be a valid email`)
    }
}

function proceed(){
    console.log( 1 )   
}
form.addEventListener('submit', function(e){
    e.preventDefault()
    checkRequired([ username, email, password, password2] )
    checkLength( username, 3, 6 )
    checkEmail( email)
    checkPassword( password, password2 )

    if( !error ){
        proceed()
    }
})