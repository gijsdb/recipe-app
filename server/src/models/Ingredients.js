const mongoose = require('mongoose');

const { Schema } = mongoose;

const ingredientsSchema = new Schema({
    Recipe: {
        required: true,
        type: Schema.Types.ObjectId, 
        ref: 'Recipe'
    },
    List: {
        type: Array,
        unique: true,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Ingredients', ingredientsSchema);