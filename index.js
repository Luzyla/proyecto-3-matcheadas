let botonComenzar = document.getElementById("boton-comenzar")
let overlayInicio = document.querySelector(".overlay-inicio")

let botonNivelFacil = document.getElementById("boton-nivel-facil")
let botonNivelIntermedio = document.getElementById("boton-nivel-intermedio")
let botonNivelDificil = document.getElementById("boton-nivel-dificil")

let overlayNiveles = document.querySelector(".overlay-niveles")

botonComenzar.onclick = () => {
    overlayInicio.classList.add("fuera-de-foco")
}

const grilla = document.querySelector(".caja-grilla")
const items = ['🐯', '🦉', '🦋', '🐊', '🦍', '🦜', '🦨', '🦥', '🍄', '🍀'];
let matriz = [];

const obtenerNumeroAlAzar = (array) => {
    let numero = Math.floor((Math.random() * array.length));
    return numero;
};


const obtenerItemAlAzar = (array) => {
    let animal = array[obtenerNumeroAlAzar(array)]
    return animal;
};

let primerCuadrado;
let segundoCuadrado;

const sonAdyacentes = (primerItem, segundoItem) => {
    let primerItemVertical = Number(primerItem.dataset.fila)
    let primerItemHorizontal = Number(primerItem.dataset.columna)
    let segundoItemVertical = Number(segundoItem.dataset.fila)
    let segundoItemHorizontal = Number(segundoItem.dataset.columna)

    if (primerItemHorizontal === segundoItemHorizontal ||
        primerItemVertical === segundoItemVertical
    ) {

        if (primerItemVertical + 1 === segundoItemVertical ||
            primerItemVertical - 1 === segundoItemVertical ||
            primerItemHorizontal + 1 === segundoItemHorizontal ||
            primerItemHorizontal - 1 === segundoItemHorizontal
        ) {
            return true;
        }
    }
    segundoCuadrado = ''
    return false;

};

const selectItem = () => {
    const grillas = document.querySelectorAll("div#grilla")

    for (const items of grillas) {
        items.onclick = (e) => {
            if (!primerCuadrado) {
                primerCuadrado = e.target
                primerCuadrado.classList.add('select-item')
            } else if (!segundoCuadrado) {
                segundoCuadrado = e.target
                if (sonAdyacentes(primerCuadrado, segundoCuadrado)) {
                    primerCuadrado.classList.remove('select-item');
                    primerCuadrado = ''
                    segundoCuadrado = ''
                }
            }
        }
    }
}









const crearGrilla = (filas, columnas, array) => {
    const anchoDeGrilla = 510 / columnas
    grilla.style.width = '510px'
    grilla.innerHTML = ''
    matriz = [];

    for (let i = 0; i < filas; i++) {
        matriz[i] = [];
        for (let j = 0; j < columnas; j++) {
            matriz[i][j] = obtenerItemAlAzar(array);

            grilla.innerHTML +=
                `<div id="grilla"  
            style="width:${anchoDeGrilla}px; height:${anchoDeGrilla}px;"  data-fila=${i} data-columna=${j} >
            ${matriz[i][j]}
            </div>`;

        }
    }
    selectItem();
    return grilla;
};


botonNivelFacil.onclick = () => {
    crearGrilla(9, 9, items);
    overlayNiveles.classList.add("fuera-de-foco")
}

botonNivelIntermedio.onclick = () => {
    crearGrilla(8, 8, items);
    overlayNiveles.classList.add("fuera-de-foco")
}

botonNivelDificil.onclick = () => {
    crearGrilla(7, 7, items);
    overlayNiveles.classList.add("fuera-de-foco")
}





