import type { ReactNode } from "react";
import {
  Download,
  ExternalLink,
  Video,
  Code2,
  CheckCircle2,
  Clock,
  Eye,
  FileQuestion,
  RotateCcw,
  GraduationCap,
} from "lucide-react";
import type {
  ResourceType,
  CourseResource,
  Doctor,
} from "../../../types/academic";
import { initialDoctors } from "../../../constants/academicData";

export interface ResourceItemListProps {
  activeTab: ResourceType;
  resources: CourseResource[];
  activeDoctor?: Doctor;
  onResetDoctorFilter: () => void;
}

export function ResourceItemList({
  activeTab,
  resources,
  activeDoctor,
  onResetDoctorFilter,
}: ResourceItemListProps) {
  if (resources.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-[#A5B4BF] border border-white/[0.06]">
          <FileQuestion className="h-6 w-6" />
        </div>
        <h3 className="text-sm font-bold text-[#F8FAFC]">
          لا توجد ملفات في هذا القسم
          {activeDoctor ? ` لـ ${activeDoctor.name}` : ""}
        </h3>
        <p className="mt-1 text-xs text-[#A5B4BF] max-w-sm mx-auto">
          {activeDoctor
            ? `لم يقم ${activeDoctor.name} برفع ملفات في هذا التصنيف بعد، يمكنك تصفح مصادر باقي المدرسين.`
            : "لم يتم رفع ملفات في هذا التصنيف بعد للمقرر الدراسي."}
        </p>
        {activeDoctor && (
          <button
            type="button"
            onClick={onResetDoctorFilter}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#7DA49F]/40 bg-[#7DA49F]/15 px-4 py-2 text-xs font-bold text-[#F8FAFC] transition-all hover:bg-[#7DA49F]/25 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5 text-[#7DA49F]" />
            <span>عرض جميع ملفات المادة</span>
          </button>
        )}
      </div>
    );
  }

  const FileRow = ({
    icon,
    iconBg,
    iconColor,
    name,
    meta,
    doctorName,
    extra,
  }: {
    icon: string;
    iconBg: string;
    iconColor: string;
    name: string;
    meta: string;
    doctorName?: string;
    extra?: ReactNode;
  }) => (
    <div className="group flex items-center justify-between gap-4 rounded-xl border border-transparent p-3.5 transition-all duration-200 hover:border-white/[0.08] hover:bg-white/[0.04] cursor-pointer">
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-transform group-hover:scale-105 shadow-sm"
          style={{ background: iconBg, color: iconColor }}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="truncate text-sm font-bold text-[#F8FAFC] group-hover:text-[#9DBFB8] transition-colors">
            {name}
          </h4>
          <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#A5B4BF]">
            <span>{meta}</span>
            {doctorName && (
              <>
                <span>·</span>
                <span className="flex items-center gap-1 text-[#7DA49F]">
                  <GraduationCap className="h-3 w-3" />
                  <span>{doctorName}</span>
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        {extra}
        <button
          type="button"
          title="تحميل الملف"
          onClick={(e) => {
            e.stopPropagation();
            alert(`جاري تحميل: ${name}`);
          }}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#7DA49F]/30 bg-[#7DA49F]/10 text-[#F8FAFC] transition-all hover:bg-[#7DA49F]/25 hover:border-[#7DA49F]/50 active:scale-95 cursor-pointer"
        >
          <Download className="h-4 w-4 text-[#7DA49F]" />
        </button>
      </div>
    </div>
  );

  switch (activeTab) {
    case "lectures":
      return (
        <div className="divide-y divide-white/[0.06]">
          {resources.map((item) => {
            const doc = initialDoctors.find((d) => d.id === item.doctorId);
            return (
              <FileRow
                key={item.id}
                icon="📄"
                iconBg="rgba(125, 164, 159, 0.12)"
                iconColor="#7DA49F"
                name={item.name}
                meta={`${item.size || "2.5 MB"} · ${item.date || "2024-01-15"}`}
                doctorName={!activeDoctor ? doc?.name : undefined}
              />
            );
          })}
        </div>
      );

    case "books":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {resources.map((b) => {
            const doc = initialDoctors.find((d) => d.id === b.doctorId);
            return (
              <div
                key={b.id}
                className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 shadow-sm transition-all hover:border-white/[0.15] hover:bg-[#3B4868]"
              >
                <div className="flex h-14 w-12 shrink-0 items-center justify-center rounded-lg bg-[#242D42] text-2xl shadow border border-white/[0.06]">
                  {b.cover || "📘"}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="truncate text-sm font-bold text-[#F8FAFC]">
                    {b.name}
                  </h4>
                  <p className="text-xs font-semibold text-[#A5B4BF] mt-0.5">
                    {b.author || "مرجع أكاديمي"}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-[#7A8A9B]">
                    {b.edition && <span>الطبعة {b.edition}</span>}
                    {b.pages && <span>· {b.pages} صفحة</span>}
                    {b.size && <span>· {b.size}</span>}
                    {!activeDoctor && doc && (
                      <span className="text-[#7DA49F] font-bold">
                        · {doc.name}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  title="تحميل الكتاب"
                  onClick={() => alert(`جاري تحميل: ${b.name}`)}
                  className="rounded-lg border border-[#7DA49F]/25 bg-[#7DA49F]/10 p-2 text-[#7DA49F] hover:bg-[#7DA49F]/20 transition-colors cursor-pointer shrink-0"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      );

    case "exams":
      return (
        <div className="divide-y divide-white/[0.06]">
          {resources.map((e) => {
            const doc = initialDoctors.find((d) => d.id === e.doctorId);
            return (
              <FileRow
                key={e.id}
                icon="📋"
                iconBg="rgba(139, 126, 192, 0.12)"
                iconColor="#8B7EC0"
                name={e.name}
                meta={`${e.size || "1.5 MB"} · سنة ${e.year || 2024} · ${
                  e.examType || "امتحان"
                }`}
                doctorName={!activeDoctor ? doc?.name : undefined}
                extra={
                  e.withSolution && (
                    <span className="flex items-center gap-1 rounded-md bg-[#5BAA8E]/15 px-2 py-0.5 text-[10px] font-bold text-[#9DBFB8] border border-[#5BAA8E]/30">
                      <CheckCircle2 className="h-3 w-3 text-[#5BAA8E]" />
                      <span>مع الحل</span>
                    </span>
                  )
                }
              />
            );
          })}
        </div>
      );

    case "videos":
      return (
        <div className="divide-y divide-white/[0.06]">
          {resources.map((v) => (
            <div
              key={v.id}
              className="flex items-center justify-between gap-4 p-3.5 transition-colors hover:bg-white/[0.03] rounded-xl cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/15 text-red-400 text-sm border border-red-500/25">
                  <Video className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-sm font-bold text-[#F8FAFC]">
                    {v.name}
                  </h4>
                  <div className="mt-0.5 flex items-center gap-2 text-xs font-semibold text-[#A5B4BF]">
                    {v.duration && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {v.duration}
                      </span>
                    )}
                    {v.views && (
                      <>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {v.views}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert(`فتح المقطع: ${v.name}`)}
                className="flex items-center gap-1 rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-300 hover:bg-red-500/20 transition-colors cursor-pointer"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>مشاهدة</span>
              </button>
            </div>
          ))}
        </div>
      );

    case "projects":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {resources.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 shadow-sm transition-all hover:border-white/[0.15] hover:bg-[#3B4868]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6B8EC7]/15 text-[#6B8EC7] border border-[#6B8EC7]/30">
                    <Code2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#F8FAFC]">
                      {p.name}
                    </h4>
                    <span className="text-[11px] font-semibold text-[#A5B4BF]">
                      {p.grade || "مشروع فصلي"}
                    </span>
                  </div>
                </div>
              </div>
              {p.desc && (
                <p className="mt-3 text-xs font-medium text-[#A5B4BF] leading-relaxed">
                  {p.desc}
                </p>
              )}
              {p.tech && (
                <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.06]">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-[#242D42] px-2 py-0.5 font-['JetBrains_Mono'] text-[10px] font-bold text-[#A5B4BF] border border-white/[0.06]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      );

    case "external":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              id: 1,
              title: "Learn Programming — GeeksForGeeks",
              url: "geeksforgeeks.org",
              icon: "🌐",
            },
            {
              id: 2,
              title: "Tutorials & References — W3Schools",
              url: "w3schools.com",
              icon: "📚",
            },
          ].map((res) => (
            <div
              key={res.id}
              className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3.5 transition-all hover:border-white/[0.15] hover:bg-[#3B4868] cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#7DA49F]/15 text-[#7DA49F]">
                  {res.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-xs font-bold text-[#F8FAFC]">
                    {res.title}
                  </h4>
                  <p className="truncate text-[11px] font-medium text-[#7A8A9B]">
                    {res.url}
                  </p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-[#7DA49F]" />
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}

export default ResourceItemList;
