
const prevRevBtn = document.querySelector('.arrow__left')
const nextRevBtn = document.querySelector('.arrow__right')
const indicatorContainer = document.querySelector('.indicators__container')

let reviews = document.querySelectorAll('.review')
for (i=0; i < reviews.length-1; i++) {
    indicatorContainer.innerHTML = indicatorContainer.innerHTML += '<div class="indicator"></div>';
}

const indicators = document.querySelectorAll('.indicator')

prevRevBtn.addEventListener('click', function(){
    let reviews = document.querySelectorAll('.review')
    for (let i = reviews.length - 1; i >= 0; i--) {
        if (i === 0) {
            reviews[i].classList.remove('current');
            reviews[reviews.length-1].classList.add('current');
            indicators[i].classList.remove('current');
            indicators[reviews.length-1].classList.add('current');
            break;
        } else if (reviews[i].className.indexOf('current') != -1) {
            reviews[i].classList.remove('current');
            reviews[i-1].classList.add('current');
            indicators[i].classList.remove('current');
            indicators[i-1].classList.add('current');
            break;
        }

    }
})

nextRevBtn.addEventListener('click', function(){
    let reviews = document.querySelectorAll('.review')
    for (let i=0; i < reviews.length; i++) {
        if (i === reviews.length-1) {
            reviews[i].classList.remove('current');
            reviews[0].classList.add('current');
            indicators[i].classList.remove('current');
            indicators[0].classList.add('current');
            break;
        } else if (reviews[i].className.indexOf('current') != -1) {
            reviews[i].classList.remove('current');
            reviews[i+1].classList.add('current');
            indicators[i].classList.remove('current');
            indicators[i+1].classList.add('current');
            break;
        }

    }

})