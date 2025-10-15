import { Routes, Route } from 'react-router-dom';
import PanelPage from '../pages/PanelPage';
import TaskList from '../pages/TaskList';

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/panel" element={<PanelPage />} />
      <Route path="/tasks" element={<TaskList />} />
    </Routes>
  );
}
