const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const flightRoutes = require("./routes/flightRoutes");  

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/flights", flightRoutes);  

app.get("/", (req, res) => {
  res.send("SkyRoute Backend Running...");
});

module.exports = app;   
