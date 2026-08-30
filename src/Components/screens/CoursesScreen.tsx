import { FileText } from "lucide-react";
import type { NavState } from "../StudentApp";
import TopBar from "../TopBar";

const coursesData = [
  {
    id: 1,
    name: "برمجة 1",
    nameEn: "Programming 1",
    files: 32,
    color: "#3B82F6",
    icon: "💻",
    rating: 4.8,
  },
  {
    id: 2,
    name: "رياضيات",
    nameEn: "Mathematics",
    files: 28,
    color: "#8B5CF6",
    icon: "∑",
    rating: 4.5,
  },
  {
    id: 3,
    name: "إنجليزي",
    nameEn: "English",
    files: 18,
    color: "#06B6D4",
    icon: "En",
    rating: 4.2,
  },
  {
    id: 4,
    name: "مهارات الحاسوب",
    nameEn: "Computer Skills",
    files: 22,
    color: "#F59E0B",
    icon: "🖥",
    rating: 4.6,
  },
  {
    id: 5,
    name: "المنطق الرقمي",
    nameEn: "Digital Logic",
    files: 25,
    color: "#EC4899",
    icon: "⊕",
    rating: 4.3,
  },
  {
    id: 6,
    name: "فيزياء",
    nameEn: "Physics",
    files: 20,
    color: "#10B981",
    icon: "⚛",
    rating: 4.4,
  },
];

interface Props {
  nav: NavState;
  navigate: (s: NavState) => void;
}

export default function CoursesScreen({ nav, navigate }: Props) {
  const breadcrumbsList = [
    { label: "الرئيسية", onClick: () => navigate({ screen: "home" }) },
    {
      label: "التخصصات",
      onClick: () => navigate({ screen: "departments" }),
    },
    ...(nav.department?.name
      ? [
          {
            label: nav.department.name,
            onClick: () => navigate({ ...nav, screen: "levels" as const }),
          },
        ]
      : []),
    ...(nav.level?.name
      ? [
          {
            label: nav.level.name,
            onClick: () => navigate({ ...nav, screen: "levels" as const }),
          },
        ]
      : []),
    ...(nav.semester?.name ? [{ label: nav.semester.name }] : []),
  ];

  const titleText = [nav.level?.name, nav.semester?.name]
    .filter(Boolean)
    .join(" — ");

  const subtitleText = [
    nav.department?.name,
    `${coursesData.length} مواد دراسية`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="w-full">
      <TopBar
        breadcrumbs={breadcrumbsList}
        title={titleText || "المواد الدراسية"}
        subtitle={subtitleText}
      />
      <div className="p-6 sm:p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {coursesData.map((course) => (
            <div
              key={course.id}
              onClick={() =>
                navigate({
                  ...nav,
                  screen: "course-detail",
                  course: {
                    id: course.id,
                    name: course.name,
                    nameEn: course.nameEn,
                    color: course.color,
                  },
                })
              }
              className="group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 text-right transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl cursor-pointer"
            >
              <div
                className="absolute -top-6 -left-6 h-24 w-24 rounded-full transition-transform group-hover:scale-125 duration-500 opacity-20"
                style={{ background: course.color }}
              />

              <div className="flex items-start gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-mono text-xl font-bold transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${course.color}22`,
                    color: course.color,
                  }}
                >
                  {course.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    {course.name}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {course.nameEn}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
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
      </div>
    </div>
  );
}
