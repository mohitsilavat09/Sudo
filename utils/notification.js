// utils/notification.js

export function notify(title) {
  if (typeof window === "undefined") return;

  if (Notification.permission === "granted") {
    new Notification("Taskzen Reminder", {
      body: title,
    });
  }
}

export function requestPermission() {
  if (typeof window === "undefined") return;

  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}