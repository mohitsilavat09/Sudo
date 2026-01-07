export function generateSchedule(prompt) {
  // Simple smart detection
  const schedule = [];

  if (prompt.toLowerCase().includes("office")) {
    schedule.push({
      title: "Office Work",
      time: "09:00",
    });
    schedule.push({
      title: "Office Work",
      time: "17:00",
    });
  }

  if (prompt.toLowerCase().includes("gym")) {
    schedule.push({
      title: "Gym Workout",
      time: "06:30",
    });
  }

  if (prompt.toLowerCase().includes("jog")) {
    schedule.push({
      title: "Morning Jogging",
      time: "06:00",
    });
  }

  if (prompt.toLowerCase().includes("family")) {
    schedule.push({
      title: "Family Time",
      time: "20:00",
    });
  }

  // Default fallback
  if (schedule.length === 0) {
    schedule.push({
      title: "Focus Work",
      time: "10:00",
    });
  }

  return schedule;
}