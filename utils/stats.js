// utils/stats.js

export function calculateStats(tasks = []) {
  const completed = tasks.filter(t => t.done).length;
  const total = tasks.length;

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return {
    today: {
      total,
      completed,
      percent
    },
    week: {
      total,
      completed,
      percent
    },
    month: {
      total,
      completed,
      percent
    },
    year: {
      total,
      completed,
      percent
    }
  };
}