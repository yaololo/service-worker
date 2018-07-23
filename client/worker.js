console.log("Service Worker Loaded");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("push received...");
  self.registration.showNotification(data.title, {
    body: "Notified by somehting",
    icon:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2000px-YouTube_full-color_icon_%282017%29.svg.png"
  });
});
