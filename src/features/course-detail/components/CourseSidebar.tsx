import type { Lang } from "../../../types/app";
import { courses } from "../../../data";

export interface CourseSidebarProps {
  currentCourseId: string;
  lang: Lang;
  onOpenCourse: (id: string) => void;
}

export function CourseSidebar({
  currentCourseId,
  lang,
  onOpenCourse,
}: CourseSidebarProps) {
  return (
    <div style={{ position: "sticky", top: 80 }}>
      <h3
        style={{
          fontFamily: "Outfit, sans-serif",
          fontWeight: 700,
          fontSize: 14,
          color: "var(--foreground)",
          marginBottom: 14,
        }}
      >
        {lang === "ar" ? "مقررات أخرى" : "Other Courses"}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {courses.map((c) => {
          const cInfo = lang === "ar" ? c.ar : c.en;
          const isActive = c.id === currentCourseId;
          return (
            <button
              key={c.id}
              onClick={() => onOpenCourse(c.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 10,
                border: `1px solid ${
                  isActive ? "var(--primary)" : "rgba(255, 255, 255, 0.07)"
                }`,
                backgroundColor: isActive
                  ? "rgba(125, 164, 159, 0.18)"
                  : "#323D59",
                cursor: "pointer",
                textAlign: lang === "ar" ? "right" : "left",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "#3B4868";
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.15)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "#323D59";
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.07)";
                }
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 32,
                  borderRadius: 2,
                  backgroundColor: c.color,
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--foreground)",
                    lineHeight: 1.3,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cInfo.name}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "var(--muted-foreground)",
                    fontFamily: "JetBrains Mono, monospace",
                    marginTop: 2,
                  }}
                >
                  {c.code} · {c.resourceCount}{" "}
                  {lang === "ar" ? "مورد" : "files"}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CourseSidebar;
