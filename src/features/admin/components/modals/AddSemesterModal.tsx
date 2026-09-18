import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import type {
  AddSemester,
  SemesterEntity,
  LevelEntity,
} from "../../../../types/api";

interface AddSemesterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: AddSemester) => Promise<boolean>;
  levels: LevelEntity[];
  isSubmitting?: boolean;
  initialData?: SemesterEntity | null;
}

export function AddSemesterModal({
  isOpen,
  onClose,
  onSubmit,
  levels,
  isSubmitting = false,
  initialData = null,
}: AddSemesterModalProps) {
  const [name, setName] = useState("");
  const [levelId, setLevelId] = useState<number | "">("");
  const [semesterNumber, setSemesterNumber] = useState<number>(1);
  const [academicYear, setAcademicYear] = useState("2024/2025");
  const [validationError, setValidationError] = useState<string | null>(null);

  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setLevelId(initialData.level_id);
      setSemesterNumber(initialData.semester_number);
      setAcademicYear(initialData.academic_year);
    } else {
      setName("");
      setLevelId(levels.length > 0 ? levels[0].level_id : "");
      setSemesterNumber(1);
      setAcademicYear("2024/2025");
    }
    setValidationError(null);
  }, [initialData, isOpen, levels]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!name.trim() || levelId === "" || !academicYear.trim()) {
      setValidationError("يرجى ملء كافة الحقول المطلوبة واختيار المستوى.");
      return;
    }

    const success = await onSubmit({
      name: name.trim(),
      level_id: Number(levelId),
      semester_number: Number(semesterNumber),
      academic_year: academicYear.trim(),
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
            {isEditMode ? "تعديل الفصل الدراسي" : "إضافة فصل دراسي جديد"}
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

          {/* اختيار المستوى */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#AABCAF]">
              المستوى الأكاديمي <span className="text-red-400">*</span>
            </label>
            <select
              required
              value={levelId}
              onChange={(e) => setLevelId(Number(e.target.value))}
              className="w-full rounded-xl border border-white/[0.08] bg-[#323D59] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#899C9A] focus:ring-1 focus:ring-[#899C9A]"
            >
              <option value="" disabled className="bg-[#242D42] text-[#AABCAF]">
                اختر المستوى الدراسي...
              </option>
              {levels.map((lvl) => (
                <option
                  key={lvl.level_id}
                  value={lvl.level_id}
                  className="bg-[#242D42] text-white"
                >
                  {lvl.name} (
                  {lvl.department?.name || `قسم #${lvl.department_id}`})
                </option>
              ))}
            </select>
          </div>

          {/* اسم الفصل */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#AABCAF]">
              اسم الترم / الفصل <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: الفصل الدراسي الأول"
              className="w-full rounded-xl border border-white/[0.08] bg-[#323D59] px-3.5 py-2.5 text-xs text-white placeholder-[#AABCAF]/60 outline-none focus:border-[#899C9A] focus:ring-1 focus:ring-[#899C9A]"
            />
          </div>

          {/* رقم الترم والعام الجامعي */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#AABCAF]">
                رقم الترم (1 - 3) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                min={1}
                max={3}
                required
                value={semesterNumber}
                onChange={(e) => setSemesterNumber(Number(e.target.value))}
                className="w-full rounded-xl border border-white/[0.08] bg-[#323D59] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#899C9A] focus:ring-1 focus:ring-[#899C9A]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#AABCAF]">
                العام الجامعي <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="2024/2025"
                className="w-full rounded-xl border border-white/[0.08] bg-[#323D59] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#899C9A] focus:ring-1 focus:ring-[#899C9A]"
              />
            </div>
          </div>

          {/* Buttons */}
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
                <span>{isEditMode ? "حفظ التعديلات" : "إضافة الفصل"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
