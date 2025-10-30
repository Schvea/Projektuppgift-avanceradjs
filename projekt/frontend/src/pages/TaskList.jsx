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
        const res = await fetch('/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      const res = await fetch(`/api/tasks/${taskId}/assign`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Kunde inte ta uppgiften');
        return;
      }

      const updatedTasks = await fetch('/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());

      setTasks(updatedTasks);
    } catch (err) {
      console.error('Fel kan ej ta uppgift', err);
    }
  };

  const handleDelete = async (taskid) => {
    const token = localStorage.getItem('token');
    if (!window.confirm('Vill du ta bort uppgiften?')) return;

    try {
      const res = await fetch(`/api/tasks/${taskid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Kunde inte radera uppgift');
        return;
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskid));

      alert('Uppgiften har raderats');
    } catch (err) {
      console.error('Fel vid radering', err);
      alert('Något gick fel vid radering');
    }
  };

  if (loading) return <p>Laddar uppgifter</p>;
  if (error) return <p>Fel: {error}</p>;

  return (
    <div className="setup relative min-h-screen w-full">
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

      <div className="w-full max-w-sm p-8 bg-white rounded shadow flex flex-col mx-auto mt-30">
        <h2 className="title text-center text-2xl font-bold w-full mb-6">Alla uppgifter</h2>

        <input
          type="text"
          placeholder="Sök efter titel eller beskrivning"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 border-solid m-1"
        />

        <ul>
          {tasks.length === 0 && <li>Inga uppgifter finns</li>}
          {tasks
            .filter(
              (task) =>
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (task.description &&
                  task.description.toLowerCase().includes(searchTerm.toLowerCase()))
            )
            .map((task) => (
              <li key={task._id} style={{ marginBottom: '1rem' }}>
                <strong>{task.title}</strong> - {task.description || 'Ingen beskrivning'}
                <br />
                Datum:{' '}
                {task.date
                  ? new Date(task.date).toLocaleDateString()
                  : 'Inget datum är bestämt ännu'}
                <br />
                {task.assignedTo ? (
                  <>
                    <em>Tagen av: {task.assignedTo.username || 'okänd användare'}</em>
                    <button
                      className="log-out-btn w-25 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 m-1"
                      onClick={() => handleDelete(task._id)}
                    >
                      Radera
                    </button>
                  </>
                ) : (
                  <>
                    <button className="panel-btn" onClick={() => handleAssignTask(task._id)}>
                      Ta uppgiften
                    </button>
                    <button
                      className="log-out-btn w-25 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 m-1"
                      onClick={() => handleDelete(task._id)}
                    >
                      Radera
                    </button>
                  </>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
export default TaskList;
