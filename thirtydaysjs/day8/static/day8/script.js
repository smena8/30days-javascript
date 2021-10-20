// note: onclick can override another onclick, addEventListener adds on instead of overriding

let modal = document.querySelector("#modal");

// after delay open modal
let seconds = 2
let delay = 1000 * seconds;
setTimeout(function() {modal.style.display = "block";}, delay);

// clicking order now opens the model
const orderBtn = document.querySelector('#order_btn')
orderBtn.onclick = function() {
  modal.style.display = "block";
}

// element that closes the modal
let close = document.querySelector(".modal__close");

// close the modal
close.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(e) {
  if (e.target == document.body) {
    modal.style.display = "none";
  }
}