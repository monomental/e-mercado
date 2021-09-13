const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const PRODUCT1_INFO_URL = "https://monomental.github.io/e-mercado/json/producto1.json";
const PRODUCT2_INFO_URL = "https://monomental.github.io/e-mercado/json/producto2.json";
const PRODUCT3_INFO_URL = "https://monomental.github.io/e-mercado/json/producto3.json";
const PRODUCT4_INFO_URL = "https://monomental.github.io/e-mercado/json/producto4.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  let userLogged = localStorage.getItem('User-Logged');
  let userInfoForm = document.getElementById("user-info");
  let user = document.getElementById("user");
  let btnSalir = document.getElementById('salir');
// si usuario inició sesión, (datos cargados en el localStorage) muestro el mail
  if (userLogged) {
    userLogged = JSON.parse(userLogged);
    user.innerText = user.innerText + 'Usuario logueado: ' + userLogged.email;
    // uso clases de boostrap para mostrar el formulario que tiene el correo y el btn salir
    userInfoForm.classList.remove("d-none");
    userInfoForm.classList.add('d-inline-block');

  }
  // si no hay una sesion iniciada y es una página interna (tiene el form user-info) redirijo al formulario de inicio de sesión
  else if (userInfoForm) {
    window.location = 'index.html';
  }

  if (btnSalir) {
    btnSalir.addEventListener('click', function () {
      localStorage.removeItem('User-Logged');
      // agrego una variable al local storage para saber que el usuario cerró sesión
      localStorage.setItem('Logout', 'logout');
      // redirijo al formulario de inicio de sesión
      window.location = 'index.html';
    })
  }

});