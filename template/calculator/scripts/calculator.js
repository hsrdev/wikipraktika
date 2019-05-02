/**
 * core
 */
"use strict";
class Calculator {
    number1;
    number2;
    operator;

    constructor() {
        this.clear();
    }
    clear() {
        this.number1 = null;
        this.number2 = null;
        this.operator = null;
    }
    clearDisplay(display) {
        display.innerHTML = '';
    }
    getNumber1() {
        return this.number1;
    }

    getNumber2() {
        return this.number2;
    }
    getOperator() {
        return this.operator;
    }

    setNumber1(number1) {
        this.number1 += number1;
    }

    setNumber2(number2) {
        this.number2 += number2;
    }

    setOperator(operator) {
        this.operator = operator;
    }

    hasOperator() {
        let ret = false;
        if (this.operator !== null) {
            ret = true;
        }
        return ret;
    }

    convertResult() {
        let res = this.calc(parseFloat(this.getNumber1()), parseFloat(this.getNumber2()), this.getOperator());
        this.clear();
        return res;
    }
    calc (number1, number2, operator) {
        let result = 0;
        switch (operator) {
            case '+':
                result = number1 + number2;
                break;
            case '-':
                result = number1 - number2;
                break;
            case '*':
                result = number1 * number2;
                break;
            case '/':
                if (number2 !== 0){
                    result = number1 / number2;
                    break;
                }
                result = false;
                break;
        }
        return result;
    }
}

/**
 * UI
 */
window.addEventListener('DOMContentLoaded', function() {
    const calculator = new Calculator();
    let input = document.getElementById('input');
    let output = document.getElementById('output');
    output.innerHTML = 'Welcome';

    function setNumber (e) {
        if (calculator.hasOperator()) {
            calculator.setNumber2(e.target.value);
            output.innerHTML = calculator.getNumber1() + ' ' + calculator.getOperator();
            input.innerHTML = calculator.getNumber2();
        } else {
            calculator.setNumber1(e.target.value);
            calculator.clearDisplay(output);
            input.innerHTML = calculator.getNumber1();

        }
    }


    let numbers = document.getElementsByClassName('number');
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener('click', e => setNumber(e))
    }

    let operators = document.getElementsByClassName('operator');
    for (let i = 0; i < operators.length; i++) {
        operators[i].addEventListener('click', e => {
            calculator.setOperator(e.target.value);
            output.innerHTML = calculator.getNumber1() + ' ' + calculator.getOperator();
        })
    }

    document.getElementById('key-c').addEventListener('click', () => {
        calculator.clear();
        calculator.clearDisplay(input);
        calculator.clearDisplay(output);
    });

    document.getElementById('key-=').addEventListener('click', () => {
       let result = calculator.convertResult();
       if (result === false) {
           input.innerHTML = 'invalid operation';
       } else {
           calculator.setNumber1(result);
           input.innerHTML = result;
       }
       calculator.clearDisplay(output);
    });
});


/**
 * Tests Scenarios
 */
const testCalc = new Calculator();
console.log(testCalc.calc(10, 7, '+'), "should be", 17);
console.log(testCalc.calc(20, 5, '-'), "should be", 15);
console.log(testCalc.calc(5, 6, '*'), "should be", 30);
console.log(testCalc.calc(10, 2, '/'), "should be", true); // true = hasError