import { useState } from "react";
import { autoSchedule } from "../utils/aiPlanner";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [showForm, setShowForm] = useState(false);

  const addTask = () => {
    if (!taskName.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        name: taskName,
        date: new Date().toISOString().split("T")[0],
        time: "",
        done: false,
      },
    ]);

    setTaskName("");
    setShowForm(false);
  };

  const toggleDone = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleAutoSchedule = () => {
    setTasks(autoSchedule(tasks));
  };

  return (
    <div className="container">
      <h1 className="title">Taskzen</h1>

      {tasks.length === 0 && (
        <p className="empty">No tasks yet</p>
      )}

      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-card" key={task.id}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleDone(task.id)}
            />
            <span className={task.done ? "done" : ""}>
              {task.name}
              <small>
                {task.date} {task.time && `• ${task.time}`}
              </small>
            </span>
            <button
              className="delete"
              onClick={() => deleteTask(task.id)}
            >
              🗑
            </button>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="form">
          <input
            type="text"
            placeholder="Task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />

          <button onClick={addTask}>Add Task</button>
          <button className="cancel" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </div>
      )}

      <button className="ai-btn" onClick={handleAutoSchedule}>
        Auto Schedule (AI)
      </button>

      <button className="fab" onClick={() => setShowForm(true)}>
        +
      </button>
    </div>
  );
}