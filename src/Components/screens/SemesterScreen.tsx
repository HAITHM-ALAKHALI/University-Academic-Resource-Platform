import type { NavState } from '../StudentApp'
import TopBar from '../TopBar'

const semesters = [
  { id: 1, name: 'الترم الأول', courses: 6, files: 124, color: '#3B82F6' },
  { id: 2, name: 'الترم الثاني', courses: 6, files: 118, color: '#8B5CF6' },
]

interface Props { nav: NavState; navigate: (s: NavState) => void }

export default function SemesterScreen({ nav, navigate }: Props) {
  return (
    <div className="fade-in">
      <TopBar breadcrumbs={[
        { label: 'الرئيسية', onClick: () => navigate({ screen: 'home' }) },
        { label: nav.university?.name ?? '', onClick: () => navigate({ ...nav, screen: 'colleges' }) },
        { label: nav.department?.name ?? '', onClick: () => navigate({ ...nav, screen: 'levels' }) },
        { label: nav.level?.name ?? '' }
      ]} title={`${nav.department?.name} — ${nav.level?.name}`} subtitle="اختر الترم الدراسي" />
      <div style={{ padding: '32px 32px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 700 }}>
          {semesters.map(sem => (
            <div key={sem.id}
              onClick={() => navigate({ ...nav, screen: 'courses', semester: { id: sem.id, name: sem.name } })}
              className="dept-card"
              style={{
                background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                borderRadius: 20, padding: '32px 28px', cursor: 'pointer', textAlign: 'center'
              }}
            >
              <div style={{
                width: 64, height: 64, borderRadius: 18,
                background: sem.color + '20',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, margin: '0 auto 16px', color: sem.color
              }}>📅</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>{sem.name}</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: sem.color }}>{sem.courses}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>مادة</div>
                </div>
                <div style={{ width: 1, background: 'var(--border-subtle)' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: sem.color }}>{sem.files}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>ملف</div>
                </div>
              </div>
              <button style={{
                marginTop: 18, background: 'linear-gradient(135deg, ' + sem.color + ', ' + sem.color + '99)',
                border: 'none', borderRadius: 10, padding: '10px 24px',
                color: '#fff', fontWeight: 600, fontSize: 13, cursor: 'pointer', width: '100%'
              }}>عرض المواد ←</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
