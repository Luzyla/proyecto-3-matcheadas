let botonComenzar = document.getElementById("boton-comenzar")
let overlayInicio = document.querySelector(".overlay-inicio")

botonComenzar.onclick = () => {
    overlayInicio.classList.add("fuera-de-foco")
}

const grilla = document.querySelector(".caja-grilla")
const items = ['🐯', '🦉', '🦋', '🕷', '🐊', '🦍', '🦜', '🦨', '🦥', '🍄', '🍀'];
let matriz = [];

const obtenerNumeroAlAzar = (array) => {
    let numero = Math.floor((Math.random() * array.length));
    return numero;
};


const obtenerItemAlAzar = (array) => {
    let fruta = array[obtenerNumeroAlAzar(array)]
    return fruta;
};


const crearGrilla = (filas, columnas, array) => {
    const anchoDeGrilla = 500 / columnas
    grilla.style.width = '500px'
    grilla.innerHTML = ''
    matriz = [];

    for (let i = 0; i < filas; i++) {
        matriz[i] = [];
        for (let j = 0; j < columnas; j++) {
            matriz[i][j] = obtenerItemAlAzar(array);

            grilla.innerHTML += `<div id="grilla"  style ="width:${anchoDeGrilla}px;"  style =  height:"${anchoDeGrilla}px"; data-fila=${i} data-columna=${j}>
                              ${matriz[i][j]}
                              </div>`;


        }
    }
    return grilla;
};


crearGrilla(9, 9, items);