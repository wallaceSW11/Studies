export default class CurrencyPair {
  id: number;
  currencyPair: string;
  
  constructor(id: number, currencyPair: string, formatMoney: string) {
    this.id = id;
    this.currencyPair = currencyPair;
  }
}

