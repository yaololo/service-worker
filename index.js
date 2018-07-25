const express = require("express");
const bodyParser = require("body-parser");
const path = require("path"); //static path for client side
const router = require("./server/Route");
const mongoose = require("mongoose");

const app = express();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}
//Ser static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

app.use("/", router);

mongoose.connect(
  process.env.MONGODB_URI,
  function(err) {
    if (err) throw err;
    console.log("db connected successfully");

    const server = app.listen(process.env.PORT || 3000, () => {
      console.log(`Listening on port ${server.address().port}...`);
    });
  }
);
