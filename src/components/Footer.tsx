import { DOT_COLORS } from '../data'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '2px solid rgba(255,255,255,.07)',
        padding: '2.5rem 2.5rem',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
      }}
    >
      <div style={{ fontFamily: 'var(--ff-disp)', fontSize: '1.5rem', letterSpacing: '.05em' }}>
        VOLT<span style={{ color: 'var(--yellow)' }}>LAB</span>
      </div>

      <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '.7rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(240,240,240,.28)' }}>
        © 2024 VoltLab Inc. — Tokyo, Japan
      </div>

      <div style={{ display: 'flex', gap: '.5rem' }}>
        {DOT_COLORS.map((c, i) => (
          <div
            key={i}
            style={{ width: 9, height: 9, borderRadius: '50%', background: c, animation: `blink ${1.2 + i * 0.3}s ease-in-out infinite` }}
          />
        ))}
      </div>
    </footer>
  )
}
