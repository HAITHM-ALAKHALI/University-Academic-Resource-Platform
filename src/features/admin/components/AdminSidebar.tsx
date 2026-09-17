import type { ReactNode } from "react";
import {
  GraduationCap,
  ArrowRight,
  LayoutDashboard,
  FolderTree,
  Calendar,
  BookOpen,
  Users,
  FileText,
  Settings,
  ShieldCheck,
  UserCog,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { AdminView } from "../../../types/app";
import {
  adminNavSections,
  type AdminNavIconName,
} from "../../../constants/adminNav";

const navIcons: Record<AdminNavIconName, ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="h-4 w-4 shrink-0" />,
  FolderTree: <FolderTree className="h-4 w-4 shrink-0" />,
  GraduationCap: <GraduationCap className="h-4 w-4 shrink-0" />,
  Calendar: <Calendar className="h-4 w-4 shrink-0" />,
  BookOpen: <BookOpen className="h-4 w-4 shrink-0" />,
  FileText: <FileText className="h-4 w-4 shrink-0" />,
  Users: <Users className="h-4 w-4 shrink-0" />,
  ShieldCheck: <ShieldCheck className="h-4 w-4 shrink-0" />,
  UserCog: <UserCog className="h-4 w-4 shrink-0" />,
  Settings: <Settings className="h-4 w-4 shrink-0" />,
};

export interface AdminSidebarProps {
  currentView: AdminView;
  onSelectView: (view: AdminView) => void;
  onSwitchStudent?: () => void;
  onLogout?: () => void;
  doctorsCount?: number;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function AdminSidebar({
  currentView,
  onSelectView,
  onSwitchStudent,
  onLogout,
  doctorsCount = 0,
  collapsed = false,
  onToggleCollapse,
}: AdminSidebarProps) {
  return (
    <aside
      className={`fixed top-0 right-0 z-40 flex h-screen flex-col border-l border-white/[0.06] bg-[#242D42]/95 shadow-2xl backdrop-blur-2xl transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* ─── Brand & Header with Collapse Toggle ─── */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#323D59] via-[#242D42] to-[#3B4868] text-[#F4F7F6] shadow-md border border-white/[0.07]">
            <GraduationCap className="h-6 w-6 text-[#7DA49F]" />
          </div>
          {!collapsed && (
            <div className="transition-opacity duration-200">
              <div className="font-['Outfit'] text-base font-extrabold tracking-tight text-[#F4F7F6]">
                دراستي
              </div>
              <div className="text-[11px] font-semibold text-[#899C9A]">
                لوحة الإدارة
              </div>
            </div>
          )}
        </div>

        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            title={collapsed ? "توسيع القائمة" : "طي القائمة"}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-[#323D59] text-slate-400 hover:bg-[#3B4868] hover:text-[#F4F7F6] transition-colors cursor-pointer"
          >
            {collapsed ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {/* ─── Grouped Navigation Sections ─── */}
      <nav className="flex-1 space-y-4 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-slate-700">
        {adminNavSections.map((section) => (
          <div key={section.id} className="space-y-1">
            {/* Section Header */}
            {!collapsed ? (
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-1 text-right select-none">
                {section.title}
              </div>
            ) : (
              <div className="my-1 border-t border-white/[0.06]" />
            )}

            {/* Section Items */}
            {section.items.map((item) => {
              const isActive = currentView === item.id;
              const badgeCount =
                item.id === "doctors" && doctorsCount > 0
                  ? doctorsCount
                  : item.badge;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectView(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold transition-all duration-150 cursor-pointer ${
                    collapsed ? "justify-center" : "justify-between"
                  } ${
                    isActive
                      ? "bg-slate-700/60 text-[#7DA49F] font-bold shadow-md border-r-2 border-[#7DA49F]"
                      : "text-[#AABCAF] hover:bg-[#323D59] hover:text-[#F4F7F6]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        isActive ? "text-[#7DA49F]" : "text-[#8E9CA8]"
                      }
                    >
                      {navIcons[item.iconName] || (
                        <LayoutDashboard className="h-4 w-4" />
                      )}
                    </span>
                    {!collapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </div>

                  {!collapsed && badgeCount && badgeCount > 0 ? (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        isActive
                          ? "bg-[#7DA49F] text-[#1D263B]"
                          : "bg-[#323D59] text-[#AABCAF] border border-white/[0.07]"
                      }`}
                    >
                      {badgeCount}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* ─── Footer Actions (Switch Student & Logout) ─── */}
      {(onSwitchStudent || onLogout) && (
        <div className="border-t border-white/[0.06] p-3 space-y-2">
          {onSwitchStudent && (
            <button
              type="button"
              onClick={onSwitchStudent}
              title="العودة لواجهة الطالب"
              className={`flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-[#323D59] py-2.5 text-xs font-bold text-[#F4F7F6] transition-all duration-200 hover:bg-[#3B4868] hover:border-white/20 cursor-pointer ${
                collapsed ? "px-2" : "px-4"
              }`}
            >
              <ArrowRight className="h-4 w-4 text-[#7DA49F] shrink-0" />
              {!collapsed && <span>العودة لواجهة الطالب</span>}
            </button>
          )}

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              title="تسجيل الخروج"
              className={`flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/25 bg-rose-500/10 py-2.5 text-xs font-bold text-rose-300 transition-all duration-200 hover:bg-rose-500/20 hover:border-rose-500/40 cursor-pointer active:scale-95 ${
                collapsed ? "px-2" : "px-4"
              }`}
            >
              <LogOut className="h-4 w-4 text-rose-400 shrink-0" />
              {!collapsed && <span>تسجيل الخروج</span>}
            </button>
          )}
        </div>
      )}
    </aside>
  );
}

export default AdminSidebar;
