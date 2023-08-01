import moment from "moment/moment";

export default class MileModel {
  constructor(obj) {
    obj = obj || {}

    this.id = obj.id;
    this.date = obj.date ? moment(obj.date).format('YYYY-MM-DD') : '';
    this.quantity = Number(obj.quantity) || 0;
    this.program = obj.program;
    this.averageCost = Number(obj.averageCost) || 0;
    this.bonusPercent = Number(obj.bonusPercent) || 0;

  }

  costPerThousand() {
    if (!this.quantity || !this.averageCost) return 0;

    return 0
  }

  dateISO() {
    return this.date ? moment(this.date).format('DD/MM/YYYY') : '';
  }
}