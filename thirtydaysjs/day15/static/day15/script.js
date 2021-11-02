const board = document.querySelector('.board');
const squares = document.querySelectorAll('.square');
const restartBtn = document.querySelector('#restart')
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

let turn;

startGame();

restartBtn.addEventListener('click', function() {
    startGame();
})

function startGame() {
  recentTurn = board.classList[1];
  squares.forEach(square => {
    square.className = 'square';
    board.classList.remove(recentTurn);
    board.classList.add('cross');
    square.addEventListener('click', handleClick);
  })
}

function changeClasses(currentTurn, nexTurn, square) {
    square.classList.add(currentTurn);
    board.classList.remove(currentTurn);
    board.classList.add(nexTurn);
}

function handleClick() {
    turn = board.classList[1];
    ( turn === 'cross' ) ? changeClasses('cross','circle', this) : changeClasses('circle','cross', this);
     if (checkWin(turn)) {
        alert(`Winner is ${( turn === 'cross' ) ? "X's" : "O's"}!`);
     } else if (checkDraw()) {
        alert('It looks like a tie!');
     }
     this.removeEventListener('click', handleClick);
}

function checkWin(currentTurn) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return squares[index].classList.contains(currentTurn);
    })
  })
}

function checkDraw() {
  return [...squares].every(square => {
    return square.classList.contains('cross') || square.classList.contains('circle')
  })
}