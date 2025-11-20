const express = require("express");
const router = express.Router();

const {
  addFlight,
  getAllFlights,
  searchFlights,
  getFlightById,
  updateFlight,
  deleteFlight
} = require("../controllers/flightController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/roleMiddleware");
