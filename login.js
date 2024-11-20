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
