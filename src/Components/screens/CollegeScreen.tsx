import { useState } from "react";
import { Search, Layers } from "lucide-react";
import type { NavState } from "../StudentApp";
import TopBar from "../TopBar";

const collegesData: Record<
  number,
  Array<{
    id: number;
    name: string;
    nameEn: string;
    depts: number;
    color: string;
    icon: string;
  }>
> = {
  1: [
    {
      id: 1,
      name: "كلية علوم الحاسوب والمعلومات",
      nameEn: "Faculty of Computer Science",
      depts: 4,
      color: "#899C9A", // Provence Blue
      icon: "💻",
    },
    {
      id: 2,
      name: "كلية الهندسة",
      nameEn: "Faculty of Engineering",
      depts: 8,
      color: "#AABCAF", // Foggy Rain
      icon: "⚙",
    },
    {
      id: 3,
      name: "كلية الطب",
      nameEn: "Faculty of Medicine",
      depts: 12,
      color: "#899C9A", // Provence Blue
      icon: "⚕",
    },
    {
      id: 4,
      name: "كلية العلوم",
      nameEn: "Faculty of Science",
      depts: 6,
      color: "#AABCAF", // Foggy Rain
      icon: "🔬",
    },
    {
      id: 5,
      name: "كلية الاقتصاد والعلوم السياسية",
      nameEn: "Faculty of Economics",
      depts: 5,
      color: "#899C9A", // Provence Blue
      icon: "📊",
    },
    {
      id: 6,
      name: "كلية الآداب",
      nameEn: "Faculty of Arts",
      depts: 7,
      color: "#AABCAF", // Foggy Rain
      icon: "📖",
    },
    {
      id: 7,
      name: "كلية الحقوق",
      nameEn: "Faculty of Law",
      depts: 3,
      color: "#899C9A",
      icon: "⚖",
    },
    {
      id: 8,
      name: "كلية التجارة",
      nameEn: "Faculty of Commerce",
      depts: 5,
      color: "#AABCAF",
      icon: "💰",
    },
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
          {
            label: "الجامعات",
            onClick: () => navigate({ screen: "universities" }),
          },
          { label: nav.university?.name ?? "" },
        ]}
        title={nav.university?.name}
        subtitle="اختر الكلية للمتابعة"
      />
      <div className="p-6 sm:p-8 max-w-7xl mx-auto">
        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#899C9A] h-4 w-4" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث عن كلية..."
            className="w-full rounded-xl border border-[#6E7C8B]/40 bg-[#525C79]/80 py-2.5 pr-11 pl-4 text-sm text-[#F4F7F6] placeholder-[#AABCAF]/70 outline-none transition-all focus:border-[#899C9A] focus:ring-2 focus:ring-[#899C9A]/25"
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
                  college: {
                    id: college.id,
                    name: college.name,
                    nameEn: college.nameEn,
                  },
                })
              }
              className="group relative overflow-hidden rounded-2xl border border-[#6E7C8B]/40 bg-[#525C79]/85 p-6 text-right shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#899C9A] hover:bg-[#525C79] hover:shadow-2xl cursor-pointer"
            >
              <div
                className="absolute -top-6 -left-6 h-20 w-20 rounded-full transition-transform group-hover:scale-125 duration-500 opacity-20"
                style={{ background: college.color }}
              />

              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform duration-300 group-hover:scale-110 shadow-md"
                style={{
                  background: `${college.color}25`,
                  border: `1.5px solid ${college.color}45`,
                }}
              >
                {college.icon}
              </div>

              <h3 className="mb-1 text-sm sm:text-base font-bold text-[#F4F7F6] group-hover:text-[#AABCAF] transition-colors leading-snug">
                {college.name}
              </h3>
              <p className="mb-4 text-xs font-semibold text-[#AABCAF]">
                {college.nameEn}
              </p>

              <div className="flex items-center justify-between border-t border-[#6E7C8B]/30 pt-3 text-xs text-[#AABCAF]">
                <span className="flex items-center gap-1 font-semibold text-[#899C9A]">
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
