'use strict';

// declare products array
const allProducts = [];

// generage product view queue
const productViewQueue = [];

// declare object variables
let leftObj, midObj, rightObj;

// declare variables for clicks and rounds
let totalClicks = 0;
const voteRounds = 25;

// create a chart variable to be used in our results chart rendering
let chart

// dom references
let leftElem = document.getElementById('imgOne');
let midElem = document.getElementById('imgTwo');
let rightElem = document.getElementById('imgThree');

// let imgs = document.getElementsByClassName('productImage');
let imageContainer = document.getElementById('images');

let resultsContainer = document.getElementById('results');
let resultsButton = document.getElementById('showResults');
let resetButton = document.getElementById('reset');

// product constructor
function Product(name) {
  this.name = name;
  this.path = 'imgs/' + name + '.jpg';
  this.votes = 0;
  this.views = 0;
  allProducts.push(this);
}

// create products
function generateNewProducts(){
  const productNames = ['boots', 'bathroom', 'breakfast', 'bubblegum', 'chair', 'dog-duck', 'tauntaun', 'scissors', 'water-can', 'wine-glass', 'bag', 'banana', 'cthulhu', 'dragon', 'pen', 'pet-sweep', 'shark', 'sweep', 'unicorn'];
  for(let name of productNames){
    new Product(name)
  }
}

function getRandIdx(){
  return Math.floor(Math.random() * allProducts.length)
}

// picks three random indexes and assigns Obj variables and reassigns dom element src and ids.
function displayImages(){
  while (productViewQueue.length < 6){
    let randomNumber = getRandIdx();
    while(productViewQueue.includes(randomNumber)){
      randomNumber = getRandIdx();
    }
    productViewQueue.push(randomNumber)
  }

  // pull three numbers from view queue
  const idxOne = productViewQueue.shift();
  const idxTwo = productViewQueue.shift();
  const idxThree = productViewQueue.shift();

  // assign variables to products in allProducts array using the randomly generated index numbers
  leftObj = allProducts[idxOne];
  midObj = allProducts[idxTwo];
  rightObj = allProducts[idxThree];

  // increase objects views
  leftObj.views += 1;
  midObj.views += 1;
  rightObj.views += 1;

  // apply the dom elements src and alt using the object path and name
  leftElem.src = leftObj.path;
  leftElem.alt = leftObj.name;
  midElem.src = midObj.path;
  midElem.alt = midObj.name;
  rightElem.src = rightObj.path;
  rightElem.alt = rightObj.name;
}

function displayResults(){
  // create a unordered list html element;
  const ulElem = document.createElement('ul');

  // traverse allProducts creating list items for each one and append the li to the ul with text content added.
  for (const i in allProducts) {
    const liElemProduct = document.createElement('li');
    const text = allProducts[i].name + ' views to votes: ' + Math.round((allProducts[i].votes / allProducts[i].views)* 100) + '%';
    liElemProduct.textContent = text;
    ulElem.appendChild(liElemProduct);
  }

  // create list item element for total with a string for total cclicks
  const liElemTotal = document.createElement('li');
  liElemTotal.textContent = 'Total User Clicks: ' + totalClicks;
  ulElem.appendChild(liElemTotal);

  // append unordered list to html container via dom reference
  resultsContainer.appendChild(ulElem);

  renderChart();
}

function renderChart() {

  // set canvas height (optional)
  const canvas = document.getElementById('canvas')
  canvas.width = '1200';
  canvas.height = '600';

  // grab canvas with context
  const ctx = canvas.getContext('2d');
  
  // create arrays for holding our chart data
  const votes = [];
  const titles = [];
  const views = [];

  // loop through our products adding info to our arrays above
  for (let product of allProducts){
    votes.push(product.votes);
    titles.push(product.name);
    views.push(product.views)
  }

  // assign chart variable to a chart instance.  make sure to umport the chart library in index.html
  chart = new Chart(ctx, 
    {
      type: 'bar',
      data: {
        labels: titles,
        barThickness: 'flex',
        datasets: [
          {
            label: '# of Votes',
            data: votes,
            backgroundColor: [
              'green','green','green','green','green','green','green','green','green','green','green','green','green','green','green','green','green','green','green',
            ],
            borderColor: [
              'black','black','black','black','black','black','black','black','black','black','black','black','black','black','black','black','black','black','black',
            ],
            borderWidth: 3
          },
          {
            label: '# of views',
            data: views,
            backgroundColor: [
              'lightgreen','lightgreen','lightgreen','lightgreen','lightgreen','lightgreen','lightgreen','lightgreen','lightgreen','lightgreen','lightgreen','lightgreen','lightgreen','lightgreen','lightgreen','lightgreen','lightgreen','lightgreen','lightgreen',
            ],
            borderColor: [
              'darkgrey','darkgrey','darkgrey','darkgrey','darkgrey','darkgrey','darkgrey','darkgrey','darkgrey','darkgrey','darkgrey','darkgrey','darkgrey','darkgrey','darkgrey','darkgrey','darkgrey','darkgrey','darkgrey',
            ],
            borderWidth: 1
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            ticks: {
              stepSize: 10,
            },
            gridLines: {
              display: false,
            },
          }]
        }
      }
    }
  )
    
    
}

function handleVoteClick(event){
  // grab product name from alt of clicked on element
  let productName = event.target.alt;
  
  // check which of the three objects matches the name and increase its votes.  if somewhere other than an image is clicked alert the user to click an image and return out of function.
  if (productName === leftObj.name){
    leftObj.votes += 1;
  }else if (productName === midObj.name){
    midObj.votes += 1;
  } else if (productName === rightObj.name){
    rightObj.votes += 1;
  } else {
    alert('please click on an image');
    return;
  }

  // increase click counter
  totalClicks += 1;

  // set local storage
  setItemToLocalStorage();

  //check if vote threshold is met, and if so, remove the event listener and show the results button, add the button event listener and hide the image container.  Otherwise, generate three more images
  if(totalClicks === voteRounds){
    // remove event listener on img
    imageContainer.removeEventListener('click', handleVoteClick);

    // show the results button and add event listener to the button
    resultsButton.hidden = false;
    resultsButton.addEventListener('click', handleResultsButtonClick);

    // hide image section
    imageContainer.hidden = true;
    
  } else {
    displayImages();
  }

}

// onClick function shows the resetButton, hides the Results button, and shows the results with the displayResults function.  Reset Button then gets an event listener that reloads the page.
function handleResultsButtonClick(){
  resetButton.hidden = false;
  resultsButton.hidden = true;
  displayResults();

  resetButton.addEventListener('click', function () {
    resetButton.hidden = true;
    location.reload();
  });
}


imageContainer.addEventListener('click', handleVoteClick);


function getLocalStorage(){
  let storedProducts = localStorage.getItem('allProducts');
  let storedClicks = localStorage.getItem('totalClicks')

  // if there are items in local storage under'allProducts' retreive the items and parse them.  Then iterate through the items creating products.
  if(storedProducts){
    let parsedProducts = JSON.parse(storedProducts);
    for (let product of parsedProducts){
      let retreivedProduct = new Product(product.name);
      retreivedProduct.views = product.views;
      retreivedProduct.votes = product.votes;
    }
  }else{
    generateNewProducts();
  }
}

function setItemToLocalStorage(){
  localStorage.setItem('allProducts', JSON.stringify(allProducts))
}

getLocalStorage();
displayImages();