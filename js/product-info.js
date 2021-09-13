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
}