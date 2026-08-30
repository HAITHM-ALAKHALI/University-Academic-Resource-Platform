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
    color: "#899C9A",
    read: false,
  },
  {
    id: 2,
    text: "امتحان منتصف الترم القادم بعد 3 أيام",
    time: "1 ساعة",
    icon: "📋",
    color: "#AABCAF",
    read: false,
  },
  {
    id: 3,
    text: "تم رفع حل واجب المصفوفات",
    time: "3 ساعات",
    icon: "📝",
    color: "#899C9A",
    read: true,
  },
  {
    id: 4,
    text: "مادة جديدة متاحة: Advanced Algorithms",
    time: "أمس",
    icon: "📚",
    color: "#AABCAF",
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
      className={`flex items-start gap-3 p-3 border-b border-[#6E7C8B]/30 cursor-pointer transition-colors hover:bg-white/[0.04] ${
        n.read ? "bg-transparent" : "bg-[#899C9A]/[0.12]"
      }`}
    >
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm"
        style={{ background: `${n.color}25` }}
      >
        {n.icon}
      </div>
      <div className="flex-1 text-right">
        <div className="text-xs font-semibold text-[#F4F7F6] leading-snug">
          {n.text}
        </div>
        <div className="mt-1 text-[10px] font-medium text-[#AABCAF]">
          منذ {n.time}
        </div>
      </div>
      {!n.read && (
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#899C9A] shadow-sm shadow-[#899C9A]/50 animate-pulse" />
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
      className="relative z-40 w-full border-b border-[#6E7C8B]/40 bg-[#35425E]/80 px-6 py-4 backdrop-blur-md transition-all sm:px-8"
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
                  <ChevronLeft className="h-3.5 w-3.5 text-[#899C9A] rtl:rotate-0" />
                )}
                <button
                  type="button"
                  onClick={crumb.onClick}
                  className={`rounded px-1.5 py-0.5 border-0 bg-transparent transition-colors ${
                    crumb.onClick
                      ? "cursor-pointer hover:text-[#AABCAF]"
                      : "cursor-default"
                  } ${
                    i === arr.length - 1
                      ? "font-bold text-[#F4F7F6]"
                      : "font-medium text-[#AABCAF]"
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
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#6E7C8B]/40 bg-[#525C79]/80 text-[#F4F7F6] transition-all hover:border-[#899C9A] hover:bg-[#525C79] cursor-pointer"
            >
              <Bell className="h-4 w-4" />
              {unread > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#899C9A] text-[9px] font-bold text-[#1D263B] shadow-sm shadow-[#899C9A]/50">
                  {unread}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifs && (
              <div className="notif-dropdown absolute left-0 top-11 z-50 w-80 overflow-hidden rounded-2xl border border-[#6E7C8B]/50 bg-[#525C79] shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#6E7C8B]/30 px-4 py-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#F4F7F6]">
                    <span>الإشعارات</span>
                    {unread > 0 && (
                      <span className="rounded-full bg-[#899C9A] px-2 py-0.5 text-[10px] text-[#1D263B] font-bold">
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
                    className="flex items-center gap-1 text-[11px] font-bold text-[#899C9A] hover:text-[#AABCAF] transition-colors cursor-pointer border-0 bg-transparent"
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
            <h1 className="text-xl sm:text-2xl font-black text-[#F4F7F6]">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-0.5 text-xs sm:text-sm font-medium text-[#AABCAF]">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
