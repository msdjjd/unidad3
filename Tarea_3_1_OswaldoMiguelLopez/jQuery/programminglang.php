<?php
    // Una matriz que contiene una lista de lenguajes de programación.
    $programminglanguages = [
      1=>"ActionScript",
      2=>"AppleScript",
      3=>"Asp",
      4=>"BASIC",
      5=>"C",
      6=>"C ++",
      7=>"Clojure",
      8=>"COBOL",
      9=>"ColdFusion",
      10=>"Erlang",
      11=>"Fortran",
      12=>"Maravilloso",
      13=>"Haskell",
      14=>"Java",
      15=>"JavaScript",
      16=>"Lisp",
      17=>"Perl",
      18=>"PHP",
      19=>"Python",
      19=>"Ruby",
      20=>"Scala",
      21=>"Esquema"
    ];

    // Obtiene el término de búsqueda del parámetro GET llamado 'search'.
    $dataToSearch = $_GET['search'];

    // Filtra la matriz de lenguajes de programación para encontrar coincidencias con el término de búsqueda.
    $results = array_filter($programminglanguages, function($it) use ($dataToSearch) {
        return (str_starts_with($it, $dataToSearch));
    }, ARRAY_FILTER_USE_BOTH);

    // Establece el encabezado HTTP para indicar que se envía una respuesta en formato JSON.
    header("Content-Type: application/json");

    // Convierte los resultados en formato JSON y los envía como respuesta.
    echo json_encode($results);
?>
