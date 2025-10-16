import { useState } from 'react';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

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
      } else {
        setMessage(data.error || 'Fel vid registrering');
      }
    } catch (error) {
      console.error('Fel vid registrering:', error);
      setMessage('Serverfel.');
    }
  };

  return (
    <div>
      <h2>Registrera konto</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Användarnamn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Skapa konto</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RegisterPage;
