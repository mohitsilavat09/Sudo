import { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem";
import TaskModal from "../components/TaskModel";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Load tasks
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Ask notification permission
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  // Alarm checker
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const today = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][now.getDay()];

      tasks.forEach((task) => {
        if (!task.date || !task.time) return;

        const taskDate = new Date(`${task.date}T${task.time}`);
        const repeatOK =
          task.repeatDays.length === 0 ||
          task.repeatDays.includes(today);

        if (
          repeatOK &&
          Math.abs(now - taskDate) < 60000 &&
          Notification.permission === "granted"
        ) {
          new Notification("⏰ Task Reminder", {
            body: task.title,
          });
        }
      });
    }, 60000);

    return () => clearInterval(timer);
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
    setShowModal(false);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      <h1>To Do List</h1>

      {tasks.length === 0 && (
        <p className="empty">Nothing to do 🌴</p>
      )}

      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      ))}

      <button className="fab" onClick={() => setShowModal(true)}>+</button>

      {showModal && (
        <TaskModal onAdd={addTask} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}