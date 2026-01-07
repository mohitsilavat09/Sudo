// Ask notification permission
export async function requestPermission() {
  if (!("Notification" in window)) return false;

  if (Notification.permission === "granted") return true;

  const permission = await Notification.requestPermission();
  return permission === "granted";
}

// Schedule notification
export function scheduleNotification(task) {
  if (!("Notification" in window)) return;

  if (Notification.permission !== "granted") return;

  const taskTime = new Date(`${task.date}T${task.time}`);
  const delay = taskTime.getTime() - Date.now();

  if (delay <= 0) return;

  setTimeout(() => {
    new Notification("⏰ Task Reminder", {
      body: task.title,
      icon: "/icon-192.png",
    });
  }, delay);
}