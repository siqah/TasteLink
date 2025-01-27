const bcrypt = require('bcrypt');
const User = require('../models/User');
const multer = require("multer");
const path = require("path");


// Controller to handle profile image upload
// Upload profile image
exports.uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    // Create a new profile image with the Buffer and contentType
    const image = {
      data: req.file.buffer,
      contentType: req.file.mimetype
    };

    // Update the user's profile image (assuming user ID is in req.user)
    const user = await User.findByIdAndUpdate(
      req.user.id, // Replace this with the actual user ID from the request
      { profileImage: image },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(201).json({ message: 'Image uploaded successfully!', user });
  } catch (error) {
    console.error('Error uploading profile image:', error.message);
    res.status(500).json({ error: 'Failed to upload profile image' });
  }
};

// Get profile image
exports.getProfileImage = async (req, res) => {
  try {
    // Fetch the user by ID
    const user = await User.findById(req.params.id);

    if (!user || !user.profileImage || !user.profileImage.data) {
      return res.status(404).json({ error: 'No image found for this user' });
    }

    // Set the correct Content-Type header and send the image data
    res.set('Content-Type', user.profileImage.contentType);
    res.send(user.profileImage.data);
  } catch (error) {
    console.error('Error fetching profile image:', error.message);
    res.status(500).json({ error: 'Failed to fetch profile image' });
  }
};

  

// POST: Create a new user
exports.postUser = async (req, res) => {
    const { uid, contact, location, role } = req.body; // uid from Firebase
  
    try {
      let user = await User.findOne({ uid });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      user = new User({
        uid,
        contact,
        location,
        role: role || 'user'
      });
  
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  

// GET: Retrieve all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// GET: Retrieve a user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(500).send('Server Error');
    }
};

// PUT: Update a user by ID
exports.updateUser = async (req, res) => {
    const { uid, contact, location, role } = req.body;
    const userFields = { contact, location, role };
  
    try {
      let user = await User.findOneAndUpdate({ uid }, { $set: userFields }, { new: true });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  
// DELETE: Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        await user.remove();
        res.json({ msg: 'User removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(500).send('Server Error');
    }
};

