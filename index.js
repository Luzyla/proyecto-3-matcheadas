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
            style="width:${anchoDeGrilla}px; height:${anchoDeGrilla}px;" 
            data-fila=${i} data-columna=${j}>
            ${matriz[i][j]}
            </div>`;

        }
    }
    return grilla;
};

crearGrilla(9, 9, items);

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