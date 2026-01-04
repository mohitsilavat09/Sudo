export default function StatsCard({ title, data }) {
  if (!data) return null;

  return (
    <div className="card">
      <h3>{title}</h3>

      <p>Total Tasks: {data.totalTasks}</p>
      <p>Completed Tasks: {data.completedTasks}</p>

      {data.todayTotal !== undefined && (
        <p>
          Today: {data.todayCompleted} / {data.todayTotal}
        </p>
      )}

      <p>Progress: {data.completionRate}%</p>
    </div>
  );
}