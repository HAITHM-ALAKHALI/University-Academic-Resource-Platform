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
      background: 'rgba(53, 66, 94, 0.96)',
      borderLeft: '1px solid rgba(110, 124, 139, 0.35)',
      backdropFilter: 'blur(24px) saturate(1.2)',
      WebkitBackdropFilter: 'blur(24px) saturate(1.2)',
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 100, overflow: 'hidden',
      boxShadow: '-4px 0 32px rgba(42, 53, 78, 0.4)',
    }}>

      {/* Logo */}
      <div style={{
        padding: collapsed ? '18px 0' : '18px 20px',
        borderBottom: '1px solid rgba(110, 124, 139, 0.35)',
        display: 'flex', alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between', gap: 10,
        transition: 'padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #525C79, #899C9A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, flexShrink: 0,
              boxShadow: '0 4px 12px rgba(53, 66, 94, 0.4)',
            }}>🎓</div>
            <div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 16, color: '#F4F7F6', letterSpacing: '-0.02em' }}>دراستي</div>
              <div style={{ fontSize: 10, color: '#899C9A', fontWeight: 600 }}>بوابة الموارد الأكاديمية</div>
            </div>
          </div>
        )}
        {collapsed && (
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #525C79, #899C9A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
            boxShadow: '0 4px 12px rgba(53, 66, 94, 0.4)',
          }}>🎓</div>
        )}
        <button onClick={onToggle} style={{
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(110, 124, 139, 0.4)',
          borderRadius: 8, cursor: 'pointer', color: '#AABCAF',
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
                background: active && item.screen !== 'home' ? 'rgba(137,156,154,0.18)' : 'none',
                border: 'none', cursor: 'pointer',
                borderRight: active && item.screen !== 'home' ? '2px solid #899C9A' : '2px solid transparent',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
              }}
              className="sidebar-item"
            >
              <span style={{
                fontSize: 18, flexShrink: 0, opacity: active ? 1 : 0.75,
                color: active ? '#899C9A' : '#AABCAF',
                transition: 'opacity 0.2s, transform 0.2s',
              }}>{item.icon}</span>
              {!collapsed && (
                <span style={{
                  fontSize: 13, fontWeight: active ? 700 : 500,
                  color: active ? '#F4F7F6' : '#AABCAF',
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
        <div style={{ padding: '10px 16px', borderTop: '1px solid rgba(110, 124, 139, 0.35)' }}>
          <button onClick={onSwitchAdmin} style={{
            width: '100%', background: 'rgba(82,92,121,0.6)', border: '1px solid rgba(137,156,154,0.35)',
            borderRadius: 10, padding: '9px 14px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8, color: '#F4F7F6',
            transition: 'all 0.2s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(82,92,121,0.9)'; e.currentTarget.style.borderColor = '#899C9A' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(82,92,121,0.6)'; e.currentTarget.style.borderColor = 'rgba(137,156,154,0.35)' }}
          >
            <span style={{ fontSize: 15 }}>⚙</span>
            <span style={{ fontSize: 12, fontWeight: 600 }}>لوحة المشرف</span>
          </button>
        </div>
      )}
    </aside>
  )
}
