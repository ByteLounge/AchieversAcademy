import React, { useState } from 'react'
import { generatePDF } from '../../utils/pdfUtils'
import { CheckCircle, Download, Loader } from 'lucide-react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'

export default function RegistrationForm({ onBack }: { onBack: () => void }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'submitted'>('idle')
  const [formData, setFormData] = useState({
    studentName: '', parentName: '', mobile: '', grade: '5', schoolName: '',
    address: '', date: new Date().toISOString().split('T')[0], subjects: [] as string[]
  })

  const availableSubjects = ['Math', 'Science', 'English', 'Social Studies']

  const handleSubjectToggle = (sub: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(sub) 
        ? prev.subjects.filter(s => s !== sub)
        : [...prev.subjects, sub]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await addDoc(collection(db, 'students'), {
        ...formData,
        createdAt: new Date().toISOString()
      })
      setStatus('submitted')
    } catch (err) {
      console.error(err)
      alert("Error submitting registration.")
      setStatus('idle')
    }
  }

  const handleDownloadForm = () => {
    generatePDF('registration-pdf', 'AchieversAcademy_Registration')
  }

  if (status === 'loading') {
    return (
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '3rem 2rem' }}>
        <Loader className="text-primary" size={48} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem' }} />
        <h2 className="card-title">Registering Student...</h2>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (status === 'submitted') {
    return (
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '3rem 2rem' }}>
        <CheckCircle size={64} className="text-success" style={{ margin: '0 auto 1.5rem' }} />
        <h2 className="card-title" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Registration Successful!</h2>
        <p className="text-muted" style={{ marginBottom: '2rem' }}>Welcome to Achievers Academy. We have recorded the admission details for {formData.studentName}.</p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={handleDownloadForm}>
            <Download size={18} /> Download Form PDF
          </button>
          <button className="btn btn-outline" onClick={onBack}>Return Home</button>
        </div>

        {/* Hidden PDF Printable Area */}
        <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
          <div id="registration-pdf" style={{ width: '800px', padding: '40px', backgroundColor: 'white', color: 'black' }}>
            <div style={{ textAlign: 'center', borderBottom: '2px solid #2563eb', paddingBottom: '20px', marginBottom: '30px' }}>
              <h1 style={{ color: '#2563eb', margin: '0 0 10px 0' }}>Achievers Academy</h1>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Coaching Classes for Grade 5 to Grade 10</p>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Official Student Registration Form</p>
            </div>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <tbody>
                <tr><td style={{ padding: '10px', borderBottom: '1px solid #ccc', fontWeight: 'bold', width: '30%' }}>Student Name</td><td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{formData.studentName}</td></tr>
                <tr><td style={{ padding: '10px', borderBottom: '1px solid #ccc', fontWeight: 'bold' }}>Parent Name</td><td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{formData.parentName}</td></tr>
                <tr><td style={{ padding: '10px', borderBottom: '1px solid #ccc', fontWeight: 'bold' }}>Mobile Number</td><td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{formData.mobile}</td></tr>
                <tr><td style={{ padding: '10px', borderBottom: '1px solid #ccc', fontWeight: 'bold' }}>Grade Enrolled</td><td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Grade {formData.grade}</td></tr>
                <tr><td style={{ padding: '10px', borderBottom: '1px solid #ccc', fontWeight: 'bold' }}>School Name</td><td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{formData.schoolName}</td></tr>
                <tr><td style={{ padding: '10px', borderBottom: '1px solid #ccc', fontWeight: 'bold' }}>Address</td><td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{formData.address}</td></tr>
                <tr><td style={{ padding: '10px', borderBottom: '1px solid #ccc', fontWeight: 'bold' }}>Subjects</td><td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{formData.subjects.join(', ')}</td></tr>
                <tr><td style={{ padding: '10px', borderBottom: '1px solid #ccc', fontWeight: 'bold' }}>Admission Date</td><td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{formData.date}</td></tr>
              </tbody>
            </table>
            
            <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ borderTop: '1px solid #000', paddingTop: '10px', width: '200px', textAlign: 'center' }}>Parent Signature</div>
              <div style={{ borderTop: '1px solid #000', paddingTop: '10px', width: '200px', textAlign: 'center' }}>Academy Signature</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card-header">
        <h2 className="card-title">Student Admission Form</h2>
        <p className="text-muted" style={{ marginTop: '0.25rem' }}>Please fill out the details carefully.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div className="form-group">
            <label className="form-label">Student Full Name</label>
            <input type="text" className="form-input" required value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">Parent Name</label>
            <input type="text" className="form-input" required value={formData.parentName} onChange={e => setFormData({...formData, parentName: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">Mobile Number</label>
            <input type="tel" className="form-input" required value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">Grade</label>
            <select className="form-select" value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})}>
              {[5,6,7,8,9,10].map(g => <option key={g} value={g}>Grade {g}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">School Name</label>
            <input type="text" className="form-input" value={formData.schoolName} onChange={e => setFormData({...formData, schoolName: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">Admission Date</label>
            <input type="date" className="form-input" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}/>
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '1rem' }}>
          <label className="form-label">Address</label>
          <textarea className="form-input" rows={3} style={{ resize: 'vertical' }} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
        </div>

        <div className="form-group" style={{ marginTop: '1rem' }}>
          <label className="form-label">Preferred Subjects</label>
          <div className="grid grid-cols-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {availableSubjects.map(sub => (
              <label key={sub} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={formData.subjects.includes(sub)} onChange={() => handleSubjectToggle(sub)} style={{ width: '1rem', height: '1rem', accentColor: 'var(--color-primary)' }} />
                <span>{sub}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-outline" onClick={onBack}>Cancel</button>
          <button type="submit" className="btn btn-primary">Complete Registration</button>
        </div>
      </form>
    </div>
  )
}
