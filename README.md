#react-validate-credit-card
This application validates credit cards. React, Javascript, react-bootstrap, SASS and webpack are used to create this project.

##Instructions

``yarn install`` 
``yarn run start``

Note: If Yarn commands doesn't work, try installing Yarn using ``npm install -g yarn``

Open your browser and navigate to <http://localhost:8080>

To run test cases, use ``yarn test``

##Application-features

1. A user can validate by entering a credit card number individually in a textbox
2. A user can validate all the credit cards(read from json object) at once by clicking a button
3. After validation, credit car number type and its validity is returned
4. Formulaes to calculate card type is picked from a json file and then evaluated as javascript code to achieve minimum maintenance costs while scaling
5. Test cases for the components built

Validation is performed based on below two business logics:
A) Determine if valid or invalid
1. Starting with the next to last digit and continuing with
every other digit going back to the beginning of the card,
double the digit
2. Sum all doubled and untouched digits in the number. For
digits greater than 9 you will need to split them and sum
the independently (i.e. "10", 1 + 0).
3. If that total is a multiple of 10, the number is valid.
For example, given the card number 4408 0412 3456 7893:
1 8 4 0 8 0 4 2 2 6 4 10 6 14 8 18 3
2 8+4+0+8+0+4+2+2+6+4+1+0+6+1+4+8+1+8+3 = 70
3 70 % 10 == 0
Thus that card is valid.

Let's try one more, 4417 1234 5678 9112:
1 8 4 2 7 2 2 6 4 10 6 14 8 18 1 2 2
2 8+4+2+7+2+2+6+4+1+0+6+1+4+8+1+8+1+2+2 = 69
3 69 % 10 != 0
This card is not valid.

B) Determine card type based on below conditions present in cardTypeFormula.js file:
1. Begins with
2. Length of the credit card number
