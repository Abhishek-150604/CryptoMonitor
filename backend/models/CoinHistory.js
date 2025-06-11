// models/CoinHistory.js
const mongoose = require('mongoose');

const coinHistorySchema = new mongoose.Schema(
  {
    coinId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const CoinHistory = mongoose.model('CoinHistory', coinHistorySchema);

module.exports = CoinHistory;
