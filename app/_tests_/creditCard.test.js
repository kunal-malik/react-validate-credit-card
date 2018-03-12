import React from 'react'
import ReactDOM from 'react-dom'
import CreditCard from '../components/creditCard'
import { shallow, mount } from 'enzyme'

describe('CreditCard component ', () => {
  let handleBranchChanges = jest.fn()
  it('renders without crashing', () => {
    shallow(<CreditCard/>)
  })

  it('should display capability to validate single or multiple credit cards', () => {
    const wrapper = mount(<CreditCard/>)
    const inputText = wrapper.find('[id="formBasicText"]')
    expect(inputText.exists()).toBe(true)
    const button = wrapper.find('[id="validate-all-credit-cards"]')
    expect(button.exists()).toBe(true)
  })

  it('should populate resultOfAllCards on click of Validate all credit cards from input file button', () => {
    spyOn(CreditCard.prototype, 'validateAllCards').and.callThrough()
    const wrapper = mount(<CreditCard/>)
    const button = wrapper.find('[id="validate-all-credit-cards"]')
    expect(button.exists()).toBe(true)
    button.simulate('click')
    expect(CreditCard.prototype.validateAllCards).toHaveBeenCalled()
    expect(wrapper.state().resultOfAllCards.length).not.toBe(0)
  })

  it('should updated card number once credit card number is entered in input text', () => {
    spyOn(CreditCard.prototype, 'handleChange').and.callThrough()
    const wrapper = mount(<CreditCard/>)
    const inputText = wrapper.find('[id="formBasicText"]')
    expect(inputText.exists()).toBe(true)
    const button = wrapper.find('[id="validate-credit-card"]')
    expect(button.exists()).not.toBe(true)
    inputText.simulate('change', {
      target: {
        value: '123'
      }
    })
    expect(CreditCard.prototype.handleChange).toHaveBeenCalled()
    expect(wrapper.state().creditCardNumber).toBe('123')
  })

  it('should not display button when error exists in input text', () => {
    const wrapper = mount(<CreditCard/>)
    const inputText = wrapper.find('[id="formBasicText"]')
    expect(inputText.exists()).toBe(true)

    inputText.simulate('change', {
      target: {
        value: 'abc'
      }
    })
    const button = wrapper.find('[id="validate-credit-card"]')
    expect(button.exists()).toBe(false)
  })
})
