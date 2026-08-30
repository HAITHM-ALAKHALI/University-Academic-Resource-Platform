import { useState } from 'react'
import type { NavState } from '../StudentApp'
import TopBar from '../TopBar'

const collegesData: Record<number, Array<{ id: number; name: string; nameEn: string; depts: number; color: string; icon: string }>> = {
  1: [
    { id: 1, name: 'كلية علوم الحاسوب والمعلومات', nameEn: 'Faculty of Computer Science', depts: 4, color: '#3B82F6', icon: '💻' },
    { id: 2, name: 'كلية الهندسة', nameEn: 'Faculty of Engineering', depts: 8, color: '#8B5CF6', icon: '⚙' },
    { id: 3, name: 'كلية الطب', nameEn: 'Faculty of Medicine', depts: 12, color: '#EF4444', icon: '⚕' },
    { id: 4, name: 'كلية العلوم', nameEn: 'Faculty of Science', depts: 6, color: '#06B6D4', icon: '🔬' },
    { id: 5, name: 'كلية الاقتصاد والعلوم السياسية', nameEn: 'Faculty of Economics', depts: 5, color: '#10B981', icon: '📊' },
    { id: 6, name: 'كلية الآداب', nameEn: 'Faculty of Arts', depts: 7, color: '#F59E0B', icon: '📖' },
    { id: 7, name: 'كلية الحقوق', nameEn: 'Faculty of Law', depts: 3, color: '#EC4899', icon: '⚖' },
    { id: 8, name: 'كلية التجارة', nameEn: 'Faculty of Commerce', depts: 5, color: '#8B5CF6', icon: '💰' },
  ],
}

interface Props { nav: NavState; navigate: (s: NavState) => void }

export default function CollegeScreen({ nav, navigate }: Props) {
  const [search, setSearch] = useState('')
  const uniId = nav.university?.id ?? 1
  const colleges = (collegesData[uniId] ?? collegesData[1]).filter(c =>
    c.name.includes(search) || c.nameEn.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="fade-in">
      <TopBar breadcrumbs={[
        { label: 'الرئيسية', onClick: () => navigate({ screen: 'home' }) },
        { label: 'الجامعات', onClick: () => navigate({ screen: 'universities' }) },
        { label: nav.university?.name ?? '' }
      ]} title={nav.university?.name} subtitle="اختر الكلية للمتابعة" />
      <div style={{ padding: '32px 32px 48px' }}>
        <div style={{ position: 'relative', marginBottom: 28, maxWidth: 420 }} className="slide-up">
          <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: 16 }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث عن كلية..."
            style={{
              width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-medium)',
              borderRadius: 12, padding: '11px 44px 11px 16px', color: 'var(--text-primary)',
              fontSize: 14, outline: 'none', direction: 'rtl', boxSizing: 'border-box',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent-blue)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-medium)'; e.currentTarget.style.boxShadow = 'none' }}
          />
        </div>
        <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
          {colleges.map(college => (
            <div key={college.id} className="dept-card" style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              borderRadius: 18, padding: '22px 18px', cursor: 'pointer', position: 'relative', overflow: 'hidden'
            }}
              onClick={() => navigate({ ...nav, screen: 'departments', college: { id: college.id, name: college.name, nameEn: college.nameEn } })}
              onMouseEnter={e => { e.currentTarget.style.borderColor = college.color + '40' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
            >
              <div style={{ position: 'absolute', top: -20, left: -20, width: 70, height: 70, borderRadius: '50%', background: college.color + '12' }} />
              <div style={{
                width: 50, height: 50, borderRadius: 14, background: college.color + '22',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, marginBottom: 12, transition: 'transform 0.3s ease',
              }}>{college.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, lineHeight: 1.4 }}>{college.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 10 }}>{college.nameEn}</div>
              <span style={{ fontSize: 11, color: college.color, fontWeight: 600, background: college.color+'15', padding: '2px 8px', borderRadius: 6 }}>
                {college.depts} قسم
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
