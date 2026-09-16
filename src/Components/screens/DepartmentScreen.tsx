import { useState } from "react";
import { Search } from "lucide-react";
import type { NavState } from "../StudentApp";
import TopBar from "../TopBar";
import { departmentsData } from "../../constants/academicData";

export const departments = departmentsData;

interface Props {
  nav: NavState;
  navigate: (s: NavState) => void;
}

export default function DepartmentScreen({ navigate }: Props) {
  const [search, setSearch] = useState("");
  const filtered = departmentsData.filter(
    (d) =>
      d.name.includes(search) ||
      d.nameEn.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-full">
      <TopBar
        breadcrumbs={[
          { label: "الرئيسية", onClick: () => navigate({ screen: "home" }) },
          { label: "الأقسام" },
        ]}
      />
      <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
        {/* Page Title on Base Canvas */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-[#F8FAFC]">
            الأقسام الأكاديمية
          </h1>
          <p className="text-sm font-medium text-[#A5B4BF]">
            اختر التخصص الأكاديمي للمتابعة
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((dept) => (
            <div
              key={dept.id}
              onClick={() =>
                navigate({
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
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-[#323D59] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.15] hover:shadow-2xl hover:bg-[#3B4868] cursor-pointer"
            >
              <div
                className="absolute -top-8 -left-8 h-28 w-28 rounded-full opacity-[0.12] blur-xl pointer-events-none transition-transform duration-500 group-hover:scale-125"
                style={{ background: dept.color }}
              />

              <div>
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold transition-transform duration-300 group-hover:scale-110 shadow-md"
                    style={{
                      background: `${dept.color}18`,
                      color: dept.color,
                      border: `1.5px solid ${dept.color}30`,
                    }}
                  >
                    {dept.icon}
                  </div>
                  <span
                    className="rounded-lg px-2 py-0.5 text-xs font-bold font-['JetBrains_Mono'] border"
                    style={{
                      borderColor: `${dept.color}30`,
                      color: dept.color,
                      backgroundColor: `${dept.color}12`,
                    }}
                  >
                    {dept.nameEn}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#9DBFB8] transition-colors">
                    {dept.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-[#A5B4BF]">
                    {dept.desc}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-3 text-xs">
                <span className="text-[#A5B4BF] font-semibold">
                  4 سنوات دراسية
                </span>
                <span
                  className="font-bold flex items-center gap-1 transition-transform group-hover:translate-x-[-4px]"
                  style={{ color: dept.color }}
                >
                  استعراض المواد ←
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
