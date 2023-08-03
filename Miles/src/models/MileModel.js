import moment from "moment/moment";
import { newGuid } from '@/utils/guid';

export default class MileModel {
  constructor(obj) {
    obj = obj || {}

    this.id = obj.id || newGuid();
    this.pointId = obj.pointId;
    this.date = obj.date ? moment(obj.date).format('YYYY-MM-DD') : '';
    this.type = obj.type;
    this.quantity = Number(obj.quantity) || 0;
    this.airline = obj.airline;
    this.price = Number(obj.price) || 0;
  }

  dateISO() {
    return this.date ? moment(this.date).format('DD/MM/YYYY') : '';
  }

  costPerMile() {
    if (!this.quantity || !this.price) return 0;

    return Number(((this.price / this.quantity)*1000).toFixed(2))
  }
}