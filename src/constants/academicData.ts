import type {
  AcademicDepartment,
  AcademicLevel,
  AcademicSemester,
} from "../types/academic";
import {
  initialDoctors,
  academicDepartments,
  academicLevels,
  academicSemesters,
  initialCourses,
  initialCourseResources,
} from "../data/academicData";

// Re-export original datasets
export {
  initialDoctors,
  academicDepartments,
  academicLevels,
  academicSemesters,
  initialCourses,
  initialCourseResources,
};

// Structured Department list for Student Portal
export const departmentsData: AcademicDepartment[] = [
  {
    id: 1,
    name: "علوم حاسوب",
    nameEn: "CS",
    color: "#6B8EC7", // Soft Blue
    icon: "</>",
    desc: "Computer Science",
  },
  {
    id: 2,
    name: "تقنية معلومات",
    nameEn: "IT",
    color: "#5BA8B5", // Soft Cyan
    icon: "🖥",
    desc: "Information Technology",
  },
  {
    id: 3,
    name: "أمن سيبراني",
    nameEn: "CYS",
    color: "#5BAA8E", // Soft Emerald
    icon: "🔐",
    desc: "Cyber Security",
  },
  {
    id: 4,
    name: "ذكاء اصطناعي",
    nameEn: "AI",
    color: "#8B7EC0", // Soft Violet
    icon: "🤖",
    desc: "Artificial Intelligence",
  },
  {
    id: 5,
    name: "نظم معلومات",
    nameEn: "IS",
    color: "#C9A855", // Soft Amber
    icon: "🗄",
    desc: "Information Systems",
  },
  {
    id: 6,
    name: "علم البيانات",
    nameEn: "DS",
    color: "#C07A9B", // Soft Rose
    icon: "📊",
    desc: "Data Science",
  },
];

// Structured Levels with nested Semesters for Student Portal
export const levelsData: AcademicLevel[] = [
  {
    id: 1,
    name: "السنة الأولى",
    year: 1,
    color: "#6B8EC7",
    icon: "①",
    coursesCount: 8,
    semesters: [
      { id: 1, name: "الترم الأول", courses: 4, files: 124, color: "#6B8EC7" },
      { id: 2, name: "الترم الثاني", courses: 4, files: 118, color: "#5BA8B5" },
    ],
  },
  {
    id: 2,
    name: "السنة الثانية",
    year: 2,
    color: "#8B7EC0",
    icon: "②",
    coursesCount: 10,
    semesters: [
      { id: 1, name: "الترم الأول", courses: 5, files: 142, color: "#8B7EC0" },
      { id: 2, name: "الترم الثاني", courses: 5, files: 136, color: "#A598D4" },
    ],
  },
  {
    id: 3,
    name: "السنة الثالثة",
    year: 3,
    color: "#5BAA8E",
    icon: "③",
    coursesCount: 10,
    semesters: [
      { id: 1, name: "الترم الأول", courses: 5, files: 155, color: "#5BAA8E" },
      { id: 2, name: "الترم الثاني", courses: 5, files: 148, color: "#7DA49F" },
    ],
  },
  {
    id: 4,
    name: "السنة الرابعة",
    year: 4,
    color: "#C9A855",
    icon: "④",
    coursesCount: 9,
    semesters: [
      { id: 1, name: "الترم الأول", courses: 5, files: 160, color: "#C9A855" },
      { id: 2, name: "الترم الثاني", courses: 4, files: 145, color: "#B08D6A" },
    ],
  },
];

// Semesters list
export const semestersData: AcademicSemester[] = [
  { id: 1, name: "الترم الأول", courses: 6, files: 124, color: "#6B8EC7" },
  { id: 2, name: "الترم الثاني", courses: 6, files: 118, color: "#8B7EC0" },
];

// Popular Courses list for Home screen
export const popularCoursesData = [
  {
    id: 1,
    name: "هياكل البيانات",
    nameEn: "Data Structures",
    dept: "علوم حاسوب",
    files: 47,
    color: "#6B8EC7",
    icon: "⚙",
  },
  {
    id: 2,
    name: "برمجة 1",
    nameEn: "Programming 1",
    dept: "علوم حاسوب",
    files: 32,
    color: "#5BA8B5",
    icon: "💻",
  },
  {
    id: 3,
    name: "رياضيات",
    nameEn: "Mathematics",
    dept: "هندسة",
    files: 28,
    color: "#C9A855",
    icon: "∑",
  },
  {
    id: 4,
    name: "قواعد البيانات",
    nameEn: "Database Systems",
    dept: "تقنية معلومات",
    files: 39,
    color: "#5BAA8E",
    icon: "🗄",
  },
  {
    id: 5,
    name: "الذكاء الاصطناعي",
    nameEn: "Artificial Intelligence",
    dept: "علوم حاسوب",
    files: 55,
    color: "#8B7EC0",
    icon: "🤖",
  },
  {
    id: 6,
    name: "شبكات الحاسوب",
    nameEn: "Computer Networks",
    dept: "هندسة",
    files: 41,
    color: "#C07A9B",
    icon: "🌐",
  },
];
