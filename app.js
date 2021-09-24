const calculator = document.querySelector('.calculator');
const screen = document.querySelector('.screen');
const keySet = document.querySelectorAll('.calc-btn');
const numberSet = document.querySelectorAll('.number');
const operationSet = document.querySelectorAll('.operation');

let itemOne, itemTwo, activeOperation, solution;

const mathematics = {
  additionOperation: (a, b) => parseFloat(a + b),
  subtractionOperation: (a, b) => parseFloat(a - b),
  multiplicationOperation: (a, b) => parseFloat(a * b),
  divisionOperation: (a, b) => parseFloat(a / b),
  percentageOperation: (a, b) => parseFloat((a / 100) * b),
};

const interface = {
  // Memorize item
  getItem: item => item,
  // Display item
  //   displayItem: display => (display.innerText = itemOne),
  //   setDigit: (operation, varOne, varT, text) => {
  //     if (operation) {
  //       if (varTwo) {
  //         varTwo += text;
  //         screen.innerHTML = `<p>${item}</p>`;
  //       } else {
  //         varTwo = text;
  //         screen.innerHTML = `<p>${item}</p>`;
  //       }
  //     } else {
  //       if (itemOne) {
  //         varOne += text;
  //         screen.innerHTML = `<p>${item}</p>`;
  //       }
  //       varOne = text;
  //       screen.innerHTML = `<p>${item}</p>`;
  //     }
  //   },
  // Perform logic on item
  performLogic: item => {
    let itemText = item.innerText;
    // Determine whether item is number or operation
    // Put item in a variable if number
    if (item.classList.contains('number')) {
      if (activeOperation) {
        if (itemTwo) {
          itemTwo += itemText;
          screen.innerHTML = `<p>${itemTwo}</p>`;
        } else {
          itemTwo = itemText;
          screen.innerHTML = `<p>${itemTwo}</p>`;
        }
      } else {
        activeOperation = undefined;
        if (itemOne) {
          itemOne += itemText;
          screen.innerHTML = `<p>${itemOne}</p>`;
        } else {
          itemOne = itemText;
          screen.innerHTML = `<p>${itemOne}</p>`;
        }
      }
    } else if (item.classList.contains('operation')) {
      if (itemText === '=') {
        numericItemOne = parseFloat(itemOne);
        numericItemTwo = parseFloat(itemTwo);
        if (activeOperation === '+') {
          solution = mathematics.additionOperation(
            numericItemOne,
            numericItemTwo
          );
        } else if (activeOperation === '-') {
          solution = mathematics.subtractionOperation(
            numericItemOne,
            numericItemTwo
          );
        } else if (activeOperation === '÷') {
          solution = mathematics.divisionOperation(
            numericItemOne,
            numericItemTwo
          );
        } else if (activeOperation === '*') {
          solution = mathematics.multiplicationOperation(
            numericItemOne,
            numericItemTwo
          );
        } else if (activeOperation === '%') {
          solution = mathematics.percentageOperation(
            numericItemOne,
            numericItemTwo
          );
        } else if (activeOperation.innerText == 'AC') {
          itemOne = undefined;
          itemTwo = undefined;
          activeOperation = undefined;
          solution = undefined;
          screen.innerHTML = 'hi';
        }
        screen.innerHTML = `<p>${solution}</p>`;
        // Reset variables when equal sign pressed
        itemOne = undefined;
        itemTwo = undefined;
      }
      return (activeOperation = itemText);
    }
  },
};

// Make buttons clickable
keySet.forEach(key => {
  key.addEventListener('click', e => {
    // console.log(e.target.innerText == 'AC');
    let item = interface.getItem(e.target);
    interface.performLogic(item);
  });
});

// Bugs
// operations should not create errors when pressed before numbers
// C and AC buttons
// Starting a new problem after getting solution
