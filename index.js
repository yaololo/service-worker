const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path"); //static path for client side

const app = express();

//Ser static path
app.use;
express.static(path.join(__dirname, "client"));

app.use(bodyParser.json());
const publicVipadKey =
  "BMrWtwDpjo-SjqXbjD4Xsl3qX1x1VGqGJrcDf3qFTHfoiDC9_yElaSamq-ZYekp0POyFLOMYCxziMySqo7y_e5k";
const privateVipadKey = "QXezTA8k2sMDRFo2_0ES9sxyCxMcM119gHfEpwpB6PY";
// if you want to deploy them, you can put them in environment file as env variable

//keys are used to identify who's sending the notification.
webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVipadKey,
  privateVipadKey
);

//subscribe Route
app.post("/subscribe", (req, res) => {
  //get pushSubscription Object
  const subscription = req.body;

  // send 201 -resource created
  res.status(201).json({});

  // create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // pash the objuect into the sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(error => console.error(error));
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
