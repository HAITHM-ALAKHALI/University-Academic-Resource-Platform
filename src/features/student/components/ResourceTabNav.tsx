import type { ResourceType } from "../../../types/academic";

export interface TabDef {
  id: ResourceType;
  label: string;
  icon: string;
}

export const tabDefs: TabDef[] = [
  { id: "lectures", label: "المحاضرات", icon: "📄" },
  { id: "books", label: "الكتب والمراجع", icon: "📕" },
  { id: "exams", label: "الامتحانات السابقة", icon: "📋" },
  { id: "videos", label: "المقاطع والشروحات", icon: "🎬" },
  { id: "projects", label: "المشاريع والواجبات", icon: "🗂" },
  { id: "external", label: "مصادر خارجية", icon: "🌐" },
];

export interface ResourceTabNavProps {
  activeTab: ResourceType;
  onSelectTab: (tab: ResourceType) => void;
  tabCounts: Record<string, number>;
}

export function ResourceTabNav({
  activeTab,
  onSelectTab,
  tabCounts,
}: ResourceTabNavProps) {
  return (
    <aside className="w-full md:w-60 shrink-0 rounded-2xl border border-white/[0.07] bg-[#323D59] p-2.5 h-fit shadow-lg">
      <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
        {tabDefs.map((tab) => {
          const isActive = activeTab === tab.id;
          const count = tabCounts[tab.id] || 0;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-right text-xs sm:text-sm font-bold transition-all cursor-pointer border-0 ${
                isActive
                  ? "bg-[#3B4868] text-[#F8FAFC] shadow-sm border border-[#7DA49F]/40"
                  : "bg-transparent text-[#A5B4BF] hover:bg-white/[0.05] hover:text-[#F8FAFC]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </div>
              <span
                className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                  isActive
                    ? "bg-[#7DA49F] text-[#1E2638]"
                    : "bg-white/[0.06] text-[#A5B4BF] border border-white/[0.06]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default ResourceTabNav;
