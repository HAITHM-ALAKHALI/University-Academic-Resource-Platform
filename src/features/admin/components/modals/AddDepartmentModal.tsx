import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import type { AddDepartment } from "../../../../types/api";

interface AddDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (payload: AddDepartment) => Promise<boolean>;
  isSubmitting?: boolean;
}

export function AddDepartmentModal({
  isOpen,
  onClose,
  onAdd,
  isSubmitting = false,
}: AddDepartmentModalProps) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!name.trim() || !code.trim()) {
      setValidationError("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    const success = await onAdd({
      name: name.trim(),
      code: code.trim().toUpperCase(),
    });

    if (success) {
      setName("");
      setCode("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.08] bg-[#242D42] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
          <h3 className="text-sm font-bold text-[#F4F7F6]">
            إضافة قسم أكاديمي جديد
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
              اسم القسم <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: هندسة البرمجيات"
              className="w-full rounded-xl border border-white/[0.08] bg-[#323D59] px-3.5 py-2.5 text-xs text-white placeholder-[#AABCAF]/60 outline-none focus:border-[#899C9A] focus:ring-1 focus:ring-[#899C9A]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#AABCAF]">
              رمز القسم (Code) <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="مثال: SE"
              className="w-full rounded-xl border border-white/[0.08] bg-[#323D59] px-3.5 py-2.5 font-['JetBrains_Mono'] text-xs text-white placeholder-[#AABCAF]/60 uppercase outline-none focus:border-[#899C9A] focus:ring-1 focus:ring-[#899C9A]"
            />
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
                  <span>جاري الحفظ...</span>
                </>
              ) : (
                <span>إضافة القسم</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
