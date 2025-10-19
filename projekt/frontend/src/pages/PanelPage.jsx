import { useNavigate } from 'react-router-dom';

function PanelPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');  
    navigate('/');              
  };

  return (
    <div>
      <h2>Översikt</h2>
      <button onClick={() => navigate('/tasks')}>Visa uppgifter</button>
      <button onClick={() => navigate('/tasks/create')}>Skapa ny uppgift</button>
      <button onClick={handleLogout}>Logga ut</button>
    </div>
  );
}

export default PanelPage;
