const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const dishPostRoutes = require('./routes/dishPostRoutes');

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/dishposts', dishPostRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (err) {
        console.error('Database connection error:', err.message);
        process.exit(1);
    }
};

startServer();
