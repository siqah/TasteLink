const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    uid: { 
        type: String, 
        required: true, 
        unique: true // Firebase UID, ensures each user is uniquely identified
    },
    profileImage: { 
        type: String, 
        default: '' 
    },
    contact: { 
        type: String, 
        required: true 
    },
    location: { 
        type: String, 
        default: '' 
    },
    role: {
        type: String,
        enum: ['customer', 'chef'], // Limit role values to customer or chef
        default: 'customer' // Default to 'customer'
    }
}, { 
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Export the model
module.exports = mongoose.model('User', UserSchema);
