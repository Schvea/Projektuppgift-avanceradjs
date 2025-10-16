import { Route } from 'react-router-dom';
import PanelPage from '../pages/PanelPage';
import TaskList from '../pages/TaskList';
import UserManagement from '../pages/UserManagement';

function UserRoute() {
  return (
    <>
      <Route path="/panel" element={<PanelPage />} />
      <Route path="/tasks" element={<TaskList />} />
      <Route path="/users" element={<UserManagement />} />
    </>
  );
}

export default UserRoute;