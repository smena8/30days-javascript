
document.addEventListener('mousemove', moveEyes);


function moveEyes() {
    const eyes = document.querySelectorAll('.eye--center');
    eyes.forEach(eye => {
        let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
        let y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);
        let radian = Math.atan2(event.pageX - x, event.pageY - y);
        let rotation = (radian * (180 / Math.PI) * -1) + 0;
        eye.style.transform = 'rotate(' + rotation + 'deg)';
    })
}