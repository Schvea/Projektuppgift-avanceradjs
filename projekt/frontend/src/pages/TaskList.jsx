import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); 
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();


  useEffect(() => {
 
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }


    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Du måste logga in');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/tasks', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error('Något gick fel vid hämtning');
        }

        const data = await res.json();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAssignTask = async (taskId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}/assign`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Kunde inte ta uppgiften');
        return;
      }

      const updatedTasks = await fetch('http://localhost:5000/api/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(res => res.json());

      setTasks(updatedTasks);
    } catch (err) {
      console.error('Fel kan ej ta uppgift', err);
    }
  };

  if (loading) return <p>Laddar uppgifter</p>;
  if (error) return <p>Fel: {error}</p>;

  return (
    <div>
      <h2>Alla uppgifter</h2>

        <button onClick={() => {
        if (user?.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/panel');
        }
      }}>
        Tillbaka
      </button>

      <input
      type="text"
      placeholder="Sök efter titel eller beskrivning"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
      />

      <ul>
        {tasks.length === 0 && <li>Inga uppgifter finns</li>}
        {tasks
        .filter(task =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .map(task => (
          <li key={task._id} style={{ marginBottom: '1rem' }}>
            <strong>{task.title}</strong> - {task.description || 'Ingen beskrivning'}
            <br />
            Datum: {task.date ? new Date(task.date).toLocaleDateString() : 'Inget datum är bestämt ännu'}
            <br />
            {task.assignedTo ? (
              <em>Tagen av: {task.assignedTo.username || 'okänd användare'}</em>
            ) : (
              <button onClick={() => handleAssignTask(task._id)}>
                Ta uppgiften
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
