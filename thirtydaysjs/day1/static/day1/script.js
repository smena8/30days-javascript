const popits = document.querySelector('.popits')

const audio = document.querySelector('audio');
audio.playbackRate = 1.75;

// initial page
createPopIt()

// responsive layout triggered when viewport is adjusted
window.addEventListener('resize', function(){
    createPopIt()
})

function createRows() {
    const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const repeatRows = Math.floor(vh/100);
    let rowHTML = ''
    let rows = '';

    for (let i = 0; i < repeatRows; i++) {
        color = rainbow.shift();
        rainbow.push(color);
        rowHTML = '<div class="row '+color+'" tabindex='+i+'></div>';
        rows = rows.concat(rowHTML);
    }

    popits.innerHTML = rows
}

function createCircles() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const repeatCircles = Math.floor(vw/100);
    const circleHTML = '<div class="border"><div class="circle" tabindex="0"></div></div>';
    let rowCircles = '';

    for (let i = 0; i < repeatCircles; i++) {
        rowCircles = rowCircles.concat(circleHTML);
    }

    const rows = document.querySelectorAll('.row');

    rows.forEach(row => {
        row.innerHTML = rowCircles;
    })
}

function poppedCirclesEvent(){
    const circles = document.querySelectorAll('.circle');

    circles.forEach(circle => {
        ['click', 'ontouchstart', 'keypress'].forEach( evt => {
            circle.addEventListener(evt, function(e) {
                if ((evt === 'keypress' && e.code === 'Enter') || (evt === 'click') || (evt === 'ontouchstart')) {
                    audio.play(); // pop it sound
                    circle.classList.toggle('popped');
                }
            })
        })
    })
}


function createPopIt(){

    createRows();

    createCircles();

    poppedCirclesEvent();
}