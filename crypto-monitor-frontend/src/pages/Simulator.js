import React, { useEffect, useState } from "react";
import { fetchTopCoins } from "../services/cryptoApi";

const Simulator = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [currentPrice, setCurrentPrice] = useState(null);

  useEffect(() => {
    const getCoins = async () => {
      const data = await fetchTopCoins();
      setCoins(data);
    };
    getCoins();
  }, []);

  useEffect(() => {
    if (selectedCoin) {
      const coin = coins.find((c) => c.id === selectedCoin);
      setCurrentPrice(coin?.current_price || null);
    }
  }, [selectedCoin, coins]);

  const calculateGainLoss = () => {
    if (!quantity || !buyPrice || !currentPrice) return null;
    const investment = quantity * buyPrice;
    const currentValue = quantity * currentPrice;
    const profitLoss = currentValue - investment;
    const percentage = ((profitLoss / investment) * 100).toFixed(2);
    return { profitLoss: profitLoss.toFixed(2), percentage };
  };

  const result = calculateGainLoss();

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded-2xl">
      <h2 className="text-2xl font-semibold mb-6 text-purple-600">Gain/Loss Simulator</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-1 font-medium">Select Coin</label>
          <select
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Choose a coin --</option>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g., 1.5"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Buy Price (INR)</label>
          <input
            type="number"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g., 25000"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Current Price (USD)</label>
          <input
            type="number"
            value={currentPrice || ""}
            disabled
            className="w-full p-2 border rounded bg-gray-100 text-gray-600"
          />
        </div>
      </div>

      {result && (
        <div className="mt-6 p-4 rounded-xl bg-purple-50 border border-purple-200">
          <h3 className="text-lg font-medium mb-2 text-purple-700">Result:</h3>
          <p>
            Profit/Loss:{" "}
            <span className={`font-semibold ${result.profitLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
              ${result.profitLoss}
            </span>
          </p>
          <p>
            Change:{" "}
            <span className={`font-semibold ${result.percentage >= 0 ? "text-green-600" : "text-red-600"}`}>
              {result.percentage}%
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Simulator;

