import { Routes, Route } from 'react-router-dom'

import Sidebar from '../components/admin/Sidebar'
import Overview from '../components/admin/Overview'
import StudentManagement from '../components/admin/StudentManagement'
import FeeVerification from '../components/admin/FeeVerification'
import AcademicManagement from '../components/admin/AcademicManagement'

export default function AdminDashboard() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
          <h1 style={{ color: 'var(--color-secondary)' }}>Teacher & Admin Panel</h1>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', maxWidth: '400px' }}>
            <div style={{ width: '40px', height: '40px', flexShrink: 0, borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              VS
            </div>
            <div>
              <p style={{ fontWeight: 600, margin: 0 }}>Veena Sanikop</p>
              <p className="text-muted" style={{ fontSize: '0.75rem', margin: '0.25rem 0 0.5rem 0' }}>B.Com/B.Ed • 20+ Years Experience</p>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
                <p style={{ margin: 0 }}>Taught at distinguished institutions in Mapusa:</p>
                <ul style={{ margin: '0 0 0 1rem', padding: 0 }}>
                  <li>Dattaram Mantrawadi Memorial High School</li>
                  <li>Saraswat Vidyalaya</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/students" element={<StudentManagement />} />
          <Route path="/fees" element={<FeeVerification />} />
          <Route path="/academics" element={<AcademicManagement />} />
        </Routes>
      </div>
    </div>
  )
}
