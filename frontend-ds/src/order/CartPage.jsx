import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Cheese Burger',
      price: 4.99,
      quantity: 2,
      image: '/images/burger.jpeg',
    },
    {
      id: 2,
      name: 'French Fries',
      price: 2.49,
      quantity: 1,
      image: '/images/French Fries.jpg',
    },
  ]);

  const handleQuantityChange = (id, type) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: type === 'inc' ? item.quantity + 1 : Math.max(1, item.quantity - 1),
        };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>
      {cartItems.map(item => (
        <div key={item.id} className="flex items-center justify-between border-b py-4">
          <div className="flex items-center gap-4">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
            <div>
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => handleQuantityChange(item.id, 'dec')} className="px-2 bg-gray-200 rounded">-</button>
            <span>{item.quantity}</span>
            <button onClick={() => handleQuantityChange(item.id, 'inc')} className="px-2 bg-gray-200 rounded">+</button>
          </div>
        </div>
      ))}
      <div className="text-right font-bold text-xl mt-6">
        Total: ${total.toFixed(2)}
      </div>
      {/* Passing cartItems to PaymentPage */}
      <Link to="/payment" state={{ cartItems }}>
        <button className="w-full py-2 bg-blue-600 text-white rounded mt-4">
          Proceed to Payment
        </button>
      </Link>
    </div>
  );
};

export default CartPage;
