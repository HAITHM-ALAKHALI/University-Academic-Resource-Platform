import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import CourseDetailPage from './pages/CourseDetailPage'
import AdminDashboard from './pages/AdminDashboard'
import { courses, type Lang } from './data'

export type Page = 'landing' | 'course' | 'admin'

export default function App() {
  const [page, setPage] = useState<Page>('landing')
  const [courseId, setCourseId] = useState<string>('cs301')
  const [dark, setDark] = useState(false)
  const [lang, setLang] = useState<Lang>('en')

  const openCourse = (id: string) => {
    setCourseId(id)
    setPage('course')
  }

  const course = courses.find(c => c.id === courseId) ?? courses[0]

  return (
    <div
      className={dark ? 'dark' : ''}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      style={{ minHeight: '100vh', backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      {page === 'landing' && (
        <LandingPage
          dark={dark}
          lang={lang}
          setDark={setDark}
          setLang={setLang}
          setPage={setPage}
          openCourse={openCourse}
        />
      )}
      {page === 'course' && (
        <CourseDetailPage
          dark={dark}
          lang={lang}
          setDark={setDark}
          setLang={setLang}
          setPage={setPage}
          course={course}
          openCourse={openCourse}
        />
      )}
      {page === 'admin' && (
        <AdminDashboard
          dark={dark}
          lang={lang}
          setDark={setDark}
          setLang={setLang}
          setPage={setPage}
        />
      )}
    </div>
  )
}
