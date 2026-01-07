import { useState } from "react";
import { generateSchedule } from "../utils/aiPlanner";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showAI, setShowAI] = useState(false);

  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");

  const [aiPrompt, setAiPrompt] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState([]);

  // Add task manually
  const addTask = () => {
    if (!taskName || !taskDate || !taskTime) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: taskName,
        date: taskDate,
        time: taskTime,
      },
    ]);

    setTaskName("");
    setTaskDate("");
    setTaskTime("");
    setShowForm(false);
  };

  // Run AI
  const runAI = () => {
    const result = generateSchedule(aiPrompt);
    setAiSuggestions(result);
  };

  // Auto-fill from AI
  const fillFromAI = (task) => {
    setTaskName(task.title);
    setTaskTime(task.time);
    setTaskDate(new Date().toISOString().split("T")[0]);
    setShowAI(false);
    setShowForm(true);
  };

  return (
    <div className="container">
      <h1 className="title">Taskzen</h1>

      {tasks.map((t) => (
        <div className="task-card" key={t.id}>
          <span>
            {t.title}
            <small>{t.date} • {t.time}</small>
          </span>
        </div>
      ))}

      {/* AI SEARCH BAR */}
      {showAI && (
        <div className="form">
          <input
            placeholder="Describe your day…"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
          />
          <button onClick={runAI}>Generate Schedule</button>

          {aiSuggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => fillFromAI(s)}
              style={{ marginTop: "6px" }}
            >
              ➕ {s.title} ({s.time})
            </button>
          ))}

          <button className="cancel" onClick={() => setShowAI(false)}>
            Close
          </button>
        </div>
      )}

      {/* ADD TASK FORM */}
      {showForm && (
        <div className="form">
          <input
            placeholder="Task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input
            type="date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
          />
          <input
            type="time"
            value={taskTime}
            onChange={(e) => setTaskTime(e.target.value)}
          />

          <button onClick={addTask}>Add Task</button>
          <button className="cancel" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </div>
      )}

      {/* BUTTONS */}
      <button className="ai-btn" onClick={() => setShowAI(true)}>
        AI Scheduler
      </button>

      <button className="fab" onClick={() => setShowForm(true)}>
        +
      </button>
    </div>
  );
}