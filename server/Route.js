const router = require("express").Router();
const Subscriptions = require("./model/Subscriptions");
const Collections = require("./model/SubscriptionCollection");
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
function setValue(subscriptionDetails, req) {
  console.log(req);
  subscriptionDetails.endpoint = req.endpoint;
  console.log(req.endpoint);
  subscriptionDetails.keys.p256dh = req.keys.p256dh;
  console.log(req.keys.p256dh);
  subscriptionDetails.keys.auth = req.keys.auth;
  console.log(req.keys.auth);
}

router.post("/register", async function(req, res) {
  try {
    console.log("log something");
    let subscription = new Subscriptions();
    setValue(subscription, req.body);
    let collections = new Collections();
    collections.subscriptionDetails = subscription;
    await collections.save();
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
    // const payload = JSON.stringify({ title: "Push Test" });
    let collections = await Collections.findOne({ name: "OnlyOne" });

    console.log(collections.subscriptionDetails);
    res.send({ msg: subscription.subscriptionDetails });
    const payload = JSON.stringify({ title: "Push Test" });
    let array = subscription.subscriptionDetails;
    // console.log(array);
    // webpush
    //   .sendNotification(subscription, payload)
    //   .catch(error => console.error(error));
    if (subscription !== null) {
      for (let i = 0; i < array.length; i++) {
        console.log(array[i]);
      }
    } else {
      return res.send({ msg: "there is no subscription" });
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/get", async function(req, res) {
  try {
    let subscription = await Subscription.findOne({ name: "OnlyOne" });
    return res.send({
      msg: `${subscription.subscriptionDetails} are returned`
    });
  } catch (error) {
    return res.send({ msg: `there is an error ${Error(error)}` });
  }
});
module.exports = router;
