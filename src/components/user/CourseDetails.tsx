import React from 'react'
import { BookOpen } from 'lucide-react'

export default function CourseDetails() {
  const courses = [
    {
      grades: "Grade 5 to Grade 7",
      subjects: ["English", "Science", "Mathematics", "Social Studies"]
    },
    {
      grades: "Grade 8",
      subjects: ["English", "Mathematics", "Science"]
    },
    {
      grades: "Grade 9 to Grade 10",
      subjects: ["Mathematics", "Science"]
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-md" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
      {courses.map((course, idx) => (
        <div key={idx} className="card card-interactive">
          <div className="card-header" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ backgroundColor: 'var(--color-primary-light)', padding: '0.75rem', borderRadius: 'var(--radius-md)', color: 'var(--color-primary)' }}>
              <BookOpen size={24} />
            </div>
            <h3 className="card-title" style={{ margin: 0 }}>{course.grades}</h3>
          </div>
          <ul style={{ listStyle: 'none', marginTop: '1rem', padding: 0 }}>
            {course.subjects.map((sub, sidx) => (
              <li key={sidx} style={{ padding: '0.5rem 0', borderBottom: sidx !== course.subjects.length - 1 ? '1px solid #e2e8f0' : 'none', display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', marginRight: '10px' }}></span>
                {sub}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
