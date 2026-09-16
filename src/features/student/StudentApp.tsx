import { useState, lazy, Suspense, useCallback } from "react";
import StudentNavbar from "../../Components/StudentNavbar";
import type { NavState } from "../../types/app";

export type { NavState } from "../../types/app";

const HomeScreen = lazy(() => import("../../Components/screens/HomeScreen"));
const DepartmentScreen = lazy(
  () => import("../../Components/screens/DepartmentScreen")
);
const LevelScreen = lazy(() => import("../../Components/screens/LevelScreen"));
const SemesterScreen = lazy(
  () => import("../../Components/screens/SemesterScreen")
);
const CoursesScreen = lazy(
  () => import("../../Components/screens/CoursesScreen")
);
const CourseDetailScreen = lazy(
  () => import("./screens/CourseDetailScreen")
);

export interface StudentAppProps {
  onSwitchAdmin: () => void;
}

function ScreenLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="loading-spinner mx-auto mb-3" />
        <div className="text-xs font-medium text-[var(--text-muted)]">
          جاري التحميل...
        </div>
      </div>
    </div>
  );
}

export default function StudentApp({ onSwitchAdmin }: StudentAppProps) {
  const [nav, setNav] = useState<NavState>({ screen: "home" });

  const navigate = useCallback((state: NavState) => setNav(state), []);

  const renderScreen = () => {
    switch (nav.screen) {
      case "home":
        return <HomeScreen navigate={navigate} />;
      case "departments":
        return <DepartmentScreen nav={nav} navigate={navigate} />;
      case "levels":
        return <LevelScreen nav={nav} navigate={navigate} />;
      case "semesters":
        return <SemesterScreen nav={nav} navigate={navigate} />;
      case "courses":
        return <CoursesScreen nav={nav} navigate={navigate} />;
      case "course-detail":
        return <CourseDetailScreen nav={nav} navigate={navigate} />;
      default:
        return <HomeScreen navigate={navigate} />;
    }
  };

  return (
    <div
      className="flex min-h-screen flex-col bg-[var(--bg-base)] text-right"
      dir="rtl"
    >
      <StudentNavbar
        nav={nav}
        navigate={navigate}
        onSwitchAdmin={onSwitchAdmin}
      />
      <main className="w-full flex-1 min-h-[calc(100vh-65px)]">
        <Suspense fallback={<ScreenLoader />}>{renderScreen()}</Suspense>
      </main>
    </div>
  );
}
