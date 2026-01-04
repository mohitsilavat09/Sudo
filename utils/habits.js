// utils/habits.js

/**
 * A habit is a task that repeats daily.
 * This file handles:
 * - filtering habits
 * - resetting habits daily
 * - tracking habit completion dates
 */

/**
 * Get only habit-type tasks
 */
export function getHabits(tasks = []) {
  return tasks.filter((task) => task.isHabit);
}

/**
 * Check if two dates are the same day
 */
function isSameDay(a, b) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

/**
 * Reset habits if a new day has started
 * This ensures habits can be completed again every day
 */
export function resetDailyHabits(tasks = []) {
  const today = new Date();

  return tasks.map((task) => {
    if (!task.isHabit) return task;

    if (!task.lastCompletedDate) {
      return task;
    }

    const last = new Date(task.lastCompletedDate);

    if (!isSameDay(today, last)) {
      return {
        ...task,
        completed: false,
      };
    }

    return task;
  });
}

/**
 * Mark a habit as completed for today
 */
export function completeHabit(task) {
  if (!task.isHabit) return task;

  return {
    ...task,
    completed: true,
    lastCompletedDate: new Date().toISOString(),
  };
}