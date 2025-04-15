import React, { useEffect, useState } from "react";
import { fetchTopCoins } from "../services/cryptoApi";
import WatchlistButton from "../components/WatchlistButton";

const Watchlist = () => {
  const [coins, setCoins] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedList);

    const loadData = async () => {
      try {
        const allData = await fetchTopCoins();
        const filteredData = allData.filter((coin) =>
          storedList.includes(coin.id)
        );
        setCoins(filteredData);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Watchlist</h2>
      {coins.length === 0 ? (
        <p className="text-gray-400">Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {coins.map((coin) => (
            <div
              key={coin.id}
              className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-lg font-semibold mb-2">{coin.name}</h3>
              <p className="text-sm text-gray-400">Symbol: {coin.symbol}</p>
              <p className="text-sm text-green-400">Price: ₹{coin.current_price}</p>
              <WatchlistButton coinId={coin.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;

