import React, { Component } from 'react'
import { render } from 'react-dom'
import ButtonComponent from './button'
import { Jumbotron } from 'react-bootstrap'
import Card from './card'
import {form, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'
import Constants from '../constants'
import input from '../input'
import Utils from '../utils'

/** This is the main class for rendering all the components displayed on screen */
class CreditCard extends Component {

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.validateCard = this.validateCard.bind(this)
    this.validateAllCards = this.validateAllCards.bind(this)
    this.state = {
      creditCardNumber: '',
      cardNumberValidity: null,
      cardType: null,
      resultOfAllCards: null
    }
  }

  //Handles change events of input text for a single credit card number
  handleChange(value){
    this.setState({
      creditCardNumber: value,
      cardNumberValidity: null
    })
  }

  //Validation for a single credit card number
  validateCard(){
  let creditCardNumber = this.state.creditCardNumber.trim()
  const cardNumberValidity = Utils.validateCreditCard(creditCardNumber)
  const cardType = Utils.determineCardType(creditCardNumber)
  this.setState({
    cardNumberValidity: cardNumberValidity,
    cardType: cardType
  })
}

//Validates all credit card numbers in json object and displayed on screen
validateAllCards(){
  let resultOfAllCards=[]
  let cardType = Constants.UNKOWN
  let cardNumberValidity = Constants.INVALID
  for(let creditCardNumber of input){
    creditCardNumber = creditCardNumber.replace(/\s/g, '')
    if(Utils.isCardNumeric(creditCardNumber)){
      cardNumberValidity = Utils.validateCreditCard(creditCardNumber)
      cardType = Utils.determineCardType(creditCardNumber)
    }
    let result = cardType + ': ' + creditCardNumber + ' (' + cardNumberValidity + ')' 
    resultOfAllCards.push(result)
  }
  this.setState({
    resultOfAllCards
  })
}

  render () {
    const {creditCardNumber, cardNumberValidity, cardType, resultOfAllCards} = this.state
    let validationState = null
    let helpMessage = null
    const cardNumeric = Utils.isCardNumeric(creditCardNumber)
    if(creditCardNumber && !cardNumeric){
      helpMessage = Constants.ENTER_NUMBERIC
      validationState = Constants.ERROR
    }

    if(cardNumberValidity!=null && cardNumberValidity!=''){
      validationState = cardNumberValidity === Constants.INVALID ? Constants.ERROR : Constants.SUCCESS
      helpMessage = 'Card number is of type '+ cardType + ' and is ' + cardNumberValidity
    }

    return (
      <div className='credit-card-container'>
        <div className='row'>
          <div className='col-lg-12'>
            <Card heading='Credit Card Validator'>
            <ControlLabel>Choose to validate either one credit card or all credit cards at once</ControlLabel>
               <div className="row">  
                <form>
				        <FormGroup controlId="formBasicText" validationState={validationState}>
                <div className='col-lg-4'>
                <FormControl
                  type="text"
                  value={creditCardNumber}
                  placeholder={Constants.INPUT_TEXT_PLACEHOLDER}
                  onChange={(e) => this.handleChange(e.target.value)}
                />
                {
                  helpMessage ? 
                <HelpBlock>{helpMessage}</HelpBlock>
                : null
                }
                </div>
                <div className='col-lg-2'>
                  { cardNumeric ? 
                    <div className='pull-left'>
                <ButtonComponent
                  type='submit'
                  buttonLabel={Constants.VALIDATE}
                  id='validate-credit-card'
                  onClick={() => this.validateCard()} 
                  />
              </div> : null
                  }
                  </div>

                  <div className='col-lg-6'>
                   
                    <ButtonComponent
                  type='submit'
                  buttonLabel={Constants.VALIDATE_ALL}
                  id='validate-all-credit-cards'
                  onClick={() => this.validateAllCards()} 
                  />
                    { 
                      resultOfAllCards && resultOfAllCards.map((result,index) => {
                        return <div key={index}>{result}</div>
                      })
                    }
                      </div>

                    </FormGroup>
                    </form>
                    </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default CreditCard
