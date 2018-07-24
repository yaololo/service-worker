const express = require("express");
const bodyParser = require("body-parser");
const path = require("path"); //static path for client side
const router = require("./server/Route");

const app = express();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}
//Ser static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

app.use("/", router);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}...`);
});
