import type {
  DepartmentEntity,
  LevelEntity,
  SemesterEntity,
  CourseEntity,
  CourseOfferingEntity,
  DoctorUserEntity,
  CourseDoctorEntity,
  ContentTypeEntity,
  ContentEntity,
} from "../types/content";

// 1. Departments (matching darasty_db_2 `departments` table)
export const initialDepartments: DepartmentEntity[] = [
  { department_id: 1, name: "علوم حاسوب", code: "CS" },
  { department_id: 2, name: "تقنية معلومات", code: "IT" },
  { department_id: 3, name: "أمن سيبراني", code: "CYS" },
  { department_id: 4, name: "علم البيانات", code: "DS" },
  { department_id: 5, name: "ذكاء اصطناعي", code: "AI" },
  { department_id: 6, name: "نظم معلومات", code: "IS" },
];

// 2. Levels (matching darasty_db_2 `levels` table)
export const initialLevels: LevelEntity[] = [
  // CS Levels
  { level_id: 1, department_id: 1, name: "المستوى الأول", level_number: 1 },
  { level_id: 2, department_id: 1, name: "المستوى الثاني", level_number: 2 },
  { level_id: 3, department_id: 1, name: "المستوى الثالث", level_number: 3 },
  { level_id: 4, department_id: 1, name: "المستوى الرابع", level_number: 4 },
  // IT Levels
  { level_id: 5, department_id: 2, name: "المستوى الأول", level_number: 1 },
  { level_id: 6, department_id: 2, name: "المستوى الثاني", level_number: 2 },
  { level_id: 7, department_id: 2, name: "المستوى الثالث", level_number: 3 },
  { level_id: 8, department_id: 2, name: "المستوى الرابع", level_number: 4 },
  // CYS Levels
  { level_id: 9, department_id: 3, name: "المستوى الأول", level_number: 1 },
  { level_id: 10, department_id: 3, name: "المستوى الثاني", level_number: 2 },
  { level_id: 11, department_id: 3, name: "المستوى الثالث", level_number: 3 },
  { level_id: 12, department_id: 3, name: "المستوى الرابع", level_number: 4 },
  // DS Levels
  { level_id: 13, department_id: 4, name: "المستوى الأول", level_number: 1 },
  { level_id: 14, department_id: 4, name: "المستوى الثاني", level_number: 2 },
  // AI Levels
  { level_id: 15, department_id: 5, name: "المستوى الأول", level_number: 1 },
  { level_id: 16, department_id: 5, name: "المستوى الثاني", level_number: 2 },
  // IS Levels
  { level_id: 17, department_id: 6, name: "المستوى الأول", level_number: 1 },
  { level_id: 18, department_id: 6, name: "المستوى الثاني", level_number: 2 },
];

// 3. Semesters (matching darasty_db_2 `semesters` table)
export const initialSemesters: SemesterEntity[] = [
  // Level 1 (CS)
  { semester_id: 1, level_id: 1, name: "الفصل الدراسي الأول", semester_number: 1, academic_year: "2024/2025" },
  { semester_id: 2, level_id: 1, name: "الفصل الدراسي الثاني", semester_number: 2, academic_year: "2024/2025" },
  // Level 2 (CS)
  { semester_id: 3, level_id: 2, name: "الفصل الدراسي الأول", semester_number: 1, academic_year: "2024/2025" },
  { semester_id: 4, level_id: 2, name: "الفصل الدراسي الثاني", semester_number: 2, academic_year: "2024/2025" },
  // Level 3 (CS)
  { semester_id: 5, level_id: 3, name: "الفصل الدراسي الأول", semester_number: 1, academic_year: "2024/2025" },
  { semester_id: 6, level_id: 3, name: "الفصل الدراسي الثاني", semester_number: 2, academic_year: "2024/2025" },
  // Level 4 (CS)
  { semester_id: 7, level_id: 4, name: "الفصل الدراسي الأول", semester_number: 1, academic_year: "2024/2025" },
  { semester_id: 8, level_id: 4, name: "الفصل الدراسي الثاني", semester_number: 2, academic_year: "2024/2025" },
  // Level 5 (IT Level 1)
  { semester_id: 9, level_id: 5, name: "الفصل الدراسي الأول", semester_number: 1, academic_year: "2024/2025" },
  { semester_id: 10, level_id: 5, name: "الفصل الدراسي الثاني", semester_number: 2, academic_year: "2024/2025" },
  // Level 9 (CYS Level 1)
  { semester_id: 11, level_id: 9, name: "الفصل الدراسي الأول", semester_number: 1, academic_year: "2024/2025" },
  { semester_id: 12, level_id: 9, name: "الفصل الدراسي الثاني", semester_number: 2, academic_year: "2024/2025" },
];

// 4. Master Courses (matching darasty_db_2 `courses` table)
export const initialMasterCourses: CourseEntity[] = [
  { course_id: 1, course_code: "CS101", course_name_ar: "برمجة 1", course_name_en: "Programming 1", credit_hours: 3 },
  { course_id: 2, course_code: "MATH101", course_name_ar: "تفاضل وتكامل 1", course_name_en: "Calculus 1", credit_hours: 3 },
  { course_id: 3, course_code: "CS105", course_name_ar: "مقدمة حاسوب", course_name_en: "Intro to CS", credit_hours: 2 },
  { course_id: 4, course_code: "CS102", course_name_ar: "برمجة 2", course_name_en: "Programming 2", credit_hours: 3 },
  { course_id: 5, course_code: "CS106", course_name_ar: "تراكيب متقطعة", course_name_en: "Discrete Structures", credit_hours: 3 },
  { course_id: 6, course_code: "CS201", course_name_ar: "هياكل بيانات", course_name_en: "Data Structures", credit_hours: 3 },
  { course_id: 7, course_code: "CS202", course_name_ar: "قواعد بيانات", course_name_en: "Database Systems", credit_hours: 3 },
  { course_id: 8, course_code: "CS301", course_name_ar: "ذكاء اصطناعي", course_name_en: "Artificial Intelligence", credit_hours: 3 },
  { course_id: 9, course_code: "CS302", course_name_ar: "شبكات الحاسوب", course_name_en: "Computer Networks", credit_hours: 3 },
  { course_id: 10, course_code: "CS401", course_name_ar: "هندسة البرمجيات", course_name_en: "Software Engineering", credit_hours: 3 },
];

// 5. Course Offerings (matching darasty_db_2 `course_offerings` table)
export const initialCourseOfferings: CourseOfferingEntity[] = [
  {
    offering_id: 1,
    course_id: 1,
    semester_id: 1,
    course: initialMasterCourses.find((c) => c.course_id === 1),
  },
  {
    offering_id: 2,
    course_id: 2,
    semester_id: 1,
    course: initialMasterCourses.find((c) => c.course_id === 2),
  },
  {
    offering_id: 3,
    course_id: 3,
    semester_id: 1,
    course: initialMasterCourses.find((c) => c.course_id === 3),
  },
  {
    offering_id: 4,
    course_id: 4,
    semester_id: 2,
    course: initialMasterCourses.find((c) => c.course_id === 4),
  },
  {
    offering_id: 5,
    course_id: 5,
    semester_id: 2,
    course: initialMasterCourses.find((c) => c.course_id === 5),
  },
  {
    offering_id: 6,
    course_id: 6,
    semester_id: 3,
    course: initialMasterCourses.find((c) => c.course_id === 6),
  },
  {
    offering_id: 7,
    course_id: 7,
    semester_id: 3,
    course: initialMasterCourses.find((c) => c.course_id === 7),
  },
  {
    offering_id: 8,
    course_id: 8,
    semester_id: 5,
    course: initialMasterCourses.find((c) => c.course_id === 8),
  },
  {
    offering_id: 9,
    course_id: 9,
    semester_id: 6,
    course: initialMasterCourses.find((c) => c.course_id === 9),
  },
  {
    offering_id: 10,
    course_id: 10,
    semester_id: 7,
    course: initialMasterCourses.find((c) => c.course_id === 10),
  },
];

// 6. Doctors (matching darasty_db_2 `doctors` and `users` tables)
export const initialDoctorUsers: DoctorUserEntity[] = [
  { doctor_id: 1, user_id: 6, full_name: "د. موسى غراب", email: "dr.Mosa.Gorab@drasty.com" },
  { doctor_id: 2, user_id: 13, full_name: "د. مروه الهادي", email: "dr.Marwah.Alhadi@drasty.com" },
  { doctor_id: 3, user_id: 14, full_name: "د. صفاء الهادي", email: "safaalhade.42@drasty.com" },
  { doctor_id: 4, user_id: 17, full_name: "د. نور الهادي", email: "nooralhade.@drasty.com" },
];

// 7. Course Doctors (matching darasty_db_2 `course_doctors` table)
export const initialCourseDoctors: CourseDoctorEntity[] = [
  // Offering 1: CS101 (Semester 1)
  {
    course_doctor_id: 1,
    offering_id: 1,
    doctor_id: 1,
    doctor: initialDoctorUsers.find((d) => d.doctor_id === 1),
  },
  {
    course_doctor_id: 2,
    offering_id: 1,
    doctor_id: 2,
    doctor: initialDoctorUsers.find((d) => d.doctor_id === 2),
  },
  // Offering 2: MATH101 (Semester 1)
  {
    course_doctor_id: 3,
    offering_id: 2,
    doctor_id: 3,
    doctor: initialDoctorUsers.find((d) => d.doctor_id === 3),
  },
  // Offering 4: CS102 (Semester 2)
  {
    course_doctor_id: 4,
    offering_id: 4,
    doctor_id: 1,
    doctor: initialDoctorUsers.find((d) => d.doctor_id === 1),
  },
  // Offering 6: CS201 (Semester 3)
  {
    course_doctor_id: 5,
    offering_id: 6,
    doctor_id: 4,
    doctor: initialDoctorUsers.find((d) => d.doctor_id === 4),
  },
];

// 8. Content Types (matching darasty_db_2 `content_types` table)
export const initialContentTypes: ContentTypeEntity[] = [
  { content_type_id: 1, name: "محاضرة", description: "ملفات المحاضرات والشروحات" },
  { content_type_id: 2, name: "ملخص", description: "ملخصات المواد والكبسولات الدراسية" },
  { content_type_id: 3, name: "مرجع", description: "الكتب والمراجع العلمية المعتمدة" },
  { content_type_id: 4, name: "واجب", description: "الواجبات والتكاليف والتطبيقات" },
  { content_type_id: 5, name: "اختبار", description: "نماذج الاختبارات السابقة والنهائية" },
  { content_type_id: 6, name: "كود", description: "الأكواد البرمجية والمشاريع التطبيقية" },
  { content_type_id: 7, name: "فيديو", description: "روابط المحاضرات المسجلة والفيديوهات" },
];

// 9. Initial Content Records (matching darasty_db_2 `contents` table)
export const initialContents: ContentEntity[] = [
  {
    content_id: 1,
    course_doctor_id: 1,
    content_type_id: 1,
    uploaded_by: 6,
    uploaded_by_name: "د. موسى غراب",
    title: "المحاضرة 1 - مدخل إلى البرمجة الهيكلية ولغة C++",
    description: "شرح بيئة العمل IDE والمتغيرات والعمليات الحسابية والمنطقية الأساسية.",
    source_type: "file",
    file_path: "/uploads/cs101/lecture_1_intro.pdf",
    file_name: "Lecture_01_Intro_to_CPP.pdf",
    file_size: 2560000,
    file_size_formatted: "2.4 MB",
    file_extension: "pdf",
    download_count: 148,
    status: "approved",
    created_at: "2024-09-12 10:30",
  },
  {
    content_id: 2,
    course_doctor_id: 1,
    content_type_id: 1,
    uploaded_by: 6,
    uploaded_by_name: "د. موسى غراب",
    title: "المحاضرة 2 - جمل التحكم والشروط وحلقات التكرار",
    description: "تفصيل استخدامات If-Else و Switch-Case وحلقات For و While و Do-While.",
    source_type: "file",
    file_path: "/uploads/cs101/lecture_2_loops.pptx",
    file_name: "Lecture_02_Conditions_and_Loops.pptx",
    file_size: 4200000,
    file_size_formatted: "4.0 MB",
    file_extension: "pptx",
    download_count: 112,
    status: "approved",
    created_at: "2024-09-19 11:15",
  },
  {
    content_id: 3,
    course_doctor_id: 1,
    content_type_id: 7,
    uploaded_by: 6,
    uploaded_by_name: "د. موسى غراب",
    title: "شرح تطبيقي مسجل: بناء حاسبة متقدمة باستخدام الدوال والمصفوفات",
    description: "تطبيق عملي خطوة بخطوة لبناء مشروع صغير يوظف كافة المفاهيم المشروحة.",
    source_type: "video",
    video_url: "https://www.youtube.com/watch?v=vLnPwxZdW4Y",
    download_count: 340,
    status: "approved",
    created_at: "2024-09-24 18:00",
  },
  {
    content_id: 4,
    course_doctor_id: 1,
    content_type_id: 4,
    uploaded_by: 5,
    uploaded_by_name: "علي - مدير محتوى",
    title: "التكليف الأول - خوارزميات البحث والفرز في المصفوفات",
    description: "الموعد النهائي للتسليم: الأسبوع القادم يوم الخميس في المختبر.",
    source_type: "file",
    file_path: "/uploads/cs101/assignment_1.docx",
    file_name: "Assignment_1_Arrays.docx",
    file_size: 580000,
    file_size_formatted: "580 KB",
    file_extension: "docx",
    download_count: 85,
    status: "pending",
    created_at: "2024-10-01 09:00",
  },
  {
    content_id: 5,
    course_doctor_id: 1,
    content_type_id: 5,
    uploaded_by: 6,
    uploaded_by_name: "د. موسى غراب",
    title: "نماذج اختبارات نصفية سابقة (2022 - 2023) مع الحلول النموذجية",
    description: "أوراق الامتحانات النصفية للأعوام السابقة لمساعدة الطلاب في الاستعداد.",
    source_type: "file",
    file_path: "/uploads/cs101/midterm_past_exams.pdf",
    file_name: "CS101_Midterm_Past_Exams.pdf",
    file_size: 1950000,
    file_size_formatted: "1.9 MB",
    file_extension: "pdf",
    download_count: 289,
    status: "approved",
    created_at: "2024-10-08 14:20",
  },
  {
    content_id: 6,
    course_doctor_id: 1,
    content_type_id: 3,
    uploaded_by: 6,
    uploaded_by_name: "د. موسى غراب",
    title: "المرجع المعتمد: C++ How to Program (Paul Deitel & Harvey Deitel)",
    description: "النسخة العاشرة الأصلية للمرجع العالمي المعتمد في المقرر.",
    source_type: "file",
    file_path: "/uploads/cs101/deitel_cpp_10th.pdf",
    file_name: "Deitel_CPP_How_to_Program_10th_Edition.pdf",
    file_size: 19200000,
    file_size_formatted: "18.3 MB",
    file_extension: "pdf",
    download_count: 530,
    status: "approved",
    created_at: "2024-09-08 08:45",
  },
  {
    content_id: 7,
    course_doctor_id: 1,
    content_type_id: 2,
    uploaded_by: 2,
    uploaded_by_name: "أحمد - مدير النظام",
    title: "ملخص المؤشرات وإدارة الذاكرة الديناميكية (Pointers & Dynamic Memory)",
    description: "ملاحظات إضافية وتلخيص من إعداد طلاب الأوائل للدفعة السابقة.",
    source_type: "file",
    file_path: "/uploads/cs101/pointers_summary.pdf",
    file_name: "Pointers_Quick_Summary.pdf",
    file_size: 890000,
    file_size_formatted: "890 KB",
    file_extension: "pdf",
    download_count: 14,
    status: "rejected",
    created_at: "2024-10-12 16:10",
  },
  // CD 2: CS101 by د. مروه الهادي
  {
    content_id: 8,
    course_doctor_id: 2,
    content_type_id: 1,
    uploaded_by: 13,
    uploaded_by_name: "د. مروه الهادي",
    title: "Ch 1: Introduction to Programming Concepts",
    description: "Slides and lecture notes for section B students.",
    source_type: "file",
    file_path: "/uploads/cs101/sec_b_ch1.pdf",
    file_name: "SectionB_CS101_Ch1.pdf",
    file_size: 3100000,
    file_size_formatted: "3.1 MB",
    file_extension: "pdf",
    download_count: 94,
    status: "approved",
    created_at: "2024-09-14 12:00",
  },
  {
    content_id: 9,
    course_doctor_id: 2,
    content_type_id: 4,
    uploaded_by: 13,
    uploaded_by_name: "د. مروه الهادي",
    title: "Lab Assignment 1 - Functions & Pass-By-Reference",
    description: "Hand-in required before Monday lab session.",
    source_type: "file",
    file_path: "/uploads/cs101/lab1.pdf",
    file_name: "CS101_Lab_Assignment_1.pdf",
    file_size: 420000,
    file_size_formatted: "420 KB",
    file_extension: "pdf",
    download_count: 76,
    status: "approved",
    created_at: "2024-09-21 15:30",
  },
];
