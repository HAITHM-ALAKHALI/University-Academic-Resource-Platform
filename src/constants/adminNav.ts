import type { AdminView } from "../types/app";

export type AdminNavIconName =
  | "LayoutDashboard"
  | "FolderTree"
  | "GraduationCap"
  | "Calendar"
  | "BookOpen"
  | "FileText"
  | "Users"
  | "ShieldCheck"
  | "UserCog"
  | "Settings";

export interface AdminNavItemConfig {
  id: AdminView;
  label: string;
  iconName: AdminNavIconName;
  badge?: number;
  queryFilter?: {
    role_id?: number | number[];
  };
}

export interface NavSection {
  id: string;
  title: string;
  items: AdminNavItemConfig[];
}

export const adminNavSections: NavSection[] = [
  {
    id: "dashboard_section",
    title: "لوحة التحكم",
    items: [
      {
        id: "dashboard",
        label: "لوحة التحكم",
        iconName: "LayoutDashboard",
        badge: 0,
      },
    ],
  },
  {
    id: "academic_structure",
    title: "الهيكل الأكاديمي",
    items: [
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
        badge: 0,
      },
    ],
  },
  {
    id: "content_management_section",
    title: "إدارة المحتوى",
    items: [
      {
        id: "content_management",
        label: "إدارة المحتوى والملفات",
        iconName: "FileText",
        badge: 0,
      },
    ],
  },
  {
    id: "users_permissions",
    title: "المستخدمين والصلاحيات",
    items: [
      {
        id: "doctors",
        label: "الكادر الأكاديمي (الدكاترة)",
        iconName: "Users",
        badge: 0,
        queryFilter: { role_id: 3 },
      },
      {
        id: "system_admins",
        label: "مدراء النظام",
        iconName: "ShieldCheck",
        badge: 0,
        queryFilter: { role_id: [0, 1] },
      },
      {
        id: "content_managers",
        label: "مدراء المحتوى",
        iconName: "UserCog",
        badge: 0,
        queryFilter: { role_id: 2 },
      },
    ],
  },
  {
    id: "system_section",
    title: "النظام",
    items: [
      {
        id: "settings",
        label: "الإعدادات",
        iconName: "Settings",
        badge: 0,
      },
    ],
  },
];

// Flattened list for direct lookups
export const adminNavItems: AdminNavItemConfig[] = adminNavSections.flatMap(
  (section) => section.items
);

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
    text: "طلب انضمام مستخدم جديد: د. موسى غراب",
    time: "18 دقيقة",
    iconName: "Users",
    color: "bg-[#AABCAF]/20 text-[#AABCAF] border border-[#AABCAF]/30",
    read: false,
  },
  {
    id: 4,
    text: "تحديث النظام: قاعدة البيانات darasty_db_2 متزامنة",
    time: "3 ساعات",
    iconName: "RotateCcw",
    color: "bg-[#323D59] text-[#AABCAF] border border-white/[0.07]",
    read: true,
  },
  {
    id: 5,
    text: "تقرير المحتوى: 1,240 تحميل هذا الأسبوع",
    time: "5 ساعات",
    iconName: "TrendingUp",
    color: "bg-[#899C9A]/20 text-[#899C9A] border border-[#899C9A]/30",
    read: true,
  },
];
