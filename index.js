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

const seleccionarCuadrado = (x, y) => {
  return document.querySelector(`div[data-fila="${x}"][data-columna="${y}"]`);
};

const moverCuadrado = (item, x, y) => {
  item.style.top = `${tamanio * x}px`;
  item.dataset.fila = `${x}`;
  item.dataset.columna = `${y}`;
};

const generarCuadrado = (tamanio, x, y) => {
  grilla.innerHTML += `<div id="grilla"  
    style="height:${tamanio}px;  top: ${tamanio * -1}px; left: ${
    tamanio * y
  }px;" 
     data-fila=${x} data-columna=${y}> ${obtenerItemAlAzar(items)} </div>`;
  const cuadro = document.querySelector(
    `div[data-fila="${x}"][data-columna="${y}"]`
  );
  moverCuadrado(cuadro, x, y);
  return cuadro;
};

let tamanio = 0;
const rellenarEspaciosHTML = (item, x, y) => {
  let cuadroArriba = document.querySelector(
    `div[data-fila="${x - 1}"][data-columna="${y}"]`
  );

  if (!cuadroArriba && x != 0) {
    for (let l = x; l >= 0; l--) {
      cuadroArriba = document.querySelector(
        `div[data-fila="${l}"][data-columna="${y}"]`
      );
      if (cuadroArriba) {
        // setTimeout(
        //   () => moverCuadrado(cuadroArriba, x, y),
        //   200
        // );
        cuadroArriba.style.top = `${tamanio * x}px`;
        cuadroArriba.dataset.fila = `${x}`;
        cuadroArriba.dataset.columna = `${y}`;
        return;
      }
    }
    // generarCuadrado(tamanio, x, y);
    return;
  } else if (cuadroArriba) {
    cuadroArriba.style.top = `${tamanio * x}px`;
    cuadroArriba.dataset.fila = `${x}`;
    cuadroArriba.dataset.columna = `${y}`;
    // setTimeout(
    //   () => moverCuadrado(cuadroArriba, x, y),
    //   200
    // );
    return;
  } else if (x - 1 == 0 || x == 0 || (!cuadroArriba && x != 0)) {
    generarCuadrado(tamanio, x, y);
    encontrarEspaciosHTML();
    return;
  }
};

const encontrarEspaciosHTML = () => {
  for (let i = matriz.length - 1; i >= 0; i--) {
    for (let j = matriz.length - 1; j >= 0; j--) {
      const cuadrado = seleccionarCuadrado(i, j);
      if (cuadrado == null) {
        // setTimeout(
        //   () => rellenarEspaciosHTML(cuadrado, i, j),
        //   1000
        // );
        rellenarEspaciosHTML(cuadrado, i, j);
        // return true;
      }
    }
  }
  return false;
};

let eliminarMatch = false;
const eliminarCombos = (numeroConstante, inicio, fin, orientacion) => {
  if (eliminarMatch) {
    switch (orientacion) {
      case "horizontal":
        for (let i = inicio; i <= fin; i++) {
          seleccionarCuadrado(i, numeroConstante).remove();
        }
        setTimeout(() => encontrarEspaciosHTML(), 500);
        // encontrarEspaciosHTML();
        break;
      case "vertical":
        for (let j = inicio; j <= fin; j++) {
          seleccionarCuadrado(numeroConstante, j).remove();
        }

        setTimeout(() => encontrarEspaciosHTML(), 500);
        // encontrarEspaciosHTML();
        break;
      default:
        alert("ERROR: al eliminar matches");
        break;
    }
  }
  eliminarMatch = false;
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
        eliminarCombos(j, i, i + 2, "horizontal");
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
        eliminarCombos(i, j, j + 2, "vertical");
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
      eliminarMatch = true;
      // eliminarCombos(i, j, j + 2, 'horizontal')
      return true;
    }
  }
  segundoCuadrado = "";
  return false;
};

const intercambiarItemsEnArrayGrilla = (x1, y1, x2, y2) => {
  const temp = matriz[x1][y1];
  matriz[x1][y1] = matriz[x2][y2];
  matriz[x2][y2] = temp;
};

const intercambiarCuadros = (elemento1, elemento2) => {
  const item1 = document.querySelector(
    `div[data-fila="${elemento1.dataset.fila}"][data-columna="${elemento1.dataset.columna}"]`
  );
  const item2 = document.querySelector(
    `div[data-fila="${elemento2.dataset.fila}"][data-columna="${elemento2.dataset.columna}"]`
  );
  tamanio = parseFloat(item2.style.height);

  const datax1 = Number(item1.dataset.fila);
  const datax2 = Number(item2.dataset.fila);
  const datay1 = Number(item1.dataset.columna);
  const datay2 = Number(item2.dataset.columna);

  intercambiarItemsEnArrayGrilla(datax2, datay2, datax1, datay1);

  item1.style.top = `${datax2 * tamanio}px`;
  item2.style.top = `${datax1 * tamanio}px`;
  item1.style.left = `${datay2 * tamanio}px`;
  item2.style.left = `${datay1 * tamanio}px`;

  item1.dataset.fila = datax2;
  item2.dataset.fila = datax1;
  item1.dataset.columna = datay2;
  item2.dataset.columna = datay1;
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
            setTimeout(
              () => intercambiarCuadros(primerCuadrado, e.target),
              200
            );
            segundoCuadrado = "";
            return;
          }
          primerCuadrado.classList.remove("select-item");
          primerCuadrado = "";
          segundoCuadrado = "";
          // eliminarCombos(i, j, j + 2, 'horizontal')
        } else {
          primerCuadrado.classList.remove("select-item");
          primerCuadrado = "";
          primerCuadrado = e.target;
          primerCuadrado.classList.add("select-item");
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
  dibujarGrillaHTML(dimension);
  selectItem();
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
