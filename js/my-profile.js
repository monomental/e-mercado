//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    var btnSave = document.getElementById('btnSave');
    let userLogged = localStorage.getItem('User-Logged');
    let emailProfile = document.getElementById('emailProfile');
    let user = localStorage.getItem('User');

    let nombre1 = document.getElementById('nombre1');
        let nombre2 = document.getElementById('nombre2');
        let apellido1 = document.getElementById('apellido1');
        let apellido2 = document.getElementById('apellido2');
        let edad = document.getElementById('edad');
        let infoMessage = document.getElementById('infoMessage2');
        let errorMessage = document.getElementById('errorMessage2');

    if (userLogged) {
        userLogged = JSON.parse(userLogged);
        emailProfile.value = userLogged.email;
        // uso clases de boostrap para mostrar el formulario que tiene el correo y el btn salir
        // userInfoForm.classList.remove("d-none");
        // userInfoForm.classList.add('d-inline-block');
    }

    if (user){
        user = JSON.parse(user);
        nombre1.value = user.nombre1;
        nombre2.value = user.nombre2;
        apellido1.value = user.apellido1;
        apellido2.value = user.apellido2;
        edad.value = user.edad;
    }

    btnSave.addEventListener('click', function (e) {

        
    
        function camposCompletos() {
            return nombre1.value && nombre2.value && apellido1.value && apellido2.value && edad.value && emailProfile.value;
        }
    
        if (camposCompletos()) {
            localStorage.setItem('User', JSON.stringify({ nombre1: nombre1.value, nombre2: nombre2.value, apellido1: apellido1.value, apellido2: apellido2.value, edad: edad.value }));
            emailProfile.value = userLogged.email;
            

            
            infoMessage.classList.remove('d-none');
            infoMessage.classList.add('d-block');
            infoMessage.innerText = 'Datos guardados con éxito'


    
        } else {
    
            errorMessage.classList.remove('d-none');
            errorMessage.classList.add('d-block');
            errorMessage.innerText = "Debe ingresar los datos!";
        }
    });
    


});

