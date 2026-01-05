import { useState } from "react";
import { autoSchedule } from "../utils/aiPlanner";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");

  const addTask = () => {
    if (!taskName) return;
    setTasks([...tasks, { name: taskName }]);
    setTaskName("");
    setShowForm(false);
  };

  const runAIScheduler = () => {
    const scheduled = autoSchedule(tasks);
    setTasks(scheduled);
  };

  return (
    <div className="container">
      <h1>Taskzen</h1>

      {tasks.length === 0 && <p>No tasks yet</p>}

      {tasks.map((t, i) => (
        <div key={i} className="task">{t.name}</div>
      ))}

      {/* ➕ BUTTON */}
      {!showForm && (
        <button className="fab" onClick={() => setShowForm(true)}>
          +
        </button>
      )}

      {/* ADD TASK FORM */}
      {showForm && (
        <div className="form">
          <input
            placeholder="Task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />

          <button onClick={addTask}>Add Task</button>

          <button onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      )}

      {/* AI BUTTON */}
      {tasks.length > 0 && (
        <button className="ai-btn" onClick={runAIScheduler}>
          Auto Schedule (AI)
        </button>
      )}
    </div>
  );
}