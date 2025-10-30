import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        if (data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/panel');
        }
      } else {
        setMessage(data.error || 'Fel vid inlog');
      }
    } catch (error) {
      console.error('Fel vid inlog', error);
      setMessage('Serverfel.');
    }
  };
  return (
    <div className="setup">
      <div className="w-full max-w-sm p-8 bg-white rounded shadow flex flex-col">
        <h2 className="title">Logga in</h2>

        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Användarnamn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <button type="submit" className="btn">
            Logga in
          </button>
          <p className="text-center">Har du inget konto?</p>
          <button className="panel-btn" onClick={() => navigate('/register')}>
            Registrera nytt konto
          </button>
          {message && <p className="text-red-600 text-sm">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
