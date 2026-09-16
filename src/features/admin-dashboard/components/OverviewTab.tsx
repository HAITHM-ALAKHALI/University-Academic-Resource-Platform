import type { ReactNode } from "react";
import {
  FolderOpen,
  BookOpen,
  FileText,
  Users,
  Upload,
  FileSpreadsheet,
  Trash2,
  TrendingUp,
} from "lucide-react";
import type { Lang } from "../../../types/app";
import { t, courses, recentActivity } from "../../../data";

export interface OverviewTabProps {
  tx: (typeof t)["en"];
  lang: Lang;
}

const activityTypeBadge: Record<
  string,
  { icon: ReactNode; bg: string; text: string }
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
};

function StatCard({
  icon,
  value,
  label,
  color,
  subtext,
}: {
  icon: ReactNode;
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

export function OverviewTab({ tx, lang }: OverviewTabProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Main Column */}
      <div className="space-y-6 lg:col-span-2">
        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StatCard
            icon={<FolderOpen className="h-6 w-6" />}
            value="640"
            label={tx.admin.totalDepartments}
            color="#899C9A"
            subtext="+5 أقسام"
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

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
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
                type="button"
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
                    <button
                      type="button"
                      className="flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/15 px-2.5 py-1 text-xs font-bold text-red-300 transition-colors hover:bg-red-500/25 cursor-pointer"
                    >
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
            const badge =
              activityTypeBadge[item.type] || activityTypeBadge.upload;
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

export default OverviewTab;
