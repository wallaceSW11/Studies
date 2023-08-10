import moment from "moment/moment";
import { TRANSACTION_TYPE } from "@/constants/global-constants";
import { newGuid } from '@/utils/guid';

export default class PointModel {
  constructor(obj) {
    obj = obj || {}

    this.id = obj.id || newGuid();
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

  costPerThousand() {
    if (!this.quantity || !this.totalValue) return 0;

    if (this.type == TRANSACTION_TYPE.TRANSFER.value) return 0;

    let costPerThousand = Number(((this.totalValue / (this.quantity/1000).toFixed(2)).toFixed(2)));

    return isFinite(costPerThousand) ? costPerThousand : 0;
  }

  dateISO() {
    return this.date ? moment(this.date).format('DD/MM/YYYY') : '';
  }
}