import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateTaskPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

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
  <div className="setup relative min-h-screen">

    <button
      className="panel-btn absolute top-4 left-4 z-10"
      onClick={() => {
        if (user?.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/panel');
        }
      }}
    >
      Tillbaka
    </button>

    <div className="w-full max-w-sm p-8 bg-white rounded shadow flex flex-col mx-auto mt-16">
      <h2 className="title">Skapa ny uppgift</h2>

      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className='text-center border-2 border-solidm-1'
        />
        <textarea
          placeholder="Beskrivning"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='text-center border-2 border-solid m-1'
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className=' border-2 border-solid m-1'
        />
        <button className="panel-btn" type="submit">Skapa uppgift</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  </div>
);
}

export default CreateTaskPage;
