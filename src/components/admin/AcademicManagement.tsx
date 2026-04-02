import React from 'react'
import { Calendar, FileBarChart, Bell } from 'lucide-react'

export default function AcademicManagement() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
      <div className="card">
        <div className="card-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar className="text-primary" size={20} />
          <h3 className="card-title">Daily Attendance Entry</h3>
        </div>
        <div className="form-group" style={{ marginTop: '1rem' }}>
          <label className="form-label">Select Grade</label>
          <select className="form-select">
            <option>Grade 5</option>
            <option>Grade 6</option>
            <option>Grade 7</option>
            <option>Grade 8</option>
            <option>Grade 9</option>
            <option>Grade 10</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Date</label>
          <input type="date" className="form-input" defaultValue={new Date().toISOString().split('T')[0]} />
        </div>
        <button className="btn btn-primary" style={{ width: '100%' }}>Fetch Student List</button>
        
        <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: '1.5rem', textAlign: 'center' }}>
          Select grade to mark attendance for today.
        </p>
      </div>

      <div className="card">
        <div className="card-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileBarChart className="text-primary" size={20} />
          <h3 className="card-title">Weekly Test Marks</h3>
        </div>
        <div className="grid grid-cols-2 gap-md" style={{ marginTop: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Grade</label>
            <select className="form-select">
              <option>Grade 10</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Subject</label>
            <select className="form-select">
              <option>Mathematics</option>
              <option>Science</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Test Date / Title</label>
          <input type="text" className="form-input" placeholder="e.g. Algebra Weekly Test 4" />
        </div>
        <button className="btn btn-primary" style={{ width: '100%' }}>Enter Marks</button>
      </div>

      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <div className="card-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bell className="text-primary" size={20} />
          <h3 className="card-title">Broadcast Notice</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md" style={{ marginTop: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Audience</label>
            <select className="form-select">
              <option>All Students & Parents</option>
              <option>Grade 10 Only</option>
              <option>Grade 9 Only</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input type="text" className="form-input" placeholder="Notice topic" />
          </div>
        </div>
        <div className="form-group">
            <label className="form-label">Message Content</label>
            <textarea className="form-input" rows={4} placeholder="Type announcement here..." style={{ resize: 'vertical' }}></textarea>
        </div>
        <button className="btn btn-success" style={{ padding: '0.5rem 2rem' }}>Send Announcement</button>
      </div>
    </div>
  )
}
