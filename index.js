let botonComenzar = document.getElementById("boton-comenzar");
let overlayInicio = document.querySelector(".overlay-inicio");

let botonNivelFacil = document.getElementById("boton-nivel-facil");
let botonNivelIntermedio = document.getElementById("boton-nivel-intermedio");
let botonNivelDificil = document.getElementById("boton-nivel-dificil");

let overlayNiveles = document.querySelector(".overlay-niveles");
const grilla = document.querySelector(".caja-grilla");
const items = ["🐯", "🦉", "🦋", "🐊", "🦍", "🦜", "🦨", "🦥", "🍄", "🍀"];
let matriz = [];
let primerCuadrado;
let segundoCuadrado;

botonComenzar.onclick = () => {
  overlayInicio.classList.add("fuera-de-foco");
};

const obtenerNumeroAlAzar = (array) => {
  let numero = Math.floor(Math.random() * array.length);
  return numero;
};

const obtenerItemAlAzar = (array) => {
  let animal = array[obtenerNumeroAlAzar(array)];
  return animal;
};

const matchesVerticales = () => {
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      if (
        matriz[i + 1] &&
        matriz[i + 2] &&
        matriz[i][j] === matriz[i + 1][j] &&
        matriz[i][j] === matriz[i + 2][j]
      ) {
        matriz[i][j] = "yellow";
        matriz[i][j + 1] = "yellow";
        matriz[i][j + 2] = "yellow";
        return true;
      }
    }
  }

  return false;
};

const matchesHorizontales = () => {
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      if (
        matriz[i][j] === matriz[i][j + 1] &&
        matriz[i][j] === matriz[i][j + 2]
      ) {
        // matriz[i][j] = 'yellow'
        // matriz[i][j + 1] = 'yellow'
        // matriz[i][j + 2] = 'yellow'

        return true;
      }
    }
  }
  return false;
};

const hayMatches = () => {
  if (matchesHorizontales() || matchesVerticales()) {
    return true;
  } else {
    // alert('no hay matches')
    return false;
  }
};

const sonAdyacentes = (primerItem, segundoItem) => {
  let primerItemVertical = Number(primerItem.dataset.fila);
  let primerItemHorizontal = Number(primerItem.dataset.columna);
  let segundoItemVertical = Number(segundoItem.dataset.fila);
  let segundoItemHorizontal = Number(segundoItem.dataset.columna);

  if (
    primerItemHorizontal === segundoItemHorizontal ||
    primerItemVertical === segundoItemVertical
  ) {
    if (
      primerItemVertical + 1 === segundoItemVertical ||
      primerItemVertical - 1 === segundoItemVertical ||
      primerItemHorizontal + 1 === segundoItemHorizontal ||
      primerItemHorizontal - 1 === segundoItemHorizontal
    ) {
      return true;
    }
  }
  segundoCuadrado = "";
  return false;
};

const selectItem = () => {
  const grillas = document.querySelectorAll("div#grilla");

  for (const items of grillas) {
    items.onclick = (e) => {
      if (!primerCuadrado) {
        primerCuadrado = e.target;
        primerCuadrado.classList.add("select-item");
      } else if (!segundoCuadrado) {
        segundoCuadrado = e.target;
        if (sonAdyacentes(primerCuadrado, segundoCuadrado)) {
          intercambiarCuadros(primerCuadrado, segundoCuadrado);
          if (!hayMatches()) {
            intercambiarCuadros(segundoCuadrado, primerCuadrado);
            return;
          }
          primerCuadrado.classList.remove("select-item");
          primerCuadrado = "";
          segundoCuadrado = "";
        }
      }
    };
  }
};

const crearMatriz = (array, dimensiones) => {
  matriz = [];
  for (let i = 0; i < dimensiones; i++) {
    matriz[i] = [];
    for (let j = 0; j < dimensiones; j++) {
      matriz[i][j] = obtenerItemAlAzar(array);
    }
  }
};

const actualizarMatriz = () => {};

const dibujarGrillaHTML = (dimensiones) => {
  const tamanio = 510 / dimensiones;
  grilla.style.width = "510px";
  grilla.innerHTML = "";

  for (let i = 0; i < dimensiones; i++) {
    for (let j = 0; j < dimensiones; j++) {
      grilla.innerHTML += `<div id="grilla"  
                style="height:${tamanio}px;  top: ${tamanio * i}px; left: ${
        tamanio * j
      }px;"  data-fila=${i} data-columna=${j}  >
                ${matriz[i][j]} 
                </div>`;
    }
  }
};

const crearGrilla = (dimension, array) => {
  crearMatriz(array, dimension);
  dibujarGrillaHTML(dimension);
  selectItem();
};

// do {
//   crearMatriz(items,7)
// } while (hayMatches())

const intercambiarItemsEnArrayGrilla = (x1, y1, x2, y2) => {
  const temp = matriz[x1][y1];
  matriz[x1][y1] = matriz[x2][y2];
  matriz[x2][y2] = temp;
  // dibujarGrillaHTML(matriz.length)
};

const intercambiarCuadros = (elemento1, elemento2) => {
  const item1 = document.querySelector(
    `div[data-fila="${elemento1.dataset.fila}"][data-columna="${elemento1.dataset.columna}"]`
  );
  const item2 = document.querySelector(
    `div[data-fila="${elemento2.dataset.fila}"][data-columna="${elemento2.dataset.columna}"]`
  );
  const tamanio = parseFloat(item2.style.height);

  const datax1 = Number(item1.dataset.fila);
  const datax2 = Number(item2.dataset.fila);
  const datay1 = Number(item1.dataset.columna);
  const datay2 = Number(item2.dataset.columna);

  item1.style.top = `${datax2 * tamanio}px`;
  item2.style.top = `${datax1 * tamanio}px`;
  item1.style.left = `${datay2 * tamanio}px`;
  item2.style.left = `${datay1 * tamanio}px`;

  item1.dataset.fila = datax2;
  item2.dataset.fila = datax1;
  item1.dataset.columna = datay2;
  item2.dataset.columna = datay1;
  intercambiarItemsEnArrayGrilla(datax2, datay2, datax1, datay1);
  console.log(hayMatches());
};

const grillaInicial = (dimension) => {
  do {
    crearMatriz(items, dimension);
  } while (hayMatches());
};

botonNivelFacil.onclick = () => {
  grillaInicial(9);
  crearGrilla(9, items);
  overlayNiveles.classList.add("fuera-de-foco");
};

botonNivelIntermedio.onclick = () => {
  grillaInicial(8);
  crearGrilla(8, items);
  overlayNiveles.classList.add("fuera-de-foco");
};

botonNivelDificil.onclick = () => {
  grillaInicial(7);
  crearGrilla(7, items);
  overlayNiveles.classList.add("fuera-de-foco");
};
