export default [
    {
        'length': '"15"',
        'cardType': '"AMEX"',
        'number': 'creditCardNumber.substring(0,2)',
        'beginsWith': 'number === "34" || number === "37"'
    },
    {
        'length': '"16"',
        'cardType': '"Discover"',
        'number': 'creditCardNumber.substring(0,4)',
        'beginsWith': 'number === "6011"'
    },
    {
       'length': '"16"',
       'cardType': '"MasterCard"',
       'number': 'creditCardNumber.substring(0,2)',
       'beginsWith': 'number === "51" || number === "52" || number === "53" || number === "54" || number === "55"' 
    },
    {
        'length': '"13,16"',
        'cardType': '"Visa"',
        'number': 'creditCardNumber.charAt(0)',
        'beginsWith': 'number === "4"'
    }
]