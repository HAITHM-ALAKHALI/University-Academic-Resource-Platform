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
} from "lucide-react";
import type { AdminView } from "../../../types/app";
import { defaultAdminNav } from "./AdminSidebar";

export interface AdminTableViewProps {
  view: AdminView;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: (name: string) => void;
}

const tableData: Record<string, { headers: string[]; rows: string[][] }> = {
  departments: {
    headers: [
      "المعرف",
      "اسم القسم",
      "المواد",
      "الملفات",
      "الحالة",
      "الإجراءات",
    ],
    rows: [
      ["1", "علوم حاسوب", "32", "840", "نشط", ""],
      ["2", "تقنية معلومات", "28", "720", "نشط", ""],
      ["3", "أمن سيبراني", "24", "610", "نشط", ""],
      ["4", "ذكاء اصطناعي", "20", "520", "نشط", ""],
      ["5", "علم البيانات", "18", "460", "نشط", ""],
    ],
  },
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
      ["3", "السنة الثالثة", "علوم حاسوب", "10", "210", "نشط", ""],
      ["4", "السنة الرابعة", "علوم حاسوب", "9", "190", "نشط", ""],
      ["5", "السنة الأولى", "تقنية معلومات", "8", "220", "نشط", ""],
    ],
  },
  semesters: {
    headers: [
      "المعرف",
      "اسم الترم",
      "المستوى",
      "القسم",
      "عدد المواد",
      "الحالة",
      "الإجراءات",
    ],
    rows: [
      ["1", "الترم الأول", "السنة الأولى", "علوم حاسوب", "6", "نشط", ""],
      ["2", "الترم الثاني", "السنة الأولى", "علوم حاسوب", "6", "نشط", ""],
      ["3", "الترم الأول", "السنة الثانية", "علوم حاسوب", "6", "نشط", ""],
      ["4", "الترم الثاني", "السنة الثانية", "علوم حاسوب", "6", "نشط", ""],
      ["5", "الترم الأول", "السنة الثالثة", "علوم حاسوب", "6", "نشط", ""],
    ],
  },
  courses: {
    headers: [
      "المعرف",
      "اسم المادة",
      "القسم",
      "المستوى",
      "الترم",
      "الملفات",
      "الإجراءات",
    ],
    rows: [
      ["1", "برمجة 1", "علوم حاسوب", "السنة الأولى", "الترم الأول", "32", ""],
      ["2", "رياضيات", "علوم حاسوب", "السنة الأولى", "الترم الأول", "28", ""],
      [
        "3",
        "هياكل البيانات",
        "علوم حاسوب",
        "السنة الثانية",
        "الترم الأول",
        "45",
        "",
      ],
      [
        "4",
        "قواعد البيانات",
        "علوم حاسوب",
        "السنة الثانية",
        "الترم الثاني",
        "38",
        "",
      ],
      [
        "5",
        "الذكاء الاصطناعي",
        "علوم حاسوب",
        "السنة الثالثة",
        "الترم الأول",
        "55",
        "",
      ],
      [
        "6",
        "شبكات الحاسوب",
        "علوم حاسوب",
        "السنة الثالثة",
        "الترم الثاني",
        "41",
        "",
      ],
      [
        "7",
        "هندسة البرمجيات",
        "علوم حاسوب",
        "السنة الرابعة",
        "الترم الأول",
        "36",
        "",
      ],
    ],
  },
  files: {
    headers: [
      "المعرف",
      "اسم الملف",
      "المادة",
      "النوع",
      "الحجم",
      "تاريخ الرفع",
      "الإجراءات",
    ],
    rows: [
      [
        "1",
        "Lecture 1 - Introduction.pdf",
        "برمجة 1",
        "PDF",
        "2.4 MB",
        "2024-01-10",
        "",
      ],
      ["2", "Assignment 1.docx", "برمجة 1", "DOCX", "0.8 MB", "2024-01-15", ""],
      [
        "3",
        "Midterm Exam 2023.pdf",
        "هياكل البيانات",
        "PDF",
        "1.2 MB",
        "2024-01-20",
        "",
      ],
      [
        "4",
        "Database Notes.pdf",
        "قواعد البيانات",
        "PDF",
        "3.1 MB",
        "2024-01-22",
        "",
      ],
      [
        "5",
        "AI Lecture 5 - Neural Networks.pdf",
        "الذكاء الاصطناعي",
        "PDF",
        "2.8 MB",
        "2024-01-25",
        "",
      ],
      [
        "6",
        "CS50 Week 2 - Arrays.mp4",
        "برمجة 1",
        "MP4",
        "180 MB",
        "2024-01-28",
        "",
      ],
    ],
  },
  users: {
    headers: [
      "المعرف",
      "الاسم",
      "البريد الإلكتروني",
      "الدور",
      "تاريخ الانضمام",
      "الإجراءات",
    ],
    rows: [
      ["1", "محمد أحمد", "mohammed@cairo.edu", "طالب", "2024-01-01", ""],
      ["2", "سارة علي", "sara@alex.edu", "طالب", "2024-01-03", ""],
      ["3", "أحمد محمود", "ahmed@azhar.edu", "أستاذ", "2024-01-05", ""],
      ["4", "فاطمة حسن", "fatma@cairo.edu", "طالب", "2024-01-07", ""],
      ["5", "عمر خالد", "omar@ainshams.edu", "مشرف", "2024-01-10", ""],
      ["6", "نور إبراهيم", "nour@mansoura.edu", "طالب", "2024-01-12", ""],
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

  const data = tableData[view] ?? {
    headers: ["المعرف", "الاسم", "الحالة", "الإجراءات"],
    rows: [],
  };

  const labelMap: Record<string, string> = {
    departments: "قسم",
    levels: "مستوى",
    semesters: "ترم",
    courses: "مادة",
    files: "ملف",
    users: "مستخدم",
  };
  const label = labelMap[view] ?? "عنصر";

  const roleColors: Record<string, string> = {
    طالب: "bg-[#899C9A]/20 text-[#AABCAF] border border-[#899C9A]/30",
    أستاذ: "bg-[#323D59] text-[#F4F7F6] border border-white/[0.07]",
    مشرف: "bg-[#AABCAF]/20 text-[#F4F7F6] border border-[#AABCAF]/30",
    "Super Admin": "bg-[#899C9A] text-[#1D263B] font-bold",
  };

  const typeColors: Record<string, string> = {
    PDF: "bg-[#899C9A]/20 text-[#F4F7F6] border border-[#899C9A]/40",
    DOCX: "bg-[#323D59] text-[#AABCAF] border border-white/[0.07]",
    XLSX: "bg-[#AABCAF]/20 text-[#F4F7F6] border border-[#AABCAF]/40",
    MP4: "bg-[#899C9A]/20 text-[#899C9A] border border-[#899C9A]/40",
    ZIP: "bg-[#323D59] text-[#F4F7F6] border border-white/[0.07]",
  };

  const filtered = data.rows.filter((row) =>
    row.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()))
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

  return (
    <div className="space-y-4 fade-in">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#899C9A]" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`بحث في ${defaultAdminNav.find((n) => n.id === view)?.label}...`}
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
          <span>إضافة {label}</span>
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
                {data.headers.map((h, i) => (
                  <th key={i} className="px-6 py-4 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {filtered.map((row, ri) => (
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
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-6 py-4 text-xs font-semibold text-[#F4F7F6] whitespace-nowrap"
                    >
                      {ci === row.length - 1 ? (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={onEdit}
                            className="flex items-center gap-1 rounded-lg border border-white/[0.07] bg-[#242D42] px-2.5 py-1 text-xs font-bold text-[#AABCAF] transition-colors hover:border-[#899C9A] hover:bg-[#3B4868] hover:text-white cursor-pointer"
                          >
                            <Edit3 className="h-3.5 w-3.5 text-[#899C9A]" />
                            <span>تعديل</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onDelete(row[1])}
                            className="flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/15 px-2.5 py-1 text-xs font-bold text-red-300 transition-colors hover:bg-red-500/25 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : cell === "نشط" ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-[#899C9A]/20 border border-[#899C9A]/40 px-2.5 py-0.5 text-[11px] font-bold text-[#F4F7F6]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#899C9A]" />
                          نشط
                        </span>
                      ) : roleColors[cell] ? (
                        <span
                          className={`rounded-md px-2.5 py-0.5 text-[11px] font-bold ${roleColors[cell]}`}
                        >
                          {cell}
                        </span>
                      ) : typeColors[cell] ? (
                        <span
                          className={`inline-block rounded-md px-2 py-0.5 font-['JetBrains_Mono'] text-[11px] font-bold ${typeColors[cell]}`}
                        >
                          {cell}
                        </span>
                      ) : ci === 0 ? (
                        <span className="font-['JetBrains_Mono'] font-bold text-[#AABCAF]">
                          #{cell}
                        </span>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={data.headers.length + 1}
                    className="py-12 text-center text-xs text-[#AABCAF]"
                  >
                    لا توجد نتائج مطابقة لعملية البحث
                  </td>
                </tr>
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
