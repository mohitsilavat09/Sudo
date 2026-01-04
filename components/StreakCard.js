export default function StreakCard({ streak }) {
  if (!streak) return null;

  return (
    <div className="stats-card">
      <h3>🔥 Streaks</h3>

      <div className="stats-row">
        <span>Current Streak</span>
        <strong>{streak.current} days</strong>
      </div>

      <div className="stats-row">
        <span>Best Streak</span>
        <strong>{streak.best} days</strong>
      </div>
    </div>
  );
}