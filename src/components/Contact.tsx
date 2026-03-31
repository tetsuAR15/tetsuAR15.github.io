import { useState } from 'react'
import { useInView } from '../hooks/useInView'

interface FormState {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const [ref, vis] = useInView()
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }))

  const submit = () => {
    if (!form.name || !form.email || !form.message) return
    setSent(true)
  }

  return (
    <section id="contact" style={{ padding: '7rem 2.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* bg glows */}
      <div style={{ position: 'absolute', top: '10%', right: '-5%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,225,53,.07),transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '-8%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,245,255,.05),transparent 70%)', pointerEvents: 'none' }} />

      <div ref={ref as React.RefObject<HTMLElement>} style={{ maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* heading */}
        <div className={`reveal ${vis ? 'show' : ''}`} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--yellow)', marginBottom: '1rem' }}>
            ✦ Contact Us ✦
          </div>
          <h2 style={{ fontFamily: 'var(--ff-disp)', fontSize: 'clamp(3.5rem,8vw,6.5rem)', letterSpacing: '.02em', lineHeight: .92, marginBottom: '1.25rem' }}>
            LET'S<br /><span style={{ color: 'var(--pink)' }}>TALK</span>
          </h2>
          <p style={{ color: 'rgba(240,240,240,.5)', lineHeight: 1.85 }}>
            まずはお気軽にどうぞ。<br />1営業日以内にご返信します。
          </p>
        </div>

        {sent ? (
          <div
            className={`reveal ${vis ? 'show' : ''}`}
            style={{ textAlign: 'center', padding: '4rem 2rem', border: '3px solid var(--green)', background: 'rgba(6,255,165,.05)', boxShadow: '8px 8px 0 var(--green)' }}
          >
            <div style={{ fontFamily: 'var(--ff-disp)', fontSize: '4rem', color: 'var(--green)', marginBottom: '.5rem' }}>✓</div>
            <h3 style={{ fontFamily: 'var(--ff-disp)', fontSize: '2.2rem', color: 'var(--green)', letterSpacing: '.05em', marginBottom: '.75rem' }}>SENT!</h3>
            <p style={{ color: 'rgba(240,240,240,.5)' }}>まもなくご連絡いたします。</p>
          </div>
        ) : (
          <div
            className={`reveal ${vis ? 'show' : ''}`}
            style={{ animationDelay: '.15s', border: '2px solid rgba(255,255,255,.1)', padding: '2.5rem', background: 'rgba(255,255,255,.02)', boxShadow: '7px 7px 0 var(--yellow)' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontFamily: 'var(--ff-mono)', fontSize: '.66rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(240,240,240,.38)', display: 'block', marginBottom: '.4rem' }}>
                  お名前 *
                </label>
                <input className="field-input" type="text" placeholder="山田 太郎" value={form.name} onChange={set('name')} />
              </div>
              <div>
                <label style={{ fontFamily: 'var(--ff-mono)', fontSize: '.66rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(240,240,240,.38)', display: 'block', marginBottom: '.4rem' }}>
                  メール *
                </label>
                <input className="field-input" type="email" placeholder="taro@example.com" value={form.email} onChange={set('email')} />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontFamily: 'var(--ff-mono)', fontSize: '.66rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(240,240,240,.38)', display: 'block', marginBottom: '.4rem' }}>
                お問い合わせ内容 *
              </label>
              <textarea className="field-input" rows={5} placeholder="開発したいプロダクトの概要・現在の課題・予算感などをご記入ください" value={form.message} onChange={set('message')} />
            </div>

            <button className="btn btn-yellow" style={{ width: '100%', justifyContent: 'center', padding: '1.1rem', fontSize: '.85rem' }} onClick={submit}>
              送信する →
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
