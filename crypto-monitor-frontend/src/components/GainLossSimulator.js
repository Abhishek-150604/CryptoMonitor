import React, { useEffect, useState } from "react";
import { fetchTopCoins } from "../services/cryptoApi";

const GainLossSimulator = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const loadCoins = async () => {
      const data = await fetchTopCoins();
      setCoins(data);
    };
    loadCoins();
  }, []);

  const calculate = () => {
    const coin = coins.find((c) => c.id === selectedCoin);
    if (!coin) return;

    const currentPrice = coin.current_price;
    const costPrice = parseFloat(purchasePrice);
    const qty = parseFloat(quantity);
    const investment = costPrice * qty;
    const currentValue = currentPrice * qty;
    const profit = currentValue - investment;
    const percent = ((profit / investment) * 100).toFixed(2);

    setResult({
      investment,
      currentValue,
      profit,
      percent,
      currentPrice,
    });
  };

  return (
    <div className="p-4 bg-gray-900 rounded-xl shadow-lg mt-6">
      <h2 className="text-xl font-bold mb-4 text-white">💹 Gain/Loss Simulator</h2>

      <div className="mb-3">
        <label className="block text-sm text-white">Select Coin:</label>
        <select
          className="w-full p-2 rounded bg-gray-800 text-white"
          value={selectedCoin}
          onChange={(e) => setSelectedCoin(e.target.value)}
        >
          <option value="">-- Select --</option>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-sm text-white">Quantity Bought:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
          placeholder="E.g. 1.5"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm text-white">Your Purchase Price:</label>
        <input
          type="number"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
          placeholder="E.g. 28000"
        />
      </div>

      <button
        onClick={calculate}
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl"
      >
        Calculate
      </button>

      {result && (
        <div className="mt-4 text-white bg-gray-800 p-4 rounded-xl">
          <p>📊 Current Price: ${result.currentPrice}</p>
          <p>💰 Investment: ${result.investment.toFixed(2)}</p>
          <p>💼 Current Value: ${result.currentValue.toFixed(2)}</p>
          <p
            className={
              result.profit >= 0 ? "text-green-400" : "text-red-400"
            }
          >
            {result.profit >= 0 ? "Profit" : "Loss"}: ${result.profit.toFixed(2)} ({result.percent}%)
          </p>
        </div>
      )}
    </div>
  );
};

export default GainLossSimulator;
