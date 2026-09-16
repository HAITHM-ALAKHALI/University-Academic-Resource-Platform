import type { DragEvent } from "react";
import { Upload, Plus, FileText, Trash2 } from "lucide-react";
import type { Lang } from "../../../types/app";
import { t } from "../../../data";

export interface UploadTabProps {
  tx: (typeof t)["en"];
  lang: Lang;
  drag: boolean;
  setDrag: (v: boolean) => void;
  files: string[];
  setFiles: (v: string[]) => void;
}

export function UploadTab({
  tx,
  lang,
  drag,
  setDrag,
  files,
  setFiles,
}: UploadTabProps) {
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const newFiles = Array.from(e.dataTransfer.files).map((f) => f.name);
    setFiles([...files, ...newFiles]);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-white/[0.07] bg-[#323D59] p-6 shadow-xl sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#323D59] to-[#7DA49F] text-[#F8FAFC] shadow-md shadow-[#242D42]/40 border border-[#7DA49F]/40">
            <Upload className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-['Outfit'] text-lg font-bold text-[#F8FAFC]">
              {tx.admin.uploadResource}
            </h3>
            <p className="text-xs font-semibold text-[#A5B4BF]">
              {lang === "ar"
                ? "ارفع المحاضرات والمذكرات وحدد المقرر المناسب"
                : "Upload course materials and assign to the target subject"}
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {[
            {
              label: lang === "ar" ? "القسم" : "Department",
              options: [
                "علوم الحاسوب (CS)",
                "تقنية المعلومات (IT)",
                "الأمن السيبراني (CYS)",
              ],
            },
            {
              label: lang === "ar" ? "المقرر" : "Course",
              options: [
                "CS 101 - برمجة 1",
                "CS 201 - هياكل البيانات",
                "CS 301 - الذكاء الاصطناعي",
              ],
            },
            {
              label: lang === "ar" ? "نوع المورد" : "Resource Type",
              options: [
                "محاضرة (Lecture Slides)",
                "كتاب أو مرجع (Book / Reference)",
                "واجب وتكليف (Assignment)",
                "امتحان سابق (Previous Exam)",
              ],
            },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-xs font-bold text-[#A5B4BF] mb-1.5">
                {field.label}
              </label>
              <select className="w-full rounded-xl border border-white/[0.07] bg-white/[0.04] px-3.5 py-2.5 text-sm text-[#F8FAFC] outline-none transition-all focus:border-[#7DA49F] focus:ring-2 focus:ring-[#7DA49F]/25 cursor-pointer">
                <option value="" className="bg-[#323D59]">
                  {lang === "ar" ? "اختر..." : "Select..."}
                </option>
                {field.options.map((o) => (
                  <option key={o} value={o} className="bg-[#323D59]">
                    {o}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={handleDrop}
          className={`mt-6 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-200 cursor-pointer ${
            drag
              ? "border-[#7DA49F] bg-[#7DA49F]/10 scale-[1.01]"
              : "border-white/[0.1] bg-white/[0.03] hover:border-[#7DA49F] hover:bg-[#3B4868]"
          }`}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7DA49F]/20 text-[#7DA49F] border border-[#7DA49F]/30 mb-3">
            <Upload className="h-7 w-7" />
          </div>
          <p className="font-['Outfit'] text-base font-bold text-[#F8FAFC]">
            {lang === "ar"
              ? "اسحب وأفلت الملفات هنا"
              : "Drag & drop your files here"}
          </p>
          <p className="mt-1 text-xs font-semibold text-[#A5B4BF]">
            {lang === "ar"
              ? "أو اضغط لتصفح ملفات جهازك"
              : "or click the button below to browse"}
          </p>

          <label className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#7DA49F] px-5 py-2.5 text-xs font-black text-[#1E2638] shadow-md transition-all hover:bg-[#9DBFB8] hover:scale-[1.02] active:scale-95 cursor-pointer">
            <Plus className="h-4 w-4" />
            <span>{lang === "ar" ? "اختر ملفات" : "Choose Files"}</span>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                const newFiles = Array.from(e.target.files ?? []).map(
                  (f) => f.name
                );
                setFiles([...files, ...newFiles]);
              }}
            />
          </label>

          <p className="mt-4 font-['JetBrains_Mono'] text-[11px] font-semibold text-[#A5B4BF]">
            PDF, DOCX, PPTX, ZIP •{" "}
            {lang === "ar"
              ? "الحد الأقصى 50 ميغابايت لكل ملف"
              : "Max 50MB per file"}
          </p>
        </div>

        {/* Selected Files List */}
        {files.length > 0 && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] shadow-md">
            <div className="border-b border-white/[0.06] px-4 py-3 text-xs font-bold text-[#A5B4BF]">
              {lang === "ar"
                ? `الملفات الجاهزة للرفع (${files.length})`
                : `Files ready to upload (${files.length})`}
            </div>

            <div className="divide-y divide-white/[0.06]">
              {files.map((name, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-white/[0.04]"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <FileText className="h-4 w-4 text-[#7DA49F] shrink-0" />
                    <span className="truncate text-xs font-bold text-[#F8FAFC]">
                      {name}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setFiles(files.filter((_, j) => j !== i))}
                    className="rounded-lg p-1 text-red-400 hover:bg-red-500/10 cursor-pointer border-0 bg-transparent"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-white/[0.06] p-3">
              <button
                type="button"
                onClick={() => {
                  alert(
                    lang === "ar"
                      ? "تم رفع الملفات بنجاح!"
                      : "Files uploaded successfully!"
                  );
                  setFiles([]);
                }}
                className="w-full rounded-xl bg-[#7DA49F] py-2.5 text-sm font-black text-[#1E2638] shadow-md transition-all hover:bg-[#9DBFB8] hover:scale-[1.01] active:scale-95 cursor-pointer border-0"
              >
                {lang === "ar"
                  ? `تأكيد ورفع ${files.length} ملف`
                  : `Confirm & Upload ${files.length} file${files.length > 1 ? "s" : ""}`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadTab;
