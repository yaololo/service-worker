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

let collections = [];
// function setValue(subscriptionDetails, req) {
//   console.log(req);
//   subscriptionDetails.endpoint = req.endpoint;
//   console.log(req.endpoint);
//   subscriptionDetails.keys.p256dh = req.keys.p256dh;
//   console.log(req.keys.p256dh);
//   subscriptionDetails.keys.auth = req.keys.auth;
//   console.log(req.keys.auth);
// }

router.post("/register", async function(req, res) {
  try {
    collections.push(req.body);
    console.log(collections);
    return res.status(200).send(
      JSON.stringify({
        msg: "subscription is saved"
      })
    );
  } catch (error) {
    console.error(error);
  }
});

router.use("/pushnotification", async function(req, res) {
  try {
    const payload = JSON.stringify({ title: "Push Test" });
    for (i in collections) {
      console.log(collections[i]);
      webpush
        .sendNotification(collections[i], payload)
        .catch(error => console.error(error));
    }
    return res.send({ msg: "alert pushed" });
  } catch (error) {
    console.error(error);
  }
});

router.get("/get", async function(req, res) {
  try {
    return res.send({
      msg: `${collections} are returned`
    });
  } catch (error) {
    return res.send({ msg: `there is an error ${Error(error)}` });
  }
});
module.exports = router;
