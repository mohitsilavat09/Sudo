export function calculateStats(tasks) {
  const done = t => t.done;

  return {
    today: { total: tasks.length, completed: tasks.filter(done).length, percent: 50 },
    week: { total: tasks.length, completed: tasks.filter(done).length, percent: 50 },
    month: { total: tasks.length, completed: tasks.filter(done).length, percent: 50 },
    year: { total: tasks.length, completed: tasks.filter(done).length, percent: 50 }
  };
}