const palabras = ["computadora", "java", "herencia", "objetos", "polimorfismo", "funciones", "canvas", "kinal", "monitor", "netbeans", "javascript", "encapsulamiento", "variable", "constante", "atributos"];

let palabra = palabraRandom();

let palabraOculta = ocultarPalabra(palabra);

let letrasUsadas = [];

let oportunidades = 7;

let juegoTerminado = false;

const canvas = document.getElementById('graficoAhorcado');
const contexto = canvas.getContext('2d');

document.addEventListener("keydown", function (event) {
    const tecla = event.key.toLocaleLowerCase();
    if (/^[a-zñ]$/.test(tecla)) {
        letraNueva(tecla);
    }
});

function ahorcado(oportunidades) {
    contexto.clearRect(0, 0, canvas.width, canvas.height);

    if (oportunidades <= 7) {
        contexto.strokeStyle = '#FFFFFF'
        // Base
        contexto.beginPath();
        contexto.moveTo(20, 180);
        contexto.lineTo(180, 180);
        contexto.stroke();

        // Poste vertical
        contexto.beginPath();
        contexto.moveTo(50, 20);
        contexto.lineTo(50, 180);
        contexto.stroke();

        // Barra horizontal superior
        contexto.beginPath();
        contexto.moveTo(50, 20);
        contexto.lineTo(120, 20);
        contexto.stroke();
        // Cable
        contexto.beginPath();
        contexto.moveTo(120, 20);
        contexto.lineTo(120, 50);
        contexto.stroke();

        if (oportunidades < 7) {
            // Cabeza
            contexto.beginPath();
            contexto.arc(120, 70, 20, 0, Math.PI * 2);
            contexto.stroke();
            if (oportunidades < 6) {
                // Cuerpo
                contexto.beginPath();
                contexto.moveTo(120, 90);
                contexto.lineTo(120, 140);
                contexto.stroke();
                if (oportunidades < 5) {
                    // Pierna Izquierda
                    contexto.beginPath();
                    contexto.moveTo(100, 160);
                    contexto.lineTo(120, 140);
                    contexto.stroke();
                    if (oportunidades < 4) {
                        // Pierna Derecha
                        contexto.beginPath();
                        contexto.moveTo(120, 140);
                        contexto.lineTo(140, 160);
                        contexto.stroke();
                        if (oportunidades < 3) {
                            // Brazo Izquierdo
                            contexto.beginPath();
                            contexto.moveTo(100, 120);
                            contexto.lineTo(120, 100);
                            contexto.stroke();
                            if (oportunidades < 2) {
                                // Brazo Derecho
                                contexto.beginPath();
                                contexto.moveTo(120, 100);
                                contexto.lineTo(140, 120);
                                contexto.stroke();
                                if (oportunidades < 1) {

                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function palabraRandom() {
    return palabras[Math.floor(Math.random() * palabras.length)];
}

function ocultarPalabra(palabra) {
    return palabra.split('').map(letter => '_').join(' ');
}

function actualizarPantalla() {
    document.getElementById("palabraEscondida").textContent = palabraOculta;
    document.getElementById("letrasUsadas").textContent = letrasUsadas.join(', ');
    document.getElementById("oportunidades").textContent = oportunidades;

    ahorcado(oportunidades);
}

function letraNueva(letra) {
    if (juegoTerminado) {
        document.getElementById("Teclado").style.display = "none";
        return;
    }

    if (letrasUsadas.includes(letra)) {
        //alert("Ya has usado esta letra");
        return;
    }

    letrasUsadas.push(letra);

    buscarLetra = false;

    for (let i = 0; i < palabra.length; i++) {
        if (palabra[i] === letra) {
            console.log(palabraOculta = palabraOculta.substr(0, i * 2) + letra + palabraOculta.substr(i * 2 + 1));
            palabraOculta = palabraOculta.substr(0, i * 2) + letra + palabraOculta.substr(i * 2 + 1);
            buscarLetra = true;
        }
    }

    if (!buscarLetra) {
        oportunidades--;

        if (oportunidades === 0) {
            document.getElementById("mensaje").textContent = "!Perdiste¡ La palabra era: " + palabra;
            juegoTerminado = true;
            mostrarBotonReiniciar();
        }
    }

    //document.querySelector(`.Tecla[data-letter="${letra}"]`).disabled = true;

    actualizarPantalla();

    if (!palabraOculta.includes('_')) {
        document.getElementById("mensaje").textContent = "!Ganaste¡ La palabra era: " + palabra;
        juegoTerminado = true;
        mostrarBotonReiniciar();
    }

    if (juegoTerminado) {
        document.getElementById("Teclado").style.display = "none";
    }
}

function mostrarBotonReiniciar() {
    const botonReiniciar = document.getElementById("reiniciar");
    botonReiniciar.style.display = "block";
}

function reiniciarJuego() {
    juegoTerminado = false;
    oportunidades = 7;
    palabra = palabraRandom();
    palabraOculta = ocultarPalabra(palabra);
    letrasUsadas = [];
    actualizarPantalla();
    document.getElementById("mensaje").textContent = "";
    const botonReiniciar = document.getElementById("reiniciar");
    botonReiniciar.style.display = "none";
    document.getElementById("Teclado").style.display = "flex";

    let activarBotones = document.querySelectorAll('.Tecla');
    activarBotones.forEach(function (boton) {
        boton.disabled = false;
    });
}

actualizarPantalla();