import { useState } from "react";

type AdminView =
  | "dashboard"
  | "universities"
  | "colleges"
  | "departments"
  | "levels"
  | "semesters"
  | "courses"
  | "files"
  | "users"
  | "settings";

const adminNav = [
  { id: "dashboard", label: "لوحة التحكم", icon: "⊞", badge: 0 },
  // { id: 'universities', label: 'الجامعات',     icon: '🏛', badge: 0  },
  // { id: 'colleges',     label: 'الكليات',      icon: '🏫', badge: 0  },
  { id: "departments", label: "الأقسام", icon: "📐", badge: 0 },
  { id: "levels", label: "المستويات", icon: "📊", badge: 0 },
  { id: "semesters", label: "الترمات", icon: "📅", badge: 0 },
  { id: "courses", label: "المواد", icon: "📚", badge: 3 },
  { id: "files", label: "الملفات", icon: "📁", badge: 12 },
  // { id: 'users',        label: 'المستخدمون',   icon: '👥', badge: 5  },
  // { id: "settings", label: "الإعدادات", icon: "⚙", badge: 0 },
];

const notifications = [
  {
    id: 1,
    text: "تم رفع 5 ملفات جديدة في مادة برمجة 1",
    time: "2 دقائق",
    icon: "📄",
    color: "#3B82F6",
    read: false,
  },
  {
    id: 2,
    text: "طلب مستخدم جديد: محمد أحمد للانضمام",
    time: "18 دقيقة",
    icon: "👤",
    color: "#10B981",
    read: false,
  },
  {
    id: 3,
    text: "تم إضافة كلية جديدة: كلية الفنون التطبيقية",
    time: "1 ساعة",
    icon: "🏫",
    color: "#8B5CF6",
    read: false,
  },
  {
    id: 4,
    text: "تحديث النظام: الإصدار 2.4.1 متاح",
    time: "3 ساعات",
    icon: "🔄",
    color: "#F59E0B",
    read: true,
  },
  {
    id: 5,
    text: "تقرير أسبوعي: 1,240 تحميل هذا الأسبوع",
    time: "5 ساعات",
    icon: "📊",
    color: "#06B6D4",
    read: true,
  },
];

interface AdminAppProps {
  onSwitchStudent?: () => void;
}

export default function AdminApp({ onSwitchStudent }: AdminAppProps) {
  const [view, setView] = useState<AdminView>("dashboard");
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"add" | "edit">("add");
  const [showNotifs, setShowNotifs] = useState(false);
  // const [showProfile, setShowProfile] = useState(false);
  const [notifList, setNotifList] = useState(notifications);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const unreadCount = notifList.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifList((n) => n.map((x) => ({ ...x, read: true })));

  return (
    <div
      style={{ display: "flex", minHeight: "100vh", direction: "rtl" }}
      onClick={() => {
        setShowNotifs(false);
        // setShowProfile(false);
      }}
    >
      {/* Admin Sidebar */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: 240,
          height: "100vh",
          background: "rgba(10,15,30,0.98)",
          borderLeft: "1px solid var(--border-subtle)",
          display: "flex",
          flexDirection: "column",
          zIndex: 100,
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "22px 22px 18px",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              🎓
            </div>
            <div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: 15,
                  color: "var(--text-primary)",
                }}
              >
                UniHub
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--accent-blue)",
                  fontWeight: 600,
                }}
              >
                Admin Panel
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "10px 0", overflowY: "auto" }}>
          {adminNav.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as AdminView)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "11px 20px",
                background: view === item.id ? "rgba(59,130,246,0.1)" : "none",
                border: "none",
                borderRight:
                  view === item.id
                    ? "2px solid var(--accent-blue)"
                    : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 17 }}>{item.icon}</span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: view === item.id ? 600 : 400,
                  flex: 1,
                  textAlign: "right",
                  color:
                    view === item.id
                      ? "var(--text-primary)"
                      : "var(--text-secondary)",
                }}
              >
                {item.label}
              </span>
              {item.badge > 0 && (
                <span
                  style={{
                    background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 700,
                    borderRadius: 10,
                    padding: "1px 6px",
                    minWidth: 18,
                    textAlign: "center",
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User */}
        <div
          style={{
            padding: "16px 20px",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, #EF4444, #F59E0B)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 700, color: '#fff'
            }}>أح</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>أحمد المدير</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Super Admin</div>
            </div> */}
            <button
              onClick={onSwitchStudent}
              title="العودة لواجهة الطالب"
              style={{
                width: "100%",
                background: "rgba(139,92,246,0.1)",
                border: "1px solid rgba(139,92,246,0.2)",
                borderRadius: 10,
                padding: "9px 14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "var(--accent-purple-light)",
              }}
            >
              الصفحة الرئيسية
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main
        style={{
          flex: 1,
          marginRight: 240,
          overflow: "auto",
          minHeight: "100vh",
        }}
      >
        {/* Top Bar */}
        <div
          style={{
            padding: "14px 28px",
            borderBottom: "1px solid var(--border-subtle)",
            background: "rgba(10,15,30,0.85)",
            backdropFilter: "blur(12px)",
            position: "sticky",
            top: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Breadcrumb + title */}
          <div>
            <div
              style={{
                fontSize: 11,
                color: "var(--text-muted)",
                marginBottom: 2,
              }}
            >
              UniHub / Admin
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              {adminNav.find((n) => n.id === view)?.label}
            </h1>
          </div>

          {/* Search */}
          {/* <div style={{ position: "relative", marginRight: "auto" }}>
            <span
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
                fontSize: 14,
              }}
            >
              🔍
            </span>
            <input
              placeholder="بحث سريع..."
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid var(--border-medium)",
                borderRadius: 10,
                padding: "8px 38px 8px 14px",
                color: "var(--text-primary)",
                fontSize: 13,
                width: 220,
                outline: "none",
                direction: "rtl",
              }}
            />
          </div> */}

          {/* Notification bell */}
          <div style={{ position: "relative",marginRight: "auto" }}>
            <button
              onClick={() => {
                setShowNotifs(!showNotifs);
                // setShowProfile(false);
              }}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid var(--border-medium)",
                borderRadius: 10,
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 16,
                position: "relative",
              }}
            >
              🔔
              {unreadCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 4,
                    left: 4,
                    background: "#EF4444",
                    color: "#fff",
                    fontSize: 9,
                    fontWeight: 700,
                    borderRadius: "50%",
                    width: 15,
                    height: 15,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifs && (
              <div
                style={{
                  position: "absolute",
                  top: 46,
                  left: 0,
                  width: 340,
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
                    padding: "14px 16px",
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
                    الإشعارات
                  </span>
                  <button
                    onClick={markAllRead}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--accent-blue)",
                      fontSize: 12,
                    }}
                  >
                    تحديد الكل كمقروء
                  </button>
                </div>
                {notifList.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      display: "flex",
                      gap: 10,
                      padding: "12px 16px",
                      borderBottom: "1px solid var(--border-subtle)",
                      background: n.read
                        ? "transparent"
                        : "rgba(59,130,246,0.04)",
                      cursor: "pointer",
                      transition: "background 0.15s",
                    }}
                    onClick={() =>
                      setNotifList((prev) =>
                        prev.map((x) =>
                          x.id === n.id ? { ...x, read: true } : x,
                        ),
                      )
                    }
                  >
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 9,
                        background: n.color + "20",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                      }}
                    >
                      {n.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
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
                          marginTop: 4,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile */}
          {/* <div style={{ position: 'relative' }}>
            <button onClick={() => { setShowProfile(!showProfile); setShowNotifs(false) }} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-medium)',
              borderRadius: 10, padding: '6px 12px 6px 8px', cursor: 'pointer'
            }}>
              <div style={{
                width: 26, height: 26, borderRadius: '50%',
                background: 'linear-gradient(135deg, #EF4444, #F59E0B)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, color: '#fff'
              }}>أح</div>
              <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>أحمد المدير</span>
              <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>▾</span>
            </button>
            {showProfile && (
              <div style={{
                position: 'absolute', top: 46, left: 0,
                width: 200, background: '#131C2E',
                border: '1px solid var(--border-medium)',
                borderRadius: 14, overflow: 'hidden',
                boxShadow: '0 16px 60px rgba(0,0,0,0.6)', zIndex: 200
              }}>
                {[
                  { icon: '👤', label: 'الملف الشخصي' },
                  { icon: '⚙', label: 'الإعدادات', action: () => setView('settings') },
                  { icon: '🔒', label: 'تغيير كلمة المرور' },
                  { icon: '↩', label: 'تسجيل الخروج' },
                ].map((item, i) => (
                  <button key={i}
                    onClick={() => { item.action?.(); setShowProfile(false) }}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                      padding: '11px 16px', background: 'none', border: 'none',
                      borderBottom: i < 3 ? '1px solid var(--border-subtle)' : 'none',
                      cursor: 'pointer', color: i === 3 ? '#EF4444' : 'var(--text-secondary)',
                      fontSize: 13, transition: 'background 0.15s'
                    }} className="file-row">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div> */}
        </div>

        {/* Content */}
        <div style={{ padding: "28px 28px 48px" }}>
          {view === "dashboard" && <AdminDashboard setView={setView} />}
          {view === "settings" && <AdminSettings />}
          {view !== "dashboard" && view !== "settings" && (
            <AdminTable
              view={view}
              onAdd={() => {
                setDialogType("add");
                setShowDialog(true);
              }}
              onEdit={() => {
                setDialogType("edit");
                setShowDialog(true);
              }}
              onDelete={(name) => setDeleteConfirm(name)}
            />
          )}
        </div>
      </main>

      {showDialog && (
        <AdminDialog
          type={dialogType}
          view={view}
          onClose={() => setShowDialog(false)}
        />
      )}

      {deleteConfirm && (
        <DeleteConfirm
          name={deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
}

/* ─── Dashboard ─────────────────────────────────────────────────────────── */
function AdminDashboard({ setView }: { setView: (v: AdminView) => void }) {
  const stats = [
    // {
    //   label: "الجامعات",
    //   value: "12",
    //   icon: "🏛",
    //   color: "#3B82F6",
    //   trend: "+2",
    //   view: "universities" as AdminView,
    // },
    // {
    //   label: "الكليات",
    //   value: "48",
    //   icon: "🏫",
    //   color: "#8B5CF6",
    //   trend: "+5",
    //   view: "colleges" as AdminView,
    // },
    {
      label: "المواد",
      value: "620",
      icon: "📚",
      color: "#06B6D4",
      trend: "+18",
      view: "courses" as AdminView,
    },
    {
      label: "الملفات",
      value: "8.4K",
      icon: "📄",
      color: "#10B981",
      trend: "+124",
      view: "files" as AdminView,
    },
    // {
    //   label: "المستخدمون",
    //   value: "2.1K",
    //   icon: "👥",
    //   color: "#F59E0B",
    //   trend: "+47",
    //   view: "users" as AdminView,
    // },
    {
      label: "تحميلات اليوم",
      value: "384",
      icon: "⬇",
      color: "#EC4899",
      trend: "+12%",
      view: "files" as AdminView,
    },
  ];

  const activity = [
    {
      action: "تم رفع ملف جديد",
      detail: "Lecture 12 - Review.pdf",
      time: "2 دقائق",
      icon: "📄",
      color: "#3B82F6",
    },
    {
      action: "مستخدم جديد",
      detail: "محمد أحمد انضم للمنصة",
      time: "15 دقيقة",
      icon: "👤",
      color: "#10B981",
    },
    {
      action: "تم إضافة مادة",
      detail: "Advanced Algorithms — CS Year 4",
      time: "1 ساعة",
      icon: "📚",
      color: "#8B5CF6",
    },
    {
      action: "طلب تحرير",
      detail: "تعديل معلومات كلية الهندسة",
      time: "2 ساعة",
      icon: "✏",
      color: "#F59E0B",
    },
    {
      action: "تقرير أسبوعي",
      detail: "تم إنشاء التقرير الأسبوعي تلقائياً",
      time: "5 ساعات",
      icon: "📊",
      color: "#06B6D4",
    },
    {
      action: "تحديث النظام",
      detail: "الإصدار 2.4.1 — إصلاحات وتحسينات",
      time: "8 ساعات",
      icon: "🔄",
      color: "#EC4899",
    },
  ];

  const topCourses = [
    { name: "برمجة 1", dept: "CS", downloads: 1240, color: "#3B82F6" },
    { name: "هياكل البيانات", dept: "CS", downloads: 980, color: "#8B5CF6" },
    { name: "رياضيات", dept: "Math", downloads: 870, color: "#06B6D4" },
    { name: "قواعد البيانات", dept: "IT", downloads: 760, color: "#10B981" },
    { name: "الذكاء الاصطناعي", dept: "AI", downloads: 680, color: "#F59E0B" },
  ];

  const quickActions = [
    // {
    //   label: "إضافة جامعة",
    //   icon: "🏛",
    //   view: "universities" as AdminView,
    //   color: "#3B82F6",
    // },
    {
      label: "إضافة مادة",
      icon: "📚",
      view: "courses" as AdminView,
      color: "#8B5CF6",
    },
    {
      label: "رفع ملفات",
      icon: "📁",
      view: "files" as AdminView,
      color: "#10B981",
    },
    // {
    //   label: "إدارة المستخدمين",
    //   icon: "👥",
    //   view: "users" as AdminView,
    //   color: "#F59E0B",
    // },
  ];

  return (
    <div className="fade-in">
      {/* Quick actions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 12,
          marginBottom: 24,
        }}
      >
        {quickActions.map((a) => (
          <button
            key={a.label}
            onClick={() => setView(a.view)}
            style={{
              background: a.color + "12",
              border: `1px solid ${a.color}25`,
              borderRadius: 14,
              padding: "14px 16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10,
              transition: "all 0.2s",
            }}
            className="stat-card"
          >
            <span style={{ fontSize: 20 }}>{a.icon}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: a.color }}>
              {a.label}
            </span>
          </button>
        ))}
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6,1fr)",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {stats.map((s) => (
          <div
            key={s.label}
            className="stat-card"
            onClick={() => setView(s.view)}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              borderRadius: 16,
              padding: "18px 16px",
              cursor: "pointer",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -15,
                left: -15,
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: s.color + "10",
              }}
            />
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: s.color + "20",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                marginBottom: 10,
              }}
            >
              {s.icon}
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "var(--text-primary)",
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "var(--text-secondary)",
                marginTop: 2,
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#10B981",
                marginTop: 4,
                fontWeight: 600,
              }}
            >
              {s.trend} هذا الشهر
            </div>
          </div>
        ))}
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}
      >
        {/* Activity */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 18,
            padding: "22px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 18,
            }}
          >
            <span
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              آخر الأنشطة
            </span>
            <span
              style={{
                fontSize: 11,
                color: "var(--text-muted)",
                background: "rgba(255,255,255,0.05)",
                padding: "3px 8px",
                borderRadius: 6,
              }}
            >
              اليوم
            </span>
          </div>
          {activity.map((a, i) => (
            <div
              key={i}
              className="file-row"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "11px 8px",
                borderRadius: 10,
                marginBottom: 2,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: a.color + "18",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                {a.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {a.action}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-secondary)",
                    marginTop: 2,
                  }}
                >
                  {a.detail}
                </div>
              </div>
              <span
                style={{
                  fontSize: 10,
                  color: "var(--text-muted)",
                  flexShrink: 0,
                }}
              >
                منذ {a.time}
              </span>
            </div>
          ))}
        </div>

        {/* Top courses */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 18,
            padding: "22px",
          }}
        >
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: 18,
            }}
          >
            أكثر المواد تحميلاً
          </div>
          {topCourses.map((c, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      fontWeight: 700,
                      minWidth: 16,
                    }}
                  >
                    #{i + 1}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    {c.name}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: c.color,
                      background: c.color + "15",
                      padding: "1px 6px",
                      borderRadius: 5,
                      fontWeight: 600,
                    }}
                  >
                    {c.dept}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--text-secondary)",
                    fontWeight: 600,
                  }}
                >
                  {c.downloads.toLocaleString()}
                </span>
              </div>
              <div
                style={{
                  height: 5,
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: 4,
                    background: `linear-gradient(90deg, ${c.color}, ${c.color}70)`,
                    width: `${(c.downloads / 1240) * 100}%`,
                    transition: "width 0.8s ease",
                  }}
                />
              </div>
            </div>
          ))}

          {/* Storage meter */}
          <div
            style={{
              marginTop: 24,
              padding: "14px",
              background: "rgba(255,255,255,0.03)",
              borderRadius: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                }}
              >
                المساحة المستخدمة
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--text-primary)",
                }}
              >
                42.6 GB / 100 GB
              </span>
            </div>
            <div
              style={{
                height: 6,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: 4,
                  background: "linear-gradient(90deg, #3B82F6, #8B5CF6)",
                  width: "42.6%",
                }}
              />
            </div>
            <div
              style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 6 }}
            >
              57.4 GB متبقية
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Table data ─────────────────────────────────────────────────────────── */
const tableData: Record<string, { headers: string[]; rows: string[][] }> = {
  universities: {
    headers: [
      "المعرف",
      "اسم الجامعة",
      "المدينة",
      "عدد الكليات",
      "المستخدمون",
      "الحالة",
      "الإجراءات",
    ],
    rows: [
      ["1", "جامعة القاهرة", "القاهرة", "24", "1,240", "نشط", ""],
      ["2", "جامعة الإسكندرية", "الإسكندرية", "22", "980", "نشط", ""],
      ["3", "جامعة الأزهر", "القاهرة", "18", "720", "نشط", ""],
      ["4", "جامعة عين شمس", "القاهرة", "20", "860", "نشط", ""],
      ["5", "جامعة المنصورة", "المنصورة", "16", "540", "نشط", ""],
      ["6", "جامعة حلوان", "حلوان", "14", "420", "نشط", ""],
    ],
  },
  colleges: {
    headers: [
      "المعرف",
      "اسم الكلية",
      "الجامعة",
      "الأقسام",
      "المواد",
      "الحالة",
      "الإجراءات",
    ],
    rows: [
      ["1", "كلية علوم الحاسوب", "جامعة القاهرة", "4", "48", "نشط", ""],
      ["2", "كلية الهندسة", "جامعة القاهرة", "8", "96", "نشط", ""],
      ["3", "كلية الطب", "جامعة القاهرة", "12", "144", "نشط", ""],
      ["4", "كلية العلوم", "جامعة الإسكندرية", "6", "72", "نشط", ""],
      ["5", "كلية الاقتصاد", "جامعة القاهرة", "5", "60", "نشط", ""],
    ],
  },
  departments: {
    headers: [
      "المعرف",
      "اسم القسم",
      "الكلية",
      "المواد",
      "الملفات",
      "الحالة",
      "الإجراءات",
    ],
    rows: [
      ["1", "علوم حاسوب", "كلية علوم الحاسوب", "32", "840", "نشط", ""],
      ["2", "تقنية معلومات", "كلية علوم الحاسوب", "28", "720", "نشط", ""],
      ["3", "أمن سيبراني", "كلية علوم الحاسوب", "24", "610", "نشط", ""],
      ["4", "ذكاء اصطناعي", "كلية علوم الحاسوب", "20", "520", "نشط", ""],
      ["5", "علم البيانات", "كلية علوم الحاسوب", "18", "460", "نشط", ""],
    ],
  },
  levels: {
    headers: [
      "المعرف",
      "المستوى",
      "القسم",
      "عدد المواد",
      "عدد الطلاب",
      "الحالة",
      "الإجراءات",
    ],
    rows: [
      ["1", "السنة الأولى", "علوم حاسوب", "8", "280", "نشط", ""],
      ["2", "السنة الثانية", "علوم حاسوب", "10", "245", "نشط", ""],
      ["3", "السنة الثالثة", "علوم حاسوب", "10", "210", "نشط", ""],
      ["4", "السنة الرابعة", "علوم حاسوب", "9", "190", "نشط", ""],
      ["5", "السنة الأولى", "تقنية معلومات", "8", "220", "نشط", ""],
    ],
  },
  semesters: {
    headers: [
      "المعرف",
      "اسم الترم",
      "المستوى",
      "القسم",
      "عدد المواد",
      "الحالة",
      "الإجراءات",
    ],
    rows: [
      ["1", "الترم الأول", "السنة الأولى", "علوم حاسوب", "6", "نشط", ""],
      ["2", "الترم الثاني", "السنة الأولى", "علوم حاسوب", "6", "نشط", ""],
      ["3", "الترم الأول", "السنة الثانية", "علوم حاسوب", "6", "نشط", ""],
      ["4", "الترم الثاني", "السنة الثانية", "علوم حاسوب", "6", "نشط", ""],
      ["5", "الترم الأول", "السنة الثالثة", "علوم حاسوب", "6", "نشط", ""],
    ],
  },
  courses: {
    headers: [
      "المعرف",
      "اسم المادة",
      "القسم",
      "المستوى",
      "الترم",
      "الملفات",
      "الإجراءات",
    ],
    rows: [
      ["1", "برمجة 1", "علوم حاسوب", "السنة الأولى", "الترم الأول", "32", ""],
      ["2", "رياضيات", "علوم حاسوب", "السنة الأولى", "الترم الأول", "28", ""],
      [
        "3",
        "هياكل البيانات",
        "علوم حاسوب",
        "السنة الثانية",
        "الترم الأول",
        "45",
        "",
      ],
      [
        "4",
        "قواعد البيانات",
        "علوم حاسوب",
        "السنة الثانية",
        "الترم الثاني",
        "38",
        "",
      ],
      [
        "5",
        "الذكاء الاصطناعي",
        "علوم حاسوب",
        "السنة الثالثة",
        "الترم الأول",
        "55",
        "",
      ],
      [
        "6",
        "شبكات الحاسوب",
        "علوم حاسوب",
        "السنة الثالثة",
        "الترم الثاني",
        "41",
        "",
      ],
      [
        "7",
        "هندسة البرمجيات",
        "علوم حاسوب",
        "السنة الرابعة",
        "الترم الأول",
        "36",
        "",
      ],
    ],
  },
  files: {
    headers: [
      "المعرف",
      "اسم الملف",
      "المادة",
      "النوع",
      "الحجم",
      "تاريخ الرفع",
      "الإجراءات",
    ],
    rows: [
      [
        "1",
        "Lecture 1 - Introduction.pdf",
        "برمجة 1",
        "PDF",
        "2.4 MB",
        "2024-01-10",
        "",
      ],
      ["2", "Assignment 1.docx", "برمجة 1", "DOCX", "0.8 MB", "2024-01-15", ""],
      [
        "3",
        "Midterm Exam 2023.pdf",
        "هياكل البيانات",
        "PDF",
        "1.2 MB",
        "2024-01-20",
        "",
      ],
      [
        "4",
        "Database Notes.pdf",
        "قواعد البيانات",
        "PDF",
        "3.1 MB",
        "2024-01-22",
        "",
      ],
      [
        "5",
        "AI Lecture 5 - Neural Networks.pdf",
        "الذكاء الاصطناعي",
        "PDF",
        "2.8 MB",
        "2024-01-25",
        "",
      ],
      [
        "6",
        "CS50 Week 2 - Arrays.mp4",
        "برمجة 1",
        "MP4",
        "180 MB",
        "2024-01-28",
        "",
      ],
    ],
  },
  users: {
    headers: [
      "المعرف",
      "الاسم",
      "البريد الإلكتروني",
      "الجامعة",
      "الدور",
      "تاريخ الانضمام",
      "الإجراءات",
    ],
    rows: [
      [
        "1",
        "محمد أحمد",
        "mohammed@cairo.edu",
        "جامعة القاهرة",
        "طالب",
        "2024-01-01",
        "",
      ],
      [
        "2",
        "سارة علي",
        "sara@alex.edu",
        "جامعة الإسكندرية",
        "طالب",
        "2024-01-03",
        "",
      ],
      [
        "3",
        "أحمد محمود",
        "ahmed@azhar.edu",
        "جامعة الأزهر",
        "أستاذ",
        "2024-01-05",
        "",
      ],
      [
        "4",
        "فاطمة حسن",
        "fatma@cairo.edu",
        "جامعة القاهرة",
        "طالب",
        "2024-01-07",
        "",
      ],
      [
        "5",
        "عمر خالد",
        "omar@ainshams.edu",
        "جامعة عين شمس",
        "مشرف",
        "2024-01-10",
        "",
      ],
      [
        "6",
        "نور إبراهيم",
        "nour@mansoura.edu",
        "جامعة المنصورة",
        "طالب",
        "2024-01-12",
        "",
      ],
    ],
  },
};

/* ─── Table ──────────────────────────────────────────────────────────────── */
function AdminTable({
  view,
  onAdd,
  onEdit,
  onDelete,
}: {
  view: AdminView;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: (name: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [allChecked, setAllChecked] = useState(false);

  const data = tableData[view] ?? {
    headers: ["المعرف", "الاسم", "الحالة", "الإجراءات"],
    rows: [],
  };
  const labelMap: Record<string, string> = {
    // universities: "جامعة",
    // colleges: "كلية",
    departments: "قسم",
    levels: "مستوى",
    semesters: "ترم",
    courses: "مادة",
    files: "ملف",
    users: "مستخدم",
  };
  const label = labelMap[view] ?? "عنصر";

  const roleColors: Record<string, string> = {
    طالب: "#3B82F6",
    أستاذ: "#8B5CF6",
    مشرف: "#F59E0B",
    "Super Admin": "#EF4444",
  };
  const typeColors: Record<string, string> = {
    PDF: "#EF4444",
    DOCX: "#3B82F6",
    XLSX: "#10B981",
    MP4: "#F59E0B",
    ZIP: "#8B5CF6",
  };

  const filtered = data.rows.filter((row) =>
    row.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const toggleAll = () => {
    if (allChecked) {
      setSelected(new Set());
      setAllChecked(false);
    } else {
      setSelected(new Set(filtered.map((_, i) => i)));
      setAllChecked(true);
    }
  };

  return (
    <div className="fade-in">
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 18,
        }}
      >
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
              fontSize: 14,
            }}
          >
            🔍
          </span>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`ابحث في ${adminNav.find((n) => n.id === view)?.label}...`}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-medium)",
              borderRadius: 10,
              padding: "9px 38px 9px 14px",
              color: "var(--text-primary)",
              fontSize: 13,
              width: 280,
              outline: "none",
              direction: "rtl",
            }}
          />
        </div>
        <button
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--border-medium)",
            borderRadius: 10,
            padding: "9px 14px",
            cursor: "pointer",
            color: "var(--text-secondary)",
            fontSize: 13,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          ⬇ تصدير CSV
        </button>
        <button
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--border-medium)",
            borderRadius: 10,
            padding: "9px 14px",
            cursor: "pointer",
            color: "var(--text-secondary)",
            fontSize: 13,
          }}
        >
          ▼ فلتر
        </button>
        {selected.size > 0 && (
          <button
            onClick={() => {
              onDelete(`${selected.size} عناصر`);
            }}
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: 10,
              padding: "9px 14px",
              cursor: "pointer",
              color: "#EF4444",
              fontSize: 13,
            }}
          >
            🗑 حذف ({selected.size})
          </button>
        )}
        <button
          onClick={onAdd}
          style={{
            background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
            border: "none",
            borderRadius: 10,
            padding: "9px 18px",
            color: "#fff",
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
            marginRight: "auto",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          + إضافة {label}
        </button>
      </div>

      {/* Table */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
          borderRadius: 18,
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid var(--border-subtle)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <th style={{ padding: "13px 16px", width: 44 }}>
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    style={{ cursor: "pointer", accentColor: "#3B82F6" }}
                  />
                </th>
                {data.headers.map((h, i) => (
                  <th
                    key={i}
                    style={{
                      padding: "13px 16px",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "var(--text-muted)",
                      textAlign: "right",
                      whiteSpace: "nowrap",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, ri) => (
                <tr
                  key={ri}
                  className="file-row"
                  style={{
                    borderBottom:
                      ri < filtered.length - 1
                        ? "1px solid var(--border-subtle)"
                        : "none",
                    background: selected.has(ri)
                      ? "rgba(59,130,246,0.04)"
                      : "transparent",
                  }}
                >
                  <td style={{ padding: "12px 16px" }}>
                    <input
                      type="checkbox"
                      checked={selected.has(ri)}
                      onChange={() => {
                        const s = new Set(selected);
                        if (s.has(ri)) s.delete(ri);
                        else s.add(ri);
                        setSelected(s);
                      }}
                      style={{ cursor: "pointer", accentColor: "#3B82F6" }}
                    />
                  </td>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      style={{
                        padding: "12px 16px",
                        fontSize: 13,
                        color: "var(--text-primary)",
                        textAlign: "right",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {ci === row.length - 1 ? (
                        <div
                          style={{
                            display: "flex",
                            gap: 6,
                            justifyContent: "flex-end",
                          }}
                        >
                          <button
                            onClick={onEdit}
                            style={{
                              background: "rgba(59,130,246,0.08)",
                              border: "1px solid rgba(59,130,246,0.15)",
                              borderRadius: 8,
                              padding: "5px 10px",
                              cursor: "pointer",
                              color: "var(--accent-blue)",
                              fontSize: 12,
                              fontWeight: 500,
                            }}
                          >
                            ✏ تعديل
                          </button>
                          <button
                            onClick={() => onDelete(row[1])}
                            style={{
                              background: "rgba(239,68,68,0.07)",
                              border: "1px solid rgba(239,68,68,0.15)",
                              borderRadius: 8,
                              padding: "5px 10px",
                              cursor: "pointer",
                              color: "#EF4444",
                              fontSize: 12,
                            }}
                          >
                            🗑
                          </button>
                        </div>
                      ) : cell === "نشط" ? (
                        <span
                          style={{
                            fontSize: 11,
                            color: "#10B981",
                            background: "rgba(16,185,129,0.1)",
                            padding: "2px 8px",
                            borderRadius: 6,
                            fontWeight: 600,
                          }}
                        >
                          ● نشط
                        </span>
                      ) : roleColors[cell] ? (
                        <span
                          style={{
                            fontSize: 11,
                            color: roleColors[cell],
                            background: roleColors[cell] + "15",
                            padding: "2px 8px",
                            borderRadius: 6,
                            fontWeight: 600,
                          }}
                        >
                          {cell}
                        </span>
                      ) : typeColors[cell] ? (
                        <span
                          style={{
                            fontSize: 11,
                            color: typeColors[cell],
                            background: typeColors[cell] + "18",
                            padding: "2px 7px",
                            borderRadius: 6,
                            fontWeight: 700,
                          }}
                        >
                          {cell}
                        </span>
                      ) : ci === 0 ? (
                        <span
                          style={{
                            color: "var(--text-muted)",
                            fontWeight: 600,
                            fontFamily: "monospace",
                          }}
                        >
                          #{cell}
                        </span>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={data.headers.length + 1}
                    style={{
                      textAlign: "center",
                      padding: "40px",
                      color: "var(--text-muted)",
                      fontSize: 14,
                    }}
                  >
                    لا توجد نتائج مطابقة
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div
          style={{
            padding: "13px 20px",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
            عرض {filtered.length} من {data.rows.length} عناصر
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            <button
              style={{
                width: 30,
                height: 30,
                borderRadius: 7,
                border: "none",
                background: "rgba(255,255,255,0.05)",
                color: "var(--text-muted)",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              ‹
            </button>
            {[1, 2, 3, "…", 8].map((p, i) => (
              <button
                key={i}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 7,
                  border: "none",
                  background:
                    p === 1
                      ? "linear-gradient(135deg,#3B82F6,#8B5CF6)"
                      : "rgba(255,255,255,0.05)",
                  color: p === 1 ? "#fff" : "var(--text-secondary)",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: p === 1 ? 600 : 400,
                }}
              >
                {p}
              </button>
            ))}
            <button
              style={{
                width: 30,
                height: 30,
                borderRadius: 7,
                border: "none",
                background: "rgba(255,255,255,0.05)",
                color: "var(--text-muted)",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Settings ───────────────────────────────────────────────────────────── */
function AdminSettings() {
  const [activeSection, setActiveSection] = useState("general");
  const sections = [
    { id: "general", label: "عام", icon: "⚙" },
    { id: "security", label: "الأمان", icon: "🔒" },
    { id: "appearance", label: "المظهر", icon: "🎨" },
    { id: "storage", label: "التخزين", icon: "💾" },
    { id: "email", label: "البريد الإلكتروني", icon: "📧" },
    { id: "backup", label: "النسخ الاحتياطي", icon: "🔄" },
  ];

  const ToggleSwitch = ({
    on,
    label,
    desc,
  }: {
    on: boolean;
    label: string;
    desc?: string;
  }) => {
    const [state, setState] = useState(on);
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 0",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            {label}
          </div>
          {desc && (
            <div
              style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 3 }}
            >
              {desc}
            </div>
          )}
        </div>
        <button
          onClick={() => setState(!state)}
          style={{
            width: 44,
            height: 24,
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
            background: state
              ? "linear-gradient(135deg,#3B82F6,#8B5CF6)"
              : "rgba(255,255,255,0.1)",
            position: "relative",
            transition: "background 0.25s",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 3,
              borderRadius: "50%",
              right: state ? 3 : 21,
              width: 18,
              height: 18,
              background: "#fff",
              transition: "right 0.2s",
              display: "block",
              boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
            }}
          />
        </button>
      </div>
    );
  };

  const Field = ({
    label,
    value,
    type = "text",
  }: {
    label: string;
    value: string;
    type?: string;
  }) => (
    <div style={{ marginBottom: 16 }}>
      <label
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "var(--text-secondary)",
          display: "block",
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      <input
        defaultValue={value}
        type={type}
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid var(--border-medium)",
          borderRadius: 10,
          padding: "10px 14px",
          color: "var(--text-primary)",
          fontSize: 13,
          outline: "none",
          direction: "rtl",
          boxSizing: "border-box",
        }}
      />
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "general":
        return (
          <div>
            <h3
              style={{
                margin: "0 0 20px",
                fontSize: 15,
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              إعدادات عامة
            </h3>
            <Field label="اسم المنصة" value="UniHub" />
            <Field label="وصف المنصة" value="منصة موارد أكاديمية شاملة" />
            <Field
              label="البريد الإلكتروني الرسمي"
              value="admin@unihub.edu.eg"
              type="email"
            />
            <Field label="رقم الهاتف" value="+20 123 456 7890" />
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                المنطقة الزمنية
              </label>
              <select
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--border-medium)",
                  borderRadius: 10,
                  padding: "10px 14px",
                  color: "var(--text-primary)",
                  fontSize: 13,
                  outline: "none",
                  direction: "rtl",
                  boxSizing: "border-box",
                }}
              >
                <option>Africa/Cairo (GMT+2)</option>
              </select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                اللغة الافتراضية
              </label>
              <select
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--border-medium)",
                  borderRadius: 10,
                  padding: "10px 14px",
                  color: "var(--text-primary)",
                  fontSize: 13,
                  outline: "none",
                  direction: "rtl",
                  boxSizing: "border-box",
                }}
              >
                <option>العربية</option>
                <option>English</option>
              </select>
            </div>
          </div>
        );
      case "security":
        return (
          <div>
            <h3
              style={{
                margin: "0 0 20px",
                fontSize: 15,
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              إعدادات الأمان
            </h3>
            <ToggleSwitch
              on={true}
              label="التحقق بخطوتين"
              desc="إضافة طبقة حماية إضافية لتسجيل الدخول"
            />
            <ToggleSwitch
              on={true}
              label="تسجيل أنشطة الدخول"
              desc="حفظ سجل كامل لعمليات تسجيل الدخول"
            />
            <ToggleSwitch
              on={false}
              label="تسجيل الخروج التلقائي"
              desc="تسجيل الخروج تلقائياً بعد 30 دقيقة خمول"
            />
            <ToggleSwitch
              on={true}
              label="تشفير الملفات"
              desc="تشفير الملفات المرفوعة تلقائياً"
            />
            <div style={{ marginTop: 20 }}>
              <Field label="فترة صلاحية الجلسة (بالدقائق)" value="30" />
              <Field label="الحد الأقصى لمحاولات تسجيل الدخول" value="5" />
            </div>
          </div>
        );
      case "appearance":
        return (
          <div>
            <h3
              style={{
                margin: "0 0 20px",
                fontSize: 15,
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              إعدادات المظهر
            </h3>
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  display: "block",
                  marginBottom: 10,
                }}
              >
                نمط الألوان
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: 10,
                }}
              >
                {[
                  {
                    name: "أزرق / بنفسجي",
                    c1: "#3B82F6",
                    c2: "#8B5CF6",
                    active: true,
                  },
                  {
                    name: "أخضر / أزرق",
                    c1: "#10B981",
                    c2: "#06B6D4",
                    active: false,
                  },
                  {
                    name: "وردي / برتقالي",
                    c1: "#EC4899",
                    c2: "#F59E0B",
                    active: false,
                  },
                ].map((t) => (
                  <div
                    key={t.name}
                    style={{
                      border: `2px solid ${t.active ? t.c1 : "var(--border-subtle)"}`,
                      borderRadius: 12,
                      padding: "12px",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        height: 24,
                        borderRadius: 6,
                        marginBottom: 8,
                        background: `linear-gradient(135deg, ${t.c1}, ${t.c2})`,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 11,
                        color: t.active ? t.c1 : "var(--text-muted)",
                        fontWeight: 600,
                      }}
                    >
                      {t.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <ToggleSwitch
              on={true}
              label="الوضع الداكن"
              desc="استخدام خلفية داكنة للمنصة"
            />
            <ToggleSwitch
              on={true}
              label="تأثيرات الشفافية"
              desc="تأثيرات glassmorphism على البطاقات"
            />
            <ToggleSwitch
              on={false}
              label="الوضع المضغوط"
              desc="تقليل الحشو لعرض المزيد من المحتوى"
            />
          </div>
        );
      case "storage":
        return (
          <div>
            <h3
              style={{
                margin: "0 0 20px",
                fontSize: 15,
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              إدارة التخزين
            </h3>
            {/* Storage bar */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 14,
                padding: "20px",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  المساحة المستخدمة
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--accent-blue)",
                  }}
                >
                  42.6 GB / 100 GB
                </span>
              </div>
              <div
                style={{
                  height: 10,
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 6,
                  overflow: "hidden",
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: 6,
                    background: "linear-gradient(90deg,#3B82F6,#8B5CF6)",
                    width: "42.6%",
                  }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: 10,
                }}
              >
                {[
                  { label: "PDF", pct: "28.4 GB", color: "#EF4444" },
                  { label: "فيديو", pct: "11.2 GB", color: "#F59E0B" },
                  { label: "أخرى", pct: "3.0 GB", color: "#8B5CF6" },
                ].map((s) => (
                  <div key={s.label} style={{ textAlign: "center" }}>
                    <div
                      style={{ fontSize: 14, fontWeight: 700, color: s.color }}
                    >
                      {s.pct}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Field label="الحد الأقصى لحجم الملف (MB)" value="50" />
            <ToggleSwitch
              on={true}
              label="ضغط الصور تلقائياً"
              desc="تقليل حجم الصور عند الرفع"
            />
            <ToggleSwitch
              on={false}
              label="حذف الملفات القديمة تلقائياً"
              desc="حذف الملفات غير المستخدمة بعد سنة"
            />
          </div>
        );
      case "email":
        return (
          <div>
            <h3
              style={{
                margin: "0 0 20px",
                fontSize: 15,
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              إعدادات البريد الإلكتروني
            </h3>
            <Field label="خادم SMTP" value="smtp.gmail.com" />
            <Field label="منفذ SMTP" value="587" />
            <Field
              label="البريد المُرسِل"
              value="noreply@unihub.edu.eg"
              type="email"
            />
            <Field
              label="كلمة مرور التطبيق"
              value="••••••••••••"
              type="password"
            />
            <ToggleSwitch on={true} label="إشعار تسجيل الأعضاء الجدد" />
            <ToggleSwitch on={true} label="إشعار رفع الملفات الجديدة" />
            <ToggleSwitch on={false} label="التقارير الأسبوعية بالبريد" />
          </div>
        );
      case "backup":
        return (
          <div>
            <h3
              style={{
                margin: "0 0 20px",
                fontSize: 15,
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              النسخ الاحتياطي والاستعادة
            </h3>
            <div
              style={{
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.2)",
                borderRadius: 12,
                padding: "14px 16px",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 18 }}>✅</span>
              <div>
                <div
                  style={{ fontSize: 13, fontWeight: 600, color: "#10B981" }}
                >
                  آخر نسخة احتياطية: اليوم في 03:00 ص
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                  حجم النسخة: 12.4 GB
                </div>
              </div>
            </div>
            <ToggleSwitch
              on={true}
              label="نسخ احتياطي تلقائي يومي"
              desc="يتم كل يوم عند الساعة 3 صباحاً"
            />
            <ToggleSwitch
              on={true}
              label="نسخ احتياطي على السحابة"
              desc="رفع النسخ إلى Google Drive"
            />
            <div style={{ marginTop: 20 }}>
              <Field label="مدة الاحتفاظ بالنسخ (أيام)" value="30" />
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button
                style={{
                  background: "linear-gradient(135deg,#3B82F6,#8B5CF6)",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 20px",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                📥 نسخ احتياطي الآن
              </button>
              <button
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid var(--border-medium)",
                  borderRadius: 10,
                  padding: "10px 20px",
                  color: "var(--text-secondary)",
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                📤 استعادة من نسخة
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="fade-in"
      style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 24 }}
    >
      {/* Section nav */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
          borderRadius: 18,
          padding: "12px 0",
          height: "fit-content",
        }}
      >
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "11px 18px",
              background:
                activeSection === s.id ? "rgba(59,130,246,0.1)" : "none",
              border: "none",
              borderRight:
                activeSection === s.id
                  ? "2px solid var(--accent-blue)"
                  : "2px solid transparent",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            <span style={{ fontSize: 16 }}>{s.icon}</span>
            <span
              style={{
                fontSize: 13,
                fontWeight: activeSection === s.id ? 600 : 400,
                color:
                  activeSection === s.id
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
              }}
            >
              {s.label}
            </span>
          </button>
        ))}
      </div>

      {/* Section content */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
          borderRadius: 18,
          padding: "26px",
        }}
      >
        {renderSection()}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 28,
            paddingTop: 20,
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          <button
            style={{
              background: "linear-gradient(135deg,#3B82F6,#8B5CF6)",
              border: "none",
              borderRadius: 10,
              padding: "10px 24px",
              color: "#fff",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            💾 حفظ التغييرات
          </button>
          <button
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--border-medium)",
              borderRadius: 10,
              padding: "10px 18px",
              color: "var(--text-secondary)",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Add / Edit dialog ──────────────────────────────────────────────────── */
function AdminDialog({
  type,
  view,
  onClose,
}: {
  type: "add" | "edit";
  view: AdminView;
  onClose: () => void;
}) {
  const labelMap: Record<string, string> = {
    universities: "جامعة",
    colleges: "كلية",
    departments: "قسم",
    levels: "مستوى",
    semesters: "ترم",
    courses: "مادة",
    files: "ملف",
    users: "مستخدم",
  };
  const label = labelMap[view] ?? "عنصر";

  const fieldsMap: Record<
    string,
    Array<{ label: string; type: string; placeholder: string; full?: boolean }>
  > = {
    universities: [
      {
        label: "اسم الجامعة (عربي)",
        type: "text",
        placeholder: "مثال: جامعة القاهرة",
      },
      {
        label: "اسم الجامعة (إنجليزي)",
        type: "text",
        placeholder: "Cairo University",
      },
      { label: "المدينة", type: "text", placeholder: "القاهرة" },
      { label: "سنة التأسيس", type: "number", placeholder: "1908" },
    ],
    colleges: [
      { label: "اسم الكلية", type: "text", placeholder: "كلية علوم الحاسوب" },
      {
        label: "الاسم الإنجليزي",
        type: "text",
        placeholder: "Faculty of Computer Science",
      },
      { label: "الجامعة", type: "select", placeholder: "اختر الجامعة" },
    ],
    departments: [
      { label: "اسم القسم", type: "text", placeholder: "علوم حاسوب" },
      { label: "الاختصار", type: "text", placeholder: "CS" },
      { label: "الكلية", type: "select", placeholder: "اختر الكلية" },
    ],
    levels: [
      { label: "اسم المستوى", type: "text", placeholder: "السنة الأولى" },
      { label: "القسم", type: "select", placeholder: "اختر القسم" },
      { label: "الترتيب", type: "number", placeholder: "1" },
    ],
    semesters: [
      { label: "اسم الترم", type: "text", placeholder: "الترم الأول" },
      { label: "المستوى", type: "select", placeholder: "اختر المستوى" },
    ],
    courses: [
      { label: "اسم المادة (عربي)", type: "text", placeholder: "برمجة 1" },
      {
        label: "اسم المادة (إنجليزي)",
        type: "text",
        placeholder: "Programming 1",
      },
      { label: "القسم", type: "select", placeholder: "اختر القسم" },
      { label: "المستوى", type: "select", placeholder: "اختر المستوى" },
      { label: "الترم", type: "select", placeholder: "اختر الترم" },
      {
        label: "وصف المادة",
        type: "textarea",
        placeholder: "وصف مختصر للمادة",
        full: true,
      },
    ],
    files: [
      { label: "اسم الملف", type: "text", placeholder: "Lecture 1.pdf" },
      { label: "المادة", type: "select", placeholder: "اختر المادة" },
      { label: "نوع الملف", type: "select", placeholder: "اختر النوع" },
    ],
    users: [
      { label: "الاسم الكامل", type: "text", placeholder: "محمد أحمد" },
      {
        label: "البريد الإلكتروني",
        type: "email",
        placeholder: "user@university.edu.eg",
      },
      { label: "كلمة المرور", type: "password", placeholder: "••••••••" },
      { label: "الدور", type: "select", placeholder: "اختر الدور" },
      { label: "الجامعة", type: "select", placeholder: "اختر الجامعة" },
    ],
  };
  const fields = fieldsMap[view] ?? [
    { label: "الاسم", type: "text", placeholder: "أدخل الاسم" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
        backdropFilter: "blur(6px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "#131C2E",
          border: "1px solid var(--border-medium)",
          borderRadius: 22,
          padding: "28px",
          width: 500,
          maxWidth: "94vw",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 30px 100px rgba(0,0,0,0.7)",
        }}
        className="fade-in"
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 22,
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: 17,
                fontWeight: 800,
                color: "var(--text-primary)",
              }}
            >
              {type === "add" ? `إضافة ${label} جديد` : `تعديل ${label}`}
            </h2>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: 12,
                color: "var(--text-muted)",
              }}
            >
              أدخل البيانات المطلوبة في الحقول أدناه
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "none",
              borderRadius: 9,
              width: 34,
              height: 34,
              cursor: "pointer",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
            }}
          >
            ×
          </button>
        </div>

        {/* File upload area */}
        {view === "files" && (
          <label
            style={{
              display: "block",
              border: "2px dashed rgba(59,130,246,0.3)",
              borderRadius: 14,
              padding: "28px",
              textAlign: "center",
              marginBottom: 20,
              background: "rgba(59,130,246,0.03)",
              cursor: "pointer",
            }}
          >
            <input type="file" style={{ display: "none" }} />
            <div style={{ fontSize: 40, marginBottom: 8 }}>📁</div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: 4,
              }}
            >
              اسحب الملفات هنا أو انقر للرفع
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
              PDF, DOCX, XLSX, MP4, ZIP — الحد الأقصى 50 MB
            </div>
          </label>
        )}

        {/* Fields */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
        >
          {fields
            .filter((f) => f.type !== "file")
            .map((field, i) => (
              <div
                key={i}
                style={{ gridColumn: field.full ? "1 / -1" : "auto" }}
              >
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <select
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--border-medium)",
                      borderRadius: 10,
                      padding: "10px 12px",
                      color: "var(--text-primary)",
                      fontSize: 13,
                      outline: "none",
                      direction: "rtl",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="">{field.placeholder}</option>
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    rows={3}
                    placeholder={field.placeholder}
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--border-medium)",
                      borderRadius: 10,
                      padding: "10px 12px",
                      color: "var(--text-primary)",
                      fontSize: 13,
                      outline: "none",
                      direction: "rtl",
                      boxSizing: "border-box",
                      resize: "vertical",
                      fontFamily: "inherit",
                    }}
                  />
                ) : (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--border-medium)",
                      borderRadius: 10,
                      padding: "10px 12px",
                      color: "var(--text-primary)",
                      fontSize: 13,
                      outline: "none",
                      direction: "rtl",
                      boxSizing: "border-box",
                    }}
                  />
                )}
              </div>
            ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid var(--border-medium)",
              borderRadius: 10,
              padding: "10px 20px",
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            إلغاء
          </button>
          <button
            style={{
              background: "linear-gradient(135deg,#3B82F6,#8B5CF6)",
              border: "none",
              borderRadius: 10,
              padding: "10px 28px",
              color: "#fff",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              flex: 1,
            }}
          >
            {type === "add" ? `✓ إضافة ${label}` : "💾 حفظ التغييرات"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Delete confirm ─────────────────────────────────────────────────────── */
function DeleteConfirm({
  name,
  onClose,
}: {
  name: string;
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 300,
        backdropFilter: "blur(6px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "#131C2E",
          border: "1px solid rgba(239,68,68,0.2)",
          borderRadius: 20,
          padding: "32px",
          width: 400,
          textAlign: "center",
          boxShadow: "0 30px 100px rgba(0,0,0,0.7)",
        }}
        className="fade-in"
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 20,
            background: "rgba(239,68,68,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 30,
            margin: "0 auto 18px",
          }}
        >
          🗑
        </div>
        <h2
          style={{
            margin: "0 0 10px",
            fontSize: 18,
            fontWeight: 800,
            color: "var(--text-primary)",
          }}
        >
          تأكيد الحذف
        </h2>
        <p
          style={{
            margin: "0 0 24px",
            fontSize: 13,
            color: "var(--text-secondary)",
            lineHeight: 1.6,
          }}
        >
          هل أنت متأكد من حذف{" "}
          <strong style={{ color: "var(--text-primary)" }}>{name}</strong>؟
          <br />
          لا يمكن التراجع عن هذا الإجراء.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid var(--border-medium)",
              borderRadius: 10,
              padding: "10px 24px",
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            إلغاء
          </button>
          <button
            onClick={onClose}
            style={{
              background: "linear-gradient(135deg,#EF4444,#DC2626)",
              border: "none",
              borderRadius: 10,
              padding: "10px 28px",
              color: "#fff",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            🗑 حذف نهائياً
          </button>
        </div>
      </div>
    </div>
  );
}
