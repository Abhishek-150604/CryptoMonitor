import React, { useEffect, useState } from "react";

const WatchlistButton = ({ coinId }) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("watchlist")) || [];
    setIsInWatchlist(stored.includes(coinId));
  }, [coinId]);

  const toggleWatchlist = () => {
    const stored = JSON.parse(localStorage.getItem("watchlist")) || [];
    let updated;

    if (stored.includes(coinId)) {
      updated = stored.filter(id => id !== coinId);
    } else {
      updated = [...stored, coinId];
    }

    localStorage.setItem("watchlist", JSON.stringify(updated));
    setIsInWatchlist(updated.includes(coinId));
  };

  return (
    <button
      onClick={toggleWatchlist}
      className={`px-3 py-1 rounded-full text-sm font-semibold ${
        isInWatchlist ? "bg-red-500" : "bg-green-600"
      } text-white hover:opacity-80`}
    >
      {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
    </button>
  );
};

export default WatchlistButton;

