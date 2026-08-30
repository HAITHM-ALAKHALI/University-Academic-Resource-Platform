export type Lang = 'en' | 'ar';

interface Translations {
  nav: { home: string; courses: string; admin: string; browse: string; join: string }
  hero: { badge: string; title: string; subtitle: string; browseCourses: string; joinPlatform: string }
  hierarchy: { title: string; subtitle: string; levels: string[] }
  stats: { universities: string; courses: string; resources: string; students: string }
  features: { title: string; subtitle: string; items: { title: string; desc: string }[] }
  courses: { title: string; subtitle: string; resources: string; access: string }
  courseDetail: { back: string; tabs: string[]; download: string; uploaded: string; size: string }
  admin: { title: string; subtitle: string; tabs: string[]; addUniversity: string; addCourse: string; uploadResource: string; totalUniversities: string; totalCourses: string; totalResources: string; totalStudents: string; recentActivity: string; quickActions: string; manageFiles: string }
  theme: { light: string; dark: string }
  lang: { en: string; ar: string }
}

export const t: Record<Lang, Translations> = {
  en: {
    nav: {
      home: 'Home',
      courses: 'Courses',
      admin: 'Dashboard',
      browse: 'Browse Courses',
      join: 'Join Platform',
    },
    hero: {
      badge: 'Academic Resource Platform',
      title: 'Your university resources,\norganized in one place.',
      subtitle:
        'Access lectures, books, assignments, and past exams for every course — structured by university, college, major, and level.',
      browseCourses: 'Browse Courses',
      joinPlatform: 'Join Platform',
    },
    hierarchy: {
      title: 'Academic Structure',
      subtitle: 'Navigate from your university down to the exact course you need.',
      levels: ['University', 'College', 'Department', 'Level', 'Courses'],
    },
    stats: {
      universities: 'Universities',
      courses: 'Courses',
      resources: 'Resources',
      students: 'Students',
    },
    features: {
      title: 'Everything you need,\nin one platform.',
      subtitle: 'Built for students. Designed for clarity.',
      items: [
        { title: 'Organized Materials', desc: 'Every resource categorized by course, type, and semester so you never waste time searching.' },
        { title: 'Instant PDF Access', desc: 'Open or download lecture slides, textbooks, and past exams with one click.' },
        { title: 'Smart Search', desc: 'Find any course, resource, or topic across all universities and departments instantly.' },
        { title: 'Student-First Design', desc: 'Clean, fast, and distraction-free — built around how students actually study.' },
      ],
    },
    courses: {
      title: 'Popular Courses',
      subtitle: 'Computer Science Department · Level 3',
      resources: 'resources',
      access: 'View Course',
    },
    courseDetail: {
      back: 'Back to courses',
      tabs: ['Lectures', 'Books & References', 'Assignments', 'Previous Exams'],
      download: 'Download',
      uploaded: 'Uploaded',
      size: 'Size',
    },
    admin: {
      title: 'Admin Dashboard',
      subtitle: 'Manage universities, departments, courses, and academic resources.',
      tabs: ['Overview', 'Universities', 'Courses', 'Resources', 'Upload'],
      addUniversity: 'Add University',
      addCourse: 'Add Course',
      uploadResource: 'Upload Resource',
      totalUniversities: 'Universities',
      totalCourses: 'Courses',
      totalResources: 'Resources',
      totalStudents: 'Students',
      recentActivity: 'Recent Activity',
      quickActions: 'Quick Actions',
      manageFiles: 'Manage Files',
    },
    theme: { light: 'Light', dark: 'Dark' },
    lang: { en: 'English', ar: 'العربية' },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      courses: 'المقررات',
      admin: 'لوحة التحكم',
      browse: 'تصفح المقررات',
      join: 'انضم للمنصة',
    },
    hero: {
      badge: 'منصة الموارد الأكاديمية',
      title: 'مواردك الجامعية،\nمنظمة في مكان واحد.',
      subtitle:
        'تصفح المحاضرات والكتب والواجبات والاختبارات السابقة لكل مقرر — مرتبة حسب الجامعة والكلية والتخصص والمستوى.',
      browseCourses: 'تصفح المقررات',
      joinPlatform: 'انضم للمنصة',
    },
    hierarchy: {
      title: 'الهيكل الأكاديمي',
      subtitle: 'تصفح من جامعتك وصولاً إلى المقرر الذي تحتاجه.',
      levels: ['الجامعة', 'الكلية', 'القسم', 'المستوى', 'المقررات'],
    },
    stats: {
      universities: 'جامعة',
      courses: 'مقرر',
      resources: 'مورد أكاديمي',
      students: 'طالب',
    },
    features: {
      title: 'كل ما تحتاجه،\nفي منصة واحدة.',
      subtitle: 'مبنية للطلاب. مصممة للوضوح.',
      items: [
        { title: 'مواد منظمة', desc: 'كل مورد مصنف حسب المقرر والنوع والفصل الدراسي حتى لا تضيع وقتك في البحث.' },
        { title: 'وصول فوري للملفات', desc: 'افتح أو حمّل شرائح المحاضرات والكتب والاختبارات السابقة بنقرة واحدة.' },
        { title: 'بحث ذكي', desc: 'جد أي مقرر أو مورد أو موضوع عبر جميع الجامعات والأقسام على الفور.' },
        { title: 'تصميم للطلاب أولاً', desc: 'نظيف، سريع، وخالٍ من المشتتات — مبني حول طريقة الطلاب الفعلية في الدراسة.' },
      ],
    },
    courses: {
      title: 'المقررات الشائعة',
      subtitle: 'قسم علوم الحاسوب · المستوى الثالث',
      resources: 'مورد',
      access: 'عرض المقرر',
    },
    courseDetail: {
      back: 'العودة للمقررات',
      tabs: ['المحاضرات', 'الكتب والمراجع', 'الواجبات', 'الاختبارات السابقة'],
      download: 'تحميل',
      uploaded: 'رُفع',
      size: 'الحجم',
    },
    admin: {
      title: 'لوحة تحكم المشرف',
      subtitle: 'إدارة الجامعات والأقسام والمقررات والموارد الأكاديمية.',
      tabs: ['نظرة عامة', 'الجامعات', 'المقررات', 'الموارد', 'رفع ملف'],
      addUniversity: 'إضافة جامعة',
      addCourse: 'إضافة مقرر',
      uploadResource: 'رفع مورد',
      totalUniversities: 'جامعة',
      totalCourses: 'مقرر',
      totalResources: 'مورد',
      totalStudents: 'طالب',
      recentActivity: 'النشاط الأخير',
      quickActions: 'إجراءات سريعة',
      manageFiles: 'إدارة الملفات',
    },
    theme: { light: 'فاتح', dark: 'داكن' },
    lang: { en: 'English', ar: 'العربية' },
  },
} as const;

export const courses = [
  {
    id: 'cs301',
    code: 'CS 301',
    color: '#899C9A',
    en: {
      name: 'Data Structures & Algorithms',
      instructor: 'Dr. Sarah Mitchell',
      level: 'Level 3 · Semester 1',
      desc: 'Fundamental data structures including arrays, linked lists, stacks, queues, trees, and graphs. Algorithm analysis, sorting, and searching techniques.',
      dept: 'Computer Science',
    },
    ar: {
      name: 'هياكل البيانات والخوارزميات',
      instructor: 'د. سارة ميتشيل',
      level: 'المستوى 3 · الفصل الأول',
      desc: 'هياكل البيانات الأساسية بما في ذلك المصفوفات والقوائم المرتبطة والأكوام والطوابير والأشجار والرسوم البيانية. تحليل الخوارزميات وتقنيات الفرز والبحث.',
      dept: 'علوم الحاسوب',
    },
    resourceCount: 48,
    resources: {
      lectures: [
        { id: 1, name: 'Week 1 - Introduction to Data Structures.pdf', date: '2024-09-05', size: '3.2 MB' },
        { id: 2, name: 'Week 2 - Arrays and Linked Lists.pdf', date: '2024-09-12', size: '4.1 MB' },
        { id: 3, name: 'Week 3 - Stacks and Queues.pdf', date: '2024-09-19', size: '2.8 MB' },
        { id: 4, name: 'Week 4 - Binary Trees.pdf', date: '2024-09-26', size: '5.3 MB' },
        { id: 5, name: 'Week 5 - Graph Algorithms.pdf', date: '2024-10-03', size: '6.1 MB' },
        { id: 6, name: 'Week 6 - Sorting Algorithms.pdf', date: '2024-10-10', size: '4.7 MB' },
      ],
      books: [
        { id: 1, name: 'Introduction to Algorithms (CLRS) - 4th Edition.pdf', date: '2024-09-01', size: '18.4 MB' },
        { id: 2, name: 'Data Structures in C++ - Malik.pdf', date: '2024-09-01', size: '12.6 MB' },
        { id: 3, name: 'Algorithm Design - Kleinberg & Tardos.pdf', date: '2024-09-01', size: '9.2 MB' },
      ],
      assignments: [
        { id: 1, name: 'Assignment 1 - Linked List Implementation.pdf', date: '2024-09-20', size: '0.8 MB' },
        { id: 2, name: 'Assignment 2 - Binary Search Tree.pdf', date: '2024-10-10', size: '1.1 MB' },
        { id: 3, name: 'Assignment 3 - Graph Traversal.pdf', date: '2024-11-01', size: '0.9 MB' },
      ],
      exams: [
        { id: 1, name: 'Midterm Exam 2023 - With Solutions.pdf', date: '2023-10-15', size: '1.4 MB' },
        { id: 2, name: 'Final Exam 2023.pdf', date: '2024-01-10', size: '1.8 MB' },
        { id: 3, name: 'Midterm Exam 2022.pdf', date: '2022-10-18', size: '1.2 MB' },
        { id: 4, name: 'Final Exam 2022 - With Solutions.pdf', date: '2023-01-12', size: '2.0 MB' },
      ],
    },
  },
  {
    id: 'cs302',
    code: 'CS 302',
    color: '#AABCAF',
    en: {
      name: 'Database Systems',
      instructor: 'Prof. James Chen',
      level: 'Level 3 · Semester 2',
      desc: 'Relational database design, SQL, normalization, transaction management, indexing, and an introduction to NoSQL databases.',
      dept: 'Computer Science',
    },
    ar: {
      name: 'نظم قواعد البيانات',
      instructor: 'أ.د. جيمس تشن',
      level: 'المستوى 3 · الفصل الثاني',
      desc: 'تصميم قواعد البيانات العلائقية وSQL والتوحيد القياسي وإدارة المعاملات والفهرسة ومقدمة لقواعد بيانات NoSQL.',
      dept: 'علوم الحاسوب',
    },
    resourceCount: 36,
    resources: {
      lectures: [
        { id: 1, name: 'Week 1 - Intro to Databases & Relational Model.pdf', date: '2024-02-08', size: '2.9 MB' },
        { id: 2, name: 'Week 2 - SQL Fundamentals.pdf', date: '2024-02-15', size: '3.5 MB' },
        { id: 3, name: 'Week 3 - Advanced SQL Queries.pdf', date: '2024-02-22', size: '4.0 MB' },
        { id: 4, name: 'Week 4 - Normalization (1NF to 3NF).pdf', date: '2024-02-29', size: '3.2 MB' },
        { id: 5, name: 'Week 5 - Transaction Management.pdf', date: '2024-03-07', size: '2.7 MB' },
      ],
      books: [
        { id: 1, name: 'Database System Concepts - Silberschatz 7th Ed.pdf', date: '2024-02-01', size: '22.1 MB' },
        { id: 2, name: 'Fundamentals of Database Systems - Elmasri.pdf', date: '2024-02-01', size: '15.8 MB' },
      ],
      assignments: [
        { id: 1, name: 'Assignment 1 - ER Diagram Design.pdf', date: '2024-02-28', size: '0.7 MB' },
        { id: 2, name: 'Assignment 2 - SQL Queries.pdf', date: '2024-03-20', size: '0.9 MB' },
      ],
      exams: [
        { id: 1, name: 'Midterm Exam 2023 - Semester 2.pdf', date: '2023-04-05', size: '1.3 MB' },
        { id: 2, name: 'Final Exam 2023 - With Solutions.pdf', date: '2023-06-20', size: '1.9 MB' },
      ],
    },
  },
  {
    id: 'cs303',
    code: 'CS 303',
    color: '#899C9A',
    en: {
      name: 'Operating Systems',
      instructor: 'Dr. Layla Al-Hassan',
      level: 'Level 3 · Semester 1',
      desc: 'Process management, memory management, file systems, I/O systems, concurrency, deadlocks, and operating system security.',
      dept: 'Computer Science',
    },
    ar: {
      name: 'نظم التشغيل',
      instructor: 'د. ليلى الحسن',
      level: 'المستوى 3 · الفصل الأول',
      desc: 'إدارة العمليات وإدارة الذاكرة وأنظمة الملفات وأنظمة الإدخال/الإخراج والتزامن والأقفال الميتة وأمان نظم التشغيل.',
      dept: 'علوم الحاسوب',
    },
    resourceCount: 42,
    resources: {
      lectures: [
        { id: 1, name: 'Week 1 - OS Overview & History.pdf', date: '2024-09-05', size: '2.4 MB' },
        { id: 2, name: 'Week 2 - Processes and Threads.pdf', date: '2024-09-12', size: '3.8 MB' },
        { id: 3, name: 'Week 3 - CPU Scheduling Algorithms.pdf', date: '2024-09-19', size: '4.2 MB' },
        { id: 4, name: 'Week 4 - Memory Management.pdf', date: '2024-09-26', size: '5.0 MB' },
        { id: 5, name: 'Week 5 - Virtual Memory & Paging.pdf', date: '2024-10-03', size: '3.7 MB' },
        { id: 6, name: 'Week 6 - File Systems.pdf', date: '2024-10-10', size: '3.1 MB' },
      ],
      books: [
        { id: 1, name: 'Operating System Concepts - Silberschatz 10th Ed.pdf', date: '2024-09-01', size: '20.3 MB' },
        { id: 2, name: 'Modern Operating Systems - Tanenbaum 4th Ed.pdf', date: '2024-09-01', size: '16.5 MB' },
      ],
      assignments: [
        { id: 1, name: 'Assignment 1 - Process Scheduling Simulation.pdf', date: '2024-09-25', size: '1.0 MB' },
        { id: 2, name: 'Assignment 2 - Memory Allocation.pdf', date: '2024-10-15', size: '0.8 MB' },
        { id: 3, name: 'Assignment 3 - Deadlock Detection.pdf', date: '2024-11-05', size: '1.2 MB' },
      ],
      exams: [
        { id: 1, name: 'Midterm Exam 2023.pdf', date: '2023-10-20', size: '1.5 MB' },
        { id: 2, name: 'Final Exam 2023 - With Solutions.pdf', date: '2024-01-15', size: '2.2 MB' },
        { id: 3, name: 'Midterm Exam 2022 - With Solutions.pdf', date: '2022-10-22', size: '1.3 MB' },
      ],
    },
  },
  {
    id: 'cs401',
    code: 'CS 401',
    color: '#525C79',
    en: {
      name: 'Computer Networks',
      instructor: 'Prof. Omar Khalid',
      level: 'Level 4 · Semester 1',
      desc: 'Network architecture, TCP/IP protocol suite, routing algorithms, network security, wireless networks, and network applications.',
      dept: 'Computer Science',
    },
    ar: {
      name: 'شبكات الحاسوب',
      instructor: 'أ.د. عمر خالد',
      level: 'المستوى 4 · الفصل الأول',
      desc: 'بنية الشبكات ومجموعة بروتوكولات TCP/IP وخوارزميات التوجيه وأمان الشبكات والشبكات اللاسلكية وتطبيقات الشبكة.',
      dept: 'علوم الحاسوب',
    },
    resourceCount: 39,
    resources: { lectures: [], books: [], assignments: [], exams: [] },
  },
  {
    id: 'cs402',
    code: 'CS 402',
    color: '#6E7C8B',
    en: {
      name: 'Software Engineering',
      instructor: 'Dr. Nora Petersen',
      level: 'Level 4 · Semester 2',
      desc: 'Software development lifecycle, agile methodologies, requirements engineering, system design, testing, and project management.',
      dept: 'Computer Science',
    },
    ar: {
      name: 'هندسة البرمجيات',
      instructor: 'د. نورا بيترسن',
      level: 'المستوى 4 · الفصل الثاني',
      desc: 'دورة حياة تطوير البرمجيات والمنهجيات الرشيقة وهندسة المتطلبات وتصميم الأنظمة والاختبار وإدارة المشاريع.',
      dept: 'علوم الحاسوب',
    },
    resourceCount: 31,
    resources: { lectures: [], books: [], assignments: [], exams: [] },
  },
  {
    id: 'cs201',
    code: 'CS 201',
    color: '#AABCAF',
    en: {
      name: 'Discrete Mathematics',
      instructor: 'Dr. Ahmed Al-Rashid',
      level: 'Level 2 · Semester 1',
      desc: 'Logic, set theory, relations, functions, combinatorics, graph theory, and mathematical proofs for computer science.',
      dept: 'Computer Science',
    },
    ar: {
      name: 'الرياضيات المتقطعة',
      instructor: 'د. أحمد الراشد',
      level: 'المستوى 2 · الفصل الأول',
      desc: 'المنطق ونظرية المجموعات والعلاقات والدوال والتوافقيات ونظرية الرسوم البيانية والبراهين الرياضية لعلوم الحاسوب.',
      dept: 'علوم الحاسوب',
    },
    resourceCount: 27,
    resources: { lectures: [], books: [], assignments: [], exams: [] },
  },
];

export const universities = [
  { id: 1, name: 'King Abdulaziz University', nameAr: 'جامعة الملك عبدالعزيز', location: 'Jeddah, SA', colleges: 12, courses: 847, students: 34200 },
  { id: 2, name: 'King Saud University', nameAr: 'جامعة الملك سعود', location: 'Riyadh, SA', colleges: 24, courses: 1205, students: 61000 },
  { id: 3, name: 'American University of Beirut', nameAr: 'الجامعة الأمريكية في بيروت', location: 'Beirut, LB', colleges: 8, courses: 612, students: 9400 },
  { id: 4, name: 'Cairo University', nameAr: 'جامعة القاهرة', location: 'Cairo, EG', colleges: 20, courses: 1480, students: 250000 },
];

export const recentActivity = [
  { type: 'upload', user: 'Dr. Sarah Mitchell', action: 'Uploaded Week 6 lecture for Data Structures', time: '2 hours ago', timeAr: 'منذ ساعتين' },
  { type: 'course', user: 'Admin', action: 'Added new course: Machine Learning Fundamentals', time: '5 hours ago', timeAr: 'منذ 5 ساعات' },
  { type: 'upload', user: 'Prof. James Chen', action: 'Added Final Exam 2024 for Database Systems', time: '1 day ago', timeAr: 'منذ يوم' },
  { type: 'university', user: 'Admin', action: 'Added UAE University to the platform', time: '2 days ago', timeAr: 'منذ يومين' },
  { type: 'upload', user: 'Dr. Layla Al-Hassan', action: 'Updated Assignment 3 for Operating Systems', time: '3 days ago', timeAr: 'منذ 3 أيام' },
];
