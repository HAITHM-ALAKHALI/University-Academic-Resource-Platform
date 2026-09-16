import type { Dispatch, SetStateAction } from "react";
import { GraduationCap, Globe, Sun, Moon } from "lucide-react";
import type { Lang } from "../data";
import type { Page } from "../App";
import { t } from "../data";

export interface NavbarProps {
  dark: boolean;
  lang: Lang;
  setDark: Dispatch<SetStateAction<boolean>>;
  setLang: Dispatch<SetStateAction<Lang>>;
  setPage?: Dispatch<SetStateAction<Page>>;
  onSwitchAdmin?: () => void; // إضافة خيار لتشغيل دالة التبديل إن وجدت
  currentPage?: string;
}

export default function Navbar({
  dark,
  lang,
  setDark,
  setLang,
  setPage,
  onSwitchAdmin,
  currentPage = "landing",
}: NavbarProps) {
  const tx = t[lang] || t.ar;

  const handleNav = (targetPage: Page) => {
    if (setPage) {
      setPage(targetPage);
    }
  };

  const handleAdminClick = () => {
    if (onSwitchAdmin) {
      onSwitchAdmin();
    } else if (setPage) {
      // توجيه المستخدم إلى صفحة تسجيل الدخول بدلاً من اللوحة مباشرة
      setPage("login");
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        dark
          ? "text-[#F8FAFC]"
          : "border-b border-slate-300 bg-white/90 text-slate-900"
      }`}
      style={
        dark
          ? {
              background: "rgba(36, 45, 66, 0.85)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            }
          : undefined
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => handleNav("landing")}
          className="flex items-center gap-3 bg-transparent border-0 p-0 text-right cursor-pointer"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#323D59] to-[#7DA49F] text-[#F8FAFC] shadow-md shadow-[#242D42]/50 border border-[#7DA49F]/30">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-['Outfit'] text-lg font-extrabold tracking-tight text-[#F8FAFC]">
              دراستي
            </span>
            <span className="text-[10px] font-semibold text-[#7DA49F]">
              {tx.hero.badge || "Academic Platform"}
            </span>
          </div>
        </button>

        {/* Links */}
        <nav className="flex items-center gap-1.5 rounded-2xl border border-white/[0.07] bg-[#323D59]/70 p-1">
          <button
            type="button"
            onClick={() => handleNav("landing")}
            className={`rounded-xl px-4 py-1.5 text-sm font-bold transition-all border-0 cursor-pointer ${
              currentPage === "landing"
                ? "bg-[#7DA49F]/20 text-[#F8FAFC] border border-[#7DA49F]/35 shadow-sm"
                : "bg-transparent text-[#A5B4BF] hover:text-[#F8FAFC] hover:bg-white/[0.05]"
            }`}
          >
            {tx.nav?.home || "الرئيسية"}
          </button>
          <button
            type="button"
            onClick={() => handleNav("course")}
            className={`rounded-xl px-4 py-1.5 text-sm font-bold transition-all border-0 cursor-pointer ${
              currentPage === "course"
                ? "bg-[#7DA49F]/20 text-[#F8FAFC] border border-[#7DA49F]/35 shadow-sm"
                : "bg-transparent text-[#A5B4BF] hover:text-[#F8FAFC] hover:bg-white/[0.05]"
            }`}
          >
            {tx.nav?.courses || "المواد"}
          </button>

          {/* زر لوحة المشرف: يفتح صفحة تسجيل الدخول login */}
          <button
            type="button"
            onClick={handleAdminClick}
            className={`rounded-xl px-4 py-1.5 text-sm font-bold transition-all border-0 cursor-pointer ${
              currentPage === "login" || currentPage === "admin"
                ? "bg-[#7DA49F]/20 text-[#F8FAFC] border border-[#7DA49F]/35 shadow-sm"
                : "bg-transparent text-[#A5B4BF] hover:text-[#F8FAFC] hover:bg-white/[0.05]"
            }`}
          >
            {tx.nav?.admin || "لوحة التحكم"}
          </button>
        </nav>

        {/* Controls: Lang & Theme */}
        <div className="flex items-center gap-2.5">
          {/* Language Switcher */}
          <button
            type="button"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
              dark
                ? "border-white/[0.07] bg-[#323D59] text-[#F8FAFC] hover:bg-[#3B4868] hover:border-[#7DA49F]/40"
                : "border-slate-300 bg-slate-100 text-slate-900 hover:bg-slate-200"
            }`}
          >
            <Globe className="h-3.5 w-3.5 text-[#7DA49F]" />
            <span>{lang === "ar" ? "English" : "العربية"}</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            onClick={() => setDark(!dark)}
            title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className={`flex h-8 w-8 items-center justify-center rounded-xl border transition-colors cursor-pointer ${
              dark
                ? "border-white/[0.07] bg-[#323D59] text-[#A5B4BF] hover:bg-[#3B4868] hover:border-[#7DA49F]/40"
                : "border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {dark ? (
              <Sun className="h-4 w-4 text-[#7DA49F]" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
