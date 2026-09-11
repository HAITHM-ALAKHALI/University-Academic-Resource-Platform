import { useState, memo } from "react";
import { Bell, ChevronLeft, CheckCheck } from "lucide-react";
import type { NavState } from "./StudentApp";

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface TopBarProps {
  breadcrumbs: BreadcrumbItem[];
  title?: string;
  subtitle?: string;
  navigate?: (s: NavState) => void;
}

const notifs = [
  {
    id: 1,
    text: "تم إضافة 5 محاضرات جديدة في مادة برمجة 1",
    time: "10 دقائق",
    icon: "📄",
    color: "#7DA49F",
    read: false,
  },
  {
    id: 2,
    text: "امتحان منتصف الترم القادم بعد 3 أيام",
    time: "1 ساعة",
    icon: "📋",
    color: "#C9A855",
    read: false,
  },
  {
    id: 3,
    text: "تم رفع حل واجب المصفوفات",
    time: "3 ساعات",
    icon: "📝",
    color: "#5BAA8E",
    read: true,
  },
  {
    id: 4,
    text: "مادة جديدة متاحة: Advanced Algorithms",
    time: "أمس",
    icon: "📚",
    color: "#8B7EC0",
    read: true,
  },
];

const NotifItem = memo(function NotifItem({
  n,
  onClick,
}: {
  n: (typeof notifs)[0];
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex items-start gap-3 p-3 border-b border-white/[0.06] cursor-pointer transition-colors hover:bg-white/[0.03] ${
        n.read ? "bg-transparent" : "bg-[#7DA49F]/[0.06]"
      }`}
    >
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm"
        style={{ background: `${n.color}18` }}
      >
        {n.icon}
      </div>
      <div className="flex-1 text-right">
        <div className="text-xs font-semibold text-[#F8FAFC] leading-snug">
          {n.text}
        </div>
        <div className="mt-1 text-[10px] font-medium text-[#A5B4BF]">
          منذ {n.time}
        </div>
      </div>
      {!n.read && (
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#7DA49F] shadow-sm shadow-[#7DA49F]/40 animate-pulse" />
      )}
    </div>
  );
});

export default function TopBar({ breadcrumbs, title, subtitle }: TopBarProps) {
  const [showNotifs, setShowNotifs] = useState<boolean>(false);
  const [notifList, setNotifList] = useState(notifs);

  const unread = notifList.filter((n) => !n.read).length;

  return (
    <div
      className="relative z-40 w-full px-6 py-3.5 transition-all sm:px-8"
      style={{
        background: "rgba(36, 45, 66, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      }}
      onClick={() => setShowNotifs(false)}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm">
          {breadcrumbs
            .filter((crumb) => Boolean(crumb && crumb.label && crumb.label.trim()))
            .map((crumb, i, arr) => (
              <div key={i} className="flex items-center gap-1.5">
                {i > 0 && (
                  <ChevronLeft className="h-3.5 w-3.5 text-[#7DA49F] rtl:rotate-0" />
                )}
                <button
                  type="button"
                  onClick={crumb.onClick}
                  className={`rounded px-1.5 py-0.5 border-0 bg-transparent transition-colors ${
                    crumb.onClick
                      ? "cursor-pointer hover:text-[#9DBFB8]"
                      : "cursor-default"
                  } ${
                    i === arr.length - 1
                      ? "font-bold text-[#F8FAFC]"
                      : "font-medium text-[#A5B4BF]"
                  }`}
                >
                  {crumb.label}
                </button>
              </div>
            ))}
        </div>

        {/* Right Controls */}
        <div
          className="flex items-center gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifs(!showNotifs)}
              aria-label="الإشعارات"
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-[#323D59] text-[#F8FAFC] transition-all hover:border-[#7DA49F]/35 hover:bg-[#3B4868] cursor-pointer"
            >
              <Bell className="h-4 w-4" />
              {unread > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#7DA49F] text-[9px] font-bold text-[#1E2638] shadow-sm shadow-[#7DA49F]/40">
                  {unread}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifs && (
              <div className="notif-dropdown absolute left-0 top-11 z-50 w-80 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#323D59] shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#F8FAFC]">
                    <span>الإشعارات</span>
                    {unread > 0 && (
                      <span className="rounded-full bg-[#7DA49F] px-2 py-0.5 text-[10px] text-[#1E2638] font-bold">
                        {unread}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setNotifList((prev) =>
                        prev.map((n) => ({ ...n, read: true }))
                      )
                    }
                    className="flex items-center gap-1 text-[11px] font-bold text-[#7DA49F] hover:text-[#9DBFB8] transition-colors cursor-pointer border-0 bg-transparent"
                  >
                    <CheckCheck className="h-3 w-3" />
                    <span>تحديد الكل كمقروء</span>
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto">
                  {notifList.map((n) => (
                    <NotifItem
                      key={n.id}
                      n={n}
                      onClick={() =>
                        setNotifList((prev) =>
                          prev.map((item) =>
                            item.id === n.id ? { ...item, read: true } : item
                          )
                        )
                      }
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Optional Page Title in TopBar */}
      {(title || subtitle) && (
        <div className="mt-3">
          {title && (
            <h1 className="text-xl sm:text-2xl font-black text-[#F8FAFC]">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-0.5 text-xs sm:text-sm font-medium text-[#A5B4BF]">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
