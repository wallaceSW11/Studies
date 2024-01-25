import moment from "moment";
import { newGuid } from '@/utils/guid';

export default class Task{
  constructor(obj){
    obj = obj || {};

    // console.log('a', obj, obj.title);

    this.id = obj.id || newGuid();
    this.createdAt = obj.createdAt || moment().format('YYYY-MM-DD');
    this.title = obj.title;
    this.description = obj.description;
    this.priority = !!(obj.priority);
    this.done = !!(obj.done);
    this.doneAt = obj.doneAt;
  }

  _dateNow() {
    return moment().format('YYYY-MM-DD');
  }

  updateDone() {
    if (this.done) {
      this.done = false;
      this.doneAt = undefined;
      return;
    }
  
    this.done = true;
    this.doneAt = this._dateNow();
  }

  valid() {
    return !!(this.title);
  }
}