import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Watchlist from './pages/Watchlist';
import Simulator from './pages/Simulator';
import CoinDetailPage from './pages/CoinDetailPage'; 

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/coin/:id" element={<CoinDetailPage />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;




