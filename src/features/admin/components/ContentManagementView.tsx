import { useState, useMemo } from "react";
import {
  FolderTree,
  GraduationCap,
  Calendar,
  BookOpen,
  Users,
  Plus,
  Search,
  FileText,
  Video,
  Download,
  Eye,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  RotateCcw,
  ExternalLink,
  X,
  FileCode,
  FileCheck,
  AlertCircle,
} from "lucide-react";
import { useContentHierarchy } from "../../../hooks/useContentHierarchy";
import type {
  ContentEntity,
  ContentStatus,
  ContentSourceType,
  CreateContentPayload,
} from "../../../types/content";

export default function ContentManagementView() {
  const {
    selectedDepartmentId,
    selectedLevelId,
    selectedSemesterId,
    selectedOfferingId,
    selectedCourseDoctorId,
    setDepartmentId,
    setLevelId,
    setSemesterId,
    setOfferingId,
    setCourseDoctorId,
    resetAll,
    departments,
    filteredLevels,
    filteredSemesters,
    filteredOfferings,
    filteredCourseDoctors,
    contentTypes,
    currentDepartment,
    currentLevel,
    currentSemester,
    currentOffering,
    currentCourseDoctor,
    isChainComplete,
    displayedContents,
    updateContentStatus,
    addContent,
    editContent,
    deleteContent,
  } = useContentHierarchy();

  // Local Search & Sub-filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<number | "all">("all");
  const [filterStatus, setFilterStatus] = useState<ContentStatus | "all">("all");

  // Modals state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState<ContentEntity | null>(null);
  const [editingContent, setEditingContent] = useState<ContentEntity | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<ContentEntity | null>(null);

  // Filtered Content Results
  const filteredList = useMemo(() => {
    return displayedContents.filter((item) => {
      const matchSearch =
        searchTerm.trim() === "" ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description &&
          item.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchType =
        filterType === "all" || item.content_type_id === filterType;
      const matchStatus =
        filterStatus === "all" || item.status === filterStatus;
      return matchSearch && matchType && matchStatus;
    });
  }, [displayedContents, searchTerm, filterType, filterStatus]);

  // Helper for Status Badge Styling
  const getStatusBadge = (status: ContentStatus) => {
    switch (status) {
      case "approved":
        return {
          label: "معتمد",
          icon: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />,
          classes:
            "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30",
        };
      case "pending":
        return {
          label: "قيد المراجعة",
          icon: <Clock className="h-3.5 w-3.5 text-amber-400" />,
          classes:
            "bg-amber-500/10 text-amber-300 border border-amber-500/30",
        };
      case "rejected":
        return {
          label: "مرفوض",
          icon: <XCircle className="h-3.5 w-3.5 text-rose-400" />,
          classes: "bg-rose-500/10 text-rose-300 border border-rose-500/30",
        };
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* ─── Top Header & Title ─── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.07] pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#323D59] to-[#7DA49F] text-[#F8FAFC] shadow-md border border-[#7DA49F]/30">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#F8FAFC]">
                إدارة المحتوى والملفات الأكاديمية
              </h1>
              <p className="text-xs sm:text-sm text-[#A5B4BF]">
                فلترة هرمية مرتبطة بقاعدة البيانات (الأقسام &gt; المستويات &gt; الترمات &gt; المواد &gt; الدكاترة)
              </p>
            </div>
          </div>
        </div>

        {isChainComplete && (
          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-[#7DA49F] px-4 py-2.5 text-sm font-bold text-[#1E2638] shadow-md shadow-[#7DA49F]/20 transition-all hover:bg-[#9DBFB8] hover:scale-[1.02] active:scale-95 cursor-pointer border-0"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة محتوى جديد</span>
          </button>
        )}
      </div>

      {/* ─── 1. Cascading Dropdown Filter Bar (5 Linked Tiers) ─── */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#2A344D]/90 p-5 shadow-xl backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7DA49F] uppercase tracking-wider">
            <span className="flex h-2 w-2 rounded-full bg-[#7DA49F] animate-pulse" />
            <span>سلسلة الفلترة الأكاديمية المتتالية (Cascading Filter)</span>
          </div>

          {(selectedDepartmentId ||
            selectedLevelId ||
            selectedSemesterId ||
            selectedOfferingId ||
            selectedCourseDoctorId) && (
            <button
              type="button"
              onClick={resetAll}
              className="flex items-center gap-1.5 text-xs text-[#A5B4BF] hover:text-[#F8FAFC] transition-colors bg-transparent border-0 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>إعادة ضبط الفلاتر</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* Tier 1: Department */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#A5B4BF] flex items-center gap-1">
              <FolderTree className="h-3.5 w-3.5 text-[#7DA49F]" />
              <span>1. القسم الأكاديمي</span>
            </label>
            <select
              value={selectedDepartmentId}
              onChange={(e) =>
                setDepartmentId(e.target.value ? Number(e.target.value) : "")
              }
              className="w-full rounded-xl border border-white/[0.1] bg-[#1E2638] px-3 py-2 text-xs font-semibold text-[#F8FAFC] focus:border-[#7DA49F] focus:outline-none transition-colors cursor-pointer"
            >
              <option value="">اختر القسم...</option>
              {departments.map((dept) => (
                <option key={dept.department_id} value={dept.department_id}>
                  {dept.name} ({dept.code})
                </option>
              ))}
            </select>
          </div>

          {/* Tier 2: Level (Filtered by department_id) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#A5B4BF] flex items-center gap-1">
              <GraduationCap className="h-3.5 w-3.5 text-[#7DA49F]" />
              <span>2. المستوى الدراسي</span>
            </label>
            <select
              value={selectedLevelId}
              onChange={(e) =>
                setLevelId(e.target.value ? Number(e.target.value) : "")
              }
              disabled={!selectedDepartmentId}
              className={`w-full rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                !selectedDepartmentId
                  ? "border-white/[0.05] bg-[#1E2638]/50 text-slate-500 cursor-not-allowed"
                  : "border-white/[0.1] bg-[#1E2638] text-[#F8FAFC] focus:border-[#7DA49F] cursor-pointer"
              }`}
            >
              <option value="">
                {!selectedDepartmentId ? "اختر القسم أولاً" : "اختر المستوى..."}
              </option>
              {filteredLevels.map((lvl) => (
                <option key={lvl.level_id} value={lvl.level_id}>
                  {lvl.name} (مستوى {lvl.level_number})
                </option>
              ))}
            </select>
          </div>

          {/* Tier 3: Semester (Filtered by level_id) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#A5B4BF] flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-[#7DA49F]" />
              <span>3. الترم الدراسي</span>
            </label>
            <select
              value={selectedSemesterId}
              onChange={(e) =>
                setSemesterId(e.target.value ? Number(e.target.value) : "")
              }
              disabled={!selectedLevelId}
              className={`w-full rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                !selectedLevelId
                  ? "border-white/[0.05] bg-[#1E2638]/50 text-slate-500 cursor-not-allowed"
                  : "border-white/[0.1] bg-[#1E2638] text-[#F8FAFC] focus:border-[#7DA49F] cursor-pointer"
              }`}
            >
              <option value="">
                {!selectedLevelId ? "اختر المستوى أولاً" : "اختر الترم..."}
              </option>
              {filteredSemesters.map((sem) => (
                <option key={sem.semester_id} value={sem.semester_id}>
                  {sem.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tier 4: Course Offering (Filtered by semester_id) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#A5B4BF] flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5 text-[#7DA49F]" />
              <span>4. المقرر / المادة</span>
            </label>
            <select
              value={selectedOfferingId}
              onChange={(e) =>
                setOfferingId(e.target.value ? Number(e.target.value) : "")
              }
              disabled={!selectedSemesterId}
              className={`w-full rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                !selectedSemesterId
                  ? "border-white/[0.05] bg-[#1E2638]/50 text-slate-500 cursor-not-allowed"
                  : "border-white/[0.1] bg-[#1E2638] text-[#F8FAFC] focus:border-[#7DA49F] cursor-pointer"
              }`}
            >
              <option value="">
                {!selectedSemesterId ? "اختر الترم أولاً" : "اختر المادة..."}
              </option>
              {filteredOfferings.map((offering) => (
                <option key={offering.offering_id} value={offering.offering_id}>
                  {offering.course?.course_name_ar} ({offering.course?.course_code})
                </option>
              ))}
            </select>
          </div>

          {/* Tier 5: Doctor / Instructor (Filtered by offering_id) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#A5B4BF] flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-[#7DA49F]" />
              <span>5. الدكتور المحاضر</span>
            </label>
            <select
              value={selectedCourseDoctorId}
              onChange={(e) =>
                setCourseDoctorId(e.target.value ? Number(e.target.value) : "")
              }
              disabled={!selectedOfferingId}
              className={`w-full rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                !selectedOfferingId
                  ? "border-white/[0.05] bg-[#1E2638]/50 text-slate-500 cursor-not-allowed"
                  : "border-white/[0.1] bg-[#1E2638] text-[#F8FAFC] focus:border-[#7DA49F] cursor-pointer"
              }`}
            >
              <option value="">
                {!selectedOfferingId ? "اختر المادة أولاً" : "اختر الدكتور..."}
              </option>
              {filteredCourseDoctors.map((cd) => (
                <option key={cd.course_doctor_id} value={cd.course_doctor_id}>
                  {cd.doctor?.full_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Breadcrumb Path Pill */}
        {isChainComplete && (
          <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl bg-[#1E2638] px-3.5 py-2 text-xs text-[#A5B4BF] border border-white/[0.05]">
            <span className="font-bold text-[#7DA49F]">المسار الحالي:</span>
            <span>{currentDepartment?.name}</span>
            <span>&gt;</span>
            <span>{currentLevel?.name}</span>
            <span>&gt;</span>
            <span>{currentSemester?.name}</span>
            <span>&gt;</span>
            <span className="font-bold text-[#F8FAFC]">
              {currentOffering?.course?.course_name_ar}
            </span>
            <span>&gt;</span>
            <span className="font-bold text-[#7DA49F]">
              {currentCourseDoctor?.doctor?.full_name}
            </span>
            <span className="mr-auto font-mono text-[11px] text-slate-400">
              ({displayedContents.length} ملف ومورد متاح)
            </span>
          </div>
        )}
      </div>

      {/* ─── 2. Context-Aware Content Section ─── */}
      {!isChainComplete ? (
        /* Empty State Prompting Completion of Chain */
        <div className="flex min-h-[380px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.12] bg-[#242D42]/60 p-8 text-center backdrop-blur-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#323D59] text-[#7DA49F] shadow-lg mb-4 border border-[#7DA49F]/20">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-[#F8FAFC] mb-2">
            يرجى استكمال سلسلة الفلترة أعلاه
          </h3>
          <p className="max-w-md text-sm text-[#A5B4BF] leading-relaxed mb-6">
            لكي تتمكن من إدارة وتصفح المحتوى التعليمي، حدد القسم، المستوى، الترم، المادة، والدكتور المحاضر من القوائم المترابطة بالأعلى.
          </p>

          {/* Stepper Status Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
            <span
              className={`rounded-lg px-3 py-1.5 border ${
                selectedDepartmentId
                  ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                  : "bg-white/[0.04] text-[#A5B4BF] border-white/[0.07]"
              }`}
            >
              1. القسم {selectedDepartmentId ? "✓" : "○"}
            </span>
            <span
              className={`rounded-lg px-3 py-1.5 border ${
                selectedLevelId
                  ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                  : "bg-white/[0.04] text-[#A5B4BF] border-white/[0.07]"
              }`}
            >
              2. المستوى {selectedLevelId ? "✓" : "○"}
            </span>
            <span
              className={`rounded-lg px-3 py-1.5 border ${
                selectedSemesterId
                  ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                  : "bg-white/[0.04] text-[#A5B4BF] border-white/[0.07]"
              }`}
            >
              3. الترم {selectedSemesterId ? "✓" : "○"}
            </span>
            <span
              className={`rounded-lg px-3 py-1.5 border ${
                selectedOfferingId
                  ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                  : "bg-white/[0.04] text-[#A5B4BF] border-white/[0.07]"
              }`}
            >
              4. المادة {selectedOfferingId ? "✓" : "○"}
            </span>
            <span
              className={`rounded-lg px-3 py-1.5 border ${
                selectedCourseDoctorId
                  ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                  : "bg-white/[0.04] text-[#A5B4BF] border-white/[0.07]"
              }`}
            >
              5. الدكتور {selectedCourseDoctorId ? "✓" : "○"}
            </span>
          </div>
        </div>
      ) : (
        /* Content Active View */
        <div className="space-y-4">
          {/* Sub-Filters: Search, Type & Status */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-[#2A344D] p-3 shadow-md">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-[#A5B4BF]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث في عناوين المحتوى..."
                className="w-full rounded-xl border border-white/[0.08] bg-[#1E2638] py-2 pr-9 pl-3 text-xs font-semibold text-[#F8FAFC] placeholder-slate-400 focus:border-[#7DA49F] focus:outline-none"
              />
            </div>

            {/* Type & Status Filters */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              <select
                value={filterType}
                onChange={(e) =>
                  setFilterType(
                    e.target.value === "all" ? "all" : Number(e.target.value)
                  )
                }
                className="rounded-xl border border-white/[0.08] bg-[#1E2638] px-3 py-2 text-xs font-semibold text-[#F8FAFC] focus:border-[#7DA49F] focus:outline-none cursor-pointer"
              >
                <option value="all">كافة الأنواع</option>
                {contentTypes.map((t) => (
                  <option key={t.content_type_id} value={t.content_type_id}>
                    {t.name}
                  </option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as ContentStatus | "all")
                }
                className="rounded-xl border border-white/[0.08] bg-[#1E2638] px-3 py-2 text-xs font-semibold text-[#F8FAFC] focus:border-[#7DA49F] focus:outline-none cursor-pointer"
              >
                <option value="all">كافة الحالات</option>
                <option value="approved">معتمد</option>
                <option value="pending">قيد المراجعة</option>
                <option value="rejected">مرفوض</option>
              </select>
            </div>
          </div>

          {/* Contents Table */}
          {filteredList.length === 0 ? (
            <div className="rounded-2xl border border-white/[0.07] bg-[#2A344D]/50 p-12 text-center">
              <FileCheck className="mx-auto h-12 w-12 text-slate-500 mb-3" />
              <h4 className="text-base font-bold text-[#F8FAFC] mb-1">
                لا توجد ملفات أو محتويات مطابقة
              </h4>
              <p className="text-xs text-[#A5B4BF]">
                انقر على "إضافة محتوى جديد" لرفع أول ملف أو رابط لهذا المقرر.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#2A344D] shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="border-b border-white/[0.08] bg-[#1E2638]/80 text-[#A5B4BF] uppercase">
                    <tr>
                      <th className="px-5 py-3.5 font-bold">العنوان والوصف</th>
                      <th className="px-4 py-3.5 font-bold">النوع</th>
                      <th className="px-4 py-3.5 font-bold">المصدر / الصيغة</th>
                      <th className="px-4 py-3.5 font-bold">المشرف / الرفع</th>
                      <th className="px-4 py-3.5 font-bold">الحالة</th>
                      <th className="px-4 py-3.5 font-bold text-center">التحميلات</th>
                      <th className="px-4 py-3.5 font-bold">تاريخ الإضافة</th>
                      <th className="px-5 py-3.5 font-bold text-center">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05]">
                    {filteredList.map((item) => {
                      const typeObj = contentTypes.find(
                        (t) => t.content_type_id === item.content_type_id
                      );
                      const statusBadge = getStatusBadge(item.status);

                      return (
                        <tr
                          key={item.content_id}
                          className="transition-colors hover:bg-white/[0.02]"
                        >
                          {/* Title & Description */}
                          <td className="px-5 py-4 max-w-xs">
                            <div className="font-bold text-[#F8FAFC] text-sm line-clamp-1">
                              {item.title}
                            </div>
                            {item.description && (
                              <div className="text-[11px] text-[#A5B4BF] line-clamp-1 mt-0.5">
                                {item.description}
                              </div>
                            )}
                          </td>

                          {/* Content Type */}
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center rounded-lg bg-[#323D59] px-2.5 py-1 text-[11px] font-bold text-[#7DA49F] border border-[#7DA49F]/30">
                              {typeObj?.name || "مورد"}
                            </span>
                          </td>

                          {/* Source Type / Extension */}
                          <td className="px-4 py-4 whitespace-nowrap">
                            {item.source_type === "video" ? (
                              <div className="flex items-center gap-1.5 text-rose-400 font-semibold">
                                <Video className="h-4 w-4" />
                                <span>فيديو URL</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 text-[#F8FAFC]">
                                <FileCode className="h-4 w-4 text-[#7DA49F]" />
                                <span className="font-mono uppercase font-bold text-[11px]">
                                  {item.file_extension || "FILE"}
                                </span>
                                {item.file_size_formatted && (
                                  <span className="text-[10px] text-slate-400">
                                    ({item.file_size_formatted})
                                  </span>
                                )}
                              </div>
                            )}
                          </td>

                          {/* Uploaded By */}
                          <td className="px-4 py-4 whitespace-nowrap text-[#A5B4BF]">
                            {item.uploaded_by_name || "مستخدم"}
                          </td>

                          {/* Approval Status Toggle */}
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="relative inline-block">
                              <select
                                value={item.status}
                                onChange={(e) =>
                                  updateContentStatus(
                                    item.content_id,
                                    e.target.value as ContentStatus
                                  )
                                }
                                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer border-0 ${statusBadge.classes}`}
                              >
                                <option value="approved" className="bg-[#242D42] text-emerald-300">
                                  معتمد
                                </option>
                                <option value="pending" className="bg-[#242D42] text-amber-300">
                                  قيد المراجعة
                                </option>
                                <option value="rejected" className="bg-[#242D42] text-rose-300">
                                  مرفوض
                                </option>
                              </select>
                            </div>
                          </td>

                          {/* Download Count */}
                          <td className="px-4 py-4 text-center whitespace-nowrap font-mono font-bold text-[#F8FAFC]">
                            {item.download_count}
                          </td>

                          {/* Date */}
                          <td className="px-4 py-4 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                            {item.created_at.split(" ")[0]}
                          </td>

                          {/* Actions */}
                          <td className="px-5 py-4 whitespace-nowrap">
                            <div className="flex items-center justify-center gap-1.5">
                              {/* Preview */}
                              <button
                                type="button"
                                onClick={() => setPreviewContent(item)}
                                title="معاينة"
                                className="rounded-lg p-1.5 text-[#A5B4BF] hover:bg-white/[0.08] hover:text-[#7DA49F] transition-colors border-0 bg-transparent cursor-pointer"
                              >
                                <Eye className="h-4 w-4" />
                              </button>

                              {/* Edit */}
                              <button
                                type="button"
                                onClick={() => setEditingContent(item)}
                                title="تعديل"
                                className="rounded-lg p-1.5 text-[#A5B4BF] hover:bg-white/[0.08] hover:text-amber-300 transition-colors border-0 bg-transparent cursor-pointer"
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>

                              {/* Delete */}
                              <button
                                type="button"
                                onClick={() => setDeleteCandidate(item)}
                                title="حذف"
                                className="rounded-lg p-1.5 text-rose-400/80 hover:bg-rose-500/10 hover:text-rose-300 transition-colors border-0 bg-transparent cursor-pointer"
                              >
                                <Trash2 className="h-4 w-4" />
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
          )}
        </div>
      )}

      {/* ─── 3. Pre-populated Upload Modal ─── */}
      {isUploadModalOpen && (
        <UploadModal
          departmentName={currentDepartment?.name || ""}
          levelName={currentLevel?.name || ""}
          semesterName={currentSemester?.name || ""}
          courseName={currentOffering?.course?.course_name_ar || ""}
          doctorName={currentCourseDoctor?.doctor?.full_name || ""}
          contentTypes={contentTypes}
          onClose={() => setIsUploadModalOpen(false)}
          onSubmit={(payload) => {
            addContent(payload);
            setIsUploadModalOpen(false);
          }}
        />
      )}

      {/* ─── 4. Preview Modal ─── */}
      {previewContent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setPreviewContent(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-white/[0.1] bg-[#2A344D] p-6 shadow-2xl text-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#323D59] text-[#7DA49F]">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-[#F8FAFC]">
                  تفاصيل المحتوى الأكاديمي
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewContent(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:text-[#F8FAFC] border-0 bg-transparent cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-[#A5B4BF]">
              <div>
                <span className="font-bold text-slate-400 block mb-1">العنوان:</span>
                <span className="text-sm font-bold text-[#F8FAFC]">
                  {previewContent.title}
                </span>
              </div>

              {previewContent.description && (
                <div>
                  <span className="font-bold text-slate-400 block mb-1">الوصف:</span>
                  <p className="leading-relaxed bg-[#1E2638] p-3 rounded-xl border border-white/[0.05]">
                    {previewContent.description}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-[#1E2638] p-3 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">نوع المحتوى:</span>
                  <span className="font-bold text-[#7DA49F] text-xs">
                    {
                      contentTypes.find(
                        (t) => t.content_type_id === previewContent.content_type_id
                      )?.name
                    }
                  </span>
                </div>
                <div className="bg-[#1E2638] p-3 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">المصدر:</span>
                  <span className="font-bold text-[#F8FAFC] text-xs">
                    {previewContent.source_type === "video" ? "فيديو عبر الإنترنت" : "ملف مرفوع"}
                  </span>
                </div>
              </div>

              {previewContent.source_type === "video" && previewContent.video_url && (
                <div className="bg-[#1E2638] p-3 rounded-xl flex items-center justify-between">
                  <span className="text-rose-300 font-mono text-[11px] truncate max-w-[280px]">
                    {previewContent.video_url}
                  </span>
                  <a
                    href={previewContent.video_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 rounded-lg bg-rose-500/20 px-3 py-1.5 text-xs font-bold text-rose-300 hover:bg-rose-500/30 transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>مشاهدة</span>
                  </a>
                </div>
              )}

              {previewContent.source_type === "file" && (
                <div className="bg-[#1E2638] p-3 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#F8FAFC] block">
                      {previewContent.file_name}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {previewContent.file_size_formatted}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      alert(`جاري تحميل الملف: ${previewContent.file_name}`)
                    }
                    className="flex items-center gap-1.5 rounded-lg bg-[#7DA49F] px-3.5 py-1.5 text-xs font-bold text-[#1E2638] hover:bg-[#9DBFB8] cursor-pointer border-0"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>تحميل</span>
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setPreviewContent(null)}
                className="rounded-xl bg-[#323D59] px-5 py-2 text-xs font-bold text-[#F8FAFC] hover:bg-[#3B4868] cursor-pointer border-0"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── 5. Edit Modal ─── */}
      {editingContent && (
        <EditModal
          content={editingContent}
          contentTypes={contentTypes}
          onClose={() => setEditingContent(null)}
          onSave={(updates) => {
            editContent(editingContent.content_id, updates);
            setEditingContent(null);
          }}
        />
      )}

      {/* ─── 6. Delete Confirmation Modal ─── */}
      {deleteCandidate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setDeleteCandidate(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-rose-500/20 bg-[#2A344D] p-6 shadow-2xl text-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                <Trash2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F8FAFC]">
                  تأكيد حذف المحتوى
                </h3>
                <p className="text-xs text-rose-300">
                  هل أنت متأكد من رغبتك في حذف هذا المحتوى التعليمي؟
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-[#1E2638] p-3 text-xs text-[#F8FAFC] font-semibold mb-6">
              {deleteCandidate.title}
            </div>

            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteCandidate(null)}
                className="rounded-xl bg-[#323D59] px-4 py-2 text-xs font-bold text-[#F8FAFC] hover:bg-[#3B4868] cursor-pointer border-0"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteContent(deleteCandidate.content_id);
                  setDeleteCandidate(null);
                }}
                className="rounded-xl bg-rose-500 px-5 py-2 text-xs font-bold text-white hover:bg-rose-600 transition-colors cursor-pointer border-0"
              >
                تأكيد الحذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-component: Pre-populated Upload Modal
// ─────────────────────────────────────────────────────────────────────────────
interface UploadModalProps {
  departmentName: string;
  levelName: string;
  semesterName: string;
  courseName: string;
  doctorName: string;
  contentTypes: { content_type_id: number; name: string }[];
  onClose: () => void;
  onSubmit: (payload: CreateContentPayload) => void;
}

function UploadModal({
  departmentName,
  levelName,
  semesterName,
  courseName,
  doctorName,
  contentTypes,
  onClose,
  onSubmit,
}: UploadModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contentTypeId, setContentTypeId] = useState<number>(1);
  const [sourceType, setSourceType] = useState<ContentSourceType>("file");
  const [videoUrl, setVideoUrl] = useState("");
  const [fileName, setFileName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("يرجى إدخال عنوان المحتوى.");
      return;
    }

    if (sourceType === "video" && !videoUrl.trim()) {
      alert("يرجى إدخال رابط الفيديو.");
      return;
    }

    const payload: CreateContentPayload = {
      title: title.trim(),
      description: description.trim() || undefined,
      content_type_id: contentTypeId,
      source_type: sourceType,
      video_url: sourceType === "video" ? videoUrl.trim() : undefined,
      file_name: sourceType === "file" ? fileName.trim() || "document.pdf" : undefined,
      file_size: sourceType === "file" ? 3145728 : undefined, // 3.0 MB simulated
      file_extension: sourceType === "file" ? "pdf" : undefined,
    };

    onSubmit(payload);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-white/[0.1] bg-[#2A344D] p-6 shadow-2xl text-right max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#323D59] to-[#7DA49F] text-[#F8FAFC]">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F8FAFC]">
                إضافة محتوى تعليمي جديد
              </h3>
              <p className="text-[11px] text-[#A5B4BF]">
                البيانات الهرمية مقفلة ومحددة مسبقاً بناءً على فلاتر الواجهة
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-[#F8FAFC] border-0 bg-transparent cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Locked Hierarchy Context Card */}
        <div className="rounded-xl border border-[#7DA49F]/30 bg-[#1E2638] p-3.5 mb-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7DA49F]">
            <CheckCircle2 className="h-4 w-4" />
            <span>السياق الأكاديمي المقفل (Locked Hierarchy Context):</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
            <div>
              <span className="text-slate-400">القسم: </span>
              <strong className="text-[#F8FAFC]">{departmentName}</strong>
            </div>
            <div>
              <span className="text-slate-400">المستوى: </span>
              <strong className="text-[#F8FAFC]">{levelName}</strong>
            </div>
            <div>
              <span className="text-slate-400">الترم: </span>
              <strong className="text-[#F8FAFC]">{semesterName}</strong>
            </div>
            <div className="col-span-2">
              <span className="text-slate-400">المقرر: </span>
              <strong className="text-[#F8FAFC]">{courseName}</strong>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-slate-400">الدكتور: </span>
              <strong className="text-[#7DA49F]">{doctorName}</strong>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Title */}
          <div>
            <label className="block text-[#F8FAFC] font-bold mb-1.5">
              عنوان المحتوى <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: المحاضرة الثالثة - خوارزميات البحث الثنائي"
              className="w-full rounded-xl border border-white/[0.1] bg-[#1E2638] p-2.5 text-xs text-[#F8FAFC] placeholder-slate-500 focus:border-[#7DA49F] focus:outline-none"
            />
          </div>

          {/* Content Type */}
          <div>
            <label className="block text-[#F8FAFC] font-bold mb-1.5">
              نوع المحتوى <span className="text-rose-400">*</span>
            </label>
            <select
              value={contentTypeId}
              onChange={(e) => setContentTypeId(Number(e.target.value))}
              className="w-full rounded-xl border border-white/[0.1] bg-[#1E2638] p-2.5 text-xs text-[#F8FAFC] focus:border-[#7DA49F] focus:outline-none cursor-pointer"
            >
              {contentTypes.map((t) => (
                <option key={t.content_type_id} value={t.content_type_id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Source Type Selector (File vs Video) */}
          <div>
            <label className="block text-[#F8FAFC] font-bold mb-1.5">
              مصدر المحتوى <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSourceType("file")}
                className={`flex items-center justify-center gap-2 rounded-xl p-2.5 font-bold transition-all border cursor-pointer ${
                  sourceType === "file"
                    ? "bg-[#7DA49F]/20 text-[#7DA49F] border-[#7DA49F]"
                    : "bg-[#1E2638] text-[#A5B4BF] border-white/[0.08]"
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>ملف محلي (PDF, DOCX...)</span>
              </button>

              <button
                type="button"
                onClick={() => setSourceType("video")}
                className={`flex items-center justify-center gap-2 rounded-xl p-2.5 font-bold transition-all border cursor-pointer ${
                  sourceType === "video"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/50"
                    : "bg-[#1E2638] text-[#A5B4BF] border-white/[0.08]"
                }`}
              >
                <Video className="h-4 w-4" />
                <span>رابط فيديو تعليمي (YouTube)</span>
              </button>
            </div>
          </div>

          {/* Dynamic Input based on Source Type */}
          {sourceType === "file" ? (
            <div>
              <label className="block text-[#F8FAFC] font-bold mb-1.5">
                اسم الملف
              </label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="مثال: Lecture_03_Binary_Search.pdf"
                className="w-full rounded-xl border border-white/[0.1] bg-[#1E2638] p-2.5 text-xs text-[#F8FAFC] placeholder-slate-500 focus:border-[#7DA49F] focus:outline-none"
              />
            </div>
          ) : (
            <div>
              <label className="block text-[#F8FAFC] font-bold mb-1.5">
                رابط الفيديو <span className="text-rose-400">*</span>
              </label>
              <input
                type="url"
                required
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full rounded-xl border border-white/[0.1] bg-[#1E2638] p-2.5 text-xs text-[#F8FAFC] placeholder-slate-500 focus:border-[#7DA49F] focus:outline-none text-left font-mono"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-[#F8FAFC] font-bold mb-1.5">
              الوصف أو الملاحظات (اختياري)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتب نبذة مختصرة عن هذا المورد التعليمي..."
              className="w-full rounded-xl border border-white/[0.1] bg-[#1E2638] p-2.5 text-xs text-[#F8FAFC] placeholder-slate-500 focus:border-[#7DA49F] focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2.5 pt-4 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-[#323D59] px-4 py-2 font-bold text-[#F8FAFC] hover:bg-[#3B4868] cursor-pointer border-0"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#7DA49F] px-5 py-2 font-bold text-[#1E2638] hover:bg-[#9DBFB8] shadow-md transition-colors cursor-pointer border-0"
            >
              إضافة وحفظ المحتوى
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-component: Edit Modal
// ─────────────────────────────────────────────────────────────────────────────
interface EditModalProps {
  content: ContentEntity;
  contentTypes: { content_type_id: number; name: string }[];
  onClose: () => void;
  onSave: (updates: Partial<ContentEntity>) => void;
}

function EditModal({
  content,
  contentTypes,
  onClose,
  onSave,
}: EditModalProps) {
  const [title, setTitle] = useState(content.title);
  const [description, setDescription] = useState(content.description || "");
  const [contentTypeId, setContentTypeId] = useState(content.content_type_id);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: title.trim(),
      description: description.trim() || undefined,
      content_type_id: contentTypeId,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-white/[0.1] bg-[#2A344D] p-6 shadow-2xl text-right"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
              <Edit3 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#F8FAFC]">
              تعديل بيانات المحتوى
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-[#F8FAFC] border-0 bg-transparent cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#F8FAFC] font-bold mb-1.5">
              العنوان
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-white/[0.1] bg-[#1E2638] p-2.5 text-xs text-[#F8FAFC] focus:border-[#7DA49F] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#F8FAFC] font-bold mb-1.5">
              نوع المحتوى
            </label>
            <select
              value={contentTypeId}
              onChange={(e) => setContentTypeId(Number(e.target.value))}
              className="w-full rounded-xl border border-white/[0.1] bg-[#1E2638] p-2.5 text-xs text-[#F8FAFC] focus:border-[#7DA49F] focus:outline-none cursor-pointer"
            >
              {contentTypes.map((t) => (
                <option key={t.content_type_id} value={t.content_type_id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[#F8FAFC] font-bold mb-1.5">
              الوصف
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-white/[0.1] bg-[#1E2638] p-2.5 text-xs text-[#F8FAFC] focus:border-[#7DA49F] focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-4 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-[#323D59] px-4 py-2 font-bold text-[#F8FAFC] hover:bg-[#3B4868] cursor-pointer border-0"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="rounded-xl bg-amber-500 px-5 py-2 font-bold text-[#1E2638] hover:bg-amber-400 transition-colors cursor-pointer border-0"
            >
              حفظ التعديلات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
