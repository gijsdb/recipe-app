const mongoose = require('mongoose');

const { Schema } = mongoose;

const recipeSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
      unique: true,
    },
    IngredientList: {
      type: Schema.Types.ObjectId,
      ref: 'Ingredients',
    },
    Method: {
      type: Schema.Types.ObjectId,
      ref: 'Method',
    },
    AddedBy: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Recipe', recipeSchema);
