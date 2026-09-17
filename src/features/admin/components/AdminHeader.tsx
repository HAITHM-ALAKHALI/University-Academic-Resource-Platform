import { Bell, LogOut } from "lucide-react";
import type { AdminView } from "../../../types/app";
import { defaultAdminNav } from "./AdminSidebar";
import NotificationDropdown from "./NotificationDropdown";
import type { AdminNotificationItem } from "../../../constants/adminNav";

export interface AdminHeaderProps {
  currentView: AdminView;
  showNotifications: boolean;
  onToggleNotifications: () => void;
  notifications: AdminNotificationItem[];
  unreadCount: number;
  onMarkAllRead: () => void;
  onSelectNotification: (id: number) => void;
  onLogout?: () => void;
}

export function AdminHeader({
  currentView,
  showNotifications,
  onToggleNotifications,
  notifications,
  unreadCount,
  onMarkAllRead,
  onSelectNotification,
  onLogout,
}: AdminHeaderProps) {
  const currentNav = defaultAdminNav.find((n) => n.id === currentView);

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between border-b border-white/[0.06] bg-[#242D42]/85 px-8 py-4 backdrop-blur-md"
      onClick={(e) => e.stopPropagation()}
    >
      <div>
        <div className="text-[11px] font-semibold text-[#AABCAF]">
          دراستي / لوحة الإدارة
        </div>
        <h1 className="font-['Outfit'] text-lg font-bold text-[#F4F7F6]">
          {currentNav?.label || "لوحة التحكم"}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={onToggleNotifications}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-[#323D59] text-[#F4F7F6] transition-colors hover:border-white/20 hover:bg-[#3B4868] cursor-pointer"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#899C9A] text-[9px] font-bold text-[#1D263B] shadow-sm shadow-[#899C9A]/50">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Popover */}
          {showNotifications && (
            <NotificationDropdown
              notifications={notifications}
              unreadCount={unreadCount}
              onMarkAllRead={onMarkAllRead}
              onSelectNotification={onSelectNotification}
            />
          )}
        </div>

        {/* Logout Button */}
        {onLogout && (
          <button
            type="button"
            onClick={onLogout}
            title="تسجيل الخروج"
            className="flex items-center gap-2 rounded-xl border border-rose-500/25 bg-rose-500/10 px-3.5 py-2 text-xs font-bold text-rose-300 transition-all duration-200 hover:bg-rose-500/20 hover:border-rose-500/40 cursor-pointer active:scale-95"
          >
            <LogOut className="h-4 w-4 text-rose-400" />
            <span className="hidden sm:inline">تسجيل الخروج</span>
          </button>
        )}
      </div>
    </header>
  );
}

export default AdminHeader;
