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
function displayProduct() {
  const products = JSON.parse(localStorage.getItem("products"));
  const productContainer = document.querySelector("#all-product .container");
  const productList = document.createElement("div");
  productList.classList.add("all-product-list");
  productList.id = "product-list";
  let productListContent = "";
  products.forEach((item) => {
    productListContent += `<section class="product all-product-item">
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
                  <i class="fa-solid fa-cart-shopping add-cart">
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
  });
  productList.innerHTML = productListContent;
  productContainer.append(productList);
  hideOverlay();
  addCart();
  addCartQuantity();
}
displayProduct();
