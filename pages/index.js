import { useState, useEffect } from "react";
import TaskItem from "../components/TaskItem";
import TaskModal from "../components/TaskModel"; // IMPORTANT: matches TaskModel.js

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Load tasks from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // Add new task
  const addTask = (task) => {
    setTasks([...tasks, task]);
    setShowModal(false);
  };

  // Toggle task complete
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
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

      {/* Floating Add Button */}
      <button className="fab" onClick={() => setShowModal(true)}>
        +
      </button>

      {/* Task Modal */}
      {showModal && (
        <TaskModal
          onAdd={addTask}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}