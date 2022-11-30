let currentNumber = 0;

let display = document.querySelector('#screen');
let container = document.querySelector('.calculator-grid');
const numValues = document.querySelectorAll('.number');
const opValues = document.querySelectorAll('.operation');
let equals = document.querySelector('.equals');
let savedOperator = '';
let firstNumber = 0;
let waitingForSecondOperand = false;
let reset = false;
let equalled = false;


function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator) {
    if(currentNumber == "")
    return;

    if (firstNumber !== "" && operator !== null) {
    
    let num1 = parseFloat(firstNumber);
    let num2 = parseFloat(currentNumber);

  switch (operator) {
    case '+':
        return add(num1, num2);
    case '-':
        return subtract(num1, num2);
    case '*':
        return multiply(num1, num2);
    case '/':
        if(num2 === 0) {
            return "Cannot divide by zero";
        }
        return divide(num1, num2);
 
    }
    }
}


numValues.forEach(number => {
    number.addEventListener('click', function(event) {
        if(reset) {
            display.value = '';
            reset = false;
        }
        display.value = display.value + event.currentTarget.value;
        currentNumber = display.value;
    });
});

opValues.forEach(operation => {
    operation.addEventListener('click', function() {
        //if second operand true, assign savedOperator the new operator
        //assign the previous result to the first number
        //compute the current number with the first number

        if(savedOperator !== operation.value && waitingForSecondOperand && reset) {
            savedOperator = operation.value;
            return;
        }

        if(!savedOperator) {
          firstNumber = display.value;
        } else if (savedOperator) {
            display.value = operate(savedOperator);
            firstNumber = display.value;
        }
        waitingForSecondOperand = true;
        savedOperator = operation.value;
        currentNumber = '', reset = true;
    });
});

equals.addEventListener('click', function() {
    display.value = operate(savedOperator);
    savedOperator = '';
    waitingForSecondOperand = false;
    reset = true;
});

