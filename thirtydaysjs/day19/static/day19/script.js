const cardContainer = document.querySelector('.card__container');
const fruitArray = ['apple', 'avocado', 'banana', 'cantaloupe', 'cherry', 'durian', 'grapes', 'kiwi', 'lemon', 'orange',
                    'papaya', 'pear', 'pineapple', 'plum', 'strawberry', 'watermelon'];
let fruitArrayDbl = fruitArray.concat(fruitArray);
let checkMatchInterval;
// shuffle array
let cardArray = shuffleArray();

cardArray.forEach(fruit => {
    createCardElement(fruit);
})

function createCardElement(fruit) {
    // create card div
    let card = document.createElement('div');
    card.setAttribute('class', 'card');
    // create front of card
    let frontCard = document.createElement('div');
    frontCard.setAttribute('class', 'card-front');
    frontCard.style.backgroundImage = `url('/static/day19/images/${fruit}.svg')`;
    frontCard.setAttribute('data-name', fruit);
    card.appendChild(frontCard);
    // create back of card
    let backCard = document.createElement('div');
    backCard.setAttribute('class', 'card-back');
    backCard.addEventListener('click', flipEvent);
    card.appendChild(backCard);
    // append to container
    cardContainer.appendChild(card);
}

function shuffleArray() {
    fruitArrayDbl.forEach((str, index)=> {
        randomIndex = Math.floor(Math.random()* fruitArrayDbl.length);
        item1 = fruitArrayDbl[index];
        item2 = fruitArrayDbl[randomIndex];
        fruitArrayDbl[index] = item2;
        fruitArrayDbl[randomIndex] = item1;
    })
    return fruitArrayDbl
}

function flipEvent() {
    if (this.classList.contains('card-back')) {
        this.classList.toggle('flip');
    }
    if (flipCount() === 2) {
        checkMatchInterval = setInterval(checkMatch, 1000);
    } else if (flipCount() > 2) {
        this.classList.remove('flip');
    }
}

function flipCount() {
    return document.querySelectorAll('.flip:not(.matched)').length
}

function checkMatch() {
    const flippedCards = document.querySelectorAll('.flip:not(.matched)');
    if (flippedCards[0].previousSibling.dataset.name === flippedCards[1].previousSibling.dataset.name) {
        flippedCards[0].classList.add('matched');
        flippedCards[1].classList.add('matched');
    } else {
        flippedCards[0].classList.remove('flip');
        flippedCards[1].classList.remove('flip');
    }
    let cardMatch = document.querySelectorAll('.card-back.matched');
    console.log('match count', cardMatch.length);
    if (checkWin()) {
        if (confirm('You completed the match game! You win! Star new game?')) {
            window.location.href = '/19';
        }
    };
    clearInterval(checkMatchInterval);
}

function checkWin() {
    let cardBacks = document.querySelectorAll('.card-back');
    return [...cardBacks].every(card => card.classList.contains('matched'))
}