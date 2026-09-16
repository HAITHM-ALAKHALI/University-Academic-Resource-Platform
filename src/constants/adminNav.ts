import type { AdminView } from "../types/app";

export interface AdminNavItemConfig {
  id: AdminView;
  label: string;
  iconName:
    | "LayoutDashboard"
    | "FolderTree"
    | "GraduationCap"
    | "Calendar"
    | "BookOpen"
    | "Users"
    | "FileText"
    | "Settings";
  badge: number;
}

export const adminNavItems: AdminNavItemConfig[] = [
  {
    id: "dashboard",
    label: "لوحة التحكم",
    iconName: "LayoutDashboard",
    badge: 0,
  },
  {
    id: "departments",
    label: "الأقسام",
    iconName: "FolderTree",
    badge: 0,
  },
  {
    id: "levels",
    label: "المستويات",
    iconName: "GraduationCap",
    badge: 0,
  },
  {
    id: "semesters",
    label: "الترمات",
    iconName: "Calendar",
    badge: 0,
  },
  {
    id: "courses",
    label: "المواد",
    iconName: "BookOpen",
    badge: 3,
  },
  {
    id: "doctors",
    label: "إدارة الدكاترة",
    iconName: "Users",
    badge: 0,
  },
  {
    id: "files",
    label: "الملفات",
    iconName: "FileText",
    badge: 12,
  },
  {
    id: "users",
    label: "المستخدمون",
    iconName: "Users",
    badge: 5,
  },
  {
    id: "settings",
    label: "الإعدادات",
    iconName: "Settings",
    badge: 0,
  },
];

export interface AdminNotificationItem {
  id: number;
  text: string;
  time: string;
  iconName: "FileText" | "Users" | "RotateCcw" | "TrendingUp";
  color: string;
  read: boolean;
}

export const initialAdminNotifications: AdminNotificationItem[] = [
  {
    id: 1,
    text: "تم رفع 5 ملفات جديدة في مادة برمجة 1",
    time: "2 دقائق",
    iconName: "FileText",
    color: "bg-[#899C9A]/20 text-[#AABCAF] border border-[#899C9A]/30",
    read: false,
  },
  {
    id: 2,
    text: "طلب مستخدم جديد: محمد أحمد للانضمام",
    time: "18 دقيقة",
    iconName: "Users",
    color: "bg-[#AABCAF]/20 text-[#AABCAF] border border-[#AABCAF]/30",
    read: false,
  },
  {
    id: 4,
    text: "تحديث النظام: الإصدار 2.4.1 متاح",
    time: "3 ساعات",
    iconName: "RotateCcw",
    color: "bg-[#323D59] text-[#AABCAF] border border-white/[0.07]",
    read: true,
  },
  {
    id: 5,
    text: "تقرير أسبوعي: 1,240 تحميل هذا الأسبوع",
    time: "5 ساعات",
    iconName: "TrendingUp",
    color: "bg-[#899C9A]/20 text-[#899C9A] border border-[#899C9A]/30",
    read: true,
  },
];
