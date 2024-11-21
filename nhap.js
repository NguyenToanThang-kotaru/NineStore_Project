const register = document.querySelector('.register');
const login = document.querySelector('.login');
const page = document.querySelector('#page');

const register_button = document.querySelector('#registerr');
const close_register_button = document.querySelector('#clsbtn')
const swaplogin = document.querySelector('#swaplogin')
const swapregister = document.querySelector('#swapregister')

const login_button = document.querySelector('#loginn')
const close_login_button = document.querySelector('#closelogin')

register_button.addEventListener('click',register_open)
close_register_button.addEventListener('click',close_register)

login_button.addEventListener('click',login_open);
close_login_button.addEventListener('click',close_login)

swaplogin.addEventListener('click',swap_login)
swapregister.addEventListener('click',swap_register)

function register_open(){
    register.style.display = "block"; 
    page.style.display = "none";
}

function close_register(){
    register.style.display = "none"; 
    page.style.display = "block"; 
}

function login_open() {
    login.style.display = "block";
    page.style.display = "none"
}
function close_login(){
    login.style.display = "none"; 
    page.style.display = "block"; 
}

function swap_login() {
    login.style.display = "block";
    register.style.display = "none";
}

function swap_register() {
    login.style.display = "none";
    register.style.display = "block";
}