const User = require('../models/User');

// Create a new chef
exports.createChef = async (req,res) => {
    try {
        const { name, email, password, contact, location } = req.body;
        // Check if required fields are missing
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }
        // Check if chef with the same email already exists
        const existingChef = await User.findOne({ email });
        if (existingChef) {
            return res.status(400).json({ message: 'Chef with this email already exists' });
        }
        // Create a new chef
        const chef = new User({
            name,
            email,
            password,
            contact,
            location,
            role: 'chef'
        });
        // Save the chef to the database
        await chef.save();
    
        res.status(201).json(chef);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fetch all chefs
exports.getChefs = async (req, res) => {
    try {
        const chefs = await User.find({ role: 'chef' }).select('-password'); // Get users with role 'chef', excluding the password field
        res.status(200).json(chefs);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fetch a single chef by ID
exports.getChefById = async (req, res) => {
    try {
        const chef = await User.findOne({ _id: req.params.id, role: 'chef' }).select('-password'); //getting one User of role chef with the id
        if (!chef) {
            return res.status(404).json({ message: 'Chef not found' });
        }
        res.status(200).json(chef);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a chef
exports.updateChef = async (req, res) => {
    try {
        const { name, email, password, location, contact } = req.body;
        const chefId = req.params.id;

        // Check if chef exists
        const chef = await User.findOne({ _id: chefId, role: 'chef' });
        if (!chef) {
            return res.status(404).json({ message: 'Chef not found' });
        }

        // Update chef details
        chef.name = name;
        chef.email = email;
        chef.location = location;  // Fixed typo here
        chef.contact = contact;

        if (password) {
            // Hash the new password before saving
            chef.password = password;
            await chef.save();
        } else {
            // Save the updated chef to the database if password is not updated
            await chef.save();
        }
        res.status(200).json(chef);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a chef
exports.deleteChef = async (req, res) => {
    try {
        const chefId = req.params.id;

        // Check if chef exists
        const chef = await User.findOne({ _id: chefId, role: 'chef' });
        if (!chef) {
            return res.status(404).json({ message: 'Chef not found' });
        }

        // Delete the chef from the database
        await User.findByIdAndDelete(chefId);

        res.status(200).json({ message: 'Chef deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

