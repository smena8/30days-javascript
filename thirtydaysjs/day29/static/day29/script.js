const blocks = document.querySelectorAll('.timeline__block');


let options = {
  root: document.querySelector('#scrollArea'),
  rootMargin: '0px',
  threshold: 1.0
}

let callback = (entries, observer) => {
  entries.forEach(entry => {
       if (entry.isIntersecting) {
            entry.target.classList.remove('hidden');
            entry.target.firstElementChild.classList.add('bounce-img');
            entry.target.lastElementChild.classList.add('bounce-text');
       }
  });
};


let observer = new IntersectionObserver(callback, options);
blocks.forEach(block => {
    observer.observe(block);
})