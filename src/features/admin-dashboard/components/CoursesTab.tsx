import { Plus, FileText, Edit3, Trash2 } from "lucide-react";
import type { Lang } from "../../../types/app";
import { t, courses } from "../../../data";

export interface CoursesTabProps {
  tx: (typeof t)["en"];
  lang: Lang;
}

export function CoursesTab({ tx, lang }: CoursesTabProps) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#F8FAFC]">
            {lang === "ar" ? "إدارة المقررات الدراسية" : "Manage Courses"}
          </h2>
          <p className="text-xs font-semibold text-[#A5B4BF]">
            {lang === "ar"
              ? "عرض تفاصيل المقررات والمحتوى المتاح"
              : "Overview of courses, instructors, and resource count"}
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-xl bg-[#7DA49F] px-4 py-2.5 text-sm font-black text-[#1E2638] shadow-md transition-all hover:bg-[#9DBFB8] hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>{tx.admin.addCourse}</span>
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#323D59] shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="border-b border-white/[0.06] bg-[#3B4868]/60 text-xs font-bold text-[#A5B4BF] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">
                  {lang === "ar" ? "الكود" : "Code"}
                </th>
                <th className="px-6 py-4">
                  {lang === "ar" ? "اسم المقرر" : "Course Name"}
                </th>
                <th className="px-6 py-4">
                  {lang === "ar" ? "الأستاذ" : "Instructor"}
                </th>
                <th className="px-6 py-4">
                  {lang === "ar" ? "المستوى" : "Level"}
                </th>
                <th className="px-6 py-4">
                  {lang === "ar" ? "الموارد" : "Resources"}
                </th>
                <th className="px-6 py-4 text-center">
                  {lang === "ar" ? "الإجراءات" : "Actions"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] font-normal">
              {courses.map((c) => {
                const info = lang === "ar" ? c.ar : c.en;
                return (
                  <tr
                    key={c.id}
                    className="transition-colors hover:bg-white/[0.04]"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className="font-['JetBrains_Mono'] rounded-lg px-2.5 py-1 text-xs font-bold"
                        style={{
                          backgroundColor: `${c.color}25`,
                          color: c.color,
                          border: `1px solid ${c.color}40`,
                        }}
                      >
                        {c.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-[#F8FAFC] whitespace-nowrap">
                      {info.name}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-[#A5B4BF] whitespace-nowrap">
                      {info.instructor}
                    </td>
                    <td className="px-6 py-4 font-['JetBrains_Mono'] text-xs font-medium text-[#A5B4BF] whitespace-nowrap">
                      {info.level.split("·")[0].trim()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 font-['Outfit'] font-bold text-[#F8FAFC]">
                        <FileText className="h-3.5 w-3.5 text-[#7DA49F]" />
                        {c.resourceCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          className="flex items-center gap-1 rounded-xl border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-xs font-bold text-[#F8FAFC] transition-colors hover:bg-[#3B4868] hover:border-white/[0.15] cursor-pointer"
                        >
                          <Edit3 className="h-3.5 w-3.5 text-[#7DA49F]" />
                          <span>{lang === "ar" ? "تعديل" : "Edit"}</span>
                        </button>
                        <button
                          type="button"
                          className="flex items-center gap-1 rounded-xl border border-red-500/30 bg-red-500/15 px-2.5 py-1 text-xs font-bold text-red-300 transition-colors hover:bg-red-500/25 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>{lang === "ar" ? "حذف" : "Delete"}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CoursesTab;
