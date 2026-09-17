import type { Doctor } from "./academic";

export type Page = "landing" | "course" | "admin" | "login" | "app";

export type AppMode = "student" | "admin" | "pages";

export type Lang = "en" | "ar";

export type StudentScreen =
  | "home"
  | "departments"
  | "levels"
  | "semesters"
  | "courses"
  | "course-detail";

export interface DepartmentSummary {
  id: number;
  name: string;
  nameEn: string;
  color: string;
  icon: string;
}

export interface LevelSummary {
  id: number;
  name: string;
}

export interface SemesterSummary {
  id: number;
  name: string;
}

export interface CourseSummary {
  id: number;
  name: string;
  nameEn: string;
  color: string;
}

export interface NavState {
  screen: StudentScreen;
  department?: DepartmentSummary;
  level?: LevelSummary;
  semester?: SemesterSummary;
  course?: CourseSummary;
  doctorId?: string;
  doctor?: Doctor;
}

export type AdminView =
  | "dashboard"
  | "departments"
  | "levels"
  | "semesters"
  | "courses"
  | "content_management"
  | "doctors"
  | "system_admins"
  | "content_managers"
  | "settings";

export type AdminTab = "overview" | "courses" | "resources" | "upload";

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}
