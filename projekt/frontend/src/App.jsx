import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import userRoutes from './routes/UserRoute'
import adminRoutes from './routes/AdminRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {userRoutes}
        {adminRoutes}
      </Routes>
    </Router>
  )
}

export default App
