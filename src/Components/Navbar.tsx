import type { Dispatch, SetStateAction } from "react";
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
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: dark ? "rgba(10, 15, 30, 0.85)" : "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: dark ? "1px solid var(--border-subtle)" : "1px solid #E2E8F0",
        padding: "12px 24px",
        transition: "all 0.2s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand Logo */}
        <div
          onClick={() => handleNav("landing")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
            }}
          >
            🎓
          </div>
          <div>
            <span
              style={{
                fontFamily: "Outfit, sans-serif",
                fontWeight: 800,
                fontSize: 18,
                letterSpacing: "-0.02em",
                color: dark ? "#F1F5F9" : "#0F172A",
              }}
            >
              UniHub
            </span>
            <span
              style={{
                display: "block",
                fontSize: 10,
                color: dark ? "#94A3B8" : "#64748B",
                fontWeight: 500,
              }}
            >
              {tx.hero.badge || "Academic Platform"}
            </span>
          </div>
        </div>

        {/* Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => handleNav("landing")}
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              border: "none",
              background: currentPage === "landing" ? "rgba(59, 130, 246, 0.15)" : "transparent",
              color: currentPage === "landing" ? "#3B82F6" : dark ? "#94A3B8" : "#475569",
              fontWeight: currentPage === "landing" ? 600 : 500,
              fontSize: 14,
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {tx.nav?.home || "الرئيسية"}
          </button>
          <button
            onClick={() => handleNav("course")}
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              border: "none",
              background: currentPage === "course" ? "rgba(59, 130, 246, 0.15)" : "transparent",
              color: currentPage === "course" ? "#3B82F6" : dark ? "#94A3B8" : "#475569",
              fontWeight: currentPage === "course" ? 600 : 500,
              fontSize: 14,
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {tx.nav?.courses || "المواد"}
          </button>
          <button
            onClick={() => handleNav("admin")}
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              border: "none",
              background: currentPage === "admin" ? "rgba(59, 130, 246, 0.15)" : "transparent",
              color: currentPage === "admin" ? "#3B82F6" : dark ? "#94A3B8" : "#475569",
              fontWeight: currentPage === "admin" ? 600 : 500,
              fontSize: 14,
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {tx.nav?.admin || "لوحة التحكم"}
          </button>
        </nav>

        {/* Controls: Lang & Theme */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              border: dark ? "1px solid var(--border-subtle)" : "1px solid #CBD5E1",
              background: dark ? "rgba(255, 255, 255, 0.05)" : "#F8FAFC",
              color: dark ? "#F1F5F9" : "#0F172A",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.15s ease",
            }}
          >
            🌐 {lang === "ar" ? "English" : "العربية"}
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={() => setDark(!dark)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              border: dark ? "1px solid var(--border-subtle)" : "1px solid #CBD5E1",
              background: dark ? "rgba(255, 255, 255, 0.05)" : "#F8FAFC",
              color: dark ? "#F1F5F9" : "#0F172A",
              fontSize: 16,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s ease",
            }}
            title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}
