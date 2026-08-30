import { ChevronLeft, BookOpen } from "lucide-react";
import type { NavState } from "../StudentApp";
import TopBar from "../TopBar";

const levels = [
  {
    id: 1,
    name: "السنة الأولى",
    year: 1,
    color: "#3B82F6",
    icon: "①",
    courses: 8,
  },
  {
    id: 2,
    name: "السنة الثانية",
    year: 2,
    color: "#8B5CF6",
    icon: "②",
    courses: 10,
  },
  {
    id: 3,
    name: "السنة الثالثة",
    year: 3,
    color: "#06B6D4",
    icon: "③",
    courses: 10,
  },
  {
    id: 4,
    name: "السنة الرابعة",
    year: 4,
    color: "#10B981",
    icon: "④",
    courses: 9,
  },
];

interface Props {
  nav: NavState;
  navigate: (s: NavState) => void;
}

export default function LevelScreen({ nav, navigate }: Props) {
  const deptColor = nav.department?.color ?? "#3B82F6";

  return (
    <div className="w-full">
      <TopBar
        breadcrumbs={[
          { label: "الرئيسية", onClick: () => navigate({ screen: "home" }) },
          {
            label: "التخصصات",
            onClick: () => navigate({ screen: "departments" }),
          },
          { label: nav.department?.name ?? "" },
        ]}
        title={nav.department?.name}
        subtitle="اختر السنة الدراسية"
      />
      <div className="p-6 sm:p-8 max-w-7xl mx-auto">
        {/* Department Banner Header */}
        <div className="mb-8 flex items-center gap-5 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-transparent p-6 shadow-lg">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl font-mono text-3xl font-bold shadow-md"
            style={{
              background: `${deptColor}25`,
              color: deptColor,
              boxShadow: `0 4px 20px ${deptColor}20`,
            }}
          >
            {nav.department?.icon ?? "💻"}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
              {nav.department?.name}
            </h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              {nav.department?.nameEn} {nav.college?.name ? `— ${nav.college.name}` : ""}
            </p>
          </div>
        </div>

        <h3 className="mb-4 text-base font-bold text-[var(--text-secondary)]">
          المستويات الدراسية
        </h3>

        {/* Levels List */}
        <div className="flex flex-col gap-3">
          {levels.map((level) => (
            <div
              key={level.id}
              onClick={() =>
                navigate({
                  ...nav,
                  screen: "semesters",
                  level: { id: level.id, name: level.name },
                })
              }
              className="group flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 sm:p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500/40 hover:shadow-lg cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-bold transition-transform duration-200 group-hover:scale-105"
                  style={{
                    background: `${level.color}20`,
                    color: level.color,
                  }}
                >
                  {level.icon}
                </div>
                <div>
                  <h4 className="text-base font-bold text-[var(--text-primary)]">
                    {level.name}
                  </h4>
                  <div className="mt-0.5 flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                    <BookOpen className="h-3 w-3" />
                    <span>{level.courses} مادة دراسية</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className="rounded-lg px-2.5 py-1 text-xs font-semibold"
                  style={{
                    color: level.color,
                    background: `${level.color}15`,
                  }}
                >
                  المستوى {level.year}
                </span>
                <ChevronLeft className="h-4 w-4 text-[var(--text-muted)] transition-transform group-hover:-translate-x-1 rtl:rotate-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
