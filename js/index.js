//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    var btnLogin = document.getElementById('btnLogin');
    let infoMessage = document.getElementById('infoMessage');

    btnLogin.addEventListener('click', function (e) {

        let inputEmail = document.getElementById('inputEmail');
        let inputPassword = document.getElementById('inputPassword');
        let errorMessage = document.getElementById('errorMessage');
        
        function camposCompletos() {
            return inputEmail.value && inputPassword.value;
        }

        if (camposCompletos()) {
            localStorage.setItem('User-Logged', JSON.stringify({ email: inputEmail.value }));
            window.location = 'home.html';

        } else {
            errorMessage.classList.remove('d-none');
            errorMessage.classList.add('d-block');

            errorMessage.innerText = "Debe ingresar los datos!";
        }
    });

    if(localStorage.getItem('Logout')){
        infoMessage.classList.remove('d-none');
        infoMessage.classList.add('d-block');

        infoMessage.innerText = 'Sesión cerrada'

        localStorage.removeItem('Logout');
        // me fijo si hay un usuario logeado, en ese caso lo redirijo al home para que no entre al formulario de inicio de sesión
    }else if(localStorage.getItem('User-Logged')){
        window.location = 'home.html';
    }
});
