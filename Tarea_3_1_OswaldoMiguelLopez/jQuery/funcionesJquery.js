//-------------------------------
// Una lista de etiquetas disponibles para la función de autocompletado.
let availableTags = [
    "ActionScript",
    "AppleScript",
    "Asp",
    "BASIC",
    "C",
    "C ++",
    "Clojure",
    "COBOL",
    "ColdFusion",
    "Erlang",
    "Fortran",
    "Maravilloso",
    "Haskell",
    "Java",
    "JavaScript",
    "Lisp",
    "Perl",
    "PHP",
    "Python",
    "Ruby",
    "Scala",
    "Esquema"
];

$(document).ready(function(){

  // Inicializa la función de autocompletado en el elemento con el ID "search."
  $("#search").autocomplete({
      source: availableTags, // Fuente de sugerencias
      minLength: 2 // Número mínimo de caracteres para mostrar sugerencias
  });

  // Botón para saludar
  $("#btnSaludar").click(function(){
      // Cambia el contenido del elemento con el ID "divSaludos" para mostrar un saludo.
      $("#divSaludos").html("<h1>Bienvenidos. Reciban un cordial saludo</h1");
  });

  // Botón para mostrar el elemento con el ID "divSaludos"
  $("#btnMostrar").click(function(){
      // Muestra el elemento con el ID "divSaludos"
      $("#divSaludos").show();
  });

  // Botón para ocultar el elemento con el ID "divSaludos"
  $("#btnOcultar").click(function(){
      // Oculta el elemento con el ID "divSaludos"
      $("#divSaludos").hide();
  });

  // Botón para buscar un Pokémon en la API de Pokeapi
  $("#btnFindPokemon").click(function(){
      // Obtiene el ID del Pokémon ingresado por el usuario
      let id = $("#pokemonId").val();
      let url = "https://pokeapi.co/api/v2/berry/" + id; // URL de la API de Pokeapi

      // Realiza una solicitud AJAX para obtener datos del Pokémon
      $.ajax(url, {
          dataType: 'json', // Tipo de datos de la respuesta
          timeout: 500, // Tiempo de espera en milisegundos
          success: function(data, status, xhr) {
              console.log(data);
              let pokemon = data;
              // Muestra el nombre del Pokémon en un elemento con el ID "result"
              $("#result").html("<h1>" + pokemon.name + "</h1>");
          },
          error: function(jqXhr, textStatus, errorMessage) {
              // En caso de error, muestra un mensaje de error en el elemento con el ID "result"
              $("#result").html('Error: ' + errorMessage);
          }
      });
  });
});
