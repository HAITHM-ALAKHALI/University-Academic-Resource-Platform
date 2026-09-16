import type { ReactNode } from "react";
import { FileText, Users, RotateCcw, TrendingUp } from "lucide-react";
import type { AdminNotificationItem } from "../../../constants/adminNav";

export interface NotificationDropdownProps {
  notifications: AdminNotificationItem[];
  unreadCount: number;
  onMarkAllRead: () => void;
  onSelectNotification: (id: number) => void;
}

const iconMap: Record<string, ReactNode> = {
  FileText: <FileText className="h-4 w-4" />,
  Users: <Users className="h-4 w-4" />,
  RotateCcw: <RotateCcw className="h-4 w-4" />,
  TrendingUp: <TrendingUp className="h-4 w-4" />,
};

export function NotificationDropdown({
  notifications,
  unreadCount,
  onMarkAllRead,
  onSelectNotification,
}: NotificationDropdownProps) {
  return (
    <div className="notif-dropdown absolute top-12 left-0 z-50 w-80 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#323D59] shadow-2xl backdrop-blur-2xl">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <span className="text-xs font-bold text-[#F4F7F6]">
          الإشعارات ({unreadCount})
        </span>
        <button
          type="button"
          onClick={onMarkAllRead}
          className="text-[11px] font-bold text-[#899C9A] hover:text-[#AABCAF] cursor-pointer border-0 bg-transparent"
        >
          تحديد الكل كمقروء
        </button>
      </div>

      <div className="max-h-80 divide-y divide-white/[0.06] overflow-y-auto">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => onSelectNotification(n.id)}
            className={`flex items-start gap-3 p-3 transition-colors hover:bg-white/[0.04] cursor-pointer ${
              !n.read ? "bg-[#899C9A]/10" : ""
            }`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${n.color}`}
            >
              {iconMap[n.iconName] || <FileText className="h-4 w-4" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-[#F4F7F6] leading-snug">
                {n.text}
              </p>
              <span className="mt-1 block text-[10px] text-[#AABCAF]">
                منذ {n.time}
              </span>
            </div>
            {!n.read && (
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#899C9A]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationDropdown;
