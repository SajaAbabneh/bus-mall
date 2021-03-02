'use strict';

let product = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg',
  'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg',
  'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

let clickArr=[];
let viewArr =[];

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

function TypeOfProduct(name,img) {
  this.name = name;
  this.image1 = `./assets/${img}`;
  this.shown = 0;
  this.click = 0;
  TypeOfProduct.all.push(this);
}

for (let i = 0; i < product.length; i++) {
  new TypeOfProduct(getName(product[i]),product[i]);
}

function getName( fileName ) {
  return fileName.split( '.' ).slice( 0, -1 ).join( '.' );
}

let newArr=[];

function renderNewProduct() {
  document.getElementById('viewbutton').style.visibility = 'hidden';

  leftIndex = randomNumber(0, TypeOfProduct.all.length - 1);
  leftImage.src = TypeOfProduct.all[leftIndex].image1;
  newArr.push(leftIndex);

  do {
    middleIndex = randomNumber(0, TypeOfProduct.all.length - 1);
  } while (leftIndex === middleIndex);
  middleImage.src = TypeOfProduct.all[middleIndex].image1;
  newArr.push(middleIndex);


  do {
    rightIndex = randomNumber(0, TypeOfProduct.all.length - 1);
  } while (leftIndex === rightIndex || middleIndex === rightIndex);
  rightImage.src = TypeOfProduct.all[rightIndex].image1;
  newArr.push(rightIndex);


  TypeOfProduct.all[leftIndex].shown++;
  TypeOfProduct.all[middleIndex].shown++;
  TypeOfProduct.all[rightIndex].shown++;


}
renderNewProduct();

imageSection.addEventListener('click', handelclick);

function handelclick(event) {


  if (TypeOfProduct.counter < clickCounter) {
    const clickedElement = event.target;
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
    for(let i =0 ; i < TypeOfProduct.all.length; i++){
      viewArr.push(TypeOfProduct.all[i].shown);
      clickArr.push(TypeOfProduct.all[i].click);
    }
    result();

  }
}

viewResult.addEventListener('submit', result);
function result(event) {
  document.getElementById('viewbutton').style.visibility = 'visible';
}
function myfunction() {
  console.log('num',clickArr);
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels:product,
      datasets: [{
        label: '# of Votes' ,
        data: clickArr,
        backgroundColor:
          'yellow',
        borderColor:
          'pink',

        borderWidth: 2
      },{
        label: '# of Seen' ,
        data: viewArr,
        backgroundColor:
          'red'
        ,
        borderColor:
          'red',

        borderWidth: 2
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  let ulElement = document.getElementById('Result');
  for (let j = 0; j < TypeOfProduct.all.length - 1; j++) {
    let liElement = document.createElement('li');
    ulElement.appendChild(liElement);
    liElement.textContent = `${TypeOfProduct.all[j].name} had ${TypeOfProduct.all[j].click} votes, and was seen ${TypeOfProduct.all[j].shown} times.`;

  }
}

function randomNumber(min, max) {
  let lastArr = Math.floor(Math.random() * (max - min + 1)) + min;
  for(let i =0 ; i < newArr.length ; i++){
    if(lastArr === newArr[i]){
      lastArr = Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
  return lastArr;
}


