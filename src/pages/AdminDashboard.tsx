import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Page } from "../App";
import type { Lang } from "../data";
import { t, universities, courses, recentActivity } from "../data";
import Navbar from "../Components/Navbar";
import {
  Building2,
  BookOpen,
  FileText,
  Users,
  Upload,
  Plus,
  Trash2,
  Edit3,
  Sparkles,
  TrendingUp,
  FolderOpen,
  FileSpreadsheet,
} from "lucide-react";

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

const tabIcons: Record<AdminTab, React.ReactNode> = {
  overview: <TrendingUp className="h-4 w-4" />,
  universities: <Building2 className="h-4 w-4" />,
  courses: <BookOpen className="h-4 w-4" />,
  resources: <FolderOpen className="h-4 w-4" />,
  upload: <Upload className="h-4 w-4" />,
};

const activityTypeBadge: Record<
  string,
  { icon: React.ReactNode; bg: string; text: string }
> = {
  upload: {
    icon: <FileText className="h-4 w-4" />,
    bg: "bg-[#899C9A]/20 text-[#F4F7F6] border border-[#899C9A]/40",
    text: "رفع ملف",
  },
  course: {
    icon: <BookOpen className="h-4 w-4" />,
    bg: "bg-[#323D59] text-[#F4F7F6] border border-white/[0.07]",
    text: "مقرر",
  },
  university: {
    icon: <Building2 className="h-4 w-4" />,
    bg: "bg-[#AABCAF]/20 text-[#F4F7F6] border border-[#AABCAF]/40",
    text: "جامعة",
  },
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
  const tx = t[lang] || t.ar;

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        dark
          ? "bg-[#242D42] text-[#F8FAFC]"
          : "bg-slate-50 text-slate-900"
      }`}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <Navbar
        dark={dark}
        lang={lang}
        setDark={setDark}
        setLang={setLang}
        setPage={setPage}
        currentPage="admin"
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#323D59] to-[#7DA49F] text-[#F8FAFC] shadow-md shadow-[#242D42]/40 border border-[#7DA49F]/40">
                <Sparkles className="h-5 w-5" />
              </div>
              <h1 className="font-['Outfit'] text-2xl font-black tracking-tight text-[#F8FAFC] sm:text-3xl">
                {tx.admin.title}
              </h1>
            </div>
            <p className="mt-1 text-sm font-semibold text-[#A5B4BF]">
              {tx.admin.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTab("upload")}
              className="flex items-center gap-2 rounded-xl bg-[#7DA49F] px-4 py-2.5 text-sm font-bold text-[#1E2638] shadow-md transition-all hover:bg-[#9DBFB8] hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <Upload className="h-4 w-4" />
              <span>{tx.admin.uploadResource}</span>
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div className="mb-8 flex items-center gap-1.5 overflow-x-auto rounded-2xl border border-white/[0.07] bg-[#323D59] p-1.5 shadow-md">
          {adminTabs.map((key, i) => {
            const isActive = tab === key;
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#3B4868] text-[#F8FAFC] shadow-sm border border-[#7DA49F]/40"
                    : "text-[#A5B4BF] hover:bg-white/[0.06] hover:text-[#F8FAFC]"
                }`}
              >
                {tabIcons[key]}
                <span>{tx.admin.tabs[i]}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Views */}
        <div className="fade-in">
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
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  color,
  subtext,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
  subtext?: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#323D59] p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.15] hover:bg-[#3B4868] hover:shadow-xl">
      <div
        className="absolute top-0 right-0 left-0 h-1.5"
        style={{ backgroundColor: color }}
      />
      <div className="flex items-start justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 shadow-sm"
          style={{ backgroundColor: `${color}25`, color }}
        >
          {icon}
        </div>
        {subtext && (
          <span className="flex items-center gap-1 rounded-full bg-[#7DA49F]/20 px-2.5 py-0.5 text-[11px] font-bold text-[#F8FAFC] border border-[#7DA49F]/40">
            <TrendingUp className="h-3 w-3 text-[#7DA49F]" />
            {subtext}
          </span>
        )}
      </div>

      <div className="mt-4">
        <div className="font-['Outfit'] text-2xl font-black tracking-tight text-[#F8FAFC] sm:text-3xl">
          {value}
        </div>
        <div className="mt-1 text-xs font-semibold text-[#A5B4BF]">
          {label}
        </div>
      </div>
    </div>
  );
}

function OverviewTab({ tx, lang }: { tx: (typeof t)["en"]; lang: Lang }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Main Column */}
      <div className="space-y-6 lg:col-span-2">
        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StatCard
            icon={<Building2 className="h-6 w-6" />}
            value="24"
            label={tx.admin.totalUniversities}
            color="#899C9A"
            subtext="+2 جامعات"
          />
          <StatCard
            icon={<BookOpen className="h-6 w-6" />}
            value="3,400"
            label={tx.admin.totalCourses}
            color="#AABCAF"
            subtext="+14 مقرر"
          />
          <StatCard
            icon={<FileText className="h-6 w-6" />}
            value="87,200"
            label={tx.admin.totalResources}
            color="#899C9A"
            subtext="+120 ملف"
          />
          <StatCard
            icon={<Users className="h-6 w-6" />}
            value="220,000"
            label={tx.admin.totalStudents}
            color="#AABCAF"
            subtext="+8.4%"
          />
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-white/[0.07] bg-[#323D59] p-6 shadow-lg">
          <h3 className="font-['Outfit'] text-base font-bold text-[#F8FAFC]">
            {tx.admin.quickActions}
          </h3>
          <p className="mt-0.5 text-xs font-medium text-[#A5B4BF]">
            روابط وإجراءات سريعة لتسهيل إدارة المنصة
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              {
                label: tx.admin.addUniversity,
                icon: <Building2 className="h-5 w-5" />,
                color: "#7DA49F",
              },
              {
                label: tx.admin.addCourse,
                icon: <BookOpen className="h-5 w-5" />,
                color: "#A5B4BF",
              },
              {
                label: tx.admin.uploadResource,
                icon: <Upload className="h-5 w-5" />,
                color: "#7DA49F",
              },
              {
                label: tx.admin.manageFiles,
                icon: <FileSpreadsheet className="h-5 w-5" />,
                color: "#A5B4BF",
              },
            ].map((action) => (
              <button
                key={action.label}
                className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.15] hover:bg-[#3B4868] active:scale-95 cursor-pointer shadow-sm"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110"
                  style={{
                    backgroundColor: `${action.color}25`,
                    color: action.color,
                  }}
                >
                  {action.icon}
                </div>
                <span className="text-xs font-bold text-[#F8FAFC] group-hover:text-[#F8FAFC]">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* File Management Table */}
        <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#323D59] shadow-lg">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
            <div>
              <h3 className="font-['Outfit'] text-base font-bold text-[#F8FAFC]">
                {tx.admin.manageFiles}
              </h3>
              <p className="text-xs font-semibold text-[#A5B4BF]">
                {lang === "ar"
                  ? "أحدث الملفات المرفوعة على المنصة"
                  : "Latest files uploaded across courses"}
              </p>
            </div>
            <span className="font-['JetBrains_Mono'] rounded-md bg-white/[0.04] px-2.5 py-1 text-xs font-bold text-[#A5B4BF] border border-white/[0.06]">
              {lang === "ar" ? "آخر 5 ملفات" : "Last 5 files"}
            </span>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {courses
              .slice(0, 3)
              .flatMap((c) => c.resources.lectures.slice(0, 2))
              .slice(0, 5)
              .map((f, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 px-6 py-3.5 transition-colors hover:bg-white/[0.04]"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#7DA49F]/20 text-[#7DA49F] border border-[#7DA49F]/30">
                      <FileText className="h-4 w-4" />
                    </div>
                    <span className="truncate text-sm font-bold text-[#F8FAFC]">
                      {f.name}
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <span className="font-['JetBrains_Mono'] text-xs font-semibold text-[#A5B4BF]">
                      {f.size}
                    </span>
                    <button className="flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/15 px-2.5 py-1 text-xs font-bold text-red-300 transition-colors hover:bg-red-500/25 cursor-pointer">
                      <Trash2 className="h-3 w-3" />
                      <span>{lang === "ar" ? "حذف" : "Delete"}</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Side Column: Recent Activity Feed */}
      <div className="rounded-2xl border border-white/[0.07] bg-[#323D59] shadow-lg">
        <div className="border-b border-white/[0.06] px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="font-['Outfit'] text-base font-bold text-[#F8FAFC]">
              {tx.admin.recentActivity}
            </h3>
            <span className="flex items-center gap-1 text-[11px] font-bold text-[#7DA49F]">
              <span className="h-2 w-2 rounded-full bg-[#7DA49F] animate-pulse" />
              {lang === "ar" ? "مباشر" : "Live"}
            </span>
          </div>
        </div>

        <div className="space-y-4 p-5">
          {recentActivity.map((item, i) => {
            const badge = activityTypeBadge[item.type] || activityTypeBadge.upload;
            return (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 transition-all hover:bg-[#3B4868]"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${badge.bg}`}
                >
                  {badge.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs font-bold text-[#F8FAFC]">
                      {item.user}
                    </span>
                    <span className="font-['JetBrains_Mono'] shrink-0 text-[10px] font-medium text-[#A5B4BF]">
                      {lang === "ar" ? item.timeAr : item.time}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs font-medium text-[#A5B4BF] leading-relaxed">
                    {item.action}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function UniversitiesTab({ tx, lang }: { tx: (typeof t)["en"]; lang: Lang }) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#F8FAFC]">
            {lang === "ar" ? "إدارة الجامعات" : "Manage Universities"}
          </h2>
          <p className="text-xs font-semibold text-[#A5B4BF]">
            {lang === "ar"
              ? "عرض وتعديل بيانات الجامعات الشريكة"
              : "View and manage partner university records"}
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-[#7DA49F] px-4 py-2.5 text-sm font-black text-[#1E2638] shadow-md transition-all hover:bg-[#9DBFB8] hover:scale-[1.02] active:scale-95 cursor-pointer">
          <Plus className="h-4 w-4" />
          <span>{tx.admin.addUniversity}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {universities.map((u) => (
          <div
            key={u.id}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#323D59] p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.15] hover:bg-[#3B4868] hover:shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7DA49F]/20 text-[#7DA49F] border border-[#7DA49F]/30 font-mono text-xl">
                🏛
              </div>
              <span className="font-['JetBrains_Mono'] rounded-full bg-white/[0.04] px-2.5 py-1 text-[11px] font-bold text-[#A5B4BF] border border-white/[0.06]">
                ID-{u.id.toString().padStart(3, "0")}
              </span>
            </div>

            <div className="mt-4">
              <h3 className="font-['Outfit'] text-base font-bold text-[#F8FAFC] group-hover:text-[#9DBFB8] transition-colors">
                {lang === "ar" ? u.nameAr : u.name}
              </h3>
              <p className="mt-0.5 text-xs font-semibold text-[#A5B4BF]">
                {u.location}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
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
                  className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5"
                >
                  <div className="font-['Outfit'] text-sm font-extrabold text-[#F8FAFC]">
                    {stat.val}
                  </div>
                  <div className="mt-0.5 text-[10px] font-semibold text-[#A5B4BF]">
                    {stat.lbl}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex gap-2 pt-3 border-t border-white/[0.06]">
              <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.03] py-2 text-xs font-bold text-[#F8FAFC] transition-colors hover:bg-[#3B4868] hover:border-white/[0.15] cursor-pointer">
                <Edit3 className="h-3.5 w-3.5 text-[#7DA49F]" />
                <span>{lang === "ar" ? "تعديل" : "Edit"}</span>
              </button>
              <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/15 py-2 text-xs font-bold text-red-300 transition-colors hover:bg-red-500/25 cursor-pointer">
                <Trash2 className="h-3.5 w-3.5" />
                <span>{lang === "ar" ? "حذف" : "Delete"}</span>
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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#F8FAFC]">
            {lang === "ar" ? "إدارة المقررات الدراسية" : "Manage Courses"}
          </h2>
          <p className="text-xs font-semibold text-[#A5B4BF]">
            {lang === "ar"
              ? "عرض تفاصيل المقررات والمحتوى المتاح"
              : "Overview of courses, instructors, and resource count"}
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-[#7DA49F] px-4 py-2.5 text-sm font-black text-[#1E2638] shadow-md transition-all hover:bg-[#9DBFB8] hover:scale-[1.02] active:scale-95 cursor-pointer">
          <Plus className="h-4 w-4" />
          <span>{tx.admin.addCourse}</span>
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#323D59] shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="border-b border-white/[0.06] bg-[#3B4868]/60 text-xs font-bold text-[#A5B4BF] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">
                  {lang === "ar" ? "الكود" : "Code"}
                </th>
                <th className="px-6 py-4">
                  {lang === "ar" ? "اسم المقرر" : "Course Name"}
                </th>
                <th className="px-6 py-4">
                  {lang === "ar" ? "الأستاذ" : "Instructor"}
                </th>
                <th className="px-6 py-4">
                  {lang === "ar" ? "المستوى" : "Level"}
                </th>
                <th className="px-6 py-4">
                  {lang === "ar" ? "الموارد" : "Resources"}
                </th>
                <th className="px-6 py-4 text-center">
                  {lang === "ar" ? "الإجراءات" : "Actions"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] font-normal">
              {courses.map((c) => {
                const info = lang === "ar" ? c.ar : c.en;
                return (
                  <tr
                    key={c.id}
                    className="transition-colors hover:bg-white/[0.04]"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className="font-['JetBrains_Mono'] rounded-lg px-2.5 py-1 text-xs font-bold"
                        style={{
                          backgroundColor: `${c.color}25`,
                          color: c.color,
                          border: `1px solid ${c.color}40`,
                        }}
                      >
                        {c.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-[#F8FAFC] whitespace-nowrap">
                      {info.name}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-[#A5B4BF] whitespace-nowrap">
                      {info.instructor}
                    </td>
                    <td className="px-6 py-4 font-['JetBrains_Mono'] text-xs font-medium text-[#A5B4BF] whitespace-nowrap">
                      {info.level.split("·")[0].trim()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 font-['Outfit'] font-bold text-[#F8FAFC]">
                        <FileText className="h-3.5 w-3.5 text-[#7DA49F]" />
                        {c.resourceCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button className="flex items-center gap-1 rounded-xl border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-xs font-bold text-[#F8FAFC] transition-colors hover:bg-[#3B4868] hover:border-white/[0.15] cursor-pointer">
                          <Edit3 className="h-3.5 w-3.5 text-[#7DA49F]" />
                          <span>{lang === "ar" ? "تعديل" : "Edit"}</span>
                        </button>
                        <button className="flex items-center gap-1 rounded-xl border border-red-500/30 bg-red-500/15 px-2.5 py-1 text-xs font-bold text-red-300 transition-colors hover:bg-red-500/25 cursor-pointer">
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>{lang === "ar" ? "حذف" : "Delete"}</span>
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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#F8FAFC]">
            {lang === "ar" ? "الموارد والملفات الأكاديمية" : "Academic Resources"}
          </h2>
          <p className="text-xs font-semibold text-[#A5B4BF]">
            {lang === "ar"
              ? "قائمة بالملفات والمحاضرات المرفوعة عبر جميع المواد"
              : "All academic files and slides uploaded to the system"}
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-[#7DA49F] px-4 py-2.5 text-sm font-black text-[#1E2638] shadow-md transition-all hover:bg-[#9DBFB8] hover:scale-[1.02] active:scale-95 cursor-pointer">
          <Upload className="h-4 w-4" />
          <span>{tx.admin.uploadResource}</span>
        </button>
      </div>

      <div className="space-y-3">
        {allResources.map((r, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-[#323D59] p-4 shadow-md transition-all duration-200 hover:border-white/[0.15] hover:bg-[#3B4868]"
          >
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${r.color}25`, color: r.color }}
            >
              <FileText className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-[#F8FAFC]">
                {r.name}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#A5B4BF]">
                <span
                  className="font-['JetBrains_Mono'] font-bold text-[#F8FAFC]"
                >
                  {r.code}
                </span>
                <span>•</span>
                <span>{r.course}</span>
                <span>•</span>
                <span className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[10px] font-bold text-[#A5B4BF] border border-white/[0.06]">
                  {r.type}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#F8FAFC]">
                  {r.size}
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] font-medium text-[#A5B4BF]">
                  {r.date}
                </span>
              </div>

              <button className="flex items-center gap-1 rounded-xl border border-red-500/30 bg-red-500/15 px-3 py-1.5 text-xs font-bold text-red-300 transition-colors hover:bg-red-500/25 cursor-pointer">
                <Trash2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">
                  {lang === "ar" ? "حذف" : "Delete"}
                </span>
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
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-white/[0.07] bg-[#323D59] p-6 shadow-xl sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#323D59] to-[#7DA49F] text-[#F8FAFC] shadow-md shadow-[#242D42]/40 border border-[#7DA49F]/40">
            <Upload className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-['Outfit'] text-lg font-bold text-[#F8FAFC]">
              {tx.admin.uploadResource}
            </h3>
            <p className="text-xs font-semibold text-[#A5B4BF]">
              {lang === "ar"
                ? "ارفع المحاضرات والمذكرات وحدد المقرر المناسب"
                : "Upload course materials and assign to the target subject"}
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {[
            {
              label: lang === "ar" ? "الجامعة" : "University",
              options: ["جامعة القاهرة", "جامعة الإسكندرية", "جامعة عين شمس"],
            },
            {
              label: lang === "ar" ? "القسم" : "Department",
              options: ["علوم الحاسوب (CS)", "تقنية المعلومات (IT)", "الأمن السيبراني (CYS)"],
            },
            {
              label: lang === "ar" ? "المقرر" : "Course",
              options: [
                "CS 101 - برمجة 1",
                "CS 201 - هياكل البيانات",
                "CS 301 - الذكاء الاصطناعي",
              ],
            },
            {
              label: lang === "ar" ? "نوع المورد" : "Resource Type",
              options: [
                "محاضرة (Lecture Slides)",
                "كتاب أو مرجع (Book / Reference)",
                "واجب وتكليف (Assignment)",
                "امتحان سابق (Previous Exam)",
              ],
            },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-xs font-bold text-[#A5B4BF] mb-1.5">
                {field.label}
              </label>
              <select className="w-full rounded-xl border border-white/[0.07] bg-white/[0.04] px-3.5 py-2.5 text-sm text-[#F8FAFC] outline-none transition-all focus:border-[#7DA49F] focus:ring-2 focus:ring-[#7DA49F]/25 cursor-pointer">
                <option value="" className="bg-[#323D59]">{lang === "ar" ? "اختر..." : "Select..."}</option>
                {field.options.map((o) => (
                  <option key={o} value={o} className="bg-[#323D59]">
                    {o}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={handleDrop}
          className={`mt-6 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-200 cursor-pointer ${
            drag
              ? "border-[#7DA49F] bg-[#7DA49F]/10 scale-[1.01]"
              : "border-white/[0.1] bg-white/[0.03] hover:border-[#7DA49F] hover:bg-[#3B4868]"
          }`}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7DA49F]/20 text-[#7DA49F] border border-[#7DA49F]/30 mb-3">
            <Upload className="h-7 w-7" />
          </div>
          <p className="font-['Outfit'] text-base font-bold text-[#F8FAFC]">
            {lang === "ar"
              ? "اسحب وأفلت الملفات هنا"
              : "Drag & drop your files here"}
          </p>
          <p className="mt-1 text-xs font-semibold text-[#A5B4BF]">
            {lang === "ar"
              ? "أو اضغط لتصفح ملفات جهازك"
              : "or click the button below to browse"}
          </p>

          <label className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#7DA49F] px-5 py-2.5 text-xs font-black text-[#1E2638] shadow-md transition-all hover:bg-[#9DBFB8] hover:scale-[1.02] active:scale-95 cursor-pointer">
            <Plus className="h-4 w-4" />
            <span>{lang === "ar" ? "اختر ملفات" : "Choose Files"}</span>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                const newFiles = Array.from(e.target.files ?? []).map(
                  (f) => f.name,
                );
                setFiles([...files, ...newFiles]);
              }}
            />
          </label>

          <p className="mt-4 font-['JetBrains_Mono'] text-[11px] font-semibold text-[#A5B4BF]">
            PDF, DOCX, PPTX, ZIP •{" "}
            {lang === "ar"
              ? "الحد الأقصى 50 ميغابايت لكل ملف"
              : "Max 50MB per file"}
          </p>
        </div>

        {/* Selected Files List */}
        {files.length > 0 && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] shadow-md">
            <div className="border-b border-white/[0.06] px-4 py-3 text-xs font-bold text-[#A5B4BF]">
              {lang === "ar"
                ? `الملفات الجاهزة للرفع (${files.length})`
                : `Files ready to upload (${files.length})`}
            </div>

            <div className="divide-y divide-white/[0.06]">
              {files.map((name, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-white/[0.04]"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <FileText className="h-4 w-4 text-[#7DA49F] shrink-0" />
                    <span className="truncate text-xs font-bold text-[#F8FAFC]">
                      {name}
                    </span>
                  </div>

                  <button
                    onClick={() => setFiles(files.filter((_, j) => j !== i))}
                    className="rounded-lg p-1 text-red-400 hover:bg-red-500/10 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-white/[0.06] p-3">
              <button
                onClick={() => {
                  alert(lang === "ar" ? "تم رفع الملفات بنجاح!" : "Files uploaded successfully!");
                  setFiles([]);
                }}
                className="w-full rounded-xl bg-[#7DA49F] py-2.5 text-sm font-black text-[#1E2638] shadow-md transition-all hover:bg-[#9DBFB8] hover:scale-[1.01] active:scale-95 cursor-pointer"
              >
                {lang === "ar"
                  ? `تأكيد ورفع ${files.length} ملف`
                  : `Confirm & Upload ${files.length} file${files.length > 1 ? "s" : ""}`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
