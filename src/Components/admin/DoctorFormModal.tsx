import { useState, useEffect, type FormEvent } from "react";
import { X, UserPlus, Edit3, AlertCircle, Check } from "lucide-react";
import type { Doctor, DoctorFormData, AcademicTitle } from "../../types/academic";
import { academicDepartments } from "../../data/academicData";

interface Props {
  isOpen: boolean;
  doctorToEdit?: Doctor | null;
  onClose: () => void;
  onSave: (doctor: Doctor) => void;
}

const academicTitles: AcademicTitle[] = [
  "أستاذ دكتور",
  "أستاذ مشارك",
  "أستاذ مساعد",
  "دكتور",
  "محاضر",
  "معيد",
];

export default function DoctorFormModal({
  isOpen,
  doctorToEdit,
  onClose,
  onSave,
}: Props) {
  const [formData, setFormData] = useState<DoctorFormData>({
    name: "",
    academicTitle: "دكتور",
    department: academicDepartments[0],
    email: "",
    phone: "",
    bio: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (doctorToEdit) {
      setFormData({
        name: doctorToEdit.name,
        academicTitle: doctorToEdit.academicTitle,
        department: doctorToEdit.department,
        email: doctorToEdit.email,
        phone: doctorToEdit.phone,
        bio: doctorToEdit.bio || "",
      });
    } else {
      setFormData({
        name: "",
        academicTitle: "دكتور",
        department: academicDepartments[0],
        email: "",
        phone: "",
        bio: "",
      });
    }
    setErrors({});
    setTouched({});
  }, [doctorToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = (data: DoctorFormData) => {
    const errs: Record<string, string> = {};

    if (!data.name.trim()) {
      errs.name = "يرجى إدخال الاسم الكامل للدكتور";
    } else if (data.name.trim().length < 3) {
      errs.name = "يجب أن يكون الاسم 3 أحرف على الأقل";
    }

    if (!data.academicTitle) {
      errs.academicTitle = "يرجى اختيار اللقب الأكاديمي";
    }

    if (!data.department) {
      errs.department = "يرجى اختيار القسم التابع له الدكتور";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      errs.email = "البريد الإلكتروني مطلوب";
    } else if (!emailRegex.test(data.email.trim())) {
      errs.email = "صيغة البريد الإلكتروني غير صحيحة (مثال: name@univ.edu)";
    }

    if (!data.phone.trim()) {
      errs.phone = "رقم الهاتف مطلوب";
    } else if (data.phone.trim().replace(/\D/g, "").length < 7) {
      errs.phone = "رقم الهاتف يجب أن يحتوي على 7 أرقام على الأقل";
    }

    return errs;
  };

  const handleChange = (
    field: keyof DoctorFormData,
    value: string
  ) => {
    const next = { ...formData, [field]: value };
    setFormData(next);
    if (touched[field]) {
      setErrors(validate(next));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const allTouched = {
      name: true,
      academicTitle: true,
      department: true,
      email: true,
      phone: true,
      bio: true,
    };
    setTouched(allTouched);

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const savedDoctor: Doctor = {
      id: doctorToEdit ? doctorToEdit.id : `doc-${Date.now()}`,
      name: formData.name.trim(),
      academicTitle: (formData.academicTitle as AcademicTitle) || "دكتور",
      department: formData.department,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      bio: formData.bio.trim(),
      assignedCourseIds: doctorToEdit ? doctorToEdit.assignedCourseIds : [],
      rating: doctorToEdit ? doctorToEdit.rating : 5.0,
    };

    onSave(savedDoctor);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      dir="rtl"
    >
      <div className="w-full max-w-xl rounded-2xl border border-white/[0.1] bg-[#323D59] p-6 shadow-2xl backdrop-blur-2xl">
        {/* Modal Header */}
        <div className="mb-5 flex items-center justify-between border-b border-white/[0.06] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7DA49F]/15 text-[#7DA49F] border border-[#7DA49F]/25">
              {doctorToEdit ? (
                <Edit3 className="h-5 w-5" />
              ) : (
                <UserPlus className="h-5 w-5" />
              )}
            </div>
            <div>
              <h2 className="font-['Outfit'] text-lg font-bold text-[#F4F7F6]">
                {doctorToEdit ? "تعديل بيانات الدكتور" : "إضافة عضو هيئة تدريس جديد"}
              </h2>
              <p className="text-xs text-[#A5B4BF]">
                يرجى ملء كافة الحقول الأساسية مع التحقق من صحة البيانات
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#A5B4BF] hover:bg-white/[0.08] hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-[#A5B4BF] mb-1.5">
                الاسم الكامل <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                placeholder="مثال: د. عبد الرقيب السماوي"
                className={`w-full rounded-xl border px-3.5 py-2.5 text-xs text-[#F4F7F6] outline-none transition-all ${
                  touched.name && errors.name
                    ? "border-red-500/70 bg-red-500/10 focus:ring-2 focus:ring-red-500/20"
                    : "border-white/[0.08] bg-[#242D42] focus:border-[#7DA49F] focus:ring-2 focus:ring-[#7DA49F]/20"
                }`}
              />
              {touched.name && errors.name && (
                <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Academic Title */}
            <div>
              <label className="block text-xs font-bold text-[#A5B4BF] mb-1.5">
                اللقب الأكاديمي <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.academicTitle}
                onChange={(e) =>
                  handleChange("academicTitle", e.target.value)
                }
                onBlur={() => handleBlur("academicTitle")}
                className="w-full rounded-xl border border-white/[0.08] bg-[#242D42] px-3.5 py-2.5 text-xs text-[#F4F7F6] outline-none focus:border-[#7DA49F] focus:ring-2 focus:ring-[#7DA49F]/20 cursor-pointer"
              >
                {academicTitles.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </div>

            {/* Department */}
            <div>
              <label className="block text-xs font-bold text-[#A5B4BF] mb-1.5">
                القسم التابع له <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.department}
                onChange={(e) => handleChange("department", e.target.value)}
                onBlur={() => handleBlur("department")}
                className="w-full rounded-xl border border-white/[0.08] bg-[#242D42] px-3.5 py-2.5 text-xs text-[#F4F7F6] outline-none focus:border-[#7DA49F] focus:ring-2 focus:ring-[#7DA49F]/20 cursor-pointer"
              >
                {academicDepartments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-[#A5B4BF] mb-1.5">
                البريد الإلكتروني الجامعي <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                dir="ltr"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="example@univ.edu"
                className={`w-full rounded-xl border px-3.5 py-2.5 text-xs text-[#F4F7F6] outline-none font-['JetBrains_Mono'] transition-all ${
                  touched.email && errors.email
                    ? "border-red-500/70 bg-red-500/10 focus:ring-2 focus:ring-red-500/20"
                    : "border-white/[0.08] bg-[#242D42] focus:border-[#7DA49F] focus:ring-2 focus:ring-[#7DA49F]/20"
                }`}
              />
              {touched.email && errors.email && (
                <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#A5B4BF] mb-1.5">
                رقم الهاتف / التحويلة المكتبية <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                dir="ltr"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                onBlur={() => handleBlur("phone")}
                placeholder="+966 50 123 4567"
                className={`w-full rounded-xl border px-3.5 py-2.5 text-xs text-[#F4F7F6] outline-none font-['JetBrains_Mono'] transition-all ${
                  touched.phone && errors.phone
                    ? "border-red-500/70 bg-red-500/10 focus:ring-2 focus:ring-red-500/20"
                    : "border-white/[0.08] bg-[#242D42] focus:border-[#7DA49F] focus:ring-2 focus:ring-[#7DA49F]/20"
                }`}
              />
              {touched.phone && errors.phone && (
                <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-red-400">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>

            {/* Bio */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#A5B4BF] mb-1.5">
                النبذة الأكاديمية والاهتمامات البحثية
              </label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                placeholder="أدخل ملخصاً عن المؤهلات الأكاديمية، الاهتمامات البحثية وسنوات الخبرة..."
                className="w-full rounded-xl border border-white/[0.08] bg-[#242D42] px-3.5 py-2.5 text-xs text-[#F4F7F6] outline-none focus:border-[#7DA49F] focus:ring-2 focus:ring-[#7DA49F]/20 resize-none"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="mt-6 flex items-center justify-end gap-3 border-t border-white/[0.06] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/[0.08] bg-[#242D42] px-5 py-2.5 text-xs font-bold text-[#A5B4BF] transition-colors hover:bg-white/[0.05] hover:text-[#F8FAFC] cursor-pointer"
            >
              إلغاء
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[#7DA49F] px-6 py-2.5 text-xs font-black text-[#1E2638] shadow-md transition-all hover:bg-[#9DBFB8] hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <Check className="h-4 w-4" />
              <span>{doctorToEdit ? "حفظ التغييرات" : "إضافة الدكتور"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
