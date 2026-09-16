import { useState, useMemo, useCallback } from "react";
import type {
  NavState,
  DepartmentSummary,
  LevelSummary,
  SemesterSummary,
  CourseSummary,
  BreadcrumbItem,
} from "../types/app";
import type { Doctor } from "../types/academic";

export function useAcademicHierarchy(initialState: NavState = { screen: "home" }) {
  const [nav, setNav] = useState<NavState>(initialState);

  const navigateTo = useCallback((nextState: NavState) => {
    setNav(nextState);
  }, []);

  const selectDepartment = useCallback((department: DepartmentSummary) => {
    setNav({
      screen: "levels",
      department,
    });
  }, []);

  const selectLevel = useCallback(
    (level: LevelSummary, semester?: SemesterSummary) => {
      setNav((prev) => ({
        ...prev,
        screen: semester ? "courses" : "semesters",
        level,
        semester,
      }));
    },
    []
  );

  const selectSemester = useCallback((semester: SemesterSummary) => {
    setNav((prev) => ({
      ...prev,
      screen: "courses",
      semester,
    }));
  }, []);

  const selectCourse = useCallback((course: CourseSummary, doctor?: Doctor) => {
    setNav((prev) => ({
      ...prev,
      screen: "course-detail",
      course,
      doctorId: doctor?.id,
      doctor,
    }));
  }, []);

  const resetToHome = useCallback(() => {
    setNav({ screen: "home" });
  }, []);

  // Compute breadcrumbs automatically based on the current state
  const breadcrumbs = useMemo((): BreadcrumbItem[] => {
    const list: BreadcrumbItem[] = [
      { label: "الرئيسية", onClick: resetToHome },
    ];

    if (nav.screen === "home") {
      return list;
    }

    if (nav.screen === "departments") {
      list.push({ label: "الأقسام" });
      return list;
    }

    if (nav.department) {
      list.push({
        label: nav.department.name,
        onClick: () =>
          navigateTo({
            screen: "levels",
            department: nav.department,
          }),
      });
    }

    if (nav.level && (nav.screen === "courses" || nav.screen === "course-detail")) {
      list.push({
        label: nav.level.name,
        onClick: () =>
          navigateTo({
            screen: "semesters",
            department: nav.department,
            level: nav.level,
          }),
      });
    }

    if (nav.semester && (nav.screen === "courses" || nav.screen === "course-detail")) {
      list.push({
        label: nav.semester.name,
        onClick: () =>
          navigateTo({
            screen: "courses",
            department: nav.department,
            level: nav.level,
            semester: nav.semester,
          }),
      });
    }

    if (nav.course && nav.screen === "course-detail") {
      list.push({
        label: nav.course.name,
      });
    }

    if (nav.doctor && nav.screen === "course-detail") {
      list.push({
        label: nav.doctor.name,
      });
    }

    return list;
  }, [nav, navigateTo, resetToHome]);

  return {
    nav,
    setNav,
    navigateTo,
    selectDepartment,
    selectLevel,
    selectSemester,
    selectCourse,
    resetToHome,
    breadcrumbs,
  };
}

export default useAcademicHierarchy;
