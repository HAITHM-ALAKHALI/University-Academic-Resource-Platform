import { useState } from "react";
import { X, Loader2, BookOpen, Calendar } from "lucide-react";
import type { AddCourseOfferingPayload } from "../../../../types/api";

interface CourseOption {
  course_id: number;
  course_name_ar: string;
  course_code?: string | null;
}

interface SemesterOption {
  semester_id: number;
  name: string;
  academic_year?: string;
}

interface AddCourseOfferingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: AddCourseOfferingPayload) => Promise<boolean>;
  courses: CourseOption[];
  semesters: SemesterOption[];
  isSubmitting?: boolean;
}

export function AddCourseOfferingsModal({
  isOpen,
  onClose,
  onSubmit,
  courses,
  semesters,
  isSubmitting = false,
}: AddCourseOfferingsModalProps) {
  const [courseId, setCourseId] = useState<number | "">("");
  const [semesterId, setSemesterId] = useState<number | "">("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleModalClose = () => {
    setCourseId("");
    setSemesterId("");
    setValidationError(null);
    onClose();
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!courseId || !semesterId) {
      setValidationError("يرجى اختيار المقرر والفصل الدراسي.");
      return;
    }

    const success = await onSubmit({
      course_id: Number(courseId),
      semester_id: Number(semesterId),
    });

    if (success) {
      handleModalClose(); // تصفير وإغلاق عند النجاح
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.08] bg-[#242D42] shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-[#899C9A]" />
            <h3 className="text-sm font-bold text-[#F4F7F6]">
              طرح مقرر في فصل دراسي
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[#AABCAF] transition-colors hover:bg-white/[0.05] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {validationError && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
              {validationError}
            </div>
          )}

          {/* اختيار المقرر */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#AABCAF]">
              المقرر الدراسي <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                required
                value={courseId}
                onChange={(e) => setCourseId(Number(e.target.value))}
                className="w-full appearance-none rounded-xl border border-white/[0.08] bg-[#323D59] px-3.5 py-2.5 text-xs text-white outline-none transition-all focus:border-[#899C9A] focus:ring-1 focus:ring-[#899C9A]"
              >
                <option
                  value=""
                  disabled
                  className="bg-[#242D42] text-[#AABCAF]"
                >
                  -- اختر المقرر --
                </option>
                {courses.map((course) => (
                  <option
                    key={course.course_id}
                    value={course.course_id}
                    className="bg-[#242D42] text-white"
                  >
                    {course.course_name_ar}{" "}
                    {course.course_code ? `(${course.course_code})` : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* اختيار الفصل الدراسي */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#AABCAF]">
              الفصل الدراسي (الترم) <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                required
                value={semesterId}
                onChange={(e) => setSemesterId(Number(e.target.value))}
                className="w-full appearance-none rounded-xl border border-white/[0.08] bg-[#323D59] px-3.5 py-2.5 text-xs text-white outline-none transition-all focus:border-[#899C9A] focus:ring-1 focus:ring-[#899C9A]"
              >
                <option
                  value=""
                  disabled
                  className="bg-[#242D42] text-[#AABCAF]"
                >
                  -- اختر الفصل الدراسي --
                </option>
                {semesters.map((sem) => (
                  <option
                    key={sem.semester_id}
                    value={sem.semester_id}
                    className="bg-[#242D42] text-white"
                  >
                    {sem.name}{" "}
                    {sem.academic_year ? `- ${sem.academic_year}` : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-xl border border-white/[0.04] bg-[#1E2638] p-3 text-[11px] leading-relaxed text-[#AABCAF]/80 flex items-start gap-2">
            <Calendar className="h-4 w-4 text-[#899C9A] shrink-0 mt-0.5" />
            <span>
              طرح المقرر يجعله متاحاً لإسناد الدكاترة وإضافة المحاضرات والملفات
              الأكاديمية التابعة له.
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl px-4 py-2 text-xs font-semibold text-[#AABCAF] transition-colors hover:bg-white/[0.05] hover:text-white"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-[#899C9A] px-4 py-2 text-xs font-bold text-[#1D263B] shadow-md transition-all hover:bg-[#AABCAF] disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>جاري الطرح...</span>
                </>
              ) : (
                <span>تأكيد طرح المقرر</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
