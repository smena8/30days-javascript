hamburgerBtn = document.querySelector('.hamburger')
nav = document.querySelector('nav')

hamburgerBtn.addEventListener('click', function(){
    nav.classList.toggle('open');
})


window.addEventListener('resize', function(){
    console.log(window.innerWidth)
    if (window.innerWidth >= 1000 ){
        nav.classList.remove('open');
    }
});