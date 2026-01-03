export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task ${task.done ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />
      <div className="info">
        <h3>{task.title}</h3>
        <small>{task.date} • {task.time}</small>
      </div>
      <button onClick={() => onDelete(task.id)}>🗑</button>
    </div>
  );
}