const keys = document.querySelector('.keyboard');
const display = document.querySelector('.screen');
let firstNumber = null;
let operateur = null;
let waitingForNextNumber = false;

const calculate = {
    '/': (firstNumber, secondNum) => firstNumber / secondNum,
  
    '*': (firstNumber, secondNum) => firstNumber * secondNum,
  
    '+': (firstNumber, secondNum) => firstNumber + secondNum,
  
    '-': (firstNumber, secondNum) => firstNumber - secondNum,
  
    '=': (firstNumber, secondNum) => secondNum
  };

keys.addEventListener('click', e => {
    if (!e.target.matches('button')) {
        return;
    }

    function enterNum(num){
        if (waitingForNextNumber === true) {
            display.value = num;
            waitingForNextNumber = false;
        } else {
            display.value === '0' ? display.value = num : display.value += num;
        }
    }

    function enterDecimal(dot) {
        if (waitingForNextNumber === true) return;

        if (!display.value.includes('.')) {
            display.value = display.value + dot;
        }
    }

    function enterOperator(nextOperator) {
       
        const inputVal = parseFloat(display.value);

        if (firstNumber === null && waitingForNextNumber) {
            display.value += '-';
        }

        if (operateur && waitingForNextNumber) {
            operateur = nextOperator
            return
        }

        if (firstNumber === null) {
            firstNumber = inputVal;
        } else if (operateur) {
            const newVal = firstNumber || 0;
            let result = calculate[operateur](newVal, inputVal);

            display.value = String(result);
            firstNumber = result;
        }

        waitingForNextNumber = true;
        operateur = nextOperator;
    }

    function clearData() {
        firstNumber = null;
        display.value = '0';
        operateur = null;
        waitingForNextNumber = false;
    }

    function percentageNum() {
        const percent = display.value / 100;
        display.value = percent;
    }


    if (e.target.classList.contains('number')) {
        const currentNum = e.target.value;
        enterNum(e.target.value);
        
    }

    if (e.target.classList.contains('operator')) {
        enterOperator(e.target.value);
    
    }

    if (e.target.classList.contains('decimal')) {
        const dec = '.';
        enterDecimal(dec);        
    }

    if (e.target.classList.contains('clear')) {
        clearData();
    }

    if (e.target.classList.contains('percent')) {
        percentageNum();
    }
})
