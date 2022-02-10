const request = require('request');

class ClockService {
  constructor(city) {
    this._city = 'Europe/Paris';
    this._apiKey = 'OBI7EHB35UKQ';
    this._url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${this._apiKey}&format=json&by=zone&zone=${this._city}`;
    this._hourTrigger = [];
    this._about = {
      name: "Clock",
      actions: [{
        name: "hour",
        description: "Current time is a given value"
      }]
    };
  }

  getAbout() {
    return (this._about);
  }

  newHourTrigger(value, reaction, arg) {
    var newTrigger = [value, reaction, arg];
    this._hourTrigger.push(newTrigger);
  }

  clockRequest(callback) {
    request(this._url, function(err, _response, body) {
      if (err) {
        console.log('error:', error);
      } else {
        callback(JSON.parse(body));
      }
    });
  }
}

module.exports = ClockService;
