import { FileText } from "lucide-react";
import type { NavState } from "../StudentApp";
import TopBar from "../TopBar";

const coursesData = [
  { id: 1, name: "برمجة 1", nameEn: "Programming 1", files: 32, color: "#6B8EC7", icon: "💻", rating: 4.8 },
  { id: 2, name: "رياضيات", nameEn: "Mathematics", files: 28, color: "#C9A855", icon: "∑", rating: 4.5 },
  { id: 3, name: "إنجليزي", nameEn: "English", files: 18, color: "#5BAA8E", icon: "En", rating: 4.2 },
  { id: 4, name: "مهارات الحاسوب", nameEn: "Computer Skills", files: 22, color: "#8B7EC0", icon: "🖥", rating: 4.6 },
  { id: 5, name: "المنطق الرقمي", nameEn: "Digital Logic", files: 25, color: "#5BA8B5", icon: "⊕", rating: 4.3 },
  { id: 6, name: "فيزياء", nameEn: "Physics", files: 20, color: "#C07A9B", icon: "⚛", rating: 4.4 },
];

interface Props {
  nav: NavState;
  navigate: (s: NavState) => void;
}

export default function CoursesScreen({ nav, navigate }: Props) {
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
  const subtitleText = [nav.department?.name, `${coursesData.length} مواد دراسية`].filter(Boolean).join(" · ");

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {coursesData.map((course) => (
            <div
              key={course.id}
              onClick={() =>
                navigate({
                  ...nav,
                  screen: "course-detail",
                  course: { id: course.id, name: course.name, nameEn: course.nameEn, color: course.color },
                })
              }
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#323D59] p-6 text-right shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-white/[0.15] hover:shadow-2xl hover:bg-[#3B4868] cursor-pointer"
            >
              <div
                className="absolute -top-6 -left-6 h-24 w-24 rounded-full transition-transform group-hover:scale-125 duration-500 opacity-[0.12] blur-xl"
                style={{ background: course.color }}
              />

              <div className="flex items-start gap-4">
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
                <div className="flex-1">
                  <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#9DBFB8] transition-colors">
                    {course.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#A5B4BF]">
                    {course.nameEn}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-3.5">
                <span
                  className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold shadow-sm"
                  style={{
                    color: course.color,
                    background: `${course.color}15`,
                    border: `1px solid ${course.color}25`,
                  }}
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>{course.files} ملف دراسي</span>
                </span>

                <span className="text-xs font-bold text-[#7DA49F]">
                  ★ {course.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
