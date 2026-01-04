// pages/index.js

import { useEffect, useState } from "react";
import { shouldRunToday, isTimeMatch } from "../utils/scheduler";
import { notify, requestPermission } from "../utils/notification";
import { autoSchedule } from "../utils/aiPlanner";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  // Load tasks
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
    requestPermission();
  }, []);

  // Scheduler loop (every minute)
  useEffect(() => {
    const timer = setInterval(() => {
      const stored = JSON.parse(localStorage.getItem("tasks")) || [];

      stored.forEach((task) => {
        if (
          !task.completed &&
          shouldRunToday(task) &&
          isTimeMatch(task)
        ) {
          notify(task.title);
        }
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Auto-planner
  const runAIPlanner = () => {
    const planned = autoSchedule(tasks);
    localStorage.setItem("tasks", JSON.stringify(planned));
    setTasks(planned);
  };

  return (
    <div style={{ padding: 20, color: "white" }}>
      <h1>Taskzen</h1>

      <button onClick={runAIPlanner}>
        Auto Schedule (AI)
      </button>

      {tasks.map((task, i) => (
        <div key={i} style={{ marginTop: 15 }}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => {
              const updated = [...tasks];
              updated[i].completed = !updated[i].completed;
              setTasks(updated);
              localStorage.setItem("tasks", JSON.stringify(updated));
            }}
          />
          <span style={{ marginLeft: 10 }}>
            {task.title}
          </span>
          <div style={{ opacity: 0.7 }}>
            {task.date && new Date(task.date).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}