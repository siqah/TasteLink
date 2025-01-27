const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust this path based on your project structure

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    // Verify token and decode payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id); // Find user by decoded ID from token

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user; // Attach user to the request
    next(); // Proceed to the next middleware/controller
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
