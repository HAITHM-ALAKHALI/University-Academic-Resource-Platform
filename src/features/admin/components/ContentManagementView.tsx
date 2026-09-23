import { useState, useMemo, useEffect } from "react";
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
  Upload,
  Loader2,
} from "lucide-react";
import { useContentHierarchy } from "../../../hooks/useContentHierarchy";
import { courseOfferingsService } from "../../../services/courseOfferingsService";
import type {
  ContentEntity,
  ContentStatus,
  ContentSourceType,
  DepartmentEntity,
  LevelEntity,
  SemesterEntity,
  CourseOfferingEntity,
  CourseDoctorEntity,
  ContentTypeEntity,
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
    displayedContents,
    loading,
    updateContentStatus,
    addContent,
    editContent,
    deleteContent,
  } = useContentHierarchy();

  // فلاتر البحث المحلية
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<number | "all">("all");
  const [filterStatus, setFilterStatus] = useState<ContentStatus | "all">(
    "all",
  );

  // حالات النوافذ
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState<ContentEntity | null>(
    null,
  );
  const [editingContent, setEditingContent] = useState<ContentEntity | null>(
    null,
  );
  const [deleteCandidate, setDeleteCandidate] = useState<ContentEntity | null>(
    null,
  );
  const [isProcessing, setIsProcessing] = useState(false);

  // تصفية المحتوى
  const filteredList = useMemo(() => {
    return (displayedContents || []).filter((item) => {
      const titleMatch = item.title ? item.title.toLowerCase() : "";
      const descMatch = item.description ? item.description.toLowerCase() : "";
      const query = searchTerm.trim().toLowerCase();

      const matchSearch =
        query === "" || titleMatch.includes(query) || descMatch.includes(query);
      const matchType =
        filterType === "all" || item.content_type_id === filterType;
      const matchStatus =
        filterStatus === "all" || item.status === filterStatus;

      return matchSearch && matchType && matchStatus;
    });
  }, [displayedContents, searchTerm, filterType, filterStatus]);

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
          classes: "bg-amber-500/10 text-amber-300 border border-amber-500/30",
        };
      case "rejected":
        return {
          label: "مرفوض",
          icon: <XCircle className="h-3.5 w-3.5 text-rose-400" />,
          classes: "bg-rose-500/10 text-rose-300 border border-rose-500/30",
        };
      default:
        return {
          label: "غير محدد",
          icon: null,
          classes: "bg-slate-500/10 text-slate-300 border border-slate-500/30",
        };
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteCandidate) return;
    setIsProcessing(true);
    await deleteContent(deleteCandidate.content_id);
    setIsProcessing(false);
    setDeleteCandidate(null);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* ─── Top Header & Title ─── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.07] pb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#323D59] to-[#7DA49F] text-[#F8FAFC] shadow-md border border-[#7DA49F]/30">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#F8FAFC]">
              إدارة المحتوى والملفات الأكاديمية
            </h1>
            <p className="text-xs sm:text-sm text-[#A5B4BF]">
              تصفح كافة الموارد مع إمكانية التصفية الهرمية الاختيارية
            </p>
          </div>
        </div>

        {/* زر الإضافة متاح دائماً بدون قيود */}
        <button
          type="button"
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-[#7DA49F] px-4 py-2.5 text-sm font-bold text-[#1E2638] shadow-md shadow-[#7DA49F]/20 transition-all hover:bg-[#9DBFB8] hover:scale-[1.02] active:scale-95 cursor-pointer border-0"
        >
          <Plus className="h-4 w-4" />
          <span>إضافة محتوى جديد</span>
        </button>
      </div>

      {/* ─── 1. شريط الفلاتر الهرمية الاختيارية ─── */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#2A344D]/90 p-5 shadow-xl backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7DA49F] uppercase tracking-wider">
            <span className="flex h-2 w-2 rounded-full bg-[#7DA49F] animate-pulse" />
            <span>فلترة اختيارية للمحتوى (Cascading Filters)</span>
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
              <span>1. القسم</span>
            </label>
            <select
              value={selectedDepartmentId}
              onChange={(e) =>
                setDepartmentId(e.target.value ? Number(e.target.value) : "")
              }
              className="w-full rounded-xl border border-white/[0.1] bg-[#1E2638] px-3 py-2 text-xs font-semibold text-[#F8FAFC] focus:border-[#7DA49F] focus:outline-none transition-colors cursor-pointer"
            >
              <option value="">كافة الأقسام...</option>
              {departments.map((dept) => (
                <option key={dept.department_id} value={dept.department_id}>
                  {dept.name} ({dept.code})
                </option>
              ))}
            </select>
          </div>

          {/* Tier 2: Level */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#A5B4BF] flex items-center gap-1">
              <GraduationCap className="h-3.5 w-3.5 text-[#7DA49F]" />
              <span>2. المستوى</span>
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
              <option value="">كافة المستويات...</option>
              {filteredLevels.map((lvl) => (
                <option key={lvl.level_id} value={lvl.level_id}>
                  {lvl.name} (مستوى {lvl.level_number})
                </option>
              ))}
            </select>
          </div>

          {/* Tier 3: Semester */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#A5B4BF] flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-[#7DA49F]" />
              <span>3. الترم</span>
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
              <option value="">كافة الترمات...</option>
              {filteredSemesters.map((sem) => (
                <option key={sem.semester_id} value={sem.semester_id}>
                  {sem.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tier 4: Offering */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#A5B4BF] flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5 text-[#7DA49F]" />
              <span>4. المقرر</span>
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
              <option value="">كافة المواد...</option>
              {filteredOfferings.map((offering) => (
                <option key={offering.offering_id} value={offering.offering_id}>
                  {offering.course?.course_name_ar ||
                    `مقرر #${offering.offering_id}`}
                </option>
              ))}
            </select>
          </div>

          {/* Tier 5: Doctor */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-[#A5B4BF] flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-[#7DA49F]" />
              <span>5. الدكتور</span>
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
              <option value="">كافة الدكاترة...</option>
              {filteredCourseDoctors.map((cd) => (
                <option key={cd.course_doctor_id} value={cd.course_doctor_id}>
                  {cd.doctor?.full_name ||
                    cd.doctor?.user?.full_name ||
                    `دكتور #${cd.course_doctor_id}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ─── 2. جدول المحتوى وعناصر البحث ─── */}
      <div className="space-y-4">
        {/* فلاتر إضافية */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-[#2A344D] p-3 shadow-md">
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

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <select
              value={filterType}
              onChange={(e) =>
                setFilterType(
                  e.target.value === "all" ? "all" : Number(e.target.value),
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

        {/* الجدول الفعلي */}
        {loading ? (
          <div className="flex min-h-[250px] items-center justify-center rounded-2xl border border-white/[0.07] bg-[#2A344D]/50">
            <Loader2 className="h-8 w-8 animate-spin text-[#7DA49F]" />
          </div>
        ) : filteredList.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.07] bg-[#2A344D]/50 p-12 text-center">
            <FileCheck className="mx-auto h-12 w-12 text-slate-500 mb-3" />
            <h4 className="text-base font-bold text-[#F8FAFC] mb-1">
              لا توجد ملفات أو محتويات مطابقة
            </h4>
            <p className="text-xs text-[#A5B4BF]">
              انقر على "إضافة محتوى جديد" لرفع أول مورد.
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
                    <th className="px-4 py-3.5 font-bold text-center">
                      التحميلات
                    </th>
                    <th className="px-4 py-3.5 font-bold">تاريخ الإضافة</th>
                    <th className="px-5 py-3.5 font-bold text-center">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {filteredList.map((item) => {
                    const typeObj = contentTypes.find(
                      (t) => t.content_type_id === item.content_type_id,
                    );
                    const statusBadge = getStatusBadge(item.status);

                    return (
                      <tr
                        key={item.content_id}
                        className="transition-colors hover:bg-white/[0.02]"
                      >
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

                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center rounded-lg bg-[#323D59] px-2.5 py-1 text-[11px] font-bold text-[#7DA49F] border border-[#7DA49F]/30">
                            {typeObj?.name || "مورد"}
                          </span>
                        </td>

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

                        <td className="px-4 py-4 whitespace-nowrap text-[#A5B4BF]">
                          {item.uploaded_by_name || "مستخدم"}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">
                          <select
                            value={item.status}
                            onChange={(e) =>
                              updateContentStatus(
                                item.content_id,
                                e.target.value as ContentStatus,
                              )
                            }
                            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer border-0 ${statusBadge.classes}`}
                          >
                            <option
                              value="approved"
                              className="bg-[#242D42] text-emerald-300"
                            >
                              معتمد
                            </option>
                            <option
                              value="pending"
                              className="bg-[#242D42] text-amber-300"
                            >
                              قيد المراجعة
                            </option>
                            <option
                              value="rejected"
                              className="bg-[#242D42] text-rose-300"
                            >
                              مرفوض
                            </option>
                          </select>
                        </td>

                        <td className="px-4 py-4 text-center whitespace-nowrap font-mono font-bold text-[#F8FAFC]">
                          {item.download_count}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                          {item.created_at
                            ? item.created_at.split(" ")[0]
                            : "-"}
                        </td>

                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setPreviewContent(item)}
                              title="معاينة"
                              className="rounded-lg p-1.5 text-[#A5B4BF] hover:bg-white/[0.08] hover:text-[#7DA49F] transition-colors border-0 bg-transparent cursor-pointer"
                            >
                              <Eye className="h-4 w-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => setEditingContent(item)}
                              title="تعديل"
                              className="rounded-lg p-1.5 text-[#A5B4BF] hover:bg-white/[0.08] hover:text-amber-300 transition-colors border-0 bg-transparent cursor-pointer"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>

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

      {/* ─── 3. نافذة الرفع مع اختيار السلسلة الهرمية بالكامل ─── */}
      {isUploadModalOpen && (
        <UploadModal
          departments={departments}
          contentTypes={contentTypes}
          onClose={() => setIsUploadModalOpen(false)}
          onSubmit={async (formData) => {
            const success = await addContent(formData);
            if (success) setIsUploadModalOpen(false);
          }}
        />
      )}

      {/* ─── 4. نافذة المعاينة ─── */}
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
                <span className="font-bold text-slate-400 block mb-1">
                  العنوان:
                </span>
                <span className="text-sm font-bold text-[#F8FAFC]">
                  {previewContent.title}
                </span>
              </div>

              {previewContent.description && (
                <div>
                  <span className="font-bold text-slate-400 block mb-1">
                    الوصف:
                  </span>
                  <p className="leading-relaxed bg-[#1E2638] p-3 rounded-xl border border-white/[0.05]">
                    {previewContent.description}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-[#1E2638] p-3 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">
                    نوع المحتوى:
                  </span>
                  <span className="font-bold text-[#7DA49F] text-xs">
                    {
                      contentTypes.find(
                        (t) =>
                          t.content_type_id === previewContent.content_type_id,
                      )?.name
                    }
                  </span>
                </div>
                <div className="bg-[#1E2638] p-3 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">
                    المصدر:
                  </span>
                  <span className="font-bold text-[#F8FAFC] text-xs">
                    {previewContent.source_type === "video"
                      ? "فيديو عبر الإنترنت"
                      : "ملف مرفوع"}
                  </span>
                </div>
              </div>

              {previewContent.source_type === "video" &&
                previewContent.video_url && (
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
                    {previewContent.file_size_formatted && (
                      <span className="text-[10px] text-slate-400">
                        {previewContent.file_size_formatted}
                      </span>
                    )}
                  </div>
                  {previewContent.file_path && (
                    <a
                      href={`/storage/${previewContent.file_path}`}
                      download
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 rounded-lg bg-[#7DA49F] px-3.5 py-1.5 text-xs font-bold text-[#1E2638] hover:bg-[#9DBFB8] cursor-pointer border-0"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>تحميل</span>
                    </a>
                  )}
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

      {/* ─── 5. نافذة التعديل ─── */}
      {editingContent && (
        <EditModal
          content={editingContent}
          contentTypes={contentTypes}
          onClose={() => setEditingContent(null)}
          onSave={async (updates) => {
            const success = await editContent(
              editingContent.content_id,
              updates,
            );
            if (success) setEditingContent(null);
          }}
        />
      )}

      {/* ─── 6. نافذة الحذف ─── */}
      {deleteCandidate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => !isProcessing && setDeleteCandidate(null)}
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
                disabled={isProcessing}
                onClick={() => setDeleteCandidate(null)}
                className="rounded-xl bg-[#323D59] px-4 py-2 text-xs font-bold text-[#F8FAFC] hover:bg-[#3B4868] cursor-pointer border-0"
              >
                إلغاء
              </button>
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleDeleteConfirm}
                className="flex items-center gap-2 rounded-xl bg-rose-500 px-5 py-2 text-xs font-bold text-white hover:bg-rose-600 transition-colors cursor-pointer border-0 disabled:opacity-50"
              >
                {isProcessing && (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                )}
                <span>تأكيد الحذف</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { apiClient } from "../../../services/api";

interface UploadModalProps {
  departments: DepartmentEntity[];
  contentTypes: ContentTypeEntity[];
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
}

function UploadModal({
  departments,
  contentTypes,
  onClose,
  onSubmit,
}: UploadModalProps) {
  // 1. حالات التحديد المتتالية (Cascading Selected IDs)
  const [modalDeptId, setModalDeptId] = useState<number | "">("");
  const [modalLevelId, setModalLevelId] = useState<number | "">("");
  const [modalSemesterId, setModalSemesterId] = useState<number | "">("");
  const [modalOfferingId, setModalOfferingId] = useState<number | "">("");
  const [modalCourseDoctorId, setModalCourseDoctorId] = useState<number | "">(
    "",
  );

  // 2. قوائم البيانات المجلوبة مباشرة من الـ API
  const [levelsList, setLevelsList] = useState<LevelEntity[]>([]);
  const [semestersList, setSemestersList] = useState<SemesterEntity[]>([]);
  const [offeringsList, setOfferingsList] = useState<CourseOfferingEntity[]>(
    [],
  );
  const [courseDoctorsList, setCourseDoctorsList] = useState<
    CourseDoctorEntity[]
  >([]);

  // حالات تحميل الفلاتر
  const [loadingLevels, setLoadingLevels] = useState(false);
  const [loadingSemesters, setLoadingSemesters] = useState(false);
  const [loadingOfferings, setLoadingOfferings] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  // 3. حقول بيانات المحتوى المرفوع
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contentTypeId, setContentTypeId] = useState<number>(
    contentTypes[0]?.content_type_id || 1,
  );
  const [sourceType, setSourceType] = useState<ContentSourceType>("file");
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ─── API Cascading 1: جلب المستويات عند اختيار القسم ───
  useEffect(() => {
    if (!modalDeptId) {
      setLevelsList([]);
      setModalLevelId("");
      return;
    }
    setLoadingLevels(true);
    apiClient
      .get(`/levels?department_id=${modalDeptId}`)
      .then((res) => {
        setLevelsList(res.data?.data || res.data || []);
      })
      .catch(() => setLevelsList([]))
      .finally(() => setLoadingLevels(false));

    // تفريغ الفروع التابعة
    setModalLevelId("");
    setModalSemesterId("");
    setModalOfferingId("");
    setModalCourseDoctorId("");
  }, [modalDeptId]);

  // ─── API Cascading 2: جلب الترمات عند اختيار المستوى ───
  useEffect(() => {
    if (!modalLevelId) {
      setSemestersList([]);
      setModalSemesterId("");
      return;
    }
    setLoadingSemesters(true);
    apiClient
      .get(`/semesters?level_id=${modalLevelId}`)
      .then((res) => {
        setSemestersList(res.data?.data || res.data || []);
      })
      .catch(() => setSemestersList([]))
      .finally(() => setLoadingSemesters(false));

    setModalSemesterId("");
    setModalOfferingId("");
    setModalCourseDoctorId("");
  }, [modalLevelId]);

  // ─── API Cascading 3: جلب المقررات عند اختيار الترم ───
  useEffect(() => {
    if (!modalSemesterId) {
      setOfferingsList([]);
      setModalOfferingId("");
      return;
    }
    setLoadingOfferings(true);
    apiClient
      .get(`/course-offerings?semester_id=${modalSemesterId}`)
      .then((res) => {
        setOfferingsList(res.data?.data || res.data || []);
      })
      .catch(() => setOfferingsList([]))
      .finally(() => setLoadingOfferings(false));

    setModalOfferingId("");
    setModalCourseDoctorId("");
  }, [modalSemesterId]);

  // ─── API Cascading 4: جلب الدكاترة عند اختيار المقرر المطروح ───
  useEffect(() => {
    if (!modalOfferingId) {
      setCourseDoctorsList([]);
      setModalCourseDoctorId("");
      return;
    }
    setLoadingDoctors(true);
    apiClient
      .get(`/course-doctors?offering_id=${modalOfferingId}`)
      .then((res) => {
        setCourseDoctorsList(res.data?.data || res.data || []);
      })
      .catch(() => setCourseDoctorsList([]))
      .finally(() => setLoadingDoctors(false));

    setModalCourseDoctorId("");
  }, [modalOfferingId]);

  // إرسال البيانات للباك إند
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!modalCourseDoctorId) {
      alert("يرجى اختيار الدكتور المحاضر لاستكمال الوجهة الأكاديمية للمحتوى.");
      return;
    }

    if (!title.trim()) {
      alert("يرجى إدخال عنوان المحتوى.");
      return;
    }

    if (sourceType === "video" && !videoUrl.trim()) {
      alert("يرجى إدخال رابط الفيديو.");
      return;
    }

    if (sourceType === "file" && !selectedFile) {
      alert("يرجى اختيار ملف لرفعه.");
      return;
    }

    const formData = new FormData();
    formData.append("course_doctor_id", String(modalCourseDoctorId));
    formData.append("content_type_id", String(contentTypeId));
    formData.append("title", title.trim());
    if (description.trim()) {
      formData.append("description", description.trim());
    }
    formData.append("source_type", sourceType);

    if (sourceType === "file" && selectedFile) {
      formData.append("file", selectedFile);
    } else if (sourceType === "video") {
      formData.append("video_url", videoUrl.trim());
    }

    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-white/[0.1] bg-[#2A344D] p-6 shadow-2xl text-right max-h-[90vh] overflow-y-auto"
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
                حدد الوجهة الأكاديمية وبيانات المورد لرفعه مباشرة
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

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* قسم السلسلة الهرمية المتصلة بالـ API مباشرة */}
          <div className="rounded-xl border border-white/[0.08] bg-[#1E2638]/90 p-4 space-y-3">
            <span className="font-bold text-[#7DA49F] block text-xs">
              1. الوجهة الأكاديمية للمحتوى:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* 1. القسم */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  القسم الأكاديمي *
                </label>
                <select
                  required
                  value={modalDeptId}
                  onChange={(e) =>
                    setModalDeptId(e.target.value ? Number(e.target.value) : "")
                  }
                  className="w-full rounded-xl border border-white/[0.1] bg-[#242D42] p-2 text-xs text-[#F8FAFC] focus:border-[#7DA49F] focus:outline-none cursor-pointer"
                >
                  <option value="">اختر القسم...</option>
                  {departments.map((d) => (
                    <option key={d.department_id} value={d.department_id}>
                      {d.name} ({d.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. المستوى */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1 flex items-center justify-between">
                  <span>المستوى الدراسي *</span>
                  {loadingLevels && (
                    <Loader2 className="h-3 w-3 animate-spin text-[#7DA49F]" />
                  )}
                </label>
                <select
                  required
                  disabled={!modalDeptId || loadingLevels}
                  value={modalLevelId}
                  onChange={(e) =>
                    setModalLevelId(
                      e.target.value ? Number(e.target.value) : "",
                    )
                  }
                  className="w-full rounded-xl border border-white/[0.1] bg-[#242D42] p-2 text-xs text-[#F8FAFC] focus:border-[#7DA49F] focus:outline-none disabled:opacity-40 cursor-pointer"
                >
                  <option value="">
                    {!modalDeptId ? "اختر القسم أولاً" : "اختر المستوى..."}
                  </option>
                  {levelsList.map((lvl) => (
                    <option key={lvl.level_id} value={lvl.level_id}>
                      {lvl.name} (مستوى {lvl.level_number})
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. الترم */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1 flex items-center justify-between">
                  <span>الترم الدراسي *</span>
                  {loadingSemesters && (
                    <Loader2 className="h-3 w-3 animate-spin text-[#7DA49F]" />
                  )}
                </label>
                <select
                  required
                  disabled={!modalLevelId || loadingSemesters}
                  value={modalSemesterId}
                  onChange={(e) =>
                    setModalSemesterId(
                      e.target.value ? Number(e.target.value) : "",
                    )
                  }
                  className="w-full rounded-xl border border-white/[0.1] bg-[#242D42] p-2 text-xs text-[#F8FAFC] focus:border-[#7DA49F] focus:outline-none disabled:opacity-40 cursor-pointer"
                >
                  <option value="">
                    {!modalLevelId ? "اختر المستوى أولاً" : "اختر الترم..."}
                  </option>
                  {semestersList.map((sem: any) => (
                    <option key={sem.semester_id} value={sem.semester_id}>
                      {sem.semester_name || sem.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 4. المقرر المطروح */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1 flex items-center justify-between">
                  <span>المقرر / المادة *</span>
                  {loadingOfferings && (
                    <Loader2 className="h-3 w-3 animate-spin text-[#7DA49F]" />
                  )}
                </label>
                <select
                  required
                  disabled={!modalSemesterId || loadingOfferings}
                  value={modalOfferingId}
                  onChange={(e) =>
                    setModalOfferingId(
                      e.target.value ? Number(e.target.value) : "",
                    )
                  }
                  className="w-full rounded-xl border border-white/[0.1] bg-[#242D42] p-2 text-xs text-[#F8FAFC] focus:border-[#7DA49F] focus:outline-none disabled:opacity-40 cursor-pointer"
                >
                  <option value="">
                    {!modalSemesterId ? "اختر الترم أولاً" : "اختر المقرر..."}
                  </option>
                  {/* ✅ الحل الشامل في الفرونت إند */}
                  {offeringsList.map((off: any) => {
                    const courseTitle =
                      off.course?.course_name_ar ||
                      off.course_name_ar ||
                      off.course_name ||
                      off.course?.course_name_en ||
                      off.name ||
                      `مقرر #${off.offering_id}`;

                    const courseCode =
                      off.course?.course_code || off.course_code || "";

                    return (
                      <option key={off.offering_id} value={off.offering_id}>
                        {courseTitle} {courseCode ? `(${courseCode})` : ""}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* 5. الدكتور المحاضر */}
              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1 flex items-center justify-between">
                  <span>الدكتور المحاضر *</span>
                  {loadingDoctors && (
                    <Loader2 className="h-3 w-3 animate-spin text-[#7DA49F]" />
                  )}
                </label>
                <select
                  required
                  disabled={!modalOfferingId || loadingDoctors}
                  value={modalCourseDoctorId}
                  onChange={(e) =>
                    setModalCourseDoctorId(
                      e.target.value ? Number(e.target.value) : "",
                    )
                  }
                  className="w-full rounded-xl border border-white/[0.1] bg-[#242D42] p-2 text-xs text-[#F8FAFC] focus:border-[#7DA49F] focus:outline-none disabled:opacity-40 cursor-pointer"
                >
                  <option value="">
                    {!modalOfferingId
                      ? "اختر المقرر أولاً"
                      : "اختر الدكتور المسند للمقرر..."}
                  </option>
                  {courseDoctorsList.map((cd: any) => {
                    const doctorDisplayName =
                      cd.doctor_name ||
                      cd.doctor?.full_name ||
                      cd.doctor?.name ||
                      cd.doctor?.user?.full_name ||
                      cd.doctor?.user?.name ||
                      cd.name ||
                      cd.full_name ||
                      `دكتور #${cd.course_doctor_id}`;

                    return (
                      <option
                        key={cd.course_doctor_id}
                        value={cd.course_doctor_id}
                      >
                        {doctorDisplayName}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          {/* بيانات وتفاصيل الملف */}
          <div>
            <label className="block text-[#F8FAFC] font-bold mb-1.5">
              عنوان المحتوى <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: المحاضرة الأولى - مقدمة عامة"
              className="w-full rounded-xl border border-white/[0.1] bg-[#1E2638] p-2.5 text-xs text-[#F8FAFC] placeholder-slate-500 focus:border-[#7DA49F] focus:outline-none"
            />
          </div>

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
                <span>رابط فيديو (YouTube)</span>
              </button>
            </div>
          </div>

          {sourceType === "file" ? (
            <div>
              <label className="block text-[#F8FAFC] font-bold mb-1.5">
                الملف المراد رفعه <span className="text-rose-400">*</span>
              </label>
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/[0.15] bg-[#1E2638] p-3 text-slate-300 hover:border-[#7DA49F] transition-colors">
                <Upload className="h-4 w-4 text-[#7DA49F]" />
                <span>
                  {selectedFile ? selectedFile.name : "اختر ملفاً من جهازك"}
                </span>
                <input
                  type="file"
                  required
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>
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

          <div className="flex justify-end gap-2.5 pt-4 border-t border-white/[0.08]">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="rounded-xl bg-[#323D59] px-4 py-2 font-bold text-[#F8FAFC] hover:bg-[#3B4868] cursor-pointer border-0"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-[#7DA49F] px-5 py-2 font-bold text-[#1E2638] hover:bg-[#9DBFB8] shadow-md transition-colors cursor-pointer border-0 disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              <span>إضافة وحفظ المحتوى</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// نافذة تعديل بيانات المحتوى
// ─────────────────────────────────────────────────────────────────────────────
interface EditModalProps {
  content: ContentEntity;
  contentTypes: ContentTypeEntity[];
  onClose: () => void;
  onSave: (updates: Partial<ContentEntity>) => Promise<void>;
}

function EditModal({ content, contentTypes, onClose, onSave }: EditModalProps) {
  const [title, setTitle] = useState(content.title);
  const [description, setDescription] = useState(content.description || "");
  const [contentTypeId, setContentTypeId] = useState(content.content_type_id);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await onSave({
      title: title.trim(),
      description: description.trim() || undefined,
      content_type_id: contentTypeId,
    });
    setIsSaving(false);
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
              disabled={isSaving}
              onClick={onClose}
              className="rounded-xl bg-[#323D59] px-4 py-2 font-bold text-[#F8FAFC] hover:bg-[#3B4868] cursor-pointer border-0"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2 font-bold text-[#1E2638] hover:bg-amber-400 transition-colors cursor-pointer border-0 disabled:opacity-50"
            >
              {isSaving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              <span>حفظ التعديلات</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
