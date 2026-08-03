import type { Dispatch, SetStateAction } from 'react'
import type { Page } from '../App'
import type { Lang } from '../data'
import { t, courses } from '../data'
import Navbar from "../Components/Navbar";

interface Props {
  dark: boolean
  lang: Lang
  setDark: Dispatch<SetStateAction<boolean>>
  setLang: Dispatch<SetStateAction<Lang>>
  setPage: Dispatch<SetStateAction<Page>>
  openCourse: (id: string) => void
}

const stats = [
  { key: 'universities', value: '24', icon: '🏛' },
  { key: 'courses', value: '3,400+', icon: '📚' },
  { key: 'resources', value: '87,000+', icon: '📄' },
  { key: 'students', value: '220,000+', icon: '🎓' },
]

const featureIcons = [
  <svg key="org" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  <svg key="pdf" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>,
  <svg key="search" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  <svg key="student" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
]

export default function LandingPage({ dark, lang, setDark, setLang, setPage, openCourse }: Props) {
  const tx = t[lang]
  const featured = courses.slice(0, 3)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      <Navbar dark={dark} lang={lang} setDark={setDark} setLang={setLang} setPage={setPage} currentPage="landing" />

      {/* Hero */}
      <section style={{ padding: '80px 24px 72px', textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
        <span style={{
          display: 'inline-block', padding: '4px 12px', borderRadius: 99,
          backgroundColor: 'var(--secondary)', color: 'var(--primary)',
          fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
          marginBottom: 24, fontFamily: 'JetBrains Mono, monospace',
        }}>
          {tx.hero.badge}
        </span>
        <h1 style={{
          fontFamily: 'Outfit, sans-serif', fontWeight: 800,
          fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.15,
          color: 'var(--foreground)', marginBottom: 20,
          whiteSpace: 'pre-line',
        }}>
          {tx.hero.title}
        </h1>
        <p style={{ fontSize: 17, color: 'var(--muted-foreground)', lineHeight: 1.7, marginBottom: 36, maxWidth: 580, margin: '0 auto 36px' }}>
          {tx.hero.subtitle}
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setPage('course')}
            style={{
              padding: '12px 24px', borderRadius: 9, border: 'none', cursor: 'pointer',
              fontSize: 15, fontWeight: 600,
              backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {tx.hero.browseCourses}
          </button>
          <button
            onClick={() => setPage('admin')}
            style={{
              padding: '12px 24px', borderRadius: 9, cursor: 'pointer',
              fontSize: 15, fontWeight: 600,
              backgroundColor: 'transparent', color: 'var(--foreground)',
              border: '1.5px solid var(--border)',
              transition: 'border-color 0.15s, background-color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--foreground)' }}
          >
            {tx.hero.joinPlatform}
          </button>
        </div>
      </section>

      {/* Hierarchy Diagram */}
      <section style={{ padding: '0 24px 80px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{
          backgroundColor: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 16, padding: '40px 32px',
        }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 20, marginBottom: 8, textAlign: 'center', color: 'var(--foreground)' }}>
            {tx.hierarchy.title}
          </h2>
          <p style={{ fontSize: 14, color: 'var(--muted-foreground)', textAlign: 'center', marginBottom: 40 }}>
            {tx.hierarchy.subtitle}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, flexWrap: 'wrap' }}>
            {tx.hierarchy.levels.map((level, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  padding: '14px 20px',
                  backgroundColor: i === 4 ? 'var(--primary)' : 'var(--secondary)',
                  color: i === 4 ? 'var(--primary-foreground)' : 'var(--foreground)',
                  borderRadius: 10,
                  minWidth: 110,
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    backgroundColor: i === 4 ? 'rgba(255,255,255,0.2)' : 'var(--muted)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18,
                  }}>
                    {['🏛', '🏫', '📐', '📊', '📚'][i]}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{level}</span>
                  <span style={{
                    fontSize: 10, fontFamily: 'JetBrains Mono, monospace',
                    opacity: 0.6, fontWeight: 500,
                  }}>
                    {['24', '180', '640', '4 levels', '3,400+'][i]}
                  </span>
                </div>
                {i < 4 && (
                  <div style={{ display: 'flex', alignItems: 'center', padding: '0 4px' }}>
                    <div style={{ width: 24, height: 1.5, backgroundColor: 'var(--border)' }} />
                    <svg width="8" height="8" viewBox="0 0 8 8" style={{ color: 'var(--border)', flexShrink: 0 }}>
                      <path d={lang === 'ar' ? 'M6 1L2 4L6 7' : 'M2 1L6 4L2 7'} stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {stats.map(s => (
              <div key={s.key} style={{
                backgroundColor: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 12, padding: '24px 20px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 28, color: 'var(--primary)', marginBottom: 4 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted-foreground)', fontWeight: 500 }}>
                  {tx.stats[s.key as keyof typeof tx.stats]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '0 24px 80px', backgroundColor: 'var(--card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', paddingTop: 64, paddingBottom: 64 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--foreground)', marginBottom: 10, whiteSpace: 'pre-line' }}>
              {tx.features.title}
            </h2>
            <p style={{ fontSize: 15, color: 'var(--muted-foreground)' }}>{tx.features.subtitle}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {tx.features.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  backgroundColor: 'var(--secondary)', color: 'var(--primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {featureIcons[i]}
                </div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--foreground)' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.65 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Cards */}
      <section style={{ padding: '64px 24px 80px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 8 }}>
            <div>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 26, color: 'var(--foreground)', marginBottom: 4 }}>
                {tx.courses.title}
              </h2>
              <p style={{ fontSize: 13, color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono, monospace' }}>
                {tx.courses.subtitle}
              </p>
            </div>
            <button
              onClick={() => setPage('course')}
              style={{
                fontSize: 13, fontWeight: 600, color: 'var(--primary)',
                backgroundColor: 'transparent', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 4,
              }}
            >
              {lang === 'ar' ? 'عرض الكل' : 'View all'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={lang === 'ar' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
              </svg>
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {featured.map(course => (
              <CourseCard key={course.id} course={course} lang={lang} tx={tx} openCourse={openCourse} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>
          © 2024 UniResources · {lang === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}
        </p>
      </footer>
    </div>
  )
}

function CourseCard({ course, lang, tx, openCourse }: {
  course: typeof courses[0]; lang: Lang; tx: (typeof t)['en']; openCourse: (id: string) => void
}) {
  const info = lang === 'ar' ? course.ar : course.en
  return (
    <div style={{
      backgroundColor: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 14, overflow: 'hidden',
      transition: 'transform 0.15s, box-shadow 0.15s',
      cursor: 'pointer',
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none' }}
    >
      <div style={{ height: 5, backgroundColor: course.color }} />
      <div style={{ padding: '20px 20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
            color: course.color, fontFamily: 'JetBrains Mono, monospace',
          }}>
            {course.code}
          </span>
          <span style={{
            fontSize: 11, padding: '2px 8px', borderRadius: 99,
            backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)',
          }}>
            {info.level.split('·')[0].trim()}
          </span>
        </div>
        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--foreground)', marginBottom: 6, lineHeight: 1.35 }}>
          {info.name}
        </h3>
        <p style={{ fontSize: 12, color: 'var(--muted-foreground)', marginBottom: 16 }}>{info.instructor}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--muted-foreground)', fontSize: 12 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
            <span><strong style={{ color: 'var(--foreground)', fontWeight: 600 }}>{course.resourceCount}</strong> {tx.courses.resources}</span>
          </div>
          <button
            onClick={() => openCourse(course.id)}
            style={{
              padding: '6px 14px', borderRadius: 7, border: 'none', cursor: 'pointer',
              fontSize: 12, fontWeight: 600,
              backgroundColor: 'var(--secondary)', color: 'var(--primary)',
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--primary)', e.currentTarget.style.color = 'var(--primary-foreground)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--secondary)', e.currentTarget.style.color = 'var(--primary)')}
          >
            {tx.courses.access}
          </button>
        </div>
      </div>
    </div>
  )
}
