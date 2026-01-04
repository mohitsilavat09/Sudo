import { useEffect, useState } from "react";
import { getStats } from "../utils/stats";
import StreakCard from "../components/StreakCard";

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
      <StreakCard streak={stats.streak} />
    </div>
  );
}