import { useState, useMemo, lazy, Suspense } from "react";
import { courses, type Lang } from "./data";

const StudentApp = lazy(() => import("./Components/StudentApp"));
const AdminApp = lazy(() => import("./Components/AdminApp"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const CourseDetailPage = lazy(() => import("./pages/CourseDetailPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

export type Page = "landing" | "course" | "admin" | "app";

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
  const [mode, setMode] = useState<"student" | "admin" | "pages">("student");
  const [page, setPage] = useState<Page>("landing");
  const [dark, setDark] = useState<boolean>(true);
  const [lang, setLang] = useState<Lang>("ar");
  const [selectedCourseId, setSelectedCourseId] = useState<string>("c1");

  const selectedCourse = useMemo(
    () => courses.find((c) => c.id === selectedCourseId) || courses[0],
    [selectedCourseId],
  );

  const handleOpenCourse = (id: string) => {
    setSelectedCourseId(id);
    setPage("course");
    setMode("pages");
  };

  if (mode === "student") {
    return (
      <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
        <Suspense fallback={<LoadingFallback />}>
          <StudentApp onSwitchAdmin={() => setMode("admin")} />
        </Suspense>
      </div>
    );
  }

  if (mode === "admin") {
    return (
      <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
        <Suspense fallback={<LoadingFallback />}>
          <AdminApp onSwitchStudent={() => setMode("student")} />
        </Suspense>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${dark ? "bg-[var(--bg-base)] text-[var(--text-primary)]" : "bg-slate-50 text-slate-900"}`}>
      <Suspense fallback={<LoadingFallback />}>
        {page === "landing" && (
          <LandingPage
            dark={dark}
            lang={lang}
            setDark={setDark}
            setLang={setLang}
            setPage={setPage}
            openCourse={handleOpenCourse}
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
          />
        )}
        {page === "admin" && (
          <AdminDashboard
            dark={dark}
            lang={lang}
            setDark={setDark}
            setLang={setLang}
            setPage={setPage}
          />
        )}
      </Suspense>
    </div>
  );
}
