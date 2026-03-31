import { useInView } from '../hooks/useInView'
import { PROCESS_STEPS } from '../data'

export default function Process() {
  const [ref, vis] = useInView()

  return (
    <section
      style={{
        background: '#111', padding: '6rem 2.5rem',
        borderTop: '2px solid rgba(255,255,255,.05)',
        borderBottom: '2px solid rgba(255,255,255,.05)',
      }}
    >
      <div ref={ref as React.RefObject<HTMLElement>} style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className={`reveal ${vis ? 'show' : ''}`} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontFamily: 'var(--ff-disp)', fontSize: 'clamp(3rem,6vw,5rem)', letterSpacing: '.02em', lineHeight: .95 }}>
            HOW WE <span style={{ color: 'var(--cyan)' }}>WORK</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: '1.25rem' }}>
          {PROCESS_STEPS.map((s, i) => (
            <div
              key={s.n}
              className={`reveal ${vis ? 'show' : ''}`}
              style={{
                animationDelay: `${i * 0.1}s`,
                padding: '2rem',
                border: `2px solid ${s.color}45`,
                background: `linear-gradient(135deg,${s.color}07 0%,transparent 65%)`,
                transition: 'transform .25s, box-shadow .25s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translate(-4px,-4px)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = `5px 5px 0 ${s.color}`
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = ''
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = ''
              }}
            >
              <div style={{ fontFamily: 'var(--ff-disp)', fontSize: '3.2rem', color: s.color, lineHeight: 1, marginBottom: '.4rem' }}>{s.n}</div>
              <h3 style={{ fontFamily: 'var(--ff-disp)', fontSize: '1.5rem', letterSpacing: '.04em', color: s.color, marginBottom: '.75rem' }}>{s.label}</h3>
              <p style={{ color: 'rgba(240,240,240,.5)', fontSize: '.88rem', lineHeight: 1.75 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
