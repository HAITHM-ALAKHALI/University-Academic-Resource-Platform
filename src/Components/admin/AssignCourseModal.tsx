import { useState, useMemo, type FormEvent } from "react";
import { X, BookOpen, Link, Check, Trash2, AlertCircle } from "lucide-react";
import type { Doctor, AcademicCourse } from "../../types/academic";
import {
  academicDepartments,
  academicLevels,
  academicSemesters,
} from "../../data/academicData";

interface Props {
  isOpen: boolean;
  doctor: Doctor | null;
  courses: AcademicCourse[];
  onClose: () => void;
  onAssign: (doctorId: string, courseId: number) => void;
  onUnassign: (doctorId: string, courseId: number) => void;
}

export default function AssignCourseModal({
  isOpen,
  doctor,
  courses,
  onClose,
  onAssign,
  onUnassign,
}: Props) {
  const [selectedDept, setSelectedDept] = useState(
    doctor?.department || academicDepartments[0]
  );
  const [selectedLevel, setSelectedLevel] = useState(academicLevels[0]);
  const [selectedSemester, setSelectedSemester] = useState(
    academicSemesters[0]
  );
  const [selectedCourseId, setSelectedCourseId] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);

  // Available courses matching department, level, semester (or all in department)
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchDept = !selectedDept || c.department === selectedDept;
      const matchLevel = !selectedLevel || c.level === selectedLevel;
      const matchSem = !selectedSemester || c.semester === selectedSemester;
      return matchDept && matchLevel && matchSem;
    });
  }, [courses, selectedDept, selectedLevel, selectedSemester]);

  // Fallback if strict filter yields 0 courses
  const selectableCourses = useMemo(() => {
    if (filteredCourses.length > 0) return filteredCourses;
    return courses.filter((c) => !selectedDept || c.department === selectedDept);
  }, [filteredCourses, courses, selectedDept]);

  // Currently assigned courses to this doctor
  const assignedCourses = useMemo(() => {
    if (!doctor) return [];
    return courses.filter(
      (c) =>
        doctor.assignedCourseIds?.includes(c.id) ||
        c.doctorIds?.includes(doctor.id)
    );
  }, [doctor, courses]);

  if (!isOpen || !doctor) return null;

  const isCourseAlreadyAssigned =
    selectedCourseId !== "" &&
    assignedCourses.some((c) => c.id === Number(selectedCourseId));

  const handleAssign = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedCourseId) {
      setError("يرجى اختيار مادة دراسية لربطها بالدكتور");
      return;
    }

    if (isCourseAlreadyAssigned) {
      setError("هذه المادة مسندة بالفعل لهذا الدكتور");
      return;
    }

    onAssign(doctor.id, Number(selectedCourseId));
    setSelectedCourseId("");
    setError(null);
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
              <Link className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-['Outfit'] text-lg font-bold text-[#F4F7F6]">
                ربط الدكتور بمادة دراسية
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-bold text-[#7DA49F]">
                  {doctor.name}
                </span>
                <span className="text-[11px] text-[#A5B4BF]">
                  ({doctor.academicTitle} · قسم {doctor.department})
                </span>
              </div>
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

        <div className="space-y-6">
          {/* Currently Assigned Courses */}
          <div>
            <label className="block text-xs font-bold text-[#A5B4BF] mb-2">
              المواد المسندة حالياً ({assignedCourses.length})
            </label>
            {assignedCourses.length > 0 ? (
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
                {assignedCourses.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#242D42] px-3 py-1.5 shadow-sm"
                  >
                    <BookOpen className="h-3.5 w-3.5 text-[#7DA49F]" />
                    <span className="text-xs font-bold text-[#F8FAFC]">
                      {c.name}
                    </span>
                    <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-bold text-[#A5B4BF]">
                      {c.code}
                    </span>
                    <button
                      type="button"
                      title="إلغاء ربط المادة"
                      onClick={() => onUnassign(doctor.id, c.id)}
                      className="text-red-400 hover:text-red-300 transition-colors p-0.5 hover:bg-red-500/10 rounded cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-dashed border-white/[0.08] bg-[#242D42]/50 p-3 text-center text-xs text-[#7A8A9B]">
                لا توجد مواد دراسية مسندة لهذا الدكتور حتى الآن.
              </p>
            )}
          </div>

          {/* Form to Assign a New Course */}
          <form
            onSubmit={handleAssign}
            className="rounded-2xl border border-white/[0.07] bg-[#242D42]/60 p-4 space-y-4"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-[#F8FAFC] pb-1 border-b border-white/[0.06]">
              <Link className="h-3.5 w-3.5 text-[#7DA49F]" />
              <span>إسناد مادة جديدة</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Department */}
              <div>
                <label className="block text-[11px] font-bold text-[#A5B4BF] mb-1">
                  1. القسم الأكاديمي
                </label>
                <select
                  value={selectedDept}
                  onChange={(e) => {
                    setSelectedDept(e.target.value);
                    setSelectedCourseId("");
                    setError(null);
                  }}
                  className="w-full rounded-xl border border-white/[0.08] bg-[#323D59] px-3 py-2 text-xs text-[#F8FAFC] outline-none focus:border-[#7DA49F] cursor-pointer"
                >
                  {academicDepartments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level */}
              <div>
                <label className="block text-[11px] font-bold text-[#A5B4BF] mb-1">
                  2. المستوى الدراسي
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => {
                    setSelectedLevel(e.target.value);
                    setSelectedCourseId("");
                    setError(null);
                  }}
                  className="w-full rounded-xl border border-white/[0.08] bg-[#323D59] px-3 py-2 text-xs text-[#F8FAFC] outline-none focus:border-[#7DA49F] cursor-pointer"
                >
                  {academicLevels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>

              {/* Semester */}
              <div>
                <label className="block text-[11px] font-bold text-[#A5B4BF] mb-1">
                  3. الترم الدراسي
                </label>
                <select
                  value={selectedSemester}
                  onChange={(e) => {
                    setSelectedSemester(e.target.value);
                    setSelectedCourseId("");
                    setError(null);
                  }}
                  className="w-full rounded-xl border border-white/[0.08] bg-[#323D59] px-3 py-2 text-xs text-[#F8FAFC] outline-none focus:border-[#7DA49F] cursor-pointer"
                >
                  {academicSemesters.map((sem) => (
                    <option key={sem} value={sem}>
                      {sem}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Course Selector */}
            <div>
              <label className="block text-xs font-bold text-[#A5B4BF] mb-1.5">
                4. المادة الدراسية المراد ربطها <span className="text-red-400">*</span>
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => {
                  setSelectedCourseId(
                    e.target.value ? Number(e.target.value) : ""
                  );
                  setError(null);
                }}
                className="w-full rounded-xl border border-white/[0.08] bg-[#323D59] px-3.5 py-2.5 text-xs text-[#F8FAFC] outline-none focus:border-[#7DA49F] cursor-pointer font-bold"
              >
                <option value="">-- اختر المادة الدراسية --</option>
                {selectableCourses.map((c) => {
                  const already = assignedCourses.some((ac) => ac.id === c.id);
                  return (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.code}) {already ? "— (مسندة بالفعل)" : ""}
                    </option>
                  );
                })}
              </select>
            </div>

            {error && (
              <div className="flex items-center gap-1.5 text-xs text-red-400 font-semibold bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!selectedCourseId || isCourseAlreadyAssigned}
              className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-black transition-all ${
                !selectedCourseId || isCourseAlreadyAssigned
                  ? "bg-white/[0.08] text-[#7A8A9B] cursor-not-allowed"
                  : "bg-[#7DA49F] text-[#1E2638] hover:bg-[#9DBFB8] hover:scale-[1.01] active:scale-95 cursor-pointer shadow-md"
              }`}
            >
              <Check className="h-4 w-4" />
              <span>تأكيد الربط بالمادة</span>
            </button>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex items-center justify-end border-t border-white/[0.06] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/[0.08] bg-[#242D42] px-6 py-2 text-xs font-bold text-[#A5B4BF] transition-colors hover:bg-white/[0.05] hover:text-[#F8FAFC] cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
