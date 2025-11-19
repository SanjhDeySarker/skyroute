const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true },
  isBooked: { type: Boolean, default: false }
}, { _id: false });

const flightSchema = new mongoose.Schema({
  airline: { type: String, required: true },
  flightNumber: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },

  basePrice: { type: Number, required: true },

  seats: [seatSchema],  // simple seat map structure

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Flight", flightSchema);
