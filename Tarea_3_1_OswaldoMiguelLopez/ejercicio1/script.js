// Espera a que el documento esté completamente cargado antes de ejecutar el código.
$(document).ready(function () {

    // Muestra un mensaje con el nombre ingresado cuando se hace clic en el botón con el ID "mostrarMensaje."
    $("#mostrarMensaje").click(function () {
        var nombre = $("#nombre").val();

        // Verifica si se ha ingresado un nombre antes de mostrar el mensaje.
        if (nombre !== "") {
            $("#nombreMostrado").text(nombre);
            $("#mensaje").show();
        }
    });

    // Oculta el mensaje al hacer clic en el botón con el ID "ocultarMensaje."
    $("#ocultarMensaje").click(function () {
        $("#mensaje").hide();
    });

    // Lista de sugerencias de nombres.
    var sugerencias = ["Victoria", "Oswaldo", "Marisol", "Angel", "Marcos", "paco", "ariadna", "Juan", "David", "Felix"];

    // Muestra sugerencias a medida que se escribe en el campo de entrada con el ID "autocomplete."
    $("#autocomplete").on("input", function () {
        var consulta = $(this).val().toLowerCase();
        $("#sugerencias").empty();

        // Itera a través de la lista de sugerencias y agrega elementos coincidentes a la lista.
        for (var i = 0; i < sugerencias.length; i++) {
            if (sugerencias[i].toLowerCase().includes(consulta)) {
                $("#sugerencias").append("<li>" + sugerencias[i] + "</li>");
            }
        }
    });
});