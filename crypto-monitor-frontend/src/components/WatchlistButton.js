import React, { useState } from "react";

const WatchlistButton = ({ coinId }) => {
  const [watchlist, setWatchlist] = useState(
    JSON.parse(localStorage.getItem("watchlist")) || []
  );

  const isInWatchlist = watchlist.includes(coinId);

  const toggleWatchlist = () => {
    let updated;
    if (isInWatchlist) {
      updated = watchlist.filter(id => id !== coinId);
    } else {
      updated = [...watchlist, coinId];
    }
    localStorage.setItem("watchlist", JSON.stringify(updated));
    setWatchlist(updated);
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

