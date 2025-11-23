const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import Routes
const authRoutes = require("./routes/authRoutes");
const flightRoutes = require("./routes/flightRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("SkyRoute Backend Running...");
});

module.exports = app;
