import { useState } from "react";
import {
  Search,
  Download,
  Filter,
  Trash2,
  Plus,
  Edit3,
  ChevronRight,
  ChevronLeft,
  Loader2,
  UserCheck,
} from "lucide-react";
import type { AdminView } from "../../../types/app";
import { adminNavItems } from "../../../constants/adminNav";
import { useDepartments } from "../../../hooks/useDepartments";
import { useCourses } from "../../../hooks/useCourses";
import { useLevels } from "../../../hooks/useLevels";
import { useSemesters } from "../../../hooks/useSemesters";
import { useDoctors } from "../../../hooks/useDoctors";
import { useCourseOfferings } from "../../../hooks/useCourseOfferings";
import { useCourseDoctors } from "../../../hooks/useCourseDoctors";

export interface AdminTableViewProps {
  view: AdminView;
  onAdd: () => void;
  onEdit: (row: string[]) => void;
  onDelete: (id: string, name?: string) => void;
}

const staticTableData: Record<string, { headers: string[]; rows: string[][] }> =
  {
    levels: {
      headers: [
        "المعرف",
        "المستوى",
        "القسم",
        "عدد المواد",
        "عدد الطلاب",
        "الحالة",
        "الإجراءات",
      ],
      rows: [
        ["1", "السنة الأولى", "علوم حاسوب", "8", "280", "نشط", ""],
        ["2", "السنة الثانية", "علوم حاسوب", "10", "245", "نشط", ""],
      ],
    },
  };

export function AdminTableView({
  view,
  onAdd,
  onEdit,
  onDelete,
}: AdminTableViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [allChecked, setAllChecked] = useState(false);

  const {
    departments,
    loading: isDeptLoading,
    error: deptError,
  } = useDepartments();
  const {
    courses,
    loading: isCourseLoading,
    error: courseError,
  } = useCourses();
  const { levels, loading: isLevelLoading, error: levelError } = useLevels();
  const {
    semesters,
    loading: isSemesterLoading,
    error: semesterError,
  } = useSemesters();
  const {
    doctorsList,
    loading: isDoctorLoading,
    error: doctorError,
  } = useDoctors();
  const {
    offerings,
    loading: isCourseOfferingsLoading,
    error: courseOfferingsError,
  } = useCourseOfferings();
  const {
    assignments,
    loading: isCourseDocLoading,
    error: courseDocError,
  } = useCourseDoctors();

  // تجهيز البيانات لجميع الجداول مع اعتماد المعرف كـ row[0] دائماً
  const data = (() => {
    if (view === "departments") {
      return {
        headers: ["المعرف", "اسم القسم", "الكود", "الإجراءات"],
        rows: departments.map((d) => [
          String(d.department_id),
          d.name,
          d.code,
          "",
        ]),
      };
    }

    if (view === "courses") {
      return {
        headers: [
          "المعرف",
          "رمز المادة",
          "الاسم بالعربي",
          "الاسم بالإنجليزي",
          "الساعات",
          "الإجراءات",
        ],
        rows: courses.map((c) => [
          String(c.course_id),
          c.course_code,
          c.course_name_ar,
          c.course_name_en,
          String(c.credit_hours),
          "",
        ]),
      };
    }

    if (view === "levels") {
      return {
        headers: ["المعرف", "اسم المستوى", "رقم المستوى", "القسم", "الإجراءات"],
        rows: levels.map((l: any) => {
          const levelTitle =
            l.name ||
            l.level_name ||
            (l.level_number ? `المستوى ${l.level_number}` : "#");

          const deptName =
            l.department?.name ||
            l.department_name ||
            departments.find((d: any) => d.department_id === l.department_id)
              ?.name ||
            "";

          return [
            String(l.level_id),
            levelTitle,
            String(l.level_number ?? "1"),
            deptName,
            "",
          ];
        }),
      };
    }

    if (view === "semesters") {
      return {
        headers: [
          "المعرف",
          "اسم الترم",
          "رقم الترم",
          "العام الجامعي",
          "المستوى",
          "الإجراءات",
        ],
        rows: semesters.map((s) => {
          const semesterTitle =
            s.semester_name ||
            s.name ||
            (s.semester_number ? `الفصل الدراسي ${s.semester_number}` : "#");

          const matchedLevel =
            s.level || levels.find((lvl: any) => lvl.level_id === s.level_id);

          const baseLevelName =
            matchedLevel?.name ||
            matchedLevel?.level_name ||
            s.level_name ||
            (matchedLevel?.level_number
              ? `المستوى ${matchedLevel.level_number}`
              : `مستوى #${s.level_id}`);

          const deptName =
            matchedLevel?.department?.name ||
            matchedLevel?.department_name ||
            departments.find(
              (d: any) => d.department_id === matchedLevel?.department_id,
            )?.name ||
            "";

          const levelWithDept = deptName
            ? `${baseLevelName} (${deptName})`
            : baseLevelName;

          return [
            String(s.semester_id),
            semesterTitle,
            String(s.semester_number),
            s.academic_year,
            levelWithDept,
            "",
          ];
        }),
      };
    }

    if (view === "course_doctors") {
      return {
        headers: [
          "المعرف",
          "اسم الدكتور",
          "اسم المقرر",
          "رمز المقرر",
          "القسم",
          "المستوى",
          "الترم الدراسي",
          "الإجراءات",
        ],
        rows: assignments.map((item) => [
          String(item.course_doctor_id), // row[0]: المعرف المخفي للحذف والتعديل
          item.doctor_name, // row[1]
          item.course_name, // row[2]
          item.course_code || "—", // row[3]
          item.department_name, // row[4]
          item.level_name, // row[5]
          item.semester_name, // row[6]
          "", // row[7]: أزرار الإجراءات
        ]),
      };
    }

    if (view === "course_offerings") {
      return {
        headers: [
          "المعرف",
          "اسم المقرر",
          "رمز المقرر",
          "الترم الدراسي",
          "المستوى / القسم",
          "الإجراءات",
        ],
        rows: offerings.map((o: any) => {
          // 1. المادة ورمزها
          const courseTitle =
            o.course?.course_name_ar ||
            o.course_name ||
            courses.find((c) => c.course_id === o.course_id)?.course_name_ar ||
            "—";

          const courseCode =
            o.course?.course_code ||
            o.course_code ||
            courses.find((c) => c.course_id === o.course_id)?.course_code ||
            "—";

          // 2. اسم الترم
          const currentSemesterName =
            o.semester?.name || o.semester_name || "—";

          // 3. العثور على الترم في مصفوفة semesters عبر الـ ID أو الاسم
          const matchedSemester = semesters.find(
            (s) =>
              s.semester_id === o.semester_id ||
              s.name === currentSemesterName ||
              s.semester_name === currentSemesterName ||
              (s.semester_number &&
                `الفصل الدراسي ${s.semester_number}` === currentSemesterName),
          );

          // 4. استخراج المستوى والقسم من مصفوفة levels و departments المحملة محلياً
          const matchedLevel = levels.find(
            (l) => l.level_id === matchedSemester?.level_id,
          );

          const matchedDept = departments.find(
            (d) => d.department_id === matchedLevel?.department_id,
          );

          const levelName =
            matchedLevel?.name ||
            (matchedLevel?.level_number
              ? `المستوى ${matchedLevel.level_number}`
              : "");

          const deptName =
            matchedDept?.name || matchedLevel?.department_name || "";

          const levelAndDept =
            levelName && deptName
              ? `${levelName} (${deptName})`
              : levelName || deptName || "—";

          return [
            String(o.offering_id || o.id), // row[0]: المعرف للعمليات
            courseTitle, // row[1]: اسم المقرر
            courseCode, // row[2]: رمز المقرر
            currentSemesterName, // row[3]: الترم الدراسي
            levelAndDept, // row[4]: المستوى / القسم
            "", // row[5]: الإجراءات (تعديل / حذف)
          ];
        }),
      };
    }

    if (view === "doctors") {
      return {
        headers: ["المعرف", "اسم الدكتور", "البريد الجامعي", "الإجراءات"],
        rows: doctorsList.map((doc) => [
          String(doc.doctor_id),
          doc.user?.full_name || doc.user?.name_ar || "غير محدد",
          doc.user?.email || "-",
          "",
        ]),
      };
    }

    return (
      staticTableData[view] ?? {
        headers: ["المعرف", "الاسم", "الحالة", "الإجراءات"],
        rows: [],
      }
    );
  })();

  const labelMap: Record<string, string> = {
    departments: "قسم",
    levels: "مستوى",
    semesters: "ترم",
    courses: "مادة",
    course_offerings: "طرح مقرر في ترم",
    system_admins: "مدير نظام",
    content_managers: "مدير محتوى",
    doctors: "دكتور",
    course_doctors: "إسناد مادة لدكتور",
  };

  const getButtonText = () => {
    if (view === "course_offerings") return "طرح مقرر في ترم";
    return `إضافة ${labelMap[view] ?? "عنصر"}`;
  };

  const roleColors: Record<string, string> = {
    "مالك النظام (Owner)":
      "bg-purple-500/20 text-purple-300 border border-purple-500/40",
    "مدير النظام (Admin)":
      "bg-blue-500/20 text-blue-300 border border-blue-500/40",
    "مدير محتوى (Content Manager)":
      "bg-[#7DA49F]/20 text-[#7DA49F] border border-[#7DA49F]/40",
  };

  const filtered = data.rows.filter((row) =>
    row.some((c) =>
      c != null
        ? String(c).toLowerCase().includes(searchTerm.toLowerCase())
        : false,
    ),
  );

  const toggleAll = () => {
    if (allChecked) {
      setSelected(new Set());
      setAllChecked(false);
    } else {
      setSelected(new Set(filtered.map((_, i) => i)));
      setAllChecked(true);
    }
  };

  const isLoading =
    (view === "departments" && isDeptLoading) ||
    (view === "courses" && isCourseLoading) ||
    (view === "levels" && isLevelLoading) ||
    (view === "semesters" && isSemesterLoading) ||
    (view === "doctors" && isDoctorLoading) ||
    (view === "course_offerings" && isCourseOfferingsLoading) ||
    (view === "course_doctors" && isCourseDocLoading);

  const currentError =
    view === "departments"
      ? deptError
      : view === "courses"
        ? courseError
        : view === "levels"
          ? levelError
          : view === "semesters"
            ? semesterError
            : view === "doctors"
              ? doctorError
              : view === "course_offerings"
                ? courseOfferingsError
                : view === "course_doctors"
                  ? courseDocError
                  : null;

  return (
    <div className="space-y-4 fade-in">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#899C9A]" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`بحث في ${adminNavItems.find((n) => n.id === view)?.label || "العناصر"}...`}
              className="w-72 rounded-xl border border-white/[0.07] bg-[#323D59] pr-10 pl-4 py-2 text-xs text-[#F4F7F6] placeholder-[#AABCAF]/70 outline-none transition-all focus:border-[#899C9A] focus:ring-2 focus:ring-[#899C9A]/25"
            />
          </div>

          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl border border-white/[0.07] bg-[#323D59] px-3.5 py-2 text-xs font-bold text-[#F4F7F6] transition-colors hover:bg-[#3B4868] cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-[#899C9A]" />
            <span>تصدير CSV</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl border border-white/[0.07] bg-[#323D59] px-3.5 py-2 text-xs font-bold text-[#F4F7F6] transition-colors hover:bg-[#3B4868] cursor-pointer"
          >
            <Filter className="h-3.5 w-3.5 text-[#899C9A]" />
            <span>فلتر</span>
          </button>

          {selected.size > 0 && (
            <button
              type="button"
              onClick={() => onDelete(`${selected.size} عناصر`)}
              className="flex items-center gap-1.5 rounded-xl border border-red-500/40 bg-red-500/20 px-3.5 py-2 text-xs font-bold text-red-300 transition-colors hover:bg-red-500/30 cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>حذف ({selected.size})</span>
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-2 rounded-xl bg-[#899C9A] px-4 py-2.5 text-xs font-black text-[#1D263B] shadow-md transition-all hover:bg-[#AABCAF] hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>{getButtonText()}</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#323D59] shadow-xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="border-b border-white/[0.06] bg-[#242D42]/90 text-xs font-bold text-[#AABCAF] uppercase tracking-wider">
              <tr>
                <th className="px-4 py-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded border-white/20 bg-[#242D42] text-[#899C9A] focus:ring-[#899C9A] cursor-pointer"
                  />
                </th>
                {data.headers.map((h, i) => {
                  if (h === "المعرف" || h === "ID" || h === "id") return null;

                  return (
                    <th key={i} className="px-6 py-4 whitespace-nowrap">
                      {h}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={data.headers.length + 1}
                    className="py-12 text-center text-xs text-[#AABCAF]"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin text-[#899C9A]" />
                      <span>جاري التحميل...</span>
                    </div>
                  </td>
                </tr>
              ) : currentError ? (
                <tr>
                  <td
                    colSpan={data.headers.length + 1}
                    className="py-12 text-center text-xs text-red-400"
                  >
                    {currentError}
                  </td>
                </tr>
              ) : (
                filtered.map((row, ri) => (
                  <tr
                    key={ri}
                    className={`transition-colors hover:bg-white/[0.04] ${
                      selected.has(ri) ? "bg-[#899C9A]/15" : ""
                    }`}
                  >
                    <td className="px-4 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={selected.has(ri)}
                        onChange={() => {
                          const s = new Set(selected);
                          if (s.has(ri)) s.delete(ri);
                          else s.add(ri);
                          setSelected(s);
                        }}
                        className="h-4 w-4 rounded border-white/20 bg-[#242D42] text-[#899C9A] focus:ring-[#899C9A] cursor-pointer"
                      />
                    </td>

                    {row.map((cell, ci) => {
                      if (ci === 0) return null;

                      if (ci === row.length - 1) {
                        return (
                          <td
                            key={ci}
                            className="px-6 py-4 text-xs font-semibold text-[#F4F7F6] whitespace-nowrap"
                          >
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => onEdit(row)}
                                className="flex items-center gap-1 rounded-lg border border-white/[0.07] bg-[#242D42] px-2.5 py-1 text-xs font-bold text-[#AABCAF] transition-colors hover:border-[#899C9A] hover:bg-[#3B4868] hover:text-white cursor-pointer"
                              >
                                <Edit3 className="h-3.5 w-3.5 text-[#899C9A]" />
                                <span>تعديل</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => onDelete(row[0], row[1])}
                                className="flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/15 px-2.5 py-1 text-xs font-bold text-red-300 transition-colors hover:bg-red-500/25 cursor-pointer"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        );
                      }

                      return (
                        <td
                          key={ci}
                          className="px-6 py-4 text-xs font-semibold text-[#F4F7F6] whitespace-nowrap"
                        >
                          {cell === "نشط" ? (
                            <span className="inline-flex items-center gap-1 rounded-md bg-[#899C9A]/20 border border-[#899C9A]/40 px-2.5 py-0.5 text-[11px] font-bold text-[#F4F7F6]">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#899C9A]" />
                              نشط
                            </span>
                          ) : roleColors && roleColors[cell] ? (
                            <span
                              className={`rounded-md px-2.5 py-0.5 text-[11px] font-bold ${roleColors[cell]}`}
                            >
                              {cell}
                            </span>
                          ) : view === "course_offerings" &&
                            ci === 5 &&
                            cell !== "—" ? (
                            <span className="inline-flex items-center gap-1.5 text-[#F4F7F6]">
                              <UserCheck className="h-3.5 w-3.5 text-[#899C9A]" />
                              <span>{cell}</span>
                            </span>
                          ) : (
                            cell
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between border-t border-white/[0.06] px-6 py-4">
          <span className="text-xs font-semibold text-[#AABCAF]">
            عرض {filtered.length} من أصل {data.rows.length} عنصر
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-[#323D59] text-[#AABCAF] hover:bg-[#3B4868] hover:text-white cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            {[1, 2, 3].map((p) => (
              <button
                type="button"
                key={p}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  p === 1
                    ? "bg-[#899C9A] text-[#1D263B] shadow-sm"
                    : "border border-white/[0.07] bg-[#323D59] text-[#AABCAF] hover:bg-[#3B4868] hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-[#323D59] text-[#AABCAF] hover:bg-[#3B4868] hover:text-white cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminTableView;
