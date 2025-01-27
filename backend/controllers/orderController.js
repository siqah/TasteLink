const Order = require('../models/Order');




  // Create a new order
  exports.createOrder = async (req, res) => {
    const { chefId, dishes } = req.body;
    
    try {
      const order = new Order({
        customer: req.user.id, // Assuming the user is authenticated
        chef: chefId, // Chef's ID will be sent in the request body
        dishes,
      });
  
      const savedOrder = await order.save();
      res.status(201).json({ message: 'Order created successfully!', order: savedOrder });
    } catch (error) {
      console.error('Error creating order:', error.message);
      res.status(500).json({ error: 'Failed to create order' });
    }
  };

  // Get all orders for a specific chef
exports.getChefOrders = async (req, res) => {
  try {
    const orders = await Order.find({ chef: req.user.id }); // Assuming chef is authenticated
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Update order status (accepted, completed, canceled)
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated!', order });
  } catch (error) {
    console.error('Error updating order status:', error.message);
    res.status(500).json({ error: 'Failed to update order status' });
  }
};



// delete  delte unorder
exports.deleteOrder = async (req, res) => {
    const orderId = req.params.id;
    try {
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).send('Order not found');
        }
        res.send(order);
    } catch (error) {
        res.status(500).send('Error deleting order');
    }
};
