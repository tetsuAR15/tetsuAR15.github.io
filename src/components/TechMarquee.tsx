import { TECHS, TECH_COLORS } from '../data'

export default function TechMarquee() {
  const items = [...TECHS, ...TECHS]

  return (
    <div className="marquee-wrap" style={{ padding: '1rem 0', background: 'rgba(255,255,255,.02)' }}>
      <div className="marquee-track">
        {items.map((t, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--ff-mono)', fontSize: '.78rem',
              letterSpacing: '.1em', textTransform: 'uppercase',
              padding: '0 2rem', flexShrink: 0,
              color: TECH_COLORS[i % TECH_COLORS.length],
            }}
          >
            {t} <span style={{ opacity: .25, marginLeft: '1rem' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
