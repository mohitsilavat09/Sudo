import { useEffect, useState } from 'react';
import { calculateStats } from '../utils/stats';
import StatsCard from '../components/StatsCard';

export default function Stats() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setStats(calculateStats(tasks));
  }, []);

  return (
    <div className="container">
      <h1>Analytics</h1>
      <StatsCard title="Today" data={stats.today} />
      <StatsCard title="Week" data={stats.week} />
      <StatsCard title="Month" data={stats.month} />
      <StatsCard title="Year" data={stats.year} />
    </div>
  );
}