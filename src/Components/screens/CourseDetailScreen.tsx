import { useState, useMemo, memo } from "react";
import {
  Download,
  ExternalLink,
  Video,
  Code2,
  CheckCircle2,
  Eye,
  Clock,
  ArrowRight,
  GraduationCap,
  Mail,
  Phone,
  UserCheck,
  RotateCcw,
  FileQuestion,
} from "lucide-react";
import type { NavState } from "../StudentApp";
import TopBar from "../TopBar";
import {
  initialCourses,
  initialDoctors,
  initialCourseResources,
} from "../../data/academicData";
import type { ResourceType } from "../../types/academic";

interface Props {
  nav: NavState;
  navigate: (s: NavState) => void;
}

const tabDefs: { id: ResourceType; label: string; icon: string }[] = [
  { id: "lectures", label: "المحاضرات", icon: "📄" },
  { id: "books", label: "الكتب والمراجع", icon: "📕" },
  { id: "exams", label: "الامتحانات السابقة", icon: "📋" },
  { id: "videos", label: "المقاطع والشروحات", icon: "🎬" },
  { id: "projects", label: "المشاريع والواجبات", icon: "🗂" },
  { id: "external", label: "مصادر خارجية", icon: "🌐" },
];

export default function CourseDetailScreen({ nav, navigate }: Props) {
  const [activeTab, setActiveTab] = useState<ResourceType>("lectures");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | undefined>(
    nav.doctorId
  );

  // Identify course
  const currentCourseId = nav.course?.id || 1;
  const currentCourse = useMemo(() => {
    return (
      initialCourses.find((c) => c.id === currentCourseId) || {
        id: currentCourseId,
        name: nav.course?.name || "برمجة 1",
        nameEn: nav.course?.nameEn || "Programming 1",
        color: nav.course?.color || "#6B8EC7",
        code: "CS 101",
        rating: 4.8,
        files: 32,
        doctorIds: ["doc-1", "doc-2"],
        department: "علوم حاسوب",
        level: "السنة الأولى",
        semester: "الترم الأول",
      }
    );
  }, [currentCourseId, nav.course]);

  // Find all doctors teaching this course
  const courseDoctors = useMemo(() => {
    return initialDoctors.filter(
      (doc) =>
        currentCourse.doctorIds?.includes(doc.id) ||
        doc.assignedCourseIds?.includes(currentCourse.id)
    );
  }, [currentCourse]);

  // Current active doctor (if any)
  const activeDoctor = useMemo(() => {
    if (!selectedDoctorId) return undefined;
    return initialDoctors.find((d) => d.id === selectedDoctorId);
  }, [selectedDoctorId]);

  // All resources for this course
  const courseAllResources = useMemo(() => {
    return initialCourseResources.filter((r) => r.courseId === currentCourse.id);
  }, [currentCourse.id]);

  // Filtered resources based on selected doctor
  const displayedResources = useMemo(() => {
    if (!selectedDoctorId) {
      return courseAllResources;
    }
    return courseAllResources.filter((r) => r.doctorId === selectedDoctorId);
  }, [courseAllResources, selectedDoctorId]);

  // Resources for the current active tab
  const tabResources = useMemo(() => {
    return displayedResources.filter((r) => r.type === activeTab);
  }, [displayedResources, activeTab]);

  // Calculate dynamic tab counts
  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    tabDefs.forEach((t) => {
      counts[t.id] = displayedResources.filter((r) => r.type === t.id).length;
    });
    return counts;
  }, [displayedResources]);

  const breadcrumbsList = [
    { label: "الرئيسية", onClick: () => navigate({ screen: "home" }) },
    ...(nav.department?.name
      ? [
          {
            label: nav.department.name,
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
    {
      label: nav.course?.name || currentCourse.name,
      onClick: () => setSelectedDoctorId(undefined),
    },
    ...(activeDoctor ? [{ label: activeDoctor.name }] : []),
  ];

  const subtitleText = [
    currentCourse.nameEn,
    currentCourse.code,
    currentCourse.department,
  ]
    .filter(Boolean)
    .join(" · ");

  // File row component
  const FileRow = memo(function FileRow({
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
    extra?: React.ReactNode;
  }) {
    return (
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
  });

  const renderContent = () => {
    if (tabResources.length === 0) {
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
              onClick={() => setSelectedDoctorId(undefined)}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#7DA49F]/40 bg-[#7DA49F]/15 px-4 py-2 text-xs font-bold text-[#F8FAFC] transition-all hover:bg-[#7DA49F]/25 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5 text-[#7DA49F]" />
              <span>عرض جميع ملفات المادة</span>
            </button>
          )}
        </div>
      );
    }

    switch (activeTab) {
      case "lectures":
        return (
          <div className="divide-y divide-white/[0.06]">
            {tabResources.map((item) => {
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
            {tabResources.map((b) => {
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
            {tabResources.map((e) => {
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
            {tabResources.map((v) => (
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
            {tabResources.map((p) => (
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
  };

  return (
    <div className="w-full">
      <TopBar breadcrumbs={breadcrumbsList} />

      <div className="mx-auto max-w-7xl p-6 sm:p-8 space-y-6">
        {/* Navigation & Header Actions: Back to Courses Button */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate({ ...nav, screen: "courses" })}
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#323D59] px-4 py-2 text-xs sm:text-sm font-bold text-[#F8FAFC] shadow-sm transition-all hover:bg-[#3B4868] hover:border-white/20 active:scale-95 cursor-pointer"
          >
            <ArrowRight className="h-4 w-4 text-[#7DA49F]" />
            <span>العودة للمواد الدراسية</span>
          </button>

          {/* Quick Doctor Switcher Chips Header */}
          {courseDoctors.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-[#A5B4BF] ml-1">
                تصفية حسب الدكتور:
              </span>
              <button
                type="button"
                onClick={() => setSelectedDoctorId(undefined)}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                  !selectedDoctorId
                    ? "bg-[#7DA49F] text-[#1E2638] shadow-sm"
                    : "bg-[#323D59] text-[#A5B4BF] hover:bg-[#3B4868] hover:text-[#F8FAFC] border border-white/[0.06]"
                }`}
              >
                جميع المحاضرين
              </button>
              {courseDoctors.map((doc) => {
                const isSelected = selectedDoctorId === doc.id;
                return (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => setSelectedDoctorId(doc.id)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-[#7DA49F] text-[#1E2638] shadow-sm font-extrabold"
                        : "bg-[#323D59] text-[#A5B4BF] hover:bg-[#3B4868] hover:text-[#F8FAFC] border border-white/[0.06]"
                    }`}
                  >
                    <span>{doc.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Course Title Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-[#F8FAFC]">
              {nav.course?.name || currentCourse.name}
            </h1>
            {currentCourse.code && (
              <span className="font-['JetBrains_Mono'] rounded-lg bg-[#7DA49F]/15 px-2.5 py-0.5 text-xs font-bold text-[#7DA49F] border border-[#7DA49F]/25">
                {currentCourse.code}
              </span>
            )}
          </div>
          <p className="text-sm font-medium text-[#A5B4BF]">{subtitleText}</p>
        </div>

        {/* ACTIVE DOCTOR INDICATOR BANNER */}
        {activeDoctor ? (
          <div className="relative overflow-hidden rounded-2xl border border-[#7DA49F]/35 bg-gradient-to-r from-[#323D59] via-[#323D59]/90 to-[#242D42] p-5 shadow-xl">
            <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-[#7DA49F]/10 blur-2xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Doctor Avatar Badge */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#7DA49F]/30 to-[#9DBFB8]/20 text-[#F8FAFC] border border-[#7DA49F]/40 shadow-inner">
                  <span className="text-lg font-black text-[#7DA49F]">
                    {activeDoctor.name.replace("د. ", "").charAt(0)}
                  </span>
                </div>

                {/* Doctor Info */}
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="rounded-md bg-[#7DA49F]/20 px-2 py-0.5 text-[10px] font-bold text-[#9DBFB8] border border-[#7DA49F]/30">
                      مدرس المادة
                    </span>
                    <span className="text-xs font-bold text-[#A5B4BF]">
                      {activeDoctor.academicTitle} · قسم {activeDoctor.department}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-black text-[#F8FAFC] mt-0.5">
                    تدريس: {activeDoctor.name}
                  </h2>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#A5B4BF]">
                    <span className="flex items-center gap-1.5 font-['JetBrains_Mono']">
                      <Mail className="h-3.5 w-3.5 text-[#7DA49F]" />
                      <span>{activeDoctor.email}</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1.5 font-['JetBrains_Mono']" dir="ltr">
                      <Phone className="h-3.5 w-3.5 text-[#7DA49F]" />
                      <span>{activeDoctor.phone}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Reset Filter Button */}
              <div className="shrink-0 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDoctorId(undefined)}
                  className="flex items-center gap-2 rounded-xl border border-white/[0.1] bg-[#242D42]/80 px-3.5 py-2 text-xs font-bold text-[#A5B4BF] transition-all hover:bg-white/[0.08] hover:text-[#F8FAFC] cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5 text-[#7DA49F]" />
                  <span>إلغاء التصفية (عرض الكل)</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-[#323D59]/60 px-5 py-3 text-xs">
            <div className="flex items-center gap-2 text-[#A5B4BF]">
              <UserCheck className="h-4 w-4 text-[#7DA49F]" />
              <span>
                يتم حالياً عرض <strong>جميع الموارد والملفات</strong> لكافة
                مدرسي المادة ({courseDoctors.map((d) => d.name).join("، ")}).
              </span>
            </div>
            <span className="text-[11px] font-bold text-[#7DA49F]">
              اختر دكتوراً من الأعلى لعرض ملفاته الخاصة
            </span>
          </div>
        )}

        {/* Tabbed Navigation and File Lists */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Tab Sidebar */}
          <aside className="w-full md:w-60 shrink-0 rounded-2xl border border-white/[0.07] bg-[#323D59] p-2.5 h-fit shadow-lg">
            <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
              {tabDefs.map((tab) => {
                const isActive = activeTab === tab.id;
                const count = tabCounts[tab.id] || 0;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-right text-xs sm:text-sm font-bold transition-all cursor-pointer border-0 ${
                      isActive
                        ? "bg-[#3B4868] text-[#F8FAFC] shadow-sm border border-[#7DA49F]/40"
                        : "bg-transparent text-[#A5B4BF] hover:bg-white/[0.05] hover:text-[#F8FAFC]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span>{tab.icon}</span>
                      <span>{tab.label}</span>
                    </div>
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                        isActive
                          ? "bg-[#7DA49F] text-[#1E2638]"
                          : "bg-white/[0.06] text-[#A5B4BF] border border-white/[0.06]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Content Area */}
          <main className="flex-1 min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#F8FAFC]">
                  {tabDefs.find((t) => t.id === activeTab)?.label}
                </h2>
                <p className="text-xs font-semibold text-[#A5B4BF]">
                  {activeDoctor
                    ? `الملفات الخاصة بـ ${activeDoctor.name}`
                    : `جميع ملفات ${nav.course?.name || currentCourse.name}`}
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => alert("جاري تجهيز حزمة الملفات للتحميل...")}
                  className="flex items-center gap-1.5 rounded-xl border border-[#7DA49F]/30 bg-[#323D59] px-3.5 py-2 text-xs font-bold text-[#F8FAFC] transition-all hover:bg-[#3B4868] hover:border-[#7DA49F]/50 cursor-pointer shadow-sm active:scale-95"
                >
                  <Download className="h-3.5 w-3.5 text-[#7DA49F]" />
                  <span>تحميل كل ملفات هذا القسم</span>
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-[#323D59] p-6 shadow-xl">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
