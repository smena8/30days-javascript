const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));
console.log(alphabet);

const TOTAL_FLIES = 100;
const SIZE_RANGE = [1, 5];
const SPEED_RANGE = [50, 75];
const TRANSITION_RANGE = [8,10];
let flyDirection = () => {return Math.random() < 0.5 ? -1 : 1;}
for (let i = 0; i < TOTAL_FLIES; i++) {
    setTimeout(() => {createFirefly()},100*i);
}

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
    let x = (Math.floor(Math.random()* window.innerWidth/2)+1)-500 * flyDirection();
    let y = (Math.floor(Math.random()* window.innerHeight/2)+1)-500 * flyDirection();
    div.setAttribute('data-x', x.toString());
    div.setAttribute('data-y', y.toString());
    div.style.transform = "translate("+x+"px,"+y+"px)";
    div.setAttribute('data-opacity', 1);
    div.setAttribute('data-speed', speed);
    document.body.appendChild(div);
    flyAcrossScreen = setInterval(function() {
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