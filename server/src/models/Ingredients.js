const mongoose = require('mongoose');

const { Schema } = mongoose;

const ingredientsSchema = new Schema(
  {
    Recipe: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Recipe',
    },
    Serves: {
      required: true,
      type: String,
    },
    List: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Ingredients', ingredientsSchema);
