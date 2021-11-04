const board = document.querySelector('#board');
const gridSize = 21;
let lastRenderTime = 0;
const snakeSpeed = 2;
const snakeExpansionRate = 10;
const snakeBody = [randomGridPosition()];
let snakeHead;
let direction = { x:0 , y:0 };
let lastDirection;
let food = randomGridPosition();
let i = 0;
let endGame = false;

// listen to keypress
window.addEventListener('keydown', getDirection);

//game loop
window.requestAnimationFrame(main);

function main(currentTime) {

    if (endGame) {
        if (confirm('Game over. Press OK to play again.')) {
            window.location = '/16';
        }
        return
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / snakeSpeed) {
        return
    }
    lastRenderTime = currentTime;
    update();
    draw();
}

function startGame() {

}

function update() {
    updateFood();
    updateSnake();
    updateDeath();
}

function draw() {
    board.innerHTML = '';
    drawFood();
    drawSnake();
}

function getDirection(e) {
    switch (e.key) {
        case 'ArrowUp':
            if (lastDirection.y !== 0) {
                break
            }
            direction = { x:0 , y:-1 };
            break;
        case 'ArrowDown':
            if (lastDirection.y !== 0) {
                break
            }
            direction = { x:0 , y:1 };
            break;
        case 'ArrowLeft':
            if (lastDirection.x !== 0) {
                break
            }
            direction = { x:-1 , y:0 };
            break;
        case 'ArrowRight':
            if (lastDirection.x !== 0) {
                break
            }
            direction = { x:1 , y:0 };
            break;
    }
}

function updateSnake() {
    for (i = snakeBody.length - 2; i >= 0; i--  ) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }
    lastDirection = direction;
    snakeBody[0].x += direction.x;
    snakeBody[0].y += direction.y;
}

function drawSnake() {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    })
}

function updateFood() {
    if (onSnake(food)) {
        for (i = 0; i < snakeExpansionRate; i++) {
            snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
        }
        food = randomGridPosition();
    }
}

function drawFood() {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

function updateDeath() {
    endGame = snakeHitWall() || snakeIntersection()
}

function randomGridPosition() {
    return { x: Math.floor(Math.random() * gridSize) + 1, y: Math.floor(Math.random() * gridSize) + 1 }
}

function onSnake(position, {ignoredHead = false} = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoredHead && index === 0) {
            return false
        }
        return segment.x === position.x && segment.y === position.y
    })
}

function snakeIntersection() {
    snakeHead = snakeBody[0];
    return onSnake(snakeHead, {ignoredHead: true})
}

function snakeHitWall() {
    snakeHead = snakeBody[0];
    return snakeHead.x < 1 || snakeHead.x > gridSize || snakeHead.y < 1 || snakeHead.y > gridSize
}