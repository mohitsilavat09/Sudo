import { useState } from "react";

const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function TaskModal({ onAdd, onClose }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [repeatDays, setRepeatDays] = useState([]);

  const toggleDay = (day) => {
    setRepeatDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  const submit = () => {
    if (!title || !date || !time) return;

    onAdd({
      id: Date.now(),
      title,
      date,
      time,
      repeatDays,
      done: false,
    });
  };

  return (
    <div className="modal">
      <div className="modal-box">
        <h2>New Task</h2>

        <input
          placeholder="Task title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input type="date" onChange={(e) => setDate(e.target.value)} />
        <input type="time" onChange={(e) => setTime(e.target.value)} />

        <div className="repeat-days">
          {days.map((day) => (
            <button
              key={day}
              className={repeatDays.includes(day) ? "active" : ""}
              onClick={() => toggleDay(day)}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={submit}>Add</button>
        </div>
      </div>
    </div>
  );
}