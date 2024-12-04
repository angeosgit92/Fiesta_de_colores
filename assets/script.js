// Obtener referencias a los elementos del DOM
const title = document.getElementById("party-title");
const colorContainer = document.getElementById("color-container");
const addColorButton = document.getElementById("add-color");
const resetButton = document.getElementById("reset-colors");
const popularColorMessage = document.getElementById("popular-color");
// Sonidos
const addColorSound = document.getElementById("add-color-sound");
const resetSound = document.getElementById("reset-sound");
const clickColorSound = document.getElementById("click-color-sound");
const backgroundMusic = document.getElementById("background-music");

//Volumen de fondo
backgroundMusic.volume = 0.1;

// Objeto para registrar los votos
const colorVotes = {};

// Temporizador de inactividad
let inactivityTimer;

// Función para generar un color aleatorio
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Función para encontrar el color más popular
function getMostPopularColor() {
    let maxVotes = 0;
    let mostPopular = "Ninguno";
    for (const color in colorVotes) {
        if (colorVotes[color] > maxVotes) {
            maxVotes = colorVotes[color];
            mostPopular = color;
        }
    }
    return { mostPopular, maxVotes };
}

// Función para actualizar el mensaje dinámico del color más popular
function updatePopularColorMessage() {
    const { mostPopular, maxVotes } = getMostPopularColor();

    // Limpiar contenido actual del mensaje
    popularColorMessage.innerHTML = "";

    // Crear texto dinámico
    const textNode = document.createTextNode(`El color más popular con ${maxVotes} voto(s) es: `);

    // Crear el círculo que representa el color más popular
    const colorCircle = document.createElement("span");
    colorCircle.style.display = "inline-block";
    colorCircle.style.width = "30px";
    colorCircle.style.height = "30px";
    colorCircle.style.marginLeft = "8px";
    colorCircle.style.borderRadius = "50%";
    colorCircle.style.backgroundColor = mostPopular;

    // Agregar el texto y el círculo al mensaje
    popularColorMessage.appendChild(textNode);
    popularColorMessage.appendChild(colorCircle);
}


// Función para crear un nuevo color en la pista de baile
function createColorElement(color) {
    const colorDiv = document.createElement("div");
    colorDiv.style.backgroundColor = color;
    colorDiv.classList.add("color-circle");
    colorDiv.addEventListener("click", () => {
        title.style.color = color;

        // Registrar voto para el color
        colorVotes[color] = (colorVotes[color] || 0) + 1;

        // Actualizar el mensaje del color más popular
        updatePopularColorMessage();

        // Reproducir sonido para clic en color
        clickColorSound.play();

        // Reiniciar el temporizador de inactividad
        resetInactivityTimer();
    });
    colorContainer.appendChild(colorDiv);
}

// Función para agregar un nuevo color aleatorio
function addRandomColor() {
    const randomColor = getRandomColor();
    createColorElement(randomColor);

    // Reproducir sonido para añadir color
    addColorSound.play();

    // Reiniciar el temporizador de inactividad
    resetInactivityTimer();
}

// Función para reiniciar la pista de colores
function resetColors() {
    colorContainer.innerHTML = ""; // Eliminar todos los colores
    title.style.color = "#fff"; // Restablecer el color del título
    popularColorMessage.textContent = ""; // Restablecer el mensaje del color más popular
    for (const color in colorVotes) {
        delete colorVotes[color]; // Reiniciar los votos
    }

    // Reproducir sonido para reiniciar colores
    resetSound.play();
}

// Función para manejar el temporizador de inactividad
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        resetColors(); // Reiniciar los colores después de 10 segundos de inactividad
        alert("La pista de baile se ha reiniciado por inactividad.");
    }, 10000); // 10 segundos
}

// Agregar evento al botón de añadir color
addColorButton.addEventListener("click", addRandomColor);

// Agregar evento al botón de reiniciar
resetButton.addEventListener("click", resetColors);

// Iniciar el temporizador de inactividad
resetInactivityTimer();

