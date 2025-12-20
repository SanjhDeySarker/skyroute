const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Flight = require("../models/Flight");

exports.createMultiCityBooking = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { legs, amountPaid } = req.body;
    const userId = req.user._id;

    if (!legs || legs.length < 2) {
      throw new Error("Multi-city booking requires at least 2 flights");
    }

    // Validate & book seats for each leg
    for (const leg of legs) {
      const flight = await Flight.findById(leg.flight).session(session);
      if (!flight) throw new Error("Flight not found");

      // check seat availability
      const bookedSeats = flight.seats
        .filter(s => s.isBooked)
        .map(s => s.seatNumber);

      if (leg.seats.some(s => bookedSeats.includes(s))) {
        throw new Error("One or more seats already booked");
      }

      // mark seats booked
      flight.seats = flight.seats.map(s =>
        leg.seats.includes(s.seatNumber)
          ? { ...s._doc, isBooked: true }
          : s
      );

      flight.availableSeats -= leg.seats.length;
      await flight.save({ session });
    }

    // Create booking
    const booking = await Booking.create(
      [{
        user: userId,
        legs,
        amountPaid,
        status: "confirmed",
        paymentStatus: "paid"
      }],
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
