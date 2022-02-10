const EventEmitter = require('events').EventEmitter;
const WeatherService = require('./services/weather');
const SendMsgSlack = require('./services/sendSlackMsg');
const SendDiscordMsg = require('./services/sendDiscordMsg');
const TimeService = require('./services/time');
const Cocktail = require('./services/cocktail');
const Sport = require('./services/sportsService');
const Recipe = require('./services/recipeService');
const Bitcoin = require('./services/bitcoin');

let weatherService = new WeatherService();
let sendMsgSlack = new SendMsgSlack();
let sendDiscordMsg = new SendDiscordMsg();
let timeService = new TimeService();
let cocktail = new Cocktail();
let sport = new Sport();
let recipe = new Recipe();
let bitcoin = new Bitcoin();

class Triggers extends EventEmitter {
  constructor() {
    super();
    this._triggers = new Map();
  }
  setTriggers() {
    this.on('weather', function(data) {
      weatherService.weatherRequest(function(json) {
        if (json.cod == 429) {
          sendMsgSlack.sendSlackMsg(json.message);
        } else {
          if (data.value == json.weather[0].main) {
            sendMsgSlack.sendSlackMsg(
              `${data.reaction_arg}: ${data.value} at Toulouse`
            );
          }
        }
      });
    });
    this.on('underToTemp', function(data) {
      weatherService.weatherRequest(function(json) {
        if (data.value < json.main.temp) {
          sendMsgSlack.sendSlackMsg(
            `${data.reaction_arg}: ${data.value}° at Toulouse`
          );
        }
      });
    });
    this.on('aboveToTemp', function(data) {
      weatherService.weatherRequest(function(json) {
        if (data.value > json.main.temp) {
          sendMsgSlack.sendSlackMsg(
            `${data.reaction_arg}: ${data.value}° at Toulouse`
          );
        }
      });
    });
    this.on('limitBitcoin', function(data) {
      bitcoin.bitcoinRequest(function(json) {
        if (json.EUR.last <= data.value) {
          sendMsgSlack.sendSlackMsg(`${data.reaction_arg}: ${data.value} EUR`);
        }
      });
    });
    this.on('maxBitcoin', function(data) {
      bitcoin.bitcoinRequest(function(json) {
        if (json.EUR.last >= data.value) {
          sendMsgSlack.sendSlackMsg(`${data.reaction_arg}: ${data.value} EUR`);
        }
      });
    });
    this.on('cocktail', function(data) {
      timeService.clockRequest(function(json) {
        const hour = json.formatted.split(' ')[1].split(':');
        const hourValue = data.value.split(':');
        if (hour[0] == hourValue[0] && hour[1] == hourValue[1]) {
          cocktail.CocktailRequest(function(cocktail) {
            sendMsgSlack.sendSlackMsg(cocktail);
          });
        }
      });
    });
    this.on('clock', function(data) {
      timeService.clockRequest(function(json) {
        const hour = json.formatted.split(' ')[1].split(':');
        const hourValue = data.value.split(':');
        if (hour[0] == hourValue[0] && hour[1] == hourValue[1]) {
          sendMsgSlack.sendSlackMsg(data.reaction_arg);
        }
      });
    });
    this.on('recipe', function(data) {
      timeService.clockRequest(function(json) {
        const hour = json.formatted.split(' ')[1].split(':');
        const hourValue = data.value.split(':');
        if (hour[0] == hourValue[0] && hour[1] == hourValue[1]) {
          recipe.RecipeRequest(function(recipe) {
            sendMsgSlack.sendSlackMsg(recipe);
          });
        }
      });
    });
    this.on('sport', function(data) {
      timeService.clockRequest(function(json) {
        const hour = json.formatted.split(' ')[1].split(':');
        const hourValue = data.value.split(':');
        if (hour[0] == hourValue[0] && hour[1] == hourValue[1]) {
          sport.SportsRequest(function(events) {
            sendMsgSlack.sendSlackMsg(events);
          });
        }
      });
    });
    this.on('SendSlackMsg', function(data) {
      timeService.clockRequest(function(json) {
        const hour = json.formatted.split(' ')[1].split(':');
        const hourValue = data.value.split(':');
        if (hour[0] == hourValue[0] && hour[1] == hourValue[1]) {
          sendMsgSlack.sendSlackMsg(data.reaction_arg);
        }
      });
    });
    this.on('SendDiscordMsg', function(data) {
      timeService.clockRequest(function(json) {
        const hour = json.formatted.split(' ')[1].split(':');
        const hourValue = data.value.split(':');
        if (hour[0] == hourValue[0] && hour[1] == hourValue[1]) {
          sendDiscordMsg.sendDiscordMsg(data.reaction_arg);
        }
      });
    });
  }

  emitOnTriggers(triggersMap) {
    let tab = this._triggers.keys();
    for (const elem of tab) {
      if (triggersMap.get(elem) == undefined) {
        this._triggers.delete(elem);
      }
    }
    triggersMap.forEach(element => {
      if (this._triggers.get(element.id) == undefined) {
        this._triggers.set(element.id, true);
      }
    });
    triggersMap.forEach(element => {
      if (this._triggers.get(element.id) == true) {
        this.emit(element.type, element);
        this._triggers.set(element.id, false);
      }
    });
  }

  resetTriggers() {
    setInterval(() => {
      let tab = this._triggers.keys();
      for (const elem of tab) {
        this._triggers.set(elem, true);
      }
    }, 900 * 1000);
  }
}

module.exports = Triggers;
