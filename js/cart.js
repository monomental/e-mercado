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



function calcTotal(){
    let total = document.getElementsByName("sub");
    let sub = 0;
    for (let i = 0; i < total.length; i++ ){
      sub += parseInt(total[i].innerHTML);
    }
    document.getElementById("total").innerHTML = sub;
}

function subTotal(cost, i) { 
    let count = parseInt(document.getElementById(`productCountInput${i}`).value);
    let total = count*cost;
    document.getElementById(`sub${i}`).innerHTML = total;
    calcTotal(); 
}

function showCart(productArray) {
    let htmlContentToAppend = "";
    for (let i = 0; i < productArray.length; i++) {
        let product = productArray[i];
        let pesosCost = product.unitCost;
        if (product.currency == "USD"){
            pesosCost = product.unitCost*USDvalue;
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

