export interface CourseResourceItem {
  id: number;
  name: string;
  date: string;
  size: string;
}

export interface CourseResourcesGroup {
  lectures: CourseResourceItem[];
  books: CourseResourceItem[];
  assignments: CourseResourceItem[];
  exams: CourseResourceItem[];
}

export interface MockCourseData {
  id: string;
  code: string;
  color: string;
  en: {
    name: string;
    instructor: string;
    level: string;
    desc: string;
    dept: string;
  };
  ar: {
    name: string;
    instructor: string;
    level: string;
    desc: string;
    dept: string;
  };
  resourceCount: number;
  resources: CourseResourcesGroup;
}

export const courses: MockCourseData[] = [
  {
    id: "cs301",
    code: "CS 301",
    color: "#899C9A",
    en: {
      name: "Data Structures & Algorithms",
      instructor: "Dr. Sarah Mitchell",
      level: "Level 3 · Semester 1",
      desc: "Fundamental data structures including arrays, linked lists, stacks, queues, trees, and graphs. Algorithm analysis, sorting, and searching techniques.",
      dept: "Computer Science",
    },
    ar: {
      name: "هياكل البيانات والخوارزميات",
      instructor: "د. سارة ميتشيل",
      level: "المستوى 3 · الفصل الأول",
      desc: "هياكل البيانات الأساسية بما في ذلك المصفوفات والقوائم المرتبطة والأكوام والطوابير والأشجار والرسوم البيانية. تحليل الخوارزميات وتقنيات الفرز والبحث.",
      dept: "علوم الحاسوب",
    },
    resourceCount: 48,
    resources: {
      lectures: [
        { id: 1, name: "Week 1 - Introduction to Data Structures.pdf", date: "2024-09-05", size: "3.2 MB" },
        { id: 2, name: "Week 2 - Arrays and Linked Lists.pdf", date: "2024-09-12", size: "4.1 MB" },
        { id: 3, name: "Week 3 - Stacks and Queues.pdf", date: "2024-09-19", size: "2.8 MB" },
        { id: 4, name: "Week 4 - Binary Trees.pdf", date: "2024-09-26", size: "5.3 MB" },
        { id: 5, name: "Week 5 - Graph Algorithms.pdf", date: "2024-10-03", size: "6.1 MB" },
        { id: 6, name: "Week 6 - Sorting Algorithms.pdf", date: "2024-10-10", size: "4.7 MB" },
      ],
      books: [
        { id: 1, name: "Introduction to Algorithms (CLRS) - 4th Edition.pdf", date: "2024-09-01", size: "18.4 MB" },
        { id: 2, name: "Data Structures in C++ - Malik.pdf", date: "2024-09-01", size: "12.6 MB" },
        { id: 3, name: "Algorithm Design - Kleinberg & Tardos.pdf", date: "2024-09-01", size: "9.2 MB" },
      ],
      assignments: [
        { id: 1, name: "Assignment 1 - Linked List Implementation.pdf", date: "2024-09-20", size: "0.8 MB" },
        { id: 2, name: "Assignment 2 - Binary Search Tree.pdf", date: "2024-10-10", size: "1.1 MB" },
        { id: 3, name: "Assignment 3 - Graph Traversal.pdf", date: "2024-11-01", size: "0.9 MB" },
      ],
      exams: [
        { id: 1, name: "Midterm Exam 2023 - With Solutions.pdf", date: "2023-10-15", size: "1.4 MB" },
        { id: 2, name: "Final Exam 2023.pdf", date: "2024-01-10", size: "1.8 MB" },
        { id: 3, name: "Midterm Exam 2022.pdf", date: "2022-10-18", size: "1.2 MB" },
        { id: 4, name: "Final Exam 2022 - With Solutions.pdf", date: "2023-01-12", size: "2.0 MB" },
      ],
    },
  },
  {
    id: "cs302",
    code: "CS 302",
    color: "#AABCAF",
    en: {
      name: "Database Systems",
      instructor: "Prof. James Chen",
      level: "Level 3 · Semester 2",
      desc: "Relational database design, SQL, normalization, transaction management, indexing, and an introduction to NoSQL databases.",
      dept: "Computer Science",
    },
    ar: {
      name: "نظم قواعد البيانات",
      instructor: "أ.د. جيمس تشن",
      level: "المستوى 3 · الفصل الثاني",
      desc: "تصميم قواعد البيانات العلائقية وSQL والتوحيد القياسي وإدارة المعاملات والفهرسة ومقدمة لقواعد بيانات NoSQL.",
      dept: "علوم الحاسوب",
    },
    resourceCount: 36,
    resources: {
      lectures: [
        { id: 1, name: "Week 1 - Intro to Databases & Relational Model.pdf", date: "2024-02-08", size: "2.9 MB" },
        { id: 2, name: "Week 2 - SQL Fundamentals.pdf", date: "2024-02-15", size: "3.5 MB" },
        { id: 3, name: "Week 3 - Advanced SQL Queries.pdf", date: "2024-02-22", size: "4.0 MB" },
        { id: 4, name: "Week 4 - Normalization (1NF to 3NF).pdf", date: "2024-02-29", size: "3.2 MB" },
        { id: 5, name: "Week 5 - Transaction Management.pdf", date: "2024-03-07", size: "2.7 MB" },
      ],
      books: [
        { id: 1, name: "Database System Concepts - Silberschatz 7th Ed.pdf", date: "2024-02-01", size: "22.1 MB" },
        { id: 2, name: "Fundamentals of Database Systems - Elmasri.pdf", date: "2024-02-01", size: "15.8 MB" },
      ],
      assignments: [
        { id: 1, name: "Assignment 1 - ER Diagram Design.pdf", date: "2024-02-28", size: "0.7 MB" },
        { id: 2, name: "Assignment 2 - SQL Queries.pdf", date: "2024-03-20", size: "0.9 MB" },
      ],
      exams: [
        { id: 1, name: "Midterm Exam 2023 - Semester 2.pdf", date: "2023-04-05", size: "1.3 MB" },
        { id: 2, name: "Final Exam 2023 - With Solutions.pdf", date: "2023-06-20", size: "1.9 MB" },
      ],
    },
  },
  {
    id: "cs303",
    code: "CS 303",
    color: "#899C9A",
    en: {
      name: "Operating Systems",
      instructor: "Dr. Layla Al-Hassan",
      level: "Level 3 · Semester 1",
      desc: "Process management, memory management, file systems, I/O systems, concurrency, deadlocks, and operating system security.",
      dept: "Computer Science",
    },
    ar: {
      name: "نظم التشغيل",
      instructor: "د. ليلى الحسن",
      level: "المستوى 3 · الفصل الأول",
      desc: "إدارة العمليات وإدارة الذاكرة وأنظمة الملفات وأنظمة الإدخال/الإخراج والتزامن والأقفال الميتة وأمان نظم التشغيل.",
      dept: "علوم الحاسوب",
    },
    resourceCount: 42,
    resources: {
      lectures: [
        { id: 1, name: "Week 1 - OS Overview & History.pdf", date: "2024-09-05", size: "2.4 MB" },
        { id: 2, name: "Week 2 - Processes and Threads.pdf", date: "2024-09-12", size: "3.8 MB" },
        { id: 3, name: "Week 3 - CPU Scheduling Algorithms.pdf", date: "2024-09-19", size: "4.2 MB" },
        { id: 4, name: "Week 4 - Memory Management.pdf", date: "2024-09-26", size: "5.0 MB" },
        { id: 5, name: "Week 5 - Virtual Memory & Paging.pdf", date: "2024-10-03", size: "3.7 MB" },
        { id: 6, name: "Week 6 - File Systems.pdf", date: "2024-10-10", size: "3.1 MB" },
      ],
      books: [
        { id: 1, name: "Operating System Concepts - Silberschatz 10th Ed.pdf", date: "2024-09-01", size: "20.3 MB" },
        { id: 2, name: "Modern Operating Systems - Tanenbaum 4th Ed.pdf", date: "2024-09-01", size: "16.5 MB" },
      ],
      assignments: [
        { id: 1, name: "Assignment 1 - Process Scheduling Simulation.pdf", date: "2024-09-25", size: "1.0 MB" },
        { id: 2, name: "Assignment 2 - Memory Allocation.pdf", date: "2024-10-15", size: "0.8 MB" },
        { id: 3, name: "Assignment 3 - Deadlock Detection.pdf", date: "2024-11-05", size: "1.2 MB" },
      ],
      exams: [
        { id: 1, name: "Midterm Exam 2023.pdf", date: "2023-10-20", size: "1.5 MB" },
        { id: 2, name: "Final Exam 2023 - With Solutions.pdf", date: "2024-01-15", size: "2.2 MB" },
        { id: 3, name: "Midterm Exam 2022 - With Solutions.pdf", date: "2022-10-22", size: "1.3 MB" },
      ],
    },
  },
  {
    id: "cs401",
    code: "CS 401",
    color: "#899C9A",
    en: {
      name: "Computer Networks",
      instructor: "Prof. Omar Khalid",
      level: "Level 4 · Semester 1",
      desc: "Network architecture, TCP/IP protocol suite, routing algorithms, network security, wireless networks, and network applications.",
      dept: "Computer Science",
    },
    ar: {
      name: "شبكات الحاسوب",
      instructor: "أ.د. عمر خالد",
      level: "المستوى 4 · الفصل الأول",
      desc: "بنية الشبكات ومجموعة بروتوكولات TCP/IP وخوارزميات التوجيه وأمان الشبكات والشبكات اللاسلكية وتطبيقات الشبكة.",
      dept: "علوم الحاسوب",
    },
    resourceCount: 39,
    resources: { lectures: [], books: [], assignments: [], exams: [] },
  },
  {
    id: "cs402",
    code: "CS 402",
    color: "#AABCAF",
    en: {
      name: "Software Engineering",
      instructor: "Dr. Nora Petersen",
      level: "Level 4 · Semester 2",
      desc: "Software development lifecycle, agile methodologies, requirements engineering, system design, testing, and project management.",
      dept: "Computer Science",
    },
    ar: {
      name: "هندسة البرمجيات",
      instructor: "د. نورا بيترسن",
      level: "المستوى 4 · الفصل الثاني",
      desc: "دورة حياة تطوير البرمجيات والمنهجيات الرشيقة وهندسة المتطلبات وتصميم الأنظمة والاختبار وإدارة المشاريع.",
      dept: "علوم الحاسوب",
    },
    resourceCount: 31,
    resources: { lectures: [], books: [], assignments: [], exams: [] },
  },
  {
    id: "cs201",
    code: "CS 201",
    color: "#AABCAF",
    en: {
      name: "Discrete Mathematics",
      instructor: "Dr. Ahmed Al-Rashid",
      level: "Level 2 · Semester 1",
      desc: "Logic, set theory, relations, functions, combinatorics, graph theory, and mathematical proofs for computer science.",
      dept: "Computer Science",
    },
    ar: {
      name: "الرياضيات المتقطعة",
      instructor: "د. أحمد الراشد",
      level: "المستوى 2 · الفصل الأول",
      desc: "المنطق ونظرية المجموعات والعلاقات والدوال والتوافقيات ونظرية الرسوم البيانية والبراهين الرياضية لعلوم الحاسوب.",
      dept: "علوم الحاسوب",
    },
    resourceCount: 27,
    resources: { lectures: [], books: [], assignments: [], exams: [] },
  },
];

export interface RecentActivityItem {
  type: "upload" | "course";
  user: string;
  action: string;
  time: string;
  timeAr: string;
}

export const recentActivity: RecentActivityItem[] = [
  {
    type: "upload",
    user: "Dr. Sarah Mitchell",
    action: "Uploaded Week 6 lecture for Data Structures",
    time: "2 hours ago",
    timeAr: "منذ ساعتين",
  },
  {
    type: "course",
    user: "Admin",
    action: "Added new course: Machine Learning Fundamentals",
    time: "5 hours ago",
    timeAr: "منذ 5 ساعات",
  },
  {
    type: "upload",
    user: "Prof. James Chen",
    action: "Added Final Exam 2024 for Database Systems",
    time: "1 day ago",
    timeAr: "منذ يوم",
  },
  {
    type: "upload",
    user: "Dr. Layla Al-Hassan",
    action: "Updated Assignment 3 for Operating Systems",
    time: "3 days ago",
    timeAr: "منذ 3 أيام",
  },
];
