const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

// ✅ IMPORT CONTROLLERS CORRECTLY
const {
  createBooking,
  createMultiCityBooking,
  getMyBookings,
  getBoardingPass
} = require("../controllers/bookingController");

// ==========================
// ROUTES
// ==========================

// Create single-flight booking
router.post("/", protect, createBooking);

// Create multi-city booking
router.post("/multicity", protect, createMultiCityBooking);

// Get logged-in user's bookings
router.get("/my", protect, getMyBookings);

// Download boarding pass PDF
router.get("/:id/boarding-pass", protect, getBoardingPass);

module.exports = router;
