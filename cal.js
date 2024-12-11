let currentOperand = '';
        let previousOperand = '';
        let operation = null;
        let currentinput = 'num1';
        let currentoperation = '+';
        let input1 = '';
        let input2 = '';

        function focusInput(input){
            document.getElementById('n1').classList.remove('numselected');
            document.getElementById('n2').classList.remove('numselected');
            document.getElementById(input).classList.add('numselected');
            if (input == 'n1'){
                currentinput = 'num1';
            } 
            if(input == 'n2'){
                currentinput = 'num2';
            }
            console.log(currentinput);

        }

        function calculation() {
            
            if (!validateInput()) return;
            
            let numBase = document.getElementById('base').value;
            console.log(input1);
            console.log(input2);
            console.log(numBase);
            let num1 = input1;
            let num2 = input2
            console.log(input1);
            console.log(input2);
            console.log(numBase);

            if (isNaN(num1) || isNaN(num2)) {
                alert('Please enter valid numbers');
                return;
            }
          
            let result = 0;
            
            switch (currentoperation) {
                case 'add':
                    result = num1 + num2;
                    break;
                case 'substract':
                    result = num1 - num2;
                    break;
                case 'multiply':
                    result = num1 * num2;
                    break;
                case 'divide':
                    if (num2 === 0) {
                        alert('Cannot divide by zero');
                        return;
                    }
                    result = num1 / num2;
                    break;
                default:
                    alert('Invalid operation');
                    return;
            }
            console.log("operations");
            console.log(result);
            
            console.log(Decimal2AnyBase(result,numBase));
            document.getElementById('calc-display').innerText = Decimal2AnyBase(result,numBase);
          
          }


       

        function converting() {
            const inputNum = document.getElementById('convertInput').value;
            const InputBase = document.getElementById('convertFrom').value;
            const convertToBase = document.getElementById('convertTo').value;
          
            const inputDecimal = anyBase2Decimal(inputNum,InputBase);
            const result = Decimal2AnyBase(inputDecimal,convertToBase);
          
            document.getElementById('convertResult').innerText = result;
          
          
        }

        function anyBase2Decimal(num, fromBase) {   

            let input = String(num);
          
            //check if the num is negative
            let minus = false;
                    
                    if (input[0] == "-") {
                        minus = true;
                        input = input.split('');
                        input[0] = "";
                        input = input.join('');
                    }
          
            // Split input into integer and fractional parts
            const parts = input.split(".");
            const integerPart = parts[0];               // ingeter part
            const fractionalPart = parts[1] || "0";     // fractional part
          
            const intreverse = integerPart.split('').reverse().join(''); // to make the integer position reverse
            let DecInt = 0;
            let Decfrac = 0;
            let result= '';
            console.log("Converting Process !" +
                        "                   V");
            console.log("for integer we use total += Nx * B^x ");
            console.log("Which is N is the number for each integer from right (x) (0->end) and B is the base power by x");
            try {
                // Convert integer part
                for (let x = 0; x < integerPart.length; x++) {                              // using total += (N * B^x)........ 
                    
                    DecInt += parseInt(intreverse[x], fromBase) * Math.pow(fromBase, x);    //the number multiply witth the the base^position.
                    console.log(parseInt(intreverse[x], fromBase) + "x" + Math.pow(fromBase, x) + "result : " + DecInt) ;
                    //parseInt to change the string to number type according to base form. if it find the string is A so it will be 10.
                }       
          
                
            console.log("for integer we use total += Nx * B^-(x+1) ");
            console.log("Which is N is the number for each integer from right (x) (0->end) and B is base power by -(x+1) ");
                // Convert fractional part
                console.log(fractionalPart);
                console.log(fractionalPart.length);
                
                for (let y = 0; y < fractionalPart.length; y++) {                       // using total += (N(x) * B^x)........
                    
                    const fractionalDigit = parseInt(fractionalPart[y], fromBase);      // create new varible t make sure next line no gonna be long
                    Decfrac += fractionalDigit * Math.pow(fromBase, -(y + 1));          // why -( y+1 )? to get power negative and y for array in fractianalDigit and + 1 because power start from -1
                }
            
          
            } catch (error) {
                document.getElementById('convertResult').innerText = "Error: " + error.message;
            }
          
            result = DecInt + Decfrac;
          
            if (minus == true){
                result = -(result);
            }
            console.log(result)
            return result;
            }
          
          function Decimal2AnyBase(num,ConvertTo) {
          
              let input = String(num);
              console.log(input)
          
              //check if the num is negative
              let minus = false;
                      
                      if (input[0] == "-") {
                          minus = true;               //set the number is minus
                          input = input.split('');    //split the number to array for each length
                          input[0] = "";              // replace '-' with ''
                          input = input.join('');     //merge the number array back
                      }
          
              // Split input into integer and fractional parts
              const parts = input.split(".");
              const integerPart = parts[0];               // ingeter part
              const fractionalPart = parts[1] || "0";     // fractional part
              let DecInt = parseInt(integerPart, 10);
              let Decfrac = "0." + String(parseInt(fractionalPart, 10));
              let result= '';
              console.log(fractionalPart)
              console.log(Decfrac)
          
              if (num != 0){
                  try {
          
                      while ( DecInt > 0 ) { // using DecIntAfter = DecInt - ( DecInt - ( DecInt % B ) 
                          const remainder = DecInt % ConvertTo;
                          result = ( remainder < 10 ? remainder : String.fromCharCode(remainder + 55) ) + result;
                          DecInt = Math.floor( DecInt / ConvertTo ); 
                          
                      }
              
                      
                      if (Decfrac >  0){
                          let limit = 0;
                          result = result + '.'
              
                          while ( Decfrac > 0 && limit < 10 ) { // using 
                          Decfrac = Decfrac * ConvertTo;
                          const remainder = Math.floor(Decfrac);
                          result = result + ( remainder < 10 ? remainder : String.fromCharCode(remainder + 55) ) ;
                          Decfrac = Decfrac - remainder;
                          }
                      }
              
                  } catch (error) {
              
                      document.getElementById('convertResult').innerText = "Error: " + error.message;
              
                  }
              
                  if (minus == true){
                      result = -(result) ;     //add the '-' back if negative number
                  }
          
              } else {
                  result = 0;
              }
              return result;
          
          }
          
          function validateInput() {
            let numBase = document.getElementById('base').value;
            input1 = anyBase2Decimal(input1, numBase);
            input2 = anyBase2Decimal(input2, numBase);
            const num1 = input1;
            const num2 = input2;
      
            if (isNaN(num1) || isNaN(num2)) {
                alert('Please enter valid numbers.');
                return false;
            }
            return true;
        }         


        function toggleSection(sectionId) {
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(sectionId).classList.add('active');
            clearDisplay();
        }

        // Calculator Logic
        function appendNumber(number) {
            if (currentinput == 'num1'){
                input1 += number;
                updateDisplay('num1', input1);
            }
            if (currentinput == 'num2'){
                input2 += number;
                updateDisplay('num2', input2);
            }
        }



        function setOperation(op) {
            document.getElementById('add').classList.remove('opselected');
            document.getElementById('substract').classList.remove('opselected');
            document.getElementById('multiply').classList.remove('opselected');
            document.getElementById('devide').classList.remove('opselected');
            document.getElementById(op).classList.add('opselected');
            currentoperation = op;
            console.log(currentoperation);
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
            document.getElementById('add').classList.add('opselected');
            document.getElementById('n1').classList.add('numselected');
            input1 = '';
            input2 = '';
            setOperation('add');
            focusInput('n1');
            console.log("pass2");
            updateDisplay('calc-display', '0');
            console.log("pass3");
            updateDisplay('num1', 'num1');
            console.log("pass4");
            updateDisplay('num2', 'num2');
            console.log("pass5");
            updateDisplay('conv-display', 'Enter Binary');
            console.log("pass6");
        }

        function updateDisplay(displayId, value) {
            document.getElementById(displayId).innerText = value;
        }