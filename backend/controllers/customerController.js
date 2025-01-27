const User = require('../models/User');
const bcrypt = require('bcryptjs');


exports.createCustomer = async (req, res) => {
    const { name, email, password, contact, location } = req.body;

    try {
        // Check if customer already exists
        let customer = await User.findOne({ email });
        if (customer) {
            return res.status(400).json({ message: 'Customer already exists' });
        }
        // Create a new customer
        customer = new User({
            name,
            email,
            password,
            contact,
            location,
            role: 'customer'
        });

        // Encrypt the password
        const salt = await bcrypt.genSalt(10);
        customer.password = await bcrypt.hash(password, salt);

        await customer.save();

        res.status(201).json({ message: 'Customer created successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
// Fetch all customers
exports.getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: 'customer' }).select('-password');
        res.status(200).json(customers);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
}

// Fetch a single customer by ID
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await User.findOne({ _id: req.params.id, role: 'customer' }).select('-password');
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateCustomer = async (req, res) => {
    const customerId = req.params.id;
    const { name, email, contact, location } = req.body;

    try {
        // Check if customer exists
        const customer = await User.findOne({ _id: customerId, role: 'customer' });
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        // Update the customer
        customer.name = name || customer.name;
        customer.email = email || customer.email;
        customer.contact = contact || customer.contact;
        customer.location = location || customer.location;

        await customer.save();

        res.status(200).json({ message: 'Customer updated successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;

        // Check if chef exists
        const chef = await User.findOne({ _id: customId, role: 'customer' });
        if (!chef) {
            return res.status(404).json({ message: 'Chef not found' });
        }

        // Delete the chef from the database
        await User.findByIdAndDelete(customerId);

        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};




