hamburgerBtn = document.querySelector('.hamburger')
nav = document.querySelector('nav')

hamburgerBtn.addEventListener('click', function(){
    nav.classList.toggle('open');
})


window.addEventListener('resize', function(){
    if (window.innerWidth >= 1000 ){
        nav.classList.remove('open');
    }
});

const prevBtn = document.querySelector('.arrow-left')
const nextBtn = document.querySelector('.arrow-right')
const indicatorContainer = document.querySelector('.indicators__container')
let imgArray = ['person_with_icecream__green.jpg', 'person_with_icecream__pink.jpg', 'person_with_icecream__yellow.jpg'];

for (i=0; i < imgArray.length-1; i++) {
    let divElem = document.createElement('div');
    divElem.setAttribute('class', 'indicator') ;
    indicatorContainer.appendChild(divElem);
}

const indicators = document.querySelectorAll('.indicator')

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function(){
            currentImgStyle = document.body.style.backgroundImage;
            currentImg = currentImgStyle.split('images/')[1];
            currentImgStyle = currentImgStyle.replace(currentImg, imgArray[index]);
            document.body.style.backgroundImage = currentImgStyle;
            let currentIndicator = document.querySelector('.current');
            currentIndicator.classList.remove('current');
            nextIndicator = indicators[index];
            nextIndicator.classList.add('current');
        })
    })

prevBtn.addEventListener('click', function() {
    let currentImgStyle = document.body.style.backgroundImage;
    for (i=imgArray.length; imgArray.length >= 0; i--) {
        if (currentImgStyle.includes(imgArray[i])){
            currentImg = imgArray[i]
            nextImg = imgArray[i-1] || imgArray[imgArray.length-1];
            currentImgStyle = currentImgStyle.replace(imgArray[i], nextImg);
            document.body.style.backgroundImage = currentImgStyle
            let currentIndicator = document.querySelector('.current');
            currentIndicator.classList.remove('current');
            nextIndicator = indicators[i-1] || indicators[imgArray.length-1];
            nextIndicator.classList.add('current');
            break;
        }
    }
})

nextBtn.addEventListener('click', function() {
    slideToNext();
})

setInterval(slideToNext, 3000);

function slideToNext() {
    let currentImgStyle = document.body.style.backgroundImage;
    for (i=0; i < imgArray.length; i++) {
        if (currentImgStyle.includes(imgArray[i])){
            currentImg = imgArray[i]
            nextImg = imgArray[i+1] || imgArray[0];
            currentImgStyle = currentImgStyle.replace(imgArray[i], nextImg);
            document.body.style.backgroundImage = currentImgStyle
            let currentIndicator = document.querySelector('.current');
            currentIndicator.classList.remove('current');
            nextIndicator = indicators[i+1] || indicators[0];
            nextIndicator.classList.add('current');
            break;
        }
    }
}