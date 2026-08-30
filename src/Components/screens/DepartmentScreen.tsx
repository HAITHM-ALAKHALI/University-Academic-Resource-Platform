import { useState } from "react";
import { Search } from "lucide-react";
import type { NavState } from "../StudentApp";
import TopBar from "../TopBar";

export const departments = [
  {
    id: 1,
    name: "علوم حاسوب",
    nameEn: "CS",
    color: "#3B82F6",
    icon: "</>",
    desc: "Computer Science",
  },
  {
    id: 2,
    name: "تقنية معلومات",
    nameEn: "IT",
    color: "#8B5CF6",
    icon: "🖥",
    desc: "Information Technology",
  },
  {
    id: 3,
    name: "أمن سيبراني",
    nameEn: "CYS",
    color: "#EC4899",
    icon: "🔐",
    desc: "Cyber Security",
  },
  {
    id: 4,
    name: "ذكاء اصطناعي",
    nameEn: "AI",
    color: "#F59E0B",
    icon: "🤖",
    desc: "Artificial Intelligence",
  },
  {
    id: 5,
    name: "نظم معلومات",
    nameEn: "IS",
    color: "#10B981",
    icon: "🗄",
    desc: "Information Systems",
  },
  {
    id: 6,
    name: "علم البيانات",
    nameEn: "DS",
    color: "#06B6D4",
    icon: "📊",
    desc: "Data Science",
  },
];

interface Props {
  nav: NavState;
  navigate: (s: NavState) => void;
}

export default function DepartmentScreen({ nav, navigate }: Props) {
  const [search, setSearch] = useState("");
  const filtered = departments.filter(
    (d) =>
      d.name.includes(search) ||
      d.nameEn.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-full">
      <TopBar
        breadcrumbs={[
          { label: "الرئيسية", onClick: () => navigate({ screen: "home" }) },
          { label: nav.college?.name ?? "" },
        ]}
        title={nav.college?.name}
        subtitle="اختر القسم للمتابعة"
      />
      <div className="p-6 sm:p-8 max-w-7xl mx-auto">
        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] h-4 w-4" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن قسم..."
            className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-card)] py-2.5 pr-11 pl-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filtered.map((dept) => (
            <div
              key={dept.id}
              onClick={() =>
                navigate({
                  ...nav,
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
              className="group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-7 text-right transition-all duration-300 hover:-translate-y-1.5 hover:border-opacity-50 hover:shadow-2xl cursor-pointer"
            >
              <div
                className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full transition-transform group-hover:scale-125 duration-500 opacity-15"
                style={{ background: dept.color }}
              />

              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl font-mono text-2xl font-bold transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `${dept.color}22`,
                  color: dept.color,
                }}
              >
                {dept.icon}
              </div>

              <h3 className="mb-1 text-lg sm:text-xl font-extrabold text-[var(--text-primary)]">
                {dept.name}
              </h3>
              <p className="mb-3 text-xs text-[var(--text-secondary)]">
                {dept.nameEn}
              </p>

              <span
                className="inline-block rounded-lg px-2.5 py-1 text-xs font-semibold"
                style={{
                  color: dept.color,
                  background: `${dept.color}15`,
                }}
              >
                {dept.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
