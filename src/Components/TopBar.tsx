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
    color: "#3B82F6",
    read: false,
  },
  {
    id: 2,
    text: "امتحان منتصف الترم القادم بعد 3 أيام",
    time: "1 ساعة",
    icon: "📋",
    color: "#F59E0B",
    read: false,
  },
  {
    id: 3,
    text: "تم رفع حل واجب المصفوفات",
    time: "3 ساعات",
    icon: "📝",
    color: "#10B981",
    read: true,
  },
  {
    id: 4,
    text: "مادة جديدة متاحة: Advanced Algorithms",
    time: "أمس",
    icon: "📚",
    color: "#8B5CF6",
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
      className={`flex items-start gap-3 p-3 border-b border-[var(--border-subtle)] cursor-pointer transition-colors hover:bg-white/[0.04] ${
        n.read ? "bg-transparent" : "bg-blue-500/[0.06]"
      }`}
    >
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm"
        style={{ background: `${n.color}20` }}
      >
        {n.icon}
      </div>
      <div className="flex-1 text-right">
        <div className="text-xs text-[var(--text-primary)] leading-snug">
          {n.text}
        </div>
        <div className="mt-1 text-[10px] text-[var(--text-muted)]">
          منذ {n.time}
        </div>
      </div>
      {!n.read && (
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50 animate-pulse" />
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
      className="relative z-40 w-full border-b border-[var(--border-subtle)] bg-[rgba(10,15,30,0.5)] px-6 py-4 backdrop-blur-md transition-all sm:px-8"
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
                  <ChevronLeft className="h-3.5 w-3.5 text-[var(--text-muted)] rtl:rotate-0" />
                )}
                <button
                  type="button"
                  onClick={crumb.onClick}
                  className={`rounded px-1.5 py-0.5 border-0 bg-transparent transition-colors ${
                    crumb.onClick
                      ? "cursor-pointer hover:text-blue-400"
                      : "cursor-default"
                  } ${
                    i === arr.length - 1
                      ? "font-semibold text-[var(--text-primary)]"
                      : "font-normal text-[var(--text-secondary)]"
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
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-medium)] bg-white/[0.05] text-[var(--text-primary)] transition-all hover:border-white/20 hover:bg-white/[0.08] cursor-pointer"
            >
              <Bell className="h-4 w-4" />
              {unread > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-sm shadow-red-500/50">
                  {unread}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifs && (
              <div className="notif-dropdown absolute left-0 top-11 z-50 w-80 overflow-hidden rounded-2xl border border-[var(--border-medium)] bg-[#131C2E] shadow-2xl">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
                    <span>الإشعارات</span>
                    {unread > 0 && (
                      <span className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-2 py-0.5 text-[10px] text-white">
                        {unread}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setNotifList((n) => n.map((x) => ({ ...x, read: true })))
                    }
                    className="flex items-center gap-1 border-0 bg-transparent text-xs text-blue-400 hover:text-blue-300 cursor-pointer"
                  >
                    <CheckCheck className="h-3 w-3" />
                    <span>تحديد الكل مقروء</span>
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifList.map((n) => (
                    <NotifItem
                      key={n.id}
                      n={n}
                      onClick={() =>
                        setNotifList((prev) =>
                          prev.map((x) =>
                            x.id === n.id ? { ...x, read: true } : x,
                          ),
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

      {/* Screen Title & Subtitle */}
      {title && (
        <div className="mt-3 text-right">
          <h1 className="text-xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-2xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-xs text-[var(--text-secondary)] sm:text-sm">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
