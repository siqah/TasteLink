const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to Customer
  chef: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to Chef
  dishes: [{
    name: String,
    spices: [String], // Additional details like spices used
    quantity: Number,
  }],
  status: { type: String, enum: ['pending', 'accepted', 'completed', 'canceled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
