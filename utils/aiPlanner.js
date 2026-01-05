// utils/aiPlanner.js

export function autoSchedule(tasks = []) {
  let hour = 9;

  return tasks.map((task) => {
    if (task.date) return task;

    const date = new Date();
    date.setHours(hour);
    date.setMinutes(0);
    date.setSeconds(0);

    hour++;
    if (hour > 18) hour = 9;

    return {
      ...task,
      date: date.toISOString(),
      aiPlanned: true,
    };
  });
}