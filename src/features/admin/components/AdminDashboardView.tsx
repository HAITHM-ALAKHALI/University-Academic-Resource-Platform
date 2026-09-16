import type { ReactNode } from "react";
import {
  FolderTree,
  BookOpen,
  Users,
  FileText,
  UploadCloud,
  TrendingUp,
} from "lucide-react";
import type { AdminView } from "../../../types/app";

export interface AdminDashboardViewProps {
  setView: (v: AdminView) => void;
  doctorsCount?: number;
}

export function AdminDashboardView({
  setView,
  doctorsCount = 6,
}: AdminDashboardViewProps) {
  const stats: Array<{
    label: string;
    value: string;
    icon: ReactNode;
    color: string;
    trend: string;
    view: AdminView;
  }> = [
    {
      label: "الأقسام",
      value: "128",
      icon: <FolderTree className="h-5 w-5" />,
      color: "#899C9A",
      trend: "+8",
      view: "departments",
    },
    {
      label: "المواد",
      value: "620",
      icon: <BookOpen className="h-5 w-5" />,
      color: "#AABCAF",
      trend: "+18",
      view: "courses",
    },
    {
      label: "الدكاترة",
      value: String(doctorsCount),
      icon: <Users className="h-5 w-5" />,
      color: "#7DA49F",
      trend: "+3",
      view: "doctors",
    },
    {
      label: "الملفات",
      value: "8.4K",
      icon: <FileText className="h-5 w-5" />,
      color: "#899C9A",
      trend: "+124",
      view: "files",
    },
    {
      label: "المستخدمون",
      value: "2.1K",
      icon: <Users className="h-5 w-5" />,
      color: "#AABCAF",
      trend: "+47",
      view: "users",
    },
  ];

  const quickActions: Array<{
    label: string;
    icon: ReactNode;
    view: AdminView;
    color: string;
  }> = [
    {
      label: "إضافة مادة",
      icon: <BookOpen className="h-5 w-5" />,
      view: "courses",
      color: "#899C9A",
    },
    {
      label: "إدارة الدكاترة",
      icon: <Users className="h-5 w-5" />,
      view: "doctors",
      color: "#7DA49F",
    },
    {
      label: "رفع ملفات",
      icon: <UploadCloud className="h-5 w-5" />,
      view: "files",
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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
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

export default AdminDashboardView;
