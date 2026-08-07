import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Page } from "../App";
import type { Lang } from "../data.ts";
import { t, universities, courses, recentActivity } from "../data.ts";
import Navbar from "../Components/Navbar";

interface Props {
  dark: boolean;
  lang: Lang;
  setDark: Dispatch<SetStateAction<boolean>>;
  setLang: Dispatch<SetStateAction<Lang>>;
  setPage?: Dispatch<SetStateAction<Page>>;
}

type AdminTab =
  | "overview"
  | "universities"
  | "courses"
  | "resources"
  | "upload";
const adminTabs: AdminTab[] = [
  "overview",
  "universities",
  "courses",
  "resources",
  "upload",
];

const activityTypeIcon: Record<string, string> = {
  upload: "📄",
  course: "📚",
  university: "🏛",
};

export default function AdminDashboard({
  dark,
  lang,
  setDark,
  setLang,
  setPage,
}: Props) {
  const [tab, setTab] = useState<AdminTab>("overview");
  const [uploadDrag, setUploadDrag] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const tx = t[lang];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>
      <Navbar
        dark={dark}
        lang={lang}
        setDark={setDark}
        setLang={setLang}
        setPage={setPage}
        currentPage="admin"
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              fontSize: 26,
              color: "var(--foreground)",
              marginBottom: 4,
            }}
          >
            {tx.admin.title}
          </h1>
          <p style={{ fontSize: 14, color: "var(--muted-foreground)" }}>
            {tx.admin.subtitle}
          </p>
        </div>

        {/* Tab bar */}
        <div
          style={{
            display: "flex",
            gap: 4,
            padding: "4px",
            borderRadius: 10,
            backgroundColor: "var(--muted)",
            marginBottom: 28,
            overflowX: "auto",
          }}
        >
          {adminTabs.map((key, i) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                padding: "8px 14px",
                borderRadius: 7,
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                backgroundColor: tab === key ? "var(--card)" : "transparent",
                color:
                  tab === key ? "var(--foreground)" : "var(--muted-foreground)",
                boxShadow: tab === key ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                transition: "all 0.15s",
                whiteSpace: "nowrap",
              }}
            >
              {tx.admin.tabs[i]}
            </button>
          ))}
        </div>

        {tab === "overview" && <OverviewTab tx={tx} lang={lang} />}
        {tab === "universities" && <UniversitiesTab tx={tx} lang={lang} />}
        {tab === "courses" && <CoursesTab tx={tx} lang={lang} />}
        {tab === "resources" && <ResourcesTab tx={tx} lang={lang} />}
        {tab === "upload" && (
          <UploadTab
            tx={tx}
            lang={lang}
            drag={uploadDrag}
            setDrag={setUploadDrag}
            files={uploadedFiles}
            setFiles={setUploadedFiles}
          />
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: string;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "20px",
        borderTop: `3px solid ${color}`,
      }}
    >
      <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
      <div
        style={{
          fontFamily: "Outfit, sans-serif",
          fontWeight: 800,
          fontSize: 26,
          color: "var(--foreground)",
          marginBottom: 2,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 13,
          color: "var(--muted-foreground)",
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function OverviewTab({ tx, lang }: { tx: (typeof t)["en"]; lang: Lang }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 340px",
        gap: 24,
        alignItems: "start",
      }}
    >
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <StatCard
            icon="🏛"
            value="24"
            label={tx.admin.totalUniversities}
            color="#1e4fcc"
          />
          <StatCard
            icon="📚"
            value="3,400"
            label={tx.admin.totalCourses}
            color="#7c3aed"
          />
          <StatCard
            icon="📄"
            value="87,200"
            label={tx.admin.totalResources}
            color="#059669"
          />
          <StatCard
            icon="🎓"
            value="220,000"
            label={tx.admin.totalStudents}
            color="#d97706"
          />
        </div>

        {/* Quick actions */}
        <div
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <h3
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "var(--foreground)",
              marginBottom: 16,
            }}
          >
            {tx.admin.quickActions}
          </h3>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { label: tx.admin.addUniversity, icon: "🏛", color: "#1e4fcc" },
              { label: tx.admin.addCourse, icon: "📚", color: "#7c3aed" },
              { label: tx.admin.uploadResource, icon: "📤", color: "#059669" },
              { label: tx.admin.manageFiles, icon: "🗂", color: "#d97706" },
            ].map((action) => (
              <button
                key={action.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "8px 14px",
                  borderRadius: 8,
                  border: "1.5px solid var(--border)",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--foreground)",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = action.color;
                  e.currentTarget.style.color = action.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--foreground)";
                }}
              >
                <span>{action.icon}</span> {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* File management table */}
        <div
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h3
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: "var(--foreground)",
              }}
            >
              {tx.admin.manageFiles}
            </h3>
            <span
              style={{
                fontSize: 11,
                color: "var(--muted-foreground)",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              {lang === "ar" ? "آخر 5 ملفات" : "Last 5 files"}
            </span>
          </div>
          <div>
            {courses
              .slice(0, 3)
              .flatMap((c) => c.resources.lectures.slice(0, 2))
              .slice(0, 5)
              .map((f, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "11px 20px",
                    borderBottom: "1px solid var(--border)",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      minWidth: 0,
                    }}
                  >
                    <span style={{ fontSize: 16 }}>📄</span>
                    <span
                      style={{
                        fontSize: 13,
                        color: "var(--foreground)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {f.name}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        color: "var(--muted-foreground)",
                        fontFamily: "JetBrains Mono, monospace",
                      }}
                    >
                      {f.size}
                    </span>
                    <button
                      style={{
                        padding: "4px 10px",
                        borderRadius: 6,
                        border: "1px solid var(--border)",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        fontSize: 11,
                        color: "#dc2626",
                        fontWeight: 600,
                      }}
                    >
                      {lang === "ar" ? "حذف" : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Activity feed */}
      <div
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 12,
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <h3
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "var(--foreground)",
            }}
          >
            {tx.admin.recentActivity}
          </h3>
        </div>
        <div
          style={{
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {recentActivity.map((item, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  backgroundColor: "var(--muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                {activityTypeIcon[item.type]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--foreground)",
                    marginBottom: 2,
                  }}
                >
                  {item.user}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--muted-foreground)",
                    lineHeight: 1.5,
                  }}
                >
                  {item.action}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "var(--muted-foreground)",
                    marginTop: 4,
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {lang === "ar" ? item.timeAr : item.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UniversitiesTab({ tx, lang }: { tx: (typeof t)["en"]; lang: Lang }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {tx.admin.addUniversity}
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {universities.map((u) => (
          <div
            key={u.id}
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: "var(--secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                🏛
              </div>
              <span
                style={{
                  fontSize: 10,
                  padding: "3px 8px",
                  borderRadius: 99,
                  backgroundColor: "var(--muted)",
                  color: "var(--muted-foreground)",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                ID-{u.id.toString().padStart(3, "0")}
              </span>
            </div>
            <h3
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: "var(--foreground)",
                marginBottom: 4,
              }}
            >
              {lang === "ar" ? u.nameAr : u.name}
            </h3>
            <p
              style={{
                fontSize: 12,
                color: "var(--muted-foreground)",
                marginBottom: 16,
              }}
            >
              {u.location}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 8,
                fontSize: 12,
                textAlign: "center",
              }}
            >
              {[
                { val: u.colleges, lbl: lang === "ar" ? "كلية" : "Colleges" },
                { val: u.courses, lbl: lang === "ar" ? "مقرر" : "Courses" },
                {
                  val: (u.students / 1000).toFixed(0) + "K",
                  lbl: lang === "ar" ? "طالب" : "Students",
                },
              ].map((stat) => (
                <div
                  key={stat.lbl}
                  style={{
                    backgroundColor: "var(--muted)",
                    borderRadius: 7,
                    padding: "8px 4px",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      color: "var(--foreground)",
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    {stat.val}
                  </div>
                  <div
                    style={{ color: "var(--muted-foreground)", fontSize: 10 }}
                  >
                    {stat.lbl}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button
                style={{
                  flex: 1,
                  padding: "6px",
                  borderRadius: 7,
                  border: "1px solid var(--border)",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--foreground)",
                }}
              >
                {lang === "ar" ? "تعديل" : "Edit"}
              </button>
              <button
                style={{
                  flex: 1,
                  padding: "6px",
                  borderRadius: 7,
                  border: "1px solid #fee2e2",
                  backgroundColor: "#fee2e2",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#dc2626",
                }}
              >
                {lang === "ar" ? "حذف" : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CoursesTab({ tx, lang }: { tx: (typeof t)["en"]; lang: Lang }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {tx.admin.addCourse}
        </button>
      </div>
      <div
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
          >
            <thead>
              <tr style={{ backgroundColor: "var(--muted)" }}>
                {[
                  lang === "ar" ? "الكود" : "Code",
                  lang === "ar" ? "اسم المقرر" : "Course Name",
                  lang === "ar" ? "الأستاذ" : "Instructor",
                  lang === "ar" ? "المستوى" : "Level",
                  lang === "ar" ? "الموارد" : "Resources",
                  "",
                ].map((h, i) => (
                  <th
                    key={i}
                    style={{
                      padding: "12px 16px",
                      textAlign: lang === "ar" ? "right" : "left",
                      fontWeight: 600,
                      color: "var(--muted-foreground)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => {
                const info = lang === "ar" ? c.ar : c.en;
                return (
                  <tr
                    key={c.id}
                    style={{
                      borderTop: "1px solid var(--border)",
                      transition: "background-color 0.1s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "var(--muted)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontFamily: "JetBrains Mono, monospace",
                          color: c.color,
                          fontWeight: 700,
                          backgroundColor: c.color + "15",
                          padding: "2px 7px",
                          borderRadius: 4,
                        }}
                      >
                        {c.code}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontWeight: 600,
                        color: "var(--foreground)",
                      }}
                    >
                      {info.name}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {info.instructor}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "var(--muted-foreground)",
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: 11,
                      }}
                    >
                      {info.level.split("·")[0].trim()}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{ fontWeight: 700, color: "var(--foreground)" }}
                      >
                        {c.resourceCount}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button
                          style={{
                            padding: "4px 10px",
                            borderRadius: 6,
                            border: "1px solid var(--border)",
                            backgroundColor: "transparent",
                            cursor: "pointer",
                            fontSize: 11,
                            fontWeight: 600,
                            color: "var(--foreground)",
                          }}
                        >
                          {lang === "ar" ? "تعديل" : "Edit"}
                        </button>
                        <button
                          style={{
                            padding: "4px 10px",
                            borderRadius: 6,
                            border: "1px solid #fee2e2",
                            backgroundColor: "#fee2e2",
                            cursor: "pointer",
                            fontSize: 11,
                            fontWeight: 600,
                            color: "#dc2626",
                          }}
                        >
                          {lang === "ar" ? "حذف" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ResourcesTab({ tx, lang }: { tx: (typeof t)["en"]; lang: Lang }) {
  const allResources = courses
    .flatMap((c) =>
      c.resources.lectures.map((r) => ({
        ...r,
        course: lang === "ar" ? c.ar.name : c.en.name,
        code: c.code,
        color: c.color,
        type: lang === "ar" ? "محاضرة" : "Lecture",
      })),
    )
    .slice(0, 10);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {tx.admin.uploadResource}
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {allResources.map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "12px 16px",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 7,
                backgroundColor: r.color + "18",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={r.color}
                strokeWidth="1.8"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--foreground)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {r.name}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--muted-foreground)",
                  marginTop: 2,
                }}
              >
                <span
                  style={{
                    color: r.color,
                    fontWeight: 600,
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {r.code}
                </span>
                {" · "}
                {r.course}
                {" · "}
                {r.type}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: "var(--muted-foreground)",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                {r.size}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "var(--muted-foreground)",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                {r.date}
              </span>
              <button
                style={{
                  padding: "4px 10px",
                  borderRadius: 6,
                  border: "1px solid #fee2e2",
                  backgroundColor: "#fee2e2",
                  cursor: "pointer",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#dc2626",
                }}
              >
                {lang === "ar" ? "حذف" : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UploadTab({
  tx,
  lang,
  drag,
  setDrag,
  files,
  setFiles,
}: {
  tx: (typeof t)["en"];
  lang: Lang;
  drag: boolean;
  setDrag: (v: boolean) => void;
  files: string[];
  setFiles: (v: string[]) => void;
}) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const newFiles = Array.from(e.dataTransfer.files).map((f) => f.name);
    setFiles([...files, ...newFiles]);
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <div
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          padding: 28,
          marginBottom: 24,
        }}
      >
        <h3
          style={{
            fontFamily: "Outfit, sans-serif",
            fontWeight: 700,
            fontSize: 17,
            color: "var(--foreground)",
            marginBottom: 20,
          }}
        >
          {tx.admin.uploadResource}
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            {
              label: lang === "ar" ? "الجامعة" : "University",
              type: "select",
              options: ["King Abdulaziz University", "King Saud University"],
            },
            {
              label: lang === "ar" ? "القسم" : "Department",
              type: "select",
              options: ["Computer Science", "Information Systems"],
            },
            {
              label: lang === "ar" ? "المقرر" : "Course",
              type: "select",
              options: [
                "CS 301 - Data Structures",
                "CS 302 - Database Systems",
                "CS 303 - Operating Systems",
              ],
            },
            {
              label: lang === "ar" ? "نوع المورد" : "Resource Type",
              type: "select",
              options: [
                "Lecture",
                "Book / Reference",
                "Assignment",
                "Previous Exam",
              ],
            },
          ].map((field) => (
            <div key={field.label}>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--muted-foreground)",
                  marginBottom: 6,
                }}
              >
                {field.label}
              </label>
              <select
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  borderRadius: 8,
                  border: "1.5px solid var(--border)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  fontSize: 14,
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <option value="">
                  {lang === "ar" ? "اختر..." : "Select..."}
                </option>
                {field.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${drag ? "var(--primary)" : "var(--border)"}`,
          borderRadius: 14,
          padding: "48px 24px",
          textAlign: "center",
          backgroundColor: drag ? "var(--secondary)" : "var(--card)",
          transition: "all 0.2s",
          cursor: "pointer",
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 12 }}>📤</div>
        <p
          style={{
            fontFamily: "Outfit, sans-serif",
            fontWeight: 600,
            fontSize: 16,
            color: "var(--foreground)",
            marginBottom: 6,
          }}
        >
          {lang === "ar" ? "اسحب وأفلت الملفات هنا" : "Drag & drop files here"}
        </p>
        <p
          style={{
            fontSize: 13,
            color: "var(--muted-foreground)",
            marginBottom: 20,
          }}
        >
          {lang === "ar" ? "أو اضغط لاختيار ملفات" : "or click to browse files"}
        </p>
        <label style={{ cursor: "pointer" }}>
          <input
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={(e) => {
              const newFiles = Array.from(e.target.files ?? []).map(
                (f) => f.name,
              );
              setFiles([...files, ...newFiles]);
            }}
          />
          <span
            style={{
              padding: "8px 20px",
              borderRadius: 8,
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {lang === "ar" ? "اختر ملفات" : "Choose Files"}
          </span>
        </label>
        <p
          style={{
            fontSize: 11,
            color: "var(--muted-foreground)",
            marginTop: 16,
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          PDF, DOCX, PPTX ·{" "}
          {lang === "ar"
            ? "الحد الأقصى 50 ميغابايت لكل ملف"
            : "Max 50MB per file"}
        </p>
      </div>

      {files.length > 0 && (
        <div
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {files.map((name, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 16px",
                borderBottom:
                  i < files.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <span style={{ fontSize: 16 }}>📄</span>
              <span
                style={{ flex: 1, fontSize: 13, color: "var(--foreground)" }}
              >
                {name}
              </span>
              <button
                onClick={() => setFiles(files.filter((_, j) => j !== i))}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#dc2626",
                  fontSize: 16,
                  padding: 4,
                }}
              >
                ×
              </button>
            </div>
          ))}
          <div
            style={{
              padding: "12px 16px",
              borderTop: "1px solid var(--border)",
            }}
          >
            <button
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: 8,
                border: "none",
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {lang === "ar"
                ? `رفع ${files.length} ملف`
                : `Upload ${files.length} file${files.length > 1 ? "s" : ""}`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
