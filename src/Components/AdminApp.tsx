import { useState } from "react";
import {
  LayoutDashboard,
  // Building2,
  School,
  FolderTree,
  GraduationCap,
  Calendar,
  BookOpen,
  FileText,
  Users,
  Settings,
  Bell,
  Search,
  Trash2,
  Edit3,
  Plus,
  Download,
  Filter,
  X,
  UploadCloud,
  Shield,
  Palette,
  HardDrive,
  Mail,
  RotateCcw,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

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

interface NavItem {
  id: AdminView;
  label: string;
  icon: React.ReactNode;
  badge: number;
}

const adminNav: NavItem[] = [
  {
    id: "dashboard",
    label: "لوحة التحكم",
    icon: <LayoutDashboard className="h-4 w-4" />,
    badge: 0,
  },
  // {
  //   id: "universities",
  //   label: "الجامعات",
  //   icon: <Building2 className="h-4 w-4" />,
  //   badge: 0,
  // },
  {
    id: "colleges",
    label: "الكليات",
    icon: <School className="h-4 w-4" />,
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
    id: "users",
    label: "المستخدمون",
    icon: <Users className="h-4 w-4" />,
    badge: 5,
  },
  {
    id: "settings",
    label: "الإعدادات",
    icon: <Settings className="h-4 w-4" />,
    badge: 0,
  },
];

const notifications = [
  {
    id: 1,
    text: "تم رفع 5 ملفات جديدة في مادة برمجة 1",
    time: "2 دقائق",
    icon: <FileText className="h-4 w-4" />,
    color: "bg-[#899C9A]/20 text-[#AABCAF] border border-[#899C9A]/30",
    read: false,
  },
  {
    id: 2,
    text: "طلب مستخدم جديد: محمد أحمد للانضمام",
    time: "18 دقيقة",
    icon: <Users className="h-4 w-4" />,
    color: "bg-[#AABCAF]/20 text-[#AABCAF] border border-[#AABCAF]/30",
    read: false,
  },
  {
    id: 3,
    text: "تم إضافة كلية جديدة: كلية الفنون التطبيقية",
    time: "1 ساعة",
    icon: <School className="h-4 w-4" />,
    color: "bg-[#899C9A]/20 text-[#AABCAF] border border-[#899C9A]/30",
    read: false,
  },
  {
    id: 4,
    text: "تحديث النظام: الإصدار 2.4.1 متاح",
    time: "3 ساعات",
    icon: <RotateCcw className="h-4 w-4" />,
    color: "bg-[#323D59] text-[#AABCAF] border border-white/[0.07]",
    read: true,
  },
  {
    id: 5,
    text: "تقرير أسبوعي: 1,240 تحميل هذا الأسبوع",
    time: "5 ساعات",
    icon: <TrendingUp className="h-4 w-4" />,
    color: "bg-[#899C9A]/20 text-[#899C9A] border border-[#899C9A]/30",
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
  const [notifList, setNotifList] = useState(notifications);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const unreadCount = notifList.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifList((n) => n.map((x) => ({ ...x, read: true })));

  return (
    <div
      className="flex min-h-screen bg-[#242D42] text-[#F4F7F6] font-['Noto_Sans_Arabic',sans-serif]"
      dir="rtl"
      onClick={() => setShowNotifs(false)}
    >
      {/* Admin Sidebar */}
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
          {adminNav.map((item) => {
            const isActive = view === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
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

                {item.badge > 0 && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? "bg-[#899C9A] text-[#1D263B]"
                        : "bg-[#323D59] text-[#AABCAF] border border-white/[0.07]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Return to Student Button */}
        <div className="border-t border-white/[0.06] p-4">
          <button
            onClick={onSwitchStudent}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-[#323D59] px-4 py-2.5 text-xs font-bold text-[#F4F7F6] transition-all duration-200 hover:bg-[#3B4868] hover:border-white/20 cursor-pointer"
          >
            <ArrowRight className="h-4 w-4 text-[#899C9A]" />
            <span>العودة لواجهة الطالب</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="mr-64 flex-1 overflow-x-hidden min-h-screen bg-[#242D42]">
        {/* Sticky Top Bar */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between border-b border-white/[0.06] bg-[#242D42]/85 px-8 py-4 backdrop-blur-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="text-[11px] font-semibold text-[#AABCAF]">
              دراستي / لوحة الإدارة
            </div>
            <h1 className="font-['Outfit'] text-lg font-bold text-[#F4F7F6]">
              {adminNav.find((n) => n.id === view)?.label}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifs(!showNotifs)}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-[#323D59] text-[#F4F7F6] transition-colors hover:border-white/20 hover:bg-[#3B4868] cursor-pointer"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#899C9A] text-[9px] font-bold text-[#1D263B] shadow-sm shadow-[#899C9A]/50">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              {showNotifs && (
                <div className="notif-dropdown absolute top-12 left-0 z-50 w-80 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#323D59] shadow-2xl backdrop-blur-2xl">
                  <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
                    <span className="text-xs font-bold text-[#F4F7F6]">
                      الإشعارات ({unreadCount})
                    </span>
                    <button
                      onClick={markAllRead}
                      className="text-[11px] font-bold text-[#899C9A] hover:text-[#AABCAF] cursor-pointer"
                    >
                      تحديد الكل كمقروء
                    </button>
                  </div>

                  <div className="max-h-80 divide-y divide-white/[0.06] overflow-y-auto">
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
                        className={`flex items-start gap-3 p-3 transition-colors hover:bg-white/[0.04] cursor-pointer ${
                          !n.read ? "bg-[#899C9A]/10" : ""
                        }`}
                      >
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${n.color}`}
                        >
                          {n.icon}
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
              )}
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="p-8">
          {view === "dashboard" && <AdminDashboardView setView={setView} />}
          {view === "settings" && <AdminSettingsView />}
          {view !== "dashboard" && view !== "settings" && (
            <AdminTableView
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

      {/* Add / Edit Dialog Modal */}
      {showDialog && (
        <AdminDialogModal
          type={dialogType}
          view={view}
          onClose={() => setShowDialog(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <DeleteConfirmModal
          name={deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
}

/* ─── 1. Dashboard View ─────────────────────────────────────────────────── */
function AdminDashboardView({ setView }: { setView: (v: AdminView) => void }) {
  const stats = [
    // {
    //   label: "الجامعات",
    //   value: "12",
    //   icon: <Building2 className="h-5 w-5" />,
    //   color: "#899C9A",
    //   trend: "+2",
    //   view: "universities" as AdminView,
    // },
    {
      label: "الكليات",
      value: "48",
      icon: <School className="h-5 w-5" />,
      color: "#AABCAF",
      trend: "+5",
      view: "colleges" as AdminView,
    },
    {
      label: "الأقسام",
      value: "128",
      icon: <FolderTree className="h-5 w-5" />,
      color: "#899C9A",
      trend: "+8",
      view: "departments" as AdminView,
    },
    {
      label: "المواد",
      value: "620",
      icon: <BookOpen className="h-5 w-5" />,
      color: "#AABCAF",
      trend: "+18",
      view: "courses" as AdminView,
    },
    {
      label: "الملفات",
      value: "8.4K",
      icon: <FileText className="h-5 w-5" />,
      color: "#899C9A",
      trend: "+124",
      view: "files" as AdminView,
    },
    {
      label: "المستخدمون",
      value: "2.1K",
      icon: <Users className="h-5 w-5" />,
      color: "#AABCAF",
      trend: "+47",
      view: "users" as AdminView,
    },
  ];

  const quickActions = [
    // {
    //   label: "إضافة جامعة",
    //   icon: <Building2 className="h-5 w-5" />,
    //   view: "universities" as AdminView,
    //   color: "#899C9A",
    // },
    {
      label: "إضافة كلية",
      icon: <School className="h-5 w-5" />,
      view: "colleges" as AdminView,
      color: "#AABCAF",
    },
    {
      label: "إضافة مادة",
      icon: <BookOpen className="h-5 w-5" />,
      view: "courses" as AdminView,
      color: "#899C9A",
    },
    {
      label: "رفع ملفات",
      icon: <UploadCloud className="h-5 w-5" />,
      view: "files" as AdminView,
      color: "#AABCAF",
    },
  ];

  const activity = [
    {
      action: "تم رفع ملف جديد",
      detail: "Lecture 12 - Review.pdf",
      time: "2 دقائق",
      icon: <FileText className="h-4 w-4" />,
      color: "bg-[#899C9A]/25 text-[#F4F7F6] border border-[#899C9A]/40",
    },
    {
      action: "مستخدم جديد",
      detail: "محمد أحمد انضم للمنصة",
      time: "15 دقيقة",
      icon: <Users className="h-4 w-4" />,
      color: "bg-[#AABCAF]/25 text-[#F4F7F6] border border-[#AABCAF]/40",
    },
    {
      action: "تم إضافة مادة",
      detail: "Advanced Algorithms — CS Year 4",
      time: "1 ساعة",
      icon: <BookOpen className="h-4 w-4" />,
      color: "bg-[#899C9A]/25 text-[#F4F7F6] border border-[#899C9A]/40",
    },
    {
      action: "تعديل قسم",
      detail: "تحديث معلومات قسم الذكاء الاصطناعي",
      time: "2 ساعة",
      icon: <FolderTree className="h-4 w-4" />,
      color: "bg-[#AABCAF]/25 text-[#F4F7F6] border border-[#AABCAF]/40",
    },
    {
      action: "تقرير أسبوعي",
      detail: "تم إنشاء التقرير الأسبوعي تلقائياً",
      time: "5 ساعات",
      icon: <TrendingUp className="h-4 w-4" />,
      color: "bg-[#899C9A]/25 text-[#F4F7F6] border border-[#899C9A]/40",
    },
  ];

  const topCourses = [
    { name: "برمجة 1", dept: "CS", downloads: 1240, color: "#899C9A" },
    { name: "هياكل البيانات", dept: "CS", downloads: 980, color: "#AABCAF" },
    { name: "رياضيات", dept: "Math", downloads: 870, color: "#899C9A" },
    { name: "قواعد البيانات", dept: "IT", downloads: 760, color: "#AABCAF" },
    { name: "الذكاء الاصطناعي", dept: "AI", downloads: 680, color: "#899C9A" },
  ];

  return (
    <div className="space-y-8 fade-in">
      {/* Quick Action Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {quickActions.map((a) => (
          <button
            key={a.label}
            onClick={() => setView(a.view)}
            className="group flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-[#323D59] p-4 shadow-lg backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#3B4868] cursor-pointer"
          >
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110"
              style={{ backgroundColor: `${a.color}25`, color: a.color }}
            >
              {a.icon}
            </div>
            <span className="text-xs font-bold text-[#F4F7F6] group-hover:text-[#AABCAF]">
              {a.label}
            </span>
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <div
            key={s.label}
            onClick={() => setView(s.view)}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#323D59] p-4 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-[#3B4868] hover:shadow-xl cursor-pointer"
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: `${s.color}25`, color: s.color }}
            >
              {s.icon}
            </div>

            <div className="mt-3">
              <div className="font-['Outfit'] text-2xl font-black text-[#F4F7F6]">
                {s.value}
              </div>
              <div className="text-xs font-semibold text-[#AABCAF]">
                {s.label}
              </div>
            </div>

            <div className="mt-2 text-[10px] font-bold text-[#899C9A]">
              {s.trend} هذا الشهر
            </div>
          </div>
        ))}
      </div>

      {/* Activity & Course Performance Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity (2 cols) */}
        <div className="rounded-2xl border border-white/[0.07] bg-[#323D59] p-6 shadow-xl backdrop-blur-xl lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-['Outfit'] text-base font-bold text-[#F4F7F6]">
              آخر الأنشطة والعمليات
            </h3>
            <span className="rounded-md bg-[#242D42] px-2.5 py-1 text-[11px] font-bold text-[#AABCAF] border border-white/[0.07]">
              اليوم
            </span>
          </div>

          <div className="space-y-3">
            {activity.map((a, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3 transition-colors hover:bg-[#3B4868]"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${a.color}`}
                >
                  {a.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-[#F4F7F6]">
                    {a.action}
                  </div>
                  <div className="text-[11px] font-medium text-[#AABCAF]">
                    {a.detail}
                  </div>
                </div>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#AABCAF] shrink-0 font-medium">
                  منذ {a.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Courses & Storage Meter (1 col) */}
        <div className="space-y-6">
          {/* Top Courses */}
          <div className="rounded-2xl border border-white/[0.07] bg-[#323D59] p-6 shadow-xl backdrop-blur-xl">
            <h3 className="font-['Outfit'] text-base font-bold text-[#F4F7F6] mb-4">
              أكثر المواد تحميلاً
            </h3>

            <div className="space-y-4">
              {topCourses.map((c, i) => (
                <div key={i}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-['JetBrains_Mono'] font-bold text-[#AABCAF]">
                        #{i + 1}
                      </span>
                      <span className="font-bold text-[#F4F7F6]">{c.name}</span>
                      <span
                        className="rounded px-1.5 py-0.5 text-[10px] font-bold"
                        style={{
                          backgroundColor: `${c.color}25`,
                          color: c.color,
                        }}
                      >
                        {c.dept}
                      </span>
                    </div>
                    <span className="font-['JetBrains_Mono'] text-[#AABCAF] font-bold">
                      {c.downloads.toLocaleString()}
                    </span>
                  </div>

                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#242D42]">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        backgroundColor: c.color,
                        width: `${(c.downloads / 1240) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Storage Meter */}
            <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
              <div className="mb-2 flex items-center justify-between text-xs font-bold">
                <span className="text-[#AABCAF]">المساحة المستخدمة</span>
                <span className="text-[#899C9A] font-['JetBrains_Mono']">
                  42.6 GB / 100 GB
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#242D42]">
                <div className="h-full w-[42.6%] rounded-full bg-gradient-to-r from-[#899C9A] to-[#AABCAF]" />
              </div>
              <div className="mt-2 text-[10px] text-[#AABCAF] font-medium">
                57.4 GB متبقية للتخزين السحابي
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── 2. Table View ─────────────────────────────────────────────────────── */
const tableData: Record<string, { headers: string[]; rows: string[][] }> = {
  // universities: {
  //   headers: [
  //     "المعرف",
  //     "اسم الجامعة",
  //     "المدينة",
  //     "عدد الكليات",
  //     "المستخدمون",
  //     "الحالة",
  //     "الإجراءات",
  //   ],
  //   rows: [
  //     ["1", "جامعة القاهرة", "القاهرة", "24", "1,240", "نشط", ""],
  //     ["2", "جامعة الإسكندرية", "الإسكندرية", "22", "980", "نشط", ""],
  //     ["3", "جامعة الأزهر", "القاهرة", "18", "720", "نشط", ""],
  //     ["4", "جامعة عين شمس", "القاهرة", "20", "860", "نشط", ""],
  //     ["5", "جامعة المنصورة", "المنصورة", "16", "540", "نشط", ""],
  //     ["6", "جامعة حلوان", "حلوان", "14", "420", "نشط", ""],
  //   ],
  // },
  colleges: {
    headers: [
      "المعرف",
      "اسم الكلية",
      "الأقسام",
      "المواد",
      "الحالة",
      "الإجراءات",
    ],
    rows: [
      ["1", "كلية علوم الحاسوب", "4", "48", "نشط", ""],
      ["2", "كلية الهندسة", "8", "96", "نشط", ""],
      ["3", "كلية الطب", "12", "144", "نشط", ""],
      ["4", "كلية العلوم", "6", "72", "نشط", ""],
      ["5", "كلية الاقتصاد", "5", "60", "نشط", ""],
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
      "الدور",
      "تاريخ الانضمام",
      "الإجراءات",
    ],
    rows: [
      ["1", "محمد أحمد", "mohammed@cairo.edu", "طالب", "2024-01-01", ""],
      ["2", "سارة علي", "sara@alex.edu", "طالب", "2024-01-03", ""],
      ["3", "أحمد محمود", "ahmed@azhar.edu", "أستاذ", "2024-01-05", ""],
      ["4", "فاطمة حسن", "fatma@cairo.edu", "طالب", "2024-01-07", ""],
      ["5", "عمر خالد", "omar@ainshams.edu", "مشرف", "2024-01-10", ""],
      ["6", "نور إبراهيم", "nour@mansoura.edu", "طالب", "2024-01-12", ""],
    ],
  },
};

function AdminTableView({
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
    colleges: "كلية",
    departments: "قسم",
    levels: "مستوى",
    semesters: "ترم",
    courses: "مادة",
    files: "ملف",
    users: "مستخدم",
  };
  const label = labelMap[view] ?? "عنصر";

  const roleColors: Record<string, string> = {
    طالب: "bg-[#899C9A]/20 text-[#AABCAF] border border-[#899C9A]/30",
    أستاذ: "bg-[#323D59] text-[#F4F7F6] border border-white/[0.07]",
    مشرف: "bg-[#AABCAF]/20 text-[#F4F7F6] border border-[#AABCAF]/30",
    "Super Admin": "bg-[#899C9A] text-[#1D263B] font-bold",
  };

  const typeColors: Record<string, string> = {
    PDF: "bg-[#899C9A]/20 text-[#F4F7F6] border border-[#899C9A]/40",
    DOCX: "bg-[#323D59] text-[#AABCAF] border border-white/[0.07]",
    XLSX: "bg-[#AABCAF]/20 text-[#F4F7F6] border border-[#AABCAF]/40",
    MP4: "bg-[#899C9A]/20 text-[#899C9A] border border-[#899C9A]/40",
    ZIP: "bg-[#323D59] text-[#F4F7F6] border border-white/[0.07]",
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
    <div className="space-y-4 fade-in">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#899C9A]" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`بحث في ${adminNav.find((n) => n.id === view)?.label}...`}
              className="w-72 rounded-xl border border-white/[0.07] bg-[#323D59] pr-10 pl-4 py-2 text-xs text-[#F4F7F6] placeholder-[#AABCAF]/70 outline-none transition-all focus:border-[#899C9A] focus:ring-2 focus:ring-[#899C9A]/25"
            />
          </div>

          <button className="flex items-center gap-1.5 rounded-xl border border-white/[0.07] bg-[#323D59] px-3.5 py-2 text-xs font-bold text-[#F4F7F6] transition-colors hover:bg-[#3B4868] cursor-pointer">
            <Download className="h-3.5 w-3.5 text-[#899C9A]" />
            <span>تصدير CSV</span>
          </button>

          <button className="flex items-center gap-1.5 rounded-xl border border-white/[0.07] bg-[#323D59] px-3.5 py-2 text-xs font-bold text-[#F4F7F6] transition-colors hover:bg-[#3B4868] cursor-pointer">
            <Filter className="h-3.5 w-3.5 text-[#899C9A]" />
            <span>فلتر</span>
          </button>

          {selected.size > 0 && (
            <button
              onClick={() => onDelete(`${selected.size} عناصر`)}
              className="flex items-center gap-1.5 rounded-xl border border-red-500/40 bg-red-500/20 px-3.5 py-2 text-xs font-bold text-red-300 transition-colors hover:bg-red-500/30 cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>حذف ({selected.size})</span>
            </button>
          )}
        </div>

        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-xl bg-[#899C9A] px-4 py-2.5 text-xs font-black text-[#1D263B] shadow-md transition-all hover:bg-[#AABCAF] hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>إضافة {label}</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#323D59] shadow-xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="border-b border-white/[0.06] bg-[#242D42]/90 text-xs font-bold text-[#AABCAF] uppercase tracking-wider">
              <tr>
                <th className="px-4 py-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded border-white/20 bg-[#242D42] text-[#899C9A] focus:ring-[#899C9A] cursor-pointer"
                  />
                </th>
                {data.headers.map((h, i) => (
                  <th key={i} className="px-6 py-4 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {filtered.map((row, ri) => (
                <tr
                  key={ri}
                  className={`transition-colors hover:bg-white/[0.04] ${
                    selected.has(ri) ? "bg-[#899C9A]/15" : ""
                  }`}
                >
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={selected.has(ri)}
                      onChange={() => {
                        const s = new Set(selected);
                        if (s.has(ri)) s.delete(ri);
                        else s.add(ri);
                        setSelected(s);
                      }}
                      className="h-4 w-4 rounded border-white/20 bg-[#242D42] text-[#899C9A] focus:ring-[#899C9A] cursor-pointer"
                    />
                  </td>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-6 py-4 text-xs font-semibold text-[#F4F7F6] whitespace-nowrap"
                    >
                      {ci === row.length - 1 ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={onEdit}
                            className="flex items-center gap-1 rounded-lg border border-white/[0.07] bg-[#242D42] px-2.5 py-1 text-xs font-bold text-[#AABCAF] transition-colors hover:border-[#899C9A] hover:bg-[#3B4868] hover:text-white cursor-pointer"
                          >
                            <Edit3 className="h-3.5 w-3.5 text-[#899C9A]" />
                            <span>تعديل</span>
                          </button>
                          <button
                            onClick={() => onDelete(row[1])}
                            className="flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/15 px-2.5 py-1 text-xs font-bold text-red-300 transition-colors hover:bg-red-500/25 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : cell === "نشط" ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-[#899C9A]/20 border border-[#899C9A]/40 px-2.5 py-0.5 text-[11px] font-bold text-[#F4F7F6]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#899C9A]" />
                          نشط
                        </span>
                      ) : roleColors[cell] ? (
                        <span
                          className={`rounded-md px-2.5 py-0.5 text-[11px] font-bold ${roleColors[cell]}`}
                        >
                          {cell}
                        </span>
                      ) : typeColors[cell] ? (
                        <span
                          className={`inline-block rounded-md px-2 py-0.5 font-['JetBrains_Mono'] text-[11px] font-bold ${typeColors[cell]}`}
                        >
                          {cell}
                        </span>
                      ) : ci === 0 ? (
                        <span className="font-['JetBrains_Mono'] font-bold text-[#AABCAF]">
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
                    className="py-12 text-center text-xs text-[#AABCAF]"
                  >
                    لا توجد نتائج مطابقة لعملية البحث
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between border-t border-white/[0.06] px-6 py-4">
          <span className="text-xs font-semibold text-[#AABCAF]">
            عرض {filtered.length} من أصل {data.rows.length} عنصر
          </span>

          <div className="flex items-center gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-[#323D59] text-[#AABCAF] hover:bg-[#3B4868] hover:text-white cursor-pointer">
              <ChevronRight className="h-4 w-4" />
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  p === 1
                    ? "bg-[#899C9A] text-[#1D263B] shadow-sm"
                    : "border border-white/[0.07] bg-[#323D59] text-[#AABCAF] hover:bg-[#3B4868] hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-[#323D59] text-[#AABCAF] hover:bg-[#3B4868] hover:text-white cursor-pointer">
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── 3. Settings View ─────────────────────────────────────────────────── */
function AdminSettingsView() {
  const [activeSection, setActiveSection] = useState("general");
  const sections = [
    { id: "general", label: "عام", icon: <Settings className="h-4 w-4" /> },
    { id: "security", label: "الأمان", icon: <Shield className="h-4 w-4" /> },
    {
      id: "appearance",
      label: "المظهر",
      icon: <Palette className="h-4 w-4" />,
    },
    {
      id: "storage",
      label: "التخزين",
      icon: <HardDrive className="h-4 w-4" />,
    },
    {
      id: "email",
      label: "البريد الإلكتروني",
      icon: <Mail className="h-4 w-4" />,
    },
    {
      id: "backup",
      label: "النسخ الاحتياطي",
      icon: <RotateCcw className="h-4 w-4" />,
    },
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
      <div className="flex items-center justify-between border-b border-white/[0.06] py-4">
        <div>
          <div className="text-xs font-bold text-[#F4F7F6]">{label}</div>
          {desc && (
            <div className="mt-0.5 text-[11px] font-medium text-[#AABCAF]">
              {desc}
            </div>
          )}
        </div>
        <button
          onClick={() => setState(!state)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 cursor-pointer ${
            state ? "bg-[#899C9A]" : "bg-[#242D42]"
          }`}
        >
          <span
            className={`block h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-200 ${
              state ? "-translate-x-6" : "-translate-x-1"
            }`}
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
    <div className="mb-4">
      <label className="block text-xs font-bold text-[#AABCAF] mb-1.5">
        {label}
      </label>
      <input
        defaultValue={value}
        type={type}
        className="w-full rounded-xl border border-white/[0.07] bg-[#242D42] px-4 py-2.5 text-xs text-[#F4F7F6] outline-none transition-all focus:border-[#899C9A] focus:ring-2 focus:ring-[#899C9A]/25"
      />
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 fade-in">
      {/* Settings Navigation */}
      <div className="rounded-2xl border border-white/[0.07] bg-[#323D59] p-3 shadow-xl backdrop-blur-xl h-fit">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition-all duration-150 cursor-pointer ${
              activeSection === s.id
                ? "bg-[#3B4868] text-[#F4F7F6] shadow-md border-r-2 border-[#899C9A]"
                : "text-[#AABCAF] hover:bg-white/[0.04] hover:text-[#F4F7F6]"
            }`}
          >
            <span
              className={
                activeSection === s.id ? "text-[#899C9A]" : "text-[#8E9CA8]"
              }
            >
              {s.icon}
            </span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div className="rounded-2xl border border-white/[0.07] bg-[#323D59] p-6 shadow-xl backdrop-blur-xl lg:col-span-3">
        {activeSection === "general" && (
          <div>
            <h3 className="font-['Outfit'] text-base font-bold text-[#F4F7F6] mb-4">
              إعدادات عامة
            </h3>
            <Field label="اسم المنصة" value="دراستي" />
            <Field
              label="وصف المنصة"
              value="منصة موارد أكاديمية شاملة للجامعات"
            />
            <Field
              label="البريد الإلكتروني الرسمي"
              value="admin@دراستي.edu"
              type="email"
            />
            <Field label="رقم الهاتف" value="+20 123 456 7890" />
          </div>
        )}

        {activeSection === "security" && (
          <div>
            <h3 className="font-['Outfit'] text-base font-bold text-[#F4F7F6] mb-4">
              إعدادات الأمان
            </h3>
            <ToggleSwitch
              on={true}
              label="التحقق بخطوتين (2FA)"
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
              label="تشفير الملفات السحابية"
              desc="تشفير الملفات المرفوعة بتشفير AES-256"
            />
          </div>
        )}

        {activeSection === "appearance" && (
          <div>
            <h3 className="font-['Outfit'] text-base font-bold text-[#F4F7F6] mb-4">
              إعدادات المظهر
            </h3>
            <ToggleSwitch
              on={true}
              label="الوضع الداكن الافتراضي"
              desc="استخدام سمة Lavender & Gulf Blue كوضع أساسي"
            />
            <ToggleSwitch
              on={true}
              label="تأثيرات الشفافية والزجاج (Glassmorphism)"
              desc="تفعيل طبقات الزجاج التفاعلية"
            />
          </div>
        )}

        {activeSection === "storage" && (
          <div>
            <h3 className="font-['Outfit'] text-base font-bold text-[#F4F7F6] mb-4">
              إدارة التخزين
            </h3>
            <div className="mb-6 rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
              <div className="mb-2 flex items-center justify-between text-xs font-bold">
                <span className="text-[#AABCAF]">المساحة المستهلكة</span>
                <span className="text-[#899C9A] font-['JetBrains_Mono']">
                  42.6 GB / 100 GB
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#242D42]">
                <div className="h-full w-[42.6%] rounded-full bg-gradient-to-r from-[#899C9A] to-[#AABCAF]" />
              </div>
            </div>
            <Field label="الحد الأقصى لحجم الملف (MB)" value="50" />
            <ToggleSwitch
              on={true}
              label="ضغط الصور والمستندات تلقائياً"
              desc="تقليل استهلاك المساحة السحابية"
            />
          </div>
        )}

        {activeSection === "email" && (
          <div>
            <h3 className="font-['Outfit'] text-base font-bold text-[#F4F7F6] mb-4">
              إعدادات البريد الإلكتروني
            </h3>
            <Field label="خادم SMTP" value="smtp.gmail.com" />
            <Field label="منفذ SMTP" value="587" />
            <Field
              label="البريد المُرسِل"
              value="noreply@دراستي.edu"
              type="email"
            />
          </div>
        )}

        {activeSection === "backup" && (
          <div>
            <h3 className="font-['Outfit'] text-base font-bold text-[#F4F7F6] mb-4">
              النسخ الاحتياطي والاستعادة
            </h3>
            <div className="mb-5 flex items-center gap-3 rounded-xl border border-[#899C9A]/40 bg-white/[0.03] p-4">
              <CheckCircle2 className="h-5 w-5 text-[#899C9A] shrink-0" />
              <div>
                <div className="text-xs font-bold text-[#F4F7F6]">
                  آخر نسخة احتياطية: اليوم في 03:00 ص
                </div>
                <div className="text-[11px] font-medium text-[#AABCAF]">
                  حجم النسخة: 12.4 GB — متزامنة بنجاح
                </div>
              </div>
            </div>
            <ToggleSwitch
              on={true}
              label="نسخ احتياطي تلقائي يومي"
              desc="يتم كل يوم عند الساعة 3 صباحاً"
            />
          </div>
        )}

        <div className="mt-8 flex gap-3 border-t border-white/[0.06] pt-5">
          <button className="rounded-xl bg-[#899C9A] px-6 py-2.5 text-xs font-black text-[#1D263B] shadow-md transition-all hover:bg-[#AABCAF] hover:scale-[1.02] active:scale-95 cursor-pointer">
            حفظ التغييرات
          </button>
          <button className="rounded-xl border border-white/[0.07] bg-[#242D42] px-5 py-2.5 text-xs font-bold text-[#AABCAF] transition-colors hover:bg-[#3B4868] hover:text-white cursor-pointer">
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── 4. Add / Edit Modal Dialog ────────────────────────────────────────── */
function AdminDialogModal({
  type,
  view,
  onClose,
}: {
  type: "add" | "edit";
  view: AdminView;
  onClose: () => void;
}) {
  const labelMap: Record<string, string> = {
    // universities: "جامعة",
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
    // universities: [
    //   {
    //     label: "اسم الجامعة (عربي)",
    //     type: "text",
    //     placeholder: "مثال: جامعة القاهرة",
    //   },
    //   {
    //     label: "اسم الجامعة (إنجليزي)",
    //     type: "text",
    //     placeholder: "Cairo University",
    //   },
    //   { label: "المدينة", type: "text", placeholder: "القاهرة" },
    //   { label: "سنة التأسيس", type: "number", placeholder: "1908" },
    // ],
    colleges: [
      { label: "اسم الكلية", type: "text", placeholder: "كلية علوم الحاسوب" },
      {
        label: "الاسم الإنجليزي",
        type: "text",
        placeholder: "Faculty of Computer Science",
      },
      // { label: "الجامعة", type: "select", placeholder: "اختر الجامعة" },
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
        placeholder: "user@university.edu",
      },
      { label: "كلمة المرور", type: "password", placeholder: "••••••••" },
      { label: "الدور", type: "select", placeholder: "اختر الدور" },
      // { label: "الجامعة", type: "select", placeholder: "اختر الجامعة" },
    ],
  };
  const fields = fieldsMap[view] ?? [
    { label: "الاسم", type: "text", placeholder: "أدخل الاسم" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-lg rounded-2xl border border-white/[0.07] bg-[#323D59] p-6 shadow-2xl backdrop-blur-2xl">
        <div className="mb-6 flex items-center justify-between border-b border-white/[0.06] pb-4">
          <div>
            <h2 className="font-['Outfit'] text-lg font-bold text-[#F4F7F6]">
              {type === "add" ? `إضافة ${label} جديد` : `تعديل ${label}`}
            </h2>
            <p className="text-xs text-[#AABCAF]">
              أدخل البيانات المطلوبة في الحقول أدناه
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#AABCAF] hover:bg-white/[0.08] hover:text-white cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map((field, i) => (
            <div
              key={i}
              className={field.full ? "sm:col-span-2" : "sm:col-span-1"}
            >
              <label className="block text-xs font-bold text-[#AABCAF] mb-1.5">
                {field.label}
              </label>
              {field.type === "select" ? (
                <select className="w-full rounded-xl border border-white/[0.07] bg-[#242D42] px-3.5 py-2 text-xs text-[#F4F7F6] outline-none focus:border-[#899C9A] focus:ring-2 focus:ring-[#899C9A]/25 cursor-pointer">
                  <option value="">{field.placeholder}</option>
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  rows={3}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-white/[0.07] bg-[#242D42] px-3.5 py-2 text-xs text-[#F4F7F6] outline-none focus:border-[#899C9A] focus:ring-2 focus:ring-[#899C9A]/25 resize-none"
                />
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-white/[0.07] bg-[#242D42] px-3.5 py-2 text-xs text-[#F4F7F6] outline-none focus:border-[#899C9A] focus:ring-2 focus:ring-[#899C9A]/25"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3 border-t border-white/[0.06] pt-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-white/[0.07] bg-[#242D42] py-2.5 text-xs font-bold text-[#AABCAF] transition-colors hover:bg-[#3B4868] hover:text-white cursor-pointer"
          >
            إلغاء
          </button>
          <button
            onClick={() => {
              alert(type === "add" ? "تمت الإضافة بنجاح" : "تم حفظ التعديلات");
              onClose();
            }}
            className="flex-1 rounded-xl bg-[#899C9A] py-2.5 text-xs font-black text-[#1D263B] shadow-md transition-all hover:bg-[#AABCAF] hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            {type === "add" ? `✓ تأكيد الإضافة` : "💾 حفظ التغييرات"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── 5. Delete Confirmation Modal ──────────────────────────────────────── */
function DeleteConfirmModal({
  name,
  onClose,
}: {
  name: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-sm rounded-2xl border border-red-500/40 bg-[#323D59] p-6 text-center shadow-2xl backdrop-blur-2xl">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/20 text-red-300 border border-red-500/30">
          <Trash2 className="h-7 w-7" />
        </div>
        <h2 className="font-['Outfit'] text-lg font-bold text-[#F4F7F6]">
          تأكيد الحذف
        </h2>
        <p className="mt-2 text-xs text-[#AABCAF] leading-relaxed">
          هل أنت متأكد من حذف{" "}
          <strong className="text-[#F4F7F6] font-bold">"{name}"</strong>؟
          <br />
          لا يمكن التراجع عن هذا الإجراء بعد تنفيذه.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-white/[0.07] bg-[#242D42] py-2.5 text-xs font-bold text-[#AABCAF] transition-colors hover:bg-[#3B4868] hover:text-white cursor-pointer"
          >
            إلغاء
          </button>
          <button
            onClick={() => {
              alert("تم الحذف بنجاح");
              onClose();
            }}
            className="flex-1 rounded-xl bg-red-600 py-2.5 text-xs font-black text-white shadow-md transition-all hover:bg-red-500 hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            تأكيد الحذف
          </button>
        </div>
      </div>
    </div>
  );
}
