// Traigo todos los elementos que coincidan con lo que quiero, bsandome en etiquetas, clases y ID's de ser necesario
let productName = document.querySelectorAll('a.product-name');
let productPrice = document.querySelectorAll('span.best-price');
let productImage = document.querySelectorAll('a.imagen-prod > img');

// Creo un array (u object) donde voy a almacenar los datos que necesite
let mochilas = [];

// Itero en los elementos que traje para obtener los que necesito
var price
for (let index = 0; index < productName.length; index++) {

  const name = productName[index].innerHTML;
  // transformamos el precio a Float, para que quede mejor en nuestro excel, le quitamos los caracteres especiales, y le damos un formato admisible
  
  if (productPrice[index]) {
  price = parseFloat(productPrice[index].innerHTML.replace('$', '').replace('.', '').replace(',', '.'));
  }
  const image = productImage[index].src

  // En este caso vamos a almacenar solamente los productos que sean mochilas.

  if (name.toLowerCase().includes('mochila')) {
    const obj = {'name': name, 'price': price, 'image': image}
    mochilas.push(obj)
  }
}

ConvertToCSV(mochilas)

function ConvertToCSV(objArray) {
  // Verificamos que el parametro recibido sea un Object, si no lo es, lo transformamos en uno
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  // Creamos una variable auxiliar en la que guardaremos la "tabla" de nuestro .CSV
  var table = '';
  
  // Iteramos recorriendo cada producto que almacenamos
  for (var i = 0; i < array.length; i++) {
    // Creamos una variable auxiliar en la que guardaremos la "fila" de nuestra tabla
    var row = '';
    // Iteramos recorriendo cada Key de cada producto
    for (var index in array[i]) {
      // Si en esta linea ya hay informacion la separamos con una ","
      if (row != '') row += ','
      row += array[i][index];
    }
    // Para pasar al proximo producto creamos una nueva fila
    table += row + '\r\n';
  }

  // Una vez que le dimos el formato apropiado llamaremos a la descarga
  downloadCSV(table, 'mochilas')
  // Al retornar la tabla veremos la misma por consola
  return table;
}

function downloadCSV(csv, filename) {
  var csvFile;
  var downloadLink;

  // Definimos que el archivo a descargar sera del tipo texto csv (separado por , y saltos de linea)
  csvFile = new Blob([csv], {
    type: 'text/csv'
  });
  // Creamos el link de descarga
  downloadLink = document.createElement("a");
  // Vinculamos al link de descarga con el documento que creamos
  downloadLink.download = filename;
  // Vinculamos al link de descarga con el documento que creamos
  downloadLink.href = window.URL.createObjectURL(csvFile);
  // Ocultamos el link de descarga 
  downloadLink.style.display = "none";
  // Agremos el mismo al DOM
  document.body.appendChild(downloadLink);
  // Ejecutamos la descarga
  downloadLink.click();
}