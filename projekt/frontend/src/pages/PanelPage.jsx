import { useNavigate } from 'react-router-dom';

function PanelPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');  
    navigate('/');              
  };

  return (
    <div className="setup">
    <div className="w-full max-w-sm p-8 bg-white rounded shadow flex flex-col">
          <div className='flex flex-col'>
      <h2 className="title">Översikt</h2>
      <button className="panel-btn m-1" onClick={() => navigate('/tasks')}>Visa uppgifter</button>
      <button  className="panel-btn m-1"onClick={() => navigate('/tasks/create')}>Skapa ny uppgift</button>
      <button  className="log-out-btn m-1"onClick={handleLogout}>Logga ut</button>
    </div>
    </div>
    </div>
  );
}

export default PanelPage;
