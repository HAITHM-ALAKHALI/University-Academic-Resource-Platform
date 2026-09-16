import type { Lang } from "../types/app";

export interface Translations {
  nav: { home: string; courses: string; admin: string; browse: string; join: string };
  hero: { badge: string; title: string; subtitle: string; browseCourses: string; joinPlatform: string };
  hierarchy: { title: string; subtitle: string; levels: string[] };
  stats: { departments: string; courses: string; resources: string; students: string };
  features: { title: string; subtitle: string; items: { title: string; desc: string }[] };
  courses: { title: string; subtitle: string; resources: string; access: string };
  courseDetail: { back: string; tabs: string[]; download: string; uploaded: string; size: string };
  admin: {
    title: string;
    subtitle: string;
    tabs: string[];
    addCourse: string;
    uploadResource: string;
    totalDepartments: string;
    totalCourses: string;
    totalResources: string;
    totalStudents: string;
    recentActivity: string;
    quickActions: string;
    manageFiles: string;
  };
  theme: { light: string; dark: string };
  lang: { en: string; ar: string };
}

export const t: Record<Lang, Translations> = {
  en: {
    nav: {
      home: "Home",
      courses: "Courses",
      admin: "Dashboard",
      browse: "Browse Courses",
      join: "Join Platform",
    },
    hero: {
      badge: "Academic Resource Platform",
      title: "Your academic resources,\norganized in one place.",
      subtitle:
        "Access lectures, books, assignments, and past exams for every course — structured by department, level, and semester.",
      browseCourses: "Browse Courses",
      joinPlatform: "Join Platform",
    },
    hierarchy: {
      title: "Academic Structure",
      subtitle: "Navigate from your department down to the exact course you need.",
      levels: ["Department", "Level", "Semester", "Courses"],
    },
    stats: {
      departments: "Departments",
      courses: "Courses",
      resources: "Resources",
      students: "Students",
    },
    features: {
      title: "Everything you need,\nin one platform.",
      subtitle: "Built for students. Designed for clarity.",
      items: [
        {
          title: "Organized Materials",
          desc: "Every resource categorized by course, type, and semester so you never waste time searching.",
        },
        {
          title: "Instant PDF Access",
          desc: "Open or download lecture slides, textbooks, and past exams with one click.",
        },
        {
          title: "Smart Search",
          desc: "Find any course, resource, or topic across all departments instantly.",
        },
        {
          title: "Student-First Design",
          desc: "Clean, fast, and distraction-free — built around how students actually study.",
        },
      ],
    },
    courses: {
      title: "Popular Courses",
      subtitle: "Computer Science Department · Level 3",
      resources: "resources",
      access: "View Course",
    },
    courseDetail: {
      back: "Back to courses",
      tabs: ["Lectures", "Books & References", "Assignments", "Previous Exams"],
      download: "Download",
      uploaded: "Uploaded",
      size: "Size",
    },
    admin: {
      title: "Admin Dashboard",
      subtitle: "Manage departments, courses, and academic resources.",
      tabs: ["Overview", "Courses", "Resources", "Upload"],
      addCourse: "Add Course",
      uploadResource: "Upload Resource",
      totalDepartments: "Departments",
      totalCourses: "Courses",
      totalResources: "Resources",
      totalStudents: "Students",
      recentActivity: "Recent Activity",
      quickActions: "Quick Actions",
      manageFiles: "Manage Files",
    },
    theme: { light: "Light", dark: "Dark" },
    lang: { en: "English", ar: "العربية" },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      courses: "المقررات",
      admin: "لوحة التحكم",
      browse: "تصفح المقررات",
      join: "انضم للمنصة",
    },
    hero: {
      badge: "منصة الموارد الأكاديمية",
      title: "مواردك الأكاديمية،\nمنظمة في مكان واحد.",
      subtitle:
        "تصفح المحاضرات والكتب والواجبات والاختبارات السابقة لكل مقرر — مرتبة حسب القسم والمستوى والفصل الدراسي.",
      browseCourses: "تصفح المقررات",
      joinPlatform: "انضم للمنصة",
    },
    hierarchy: {
      title: "الهيكل الأكاديمي",
      subtitle: "تدرج من القسم وصولاً إلى المقرر الذي تحتاجه بدقة.",
      levels: ["القسم", "المستوى", "الفصل الدراسي", "المقررات"],
    },
    stats: {
      departments: "أقسام أكاديمية",
      courses: "مقرر دراسي",
      resources: "مورد تعليمي",
      students: "طالب وطالبة",
    },
    features: {
      title: "كل ما تحتاجه،\nفي منصة واحدة.",
      subtitle: "صُممت للطلاب. بُنيت من أجل الوضوح والسرعة.",
      items: [
        {
          title: "مواد منظمة ومصنفة",
          desc: "كل مورد مصنف حسب المقرر والنوع والفصل الدراسي لتوفر وقت البحث.",
        },
        {
          title: "وصول سريع لملفات PDF",
          desc: "تصفح وحمل سلايدات المحاضرات والكتب والامتحانات السابقة بنقرة واحدة.",
        },
        {
          title: "بحث ذكي وفوري",
          desc: "ابحث عن أي مقرر أو ملف أو موضوع عبر جميع الأقسام فوراً وبكل سهولة.",
        },
        {
          title: "تجربة مخصصة للطالب",
          desc: "واجهة سريعة وبسيطة خالية من التشتيت — مبنية لتناسب طريقة دراستك.",
        },
      ],
    },
    courses: {
      title: "المقررات الأكثر تصفحاً",
      subtitle: "قسم علوم الحاسوب · المستوى الثالث",
      resources: "مورد",
      access: "عرض المقرر",
    },
    courseDetail: {
      back: "العودة للمقررات",
      tabs: ["المحاضرات", "الكتب والمراجع", "الواجبات والتكليفات", "الامتحانات السابقة"],
      download: "تحميل",
      uploaded: "تاريخ الرفع",
      size: "الحجم",
    },
    admin: {
      title: "لوحة تحكم المسؤول",
      subtitle: "إدارة الأقسام والمقررات والموارد الأكاديمية.",
      tabs: ["نظرة عامة", "المقررات", "الموارد", "رفع ملف"],
      addCourse: "إضافة مقرر",
      uploadResource: "رفع مورد",
      totalDepartments: "قسم",
      totalCourses: "مقرر",
      totalResources: "مورد",
      totalStudents: "طالب",
      recentActivity: "النشاط الأخير",
      quickActions: "إجراءات سريعة",
      manageFiles: "إدارة الملفات",
    },
    theme: { light: "فاتح", dark: "داكن" },
    lang: { en: "English", ar: "العربية" },
  },
} as const;
