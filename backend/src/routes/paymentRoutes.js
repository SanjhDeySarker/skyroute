const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const { processPayment } = require("../controllers/paymentController");

// User pays for booking
router.post("/:bookingId", protect, processPayment);

module.exports = router;
