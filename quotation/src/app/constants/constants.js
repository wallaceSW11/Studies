const CURRENCIES = {
  BTC_USD: {
    value: 'BTC-USD',
    description: 'Bitcoin/Dollar',
    format: 'USD'
  },
  BTC_BRL: {
    value: 'BTC-BRL',
    description: 'Bitcoin/Real',
    format: 'BRL'
  },
  USD_BRL: {
    value: 'USD-BRL',
    description: 'Dollar/Real',
    format: 'BRL'
  },
  CAD_BRL: {
    value: 'CAD-BRL',
    description: 'Dolar CAD/Real',
    format: 'CAD-BRL'
  },
  CAD_USD: {
    value: 'CAD-USD',
    description: 'Dollar CAD/Dollar',
    format: 'CAD-USD'
  }
};

const CURRENCY_PAIR = Object.values(CURRENCIES);

export {
  CURRENCIES,
  CURRENCY_PAIR
}