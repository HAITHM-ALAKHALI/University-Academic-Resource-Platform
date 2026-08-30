import { useState } from "react";
import {
  GraduationCap,
  LayoutGrid,
  Building2,
  Layers,
  Info,
  SlidersHorizontal,
  Menu,
  X,
} from "lucide-react";
import type { NavState } from "./StudentApp";

interface StudentNavbarProps {
  nav: NavState;
  navigate: (state: NavState) => void;
  onSwitchAdmin: () => void;
}

export default function StudentNavbar({
  nav,
  navigate,
  onSwitchAdmin,
}: StudentNavbarProps) {
  const [showAbout, setShowAbout] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const isHomeActive = nav.screen === "home";
  const isUniversitiesActive = nav.screen === "universities";
  const isDepartmentsActive = nav.screen === "departments";

  const handleNavigate = (targetScreen: NavState["screen"]) => {
    navigate({ screen: targetScreen });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full border-b border-[var(--border-subtle)] bg-[rgba(10,15,30,0.85)] backdrop-blur-xl shadow-lg transition-all"
        style={{
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          {/* Brand Logo & Name */}
          <button
            type="button"
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-3 rounded-xl bg-transparent border-0 p-1 text-right transition-transform hover:scale-[1.02] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 text-white shadow-md shadow-blue-500/25">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-['Outfit'] text-lg font-extrabold tracking-tight text-[var(--text-primary)]">
                دراستي
              </span>
              <span className="text-[10px] font-semibold text-blue-400">
                بوابة الموارد الأكاديمية
              </span>
            </div>
          </button>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 rounded-2xl border border-[var(--border-subtle)] bg-white/[0.03] p-1">
            <button
              type="button"
              onClick={() => handleNavigate("home")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer border-0 ${
                isHomeActive
                  ? "bg-blue-500/15 text-blue-400 font-semibold shadow-sm"
                  : "bg-transparent text-[var(--text-secondary)] hover:bg-white/[0.05] hover:text-[var(--text-primary)]"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              <span>الرئيسية</span>
            </button>

            {/* <button
              type="button"
              onClick={() => handleNavigate("universities")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer border-0 ${
                isUniversitiesActive
                  ? "bg-blue-500/15 text-blue-400 font-semibold shadow-sm"
                  : "bg-transparent text-[var(--text-secondary)] hover:bg-white/[0.05] hover:text-[var(--text-primary)]"
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>الجامعات</span>
            </button> */}

            <button
              type="button"
              onClick={() => handleNavigate("departments")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer border-0 ${
                isDepartmentsActive
                  ? "bg-blue-500/15 text-blue-400 font-semibold shadow-sm"
                  : "bg-transparent text-[var(--text-secondary)] hover:bg-white/[0.05] hover:text-[var(--text-primary)]"
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>التخصصات</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAbout(true)}
              className="flex items-center gap-2 rounded-xl bg-transparent border-0 px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-all duration-200 hover:bg-white/[0.05] hover:text-[var(--text-primary)] cursor-pointer"
            >
              <Info className="h-4 w-4" />
              <span>عن المنصة</span>
            </button>
          </nav>

          {/* Action / Admin Button */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onSwitchAdmin}
              className="flex items-center gap-2 rounded-xl border border-violet-500/30 bg-gradient-to-r from-violet-500/15 to-blue-500/10 px-3.5 py-2 text-xs sm:text-sm font-semibold text-violet-300 shadow-md shadow-violet-500/10 transition-all duration-200 hover:border-violet-500/50 hover:from-violet-500/25 hover:to-blue-500/20 hover:text-white cursor-pointer active:scale-95"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>لوحة المشرف</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="القائمة"
              className="flex md:hidden h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-white/[0.05] text-[var(--text-primary)] transition-colors hover:bg-white/[0.1] cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-[var(--border-subtle)] bg-[rgba(10,15,30,0.98)] px-4 py-3 md:hidden flex flex-col gap-1.5 animate-fadeIn">
            <button
              type="button"
              onClick={() => handleNavigate("home")}
              className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-right text-sm font-medium transition-colors border-0 cursor-pointer ${
                isHomeActive
                  ? "bg-blue-500/15 text-blue-400 font-semibold"
                  : "bg-transparent text-[var(--text-secondary)] hover:bg-white/[0.05] hover:text-[var(--text-primary)]"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              <span>الرئيسية</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavigate("universities")}
              className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-right text-sm font-medium transition-colors border-0 cursor-pointer ${
                isUniversitiesActive
                  ? "bg-blue-500/15 text-blue-400 font-semibold"
                  : "bg-transparent text-[var(--text-secondary)] hover:bg-white/[0.05] hover:text-[var(--text-primary)]"
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>الجامعات</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavigate("departments")}
              className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-right text-sm font-medium transition-colors border-0 cursor-pointer ${
                isDepartmentsActive
                  ? "bg-blue-500/15 text-blue-400 font-semibold"
                  : "bg-transparent text-[var(--text-secondary)] hover:bg-white/[0.05] hover:text-[var(--text-primary)]"
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>التخصصات</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setShowAbout(true);
                setMobileMenuOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-lg bg-transparent border-0 px-3.5 py-2.5 text-right text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-white/[0.05] hover:text-[var(--text-primary)] cursor-pointer"
            >
              <Info className="h-4 w-4" />
              <span>عن المنصة</span>
            </button>
          </div>
        )}
      </header>

      {/* About Modal Dialog */}
      {showAbout && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowAbout(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-[var(--border-medium)] bg-[var(--bg-surface)] p-6 shadow-2xl transition-all text-right"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/30">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="m-0 text-lg font-bold text-[var(--text-primary)]">
                    منصة دراستي الأكاديمية
                  </h3>
                  <p className="m-0 text-xs font-medium text-blue-400">
                    بوابة الموارد والمناهج الجامعية
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAbout(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-white/[0.05] text-[var(--text-secondary)] transition-colors hover:bg-white/[0.1] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-[var(--text-secondary)]">
              منصة دراستي هي بيئة تعليمية أكاديمية متكاملة مصممة خصيصاً للطلاب
              والأكاديميين لتسهيل تصفح، مشاركة، وتحميل المناهج الدراسية،
              المحاضرات، المراجع، ونماذج الاختبارات بأسلوب عصري وسلس.
            </p>

            <div className="mb-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-[var(--border-subtle)] bg-white/[0.02] p-3 text-center">
                <div className="text-xl font-extrabold text-blue-400">+12</div>
                <div className="mt-1 text-[11px] text-[var(--text-muted)]">
                  جامعة معتمدة
                </div>
              </div>
              <div className="rounded-xl border border-[var(--border-subtle)] bg-white/[0.02] p-3 text-center">
                <div className="text-xl font-extrabold text-violet-400">
                  +500
                </div>
                <div className="mt-1 text-[11px] text-[var(--text-muted)]">
                  مادة دراسية
                </div>
              </div>
              <div className="rounded-xl border border-[var(--border-subtle)] bg-white/[0.02] p-3 text-center">
                <div className="text-xl font-extrabold text-emerald-400">
                  +4,000
                </div>
                <div className="mt-1 text-[11px] text-[var(--text-muted)]">
                  ملف ومحاضرة
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAbout(false)}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-opacity hover:opacity-90 cursor-pointer border-0"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </>
  );
}
