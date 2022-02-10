const request = require('request');

class RecipeService {
  constructor() {
    this._url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    this._name = '';
    this._category = '';
    this._where = '';
    this._instructions = '';
    this._thumb = '';
    this._youtube = '';
    this._ingredients = new Array(1);
    this._volumes = new Array(1);
    this._source;
    this._about = {
      name: "Recipe",
      reactions: [{
        name: "get_cocktail",
        description: "Give a random recipe on a Slack channel : https://join.slack.com/t/area-wpe2995/shared_invite/enQtOTUzMzAxNTcwNTMxLTQxNDJkMWNkZjZiOGNkMDY2YmI0OTE2OTQ0NWZlYjYxNmVhNWNiZTkzODMyZjExYTVmZWVjYjQzOGY2NDY3MmE"
      }]
    };
  }

  getAbout() {
    return (this._about);
  }

  RecipeRequest(callback) {
    let recipeService = this;
    request(this._url, function(err, _response, body) {
      let Recipe = '';
      if (err) {
        console.log('error', err);
      } else {
        const recipe = JSON.parse(body);
        recipeService._name = recipe.meals[0].strMeal;
        recipeService._category = recipe.meals[0].strCategory;
        recipeService._where = recipe.meals[0].strArea;
        recipeService._instructions = recipe.meals[0].strInstructions;
        recipeService._thumb = recipe.meals[0].strMealThumb;
        recipeService._youtube = recipe.meals[0].strYoutube;
        Object.keys(recipe.meals[0]).forEach(element => {
          if (
            element.search('Ingredient') > 0 &&
            recipe.meals[0][element] != null
          ) {
            recipeService._ingredients.push(recipe.meals[0][element]);
          }
        });
        Object.keys(recipe.meals[0]).forEach(element => {
          if (
            element.search('Measure') > 0 &&
            recipe.meals[0][element] != null
          ) {
            recipeService._volumes.push(recipe.meals[0][element]);
          }
        });
        recipeService._source = recipe.meals[0].strSource;
        Recipe +=
          recipeService._name +
          ': ' +
          recipeService._category +
          ', ' +
          recipeService._where +
          '.\n\nIngredients: ';
        for (var i = 1; i < recipeService._ingredients.length; i++) {
          Recipe +=
            recipeService._ingredients[i] + ' ' + recipeService._volumes[i];
          if (i + 1 != recipeService._ingredients.length) {
            Recipe += ', ';
          }
        }
        Recipe +=
          '.\n\n' +
          recipeService._instructions +
          '\n\nThe meal: ' +
          recipeService._thumb +
          '\n\nTutorial: ' +
          recipeService._youtube +
          '\n\nSource: ' +
          recipeService._source;
      }
      callback(Recipe);
    });
  }
}

module.exports = RecipeService;
