import { useState, memo } from "react";
import {
  Download,
  ExternalLink,
  Video,
  Code2,
  CheckCircle2,
  Eye,
  Clock,
} from "lucide-react";
import type { NavState } from "../StudentApp";
import TopBar from "../TopBar";

const tabs = [
  { id: "lectures", label: "المحاضرات", icon: "📹", count: 12 },
  { id: "books", label: "الكتب", icon: "📕", count: 4 },
  { id: "exams", label: "الامتحانات السابقة", icon: "📋", count: 10 },
  { id: "videos", label: "المقاطع", icon: "🎬", count: 5 },
  { id: "projects", label: "المشاريع", icon: "🗂", count: 4 },
  { id: "external", label: "مصادر خارجية", icon: "🌐", count: 10 },
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

  const FileRow = memo(function FileRow({
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
  }) {
    return (
      <div className="group flex items-center justify-between gap-4 rounded-xl border border-transparent p-3.5 transition-all duration-200 hover:border-[var(--border-medium)] hover:bg-white/[0.04] cursor-pointer">
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition-transform group-hover:scale-105"
            style={{ background: iconBg, color: iconColor }}
          >
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="truncate text-sm font-semibold text-[var(--text-primary)]">
              {name}
            </h4>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">{meta}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {extra}
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-400 transition-colors hover:bg-blue-500/20 hover:text-blue-300 cursor-pointer"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  });

  const renderContent = () => {
    switch (activeTab) {
      case "lectures":
        return (
          <div className="space-y-2">
            <div className="mb-4 text-xs text-[var(--text-secondary)]">
              {lectures.length} محاضرة متاحة
            </div>
            {lectures.map((f) => (
              <FileRow
                key={f.id}
                icon="PDF"
                iconBg="rgba(239,68,68,0.15)"
                iconColor="#EF4444"
                name={f.name}
                meta={`${f.date} · ${f.size}`}
              />
            ))}
          </div>
        );

      case "books":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {books.map((b) => (
              <div
                key={b.id}
                className="group flex gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 transition-all duration-200 hover:border-blue-500/30 hover:shadow-lg cursor-pointer"
              >
                <div className="flex h-20 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/10 text-3xl shadow-md">
                  {b.cover}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-[var(--text-primary)] leading-snug">
                    {b.title}
                  </h4>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    {b.author}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-[var(--text-muted)]">
                    <span className="rounded-md bg-white/[0.04] px-2 py-0.5">
                      الطبعة {b.edition}
                    </span>
                    <span className="rounded-md bg-white/[0.04] px-2 py-0.5">
                      {b.pages} صفحة
                    </span>
                    <span className="rounded-md bg-white/[0.04] px-2 py-0.5">
                      {b.year}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "exams":
        return (
          <div className="space-y-2">
            <div className="mb-4 text-xs text-[var(--text-secondary)]">
              {exams.length} امتحان سابق
            </div>
            {exams.map((e) => (
              <FileRow
                key={e.id}
                icon="PDF"
                iconBg="rgba(6,182,212,0.15)"
                iconColor="#06B6D4"
                name={e.name}
                meta={`${e.year} · امتحان ${e.type} · ${e.size}`}
                extra={
                  e.withSolution ? (
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>مع الحل</span>
                    </span>
                  ) : undefined
                }
              />
            ))}
          </div>
        );

      case "videos":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map((v) => (
              <div
                key={v.id}
                className="group overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 transition-all duration-200 hover:border-red-500/30 hover:shadow-lg cursor-pointer"
              >
                <div className="mb-3 flex h-32 w-full items-center justify-center rounded-xl bg-gradient-to-tr from-red-600/20 via-orange-500/10 to-transparent text-4xl text-red-500 shadow-inner">
                  <Video className="h-10 w-10" />
                </div>
                <h4 className="text-sm font-bold text-[var(--text-primary)] leading-snug">
                  {v.name}
                </h4>
                <div className="mt-3 flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{v.duration}</span>
                  </span>
                  <span className="flex items-center gap-1 text-amber-400 font-semibold">
                    <Eye className="h-3.5 w-3.5" />
                    <span>{v.views}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        );

      case "projects":
        return (
          <div className="grid grid-cols-1 gap-4">
            {projects.map((p) => (
              <div
                key={p.id}
                className="group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 transition-all duration-200 hover:border-blue-500/30 hover:shadow-xl cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-mono text-xl font-bold"
                      style={{
                        background: `${p.color}20`,
                        color: p.color,
                      }}
                    >
                      <Code2 className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="text-base font-bold text-[var(--text-primary)]">
                          {p.name}
                        </h4>
                        <span
                          className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                            p.level === "مبتدئ"
                              ? "bg-emerald-500/15 text-emerald-400"
                              : p.level === "متوسط"
                                ? "bg-amber-500/15 text-amber-400"
                                : "bg-red-500/15 text-red-400"
                          }`}
                        >
                          {p.level}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-400 hover:bg-blue-500/20 cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>تحميل</span>
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md px-2.5 py-0.5 text-xs font-semibold"
                      style={{
                        background: `${p.color}15`,
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {externalResources.map((r) => (
              <div
                key={r.id}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 transition-all duration-200 hover:border-blue-500/30 hover:shadow-lg cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-bold"
                    style={{
                      background: `${r.color}20`,
                      color: r.color,
                    }}
                  >
                    {r.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="truncate text-sm font-bold text-[var(--text-primary)]">
                      {r.title}
                    </h4>
                    <div className="mt-1 flex items-center gap-2 text-xs">
                      <span
                        className="rounded px-1.5 py-0.5 text-[10px] font-semibold"
                        style={{
                          color: r.color,
                          background: `${r.color}15`,
                        }}
                      >
                        {r.type}
                      </span>
                      <span className="truncate text-[var(--text-muted)]">
                        {r.url}
                      </span>
                    </div>
                  </div>
                </div>

                <ExternalLink className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform group-hover:translate-x-0.5" />
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const breadcrumbsList = [
    { label: "الرئيسية", onClick: () => navigate({ screen: "home" }) },
    {
      label: "التخصصات",
      onClick: () => navigate({ screen: "departments" }),
    },
    ...(nav.department?.name
      ? [
          {
            label: nav.department.name,
            onClick: () => navigate({ ...nav, screen: "levels" as const }),
          },
        ]
      : []),
    ...(nav.level?.name
      ? [
          {
            label: nav.level.name,
            onClick: () => navigate({ ...nav, screen: "levels" as const }),
          },
        ]
      : []),
    ...(nav.semester?.name
      ? [
          {
            label: nav.semester.name,
            onClick: () => navigate({ ...nav, screen: "courses" as const }),
          },
        ]
      : []),
    ...(nav.course?.name ? [{ label: nav.course.name }] : []),
  ];

  const subtitleText = [nav.course?.nameEn, nav.semester?.name]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="w-full">
      <TopBar
        breadcrumbs={breadcrumbsList}
        title={nav.course?.name}
        subtitle={subtitleText}
      />

      <div className="mx-auto flex max-w-7xl flex-col md:flex-row gap-6 p-6 sm:p-8">
        {/* Tab Sidebar */}
        <aside className="w-full md:w-56 shrink-0 rounded-2xl border border-[var(--border-subtle)] bg-[rgba(10,15,30,0.5)] p-2.5 backdrop-blur-xl h-fit">
          <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-right text-xs sm:text-sm font-medium transition-all cursor-pointer border-0 ${
                    isActive
                      ? "bg-blue-500/15 text-blue-400 font-semibold shadow-sm"
                      : "bg-transparent text-[var(--text-secondary)] hover:bg-white/[0.04] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </div>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-white/[0.05] text-[var(--text-muted)]"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                {tabs.find((t) => t.id === activeTab)?.label}
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">
                {nav.course?.name}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-xl border border-[var(--border-medium)] bg-white/[0.05] px-3.5 py-2 text-xs font-semibold text-[var(--text-secondary)] transition-all hover:bg-white/[0.08] hover:text-white cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>تحميل الكل</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 shadow-xl">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
