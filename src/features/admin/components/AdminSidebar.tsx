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
  LogOut,
} from "lucide-react";
import type { AdminView } from "../../../types/app";

export interface NavItem {
  id: AdminView;
  label: string;
  icon: ReactNode;
  badge: number;
}

export const defaultAdminNav: NavItem[] = [
  {
    id: "dashboard",
    label: "لوحة التحكم",
    icon: <LayoutDashboard className="h-4 w-4" />,
    badge: 0,
  },
  {
    id: "departments",
    label: "الأقسام",
    icon: <FolderTree className="h-4 w-4" />,
    badge: 0,
  },
  {
    id: "levels",
    label: "المستويات",
    icon: <GraduationCap className="h-4 w-4" />,
    badge: 0,
  },
  {
    id: "semesters",
    label: "الترمات",
    icon: <Calendar className="h-4 w-4" />,
    badge: 0,
  },
  {
    id: "courses",
    label: "المواد",
    icon: <BookOpen className="h-4 w-4" />,
    badge: 3,
  },
  {
    id: "files",
    label: "الملفات",
    icon: <FileText className="h-4 w-4" />,
    badge: 12,
  },
  {
    id: "admins",
    label: "المدراء ",
    icon: <Users className="h-4 w-4" />,
    badge: 5,
  },
  {
    id: "content_managers",
    label: "مدراء المحتوى",
    icon: <Users className="h-4 w-4" />,
    badge: 5,
  },
  {
    id: "doctors",
    label: "الدكاترة",
    icon: <Users className="h-4 w-4" />,
    badge: 0,
  },
  {
    id: "content_managements",
    label: "ادارة المحتوى",
    icon: <Settings className="h-4 w-4" />,
    badge: 0,
  },
  {
    id: "settings",
    label: "الإعدادات",
    icon: <Settings className="h-4 w-4" />,
    badge: 0,
  },
];

export interface AdminSidebarProps {
  currentView: AdminView;
  onSelectView: (view: AdminView) => void;
  onSwitchStudent?: () => void;
  onLogout?: () => void;
  doctorsCount?: number;
}

export function AdminSidebar({
  currentView,
  onSelectView,
  onSwitchStudent,
  onLogout,
  doctorsCount = 0,
}: AdminSidebarProps) {
  return (
    <aside className="fixed top-0 right-0 z-40 flex h-screen w-64 flex-col border-l border-white/[0.06] bg-[#242D42]/95 shadow-2xl backdrop-blur-2xl">
      {/* Brand Header */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-6 py-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#323D59] via-[#242D42] to-[#3B4868] text-[#F4F7F6] shadow-md border border-white/[0.07]">
          <GraduationCap className="h-6 w-6" />
        </div>
        <div>
          <div className="font-['Outfit'] text-base font-extrabold tracking-tight text-[#F4F7F6]">
            دراستي
          </div>
          <div className="text-[11px] font-semibold text-[#899C9A]">
            لوحة الإدارة
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {defaultAdminNav.map((item) => {
          const isActive = currentView === item.id;
          const badgeCount =
            item.id === "doctors" && doctorsCount > 0
              ? doctorsCount
              : item.badge;

          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              className={`flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all duration-150 cursor-pointer ${
                isActive
                  ? "bg-[#3B4868] text-[#F4F7F6] shadow-md border-r-2 border-[#899C9A]"
                  : "text-[#AABCAF] hover:bg-[#323D59] hover:text-[#F4F7F6]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={isActive ? "text-[#899C9A]" : "text-[#8E9CA8]"}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>

              {badgeCount > 0 && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    isActive
                      ? "bg-[#899C9A] text-[#1D263B]"
                      : "bg-[#323D59] text-[#AABCAF] border border-white/[0.07]"
                  }`}
                >
                  {badgeCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Actions */}
      {(onSwitchStudent || onLogout) && (
        <div className="border-t border-white/[0.06] p-4 space-y-2">
          {onSwitchStudent && (
            <button
              type="button"
              onClick={onSwitchStudent}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-[#323D59] px-4 py-2.5 text-xs font-bold text-[#F4F7F6] transition-all duration-200 hover:bg-[#3B4868] hover:border-white/20 cursor-pointer"
            >
              <ArrowRight className="h-4 w-4 text-[#899C9A]" />
              <span>العودة لواجهة الطالب</span>
            </button>
          )}

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/25 bg-rose-500/10 px-4 py-2.5 text-xs font-bold text-rose-300 transition-all duration-200 hover:bg-rose-500/20 hover:border-rose-500/40 cursor-pointer active:scale-95"
            >
              <LogOut className="h-4 w-4 text-rose-400" />
              <span>تسجيل الخروج</span>
            </button>
          )}
        </div>
      )}
    </aside>
  );
}

export default AdminSidebar;
