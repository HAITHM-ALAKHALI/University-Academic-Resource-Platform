import { useState, memo } from "react";
import type { NavState } from "./StudentApp";

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface Props {
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
      className="file-row"
      style={{
        display: "flex",
        gap: 10,
        padding: "11px 16px",
        borderBottom: "1px solid var(--border-subtle)",
        background: n.read ? "transparent" : "rgba(59,130,246,0.04)",
        cursor: "pointer",
        transition: "background 0.15s",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: n.color + "20",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 15,
        }}
      >
        {n.icon}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 12,
            color: "var(--text-primary)",
            lineHeight: 1.4,
          }}
        >
          {n.text}
        </div>
        <div
          style={{
            fontSize: 10,
            color: "var(--text-muted)",
            marginTop: 3,
          }}
        >
          منذ {n.time}
        </div>
      </div>
      {!n.read && (
        <div
          className="glow-pulse"
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#3B82F6",
            flexShrink: 0,
            marginTop: 5,
          }}
        />
      )}
    </div>
  );
});

export default function TopBar({ breadcrumbs, title, subtitle }: Props) {
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifList, setNotifList] = useState(notifs);

  const unread = notifList.filter((n) => !n.read).length;

  return (
    <div
      style={{
        padding: "14px 28px",
        borderBottom: "1px solid var(--border-subtle)",
        background: "rgba(10,15,30,0.88)",
        backdropFilter: "blur(20px) saturate(1.2)",
        WebkitBackdropFilter: "blur(20px) saturate(1.2)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
      onClick={() => {
        setShowNotifs(false);
      }}
    >
      {/* Breadcrumbs row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {breadcrumbs.map((crumb, i) => (
            <span
              key={i}
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              {i > 0 && (
                <span style={{ color: "var(--text-muted)", fontSize: 13 }}>
                  ›
                </span>
              )}
              <button
                onClick={crumb.onClick}
                className="focus-ring"
                style={{
                  background: "none",
                  border: "none",
                  cursor: crumb.onClick ? "pointer" : "default",
                  padding: "2px 4px",
                  borderRadius: 4,
                  color:
                    i === breadcrumbs.length - 1
                      ? "var(--text-primary)"
                      : "var(--text-secondary)",
                  fontSize: 13,
                  fontWeight: i === breadcrumbs.length - 1 ? 600 : 400,
                  transition: "color 0.15s, background 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (crumb.onClick)
                    e.currentTarget.style.color = "var(--accent-blue)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    i === breadcrumbs.length - 1
                      ? "var(--text-primary)"
                      : "var(--text-secondary)";
                }}
              >
                {crumb.label}
              </button>
            </span>
          ))}
        </div>

        {/* Right controls */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 10 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Notifications */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => {
                setShowNotifs(!showNotifs);
              }}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid var(--border-medium)",
                borderRadius: 10,
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 17,
                position: "relative",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "var(--border-medium)";
              }}
            >
              🔔
              {unread > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 5,
                    left: 5,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: "#EF4444",
                    color: "#fff",
                    fontSize: 8,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 8px rgba(239, 68, 68, 0.4)",
                  }}
                >
                  {unread}
                </span>
              )}
            </button>

            {showNotifs && (
              <div
                className="notif-dropdown"
                style={{
                  position: "absolute",
                  top: 46,
                  left: 0,
                  width: 320,
                  background: "#131C2E",
                  border: "1px solid var(--border-medium)",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow:
                    "0 20px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)",
                  zIndex: 200,
                }}
              >
                <div
                  style={{
                    padding: "13px 16px",
                    borderBottom: "1px solid var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--text-primary)",
                    }}
                  >
                    الإشعارات{" "}
                    {unread > 0 && (
                      <span
                        style={{
                          fontSize: 11,
                          background:
                            "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                          color: "#fff",
                          borderRadius: 8,
                          padding: "1px 6px",
                          marginRight: 4,
                        }}
                      >
                        {unread}
                      </span>
                    )}
                  </span>
                  <button
                    onClick={() =>
                      setNotifList((n) =>
                        n.map((x) => ({ ...x, read: true })),
                      )
                    }
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--accent-blue)",
                      fontSize: 12,
                      transition: "opacity 0.15s",
                    }}
                  >
                    تحديد الكل مقروء
                  </button>
                </div>
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
            )}
          </div>
        </div>
      </div>

      {/* Title row */}
      {title && (
        <div style={{ marginTop: 10 }} className="slide-up">
          <h1
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 800,
              color: "var(--text-primary)",
              fontFamily: "Outfit, 'Noto Sans Arabic', sans-serif",
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                margin: "3px 0 0",
                fontSize: 13,
                color: "var(--text-secondary)",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
