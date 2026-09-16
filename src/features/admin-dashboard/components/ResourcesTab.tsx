import { Upload, FileText, Trash2 } from "lucide-react";
import type { Lang } from "../../../types/app";
import { t, courses } from "../../../data";

export interface ResourcesTabProps {
  tx: (typeof t)["en"];
  lang: Lang;
}

export function ResourcesTab({ tx, lang }: ResourcesTabProps) {
  const allResources = courses
    .flatMap((c) =>
      c.resources.lectures.map((r) => ({
        ...r,
        course: lang === "ar" ? c.ar.name : c.en.name,
        code: c.code,
        color: c.color,
        type: lang === "ar" ? "محاضرة" : "Lecture",
      }))
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

        <button
          type="button"
          className="flex items-center gap-2 rounded-xl bg-[#7DA49F] px-4 py-2.5 text-sm font-black text-[#1E2638] shadow-md transition-all hover:bg-[#9DBFB8] hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
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
                <span className="font-['JetBrains_Mono'] font-bold text-[#F8FAFC]">
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

              <button
                type="button"
                className="flex items-center gap-1 rounded-xl border border-red-500/30 bg-red-500/15 px-3 py-1.5 text-xs font-bold text-red-300 transition-colors hover:bg-red-500/25 cursor-pointer"
              >
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

export default ResourcesTab;
