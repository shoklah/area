const request = require('request');

class DiscordService {
  constructor() {
    this._url = 'https://discordapp.com/api/webhooks/681141550998487041/Ajd6jmptmFCD3dc2CLm12OIgjwG1S4wdIiSedCMLd8QN-Vozv56Sc9LbnJi-d9eLnEes';
    this._about = {
      name: "Discord",
      reactions: [{
        name: "send_discord_message",
        description: "Send a message on a Discord channel"
      }]
    };
  }

  getAbout() {
    return (this._about);
  }

  sendDiscordMsg(msg, title) {
    request(
      {
        method: 'POST',
        uri: this._url,
        json: {
          content: '@everyone',
          embeds: [
            {
              title: title,
              description: msg,
              color: 16777215
            }
          ]
        }
      },
      function(error, _response, body) {
        if (error) {
          console.log('error:', error);
        }
      }
    );
  }
}

module.exports = DiscordService;
