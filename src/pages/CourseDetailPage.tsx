import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Page } from "../App";
import type { Lang } from "../data.ts";
import { t, courses } from "../data.ts";
import Navbar from "../Components/Navbar";

interface Props {
  dark: boolean;
  lang: Lang;
  setDark: Dispatch<SetStateAction<boolean>>;
  setLang: Dispatch<SetStateAction<Lang>>;
  setPage: Dispatch<SetStateAction<Page>>;
  course: (typeof courses)[0];
  openCourse: (id: string) => void;
}

const tabKeys = ["lectures", "books", "assignments", "exams"] as const;
type TabKey = (typeof tabKeys)[number];

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

export default function CourseDetailPage({
  dark,
  lang,
  setDark,
  setLang,
  setPage,
  course,
  openCourse,
}: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>("lectures");
  const tx = t[lang];
  const info = lang === "ar" ? course.ar : course.en;

  const tabData: Record<TabKey, typeof course.resources.lectures> = {
    lectures: course.resources.lectures,
    books: course.resources.books,
    assignments: course.resources.assignments,
    exams: course.resources.exams,
  };

  const currentResources = tabData[activeTab];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>
      <Navbar
        dark={dark}
        lang={lang}
        setDark={setDark}
        setLang={setLang}
        setPage={setPage}
        currentPage="course"
      />

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "32px 24px",
          display: "grid",
          gridTemplateColumns: "1fr 280px",
          gap: 28,
          alignItems: "start",
        }}
      >
        <div>
          {/* Back */}
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

          {/* Course header */}
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
            <div style={{ padding: "28px 28px 24px" }}>
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
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: course.color + "20",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                    }}
                  >
                    👩‍🏫
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--foreground)",
                      }}
                    >
                      {info.instructor}
                    </div>
                    <div
                      style={{ fontSize: 11, color: "var(--muted-foreground)" }}
                    >
                      {info.level}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: "var(--muted-foreground)",
                    fontSize: 12,
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span>
                    <strong style={{ color: "var(--foreground)" }}>
                      {course.resourceCount}
                    </strong>{" "}
                    {tx.courses.resources}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 14,
            }}
          >
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid var(--border)",
                padding: "0 4px",
                overflowX: "auto",
              }}
            >
              {tabKeys.map((key, i) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  style={{
                    padding: "14px 16px",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: activeTab === key ? 600 : 400,
                    color:
                      activeTab === key
                        ? "var(--primary)"
                        : "var(--muted-foreground)",
                    borderBottom:
                      activeTab === key
                        ? "2px solid var(--primary)"
                        : "2px solid transparent",
                    marginBottom: -1,
                    whiteSpace: "nowrap",
                    transition: "color 0.15s",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {tx.courseDetail.tabs[i]}
                  <span
                    style={{
                      fontSize: 10,
                      padding: "1px 6px",
                      borderRadius: 99,
                      backgroundColor:
                        activeTab === key ? "var(--secondary)" : "var(--muted)",
                      color:
                        activeTab === key
                          ? "var(--primary)"
                          : "var(--muted-foreground)",
                      fontFamily: "JetBrains Mono, monospace",
                      fontWeight: 700,
                    }}
                  >
                    {tabData[key].length}
                  </span>
                </button>
              ))}
            </div>
            <div style={{ padding: 20 }}>
              {currentResources.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "48px 0",
                    color: "var(--muted-foreground)",
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
                  <p style={{ fontSize: 14 }}>
                    {lang === "ar" ? "لا توجد ملفات بعد" : "No files yet"}
                  </p>
                </div>
              ) : (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {currentResources.map((res) => (
                    <div
                      key={res.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "12px 14px",
                        borderRadius: 10,
                        border: "1px solid var(--border)",
                        backgroundColor: "var(--background)",
                        transition: "border-color 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.borderColor = "var(--primary)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.borderColor = "var(--border)")
                      }
                    >
                      <PdfIcon color={course.color} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "var(--foreground)",
                            marginBottom: 3,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {res.name}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "var(--muted-foreground)",
                            fontFamily: "JetBrains Mono, monospace",
                          }}
                        >
                          {tx.courseDetail.uploaded} {res.date} ·{" "}
                          {tx.courseDetail.size} {res.size}
                        </div>
                      </div>
                      <DownloadBtn label={tx.courseDetail.download} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - other courses */}
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
              const isActive = c.id === course.id;
              return (
                <button
                  key={c.id}
                  onClick={() => openCourse(c.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: `1px solid ${isActive ? "var(--primary)" : "var(--border)"}`,
                    backgroundColor: isActive
                      ? "var(--secondary)"
                      : "var(--card)",
                    cursor: "pointer",
                    textAlign: lang === "ar" ? "right" : "left",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      e.currentTarget.style.borderColor = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      e.currentTarget.style.borderColor = "var(--border)";
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
      </div>
    </div>
  );
}
