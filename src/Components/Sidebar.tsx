import type { NavState } from './StudentApp'

const navItems = [
  { icon: '⊞',  label: 'الرئيسية',         screen: 'home'         },
  { icon: 'ℹ',  label: 'حول الموقع',        screen: 'home'         },
]

interface Props {
  nav: NavState
  navigate: (state: NavState) => void
  collapsed: boolean
  onToggle: () => void
  onSwitchAdmin: () => void
}

export default function Sidebar({ nav, navigate, collapsed, onToggle, onSwitchAdmin }: Props) {
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
      backdropFilter: 'blur(24px) saturate(1.2)',
      WebkitBackdropFilter: 'blur(24px) saturate(1.2)',
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 100, overflow: 'hidden',
      boxShadow: '-4px 0 32px rgba(0, 0, 0, 0.15)',
    }}>

      {/* Logo */}
      <div style={{
        padding: collapsed ? '18px 0' : '18px 20px',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex', alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between', gap: 10,
        transition: 'padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, flexShrink: 0,
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
            }}>🎓</div>
            <div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 16, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>UniHub</div>
              <div style={{ fontSize: 10, color: 'var(--accent-blue)', fontWeight: 600 }}>بوابة الموارد الأكاديمية</div>
            </div>
          </div>
        )}
        {collapsed && (
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
          }}>🎓</div>
        )}
        <button onClick={onToggle} style={{
          background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-subtle)',
          borderRadius: 8, cursor: 'pointer', color: 'var(--text-secondary)',
          fontSize: 16, width: 28, height: 28,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'all 0.2s ease',
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
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
              }}
              className="sidebar-item"
            >
              <span style={{
                fontSize: 18, flexShrink: 0, opacity: active ? 1 : 0.65,
                transition: 'opacity 0.2s, transform 0.2s',
              }}>{item.icon}</span>
              {!collapsed && (
                <span style={{
                  fontSize: 13, fontWeight: active ? 600 : 400,
                  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                  whiteSpace: 'nowrap', flex: 1, textAlign: 'right',
                  transition: 'color 0.2s',
                }}>{item.label}</span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Switch to Admin */}
      {!collapsed && (
        <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border-subtle)' }}>
          <button onClick={onSwitchAdmin} style={{
            width: '100%', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)',
            borderRadius: 10, padding: '9px 14px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent-purple-light)',
            transition: 'all 0.2s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.18)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.35)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.1)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.2)' }}
          >
            <span style={{ fontSize: 15 }}>⚙</span>
            <span style={{ fontSize: 12, fontWeight: 600 }}>لوحة المشرف</span>
          </button>
        </div>
      )}
    </aside>
  )
}
