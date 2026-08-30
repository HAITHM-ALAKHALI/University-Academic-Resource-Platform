import { BookOpen, Calendar, ArrowLeft } from "lucide-react";
import type { NavState } from "../StudentApp";
import TopBar from "../TopBar";

const levels = [
  {
    id: 1,
    name: "السنة الأولى",
    year: 1,
    color: "#3B82F6",
    icon: "①",
    coursesCount: 8,
    semesters: [
      { id: 1, name: "الترم الأول", courses: 4, files: 124, color: "#3B82F6" },
      { id: 2, name: "الترم الثاني", courses: 4, files: 118, color: "#60A5FA" },
    ],
  },
  {
    id: 2,
    name: "السنة الثانية",
    year: 2,
    color: "#8B5CF6",
    icon: "②",
    coursesCount: 10,
    semesters: [
      { id: 1, name: "الترم الأول", courses: 5, files: 142, color: "#8B5CF6" },
      { id: 2, name: "الترم الثاني", courses: 5, files: 136, color: "#A78BFA" },
    ],
  },
  {
    id: 3,
    name: "السنة الثالثة",
    year: 3,
    color: "#06B6D4",
    icon: "③",
    coursesCount: 10,
    semesters: [
      { id: 1, name: "الترم الأول", courses: 5, files: 155, color: "#06B6D4" },
      { id: 2, name: "الترم الثاني", courses: 5, files: 148, color: "#22D3EE" },
    ],
  },
  {
    id: 4,
    name: "السنة الرابعة",
    year: 4,
    color: "#10B981",
    icon: "④",
    coursesCount: 9,
    semesters: [
      { id: 1, name: "الترم الأول", courses: 5, files: 160, color: "#10B981" },
      { id: 2, name: "الترم الثاني", courses: 4, files: 145, color: "#34D399" },
    ],
  },
];

interface Props {
  nav: NavState;
  navigate: (s: NavState) => void;
}

export default function LevelScreen({ nav, navigate }: Props) {
  const deptColor = nav.department?.color ?? "#3B82F6";

  const handleSelectSemester = (
    level: { id: number; name: string },
    semester: { id: number; name: string }
  ) => {
    navigate({
      ...nav,
      screen: "courses",
      level: { id: level.id, name: level.name },
      semester: { id: semester.id, name: semester.name },
    });
  };

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
        subtitle="اختر السنة الدراسية والترم للمتابعة"
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
          السنوات والأترام الدراسية
        </h3>

        {/* Levels with integrated Semesters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {levels.map((level) => (
            <div
              key={level.id}
              className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 shadow-lg transition-all duration-300 hover:border-white/20"
            >
              {/* Subtle top accent bar */}
              <div
                className="absolute top-0 right-0 left-0 h-1.5"
                style={{ background: level.color }}
              />

              {/* Level Header */}
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-3.5">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl font-bold shadow-md"
                    style={{
                      background: `${level.color}25`,
                      color: level.color,
                      border: `1px solid ${level.color}35`,
                    }}
                  >
                    {level.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[var(--text-primary)]">
                      {level.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] mt-0.5">
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>{level.coursesCount} مواد دراسية</span>
                    </div>
                  </div>
                </div>

                <span
                  className="rounded-lg px-2.5 py-1 text-xs font-semibold"
                  style={{
                    color: level.color,
                    background: `${level.color}15`,
                  }}
                >
                  المستوى {level.year}
                </span>
              </div>

              {/* Integrated Semesters Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[var(--border-subtle)]">
                {level.semesters.map((sem) => (
                  <button
                    key={sem.id}
                    type="button"
                    onClick={() => handleSelectSemester(level, sem)}
                    className="group/sem flex flex-col items-start justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5 text-right transition-all duration-200 hover:border-blue-500/50 hover:bg-blue-500/[0.08] hover:-translate-y-0.5 cursor-pointer shadow-sm"
                  >
                    <div className="flex w-full items-center justify-between text-xs font-semibold text-slate-300 group-hover/sem:text-white mb-2">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-blue-400" />
                        <span>{sem.name}</span>
                      </span>
                      <ArrowLeft className="h-3.5 w-3.5 text-slate-400 transition-transform group-hover/sem:-translate-x-1 group-hover/sem:text-blue-400 rtl:rotate-0" />
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)]">
                      <span>{sem.courses} مواد</span>
                      <span>·</span>
                      <span>{sem.files} ملف</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
