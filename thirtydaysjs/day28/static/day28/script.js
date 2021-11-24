"use strict";

document.addEventListener('DOMContentLoaded', () => {

    addNewSticky();

    const addStickyNoteBtn = document.querySelector('.add-sticky-note__btn');
    addStickyNoteBtn.addEventListener('click', addNewSticky);

    const stickyNotes = document.querySelectorAll('.sticky-note');
    stickyNotes.forEach(note => {
        adjustTextAreaHeight(note.querySelector('a').lastElementChild);
        note.querySelector('a').firstElementChild.addEventListener('click', removeStickNote);
        note.querySelector('a').lastElementChild.addEventListener('keyup', adjustTextAreaHeight);
    })

    let isDragging = false;
    let dragTarget;

    let lastOffsetX = 0;
    let lastOffsetY = 0;

    window.addEventListener('mousedown', e => {
        if (!e.target.classList.contains('sticky-note')) {
          if (e.target.classList.contains('sticky-note__title') || e.target.classList.contains('sticky-note__text')) {
                dragTarget = e.target.parentElement.parentElement;
                lastOffsetX = e.offsetX;
                lastOffsetY = e.offsetY;
          } else {
                return;
          }
        } else {
            dragTarget = e.target;
            lastOffsetX = e.offsetX;
            lastOffsetY = e.offsetY;
        }
        dragTarget.parentElement.append(dragTarget);
            isDragging = true;
          });
        window.addEventListener('mousemove', function() {
            if (!isDragging) {
                return;
            }
            dragTarget.style.left = event.clientX - lastOffsetX + 'px';
            dragTarget.style.top = event.clientY - lastOffsetY + 'px';
        });
        window.addEventListener('mouseup', () => (isDragging = false));

})

function addNewSticky() {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    li.setAttribute('class', 'sticky-note');
    li.setAttribute('draggable', 'true');
    const a = document.createElement('a');
    a.setAttribute('href', '#');
    const close = document.createElement('div');
    close.setAttribute('class', 'sticky-note__close');
    close.textContent = 'X';
    close.addEventListener('click', removeStickNote);
    a.appendChild(close);
    const input = document.createElement('input');
    input.setAttribute('class', 'sticky-note__title');
    input.setAttribute('type', 'text');
    input.setAttribute('value', 'Title');
    input.setAttribute('minlength', '4');
    input.setAttribute('maxlength', '25');
    a.appendChild(input);
    const textArea = document.createElement('textarea');
    textArea.setAttribute('class', 'sticky-note__text');
    textArea.setAttribute('type', 'text');
    textArea.textContent = 'Text content';
    textArea.setAttribute('minlength', '4');
    textArea.setAttribute('maxlength', '250');
    textArea.setAttribute('spellcheck', 'true');
    textArea.addEventListener('keyup', adjustTextAreaHeight);
    a.appendChild(textArea);
    li.appendChild(a);
    ul.appendChild(li);

}

function adjustTextAreaHeight(element) {
    element = element.target || element;
    let elementValue = element.value;
    let elementHeight = (element.scrollHeight > 230) ? element.scrollHeight - 4 : 230;
    element.value = elementValue;
    element.style.height = `${elementHeight}px`;

}

function removeStickNote() {
    this.parentElement.parentElement.remove()
}
