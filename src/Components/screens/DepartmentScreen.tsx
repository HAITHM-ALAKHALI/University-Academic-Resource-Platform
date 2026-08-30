import { useState } from "react";
import { Search } from "lucide-react";
import type { NavState } from "../StudentApp";
import TopBar from "../TopBar";

export const departments = [
  {
    id: 1,
    name: "علوم حاسوب",
    nameEn: "CS",
    color: "#899C9A", // Provence Blue
    icon: "</>",
    desc: "Computer Science",
  },
  {
    id: 2,
    name: "تقنية معلومات",
    nameEn: "IT",
    color: "#AABCAF", // Foggy Rain
    icon: "🖥",
    desc: "Information Technology",
  },
  {
    id: 3,
    name: "أمن سيبراني",
    nameEn: "CYS",
    color: "#899C9A", // Provence Blue
    icon: "🔐",
    desc: "Cyber Security",
  },
  {
    id: 4,
    name: "ذكاء اصطناعي",
    nameEn: "AI",
    color: "#AABCAF", // Foggy Rain
    icon: "🤖",
    desc: "Artificial Intelligence",
  },
  {
    id: 5,
    name: "نظم معلومات",
    nameEn: "IS",
    color: "#899C9A", // Provence Blue
    icon: "🗄",
    desc: "Information Systems",
  },
  {
    id: 6,
    name: "علم البيانات",
    nameEn: "DS",
    color: "#AABCAF", // Foggy Rain
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
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#899C9A] h-4 w-4" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن قسم..."
            className="w-full rounded-xl border border-[#6E7C8B]/40 bg-[#525C79]/80 py-2.5 pr-11 pl-4 text-sm text-[#F4F7F6] placeholder-[#AABCAF]/70 outline-none transition-all focus:border-[#899C9A] focus:ring-2 focus:ring-[#899C9A]/25"
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
              className="group relative overflow-hidden rounded-2xl border border-[#6E7C8B]/40 bg-[#525C79]/85 p-7 text-right shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#899C9A] hover:shadow-2xl hover:bg-[#525C79] cursor-pointer"
            >
              <div
                className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full transition-transform group-hover:scale-125 duration-500 opacity-20"
                style={{ background: dept.color }}
              />

              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl font-mono text-2xl font-bold transition-transform duration-300 group-hover:scale-110 shadow-md"
                style={{
                  background: `${dept.color}25`,
                  color: dept.color,
                  border: `1.5px solid ${dept.color}50`,
                }}
              >
                {dept.icon}
              </div>

              <h3 className="mb-1 text-lg sm:text-xl font-extrabold text-[#F4F7F6] group-hover:text-[#AABCAF] transition-colors">
                {dept.name}
              </h3>
              <p className="mb-3 text-xs font-semibold text-[#AABCAF]">
                {dept.nameEn}
              </p>

              <span
                className="inline-block rounded-lg px-2.5 py-1 text-xs font-bold"
                style={{
                  color: dept.color,
                  background: `${dept.color}20`,
                  border: `1px solid ${dept.color}40`,
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
