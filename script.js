'use strict';

const prevEl = document.querySelector('.display__prev');
const currEl = document.querySelector('.display__current');
const buttons = document.getElementById('buttons');

let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldReset = false;

function updateDisplay() {
  currEl.textContent = currentInput;
  // Scale down font if number is long
  currEl.style.fontSize = currentInput.length > 9 ? '28px' : currentInput.length > 6 ? '36px' : '';
  prevEl.textContent = operator ? `${previousInput} ${operatorSymbol(operator)}` : '';
}

function operatorSymbol(op) {
  return { '+': '+', '-': '−', '*': '×', '/': '÷' }[op] ?? op;
}

function calculate(a, b, op) {
  const x = parseFloat(a);
  const y = parseFloat(b);
  switch (op) {
    case '+': return x + y;
    case '-': return x - y;
    case '*': return x * y;
    case '/': return y === 0 ? 'Error' : x / y;
    default: return b;
  }
}

function formatResult(value) {
  if (value === 'Error') return 'Error';
  // Avoid floating point noise: round to 10 significant digits
  const rounded = parseFloat(value.toPrecision(10));
  return String(rounded);
}

function handleDigit(digit) {
  if (shouldReset) {
    currentInput = digit;
    shouldReset = false;
  } else {
    currentInput = currentInput === '0' ? digit : currentInput + digit;
  }
}

function handleDecimal() {
  if (shouldReset) {
    currentInput = '0.';
    shouldReset = false;
    return;
  }
  if (!currentInput.includes('.')) currentInput += '.';
}

function handleOperator(op) {
  if (operator && !shouldReset) {
    const result = calculate(previousInput, currentInput, operator);
    currentInput = formatResult(result);
  }
  previousInput = currentInput;
  operator = op;
  shouldReset = true;
  // Highlight active operator button
  document.querySelectorAll('.btn--accent').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.value === op);
  });
}

function handleEquals() {
  if (!operator) return;
  const result = calculate(previousInput, currentInput, operator);
  prevEl.textContent = `${previousInput} ${operatorSymbol(operator)} ${currentInput} =`;
  currentInput = formatResult(result);
  operator = null;
  previousInput = '';
  shouldReset = true;
  document.querySelectorAll('.btn--accent').forEach(btn => btn.classList.remove('active'));
}

function handleClear() {
  currentInput = '0';
  previousInput = '';
  operator = null;
  shouldReset = false;
  document.querySelectorAll('.btn--accent').forEach(btn => btn.classList.remove('active'));
}

function handleSign() {
  if (currentInput === '0' || currentInput === 'Error') return;
  currentInput = currentInput.startsWith('-')
    ? currentInput.slice(1)
    : '-' + currentInput;
}

function handlePercent() {
  if (currentInput === 'Error') return;
  currentInput = formatResult(parseFloat(currentInput) / 100);
}

// Single event listener via delegation
buttons.addEventListener('click', e => {
  const btn = e.target.closest('.btn');
  if (!btn) return;

  const { action, value } = btn.dataset;

  switch (action) {
    case 'digit':    handleDigit(value); break;
    case 'decimal':  handleDecimal(); break;
    case 'operator': handleOperator(value); break;
    case 'equals':   handleEquals(); break;
    case 'clear':    handleClear(); break;
    case 'sign':     handleSign(); break;
    case 'percent':  handlePercent(); break;
  }

  updateDisplay();
});

// Keyboard support
document.addEventListener('keydown', e => {
  if (e.key >= '0' && e.key <= '9') handleDigit(e.key);
  else if (e.key === '.') handleDecimal();
  else if (['+', '-', '*', '/'].includes(e.key)) handleOperator(e.key);
  else if (e.key === 'Enter' || e.key === '=') handleEquals();
  else if (e.key === 'Escape' || e.key === 'c') handleClear();
  else if (e.key === '%') handlePercent();
  else return;
  updateDisplay();
});

updateDisplay();
