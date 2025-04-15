const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  addToWatchlist,
  logCoinPrice,
  exportLogs,
} = require("../controllers/coinController");

router.post("/watchlist", authMiddleware, addToWatchlist);
router.post("/log", authMiddleware, logCoinPrice);
router.get("/logs/export", authMiddleware, exportLogs);

module.exports = router;


