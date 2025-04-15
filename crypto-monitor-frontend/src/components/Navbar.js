import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-purple-600">
          <Link to="/">CryptoMonitor</Link>
        </div>
        <div className="flex space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-purple-600 transition font-medium"
          >
            Home
          </Link>
          <Link
            to="/watchlist"
            className="text-gray-700 hover:text-purple-600 transition font-medium"
          >
            Watchlist
          </Link>
          <Link
            to="/simulator"
            className="text-gray-700 hover:text-purple-600 transition font-medium"
          >
            Gain/Loss Simulator
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


