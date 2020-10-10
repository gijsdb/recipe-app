const Recipe = require('../models/Recipe');
const Method = require('../models/Method');
const Ingredients = require('../models/Ingredients');

module.exports = {
    async retrieveRecipes (req, res) {
      console.log('Retrieving all recipes')
      try {
        Recipe.find({})
          .populate('AddedBy', 'Name')
          .populate('Method', 'Steps')
          .populate('IngredientList', ['List','Serves'])
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
        .populate('Method', 'Steps')
        .populate('IngredientList', ['List','Serves'])
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
        res.json(recipes)
        return
      } catch(e) {

      }
    },

    async addRecipe (req, res) {
      console.log('Adding a recipe', req.body.Title)
      try {
        const newRecipe = new Recipe({
          Title: req.body.Title, 
          IngredientList: req.body.Ingredients,
          Method: req.body.Method,
          AddedBy: req.body.AddedBy,
        });
        newRecipe.save();
        const createdRecipe = await Recipe.findOne({Title: req.body.Title}).populate('Method', 'Steps').populate('AddedBy', 'Name').populate('IngredientList', 'List') ;
        res.json({
          recipe: createdRecipe,
        })
        } catch(e) {

        }
    },

    async addIngredients (req, res) {
      const ingredients = req.body.ingredientsList;
      const recipeId = req.body.recipeId;
      const serves = req.body.serves;
      const newIngredients = {
        Recipe: recipeId,
        Serves: serves,
        List: ingredients
      }
      console.log('Adding ingredients', ingredients)
      var options = { new: true, upsert: true }; 
      if (recipeId) {
          Ingredients.findOneAndUpdate({Recipe: recipeId}, newIngredients, options, function(err, updatedIngredients){ 
            if(err) {
              console.log(err)
            }              
            const ingredientsUpdate = {
              IngredientList: updatedIngredients._id
            }
            Recipe.findOneAndUpdate({_id: recipeId}, ingredientsUpdate, {new:true}, function(err, updatedRecipe) {
              if(err) {
                console.log(err)
              }
              res.status(200).json({updatedRecipe})
            }).populate('Method', 'Steps').populate('AddedBy', 'Name').populate('IngredientList', ['List', 'Serves'])  
          });
      }            
    },

    async addMethod (req, res) {
      const method = req.body.method;
      const recipeId = req.body.recipeId;
      const newMethod = {
        Recipe: recipeId,
        Steps: method
      }
      console.log('Adding method', method)
      var options = { new: true, upsert: true }; 
      if (recipeId) {
          Method.findOneAndUpdate({Recipe: recipeId}, newMethod, options, function(err, updatedMethod){ 
            if(err) {
              console.log(err)
            }              
            const recipeUpdate = {
              Method: updatedMethod._id
            }
            Recipe.findOneAndUpdate({_id: recipeId}, recipeUpdate, {new:true}, function(err, updatedRecipe) {
              if(err) {
                console.log(err)
              }
              res.status(200).json({updatedRecipe})
            }).populate('Method', 'Steps').populate('AddedBy', 'Name').populate('IngredientList', 'List')  
          });
      }            
    },

}