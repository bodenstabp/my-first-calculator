const calculator = document.querySelector('.calculator');
const calcScreen = document.querySelector('.screen');
const calcBtns = document.querySelectorAll('.calc-btn');
const numberSet = document.querySelectorAll('.number');
const operationSet = document.querySelectorAll('.operation');
const fractionSet = document.querySelectorAll('.fraction');

let activeVariable, activeOperation, variableOne, variableTwo, result;

const mathematics = {
  additionOperation: (a, b) => parseFloat(a + b),
  subtractionOperation: (a, b) => parseFloat(a - b),
  multiplicationOperation: (a, b) => parseFloat(a * b),
  divisionOperation: (a, b) => parseFloat(a / b),
  percentageOperation: (a, b) => parseFloat((b / 100) * a),
  operationalLogic: () => {
    switch (activeOperation) {
      case '+':
        result = mathematics.additionOperation(variableOne, variableTwo);
        break;
      case '-':
        result = mathematics.subtractionOperation(variableOne, variableTwo);
        break;
      case '*':
        result = mathematics.multiplicationOperation(variableOne, variableTwo);
        break;
      case '÷':
        result = mathematics.divisionOperation(variableOne, variableTwo);
        break;
      case '%':
        result = mathematics.percentageOperation(variableOne, variableTwo);
        break;
      default:
        result = 'Error';
    }
  },
};

const fractions = {
  sixteenthDecimal: 0.0625,
  eigthDecimal: 0.125,
  quarterDecimal: 0.25,
  halfDecimal: 0.5,
  sixteenthFraction: '1/16',
  eigthFraction: '1/8',
  quarterFraction: '1/4',
  halfFraction: '1/2',
};

const interactions = {
  allClear: () => {
    activeVariable = undefined;
    activeOperation = undefined;
    variableOne = undefined;
    variableTwo = undefined;
    result = undefined;
  },
  clear: () => {
    activeVariable = undefined;
  },
  createNumericVariable: item => {
    if (!activeVariable) {
      return (activeVariable = item);
    }
    activeVariable += item;
  },
  setNumericVariable: () => {
    activeOperation
      ? (variableTwo = +activeVariable)
      : (variableOne = +activeVariable);
  },
  setOperation: item => {
    if (!item.classList.contains('special')) {
      activeOperation = item.innerText;
      interactions.clearActiveToggle();
      item.classList.add('active');
    }
  },
  displayActiveVariableOnScreen: () => {
    if (activeOperation && variableOne) {
      calcScreen.innerHTML = variableTwo;
    } else if (activeOperation) {
      calcScreen.innerHTML = variableOne;
    } else {
      calcScreen.innerHTML = activeVariable;
    }
  },
  displayFractionKeyboard: () => {
    numberSet.forEach(button => {
      button.innerText = '';
    });
    const selectors = [fractions.sixteenthFraction, '1/8', '1/4', '1/2'];
    for (let i = 0; i < selectors.length; i++) {
      numberSet[i].innerText = selectors[i];
      numberSet[i].classList.add('fraction');
    }
  },
  displayStandardKeyboard: () => {
    const selectors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'];
    for (let i = 0; i < selectors.length; i++) {
      numberSet[i].innerText = selectors[i];
    }
  },
  clearActiveToggle: () => {
    const activeToggles = document.querySelectorAll('.active');
    activeToggles.forEach(item => {
      item.classList.remove('active');
    });
  },
  numericButtonControls: item => {
    if (item.classList.contains('number')) {
      interactions.setNumericVariable();
      interactions.displayActiveVariableOnScreen();
    }
  },
  specialButtonControls: item => {
    if (item.classList.contains('special')) {
      if (item.innerText === 'fr') {
        if (item.classList.contains('active')) {
          item.classList.remove('active');
          interactions.displayStandardKeyboard();
        } else {
          item.classList.add('active');
          interactions.displayFractionKeyboard();
          console.log(item.innerText);
        }
      }
      if (item.innerText === '=') {
        mathematics.operationalLogic();
        interactions.clearActiveToggle();
        calcScreen.innerHTML = result;
      }
      if (item.innerText === 'AC') {
        interactions.allClear();
        calcScreen.innerHTML = ``;
      }
      if (item.innerText === 'C') {
        interactions.clear();
        calcScreen.innerHTML = ``;
      }
    }
  },
  operationButtonControls: item => {
    if (item.classList.contains('operation')) {
      activeVariable = undefined;
    }
    if (item.classList.contains('operation') && variableOne) {
      if (result) {
        variableOne = result;
        variableTwo = undefined;
      }
      interactions.setOperation(item);
      interactions.clear();
    }
  },
};

// Button Controls
calcBtns.forEach(item => {
  item.addEventListener('click', e => {
    interactions.createNumericVariable(e.target.innerText);
    interactions.numericButtonControls(e.target);
    interactions.operationButtonControls(e.target);
    interactions.specialButtonControls(e.target);
  });
});

// Bugs
// Need to be able to fresh start after pressing equal
