const form = document.querySelector('form');
const submitBtn = document.getElementById('submitButton');

form.addEventListener('submit', validate);

function validate(e) {
    e.preventDefault();
    validateName();
    validateEmail();
    validateSubject();
    validateMessage();
}

function validateName() {
    const name = document.getElementById('id_message_name');
    if (!name || name.value === '' || name.value === null) {
        setErrorFor(name, 'Name cannot be blank.');
    } else {
        setSuccessFor(name);
    }
}

function validateEmail() {
    const email = document.getElementById('id_message_email');
    if (!email || email.value === '' || email.value === null) {
        setErrorFor(email, 'Email cannot be blank.');
    } else if (!isEmail(email)) {
        setErrorFor(email, 'Email is not valid.');
    } else {
        setSuccessFor(email);
    }
}

function validateSubject() {
    const subject = document.getElementById('id_message_subject');
    if (!subject || subject.value === '' || subject.value === null) {
        setErrorFor(subject, 'Subject cannot be blank.');
    } else if (subject.value.length > 50) {
        setErrorFor(subject, 'Subject must be less than 25 characters long.');
    } else {
        setSuccessFor(subject);
    }
}

function validateMessage() {
    const messageText = document.getElementById('id_message_text');
    if (!messageText || messageText.value === '' || messageText.value === null) {
        setErrorFor(messageText, 'Message cannot be blank.');
    } else if (messageText.value.length > 250) {
        setErrorFor(messageText, 'Subject must be less than 250 characters long.');
    } else {
        setSuccessFor(messageText);
    }
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.value);
}

function setErrorFor(input, message) {
    input.classList.remove('input-success');
    input.labels[0].classList.remove('success');
    input.classList.add('input-error');
    input.labels[0].classList.add('error');
    let errorText = input.labels[0].querySelector('.error-text')
    errorText.textContent = message;
}

function setSuccessFor(input) {
    input.classList.remove('input-error');
    input.labels[0].classList.remove('error');
    input.classList.add('input-success');
    input.labels[0].classList.add('success');
    let successText = input.labels[0].querySelector('.error-text')
    successText.textContent = '';
}

