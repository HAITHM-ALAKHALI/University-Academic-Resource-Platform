import type { NavState } from '../StudentApp'
import TopBar from '../TopBar'

const levels = [
  { id: 1, name: 'السنة الأولى', year: 1, color: '#3B82F6', icon: '①', courses: 8 },
  { id: 2, name: 'السنة الثانية', year: 2, color: '#8B5CF6', icon: '②', courses: 10 },
  { id: 3, name: 'السنة الثالثة', year: 3, color: '#06B6D4', icon: '③', courses: 10 },
  { id: 4, name: 'السنة الرابعة', year: 4, color: '#10B981', icon: '④', courses: 9 },
]

interface Props { nav: NavState; navigate: (s: NavState) => void }

export default function LevelScreen({ nav, navigate }: Props) {
  return (
    <div className="fade-in">
      <TopBar breadcrumbs={[
        { label: 'الرئيسية', onClick: () => navigate({ screen: 'home' }) },
        { label: 'الجامعات', onClick: () => navigate({ screen: 'universities' }) },
        { label: nav.university?.name ?? '', onClick: () => navigate({ ...nav, screen: 'colleges' }) },
        { label: nav.college?.name ?? '', onClick: () => navigate({ ...nav, screen: 'departments' }) },
        { label: nav.department?.name ?? '' }
      ]} title={nav.department?.name} subtitle="اختر السنة الدراسية" />
      <div style={{ padding: '32px 32px 48px' }}>
        {/* Dept Header */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))',
          border: '1px solid rgba(59,130,246,0.15)',
          borderRadius: 20, padding: '24px 28px', marginBottom: 28,
          display: 'flex', alignItems: 'center', gap: 20
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: (nav.department?.color ?? '#3B82F6') + '25',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 30, color: nav.department?.color ?? '#3B82F6', fontWeight: 700
          }}>{nav.department?.icon ?? '💻'}</div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>{nav.department?.name}</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>{nav.department?.nameEn} — {nav.college?.name}</div>
          </div>
        </div>

        <h2 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 700, color: 'var(--text-secondary)' }}>المستويات الدراسية</h2>

        {/* Levels as accordion-style list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {levels.map(level => (
            <div key={level.id}
              onClick={() => navigate({ ...nav, screen: 'semesters', level: { id: level.id, name: level.name } })}
              style={{
                background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                borderRadius: 14, padding: '18px 22px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'all 0.2s'
              }}
              className="file-row"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: level.color + '20',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, color: level.color, fontWeight: 700
                }}>{level.icon}</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{level.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{level.courses} مادة دراسية</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  fontSize: 12, color: level.color, fontWeight: 600,
                  background: level.color + '15', padding: '3px 10px', borderRadius: 8
                }}>المستوى {level.year}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 20 }}>‹</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
