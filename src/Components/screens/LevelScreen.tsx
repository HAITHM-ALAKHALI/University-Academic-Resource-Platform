import { BookOpen, Calendar, ArrowLeft } from "lucide-react";
import type { NavState } from "../StudentApp";
import TopBar from "../TopBar";
import { levelsData } from "../../constants/academicData";

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
      <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8">
        {/* Department Info Banner on Base Canvas */}
        <div className="flex items-center gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold shadow-lg"
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
              {nav.department?.nameEn} · اختر السنة الدراسية والترم للمتابعة
            </p>
          </div>
        </div>

        <h3 className="text-base font-bold text-[#F8FAFC]">
          السنوات والأترام الدراسية
        </h3>

        {/* Levels with integrated Semesters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {levelsData.map((level) => (
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
                    <h3 className="text-lg font-extrabold text-[#F8FAFC]">
                      {level.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#A5B4BF]">
                      {level.coursesCount} مواد دراسية موزعة على ترمين
                    </p>
                  </div>
                </div>

                <div
                  className="rounded-lg px-2.5 py-1 text-xs font-bold font-['JetBrains_Mono'] border"
                  style={{
                    borderColor: `${level.color}30`,
                    color: level.color,
                    backgroundColor: `${level.color}12`,
                  }}
                >
                  Year {level.year}
                </div>
              </div>

              {/* Semesters Cards Container */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-[#A5B4BF] flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#7DA49F]" />
                  <span>اختر الترم:</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {level.semesters.map((sem) => (
                    <button
                      key={sem.id}
                      type="button"
                      onClick={() => handleSelectSemester(level, sem)}
                      className="group/sem flex flex-col justify-between rounded-xl border border-white/[0.07] bg-[#242D42]/80 p-3.5 text-right transition-all duration-200 hover:border-[#7DA49F]/50 hover:bg-[#242D42] hover:scale-[1.02] cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span className="text-xs font-bold text-[#F8FAFC] group-hover/sem:text-[#9DBFB8] transition-colors">
                            {sem.name}
                          </span>
                          <ArrowLeft className="h-3.5 w-3.5 text-[#A5B4BF] opacity-0 group-hover/sem:opacity-100 group-hover/sem:text-[#7DA49F] transition-all rtl:rotate-0" />
                        </div>
                        <div className="flex items-center gap-3 text-[11px] font-medium text-[#A5B4BF]">
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3 text-[#7DA49F]" />
                            <span>{sem.courses} مواد</span>
                          </span>
                          <span>·</span>
                          <span>{sem.files} ملف</span>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-end">
                        <span
                          className="rounded-md px-2 py-0.5 text-[10px] font-bold transition-colors"
                          style={{
                            backgroundColor: `${sem.color}18`,
                            color: sem.color,
                          }}
                        >
                          تصفح المواد ←
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
