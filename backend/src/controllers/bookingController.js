const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Flight = require("../models/Flight");

/**
 * ============================
 * CREATE SINGLE FLIGHT BOOKING
 * ============================
 * POST /api/bookings
 */
exports.createBooking = async (req, res) => {
  try {
    const { flightId, seats, passengers, amountPaid } = req.body;

    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    // Check seat availability
    const bookedSeats = flight.seats
      .filter((s) => s.isBooked)
      .map((s) => s.seatNumber);

    if (seats.some((s) => bookedSeats.includes(s))) {
      return res.status(400).json({ message: "One or more seats already booked" });
    }

    // Mark seats as booked
    flight.seats = flight.seats.map((s) =>
      seats.includes(s.seatNumber)
        ? { ...s._doc, isBooked: true }
        : s
    );

    flight.availableSeats -= seats.length;
    await flight.save();

    const booking = await Booking.create({
      user: req.user._id,
      flight: flightId,
      seats,
      passengers,
      amountPaid,
      status: "pending",
      paymentStatus: "not_paid"
    });

    res.status(201).json({ booking });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Booking failed" });
  }
};

/**
 * ============================
 * CREATE MULTI-CITY BOOKING
 * ============================
 * POST /api/bookings/multicity
 */
exports.createMultiCityBooking = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { legs, amountPaid } = req.body;

    if (!legs || legs.length < 2) {
      throw new Error("Multi-city booking requires at least 2 flights");
    }

    for (const leg of legs) {
      const flight = await Flight.findById(leg.flight).session(session);
      if (!flight) throw new Error("Flight not found");

      const bookedSeats = flight.seats
        .filter((s) => s.isBooked)
        .map((s) => s.seatNumber);

      if (leg.seats.some((s) => bookedSeats.includes(s))) {
        throw new Error("One or more seats already booked");
      }

      flight.seats = flight.seats.map((s) =>
        leg.seats.includes(s.seatNumber)
          ? { ...s._doc, isBooked: true }
          : s
      );

      flight.availableSeats -= leg.seats.length;
      await flight.save({ session });
    }

    const booking = await Booking.create(
      [
        {
          user: req.user._id,
          legs,
          amountPaid,
          paymentStatus: "paid",
          status: "confirmed"
        }
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ booking: booking[0] });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: err.message });
  }
};

/**
 * ============================
 * GET MY BOOKINGS (USER)
 * ============================
 * GET /api/bookings/my
 */
exports.getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("flight")
    .populate("legs.flight")
    .sort({ createdAt: -1 });

  res.json(bookings);
};

/**
 * ============================
 * GET ALL BOOKINGS (ADMIN)
 * ============================
 * GET /api/bookings/admin/all
 */
exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate("user", "email")
    .populate("flight")
    .populate("legs.flight")
    .sort({ createdAt: -1 });

  res.json(bookings);
};

/**
 * ============================
 * CANCEL BOOKING
 * ============================
 * PUT /api/bookings/:id/cancel
 */
exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("flight");

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  if (booking.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  booking.status = "cancelled";
  await booking.save();

  res.json({ message: "Booking cancelled" });
};

/**
 * ============================
 * MARK PAYMENT SUCCESS
 * ============================
 * POST /api/payments/:bookingId
 */
exports.markPaymentSuccess = async (req, res) => {
  const booking = await Booking.findById(req.params.bookingId)
    .populate("flight")
    .populate("legs.flight");

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  booking.paymentStatus = "paid";
  booking.status = "confirmed";
  booking.transactionId = "TXN_" + Date.now();

  await booking.save();

  res.json({ booking });
};
