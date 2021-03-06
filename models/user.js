const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  luckydrawCoupons: {
    type: Number,
    required: false,
    default: 0,
    max:5
  },
});

module.exports = mongoose.model("User", userSchema);
