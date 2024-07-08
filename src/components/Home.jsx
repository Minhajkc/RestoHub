import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faClipboardList, faChartLine, faCog } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Welcome to RestoHub</h1>
      
      <p className="text-xl text-center mb-12 text-gray-600">
        Your all-in-one restaurant management solution
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link to="/waiter" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center">
          <FontAwesomeIcon icon={faUtensils} className="text-5xl mb-4 text-blue-500" />
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Waiter Interface</h2>
          <p className="text-gray-600">Take orders and manage tables</p>
        </Link>
        
        <Link to="/chef" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center">
          <FontAwesomeIcon icon={faClipboardList} className="text-5xl mb-4 text-green-500" />
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Kitchen View</h2>
          <p className="text-gray-600">Add,View and update food statuses</p>
        </Link>
        
        <Link to="/admin" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center">
          <FontAwesomeIcon icon={faChartLine} className="text-5xl mb-4 text-purple-500" />
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Admin Dashboard</h2>
          <p className="text-gray-600">View reports and manage staff</p>
        </Link>
    
      </div>
      
   
    </div>
  );
};

export default Home;