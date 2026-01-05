import { useEffect, useState } from "react";
import Head from "next/head";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Load tasks
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (!text || !date || !time) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text,
        date,
        time,
        done: false,
      },
    ]);

    setText("");
    setDate("");
    setTime("");
    setShowAdd(false);
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  // ✅ FIXED AUTO SCHEDULER
  function autoSchedule() {
    if (tasks.length === 0) return;

    const today = new Date().toISOString().split("T")[0];
    let hour = 9;

    const updated = tasks.map((task) => ({
      ...task,
      date: today,
      time: `${String(hour++).padStart(2, "0")}:00`,
    }));

    setTasks(updated);
  }

  return (
    <>
      <Head>
        <title>Taskzen</title>
      </Head>

      <main style={styles.container}>
        <h1 style={styles.title}>Taskzen</h1>

        {/* TASK LIST */}
        <div style={styles.list}>
          {tasks.length === 0 && (
            <p style={styles.empty}>No tasks yet</p>
          )}

          {tasks.map((task) => (
            <div key={task.id} style={styles.card}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    textDecoration: task.done
                      ? "line-through"
                      : "none",
                  }}
                >
                  {task.text}
                </h3>
                <p style={styles.time}>
                  {task.date} • {task.time}
                </p>
              </div>

              <button
                style={styles.delete}
                onClick={() => deleteTask(task.id)}
              >
                🗑
              </button>
            </div>
          ))}
        </div>

        {/* ADD TASK PANEL */}
        {showAdd && (
          <div style={styles.addPanel}>
            <input
              placeholder="Task name"
              value={text}
              onChange={(e) => setText(e.target.value)}
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
          </div>
        )}

        {/* AI BUTTON */}
        <button style={styles.aiBtn} onClick={autoSchedule}>
          Auto Schedule (AI)
        </button>

        {/* FLOATING + BUTTON */}
        <button
          style={styles.fab}
          onClick={() => setShowAdd(!showAdd)}
        >
          +
        </button>
      </main>
    </>
  );
}

/* STYLES */
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(180deg,#020617,#020617)",
    color: "#fff",
    padding: 20,
    position: "relative",
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  card: {
    background: "#0f172a",
    borderRadius: 16,
    padding: 14,
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  time: {
    fontSize: 12,
    opacity: 0.7,
  },
  delete: {
    background: "none",
    border: "none",
    color: "#f87171",
    fontSize: 18,
  },
  empty: {
    opacity: 0.6,
    textAlign: "center",
  },
  addPanel: {
    position: "fixed",
    bottom: 90,
    left: 20,
    right: 20,
    background: "#020617",
    borderRadius: 16,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
  },
  aiBtn: {
    marginTop: 20,
    padding: 12,
    borderRadius: 12,
    background: "#1d4ed8",
    color: "#fff",
    border: "none",
    fontSize: 16,
  },
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "#2563eb",
    color: "#fff",
    fontSize: 28,
    border: "none",
  },
};