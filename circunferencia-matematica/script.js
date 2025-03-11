// Obtener el elemento canvas y su contexto
const canvas = document.getElementById('circ-container');
const ctx = canvas.getContext('2d');

// Variables globales
let numPuntos = 6; // Número inicial de puntos
let multiplicador = 1; // Multiplicador inicial
let animacionActiva = false; // Controla si la animación está activa
let intervalId = null; // ID del intervalo para detener la animación
let vueltasCompletadas = 0; // Contador de vueltas completadas

// Función para dibujar la circunferencia
function dibujarCircunferencia() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radio = 150;

  ctx.beginPath();
  ctx.arc(centerX, centerY, radio, 0, 2 * Math.PI);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Función para calcular las coordenadas de un punto en la circunferencia
function obtenerPuntoEnCircunferencia(angulo) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radio = 150;

  const x = centerX + radio * Math.cos(angulo);
  const y = centerY + radio * Math.sin(angulo);

  return { x, y };
}

// Función para dibujar un punto en el canvas con su número
function dibujarPunto(x, y, numero) {
  // Dibujar el punto
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, 2 * Math.PI); // Dibuja un círculo pequeño de radio 5
  ctx.fillStyle = 'black';
  ctx.fill();

  // Escribir el número al lado del punto
  ctx.font = '14px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(numero, x + 15, y); // Colocar el número a la derecha del punto
}

// Función para dibujar puntos uniformemente distribuidos
function dibujarPuntos() {
  // Limpiar el canvas solo al inicio
  if (vueltasCompletadas === 0) {
    limpiarCanvas();
  }

  // Calcular el ángulo entre cada punto
  const anguloEntrePuntos = (2 * Math.PI) / numPuntos;

  // Dibujar los puntos uniformemente distribuidos con sus números
  for (let i = 0; i < numPuntos; i++) {
    const angulo = i * anguloEntrePuntos;
    const punto = obtenerPuntoEnCircunferencia(angulo);
    dibujarPunto(punto.x, punto.y, i + 1); // Numerar los puntos desde 1
  }
}

// Función para dibujar las líneas entre los puntos
function dibujarLineas() {
  // Obtener el multiplicador del input
  multiplicador = parseInt(document.getElementById('multiplicador').value);

  if (isNaN(multiplicador) || multiplicador < 1) {
    alert('Ingresa un multiplicador válido (mínimo 1).');
    return;
  }

  // Calcular el ángulo entre cada punto
  const anguloEntrePuntos = (2 * Math.PI) / numPuntos;

  // Dibujar líneas entre los puntos según el multiplicador
  ctx.beginPath();
  for (let i = 0; i < numPuntos; i++) {
    const indiceSiguiente = (i + multiplicador * (vueltasCompletadas + 1)) % numPuntos; // Calcula el índice del siguiente punto
    const puntoActual = obtenerPuntoEnCircunferencia(i * anguloEntrePuntos);
    const puntoSiguiente = obtenerPuntoEnCircunferencia(indiceSiguiente * anguloEntrePuntos);
    ctx.moveTo(puntoActual.x, puntoActual.y); // Moverse al punto actual
    ctx.lineTo(puntoSiguiente.x, puntoSiguiente.y); // Conectar al siguiente punto
  }

  // Estilo de la línea
  ctx.strokeStyle = `hsl(${(vueltasCompletadas * 30) % 360}, 100%, 50%)`; // Cambiar color por vuelta
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Función para iniciar la animación
function iniciarAnimacion() {
  if (animacionActiva) {
    alert('La animación ya está en curso.');
    return;
  }

  // Obtener el número de puntos del input
  numPuntos = parseInt(document.getElementById('numPuntos').value);

  if (isNaN(numPuntos) || numPuntos < 2) {
    alert('Ingresa un número válido de puntos (mínimo 2).');
    return;
  }

  animacionActiva = true;

  // Dibujar los puntos iniciales
  dibujarPuntos();

  // Iniciar el intervalo para aumentar el número de vueltas
  intervalId = setInterval(() => {
    // Incrementar el contador de vueltas
    vueltasCompletadas++;

    // Dibujar las líneas para la nueva vuelta
    dibujarLineas();
  }, 2000); // Cambia el intervalo a tu gusto (en milisegundos)
}

// Función para detener la animación
function detenerAnimacion() {
  if (intervalId) {
    clearInterval(intervalId);
    animacionActiva = false;
    alert(`Animación detenida nº vueltas = ${vueltasCompletadas}.`);
  }
}

// Función para limpiar el canvas
function limpiarCanvas() {
    // Limpiar todo el contenido del canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Redibujar la circunferencia base
    dibujarCircunferencia();
    vueltasCompletadas = 0; // Reiniciar el contador de vueltas
}

// Inicializar dibujando la circunferencia
dibujarCircunferencia();