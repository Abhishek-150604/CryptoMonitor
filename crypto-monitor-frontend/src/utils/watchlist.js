// src/utils/watchlist.js

const WATCHLIST_KEY = "crypto_watchlist";

export const getWatchlist = () => {
  const list = localStorage.getItem(WATCHLIST_KEY);
  return list ? JSON.parse(list) : [];
};

export const addToWatchlist = (coinId) => {
  const list = getWatchlist();
  if (!list.includes(coinId)) {
    list.push(coinId);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
  }
};

export const removeFromWatchlist = (coinId) => {
  const list = getWatchlist().filter(id => id !== coinId);
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
};

export const isCoinInWatchlist = (coinId) => {
  return getWatchlist().includes(coinId);
};
