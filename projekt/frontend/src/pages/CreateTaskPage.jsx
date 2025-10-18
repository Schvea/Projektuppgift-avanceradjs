import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateTaskPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
const token = localStorage.getItem('token');

const res = await fetch('http://localhost:5000/api/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({ title, description, date }),
});

      const data = await res.json();

      if (res.ok) {
        setMessage('Uppgift skapad!');
        setTitle('');
        setDescription('');
        setDate('');
        setTimeout(() => navigate('/tasks'), 2000);
      } else {
        setMessage(data.error || 'Fel vid skapande av uppgift.');
      }
    } catch (err) {
      console.error('Fel:', err);
      setMessage('Serverfel.');
    }
  };

  return (
    <div>
      <h2>Skapa ny uppgift</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Beskrivning"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Skapa uppgift</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateTaskPage;
