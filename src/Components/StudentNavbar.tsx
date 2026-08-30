import { useState } from "react";
import {
  GraduationCap,
  LayoutGrid,
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
  const isDepartmentsActive = nav.screen === "departments";

  const handleNavigate = (targetScreen: NavState["screen"]) => {
    navigate({ screen: targetScreen });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full border-b border-[#6E7C8B]/40 bg-[#35425E]/90 backdrop-blur-xl shadow-lg transition-all"
        style={{
          boxShadow: "0 4px 30px rgba(42, 53, 78, 0.4)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          {/* Brand Logo & Name */}
          <button
            type="button"
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-3 rounded-xl bg-transparent border-0 p-1 text-right transition-transform hover:scale-[1.02] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#899C9A]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#525C79] via-[#35425E] to-[#899C9A] text-[#F4F7F6] shadow-md shadow-[#35425E]/50 border border-[#899C9A]/40">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-['Outfit'] text-lg font-extrabold tracking-tight text-[#F4F7F6]">
                دراستي
              </span>
              <span className="text-[10px] font-semibold text-[#899C9A]">
                بوابة الموارد الأكاديمية
              </span>
            </div>
          </button>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 rounded-2xl border border-[#6E7C8B]/40 bg-[#525C79]/70 p-1 shadow-inner">
            <button
              type="button"
              onClick={() => handleNavigate("home")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer border-0 ${
                isHomeActive
                  ? "bg-[#899C9A]/30 text-[#F4F7F6] shadow-sm border border-[#899C9A]/50"
                  : "bg-transparent text-[#AABCAF] hover:bg-white/[0.06] hover:text-[#F4F7F6]"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              <span>الرئيسية</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavigate("departments")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer border-0 ${
                isDepartmentsActive
                  ? "bg-[#899C9A]/30 text-[#F4F7F6] shadow-sm border border-[#899C9A]/50"
                  : "bg-transparent text-[#AABCAF] hover:bg-white/[0.06] hover:text-[#F4F7F6]"
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>التخصصات</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAbout(true)}
              className="flex items-center gap-2 rounded-xl bg-transparent border-0 px-4 py-2 text-sm font-semibold text-[#AABCAF] transition-all duration-200 hover:bg-white/[0.06] hover:text-[#F4F7F6] cursor-pointer"
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
              className="flex items-center gap-2 rounded-xl border border-[#899C9A]/40 bg-[#525C79] px-3.5 py-2 text-xs sm:text-sm font-bold text-[#F4F7F6] shadow-md shadow-[#35425E]/40 transition-all duration-200 hover:border-[#899C9A] hover:bg-[#5D6989] hover:scale-[1.02] cursor-pointer active:scale-95"
            >
              <SlidersHorizontal className="h-4 w-4 text-[#899C9A]" />
              <span>لوحة المشرف</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="القائمة"
              className="flex md:hidden h-9 w-9 items-center justify-center rounded-xl border border-[#6E7C8B]/40 bg-white/[0.05] text-[#F4F7F6] transition-colors hover:bg-white/[0.1] cursor-pointer"
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
          <div className="border-t border-[#6E7C8B]/40 bg-[#35425E] px-4 py-3 md:hidden flex flex-col gap-1.5 animate-fadeIn">
            <button
              type="button"
              onClick={() => handleNavigate("home")}
              className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-right text-sm font-semibold transition-colors border-0 cursor-pointer ${
                isHomeActive
                  ? "bg-[#899C9A]/30 text-[#F4F7F6]"
                  : "bg-transparent text-[#AABCAF] hover:bg-white/[0.06] hover:text-[#F4F7F6]"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              <span>الرئيسية</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavigate("departments")}
              className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-right text-sm font-semibold transition-colors border-0 cursor-pointer ${
                isDepartmentsActive
                  ? "bg-[#899C9A]/30 text-[#F4F7F6]"
                  : "bg-transparent text-[#AABCAF] hover:bg-white/[0.06] hover:text-[#F4F7F6]"
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
              className="flex w-full items-center gap-3 rounded-lg bg-transparent border-0 px-3.5 py-2.5 text-right text-sm font-semibold text-[#AABCAF] hover:bg-white/[0.06] hover:text-[#F4F7F6] cursor-pointer"
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md animate-fadeIn"
          onClick={() => setShowAbout(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-[#6E7C8B]/50 bg-[#525C79] p-6 shadow-2xl transition-all text-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#6E7C8B]/30 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#525C79] via-[#35425E] to-[#899C9A] text-[#F4F7F6] shadow-sm">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-[#F4F7F6]">
                  عن منصة دراستي
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAbout(false)}
                className="rounded-lg p-1.5 text-[#AABCAF] hover:bg-white/[0.08] hover:text-white transition-colors cursor-pointer border-0 bg-transparent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-[#AABCAF] leading-relaxed">
              <p>
                <strong className="text-[#F4F7F6]">دراستي</strong> هي منصة أكاديمية شاملة صُممت خصيصاً لمساعدة طلاب الجامعات في الوصول السريع والمنظم إلى كافة المقررات الدراسية، المحاضرات، الكتب والمراجع، الواجبات، ونماذج الامتحانات السابقة.
              </p>
              <p>
                تعتمد المنصة هيكلية واضحة تنقلك من الجامعة إلى الكلية، فالقسم، ثم المستوى والفصل الدراسي وصولاً إلى المادة المطلوبة بضغطة زر واحدة.
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowAbout(false)}
                className="rounded-xl bg-[#899C9A] px-5 py-2 text-sm font-bold text-[#1D263B] shadow-md transition-all hover:opacity-90 cursor-pointer border-0"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
