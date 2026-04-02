
export default function HeroSection({ onRegisterClick }: { onRegisterClick: () => void }) {
  return (
    <section className="hero">
      <div className="container">
        <h1>Welcome to <span className="text-primary">Achievers Academy</span></h1>
        <p>Coaching Classes for Grade 5 to Grade 10. We empower students with knowledge and skills to achieve academic excellence.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <button className="btn btn-primary" onClick={onRegisterClick} style={{ padding: '0.75rem 2rem', fontSize: '1.125rem' }}>
            Admission / Registration
          </button>
        </div>
      </div>
    </section>
  )
}
