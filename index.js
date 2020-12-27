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
const intercambiarCuadros = (elemento1, elemento2) => {
   
    
    const item1 = document.querySelector(`div[data-fila="${elemento1.dataset.fila}"][data-columna="${elemento1.dataset.columna}"]`)
    const item2 = document.querySelector(`div[data-fila="${elemento2.dataset.fila}"][data-columna="${elemento2.dataset.columna}"]`)

    const tamanio =  parseFloat(item2.style.height)


    
    const datax1 = Number(item1.dataset.fila)
    const datax2 = Number(item2.dataset.fila)
    const datay1 = Number(item1.dataset.columna)
    const datay2 = Number(item2.dataset.columna)


console.log(datax1, datax2, datay1)

    item1.style.top = `${datax2 * tamanio}px`
    item2.style.top = `${datax1 * tamanio}px`
    item1.style.left = `${datay2 * tamanio}px`
    item2.style.left = `${datay1 * tamanio}px`


    item1.dataset.fila = datax2
    item2.dataset.fila = datax1
    item1.dataset.columna = datay2
    item2.dataset.columna = datay1




}
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
                console.log(primerCuadrado)
                primerCuadrado.classList.add('select-item')
            } else if (!segundoCuadrado) {
                segundoCuadrado = e.target
                console.log(segundoCuadrado)
                if (sonAdyacentes(primerCuadrado, segundoCuadrado)) {

                    primerCuadrado.classList.remove('select-item');
                    intercambiarCuadros(primerCuadrado, segundoCuadrado)
                    console.log('primer intercambio ', primerCuadrado)
                    console.log('segundo intercambio', segundoCuadrado)
                    primerCuadrado = ''
                    segundoCuadrado = ''

                }
            }
        }
    }
}




const crearGrilla = (filas, columnas, array) => {
    const tamanioDeGrilla = 510 / columnas
    grilla.style.width = '510px'
    grilla.innerHTML = ''
    matriz = [];

    for (let i = 0; i < filas; i++) {
        matriz[i] = [];
        for (let j = 0; j < columnas; j++) {
            matriz[i][j] = obtenerItemAlAzar(array);

            grilla.innerHTML +=
                `<div id="grilla"  
            style="height:${tamanioDeGrilla}px;  top: ${tamanioDeGrilla * i}px; left: ${tamanioDeGrilla * j}px;"  data-fila=${i} data-columna=${j}  >
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





