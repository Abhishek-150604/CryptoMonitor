// src/services/cryptoApi.js

import axios from 'axios';

export const fetchTopCoins = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'inr',
        order: 'market_cap_desc',
        per_page: 21,  // You can change this to the number of coins you want
        page: 1,
      },
    });
    return response.data; // Return the coin data
  } catch (error) {
    console.error("Error fetching coins data:", error);
    return [];
  }
};


