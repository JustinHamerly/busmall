'use strict';

// Cart constructor.
const Cart = function (items) {
  // this.items is an array of CartItem instances.
  this.items = items;
};

Cart.prototype.addItem = function (product, quantity) {
  const newItem = new CartItem(product, quantity);
  this.items.push(newItem);
};

Cart.prototype.saveToLocalStorage = function () {
  localStorage.setItem('cart', JSON.stringify(this.items));
};

Cart.prototype.removeItem = function (item) {
  // In this implementation, the item parameter is the index of the item to be removed.
  this.items.splice(item, 1);
};

Cart.prototype.updateCounter = function () {
  document.getElementById('itemCount').textContent = '(' + this.items.length + ')';
};

const CartItem = function (product, quantity) {
  this.product = product;
  this.quantity = quantity;
};

// Product contructor.
const Product = function (filePath, name) {
  this.filePath = filePath;
  this.name = name;
  Product.allProducts.push(this);
};
Product.allProducts = [];

function generateCatalog() {
  new Product('imgs/bag.jpg', 'bag');
  new Product('imgs/banana.jpg', 'banana');
  new Product('imgs/bathroom.jpg', 'bathroom');
  new Product('imgs/boots.jpg', 'boots');
  new Product('imgs/breakfast.jpg', 'breakfast');
  new Product('imgs/bubblegum.jpg', 'bubblegum');
  new Product('imgs/chair.jpg', 'chair');
  new Product('imgs/cthulhu.jpg', 'cthulhu');
  new Product('imgs/dog-duck.jpg', 'dog-duck');
  new Product('imgs/dragon.jpg', 'dragon');
  new Product('imgs/pen.jpg', 'pen');
  new Product('imgs/pet-sweep.jpg', 'pet-sweep');
  new Product('imgs/scissors.jpg', 'scissors');
  new Product('imgs/shark.jpg', 'shark');
  new Product('imgs/sweep.jpg', 'sweep');
  new Product('imgs/tauntaun.jpg', 'tauntaun');
  new Product('imgs/unicorn.jpg', 'unicorn');
  new Product('imgs/water-can.jpg', 'water-can');
  new Product('imgs/wine-glass.jpg', 'wine-glass');
}

// Initialize the app by creating the big list of products with images and names
generateCatalog();