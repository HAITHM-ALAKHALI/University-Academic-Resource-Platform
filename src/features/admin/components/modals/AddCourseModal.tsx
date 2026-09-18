import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import type { AddCourse, CourseEntity } from "../../../../types/api";

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: AddCourse) => Promise<boolean>;
  isSubmitting?: boolean;
  initialData?: CourseEntity | null;
}

export function AddCourseModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
  initialData = null,
}: AddCourseModalProps) {
  const [courseCode, setCourseCode] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [creditHours, setCreditHours] = useState<number>(3);
  const [validationError, setValidationError] = useState<string | null>(null);

  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (initialData) {
      setCourseCode(initialData.course_code);
      setNameAr(initialData.course_name_ar);
      setNameEn(initialData.course_name_en);
      setCreditHours(initialData.credit_hours);
    } else {
      setCourseCode("");
      setNameAr("");
      setNameEn("");
      setCreditHours(3);
    }
    setValidationError(null);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!courseCode.trim() || !nameAr.trim() || !nameEn.trim()) {
      setValidationError("يرجى ملء كافة الحقول الإلزامية");
      return;
    }

    const success = await onSubmit({
      course_code: courseCode.trim().toUpperCase(),
      course_name_ar: nameAr.trim(),
      course_name_en: nameEn.trim(),
      credit_hours: Number(creditHours),
    });

    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.08] bg-[#242D42] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
          <h3 className="text-sm font-bold text-[#F4F7F6]">
            {isEditMode
              ? "تعديل بيانات المادة الدراسية"
              : "إضافة مادة دراسية جديدة"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[#AABCAF] hover:bg-white/[0.05] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {validationError && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
              {validationError}
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#AABCAF]">
              رمز المادة (Course Code) <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              placeholder="مثال: CS101"
              className="w-full rounded-xl border border-white/[0.08] bg-[#323D59] px-3.5 py-2.5 font-['JetBrains_Mono'] text-xs text-white placeholder-[#AABCAF]/60 uppercase outline-none focus:border-[#899C9A] focus:ring-1 focus:ring-[#899C9A]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#AABCAF]">
              اسم المادة (بالعربية) <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              placeholder="مثال: مقدمة في علوم الحاسوب"
              className="w-full rounded-xl border border-white/[0.08] bg-[#323D59] px-3.5 py-2.5 text-xs text-white placeholder-[#AABCAF]/60 outline-none focus:border-[#899C9A] focus:ring-1 focus:ring-[#899C9A]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#AABCAF]">
              اسم المادة (بالإنجليزية) <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              placeholder="مثال: Introduction to CS"
              className="w-full rounded-xl border border-white/[0.08] bg-[#323D59] px-3.5 py-2.5 text-xs text-white placeholder-[#AABCAF]/60 outline-none focus:border-[#899C9A] focus:ring-1 focus:ring-[#899C9A]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#AABCAF]">
              عدد الساعات المعتمدة <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              min={1}
              max={10}
              required
              value={creditHours}
              onChange={(e) => setCreditHours(Number(e.target.value))}
              className="w-full rounded-xl border border-white/[0.08] bg-[#323D59] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#899C9A] focus:ring-1 focus:ring-[#899C9A]"
            />
          </div>

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
                  <span>جاري الحفظ...</span>
                </>
              ) : (
                <span>{isEditMode ? "حفظ التعديلات" : "إضافة المادة"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
