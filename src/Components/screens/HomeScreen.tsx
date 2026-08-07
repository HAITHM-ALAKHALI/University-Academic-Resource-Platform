import type { NavState } from '../StudentApp'
import TopBar from '../TopBar'

const popularCourses = [
  { id: 1, name: 'هياكل البيانات', nameEn: 'Data Structures', dept: 'علوم حاسوب', uni: 'جامعة القاهرة', files: 47, color: '#3B82F6', icon: '⚙' },
  { id: 2, name: 'برمجة 1', nameEn: 'Programming 1', dept: 'علوم حاسوب', uni: 'جامعة القاهرة', files: 32, color: '#8B5CF6', icon: '💻' },
  { id: 3, name: 'رياضيات', nameEn: 'Mathematics', dept: 'هندسة', uni: 'جامعة الإسكندرية', files: 28, color: '#06B6D4', icon: '∑' },
  { id: 4, name: 'قواعد البيانات', nameEn: 'Database Systems', dept: 'تقنية معلومات', uni: 'جامعة القاهرة', files: 39, color: '#10B981', icon: '🗄' },
  { id: 5, name: 'الذكاء الاصطناعي', nameEn: 'Artificial Intelligence', dept: 'علوم حاسوب', uni: 'جامعة الأزهر', files: 55, color: '#F59E0B', icon: '🤖' },
  { id: 6, name: 'شبكات الحاسوب', nameEn: 'Computer Networks', dept: 'هندسة', uni: 'جامعة القاهرة', files: 41, color: '#EC4899', icon: '🌐' },
]

const recentFiles = [
  { name: 'محاضرة 4 - التكرار', type: 'PDF', course: 'برمجة 1', time: '5 دقائق' },
  { name: 'مذكرة - 4I', type: 'PDF', course: 'هياكل البيانات', time: 'ساعتان' },
  { name: 'نبذ الشركات', type: 'PDF', course: 'قواعد البيانات', time: 'يوم' },
  { name: 'Date Science', type: 'PDF', course: 'علم البيانات', time: 'يوم' },
  { name: 'يوجد تسبة 2', type: 'PDF', course: 'رياضيات', time: 'يوم' },
]

interface Props { navigate: (s: NavState) => void }

export default function HomeScreen({ navigate }: Props) {
  return (
    <div className="fade-in">
      <TopBar
        breadcrumbs={[{ label: 'الرئيسية' }]}
        title="مرحباً بك في UniHub 👋"
        subtitle="جميع المواد والملفات الدراسية في مكان منظم وسهل الوصول"
      />
      <div style={{ padding: '32px 32px 48px' }}>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'جامعة', value: '12', icon: '🏛', color: '#3B82F6' },
            { label: 'كلية', value: '48', icon: '🏫', color: '#8B5CF6' },
            { label: 'مادة', value: '620', icon: '📚', color: '#06B6D4' },
            { label: 'ملف', value: '8,400', icon: '📄', color: '#10B981' },
          ].map(s => (
            <div key={s.label} className="stat-card" style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 16, padding: '20px 22px',
              display: 'flex', alignItems: 'center', gap: 14
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: s.color + '20',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20
              }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 28 }}>
          {/* Popular Courses */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>المواد الشائعة</h2>
              <button
                onClick={() => navigate({ screen: 'universities' })}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--accent-blue)', fontSize: 13, fontWeight: 500
                }}>عرض الكل ←</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
              {popularCourses.map(course => (
                <div key={course.id} className="popular-card" style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 18, padding: '20px',
                  cursor: 'pointer', overflow: 'hidden', position: 'relative'
                }}
                  onClick={() => navigate({ screen: 'universities' })}
                >
                  <div style={{
                    position: 'absolute', top: -20, left: -20,
                    width: 80, height: 80, borderRadius: '50%',
                    background: course.color + '15'
                  }} />
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: course.color + '25',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, marginBottom: 12, position: 'relative'
                  }}>{course.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{course.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>{course.dept}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                      fontSize: 11, color: course.color, fontWeight: 600,
                      background: course.color + '15', padding: '3px 8px', borderRadius: 6
                    }}>{course.files} ملف</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{course.uni.replace('جامعة ','')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Start exploring */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))',
              border: '1px solid rgba(59,130,246,0.2)',
              borderRadius: 18, padding: '22px 20px', textAlign: 'center'
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🎓</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>ابدأ استكشاف المواد</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 14, lineHeight: 1.6 }}>
                اختر جامعتك وتصفح المواد المتاحة
              </div>
              <button
                onClick={() => navigate({ screen: 'universities' })}
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                  border: 'none', borderRadius: 10, padding: '10px 24px',
                  color: '#fff', fontWeight: 600, fontSize: 13, cursor: 'pointer',
                  width: '100%'
                }}>اختر الجامعة ←</button>
            </div>

            {/* Recent files */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 18, padding: '18px 16px'
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 14 }}>آخر الملفات المضافة</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {recentFiles.map((f, i) => (
                  <div key={i} className="file-row" style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 8px', borderRadius: 8, cursor: 'pointer'
                  }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 8,
                      background: 'rgba(239,68,68,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, color: '#EF4444', fontWeight: 700, flexShrink: 0
                    }}>PDF</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>منذ {f.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
