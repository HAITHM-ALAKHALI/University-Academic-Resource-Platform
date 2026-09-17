import { useState, useMemo, lazy, Suspense } from "react";
import { courses } from "./data";
import type { Page, Lang } from "./types/app";
import { useAuth } from "./hooks/useAuth";

export type { Page } from "./types/app";

const StudentApp = lazy(() => import("./features/student/StudentApp"));
const AdminApp = lazy(() => import("./features/admin/AdminApp"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const CourseDetailPage = lazy(() => import("./pages/CourseDetailPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));

function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-base)]">
      <div className="text-center">
        <div className="loading-spinner mx-auto mb-4" />
        <div className="text-xs font-medium text-[var(--text-muted)]">
          جاري التحميل...
        </div>
      </div>
    </div>
  );
}

export default function App() {
  // Authentication & session management via custom hook
  const { currentUser, mode, setMode, handleLoginSuccess, handleLogout } =
    useAuth();

  const [page, setPage] = useState<Page>("landing");
  const [dark, setDark] = useState<boolean>(true);
  const [lang, setLang] = useState<Lang>("ar");
  const [selectedCourseId, setSelectedCourseId] = useState<string>("c1");

  const selectedCourse = useMemo(
    () => courses.find((c) => c.id === selectedCourseId) || courses[0],
    [selectedCourseId]
  );

  const handleOpenCourse = (id: string) => {
    setSelectedCourseId(id);
    setPage("course");
    setMode("pages");
  };

  const handleOpenLogin = () => {
    if (currentUser) {
      setMode("admin");
    } else {
      setMode("pages");
      setPage("login");
    }
  };

  const handleStudentLogout = () => {
    handleLogout();
    setPage("landing");
  };

  // 1. عرض واجهة الطالب
  if (mode === "student") {
    return (
      <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
        <Suspense fallback={<LoadingFallback />}>
          <StudentApp
            onSwitchAdmin={handleOpenLogin}
            onLogout={currentUser ? handleStudentLogout : undefined}
          />
        </Suspense>
      </div>
    );
  }

  // 2. عرض لوحة المشرف بعد تسجيل الدخول
  if (mode === "admin") {
    return (
      <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
        <Suspense fallback={<LoadingFallback />}>
          <AdminApp
            onSwitchStudent={() => setMode("student")}
            onLogout={handleStudentLogout}
          />
        </Suspense>
      </div>
    );
  }

  // 3. عرض الصفحات العامة والتسجيل (mode === "pages")
  return (
    <div
      className={`min-h-screen ${
        dark
          ? "bg-[var(--bg-base)] text-[var(--text-primary)]"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <Suspense fallback={<LoadingFallback />}>
        {page === "landing" && (
          <LandingPage
            dark={dark}
            lang={lang}
            setDark={setDark}
            setLang={setLang}
            setPage={setPage}
            openCourse={handleOpenCourse}
            onOpenLogin={handleOpenLogin}
            onLogout={currentUser ? handleStudentLogout : undefined}
          />
        )}

        {page === "course" && (
          <CourseDetailPage
            dark={dark}
            lang={lang}
            setDark={setDark}
            setLang={setLang}
            setPage={setPage}
            course={selectedCourse}
            openCourse={handleOpenCourse}
            onLogout={currentUser ? handleStudentLogout : undefined}
          />
        )}

        {page === "login" && (
          <AdminLogin
            onLoginSuccess={(user) => {
              handleLoginSuccess(user);
            }}
            onBackToHome={() => {
              setMode("student");
              setPage("landing");
            }}
          />
        )}

        {page === "admin" && (
          <AdminDashboard
            dark={dark}
            lang={lang}
            setDark={setDark}
            setLang={setLang}
            setPage={setPage}
            onLogout={handleStudentLogout}
          />
        )}
      </Suspense>
    </div>
  );
}
