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

// Admin Routes
router.post("/", protect, admin, addFlight);
router.put("/:id", protect, admin, updateFlight);
router.delete("/:id", protect, admin, deleteFlight);

// Public Routes
router.get("/", getAllFlights);
router.get("/search", searchFlights);
router.get("/:id", getFlightById);

module.exports = router;
