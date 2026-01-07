export function autoSchedule(tasks) {
  if (!tasks || tasks.length === 0) return [];

  let hour = 9;

  return tasks.map((task) => {
    const scheduledTask = {
      ...task,
      time: `${hour}:00`,
    };
    hour++;
    return scheduledTask;
  });
}