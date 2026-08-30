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
    bg: "bg-[#525C79] text-[#F4F7F6] border border-[#6E7C8B]/40",
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
          ? "bg-[#35425E] text-[#F4F7F6]"
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
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#525C79] via-[#35425E] to-[#899C9A] text-[#F4F7F6] shadow-md shadow-[#35425E]/40 border border-[#899C9A]/40">
                <Sparkles className="h-5 w-5" />
              </div>
              <h1 className="font-['Outfit'] text-2xl font-black tracking-tight text-[#F4F7F6] sm:text-3xl">
                {tx.admin.title}
              </h1>
            </div>
            <p className="mt-1 text-sm font-semibold text-[#AABCAF]">
              {tx.admin.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTab("upload")}
              className="flex items-center gap-2 rounded-xl bg-[#899C9A] px-4 py-2.5 text-sm font-bold text-[#1D263B] shadow-md shadow-[#35425E]/40 transition-all hover:bg-[#AABCAF] hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <Upload className="h-4 w-4" />
              <span>{tx.admin.uploadResource}</span>
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div className="mb-8 flex items-center gap-1.5 overflow-x-auto rounded-2xl border border-[#6E7C8B]/40 bg-[#525C79]/85 p-1.5 backdrop-blur-xl shadow-md">
          {adminTabs.map((key, i) => {
            const isActive = tab === key;
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#35425E] text-[#F4F7F6] shadow-sm border border-[#899C9A]/50"
                    : "text-[#AABCAF] hover:bg-white/[0.06] hover:text-[#F4F7F6]"
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
    <div className="group relative overflow-hidden rounded-2xl border border-[#6E7C8B]/40 bg-[#525C79]/85 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#899C9A] hover:bg-[#525C79] hover:shadow-xl">
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
          <span className="flex items-center gap-1 rounded-full bg-[#899C9A]/20 px-2.5 py-0.5 text-[11px] font-bold text-[#F4F7F6] border border-[#899C9A]/40">
            <TrendingUp className="h-3 w-3 text-[#899C9A]" />
            {subtext}
          </span>
        )}
      </div>

      <div className="mt-4">
        <div className="font-['Outfit'] text-2xl font-black tracking-tight text-[#F4F7F6] sm:text-3xl">
          {value}
        </div>
        <div className="mt-1 text-xs font-semibold text-[#AABCAF]">
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
        <div className="rounded-2xl border border-[#6E7C8B]/40 bg-[#525C79]/85 p-6 shadow-lg backdrop-blur-xl">
          <h3 className="font-['Outfit'] text-base font-bold text-[#F4F7F6]">
            {tx.admin.quickActions}
          </h3>
          <p className="mt-0.5 text-xs font-medium text-[#AABCAF]">
            روابط وإجراءات سريعة لتسهيل إدارة المنصة
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              {
                label: tx.admin.addUniversity,
                icon: <Building2 className="h-5 w-5" />,
                color: "#899C9A",
              },
              {
                label: tx.admin.addCourse,
                icon: <BookOpen className="h-5 w-5" />,
                color: "#AABCAF",
              },
              {
                label: tx.admin.uploadResource,
                icon: <Upload className="h-5 w-5" />,
                color: "#899C9A",
              },
              {
                label: tx.admin.manageFiles,
                icon: <FileSpreadsheet className="h-5 w-5" />,
                color: "#AABCAF",
              },
            ].map((action) => (
              <button
                key={action.label}
                className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-[#6E7C8B]/40 bg-[#35425E]/70 p-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-[#899C9A] hover:bg-[#35425E] active:scale-95 cursor-pointer shadow-sm"
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
                <span className="text-xs font-bold text-[#F4F7F6] group-hover:text-[#AABCAF]">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* File Management Table */}
        <div className="overflow-hidden rounded-2xl border border-[#6E7C8B]/40 bg-[#525C79]/85 shadow-lg backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-[#6E7C8B]/40 px-6 py-4">
            <div>
              <h3 className="font-['Outfit'] text-base font-bold text-[#F4F7F6]">
                {tx.admin.manageFiles}
              </h3>
              <p className="text-xs font-semibold text-[#AABCAF]">
                {lang === "ar"
                  ? "أحدث الملفات المرفوعة على المنصة"
                  : "Latest files uploaded across courses"}
              </p>
            </div>
            <span className="font-['JetBrains_Mono'] rounded-md bg-[#35425E] px-2.5 py-1 text-xs font-bold text-[#AABCAF] border border-[#6E7C8B]/40">
              {lang === "ar" ? "آخر 5 ملفات" : "Last 5 files"}
            </span>
          </div>

          <div className="divide-y divide-[#6E7C8B]/30">
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
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#899C9A]/20 text-[#899C9A] border border-[#899C9A]/30">
                      <FileText className="h-4 w-4" />
                    </div>
                    <span className="truncate text-sm font-bold text-[#F4F7F6]">
                      {f.name}
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <span className="font-['JetBrains_Mono'] text-xs font-semibold text-[#AABCAF]">
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
      <div className="rounded-2xl border border-[#6E7C8B]/40 bg-[#525C79]/85 shadow-lg backdrop-blur-xl">
        <div className="border-b border-[#6E7C8B]/40 px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="font-['Outfit'] text-base font-bold text-[#F4F7F6]">
              {tx.admin.recentActivity}
            </h3>
            <span className="flex items-center gap-1 text-[11px] font-bold text-[#899C9A]">
              <span className="h-2 w-2 rounded-full bg-[#899C9A] animate-pulse" />
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
                className="flex items-start gap-3 rounded-xl border border-[#6E7C8B]/30 bg-[#35425E]/60 p-3 transition-all hover:bg-[#35425E]"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${badge.bg}`}
                >
                  {badge.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs font-bold text-[#F4F7F6]">
                      {item.user}
                    </span>
                    <span className="font-['JetBrains_Mono'] shrink-0 text-[10px] font-medium text-[#AABCAF]">
                      {lang === "ar" ? item.timeAr : item.time}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs font-medium text-[#AABCAF] leading-relaxed">
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
          <h2 className="text-lg font-bold text-[#F4F7F6]">
            {lang === "ar" ? "إدارة الجامعات" : "Manage Universities"}
          </h2>
          <p className="text-xs font-semibold text-[#AABCAF]">
            {lang === "ar"
              ? "عرض وتعديل بيانات الجامعات الشريكة"
              : "View and manage partner university records"}
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-[#899C9A] px-4 py-2.5 text-sm font-black text-[#1D263B] shadow-md transition-all hover:bg-[#AABCAF] hover:scale-[1.02] active:scale-95 cursor-pointer">
          <Plus className="h-4 w-4" />
          <span>{tx.admin.addUniversity}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {universities.map((u) => (
          <div
            key={u.id}
            className="group relative overflow-hidden rounded-2xl border border-[#6E7C8B]/40 bg-[#525C79]/85 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#899C9A] hover:bg-[#525C79] hover:shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#899C9A]/20 text-[#899C9A] border border-[#899C9A]/30 font-mono text-xl">
                🏛
              </div>
              <span className="font-['JetBrains_Mono'] rounded-full bg-[#35425E] px-2.5 py-1 text-[11px] font-bold text-[#AABCAF] border border-[#6E7C8B]/40">
                ID-{u.id.toString().padStart(3, "0")}
              </span>
            </div>

            <div className="mt-4">
              <h3 className="font-['Outfit'] text-base font-bold text-[#F4F7F6] group-hover:text-[#AABCAF] transition-colors">
                {lang === "ar" ? u.nameAr : u.name}
              </h3>
              <p className="mt-0.5 text-xs font-semibold text-[#AABCAF]">
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
                  className="rounded-xl border border-[#6E7C8B]/30 bg-[#35425E]/70 p-2.5"
                >
                  <div className="font-['Outfit'] text-sm font-extrabold text-[#F4F7F6]">
                    {stat.val}
                  </div>
                  <div className="mt-0.5 text-[10px] font-semibold text-[#AABCAF]">
                    {stat.lbl}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex gap-2 pt-3 border-t border-[#6E7C8B]/30">
              <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#6E7C8B]/40 bg-[#35425E]/80 py-2 text-xs font-bold text-[#F4F7F6] transition-colors hover:bg-[#35425E] hover:border-[#899C9A] cursor-pointer">
                <Edit3 className="h-3.5 w-3.5 text-[#899C9A]" />
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
          <h2 className="text-lg font-bold text-[#F4F7F6]">
            {lang === "ar" ? "إدارة المقررات الدراسية" : "Manage Courses"}
          </h2>
          <p className="text-xs font-semibold text-[#AABCAF]">
            {lang === "ar"
              ? "عرض تفاصيل المقررات والمحتوى المتاح"
              : "Overview of courses, instructors, and resource count"}
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-[#899C9A] px-4 py-2.5 text-sm font-black text-[#1D263B] shadow-md transition-all hover:bg-[#AABCAF] hover:scale-[1.02] active:scale-95 cursor-pointer">
          <Plus className="h-4 w-4" />
          <span>{tx.admin.addCourse}</span>
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#6E7C8B]/40 bg-[#525C79]/85 shadow-lg backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="border-b border-[#6E7C8B]/40 bg-[#35425E]/90 text-xs font-bold text-[#AABCAF] uppercase tracking-wider">
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
            <tbody className="divide-y divide-[#6E7C8B]/30 font-normal">
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
                    <td className="px-6 py-4 font-bold text-[#F4F7F6] whitespace-nowrap">
                      {info.name}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-[#AABCAF] whitespace-nowrap">
                      {info.instructor}
                    </td>
                    <td className="px-6 py-4 font-['JetBrains_Mono'] text-xs font-medium text-[#AABCAF] whitespace-nowrap">
                      {info.level.split("·")[0].trim()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 font-['Outfit'] font-bold text-[#F4F7F6]">
                        <FileText className="h-3.5 w-3.5 text-[#899C9A]" />
                        {c.resourceCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button className="flex items-center gap-1 rounded-lg border border-[#6E7C8B]/40 bg-[#35425E]/80 px-2.5 py-1 text-xs font-bold text-[#F4F7F6] transition-colors hover:bg-[#35425E] hover:border-[#899C9A] cursor-pointer">
                          <Edit3 className="h-3.5 w-3.5 text-[#899C9A]" />
                          <span>{lang === "ar" ? "تعديل" : "Edit"}</span>
                        </button>
                        <button className="flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/15 px-2.5 py-1 text-xs font-bold text-red-300 transition-colors hover:bg-red-500/25 cursor-pointer">
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
          <h2 className="text-lg font-bold text-[#F4F7F6]">
            {lang === "ar" ? "الموارد والملفات الأكاديمية" : "Academic Resources"}
          </h2>
          <p className="text-xs font-semibold text-[#AABCAF]">
            {lang === "ar"
              ? "قائمة بالملفات والمحاضرات المرفوعة عبر جميع المواد"
              : "All academic files and slides uploaded to the system"}
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-[#899C9A] px-4 py-2.5 text-sm font-black text-[#1D263B] shadow-md transition-all hover:bg-[#AABCAF] hover:scale-[1.02] active:scale-95 cursor-pointer">
          <Upload className="h-4 w-4" />
          <span>{tx.admin.uploadResource}</span>
        </button>
      </div>

      <div className="space-y-3">
        {allResources.map((r, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-2xl border border-[#6E7C8B]/40 bg-[#525C79]/85 p-4 shadow-md backdrop-blur-xl transition-all duration-200 hover:border-[#899C9A] hover:bg-[#525C79]"
          >
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${r.color}25`, color: r.color }}
            >
              <FileText className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-[#F4F7F6]">
                {r.name}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#AABCAF]">
                <span
                  className="font-['JetBrains_Mono'] font-bold text-[#F4F7F6]"
                >
                  {r.code}
                </span>
                <span>•</span>
                <span>{r.course}</span>
                <span>•</span>
                <span className="rounded-md bg-[#35425E] px-2 py-0.5 text-[10px] font-bold text-[#AABCAF] border border-[#6E7C8B]/40">
                  {r.type}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#F4F7F6]">
                  {r.size}
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] font-medium text-[#AABCAF]">
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
      <div className="rounded-2xl border border-[#6E7C8B]/40 bg-[#525C79]/85 p-6 shadow-xl backdrop-blur-xl sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#525C79] via-[#35425E] to-[#899C9A] text-[#F4F7F6] shadow-md shadow-[#35425E]/40 border border-[#899C9A]/40">
            <Upload className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-['Outfit'] text-lg font-bold text-[#F4F7F6]">
              {tx.admin.uploadResource}
            </h3>
            <p className="text-xs font-semibold text-[#AABCAF]">
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
              <label className="block text-xs font-bold text-[#AABCAF] mb-1.5">
                {field.label}
              </label>
              <select className="w-full rounded-xl border border-[#6E7C8B]/40 bg-[#35425E] px-3.5 py-2.5 text-sm text-[#F4F7F6] outline-none transition-all focus:border-[#899C9A] focus:ring-2 focus:ring-[#899C9A]/25 cursor-pointer">
                <option value="">{lang === "ar" ? "اختر..." : "Select..."}</option>
                {field.options.map((o) => (
                  <option key={o} value={o}>
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
              ? "border-[#899C9A] bg-[#899C9A]/10 scale-[1.01]"
              : "border-[#6E7C8B]/40 bg-[#35425E]/60 hover:border-[#899C9A] hover:bg-[#35425E]"
          }`}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#899C9A]/20 text-[#899C9A] border border-[#899C9A]/30 mb-3">
            <Upload className="h-7 w-7" />
          </div>
          <p className="font-['Outfit'] text-base font-bold text-[#F4F7F6]">
            {lang === "ar"
              ? "اسحب وأفلت الملفات هنا"
              : "Drag & drop your files here"}
          </p>
          <p className="mt-1 text-xs font-semibold text-[#AABCAF]">
            {lang === "ar"
              ? "أو اضغط لتصفح ملفات جهازك"
              : "or click the button below to browse"}
          </p>

          <label className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#899C9A] px-5 py-2.5 text-xs font-black text-[#1D263B] shadow-md transition-all hover:bg-[#AABCAF] hover:scale-[1.02] active:scale-95 cursor-pointer">
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

          <p className="mt-4 font-['JetBrains_Mono'] text-[11px] font-semibold text-[#AABCAF]">
            PDF, DOCX, PPTX, ZIP •{" "}
            {lang === "ar"
              ? "الحد الأقصى 50 ميغابايت لكل ملف"
              : "Max 50MB per file"}
          </p>
        </div>

        {/* Selected Files List */}
        {files.length > 0 && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#6E7C8B]/40 bg-[#35425E] shadow-md">
            <div className="border-b border-[#6E7C8B]/30 px-4 py-3 text-xs font-bold text-[#AABCAF]">
              {lang === "ar"
                ? `الملفات الجاهزة للرفع (${files.length})`
                : `Files ready to upload (${files.length})`}
            </div>

            <div className="divide-y divide-[#6E7C8B]/30">
              {files.map((name, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-white/[0.04]"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <FileText className="h-4 w-4 text-[#899C9A] shrink-0" />
                    <span className="truncate text-xs font-bold text-[#F4F7F6]">
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

            <div className="border-t border-[#6E7C8B]/30 p-3">
              <button
                onClick={() => {
                  alert(lang === "ar" ? "تم رفع الملفات بنجاح!" : "Files uploaded successfully!");
                  setFiles([]);
                }}
                className="w-full rounded-xl bg-[#899C9A] py-2.5 text-sm font-black text-[#1D263B] shadow-md transition-all hover:bg-[#AABCAF] hover:scale-[1.01] active:scale-95 cursor-pointer"
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
