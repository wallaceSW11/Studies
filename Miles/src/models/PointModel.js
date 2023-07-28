import moment from "moment/moment";
import { TYPE_OF_TRANSACTION } from "@/constants/point-constants";

export default class PointModel {
  constructor(obj) {
    obj = obj || {}

    this.id = obj.id;
    this.date = obj.date ? moment(obj.date).format('YYYY-MM-DD') : '';
    this.type = obj.type;
    this.quantity = Number(obj.quantity) || 0;
    this.totalValue = Number(obj.totalValue) || 0;
    this.installmentNumber = Number(obj.installmentNumber) || 0;
    this.installmentValue = Number(obj.installmentValue) || 0;
    this.firstInstallment = obj.firstInstallment;
    this.program = obj.program;
    this.outCost = obj.outCost;

  }

  costEffective() {
    if (!this.quantity || !this.totalValue) return 0;

    if (this.type == TYPE_OF_TRANSACTION.TRANSFER.value) {
      return Number((((this.totalValue / this.quantity)*1000)*-1).toFixed(2))
    }

    if (this.type == TYPE_OF_TRANSACTION.OUT.value) {
      return this.outCost*-1
    }
    
    return Number(((this.totalValue / this.quantity)*1000).toFixed(2));
  }

  dateISO() {
    return this.date ? moment(this.date).format('DD/MM/YYYY') : '';
  }
}