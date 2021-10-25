const hamburgerBtn = document.querySelector('.hamburger')
const nav = document.querySelector('nav')
const navList = nav.querySelector('ul')

// responsive nav menu
hamburgerBtn.addEventListener('click', function(){
    nav.classList.toggle('open');
})

window.addEventListener('resize', function(){
    if (window.innerWidth >= 1000 ){
        nav.classList.remove('open');
    }
});


// scrolling navigation

const header = document.querySelector('.header')

let options = {
  root: document.main, // null defaults to browser viewport
  rootMargin: '0px',
  threshold: 0.75
}

let positionY = 0;
let callback = (entries, observer) => {
  entries.forEach(entry => {

    if (entry.isIntersecting) {
    console.log(entry)
        // change nav ul background color
        if (entry.target.classList.contains('green')) {
            navList.style.background = '#7fa866';
            nav.style.background = '#7fa866';
        } else if (entry.target.classList.contains('yellow')) {
            navList.style.background = '#fcc25f';
            nav.style.background = '#fcc25f';
        } else if (entry.target.classList.contains('pink')) {
            navList.style.background = '#ee8691';
            nav.style.background = '#ee8691';
        }

    }
  });
};

let observer = new IntersectionObserver(callback, options);
let targets = document.querySelectorAll('section');
targets.forEach(target => {
    observer.observe(target);
    })


