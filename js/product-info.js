//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(LIBROS_URL).then(function (result) {
        if (result.status === "ok") {

            result.data.forEach(book => {
                if (book.id == JSON.parse(localStorage.getItem('libro')).libroid){
                    libro = book;
                    traerLibro(libro);
                }
            } );

            
        }
    })

});