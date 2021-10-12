let darkMode = localStorage.getItem('darkMode');

const toggleDayNight = document.querySelector('#toggle_day_night');

if (darkMode === 'enabled') {
    night();
}

toggle_day_night.addEventListener('click', function(){
    toggle(toggleDayNight);
})


function night(){
    document.body.classList.add('darkmode');
    localStorage.setItem('darkMode', 'enabled');
}

function day(){
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkMode', null);
}

function toggle(toggleDayNight) {
    darkMode = localStorage.getItem('darkMode');
    // chose if statement over toggle since refreshing the page effects toggle
    if (toggle_day_night.checked){
        night();
    } else {
        day();
    }
}