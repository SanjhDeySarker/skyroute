const Booking = require("../models/Booking");
const Flight = require("../models/Flight");

// Create Booking
exports.createBooking = async (req, res) => {
  try {
    const { flightId, passengers, seats, amountPaid } = req.body;

    const flight = await Flight.findById(flightId);
    if (!flight) return res.status(404).json({ message: "Flight not found" });

    // Check seat availability
    const bookedSeats = flight.seats
      .filter(s => s.isBooked)
      .map(s => s.seatNumber);

    const conflict = seats.some(seat => bookedSeats.includes(seat));

    if (conflict) {
      return res.status(400).json({ message: "Some seats are already booked" });
    }

    // Mark seats as booked
    flight.seats = flight.seats.map(seat => {
      if (seats.includes(seat.seatNumber)) {
        return { ...seat._doc, isBooked: true };
      }
      return seat;
    });

    await flight.save();

    // Create booking
    const booking = await Booking.create({
      user: req.user._id,
      flight: flightId,
      passengers,
      seats,
      amountPaid
    });

    res.json({
      message: "Booking successful",
      booking
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating booking",
      error: error.message
    });
  }
};

// Get all bookings of a user
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("flight")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("flight")
      .populate("user");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking", error });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled", booking });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling booking", error });
  }
};
