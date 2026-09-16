import { useState } from "react";
import {
  Settings,
  Shield,
  Palette,
  HardDrive,
  Mail,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

export function AdminSettingsView() {
  const [activeSection, setActiveSection] = useState("general");
  const sections = [
    { id: "general", label: "عام", icon: <Settings className="h-4 w-4" /> },
    { id: "security", label: "الأمان", icon: <Shield className="h-4 w-4" /> },
    {
      id: "appearance",
      label: "المظهر",
      icon: <Palette className="h-4 w-4" />,
    },
    {
      id: "storage",
      label: "التخزين",
      icon: <HardDrive className="h-4 w-4" />,
    },
    {
      id: "email",
      label: "البريد الإلكتروني",
      icon: <Mail className="h-4 w-4" />,
    },
    {
      id: "backup",
      label: "النسخ الاحتياطي",
      icon: <RotateCcw className="h-4 w-4" />,
    },
  ];

  const ToggleSwitch = ({
    on,
    label,
    desc,
  }: {
    on: boolean;
    label: string;
    desc?: string;
  }) => {
    const [state, setState] = useState(on);
    return (
      <div className="flex items-center justify-between border-b border-white/[0.06] py-4">
        <div>
          <div className="text-xs font-bold text-[#F4F7F6]">{label}</div>
          {desc && (
            <div className="mt-0.5 text-[11px] font-medium text-[#AABCAF]">
              {desc}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => setState(!state)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 cursor-pointer ${
            state ? "bg-[#899C9A]" : "bg-[#242D42]"
          }`}
        >
          <span
            className={`block h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-200 ${
              state ? "-translate-x-6" : "-translate-x-1"
            }`}
          />
        </button>
      </div>
    );
  };

  const Field = ({
    label,
    value,
    type = "text",
  }: {
    label: string;
    value: string;
    type?: string;
  }) => (
    <div className="mb-4">
      <label className="block text-xs font-bold text-[#AABCAF] mb-1.5">
        {label}
      </label>
      <input
        defaultValue={value}
        type={type}
        className="w-full rounded-xl border border-white/[0.07] bg-[#242D42] px-4 py-2.5 text-xs text-[#F4F7F6] outline-none transition-all focus:border-[#899C9A] focus:ring-2 focus:ring-[#899C9A]/25"
      />
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 fade-in">
      {/* Settings Navigation */}
      <div className="rounded-2xl border border-white/[0.07] bg-[#323D59] p-3 shadow-xl backdrop-blur-xl h-fit">
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveSection(s.id)}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition-all duration-150 cursor-pointer ${
              activeSection === s.id
                ? "bg-[#3B4868] text-[#F4F7F6] shadow-md border-r-2 border-[#899C9A]"
                : "text-[#AABCAF] hover:bg-white/[0.04] hover:text-[#F4F7F6]"
            }`}
          >
            <span
              className={
                activeSection === s.id ? "text-[#899C9A]" : "text-[#8E9CA8]"
              }
            >
              {s.icon}
            </span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div className="rounded-2xl border border-white/[0.07] bg-[#323D59] p-6 shadow-xl backdrop-blur-xl lg:col-span-3">
        {activeSection === "general" && (
          <div>
            <h3 className="font-['Outfit'] text-base font-bold text-[#F4F7F6] mb-4">
              إعدادات عامة
            </h3>
            <Field label="اسم المنصة" value="دراستي" />
            <Field
              label="وصف المنصة"
              value="منصة موارد أكاديمية شاملة للجامعات"
            />
            <Field
              label="البريد الإلكتروني الرسمي"
              value="admin@دراستي.edu"
              type="email"
            />
            <Field label="رقم الهاتف" value="+20 123 456 7890" />
          </div>
        )}

        {activeSection === "security" && (
          <div>
            <h3 className="font-['Outfit'] text-base font-bold text-[#F4F7F6] mb-4">
              إعدادات الأمان
            </h3>
            <ToggleSwitch
              on={true}
              label="التحقق بخطوتين (2FA)"
              desc="إضافة طبقة حماية إضافية لتسجيل الدخول"
            />
            <ToggleSwitch
              on={true}
              label="تسجيل أنشطة الدخول"
              desc="حفظ سجل كامل لعمليات تسجيل الدخول"
            />
            <ToggleSwitch
              on={false}
              label="تسجيل الخروج التلقائي"
              desc="تسجيل الخروج تلقائياً بعد 30 دقيقة خمول"
            />
            <ToggleSwitch
              on={true}
              label="تشفير الملفات السحابية"
              desc="تشفير الملفات المرفوعة بتشفير AES-256"
            />
          </div>
        )}

        {activeSection === "appearance" && (
          <div>
            <h3 className="font-['Outfit'] text-base font-bold text-[#F4F7F6] mb-4">
              إعدادات المظهر
            </h3>
            <ToggleSwitch
              on={true}
              label="الوضع الداكن الافتراضي"
              desc="استخدام سمة Lavender & Gulf Blue كوضع أساسي"
            />
            <ToggleSwitch
              on={true}
              label="تأثيرات الشفافية والزجاج (Glassmorphism)"
              desc="تفعيل طبقات الزجاج التفاعلية"
            />
          </div>
        )}

        {activeSection === "storage" && (
          <div>
            <h3 className="font-['Outfit'] text-base font-bold text-[#F4F7F6] mb-4">
              إدارة التخزين
            </h3>
            <div className="mb-6 rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
              <div className="mb-2 flex items-center justify-between text-xs font-bold">
                <span className="text-[#AABCAF]">المساحة المستهلكة</span>
                <span className="text-[#899C9A] font-['JetBrains_Mono']">
                  42.6 GB / 100 GB
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#242D42]">
                <div className="h-full w-[42.6%] rounded-full bg-gradient-to-r from-[#899C9A] to-[#AABCAF]" />
              </div>
            </div>
            <Field label="الحد الأقصى لحجم الملف (MB)" value="50" />
            <ToggleSwitch
              on={true}
              label="ضغط الصور والمستندات تلقائياً"
              desc="تقليل استهلاك المساحة السحابية"
            />
          </div>
        )}

        {activeSection === "email" && (
          <div>
            <h3 className="font-['Outfit'] text-base font-bold text-[#F4F7F6] mb-4">
              إعدادات البريد الإلكتروني
            </h3>
            <Field label="خادم SMTP" value="smtp.gmail.com" />
            <Field label="منفذ SMTP" value="587" />
            <Field
              label="البريد المُرسِل"
              value="noreply@دراستي.edu"
              type="email"
            />
          </div>
        )}

        {activeSection === "backup" && (
          <div>
            <h3 className="font-['Outfit'] text-base font-bold text-[#F4F7F6] mb-4">
              النسخ الاحتياطي والاستعادة
            </h3>
            <div className="mb-5 flex items-center gap-3 rounded-xl border border-[#899C9A]/40 bg-white/[0.03] p-4">
              <CheckCircle2 className="h-5 w-5 text-[#899C9A] shrink-0" />
              <div>
                <div className="text-xs font-bold text-[#F4F7F6]">
                  آخر نسخة احتياطية: اليوم في 03:00 ص
                </div>
                <div className="text-[11px] font-medium text-[#AABCAF]">
                  حجم النسخة: 12.4 GB — متزامنة بنجاح
                </div>
              </div>
            </div>
            <ToggleSwitch
              on={true}
              label="نسخ احتياطي تلقائي يومي"
              desc="يتم كل يوم عند الساعة 3 صباحاً"
            />
          </div>
        )}

        <div className="mt-8 flex gap-3 border-t border-white/[0.06] pt-5">
          <button
            type="button"
            className="rounded-xl bg-[#899C9A] px-6 py-2.5 text-xs font-black text-[#1D263B] shadow-md transition-all hover:bg-[#AABCAF] hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            حفظ التغييرات
          </button>
          <button
            type="button"
            className="rounded-xl border border-white/[0.07] bg-[#242D42] px-5 py-2.5 text-xs font-bold text-[#AABCAF] transition-colors hover:bg-[#3B4868] hover:text-white cursor-pointer"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminSettingsView;
