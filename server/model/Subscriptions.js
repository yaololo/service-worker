const mongoose = require("mongoose");

const subsciptions = mongoose.Schema({
  endpoint: String,
  expirationTime: {
    type: String,
    defualt: null
  },
  keys: {
    p256dh: String,
    auth: String
  }
});

module.exports = mongoose.model("Collections", subsciptions);
