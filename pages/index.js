import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [deferredPrompt, setDeferredPrompt] = useState(null);

  /* -----------------------------
     Add to Home Screen handling
  ------------------------------*/
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    setDeferredPrompt(null);
  };

  /* -----------------------------
     Task logic
  ------------------------------*/
  const addTask = () => {
    if (!title || !date || !time) return;

    const newTask = {
      id: Date.now(),
      title,
      date,
      time,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setDate("");
    setTime("");
    setShowForm(false);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      <h1 className="title">ProDo</h1>

      {tasks.length === 0 && (
        <div className="empty">No tasks yet</div>
      )}

      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-card" key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />

            <span className={task.completed ? "done" : ""}>
              {task.title}
              <small>
                {task.date} • {task.time}
              </small>
            </span>

            <button
              className="delete"
              onClick={() => deleteTask(task.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Add Task Form */}
      {showForm && (
        <div className="form">
          <input
            type="text"
            placeholder="Task name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <button onClick={addTask}>Add Task</button>
          <button className="cancel" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </div>
      )}

      {/* Floating + Button */}
      <button className="fab" onClick={() => setShowForm(true)}>
        +
      </button>

      {/* Add to Home Screen Button (optional) */}
      {deferredPrompt && (
        <button className="ai-btn" onClick={installApp}>
          📲 Add to Home Screen
        </button>
      )}
    </div>
  );
}