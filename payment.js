function inputFilled(inputs) {
  for (let input of inputs) {
    if (input.tagName === "IMG" && input.src == "") {
      return false;
    }

    if (input.value == "") {
      return false;
    }
  }
  return true;
}

const COD = document.querySelector("#cash-on-delivery");
const atmOptions = document.getElementById("atm-options");
const atmPayment = document.querySelector("#atm-payment");

atmPayment.addEventListener("click", togglePaymentOptions);
function togglePaymentOptions() {
  atmOptions.style.display = "block";
}

COD.addEventListener("click", toggleCOD);
function toggleCOD() {
  atmOptions.style.display = "none";
}

function displayPayment(productList) {
  //---Nhập thông tin vào payment--
  //Thông tin cá nhân
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const name = document.querySelector(".payment-customer-name");
  const email = document.querySelector(".payment-customer-email");
  const phone = document.querySelector("#phone-payment");
  const address = document.querySelector("#address-payment");
  name.innerText = userLogin.FullName;
  email.innerText = userLogin.Email;
  phone.value = userLogin.Phone;
  address.value = userLogin.Address;
  //Hóa đơn
  const today = new Date();
  document.querySelector(".payment-date").innerText = new Intl.DateTimeFormat(
    "vi-VN"
  ).format(today);
  const bodyPayment = document.querySelector(".payment-table tbody");
  let tbodyContent = "";
  productList.forEach((product) => {
    const priceTemp = (
      product.quantity * product.price.replace(/\./g, "")
    ).toLocaleString("de-DE");
    tbodyContent += `
        <tr>
              <td class="payment-product-name">${product.name}</td>
              <td class="payment-quantity">${product.quantity}</td>
              <td class="payment-price">
                <span class="payment-price-value">${priceTemp}</span><sup>đ</sup>
              </td>
        </tr>`;
  });
  const totalPriceCart = document.querySelector(
    ".cart-table tfoot span"
  ).innerText;
  document.querySelector(".payment-total-product-price-value").innerText =
    totalPriceCart;
  document.querySelector(".payment-total-price-value").innerText =
    totalPriceCart;
  bodyPayment.innerHTML = tbodyContent;
  document.querySelector(".payment").style.display = "block";
  //Nghe sự kiện ấn thanh toán
  document
    .querySelector(".submit-payment-btn")
    .addEventListener("click", (event) => {
      event.preventDefault();
      //Kiểm tra xem tất cả đã được điền chưa
      if (inputFilled([address, phone]) == true) {
        //Xem đã chọn phương thức thành toán gì
        const radios = document.getElementsByName("payment");
        let isCheck = false;
        let payment = "";
        radios.forEach((radio) => {
          if (radio.checked == true) {
            isCheck = true;
            payment = radio.value;
          }
        });
        const cardNumber = document.querySelector("#card-number");
        let atmNumber = "";
        
        if (payment == "atm") {
          if (inputFilled([cardNumber]) == false) {
            alert("Vui lòng nhập số thẻ");
            return;
          }
          atmNumber = cardNumber;
        }
        //Cập nhật lại sđt và địa chỉ
        userLogin.Phone = phone.value;
        userLogin.Address = address.value;
        const users = JSON.parse(localStorage.getItem("users")) || [];
        for (let i = 0; i < users.length; i++) {
          if (users[i].UserId === userLogin.UserId) {
            users[i] = userLogin;
            break;
          }
        }
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("userLogin", JSON.stringify(userLogin));


        //Lưu các thông tin vào localStorage
        if (isCheck == true) {
          const orders = JSON.parse(localStorage.getItem("orders")) || [];
          const order = {
            ID: Math.round(Math.random() * 10000000000),
            ProductList: productList,
            Customer: userLogin,
            OrderDate: today,
            Pay: payment,
            CardNumber: atmNumber,
            Status: "Chưa xác nhận",
          };
          orders.push(order)
          localStorage.setItem("orders", JSON.stringify(orders));
        } else {
          alert("Vui lòng chọn một phương thức thanh toán");
        }
      } else {
        alert("Không bỏ trống thông tin nào");
      }
    });
}
