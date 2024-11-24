document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display').querySelector('.orphaned-operator');
    const displayResult = document.getElementById('display').querySelector('.calculation');
    const buttons = document.querySelectorAll('button');
    const ansButton = document.getElementById('ans');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = button.getAttribute('data-value');
            handleButtonClick(value);
        });
    });

    function handleButtonClick(value) {
        if (value === 'clear') {
            display.textContent = '0';
            displayResult.textContent = '0';
        } else if (value === 'del') {
            display.textContent = display.textContent.slice(0, -1) || '0';
        } else if (value === 'ENTER') {
            calculate();
        } else {
            if (display.textContent === '0') {
                display.textContent = value;
            } else {
                display.textContent += value;
            }
        }
    }

    function calculate() {
        try {
            let result = eval(display.textContent.replace('x', '*').replace('÷', '/').replace(/√([0-9]+)/g, 'Math.sqrt($1)'));
            displayResult.textContent = result;
            displayResult.setAttribute('data-value', result);
            ansButton.setAttribute('data-value', result);
        } catch (e) {
            displayResult.textContent = 'Error';
        }
    }
});
