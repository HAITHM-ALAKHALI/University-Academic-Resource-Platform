import { useState } from "react";
import type { Dispatch, SetStateAction, ReactNode } from "react";
import type { Page, Lang, AdminTab } from "../types/app";
import { t } from "../data";
import Navbar from "../Components/Navbar";
import {
  BookOpen,
  Upload,
  Sparkles,
  TrendingUp,
  FolderOpen,
  LogOut,
} from "lucide-react";
import OverviewTab from "../features/admin-dashboard/components/OverviewTab";
import CoursesTab from "../features/admin-dashboard/components/CoursesTab";
import ResourcesTab from "../features/admin-dashboard/components/ResourcesTab";
import UploadTab from "../features/admin-dashboard/components/UploadTab";

export interface AdminDashboardProps {
  dark: boolean;
  lang: Lang;
  setDark: Dispatch<SetStateAction<boolean>>;
  setLang: Dispatch<SetStateAction<Lang>>;
  setPage?: Dispatch<SetStateAction<Page>>;
  onLogout?: () => void;
}

const adminTabs: AdminTab[] = [
  "overview",
  "courses",
  "resources",
  "upload",
];

const tabIcons: Record<AdminTab, ReactNode> = {
  overview: <TrendingUp className="h-4 w-4" />,
  courses: <BookOpen className="h-4 w-4" />,
  resources: <FolderOpen className="h-4 w-4" />,
  upload: <Upload className="h-4 w-4" />,
};

export default function AdminDashboard({
  dark,
  lang,
  setDark,
  setLang,
  setPage,
  onLogout,
}: AdminDashboardProps) {
  const [tab, setTab] = useState<AdminTab>("overview");
  const [uploadDrag, setUploadDrag] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const tx = t[lang] || t.ar;

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        dark
          ? "bg-[#242D42] text-[#F8FAFC]"
          : "bg-slate-50 text-slate-900"
      }`}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <Navbar
        dark={dark}
        lang={lang}
        setDark={setDark}
        setLang={setLang}
        setPage={setPage}
        onLogout={onLogout}
        currentPage="admin"
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#323D59] to-[#7DA49F] text-[#F8FAFC] shadow-md shadow-[#242D42]/40 border border-[#7DA49F]/40">
                <Sparkles className="h-5 w-5" />
              </div>
              <h1 className="font-['Outfit'] text-2xl font-black tracking-tight text-[#F8FAFC] sm:text-3xl">
                {tx.admin.title}
              </h1>
            </div>
            <p className="mt-1 text-sm font-semibold text-[#A5B4BF]">
              {tx.admin.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setTab("upload")}
              className="flex items-center gap-2 rounded-xl bg-[#7DA49F] px-4 py-2.5 text-sm font-bold text-[#1E2638] shadow-md transition-all hover:bg-[#9DBFB8] hover:scale-[1.02] active:scale-95 cursor-pointer border-0"
            >
              <Upload className="h-4 w-4" />
              <span>{tx.admin.uploadResource}</span>
            </button>

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm font-bold text-rose-300 shadow-md transition-all hover:bg-rose-500/20 active:scale-95 cursor-pointer"
              >
                <LogOut className="h-4 w-4 text-rose-400" />
                <span>{lang === "ar" ? "تسجيل الخروج" : "Logout"}</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab bar */}
        <div className="mb-8 flex items-center gap-1.5 overflow-x-auto rounded-2xl border border-white/[0.07] bg-[#323D59] p-1.5 shadow-md">
          {adminTabs.map((key, i) => {
            const isActive = tab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer border-0 ${
                  isActive
                    ? "bg-[#3B4868] text-[#F8FAFC] shadow-sm border border-[#7DA49F]/40"
                    : "bg-transparent text-[#A5B4BF] hover:bg-white/[0.06] hover:text-[#F8FAFC]"
                }`}
              >
                {tabIcons[key]}
                <span>{tx.admin.tabs[i]}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Views */}
        <div className="fade-in">
          {tab === "overview" && <OverviewTab tx={tx} lang={lang} />}
          {tab === "courses" && <CoursesTab tx={tx} lang={lang} />}
          {tab === "resources" && <ResourcesTab tx={tx} lang={lang} />}
          {tab === "upload" && (
            <UploadTab
              tx={tx}
              lang={lang}
              drag={uploadDrag}
              setDrag={setUploadDrag}
              files={uploadedFiles}
              setFiles={setUploadedFiles}
            />
          )}
        </div>
      </div>
    </div>
  );
}
