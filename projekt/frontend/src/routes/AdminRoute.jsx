import { Route } from 'react-router-dom';
import AdminPanel from '../pages/AdminPanel';
import UserManagement from '../pages/UserManagement';

const adminRoutes = (
  <>
    <Route path="/admin" element={<AdminPanel />} />
    <Route path="/users" element={<UserManagement />} />
  </>
);

export default adminRoutes;
