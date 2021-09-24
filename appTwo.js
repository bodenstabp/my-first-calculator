const calculator = document.querySelector('.calculator');
const calcScreen = document.querySelector('.screen');
const calcBtns = document.querySelectorAll('.calc-btn');
const numberSet = document.querySelectorAll('.number');
const operationSet = document.querySelectorAll('.operation');

let activeVariable, activeOperation, variableOne, variableTwo, result;

const mathematics = {
  additionOperation: (a, b) => parseFloat(a + b),
  subtractionOperation: (a, b) => parseFloat(a - b),
  multiplicationOperation: (a, b) => parseFloat(a * b),
  divisionOperation: (a, b) => parseFloat(a / b),
  percentageOperation: (a, b) => parseFloat((a / 100) * b),
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
    if (!activeOperation) {
      return (variableOne = +activeVariable);
    }
    variableTwo = +activeVariable;
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
      calcScreen.innerHTML = `${variableTwo}`;
    } else if (activeOperation) {
      calcScreen.innerHTML = `${variableOne}`;
    } else {
      calcScreen.innerHTML = `${activeVariable}`;
    }
  },
  clearActiveToggle: () => {
    const activeToggles = document.querySelectorAll('.active');
    activeToggles.forEach(item => {
      item.classList.remove('active');
    });
  },
};

// Button Controls
calcBtns.forEach(item => {
  item.addEventListener('click', e => {
    const text = e.target.innerText;
    interactions.createNumericVariable(text);
    if (e.target.classList.contains('special')) {
      if (text == '=') {
        mathematics.operationalLogic();
        calcScreen.innerHTML = `${result}`;
        interactions.clearActiveToggle();
      }
      if (text === 'AC') {
        interactions.allClear();
        console.log(variableOne);
        console.log(activeOperation);
        calcScreen.innerHTML = ``;
      }
      if (text === 'C') {
        interactions.clear();
        calcScreen.innerHTML = ``;
      }
    }
    if (e.target.classList.contains('number')) {
      interactions.setNumericVariable();
      interactions.displayActiveVariableOnScreen();
    }
    if (e.target.classList.contains('operation') && variableOne) {
      if (result) {
        variableOne = result;
        variableTwo = undefined;
      }
      interactions.setOperation(e.target);
      interactions.clear();
    }
  });
});
