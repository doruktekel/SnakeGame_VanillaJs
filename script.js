/// Define Html elements
const board = document.getElementById("game-board");
const instructiontext = document.getElementById("instruction-text");
const logo = document.getElementById("logo");

/// Define game variable
let snake = [{ x: 10, y: 10 }];
let gridSize = 20;
const food = generateFood();
let direction = "right";
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

/// Draw game map , snake , food
function draw() {
  board.innerHTML = "";
  drawSnake();
  drawFood();
}

/// Draw snake
function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement("div", "snake");
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}

/// Create a snake or food cube/dev
function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

/// Set the position of snake or food
function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

/// Draw food
function drawFood() {
  const foodElement = createGameElement("div", "food");
  setPosition(foodElement, food);
  board.appendChild(foodElement);
}

/// Generate food random location
function generateFood() {
  const x = Math.floor(Math.random() * gridSize) + 1;
  const y = Math.floor(Math.random() * gridSize) + 1;
  return { x, y };
}

// Move Sneak
function move() {
  const head = { ...snake[0] };
  switch (direction) {
    case "right":
      head.x++;
      break;
    case "left":
      head.x--;
      break;
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    generateFood();
    clearInterval(); // clear past interval
    gameInterval = setInterval(() => {
      move();
      draw();
    }, gameSpeedDelay);
  } else snake.pop();
}

/// Testing draw function
// draw();

/// Start game function
function startGame() {
  gameStarted = true;
  instructiontext.style.display = "none";
  logo.style.display = "none";
  gameInterval = setInterval(() => {
    move();
    // checkCollusion();
    draw();
  }, gameSpeedDelay);
}

// keypress eventlisteener for starting

function handleKeyPress(event) {
  if (
    (!gameStarted && event.code === "space") ||
    (!gameStarted && event.key === " ")
  ) {
    startGame();
  } else {
    switch (event.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
    }
  }
}

document.addEventListener("keydown", handleKeyPress);
