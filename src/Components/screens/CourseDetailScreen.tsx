import { useState, memo } from "react";
import {
  Download,
  ExternalLink,
  Video,
  Code2,
  CheckCircle2,
  Eye,
  Clock,
  // ArrowRight,
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
    size: "2.1 MB",
    year: 2021,
    type: "نهاية",
    withSolution: true,
  },
  {
    id: 7,
    name: "امتحان تجريبي 1 - محلول",
    size: "0.9 MB",
    year: 2024,
    type: "تجريبي",
    withSolution: true,
  },
  {
    id: 8,
    name: "امتحان تجريبي 2 - محلول",
    size: "1.0 MB",
    year: 2024,
    type: "تجريبي",
    withSolution: true,
  },
  {
    id: 9,
    name: "بنك الأسئلة الشامل (200 سؤال)",
    size: "3.5 MB",
    year: 2024,
    type: "بنك أسئلة",
    withSolution: true,
  },
  {
    id: 10,
    name: "ملخص قوانين ونماذج",
    size: "0.6 MB",
    year: 2024,
    type: "ملخص",
    withSolution: true,
  },
];

const videos = [
  {
    id: 1,
    name: "مقدمة إلى لغة البرمجة C - الدرس الأول",
    duration: "45:30",
    platform: "YouTube",
    views: "12.4K",
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
    color: "#899C9A",
  },
  {
    id: 2,
    name: "تطبيق الحاسبة العلمية",
    level: "مبتدئ",
    desc: "حاسبة علمية كاملة تدعم العمليات الحسابية والمثلثية والإحصائية",
    tech: ["C", "Math.h"],
    grade: "السنة الأولى",
    color: "#AABCAF",
  },
  {
    id: 3,
    name: "لعبة إدارة الطلاب",
    level: "متقدم",
    desc: "نظام شامل لإدارة بيانات الطلاب مع ميزات البحث والترتيب والتصفية",
    tech: ["C", "Sorting", "Searching", "Files"],
    grade: "السنة الأولى",
    color: "#899C9A",
  },
  {
    id: 4,
    name: "محاكي المتاهة",
    level: "متقدم",
    desc: "محاكاة حل المتاهة باستخدام خوارزمية DFS والمصفوفات الثنائية الأبعاد",
    tech: ["C", "2D Arrays", "Recursion"],
    grade: "السنة الأولى",
    color: "#AABCAF",
  },
];

const externalResources = [
  {
    id: 1,
    title: "Learn C Programming — Programiz",
    url: "programiz.com/c-programming",
    type: "موقع",
    icon: "🌐",
    color: "#899C9A",
  },
  {
    id: 2,
    title: "The C Beginner's Handbook",
    url: "freecodecamp.org",
    type: "دليل",
    icon: "📖",
    color: "#AABCAF",
  },
  {
    id: 3,
    title: "C Programming for Beginners — YouTube",
    url: "youtube.com",
    type: "فيديو",
    icon: "▶",
    color: "#899C9A",
  },
  {
    id: 4,
    title: "GeeksForGeeks — C Language",
    url: "geeksforgeeks.org/c-programming-language/",
    type: "مقالات",
    icon: "📄",
    color: "#AABCAF",
  },
  {
    id: 5,
    title: "TutorialsPoint — C",
    url: "tutorialspoint.com/cprogramming",
    type: "دورة",
    icon: "🎓",
    color: "#899C9A",
  },
  {
    id: 6,
    title: "W3Schools — C Tutorial",
    url: "w3schools.com/c",
    type: "مرجع",
    icon: "📚",
    color: "#AABCAF",
  },
  {
    id: 7,
    title: "CS50 Harvard — C Week",
    url: "cs50.harvard.edu",
    type: "كورس",
    icon: "🏛",
    color: "#899C9A",
  },
  {
    id: 8,
    title: "Cplusplus.com — C Reference",
    url: "cplusplus.com/reference",
    type: "مرجع",
    icon: "📋",
    color: "#AABCAF",
  },
  {
    id: 9,
    title: "LeetCode — C Practice",
    url: "leetcode.com",
    type: "تمارين",
    icon: "💪",
    color: "#899C9A",
  },
  {
    id: 10,
    title: "HackerRank — C Language",
    url: "hackerrank.com/domains/c",
    type: "تمارين",
    icon: "🏅",
    color: "#AABCAF",
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
      <div className="group flex items-center justify-between gap-4 rounded-xl border border-transparent p-3.5 transition-all duration-200 hover:border-[#6E7C8B]/40 hover:bg-white/[0.04] cursor-pointer">
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition-transform group-hover:scale-105"
            style={{ background: iconBg, color: iconColor }}
          >
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="truncate text-sm font-bold text-[#F4F7F6]">
              {name}
            </h4>
            <p className="mt-0.5 text-xs font-semibold text-[#AABCAF]">
              {meta}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {extra}
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#899C9A]/30 bg-[#899C9A]/15 text-[#F4F7F6] transition-colors hover:bg-[#899C9A]/30 cursor-pointer"
          >
            <Download className="h-4 w-4 text-[#899C9A]" />
          </button>
        </div>
      </div>
    );
  });

  const renderContent = () => {
    switch (activeTab) {
      case "lectures":
        return (
          <div className="divide-y divide-[#6E7C8B]/30">
            {lectures.map((l) => (
              <FileRow
                key={l.id}
                icon="📄"
                iconBg="rgba(137, 156, 154, 0.2)"
                iconColor="#899C9A"
                name={l.name}
                meta={`${l.size} · ${l.date}`}
              />
            ))}
          </div>
        );

      case "books":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {books.map((b) => (
              <div
                key={b.id}
                className="flex items-start gap-4 rounded-xl border border-[#6E7C8B]/40 bg-[#35425E]/70 p-4 shadow-sm transition-all hover:border-[#899C9A] hover:bg-[#35425E]"
              >
                <div className="flex h-14 w-12 shrink-0 items-center justify-center rounded-lg bg-[#525C79] text-2xl shadow">
                  {b.cover}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="truncate text-sm font-bold text-[#F4F7F6]">
                    {b.title}
                  </h4>
                  <p className="text-xs font-semibold text-[#AABCAF] mt-0.5">
                    {b.author}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-[#AABCAF]">
                    <span>الطبعة {b.edition}</span>
                    <span>·</span>
                    <span>{b.pages} صفحة</span>
                    <span>·</span>
                    <span>{b.year}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="rounded-lg border border-[#899C9A]/40 bg-[#899C9A]/15 p-2 text-[#899C9A] hover:bg-[#899C9A]/30 transition-colors cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        );

      case "exams":
        return (
          <div className="divide-y divide-[#6E7C8B]/30">
            {exams.map((e) => (
              <FileRow
                key={e.id}
                icon="📋"
                iconBg="rgba(170, 188, 175, 0.2)"
                iconColor="#AABCAF"
                name={e.name}
                meta={`${e.size} · ${e.year} · ${e.type}`}
                extra={
                  e.withSolution && (
                    <span className="flex items-center gap-1 rounded-md bg-[#899C9A]/20 px-2 py-0.5 text-[10px] font-bold text-[#F4F7F6] border border-[#899C9A]/40">
                      <CheckCircle2 className="h-3 w-3 text-[#899C9A]" />
                      <span>مع الحل</span>
                    </span>
                  )
                }
              />
            ))}
          </div>
        );

      case "videos":
        return (
          <div className="divide-y divide-[#6E7C8B]/30">
            {videos.map((v) => (
              <div
                key={v.id}
                className="flex items-center justify-between gap-4 p-3.5 transition-colors hover:bg-white/[0.04] rounded-xl cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/20 text-red-400 text-sm">
                    <Video className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-bold text-[#F4F7F6]">
                      {v.name}
                    </h4>
                    <div className="mt-0.5 flex items-center gap-2 text-xs font-semibold text-[#AABCAF]">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {v.duration}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {v.views}
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href="#"
                  className="flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/15 px-3 py-1.5 text-xs font-bold text-red-300 hover:bg-red-500/25 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>مشاهدة</span>
                </a>
              </div>
            ))}
          </div>
        );

      case "projects":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((p) => (
              <div
                key={p.id}
                className="rounded-xl border border-[#6E7C8B]/40 bg-[#35425E]/70 p-4 shadow-sm transition-all hover:border-[#899C9A] hover:bg-[#35425E]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-lg"
                      style={{ background: `${p.color}25`, color: p.color }}
                    >
                      <Code2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#F4F7F6]">
                        {p.name}
                      </h4>
                      <span className="text-[11px] font-semibold text-[#AABCAF]">
                        {p.grade}
                      </span>
                    </div>
                  </div>
                  <span
                    className="rounded-md px-2 py-0.5 text-[10px] font-bold"
                    style={{
                      background: `${p.color}20`,
                      color: p.color,
                      border: `1px solid ${p.color}40`,
                    }}
                  >
                    {p.level}
                  </span>
                </div>

                <p className="mt-3 text-xs font-medium text-[#AABCAF] leading-relaxed">
                  {p.desc}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-[#6E7C8B]/30">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-[#525C79] px-2 py-0.5 font-['JetBrains_Mono'] text-[10px] font-bold text-[#F4F7F6]"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {externalResources.map((res) => (
              <a
                key={res.id}
                href={`https://${res.url}`}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 rounded-xl border border-[#6E7C8B]/40 bg-[#35425E]/70 p-3.5 transition-all hover:border-[#899C9A] hover:bg-[#35425E] hover:-translate-y-0.5 no-underline"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-base"
                    style={{ background: `${res.color}25` }}
                  >
                    {res.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-xs font-bold text-[#F4F7F6] group-hover:text-[#AABCAF]">
                      {res.title}
                    </h4>
                    <p className="truncate text-[11px] font-medium text-[#AABCAF]">
                      {res.url}
                    </p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-[#899C9A] transition-transform group-hover:translate-x-[-2px]" />
              </a>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const breadcrumbsList = [
    { label: "الرئيسية", onClick: () => navigate({ screen: "home" }) },
    ...(nav.university?.name
      ? [
          {
            label: nav.university.name,
            onClick: () => navigate({ ...nav, screen: "colleges" as const }),
          },
        ]
      : []),
    ...(nav.college?.name
      ? [
          {
            label: nav.college.name,
            onClick: () => navigate({ ...nav, screen: "departments" as const }),
          },
        ]
      : []),
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

  // const handleGoBack = () => {
  //   if (nav.semester || nav.level) {
  //     navigate({ ...nav, screen: "courses" });
  //   } else if (nav.department) {
  //     navigate({ ...nav, screen: "levels" });
  //   } else {
  //     navigate({ screen: "home" });
  //   }
  // };

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
        <aside className="w-full md:w-56 shrink-0 rounded-2xl border border-[#6E7C8B]/40 bg-[#525C79]/85 p-2.5 backdrop-blur-xl h-fit shadow-lg">
          <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-right text-xs sm:text-sm font-bold transition-all cursor-pointer border-0 ${
                    isActive
                      ? "bg-[#35425E] text-[#F4F7F6] shadow-sm border border-[#899C9A]/50"
                      : "bg-transparent text-[#AABCAF] hover:bg-white/[0.06] hover:text-[#F4F7F6]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </div>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? "bg-[#899C9A] text-[#1D263B]"
                        : "bg-[#35425E] text-[#AABCAF] border border-[#6E7C8B]/30"
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
              <h2 className="text-lg font-bold text-[#F4F7F6]">
                {tabs.find((t) => t.id === activeTab)?.label}
              </h2>
              <p className="text-xs font-semibold text-[#AABCAF]">
                {nav.course?.name}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              {/* <button
                type="button"
                onClick={handleGoBack}
                className="flex items-center gap-1.5 rounded-xl border border-[#6E7C8B]/40 bg-[#35425E]/80 px-3.5 py-2 text-xs font-bold text-[#F4F7F6] transition-all hover:bg-[#35425E] hover:border-[#899C9A] cursor-pointer shadow-sm"
              >
                <ArrowRight className="h-3.5 w-3.5 text-[#899C9A]" />
                <span>العودة للمواد</span>
              </button> */}

              <button
                type="button"
                className="flex items-center gap-1.5 rounded-xl border border-[#899C9A]/40 bg-[#525C79] px-3.5 py-2 text-xs font-bold text-[#F4F7F6] transition-all hover:bg-[#5D6989] hover:border-[#899C9A] cursor-pointer shadow-sm"
              >
                <Download className="h-3.5 w-3.5 text-[#899C9A]" />
                <span>تحميل الكل</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-[#6E7C8B]/40 bg-[#525C79]/85 p-6 shadow-xl backdrop-blur-xl">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
