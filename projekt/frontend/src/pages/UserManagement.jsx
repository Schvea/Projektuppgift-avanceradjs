import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: 'user' });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Kunde inte hämta användare');

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Vill du radera användaren')) return;

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Kunde inte radera användaren');
        return;
      }

      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error('Fel vid radering', err);
    }
  };

  const handleRoleChange = async (id, currentRole) => {
    const newRole = currentRole === 'user' ? 'admin' : 'user';

    try {
      const res = await fetch(`/api/admin/users/${id}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Kunde inte ändra roll');
        return;
      }

      const updated = await res.json();
      setUsers(users.map((user) => (user._id === id ? updated.user : user)));
    } catch (err) {
      console.error('Fel vid ändring av roll', err);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || 'Kunde inte skapa användare');
        return;
      }

      const data = await res.json();
      setUsers([...users, data.user]);
      setNewUser({ username: '', email: '', password: '', role: 'user' });
      alert('Användare skapad');
    } catch (err) {
      console.error('Fel vid skapande av användare', err);
    }
  };

  if (loading) return <p>Laddar användare...</p>;
  if (error) return <p>Fel: {error}</p>;

  return (
    <div className="setup relative min-h-screen w-full bg-sky-100 p-6">
      <button className="panel-btn absolute top-4 left-2 z-10" onClick={() => navigate('/admin')}>
        Tillbaka
      </button>

      <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow">
        <h2 className="title text-center text-2xl font-bold w-full mb-6">Användare</h2>

        <form onSubmit={handleAddUser} className="mb-6 ml-4 max-w-2xl flex gap-2 items-end border-b-2 border-gray-300">
          <input
            type="text"
            placeholder="Användarnamn"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Lösenord"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="panel-btn text-white rounded px-3 py-1 text-sm ml-7">
            Lägg till användare
          </button>
        </form>

<div className="mt-8">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr>
              <th>Namn</th>
              <th>Email</th>
              <th>Roll</th>
              <th>Åtgärder</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border-2 border-solid m-1">{user.username}</td>
                <td className="border-2 border-solid m-1">{user.email}</td>
                <td className="border-2 border-solid m-1">{user.role}</td>
                <td>
                  <button
                    className="panel-btn font-mono px-3 py-1 text-sm"
                    onClick={() => handleRoleChange(user._id, user.role)}
                  >
                    Byt till {user.role === 'user' ? 'admin' : 'user'}
                  </button>
                  <button
                    className="log-out-btn w-25 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 m-1"
                    onClick={() => handleDelete(user._id)}
                  >
                    Radera
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default UserManagement;
