import { X } from "lucide-react";
import type { AdminView } from "../../../types/app";

export interface AdminDialogModalProps {
  type: "add" | "edit";
  view: AdminView;
  onClose: () => void;
  onSubmit?: () => void;
}

export function AdminDialogModal({
  type,
  view,
  onClose,
  onSubmit,
}: AdminDialogModalProps) {
  const labelMap: Record<string, string> = {
    departments: "قسم",
    levels: "مستوى",
    semesters: "ترم",
    courses: "مادة",
    files: "ملف",
    users: "مستخدم",
  };
  const label = labelMap[view] ?? "عنصر";

  const fieldsMap: Record<
    string,
    Array<{ label: string; type: string; placeholder: string; full?: boolean }>
  > = {
    departments: [
      { label: "اسم القسم", type: "text", placeholder: "علوم حاسوب" },
      { label: "الاختصار", type: "text", placeholder: "CS" },
    ],
    levels: [
      { label: "اسم المستوى", type: "text", placeholder: "السنة الأولى" },
      { label: "القسم", type: "select", placeholder: "اختر القسم" },
      { label: "الترتيب", type: "number", placeholder: "1" },
    ],
    semesters: [
      { label: "اسم الترم", type: "text", placeholder: "الترم الأول" },
      { label: "المستوى", type: "select", placeholder: "اختر المستوى" },
    ],
    courses: [
      { label: "اسم المادة (عربي)", type: "text", placeholder: "برمجة 1" },
      {
        label: "اسم المادة (إنجليزي)",
        type: "text",
        placeholder: "Programming 1",
      },
      { label: "القسم", type: "select", placeholder: "اختر القسم" },
      { label: "المستوى", type: "select", placeholder: "اختر المستوى" },
      { label: "الترم", type: "select", placeholder: "اختر الترم" },
      {
        label: "وصف المادة",
        type: "textarea",
        placeholder: "وصف مختصر للمادة",
        full: true,
      },
    ],
    files: [
      { label: "اسم الملف", type: "text", placeholder: "Lecture 1.pdf" },
      { label: "المادة", type: "select", placeholder: "اختر المادة" },
      { label: "نوع الملف", type: "select", placeholder: "اختر النوع" },
    ],
    users: [
      { label: "الاسم الكامل", type: "text", placeholder: "محمد أحمد" },
      {
        label: "البريد الإلكتروني",
        type: "email",
        placeholder: "user@university.edu",
      },
      { label: "كلمة المرور", type: "password", placeholder: "••••••••" },
      { label: "الدور", type: "select", placeholder: "اختر الدور" },
    ],
  };

  const fields = fieldsMap[view] ?? [
    { label: "الاسم", type: "text", placeholder: "أدخل الاسم" },
  ];

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    } else {
      alert(type === "add" ? "تمت الإضافة بنجاح" : "تم حفظ التعديلات");
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg rounded-2xl border border-white/[0.07] bg-[#323D59] p-6 shadow-2xl backdrop-blur-2xl">
        <div className="mb-6 flex items-center justify-between border-b border-white/[0.06] pb-4">
          <div>
            <h2 className="font-['Outfit'] text-lg font-bold text-[#F4F7F6]">
              {type === "add" ? `إضافة ${label} جديد` : `تعديل ${label}`}
            </h2>
            <p className="text-xs text-[#AABCAF]">
              أدخل البيانات المطلوبة في الحقول أدناه
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#AABCAF] hover:bg-white/[0.08] hover:text-white cursor-pointer border-0 bg-transparent"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map((field, i) => (
            <div
              key={i}
              className={field.full ? "sm:col-span-2" : "sm:col-span-1"}
            >
              <label className="block text-xs font-bold text-[#AABCAF] mb-1.5">
                {field.label}
              </label>
              {field.type === "select" ? (
                <select className="w-full rounded-xl border border-white/[0.07] bg-[#242D42] px-3.5 py-2 text-xs text-[#F4F7F6] outline-none focus:border-[#899C9A] focus:ring-2 focus:ring-[#899C9A]/25 cursor-pointer">
                  <option value="">{field.placeholder}</option>
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  rows={3}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-white/[0.07] bg-[#242D42] px-3.5 py-2 text-xs text-[#F4F7F6] outline-none focus:border-[#899C9A] focus:ring-2 focus:ring-[#899C9A]/25 resize-none"
                />
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-white/[0.07] bg-[#242D42] px-3.5 py-2 text-xs text-[#F4F7F6] outline-none focus:border-[#899C9A] focus:ring-2 focus:ring-[#899C9A]/25"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3 border-t border-white/[0.06] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-white/[0.07] bg-[#242D42] py-2.5 text-xs font-bold text-[#AABCAF] transition-colors hover:bg-[#3B4868] hover:text-white cursor-pointer"
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 rounded-xl bg-[#899C9A] py-2.5 text-xs font-black text-[#1D263B] shadow-md transition-all hover:bg-[#AABCAF] hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            {type === "add" ? "✓ تأكيد الإضافة" : "💾 حفظ التغييرات"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDialogModal;
