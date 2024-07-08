import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-3xl font-extrabold tracking-tight mr-4">
            <span className="text-yellow-300">Resto</span>
            <span className="text-white">Hub</span>
          </Link>

          <button 
            onClick={toggleMenu}
            className="md:hidden focus:outline-none focus:ring-2 focus:ring-white rounded-lg p-2"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <nav className={`${isOpen ? 'block' : 'hidden'} md:flex md:items-center w-full md:w-auto`}>
            <div className="flex flex-col md:flex-row md:ml-6">
              {['Waiter', 'Chef', 'Admin'].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-white hover:text-purple-600 transition duration-300 ease-in-out md:mt-0 mt-1"
                >
                  {item}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;