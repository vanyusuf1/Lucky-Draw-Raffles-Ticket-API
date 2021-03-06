const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  reward: {
    type: String,
    required: true,
  },
  participants: {
    type: [String],
    required: false,
  },
  winner: {
    type: String,
    required: false,
    default: null,
  },
});

module.exports = mongoose.model("RaffleEvent", eventSchema);
