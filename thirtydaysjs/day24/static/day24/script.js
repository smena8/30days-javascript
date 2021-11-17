const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));


let TOTAL_FLIES = 100;
const TIME_SPACE = 10
const SIZE_RANGE = [1, 5];
const SPEED_RANGE = [50, 75];
const TRANSITION_RANGE = [8,10];
let flyDirection = () => {return Math.random() < 0.5 ? -1 : 1;}

// create fireflies
for (let i = 0; i < TOTAL_FLIES; i++) {
    setTimeout(() => {createFirefly()},TIME_SPACE*i);
}

// spell words
setTimeout(() => {
    const fireflies = document.querySelectorAll('.firefly');
    fireflies.forEach(firefly => {
        if (firefly.flyAcrossScreen) {
            clearInterval(firefly.flyAcrossScreen);
        }
    })
    moveFireflies();
},TIME_SPACE*TOTAL_FLIES);



function createFirefly() {
    const div = document.createElement('div');
    div.setAttribute('class', 'firefly');
    let size = Math.floor(Math.random()* SIZE_RANGE[1]) + SIZE_RANGE[0];
    let speed = (Math.floor(Math.random()* SPEED_RANGE[1]) + SPEED_RANGE[0])* flyDirection();
    div.style.height = size + "px";
    div.style.width = size + "px";
    div.style.backgroundColor = 'yellow';
    div.style.borderRadius = '50%';
    div.style.margin = '5px';
    div.style.position = "absolute";
    let transitionSeconds = (Math.floor(Math.random()* TRANSITION_RANGE[1]) + TRANSITION_RANGE[0]) * 1000;
    div.style.transition = "transform "+transitionSeconds+"ms ease-in-out";
    let x = (Math.floor(Math.random()* window.innerWidth/2)+1) * flyDirection();
    let y = (Math.floor(Math.random()* window.innerHeight/2)+1) * flyDirection();
    div.setAttribute('data-x', x.toString());
    div.setAttribute('data-y', y.toString());
    div.style.transform = "translate("+x+"px,"+y+"px)";
    div.setAttribute('data-opacity', 1);
    div.setAttribute('data-speed', speed);
    document.body.appendChild(div);
    div.flyAcrossScreen = setInterval(function() {
                        flyAcross(div);
                    },  transitionSeconds);
}

function flyAcross(element) {
    let stringSpeed = element.dataset.speed;
    let currentSpeed = parseInt(stringSpeed);
    currentXPos = parseInt(element.dataset.x);
    currentYPos = parseInt(element.dataset.y);
    let newXPos = currentXPos + currentSpeed;
    let newYPos = currentYPos + currentSpeed;
    if ((newXPos > window.innerWidth / 2)+500 || (newYPos > window.innerHeight / 2)+500 ||
        (newXPos < (window.innerWidth / 2)-500*-1) || (newYPos < (window.innerHeight / 2)-500*-1)) {
        element.dataset.speed = currentSpeed * -1;
    }
    newXPos = (Math.floor(Math.random()* window.innerWidth/2)+1) * flyDirection();
    newYPos = (Math.floor(Math.random()* window.innerHeight/2)+1) * flyDirection();
    element.style.transform = "translate("+newXPos+"px,"+newYPos+"px)";
    element.dataset.x = newXPos.toString();
    element.dataset.y = newYPos.toString();
}

const ltrMap = [];
ltrMap[" "] = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      ];
ltrMap["@"] = [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      ];
ltrMap["A"] = [
      [0, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      ];
ltrMap["B"] = [
      [1, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 0],
      ];
ltrMap["C"] = [
      [0, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 1],
      [0, 1, 1, 1, 0],
      ];
ltrMap["D"] = [
      [1, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 0],
      ];
ltrMap["E"] = [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
      ];
ltrMap["F"] = [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      ];
ltrMap["G"] = [
      [0, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0],
      [1, 0, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [0, 1, 1, 1, 0],
      ];
ltrMap["H"] = [
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      ];
ltrMap["I"] = [
      [1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [1, 1, 1, 1, 1],
      ];
ltrMap["J"] = [
      [1, 1, 1, 1, 1],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0],
      [1, 0, 0, 1, 0],
      [1, 0, 0, 1, 0],
      [0, 1, 1, 0, 0],
      ];
ltrMap["K"] = [
      [1, 0, 0, 0, 1],
      [1, 0, 0, 1, 0],
      [1, 0, 1, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 1, 0, 0],
      [1, 0, 0, 1, 0],
      [1, 0, 0, 0, 1],
      ];
ltrMap["L"] = [
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
      ];
ltrMap["M"] = [
      [1, 0, 0, 0, 1],
      [1, 1, 0, 1, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      ];
ltrMap["N"] = [
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 0, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 0, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      ];
ltrMap["O"] = [
      [0, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [0, 1, 1, 1, 0],
      ];
ltrMap["P"] = [
      [1, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      ];
ltrMap["Q"] = [
      [0, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 1, 1],
      ];
ltrMap["R"] = [
      [1, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 0],
      [1, 0, 0, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      ];
ltrMap["S"] = [
      [0, 1, 1, 1, 0],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [0, 1, 1, 1, 0],
      ];
ltrMap["T"] = [
      [1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      ];
ltrMap["U"] = [
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [0, 1, 1, 1, 0],
      ];
ltrMap["V"] = [
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0],
      ];
ltrMap["W"] = [
      [1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0],
      ];
ltrMap["X"] = [
      [1, 0, 0, 0, 1],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 0, 0, 1],
      ];
ltrMap["Y"] = [
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      ];
ltrMap["Z"] = [
      [1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1],
      [0, 0, 0, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
      ];
let xstart = 5;
let ystart = (window.innerWidth/2) * -1 * 0.5;;
let xspace = 25;
let yspace = 25;
let word = 'hello';
let wordUpper = word.toUpperCase();
let stringCount = word.replace( /\s/g, '').length;


function moveFireflies() {
    console.log((stringCount*30)-TOTAL_FLIES)
    for (i = 0; i < ((stringCount*35)-TOTAL_FLIES); i++) {
        setTimeout(() => {
        const div = document.createElement('div');
        div.setAttribute('class', 'firefly');
        let size = Math.floor(Math.random()* SIZE_RANGE[1]) + SIZE_RANGE[0];
        let speed = (Math.floor(Math.random()* SPEED_RANGE[1]) + SPEED_RANGE[0])* flyDirection();
        div.style.height = size + "px";
        div.style.width = size + "px";
        div.style.backgroundColor = 'yellow';
        div.style.borderRadius = '50%';
        div.style.margin = '5px';
        div.style.position = "absolute";
        let transitionSeconds = (Math.floor(Math.random()* TRANSITION_RANGE[1]) + TRANSITION_RANGE[0]) * 1000;
        let tempx = (Math.floor(Math.random()* window.innerWidth/2)+1) * flyDirection();
        let tempy = (Math.floor(Math.random()* window.innerHeight/2)+1) * flyDirection();
        div.style.transform = "translate("+tempx+"px,"+tempy+"px)";
        div.style.transition = "transform "+transitionSeconds+"ms ease-in-out";
        div.setAttribute('data-x', tempx.toString());
        div.setAttribute('data-y', tempy.toString());
        div.setAttribute('data-opacity', 1);
        div.setAttribute('data-speed', speed);
        document.body.appendChild(div);
        }, TIME_SPACE*i);
    }
    setTimeout(() => {
        const elements = document.querySelectorAll('.firefly');
        let track = 0;
        [...wordUpper].forEach((letter, index) => {
                for (i = 0; i < ltrMap[letter].length; i++) {
                  for (j = 0; j < ltrMap[letter][i].length; j++) {
                        y = (xstart + i * xspace);
                        x = (ystart + j * yspace);
                    if (ltrMap[letter][i][j] == 1) {
                        if (elements[track]) {
                            elements[track].style.transform = "translate("+x+"px, "+y+"px)";
                        }
                        track++
                    }
                  }
                }
                ystart = x + 50;
        })
    }, ((word.length*35)-TOTAL_FLIES) * TIME_SPACE);
}