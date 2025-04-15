const axios = require("axios");
const User = require("../models/User");
const CryptoLog = require("../models/CryptoLog");
const { Parser } = require("json2csv");

const addToWatchlist = async (req, res) => {
  const { coinId } = req.body;
  if (!coinId) return res.status(400).json({ error: "coinId is required" });

  const user = await User.findById(req.userId);
  if (!user.watchlist.includes(coinId)) {
    user.watchlist.push(coinId);
    await user.save();
  }
  res.json({ watchlist: user.watchlist });
};

const logCoinPrice = async (req, res) => {
  const { coinId } = req.body;
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=inr`;

  const { data } = await axios.get(url);
  const price = data[coinId]?.inr;
  if (!price) return res.status(404).json({ error: "Coin not found" });

  const log = await CryptoLog.create({ userId: req.userId, coinId, price });
  res.json(log);
};

const exportLogs = async (req, res) => {
  const logs = await CryptoLog.find({ userId: req.userId }).lean();
  const fields = ["coinId", "price", "timestamp"];
  const parser = new Parser({ fields });
  const csv = parser.parse(logs);

  res.header("Content-Type", "text/csv");
  res.attachment("crypto_logs.csv");
  return res.send(csv);
};

module.exports = {
  addToWatchlist,
  logCoinPrice,
  exportLogs,
};