import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faUtensils, faClock } from '@fortawesome/free-solid-svg-icons';

const RecentOrders = () => {
  const recentOrders = useSelector((state) => state.order.recentOrders);

  const totalSum = recentOrders
  .filter(order => order.status === 'completed') 
  .reduce((sum, order) => {
    return sum + order.items.reduce((orderSum, item) => orderSum + (item.price * item.quantity), 0);
  }, 0);


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-md">
 
        <div className="text-2xl font-semibold text-green-700">
          Total Sales: ${totalSum.toFixed(2)}
        </div>
      </div>
      {recentOrders.length === 0 ? (
        <p className="text-xl text-gray-500 italic bg-white p-6 rounded-lg shadow-md">No recent orders.</p>
      ) : (
        <ul className="space-y-6">
          {recentOrders.map((order) => (
            <li key={order.id} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
                <span className="text-xl font-semibold">Order #{order.id}</span>
                <span className="text-lg font-bold">
                  ${order.items.reduce((orderSum, item) => orderSum + (item.price * item.quantity), 0).toFixed(2)}
                </span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <p className={`text-sm font-semibold py-1 px-3 rounded-full ${
                    order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                    order.status === 'in-progress' ? 'bg-blue-200 text-blue-800' :
                    'bg-green-200 text-green-800'
                  }`}>
                    {order.status.toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <FontAwesomeIcon icon={faClock} className="mr-2" />
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <ul className="space-y-2 mb-4">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between items-center text-gray-700 border-b pb-2">
                      <span className="flex items-center">
                        <FontAwesomeIcon icon={faUtensils} className="mr-2 text-gray-500" />
                        {item.name} 
                        <span className="ml-2 text-sm text-gray-500">x{item.quantity}</span>
                      </span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Table: {order.tableName}</span>
                  <span>Server: {order.serverName}</span>
                </div>
              </div>
              <div className="bg-gray-100 p-4 flex justify-end">
                <button
                  onClick={() => window.print()}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out flex items-center text-sm"
                >
                  <FontAwesomeIcon icon={faPrint} className="mr-2" />
                  Print Receipt
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentOrders;