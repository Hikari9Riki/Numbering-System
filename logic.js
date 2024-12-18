function showTab(tabId) {
    document.getElementById('calculation').style.display = 'none';
    document.getElementById('convert').style.display = 'none';
    document.getElementById(tabId).style.display = 'block';
}


function operation() {
  let num1 = document.getElementById('num1').value;
  let num2 = document.getElementById('num2').value;
  let num1Base = document.getElementById('baseNum1').value;
  let num2Base = document.getElementById('baseNum2').value;
  const what2Do = document.getElementById('operation').value;
  const toBase = document.getElementById('outputBase').value;
  console.log("NUM1 = " + num1 + "\nNum1Base = " + num1Base + "\n\nNUM2 = " + num2 + "\nNum2Base = " + num2Base );
  num1 = anyBase2Decimal(num1, num1Base);
  console.log("Change num1 to decimal from " + num1Base + "to decimal: " + num1);
  num2 = anyBase2Decimal(num2,num2Base);
  console.log(console.log("Change num2 to decimal from " + num2Base + "to decimal: " + num2))

  if (isNaN(num1) || isNaN(num2)) {
      alert('Please enter valid numbers');
      return;
  }

  let result = 0;
  
  switch (what2Do) {
      case 'add':
          result = num1 + num2;
          break;
      case 'subtract':
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

  console.log(result);
  
  console.log(Decimal2AnyBase(result,toBase));
  document.getElementById('calcResult').innerText = Decimal2AnyBase(result,toBase);

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
      for (let x = 0; x < integerPart.length || x < 10; x++) {                              // using total += (N * B^x)........ 
          
          DecInt += parseInt(intreverse[x], fromBase) * Math.pow(fromBase, x);    //the number multiply witth the the base^position.
          console.log(parseInt(intreverse[x], fromBase) + "x" + Math.pow(fromBase, x) + "result : " + DecInt) ;
          //parseInt to change the string to number type according to base form. if it find the string is A so it will be 10.
      }       

  console.log("for integer we use total += Nx * B^-(x+1) ");
  console.log("Which is N is the number for each integer from right (x) (0->end) and B is base power by -(x+1) ");
      // Convert fractional part
      for (let y = 0; y < fractionalPart.length || y < 10; y++) {                       // using total += (N(x) * B^x)........
          
          const fractionalDigit = parseInt(fractionalPart[y], fromBase);      // create new varible t make sure next line no gonna be long
          Decfrac += fractionalDigit * Math.pow(fromBase, -(y + 1));          // why -( y+1 )? to get power negative and y for array in fractianalDigit and + 1 because power start from -1
          console.log(parseInt(fractionalDigit, fromBase) + "x" + Math.pow(fromBase, -(y+a)) + "result : " + Decfrac) ;
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
  
  function showTab(tabId) {
      document.getElementById('calculation').style.display = 'none';
      document.getElementById('convert').style.display = 'none';
      document.getElementById(tabId).style.display = 'block';
  }
  
  function toggleTheme() {
      document.body.classList.toggle('dark-mode');
  }
  