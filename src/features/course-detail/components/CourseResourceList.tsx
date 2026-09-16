import type { TabKey } from "./CourseResourceTabs";
import type { Lang } from "../../../types/app";
import { t, courses } from "../../../data";

export interface CourseResourceListProps {
  activeTab: TabKey;
  course: (typeof courses)[0];
  lang: Lang;
}

function PdfIcon({ color }: { color: string }) {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 8,
        flexShrink: 0,
        backgroundColor: color + "18",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    </div>
  );
}

function DownloadBtn({ label }: { label: string }) {
  return (
    <button
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        padding: "6px 12px",
        borderRadius: 7,
        border: "1px solid var(--border)",
        cursor: "pointer",
        fontSize: 12,
        fontWeight: 600,
        backgroundColor: "transparent",
        color: "var(--muted-foreground)",
        flexShrink: 0,
        transition: "all 0.15s",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--primary)";
        e.currentTarget.style.color = "var(--primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.color = "var(--muted-foreground)";
      }}
      onClick={(e) => {
        e.stopPropagation();
        alert("جاري التحميل...");
      }}
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      {label}
    </button>
  );
}

export function CourseResourceList({
  activeTab,
  course,
  lang,
}: CourseResourceListProps) {
  const tx = t[lang];

  const tabData = {
    lectures: course.resources.lectures,
    books: course.resources.books,
    assignments: course.resources.assignments,
    exams: course.resources.exams,
  };

  const currentResources = tabData[activeTab];

  if (!currentResources || currentResources.length === 0) {
    return (
      <div
        style={{
          padding: "48px 24px",
          textAlign: "center",
          color: "var(--muted-foreground)",
          fontSize: 14,
          backgroundColor: "var(--card)",
          borderRadius: 12,
          border: "1px solid var(--border)",
        }}
      >
        لا توجد موارد في هذا التصنيف حالياً
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {currentResources.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: "16px 20px",
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            transition: "all 0.15s",
          }}
          className="resource-item"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
            <PdfIcon color={course.color} />
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: "var(--foreground)",
                  marginBottom: 3,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--muted-foreground)",
                  display: "flex",
                  gap: 10,
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                <span>{item.size}</span>
                {"pages" in item && Boolean(item.pages) && (
                  <>
                    <span>•</span>
                    <span>
                      {String(item.pages)} {lang === "ar" ? "صفحة" : "pages"}
                    </span>
                  </>
                )}
                {"dueDate" in item && Boolean(item.dueDate) && (
                  <>
                    <span>•</span>
                    <span style={{ color: "var(--accent)" }}>
                      {lang === "ar" ? "الموعد" : "Due"}: {String(item.dueDate)}
                    </span>
                  </>
                )}
                {"date" in item && Boolean(item.date) && (
                  <>
                    <span>•</span>
                    <span>{String(item.date)}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <DownloadBtn label={tx.courseDetail.download} />
        </div>
      ))}
    </div>
  );
}

export default CourseResourceList;
