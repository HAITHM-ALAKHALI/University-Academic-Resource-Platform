// import { useState } from 'react'
import type { NavState } from './StudentApp'

const navItems = [
  { icon: '⊞',  label: 'الرئيسية',         screen: 'home'         },
  // { icon: '🎓', label: 'تصفح الجامعات',     screen: 'universities' },
  // { icon: '⭐', label: 'المفضلة',            screen: 'home'         },
  // { icon: '🕐', label: 'آخر الملفات',       screen: 'home'         },
  // { icon: '🔔', label: 'الإشعارات',          screen: 'home'         },
  // { icon: '🌐', label: 'المصادر الخارجية',  screen: 'home'         },
  { icon: 'ℹ',  label: 'حول الموقع',        screen: 'home'         },
]

// const recentCourses = [
//   { name: 'برمجة 1',         color: '#3B82F6' },
//   { name: 'هياكل البيانات',  color: '#8B5CF6' },
//   { name: 'رياضيات',         color: '#06B6D4' },
// ]

interface Props {
  nav: NavState
  navigate: (state: NavState) => void
  collapsed: boolean
  onToggle: () => void
  onSwitchAdmin: () => void
}

export default function Sidebar({ nav, navigate, collapsed, onToggle, onSwitchAdmin }: Props) {
  // const [showRecent, setShowRecent] = useState(true)

  const isActive = (screen: string) =>
    (screen === 'home' && nav.screen === 'home') ||
    (screen === 'universities' && nav.screen !== 'home')

  return (
    <aside style={{
      position: 'fixed', top: 0, right: 0,
      width: collapsed ? 72 : 260,
      height: '100vh',
      background: 'rgba(10,15,30,0.97)',
      borderLeft: '1px solid var(--border-subtle)',
      backdropFilter: 'blur(20px)',
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.3s ease',
      zIndex: 100, overflow: 'hidden'
    }}>

      {/* Logo */}
      <div style={{
        padding: collapsed ? '18px 0' : '18px 20px',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex', alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between', gap: 10
      }}>
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, flexShrink: 0
            }}>🎓</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--text-primary)' }}>UniHub</div>
              <div style={{ fontSize: 10, color: 'var(--accent-blue)', fontWeight: 600 }}>بوابة الموارد الأكاديمية</div>
            </div>
          </div>
        )}
        {collapsed && (
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
          }}>🎓</div>
        )}
        <button onClick={onToggle} style={{
          background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)',
          borderRadius: 8, cursor: 'pointer', color: 'var(--text-secondary)',
          fontSize: 16, width: 28, height: 28,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0
        }}>{collapsed ? '‹' : '›'}</button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px 0', overflowY: 'auto', overflowX: 'hidden' }}>
        {navItems.map(item => {
          const active = isActive(item.screen)
          return (
            <button
              key={item.label}
              onClick={() => navigate({ screen: item.screen as NavState['screen'] })}
              style={{
                width: '100%', display: 'flex', alignItems: 'center',
                gap: 12, padding: collapsed ? '12px 0' : '10px 18px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                background: active && item.screen !== 'home' ? 'rgba(59,130,246,0.1)' : 'none',
                border: 'none', cursor: 'pointer',
                borderRight: active && item.screen !== 'home' ? '2px solid var(--accent-blue)' : '2px solid transparent',
                transition: 'all 0.15s'
              }}
            >
              <span style={{ fontSize: 18, flexShrink: 0, opacity: active ? 1 : 0.65 }}>{item.icon}</span>
              {!collapsed && (
                <span style={{
                  fontSize: 13, fontWeight: active ? 600 : 400,
                  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                  whiteSpace: 'nowrap', flex: 1, textAlign: 'right'
                }}>{item.label}</span>
              )}
            </button>
          )
        })}

        {/* Recent courses section */}
        {/* {!collapsed && (
          <div style={{ padding: '14px 18px 6px' }}>
            <button
              onClick={() => setShowRecent(!showRecent)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                display: 'flex', alignItems: 'center', gap: 6, width: '100%'
              }}
            >
              <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', flex: 1, textAlign: 'right' }}>آخر المواد</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', transform: showRecent ? 'rotate(0)' : 'rotate(-90deg)', transition: 'transform 0.2s', display: 'inline-block' }}>▾</span>
            </button>
            {showRecent && (
              <div style={{ marginTop: 8 }}>
                {recentCourses.map(c => (
                  <button key={c.name} style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 8px', background: 'none', border: 'none',
                    cursor: 'pointer', borderRadius: 8, transition: 'background 0.15s'
                  }} className="sidebar-item">
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%', background: c.color, flexShrink: 0
                    }} />
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)', flex: 1, textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )} */}
      </nav>

      {/* Switch to Admin */}
      {!collapsed && (
        <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border-subtle)' }}>
          <button onClick={onSwitchAdmin} style={{
            width: '100%', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)',
            borderRadius: 10, padding: '9px 14px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent-purple-light)'
          }}>
            <span style={{ fontSize: 15 }}>⚙</span>
            <span style={{ fontSize: 12, fontWeight: 600 }}>لوحة المشرف</span>
          </button>
        </div>
      )}

      {/* User */}
      {/* <div style={{
        padding: collapsed ? '14px 0' : '14px 16px',
        borderTop: !collapsed ? 'none' : '1px solid var(--border-subtle)',
        display: 'flex', alignItems: 'center', gap: 10,
        justifyContent: collapsed ? 'center' : 'flex-start'
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0
        }}>عم</div>
        {!collapsed && (
          <>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>عبد الرحمن</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>طالب · جامعة القاهرة</div>
            </div>
            <button style={{
              background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 16
            }}>⏻</button>
          </>
        )}
      </div> */}
    </aside>
  )
}
