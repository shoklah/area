const request = require('request');
var timeEmitter = require('../timeEmitter.js');

class CocktailService {
  constructor() {
    this._url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    this._drink = '';
    this._category = '';
    this._glass = '';
    this._ingredients = new Array();
    this._volumes = new Array();
    this._instructions = '';
    this._thumb = '';
    this._about = {
      name: "Cocktail",
      reactions: [{
        name: "get_cocktail",
        description: "Give a random cocktail recipe on a Slack channel : https://join.slack.com/t/area-wpe2995/shared_invite/enQtOTUzMzAxNTcwNTMxLTQxNDJkMWNkZjZiOGNkMDY2YmI0OTE2OTQ0NWZlYjYxNmVhNWNiZTkzODMyZjExYTVmZWVjYjQzOGY2NDY3MmE"
      }]
    };
  }

  getAbout() {
    return (this._about);
  }

  CocktailRequest(callback) {
    let cocktailService = this;
    request(this._url, function(err, _response, body) {
      if (err) {
        console.log('error:', err);
      } else {
        const cocktail = JSON.parse(body);
        cocktailService._drink = cocktail.drinks[0].strDrink;
        cocktailService._category = cocktail.drinks[0].strCategory;
        cocktailService._glass = cocktail.drinks[0].strGlass;
        Object.keys(cocktail.drinks[0]).forEach(element => {
          if (
            element.search('Ingredient') > 0 &&
            cocktail.drinks[0][element] != null
          ) {
            cocktailService._ingredients.push(cocktail.drinks[0][element]);
          }
        });
        Object.keys(cocktail.drinks[0]).forEach(element => {
          if (
            element.search('Measure') > 0 &&
            cocktail.drinks[0][element] != null
          ) {
            cocktailService._volumes.push(cocktail.drinks[0][element]);
          }
        });
        cocktailService._instructions = cocktail.drinks[0].strInstructions;
        cocktailService._thumb = cocktail.drinks[0].strDrinkThumb;
      }
      let cocktailstr =
        cocktailService._drink +
        ': ' +
        cocktailService._category +
        ', ' +
        cocktailService._glass +
        '.\n\nIngredients: ';
      for (var i = 0; i < cocktailService._ingredients.length; i++) {
        cocktailstr +=
          cocktailService._ingredients[i] + ' ' + cocktailService._volumes[i];
        if (i + 1 != cocktailService._ingredients.length) {
          cocktailstr += ', ';
        }
      }
      cocktailstr +=
        '.\n\n' +
        cocktailService._instructions +
        '\n\nThe cocktail: ' +
        cocktailService._thumb;
        callback(cocktailstr);
    });
  }
}

module.exports = CocktailService;
