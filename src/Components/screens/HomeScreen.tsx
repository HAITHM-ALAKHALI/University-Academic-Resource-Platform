import { useMemo } from "react";
import { ArrowLeft, FileText, Layers, Sparkles } from "lucide-react";
import type { NavState } from "../StudentApp";
import TopBar from "../TopBar";
import { departments } from "./DepartmentScreen";

const popularCourses = [
  {
    id: 1,
    name: "هياكل البيانات",
    nameEn: "Data Structures",
    dept: "علوم حاسوب",
    uni: "جامعة القاهرة",
    files: 47,
    color: "#3B82F6",
    icon: "⚙",
  },
  {
    id: 2,
    name: "برمجة 1",
    nameEn: "Programming 1",
    dept: "علوم حاسوب",
    uni: "جامعة القاهرة",
    files: 32,
    color: "#8B5CF6",
    icon: "💻",
  },
  {
    id: 3,
    name: "رياضيات",
    nameEn: "Mathematics",
    dept: "هندسة",
    uni: "جامعة الإسكندرية",
    files: 28,
    color: "#06B6D4",
    icon: "∑",
  },
  {
    id: 4,
    name: "قواعد البيانات",
    nameEn: "Database Systems",
    dept: "تقنية معلومات",
    uni: "جامعة القاهرة",
    files: 39,
    color: "#10B981",
    icon: "🗄",
  },
  {
    id: 5,
    name: "الذكاء الاصطناعي",
    nameEn: "Artificial Intelligence",
    dept: "علوم حاسوب",
    uni: "جامعة الأزهر",
    files: 55,
    color: "#F59E0B",
    icon: "🤖",
  },
  {
    id: 6,
    name: "شبكات الحاسوب",
    nameEn: "Computer Networks",
    dept: "هندسة",
    uni: "جامعة القاهرة",
    files: 41,
    color: "#EC4899",
    icon: "🌐",
  },
];

interface Props {
  navigate: (s: NavState) => void;
}

export default function HomeScreen({ navigate }: Props) {
  const deptList = useMemo(() => departments, []);
  const courseList = useMemo(() => popularCourses, []);

  return (
    <div className="w-full">
      <TopBar
        breadcrumbs={[{ label: "الرئيسية" }]}
        title="مرحباً بك في UniHub 👋"
        subtitle="جميع المواد والملفات الدراسية في مكان منظم وسهل الوصول"
      />
      <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-10">
        {/* Quick Hero Feature Banner */}
        {/* <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-600/15 via-violet-600/15 to-purple-600/10 p-8 shadow-2xl backdrop-blur-xl">
          <div className="relative z-10 max-w-2xl text-right">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-300 mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>منصة أكاديمية مفتوحة للطلاب</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              تصفح كل ما تحتاجه لرحلتك الجامعية
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              محاضرات، ملخصات، مراجع، ونماذج امتحانات سابقة مصنفة حسب الجامعة والكلية والمستوى الدراسي.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigate({ screen: "universities" })}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-500 cursor-pointer border-0"
              >
                <span>تصفح الجامعات</span>
                <ArrowLeft className="h-4 w-4 rtl:rotate-0" />
              </button>
              <button
                type="button"
                onClick={() => navigate({ screen: "departments" })}
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-200 backdrop-blur transition-all hover:bg-white/10 cursor-pointer"
              >
                <Layers className="h-4 w-4" />
                <span>الأقسام الدراسية</span>
              </button>
            </div>
          </div>
        </div> */}

        {/* 1. Browse by Department */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
              تصفح حسب القسم
            </h3>
            <button
              type="button"
              onClick={() => navigate({ screen: "departments" })}
              className="flex items-center gap-1 text-xs sm:text-sm font-medium text-blue-400 hover:text-blue-300 cursor-pointer border-0 bg-transparent"
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
                className="group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl cursor-pointer"
              >
                <div
                  className="absolute -top-6 -right-6 h-20 w-20 rounded-full transition-transform group-hover:scale-125 duration-500 opacity-15"
                  style={{ background: dept.color }}
                />

                <div
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl font-mono text-2xl font-bold transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${dept.color}20`,
                    color: dept.color,
                  }}
                >
                  {dept.icon}
                </div>

                <h4 className="mb-1 text-base font-bold text-[var(--text-primary)]">
                  {dept.name}
                </h4>

                <div className="flex items-center justify-center gap-2 text-xs">
                  <span className="text-[var(--text-secondary)]">
                    {dept.nameEn}
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 font-semibold text-[10px]"
                    style={{
                      color: dept.color,
                      background: `${dept.color}15`,
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
            <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
              المواد الشائعة
            </h3>
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
                className="group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 text-right transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl cursor-pointer"
              >
                <div
                  className="absolute -top-6 -left-6 h-20 w-20 rounded-full transition-transform group-hover:scale-125 duration-500 opacity-15"
                  style={{ background: course.color }}
                />

                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl font-mono text-xl font-bold transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${course.color}25`,
                    color: course.color,
                  }}
                >
                  {course.icon}
                </div>

                <h4 className="mb-1 text-base font-bold text-[var(--text-primary)]">
                  {course.name}
                </h4>
                <p className="mb-3 text-xs text-[var(--text-secondary)]">
                  {course.dept} · {course.uni}
                </p>

                <div className="flex items-center justify-between">
                  <span
                    className="flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold"
                    style={{
                      color: course.color,
                      background: `${course.color}15`,
                    }}
                  >
                    <FileText className="h-3 w-3" />
                    <span>{course.files} ملف</span>
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
