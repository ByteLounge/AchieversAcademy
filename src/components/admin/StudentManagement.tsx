import { useState, useEffect } from 'react'
import { Search, Plus, Edit, Trash2, Loader } from 'lucide-react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../lib/firebase'

export default function StudentManagement() {
  const [selectedGrade, setSelectedGrade] = useState('All')
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'students'))
        const studentsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        // sort by most recent if createdAt exists
        studentsData.sort((a: any, b: any) => (b.createdAt || '').localeCompare(a.createdAt || ''))
        setStudents(studentsData)
      } catch (err) {
        console.error("Error fetching students: ", err)
      } finally {
        setLoading(false)
      }
    }
    fetchStudents()
  }, [])

  const filteredStudents = selectedGrade === 'All' ? students : students.filter(s => s.grade === selectedGrade)

  return (
    <div className="card">
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="card-title">Student Directory</h3>
        <button className="btn btn-primary">
          <Plus size={18} /> Add New Student
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flexGrow: 1, maxWidth: '400px' }}>
          <Search size={18} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--color-text-muted)' }} />
          <input type="text" className="form-input" placeholder="Search student by name or ID..." style={{ paddingLeft: '2.5rem' }} />
        </div>
        
        <select className="form-select" style={{ width: 'auto' }} value={selectedGrade} onChange={e => setSelectedGrade(e.target.value)}>
          <option value="All">All Grades</option>
          {[5,6,7,8,9,10].map(g => <option key={g} value={g.toString()}>Grade {g}</option>)}
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Grade</th>
              <th>Mobile Number</th>
              <th>Admission Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                  <Loader className="text-primary" size={24} style={{ animation: 'spin 1s linear infinite' }} />
                  <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                </td>
              </tr>
            ) : filteredStudents.map(student => (
              <tr key={student.id}>
                <td style={{ fontWeight: 500, color: 'var(--color-secondary)' }}>{student.id.slice(0, 8).toUpperCase()}</td>
                <td>{student.studentName || student.name}</td>
                <td><span className="badge badge-primary">Grade {student.grade}</span></td>
                <td>{student.mobile}</td>
                <td>{student.date}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn" style={{ padding: '0.25rem', backgroundColor: '#eff6ff', color: '#2563eb' }} title="Edit"><Edit size={16} /></button>
                    <button className="btn" style={{ padding: '0.25rem', backgroundColor: '#fee2e2', color: '#ef4444' }} title="Delete"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>No students found matching your criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
