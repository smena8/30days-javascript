const startBtn = document.querySelector('#start');
const info = document.querySelector('#info');
const levelInfo = document.querySelector('#level_info')
const tileContainer = document.querySelector('#tile_container');
let compSequence = [];
let humanSequence = [];
let taps = 0;

const colorOptions = ['red', 'green', 'blue', 'yellow'];
let randomColor;
let level = 0;

startBtn.addEventListener('click', startGame);
const tiles = document.querySelectorAll('.tile');
tiles.forEach(option => {
    option.addEventListener('click', function() {
        let tileName = option.dataset.tile
        humanSequence.push(tileName);
        if (checkMatch()) {
            checkCompleteRound();
        } else {
            endGame();
        }
    })
})

function startGame() {
    startBtn.classList.add('hidden');
    info.classList.remove('hidden');
    nextRound();
}

function getRandomColor() {
    return colorOptions[Math.floor(Math.random()*colorOptions.length)]
}

function nextRound() {
    level++;
    compSequence.push(getRandomColor());
    level_info.textContent = `Current Level: ${level}`;
    info.textContent = 'Wait for computer to complete turn.';
    setTimeout(() => {compTurn();}, 1000);
}

function activateTile(color) {
  const tile = document.querySelector(`[data-tile='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);
  tile.classList.add('activated');
  sound.play();
  setTimeout(() => {
    tile.classList.remove('activated');
  }, 300);
}

function compTurn() {
    tile_container.classList.add('unclickable');
    setTimeout(() => {}, 1000)
    for (i = 0; i < compSequence.length; i++) {
            let color = compSequence[i]
            setTimeout(() => {
                activateTile(color);
            }, 500 * (i + 1))
        }
    setTimeout(() => {humanTurn();}, 750*compSequence.length)
}

function humanTurn() {
    let taps = level;
    setTimeout(() => {
        info.textContent = `You have ${taps} taps left.`;
    }, 1000)
    tile_container.classList.remove('unclickable');

}

function checkMatch() {
    return humanSequence.every((selection, index) => selection === compSequence[index])
}

function checkCompleteRound() {
    if (compSequence.length === humanSequence.length) {
        info.textContent = 'Round complete! Next round...';
        humanSequence = [];
        setTimeout(() => {nextRound()}, 1000);
    } else {
        taps = compSequence.length - humanSequence.length;
        info.textContent = `You have ${taps} taps left.`;
    }
}

function endGame() {
    if (confirm(`Game over. You made it to Level ${level}! Play again?`)) {
        window.location.href = '/20';
    }
}