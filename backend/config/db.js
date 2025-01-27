const mongoose = require('mongoose');
const config = require('./config');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Database connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
