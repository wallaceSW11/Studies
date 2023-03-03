export default class Appointment{
  constructor(obj) {
    var data = obj || {};

    this.id = data.id;
    this.date = data.date || new Date();
    this.begin = data.begin;
    this.lunch = data.lunch;
    this.return = data.return;
    this.end = data.end;
  }

  formatDate(date) {
    return `${date.getYear()}-${date.getMonth()}-${date.getDay()}`
  }

  formatTimeDiff(date1, date2) {
    let timeOne = new Date(`${this.formatDate(this.date)} ${date1}`);
    let timeTwo = new Date(`${this.formatDate(this.date)} ${date2}`);

    return Array(3)
      .fill([3600, timeOne.getTime() - timeTwo.getTime()])
      .map((v, i, a) => {
        a[i+1] = [a[i][0]/60, ((v[1] / (v[0] * 1000)) % 1) * (v[0] * 1000)];
        return `0${Math.floor(v[1] / (v[0] * 1000))}`.slice(-2);
      }).join(':');
  }

  formatTimePlus(date1, date2) {
    let timeOne = new Date(`${this.formatDate(this.date)} ${date1}`);
    let timeTwo = new Date(`${this.formatDate(this.date)} ${date2}`);

    return Array(3)
      .fill([3600, timeOne.getTime() + timeTwo.getTime()])
      .map((v, i, a) => {
        a[i+1] = [a[i][0]/60, ((v[1] / (v[0] * 1000)) % 1) * (v[0] * 1000)];
        return `0${Math.floor(v[1] / (v[0] * 1000))}`.slice(-2);
      }).join(':');
  }


  morning() {
    if (!this.lunch || !this.begin) {
      return '__:__'
    }
    return this.formatTimeDiff(this.lunch, this.begin);
  }

  afternoon() {
    if (!this.end || !this.return) {
      return '__:__'
    }
    return this.formatTimeDiff(this.end, this.return);
  }

  balance() {
    if (this.morning() == '__:__' || this.afternoon() == '__:__') {
      return '__:__'
    }
    //return this.afternoon() + this.morning()
    // return this.formatTimePlus(this.afternoon(), this.morning());

    function timestrToSec(timestr) {
      var parts = timestr.split(":");
      return (parts[0] * 3600) +
             (parts[1] * 60) +
             (+parts[2]);
    }

    function pad(num) {
      if(num < 10) {
        return "0" + num;
      } else {
        return "" + num;
      }
    }

    function formatTime(seconds) {
      return [pad(Math.floor(seconds/3600)),
              pad(Math.floor(seconds/60)%60),
              pad(seconds%60),
              ].join(":");
    }

    return this.formatTimeDiff(
      formatTime(timestrToSec(this.morning()) + timestrToSec(this.afternoon())),
      '08:00');
  }


}



// id: 1,
//     date: '2023-02-16',
//     begin: '09:05',
//     lunch: '12:30',
//     return: '13:00',
//     end: '18:10',
//     extraHour: '00:35',
//     delay: '00:00',
//     totalBreaks: '00:00',
//     balance: '+ 00:35'