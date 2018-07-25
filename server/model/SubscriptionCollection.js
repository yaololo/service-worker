const mongoose = require("mongoose");

const subscriptionSchema = mongoose.Schema({
  name: String,
  subscriptionDetails: [
    {
      id: Number,
      subscription: {
        endpoint: String,
        expirationTime: {
          type: String,
          defualt: null
        },
        keys: {
          p256dh: String,
          auth: String
        }
      }
    }
  ],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("SubscriptionCollection", subscriptionSchema);
