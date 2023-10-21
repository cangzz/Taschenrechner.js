class Calculator {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.reset();
    }

    reset() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    appendNumber(number) {
        this.currentOperand += number;
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '−':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('Division durch Null ist nicht erlaubt!');
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        if (this.operation) {
            this.displayElement.value = `${this.previousOperand} ${this.operation} ${this.currentOperand}`;
        } else {
            this.displayElement.value = this.currentOperand;
        }
    }
}

const numberButtons = document.querySelectorAll('.buttons > button:not([data-operation])');
const operationButtons = document.querySelectorAll('.buttons > button[data-operation]:not([data-operation="="])');
const equalsButton = document.querySelector('.buttons > button[data-operation="="]');
const clearButton = document.querySelector('.buttons > button[data-operation="C"]');
const display = document.querySelector('#display');

const calculator = new Calculator(display);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.getAttribute("data-operation"));
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

clearButton.addEventListener('click', () => {
    calculator.reset();
});

console.log("Das Skript wird geladen und ausgeführt!");
