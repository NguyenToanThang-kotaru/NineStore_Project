// ---------------------------------None Block Register & Login-------------------------
const homePage = document.querySelector("#home-page");
const registerbtn = document.querySelectorAll(".register-btn");
const loginPage = document.querySelector(".login-page");
const registerPage = document.querySelector(".register-page");
const userLocal = JSON.parse(localStorage.getItem("users")) || [];
const closeRegis = document.querySelectorAll('.esc-register');

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

closeRegis.forEach(close => {
  close.addEventListener('click',register_close)
  function register_close(){
    homePage.style.display ="block";
    registerPage.style.display="none";
  }
})

function scrollHead(){ // Quay ve dau trang
  window.scrollTo({        
    top:0,
    behavior: 'smooth'
  })
}
// ---------------------------------None Block Product -------------------------
const ProductMac = document.querySelector('#container_Mac');
const ProductAsus = document.querySelector('#container_Asus');
const ProductDell = document.querySelector('#container_Dell');
const ProductHome = document.querySelector('#ProductHome');
const allFooter = document.querySelector('#allFooter');
const active_mac = document.querySelector('.mac_Product');
const active_mac2 = document.querySelector('.mac_Product2');
const active_mac3 = document.querySelector('.mac_Product3');
const active_asus = document.querySelector('.asus_Product');
const active_asus2 = document.querySelector('.asus_Product2');
const active_dell = document.querySelector('.dell_Product');
const active_dell2 = document.querySelector('.dell_Product2');
const SlideShow = document.querySelector('#Slideshow');
active_mac.addEventListener('click',Macproduct_open);
active_mac2.addEventListener('click',Macproduct_open);
active_mac3.addEventListener('click',Macproduct_open);
active_asus.addEventListener('click',Asusproduct_open);
active_asus2.addEventListener('click',Asusproduct_open);
active_dell.addEventListener('click',Dellproduct_open);
active_dell2.addEventListener('click',Dellproduct_open);

function Macproduct_open(){
    SlideShow.style.display = "none";
    ProductHome.insertAdjacentElement('beforebegin', ProductMac); // Chèn ProductMac trước ProductHome
    ProductHome.style.display ="none"; // Ẩn thay vì xóa
    ProductMac.style.display = "block";
    ProductAsus.style.display = "none";
    ProductDell.style.display = "none";
    scrollHead()
}

function Asusproduct_open(){  
  SlideShow.style.display = "none";
  ProductHome.insertAdjacentElement('beforebegin', ProductAsus);
  ProductHome.style.display ="none";   
  ProductAsus.style.display = "block";
  ProductMac.style.display = "none";
  ProductDell.style.display = "none";
  scrollHead()
}

function Dellproduct_open(){
  SlideShow.style.display = "none";
  ProductHome.insertAdjacentElement('beforebegin', ProductDell);
  ProductHome.style.display ="none";  
  ProductDell.style.display = "block";
  ProductMac.style.display = "none";
  ProductAsus.style.display = "none";
  scrollHead()
}





