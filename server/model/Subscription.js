const mongoose = require("mongoose");

const subscriptionSchema = mongoose.Schema({
  subscription: {},
  created: {
    type: Date,
    default: Date.now
  }
});
