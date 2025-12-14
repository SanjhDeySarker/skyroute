const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  roomId: String, // e.g., "support:userId" or booking-specific
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  toAdmin: { type: Boolean, default: false },
  message: String,
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});
module.exports = mongoose.model("ChatMessage", chatSchema);
