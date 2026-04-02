import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Award } from 'lucide-react'

// Components
import HeroSection from '../components/user/HeroSection'
import CourseDetails from '../components/user/CourseDetails'
import Timetable from '../components/user/Timetable'
import FeePayment from '../components/user/FeePayment'
import RegistrationForm from '../components/user/RegistrationForm'
import ParentPortal from '../components/user/ParentPortal'

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<'home' | 'register' | 'fees' | 'portal'>('home')

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <HeroSection onRegisterClick={() => setActiveTab('register')} />
            <div className="container" style={{ padding: '3rem 1rem' }}>
              <div className="grid grid-cols-1 gap-lg" style={{ marginBottom: '3rem' }}>
                <div>
                  <h2 className="card-title" style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                    Our Courses
                  </h2>
                  <CourseDetails />
                </div>
              </div>
              <div style={{ marginBottom: '3rem' }}>
                <h2 className="card-title" style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                  Weekly Schedule
                </h2>
                <Timetable />
              </div>
            </div>
          </>
        )
      case 'register':
        return (
          <div className="container" style={{ padding: '3rem 1rem' }}>
            <RegistrationForm onBack={() => setActiveTab('home')} />
          </div>
        )
      case 'fees':
        return (
          <div className="container" style={{ padding: '3rem 1rem' }}>
            <FeePayment />
          </div>
        )
      case 'portal':
        return (
          <div className="container" style={{ padding: '3rem 1rem' }}>
            <ParentPortal />
          </div>
        )
    }
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('home'); }} className="navbar-brand">
            <Award className="text-primary" /> Achievers Academy
          </a>
          <div className="nav-links">
            <a href="#" className={`nav-link ${activeTab === 'home' ? 'text-primary' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('home'); }}>Home</a>
            <a href="#" className={`nav-link ${activeTab === 'register' ? 'text-primary' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('register'); }}>Admission</a>
            <a href="#" className={`nav-link ${activeTab === 'fees' ? 'text-primary' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('fees'); }}>Fee Payment</a>
            <a href="#" className={`nav-link ${activeTab === 'portal' ? 'text-primary' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('portal'); }}>Student/Parent Portal</a>
            <Link to="/admin" className="btn btn-outline" style={{ marginLeft: '1rem' }}>Teacher Login</Link>
          </div>
        </div>
      </nav>
      <main>
        {renderContent()}
      </main>
      <footer style={{ backgroundColor: 'var(--color-secondary)', color: 'white', padding: '3rem 1rem', marginTop: 'auto' }}>
        <div className="container grid grid-cols-3 gap-lg">
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Achievers Academy</h3>
            <p style={{ color: '#94a3b8' }}>Coaching Classes for Grade 5 to Grade 10. Building foundations for a brighter tomorrow.</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('register'); }} style={{ color: 'inherit', textDecoration: 'none' }}>Admission</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('fees'); }} style={{ color: 'inherit', textDecoration: 'none' }}>Fee Payment</a></li>
              <li><Link to="/admin" style={{ color: 'inherit', textDecoration: 'none' }}>Admin Login</Link></li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Contact Us</h3>
            <p style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Phone size={18} /> +91 98765 43210
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
