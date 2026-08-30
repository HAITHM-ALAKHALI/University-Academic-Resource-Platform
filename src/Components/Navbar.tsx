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
  currentPage?: string;
}

export default function Navbar({
  dark,
  lang,
  setDark,
  setLang,
  setPage,
  currentPage = "landing",
}: NavbarProps) {
  const tx = t[lang] || t.ar;

  const handleNav = (targetPage: Page) => {
    if (setPage) {
      setPage(targetPage);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-200 ${
        dark
          ? "border-[#6E7C8B]/40 bg-[#35425E]/90 text-[#F4F7F6]"
          : "border-slate-300 bg-white/90 text-slate-900"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => handleNav("landing")}
          className="flex items-center gap-3 bg-transparent border-0 p-0 text-right cursor-pointer"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#525C79] via-[#35425E] to-[#899C9A] text-[#F4F7F6] shadow-md shadow-[#35425E]/40 border border-[#899C9A]/40">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-['Outfit'] text-lg font-extrabold tracking-tight text-[#F4F7F6]">
              دراستي
            </span>
            <span className="text-[10px] font-semibold text-[#899C9A]">
              {tx.hero.badge || "Academic Platform"}
            </span>
          </div>
        </button>

        {/* Links */}
        <nav className="flex items-center gap-1.5 rounded-2xl border border-[#6E7C8B]/40 bg-[#525C79]/70 p-1">
          <button
            type="button"
            onClick={() => handleNav("landing")}
            className={`rounded-xl px-4 py-1.5 text-sm font-bold transition-all border-0 cursor-pointer ${
              currentPage === "landing"
                ? "bg-[#899C9A]/30 text-[#F4F7F6] border border-[#899C9A]/50 shadow-sm"
                : "bg-transparent text-[#AABCAF] hover:text-[#F4F7F6] hover:bg-white/[0.06]"
            }`}
          >
            {tx.nav?.home || "الرئيسية"}
          </button>
          <button
            type="button"
            onClick={() => handleNav("course")}
            className={`rounded-xl px-4 py-1.5 text-sm font-bold transition-all border-0 cursor-pointer ${
              currentPage === "course"
                ? "bg-[#899C9A]/30 text-[#F4F7F6] border border-[#899C9A]/50 shadow-sm"
                : "bg-transparent text-[#AABCAF] hover:text-[#F4F7F6] hover:bg-white/[0.06]"
            }`}
          >
            {tx.nav?.courses || "المواد"}
          </button>
          <button
            type="button"
            onClick={() => handleNav("admin")}
            className={`rounded-xl px-4 py-1.5 text-sm font-bold transition-all border-0 cursor-pointer ${
              currentPage === "admin"
                ? "bg-[#899C9A]/30 text-[#F4F7F6] border border-[#899C9A]/50 shadow-sm"
                : "bg-transparent text-[#AABCAF] hover:text-[#F4F7F6] hover:bg-white/[0.06]"
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
                ? "border-[#6E7C8B]/40 bg-[#525C79] text-[#F4F7F6] hover:border-[#899C9A]"
                : "border-slate-300 bg-slate-100 text-slate-900 hover:bg-slate-200"
            }`}
          >
            <Globe className="h-3.5 w-3.5 text-[#899C9A]" />
            <span>{lang === "ar" ? "English" : "العربية"}</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            onClick={() => setDark(!dark)}
            title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className={`flex h-8 w-8 items-center justify-center rounded-xl border transition-colors cursor-pointer ${
              dark
                ? "border-[#6E7C8B]/40 bg-[#525C79] text-[#AABCAF] hover:border-[#899C9A]"
                : "border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {dark ? <Sun className="h-4 w-4 text-[#899C9A]" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
