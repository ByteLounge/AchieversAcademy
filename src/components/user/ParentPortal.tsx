import React from 'react'
import { FileText, Award, Calendar, Bell } from 'lucide-react'

export default function ParentPortal() {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--color-secondary)' }}>Student & Parent Portal</h2>
        <p className="text-muted">Track performance, attendance, and updates.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-md" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', marginBottom: '2rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: 'var(--color-primary-light)', padding: '1rem', borderRadius: '50%', color: 'var(--color-primary)' }}>
            <Award size={24} />
          </div>
          <div>
            <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Average Score</p>
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>85%</h3>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: 'var(--color-success-bg)', padding: '1rem', borderRadius: '50%', color: 'var(--color-success)' }}>
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Attendance</p>
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>92%</h3>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: 'var(--color-warning-bg)', padding: '1rem', borderRadius: '50%', color: 'var(--color-warning)' }}>
            <FileText size={24} />
          </div>
          <div>
            <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Upcoming Tests</p>
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>2</h3>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ backgroundColor: 'var(--color-danger-bg)', padding: '1rem', borderRadius: '50%', color: 'var(--color-danger)' }}>
            <Bell size={24} />
          </div>
          <div>
            <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>New Notices</p>
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>1</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Test Remarks</h3>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Subject</th>
                  <th>Score</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>12 Oct 2026</td>
                  <td>Mathematics</td>
                  <td>18/20</td>
                  <td><span className="badge badge-success">Excellent</span></td>
                </tr>
                <tr>
                  <td>10 Oct 2026</td>
                  <td>Science</td>
                  <td>14/20</td>
                  <td><span className="badge badge-warning">Good</span></td>
                </tr>
                <tr>
                  <td>05 Oct 2026</td>
                  <td>English</td>
                  <td>19/20</td>
                  <td><span className="badge badge-success">Excellent</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Notices & Messages</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', borderLeft: '4px solid var(--color-primary)', backgroundColor: '#f8fafc', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h4 style={{ margin: 0 }}>Diwali Vacation Notice</h4>
                <span className="text-muted" style={{ fontSize: '0.75rem' }}>Today</span>
              </div>
              <p className="text-muted" style={{ fontSize: '0.875rem' }}>Classes will remain closed from 20th Oct to 25th Oct.</p>
            </div>
            <div style={{ padding: '1rem', borderLeft: '4px solid #cbd5e1', backgroundColor: '#f8fafc', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h4 style={{ margin: 0 }}>Fee Reminder</h4>
                <span className="text-muted" style={{ fontSize: '0.75rem' }}>Last Week</span>
              </div>
              <p className="text-muted" style={{ fontSize: '0.875rem' }}>Please complete the Q3 fee payment before the 15th to avoid late fees.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
