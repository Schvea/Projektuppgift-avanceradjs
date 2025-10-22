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
      const res = await fetch('http://localhost:5000/api/login', {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h2>Logga in</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Användarnamn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn" type="submit">Logga in</button>

      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LoginPage;
