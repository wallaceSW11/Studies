export default class Appointment{
  constructor(obj) {
    var data = obj || {};

    this.begin = data.begin || '__:__';
    this.lunch = data.lunch;
    this.return = data.return;
    this.end = data.end;
  }
}