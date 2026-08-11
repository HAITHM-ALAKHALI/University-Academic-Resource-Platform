import { useState } from "react";
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

export default function TopBar({ breadcrumbs, title, subtitle }: Props) {
  const [showNotifs, setShowNotifs] = useState(false);
  // const [showProfile, setShowProfile] = useState(false);
  const [notifList, setNotifList] = useState(notifs);
  const [search, setSearch] = useState("");

  const unread = notifList.filter((n) => !n.read).length;

  return (
    <div
      style={{
        padding: "14px 28px",
        borderBottom: "1px solid var(--border-subtle)",
        background: "rgba(10,15,30,0.85)",
        backdropFilter: "blur(16px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
      onClick={() => {
        setShowNotifs(false);
        // setShowProfile(false);
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
                style={{
                  background: "none",
                  border: "none",
                  cursor: crumb.onClick ? "pointer" : "default",
                  padding: 0,
                  color:
                    i === breadcrumbs.length - 1
                      ? "var(--text-primary)"
                      : "var(--text-secondary)",
                  fontSize: 13,
                  fontWeight: i === breadcrumbs.length - 1 ? 600 : 400,
                  transition: "color 0.15s",
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
          {/* Search */}
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                right: 11,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
                fontSize: 14,
              }}
            >
              🔍
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن مادة، ملف، محاضرة..."
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid var(--border-medium)",
                borderRadius: 11,
                padding: "7px 36px 7px 60px",
                color: "var(--text-primary)",
                fontSize: 13,
                width: 270,
                outline: "none",
                direction: "rtl",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.08)",
                color: "var(--text-muted)",
                fontSize: 10,
                borderRadius: 6,
                padding: "2px 5px",
                fontFamily: "monospace",
              }}
            >
              Ctrl K
            </span>
          </div>

          {/* Notifications */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => {
                setShowNotifs(!showNotifs);
                // setShowProfile(false);
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
                  }}
                >
                  {unread}
                </span>
              )}
            </button>

            {showNotifs && (
              <div
                style={{
                  position: "absolute",
                  top: 46,
                  left: 0,
                  width: 320,
                  background: "#131C2E",
                  border: "1px solid var(--border-medium)",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 16px 60px rgba(0,0,0,0.6)",
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
                          background: "#3B82F6",
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
                      setNotifList((n) => n.map((x) => ({ ...x, read: true })))
                    }
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--accent-blue)",
                      fontSize: 12,
                    }}
                  >
                    تحديد الكل مقروء
                  </button>
                </div>
                {notifList.map((n) => (
                  <div
                    key={n.id}
                    onClick={() =>
                      setNotifList((prev) =>
                        prev.map((x) =>
                          x.id === n.id ? { ...x, read: true } : x,
                        ),
                      )
                    }
                    style={{
                      display: "flex",
                      gap: 10,
                      padding: "11px 16px",
                      borderBottom: "1px solid var(--border-subtle)",
                      background: n.read
                        ? "transparent"
                        : "rgba(59,130,246,0.04)",
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
                ))}
                {/* <div style={{ padding: "10px 16px", textAlign: "center" }}>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--accent-blue)",
                      fontSize: 12,
                    }}
                  >
                    عرض كل الإشعارات ←
                  </button>
                </div> */}
              </div>
            )}
          </div>

          {/* Profile */}
          {/* <div style={{ position: 'relative' }}>
            <button onClick={() => { setShowProfile(!showProfile); setShowNotifs(false) }} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)',
              borderRadius: 10, padding: '5px 10px 5px 8px', cursor: 'pointer'
            }}>
              <div style={{
                width: 26, height: 26, borderRadius: '50%',
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, color: '#fff'
              }}>عم</div>
              <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>عبد الرحمن</span>
              <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>▾</span>
            </button>

            {showProfile && (
              <div style={{
                position: 'absolute', top: 44, left: 0, width: 200,
                background: '#131C2E', border: '1px solid var(--border-medium)',
                borderRadius: 14, overflow: 'hidden',
                boxShadow: '0 16px 60px rgba(0,0,0,0.6)', zIndex: 200
              }}>
                <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>عبد الرحمن</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>student@cairo.edu</div>
                </div>
                {[
                  { icon: '👤', label: 'الملف الشخصي' },
                  { icon: '⭐', label: 'المفضلة' },
                  { icon: '⬇', label: 'تحميلاتي' },
                  { icon: '⚙', label: 'الإعدادات' },
                  { icon: '↩', label: 'تسجيل الخروج', danger: true },
                ].map((item, i, arr) => (
                  <button key={i} style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 16px', background: 'none', border: 'none',
                    borderBottom: i < arr.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                    cursor: 'pointer', color: (item as {danger?: boolean}).danger ? '#EF4444' : 'var(--text-secondary)', fontSize: 13
                  }} className="file-row">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div> */}
        </div>
      </div>

      {/* Title row */}
      {title && (
        <div style={{ marginTop: 10 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 800,
              color: "var(--text-primary)",
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
