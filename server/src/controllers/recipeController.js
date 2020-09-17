const Recipe = require('../models/Recipe');
const Method = require('../models/Method');
const Ingredients = require('../models/Ingredients');

module.exports = {
    async retrieveRecipes (req, res) {
      console.log('Retrieving all recipes')
      try {
        Recipe.find({})
          .populate('AddedBy', 'Name')
          .exec(function(error, recipes) {
              if(recipes.length <= 0) {
                return res.status(403).send({
                  error: 'No recipes in database'
                })
              }
              if(!error) {
                res.json(recipes)
              }
          })   
        return
      } catch(e) {
        console.log(e)
      }
    },

    async retrieveMyRecipes (req, res) {
      console.log('Retrieving user recipes')
      try {
        const AddedBy = req.body.AddedBy
        Recipe.find({AddedBy})
        .populate('AddedBy', 'Name')
        .exec(function(error, recipes) {
            if(recipes.length <= 0) {
              return res.status(403).send({
                error: 'No recipes in database'
              })
            }
            if(!error) {
              res.json(recipes)
            }
        })  


       
        // const recipes = await Recipe.find({AddedBy});
        // if(recipes.length <= 0) {
        //   return res.status(403).send({
        //     error: 'You have not made any recipes'
        //   })
        // }
        res.json(recipes)
        return
      } catch(e) {

      }
    },

    async addRecipe (req, res) {
      try {
        const newRecipe = new Recipe({
          Title: req.body.Title, 
          IngredientList: req.body.Ingredients,
          Method: req.body.Method,
          AddedBy: req.body.AddedBy,
        });
        newRecipe.save();
        const createdRecipe = await Recipe.findOne({Title: req.body.Title});
        res.json({
          recipe: createdRecipe,
        })
        } catch(e) {

        }
    },

    async addIngredients (req, res) {
        try {
          const newRecipe = new Ingredients({
                
          })
          const createdIngredients = newRecipe.save();
          res.json({
            ingredientsList: createdIngredients,
          })
        } catch(e) {

        }
    },

    async addMethod (req, res) {
        try {
          const newRecipe = new Method({
               
          })
          const createdMethod = newRecipe.save();
          res.json({
           method: createdMethod,
          })
        } catch(e) {

        }
    },
}