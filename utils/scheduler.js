// utils/scheduler.js

export function shouldRunToday(task) {
  if (!task.repeatDays || task.repeatDays.length === 0) return true;

  const today = new Date().getDay(); // 0 = Sunday
  return task.repeatDays.includes(today);
}

export function isTimeMatch(task) {
  const now = new Date();
  const taskTime = new Date(task.date);

  return (
    now.getHours() === taskTime.getHours() &&
    now.getMinutes() === taskTime.getMinutes()
  );
}