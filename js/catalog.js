'use strict';

// Set up an empty cart for use on this page.
const cart = localStorage.cart ? new Cart(JSON.parse(localStorage.cart)) : new Cart([]);

if (cart.items) {
  cart.updateCounter();
  for (let i = 0; i < cart.items.length; i++) {
    updateCartPreview(cart.items[i]);
  }
}

function populateForm() {

  // Add an <option> tag inside the form's select for each product

  const selectElement = document.getElementById('items');
  for (let i in Product.allProducts) {
    const option = document.createElement('option');
    option.value = Product.allProducts[i].name;
    option.textContent = Product.allProducts[i].name;
    selectElement.appendChild(option);
  }

}

function handleSubmit(event) {
  // Prevent the page from reloading
  event.preventDefault();

  addSelectedItemToCart();
  cart.saveToLocalStorage();
  cart.updateCounter();
  updateCartPreview(cart.items[cart.items.length - 1]);
  event.target.reset();
}

// Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  const item = document.getElementById('items').value;
  const quantity = document.getElementById('quantity').value;
  cart.addItem(item, quantity);
}

// TODO: Show the selected item & quantity in the cart div
function updateCartPreview(item) {
  const product = item.product;
  const quantity = item.quantity;
  const cartOutput = document.getElementById('cartContents');
  const itemElement = document.createElement('div');
  itemElement.textContent = quantity + ': ' + product;
  cartOutput.appendChild(itemElement);
}

const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);



populateForm();