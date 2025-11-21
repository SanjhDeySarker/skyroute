const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  gender: String
}, { _id: false });

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
    required: true
  },

  passengers: [passengerSchema],

  seats: [
    {
      type: String,
      required: true
    }
  ],

  amountPaid: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "confirmed"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
