import { useState, useEffect } from 'react'
import { STATS } from '../data'

const WORDS  = ['FAST.', 'BOLD.', 'REAL.']
const COLORS = ['var(--yellow)', 'var(--pink)', 'var(--cyan)']

export default function Hero() {
  const [wi, setWi] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setWi(x => (x + 1) % WORDS.length), 1800)
    return () => clearInterval(t)
  }, [])

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      style={{
        minHeight: '100vh', position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center',
        padding: '8rem 2.5rem 5rem',
      }}
    >
      {/* bg glows */}
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,225,53,.13),transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-15%', left: '-8%', width: 550, height: 550, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,60,172,.1),transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '35%', left: '48%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,245,255,.07),transparent 70%)', pointerEvents: 'none' }} />

      {/* floating decorations */}
      <div style={{ position: 'absolute', top: '16%', right: '10%', fontSize: '3.5rem', animation: 'float 3.5s ease-in-out infinite', userSelect: 'none', opacity: .55 }}>⚡</div>
      <div style={{ position: 'absolute', top: '62%', right: '5%', fontSize: '2.2rem', animation: 'float 4.8s ease-in-out infinite .8s', userSelect: 'none', opacity: .4 }}>◈</div>
      <div style={{ position: 'absolute', bottom: '22%', left: '6%', fontSize: '2.8rem', animation: 'float 5s ease-in-out infinite 1.5s', userSelect: 'none', opacity: .35 }}>✦</div>

      {/* spinning badge */}
      <div style={{ position: 'absolute', top: '20%', left: '52%', width: 110, height: 110, animation: 'spin 14s linear infinite' }}>
        <svg viewBox="0 0 110 110" style={{ width: '100%', height: '100%' }}>
          <path id="cp" d="M55,55 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" fill="none" />
          <text fill="rgba(255,255,255,.3)" fontSize="10" fontFamily="var(--ff-mono)" letterSpacing="2.5">
            <textPath href="#cp">WEB APP • AI • CLOUD • MOBILE • </textPath>
          </text>
        </svg>
      </div>

      <div style={{ maxWidth: 1100, width: '100%', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* label */}
        <div style={{ marginBottom: '1.5rem', animation: 'fadeIn .6s ease both' }}>
          <span style={{
            fontFamily: 'var(--ff-mono)', fontSize: '.72rem', letterSpacing: '.2em',
            textTransform: 'uppercase', background: 'var(--yellow)', color: '#0D0D0D',
            padding: '.3rem .9rem', fontWeight: 700,
          }}>
            Tokyo Dev Studio
          </span>
        </div>

        {/* headline */}
        <h1 style={{
          fontFamily: 'var(--ff-disp)', fontSize: 'clamp(4.5rem,12vw,10rem)',
          lineHeight: .93, letterSpacing: '.01em', marginBottom: '1.2rem',
          animation: 'fadeUp .7s cubic-bezier(.22,1,.36,1) .1s both',
        }}>
          WE BUILD<br />
          <span style={{ color: COLORS[wi], transition: 'color .35s', textShadow: `0 0 70px ${COLORS[wi]}55` }}>
            {WORDS[wi]}
          </span>
        </h1>

        {/* sub */}
        <p style={{
          maxWidth: 520, fontSize: '1.05rem', lineHeight: 1.85,
          color: 'rgba(240,240,240,.6)', marginBottom: '2.5rem',
          animation: 'fadeUp .7s cubic-bezier(.22,1,.36,1) .2s both',
        }}>
          スタートアップから大手まで。<br />
          Webアプリ・AI・モバイルを<strong style={{ color: 'var(--fg)' }}>高速・高品質</strong>に届けるデジタルスタジオです。
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', animation: 'fadeUp .7s cubic-bezier(.22,1,.36,1) .3s both' }}>
          <button className="btn btn-yellow" onClick={() => scrollTo('#services')}>サービスを見る ↓</button>
          <button className="btn btn-outline" onClick={() => scrollTo('#contact')}>無料相談する</button>
        </div>

        {/* stats */}
        <div style={{
          display: 'flex', gap: '3rem', flexWrap: 'wrap',
          marginTop: '4rem', paddingTop: '2.5rem',
          borderTop: '2px solid rgba(255,255,255,.07)',
          animation: 'fadeUp .7s cubic-bezier(.22,1,.36,1) .4s both',
        }}>
          {STATS.map(({ value, label, color }) => (
            <div key={label}>
              <div style={{ fontFamily: 'var(--ff-disp)', fontSize: 'clamp(2.2rem,4vw,3.2rem)', color, lineHeight: 1 }}>{value}</div>
              <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '.7rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(240,240,240,.38)', marginTop: '.2rem' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
