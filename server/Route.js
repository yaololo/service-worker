const router = require("express").Router();
const webpush = require("web-push");

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
let subscription = [];
router.post("/register", async function(req, res) {
  try {
    let request = req.body;
    subscription.push(request);
    // console.log(subscription);
    res.send({ msg: "received" });
  } catch (error) {
    console.error(error);
  }
});

router.use("/pushnotification", async function(req, res) {
  try {
    const payload = JSON.stringify({ title: "Push Test" });
    console.log(subscription[0]);
    webpush
      .sendNotification(subscription[0], payload)
      .catch(error => console.error(error));
    res.send({ msg: "received" });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
