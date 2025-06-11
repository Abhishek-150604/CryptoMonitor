import React, { useEffect, useState } from "react";
import { fetchTopCoins } from "../services/cryptoApi";
import WatchlistButton from "../components/WatchlistButton";
import GainLossSimulator from "../components/GainLossSimulator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate();

  useEffect(() => {
    const getCoins = async () => {
      try {
        const data = await fetchTopCoins();
        setCoins(data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      } finally {
        setLoading(false);
      }
    };
    getCoins();
  }, []);

  // Export historical data for a specific coin
  const exportHistoricalData = async (coinId) => {
    try {
      const response = await axios.get(`/api/coins/${coinId}/logs/export`);
      
      // Check if the response contains CSV data
      if (response.status === 200 && response.data) {
        const csvContent = response.data; // Assuming the backend sends CSV content directly
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `${coinId}_historical_data.csv`);
        link.click();
      } else {
        toast.error("Failed to export historical data. No data found.");
      }
    } catch (error) {
      toast.error("Failed to export historical data.");
      console.error("Error exporting historical data:", error);
    }
  };

  // Export coins list to CSV
  const exportToCSV = (coinsData) => {
    const header = Object.keys(coinsData[0]).join(",") + "\n";
    const rows = coinsData.map((coin) => Object.values(coin).join(",")).join("\n");
    const csvContent = header + rows;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "crypto_coins.csv");
    link.click();
  };

  // Export coins list to JSON
  const exportToJSON = (coinsData) => {
    const blob = new Blob([JSON.stringify(coinsData, null, 2)], {
      type: "application/json;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "crypto_coins.json");
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center tracking-wide">
          Top Cryptocurrencies
        </h1>

        {/* Coins Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Shimmer Effect for Loading */}
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-purple-700/30 border border-purple-500 rounded-2xl p-5 shadow-md animate-pulse"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full" />
                  <div className="w-full h-6 bg-gray-300 rounded-md" />
                </div>
                <div className="space-y-2">
                  <div className="w-full h-6 bg-gray-300 rounded-md" />
                  <div className="w-full h-8 bg-gray-300 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coins.map((coin) => (
              <div
                key={coin.id}
                className="bg-purple-700/40 border border-purple-500 rounded-2xl p-5 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-12 h-12 rounded-full shadow-md"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{coin.name}</h2>
                    <p className="text-purple-200 text-sm">₹{coin.current_price.toLocaleString()}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <WatchlistButton coinId={coin.id} />
                  <button
                    onClick={() => navigate(`/coin/${coin.id}`)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md text-sm font-medium transition"
                  >
                    View Chart
                  </button>

                  {/* Export Historical Data Button */}
                  <button
                    onClick={() => exportHistoricalData(coin.id)}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-md text-sm font-medium transition"
                  >
                    Export Historical Data
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Export Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <button
            onClick={() => exportToCSV(coins)}
            className="bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-lg font-medium transition"
          >
            Export to CSV
          </button>
          <button
            onClick={() => exportToJSON(coins)}
            className="bg-emerald-500 hover:bg-emerald-600 px-6 py-2 rounded-lg font-medium transition"
          >
            Export to JSON
          </button>
        </div>

        {/* Gain/Loss Simulator */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-center">Gain/Loss Simulator</h2>
          <GainLossSimulator />
        </div>
      </div>
    </div>
  );
};

export default Home;

