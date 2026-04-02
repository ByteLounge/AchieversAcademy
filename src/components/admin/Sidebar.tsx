import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, CreditCard, BookOpen, LogOut } from 'lucide-react'
import { signOut } from 'firebase/auth'
import { auth } from '../../lib/firebase'

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault()
    await signOut(auth)
    navigate('/')
  }
  
  const navItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Overview' },
    { path: '/admin/students', icon: <Users size={20} />, label: 'Student Management' },
    { path: '/admin/fees', icon: <CreditCard size={20} />, label: 'Fee Verification' },
    { path: '/admin/academics', icon: <BookOpen size={20} />, label: 'Tests & Attendance' },
  ]
  
  return (
    <div className="admin-sidebar" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '3rem', marginTop: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Achievers</h2>
        <p style={{ color: 'var(--color-primary-light)', fontSize: '0.875rem', opacity: 0.8 }}>Admin Portal</p>
      </div>
      
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            style={{ 
              backgroundColor: location.pathname === item.path ? 'var(--color-primary)' : 'transparent',
              color: location.pathname === item.path ? 'white' : '#94a3b8'
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', marginTop: 'auto' }}>
        <a href="#" onClick={handleLogout} className="admin-nav-item" style={{ color: '#ef4444' }}>
          <LogOut size={20} />
          <span>Exit Admin Space</span>
        </a>
      </div>
    </div>
  )
}
