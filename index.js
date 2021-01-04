let botonComenzar = document.getElementById("boton-comenzar");
let overlayInicio = document.querySelector(".overlay-inicio");

let botonNivelFacil = document.getElementById("boton-nivel-facil");
let botonNivelIntermedio = document.getElementById("boton-nivel-intermedio");
let botonNivelDificil = document.getElementById("boton-nivel-dificil");

let overlayNiveles = document.querySelector(".overlay-niveles");
const grilla = document.querySelector(".caja-grilla");

const animales = ["🐯", "🦉", "🦋", "🐊", "🦍", "🦜", "🦨", "🦥", "🍄", "🍀"];
let matriz = [];
let primerCuadrado;
let segundoCuadrado;
let eliminarMatch = false;
let tamanio = 0;

let botonInfo = document.querySelector(".info-button")
let botonRefresh = document.querySelector(".refresh-button")
let overlayRefresh = document.querySelector(".overlay-reinicio")
let botonCancelar = document.getElementById("boton-cancelar")
let botonNuevoJuego = document.getElementById("boton-nuevo-juego")

let overlayTimeout = document.querySelector(".overlay-timeout")
let botonNuevoJuegoTimeout = document.getElementById("boton-nuevo-juego-timeout")
let botonRefreshTimeout = document.getElementById("boton-reiniciar-timeout")

botonInfo.onclick = () => {
    overlayInicio.classList.remove("fuera-de-foco");
}

botonRefresh.onclick = () => {
    overlayRefresh.classList.remove("fuera-de-foco");
}

botonComenzar.onclick = () => {
    overlayInicio.classList.add("fuera-de-foco");
};

botonCancelar.onclick = () => {
    overlayRefresh.classList.add("fuera-de-foco");
}

botonNuevoJuego.onclick = () => {
    overlayRefresh.classList.add("fuera-de-foco");
    overlayNiveles.classList.remove("fuera-de-foco");
}

botonNuevoJuegoTimeout.onclick = () => {
    overlayTimeout.classList.add("fuera-de-foco");
    overlayNiveles.classList.remove("fuera-de-foco");
    activarTimer()
}

botonRefreshTimeout.onclick = () => {
    overlayTimeout.classList.add("fuera-de-foco");
    activarTimer()
}

const obtenerNumeroAlAzar = (array) => {
    let numero = Math.floor(Math.random() * array.length);
    return numero;
};

const obtenerAnimalAlAzar = (array) => {
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
    matriz[x][y] = seleccionarCuadrado(x, y).innerHTML.trim()

};

const generarCuadrado = (tamanio, x, y) => {
    let emoji = obtenerAnimalAlAzar(animales)

    const cuadrado = document.createElement('div')
    grilla.appendChild(cuadrado)
    cuadrado.dataset.fila = `${x}`
    cuadrado.dataset.columna = `${y}`
    cuadrado.style.height = `${tamanio}px`
    cuadrado.style.top = `${tamanio * -1}px`
    cuadrado.style.left = `${tamanio * y}px`
    cuadrado.setAttribute("id", "grilla");
    cuadrado.innerHTML = emoji
    cuadrado.addEventListener('click', selectItem)
    moverCuadrado(cuadrado, x, y);
    matriz[x][y] = emoji
    setTimeout(() => {
        if (hayMatches()) {
            eliminarMatch = true
            eliminarCombos()
        }
    }, 1000);
};

const rellenarEspaciosHTML = (item, x, y) => {
    let cuadroArriba = document.querySelector(`div[data-fila="${x - 1}"][data-columna="${y}"]`);

    if (!cuadroArriba && x != 0) {
        for (let l = x; l >= 0; l--) {
            cuadroArriba = seleccionarCuadrado(l, y);

            if (cuadroArriba) {
                moverCuadrado(cuadroArriba, x, y)
                return;
            }
        }
        setTimeout(() => generarCuadrado(tamanio, x, y), 800);

        return;
    } else if (cuadroArriba) {
        moverCuadrado(cuadroArriba, x, y)
        return;

    } else if (x - 1 == 0 || x == 0 || (!cuadroArriba && x != 0)) {

        setTimeout(() => generarCuadrado(tamanio, x, y), 600);
        return;
    }
};

const encontrarEspaciosHTML = () => {
    for (let i = matriz.length - 1; i >= 0; i--) {
        for (let j = matriz.length - 1; j >= 0; j--) {
            const cuadrado = seleccionarCuadrado(i, j);

            if (cuadrado === null) {
                rellenarEspaciosHTML(cuadrado, i, j);

            }
        }
    }
    return true;
};


const eliminarCombos = () => {
    const grillas = document.querySelectorAll("div#grilla");
    let encontrarEspacios = false
    if (eliminarMatch) {

        for (const item of grillas) {
            if (item.classList.contains('match')) {
                item.classList.remove('match');
                grilla.removeChild(item)
                encontrarEspacios = true
            }
        }

        if (encontrarEspacios) {
            setTimeout(() => encontrarEspaciosHTML(), 200);
            eliminarMatch = false
        }
        return true
    }

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

                if (eliminarMatch) {
                    seleccionarCuadrado(i, j).classList.add('match')
                    seleccionarCuadrado(i + 1, j).classList.add('match')
                    seleccionarCuadrado(i + 2, j).classList.add('match')
                }
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

                if (eliminarMatch) {
                    seleccionarCuadrado(i, j).classList.add('match')
                    seleccionarCuadrado(i, j + 1).classList.add('match')
                    seleccionarCuadrado(i, j + 2).classList.add('match')
                }
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
        `div[data-fila="${elemento1.dataset.fila}"][data-columna="${elemento1.dataset.columna}"]`);
    const item2 = document.querySelector(
        `div[data-fila="${elemento2.dataset.fila}"][data-columna="${elemento2.dataset.columna}"]`);
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
    let grillas = document.querySelectorAll("div#grilla");
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
                        setTimeout(() => intercambiarCuadros(primerCuadrado, e.target), 500);
                        segundoCuadrado = "";

                    } else {
                        eliminarCombos();
                        primerCuadrado.classList.remove("select-item");
                        primerCuadrado = "";
                        segundoCuadrado = "";
                    }

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
            matriz[i][j] = obtenerAnimalAlAzar(array);
        }
    }
};

const dibujarGrillaHTML = (dimensiones) => {
    const tamanio = 510 / dimensiones;
    grilla.style.width = "510px";
    grilla.innerHTML = "";

    for (let i = 0; i < dimensiones; i++) {
        for (let j = 0; j < dimensiones; j++) {
            grilla.innerHTML += `<div id="grilla"  
                style="height:${tamanio}px;  top: ${tamanio * i}px; left: ${tamanio * j
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
        crearMatriz(animales, dimension);
    } while (hayMatches());
};

const timeout = () => {
    overlayTimeout.classList.remove("fuera-de-foco");
}

const activarTimer = () => {
    setTimeout(timeout, 30000);
}

botonNivelFacil.onclick = () => {
    grillaInicial(9);
    crearGrilla(9, animales);
    overlayNiveles.classList.add("fuera-de-foco");
    activarTimer()
};

botonNivelIntermedio.onclick = () => {
    grillaInicial(8);
    crearGrilla(8, animales);
    overlayNiveles.classList.add("fuera-de-foco");
    activarTimer()
};

botonNivelDificil.onclick = () => {
    grillaInicial(7);
    crearGrilla(7, animales);
    overlayNiveles.classList.add("fuera-de-foco");
    activarTimer()
};