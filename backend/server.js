// 📁 backend/server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const coinRoutes = require("./routes/coinRoutes");

const app = express();
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/coins", coinRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("Crypto Monitoring API running...");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server running on port " + process.env.PORT)
    );
  })
  .catch((err) => console.error("DB connection error:", err));