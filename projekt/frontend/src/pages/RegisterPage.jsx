import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Du är nu registrerad');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setMessage(data.error || 'Fel vid registrering');
      }
    } catch (error) {
      console.error('Fel vid registrering:', error);
      setMessage('Serverfel.');
    }
  };

  return (
    <div className="setup">
      <div className="w-full max-w-sm p-8 bg-white rounded shadow flex flex-col">
        <h2 className="title">Registrera konto</h2>

        <form className="flex flex-col space-y-4" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Användarnamn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="email"
            placeholder="E-post"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded"
          />
          <button className="panel-btn" type="submit">
            Skapa konto
          </button>
          <p className="text-center">Har du redan ett konto?</p>
          <button className="panel-btn" onClick={() => navigate('/')}>
            Logga in på befintligt konto
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default RegisterPage;
