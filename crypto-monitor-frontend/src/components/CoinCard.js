// src/components/CoinCard.js
import React from "react";

const CoinCard = ({ coin }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300">
      <div className="flex items-center space-x-4">
        <img src={coin.image} alt={coin.name} className="w-10 h-10" />
        <div>
          <h2 className="text-xl font-semibold">{coin.name}</h2>
          <p className="text-sm text-gray-400">{coin.symbol.toUpperCase()}</p>
        </div>
      </div>
      <div className="mt-4">
        <p>💲 Price: ${coin.current_price.toLocaleString()}</p>
        <p
          className={`mt-1 ${
            coin.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {coin.price_change_percentage_24h.toFixed(2)}% in 24h
        </p>
      </div>
    </div>
  );
};

export default CoinCard;
