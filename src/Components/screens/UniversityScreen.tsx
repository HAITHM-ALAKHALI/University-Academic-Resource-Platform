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
    color: "#899C9A", // Provence Blue
  },
  {
    id: 2,
    name: "جامعة الإسكندرية",
    nameEn: "Alexandria University",
    colleges: 22,
    logo: "⚓",
    city: "الإسكندرية",
    founded: 1938,
    color: "#AABCAF", // Foggy Rain
  },
  {
    id: 3,
    name: "جامعة الأزهر",
    nameEn: "Al-Azhar University",
    colleges: 18,
    logo: "🕌",
    city: "القاهرة",
    founded: 970,
    color: "#899C9A", // Provence Blue
  },
  {
    id: 4,
    name: "جامعة عين شمس",
    nameEn: "Ain Shams University",
    colleges: 20,
    logo: "☀",
    city: "القاهرة",
    founded: 1950,
    color: "#AABCAF", // Foggy Rain
  },
  {
    id: 5,
    name: "جامعة المنصورة",
    nameEn: "Mansoura University",
    colleges: 16,
    logo: "🌿",
    city: "المنصورة",
    founded: 1972,
    color: "#899C9A", // Provence Blue
  },
  {
    id: 6,
    name: "جامعة حلوان",
    nameEn: "Helwan University",
    colleges: 14,
    logo: "⚙",
    city: "حلوان",
    founded: 1975,
    color: "#AABCAF", // Foggy Rain
  },
  {
    id: 7,
    name: "جامعة بنها",
    nameEn: "Benha University",
    colleges: 12,
    logo: "📚",
    city: "بنها",
    founded: 1976,
    color: "#899C9A",
  },
  {
    id: 8,
    name: "جامعة أسيوط",
    nameEn: "Assiut University",
    colleges: 15,
    logo: "🏜",
    city: "أسيوط",
    founded: 1949,
    color: "#AABCAF",
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
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#899C9A] h-4 w-4" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن جامعة..."
            className="w-full rounded-xl border border-[#6E7C8B]/40 bg-[#525C79]/80 py-2.5 pr-11 pl-4 text-sm text-[#F4F7F6] placeholder-[#AABCAF]/70 outline-none transition-all focus:border-[#899C9A] focus:ring-2 focus:ring-[#899C9A]/25"
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
              className="group relative overflow-hidden rounded-2xl border border-[#6E7C8B]/40 bg-[#525C79]/85 p-6 text-center shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#899C9A] hover:bg-[#525C79] hover:shadow-2xl cursor-pointer"
            >
              <div
                className="absolute -top-6 -right-6 h-24 w-24 rounded-full transition-transform group-hover:scale-125 duration-500 opacity-20"
                style={{ background: uni.color }}
              />

              <div
                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition-transform duration-300 group-hover:scale-110 shadow-md"
                style={{
                  background: `${uni.color}25`,
                  border: `1.5px solid ${uni.color}45`,
                }}
              >
                {uni.logo}
              </div>

              <h3 className="mb-1 text-base font-bold text-[#F4F7F6] group-hover:text-[#AABCAF] transition-colors">
                {uni.name}
              </h3>
              <p className="mb-4 text-xs font-semibold text-[#AABCAF]">
                {uni.nameEn}
              </p>

              <div className="flex items-center justify-between border-t border-[#6E7C8B]/30 pt-3 text-xs text-[#AABCAF]">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-[#899C9A]" />
                  <span>{uni.city}</span>
                </span>
                <span className="flex items-center gap-1 font-semibold text-[#F4F7F6]">
                  <Building className="h-3.5 w-3.5 text-[#899C9A]" />
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
