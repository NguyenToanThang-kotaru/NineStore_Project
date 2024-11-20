const registerbtn = document.querySelectorAll(".register-btn");
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

const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const repassword = document.querySelector("#re-password");
const phone = document.querySelector("#phone");
const address = document.querySelector("#address");
const formRegister = document.querySelector(".form-register");

// Lấy dữ liệu từ localStorage
function showError(e, message) {
  let parentInput = e.parentElement;
  let errorText = parentInput.querySelector("p");
  e.classList.add("error");
  errorText.innerText = message;
}
function showSuccess(e) {
  let parentInput = e.parentElement;
  let errorText = parentInput.querySelector("p");
  e.classList.remove("error");
  errorText.innerText = "";
}

function checkEmptyError(input) {
  let isEmptyError = false;
  input.value = input.value.trim();
  if (!input.value) {
    isEmptyError = true;
    showError(input, "Không được để trống");
  } else {
    showSuccess(input);
  }
  return isEmptyError;
}

function checkLengthError(input, min) {
  input.value = input.value.trim();
  let isLengthError = input.value.length < min;
  if (isLengthError) {
    showError(input, `Phải có ít nhất ${min} ký tự`);
  }
  return isLengthError;
}

function checkEmailError(input) {
  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  input.value = input.value.trim();
  let isEmailError = !regexEmail.test(input.value);
  let isEmailSame = false;
  const usersLocal = JSON.parse(localStorage.getItem("users")) || [];
  usersLocal.forEach((user) => {
    if (user.Email === input.value) isEmailSame = true;
  });
  if (!isEmailError && !isEmailSame) {
    showSuccess(input);
  } else {
    if (isEmailError) {
      showError(input, "Email không hợp lệ");
    } else {
      showError(input, "Email này đã được đăng ký");
    }
  }
  return isEmailError || isEmailSame;
}
function checkMatchPasswordError(passwordInput, rePasswordInput) {
  if (passwordInput.value !== rePasswordInput.value)
    showError(rePasswordInput, "Mật khẩu không khớp");
  return passwordInput.value !== rePasswordInput.value;
}
formRegister.addEventListener("submit", (e) => {
  e.preventDefault();

  let isUsernameEmptyError = checkEmptyError(username);
  let isEmailEmptyError = checkEmptyError(email);
  let isPasswordEmptyError = checkEmptyError(password);
  let isRepasswordEmptyError = checkEmptyError(repassword);

  let isUsernameLengthError = true;
  let isEmailError = true;
  let isMatchError = true;
  if (!isUsernameEmptyError) {
    isUsernameLengthError = checkLengthError(username, 5);
  }
  if (!isEmailEmptyError) {
    isEmailError = checkEmailError(email);
  }
  if (!isRepasswordEmptyError) {
    isMatchError = checkMatchPasswordError(password, repassword);
  }
  if (isEmailError || isUsernameLengthError || isMatchError) {
    //do nothing
  } else {
    setTimeout(
      (document.querySelector(".register-success").style.display = "block"),
      3000
    );
    const user = {
      UserId: Math.ceil(Math.random() * 10000000000),
      UserName: username.value,
      Email: email.value,
      Password: password.value,
      Phone: phone.value,
      Address: address.value,
      OrderHistory: [],
    };
    userLocal.push(user);
    localStorage.setItem("users", JSON.stringify(userLocal));
  }
});
// --------------------------------------------- Login Page-----------------------------------
const homePage = document.querySelector(".home-page");
const loginPage = document.querySelector(".login-page");
const registerPage = document.querySelector(".register-page");

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
// --------------------------------------------- Login funtion-----------------------------------
const adminAccount = {
  UserName: "admin",
  Password: "admin123",
};
const loginSubmit = document.querySelector(".login-submit");
loginSubmit.addEventListener("click", (event) => {
  const userLocalLogin = JSON.parse(localStorage.getItem("users")) || [];
  const emailLogin = document.getElementById("email-login");
  const passwordLogin = document.getElementById("password-login");
  event.preventDefault();
  if (
    adminAccount.UserName === emailLogin.value &&
    adminAccount.Password === passwordLogin.value
  ) {
    setTimeout(
      (document.querySelector(".login-success").style.display = "block"),
      3000
    );
    document.querySelector(".login-error").style.display = "none";
    localStorage.setItem("userLogin", JSON.stringify(adminAccount));
    isLogin = true;
  } else {
    const findUser = userLocalLogin.find(
      (user) =>
        (user.UserName === emailLogin.value ||
          user.Email === emailLogin.value) &&
        user.Password === passwordLogin.value
    );
    if (!findUser) {
      document.querySelector(".login-error").style.display = "block";
    } else {
      const userLock = JSON.parse(localStorage.getItem("userLock")) || [];
      let isLock = false;
      userLock.forEach((user) => {
        if (user === emailLogin.value) isLock = true;
      });
      if (isLock == true) alert("Tài khoản đang bị khóa");
      else {
        setTimeout(
          (document.querySelector(".login-success").style.display = "block"),
          3000
        );
        document.querySelector(".login-error").style.display = "none";
        localStorage.setItem("userLogin", JSON.stringify(findUser));
        isLogin = true;
      }
    }
  }
});
// -------------------------------- home ------------------------------
var adminLoginAccount = JSON.parse(localStorage.getItem("userLogin"));
if (adminLoginAccount)
  var isAdmin =
    adminAccount.UserName === adminLoginAccount.UserName ? true : false;
var isLogin = localStorage.getItem("userLogin") ? true : false;
function reloadPage() {
  window.location.href = "index.html";
}
if (isLogin) {
  document.querySelector(".account-option-item.login-btn").style.display =
    "none";
  document.querySelector(".account-option-item.register-btn").style.display =
    "none";
  if (isAdmin) {
    document.querySelector(".admin-item").style.display = "block";
  }
} else {
  document.querySelector(".account-option-item.info-btn").style.display =
    "none";
  document.querySelector(".account-option-item.logout-btn").style.display =
    "none";
}
function showInfo() {
  document.querySelector(".info-account").style.display = "block";
}
function innerInfo() {
  const infoTable = document.querySelector(".info-table");
  const userLogin = JSON.parse(localStorage.getItem("userLogin")) || [];
  if (isAdmin) infoTable.innerHTML = `Bạn đang là Admin`;
  else {
    infoTable.innerHTML = `<tr>
            <td>Tên:</td>
            <td>${userLogin.UserName}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>${userLogin.Email}</td>
          </tr>
          <tr>
            <td>Địa chỉ:</td>
            <td>${userLogin.Address}</td>
          </tr>
          <tr>
            <td>Số điện thoại:</td>
            <td>${userLogin.Phone}</td>
          </tr>
          <button class="order-history-btn" onclick="showHistory()">Xem lịch sử đặt hàng</button>`;
  }
}
innerInfo();
function logOut() {
  localStorage.removeItem("userLogin");
  isLogin = false;
  isAdmin = false;
  window.location.href = "index.html";
}
// -------------------------------- OrderHistory ------------------------------
function addToHistory() {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const orders = userLogin.OrderHistory;
  const historyTableList = document.querySelector(".history-table-list");
  let tableContent = "";
  orders.forEach((order, index) => {
    let theadcontent = "";
    let tbodycontent = "";
    let tfootcontent = "";
    const addthead = document.createElement("thead");
    const addtbody = document.createElement("tbody");
    const addtfoot = document.createElement("tfoot");
    // ----------------------thead---------------------
    theadcontent = `
          <thead>
          <tr><td colspan="3" class="history-order-id">Đơn hàng ${
            index + 1
          }:</td></tr>
            <tr>
              <th>Sản phẩm</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
            </tr>
          </thead>`;
    addthead.innerHTML = theadcontent;
    // historyBox.append(addthead);
    // ----------------------tbody---------------------
    order.orderList.forEach((item) => {
      tbodycontent =
        tbodycontent +
        `<tr>
              <td>
                <img src="${item.Img}" class="history-order-img">
                <span class="history-order-name">${item.Name}</span>
              </td>
              <td><span class="history-order-price">${item.Price}</span><sup>đ</sup></td>
              <td class="history-order-quantity">${item.Quantity}</td>
            </tr>`;
    });
    addtbody.innerHTML = tbodycontent;
    // historyBox.append(addtbody);
    // ----------------------tfoot---------------------
    tfootcontent = `<tfoot>
            <tr>
              <td colspan="3" class="totalPrice">Tổng cộng: <span class="total-price-value">${order.totalPrice}</span><sup>đ</sup></td>
            </tr>
            <tr>
              <td colspan="3" class="history-order-status">Tình trạng: <span class="history-order-status-text">${order.Status}</span></td>
            </tr>
          </tfoot>`;
    addtfoot.innerHTML = tfootcontent;
    tableContent =
      tableContent +
      '<table class="history-table">' +
      theadcontent +
      tbodycontent +
      tfootcontent +
      "</table>";
  });
  historyTableList.innerHTML = tableContent;
  checkHistoryEmpty();
}
function checkHistoryEmpty() {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const historyEmpty = document.querySelector(".history-empty");
  const orders = userLogin.OrderHistory;
  if (orders) {
    historyEmpty.style.display = "none";
  } else {
    historyEmpty.style.display = "block";
  }
}
function showHistory() {
  addToHistory();
  document.querySelector(".history-page").style.display = "block";
}
// -------------------------------- Admin ------------------------------
function showAdminPage() {
  window.location.href = "admin.html";
}
console.log(window.location.pathname);
