import React, { useState, useEffect } from "react";
import { X, UserCheck, AlertCircle, Loader2 } from "lucide-react";
import type { DoctorEntity, CourseOfferingEntity } from "../../../../types/api";

interface AssignDoctorCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: {
    offering_id: number;
    doctor_id: number;
  }) => Promise<boolean>;
  offerings: CourseOfferingEntity[];
  doctors: DoctorEntity[];
  initialData?: any | null;
  isSubmitting?: boolean;
}

export const AssignDoctorCourseModal: React.FC<
  AssignDoctorCourseModalProps
> = ({
  isOpen,
  onClose,
  onSubmit,
  offerings,
  doctors,
  initialData,
  isSubmitting = false,
}) => {
  const [selectedOfferingId, setSelectedOfferingId] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (initialData) {
      // مطابقة المقرر المطروح بالمعرف أو بالاسم
      const matchedOffering = offerings.find(
        (o: any) =>
          o.offering_id === initialData.offering_id ||
          (o.course?.course_name_ar || o.course_name) ===
            initialData.course_name,
      );
      if (matchedOffering) {
        setSelectedOfferingId(
          String(
            (matchedOffering as any).offering_id || (matchedOffering as any).id,
          ),
        );
      }

      // مطابقة الدكتور بالمعرف أو بالاسم
      const matchedDoc = doctors.find(
        (d) =>
          d.doctor_id === initialData.doctor_id ||
          (d.user?.full_name || d.user?.name_ar) === initialData.doctor_name,
      );
      if (matchedDoc) {
        setSelectedDoctorId(String(matchedDoc.doctor_id));
      }
    } else {
      setSelectedOfferingId("");
      setSelectedDoctorId("");
    }
    setError(null);
  }, [initialData, isOpen, offerings, doctors]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedOfferingId || !selectedDoctorId) {
      setError("يرجى اختيار المقرر المطروح والدكتور.");
      return;
    }

    const success = await onSubmit({
      offering_id: Number(selectedOfferingId),
      doctor_id: Number(selectedDoctorId),
    });

    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#1D263B] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2 text-[#F4F7F6]">
            <UserCheck className="h-5 w-5 text-[#899C9A]" />
            <h3 className="text-base font-bold">
              {isEditMode
                ? "تعديل إسناد مقرر لدكتور"
                : "إسناد مقرر دراسي لدكتور"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[#AABCAF] hover:bg-white/[0.06] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs font-semibold text-red-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#AABCAF]">
              المقرر المطروح في الترم <span className="text-red-400">*</span>
            </label>
            <select
              value={selectedOfferingId}
              onChange={(e) => setSelectedOfferingId(e.target.value)}
              className="w-full rounded-xl border border-white/[0.07] bg-[#242D42] px-3.5 py-2.5 text-xs text-[#F4F7F6] outline-none transition-all focus:border-[#899C9A]"
            >
              <option value="">-- اختر المقرر المطروح --</option>
              {offerings.map((o: any) => (
                <option
                  key={o.offering_id || o.id}
                  value={o.offering_id || o.id}
                >
                  {o.course?.course_name_ar || o.course_name} - (ترم:{" "}
                  {o.semester?.name || o.semester_name})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#AABCAF]">
              الدكتور <span className="text-red-400">*</span>
            </label>
            <select
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
              className="w-full rounded-xl border border-white/[0.07] bg-[#242D42] px-3.5 py-2.5 text-xs text-[#F4F7F6] outline-none transition-all focus:border-[#899C9A]"
            >
              <option value="">-- اختر الدكتور --</option>
              {doctors.map((doc) => (
                <option key={doc.doctor_id} value={doc.doctor_id}>
                  {doc.user?.full_name ||
                    doc.user?.name_ar ||
                    `دكتور #${doc.doctor_id}`}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-white/[0.07] bg-[#242D42] px-4 py-2.5 text-xs font-semibold text-[#AABCAF] hover:text-white"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-[#899C9A] px-5 py-2.5 text-xs font-bold text-[#1D263B] shadow-md hover:bg-[#AABCAF]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>جاري الحفظ...</span>
                </>
              ) : (
                <span>{isEditMode ? "حفظ التعديلات" : "إسناد المادة"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
