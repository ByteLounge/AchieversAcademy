import React from 'react'
import { Users, GraduationCap, CreditCard, Activity } from 'lucide-react'

export default function Overview() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-md" style={{ marginBottom: '2rem' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <p className="text-muted" style={{ fontSize: '0.875rem' }}>Total Students</p>
              <h3 style={{ fontSize: '2rem', margin: 0 }}>142</h3>
            </div>
            <div style={{ backgroundColor: 'var(--color-primary-light)', padding: '0.75rem', borderRadius: 'var(--radius-md)', color: 'var(--color-primary)' }}>
              <Users size={24} />
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>+12 this month</p>
        </div>
        
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <p className="text-muted" style={{ fontSize: '0.875rem' }}>Active Classes</p>
              <h3 style={{ fontSize: '2rem', margin: 0 }}>6</h3>
            </div>
            <div style={{ backgroundColor: 'var(--color-success-bg)', padding: '0.75rem', borderRadius: 'var(--radius-md)', color: 'var(--color-success)' }}>
              <GraduationCap size={24} />
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-success)' }}>Grades 5 through 10</p>
        </div>
        
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <p className="text-muted" style={{ fontSize: '0.875rem' }}>Pending Fees</p>
              <h3 style={{ fontSize: '2rem', margin: 0 }}>8</h3>
            </div>
            <div style={{ backgroundColor: 'var(--color-warning-bg)', padding: '0.75rem', borderRadius: 'var(--radius-md)', color: 'var(--color-warning)' }}>
              <CreditCard size={24} />
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Require verification</p>
        </div>
        
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <p className="text-muted" style={{ fontSize: '0.875rem' }}>Avg. Attendance</p>
              <h3 style={{ fontSize: '2rem', margin: 0 }}>94%</h3>
            </div>
            <div style={{ backgroundColor: 'var(--color-danger-bg)', padding: '0.75rem', borderRadius: 'var(--radius-md)', color: 'var(--color-danger)' }}>
              <Activity size={24} />
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-success)' }}>+2% from last week</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Grade-wise Distribution</h3>
          </div>
          <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', paddingTop: '2rem' }}>
            {/* Simple CSS Bar Chart Representation */}
            {[
              { grade: 5, count: 24, max: 40 },
              { grade: 6, count: 30, max: 40 },
              { grade: 7, count: 28, max: 40 },
              { grade: 8, count: 35, max: 40 },
              { grade: 9, count: 15, max: 40 },
              { grade: 10, count: 10, max: 40 }
            ].map(col => (
              <div key={col.grade} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '40px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{col.count}</span>
                <div style={{ width: '100%', height: `${(col.count / col.max) * 200}px`, backgroundColor: 'var(--color-primary)', borderRadius: '4px 4px 0 0', opacity: 0.8 }}></div>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-secondary)' }}>G{col.grade}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Activity</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-success)', marginTop: '6px' }}></div>
              <div>
                <p style={{ margin: 0, fontWeight: 500 }}>Fee Verified - Rahul Sharma (Grade 8)</p>
                <p className="text-muted" style={{ margin: 0, fontSize: '0.75rem' }}>10 minutes ago by Admin</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-warning)', marginTop: '6px' }}></div>
              <div>
                <p style={{ margin: 0, fontWeight: 500 }}>New Registration - Priya Patel (Grade 5)</p>
                <p className="text-muted" style={{ margin: 0, fontSize: '0.75rem' }}>1 hour ago</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', marginTop: '6px' }}></div>
              <div>
                <p style={{ margin: 0, fontWeight: 500 }}>Grade 10 Math Test Marks Uploaded</p>
                <p className="text-muted" style={{ margin: 0, fontSize: '0.75rem' }}>Yesterday at 4:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
