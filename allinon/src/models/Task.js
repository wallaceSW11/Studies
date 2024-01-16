import moment from "moment";

export default class Task{
  constructor(obj){
    obj = obj || {};

    this.createdAt = obj.createdAt || moment().format('YYYY-MM-DD');
    this.title = obj.title;
    this.description = obj.description;
    this.priority = !!(obj.priority);
    this.done = !!(obj.done);
    this.doneAt = obj.doneAt;
  }
}