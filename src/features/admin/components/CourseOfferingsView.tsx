import React, { useState } from "react";
import {
  Plus,
  Trash2,
  BookOpen,
  Search,
  X,
  Loader2,
  UserCheck,
} from "lucide-react";
import { useCourseOfferings } from "../../../hooks/useCourseOfferings";
import { useCourses } from "../../../hooks/useCourses";
import { useDepartments } from "../../../hooks/useDepartments";
import { useLevels } from "../../../hooks/useLevels";
import { useSemesters } from "../../../hooks/useSemesters";
import { useDoctors } from "../../../hooks/useDoctors";
import type { CourseOfferingEntity } from "../../../types/api";

export function CourseOfferingsView() {
  const [selectedSemesterFilter] = useState<number | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // استخدام هوك المقررات المطروحة
  const {
    offerings,
    loading,
    error,
    handleDeleteOffering,
    handleAddOffering,
    handleAssignDoctor,
  } = useCourseOfferings(selectedSemesterFilter);

  const filteredOfferings = offerings.filter((o: CourseOfferingEntity) => {
    const courseTitle = o.course_name || "";
    const courseCode = o.course_code || "";
    return (
      courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      courseCode.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* رأس الصفحة */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs text-[#A5B4BF]">
            دراستي / الهيكل الأكاديمي
          </span>
          <h1 className="text-2xl font-bold text-[#F8FAFC]">
            طرح المقررات الدراسية
          </h1>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#7DA49F] px-4 py-2.5 text-xs font-bold text-[#1E2638] shadow-lg transition-all hover:bg-[#9DBFB8] cursor-pointer border-0"
        >
          <Plus className="h-4 w-4" />
          <span>طرح مقرر في ترم</span>
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-400">
          {error}
        </div>
      )}

      {/* شريط البحث */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث في المقررات المطروحة باسم المادة أو الرمز..."
            className="w-full rounded-xl border border-white/[0.1] bg-[#242D42] py-2 pr-9 pl-4 text-xs text-[#F8FAFC] placeholder-slate-400 focus:border-[#7DA49F] focus:outline-none"
          />
        </div>
      </div>

      {/* جدول المقررات المطروحة */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#242D42]/60 shadow-xl backdrop-blur-sm">
        <table className="w-full text-right text-xs text-slate-300">
          <thead className="border-b border-white/[0.08] bg-[#1E2638] font-bold text-[#A5B4BF]">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">اسم المقرر</th>
              <th className="py-3 px-4">رمز المقرر</th>
              <th className="py-3 px-4">الترم الدراسي</th>
              <th className="py-3 px-4">المستوى / القسم</th>
              <th className="py-3 px-4">الدكتور المسند</th>
              <th className="py-3 px-4 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05]">
            {loading ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-[#7DA49F]" />
                    <span>جارٍ تحميل المقررات المطروحة...</span>
                  </div>
                </td>
              </tr>
            ) : filteredOfferings.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  لا توجد مقررات مطروحة حالياً.
                </td>
              </tr>
            ) : (
              filteredOfferings.map((item: CourseOfferingEntity, idx) => {
                const courseName = item.course_name || "مقرر غير محدد";
                const courseCode = item.course_code || "-";
                const semesterName = item.semester_name || "-";
                const doctorName =
                  item.doctors && item.doctors.length > 0
                    ? item.doctors.map((d) => d.doctor_name).join("، ")
                    : "غير مسند";

                return (
                  <tr
                    key={item.offering_id}
                    className="transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="py-3 px-4 text-slate-400">{idx + 1}</td>
                    <td className="py-3 px-4 font-bold text-[#F8FAFC]">
                      {courseName}
                    </td>
                    <td className="py-3 px-4 font-mono text-[#7DA49F]">
                      {courseCode}
                    </td>
                    <td className="py-3 px-4">{semesterName}</td>
                    <td className="py-3 px-4 text-slate-400">-</td>
                    <td className="py-3 px-4 font-semibold text-slate-200">
                      <span className="inline-flex items-center gap-1.5">
                        <UserCheck className="h-3.5 w-3.5 text-[#7DA49F]" />
                        {doctorName}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDeleteOffering(item.offering_id)}
                        className="rounded-lg p-1.5 text-rose-400 hover:bg-rose-500/10 cursor-pointer border-0 bg-transparent transition-colors"
                        title="حذف الطرح"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* نافذة طرح مقرر جديد */}
      {isAddModalOpen && (
        <AddOfferingModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddOffering}
          onAssignDoctor={handleAssignDoctor}
        />
      )}
    </div>
  );
}

// ─── نافذة الطرح: AddOfferingModal ───
function AddOfferingModal({
  onClose,
  onAdd,
  onAssignDoctor,
}: {
  onClose: () => void;
  onAdd: (payload: any) => Promise<boolean>;
  onAssignDoctor: (payload: any) => Promise<boolean>;
}) {
  // استخدام الهوكات المعرفة مسبقاً
  const { courses, loading: loadingCourses } = useCourses();
  const { departments, loading: loadingDepts } = useDepartments();
  const { levels, loading: loadingLevels } = useLevels();
  const { semesters, loading: loadingSemesters } = useSemesters();
  const { doctorsList: doctors, loading: loadingDoctors } = useDoctors();

  const [selectedCourseId, setSelectedCourseId] = useState<number | "">("");
  const [selectedDeptId, setSelectedDeptId] = useState<number | "">("");
  const [selectedLevelId, setSelectedLevelId] = useState<number | "">("");
  const [selectedSemesterId, setSelectedSemesterId] = useState<number | "">("");
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | "">("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // فلترة المستويات بناءً على القسم المختار
  const filteredLevels = levels.filter(
    (lvl) => !selectedDeptId || lvl.department_id === Number(selectedDeptId),
  );

  // فلترة الترمات بناءً على المستوى المختار
  const filteredSemesters = semesters.filter(
    (sem) => !selectedLevelId || sem.level_id === Number(selectedLevelId),
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseId || !selectedSemesterId) {
      alert("يرجى اختيار المقرر والترم الدراسي.");
      return;
    }

    try {
      setIsSubmitting(true);

      // 1. طرح المقرر والحصول على معرف السجل الجديد
      const newOfferingId = await onAdd({
        course_id: Number(selectedCourseId),
        semester_id: Number(selectedSemesterId),
      });

      // 2. إسناد الدكتور إن تم اختياره بنجاح
      if (newOfferingId && selectedDoctorId) {
        await onAssignDoctor({
          offering_id: newOfferingId,
          doctor_id: Number(selectedDoctorId),
        });
      }

      if (newOfferingId) {
        onClose();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-white/[0.1] bg-[#2A344D] p-6 shadow-2xl text-right"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#323D59] to-[#7DA49F] text-[#F8FAFC]">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F8FAFC]">
                طرح مقرر دراسي جديد
              </h3>
              <p className="text-[11px] text-[#A5B4BF]">
                ربط مادة من الكتالوج العام بترم دراسي وتعيين الدكتور المسؤول
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white border-0 bg-transparent cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* اختيار المادة (من useCourses) */}
          <div>
            <label className="block text-[#F8FAFC] font-bold mb-1">
              المقرر / المادة *
            </label>
            <select
              required
              disabled={loadingCourses}
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(Number(e.target.value))}
              className="w-full rounded-xl border border-white/[0.1] bg-[#1E2638] p-2.5 text-xs text-[#F8FAFC] focus:border-[#7DA49F] focus:outline-none cursor-pointer disabled:opacity-50"
            >
              <option value="">
                {loadingCourses ? "جارٍ تحميل المواد..." : "اختر المادة..."}
              </option>
              {courses.map((c) => (
                <option key={c.course_id} value={c.course_id}>
                  {c.course_name_ar || (c as any).name} ({c.course_code})
                </option>
              ))}
            </select>
          </div>

          {/* التدرج الأكاديمي (الأقسام، المستويات، الترمات عبر الهوكات) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                القسم *
              </label>
              <select
                required
                disabled={loadingDepts}
                value={selectedDeptId}
                onChange={(e) => {
                  setSelectedDeptId(
                    e.target.value ? Number(e.target.value) : "",
                  );
                  setSelectedLevelId("");
                  setSelectedSemesterId("");
                }}
                className="w-full rounded-xl border border-white/[0.1] bg-[#1E2638] p-2 text-xs text-[#F8FAFC] focus:border-[#7DA49F] focus:outline-none cursor-pointer disabled:opacity-50"
              >
                <option value="">
                  {loadingDepts ? "جارٍ التحميل..." : "اختر القسم..."}
                </option>
                {departments.map((d) => (
                  <option key={d.department_id} value={d.department_id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                المستوى *
              </label>
              <select
                required
                disabled={!selectedDeptId || loadingLevels}
                value={selectedLevelId}
                onChange={(e) => {
                  setSelectedLevelId(
                    e.target.value ? Number(e.target.value) : "",
                  );
                  setSelectedSemesterId("");
                }}
                className="w-full rounded-xl border border-white/[0.1] bg-[#1E2638] p-2 text-xs text-[#F8FAFC] focus:border-[#7DA49F] focus:outline-none disabled:opacity-40 cursor-pointer"
              >
                <option value="">
                  {!selectedDeptId ? "اختر القسم أولاً" : "اختر المستوى..."}
                </option>
                {filteredLevels.map((lvl) => (
                  <option key={lvl.level_id} value={lvl.level_id}>
                    {(lvl as any).level_name ||
                      lvl.name ||
                      `مستوى ${lvl.level_number}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                الترم *
              </label>
              <select
                required
                disabled={!selectedLevelId || loadingSemesters}
                value={selectedSemesterId}
                onChange={(e) =>
                  setSelectedSemesterId(
                    e.target.value ? Number(e.target.value) : "",
                  )
                }
                className="w-full rounded-xl border border-white/[0.1] bg-[#1E2638] p-2 text-xs text-[#F8FAFC] focus:border-[#7DA49F] focus:outline-none disabled:opacity-40 cursor-pointer"
              >
                <option value="">
                  {!selectedLevelId ? "اختر المستوى أولاً" : "اختر الترم..."}
                </option>
                {filteredSemesters.map((s) => (
                  <option key={s.semester_id} value={s.semester_id}>
                    {(s as any).semester_name ||
                      s.name ||
                      `الفصل ${s.semester_number}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* تعيين الدكتور (من useDoctors) */}
          <div>
            <label className="block text-[#F8FAFC] font-bold mb-1">
              الدكتور المحاضر للمقرر (اختياري)
            </label>
            <select
              disabled={loadingDoctors}
              value={selectedDoctorId}
              onChange={(e) =>
                setSelectedDoctorId(
                  e.target.value ? Number(e.target.value) : "",
                )
              }
              className="w-full rounded-xl border border-white/[0.1] bg-[#1E2638] p-2.5 text-xs text-[#F8FAFC] focus:border-[#7DA49F] focus:outline-none cursor-pointer disabled:opacity-50"
            >
              <option value="">
                {loadingDoctors
                  ? "جارٍ تحميل الدكاترة..."
                  : "اختر الدكتور المسند..."}
              </option>
              {doctors.map((doc: any) => (
                <option key={doc.doctor_id} value={doc.doctor_id}>
                  {doc.doctor_name ||
                    doc.full_name ||
                    doc.name ||
                    doc.user?.full_name ||
                    `دكتور #${doc.doctor_id}`}
                </option>
              ))}
            </select>
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
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-[#7DA49F] px-5 py-2 font-bold text-[#1E2638] hover:bg-[#9DBFB8] shadow-md transition-colors cursor-pointer border-0 disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              <span>تأكيد وطرح المقرر</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
