import React, { useState } from "react";
import { X, UploadCloud, AlertCircle, Loader2 } from "lucide-react";

interface AddCourseContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<boolean>;
  assignments: any[];
  contentTypes: any[];
  isSubmitting?: boolean;
}

export const AddCourseContentModal: React.FC<AddCourseContentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  assignments,
  contentTypes,
  isSubmitting = false,
}) => {
  const [courseDoctorId, setCourseDoctorId] = useState("");
  const [contentTypeId, setContentTypeId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!courseDoctorId || !contentTypeId || !title.trim() || !file) {
      setError("يرجى ملء جميع الحقول المطلوبة واختيار الملف.");
      return;
    }

    const formData = new FormData();
    formData.append("course_doctor_id", courseDoctorId);
    formData.append("content_type_id", contentTypeId);
    formData.append("title", title.trim());
    if (description.trim()) {
      formData.append("description", description.trim());
    }
    formData.append("file", file);

    const success = await onSubmit(formData);
    if (success) {
      setCourseDoctorId("");
      setContentTypeId("");
      setTitle("");
      setDescription("");
      setFile(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#1D263B] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2 text-[#F4F7F6]">
            <UploadCloud className="h-5 w-5 text-[#899C9A]" />
            <h3 className="text-base font-bold">رفع محتوى أكاديمي جديد</h3>
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
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#AABCAF]">
              المقرر والدكتور المسند <span className="text-red-400">*</span>
            </label>
            <select
              value={courseDoctorId}
              onChange={(e) => setCourseDoctorId(e.target.value)}
              className="w-full rounded-xl border border-white/[0.07] bg-[#242D42] px-3.5 py-2.5 text-xs text-[#F4F7F6] outline-none transition-all focus:border-[#899C9A]"
            >
              <option value="">-- اختر المادة والدكتور --</option>
              {assignments.map((item: any) => (
                <option key={item.course_doctor_id} value={item.course_doctor_id}>
                  {item.course_name} ({item.semester_name}) — {item.doctor_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#AABCAF]">
              نوع المحتوى الأكاديمي <span className="text-red-400">*</span>
            </label>
            <select
              value={contentTypeId}
              onChange={(e) => setContentTypeId(e.target.value)}
              className="w-full rounded-xl border border-white/[0.07] bg-[#242D42] px-3.5 py-2.5 text-xs text-[#F4F7F6] outline-none transition-all focus:border-[#899C9A]"
            >
              <option value="">-- اختر النوع --</option>
              {contentTypes.map((type: any) => (
                <option key={type.content_type_id} value={type.content_type_id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#AABCAF]">
              عنوان المحتوى / المحاضرة <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: المحاضرة 1 - مقدمة في هياكل البيانات"
              className="w-full rounded-xl border border-white/[0.07] bg-[#242D42] px-3.5 py-2.5 text-xs text-[#F4F7F6] outline-none transition-all focus:border-[#899C9A]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#AABCAF]">
              وصف إضافي (اختياري)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="ملاحظات توضيحية حول الملف..."
              className="w-full rounded-xl border border-white/[0.07] bg-[#242D42] px-3.5 py-2 text-xs text-[#F4F7F6] outline-none transition-all focus:border-[#899C9A]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#AABCAF]">
              الملف الأكاديمي (PDF, DOCX, ZIP...) <span className="text-red-400">*</span>
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full rounded-xl border border-white/[0.07] bg-[#242D42] px-3.5 py-2 text-xs text-[#F4F7F6] file:mr-3 file:rounded-lg file:border-0 file:bg-[#899C9A] file:px-3 file:py-1 file:text-xs file:font-semibold file:text-[#1D263B] file:cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-white/[0.07] bg-[#242D42] px-4 py-2.5 text-xs text-[#AABCAF] hover:text-white"
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
                  <span>جاري الرفع والتخزين...</span>
                </>
              ) : (
                <span>رفع الملف</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};