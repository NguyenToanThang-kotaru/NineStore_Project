// ---------------------------------None Block Register & Login-------------------------
const homePage = document.querySelector("#home-page");
const registerbtn = document.querySelectorAll(".register-btn");
const loginPage = document.querySelector(".login-page");
const registerPage = document.querySelector(".register-page");
const userLocal = JSON.parse(localStorage.getItem("users")) || [];

registerbtn.forEach((register) => {
  register.addEventListener("click", (e) => {
    e.preventDefault();
    homePage.style.display = "none";
    registerPage.style.display = "block";
    loginPage.style.display = "none";
    document.getElementById("name-register").focus();
  });
});

const loginbtn = document.querySelectorAll(".login-btn");
loginbtn.forEach((login) => {
  login.addEventListener("click", (e) => {
    e.preventDefault();
    homePage.style.display = "none";
    registerPage.style.display = "none";
    loginPage.style.display = "block";
    document.getElementById("email-login").focus();
  });
});

function scrollHead(){ // Quay ve dau trang
  window.scrollTo({        
    top:0,
    behavior: 'smooth'
  })
}
// ---------------------------------None Block Product -------------------------
// const ProductMac = document.querySelector('#container_Mac');
// const ProductHome = document.querySelector('#ProductHome');
// const allFooter = document.querySelector('#allFooter');
// const active_mac = document.querySelector('.mac_Product')
// const active_mac2 = document.querySelector('.mac_Product2')
// const SlideShow = document.querySelector('#Slideshow')
// active_mac.addEventListener('click',Macproduct_open)
// active_mac2.addEventListener('click',Macproduct_open)


// function Macproduct_open(){
//     SlideShow.style.display = "none";
//     ProductHome.replaceWith(ProductMac);  //replaceWith là hàm để đổi thẻ
//     ProductMac.style.display = "block";
//     scrollHead()
// }

