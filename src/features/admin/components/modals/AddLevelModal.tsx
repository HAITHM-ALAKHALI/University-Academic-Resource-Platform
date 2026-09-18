import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import type {
  AddLevel,
  LevelEntity,
  DepartmentEntity,
} from "../../../../types/api";

interface AddLevelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: AddLevel) => Promise<boolean>;
  departments: DepartmentEntity[];
  isSubmitting?: boolean;
  initialData?: LevelEntity | null;
}

export function AddLevelModal({
  isOpen,
  onClose,
  onSubmit,
  departments,
  isSubmitting = false,
  initialData = null,
}: AddLevelModalProps) {
  const [name, setName] = useState("");
  const [selectedDeptIds, setSelectedDeptIds] = useState<number[]>([]);
  const [levelNumber, setLevelNumber] = useState<number>(1);
  const [validationError, setValidationError] = useState<string | null>(null);

  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSelectedDeptIds([initialData.department_id]);
      setLevelNumber(initialData.level_number);
    } else {
      setName("");
      setSelectedDeptIds(
        departments.length > 0 ? [departments[0].department_id] : [],
      );
      setLevelNumber(1);
    }
    setValidationError(null);
  }, [initialData, isOpen, departments]);

  if (!isOpen) return null;

  const toggleDepartment = (deptId: number) => {
    setSelectedDeptIds((prev) =>
      prev.includes(deptId)
        ? prev.filter((id) => id !== deptId)
        : [...prev, deptId],
    );
  };

  const handleSelectAll = () => {
    if (selectedDeptIds.length === departments.length) {
      setSelectedDeptIds([]);
    } else {
      setSelectedDeptIds(departments.map((d) => d.department_id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!name.trim() || selectedDeptIds.length === 0) {
      setValidationError("يرجى إدخال اسم المستوى واختيار قسم واحد على الأقل");
      return;
    }

    const success = await onSubmit({
      name: name.trim(),
      department_ids: selectedDeptIds,
      level_number: Number(levelNumber),
    });

    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.08] bg-[#242D42] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
          <h3 className="text-sm font-bold text-[#F4F7F6]">
            {isEditMode
              ? "تعديل بيانات المستوى"
              : "إضافة مستوى دراسي مجمع للأقسام"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-[#AABCAF] hover:bg-white/[0.05] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {validationError && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
              {validationError}
            </div>
          )}

          {/* اختيار الأقسام (تحديد مفرد أو متعدد) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-[#AABCAF]">
                الأقسام التابعة <span className="text-red-400">*</span>
              </label>
              {!isEditMode && (
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-[11px] text-[#899C9A] hover:underline"
                >
                  {selectedDeptIds.length === departments.length
                    ? "إلغاء تحديد الكل"
                    : "تحديد كل الأقسام"}
                </button>
              )}
            </div>

            <div className="max-h-36 overflow-y-auto space-y-1.5 rounded-xl border border-white/[0.08] bg-[#1E2638] p-3">
              {departments.map((dept) => {
                const isChecked = selectedDeptIds.includes(dept.department_id);
                return (
                  <label
                    key={dept.department_id}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer text-xs transition-colors ${
                      isChecked
                        ? "bg-[#323D59] text-white"
                        : "text-[#AABCAF] hover:bg-white/[0.02]"
                    }`}
                  >
                    <span>{dept.name}</span>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleDepartment(dept.department_id)}
                      className="rounded border-white/20 bg-transparent text-[#899C9A] focus:ring-0"
                    />
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#AABCAF]">
              اسم المستوى <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: المستوى الأول"
              className="w-full rounded-xl border border-white/[0.08] bg-[#323D59] px-3.5 py-2.5 text-xs text-white placeholder-[#AABCAF]/60 outline-none focus:border-[#899C9A] focus:ring-1 focus:ring-[#899C9A]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#AABCAF]">
              رقم المستوى الترتيبي (1 - 6){" "}
              <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              min={1}
              max={6}
              required
              value={levelNumber}
              onChange={(e) => setLevelNumber(Number(e.target.value))}
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
                <span>{isEditMode ? "حفظ التعديلات" : "إضافة المستوى"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
