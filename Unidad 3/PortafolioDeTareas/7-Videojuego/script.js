const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Definición del jugador (paddle)
const player = {
  width: 100,
  height: 20,
  x: canvas.width / 2 - 50,
  y: canvas.height - 30,
  speed: 8,
  dx: 0
};

// Definición de la bola
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 4,
  dx: 4,
  dy: -4
};

// Función para dibujar el jugador
function drawPlayer() {
  ctx.fillStyle = "#50FA7B";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Función para dibujar la bola
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#BD93F9";
  ctx.fill();
  ctx.closePath();
}

// Función para actualizar la posición del jugador
function movePlayer() {
  player.x += player.dx;
  // Evitar que el paddle salga del canvas
  if (player.x < 0) {
    player.x = 0;
  }
  if (player.x + player.width > canvas.width) {
    player.x = canvas.width - player.width;
  }
}

// Función para actualizar la posición de la bola y manejar las colisiones
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Colisión con las paredes izquierda y derecha
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.dx *= -1;
  }
  // Colisión con la parte superior
  if (ball.y - ball.radius < 0) {
    ball.dy *= -1;
  }
  // Si la bola toca la parte inferior, se reinicia (lógica simple de reinicio)
  if (ball.y + ball.radius > canvas.height) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dy = -ball.speed;
  }
  // Colisión bola - jugador
  if (ball.x > player.x && ball.x < player.x + player.width &&
      ball.y + ball.radius > player.y && ball.y - ball.radius < player.y + player.height) {
    ball.dy = -ball.speed;
  }
}

// Función principal de actualización del juego (game loop)
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawBall();
  movePlayer();
  moveBall();
  requestAnimationFrame(update);
}

// Manejo de eventos de teclado
function keyDown(e) {
  if (e.key === "ArrowRight" || e.key === "Right") {
    player.dx = player.speed;
  } else if (e.key === "ArrowLeft" || e.key === "Left") {
    player.dx = -player.speed;
  }
}

function keyUp(e) {
  if (e.key === "ArrowRight" || e.key === "Right" ||
      e.key === "ArrowLeft" || e.key === "Left") {
    player.dx = 0;
  }
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// Inicia el bucle del juego
update();
