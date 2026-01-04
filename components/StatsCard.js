export default function StatsCard({ title, data }) {
  if (!data) return null;

  return (
    <div className="stats-card">
      <h3>{title}</h3>

      <div className="stats-row">
        <span>Total</span>
        <strong>{data.totalTasks}</strong>
      </div>

      <div className="stats-row">
        <span>Completed</span>
        <strong>{data.completedTasks}</strong>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${data.completionRate}%` }}
        />
      </div>

      <small>{data.completionRate}% done</small>
    </div>
  );
}