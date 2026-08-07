import { useState } from "react";
import StudentApp from "./Components/StudentApp";
import AdminApp from "./Components/AdminApp";
import LandingPage from "./pages/LandingPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import AdminDashboard from "./pages/AdminDashboard";
import { courses, type Lang } from "./data";

export type Page = "landing" | "course" | "admin" | "app";

export default function App() {
  const [mode, setMode] = useState<"student" | "admin" | "pages">("student");
  const [page, setPage] = useState<Page>("landing");
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState<Lang>("ar");
  const [selectedCourseId, setSelectedCourseId] = useState<string>("c1");

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const handleOpenCourse = (id: string) => {
    setSelectedCourseId(id);
    setPage("course");
    setMode("pages");
  };

  if (mode === "student") {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
        <StudentApp onSwitchAdmin={() => setMode("admin")} />
      </div>
    );
  }

  if (mode === "admin") {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
        <AdminApp onSwitchStudent={() => setMode("student")} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: dark ? "var(--bg-base)" : "#F8FAFC" }}>
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
    </div>
  );
}

