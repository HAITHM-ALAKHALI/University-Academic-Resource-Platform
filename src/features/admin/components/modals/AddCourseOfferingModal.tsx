import React, { useState, useEffect } from "react";
import { X, BookOpen, AlertCircle, Loader2, UserCheck } from "lucide-react";
import type {
  CourseEntity,
  SemesterEntity,
  DoctorEntity,
} from "../../../../types/api";

interface CourseOfferingFormData {
  course_id: number;
  semester_id: number;
  doctor_ids: number[];
}

interface AddCourseOfferingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: CourseOfferingFormData) => Promise<boolean>;
  courses: CourseEntity[];
  semesters: SemesterEntity[];
  doctors: DoctorEntity[];
  initialData?: any | null;
  isSubmitting?: boolean;
}

export const AddCourseOfferingModal: React.FC<AddCourseOfferingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  courses,
  semesters,
  doctors,
  initialData,
  isSubmitting = false,
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [selectedSemesterId, setSelectedSemesterId] = useState<string>("");
  const [selectedDoctorIds, setSelectedDoctorIds] = useState<number[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (initialData) {
      // 1. تحديد المادة الافتراضية
      const cId =
        initialData.course_id ||
        initialData.offeringData?.course_id ||
        courses.find(
          (c) =>
            c.course_name_ar ===
            (initialData.course_name ||
              initialData.offeringData?.course?.course_name_ar),
        )?.course_id;

      setSelectedCourseId(cId ? String(cId) : "");

      // 2. تحديد الترم الافتراضي
      const sId =
        initialData.semester_id ||
        initialData.offeringData?.semester_id ||
        semesters.find(
          (s) =>
            s.name ===
              (initialData.semester_name ||
                initialData.offeringData?.semester?.name) ||
            s.semester_name ===
              (initialData.semester_name ||
                initialData.offeringData?.semester?.name),
        )?.semester_id;

      setSelectedSemesterId(sId ? String(sId) : "");

      // 3. تحديد الدكاترة المسندين مسبقاً (Checked)
      const rawDocs =
        initialData.offeringData?.doctors ||
        initialData.offeringData?.course_doctors ||
        initialData.doctors ||
        [];

      let docIds: number[] = [];

      if (Array.isArray(rawDocs) && rawDocs.length > 0) {
        docIds = rawDocs
          .map((d: any) => {
            if (d.doctor_id) return Number(d.doctor_id);
            if (d.id) return Number(d.id);
            // مطابقة بالاسم إن لم يتوفر ID مباشر
            const dName = d.user?.full_name || d.user?.name_ar || d.name;
            const matched = doctors.find(
              (doc) => (doc.user?.full_name || doc.user?.name_ar) === dName,
            );
            return matched ? matched.doctor_id : null;
          })
          .filter((id): id is number => Boolean(id));
      } else if (initialData.doctor_id || initialData.offeringData?.doctor_id) {
        docIds = [
          Number(initialData.doctor_id || initialData.offeringData?.doctor_id),
        ];
      }

      setSelectedDoctorIds(docIds);
    } else {
      setSelectedCourseId("");
      setSelectedSemesterId("");
      setSelectedDoctorIds([]);
    }
    setValidationError(null);
  }, [initialData, isOpen, courses, semesters, doctors]);
  if (!isOpen) return null;

  const handleDoctorToggle = (docId: number) => {
    setSelectedDoctorIds((prev) =>
      prev.includes(docId)
        ? prev.filter((id) => id !== docId)
        : [...prev, docId],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!selectedCourseId || !selectedSemesterId) {
      setValidationError("يرجى اختيار المادة والفصل الدراسي.");
      return;
    }

    const success = await onSubmit({
      course_id: Number(selectedCourseId),
      semester_id: Number(selectedSemesterId),
      doctor_ids: selectedDoctorIds,
    });

    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#1D263B] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2 text-[#F4F7F6]">
            <BookOpen className="h-5 w-5 text-[#899C9A]" />
            <h3 className="text-base font-bold">
              {isEditMode
                ? "تعديل بيانات المقرر المطروح"
                : "طرح مقرر دراسي في ترم"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[#AABCAF] hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Alert */}
        {validationError && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs font-semibold text-red-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#AABCAF]">
              المادة الدراسية <span className="text-red-400">*</span>
            </label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full rounded-xl border border-white/[0.07] bg-[#242D42] px-3.5 py-2.5 text-xs text-[#F4F7F6] outline-none transition-all focus:border-[#899C9A] focus:ring-2 focus:ring-[#899C9A]/20"
            >
              <option value="">-- اختر المادة --</option>
              {courses.map((c) => (
                <option key={c.course_id} value={c.course_id}>
                  {c.course_name_ar} ({c.course_code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#AABCAF]">
              الفصل الدراسي (الترم) <span className="text-red-400">*</span>
            </label>
            <select
              value={selectedSemesterId}
              onChange={(e) => setSelectedSemesterId(e.target.value)}
              className="w-full rounded-xl border border-white/[0.07] bg-[#242D42] px-3.5 py-2.5 text-xs text-[#F4F7F6] outline-none transition-all focus:border-[#899C9A] focus:ring-2 focus:ring-[#899C9A]/20"
            >
              <option value="">-- اختر الفصل الدراسي --</option>
              {semesters.map((s) => (
                <option key={s.semester_id} value={s.semester_id}>
                  {s.name ||
                    s.semester_name ||
                    `الفصل الدراسي ${s.semester_number}`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#AABCAF]">
              إسناد الكادر الأكاديمي (اختياري)
            </label>
            <div className="max-h-40 overflow-y-auto rounded-xl border border-white/[0.07] bg-[#242D42] p-2 space-y-1">
              {doctors.length === 0 ? (
                <div className="p-2 text-center text-xs text-[#AABCAF]/60">
                  لا يوجد دكاترة متاحين
                </div>
              ) : (
                doctors.map((doc) => {
                  const isChecked = selectedDoctorIds.includes(doc.doctor_id);
                  const docName =
                    doc.user?.full_name || doc.user?.name_ar || "غير محدد";

                  return (
                    <label
                      key={doc.doctor_id}
                      onClick={() => handleDoctorToggle(doc.doctor_id)}
                      className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors ${
                        isChecked
                          ? "bg-[#899C9A]/20 text-white font-semibold"
                          : "text-[#AABCAF] hover:bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <UserCheck
                          className={`h-4 w-4 ${
                            isChecked ? "text-[#899C9A]" : "text-[#AABCAF]/40"
                          }`}
                        />
                        <span>{docName}</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="h-3.5 w-3.5 rounded border-white/20 bg-[#1D263B] text-[#899C9A] focus:ring-0"
                      />
                    </label>
                  );
                })
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-white/[0.07] bg-[#242D42] px-4 py-2.5 text-xs font-semibold text-[#AABCAF] transition-colors hover:bg-white/[0.06] hover:text-white cursor-pointer disabled:opacity-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-[#899C9A] px-5 py-2.5 text-xs font-bold text-[#1D263B] shadow-md transition-all hover:bg-[#AABCAF] hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{isEditMode ? "جاري الحفظ..." : "جاري الطرح..."}</span>
                </>
              ) : (
                <span>{isEditMode ? "حفظ التعديلات" : "طرح المقرر"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseOfferingModal;
