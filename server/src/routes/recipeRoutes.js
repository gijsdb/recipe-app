const RecipeController = require('../controllers/recipeController')
const middlewares = require('../middlewares');

module.exports = (app) => {    
    app.get('/api/recipes/', middlewares.auth, RecipeController.retrieveRecipes);
    app.post('/api/recipes/created', RecipeController.retrieveMyRecipes);

    app.post('/api/recipes/add', middlewares.auth, RecipeController.addRecipe);
}