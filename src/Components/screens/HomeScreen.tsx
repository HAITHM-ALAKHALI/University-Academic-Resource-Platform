import { useMemo } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import type { NavState } from "../StudentApp";
import TopBar from "../TopBar";
import {
  departmentsData,
  popularCoursesData,
} from "../../constants/academicData";

interface Props {
  navigate: (s: NavState) => void;
}

export default function HomeScreen({ navigate }: Props) {
  const deptList = useMemo(() => departmentsData, []);
  const courseList = useMemo(() => popularCoursesData, []);

  return (
    <div className="w-full">
      <TopBar breadcrumbs={[{ label: "الرئيسية" }]} />
      <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8">
        {/* Hero Greeting on Base Canvas */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-[#F8FAFC]">
            مرحباً بك في دراستي 👋
          </h1>
          <p className="text-sm font-medium text-[#A5B4BF]">
            جميع المواد والملفات الدراسية في مكان منظم وسهل الوصول
          </p>
        </div>

        {/* 1. Browse by Department */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold text-[#F8FAFC]">
              تصفح حسب القسم
            </h3>
            <button
              type="button"
              onClick={() => navigate({ screen: "departments" })}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#7DA49F] hover:text-[#9DBFB8] transition-colors cursor-pointer border-0 bg-transparent"
            >
              <span>عرض كل الأقسام</span>
              <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-0" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {deptList.map((dept) => (
              <div
                key={dept.id}
                onClick={() =>
                  navigate({
                    screen: "levels",
                    department: {
                      id: dept.id,
                      name: dept.name,
                      nameEn: dept.nameEn,
                      color: dept.color,
                      icon: dept.icon,
                    },
                  })
                }
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#323D59] p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-white/[0.15] hover:shadow-2xl hover:bg-[#3B4868] cursor-pointer"
              >
                <div
                  className="absolute -top-12 -left-12 h-32 w-32 rounded-full opacity-[0.12] blur-2xl transition-opacity duration-300 group-hover:opacity-[0.2]"
                  style={{ background: dept.color }}
                />

                <div
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl font-mono text-2xl font-bold transition-transform duration-300 group-hover:scale-110 shadow-md"
                  style={{
                    background: `${dept.color}18`,
                    color: dept.color,
                    border: `1.5px solid ${dept.color}30`,
                  }}
                >
                  {dept.icon}
                </div>

                <h4 className="mb-1 text-base font-bold text-[#F8FAFC] group-hover:text-[#9DBFB8] transition-colors">
                  {dept.name}
                </h4>

                <div className="flex items-center justify-center gap-2 text-xs">
                  <span className="text-[#A5B4BF]">{dept.nameEn}</span>
                  <span
                    className="rounded-full px-2.5 py-0.5 font-bold text-[10px]"
                    style={{
                      color: dept.color,
                      background: `${dept.color}15`,
                      border: `1px solid ${dept.color}25`,
                    }}
                  >
                    {dept.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Popular Courses */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#F8FAFC]">
                المواد الشائعة
              </h3>
              <p className="text-xs text-[#A5B4BF] mt-0.5 font-medium">
                أبرز المواد والمقررات الأكثر تحميلاً وتفاعلاً
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {courseList.map((course) => (
              <div
                key={course.id}
                onClick={() =>
                  navigate({
                    screen: "course-detail",
                    course: {
                      id: course.id,
                      name: course.name,
                      nameEn: course.nameEn,
                      color: course.color,
                    },
                    department: {
                      id: 1,
                      name: course.dept,
                      nameEn: course.dept,
                      color: course.color,
                      icon: course.icon,
                    },
                  })
                }
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-[#323D59] p-5 text-right shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-white/[0.15] hover:shadow-2xl hover:bg-[#3B4868] cursor-pointer"
              >
                {/* Subtle Ambient Background Gradient */}
                <div
                  className="absolute -top-12 -left-12 h-32 w-32 rounded-full opacity-[0.12] blur-2xl transition-opacity duration-300 group-hover:opacity-[0.2]"
                  style={{ background: course.color }}
                />

                <div>
                  {/* Top Header with Icon & Title */}
                  <div className="flex items-start gap-3.5 mb-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-mono text-xl font-bold transition-transform duration-300 group-hover:scale-110 shadow-md"
                      style={{
                        background: `${course.color}18`,
                        color: course.color,
                        border: `1.5px solid ${course.color}30`,
                      }}
                    >
                      {course.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="truncate text-base font-bold text-[#F8FAFC] transition-colors group-hover:text-[#9DBFB8]">
                        {course.name}
                      </h4>
                      <p className="truncate text-xs font-medium text-[#A5B4BF] mt-0.5">
                        {course.nameEn}
                      </p>
                    </div>
                  </div>

                  {/* Department Tag */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-[#242D42]/70 border border-white/[0.06] px-2.5 py-1 text-[11px] font-semibold text-[#A5B4BF]">
                      <span>📂</span>
                      <span>{course.dept}</span>
                    </span>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="flex items-center justify-between border-t border-white/[0.06] pt-3.5 mt-1">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold shadow-sm"
                    style={{
                      color: course.color,
                      background: `${course.color}15`,
                      border: `1px solid ${course.color}25`,
                    }}
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>{course.files} ملف دراسي</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
