import { useState } from 'react';
import axios from 'axios';

const CreateOrder = () => {
  const [dishes, setDishes] = useState([{ name: '', quantity: 1 }]);
  const [chefId, setChefId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/orders', {
        chefId,
        dishes
      });
      alert('Order placed successfully!', response.data);
    } catch (error) {
      console.error('Error placing order:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={chefId}
        onChange={(e) => setChefId(e.target.value)}
        placeholder="Chef ID"
        required
      />
      {dishes.map((dish, index) => (
        <div key={index}>
          <input
            type="text"
            value={dish.name}
            onChange={(e) => {
              const newDishes = [...dishes];
              newDishes[index].name = e.target.value;
              setDishes(newDishes);
            }}
            placeholder="Dish name"
            required
          />
          <input
            type="number"
            value={dish.quantity}
            onChange={(e) => {
              const newDishes = [...dishes];
              newDishes[index].quantity = e.target.value;
              setDishes(newDishes);
            }}
            placeholder="Quantity"
            required
          />
        </div>
      ))}
      <button type="submit">Place Order</button>
    </form>
  );
};

export default CreateOrder;
