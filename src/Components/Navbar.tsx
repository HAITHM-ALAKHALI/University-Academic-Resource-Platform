import type { Dispatch, SetStateAction } from 'react'
import type { Page } from '../App'
import type { Lang } from '../data.ts'
import { t } from '../data.ts'

interface Props {
  dark: boolean
  lang: Lang
  setDark: Dispatch<SetStateAction<boolean>>
  setLang: Dispatch<SetStateAction<Lang>>
  setPage: Dispatch<SetStateAction<Page>>
  currentPage: Page
}

export default function Navbar({ dark, lang, setDark, setLang, setPage, currentPage }: Props) {
  const tx = t[lang]

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--card)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', height: 60, gap: 8 }}>
        {/* Logo */}
        <button
          onClick={() => setPage('landing')}
          style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            backgroundColor: 'var(--primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" opacity="0.9" />
              <rect x="10" y="2" width="6" height="6" rx="1.5" fill="white" opacity="0.6" />
              <rect x="2" y="10" width="6" height="6" rx="1.5" fill="white" opacity="0.6" />
              <rect x="10" y="10" width="6" height="6" rx="1.5" fill="white" opacity="0.9" />
            </svg>
          </div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 17, color: 'var(--foreground)' }}>
            UniResources
          </span>
        </button>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginInlineStart: 24, flex: 1 }}>
          {(['landing', 'course', 'admin'] as Page[]).map((p) => {
            const label = p === 'landing' ? tx.nav.home : p === 'course' ? tx.nav.courses : tx.nav.admin
            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: currentPage === p ? 600 : 400,
                  backgroundColor: currentPage === p ? 'var(--secondary)' : 'transparent',
                  color: currentPage === p ? 'var(--primary)' : 'var(--muted-foreground)',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (currentPage !== p) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--muted)' }}
                onMouseLeave={e => { if (currentPage !== p) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent' }}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            style={{
              padding: '5px 10px',
              borderRadius: 6,
              border: '1px solid var(--border)',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
              backgroundColor: 'transparent',
              color: 'var(--muted-foreground)',
              fontFamily: 'JetBrains Mono, monospace',
              transition: 'all 0.15s',
            }}
          >
            {lang === 'en' ? 'AR' : 'EN'}
          </button>
          <button
            onClick={() => setDark(!dark)}
            style={{
              width: 36, height: 36,
              borderRadius: 8,
              border: '1px solid var(--border)',
              cursor: 'pointer',
              backgroundColor: 'transparent',
              color: 'var(--muted-foreground)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s',
            }}
            title={dark ? tx.theme.light : tx.theme.dark}
          >
            {dark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setPage('admin')}
            style={{
              padding: '7px 14px',
              borderRadius: 7,
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {tx.nav.join}
          </button>
        </div>
      </div>
    </nav>
  )
}
