export type AcademicTitle =
  | "أستاذ دكتور"
  | "أستاذ"
  | "أستاذ مشارك"
  | "أستاذ مساعد"
  | "دكتور"
  | "محاضر"
  | "معيد";

export interface Doctor {
  id: string;
  name: string;
  academicTitle: AcademicTitle;
  department: string;
  email: string;
  phone: string;
  bio: string;
  avatar?: string;
  assignedCourseIds: number[];
  rating?: number;
}

export interface AcademicDepartment {
  id: number;
  name: string;
  nameEn: string;
  color: string;
  icon: string;
  desc?: string;
}

export interface SemesterInfo {
  id: number;
  name: string;
  courses: number;
  files: number;
  color: string;
}

export interface AcademicLevel {
  id: number;
  name: string;
  year: number;
  color: string;
  icon: string;
  coursesCount: number;
  semesters: SemesterInfo[];
}

export interface AcademicSemester {
  id: number;
  name: string;
  courses: number;
  files: number;
  color: string;
}

export interface AcademicCourse {
  id: number;
  code: string;
  name: string;
  nameEn: string;
  department: string;
  level: string;
  semester: string;
  files: number;
  color: string;
  icon: string;
  rating: number;
  doctorIds: string[];
  desc?: string;
}

export type ResourceType =
  | "lectures"
  | "books"
  | "exams"
  | "videos"
  | "projects"
  | "external";

export interface CourseResource {
  id: number;
  courseId: number;
  doctorId: string;
  type: ResourceType;
  name: string;
  size?: string;
  date?: string;
  author?: string;
  pages?: number;
  edition?: string;
  cover?: string;
  year?: number;
  examType?: string;
  withSolution?: boolean;
  duration?: string;
  views?: string;
  platform?: string;
  desc?: string;
  tech?: string[];
  grade?: string;
  url?: string;
  icon?: string;
}

export interface DoctorFormData {
  name: string;
  academicTitle: AcademicTitle | "";
  department: string;
  email: string;
  phone: string;
  bio: string;
}

export interface AssignCourseData {
  department: string;
  level: string;
  semester: string;
  courseId: number | "";
}
