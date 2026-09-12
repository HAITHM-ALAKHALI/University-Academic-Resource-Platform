import { FileText, GraduationCap, ChevronLeft } from "lucide-react";
import type { AcademicCourse, Doctor } from "../types/academic";

interface CourseCardProps {
  course: AcademicCourse;
  doctors: Doctor[];
  onSelectCourse: (course: AcademicCourse) => void;
  onSelectDoctor: (course: AcademicCourse, doctor: Doctor) => void;
}

export default function CourseCard({
  course,
  doctors,
  onSelectCourse,
  onSelectDoctor,
}: CourseCardProps) {
  // Find doctors teaching this course
  const teachingDoctors = doctors.filter((doc) =>
    course.doctorIds?.includes(doc.id) || doc.assignedCourseIds?.includes(course.id)
  );

  return (
    <div
      onClick={() => onSelectCourse(course)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-[#323D59] p-6 text-right shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-white/[0.15] hover:shadow-2xl hover:bg-[#3B4868] cursor-pointer"
    >
      {/* Background ambient glow */}
      <div
        className="absolute -top-6 -left-6 h-28 w-28 rounded-full transition-transform group-hover:scale-125 duration-500 opacity-[0.12] blur-xl pointer-events-none"
        style={{ background: course.color }}
      />

      {/* Course Top Info */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5 flex-1 min-w-0">
            {/* Course Icon */}
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-mono text-xl font-bold transition-transform duration-300 group-hover:scale-110 shadow-md"
              style={{
                background: `${course.color}18`,
                color: course.color,
                border: `1.5px solid ${course.color}30`,
              }}
            >
              {course.icon}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-base font-bold text-[#F8FAFC] group-hover:text-[#9DBFB8] transition-colors">
                  {course.name}
                </h3>
                {course.code && (
                  <span
                    className="shrink-0 font-['JetBrains_Mono'] rounded-md px-1.5 py-0.5 text-[10px] font-bold border"
                    style={{
                      borderColor: `${course.color}30`,
                      color: course.color,
                      backgroundColor: `${course.color}12`,
                    }}
                  >
                    {course.code}
                  </span>
                )}
              </div>
              <p className="truncate text-xs font-semibold text-[#A5B4BF] mt-0.5">
                {course.nameEn}
              </p>
            </div>
          </div>

          {/* Rating */}
          <span className="shrink-0 flex items-center gap-1 rounded-lg bg-[#242D42]/60 px-2 py-1 text-xs font-bold text-[#7DA49F] border border-white/[0.05]">
            <span>★</span>
            <span>{course.rating}</span>
          </span>
        </div>

        {/* Teaching Faculty / Doctors Interactive Chips */}
        <div className="mt-4 pt-3.5 border-t border-white/[0.06]">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#A5B4BF] mb-2">
            <GraduationCap className="h-3.5 w-3.5 text-[#7DA49F]" />
            <span>هيئة التدريس:</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {teachingDoctors.length > 0 ? (
              teachingDoctors.map((doc) => (
                <button
                  key={doc.id}
                  type="button"
                  title={`عرض ملفات ومحاضرات ${doc.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDoctor(course, doc);
                  }}
                  className="group/chip inline-flex items-center gap-1.5 rounded-lg border border-[#7DA49F]/25 bg-[#242D42]/85 px-2.5 py-1 text-[11px] font-bold text-[#F8FAFC] transition-all duration-200 hover:border-[#7DA49F]/60 hover:bg-[#7DA49F]/20 hover:text-[#9DBFB8] hover:scale-[1.03] active:scale-95 cursor-pointer shadow-sm"
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#7DA49F]/20 text-[9px] text-[#7DA49F] group-hover/chip:bg-[#7DA49F] group-hover/chip:text-[#1E2638] transition-colors font-bold">
                    {doc.name.replace("د. ", "").charAt(0)}
                  </span>
                  <span>{doc.name}</span>
                  <ChevronLeft className="h-3 w-3 text-[#7DA49F]/70 opacity-0 -mr-1 transition-all group-hover/chip:opacity-100 group-hover/chip:mr-0" />
                </button>
              ))
            ) : (
              <span className="text-[11px] font-medium text-[#7A8A9B]">
                غير محدد حالياً
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer: Files count and Access action */}
      <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-3.5">
        <span
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold shadow-sm"
          style={{
            color: course.color,
            background: `${course.color}15`,
            border: `1px solid ${course.color}25`,
          }}
        >
          <FileText className="h-3.5 w-3.5" />
          <span>{course.files} ملف دراسي</span>
        </span>

        <span className="text-xs font-bold text-[#7DA49F] group-hover:text-[#9DBFB8] transition-colors flex items-center gap-1">
          <span>تصفح المادة</span>
          <ChevronLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
        </span>
      </div>
    </div>
  );
}
