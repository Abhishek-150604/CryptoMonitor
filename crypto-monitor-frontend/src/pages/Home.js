// src/pages/Home.js

import React, { useEffect, useState } from "react";
import { fetchTopCoins } from "../services/cryptoApi";
import WatchlistButton from "../components/WatchlistButton";
import GainLossSimulator from "../components/GainLossSimulator";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [coins, setCoins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCoins = async () => {
      const data = await fetchTopCoins();
      setCoins(data);
    };
    getCoins();
  }, []);

  // Export to CSV function
  const exportToCSV = (coinsData) => {
    const header = Object.keys(coinsData[0]).join(',') + '\n';
    const rows = coinsData.map(coin => Object.values(coin).join(',')).join('\n');
    const csvContent = header + rows;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'crypto_coins.csv');
    link.click();
  };

  // Export to JSON function
  const exportToJSON = (coinsData) => {
    const blob = new Blob([JSON.stringify(coinsData, null, 2)], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'crypto_coins.json');
    link.click();
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-black">Top Cryptocurrencies</h1>
      <br />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="bg-gray-800 rounded-xl p-4 shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center space-x-4">
              <img src={coin.image} alt={coin.name} className="w-10 h-10" />
              <div>
                <h2 className="text-lg text-white font-semibold">{coin.name}</h2>
                <p className="text-gray-400">₹{coin.current_price.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-col gap-2">
              <WatchlistButton coinId={coin.id} />
              <button
                onClick={() => navigate(`/coin/${coin.id}`)}
                className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-md text-sm"
              >
                View Chart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={() => exportToCSV(coins)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4"
        >
          Export to CSV
        </button>
        <button
          onClick={() => exportToJSON(coins)}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Export to JSON
        </button>
      </div>

      {/* Gain/Loss Simulator */}
      <GainLossSimulator />
    </div>
  );
};

export default Home;

