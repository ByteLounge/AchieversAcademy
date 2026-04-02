
export default function Timetable() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="card-header" style={{ padding: '1.5rem', backgroundColor: '#f8fafc', margin: 0 }}>
        <h3 className="card-title" style={{ margin: 0 }}>Weekly Classes</h3>
        <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>Timing: 3:00 PM to 6:00 PM</p>
      </div>
      <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
        <table>
          <thead>
            <tr>
              <th>Grade</th>
              {days.map(day => <th key={day}>{day}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 600 }}>Grade 5 - 7</td>
              <td>Math</td>
              <td>Science</td>
              <td>English</td>
              <td>Social Studies</td>
              <td>Math</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600 }}>Grade 8</td>
              <td>Science</td>
              <td>Math</td>
              <td>Science</td>
              <td>English</td>
              <td>Activity / Test</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600 }}>Grade 9 - 10</td>
              <td>Math</td>
              <td>Math</td>
              <td>Science</td>
              <td>Science</td>
              <td>Test</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
