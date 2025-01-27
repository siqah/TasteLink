import { useEffect, useState } from 'react';
import axios from 'axios';

const ChefOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch chef's orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders/chef'); // Get orders for the logged-in chef
        setOrders(response.data);
      } catch (err) {
        setError('Error fetching orders');
        console.error('Error fetching orders:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Function to update the order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.patch(`/api/orders/${orderId}`, { status: newStatus });
      console(response.data)
      // Update the orders state to reflect the change
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      alert(`Order status updated to: ${newStatus}`);
    } catch (err) {
      setError('Error updating order status');
      console.error('Error updating order status:', err.message);
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Chef Orders</h1>
      {orders.length === 0 ? (
        <p>No orders available</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <p><strong>Customer ID:</strong> {order.customer}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <ul>
              {order.dishes.map((dish, index) => (
                <li key={index}>
                  <strong>{dish.name}</strong> - Quantity: {dish.quantity}
                </li>
              ))}
            </ul>
            <div className="order-actions">
              {order.status === 'pending' && (
                <button onClick={() => updateOrderStatus(order._id, 'accepted')}>
                  Accept
                </button>
              )}
              {order.status === 'accepted' && (
                <>
                  <button onClick={() => updateOrderStatus(order._id, 'completed')}>
                    Complete
                  </button>
                  <button onClick={() => updateOrderStatus(order._id, 'canceled')}>
                    Cancel
                  </button>
                </>
              )}
              {order.status === 'completed' && <p>Order completed</p>}
              {order.status === 'canceled' && <p>Order canceled</p>}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChefOrders;
