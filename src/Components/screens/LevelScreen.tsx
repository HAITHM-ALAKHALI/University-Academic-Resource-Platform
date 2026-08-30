import { BookOpen, Calendar, ArrowLeft } from "lucide-react";
import type { NavState } from "../StudentApp";
import TopBar from "../TopBar";

const levels = [
  {
    id: 1,
    name: "السنة الأولى",
    year: 1,
    color: "#899C9A", // Provence Blue
    icon: "①",
    coursesCount: 8,
    semesters: [
      { id: 1, name: "الترم الأول", courses: 4, files: 124, color: "#899C9A" },
      { id: 2, name: "الترم الثاني", courses: 4, files: 118, color: "#AABCAF" },
    ],
  },
  {
    id: 2,
    name: "السنة الثانية",
    year: 2,
    color: "#AABCAF", // Foggy Rain
    icon: "②",
    coursesCount: 10,
    semesters: [
      { id: 1, name: "الترم الأول", courses: 5, files: 142, color: "#899C9A" },
      { id: 2, name: "الترم الثاني", courses: 5, files: 136, color: "#AABCAF" },
    ],
  },
  {
    id: 3,
    name: "السنة الثالثة",
    year: 3,
    color: "#899C9A", // Provence Blue
    icon: "③",
    coursesCount: 10,
    semesters: [
      { id: 1, name: "الترم الأول", courses: 5, files: 155, color: "#899C9A" },
      { id: 2, name: "الترم الثاني", courses: 5, files: 148, color: "#AABCAF" },
    ],
  },
  {
    id: 4,
    name: "السنة الرابعة",
    year: 4,
    color: "#AABCAF", // Foggy Rain
    icon: "④",
    coursesCount: 9,
    semesters: [
      { id: 1, name: "الترم الأول", courses: 5, files: 160, color: "#899C9A" },
      { id: 2, name: "الترم الثاني", courses: 4, files: 145, color: "#AABCAF" },
    ],
  },
];

interface Props {
  nav: NavState;
  navigate: (s: NavState) => void;
}

export default function LevelScreen({ nav, navigate }: Props) {
  const deptColor = nav.department?.color ?? "#899C9A";

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
        <div className="mb-8 flex items-center gap-5 rounded-2xl border border-[#6E7C8B]/40 bg-[#525C79]/85 p-6 shadow-xl backdrop-blur-xl">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl font-mono text-3xl font-bold shadow-md"
            style={{
              background: `${deptColor}25`,
              color: deptColor,
              border: `1.5px solid ${deptColor}50`,
              boxShadow: `0 4px 20px ${deptColor}20`,
            }}
          >
            {nav.department?.icon ?? "💻"}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#F4F7F6]">
              {nav.department?.name}
            </h2>
            <p className="mt-1 text-sm font-semibold text-[#AABCAF]">
              {nav.department?.nameEn} {nav.college?.name ? `— ${nav.college.name}` : ""}
            </p>
          </div>
        </div>

        <h3 className="mb-4 text-base font-bold text-[#F4F7F6]">
          السنوات والأترام الدراسية
        </h3>

        {/* Levels with integrated Semesters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {levels.map((level) => (
            <div
              key={level.id}
              className="relative overflow-hidden rounded-2xl border border-[#6E7C8B]/40 bg-[#525C79]/85 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-[#899C9A] hover:bg-[#525C79]"
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
                      border: `1.5px solid ${level.color}45`,
                    }}
                  >
                    {level.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#F4F7F6]">
                      {level.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#AABCAF] mt-0.5">
                      <BookOpen className="h-3.5 w-3.5 text-[#899C9A]" />
                      <span>{level.coursesCount} مواد دراسية</span>
                    </div>
                  </div>
                </div>

                <span
                  className="rounded-lg px-2.5 py-1 text-xs font-bold"
                  style={{
                    color: level.color,
                    background: `${level.color}20`,
                    border: `1px solid ${level.color}40`,
                  }}
                >
                  المستوى {level.year}
                </span>
              </div>

              {/* Integrated Semesters Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#6E7C8B]/30">
                {level.semesters.map((sem) => (
                  <button
                    key={sem.id}
                    type="button"
                    onClick={() => handleSelectSemester(level, sem)}
                    className="group/sem flex flex-col items-start justify-between rounded-xl border border-[#6E7C8B]/40 bg-[#35425E]/60 p-3.5 text-right transition-all duration-200 hover:border-[#899C9A] hover:bg-[#35425E] hover:-translate-y-0.5 cursor-pointer shadow-sm"
                  >
                    <div className="flex w-full items-center justify-between text-xs font-bold text-[#F4F7F6] group-hover/sem:text-[#AABCAF] mb-2">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-[#899C9A]" />
                        <span>{sem.name}</span>
                      </span>
                      <ArrowLeft className="h-3.5 w-3.5 text-[#AABCAF] transition-transform group-hover/sem:-translate-x-1 group-hover/sem:text-[#899C9A] rtl:rotate-0" />
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-medium text-[#AABCAF]">
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
