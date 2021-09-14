//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(getProductURL()).then(function (result) {
        if (result.status === "ok") {
            productArray = result.data;
            showCar(productArray)                               
        }
    })

});

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
        if (result.status === "ok") {
            productArray = result.data;
            showComment(productArray)                               
        }
    })

});

function getProductURL(){
    let name = JSON.parse(localStorage.getItem('product')).productName;
    let URL;
    switch(name){
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

var commentArray = [];

function showComment(productArray){
    let htmlContentToAppend = "";
    for (let i = 0; i < productArray.length; i++) {
        let comment = productArray[i];
        htmlContentToAppend += `'`+ comment.description +`' <br>`
                
        document.getElementById("comentDescrip").innerHTML = htmlContentToAppend;

    }

}

var car;

function showCar(car){
   
            let productNameHTML  = document.getElementById("name");
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

            //Muestro las imagenes en forma de galería
            showImagesGallery(car.images);
}

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
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