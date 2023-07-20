import moment from "moment/moment";


export default class PointModel {
  constructor(obj) {
    obj = obj || {}

    this.date = obj.date || moment().format('DD/MM/YYYY');
    this.type = obj.type;
    this.quantity = obj.quantity;
    this.totalValue = Number(obj.totalValue) || 0;
    this.installmentNumber = Number(obj.installmentNumber) || 0;
    this.firstInstallment = obj.firstInstallment;
    this.price = Number(obj.price) || 0;

  }

  costEffective() {
    if (!this.quantity || !this.totalValue) return 0;

    return Number(((this.totalValue / this.quantity)*1000).toFixed(2));;
  }
}