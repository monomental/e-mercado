const USDvalue = 40;
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_PRODUCTS).then(function (result) {
        if (result.status === "ok") {
            productArray = result.data.articles;
            showCart(productArray);
            calcTotal();
        }
    });



});

btnBuy.addEventListener('click', function (e) {


    function camposCompletos() {
        return street.value && homeNumber.value && corner.value && country.value && (creditCarNumber.value || bankNumber.value);
    }

    if (camposCompletos()) {
        infoMessage3.classList.remove('d-none');
        infoMessage3.classList.add('d-block');
        infoMessage3.innerText = 'COMPRA REALIZADA CON ÉXITO'
        e.preventDefault();
        e.stopPropagation();


    } else {
        errorMessage3.classList.remove('d-none');
        errorMessage3.classList.add('d-block');
        errorMessage3.innerText = "DEBE COMPLETAR TODOS LOS DATOS!";
    }
});



function disableModal() {
    let creditCar = document.getElementById('creditCar');
    let creditCarNumber = document.getElementById('creditCarNumber');
    let bankNumber = document.getElementById('bankNumber');
    if (creditCar.checked) {
        creditCarNumber.disabled = false;
        bankNumber.disabled = true;
    } else {
        creditCarNumber.disabled = true;
        bankNumber.disabled = false;
    }
}


function calcShipping() {
    let premium = document.getElementById('premium');
    let express = document.getElementById('express');
    let standard = document.getElementById('standard');
    if (premium.checked) {
        return 0.15
    } else if (express.checked) {
        return 0.07
    } else if (standard.checked) {
        return 0.05
    }
}


function calcTotal() {
    let shipping = 0;
    let total = 0;
    let subtotal = document.getElementsByName("sub");
    let sub = 0;
    for (let i = 0; i < subtotal.length; i++) {
        sub += parseInt(subtotal[i].innerHTML);
    }
    document.getElementById("subtotal").innerHTML = sub;
    shipping = calcShipping();
    shippingCost = sub * shipping;
    document.getElementById("shipping").innerHTML = shippingCost;
    total = sub + shippingCost;
    document.getElementById("total").innerHTML = total;
}

function subTotal(cost, i) {
    let count = parseInt(document.getElementById(`productCountInput${i}`).value);
    let total = count * cost;
    document.getElementById(`sub${i}`).innerHTML = total;
    calcTotal();
}

function showCart(productArray) {
    let htmlContentToAppend = "";
    for (let i = 0; i < productArray.length; i++) {
        let product = productArray[i];
        let pesosCost = product.unitCost;
        if (product.currency == "USD") {
            pesosCost = product.unitCost * USDvalue;
        }
        let sub = product.count * pesosCost;
        htmlContentToAppend += `

        <div class="container p-5">
            <div class="container mt-5">
             <h3>`+ product.name + `</h3>
             <hr class="my-3">
              <dl>
              <div class="row">
                <div class="col-3">
                    <img src="` + product.src + `" alt="" class="img-thumbnail">
                </div>
                <div class="col">
                   <dt> 
                  <label for="productCountInput">Cantidad en stock</label>
                  </dt>
                  <input type="number" class="form-control" id="productCountInput${i}" onchange="subTotal(${pesosCost},${i})" placeholder="" required="" value="` + product.count + `" min="0">
                  <div class="invalid-feedback">
                    La cantidad es requerida.
                  </div>
                </div>
                <div class="col">
                    <dt>Costo Unitario Pesos</dt>
                    <dd>
                    <p id="unitCost${i}">` + pesosCost + `</p>
                    </dd>
                </div>
                <div class="col">
                <dt>Costo Unitario Total Pesos</dt>
                <dd>
                <p id="sub${i}" name="sub">` + sub + `</p>
                </dd>
                </div>
                
                     <hr>             
                 <br>
              </dl>
             </div>
             </div>
        </div>
         `

        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;

    }
}

