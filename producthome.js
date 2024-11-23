//------------------------- Detail ----------------------
// Hiển thị cửa sổ thông tin sản phẩm
function showDetail(detailElement) {
  detailElement.parentElement.parentElement.querySelector(
    ".overlay"
  ).style.display = "block";
}
// tăng giảm số lượng để đặt hàng trong thông tin
function decreaseQuantity(minusElement) {
  var detailQuantity = minusElement.parentElement.querySelector(
    ".detail-quantity-value"
  );
  var quantityValue = Number(detailQuantity.value);
  if (quantityValue > 1) {
    quantityValue--;
    detailQuantity.value = quantityValue;
  }
}
function increaseQuantity(plusElement) {
  var detailQuantity = plusElement.parentElement.querySelector(
    ".detail-quantity-value"
  );
  var quantityValue = Number(detailQuantity.value);
  quantityValue++;
  detailQuantity.value = quantityValue;
}
// ngăn không cho nhập số < 1
const detailQuantityList = document.querySelectorAll(".detail-quantity-value");
detailQuantityList.forEach((inputNumber) => {
  inputNumber.addEventListener("input", () => {
    if (inputNumber.value < 1) {
      inputNumber.value = "";
    }
  });
});
//------------------------- Product ----------------------
//kiểm tra xem đã thêm danh sách có sẵn vào localStorage hay chưa
if (!localStorage.getItem("products")) {
  let products = [];
  //khởi tạo và duyệt tất cả sản phẩm
  const productListItem = document.querySelectorAll(".all-product-item");
  productListItem.forEach((item) => {
    //Lấy thông tin sản phẩm và lưu vào product
    const product = {
      ID: Math.round(Math.random() * 10000000000),
      Img: item.querySelector(".product-img").src,
      Name: item.querySelector(".product-name").innerText.trim(),
      Brand: item.querySelector(".product-brand").innerText.trim().trim(),
      Price: item.querySelector(".product-price").innerText.trim(),
      Quantity: item.querySelector(".product-quantity").innerText.trim(),
      // OriginalPrice: item.querySelector(
      //   ".product-original-price .original-price"
      // ).innerText.trim(),
      Detail: {
        Img: item.querySelector(".detail-img").src,
        CPU: item.querySelector(".CPU").innerText.trim(),
        Screen: item.querySelector(".screen").innerText.trim(),
        RAM: item.querySelector(".RAM").innerText.trim(),
        ROM: item.querySelector(".ROM").innerText.trim(),
        OS: item.querySelector(".OS").innerText.trim(),
        Card: item.querySelector(".card").innerText.trim(),
        Pin: item.querySelector(".pin").innerText.trim(),
        Network: item.querySelector(".network").innerText.trim(),
        Weight: item.querySelector(".weight").innerText.trim(),
      },
    };
    //Đẩy product vào mảng products[]
    products.push(product);
  });
  //Đưa mảng products[] vào localStorage
  localStorage.setItem("products", JSON.stringify(products));
}
// Hiển thị sản phẩm đã lưu vào localStorage
function displayProduct(arr) {
  //Xóa sản phẩm đang hiển thị trước đó nếu nó tồn tại
  const productListRemove = document.querySelector(".all-product-list-remove");
  if (productListRemove) productListRemove.remove();
  //Chọn container và tạo thẻ product list
  const productContainer = document.querySelector("#all-product .container");
  const productList = document.createElement("div");
  productList.classList.add("all-product-list");
  productList.classList.add("all-product-list-remove");
  productList.id = "product-list";
  //Những sản phẩm xuất hiện bắt đầu và kết thúc ở vị trí nào trong mảng
  const start = (thisPage - 1) * amountProduct1Page;
  const end = thisPage * amountProduct1Page;

  let productListContent = "";
  arr.forEach((item, index) => {
    if (index >= start && index < end) {
      productListContent += `<section class="product all-product-item" id="${item.ID}">
                <img
                  src="${item.Img}"
                  alt=""
                  class="product-img"
                />
                <p class="product-name">${item.Name}(N5I5052W1)</p>
                <div class="product-brand" style="display: none;">${item.Brand}</div>
                <span class="product-price">${item.Price}</span><sup class="sale-price">₫</sup>
                <div class="product-operation">
                  <i
                    class="fa-regular fa-eye more-details"
                    onclick="showDetail(this)"
                  >
                    <div class="note">Xem thêm thông tin</div>
                  </i>
                  <i class="fa-solid fa-cart-shopping add-cart" onclick="addToCart(this)">
                    <div class="note">Thêm vào giỏ hàng</div>
                  </i>
                </div>
                <div class="overlay" >
                  <div class="detail-box">
                    <i class="fa-solid fa-rectangle-xmark close"></i>
                    <section class="detail-head">
                      <img src="${item.Detail.Img}" class="detail-img">
                      <div class="detail-title">
                        <h2 class="detail-heading">${item.Name}</h2>
                        <span class="detail-price">${item.Price}</span><sup class="sale-price">₫</sup>
                        <div class="product-quantity">Kho: ${item.Quantity}</div>
                        <div class="detail-quantity">
                          <i class="fa-solid fa-circle-minus desc-quantity" onclick="decreaseQuantity(this)"></i>
                          <input type="number" class="detail-quantity-value" value="1" min="1"></input>
                          <i class="fa-solid fa-circle-plus plus-quantity" onclick="increaseQuantity(this)"></i>
                        </div>
                        <div class="detail-btn">
                          <button class="add-cart-btn">Thêm vào giỏ hàng</button>
                          <button class="buy-btn">Mua ngay</button>
                        </div>
                      </div>
                    </section>
                    <h3 class="detail-heading">Thông tin chi tiết</h3>
                    <table class="detail-table">
                    <tr>
                      <td>Bộ xử lý:</td>
                      <td class="CPU">${item.Detail.CPU}</td>
                    </tr>
                    <tr>
                      <td>Card màn hình:</td>
                      <td class="card">${item.Detail.Card}</td>
                    </tr>
                    <tr>
                      <td>Màn hình:</td>
                      <td class="screen">${item.Detail.Screen}</td>
                    </tr>
                    <tr>
                      <td>RAM:</td>
                      <td class="RAM">${item.Detail.RAM}</td>
                    </tr>
                    <tr>
                      <td>Bộ nhớ trong</td>
                      <td class="ROM">${item.Detail.ROM}</td>
                    </tr>
                    <tr>
                      <td>Hệ điều hành:</td>
                      <td class="OS">${item.Detail.OS}</td>
                    </tr>
                    <tr>
                      <td>Hỗ trợ kết nối:</td>
                      <td class="network">${item.Detail.Network}</td>
                    </tr>
                    <tr>
                      <td>Pin:</td>
                      <td class="pin">${item.Detail.Pin}</td>
                    </tr>
                    <tr>
                      <td>Khối lượng:</td>
                      <td class="weight">${item.Detail.Weight}</td>
                    </tr>
                  </table>
                  </div>
                </div>
              </section>`;
    }
  });
  productList.innerHTML = productListContent;
  productContainer.append(productList);
  createListPage(arr);
  hideOverlay();
  // addCart();
  // addCartQuantity();
}

// ----------------------- PHAN TRANG ------------------------
// Tạo mảng chứa tất cả sản phẩm
const productList = JSON.parse(localStorage.getItem("products")) || [];
//Tạo mảng chứa sản phẩm từng loại
let dellList = [];
let asusList = [];
let macList = [];
productList.forEach((product) => {
  if (product.Brand === "Dell") dellList.push(product);
  if (product.Brand === "Asus") asusList.push(product);
  if (product.Brand === "Mac") macList.push(product);
});
//Trang hiện tại là 1
let thisPage = 1;
//Số sản phẩm trong 1 trang là 6
const amountProduct1Page = 6;
function createListPage(arr) {
  const listPage = document.querySelector(".listPage");
  //Tạo số trang = số sảng phẩm / số sản phẩm 1 trang
  const amountPage = Math.ceil(arr.length / amountProduct1Page);
  let s = "";
  for (let i = 1; i <= amountPage; i++) {
    let type = "all";
    if (arr === dellList) type = "dell";
    else if (arr === asusList) type = "asus";
    else if (arr === macList) type = "mac";

    if (i === thisPage) {
      s += `<button onclick="changePage(${i}, '${type}')" class="numberlist active">${i}</button>`;
    } else {
      s += `<button onclick="changePage(${i}, '${type}')" class="numberlist">${i}</button>`;
    }
  }
  listPage.innerHTML = s;
}

function showDELL() {
  thisPage = 1;
  displayProduct(dellList);
}
function showASUS() {
  thisPage = 1;
  displayProduct(asusList);
}
function showMac() {
  thisPage = 1;
  displayProduct(macList);
}

function changePage(page, type) {
  thisPage = page;
  if (type === "dell") {
    displayProduct(dellList);
  } else if (type === "asus") {
    displayProduct(asusList);
  } else if (type === "mac") {
    displayProduct(macList);
  } else;
  displayProduct(productList);
}
// ---------------------- Khi load trang --------------------
window.onload = function () {
  displayProduct(productList);
};
