import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'
import AuthGuard from './components/admin/AuthGuard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={
          <AuthGuard>
            <AdminDashboard />
          </AuthGuard>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
