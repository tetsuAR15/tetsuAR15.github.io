import { useInView } from '../hooks/useInView'
import { SERVICES } from '../data'

export default function Services() {
  const [ref, vis] = useInView()

  return (
    <section id="services" ref={ref as React.RefObject<HTMLElement>} style={{ padding: '7rem 2.5rem', maxWidth: 1300, margin: '0 auto' }}>
      {/* header */}
      <div
        className={`reveal ${vis ? 'show' : ''}`}
        style={{ marginBottom: '4rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}
      >
        <div>
          <p className="section-label">What We Do</p>
          <h2 style={{ fontFamily: 'var(--ff-disp)', fontSize: 'clamp(3.5rem,7vw,6rem)', lineHeight: .93, letterSpacing: '.02em' }}>
            OUR<br /><span style={{ color: 'var(--yellow)' }}>SERVICES</span>
          </h2>
        </div>
        <p style={{ maxWidth: 380, color: 'rgba(240,240,240,.5)', lineHeight: 1.85, fontSize: '.95rem' }}>
          アイデアから本番リリースまで。<br />
          必要なすべてのスタックをワンストップで提供します。
        </p>
      </div>

      {/* cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(360px,1fr))', gap: '1.5rem' }}>
        {SERVICES.map((s, i) => (
          <div
            key={s.num}
            className={`scard reveal ${vis ? 'show' : ''}`}
            style={{ animationDelay: `${i * 0.09}s`, borderColor: s.color, boxShadow: `6px 6px 0 ${s.color}` }}
          >
            {/* top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <span style={{ fontFamily: 'var(--ff-disp)', fontSize: '3.8rem', color: s.color, lineHeight: 1 }}>{s.num}</span>
              <span style={{ fontSize: '1.9rem', animation: `wiggle 3.5s ease-in-out infinite ${i * 0.35}s` }}>{s.emoji}</span>
            </div>

            <h3 style={{
              fontFamily: 'var(--ff-disp)', fontSize: 'clamp(1.9rem,3vw,2.6rem)',
              lineHeight: .93, letterSpacing: '.02em', color: s.color,
              marginBottom: '1rem', whiteSpace: 'pre-line',
            }}>
              {s.title}
            </h3>

            <p style={{ fontSize: '.88rem', lineHeight: 1.8, color: 'rgba(240,240,240,.58)', marginBottom: '1.5rem' }}>
              {s.desc}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
              {s.tags.map(t => (
                <span key={t} className="pill" style={{ color: s.color, borderColor: `${s.color}55` }}>{t}</span>
              ))}
            </div>

            {/* corner accent */}
            <div style={{
              position: 'absolute', bottom: 0, right: 0, width: 56, height: 56,
              background: s.color, clipPath: 'polygon(100% 0,100% 100%,0 100%)', opacity: .12,
            }} />
          </div>
        ))}
      </div>
    </section>
  )
}
