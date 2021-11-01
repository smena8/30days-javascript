const moleContainers = document.querySelectorAll('.mole__container');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');

let randomInt;
let hitPosition;
let result = 0;
let time = 60;

moleContainers.forEach(moleContainer => {
    moleContainer.addEventListener('mousedown', function(){
        moleHomeId = parseInt(moleContainer.firstElementChild.id);
        if (moleHomeId === hitPosition) {
            result ++;
            score.textContent = result;
            hitPosition = null
        }
    })
})

let moveMoleId = setInterval(moveMole, 750);
let timeLeftId = setInterval(countdown, 1000);

function moveMole() {
    let moles = document.querySelectorAll('.mole')
    moles.forEach(mole => {
        mole.classList.remove('mole');
    })

    randomInt = Math.floor(Math.random() * moleContainers.length);
    document.getElementById(randomInt).classList.add('mole');
    hitPosition = randomInt
}

function countdown(){
    timeLeft.textContent = time--;

    if (time === 0) {
        timeLeft.textContent = '0';
        clearInterval(timeLeftId);
        clearInterval(moveMoleId);
        alert(`Congrats! You scored ${result} points!`);
    }
}