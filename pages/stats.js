import { useEffect, useState } from "react";
import { calculateStats } from "../utils/stats";

export default function StatsPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setStats(calculateStats(tasks));
  }, []);

  if (!stats) return null;

  return (
    <div className="container">
      <h1>Statistics</h1>

      <div className="card">
        <h3>Today</h3>
        <p>Total: {stats.today.total}</p>
        <p>Completed: {stats.today.completed}</p>
        <p>Progress: {stats.today.percent}%</p>
      </div>

      <div className="card">
        <h3>Week</h3>
        <p>Total: {stats.week.total}</p>
        <p>Completed: {stats.week.completed}</p>
        <p>Progress: {stats.week.percent}%</p>
      </div>

      <div className="card">
        <h3>Month</h3>
        <p>Total: {stats.month.total}</p>
        <p>Completed: {stats.month.completed}</p>
        <p>Progress: {stats.month.percent}%</p>
      </div>

      <div className="card">
        <h3>Year</h3>
        <p>Total: {stats.year.total}</p>
        <p>Completed: {stats.year.completed}</p>
        <p>Progress: {stats.year.percent}%</p>
      </div>
    </div>
  );
}