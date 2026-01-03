export default function TaskItem({ task, onToggle }) {
  return (
    <div className={`task ${task.done ? 'done' : ''}`}>
      <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />
      <div>
        <h3>{task.title}</h3>
        <p>{task.date} • {task.time}</p>
      </div>
    </div>
  );
}