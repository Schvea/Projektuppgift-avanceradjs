import { Routes, Route } from 'react-router-dom';
import AdminPanel from '../pages/AdminPanel';
import UserManagement from '../pages/UserManagement';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/admin/users" element={<UserManagement />} />
    </Routes>
  );
}
