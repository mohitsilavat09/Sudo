// utils/stats.js

function toDateOnly(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function daysBetween(a, b) {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round((toDateOnly(b) - toDateOnly(a)) / oneDay);
}

function isSameDay(a, b) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

export function getStats(tasks = []) {
  const now = new Date();

  const completedDates = tasks
    .filter((t) => t.completed && t.date)
    .map((t) => new Date(t.date))
    .sort((a, b) => a - b);

  let currentStreak = 0;
  let bestStreak = 0;

  if (completedDates.length > 0) {
    currentStreak = 1;
    bestStreak = 1;

    for (let i = completedDates.length - 1; i > 0; i--) {
      const diff = daysBetween(completedDates[i - 1], completedDates[i]);

      if (diff === 1) {
        currentStreak++;
        bestStreak = Math.max(bestStreak, currentStreak);
      } else if (diff > 1) {
        break;
      }
    }

    const lastCompleted = completedDates[completedDates.length - 1];
    if (!isSameDay(lastCompleted, now) && daysBetween(lastCompleted, now) > 1) {
      currentStreak = 0;
    }
  }

  return {
    streak: {
      current: currentStreak,
      best: bestStreak,
    },
  };
}