const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    chef: { type: mongoose.Schema.Types.ObjectId, ref: 'Chef' },
    image: { type: String ,required: true }
});

module.exports = mongoose.model('Dish', DishSchema);
