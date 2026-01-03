import { useState } from "react";

export default function TaskModal({ onAdd, onClose }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const submit = () => {
    if (!title) return;
    onAdd({
      id: Date.now(),
      title,
      date,
      time,
      done: false
    });
  };

  return (
    <div className="modal">
      <div className="modal-box">
        <h2>NEW Task</h2>

        <input placeholder="Task name" onChange={e => setTitle(e.target.value)} />
        <input type="date" onChange={e => setDate(e.target.value)} />
        <input type="time" onChange={e => setTime(e.target.value)} />

        <div className="actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={submit}>Add</button>
        </div>
      </div>
    </div>
  );
}