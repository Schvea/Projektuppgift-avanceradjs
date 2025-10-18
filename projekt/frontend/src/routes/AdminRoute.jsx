import { Route } from 'react-router-dom';
import AdminPanel from '../pages/AdminPanel';

const adminRoutes = (
  <>
    <Route path="/admin" element={<AdminPanel />} />
  </>
);

export default adminRoutes;
