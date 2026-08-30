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
      color: "#3B82F6",
      icon: "💻",
    },
    {
      id: 2,
      name: "كلية الهندسة",
      nameEn: "Faculty of Engineering",
      depts: 8,
      color: "#8B5CF6",
      icon: "⚙",
    },
    {
      id: 3,
      name: "كلية الطب",
      nameEn: "Faculty of Medicine",
      depts: 12,
      color: "#EF4444",
      icon: "⚕",
    },
    {
      id: 4,
      name: "كلية العلوم",
      nameEn: "Faculty of Science",
      depts: 6,
      color: "#06B6D4",
      icon: "🔬",
    },
    {
      id: 5,
      name: "كلية الاقتصاد والعلوم السياسية",
      nameEn: "Faculty of Economics",
      depts: 5,
      color: "#10B981",
      icon: "📊",
    },
    {
      id: 6,
      name: "كلية الآداب",
      nameEn: "Faculty of Arts",
      depts: 7,
      color: "#F59E0B",
      icon: "📖",
    },
    {
      id: 7,
      name: "كلية الحقوق",
      nameEn: "Faculty of Law",
      depts: 3,
      color: "#EC4899",
      icon: "⚖",
    },
    {
      id: 8,
      name: "كلية التجارة",
      nameEn: "Faculty of Commerce",
      depts: 5,
      color: "#8B5CF6",
      icon: "💰",
    },
  ],
};

interface Props {
  nav: NavState;
  navigate: (s: NavState) => void;
}

export default function CollegeScreen({ nav, navigate }: Props) {
  const [search, setSearch] = useState("");
  const uniId = nav.university?.id ?? 1;
  const colleges = (collegesData[uniId] ?? collegesData[1]).filter(
    (c) =>
      c.name.includes(search) ||
      c.nameEn.toLowerCase().includes(search.toLowerCase()),
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
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] h-4 w-4" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن كلية..."
            className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-card)] py-2.5 pr-11 pl-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
              className="group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 text-right transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-500/5 cursor-pointer"
            >
              <div
                className="absolute -top-6 -left-6 h-20 w-20 rounded-full transition-transform group-hover:scale-125 duration-500 opacity-20"
                style={{ background: college.color }}
              />

              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${college.color}25` }}
              >
                {college.icon}
              </div>

              <h3 className="mb-1 text-sm sm:text-base font-bold text-[var(--text-primary)] leading-snug">
                {college.name}
              </h3>
              <p className="mb-4 text-xs text-[var(--text-secondary)]">
                {college.nameEn}
              </p>

              <span
                className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold"
                style={{
                  color: college.color,
                  background: `${college.color}15`,
                }}
              >
                <Layers className="h-3 w-3" />
                <span>{college.depts} قسم</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
