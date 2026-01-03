import { useState } from 'react';

export default function TaskModel({ onAdd, onClose }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const submit = () => {
    onAdd({
      id: Date.now(),
      title,
      date,
      time,
      done: false
    });
    onClose();
  };

  return (
    <div className="modal">
      <input placeholder="Task name" onChange={e => setTitle(e.target.value)} />
      <input type="date" onChange={e => setDate(e.target.value)} />
      <input type="time" onChange={e => setTime(e.target.value)} />
      <button onClick={submit}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}