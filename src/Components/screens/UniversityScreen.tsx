import { useState } from "react";
import { Search, MapPin, Building } from "lucide-react";
import type { NavState } from "../StudentApp";
import TopBar from "../TopBar";

const universities = [
  {
    id: 1,
    name: "جامعة القاهرة",
    nameEn: "Cairo University",
    colleges: 24,
    logo: "🏛",
    city: "القاهرة",
    founded: 1908,
    color: "#3B82F6",
  },
  {
    id: 2,
    name: "جامعة الإسكندرية",
    nameEn: "Alexandria University",
    colleges: 22,
    logo: "⚓",
    city: "الإسكندرية",
    founded: 1938,
    color: "#8B5CF6",
  },
  {
    id: 3,
    name: "جامعة الأزهر",
    nameEn: "Al-Azhar University",
    colleges: 18,
    logo: "🕌",
    city: "القاهرة",
    founded: 970,
    color: "#06B6D4",
  },
  {
    id: 4,
    name: "جامعة عين شمس",
    nameEn: "Ain Shams University",
    colleges: 20,
    logo: "☀",
    city: "القاهرة",
    founded: 1950,
    color: "#10B981",
  },
  {
    id: 5,
    name: "جامعة المنصورة",
    nameEn: "Mansoura University",
    colleges: 16,
    logo: "🌿",
    city: "المنصورة",
    founded: 1972,
    color: "#F59E0B",
  },
  {
    id: 6,
    name: "جامعة حلوان",
    nameEn: "Helwan University",
    colleges: 14,
    logo: "⚙",
    city: "حلوان",
    founded: 1975,
    color: "#EC4899",
  },
  {
    id: 7,
    name: "جامعة بنها",
    nameEn: "Benha University",
    colleges: 12,
    logo: "📚",
    city: "بنها",
    founded: 1976,
    color: "#EF4444",
  },
  {
    id: 8,
    name: "جامعة أسيوط",
    nameEn: "Assiut University",
    colleges: 15,
    logo: "🏜",
    city: "أسيوط",
    founded: 1949,
    color: "#8B5CF6",
  },
];

interface Props {
  navigate: (s: NavState) => void;
}

export default function UniversityScreen({ navigate }: Props) {
  const [search, setSearch] = useState("");
  const filtered = universities.filter(
    (u) =>
      u.name.includes(search) ||
      u.nameEn.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-full">
      <TopBar
        breadcrumbs={[
          { label: "الرئيسية", onClick: () => navigate({ screen: "home" }) },
          { label: "الجامعات" },
        ]}
        title="اختر الجامعة"
        subtitle="تصفح الجامعات المتاحة واختر جامعتك"
      />
      <div className="p-6 sm:p-8 max-w-7xl mx-auto">
        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] h-4 w-4" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن جامعة..."
            className="w-full rounded-xl border border-[var(--border-medium)] bg-[var(--bg-card)] py-2.5 pr-11 pl-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((uni) => (
            <div
              key={uni.id}
              onClick={() =>
                navigate({
                  screen: "colleges",
                  university: {
                    id: uni.id,
                    name: uni.name,
                    nameEn: uni.nameEn,
                  },
                })
              }
              className="group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 cursor-pointer"
            >
              <div
                className="absolute -top-6 -right-6 h-24 w-24 rounded-full transition-transform group-hover:scale-125 duration-500 opacity-20"
                style={{ background: uni.color }}
              />

              <div
                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${uni.color}25` }}
              >
                {uni.logo}
              </div>

              <h3 className="mb-1 text-base font-bold text-[var(--text-primary)]">
                {uni.name}
              </h3>
              <p className="mb-4 text-xs text-[var(--text-secondary)]">
                {uni.nameEn}
              </p>

              <div className="flex items-center justify-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-[var(--text-muted)]">
                  <MapPin className="h-3 w-3" />
                  <span>{uni.city}</span>
                </span>
                <span
                  className="flex items-center gap-1 rounded-md px-2 py-0.5 font-semibold"
                  style={{
                    color: uni.color,
                    background: `${uni.color}15`,
                  }}
                >
                  <Building className="h-3 w-3" />
                  <span>{uni.colleges} كلية</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
