import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold hover:text-blue-200">
          🛒 Smart Grocery Manager
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
          <Link to="/items" className="hover:text-blue-200">Items</Link>
          <Link to="/add-item" className="hover:text-blue-200">Add Item</Link>
          <Link to="/alerts" className="hover:text-blue-200">Alerts</Link>
          <Link to="/shopping-list" className="hover:text-blue-200">Shopping List</Link>
          
          <div className="flex items-center gap-3 pl-6 border-l border-blue-400">
            <span className="text-sm">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
