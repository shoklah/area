const request = require('request');

const aboutBitcoin = {
    name: "Bitcoin",
    actions: [{
      name: "value_under",
      description: "Bitcoin value is equal of inferior to given value"
    }, {
      name: "value_over",
      description: "Bitcoin value is equal or superior to given value"
    }]
  };

exports.aboutBitcoin = aboutBitcoin;
class BitcoinService {
  constructor(pool) {
    this._url = `https://blockchain.info/ticker`;
    this._pool = pool;
    this._btcUnderTrigger = [];
    this._btcOverTrigger = [];
    this._about = {
        name: "Bitcoin",
        actions: [{
          name: "bitcoin_value_under",
          description: "Bitcoin value is equal of inferior to given value"
        }, {
          name: "bitcoin_value_over",
          description: "Bitcoin value is equal or superior to given value"
        }]
      };
  }

  getAbout() {
    return (this._about);
  }


  bitcoinRequest(callback) {
    return request(this._url, function(err, _response, body) {
      if (err) {
        console.log('error: ', error);
      } else {
        callback(JSON.parse(body));
      }
    })
  };
}

module.exports = BitcoinService;