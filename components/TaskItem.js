export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task-card ${task.done ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />

      <div className="task-content">
        <h3>{task.title}</h3>
        <p className="task-meta">
          📅 {task.date} • ⏰ {task.time}
          {task.repeatDays.length > 0 && (
            <> • 🔁 {task.repeatDays.join(", ")}</>
          )}
        </p>
      </div>

      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        🗑
      </button>
    </div>
  );
}