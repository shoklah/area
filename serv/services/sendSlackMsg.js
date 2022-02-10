const request = require('request');

class SlackService {
  constructor() {
    this._url = 'https://hooks.slack.com/services/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';
    this._about = {
      name: "Slack",
      reactions: [{
        name: "send_slack_message",
        description: "Send a message on a Slack channel : https://join.slack.com/t/area-wpe2995/shared_invite/enQtOTUzMzAxNTcwNTMxLTQxNDJkMWNkZjZiOGNkMDY2YmI0OTE2OTQ0NWZlYjYxNmVhNWNiZTkzODMyZjExYTVmZWVjYjQzOGY2NDY3MmE"
      }]
    };
  }

  getAbout() {
    return (this._about);
  }

  sendSlackMsg(msg) {
    request(
      {
        method: 'POST',
        uri: this._url,
        headers: 'Content-type: application/json',
        body: `{"text": '${msg}'}`
      },
      function(error, _response, body) {
        if (error) {
          console.log('error:', error);
        } else {
        }
      }
    );
  }
}

module.exports = SlackService;
