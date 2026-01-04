import { useEffect, useState } from "react";
import { getStats } from "../utils/stats";
import StatsCard from "../components/StatsCard";

export default function StatsPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setStats(getStats(tasks));
  }, []);

  if (!stats) return null;

  return (
    <div className="stats-page">
      <h1>Your Progress</h1>

      <StatsCard title="Today" data={stats.today} />
      <StatsCard title="This Week" data={stats.week} />
      <StatsCard title="This Month" data={stats.month} />
      <StatsCard title="This Year" data={stats.year} />
    </div>
  );
}