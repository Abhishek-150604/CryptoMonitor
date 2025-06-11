import React from "react";
import { useNavigate } from "react-router-dom";
import WatchlistButton from "./WatchlistButton";
import axios from "axios";
import { toast } from "react-toastify";

const CoinCard = ({ coin }) => {
  const navigate = useNavigate();
  const isProfit = coin.price_change_percentage_24h >= 0;

  // Export Historical Data for the Coin
  const exportHistoricalData = async (coinId) => {
    try {
      const response = await axios.get(`/api/coins/${coinId}/logs/export`);
      // Triggering download of the exported CSV file
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${coinId}_historical_data.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      toast.success("Historical data exported successfully!");
    } catch (error) {
      console.error("Error exporting historical data:", error);
      toast.error("Failed to export historical data.");
    }
  };

  return (
    <div className="bg-purple-700/30 border border-purple-500 p-5 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-center gap-4 mb-3">
        <img
          src={coin.image}
          alt={coin.name}
          className="w-12 h-12 rounded-full shadow-md"
        />
        <div>
          <h2 className="text-lg font-bold text-white">{coin.name}</h2>
          <p className="text-sm uppercase text-purple-300">{coin.symbol}</p>
        </div>
      </div>

      <div className="text-sm text-purple-200 space-y-1 mb-4">
        <p>
          💰 <span className="font-medium text-white">Price:</span>{" "}
          ₹{coin.current_price.toLocaleString()}
        </p>
        <p className={isProfit ? "text-green-400" : "text-red-400"}>
          {isProfit ? "▲" : "▼"} {coin.price_change_percentage_24h.toFixed(2)}% in 24h
        </p>
      </div>

      <div className="flex flex-col gap-2 mt-auto">
        <WatchlistButton coinId={coin.id} />
        <button
          onClick={() => navigate(`/coin/${coin.id}`)}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md text-sm font-medium"
        >
          View Chart
        </button>

        {/* Export Historical Data Button */}
        <button
          onClick={() => exportHistoricalData(coin.id)}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-md text-sm font-medium mt-3"
        >
          Export Historical Data
        </button>
      </div>
    </div>
  );
};

export default CoinCard;

