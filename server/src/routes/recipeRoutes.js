const RecipeController = require('../controllers/recipeController');
const middlewares = require('../middlewares');

module.exports = (app) => {
  app.get(
    '/api/recipes/',
    middlewares.auth,
    RecipeController.retrieveRecipes,
  );
  app.post(
    '/api/recipes/created',
    RecipeController.retrieveMyRecipes,
  );

  app.post(
    '/api/recipes/add',
    middlewares.auth,
    RecipeController.addRecipe,
  );
  app.post(
    '/api/recipes/add/method',
    middlewares.auth,
    RecipeController.addMethod,
  );
  app.post(
    '/api/recipes/add/ingredients',
    middlewares.auth,
    RecipeController.addIngredients,
  );
};
