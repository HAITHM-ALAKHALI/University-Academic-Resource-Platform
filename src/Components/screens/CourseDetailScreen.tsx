import { useState } from "react";
import type { NavState } from "../StudentApp";
import TopBar from "../TopBar";

const tabs = [
  { id: "lectures", label: "المحاضرات", icon: "📹", count: 12 },
  { id: "books", label: "الكتب", icon: "📕", count: 4 },
  { id: "pdfs", label: "الكتب PDF", icon: "📗", count: 6 },
  { id: "assignments", label: "الواجبات", icon: "📝", count: 8 },
  { id: "exams", label: "الامتحانات السابقة", icon: "📋", count: 10 },
  { id: "videos", label: "المقاطع", icon: "🎬", count: 5 },
  { id: "projects", label: "المشاريع", icon: "🗂", count: 4 },
  { id: "external", label: "مصادر خارجية", icon: "🌐", count: 15 },
];

const lectures = [
  {
    id: 1,
    name: "Lecture 1 - Introduction",
    size: "2.4 MB",
    date: "2024-01-10",
  },
  {
    id: 2,
    name: "Lecture 2 - Variables and Data Types",
    size: "1.9 MB",
    date: "2024-01-17",
  },
  { id: 3, name: "Lecture 3 - Operators", size: "2.1 MB", date: "2024-01-24" },
  {
    id: 4,
    name: "Lecture 4 - Control Structures",
    size: "2.7 MB",
    date: "2024-01-31",
  },
  { id: 5, name: "Lecture 5 - Functions", size: "2.3 MB", date: "2024-02-07" },
  { id: 6, name: "Lecture 6 - Arrays", size: "2.9 MB", date: "2024-02-14" },
  { id: 7, name: "Lecture 7 - Pointers", size: "3.1 MB", date: "2024-02-21" },
  {
    id: 8,
    name: "Lecture 8 - Structs and Unions",
    size: "2.5 MB",
    date: "2024-02-28",
  },
  { id: 9, name: "Lecture 9 - File I/O", size: "1.8 MB", date: "2024-03-06" },
  {
    id: 10,
    name: "Lecture 10 - Memory Management",
    size: "3.3 MB",
    date: "2024-03-13",
  },
  {
    id: 11,
    name: "Lecture 11 - Error Handling",
    size: "2.0 MB",
    date: "2024-03-20",
  },
  { id: 12, name: "Lecture 12 - Review", size: "1.6 MB", date: "2024-03-27" },
];

const books = [
  {
    id: 1,
    title: "The C Programming Language",
    author: "Kernighan & Ritchie",
    edition: "2nd",
    pages: 272,
    cover: "📘",
    year: 2016,
  },
  {
    id: 2,
    title: "C Programming: A Modern Approach",
    author: "K.N. King",
    edition: "2nd",
    pages: 832,
    cover: "📗",
    year: 2008,
  },
  {
    id: 3,
    title: "Programming in C",
    author: "Stephen Kochan",
    edition: "4th",
    pages: 540,
    cover: "📙",
    year: 2014,
  },
  {
    id: 4,
    title: "C How to Program",
    author: "Deitel & Deitel",
    edition: "8th",
    pages: 928,
    cover: "📒",
    year: 2015,
  },
];

const pdfBooks = [
  {
    id: 1,
    name: "مذكرة المادة - القسم الأول",
    size: "4.2 MB",
    pages: 85,
    date: "2024-01-05",
  },
  {
    id: 2,
    name: "مذكرة المادة - القسم الثاني",
    size: "3.8 MB",
    pages: 76,
    date: "2024-01-05",
  },
  {
    id: 3,
    name: "ملخص شامل للمادة",
    size: "2.1 MB",
    pages: 42,
    date: "2024-02-10",
  },
  {
    id: 4,
    name: "أسئلة وحلول تدريبية",
    size: "1.7 MB",
    pages: 34,
    date: "2024-02-15",
  },
  {
    id: 5,
    name: "شرح إضافي - الفصل الأول",
    size: "1.2 MB",
    pages: 24,
    date: "2024-03-01",
  },
  {
    id: 6,
    name: "مراجعة نهاية الترم",
    size: "0.9 MB",
    pages: 18,
    date: "2024-03-20",
  },
];

const assignments = [
  {
    id: 1,
    name: "Assignment 1 - Hello World Program",
    due: "2024-01-25",
    status: "مكتمل",
    score: "95/100",
  },
  {
    id: 2,
    name: "Assignment 2 - Calculator App",
    due: "2024-02-08",
    status: "مكتمل",
    score: "88/100",
  },
  {
    id: 3,
    name: "Assignment 3 - Array Sorting",
    due: "2024-02-22",
    status: "قيد التسليم",
    score: "—",
  },
  {
    id: 4,
    name: "Assignment 4 - Linked List",
    due: "2024-03-07",
    status: "قادم",
    score: "—",
  },
  {
    id: 5,
    name: "Assignment 5 - File Operations",
    due: "2024-03-21",
    status: "قادم",
    score: "—",
  },
  {
    id: 6,
    name: "Assignment 6 - Memory Management",
    due: "2024-04-04",
    status: "قادم",
    score: "—",
  },
];

const exams = [
  {
    id: 1,
    name: "امتحان منتصف الترم 2024",
    size: "1.4 MB",
    year: 2024,
    type: "منتصف",
    withSolution: false,
  },
  {
    id: 2,
    name: "امتحان نهاية الترم 2023",
    size: "1.9 MB",
    year: 2023,
    type: "نهاية",
    withSolution: true,
  },
  {
    id: 3,
    name: "امتحان منتصف الترم 2023",
    size: "1.3 MB",
    year: 2023,
    type: "منتصف",
    withSolution: true,
  },
  {
    id: 4,
    name: "امتحان نهاية الترم 2022",
    size: "1.7 MB",
    year: 2022,
    type: "نهاية",
    withSolution: true,
  },
  {
    id: 5,
    name: "امتحان منتصف الترم 2022",
    size: "1.1 MB",
    year: 2022,
    type: "منتصف",
    withSolution: false,
  },
  {
    id: 6,
    name: "امتحان نهاية الترم 2021",
    size: "1.6 MB",
    year: 2021,
    type: "نهاية",
    withSolution: true,
  },
  {
    id: 7,
    name: "امتحان منتصف الترم 2021",
    size: "1.0 MB",
    year: 2021,
    type: "منتصف",
    withSolution: true,
  },
  {
    id: 8,
    name: "امتحان نهاية الترم 2020",
    size: "1.5 MB",
    year: 2020,
    type: "نهاية",
    withSolution: false,
  },
  {
    id: 9,
    name: "امتحان منتصف الترم 2020",
    size: "1.2 MB",
    year: 2020,
    type: "منتصف",
    withSolution: true,
  },
  {
    id: 10,
    name: "امتحان نهاية الترم 2019",
    size: "1.8 MB",
    year: 2019,
    type: "نهاية",
    withSolution: true,
  },
];

const videos = [
  {
    id: 1,
    name: "شرح المحاضرة الأولى - المقدمة",
    duration: "45:22",
    platform: "YouTube",
    views: "12K",
    thumb: "🟥",
  },
  {
    id: 2,
    name: "شرح المحاضرة الثانية - المتغيرات",
    duration: "52:10",
    platform: "YouTube",
    views: "9.8K",
    thumb: "🟥",
  },
  {
    id: 3,
    name: "حل تمارين على الدوال",
    duration: "38:45",
    platform: "YouTube",
    views: "7.2K",
    thumb: "🟥",
  },
  {
    id: 4,
    name: "شرح المصفوفات بالتفصيل",
    duration: "61:30",
    platform: "YouTube",
    views: "15K",
    thumb: "🟥",
  },
  {
    id: 5,
    name: "مراجعة شاملة قبل الامتحان",
    duration: "90:00",
    platform: "YouTube",
    views: "22K",
    thumb: "🟥",
  },
];

const projects = [
  {
    id: 1,
    name: "مشروع إدارة المكتبة",
    level: "متوسط",
    desc: "نظام لإدارة الكتب والأعضاء والإعارة باستخدام لغة C وهياكل البيانات",
    tech: ["C", "Linked List", "File I/O"],
    grade: "السنة الأولى",
    color: "#3B82F6",
  },
  {
    id: 2,
    name: "تطبيق الحاسبة العلمية",
    level: "مبتدئ",
    desc: "حاسبة علمية كاملة تدعم العمليات الحسابية والمثلثية والإحصائية",
    tech: ["C", "Math.h"],
    grade: "السنة الأولى",
    color: "#8B5CF6",
  },
  {
    id: 3,
    name: "لعبة إدارة الطلاب",
    level: "متقدم",
    desc: "نظام شامل لإدارة بيانات الطلاب مع ميزات البحث والترتيب والتصفية",
    tech: ["C", "Sorting", "Searching", "Files"],
    grade: "السنة الأولى",
    color: "#06B6D4",
  },
  {
    id: 4,
    name: "محاكي المتاهة",
    level: "متقدم",
    desc: "محاكاة حل المتاهة باستخدام خوارزمية DFS والمصفوفات الثنائية الأبعاد",
    tech: ["C", "2D Arrays", "Recursion"],
    grade: "السنة الأولى",
    color: "#10B981",
  },
];

const externalResources = [
  {
    id: 1,
    title: "Learn C Programming — Programiz",
    url: "programiz.com/c-programming",
    type: "موقع",
    icon: "🌐",
    color: "#3B82F6",
  },
  {
    id: 2,
    title: "The C Beginner's Handbook",
    url: "freecodecamp.org",
    type: "دليل",
    icon: "📖",
    color: "#8B5CF6",
  },
  {
    id: 3,
    title: "C Programming for Beginners — YouTube",
    url: "youtube.com",
    type: "فيديو",
    icon: "▶",
    color: "#EF4444",
  },
  {
    id: 4,
    title: "GeeksForGeeks — C Language",
    url: "geeksforgeeks.org/c-programming-language/",
    type: "مقالات",
    icon: "📄",
    color: "#10B981",
  },
  {
    id: 5,
    title: "TutorialsPoint — C",
    url: "tutorialspoint.com/cprogramming",
    type: "دورة",
    icon: "🎓",
    color: "#F59E0B",
  },
  {
    id: 6,
    title: "W3Schools — C Tutorial",
    url: "w3schools.com/c",
    type: "مرجع",
    icon: "📚",
    color: "#06B6D4",
  },
  {
    id: 7,
    title: "CS50 Harvard — C Week",
    url: "cs50.harvard.edu",
    type: "كورس",
    icon: "🏛",
    color: "#EC4899",
  },
  {
    id: 8,
    title: "Cplusplus.com — C Reference",
    url: "cplusplus.com/reference",
    type: "مرجع",
    icon: "📋",
    color: "#8B5CF6",
  },
  {
    id: 9,
    title: "LeetCode — C Practice",
    url: "leetcode.com",
    type: "تمارين",
    icon: "💪",
    color: "#F59E0B",
  },
  {
    id: 10,
    title: "HackerRank — C Language",
    url: "hackerrank.com/domains/c",
    type: "تمارين",
    icon: "🏅",
    color: "#10B981",
  },
];

interface Props {
  nav: NavState;
  navigate: (s: NavState) => void;
}

export default function CourseDetailScreen({ nav, navigate }: Props) {
  const [activeTab, setActiveTab] = useState("lectures");
  const color = nav.course?.color ?? "#3B82F6";

  const FileRow = ({
    icon,
    iconBg,
    iconColor,
    name,
    meta,
    extra,
  }: {
    icon: string;
    iconBg: string;
    iconColor: string;
    name: string;
    meta: string;
    extra?: React.ReactNode;
  }) => (
    <div
      className="file-row"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "12px 14px",
        borderRadius: 10,
        marginBottom: 2,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          color: iconColor,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "var(--text-primary)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </div>
        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
          {meta}
        </div>
      </div>
      {extra}
      <button
        style={{
          background: "rgba(59,130,246,0.1)",
          border: "1px solid rgba(59,130,246,0.2)",
          borderRadius: 8,
          padding: "5px 10px",
          cursor: "pointer",
          color: "var(--accent-blue)",
          fontSize: 15,
          flexShrink: 0,
        }}
      >
        ⬇
      </button>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "lectures":
        return (
          <>
            <div
              style={{
                fontSize: 12,
                color: "var(--text-secondary)",
                marginBottom: 14,
              }}
            >
              {lectures.length} محاضرة متاحة
            </div>
            {lectures.map((f) => (
              <FileRow
                key={f.id}
                icon="PDF"
                iconBg="rgba(239,68,68,0.12)"
                iconColor="#EF4444"
                name={f.name}
                meta={`${f.date} · ${f.size}`}
              />
            ))}
          </>
        );

      case "books":
        return (
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
          >
            {books.map((b) => (
              <div
                key={b.id}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 14,
                  padding: "18px",
                  display: "flex",
                  gap: 14,
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
                className="file-row"
              >
                <div
                  style={{
                    width: 52,
                    height: 70,
                    borderRadius: 8,
                    flexShrink: 0,
                    background: `linear-gradient(160deg, ${color}30, ${color}15)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                  }}
                >
                  {b.cover}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: 4,
                      lineHeight: 1.4,
                    }}
                  >
                    {b.title}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-secondary)",
                      marginBottom: 6,
                    }}
                  >
                    {b.author}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span
                      style={{
                        fontSize: 10,
                        color: "var(--text-muted)",
                        background: "rgba(255,255,255,0.06)",
                        padding: "2px 6px",
                        borderRadius: 5,
                      }}
                    >
                      الطبعة {b.edition}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color: "var(--text-muted)",
                        background: "rgba(255,255,255,0.06)",
                        padding: "2px 6px",
                        borderRadius: 5,
                      }}
                    >
                      {b.pages} صفحة
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color: "var(--text-muted)",
                        background: "rgba(255,255,255,0.06)",
                        padding: "2px 6px",
                        borderRadius: 5,
                      }}
                    >
                      {b.year}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "pdfs":
        return (
          <>
            <div
              style={{
                fontSize: 12,
                color: "var(--text-secondary)",
                marginBottom: 14,
              }}
            >
              {pdfBooks.length} ملفات PDF
            </div>
            {pdfBooks.map((f) => (
              <FileRow
                key={f.id}
                icon="PDF"
                iconBg="rgba(16,185,129,0.12)"
                iconColor="#10B981"
                name={f.name}
                meta={`${f.date} · ${f.size} · ${f.pages} صفحة`}
              />
            ))}
          </>
        );

      case "assignments":
        return (
          <>
            {assignments.map((a) => (
              <div
                key={a.id}
                className="file-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 14px",
                  borderRadius: 10,
                  marginBottom: 2,
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: "rgba(139,92,246,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  📝
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {a.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      marginTop: 2,
                    }}
                  >
                    موعد التسليم: {a.due}
                  </div>
                </div>
                {a.score !== "—" && (
                  <span
                    style={{
                      fontSize: 12,
                      color: "#10B981",
                      fontWeight: 700,
                      background: "rgba(16,185,129,0.1)",
                      padding: "3px 8px",
                      borderRadius: 7,
                    }}
                  >
                    {a.score}
                  </span>
                )}
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: 8,
                    flexShrink: 0,
                    background:
                      a.status === "مكتمل"
                        ? "rgba(16,185,129,0.15)"
                        : a.status === "قيد التسليم"
                          ? "rgba(245,158,11,0.15)"
                          : "rgba(100,116,139,0.1)",
                    color:
                      a.status === "مكتمل"
                        ? "#10B981"
                        : a.status === "قيد التسليم"
                          ? "#F59E0B"
                          : "var(--text-muted)",
                  }}
                >
                  {a.status}
                </span>
              </div>
            ))}
          </>
        );

      case "exams":
        return (
          <>
            <div
              style={{
                fontSize: 12,
                color: "var(--text-secondary)",
                marginBottom: 14,
              }}
            >
              {exams.length} امتحان سابق
            </div>
            {exams.map((e) => (
              <FileRow
                key={e.id}
                icon="PDF"
                iconBg="rgba(6,182,212,0.12)"
                iconColor="#06B6D4"
                name={e.name}
                meta={`${e.year} · امتحان ${e.type} · ${e.size}`}
                extra={
                  e.withSolution ? (
                    <span
                      style={{
                        fontSize: 11,
                        color: "#10B981",
                        background: "rgba(16,185,129,0.1)",
                        padding: "2px 8px",
                        borderRadius: 6,
                        fontWeight: 600,
                        flexShrink: 0,
                      }}
                    >
                      مع الحل ✓
                    </span>
                  ) : undefined
                }
              />
            ))}
          </>
        );

      case "videos":
        return (
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
          >
            {videos.map((v) => (
              <div
                key={v.id}
                className="file-row"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 14,
                  padding: "14px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: 110,
                    borderRadius: 10,
                    marginBottom: 12,
                    background:
                      "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(245,158,11,0.1))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 42,
                    color: "#EF4444",
                  }}
                >
                  ▶
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginBottom: 8,
                    lineHeight: 1.4,
                  }}
                >
                  {v.name}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    ⏱ {v.duration}
                  </span>
                  <span
                    style={{ fontSize: 11, color: "#F59E0B", fontWeight: 600 }}
                  >
                    👁 {v.views}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );

      case "projects":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {projects.map((p) => (
              <div
                key={p.id}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 16,
                  padding: "20px",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
                className="file-row"
              >
                <div
                  style={{
                    position: "absolute",
                    top: -30,
                    left: -30,
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: p.color + "08",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 16,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: p.color + "20",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      flexShrink: 0,
                    }}
                  >
                    🗂
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: "var(--text-primary)",
                        }}
                      >
                        {p.name}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          padding: "2px 8px",
                          borderRadius: 6,
                          background:
                            p.level === "مبتدئ"
                              ? "rgba(16,185,129,0.15)"
                              : p.level === "متوسط"
                                ? "rgba(245,158,11,0.15)"
                                : "rgba(239,68,68,0.15)",
                          color:
                            p.level === "مبتدئ"
                              ? "#10B981"
                              : p.level === "متوسط"
                                ? "#F59E0B"
                                : "#EF4444",
                        }}
                      >
                        {p.level}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--text-secondary)",
                        lineHeight: 1.5,
                      }}
                    >
                      {p.desc}
                    </div>
                  </div>
                  <button
                    style={{
                      background: "rgba(59,130,246,0.1)",
                      border: "1px solid rgba(59,130,246,0.2)",
                      borderRadius: 8,
                      padding: "6px 12px",
                      cursor: "pointer",
                      color: "var(--accent-blue)",
                      fontSize: 12,
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    ⬇ تحميل
                  </button>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "3px 8px",
                        borderRadius: 6,
                        background: p.color + "15",
                        color: p.color,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case "external":
        return (
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            {externalResources.map((r) => (
              <div
                key={r.id}
                className="file-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 12,
                  padding: "14px 14px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: r.color + "20",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    color: r.color,
                    flexShrink: 0,
                  }}
                >
                  {r.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      marginBottom: 3,
                    }}
                  >
                    {r.title}
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        color: r.color,
                        background: r.color + "15",
                        padding: "1px 6px",
                        borderRadius: 5,
                        fontWeight: 600,
                      }}
                    >
                      {r.type}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color: "var(--text-muted)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {r.url}
                    </span>
                  </div>
                </div>
                <span
                  style={{
                    color: "var(--text-muted)",
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  ↗
                </span>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fade-in">
      <TopBar
        breadcrumbs={[
          { label: "الرئيسية", onClick: () => navigate({ screen: "home" }) },
          {
            label: "التخصصات",
            onClick: () => navigate({ screen: "departments" }),
          },

          {
            label: nav.department?.name ?? "",
            onClick: () => navigate({ ...nav, screen: "levels" }),
          },
          {
            label: nav.level?.name ?? "",
            onClick: () => navigate({ ...nav, screen: "semesters" }),
          },
          {
            label: nav.semester?.name ?? "",
            onClick: () => navigate({ ...nav, screen: "courses" }),
          },
          { label: nav.course?.name ?? "" },
        ]}
        title={nav.course?.name}
        subtitle={`${nav.course?.nameEn} · ${nav.semester?.name}`}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          minHeight: "calc(100vh - 100px)",
        }}
      >
        {/* Tab sidebar */}
        <div
          style={{
            borderLeft: "1px solid var(--border-subtle)",
            padding: "20px 0",
            background: "rgba(10,15,30,0.5)",
            position: "sticky",
            top: "100px",
            height: "fit-content",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "11px 20px",
                background:
                  activeTab === tab.id ? "rgba(59,130,246,0.08)" : "none",
                border: "none",
                borderRight:
                  activeTab === tab.id
                    ? `2px solid ${color}`
                    : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 15 }}>{tab.icon}</span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  color:
                    activeTab === tab.id
                      ? "var(--text-primary)"
                      : "var(--text-secondary)",
                  flex: 1,
                  textAlign: "right",
                }}
              >
                {tab.label}
              </span>
              <span
                style={{
                  fontSize: 11,
                  background:
                    activeTab === tab.id
                      ? color + "25"
                      : "rgba(255,255,255,0.06)",
                  color: activeTab === tab.id ? color : "var(--text-muted)",
                  padding: "1px 6px",
                  borderRadius: 6,
                  fontWeight: 600,
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: "24px 28px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: 17,
                  fontWeight: 700,
                  color: "var(--text-primary)",
                }}
              >
                {tabs.find((t) => t.id === activeTab)?.label}
              </h2>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--text-secondary)",
                  marginTop: 2,
                }}
              >
                {nav.course?.name}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid var(--border-medium)",
                  borderRadius: 10,
                  padding: "7px 14px",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                ⬇ تحميل الكل
              </button>
              <button
                style={{
                  background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                  border: "none",
                  borderRadius: 10,
                  padding: "7px 16px",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                + رفع ملف
              </button>
            </div>
          </div>
          <div className="fade-in">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
