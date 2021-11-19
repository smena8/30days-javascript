const filterBtns = document.querySelectorAll('button[data-filter]');
const dataTags = Array.from(document.querySelectorAll('div[data-tag]')); //converts nodelist of elements to array
const gallery = document.querySelector('.gallery');
const cartList = document.querySelector('.cart__list');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        filterTag = btn.dataset.filter;
        if (filterTag === 'all') {
            dataTags.forEach( thumb => {
                thumb.parentElement.style.display = 'flex';
            })
        } else {
            galleryThumbsDisplay = dataTags.filter(tag => tag.dataset.tag === filterTag);
            galleryThumbsNone = dataTags.filter(tag => tag.dataset.tag !== filterTag);
            galleryThumbsDisplay.forEach( thumb => {
                thumb.parentElement.style.display = 'flex';
            })
            galleryThumbsNone.forEach( thumb => {
                thumb.parentElement.style.display = 'none';
            })
        }


    })


})

const addToCartBtns = document.querySelectorAll('.btn-add-cart');

addToCartBtns.forEach(addToCartBtn => {
    addToCartBtn.addEventListener('click', addToCart);
})

function addToCart() {
    let item = event.target.parentElement;
    let itemImg = item.querySelector('.gallery__thumb').style.backgroundImage;
    let itemImgLink = itemImg.replace('url("', '').replace('")','');
    let itemTitle = item.querySelector('.gallery__thumb--title').textContent;
    if (checkDuplicate(itemTitle)) {
        alert('This item is already in the cart.')
        return
    }
    let itemPrice = item.querySelector('.price').textContent;
    createRow(itemImgLink, itemTitle, itemPrice);
    calcTotal();
}

function createRow(itemImgLink, itemTitle, itemPrice) {
    let itemCartRow = document.createElement('div');
    itemCartRow.setAttribute('class', 'cart__item');
    let itemCartImg = document.createElement('img');
    itemCartImg.src = `${itemImgLink}`;
    itemCartImg.setAttribute('width', '100px');
    itemCartImg.setAttribute('height', '100px');
    itemCartRow.appendChild(itemCartImg);
    let itemCartTitle = document.createElement('p');
    itemCartTitle.setAttribute('class', 'cart__item--title');
    itemCartTitle.textContent = `${itemTitle}`;
    itemCartRow.appendChild(itemCartTitle);
    let itemCartQuantity = document.createElement('div');
    let subtractButton = document.createElement('button');
    subtractButton.setAttribute('class', 'cart__item--subtract');
    let subtractIcon = document.createElement('i');
    subtractIcon.setAttribute('class', 'fa fa-minus');
    subtractButton.addEventListener('click', subtractQuantity);
    subtractButton.appendChild(subtractIcon);
    let inputQuantity = document.createElement('input');
    inputQuantity.className = 'cart__item--quantity';
    inputQuantity.type = 'text';
    inputQuantity.value = '1';
    inputQuantity.addEventListener('change', calcTotal);
    let addButton = document.createElement('button');
    addButton.setAttribute('class', 'cart__item--add');
    let plusIcon = document.createElement('i');
    plusIcon.setAttribute('class', 'fa fa-plus');
    addButton.addEventListener('click', addQuantity);
    addButton.appendChild(plusIcon);
    itemCartQuantity.appendChild(subtractButton);
    itemCartQuantity.appendChild(inputQuantity);
    itemCartQuantity.appendChild(addButton);
    itemCartRow.appendChild(itemCartQuantity);
    let itemCartPrice = document.createElement('p');
    itemCartPrice.className = 'cart__item--price';
    itemCartPrice.textContent = `${itemPrice}`;
    itemCartRow.appendChild(itemCartPrice);
    let removeButton = document.createElement('button');
    removeButton.setAttribute('class', 'cart__item--remove');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', removeRow);
    itemCartRow.appendChild(removeButton);
    cartList.appendChild(itemCartRow);
}

function addQuantity() {
    let currentQuantity = this.previousElementSibling.value;
    newQuantity = parseInt(currentQuantity) + 1;
    this.previousSibling.value = newQuantity;
    calcTotal();
}

function subtractQuantity() {
    let currentQuantity = this.nextSibling.value;
    newQuantity = parseInt(currentQuantity) - 1;
    if (newQuantity >= 1) {
        this.nextSibling.value = newQuantity;
        calcTotal();
    }
}

function removeRow() {
    let item = event.target.parentElement;
    item.remove();
    calcTotal();
}

function checkDuplicate(itemTitle) {
    let cartTitles = document.querySelectorAll('.cart__item--title');
    return [...cartTitles].some(cartTitle => cartTitle.textContent === itemTitle)
}

function calcTotal() {
    let newTotal = 0;
    cartItems = document.querySelectorAll('.cart__item');
    cartItems.forEach(cartItem => {
        priceStr = cartItem.querySelector('.cart__item--price').textContent
        quantityStr = cartItem.querySelector('.cart__item--quantity').value
        let price = parseFloat(priceStr);
        let quantity = parseFloat(quantityStr);
        if (quantity <= 0 || quantity% 1 != 0 || isNaN(quantity)) {
            quantity = 0;
            cartItem.querySelector('.cart__item--quantity').value = 0;
        } else if (quantity >= 50) {
            alert("Woah! We don't have enough time to make that! Please, call 48 hours in advance for large orders.")
            quantity = 0;
            cartItem.querySelector('.cart__item--quantity').value = 0;
        }
        let itemTotal = price * quantity;
        newTotal +=  itemTotal;
    })
    if (newTotal === 0) {
        document.querySelector('#total').textContent = '0.00';
    } else {
        document.querySelector('#total').textContent = Math.round(newTotal * 100) / 100;
    }
}