const bitcoinService = require('./services/bitcoin');
const cocktailService = require('./services/cocktail');
const recipeService = require('./services/recipeService');
const discordService = require('./services/sendDiscordMsg');
const slackService = require('./services/sendSlackMsg');
const sportsService = require('./services/sportsService');
const timeService = require('./services/time');
const weatherService = require('./services/weather');

const bitcoin = new bitcoinService();
const cocktail = new cocktailService();
const recipe = new recipeService();
const discord = new discordService();
const slack = new slackService();
const sports = new sportsService();
const time = new timeService();
const weather = new weatherService();

module.exports = function(app) {
    app.get('/about.json', (req, res) => {
        var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
        ip = ip.substring(0, 7) == "::ffff:" ? ip.substring(7) : ip;

        res.json({
            client: {
                host: ip
            },
            server: {
                current_time: Math.round((new Date()).getTime() / 1000),
                services: [
                    bitcoin.getAbout(),
                    cocktail.getAbout(),
                    recipe.getAbout(),
                    discord.getAbout(),
                    slack.getAbout(),
                    sports.getAbout(),
                    time.getAbout(),
                    weather.getAbout(),
                ]
            }
        });
    });
};