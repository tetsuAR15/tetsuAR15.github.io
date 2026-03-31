import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.2rem 2.5rem',
        background: scrolled ? 'rgba(13,13,13,.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '2px solid rgba(255,255,255,.07)' : 'none',
        transition: 'all .3s',
      }}
    >
      <div style={{ fontFamily: 'var(--ff-disp)', fontSize: '1.9rem', letterSpacing: '.05em', lineHeight: 1 }}>
        GaiZ<span style={{ color: 'var(--yellow)' }}>Go</span>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button
          className="btn btn-outline"
          style={{ padding: '.55rem 1.3rem', fontSize: '.72rem' }}
          onClick={() => scrollTo('#services')}
        >
          サービス
        </button>
        <button
          className="btn btn-yellow"
          style={{ padding: '.55rem 1.3rem', fontSize: '.72rem' }}
          onClick={() => scrollTo('#contact')}
        >
          相談する →
        </button>
      </div>
    </nav>
  )
}
