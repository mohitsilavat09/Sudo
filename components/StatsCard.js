export default function StatsCard({ title, data }) {
  if (!data) return null;

  return (
    <div className="card">
      <h3>{title}</h3>
      <p>Total: {data.total}</p>
      <p>Completed: {data.completed}</p>
      <p>Progress: {data.percent}%</p>
    </div>
  );
}