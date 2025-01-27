import { useEffect, useState } from 'react';
import axios from 'axios';

const ChefOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders for the logged-in chef
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/chefOrders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching chef orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Orders</h2>
      <ul className="space-y-4">
        {orders.map(order => (
          <li key={order._id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-700">
              Order from: {order.customerId?.name || 'Unknown Customer'}
            </h3>
            <p className="text-sm text-gray-600">Items:</p>
            <ul className="list-disc ml-5">
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.name} (Qty: {item.quantity}) - Spices: {item.spices?.join(', ') || 'No spices'}
                </li>
              ))}
            </ul>
            {/* Only display status if it exists */}
            {order.status && (
              <p className="text-sm text-gray-600 mt-2">Status: {order.status}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChefOrders;
