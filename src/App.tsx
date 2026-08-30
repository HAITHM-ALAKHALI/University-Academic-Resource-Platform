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
    <div className="loading-screen">
      <div style={{ textAlign: "center" }}>
        <div className="loading-spinner" style={{ margin: "0 auto 16px" }} />
        <div
          style={{
            fontSize: 13,
            color: "var(--text-muted)",
            fontWeight: 500,
          }}
        >
          جاري التحميل...
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState<"student" | "admin" | "pages">("student");
  const [page, setPage] = useState<Page>("landing");
  const [dark, setDark] = useState(true);
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
      <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
        <Suspense fallback={<LoadingFallback />}>
          <StudentApp onSwitchAdmin={() => setMode("admin")} />
        </Suspense>
      </div>
    );
  }

  if (mode === "admin") {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
        <Suspense fallback={<LoadingFallback />}>
          <AdminApp onSwitchStudent={() => setMode("student")} />
        </Suspense>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: dark ? "var(--bg-base)" : "#F8FAFC",
      }}
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
