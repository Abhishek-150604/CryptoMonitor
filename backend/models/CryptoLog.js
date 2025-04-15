// 📁 backend/models/CryptoLog.js
const mongoose = require("mongoose");

const cryptoLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  coinId: String,
  price: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CryptoLog", cryptoLogSchema);