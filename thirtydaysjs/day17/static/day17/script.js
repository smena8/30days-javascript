const board = document.querySelector('#board');
let blocks;
const gridSize = 20;
let fallSpeed = 1;
let lastRenderTime = 0;
let tetrominoStartLoc = {};
let randomTetromino;
let currentTetromino;
let currentRotation = 0;
let changePosition = { x: 0, y: 1};
let score = 0;
const scoreDisplay = document.querySelector('#score')
const pauseBtn = document.querySelector('#pause')
let paused = false;

newTetromino();
window.addEventListener('keydown', moveTetromino);
window.requestAnimationFrame(main);
pauseBtn.addEventListener('click', function() { paused = !paused; })
// game loop
function main(currentTime) {
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (paused || secondsSinceLastRender < 1 / fallSpeed) {
        return
    }
    lastRenderTime = currentTime;
    updateTetromimo(changePosition);
    drawTetromino(currentTetromino[currentRotation]);
    if (hitsBottom() || hitsOtherTetromino()) {
        addScore();
        newTetromino();
    }
    if (checkEndGame()) {
        if (confirm(`Game over! You scored ${score}. Play again?`)) {
            window.location = '/17';
        }
        return
    }
    changePosition = { x: 0, y: 1};
    fallSpeed = 2;
}

function newTetromino() {

    tetrominoStartLoc = { x: Math.floor(gridSize / 2) + 1, y : 0};

    const lTetromino = [[{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y+1},{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y+2},{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y+2}],
                        [{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x+2, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y+1}],
                        [{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y+1},{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y+2}],
                        [{x: tetrominoStartLoc.x+2, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y+1},{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y+1},{x: tetrominoStartLoc.x+2, y: tetrominoStartLoc.y+1}]];
    const zTetromino = [[{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y+1},{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y+1},{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y+2}],
                        [{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y+1},{x: tetrominoStartLoc.x+2, y: tetrominoStartLoc.y+1}],
                        [{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y+1},{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y+1},{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y+2}],
                        [{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y+1},{x: tetrominoStartLoc.x+2, y: tetrominoStartLoc.y+1}]];
    const oTetromino = [[tetrominoStartLoc,{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y+1},{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y+1}],
                        [tetrominoStartLoc,{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y+1},{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y+1}],
                        [tetrominoStartLoc,{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y+1},{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y+1}],
                        [tetrominoStartLoc,{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y+1},{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y+1}]];
    const iTetromino = [[tetrominoStartLoc,{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x+2, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x+3, y: tetrominoStartLoc.y}],
                        [tetrominoStartLoc,{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y +1},{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y +2},{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y +3}],
                        [tetrominoStartLoc,{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x+2, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x+3, y: tetrominoStartLoc.y}],
                        [tetrominoStartLoc,{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y +1},{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y +2},{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y +3}]];
    const tTetromino = [[{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x+2, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y+1}],
                        [{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y+1},{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y+1},{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y+2}],
                        [{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y+1},{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y+1},{x: tetrominoStartLoc.x+2, y: tetrominoStartLoc.y+1}],
                        [{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y},{x: tetrominoStartLoc.x, y: tetrominoStartLoc.y+1},{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y+1},{x: tetrominoStartLoc.x+1, y: tetrominoStartLoc.y+2}]];

    tetrominos = [lTetromino, zTetromino, oTetromino, iTetromino, tTetromino];

    randomTetromino = tetrominos[Math.floor(Math.random()*tetrominos.length)];
    currentTetromino = randomTetromino;
}

function drawTetromino(tetromino) {
    undrawTetromino()
    tetromino.forEach((block, index ) => {
        const tetrominoElement = document.createElement('div');
        if (block.x === 0){
            console.log(block.x)
            console.log(block)
        }
        tetrominoElement.style.gridRowStart = block.y;
        tetrominoElement.style.gridColumnStart = block.x;
        tetrominoElement.setAttribute('data-row', block.y);
        tetrominoElement.setAttribute('data-col', block.x);
        tetrominoElement.classList.add('block');
        if (hitsBottom() || hitsOtherTetromino()) {
            tetrominoElement.classList.add('taken');
        }
        board.appendChild(tetrominoElement);
    })
}

function undrawTetromino() {
    blocks = board.querySelectorAll('.block');
    blocks.forEach((block, index ) => {
            if (!block.classList.contains('taken')) {
                blocks[index].remove();
            }
    })
}

function updateTetromimo(changePosition) {
    currentTetromino.forEach((style) => {
        style.forEach((position, index) => {
            if (position.x + changePosition.x === 0) {
                changePosition = { x: 0, y: changePosition.y}
            }
            style[index] = {x: position.x + changePosition.x, y: position.y + changePosition.y};
        })
    })
}

function moveTetromino(e) {
    switch (e.key) {
        case 'ArrowUp':
            if (currentRotation >= 0 && currentRotation < randomTetromino.length-1) {
                currentRotation ++;
            } else if (currentRotation === randomTetromino.length-1) {
                currentRotation = 0;
            }
            break;
        case 'ArrowDown':
            if (!hitsBottom()) {
               changePosition = { x: 0, y: 1};
               fallSpeed ++;
            }
            break;
        case 'ArrowLeft':
            if (!hitsSideWall()) {
               changePosition = { x: -1, y: 1};
               fallSpeed ++;
            }
            break;
        case 'ArrowRight':
            if (!hitsSideWall()) {
               changePosition = { x: 1, y: 1};
               fallSpeed ++;
            }
            break;
    }
}

function hitsSideWall() {
    return currentTetromino[currentRotation].some(block => {
        return block.x < 1 || block.x >= gridSize
    })
}

function hitsBottom() {
    return currentTetromino[currentRotation].some(block => {
            return block.y >= gridSize
        })
}

function hitsTop() {
    return currentTetromino[currentRotation].some(block => {
            return block.y === 1
        })
}

function hitsOtherTetromino() {
    blocks = board.querySelectorAll('.block.taken');
    return currentTetromino[currentRotation].some(block => {
            return [...blocks].some(elem => {
                return parseInt(elem.style.gridRowStart) === block.y + 1 && parseInt(elem.style.gridColumnStart) === block.x
            })
        })
}

function checkEndGame() {
    return hitsTop() && hitsOtherTetromino()
}

function addScore() {
    for ( i=1; i < gridSize+1; i++ ) {
        row = i
        cols = [];
        for ( j=1; j < gridSize+1; j++) {
            cols.push(j);
        }
       rowElements = document.querySelectorAll(`.taken[data-row='${row}']`);
       if (cols.every(col => blockDataQuery(col, [...rowElements]))) {
            score += 10;
            scoreDisplay.textContent = score;
            rowElements.forEach(r => {
                r.remove();
            })
            rowsTaken = document.querySelectorAll('.taken');
            [...rowsTaken].forEach(takenRow => {
                newRowNumber = parseInt(takenRow.style.gridRowStart) + 1
                if (newRowNumber <= row  && newRowNumber <= gridSize) {
                    takenRow.style.gridRowStart = newRowNumber;
                    takenRow.dataset.row = newRowNumber;
                }
            })
       }
    }
}

function blockDataQuery(col, rowElementsList) {
    index = rowElementsList.findIndex(elem => parseInt(elem.dataset.col) === col)
    if (index != -1) {
        return true
    }
    return false
}
