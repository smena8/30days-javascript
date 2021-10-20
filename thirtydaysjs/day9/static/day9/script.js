const video = document.querySelector('#video');
const button = document.querySelector('button');

// Pause and play the video, and change the button text
button.addEventListener('click', function(){
    if (video.paused) {
        video.play();
        button.innerHTML = "Pause";
    } else {
        video.pause();
        button.innerHTML = "Play";
    }
})
