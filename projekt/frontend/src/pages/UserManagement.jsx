import { useEffect, useState } from 'react';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Kunde inte hämta användare');
      }

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
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
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
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}/role`, {
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
      setUsers(users.map((user) =>
        user._id === id ? updated.user : user
      ));
    } catch (err) {
      console.error('Fel vid ändring av roll', err);
    }
  };

  if (loading) return <p>Laddar användare</p>;
  if (error) return <p>Fel {error}</p>;

  return (
    <div>
      <h2>Användare</h2>
      <table>
        <thead>
          <tr>
            <th>Namn</th>
            <th>Email</th>
            <th>Roll</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleRoleChange(user._id, user.role)}>
                  Byt till {user.role === 'user' ? 'admin' : 'user'}
                </button>
                <button onClick={() => handleDelete(user._id)}>Radera</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
