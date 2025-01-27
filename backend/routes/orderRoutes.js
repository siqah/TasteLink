const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate'); // Middleware to authenticate the chef
const { getChefOrders,createOrder,updateOrderStatus, deleteOrder} = require('../controllers/orderController');

router.route('/chefOrders').get(authenticate, getChefOrders);
router.patch('/:orderId', authenticate, updateOrderStatus, deleteOrder);

router.route('/chefOrders').post(authenticate, createOrder)


module.exports = router;
