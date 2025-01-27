const mongoose = require('mongoose');

const dishPostSchema = new mongoose.Schema({
  creator: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, 
  image: { 
    type: String, 
    required: true
  }, 
  description: { 
    type: String, 
    required: true 
  },  
  tags: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model('DishPost', dishPostSchema);
