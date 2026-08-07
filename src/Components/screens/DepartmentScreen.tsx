import { useState } from 'react'
import type { NavState } from '../StudentApp'
import TopBar from '../TopBar'

const departments = [
  { id: 1, name: 'علوم حاسوب', nameEn: 'CS', color: '#3B82F6', icon: '</>', desc: 'Computer Science' },
  { id: 2, name: 'تقنية معلومات', nameEn: 'IT', color: '#8B5CF6', icon: '🖥', desc: 'Information Technology' },
  { id: 3, name: 'أمن سيبراني', nameEn: 'CYS', color: '#EC4899', icon: '🔐', desc: 'Cyber Security' },
  { id: 4, name: 'ذكاء اصطناعي', nameEn: 'AI', color: '#F59E0B', icon: '🤖', desc: 'Artificial Intelligence' },
  { id: 5, name: 'نظم معلومات', nameEn: 'IS', color: '#10B981', icon: '🗄', desc: 'Information Systems' },
  { id: 6, name: 'علم البيانات', nameEn: 'DS', color: '#06B6D4', icon: '📊', desc: 'Data Science' },
]

interface Props { nav: NavState; navigate: (s: NavState) => void }

export default function DepartmentScreen({ nav, navigate }: Props) {
  const [search, setSearch] = useState('')
  const filtered = departments.filter(d => d.name.includes(search) || d.nameEn.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="fade-in">
      <TopBar breadcrumbs={[
        { label: 'الرئيسية', onClick: () => navigate({ screen: 'home' }) },
        { label: 'الجامعات', onClick: () => navigate({ screen: 'universities' }) },
        { label: nav.university?.name ?? '', onClick: () => navigate({ ...nav, screen: 'colleges' }) },
        { label: nav.college?.name ?? '' }
      ]} title={nav.college?.name} subtitle="اختر القسم للمتابعة" />
      <div style={{ padding: '32px 32px 48px' }}>
        <div style={{ position: 'relative', marginBottom: 28, maxWidth: 420 }}>
          <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: 16 }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث عن قسم..."
            style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-medium)', borderRadius: 12, padding: '11px 44px 11px 16px', color: 'var(--text-primary)', fontSize: 14, outline: 'none', direction: 'rtl', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {filtered.map(dept => (
            <div key={dept.id} className="dept-card" style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              borderRadius: 20, padding: '28px 22px', cursor: 'pointer',
              position: 'relative', overflow: 'hidden'
            }}
              onClick={() => navigate({ ...nav, screen: 'levels', department: { id: dept.id, name: dept.name, nameEn: dept.nameEn, color: dept.color, icon: dept.icon } })}
            >
              <div style={{
                position: 'absolute', bottom: -40, left: -40, width: 140, height: 140,
                borderRadius: '50%', background: dept.color + '08'
              }} />
              <div style={{
                width: 60, height: 60, borderRadius: 16,
                background: dept.color + '22',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, marginBottom: 16, fontFamily: 'monospace', fontWeight: 700, color: dept.color
              }}>{dept.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{dept.name}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>{dept.nameEn}</div>
              <div style={{ fontSize: 12, color: dept.color, background: dept.color+'15', padding: '3px 10px', borderRadius: 8, display: 'inline-block' }}>
                {dept.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
