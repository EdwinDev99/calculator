const buttons = document.querySelectorAll('.btn');
const screen = document.querySelector('.screen');

let currentInput = ''; 
let firstOperand = ''; 
let operator = '';
let shouldResetScreen = false;

buttons.forEach(button => {
  button.addEventListener('click', appearOnScreen);
});

function appearOnScreen(event) {
  const value = event.target.textContent;

  if (value === 'c') {
    resetCalculator();
    return;
  }

  if (value === '=') {
    if (firstOperand && operator && currentInput) {
      screen.textContent = operate(parseFloat(firstOperand), operator, parseFloat(currentInput));
      firstOperand = screen.textContent;
      currentInput = '';
      operator = '';
      shouldResetScreen = true; 
    }
    return;
  }

  if (['+', '-', '*', '/'].includes(value)) {
    if (firstOperand && operator && currentInput) {
      firstOperand = operate(parseFloat(firstOperand), operator, parseFloat(currentInput));
      screen.textContent = firstOperand;
    } else {
      firstOperand = currentInput || firstOperand;
    }
    operator = value;
    currentInput = '';
    shouldResetScreen = true; 
    return;
  }

  
  if (shouldResetScreen) {
    screen.textContent = '';
    shouldResetScreen = false;
  }

 
  if (screen.textContent === '0') {
    screen.textContent = value;
  } else {
    screen.textContent += value;
  }

  currentInput = screen.textContent;
}

function operate(a, op, b) {
  switch (op) {
    case '*':
      return a * b;
    case '/':
      return b === 0 ? 'Error' : a / b; 
    case '+':
      return a + b;
    case '-':
      return a - b;
    default:
      return b;
  }
}

function resetCalculator() {
  currentInput = '';
  firstOperand = '';
  operator = '';
  screen.textContent = '0';
  shouldResetScreen = false;
}
