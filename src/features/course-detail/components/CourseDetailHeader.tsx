import type { Lang, Page } from "../../../types/app";
import { t, courses } from "../../../data";

export interface CourseDetailHeaderProps {
  course: (typeof courses)[0];
  lang: Lang;
  setPage: (page: Page) => void;
}

export function CourseDetailHeader({
  course,
  lang,
  setPage,
}: CourseDetailHeaderProps) {
  const tx = t[lang];
  const info = lang === "ar" ? course.ar : course.en;

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => setPage("landing")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--muted-foreground)",
          fontSize: 13,
          fontWeight: 500,
          marginBottom: 20,
          padding: 0,
          transition: "color 0.15s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--primary)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--muted-foreground)")
        }
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d={lang === "ar" ? "M9 18l6-6-6-6" : "M15 18l-6-6 6-6"} />
        </svg>
        {tx.courseDetail.back}
      </button>

      {/* Course Header Banner */}
      <div
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          overflow: "hidden",
          marginBottom: 24,
        }}
      >
        <div style={{ height: 6, backgroundColor: course.color }} />
        <div style={{ padding: "28px 28px 24px" }} className="slide-up">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: course.color,
                fontFamily: "JetBrains Mono, monospace",
                backgroundColor: course.color + "15",
                padding: "3px 8px",
                borderRadius: 5,
              }}
            >
              {course.code}
            </span>
            <span
              style={{
                fontSize: 12,
                color: "var(--muted-foreground)",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              {info.dept}
            </span>
          </div>
          <h1
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(20px, 3vw, 28px)",
              color: "var(--foreground)",
              marginBottom: 10,
            }}
          >
            {info.name}
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "var(--muted-foreground)",
              lineHeight: 1.7,
              marginBottom: 20,
            }}
          >
            {info.desc}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
              fontSize: 12,
              color: "var(--muted-foreground)",
              borderTop: "1px solid var(--border)",
              paddingTop: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span>👨‍🏫</span>
              <span>{info.instructor}</span>
            </div>
            <div>•</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span>📅</span>
              <span>{info.level}</span>
            </div>
            <div>•</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span>📄</span>
              <span>
                {course.resourceCount} {lang === "ar" ? "ملف" : "files"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailHeader;
