import CardTypeFormula from './cardTypeFormula'
import Constants from './constants'

export default {
  // Determines the card type of credit card number by evaluating javascript code from a file
  determineCardType(creditCardNumber) {
    const length = creditCardNumber.length
    let cardType = Constants.UNKOWN
    for (let formula of CardTypeFormula) {
      const possibleLengths = eval(formula.length)
      if (possibleLengths.indexOf(length) !== -1) {
        const number = eval(formula.number)
        const beginsWithMatches = eval(formula.beginsWith)
        if (beginsWithMatches) {
          cardType = eval(formula.cardType)
          break
        }
      }
    }
    return cardType
  },

  // Determines if card number is numeric or not
  isCardNumeric(creditCardNumber) {
    return creditCardNumber && creditCardNumber.trim().match(/^[0-9]+$/) != null ? true : false
  },

  // Evaluates the char passed to it and decides whether it should be doubled or not based on business logic
  evaluateChar(currentChar, indexesToDouble, currentIndex) {
    const sumToReturn = ((indexesToDouble === Constants.EVEN && currentIndex % 2 == 0)
    ||
    (indexesToDouble === Constants.ODD && currentIndex % 2 != 0))
      ?
      this.doubleTheDigit(currentChar)
      :
      currentChar
    return sumToReturn
  },

  // Mutiplies the digit by two and returns the sum of those two integers
  doubleTheDigit(digit) {
    const currentDigit = parseInt(digit)
    let sumOfDoubleDigit = 0
    if (currentDigit != 0) {
      const doubled = currentDigit * 2
      if (doubled > 9)
        sumOfDoubleDigit = doubled.toString().split('').reduce(function (a, b) {
          return a + parseInt(b)
        }, 0)
      else sumOfDoubleDigit = doubled
    }
    return sumOfDoubleDigit
  },

  // Validates whether credit card is valid or not by evaluating javascript code from a file
  validateCreditCard(creditCardNumber) {
    const length = creditCardNumber.length
    const indexesToDouble = length % 2 == 0 ? Constants.EVEN : Constants.ODD
    let sumOfDigits = 0
    for (let i = length - 1; i >= 0; i--) {
      const currentChar = creditCardNumber.charAt(i)
      sumOfDigits += parseInt(this.evaluateChar(currentChar, indexesToDouble, i))
    }
    const cardNumberValidity = sumOfDigits % 10 == 0 ? Constants.VALID : Constants.INVALID
    return cardNumberValidity
  }
}
