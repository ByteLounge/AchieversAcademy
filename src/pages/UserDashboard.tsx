import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Award, Mail, GraduationCap } from 'lucide-react'

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
              <div className="grid grid-cols-1 gap-lg" style={{ marginBottom: '4rem' }}>
                <div>
                  <h2 className="card-title" style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                    Our Courses
                  </h2>
                  <CourseDetails />
                </div>
              </div>

              {/* Lead Faculty Section */}
              <div className="card" style={{ marginBottom: '4rem', padding: '3rem', backgroundColor: 'var(--color-bg-main)', border: '1px solid var(--color-primary-light)' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-lg" style={{ alignItems: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '150px', height: '150px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 'bold', margin: '0 auto 1.5rem', boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.2)' }}>
                      VS
                    </div>
                    <h2 style={{ fontSize: '2.25rem', color: 'var(--color-secondary)', margin: '0 0 0.5rem 0' }}>Veena Sanikop</h2>
                    <p className="text-primary" style={{ fontWeight: 600, fontSize: '1.125rem' }}>Lead Faculty & Founder</p>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--color-secondary)', borderBottom: '2px solid var(--color-primary-light)', paddingBottom: '0.5rem', display: 'inline-block' }}>
                      Meet Our Lead Faculty
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <GraduationCap className="text-primary" style={{ marginTop: '0.25rem' }} />
                        <div>
                          <p style={{ fontWeight: 600, margin: 0 }}>20+ Years of Teaching Experience</p>
                          <p className="text-muted" style={{ fontSize: '0.875rem' }}>Proven track record of academic excellence.</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <Award className="text-primary" style={{ marginTop: '0.25rem' }} />
                        <div>
                          <p style={{ fontWeight: 600, margin: 0 }}>Distinguished Career</p>
                          <p className="text-muted" style={{ fontSize: '0.875rem' }}>Taught at Dattaram Mantrawadi Memorial High School & Saraswat Vidyalaya, Mapusa.</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <Phone className="text-primary" style={{ marginTop: '0.25rem' }} />
                        <div>
                          <p style={{ fontWeight: 600, margin: 0 }}>Contact</p>
                          <p className="text-muted" style={{ fontSize: '0.875rem' }}>+91 90496 00358</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <Mail className="text-primary" style={{ marginTop: '0.25rem' }} />
                        <div>
                          <p style={{ fontWeight: 600, margin: 0 }}>Email</p>
                          <p className="text-muted" style={{ fontSize: '0.875rem' }}>konuriveena@gmail.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
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
              <Phone size={18} /> +91 90496 00358
            </p>
            <p style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={18} /> konuriveena@gmail.com
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
