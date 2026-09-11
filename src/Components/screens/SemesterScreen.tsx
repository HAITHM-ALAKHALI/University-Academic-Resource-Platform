import { Calendar, ArrowLeft } from "lucide-react";
import type { NavState } from "../StudentApp";
import TopBar from "../TopBar";

const semesters = [
  { id: 1, name: "الترم الأول", courses: 6, files: 124, color: "#6B8EC7" },
  { id: 2, name: "الترم الثاني", courses: 6, files: 118, color: "#8B7EC0" },
];

interface Props {
  nav: NavState;
  navigate: (s: NavState) => void;
}

export default function SemesterScreen({ nav, navigate }: Props) {
  return (
    <div className="w-full">
      <TopBar
        breadcrumbs={[
          { label: "الرئيسية", onClick: () => navigate({ screen: "home" }) },
          { label: "التخصصات", onClick: () => navigate({ screen: "departments" }) },
          { label: nav.department?.name ?? "", onClick: () => navigate({ ...nav, screen: "levels" }) },
          { label: nav.level?.name ?? "" },
        ]}
      />
      <div className="p-6 sm:p-8 max-w-4xl mx-auto space-y-6">
        {/* Page Title on Base Canvas */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-[#F8FAFC]">
            {`${nav.department?.name ?? ""} — ${nav.level?.name ?? ""}`}
          </h1>
          <p className="text-sm font-medium text-[#A5B4BF]">
            اختر الترم الدراسي
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {semesters.map((sem) => (
            <div
              key={sem.id}
              onClick={() =>
                navigate({
                  ...nav,
                  screen: "courses",
                  semester: { id: sem.id, name: sem.name },
                })
              }
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#323D59] p-8 text-center shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-white/[0.15] hover:shadow-2xl hover:bg-[#3B4868] cursor-pointer"
            >
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl transition-transform duration-300 group-hover:scale-110 shadow-lg"
                style={{
                  background: `${sem.color}18`,
                  color: sem.color,
                  border: `1.5px solid ${sem.color}30`,
                }}
              >
                <Calendar className="h-7 w-7" />
              </div>

              <h3 className="mb-3 text-xl font-extrabold text-[#F8FAFC]">
                {sem.name}
              </h3>

              <div className="my-4 flex items-center justify-center gap-6">
                <div>
                  <div className="text-2xl font-black" style={{ color: sem.color }}>
                    {sem.courses}
                  </div>
                  <div className="text-xs font-semibold text-[#A5B4BF]">مادة</div>
                </div>
                <div className="h-8 w-px bg-white/[0.07]" />
                <div>
                  <div className="text-2xl font-black" style={{ color: sem.color }}>
                    {sem.files}
                  </div>
                  <div className="text-xs font-semibold text-[#A5B4BF]">ملف</div>
                </div>
              </div>

              <button
                type="button"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-sm font-bold text-[#1E2638] transition-all hover:scale-[1.02] active:scale-95 cursor-pointer border-0 shadow-md"
                style={{
                  background: sem.color,
                  boxShadow: `0 4px 16px ${sem.color}25`,
                }}
              >
                <span>عرض المواد</span>
                <ArrowLeft className="h-4 w-4 rtl:rotate-0" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
