const mongoose = require('mongoose');

const { Schema } = mongoose;

const methodSchema = new Schema(
  {
    Steps: {
      required: true,
      type: Array,
    },
    Recipe: {
      type: Schema.Types.ObjectId,
      ref: 'Recipe',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Method', methodSchema);
