'use strict';

let product = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum',
  'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors',
  'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

const imageSection = document.getElementById('imageSection');
const leftImage = document.getElementById('leftImage');
const middleImage = document.getElementById('middleImage');
const rightImage = document.getElementById('rightImage');
const viewResult = document.getElementById('viewbutton');



let leftIndex = 0;
let middleIndex = 0;
let rightIndex = 0;
const clickCounter = 5;

TypeOfProduct.all = [];
TypeOfProduct.counter = 0;

function TypeOfProduct(name) {
  this.name = name;
  this.image1 = `./assets/${name}.jpg`;
  this.image2 = `./assets/${name}.png`;
  this.image3 = `./assets/${name}.gif`;
  this.shown = 0;
  this.click = 0;
  TypeOfProduct.all.push(this);
}

for (let i = 0; i < product.length; i++) {
  new TypeOfProduct(product[i]);
}

function renderNewProduct() {
  document.getElementById('viewbutton').style.visibility = 'hidden';

  leftIndex = randomNumber(0, TypeOfProduct.all.length - 1);
  if (leftIndex === 14) {
    leftImage.src = TypeOfProduct.all[leftIndex].image2;
  } else if (leftIndex === 17) {
    leftImage.src = TypeOfProduct.all[leftIndex].image3;
  } else {
    leftImage.src = TypeOfProduct.all[leftIndex].image1;
  }


  middleIndex;
  do {
    middleIndex = randomNumber(0, TypeOfProduct.all.length - 1);
  } while (leftIndex === middleIndex);
  if (middleIndex === 14) {
    middleImage.src = TypeOfProduct.all[middleIndex].image2;
  } else if (middleIndex === 17) {
    middleImage.src = TypeOfProduct.all[middleIndex].image3;
  } else {
    middleImage.src = TypeOfProduct.all[middleIndex].image1;
  }

  rightIndex;
  do {
    rightIndex = randomNumber(0, TypeOfProduct.all.length - 1);
  } while (leftIndex === rightIndex || middleIndex === rightIndex);
  if (rightIndex === 14) {
    rightImage.src = TypeOfProduct.all[rightIndex].image2;
  } else if (rightIndex === 17) {
    rightImage.src = TypeOfProduct.all[rightIndex].image3;
  } else {
    rightImage.src = TypeOfProduct.all[rightIndex].image1;
  }

  TypeOfProduct.all[leftIndex].shown++;
  TypeOfProduct.all[middleIndex].shown++;
  TypeOfProduct.all[rightIndex].shown++;
}
renderNewProduct();

imageSection.addEventListener('click', handelclick);

function handelclick(event) {

  if (TypeOfProduct.counter < clickCounter) {
    const clickedElement = event.target;
    console.log('d', clickedElement);
    if (clickedElement.id === 'leftImage' || clickedElement === 'middleImage' || clickedElement === 'rightImage') {
      if (clickedElement.id === 'leftImage') {
        TypeOfProduct.all[leftIndex].click++;
      }
      if (clickedElement.id === 'middleImage') {
        TypeOfProduct.all[middleIndex].click++;
      }
      if (clickedElement.id === 'rightImage') {
        TypeOfProduct.all[rightIndex].click++;
      }

    }
    TypeOfProduct.counter++;
    renderNewProduct();
  } else {

    result();
  }
}

viewResult.addEventListener('submit', result);
function result(event) {
  document.getElementById('viewbutton').style.visibility = 'visible';
}
function myfunction() {

  let ulElement = document.getElementById('Result');
  for (let j = 0; j < TypeOfProduct.all.length - 1; j++) {
    let liElement = document.createElement('li');
    ulElement.appendChild(liElement);
    liElement.textContent = `${TypeOfProduct.all[j].name} had ${TypeOfProduct.all[j].click} votes, and was seen ${TypeOfProduct.all[j].shown} times.`;

}
}



function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


