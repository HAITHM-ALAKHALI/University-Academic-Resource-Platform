import { useMemo } from "react";
import type { NavState } from "../StudentApp";
import TopBar from "../TopBar";
import CourseCard from "../CourseCard";
import { initialCourses, initialDoctors } from "../../data/academicData";
import type { AcademicCourse, Doctor } from "../../types/academic";

interface Props {
  nav: NavState;
  navigate: (s: NavState) => void;
}

export default function CoursesScreen({ nav, navigate }: Props) {
  const coursesList = useMemo(() => {
    // If nav has a department specified, we can optionally filter by department, or default to initialCourses
    if (nav.department?.name) {
      const filtered = initialCourses.filter(
        (c) => c.department === nav.department?.name
      );
      return filtered.length > 0 ? filtered : initialCourses;
    }
    return initialCourses;
  }, [nav.department]);

  const breadcrumbsList = [
    { label: "الرئيسية", onClick: () => navigate({ screen: "home" }) },
    { label: "التخصصات", onClick: () => navigate({ screen: "departments" }) },
    ...(nav.department?.name
      ? [{ label: nav.department.name, onClick: () => navigate({ ...nav, screen: "levels" as const }) }]
      : []),
    ...(nav.level?.name
      ? [{ label: nav.level.name, onClick: () => navigate({ ...nav, screen: "levels" as const }) }]
      : []),
    ...(nav.semester?.name ? [{ label: nav.semester.name }] : []),
  ];

  const titleText = [nav.level?.name, nav.semester?.name].filter(Boolean).join(" — ");
  const subtitleText = [nav.department?.name, `${coursesList.length} مواد دراسية`].filter(Boolean).join(" · ");

  const handleSelectCourse = (course: AcademicCourse) => {
    navigate({
      ...nav,
      screen: "course-detail",
      course: {
        id: course.id,
        name: course.name,
        nameEn: course.nameEn,
        color: course.color,
      },
      doctorId: undefined,
      doctor: undefined,
    });
  };

  const handleSelectDoctor = (course: AcademicCourse, doctor: Doctor) => {
    navigate({
      ...nav,
      screen: "course-detail",
      course: {
        id: course.id,
        name: course.name,
        nameEn: course.nameEn,
        color: course.color,
      },
      doctorId: doctor.id,
      doctor: doctor,
    });
  };

  return (
    <div className="w-full">
      <TopBar breadcrumbs={breadcrumbsList} />
      <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
        {/* Page Title on Base Canvas */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-[#F8FAFC]">
            {titleText || "المواد الدراسية"}
          </h1>
          <p className="text-sm font-medium text-[#A5B4BF]">
            {subtitleText}
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {coursesList.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              doctors={initialDoctors}
              onSelectCourse={handleSelectCourse}
              onSelectDoctor={handleSelectDoctor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
