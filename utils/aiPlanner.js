// utils/aiPlanner.js

export function generateSchedule(tasks) {
  const startHour = 9;
  let hour = startHour;

  return tasks.map(task => {
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(0);

    hour += 1;

    return {
      ...task,
      date: date.toISOString(),
      aiPlanned: true
    };
  });
}