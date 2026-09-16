import { Trash2 } from "lucide-react";

export interface DeleteConfirmModalProps {
  name: string;
  onClose: () => void;
  onConfirm?: () => void;
}

export function DeleteConfirmModal({
  name,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      alert("تم الحذف بنجاح");
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-sm rounded-2xl border border-red-500/40 bg-[#323D59] p-6 text-center shadow-2xl backdrop-blur-2xl">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/20 text-red-300 border border-red-500/30">
          <Trash2 className="h-7 w-7" />
        </div>
        <h2 className="font-['Outfit'] text-lg font-bold text-[#F4F7F6]">
          تأكيد الحذف
        </h2>
        <p className="mt-2 text-xs text-[#AABCAF] leading-relaxed">
          هل أنت متأكد من حذف{" "}
          <strong className="text-[#F4F7F6] font-bold">"{name}"</strong>؟
          <br />
          لا يمكن التراجع عن هذا الإجراء بعد تنفيذه.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-white/[0.07] bg-[#242D42] py-2.5 text-xs font-bold text-[#AABCAF] transition-colors hover:bg-[#3B4868] hover:text-white cursor-pointer"
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 rounded-xl bg-red-600 py-2.5 text-xs font-black text-white shadow-md transition-all hover:bg-red-500 hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            تأكيد الحذف
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
