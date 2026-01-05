import { useEffect, useState } from "react";
import Head from "next/head";

export default function Home() {
  const [tasks, setTasks] = useState([]);
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

  // Simple AI Auto Schedule (logic-only, safe)
  function autoSchedule() {
    if (tasks.length === 0) return;

    const today = new Date().toISOString().split("T")[0];
    const startHour = 9;

    const newTasks = tasks.map((t, i) => ({
      ...t,
      date: today,
      time: `${String(startHour + i).padStart(2, "0")}:00`,
    }));

    setTasks(newTasks);
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

        {/* ADD TASK */}
        <div style={styles.addBox}>
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

        {/* AI BUTTON */}
        <button style={styles.aiBtn} onClick={autoSchedule}>
          Auto Schedule (AI)
        </button>
      </main>
    </>
  );
}

/* SIMPLE PROFESSIONAL STYLES */
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(180deg,#020617,#020617)",
    color: "#fff",
    padding: 20,
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
    borderRadius: 14,
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
  addBox: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  aiBtn: {
    marginTop: 20,
    padding: 12,
    borderRadius: 10,
    background: "#1d4ed8",
    color: "#fff",
    border: "none",
    fontSize: 16,
  },
};