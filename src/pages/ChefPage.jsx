import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMenuItem, removeMenuItem, updateOrderStatus, removeOrder } from '../store/orderSlice';

const ChefPage = () => {
  const [newItem, setNewItem] = useState({ name: '', price: '' });
  const { menuItems, orders } = useSelector(state => state.order);
  const dispatch = useDispatch();

  const handleAddMenuItem = () => {
    if (newItem.name && newItem.price) {
      dispatch(addMenuItem({ ...newItem, id: Date.now().toString(), price: parseFloat(newItem.price) }));
      setNewItem({ name: '', price: '' });
    }
  };

  const handleRemoveMenuItem = (id) => {
    dispatch(removeMenuItem(id));
  };

  const handleUpdateOrderStatus = (orderId, status) => {
    dispatch(updateOrderStatus({ orderId, status }));
    if (status === 'completed') {
      setTimeout(() => {
        dispatch(removeOrder(orderId));
      }, 10000);
    }
  };
  const handleRemoveOrder = (id) =>{
    dispatch(removeOrder(id))
  }

  return (
    <div className="container mx-auto p-4">
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-2">Add Menu Item</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Item name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="border rounded-lg p-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          className="border rounded-lg p-2 w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={handleAddMenuItem} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300">
          Add Item
        </button>
      </div>
    </div>
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-2">Menu Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {menuItems.map(item => {
          const bgColors = ['bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-pink-100', 'bg-purple-100'];
          const randomBg = bgColors[Math.floor(Math.random() * bgColors.length)];
          return (
            <div key={item.id} className={`${randomBg} p-4 rounded-lg shadow`}>
              <div className="flex justify-between items-center">
                <span className="font-semibold">{item.name}</span>
                <span className="font-bold">${item.price.toFixed(2)}</span>
              </div>
              <button
                onClick={() => handleRemoveMenuItem(item.id)}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition duration-300"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
    <div>
      <h2 className="text-xl font-bold mb-2">Orders</h2>
      {orders.map(order => (
        <div key={order.id} className={`border p-4 mb-4 rounded ${
          order.status === 'pending' ? 'bg-yellow-100' :
          order.status === 'in-progress' ? 'bg-blue-100' :
          'bg-green-100'
        }`}>
           
          <h3 className="font-bold mb-2">Table: {order.tableName}</h3>
          <p className="mb-2">Status: 
            <span className={`font-bold ml-1 ${
              order.status === 'pending' ? 'text-yellow-500' :
              order.status === 'in-progress' ? 'text-blue-500' :
              'text-green-500'
            }`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </p>
          <ul>
            {order.items.map(item => (
            
              <li key={item.id} className="flex justify-between">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              
              </li>
            ))}
          </ul>
          <div className="mt-2 space-x-2">
            <button
              onClick={() => handleUpdateOrderStatus(order.id, 'in-progress')}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded transition duration-300"
            >
              Mark In Progress
            </button>
            <button
              onClick={() => handleUpdateOrderStatus(order.id, 'completed')}
              className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded transition duration-300"
            >
              Mark Completed
            </button>
            <button
              onClick={() => handleRemoveOrder(order.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition duration-300"
            >
              Cancel Order
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default ChefPage;