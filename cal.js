let currentOperand = '';
        let previousOperand = '';
        let operation = null;

        function focus(input){


        }

        function toggleSection(sectionId) {
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(sectionId).classList.add('active');
        }

        // Calculator Logic
        function appendNumber(number) {
            currentOperand += number;
            updateDisplay('calc-display', currentOperand);
        }

        function setOperation(op) {
            if (currentOperand === '') return;
            if (previousOperand !== '') calculate();
            operation = op;
            previousOperand = currentOperand;
            currentOperand = '';
        }

        function calculate() {
            const base = parseInt(document.getElementById("base").value);
            let prev = parseInt(previousOperand, base);
            let current = parseInt(currentOperand, base);

            if (isNaN(prev) || isNaN(current)) {
                alert('Invalid number input!');
                return;
            }

            let result;
            switch (operation) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    result = Math.floor(prev / current);
                    break;
                default:
                    return;
            }

            currentOperand = result.toString(base).toUpperCase();
            operation = null;
            previousOperand = '';
            updateDisplay('calc-display', currentOperand);
        }

        function clearDisplay() {
            currentOperand = '';
            previousOperand = '';
            updateDisplay('calc-display', '0');
            updateDisplay('conv-display', 'Enter Binary');
        }

        function updateDisplay(displayId, value) {
            document.getElementById(displayId).innerText = value;
        }

        // Converter Logic
        function appendBinary(bit) {
            currentOperand += bit;
            updateDisplay('conv-display', currentOperand);
        }

        function convertBinary() {
            if (!/^[01]+$/.test(currentOperand)) {
                alert('Enter valid binary number.');
                return;
            }
            const decimal = parseInt(currentOperand, 2);
            updateDisplay('conv-display', `Dec: ${decimal}, Hex: ${decimal.toString(16).toUpperCase()}`);
        }