import { useState, lazy, Suspense, useCallback } from "react";
import StudentNavbar from "./StudentNavbar";

const HomeScreen = lazy(() => import("./screens/HomeScreen"));
const UniversityScreen = lazy(() => import("./screens/UniversityScreen"));
const CollegeScreen = lazy(() => import("./screens/CollegeScreen"));
const DepartmentScreen = lazy(() => import("./screens/DepartmentScreen"));
const LevelScreen = lazy(() => import("./screens/LevelScreen"));
const SemesterScreen = lazy(() => import("./screens/SemesterScreen"));
const CoursesScreen = lazy(() => import("./screens/CoursesScreen"));
const CourseDetailScreen = lazy(() => import("./screens/CourseDetailScreen"));

import type { Doctor } from "../types/academic";

export type NavState = {
  screen:
    | "home"
    | "universities"
    | "colleges"
    | "departments"
    | "levels"
    | "semesters"
    | "courses"
    | "course-detail";
  university?: { id: number; name: string; nameEn: string };
  college?: { id: number; name: string; nameEn: string };
  department?: {
    id: number;
    name: string;
    nameEn: string;
    color: string;
    icon: string;
  };
  level?: { id: number; name: string };
  semester?: { id: number; name: string };
  course?: { id: number; name: string; nameEn: string; color: string };
  doctorId?: string;
  doctor?: Doctor;
};

interface StudentAppProps {
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
      case "universities":
        return <UniversityScreen navigate={navigate} />;
      case "colleges":
        return <CollegeScreen nav={nav} navigate={navigate} />;
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
    <div className="flex min-h-screen flex-col bg-[var(--bg-base)] text-right" dir="rtl">
      <StudentNavbar
        nav={nav}
        navigate={navigate}
        onSwitchAdmin={onSwitchAdmin}
      />
      <main className="w-full flex-1 min-h-[calc(100vh-65px)]">
        <Suspense fallback={<ScreenLoader />}>
          {renderScreen()}
        </Suspense>
      </main>
    </div>
  );
}
