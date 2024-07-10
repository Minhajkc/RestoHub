import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from 'components/Header';
import WaiterPage from './pages/WaiterPage';
import ChefPage from './pages/ChefPage';
import RecentOrders from './components/RecentOrders';
import Home from './components/Home'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/waiter" element={<WaiterPage />} />
          <Route path="/chef" element={<ChefPage />} />
          <Route path="/admin" element={<RecentOrders/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;