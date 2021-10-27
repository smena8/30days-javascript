const btns = document.querySelectorAll('button')
const compText = document.querySelector("#comp")
const resultsText = document.querySelector('#results')
const options = ['rock', 'paper', 'scissors']
const map = {};

options.forEach(function(option, i) {
    map[option] = {};
    map[option][option] = "IT WAS A TIE!"
    map[option][options[(i+1)%3]] = options[(i+1)%3] + " WINS!"
    map[option][options[(i+2)%3]] = option + " WINS!"
})

btns.forEach(btn => {
    btn.addEventListener('click', function() {
        let userChoice = btn.textContent.toLowerCase();
        compChoice = computerChoice();
        results = compare(userChoice, compChoice)
        compText.textContent = `The computer chose: ${compChoice}.`;
        resultsText.textContent = `${results}`
    })
})

function computerChoice() {
    const index = Math.floor(Math.random() * options.length)
    let choice = options[index]
    return choice
}

function compare(userChoice, compChoice) {
    return (map[userChoice] || {}) [compChoice] || "Invalid choice";
}
