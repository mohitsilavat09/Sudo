// utils/stats.js

function isSameDay(a, b) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

function isSameWeek(date) {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay());
  return date >= start;
}

function isSameMonth(date) {
  const now = new Date();
  return (
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

function isSameYear(date) {
  return date.getFullYear() === new Date().getFullYear();
}

export function getStats(tasks = []) {
  const now = new Date();

  const filterStats = (filterFn) => {
    const filtered = tasks.filter(
      (t) => t.date && filterFn(new Date(t.date))
    );
    const completed = filtered.filter((t) => t.completed).length;

    return {
      totalTasks: filtered.length,
      completedTasks: completed,
      completionRate:
        filtered.length === 0
          ? 0
          : Math.round((completed / filtered.length) * 100),
    };
  };

  return {
    today: filterStats((d) => isSameDay(d, now)),
    week: filterStats(isSameWeek),
    month: filterStats(isSameMonth),
    year: filterStats(isSameYear),
  };
}