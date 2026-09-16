import type { Lang } from "../../../types/app";
import { t } from "../../../data";

export const tabKeys = ["lectures", "books", "assignments", "exams"] as const;
export type TabKey = (typeof tabKeys)[number];

export interface CourseResourceTabsProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  lang: Lang;
  tabCounts: Record<TabKey, number>;
}

export function CourseResourceTabs({
  activeTab,
  onSelectTab,
  lang,
  tabCounts,
}: CourseResourceTabsProps) {
  const tx = t[lang];

  return (
    <div
      style={{
        display: "flex",
        gap: 6,
        borderBottom: "1px solid var(--border)",
        marginBottom: 20,
        overflowX: "auto",
      }}
    >
      {tabKeys.map((tab, idx) => {
        const isActive = activeTab === tab;
        const count = tabCounts[tab] || 0;
        return (
          <button
            key={tab}
            onClick={() => onSelectTab(tab)}
            style={{
              padding: "10px 18px",
              background: "none",
              border: "none",
              borderBottom: isActive
                ? "2px solid var(--primary)"
                : "2px solid transparent",
              color: isActive
                ? "var(--primary)"
                : "var(--muted-foreground)",
              fontSize: 14,
              fontWeight: isActive ? 700 : 500,
              cursor: "pointer",
              transition: "all 0.15s",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: 7,
              marginBottom: -1,
            }}
          >
            <span>{tx.courseDetail.tabs[idx]}</span>
            <span
              style={{
                fontSize: 11,
                padding: "1px 7px",
                borderRadius: 99,
                backgroundColor: isActive
                  ? "var(--secondary)"
                  : "var(--muted)",
                color: isActive
                  ? "var(--primary)"
                  : "var(--muted-foreground)",
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: 600,
              }}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default CourseResourceTabs;
