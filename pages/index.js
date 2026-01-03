import { useState, useEffect } from "react";
import TaskItem from "../components/TaskItem";
import TaskModel from "../components/TaskModel";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
    setShowModel(false);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="container">
      <h1>To Do List</h1>

      {tasks.length === 0 && (
        <p className="empty">Nothing to do 🌴</p>
      )}

      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      ))}

      <button className="fab" onClick={() => setShowModel(true)}>+</button>

      {showModal && <TaskModel onAdd={addTask} onClose={() => setShowModel(false)} />}
    </div>
  );
}