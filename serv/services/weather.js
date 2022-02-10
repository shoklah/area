const request = require('request');

class WeatherService {
  constructor() {
    this._city = 'Toulouse';
    this._apiKey = 'e35793e46db7880d3521c31d8a77cbed';
    this._url = `http://api.openweathermap.org/data/2.5/weather?q=${this._city}&units=metric&appid=${this._apiKey}`;
    this._about = {
      name: "Weather",
      actions: [{
        name: "weather",
        description: "Current weather in Toulouse"
      }, {
        name: "temperature_under",
        description: "Current temperature in Toulouse is inferior or equal to a given value"
      }, {
        name: "temperature_over",
        description: "Current temperature in Toulouse is superior or equal to a given value"
      }]
    };
  }

  getAbout() {
    return (this._about);
  }


  weatherRequest(callback) {
    return request(this._url, function(err, _response, body) {
      if (err) {
        console.log('error:', error);
      } else {
        callback(JSON.parse(body));
      }
    });
  }
}

module.exports = WeatherService;
