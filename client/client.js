const publicVipadKey =
  "BMrWtwDpjo-SjqXbjD4Xsl3qX1x1VGqGJrcDf3qFTHfoiDC9_yElaSamq-ZYekp0POyFLOMYCxziMySqo7y_e5k";

// check for server workers

if ("serviceWorker" in navigator) {
  send().catch(err => console.error(err));
}

// register the service worker abd register push and send push
async function send() {
  // register service worker
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("./worker.js", {
    scope: "/"
  });
  console.log("Service worker registered ...");

  //register push
  console.log("Registering Push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVipadKey)
  });
  console.log("push registered");

  //send push notification
  console.log("sending");

  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });
  console.log("push sent...");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
