import { useState, useMemo, useCallback } from "react";
import { initialCourses, initialDoctors } from "../constants/academicData";
import type { AcademicCourse, Doctor } from "../types/academic";

export interface UseCoursesOptions {
  initialData?: AcademicCourse[];
  defaultDepartment?: string;
  defaultLevel?: string;
  defaultSemester?: string;
}

export function useCourses(options: UseCoursesOptions = {}) {
  const [courses, setCourses] = useState<AcademicCourse[]>(
    options.initialData || initialCourses
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>(
    options.defaultDepartment
  );
  const [selectedLevel, setSelectedLevel] = useState<string | undefined>(
    options.defaultLevel
  );
  const [selectedSemester, setSelectedSemester] = useState<string | undefined>(
    options.defaultSemester
  );

  // Filtered courses based on search and filters
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchSearch =
        !searchQuery ||
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase());

      const matchDept =
        !selectedDepartment || course.department === selectedDepartment;

      const matchLevel =
        !selectedLevel || course.level === selectedLevel;

      const matchSemester =
        !selectedSemester || course.semester === selectedSemester;

      return matchSearch && matchDept && matchLevel && matchSemester;
    });
  }, [courses, searchQuery, selectedDepartment, selectedLevel, selectedSemester]);

  // Find course by ID
  const getCourseById = useCallback(
    (id: number | string): AcademicCourse | undefined => {
      const numId = typeof id === "string" ? parseInt(id, 10) : id;
      return courses.find((c) => c.id === numId);
    },
    [courses]
  );

  // Get doctors teaching a course
  const getCourseDoctors = useCallback(
    (course: AcademicCourse, doctors: Doctor[] = initialDoctors): Doctor[] => {
      return doctors.filter(
        (doc) =>
          course.doctorIds?.includes(doc.id) ||
          doc.assignedCourseIds?.includes(course.id)
      );
    },
    []
  );

  return {
    courses,
    setCourses,
    filteredCourses,
    searchQuery,
    setSearchQuery,
    selectedDepartment,
    setSelectedDepartment,
    selectedLevel,
    setSelectedLevel,
    selectedSemester,
    setSelectedSemester,
    getCourseById,
    getCourseDoctors,
  };
}

export default useCourses;
