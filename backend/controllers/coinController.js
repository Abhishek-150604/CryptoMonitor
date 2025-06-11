const axios = require("axios");
const User = require("../models/User");
const CryptoLog = require("../models/CryptoLog");
const { Parser } = require("json2csv");

// Add Coin to Watchlist
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

// Log Coin's Real-Time Price
const logCoinPrice = async (req, res) => {
  const { coinId } = req.body;
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=inr`;

  const { data } = await axios.get(url);
  const price = data[coinId]?.inr;
  if (!price) return res.status(404).json({ error: "Coin not found" });

  // Log coin price with timestamp
  const log = await CryptoLog.create({ userId: req.userId, coinId, price });
  res.json(log);
};

// Log Historical Data for Specific Coin
const logHistoricalData = async (req, res) => {
  const { coinId, interval } = req.body; // interval in minutes
  if (!coinId || !interval) {
    return res.status(400).json({ error: "coinId and interval are required" });
  }

  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=inr`;
  const logInterval = interval * 60 * 1000; // Convert interval to milliseconds

  // Store intervalId for future reference (to stop it later)
  const intervalId = setInterval(async () => {
    const { data } = await axios.get(url);
    const price = data[coinId]?.inr;
    if (price) {
      await CryptoLog.create({ userId: req.userId, coinId, price });
    }
  }, logInterval);

  // Store intervalId in the user model or an in-memory store for later stopping
  await User.findByIdAndUpdate(req.userId, { $set: { intervalId } });

  // Return a response confirming the logging interval
  res.json({ message: `Logging started for ${coinId} every ${interval} minutes` });
};

// Stop Logging Historical Data
const stopHistoricalLogging = async (req, res) => {
  const user = await User.findById(req.userId);
  if (user.intervalId) {
    clearInterval(user.intervalId); // Clear the interval task
    user.intervalId = null; // Remove the stored interval ID
    await user.save();
    res.json({ message: "Historical data logging stopped." });
  } else {
    res.status(400).json({ error: "No logging interval found." });
  }
};

// Export Historical Data for a Specific Coin (CSV)
const exportHistoricalData = async (req, res) => {
  const { coinId } = req.params; // Get the coinId from URL params

  // Fetch logs for the specific coin and user
  const logs = await CryptoLog.find({ userId: req.userId, coinId }).lean();
  
  if (!logs.length) {
    return res.status(404).json({ error: `No historical data found for coin ${coinId}` });
  }

  const fields = ["coinId", "price", "timestamp"];
  const parser = new Parser({ fields });
  const csv = parser.parse(logs);

  // Return the CSV file as a downloadable attachment
  res.header("Content-Type", "text/csv");
  res.attachment(`${coinId}_historical_data.csv`);
  return res.send(csv);
};

// Export Logs as JSON
const exportLogsAsJSON = async (req, res) => {
  const logs = await CryptoLog.find({ userId: req.userId }).lean();
  res.json(logs);
};

module.exports = {
  addToWatchlist,
  logCoinPrice,
  logHistoricalData,
  exportLogsAsJSON,
  exportHistoricalData,  // Export for a specific coin
  stopHistoricalLogging, // Stop logging historical data
};
