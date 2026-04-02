import React, { useState } from 'react'
import { Upload, CheckCircle, Loader } from 'lucide-react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'

export default function FeePayment() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'submitted'>('idle')
  const [studentName, setStudentName] = useState('')
  const [grade, setGrade] = useState('5')
  const [mobile, setMobile] = useState('')
  const [upi, setUpi] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await addDoc(collection(db, 'payments'), {
        student: studentName,
        grade: grade,
        mobile: mobile,
        upi: upi,
        date: date,
        amount: '₹11000', // Mock hardcoded amount
        status: 'pending',
        createdAt: new Date().toISOString()
      })
      setStatus('submitted')
    } catch (err) {
      console.error(err)
      alert("Error submitting payment proof.")
      setStatus('idle')
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
      <div className="card">
        <div style={{ backgroundColor: '#F4F7FB', borderRadius: '16px', padding: '2.5rem 1.5rem', maxWidth: '340px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#0B57D0', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '500', fontSize: '1.1rem' }}>
              V
            </div>
            <span style={{ fontSize: '1.4rem', color: '#444746', fontWeight: 500 }}>Veena Konuri</span>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.04)', position: 'relative', width: '100%' }}>
            {/* Dynamically generated UPI QR Code */}
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=konuriveena@okhdfcbank&pn=Veena%20Konuri" 
              alt="UPI QR Code" 
              style={{ width: '100%', height: 'auto', display: 'block', margin: '0 auto', borderRadius: '12px' }} 
            />
            
            {/* Google Pay Center Mock Overlay */}
            <div style={{ position: 'absolute', top: 'calc(50% - 14px)', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 2px white' }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="GPay" style={{ width: '28px', objectFit: 'contain' }} />
            </div>

            <div style={{ textAlign: 'center', marginTop: '1rem', color: '#444746', fontSize: '0.95rem' }}>
              UPI ID: konuriveena@okhdfcbank
            </div>
          </div>

          <div style={{ marginTop: '2rem', color: '#444746', fontSize: '1rem' }}>
            Scan to pay with any UPI app
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title" style={{ marginBottom: '1.5rem' }}>Upload Payment Proof</h2>
        
        {status === 'loading' ? (
           <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
             <Loader className="text-primary" size={48} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }} />
             <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)' }}>Uploading...</h3>
           </div>
        ) : status === 'submitted' ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <CheckCircle size={48} className="text-success" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-success)' }}>Payment Submitted</h3>
            <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Your payment is <span className="badge badge-warning">Pending Verification</span>. You will receive a receipt once verified.</p>
            <button className="btn btn-outline" onClick={() => setStatus('idle')}>Submit Another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Student Name</label>
              <input type="text" className="form-input" placeholder="Enter student full name" required value={studentName} onChange={e => setStudentName(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="form-group">
                <label className="form-label">Grade</label>
                <select className="form-select" value={grade} onChange={e => setGrade(e.target.value)}>
                  {[5,6,7,8,9,10].map(g => <option key={g} value={g.toString()}>Grade {g}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Mobile Number (M No.)</label>
                <input type="tel" className="form-input" placeholder="9876543210" required value={mobile} onChange={e => setMobile(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">UPI Transaction ID</label>
              <input type="text" className="form-input" placeholder="e.g. 123456789012" required value={upi} onChange={e => setUpi(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Payment Date</label>
              <input type="date" className="form-input" required value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Screenshot of Payment</label>
              <div style={{ border: '2px dashed #cbd5e1', padding: '2rem 1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', cursor: 'pointer', backgroundColor: '#f8fafc' }}>
                <Upload size={24} className="text-muted" style={{ margin: '0 auto 0.5rem' }} />
                <p className="text-muted">Click to upload or drag and drop</p>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>PNG, JPG up to 5MB</p>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Submit for Verification
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
