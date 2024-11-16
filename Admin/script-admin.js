function toggleForm(formId, mode) {
    const form = document.getElementById(formId);
    form.classList.remove(mode === "open" ? "form--disable" : "form--enable");
    form.classList.add(mode === "open" ? "form--enable" : "form--disable");
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

// find ID
function findId(id, productArray) {
    for (let x in productArray) {
        if (productArray[x].id == id) {
            return x;
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

// close forms before opening one
function closeForm() {
    const forms = ["product__add", "product__edit", "product__remove"];
    forms.forEach(form => {
        if (document.getElementById(form).classList.contains("form--enable")) {
            toggleForm(form, "close");
        }
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const sp = document.getElementById("side-menu__menu-sp");
    const donHang = document.getElementById("side-menu__menu-order");

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
    for (let i = 0; i < localStorage.length; i++)
    {
        key.push(localStorage.key(i));
    }

    if (key != "") {
        key.sort();
    } 
    console.log(key);

    // upload data when reload the page 
    for (let i = 0; i < localStorage.length; i++) {
        storedItem = JSON.parse(localStorage.getItem(key[i]));
        productArray.push(storedItem);
        document.getElementById("product__list").innerHTML += `
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

    // trigger animation when the mouse hover
    
    sp.addEventListener("mouseover", function () {
        sp.querySelector("i").classList.add("fa-fade");
    });

    sp.addEventListener("mouseleave", function () {
        sp.querySelector("i").classList.remove("fa-fade");
    });

    donHang.addEventListener("mouseover", function () {
        donHang.querySelector("i").classList.add("fa-fade");
    });

    donHang.addEventListener("mouseleave", function () {
        donHang.querySelector("i").classList.remove("fa-fade");
    });
    

    // open / close a page when the icon is clicked
    
    // open product lists
    sp.addEventListener("click", function () {
        toggleForm("product", "open");
        toggleForm("order", "close");
    });

    // open orders
    donHang.addEventListener("click", function () {
        toggleForm("order", "open");
        toggleForm("product", "close");
    });

    // open form to add products
    addItem.addEventListener("click", function () {
        closeForm();
        // open product__add
        toggleForm("product__add", "open");
        toggleForm("product__add-container", "open");
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
                    imageName: hinhSP.value, imageSrc: hinhSP.src,
                };
                
                try {
                    localStorage.setItem(`SP#${productID}`, JSON.stringify(productArray[productID - 1]));
                    document.getElementById("product__list").innerHTML += `
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
                event.preventDefault();
            }
        });

        submitEditItem.addEventListener("click", function (event) {
            event.preventDefault();
            if (!inputFilled([editIdSP, editTenSP, editSoluongSP, editGiaSP, editChitietSP, editHinhSP])) {
                return false;
            }

            else if (findId(editIdSP.value, productArray) == -1) {
                alert("Không tìm thấy sản phảm trong danh sách");
                return false;
            }

            else {
                // edit in the array
                let index = findId(editIdSP.value, productArray);
                productArray[index].name = editTenSP.value;
                productArray[index].sl = editSoluongSP.value;
                productArray[index].gia = editGiaSP.value;
                productArray[index].describe = editChitietSP.value;
                productArray[index].imageName = editHinhSP.value;
                productArray[index].imageSrc = editHinhSP.src;

                try {
                    // edit in local storage
                    localStorage.setItem(`SP#${index + 1}`, JSON.stringify(productArray[index]));

                    // edit in the table
                    let rows = document.querySelectorAll("#product__list tr");
                    for (let row of rows) {
                        if (row.id === productArray[index].id) {
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
                        }
                    }
                }
                catch (e) {
                    alert('Cannot submit data because of exceeding storage!' + e);
                    productArray.splice(index, 1);
                }

                // clear the input in the form
                clearInput([editIdSP, editTenSP, editSoluongSP, editGiaSP, editChitietSP, editHinhSP]);
            }
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
                console.log(index);
                // are you sure to remove the product?
                if (confirm(`Bạn có muốn xóa thông tin sau không?

                Tên sản phẩm: ${productArray[index].name}
                Số lượng: ${productArray[index].sl}
                Giá: ${productArray[index].gia}
                Chi tiết: ${productArray[index].describe}
            `)) {
                    let rows = document.querySelectorAll("#product__list tr");
                    for (let row of rows) {
                        if (row.id == productArray[index].id) {
                            row.remove();
                            break;
                        }
                    }

                    console.log(index);
                    // update local storage
                    localStorage.removeItem(`SP#${index + 1}`);

                    // update array
                    productArray.splice(index, 1);
                    console.log(productArray);
                    clearInput([removeIdSP]);
                }
            }
            event.preventDefault();
        });
    }

    // check if the pay and the ship is checked => its background will be green

    // Do something if the button in items are clicked
});
