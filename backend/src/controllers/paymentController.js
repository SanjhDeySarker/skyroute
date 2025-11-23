const Booking = require("../models/Booking");

// Mock payment handler
exports.processPayment = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Simulate payment success
    const fakeTransactionId = "TXN_" + Math.random().toString(36).substr(2, 9);

    booking.paymentStatus = "paid";
    booking.transactionId = fakeTransactionId;
    booking.status = "confirmed";

    await booking.save();

    res.json({
      message: "Payment successful",
      transactionId: fakeTransactionId,
      booking
    });

  } catch (error) {
    res.status(500).json({ message: "Payment failed", error });
  }
};
