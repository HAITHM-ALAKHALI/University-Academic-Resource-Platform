import { UserCheck, Mail, Phone } from "lucide-react";
import type { Doctor } from "../../../types/academic";

export interface DoctorSelectorProps {
  courseDoctors: Doctor[];
  selectedDoctorId?: string;
  activeDoctor?: Doctor;
  onSelectDoctor: (doctorId?: string) => void;
}

export function DoctorSelector({
  courseDoctors,
  selectedDoctorId,
  activeDoctor,
  onSelectDoctor,
}: DoctorSelectorProps) {
  return (
    <div className="space-y-4">
      {/* Quick Doctor Switcher Chips Header */}
      {courseDoctors.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-[#A5B4BF] ml-1">
            تصفية حسب الدكتور:
          </span>
          <button
            type="button"
            onClick={() => onSelectDoctor(undefined)}
            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
              !selectedDoctorId
                ? "bg-[#7DA49F] text-[#1E2638] shadow-sm"
                : "bg-[#323D59] text-[#A5B4BF] hover:bg-[#3B4868] hover:text-[#F8FAFC] border border-white/[0.06]"
            }`}
          >
            جميع المحاضرين
          </button>
          {courseDoctors.map((doc) => {
            const isSelected = selectedDoctorId === doc.id;
            return (
              <button
                key={doc.id}
                type="button"
                onClick={() => onSelectDoctor(doc.id)}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#7DA49F] text-[#1E2638] shadow-sm font-extrabold"
                    : "bg-[#323D59] text-[#A5B4BF] hover:bg-[#3B4868] hover:text-[#F8FAFC] border border-white/[0.06]"
                }`}
              >
                <span>{doc.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Active Doctor Indicator Banner */}
      {activeDoctor ? (
        <div className="relative overflow-hidden rounded-2xl border border-[#7DA49F]/35 bg-gradient-to-r from-[#323D59] via-[#323D59]/90 to-[#242D42] p-5 shadow-xl">
          <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-[#7DA49F]/10 blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Doctor Avatar Badge */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#7DA49F]/30 to-[#9DBFB8]/20 text-[#F8FAFC] border border-[#7DA49F]/40 shadow-inner">
                <span className="text-lg font-black text-[#7DA49F]">
                  {activeDoctor.name.replace("د. ", "").charAt(0)}
                </span>
              </div>

              {/* Doctor Info */}
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="rounded-md bg-[#7DA49F]/20 px-2 py-0.5 text-[10px] font-bold text-[#9DBFB8] border border-[#7DA49F]/30">
                    مدرس المادة
                  </span>
                  <span className="text-xs font-bold text-[#A5B4BF]">
                    {activeDoctor.academicTitle} · قسم {activeDoctor.department}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-black text-[#F8FAFC] mt-0.5">
                  تدريس: {activeDoctor.name}
                </h2>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#A5B4BF]">
                  <span className="flex items-center gap-1.5 font-['JetBrains_Mono']">
                    <Mail className="h-3.5 w-3.5 text-[#7DA49F]" />
                    <span>{activeDoctor.email}</span>
                  </span>
                  <span>·</span>
                  <span
                    className="flex items-center gap-1.5 font-['JetBrains_Mono']"
                    dir="ltr"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#7DA49F]" />
                    <span>{activeDoctor.phone}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-[#323D59]/60 px-5 py-3 text-xs">
          <div className="flex items-center gap-2 text-[#A5B4BF]">
            <UserCheck className="h-4 w-4 text-[#7DA49F]" />
            <span>
              يتم حالياً عرض <strong>جميع الموارد والملفات</strong> لكافة مدرسي
              المادة ({courseDoctors.map((d) => d.name).join("، ")}).
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#7DA49F]">
            اختر دكتوراً من الأعلى لعرض ملفاته الخاصة
          </span>
        </div>
      )}
    </div>
  );
}

export default DoctorSelector;
