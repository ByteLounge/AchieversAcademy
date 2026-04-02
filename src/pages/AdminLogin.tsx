import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../lib/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { Lock, User } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const cleanEmail = email.trim().toLowerCase()

    // specific strict check based on user constraints
    if (cleanEmail !== 'konuriveena@gmail.com' || password !== '220478') {
      setError('Unauthorized access. Invalid admin credentials.')
      setLoading(false)
      return
    }

    try {
      // Try signing in
      await signInWithEmailAndPassword(auth, cleanEmail, password)
      navigate('/admin')
    } catch (err: any) {
      console.log("Firebase Auth Error:", err.code)
      // Attempt seamless creation if doesn't exist for the first time
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential' || err.code === 'auth/invalid-login-credentials') {
        try {
          await createUserWithEmailAndPassword(auth, cleanEmail, password)
          navigate('/admin')
        } catch (createErr: any) {
          setError(createErr.message || 'Error communicating with authentication server.')
        }
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg-main)', padding: '1rem' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '2.5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '64px', height: '64px', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <Lock size={32} />
          </div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-secondary)', margin: 0 }}>Admin Login</h2>
          <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Achievers Academy Teacher Portal</p>
        </div>

        {error && (
          <div style={{ backgroundColor: 'var(--color-danger-bg)', color: 'var(--color-danger)', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--color-text-muted)' }} />
              <input 
                type="email" 
                className="form-input" 
                style={{ paddingLeft: '2.5rem' }} 
                placeholder="teacher@achievers.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--color-text-muted)' }} />
              <input 
                type="password" 
                className="form-input" 
                style={{ paddingLeft: '2.5rem' }} 
                placeholder="••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }} disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In to Portal'}
          </button>
        </form>
        
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button className="btn" style={{ padding: 0, backgroundColor: 'transparent', color: 'var(--color-text-muted)', fontSize: '0.875rem' }} onClick={() => navigate('/')}>
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  )
}
