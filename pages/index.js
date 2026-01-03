import { useState, useEffect } from 'react';
import TaskItem from '../components/TaskItem';
import TaskModel from '../components/TaskModel';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('tasks');
    if (data) setTasks(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks([...tasks, task]);

  const toggle = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div className="container">
      <h1>Taskzen</h1>

      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onToggle={toggle} />
      ))}

      <button className="fab" onClick={() => setOpen(true)}>+</button>

      {open && <TaskModel onAdd={addTask} onClose={() => setOpen(false)} />}
    </div>
  );
}