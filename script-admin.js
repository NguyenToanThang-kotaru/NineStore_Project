// functions
{
function toggleForm(formId, mode) {
    const form = document.getElementById(formId);
    form.classList.remove(mode === "open" ? "disable" : "enable");
    form.classList.add(mode === "open" ? "enable" : "disable");
}

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
function getImageUrl(id) {
    let input = document.getElementById(id);
    input.addEventListener("change", function (event) {
        const imagefile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            input.src = e.target.result;
        };
        reader.readAsDataURL(imagefile);
    });
}

function changePreview(id) {
    let preview = document.getElementById(id).closest('form').querySelector(".form__preview");
    preview.src = document.getElementById(id).src;
}

// close forms before opening one
function closeForm() {
    const forms = ["product__add", "product__edit", "product__remove"];
    forms.forEach(form => {
        if (document.getElementById(form).classList.contains("enable")) {
            toggleForm(form, "close");
        }
    });
}

}

document.addEventListener("DOMContentLoaded", function () {
    // side menu
    const sp = document.getElementById("side-menu__menu-sp");
    const donHang = document.getElementById("side-menu__menu-order");
    const customer = document.getElementById("side-menu__menu-customer");
    const thongke = document.getElementById("side-menu__menu-statistic");

    // products
    const addItem = document.getElementById("product__btn-add-item");
    const editItem = document.getElementById("product__btn-edit-item");
    const removeItem = document.getElementById("product__btn-remove-item");

    const closeWindowItem = document.getElementById("form__close-add-item");
    const closeWindowEditItem = document.getElementById("form__close-edit-item");
    const closeWindowRemoveItem = document.getElementById("form__close-remove-item");

    const submitItem = document.getElementById("form__submit");
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
    const productArray = [];
    let storedItem = {};

    // store local storage's key
    const key = [];

    // update array when localStorage has values
{    
    for (let i = 0; i < localStorage.length; i++)
    {
        if (!localStorage.getItem("adminLoggedIn")) {
            key.push(localStorage.key(i));
        }
    }

    for (let i = 0; i < localStorage.length; i++)
    {
        if (localStorage.key(i) != "adminLoggedIn") {
            key.push(localStorage.key(i));
        }
    }

    if (key != "") {
        key.sort();
    } 
    console.log(key);

    // upload data when reload the page 
    for (let i = 0; i < localStorage.length; i++) {
        storedItem = JSON.parse(localStorage.getItem(key[i]));
        productArray.push(storedItem);
        if (productArray[productID - 1].status == "show") {
            document.getElementById("product__list-body").innerHTML += `
                <tr id="${productArray[productID - 1].id}">
                    <td>${productArray[productID - 1].id}</td>
                    <td>${productArray[productID - 1].name}</td>
                    <td>${productArray[productID - 1].sl}</td>
                    <td>${productArray[productID - 1].gia}</td>
                    <td style="overflow-y: auto;">${productArray[productID - 1].describe}</td>
                    <td><img src="${productArray[productID - 1].imageSrc}" style="max-width: 100%;" alt="Photo of ${productArray[productID - 1].name}"></td>
                </tr>
            `;
        }
        productID++;
    }
    console.log(productArray);
    console.log(productID);
}    

// trigger animation when the mouse hover   
{    
//         sp.addEventListener("mouseover", function () {
//             sp.querySelector("i").classList.add("fa-fade");
//         });
    
//         sp.addEventListener("mouseleave", function () {
//             sp.querySelector("i").classList.remove("fa-fade");
//         });
    
//         donHang.addEventListener("mouseover", function () {
//             donHang.querySelector("i").classList.add("fa-fade");
//         });
    
//         donHang.addEventListener("mouseleave", function () {
//             donHang.querySelector("i").classList.remove("fa-fade");
//         });
}
    
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
        toggleForm("customer", "open");
        toggleForm("product", "close");
        toggleForm("order", "close");
        toggleForm("statistic", "close");
    });

    // open form to add products
    addItem.addEventListener("click", function () {
        closeForm();
        // open product__add
        document.querySelector(".form__preview").src = "./image/no-photo-or-blank-image.jpg";
        toggleForm("product__add", "open");
        getImageUrl("form__sp-img");

        // then autofocus the first input
        tenSP.focus();
    });

    // open form to edit products
    editItem.addEventListener("click", function () {
        closeForm();
        toggleForm("product__edit", "open");
        getImageUrl("form__edit-img");

        // then autofocus the first input
        editIdSP.focus();
    });

    // open form to remove products
    removeItem.addEventListener("click", function () {
        closeForm();
        // open product__remove
        toggleForm("product__remove", "open");
        removeIdSP.focus();
    });

    // open form to add orders


    // close item form.
    closeWindowItem.addEventListener("click", function () {
        // make all the input empty
        clearInput([tenSP, soluongSP, giaSP, chitietSP, hinhSP]);
        // then close it
        toggleForm("product__add", "close");
    });

    // close edit window
    closeWindowEditItem.addEventListener("click", function () {
        // make all the input empty
        clearInput([editIdSP, editTenSP, editSoluongSP, editGiaSP, editChitietSP, editHinhSP]);
        // then close it
        toggleForm("product__edit", "close");
    });

    // close remove window
    closeWindowRemoveItem.addEventListener("click", function () {
        clearInput([removeIdSP]);
        toggleForm("product__remove", "close");
    });
}

    // submit/upload
    {
        // submit item's info => if have value in the inputs => submit
        submitItem.addEventListener("click", function (event) {
            if (!inputFilled([tenSP, soluongSP, giaSP, chitietSP, hinhSP])) {
                return false;
            }
            else if (isNaN(soluongSP.value))
            {
                alert("Vui lòng nhập số.");
                soluongSP.focus();
                return false;
            }
            else if (isNaN(giaSP.value))
            {
                alert("Vui lòng nhập số.");
                giaSP.focus();
                return false;
            }
            // bring values into table
            else {
                // do the thing
                productArray[productID - 1] = {
                    id: `SP#${productID}`, name: tenSP.value, sl: soluongSP.value, gia: giaSP.value, describe: chitietSP.value,
                    imageName: hinhSP.value, imageSrc: hinhSP.src, status: "show"
                };
                
                try {
                    localStorage.setItem(`SP#${productID}`, JSON.stringify(productArray[productID - 1]));
                    document.getElementById("product__list-body").innerHTML += `
                        <tr id="${productArray[productID - 1].id}">
                            <td>${productArray[productID - 1].id}</td>
                            <td>${productArray[productID - 1].name}</td>
                            <td>${productArray[productID - 1].sl}</td>
                            <td>${productArray[productID - 1].gia}</td>
                            <td style="overflow-y: auto;">${productArray[productID - 1].describe}</td>
                            <td><img src="${productArray[productID - 1].imageSrc}" style="max-width: 100%;" alt="Photo of ${productArray[productID - 1].name}"></td>
                        </tr>
                    `;
                    productID++;
                }
                catch (e) {
                    alert('Cannot submit data because of exceeding storage!' + e);
                    productArray.splice(productID - 1, 1);
                }

                // make all the input empty
                clearInput([tenSP, soluongSP, giaSP, chitietSP, hinhSP]);
                document.querySelector(".form__preview").src = "./image/no-photo-or-blank-image.jpg";
                event.preventDefault();
            }
        });

        // edit has error
        submitEditItem.addEventListener("click", function (event) {
            event.preventDefault();
            // if id is null
            if (!inputFilled([editIdSP])) {
                alert("Vui lòng nhập ID của sản phẩm");
                editIdSP.focus();
                return false;
            }
            
            else if (findId(editIdSP.value, productArray) == -1) {
                alert("Không tìm thấy được sản phẩm.");
                editIdSP.focus();
                return false;
            }
            
            // if there are tuples that are empty
            else if (!inputFilled([editTenSP, editSoluongSP, editGiaSP, editChitietSP, editHinhSP])) {
                if (confirm("Các trường bị bỏ trống sẽ được sử dụng dữ liệu cũ, bạn có chắc chứ?")) {
                    console.log("Using old data...");
                    let index = findId(editIdSP.value, productArray);
                    console.log(`Update data using index ${index}`);
                    while (returnInputNotFilled([editTenSP, editSoluongSP, editGiaSP, editChitietSP, editHinhSP]) != -1) {
                        let input = returnInputNotFilled([editTenSP, editSoluongSP, editGiaSP, editChitietSP, editHinhSP]);
                        switch (input) {
                            case editTenSP:
                                input.value = productArray[index].name;
                                console.log(`Complete edit name: ${input.value}`);
                                break;
                            case editSoluongSP:
                                input.value = productArray[index].sl;
                                console.log(`Complete edit quantity: ${input.value}`);
                                break;
                            case editGiaSP:
                                input.value = productArray[index].gia;
                                console.log(`Complete edit price: ${input.value}`);
                                break;
                            case editChitietSP:
                                input.value = productArray[index].describe;
                                console.log(`Complete edit description: ${input.value}`);
                                break;
                            case editHinhSP:
                                input.src = productArray[index].imageSrc;
                                console.log(`Complete edit image: ${input.value}`);
                                break;
                            default:
                                break;
                        }
                    }
                }
                else return false;
            }

            // if all of the values are filled
            // update array
            let index = findId(editIdSP.value, productArray);
            console.log(`Updating array index ${index}`);
            productArray[index].name = editTenSP.value;
            productArray[index].sl = editSoluongSP.value;
            productArray[index].gia = editGiaSP.value;
            productArray[index].describe = editChitietSP.value;
            productArray[index].imageSrc = editHinhSP.src;
            console.log(productArray[index]);

            try {
                // update localStorage
                console.log(`Updating local storage SP#${index + 1}`)
                localStorage.setItem(`SP#${index + 1}`, JSON.stringify(productArray[index]));
            }
            catch (e) {
                alert('Cannot submit data because of exceeding storage!');
                productArray.splice(index, 1);
                return false;
            }
            let rows = document.querySelectorAll("#product__list-body tr");
            for (let row of rows) {
                if (row.id == productArray[index].id) {
                    row.innerHTML = `
                        <tr id="${productArray[index].id}">
                            <td>${productArray[index].id}</td>
                            <td>${productArray[index].name}</td>
                            <td>${productArray[index].sl}</td>
                            <td>${productArray[index].gia}</td>
                            <td style="overflow-y: auto;">${productArray[index].describe}</td>
                            <td><img src="${productArray[index].imageSrc}" style="max-width: 100%;" alt="Photo of ${productArray[index].name}"></td>
                        </tr>
                    `;    
                    break;
                }
            }
            clearInput([editIdSP, editTenSP, editSoluongSP, editGiaSP, editChitietSP, editHinhSP]);
            
        });


        submitRemoveItem.addEventListener("click", function (event) {
            if (!inputFilled([removeIdSP])) {
                return false;
            }

            else if (findId(removeIdSP.value, productArray) == -1) {
                alert("Không tìm thấy sản phảm trong danh sách");
                return false;
            }

            else {
                let index = findId(removeIdSP.value, productArray);
                // are you sure to remove the product?
                if (confirm(`Bạn có muốn xóa thông tin sau không?

                Tên sản phẩm: ${productArray[index].name}
                Số lượng: ${productArray[index].sl}
                Giá: ${productArray[index].gia}
                Chi tiết: ${productArray[index].describe}
            `)) {
                    // update local storage
                    console.log(`Removing key: SP#${index + 1}`);
                    productArray[index].status = "hidden";
                    localStorage.setItem(`SP#${index + 1}`, JSON.stringify(productArray[index]));

                    let rows = document.querySelectorAll("#product__list-body tr");
                    for (let row of rows) {
                        if (row.id == productArray[index].id) {
                            row.remove();
                            break;
                        }
                    }

                    // update array
                    // productArray.splice(index, 1);
                    console.log(productArray);
                    clearInput([removeIdSP]);
                }
            }
            event.preventDefault();
        });
    }

    // Function to block customers
    customerList.addEventListener("click", function(event) {
        if (event.target.closest(".customer__status")) {
            const customerStatus = event.target.closest(".customer__status");
        
            if (customerStatus.innerText == "Hoạt động") {
                if (confirm("Bạn có chắc chắn muốn khóa tài khoản này không?")) {
                    customerStatus.innerText = "Đã khóa";
                    customerStatus.style.backgroundColor = "red";
                    customerStatus.style.color = "white";
                }
            }
            else if (customerStatus.innerText == "Đã khóa") {
                if (confirm("Bạn có chắc chắn muốn mở khóa tài khoản này không?")) {
                    customerStatus.innerText = "Hoạt động";
                    customerStatus.style.backgroundColor = "green";
                    customerStatus.style.color = "black";
                }
            }    
        }
    });

    // check if the pay and the ship is checked => its background will be green

    // Do something if the button in items are clicked
});
