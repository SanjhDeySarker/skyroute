const express = require("express");
const router = express.Router();

const {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking
} = require("../controllers/bookingController");

const protect = require("../middleware/authMiddleware");

// User Books a Flight
router.post("/", protect, createBooking);

// Get logged in user's bookings
router.get("/my", protect, getUserBookings);

// Get single booking
router.get("/:id", protect, getBookingById);

// Cancel booking
router.put("/:id/cancel", protect, cancelBooking);

module.exports = router;
