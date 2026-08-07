import { useState } from 'react'
import Sidebar from './Sidebar'
import HomeScreen from './screens/HomeScreen'
import UniversityScreen from './screens/UniversityScreen'
import CollegeScreen from './screens/CollegeScreen'
import DepartmentScreen from './screens/DepartmentScreen'
import LevelScreen from './screens/LevelScreen'
import SemesterScreen from './screens/SemesterScreen'
import CoursesScreen from './screens/CoursesScreen'
import CourseDetailScreen from './screens/CourseDetailScreen'

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

export default function StudentApp({ onSwitchAdmin }: Props) {
  const [nav, setNav] = useState<NavState>({ screen: 'home' })
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const navigate = (state: NavState) => setNav(state)

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
        transition: 'margin-right 0.3s ease',
        overflow: 'auto',
        minHeight: '100vh'
      }}>
        {renderScreen()}
      </main>
    </div>
  )
}
