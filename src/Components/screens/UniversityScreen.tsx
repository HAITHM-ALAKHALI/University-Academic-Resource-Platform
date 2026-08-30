import { useState } from 'react'
import type { NavState } from '../StudentApp'
import TopBar from '../TopBar'

const universities = [
  { id: 1, name: 'جامعة القاهرة', nameEn: 'Cairo University', colleges: 24, logo: '🏛', city: 'القاهرة', founded: 1908, color: '#3B82F6' },
  { id: 2, name: 'جامعة الإسكندرية', nameEn: 'Alexandria University', colleges: 22, logo: '⚓', city: 'الإسكندرية', founded: 1938, color: '#8B5CF6' },
  { id: 3, name: 'جامعة الأزهر', nameEn: 'Al-Azhar University', colleges: 18, logo: '🕌', city: 'القاهرة', founded: 970, color: '#06B6D4' },
  { id: 4, name: 'جامعة عين شمس', nameEn: 'Ain Shams University', colleges: 20, logo: '☀', city: 'القاهرة', founded: 1950, color: '#10B981' },
  { id: 5, name: 'جامعة المنصورة', nameEn: 'Mansoura University', colleges: 16, logo: '🌿', city: 'المنصورة', founded: 1972, color: '#F59E0B' },
  { id: 6, name: 'جامعة حلوان', nameEn: 'Helwan University', colleges: 14, logo: '⚙', city: 'حلوان', founded: 1975, color: '#EC4899' },
  { id: 7, name: 'جامعة بنها', nameEn: 'Benha University', colleges: 12, logo: '📚', city: 'بنها', founded: 1976, color: '#EF4444' },
  { id: 8, name: 'جامعة أسيوط', nameEn: 'Assiut University', colleges: 15, logo: '🏜', city: 'أسيوط', founded: 1949, color: '#8B5CF6' },
]

interface Props { navigate: (s: NavState) => void }

export default function UniversityScreen({ navigate }: Props) {
  const [search, setSearch] = useState('')
  const filtered = universities.filter(u => u.name.includes(search) || u.nameEn.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="fade-in">
      <TopBar breadcrumbs={[
        { label: 'الرئيسية', onClick: () => navigate({ screen: 'home' }) },
        { label: 'الجامعات' }
      ]} title="اختر الجامعة" subtitle="تصفح الجامعات المتاحة واختر جامعتك" />
      <div style={{ padding: '32px 32px 48px' }}>
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 28, maxWidth: 420 }} className="slide-up">
          <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: 16 }}>🔍</span>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="ابحث عن جامعة..."
            style={{
              width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-medium)',
              borderRadius: 12, padding: '11px 44px 11px 16px',
              color: 'var(--text-primary)', fontSize: 14, outline: 'none', direction: 'rtl', boxSizing: 'border-box',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent-blue)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-medium)'; e.currentTarget.style.boxShadow = 'none' }}
          />
        </div>

        <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
          {filtered.map(uni => (
            <div key={uni.id} className="dept-card" style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              borderRadius: 18, padding: '24px 20px', cursor: 'pointer',
              textAlign: 'center', position: 'relative', overflow: 'hidden'
            }}
              onClick={() => navigate({ screen: 'colleges', university: { id: uni.id, name: uni.name, nameEn: uni.nameEn } })}
              onMouseEnter={e => { e.currentTarget.style.borderColor = uni.color + '40' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
            >
              <div style={{
                position: 'absolute', top: -30, right: -30, width: 100, height: 100,
                borderRadius: '50%', background: uni.color + '10'
              }} />
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: uni.color + '20', margin: '0 auto 14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26, transition: 'transform 0.3s ease',
              }}>{uni.logo}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{uni.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>{uni.nameEn}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>📍 {uni.city}</span>
                <span style={{ fontSize: 11, color: uni.color, fontWeight: 600, background: uni.color+'15', padding: '2px 8px', borderRadius: 6 }}>
                  {uni.colleges} كلية
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
