import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UserRoute from './routes/UserRoute'
import AdminRoute from './routes/AdminRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <UserRoute />
      <AdminRoute />
      </Routes>
    </Router>
  )
}

export default App
