let intentos = 6;
let juegoTerminado = false;
let palabra = '';
const diccionario = {
    'ARGENTINA': {
        'bandera': '🇦🇷',
        'imagen': './img/imagen_argentina.jpg'
    },
    'BOLIVIA': {
        'bandera': '🇧🇴',
        'imagen': './img/imagen_bolivia.jpg'
    },
    'BRASIL': {
        'bandera': '🇧🇷',
        'imagen': './img/imagen_brasil.jpg'
    },
    'CHILE': {
        'bandera': '🇨🇱',
        'imagen': './img/imagen_chile.jpg'
    },
    'COLOMBIA': {
        'bandera': '🇨🇴',
        'imagen': './img/imagen_colombia.jpg'
    },
    'ECUADOR': {
        'bandera': '🇪🇨',
        'imagen': './img/imagen_ecuador.jpg'
    },
    'GUYANA': {
        'bandera': '🇬🇾',
        'imagen': './img/imagen_guyana.jpg'
    },
    'PARAGUAY': {
        'bandera': '🇵🇾',
        'imagen': './img/imagen_paraguay.jpg'
    },
    'PERU': {
        'bandera': '🇵🇪',
        'imagen': './img/imagen_peru.jpg'
    },
    'SURINAM': {
        'bandera': '🇸🇷',
        'imagen': './img/imagen_surinam.jpg'
    },
    'URUGUAY': {
        'bandera': '🇺🇾',
        'imagen': './img/imagen_uruguay.jpg'
    },
    'VENEZUELA': {
        'bandera': '🇻🇪',
        'imagen': './img/imagen_venezuela.jpg'
    }
};

window.addEventListener('load', init);

function init() {
    console.log('La página se ha cargado correctamente');
    const button = document.getElementById("guess-button");
    button.addEventListener("click", intentar);
    document.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            intentar();
        }
    });

    // Agregar evento de clic al botón "Volver a Jugar"
    const restartButton = document.getElementById("restart-button");
    restartButton.addEventListener("click", reiniciarJuego);

     // Mostrar la bandera del país al inicio del juego
    mostrarBandera();
}


function mostrarBandera() {
    // Seleccionar un país aleatorio
    palabra = Object.keys(diccionario)[Math.floor(Math.random() * Object.keys(diccionario).length)];
    // Obtener la bandera del país seleccionado
    const bandera = diccionario[palabra].bandera;
    // Mostrar la bandera en el elemento con ID "bandera-pais"
    const banderaPais = document.getElementById("bandera-pais");
    banderaPais.textContent = bandera;
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Reiniciar las variables del juego
    intentos = 6;
    juegoTerminado = false;
    palabra = Object.keys(diccionario)[Math.floor(Math.random() * Object.keys(diccionario).length)];

    mostrarBandera(); // Mostrar la bandera de un nuevo país al reiniciar
    // Resto del código para reiniciar el juego...
   
    // Limpiar el contenido del contenedor de mensajes
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = "";

    // Habilitar el campo de entrada y el botón de adivinar
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = false;
    const button = document.getElementById("guess-button");
    button.disabled = false;

    // Limpiar la rejilla de letras adivinadas
    const GRID = document.getElementById("grid");
    GRID.innerHTML = "";

    // Mostrar el mensaje de inicio de juego
   // contenedor.innerHTML = "<p>¡Adivina el país!</p>";

    // Enfocar el campo de entrada
    INPUT.focus();
}

function intentar() {
    // Verificar si el juego está terminado antes de continuar
    if (juegoTerminado) return;

    // Inicializar palabra si aún no está definida
    if (!palabra) {
        palabra = Object.keys(diccionario)[Math.floor(Math.random() * Object.keys(diccionario).length)];
    }

    const INTENTO = leerIntento(); // No es necesario convertir a mayúsculas aquí
    console.log("Intento:", INTENTO);
    console.log("Palabra:", palabra);
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    let intentoFallido = true;
    let letrasCorrectas = 0;
    for (let i = 0; i < palabra.length; i++) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (i < INTENTO.length && INTENTO[i].toUpperCase() === palabra[i].toUpperCase()) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'green';
            letrasCorrectas++;
        } else if (INTENTO.toUpperCase() === palabra.toUpperCase()) { // Verificar si el intento coincide con la palabra completa
            SPAN.innerHTML = INTENTO;
            SPAN.style.backgroundColor = 'yellow';
            intentoFallido = false;
        } else if (palabra.toUpperCase().includes(INTENTO.toUpperCase())) { // Verificar si la letra está en la palabra
            SPAN.innerHTML = INTENTO;
            SPAN.style.backgroundColor = 'yellow';
            intentoFallido = false;
        } else {
            SPAN.innerHTML = i < INTENTO.length ? INTENTO[i] : "";
            SPAN.style.backgroundColor = 'rgb(34,193,195)';
        }
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);
    if (intentoFallido && letrasCorrectas === 0) {
        intentos--;
        console.log("Intentos restantes:", intentos);
        if (intentos === 0) {
            terminar("<h1>¡PERDISTE! 😞</h1>");
            juegoTerminado = true;
            return;
        }
    }
    if (INTENTO.toUpperCase() === palabra.toUpperCase()) {
        const bandera = diccionario[palabra].bandera;
        const imgpais = diccionario[palabra].imagen;
        terminar(`<h1>¡GANASTE! 😃</h1><p>El país es ${palabra} ${bandera} <img src="${imgpais}" alt="${palabra}"></p>`);
        juegoTerminado = true;
        return;
    }
}



function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    const button = document.getElementById("guess-button");
    button.disabled = true;
    let contenedor = document.getElementById('guesses');

    if (juegoTerminado) {
        mensaje = "<h1>¡PERDISTE! 😞</h1>";
        mensaje += `<p>El país correcto era ${palabra} ${diccionario[palabra].bandera}</p> 
        <img src="${diccionario[palabra].imagen}"> `;
    } else {
        mensaje = "<h1>¡GANASTE! 😃</h1>";
        mensaje += `<p>El país es ${palabra} ${diccionario[palabra].bandera} <img src="${diccionario[palabra].imagen}" alt="${palabra}"></p>`;
    }

    contenedor.innerHTML = mensaje;
}




function leerIntento() {
    let intento = document.getElementById("guess-input").value;
    intento = intento.toUpperCase(); // Convertir el intento a mayúsculas
    return intento;
}
