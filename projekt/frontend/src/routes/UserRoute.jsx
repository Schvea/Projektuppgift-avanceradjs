import { Route } from 'react-router-dom';
import PanelPage from '../pages/PanelPage';
import TaskList from '../pages/TaskList';
import UserManagement from '../pages/UserManagement';
import CreateTaskPage from '../pages/CreateTaskPage';

export const userRoutes = (
  <>
    <Route path="/panel" element={<PanelPage />} />
    <Route path="/tasks" element={<TaskList />} />
    <Route path="/users" element={<UserManagement />} />
    <Route path="/tasks/create" element={<CreateTaskPage />} />
  </>
);

export default userRoutes;