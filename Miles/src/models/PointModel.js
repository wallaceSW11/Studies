import moment from "moment/moment";


export default class PointModel {
  constructor(obj) {
    obj = obj || {}

    this.id = obj.id;
    this.date = obj.date || moment().format('DD/MM/YYYY');
    this.type = obj.type;
    this.quantity = Number(obj.quantity) || 0;
    this.totalValue = Number(obj.totalValue) || 0;
    this.installmentNumber = Number(obj.installmentNumber) || 0;
    this.installmentValue = Number(obj.installmentValue) || 0;
    this.firstInstallment = obj.firstInstallment;
    this.program = obj.program;

  }

  costEffective() {
    if (!this.quantity || !this.totalValue) return 0;

    return Number(((this.totalValue / this.quantity)*1000).toFixed(2));;
  }
}