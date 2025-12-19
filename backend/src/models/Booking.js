const mongoose = require("mongoose");

/**
 * Passenger Schema
 */
const passengerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: Number,
    gender: String
  },
  { _id: false }
);

/**
 * Booking Schema
 */
const bookingSchema = new mongoose.Schema(
  {
    // ======================
    // USER
    // ======================
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // ======================
    // SINGLE FLIGHT BOOKING (legacy / simple)
    // ======================
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight"
    },

    seats: [String],

    passengers: [passengerSchema],

    // ======================
    // MULTI-CITY / ROUND-TRIP
    // ======================
    legs: [
      {
        flight: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Flight",
          required: true
        },
        seats: [String],
        passengers: [passengerSchema]
      }
    ],

    // ======================
    // PAYMENT
    // ======================
    amountPaid: {
      type: Number,
      required: true
    },

    paymentStatus: {
      type: String,
      enum: ["not_paid", "paid", "failed"],
      default: "not_paid"
    },

    transactionId: {
      type: String
    },

    // ======================
    // BOOKING STATUS
    // ======================
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending"
    },

    // ======================
    // TIMESTAMPS
    // ======================
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
