module.exports = `const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  res.send("API Running...");
});

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

router.get("/status", async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;

    const dbStatus =
      dbState === 1 ? "connected" : "disconnected";

    res.status(200).json({
      success: true,
      server: "running",
      database: dbStatus,
      uptime: Math.floor(process.uptime()) + " sec",
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

module.exports = router;
`;