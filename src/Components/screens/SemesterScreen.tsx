import { Calendar, ArrowLeft } from "lucide-react";
import type { NavState } from "../StudentApp";
import TopBar from "../TopBar";

const semesters = [
  { id: 1, name: "الترم الأول", courses: 6, files: 124, color: "#3B82F6" },
  { id: 2, name: "الترم الثاني", courses: 6, files: 118, color: "#8B5CF6" },
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
          {
            label: "التخصصات",
            onClick: () => navigate({ screen: "departments" }),
          },
          {
            label: nav.department?.name ?? "",
            onClick: () => navigate({ ...nav, screen: "levels" }),
          },
          { label: nav.level?.name ?? "" },
        ]}
        title={`${nav.department?.name ?? ""} — ${nav.level?.name ?? ""}`}
        subtitle="اختر الترم الدراسي"
      />
      <div className="p-6 sm:p-8 max-w-4xl mx-auto">
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
              className="group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500/40 hover:shadow-2xl cursor-pointer"
            >
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl transition-transform duration-300 group-hover:scale-110 shadow-lg"
                style={{
                  background: `${sem.color}20`,
                  color: sem.color,
                  boxShadow: `0 4px 20px ${sem.color}15`,
                }}
              >
                <Calendar className="h-7 w-7" />
              </div>

              <h3 className="mb-3 text-xl font-extrabold text-[var(--text-primary)]">
                {sem.name}
              </h3>

              <div className="my-4 flex items-center justify-center gap-6">
                <div>
                  <div
                    className="text-2xl font-black"
                    style={{ color: sem.color }}
                  >
                    {sem.courses}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">مادة</div>
                </div>
                <div className="h-8 w-px bg-[var(--border-subtle)]" />
                <div>
                  <div
                    className="text-2xl font-black"
                    style={{ color: sem.color }}
                  >
                    {sem.files}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">ملف</div>
                </div>
              </div>

              <button
                type="button"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer border-0 shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${sem.color}, ${sem.color}dd)`,
                  boxShadow: `0 4px 16px ${sem.color}35`,
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
