import { BookOpen, Calendar, ArrowLeft } from "lucide-react";
import type { NavState } from "../StudentApp";
import TopBar from "../TopBar";

const levels = [
  {
    id: 1, name: "السنة الأولى", year: 1, color: "#6B8EC7", icon: "①", coursesCount: 8,
    semesters: [
      { id: 1, name: "الترم الأول", courses: 4, files: 124, color: "#6B8EC7" },
      { id: 2, name: "الترم الثاني", courses: 4, files: 118, color: "#5BA8B5" },
    ],
  },
  {
    id: 2, name: "السنة الثانية", year: 2, color: "#8B7EC0", icon: "②", coursesCount: 10,
    semesters: [
      { id: 1, name: "الترم الأول", courses: 5, files: 142, color: "#8B7EC0" },
      { id: 2, name: "الترم الثاني", courses: 5, files: 136, color: "#A598D4" },
    ],
  },
  {
    id: 3, name: "السنة الثالثة", year: 3, color: "#5BAA8E", icon: "③", coursesCount: 10,
    semesters: [
      { id: 1, name: "الترم الأول", courses: 5, files: 155, color: "#5BAA8E" },
      { id: 2, name: "الترم الثاني", courses: 5, files: 148, color: "#7DA49F" },
    ],
  },
  {
    id: 4, name: "السنة الرابعة", year: 4, color: "#C9A855", icon: "④", coursesCount: 9,
    semesters: [
      { id: 1, name: "الترم الأول", courses: 5, files: 160, color: "#C9A855" },
      { id: 2, name: "الترم الثاني", courses: 4, files: 145, color: "#B08D6A" },
    ],
  },
];

interface Props {
  nav: NavState;
  navigate: (s: NavState) => void;
}

export default function LevelScreen({ nav, navigate }: Props) {
  const deptColor = nav.department?.color ?? "#7DA49F";

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
          { label: "التخصصات", onClick: () => navigate({ screen: "departments" }) },
          { label: nav.department?.name ?? "" },
        ]}
      />
      <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
        {/* Department Page Title on Base Canvas */}
        <div className="flex items-center gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-mono text-2xl font-bold shadow-md"
            style={{
              background: `${deptColor}18`,
              color: deptColor,
              border: `1.5px solid ${deptColor}30`,
            }}
          >
            {nav.department?.icon ?? "💻"}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#F8FAFC]">
              {nav.department?.name}
            </h1>
            <p className="mt-0.5 text-sm font-semibold text-[#A5B4BF]">
              {nav.department?.nameEn} {nav.college?.name ? `— ${nav.college.name}` : ""} · اختر السنة الدراسية والترم للمتابعة
            </p>
          </div>
        </div>

        <h3 className="text-base font-bold text-[#F8FAFC]">
          السنوات والأترام الدراسية
        </h3>

        {/* Levels with integrated Semesters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {levels.map((level) => (
            <div
              key={level.id}
              className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#323D59] p-6 shadow-lg transition-all duration-300 hover:border-white/[0.15] hover:bg-[#3B4868]"
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
                      background: `${level.color}18`,
                      color: level.color,
                      border: `1.5px solid ${level.color}30`,
                    }}
                  >
                    {level.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#F8FAFC]">
                      {level.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#A5B4BF] mt-0.5">
                      <BookOpen className="h-3.5 w-3.5 text-[#7DA49F]" />
                      <span>{level.coursesCount} مواد دراسية</span>
                    </div>
                  </div>
                </div>

                <span
                  className="rounded-lg px-2.5 py-1 text-xs font-bold"
                  style={{
                    color: level.color,
                    background: `${level.color}15`,
                    border: `1px solid ${level.color}25`,
                  }}
                >
                  المستوى {level.year}
                </span>
              </div>

              {/* Integrated Semesters Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/[0.06]">
                {level.semesters.map((sem) => (
                  <button
                    key={sem.id}
                    type="button"
                    onClick={() => handleSelectSemester(level, sem)}
                    className="group/sem flex flex-col items-start justify-between rounded-xl border border-white/[0.06] bg-white/[0.03] p-3.5 text-right transition-all duration-200 hover:border-white/[0.15] hover:bg-[#3B4868] hover:-translate-y-0.5 cursor-pointer shadow-sm"
                  >
                    <div className="flex w-full items-center justify-between text-xs font-bold text-[#F8FAFC] group-hover/sem:text-[#A5B4BF] mb-2">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" style={{ color: sem.color }} />
                        <span>{sem.name}</span>
                      </span>
                      <ArrowLeft className="h-3.5 w-3.5 text-[#A5B4BF] transition-transform group-hover/sem:-translate-x-1 rtl:rotate-0" style={{ color: sem.color }} />
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-medium text-[#7A8A9B]">
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
