class Calculator {
    constructor(outputElement) {
        this.currentVal = 0;
        this.otherVal = 0;
        this.outputElement = outputElement;
        this.currentOp = null;
        this.currentOpText = "";
    }
    setCurrentOp(f) {
        this.currentOp = f;
    }
    evaluate() {
        console.log(this.currentOp + " $ " + this.currentVal + " " + this.otherVal);
        this.currentVal = this.currentOp(this.currentVal, this.otherVal);
        this.otherVal = 0;
        this.outputElement.innerHTML = this.currentVal.toString();
    }
    clear() {
        this.currentVal = 0;
        this.otherVal = 0;
        this.currentOp = null;
        this.currentOpText = "";
        this.outputElement.innerHTML = "";
    }
}
class CalculatorButton {
    constructor(text, calc, behavior, element) {
        this.text = text;
        this.behavior = behavior;
        this.element = element;
        this.element.addEventListener("click", () => behavior(calc));
    }
}
class NumberButton extends CalculatorButton {
    constructor(text, calc, element) {
        super(text, calc, (calc) => {
            if (!calc.currentOp) {
                calc.currentVal = appendDigit(calc.currentVal, this.val);
                calc.outputElement.innerHTML += this.val;
            }
            else {
                calc.otherVal = appendDigit(calc.otherVal, this.val);
                calc.outputElement.innerHTML += this.val;
            }
            console.log(calc.currentVal);
        }, element);
        this.val = Number.parseInt(text);
    }
}
class OperatorButton extends CalculatorButton {
    constructor(text, calc, operation, element) {
        super(text, calc, (calc) => {
            if (!calc.currentOp) {
                calc.currentOp = operation;
                calc.outputElement.innerHTML += " " + this.text + " ";
            }
            else {
                calc.evaluate();
                calc.currentOp = operation;
                calc.outputElement.innerHTML += " " + this.text + " ";
            }
            calc.currentOpText = this.text;
            console.log(calc.currentOp);
        }, element);
        this.operation = operation;
    }
}
function appendDigit(val, digit) {
    return (val * 10) + digit;
}
function removeDigit(val) {
    return Math.floor(val / 10);
}
var toArray = (arr) => Array.prototype.slice.call(arr);
const calculator = new Calculator(document.getElementById("calc-output"));
console.log(calculator);
const numberButtons = toArray(document.getElementsByClassName("number-button"))
    .map((el) => {
    const text = el.innerHTML;
    const val = Number.parseInt(text);
    return new NumberButton(text, calculator, el);
});
function getOperator(text) {
    switch (text) {
        case "+":
            return (a, b) => a + b;
        case "-":
            return (a, b) => a - b;
        case "*":
            return (a, b) => a * b;
        case "/":
            return (a, b) => a / b;
        default:
            return (a, b) => a;
    }
}
const operatorButtons = toArray(document.getElementsByClassName("operator-button"))
    .map((el) => {
    const text = el.innerHTML;
    return new OperatorButton(text, calculator, getOperator(text), el);
});
const equalsButton = new CalculatorButton("=", calculator, () => calculator.evaluate(), document.getElementById("equals-button"));
const clearButton = new CalculatorButton("C", calculator, () => calculator.clear(), document.getElementById("clear-button"));
const backspaceButton = new CalculatorButton("<", calculator, () => {
    if (!calculator.currentOp)
        calculator.currentVal = removeDigit(calculator.currentVal);
    else
        calculator.otherVal = removeDigit(calculator.otherVal);
    var text = calculator.outputElement.innerHTML;
    calculator.outputElement.innerHTML = text.substring(0, text.length - 1);
}, document.getElementById("backspace-button"));
const plusOrMinusButton = new CalculatorButton("&plusmn;", calculator, () => {
    var text = calculator.outputElement.innerHTML;
    if (!calculator.currentOp) {
        calculator.currentVal = -calculator.currentVal;
        calculator.outputElement.innerHTML = "-" + calculator.currentVal;
    }
    else {
        calculator.otherVal = -calculator.otherVal;
        calculator.outputElement.innerHTML = calculator.currentVal
            + " " + calculator.currentOpText + " -" + calculator.otherVal;
    }
}, document.getElementById("plus-or-minus-button"));
