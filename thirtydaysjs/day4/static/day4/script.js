const calculator = document.querySelector('.calculator')
const currentOperand = calculator.querySelector('.current-operand')
const previousOperand = calculator.querySelector('.previous-operand')
const keys = document.querySelectorAll('button');
const numberKeys = document.querySelectorAll('[data-type="number"]')
const operatorKeys = document.querySelectorAll('[data-type="operator"]')
const clearKey = document.querySelector('[data-action="clear"]')
const equalKey = document.querySelector('[data-action="calculate"]')


keys.forEach(key => {
    events = ['click', 'keypress']
    events.forEach(event => {
        key.addEventListener(event, function(e){
                // button key style and animation response
                // also helps navigate calculator with keyboard
                e.preventDefault();
                e.target.blur();


                //keyboard navigation
                if (event === 'keypress') {
                    keyNav(e, key);
                    const regex = /[0-9|\=|\*|\+|\-|\x|\/]/;
                    keyStr = e.key.toString()
                    const found = keyStr.match(regex);
                    if (found != null) {
                       document.querySelector('[data-keyboard="'+ keyStr +'"]').focus();
                    }

                }


                let keyValue = key.textContent
                let currentValue = currentOperand.textContent
                let previousValue = previousOperand.textContent
                let { type } = key.dataset
                const { previousKeyType } = calculator.dataset
                switch (type) {
                    case 'number':
                         if (previousKeyType === 'number') {
                            currentOperand.textContent = currentValue + keyValue;
                         } else if (previousKeyType == 'operator') {
                            currentOperand.textContent = currentValue + ' ' + keyValue;
                         } else if ((currentValue === '0') || (previousKeyType == 'calculate')) {
                            currentOperand.textContent = keyValue;
                         }
                         break;
                    case 'operator':
                        if (currentValue != '0' && previousKeyType != 'operator') {
                             currentOperand.textContent = currentValue + ' ' + keyValue;
                        } else if (currentValue === '0') {
                            currentOperand.textContent = currentValue + ' ' + keyValue;
                        }
                        break;
                    case 'calculate':
                        if (currentValue) {
                            answer = calculate(currentValue);
                            previousOperand.textContent = currentValue;
                            currentOperand.textContent = answer;
                        } else {
                            previousOperand.textContent = '';
                            currentOperand.textContent = '0';
                        }
                        break;
                    case 'clear':
                        previousOperand.textContent = '';
                        currentOperand.textContent = '0';
                        break;

                }

                calculator.dataset.previousKeyType = type
        })
    })
})

function calculate(currentValue) {
  currentValue = currentValue.replaceAll(" ", "")
  let numbers = currentValue.split(/\+|\−|\×|\÷/g);
  let operators = currentValue.replace(/[0-9]|\./g, "").split("");

  // PEMDAS
 const pemdas = ['×','÷','+','−']

 pemdas.forEach( operator => {
      let operatorIndex = operators.indexOf(operator);
      // if -1 means the index was not found
      while (operatorIndex != -1) {
        // replaces 2 element at index of operator
        switch (operator) {
            case '×':
                numbers.splice(operatorIndex, 2, numbers[operatorIndex] * numbers[operatorIndex + 1]);
                break;
            case '÷':
                numbers.splice(operatorIndex, 2, numbers[operatorIndex] / numbers[operatorIndex + 1]);
                break;
            case '+':
                numbers.splice(operatorIndex, 2, parseFloat(numbers[operatorIndex]) + parseFloat(numbers[operatorIndex + 1]));
                break;
            case '−':
                numbers.splice(operatorIndex, 2, numbers[operatorIndex] - numbers[operatorIndex + 1]);
                break;
        }

        operators.splice(operatorIndex, 1);
        operatorIndex = operators.indexOf(operator);
      }
 })

  return numbers[0]
}

function keyNav(e, key) {

    if ((e.key === 'Enter') || (e.key === ' ')) {
        key.focus();
    } else if ((e.key === 'Tab') && (e.shiftKey)) {
        try {
            key.previousElementSibling.focus();
        } catch(err) {
            try {
                key.parentElement.nextElementSibling.lastElementChild.focus()
            } catch(err) {
                key.parentElement.previousElementSibling.lastElementChild.focus()
            }
        }
        return
    } else if (e.key === 'Tab') {
        try {
            key.nextElementSibling.focus();
        } catch(err) {
            try {
                key.parentElement.nextElementSibling.firstElementChild.focus()
            } catch(err) {
                key.parentElement.previousElementSibling.firstElementChild.focus()
            }
        }
        return
    } else {
        return
    }

}

//document.body.addEventListener('keydown', function(e){
//    if (document.querySelector('button[data-number="'+e.key+'"]')) {
//        button = document.querySelector('button[data-number="'+e.key+'"]').focus();
//        console.log(e.key);
//    } else if ( (e.key === '+') || (e.key === '-') || (e.key === '*') || (e.key === '/') || (e.key === '=')) {
//        e.preventDefault();
//        if (document.querySelector('button[data-action="'+e.key+'"]')) {
//            button = document.querySelector('button[data-action="'+e.key+'"]').focus();
//            console.log(e.key);
//        }
//    }
//})