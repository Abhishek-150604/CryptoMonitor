const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  addToWatchlist,
  logCoinPrice,
  logHistoricalData,
  exportLogsAsJSON,
  exportHistoricalData,
  stopHistoricalLogging,
} = require("../controllers/coinController");

// Protected routes with auth middleware
router.post("/watchlist", authMiddleware, addToWatchlist);
router.post("/log", authMiddleware, logCoinPrice);
router.post("/log/historical", authMiddleware, logHistoricalData);  // Start logging historical data
router.post("/log/historical/stop", authMiddleware, stopHistoricalLogging);  // Stop logging historical data
router.get("/logs/export/json", authMiddleware, exportLogsAsJSON);  // Export all logs as JSON
router.get("/:coinId/logs/export", authMiddleware, exportHistoricalData);  // Export specific coin logs as CSV

module.exports = router;


