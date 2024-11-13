function login() {
    const div = document.querySelector('.register');
    div.style.display = "block"; // Hiện thẻ div
    const div1 = document.querySelector('#page');
    div1.style.display = "none"
}
function closeclick(){
    const div = document.querySelector('.register');
    div.style.display = "none"; // Hiện thẻ div
    const div1 = document.querySelector('#page');
    div1.style.display = "block"; // Hiện thẻ div
}

const div2 = document.querySelector('#loginnn')
div2.addEventListener('click',login);
