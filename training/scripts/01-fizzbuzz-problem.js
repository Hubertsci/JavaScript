let timeoutId;
let timeoutId2;
let intervalId;

if (localStorage.getItem('inputNumber')) {
  renderList(localStorage.getItem('inputNumber'))
}

function getNumber() {
  const inputElement = document.querySelector('.js-number-input');
  localStorage.setItem('inputNumber', inputElement.value)
  const iterationNumber = Number(localStorage.getItem('inputNumber'));

  return iterationNumber;
}

function renderList(iterationNumber) {
  let fizzBuzzList ='';

  for (let i=1; i<=iterationNumber; i++) {
    if (i%3===0 && i%5===0) {
      fizzBuzzList = fizzBuzzList + '<div class="item-container">FizzBuzz</div>'
    }
    else if (i%3===0) {
      fizzBuzzList = fizzBuzzList + '<div class="item-container">Fizz</div>'
    }
    else if (i%5===0) {
      fizzBuzzList = fizzBuzzList + '<div class="item-container">Buzz</div>'
    }
    else {
      fizzBuzzList = fizzBuzzList + `<div class="item-container">${i}</div>`
    }
  }
  document.querySelector('.js-disappear-message').innerHTML = '<p>Rendering completed!</p>';

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    document.querySelector('.js-disappear-message').innerHTML = '';
  }, 1500);
  document.querySelector('.js-fizzbuzz-list').innerHTML = fizzBuzzList;

  if (iterationNumber>0) {
    intervalId = setInterval(() => {
      document.title = `Rendered ${iterationNumber} numbers`;
      timeoutId2 = setTimeout(() => {
        document.title = 'FizzBuzz Problem';
      }, 1000)
    }, 2000)
  } else {
    clearInterval(intervalId);
    clearTimeout(timeoutId2);
    document.title = 'FizzBuzz Problem';
  }
}