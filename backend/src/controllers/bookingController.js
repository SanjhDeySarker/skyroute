const Booking = require("../models/Booking");
const Flight = require("../models/Flight");
const { generateBoardingPass } = require("../services/pdfService");

// ==========================
// CREATE SINGLE BOOKING
// ==========================
exports.createBooking = async (req, res) => {
  try {
    const { flightId, seats, passengers, amountPaid } = req.body;

    const booking = await Booking.create({
      user: req.user._id,
      flight: flightId,
      seats,
      passengers,
      amountPaid,
      paymentStatus: "paid",
      status: "confirmed"
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==========================
// CREATE MULTI-CITY BOOKING
// ==========================
exports.createMultiCityBooking = async (req, res) => {
  try {
    const { legs, amountPaid } = req.body;

    const booking = await Booking.create({
      user: req.user._id,
      legs,
      amountPaid,
      paymentStatus: "paid",
      status: "confirmed"
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==========================
// GET MY BOOKINGS
// ==========================
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("flight")
      .populate("legs.flight");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==========================
// DOWNLOAD BOARDING PASS
// ==========================
exports.getBoardingPass = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("flight")
      .populate("legs.flight");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const filePath = await generateBoardingPass(booking);
    res.download(filePath);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
