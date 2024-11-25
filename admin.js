// functions
{
  // function to open and close pages in admin
  function toggleForm(formId, mode) {
    const form = document.getElementById(formId);
    form.classList.remove(mode === "open" ? "disable" : "enable");
    form.classList.add(mode === "open" ? "enable" : "disable");
  }

  // function to close the pop-up window when click the overlay

  function hideOverlay() {
    const overlayArr = document.querySelectorAll(".overlay") || [];
    overlayArr.forEach((overlays) => {
      overlays.addEventListener("click", (event) => {
        if (event.target === overlays) {
          overlays.style.removeProperty("display");
          overlays.style.display = "none";
        }
      });
    });
    const closes = document.querySelectorAll(".close") || [];
    closes.forEach((closebtn) => {
      closebtn.addEventListener("click", () => {
        closebtn.parentElement.parentElement.style.display = "none";
      });
    });
  }

  // clear the input inside the form
  function clearInput(inputs) {
    inputs.forEach((input) => {
      input.value = "";
      if (input.tagName === "IMG") {
        input.src = "";
      }
    });
  }

  // check if the input is empty
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

  // function to check if the input is not filled
  function returnInputNotFilled(inputs) {
    for (let input of inputs) {
      if ((input.tagName === "IMG" && input.src == "") || input.value == "") {
        return input;
      }
    }
    return -1;
  }

  // find ID
  function findId(id, productArray) {
    for (let x in productArray) {
      if (productArray[x].id == id) {
        return Number(x);
      }
    }
    return -1;
  }

  // if admin upload image & submit => show image (look this shit again)
  // function getImageUrl(id) {
  //   let input = document.getElementById(id);
  //   input.addEventListener("change", function (event) {
  //     const imagefile = event.target.files[0];
  //     const reader = new FileReader();
  //     reader.onload = function (e) {
  //       input.src = e.target.result;
  //     };
  //     reader.readAsDataURL(imagefile);
  //   });
  // }

  // function changePreview(inputElement) {
  //   console.log(inputElement.parentElement)
  //   const preview = inputElement.parentElement.querySelector('.form__preview')
  //   preview.src = document.getElementById(this).src;
  // }

  // handle image files upload from an input element
  function uploadImg(inputElement) {
    const preview = inputElement.parentElement.querySelector(".form__preview"); // references preview image
    const fileSelected = inputElement.files;
    if (fileSelected.length > 0) {
      const fileToLoad = fileSelected[0];
      const fileReader = new FileReader();
      fileReader.onload = function (
        fileLoaderEvent // when the file are read
      ) {
        const srcNew = fileLoaderEvent.target.result;
        preview.src = srcNew;
      };
      fileReader.readAsDataURL(fileToLoad);
    }
  }

  // display more details
  function toggleMoreDetail() {
    const moreDetail = document.querySelector(".form__sp-description-more");
    const moreDisplayStyle = window.getComputedStyle(moreDetail).display; // contains the display of the description
    if (moreDisplayStyle === "none") {
      moreDetail.style.display = "block"; // Hiển thị phần tử
    } else {
      moreDetail.style.display = "none"; // Ẩn phần tử
    }
  }

  // show the add-product form
  function showProductAdd() {
    document.querySelector(".product__add").style.display = "block";
  }

  // show the add-admin form
  function showAdminAdd() {
    document.querySelector(".admin__add").style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  /* 
        if user is admin
            show the admin page
        else if user is not admin
            show image cannot go in
    */

  // check if the account logged in is an admin
  const user = JSON.parse(localStorage.getItem("userLogin"));
  if (user.UserType == "admin") {
    document.querySelector(".image__cannot-go-in").style.display = "none";
    document.querySelector(".admin__page").style.display = "block";
  } else {
    document.querySelector(".admin__page").style.display = "none";
    document.querySelector(".image__cannot-go-in").style.display = "block";
  }

  hideOverlay();
  // side menu
  const sp = document.getElementById("side-menu__menu-sp");
  const donHang = document.getElementById("side-menu__menu-order");
  const customer = document.getElementById("side-menu__menu-customer");
  const thongke = document.getElementById("side-menu__menu-statistic");

  // products
  const addItem = document.getElementById("product__btn-add-item");
  const editItem = document.getElementById("product__btn-edit-item");
  const removeItem = document.getElementById("product__btn-remove-item");

  const submitEditItem = document.getElementById("form__submit-edit-item");
  const submitRemoveItem = document.getElementById("form__submit-remove-item");

  // orders

  // customers
  const customerList = document.getElementById("customer__list-body");

  // statistic

  // some attributes
  const tenSP = document.getElementById("form__sp-name");
  const soluongSP = document.getElementById("form__sp-quantity");
  const giaSP = document.getElementById("form__sp-price");
  const chitietSP = document.getElementById("form__sp-description");
  const hinhSP = document.getElementById("form__sp-img");
  let productID = 1;

  const editIdSP = document.getElementById("form__edit-id");
  const editTenSP = document.getElementById("form__edit-name");
  const editSoluongSP = document.getElementById("form__edit-quantity");
  const editGiaSP = document.getElementById("form__edit-price");
  const editChitietSP = document.getElementById("form__edit-description");
  const editHinhSP = document.getElementById("form__edit-img");

  const removeIdSP = document.getElementById("form__remove-id");

  // array to store products

  // open / close a page when the icon is clicked
  {
    // open product lists
    sp.addEventListener("click", function () {
      toggleForm("product", "open");
      toggleForm("order", "close");
      toggleForm("customer", "close");
      toggleForm("statistic", "close");
    });

    // open orders
    donHang.addEventListener("click", function () {
      toggleForm("order", "open");
      toggleForm("product", "close");
      toggleForm("customer", "close");
      toggleForm("statistic", "close");
    });

    // open statistic
    thongke.addEventListener("click", function () {
      toggleForm("statistic", "open");
      toggleForm("product", "close");
      toggleForm("order", "close");
      toggleForm("customer", "close");
    });

    // open customer
    customer.addEventListener("click", function () {
      checkBlock();
      toggleForm("customer", "open");
      toggleForm("product", "close");
      toggleForm("order", "close");
      toggleForm("statistic", "close");
    });

    // open form to add products

    // open form to edit products
    // open form to add orders
  }

  // Function to block customers
  customerList.addEventListener("click", function (event) {
    if (event.target.closest(".customer__status")) {
      // if the button clicked has the class "customer__status"
      const customerStatus = event.target.closest(".customer__status");
      if (customerStatus.innerText == "Hoạt động") {
        if (confirm("Bạn có chắc chắn muốn khóa tài khoản này không?")) {
          customerStatus.innerText = "Đã khóa";
          customerStatus.style.backgroundColor = "red";
          customerStatus.style.color = "white";
          // take the customer's email, add it in the userLock array, then update the local storage
          const emailLock =
            customerStatus.parentElement.parentElement.querySelector(
              ".customer__userEmail"
            ).innerText;
          const userLock = JSON.parse(localStorage.getItem("userLock")) || [];
          userLock.push(emailLock);
          localStorage.setItem("userLock", JSON.stringify(userLock));
        }
      } else if (customerStatus.innerText == "Đã khóa") {
        if (confirm("Bạn có chắc chắn muốn mở khóa tài khoản này không?")) {
          customerStatus.innerText = "Hoạt động";
          customerStatus.style.backgroundColor = "green";
          customerStatus.style.color = "black";
          // take the customer's email, remove it out the userLock array, then update the local storage
          const emailLock =
            customerStatus.parentElement.parentElement.querySelector(
              ".customer__userEmail"
            ).innerText;
          const userLock = JSON.parse(localStorage.getItem("userLock")) || [];
          for (let i = 0; i < userLock.length; i++)
            if (emailLock == userLock[i]) userLock.splice(i, 1);
          localStorage.setItem("userLock", JSON.stringify(userLock));
        }
      }
    }
  });

  // check if the customer is blocked => change the button status's style
  function checkBlock() {
    const customerStatus = customerList.querySelectorAll(".customer__status");
    customerStatus.forEach((status) => {
      const emailLock = status.parentElement.parentElement.querySelector(
        ".customer__userEmail"
      ).innerText;
      const userLock = JSON.parse(localStorage.getItem("userLock")) || [];
      for (let i = 0; i < userLock.length; i++)
        if (emailLock == userLock[i]) {
          status.innerText = "Đã khóa";
          status.style.backgroundColor = "red";
          status.style.color = "white";
        }
    });
  }
  // check if the pay and the ship is checked => its background will be green

  //--------------------------------- Customer -----------------------------
  function addCustomertoTable() {
    const userLocal = JSON.parse(localStorage.getItem("users")) || [];
    let customerContent = "";
    userLocal.forEach((user) => {
      customerContent =
        customerContent +
        `<tr id="KH#1">
                                            <td class="customer__userID">${user.UserId}</td>
                                            <td class="customer__userName">${user.UserName}</td>
                                            <td class="customer__userPhone">${user.Phone}</td>
                                            <td class="customer__userAddress">${user.Address}</td>
                                            <td class="customer__userEmail">${user.Email}</td>
                                            <td><button type="button" class="customer__status" title="Nhấp chuột để thay đổi trạng thái">Hoạt động</button></td>
                                         </tr>`;
    });
    document.querySelector("#customer__list-body").innerHTML = customerContent;
  }
  addCustomertoTable();
  //--------------------------------- Product -----------------------------
  // ------------ Add ------------
  function addProducttoTable() {
    const products = JSON.parse(localStorage.getItem("products"));
    let productContent = "";
    products.forEach((product) => {
      productContent += `<tr>
                    <td class="product__id">${product.ID}</td>
                    <td class="product__name">${product.Name}</td>
                    <td class="product__quantity">${product.Quantity}</td>
                    <td class="product__price">${product.Price}</td>
                    <td>Chi tiết</td>
                    <td class="product__img"><img src="${product.Img}" /></td>
                    <td>
                      <i class="fa-regular fa-pen-to-square edit-icon" onclick="editProduct(this)"></i>
                      <i class="fa-solid fa-trash delete-icon" onclick="deleteProduct(this)"></i>
                    </td>
                  </tr>`;
    });
    document.querySelector("#product__list-body").innerHTML = productContent;
  }
  addProducttoTable();
  //Khi ấn vào submit thì thêm vào localStorage và thêm vào bảng (trường hợp chưa load trang)
  document
    .querySelector(".form__submit-btn")
    .addEventListener("click", addOneProduct);
  function addOneProduct(event) {
    event.preventDefault();
    const name = document.getElementById("form__sp-name");
    const brand = document.getElementById("form__sp-brand");
    const quantity = document.getElementById("form__sp-quantity");
    const price = document.getElementById("form__sp-price");
    const img = document.getElementById("form__preview-img");
    const cpu = document.getElementById("form__sp-cpu");
    const screen = document.getElementById("form__sp-screen");
    const ram = document.getElementById("form__sp-ram");
    const rom = document.getElementById("form__sp-rom");
    const os = document.getElementById("form__sp-os");
    const card = document.getElementById("form__sp-card");
    const pin = document.getElementById("form__sp-pin");
    const network = document.getElementById("form__sp-network");
    const weight = document.getElementById("form__sp-weight");
    const detailImg = document.getElementById("form__preview-detail-img");
    if (!inputFilled([name, quantity, price, img])) {
      return false;
    } else if (isNaN(quantity.value)) {
      alert("Vui lòng nhập số.");
      quantity.focus();
      return false;
    } else if (isNaN(price.value)) {
      alert("Vui lòng nhập số.");
      price.focus();
      return false;
    }
    // bring values into table
    else {
      // do the thing
      const product = {
        ID: Math.round(Math.random() * 10000000000),
        Img: img.src,
        Name: name.value,
        Brand: brand.value,
        Price: price.value,
        Quantity: quantity.value,
        Detail: {
          Img: detailImg.src,
          CPU: cpu.value,
          Screen: screen.value,
          RAM: ram.value,
          ROM: rom.value,
          OS: os.value,
          Card: card.value,
          Pin: pin.value,
          Network: network.value,
          Weight: weight.value,
        },
      };
      // Thêm vào bảng khi không load trang
      const productContent = `
                        <tr>
                            <td class="product__id">${product.ID}</td>
                            <td class="product__name">${product.Name}</td>
                            <td class="product__quantity">${product.Quantity}</td>
                            <td class="product__price">${product.Price}</td>
                            <td>Chi tiết</td>
                            <td class="product__img"><img src="${product.Img}"/></td>
                            <td>
                              <i class="fa-regular fa-pen-to-square edit-icon" onclick="editProduct(this)"></i>
                              <i class="fa-solid fa-trash delete-icon" onclick="deleteProduct(this)"></i>
                            </td>
                        </tr>
                    `;
      const addtr = document.createElement("tr");
      addtr.innerHTML = productContent;
      console.log(addtr);
      document.getElementById("product__list-body").appendChild(addtr);
      // store data into localStorage
      const products = JSON.parse(localStorage.getItem("products")) || [];
      products.push(product);
      localStorage.setItem("products", JSON.stringify(products));

      // make all the input empty
      clearInput([
        name,
        brand,
        quantity,
        price,
        img,
        price,
        cpu,
        screen,
        ram,
        rom,
        os,
        card,
        pin,
        network,
        weight,
      ]);
      document.querySelector("#form__preview-img").src =
        "./img/no-photo-or-blank-image.jpg";
      document.querySelector("#form__preview-detail-img").src =
        "./img/no-photo-or-blank-image.jpg";
    }
  }
});
// ------------ Edit ------------
function editProduct(productElement) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const divProduct = productElement.parentElement.parentElement;
  const id = divProduct.querySelector(".product__id").innerText;
  const nameText = divProduct.querySelector(".product__name");
  const quantityText = divProduct.querySelector(".product__quantity");
  const priceText = divProduct.querySelector(".product__price");
  const imgDiv = divProduct.querySelector(".product__img");
  for (let i = 0; i < products.length; i++) {
    if (products[i].ID == id) {
      const name = document.getElementById("form__edit-name");
      const brand = document.getElementById("form__edit-brand");
      const quantity = document.getElementById("form__edit-quantity");
      const price = document.getElementById("form__edit-price");
      const img = document.getElementById("form__edit-preview-img");
      const cpu = document.getElementById("form__edit-cpu");
      const screen = document.getElementById("form__edit-screen");
      const ram = document.getElementById("form__edit-ram");
      const rom = document.getElementById("form__edit-rom");
      const os = document.getElementById("form__edit-os");
      const card = document.getElementById("form__edit-card");
      const pin = document.getElementById("form__edit-pin");
      const network = document.getElementById("form__edit-network");
      const weight = document.getElementById("form__edit-weight");
      const detailImg = document.getElementById(
        "form__edit-preview-detail-img"
      );

      name.value = products[i].Name;
      brand.value = products[i].Brand;
      quantity.value = products[i].Quantity;
      price.value = products[i].Price;
      img.src = products[i].Img;
      cpu.value = products[i].Detail.CPU;
      screen.value = products[i].Detail.Screen;
      ram.value = products[i].Detail.RAM;
      rom.value = products[i].Detail.ROM;
      os.value = products[i].Detail.OS;
      card.value = products[i].Detail.Card;
      pin.value = products[i].Detail.Pin;
      network.value = products[i].Detail.Network;
      weight.value = products[i].Detail.Weight;
      detailImg.src = products[i].Detail.Img;
      // ----- Submit ------
      document
        .querySelector(".form__edit-submit-btn")
        .addEventListener("click", (event) => {
          event.preventDefault();
          const product = {
            ID: id,
            Img: img.src,
            Name: name.value,
            Brand: brand.value,
            Price: price.value,
            Quantity: quantity.value,
            OriginalPrice: "",
            Detail: {
              Img: detailImg.src,
              CPU: cpu.value,
              Screen: screen.value,
              RAM: ram.value,
              ROM: rom.value,
              OS: os.value,
              Card: card.value,
              Pin: pin.value,
              Network: network.value,
              Weight: weight.value,
            },
          };
          nameText.innerText = product.Name;
          quantityText.innerText = product.Quantity;
          priceText.innerText = product.Price;
          imgDiv.src = product.Img;
          products[i] = product;
          localStorage.setItem("products", JSON.stringify(products));
        });
      break;
    }
  }
  document.querySelector(".product__edit").style.display = "block";
}
// ------------ Delete ------------
function deleteProduct(productElement) {
  if (confirm("Bạn có chắc chắn xóa sản phẩm này")) {
    const divProduct = productElement.parentElement.parentElement;
    const id = divProduct.querySelector(".product__id").innerText;
    const products = JSON.parse(localStorage.getItem("products")) || [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].ID == id) {
        products.splice(i, 1);
        localStorage.setItem("products", JSON.stringify(products));
        break;
      }
    }
    divProduct.remove();
  }
}

//--------------------------------- Order -----------------------------
function addOrdertoTable() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  let orderContent = "";
  orders.forEach((order) => {
    //detail
    let productContent = "";
    order.ProductList.forEach((product) => {
      productContent += `
      <tr>
                                                      <td class="order-detail-id">${product.ID}</td>
                                                      <td>
                                                        <div class="order-detail-product">
                                                          <img
                                                            src="${product.Img}"
                                                            class="order-detail-img"
                                                          />
                                                          <div class="order-detail-name"
                                                            >${product.Name}</
                                                          >
                                                        </div>
                                                      </td>
                                                      <td>
                                                        <span class="order-detail-price"
                                                          >${product.Price}</span
                                                        ><sup>đ</sup>
                                                      </td>
                                                      <td class="order-detail-quantity">${product.Quantity}</td>
      </tr>
      `;
    });
    //order
    const orderDate = new Date(order.OrderDate);
    const formattedDate = new Intl.DateTimeFormat("vi-VN").format(orderDate);
    orderContent =
      orderContent +
      `<tr>
                                        <td class="order__id">${order.ID}</td>
                                        <td class="order__customer-id">${order.Customer.UserId}</td>
                                        <td class="order__price"><span class="order__price">${order.TotalPrice}</span
                                            ><sup>đ</sup></td>
                                        <td class="order__date">${formattedDate}</td>
                                        <td class="order__status">${order.Status}</td>
                                        <td>
                                          <button class="order__detail" onclick="showOrderDetail(this)">Xem chi tiết</button>
                                          <div class="overlay">
                                            <div class="order__detail-box">
                                              <i class="fa-solid fa-rectangle-xmark close"></i>
                                              <h2 class="order-detail-heading">
                                                Các sản phẩm trong đơn
                                              </h2>
                                              <div class="order-detail-table-list">
                                                <table class="order-detail-table">
                                                  <thead>
                                                    <tr>
                                                      <th style="width: 20%">Mã sản phẩm</th>
                                                      <th style="width: 50%">Sản phẩm</th>
                                                      <th style="width: 20%">Đơn giá</th>
                                                      <th style="width: 10%">Số lượng</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>` +
      productContent +
      `</tbody>
                                                  <tfoot>
                                                    <tr>
                                                      <td colspan="4" class="totalPrice">
                                                        Tổng cộng:
                                                        <span class="total-price-value">${order.TotalPrice}</span
                                                        ><sup>đ</sup>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td colspan="4" class="order-detail-status">
                                                        <label for="option-status"
                                                          >Tình trạng</label
                                                        >
                                                        <select
                                                          id="option-status"
                                                          name="option-status"
                                                        >
                                                          <option value="Chưa xử lý">Chưa xử lý</option>
                                                          <option value="Đã xử lý">Đã xử lý</option>
                                                          <option value="Đang giao">
                                                            Đang giao
                                                          </option>
                                                          <option value="Đã giao">Đã giao</option>
                                                          <option value="Đã hủy">Đã hủy</option>
                                                        </select>
                                                      </td>
                                                    </tr>
                                                  </tfoot>
                                                </table>
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                    </tr>`;
  });
  document.querySelector(".order-table tbody").innerHTML = orderContent;
}
addOrdertoTable();

function showOrderDetail(orderElement) {
  console.log(orderElement.parentElement);
  orderElement.parentElement.querySelector(".overlay").style.display = "block";
}
