var commentArray = [];
var relatedProductsArray = [];

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(getProductURL()).then(function (result) {
        if (result.status === "ok") {
            productArray = result.data;
            showCar(productArray)
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
        if (result.status === "ok") {
            commentArray = result.data;
            showComment(commentArray);
        }
    });

    document.getElementById("submitComment").addEventListener("click", function () {
        let score = getSelectedScore();
        let name = getCommentUserName();
        let text = getCommentText();
        let date = new Date();

        commentArray.push({ score: score, description: text, user: name, dateTime: date });
        showComment(commentArray);
        clearFormFields();
        showMessage('El comentario se agregó con éxito');
    });



});

function filterRelatedProducts(indexArray) {
    let relatedProducts = [];
    for (let i = 0; i < indexArray.length; i++) {
        relatedProducts.push(relatedProductsArray[indexArray[i]]);
    }
    return relatedProducts;
}

function showRelatedProducts(indexArray) {
    getJSONData(PRODUCTS_URL).then(function (result) {
        if (result.status === "ok") {
            relatedProductsArray = result.data;
            if (relatedProductsArray && relatedProductsArray.length > 0) {
                let productsToShow = filterRelatedProducts(indexArray);
                showHTMLRelatedProducts(productsToShow);
            }else{
                showNoRelatedProductsMessage();
            }
        }
    });
}

function showNoRelatedProductsMessage(){
    document.getElementById("relatedProducts").innerHTML = "No hay productos que mostrar.";
}

function showHTMLRelatedProducts(productsToShow) {
    let htmlContentToAppend = "";
    for (let i = 0; i < productsToShow.length; i++) {
        let product = productsToShow[i];
        htmlContentToAppend += `
         <div class="card col-3" style="width: 18rem;">
          <img class="card-img-top" src="` + product.imgSrc + `" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">`+ product.name + `</h5>
            <p class="card-text">` + product.currency + ` ` + product.cost + `</p>
          </div>
        </div>`
        
    }
    document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
}

function showMessage(message) {
    let infoMessage = document.getElementById('infoMessage');
    infoMessage.classList.remove('d-none');
    infoMessage.classList.add('d-block');
    infoMessage.innerText = message;

    setTimeout(hideMessage, 5000);
}

function hideMessage() {
    infoMessage.classList.remove('d-block');
    infoMessage.classList.add('d-none');
}

function clearFormFields() {
    document.getElementById("commentUserName").value = "";
    document.getElementById("commentText").value = "";
    document.getElementById("star-1").checked = "checked";
}

function getCommentUserName() {
    return document.getElementById("commentUserName").value;
}

function getCommentText() {
    return document.getElementById("commentText").value;
}


function getSelectedScore() {
    var rates = document.getElementsByName('rating');

    for (var i = 0; i < rates.length; i++) {
        if (rates[i].checked) {
            return parseInt(rates[i].value);
        }
    }
    return 0;
}

function getProductURL() {
    let name = JSON.parse(localStorage.getItem('product')).productName;
    let URL;
    switch (name) {
        case "Chevrolet Onix Joy":
            URL = PRODUCT1_INFO_URL;
            break;
        case "Fiat Way":
            URL = PRODUCT2_INFO_URL;
            break;
        case "Suzuki Celerio":
            URL = PRODUCT3_INFO_URL;
            break
        case "Peugeot 208":
            URL = PRODUCT4_INFO_URL;
            break
        default: "";
    }

    return URL;
}



function showComment(commentArray) {
    let htmlContentToAppend = "";
    for (let i = 0; i < commentArray.length; i++) {
        let comment = commentArray[i];
        htmlContentToAppend += `
        <a href="#" onclick="showProduct('`+ comment.user + `')" class="list-group-item list-group-item-action">
            <div class="list-group-item list-group-item-action">
         <div class="row">
            <div class="col-2">
            `+ loadStars(comment.score) + `
            </div>
            <div class="col">
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">`+ comment.user + `</h5>
                            <small class="text-muted">` + comment.dateTime + `</small>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col">   
                        <p> ` + comment.description + ` </p>
                    </div>                       
                </div>    


            </div>
          </div>
         </div>
        </a>
     `

        document.getElementById("comentDescrip").innerHTML = htmlContentToAppend;

    }

}

function loadStars(score) {
    let total = 5;
    let result = "";
    for (let i = 0; i < total; i++) {
        if (score > 0) {
            result += '<span class="fa fa-star checked"></span>';
            score--;
        } else {
            result += '<span class="fa fa-star"></span>';
        }
    }
    return result;
}

var car;

function showCar(car) {

    let productNameHTML = document.getElementById("name");
    let productDescriptionHTML = document.getElementById("description");
    let productCostHTML = document.getElementById("cost");
    let productCurrencyaHTML = document.getElementById("currency");
    let productSoldCountHTML = document.getElementById("soldCount");
    let productCategoryHTML = document.getElementById("category");

    productNameHTML.innerHTML = car.name;
    productDescriptionHTML.innerHTML = car.description;
    productCostHTML.innerHTML = car.cost;
    productCurrencyaHTML.innerHTML = car.currency;
    productSoldCountHTML.innerHTML = car.soldCount;
    productCategoryHTML.innerHTML = car.category;

    //Muestro las imagenes
    showImagesGallery(car.images);

    if (car.relatedProducts) {
        showRelatedProducts(car.relatedProducts);
    }else{
        showNoRelatedProductsMessage();
    }
}

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}