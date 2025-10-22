import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');  
    navigate('/');              
  };

  return (
        <div className="setup">
    <div className='flex flex-col'>
      <h2 className="title">Admin översikt</h2>
      <button className="panel-btn m-1" onClick={() => navigate('/tasks')}>Visa uppgifter</button>
      <button className="panel-btn m-1" onClick={() => navigate('/tasks/create')}>Skapa ny uppgift</button>
      <button className="panel-btn m-1" onClick={() => navigate('/users')}>Hantera användare</button>
      <button className="panel-btn m-1" onClick={handleLogout}>Logga ut</button>
    </div>
    </div>
  );
}

export default AdminPage;
