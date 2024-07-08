import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addOrder } from '../store/orderSlice';

const WaiterPage = () => {
  const [tableName, setTableName] = useState('');
  const [selectedItems, setSelectedItems] = useState({});
  const [isNewOrder, setIsNewOrder] = useState(false);
  const { menuItems, orders } = useSelector(state => state.order);
  const dispatch = useDispatch();
  const tableOptions = [
    { id: 1, name: 'Table 1 - OutSide' },
    { id: 2, name: 'Table 2 - SitOut' },
    { id: 3, name: 'Table 3 - OutSideRight' },
    { id: 4, name: 'Table 4 - UpSide Center' },
    { id: 5, name: 'Table 5 - Corner Left' }
  ];
  const handleItemQuantityChange = (itemId, change) => {
    setSelectedItems(prev => {
      const newQuantity = (prev[itemId] || 0) + change;
      if (newQuantity <= 0) {
        const { [itemId]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newQuantity };
    });
  };

  const handleSubmitOrder = () => {
    if (!tableName) {
      alert('Please enter a table name');
      return;
    }
    if (Object.keys(selectedItems).length === 0) {
      alert('Please select at least one item');
      return;
    }
    const orderItems = Object.entries(selectedItems).map(([itemId, quantity]) => {
      const item = menuItems.find(item => item.id === itemId);
      return { ...item, quantity };
    });
    const newOrder = {
      id: Date.now().toString(),
      tableName,
      items: orderItems,
      status: 'pending',
      timestamp: new Date().toISOString(),
    };
    dispatch(addOrder(newOrder));
    setTableName('');
    setSelectedItems({});
    setIsNewOrder(false);
    alert('Order submitted successfully!');
  };

  return (
    <div className="container mx-auto p-6 rounded-xl ">
  {!isNewOrder && (
    <button
      onClick={() => setIsNewOrder(true)}
      className="bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-3 mb-10 rounded-full font-semibold shadow-md hover:from-green-500 hover:to-green-700 transition duration-300 transform hover:scale-105"
    >
      New Order
    </button>
  )}

  {isNewOrder && (
    <div className="mb-12 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4 cursor-pointer" onClick={() => setIsNewOrder(false)}>New Order</h2>
      <div className="mb-6">
        <label className="block mb-2 text-lg font-medium text-gray-700">Table Name:</label>
        <select
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>Select a table</option>
          {tableOptions.map(option => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {menuItems.map(item => (
          <div key={item.id} className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <h3 className="font-semibold text-xl mb-2 text-gray-800">{item.name}</h3>
            <p className="text-gray-600 font-medium">${item.price.toFixed(2)}</p>
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => handleItemQuantityChange(item.id, -1)}
                className="bg-red-100 text-red-600 px-4 py-2 rounded-full hover:bg-red-200 transition duration-300"
              >
                -
              </button>
              <span className="mx-4 text-xl font-semibold">{selectedItems[item.id] || 0}</span>
              <button
                onClick={() => handleItemQuantityChange(item.id, 1)}
                className="bg-green-100 text-green-600 px-4 py-2 rounded-full hover:bg-green-200 transition duration-300"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmitOrder}
        className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:from-blue-500 hover:to-blue-700 transition duration-300 transform hover:scale-105 mt-8"
      >
        Submit Order
      </button>
    </div>
  )}

  <div className="bg-white p-8 rounded-xl shadow-md">
    <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Order Status</h2>
    {orders.length === 0 ? (
      <p className="text-xl text-gray-600">No orders yet.</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {orders.map(order => (
          <div
            key={order.id}
            className={`border p-6 rounded-xl shadow-md transition duration-300 hover:shadow-lg ${
              order.status === 'pending' ? 'bg-yellow-50 border-yellow-200' :
              order.status === 'in-progress' ? 'bg-blue-50 border-blue-200' :
              'bg-green-50 border-green-200'
            }`}
          >
            <h3 className="font-semibold text-xl mb-2 text-gray-800">Table: {order.tableName}</h3>
            <p className="mb-4 text-lg">
              Status: 
              <span className={`font-bold ml-2 ${
                order.status === 'pending' ? 'text-yellow-600' :
                order.status === 'in-progress' ? 'text-blue-600' :
                'text-green-600'
              }`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </p>
            <ul className="space-y-2 mb-4">
              {order.items.map(item => (
                <li key={item.id} className="text-gray-700 flex justify-between">
                  <span>{item.name} x{item.quantity}</span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              Ordered at: {new Date(order.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

  );
};

export default WaiterPage;