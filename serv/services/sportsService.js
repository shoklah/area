const request = require('request');

class SportsService {
  constructor() {
    this._url =
      'https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4334';
    this._about = {
      name: "Sports",
      reactions: [{
        name: "get_l1_games",
        description: "Send a list of the next 15 L1 games on a Slack channel : https://join.slack.com/t/area-wpe2995/shared_invite/enQtOTUzMzAxNTcwNTMxLTQxNDJkMWNkZjZiOGNkMDY2YmI0OTE2OTQ0NWZlYjYxNmVhNWNiZTkzODMyZjExYTVmZWVjYjQzOGY2NDY3MmE"
      }]
    };
  }

  getAbout() {
    return (this._about);
  }


  SportsRequest(callback) {
    request(this._url, function(err, _response, body) {
      if (err) {
        console.log('error', err);
      } else {
        let events = '';
        const event = JSON.parse(body);
        for (var index = 0; index < 15; index++) {
          if (index + 1 == 15) {
            events += '' + (index + 1) + '. ' + event.events[index].strFilename;
          } else {
            events +=
              '' + (index + 1) + '. ' + event.events[index].strFilename + '\n';
          }
        }
        callback(events);
      }
    });
  }
}

module.exports = SportsService;
