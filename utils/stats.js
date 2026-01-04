// utils/stats.js

// Helper: check same day
function isSameDay(d1, d2) {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
}

// Helper: check same week (last 7 days)
function isSameWeek(date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  return diff >= 0 && diff <= 7 * 24 * 60 * 60 * 1000;
}

// Helper: check same month
function isSameMonth(d1, d2) {
  return (
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
}

// Helper: check same year
function isSameYear(d1, d2) {
  return d1.getFullYear() === d2.getFullYear();
}

// Main stats function
export function calculateStats(tasks = []) {
  const now = new Date();

  const todayTasks = tasks.filter(
    t => t.date && isSameDay(new Date(t.date), now)
  );

  const weekTasks = tasks.filter(
    t => t.date && isSameWeek(new Date(t.date))
  );

  const monthTasks = tasks.filter(
    t => t.date && isSameMonth(new Date(t.date), now)
  );

  const yearTasks = tasks.filter(
    t => t.date && isSameYear(new Date(t.date), now)
  );

  const buildStats = (arr) => {
    const total = arr.length;
    const completed = arr.filter(t => t.done).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      total,
      completed,
      percent
    };
  };

  return {
    today: buildStats(todayTasks),
    week: buildStats(weekTasks),
    month: buildStats(monthTasks),
    year: buildStats(yearTasks)
  };
}