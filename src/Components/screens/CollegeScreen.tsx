import { useState } from "react";
import { Search, Layers } from "lucide-react";
import type { NavState } from "../StudentApp";
import TopBar from "../TopBar";

const collegesData: Record<
  number,
  Array<{ id: number; name: string; nameEn: string; depts: number; color: string; icon: string }>
> = {
  1: [
    { id: 1, name: "كلية علوم الحاسوب والمعلومات", nameEn: "Faculty of Computer Science", depts: 4, color: "#6B8EC7", icon: "💻" },
    { id: 2, name: "كلية الهندسة", nameEn: "Faculty of Engineering", depts: 8, color: "#C9A855", icon: "⚙" },
    { id: 3, name: "كلية الطب", nameEn: "Faculty of Medicine", depts: 12, color: "#5BAA8E", icon: "⚕" },
    { id: 4, name: "كلية العلوم", nameEn: "Faculty of Science", depts: 6, color: "#8B7EC0", icon: "🔬" },
    { id: 5, name: "كلية الاقتصاد والعلوم السياسية", nameEn: "Faculty of Economics", depts: 5, color: "#5BA8B5", icon: "📊" },
    { id: 6, name: "كلية الآداب", nameEn: "Faculty of Arts", depts: 7, color: "#C07A9B", icon: "📖" },
    { id: 7, name: "كلية الحقوق", nameEn: "Faculty of Law", depts: 3, color: "#B08D6A", icon: "⚖" },
    { id: 8, name: "كلية التجارة", nameEn: "Faculty of Commerce", depts: 5, color: "#7DA49F", icon: "💰" },
  ],
};

interface Props {
  nav: NavState;
  navigate: (s: NavState) => void;
}

export default function CollegeScreen({ nav, navigate }: Props) {
  const [search] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const uniId = nav.university?.id ?? 1;
  const colleges = (collegesData[uniId] ?? collegesData[1]).filter(
    (c) =>
      c.name.includes(searchTerm || search) ||
      c.nameEn.toLowerCase().includes((searchTerm || search).toLowerCase()),
  );

  return (
    <div className="w-full">
      <TopBar
        breadcrumbs={[
          { label: "الرئيسية", onClick: () => navigate({ screen: "home" }) },
          { label: "الجامعات", onClick: () => navigate({ screen: "universities" }) },
          { label: nav.university?.name ?? "" },
        ]}
      />
      <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
        {/* Page Title on Base Canvas */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-[#F8FAFC]">
            {nav.university?.name}
          </h1>
          <p className="text-sm font-medium text-[#A5B4BF]">
            اختر الكلية للمتابعة
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7DA49F] h-4 w-4" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث عن كلية..."
            className="w-full rounded-xl border border-white/[0.07] bg-[#323D59] py-2.5 pr-11 pl-4 text-sm text-[#F8FAFC] placeholder-[#7A8A9B] outline-none transition-all focus:border-[#7DA49F]/50 focus:ring-2 focus:ring-[#7DA49F]/15"
          />
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {colleges.map((college) => (
            <div
              key={college.id}
              onClick={() =>
                navigate({
                  ...nav,
                  screen: "departments",
                  college: { id: college.id, name: college.name, nameEn: college.nameEn },
                })
              }
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#323D59] p-6 text-right shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-white/[0.15] hover:shadow-2xl hover:bg-[#3B4868] cursor-pointer"
            >
              <div
                className="absolute -top-6 -left-6 h-20 w-20 rounded-full transition-transform group-hover:scale-125 duration-500 opacity-[0.12] blur-xl"
                style={{ background: college.color }}
              />

              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform duration-300 group-hover:scale-110 shadow-md"
                style={{
                  background: `${college.color}18`,
                  border: `1.5px solid ${college.color}30`,
                }}
              >
                {college.icon}
              </div>

              <h3 className="mb-1 text-sm sm:text-base font-bold text-[#F8FAFC] group-hover:text-[#9DBFB8] transition-colors leading-snug">
                {college.name}
              </h3>
              <p className="mb-4 text-xs font-semibold text-[#A5B4BF]">
                {college.nameEn}
              </p>

              <div className="flex items-center justify-between border-t border-white/[0.06] pt-3 text-xs text-[#A5B4BF]">
                <span className="flex items-center gap-1 font-semibold" style={{ color: college.color }}>
                  <Layers className="h-3.5 w-3.5" />
                  <span>{college.depts} أقسام</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
