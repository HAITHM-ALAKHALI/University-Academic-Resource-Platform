import { useState, lazy, Suspense, useCallback } from 'react'
import Sidebar from './Sidebar'

const HomeScreen = lazy(() => import('./screens/HomeScreen'))
const UniversityScreen = lazy(() => import('./screens/UniversityScreen'))
const CollegeScreen = lazy(() => import('./screens/CollegeScreen'))
const DepartmentScreen = lazy(() => import('./screens/DepartmentScreen'))
const LevelScreen = lazy(() => import('./screens/LevelScreen'))
const SemesterScreen = lazy(() => import('./screens/SemesterScreen'))
const CoursesScreen = lazy(() => import('./screens/CoursesScreen'))
const CourseDetailScreen = lazy(() => import('./screens/CourseDetailScreen'))

export type NavState = {
  screen: 'home' | 'universities' | 'colleges' | 'departments' | 'levels' | 'semesters' | 'courses' | 'course-detail'
  university?:  { id: number; name: string; nameEn: string }
  college?:     { id: number; name: string; nameEn: string }
  department?:  { id: number; name: string; nameEn: string; color: string; icon: string }
  level?:       { id: number; name: string }
  semester?:    { id: number; name: string }
  course?:      { id: number; name: string; nameEn: string; color: string }
}

interface Props { onSwitchAdmin: () => void }

function ScreenLoader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '60vh',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div className="loading-spinner" style={{ margin: '0 auto 12px' }} />
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>جاري التحميل...</div>
      </div>
    </div>
  )
}

export default function StudentApp({ onSwitchAdmin }: Props) {
  const [nav, setNav] = useState<NavState>({ screen: 'home' })
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const navigate = useCallback((state: NavState) => setNav(state), [])

  const renderScreen = () => {
    switch (nav.screen) {
      case 'home':          return <HomeScreen navigate={navigate} />
      case 'universities':  return <UniversityScreen navigate={navigate} />
      case 'colleges':      return <CollegeScreen nav={nav} navigate={navigate} />
      case 'departments':   return <DepartmentScreen nav={nav} navigate={navigate} />
      case 'levels':        return <LevelScreen nav={nav} navigate={navigate} />
      case 'semesters':     return <SemesterScreen nav={nav} navigate={navigate} />
      case 'courses':       return <CoursesScreen nav={nav} navigate={navigate} />
      case 'course-detail': return <CourseDetailScreen nav={nav} navigate={navigate} />
      default:              return <HomeScreen navigate={navigate} />
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', direction: 'rtl' }}>
      <Sidebar
        nav={nav}
        navigate={navigate}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onSwitchAdmin={onSwitchAdmin}
      />
      <main style={{
        flex: 1,
        marginRight: sidebarCollapsed ? 72 : 260,
        transition: 'margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'auto',
        minHeight: '100vh'
      }}>
        <Suspense fallback={<ScreenLoader />}>
          {renderScreen()}
        </Suspense>
      </main>
    </div>
  )
}
