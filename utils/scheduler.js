export function autoSchedule(tasks) {
  return tasks.sort((a, b) => a.priority > b.priority ? -1 : 1);
}