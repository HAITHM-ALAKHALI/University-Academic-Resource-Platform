import { useState } from "react";
import { Search } from "lucide-react";
import type { NavState } from "../StudentApp";
import TopBar from "../TopBar";

export const departments = [
  {
    id: 1,
    name: "علوم حاسوب",
    nameEn: "CS",
    color: "#6B8EC7", // Soft Blue
    icon: "</>",
    desc: "Computer Science",
  },
  {
    id: 2,
    name: "تقنية معلومات",
    nameEn: "IT",
    color: "#5BA8B5", // Soft Cyan
    icon: "🖥",
    desc: "Information Technology",
  },
  {
    id: 3,
    name: "أمن سيبراني",
    nameEn: "CYS",
    color: "#5BAA8E", // Soft Emerald
    icon: "🔐",
    desc: "Cyber Security",
  },
  {
    id: 4,
    name: "ذكاء اصطناعي",
    nameEn: "AI",
    color: "#8B7EC0", // Soft Violet
    icon: "🤖",
    desc: "Artificial Intelligence",
  },
  {
    id: 5,
    name: "نظم معلومات",
    nameEn: "IS",
    color: "#C9A855", // Soft Amber
    icon: "🗄",
    desc: "Information Systems",
  },
  {
    id: 6,
    name: "علم البيانات",
    nameEn: "DS",
    color: "#C07A9B", // Soft Rose
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
      />
      <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
        {/* Page Title on Base Canvas */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-[#F8FAFC]">
            {nav.college?.name}
          </h1>
          <p className="text-sm font-medium text-[#A5B4BF]">
            اختر القسم للمتابعة
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7DA49F] h-4 w-4" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن قسم..."
            className="w-full rounded-xl border border-white/[0.07] bg-[#323D59] py-2.5 pr-11 pl-4 text-sm text-[#F8FAFC] placeholder-[#7A8A9B] outline-none transition-all focus:border-[#7DA49F]/50 focus:ring-2 focus:ring-[#7DA49F]/15"
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
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#323D59] p-7 text-right shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-white/[0.15] hover:shadow-2xl hover:bg-[#3B4868] cursor-pointer"
            >
              <div
                className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full transition-transform group-hover:scale-125 duration-500 opacity-[0.12] blur-xl"
                style={{ background: dept.color }}
              />

              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl font-mono text-2xl font-bold transition-transform duration-300 group-hover:scale-110 shadow-md"
                style={{
                  background: `${dept.color}18`,
                  color: dept.color,
                  border: `1.5px solid ${dept.color}30`,
                }}
              >
                {dept.icon}
              </div>

              <h3 className="mb-1 text-lg sm:text-xl font-extrabold text-[#F8FAFC] group-hover:text-[#9DBFB8] transition-colors">
                {dept.name}
              </h3>
              <p className="mb-3 text-xs font-semibold text-[#A5B4BF]">
                {dept.nameEn}
              </p>

              <span
                className="inline-block rounded-lg px-2.5 py-1 text-xs font-bold"
                style={{
                  color: dept.color,
                  background: `${dept.color}15`,
                  border: `1px solid ${dept.color}25`,
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
