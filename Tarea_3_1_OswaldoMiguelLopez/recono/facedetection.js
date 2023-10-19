// Función que inicialmente establece una clasificación de región en blanco.
var facefinder_classify_region = function(r, c, s, pixels, ldim) {
  return -1.0;
};

// URL del archivo de cascada para la detección de rostros.
var cascadeurl =
  "https://raw.githubusercontent.com/nenadmarkus/pico/c2e81f9d23cc11d1a612fd21e4f9de0921a5d0d9/rnt/cascades/facefinder";

// Se realiza una solicitud para cargar el archivo de cascada.
fetch(cascadeurl).then(function(response) {
  response.arrayBuffer().then(function(buffer) {
      var bytes = new Int8Array(buffer);
      // Desempaquetar el archivo de cascada.
      facefinder_classify_region = pico.unpack_cascade(bytes);
      console.log("* cascada cargada");
  });
});

// Obtención de elementos de imagen y lienzo del documento HTML.
var img = document.getElementById("image");
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d");

// Función para transformar una imagen RGBA a escala de grises.
function rgba_to_grayscale(rgba, nrows, ncols) {
  var gray = new Uint8Array(nrows * ncols);
  for (var r = 0; r < nrows; ++r)
      for (var c = 0; c < ncols; ++c)
          // Fórmula de conversión a escala de grises: gray = 0.2*red + 0.7*green + 0.1*blue
          gray[r * ncols + c] =
              (2 * rgba[r * 4 * ncols + 4 * c + 0] +
              7 * rgba[r * 4 * ncols + 4 * c + 1] +
              1 * rgba[r * 4 * ncols + 4 * c + 2]) /
              10;
  return gray;
}

// Función llamada al presionar el botón para detectar rostros.
function hasContainHumanFace() {
  // Calcula la relación de escalado para ajustar la imagen en el lienzo.
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.min(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;

  // Limpia el lienzo y dibuja la imagen escalada.
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
  );

  // Obtiene los datos de la imagen en formato RGBA.
  var rgba = ctx.getImageData(0, 0, 480, 360).data;

  // Prepara la entrada para la función 'run_cascade'.
  image = {
      pixels: rgba_to_grayscale(rgba, 360, 480),
      nrows: 360,
      ncols: 480,
      ldim: 480
  };

  params = {
      shiftfactor: 0.1, // Mueve la ventana de detección en un 10% de su tamaño
      minsize: 20, // Tamaño mínimo de un rostro
      maxsize: 1000, // Tamaño máximo de un rostro
      scalefactor: 1.1 // Factor de escala para procesamiento multiscale
  };

  // Ejecuta el algoritmo de cascada en la imagen para detectar rostros.
  dets = pico.run_cascade(image, facefinder_classify_region, params);

  // Agrupa las detecciones obtenidas.
  dets = pico.cluster_detections(dets, 0.2); // Umbral de superposición de detecciones (IoU) a 0.2

  // Dibuja los resultados en el lienzo.
  qthresh = 5.0; // Umbral de detección (este valor es empírico)
  let hasFaceFound = false;
  for (i = 0; i < dets.length; ++i) {
      // Verifica el puntaje de detección y, si es mayor al umbral, dibuja un círculo en el rostro.
      if (dets[i][3] > qthresh) {
          ctx.beginPath();
          ctx.arc(dets[i][1], dets[i][0], dets[i][2] / 2, 0, 2 * Math.PI, false);
          ctx.lineWidth = 3;
          ctx.strokeStyle = "blue";
          ctx.stroke();
          hasFaceFound = true;
      }
  }

  return (dets.length > 0);
}

// Función que analiza si una imagen contiene un rostro humano.
function analyzeImage() {
  if (hasContainHumanFace()) {
      alert("Contiene rostro humano");
  } else {
      alert("No contiene rostro humano");
  }
}

// Evento que se dispara al seleccionar un archivo de imagen.
document.querySelector("input").addEventListener("change", function(evt) {
  var files = evt.target.files; // Objeto FileList
  var file = files[0];
  if (file.type.match("image.*")) {
      var reader = new FileReader();
      // Lee el archivo de imagen como una URL de datos.
      reader.readAsDataURL(file);
      reader.onload = function(evt) {
          if (evt.target.readyState == FileReader.DONE) {
              img.src = evt.target.result;
          }
      };
  }
});
