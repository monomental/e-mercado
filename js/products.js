var currentProductsArray = [];
const ORDER_DESC_BY_SOLD_COUNT = "Sold";
const ORDER_BY_PROD_COST_ASC = "CostASC";
const ORDER_BY_PROD_COST_DESC = "CostDESC";
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_BY_PROD_COST_ASC) {
        result = array.sort(compareCostASC);
    } else if (criteria === ORDER_BY_PROD_COST_DESC) {
        result = array.sort(compareCostDESC);
    } else if (criteria === ORDER_DESC_BY_SOLD_COUNT) {
        result = array.sort(function (a, b) {
            let aSold = parseInt(a.soldCount);
            let bSold = parseInt(b.soldCount);

            if (aSold > bSold) { return -1; }
            if (aSold < bSold) { return 1; }
            return 0;
        });
    }

    return result;
}

function showProduct(name){
    localStorage.setItem("product",JSON.stringify({productName: name}));
    window.location = 'product-info.html'
}

function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        // se fija que el precio de producto esté entre el mínimo y máximo filtrado
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {

            htmlContentToAppend += `
            <a href="#" onclick="showProduct('`+ product.name +`')" class="list-group-item list-group-item-action">
                <div class="list-group-item list-group-item-action">
             <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="row">
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ product.name + `</h4>
                                <small class="text-muted">` + product.currency + ` ` + product.cost + `</small>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col">   
                            <p> ` + product.description + ` </p>
                        </div>                       
                    </div>    


                </div>
              </div>
             </div>
            </a>
         `
        }
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;

    }
}

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);


    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            //Muestro los productos ordenados
            // showProductsList(productsArray);
            sortAndShowProducts(ORDER_BY_PROD_COST_DESC, productsArray)
        }
    });

    document.getElementById("sortSold").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_SOLD_COUNT);
    });

    document.getElementById("sortByCostDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_COST_DESC);
    });

    document.getElementById("sortByCostAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_COST_ASC);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {

        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProductsList();
    });
});

function compareCostASC(a, b) {
    if (parseInt(a.cost) < parseInt(b.cost)) { return -1; }
    if (parseInt(a.cost) > parseInt(b.cost)) { return 1; }
    return 0;
}

function compareCostDESC(a, b) {
    if (parseInt(a.cost) > parseInt(b.cost)) { return -1; }
    if (parseInt(a.cost) < parseInt(b.cost)) { return 1; }
    return 0;
}
