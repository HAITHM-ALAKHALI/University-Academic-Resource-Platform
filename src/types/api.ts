export interface UserPayload {
  full_name: string;
  email: string;
  password: string;
}

export interface CheckUserCredentials {
  email: string;
  password: string;
}

export interface AuthenticatedUser {
  id: number;
  full_name: string;
  email: string;
  role_id: number;
  status: string;
  token?: string;
}

export interface ApiResponse<T = unknown> {
  status: boolean;
  message?: string;
  massage?: string; // Matching legacy backend response variant
  data?: T;
  error?: string;
}

export interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
  error?: string;
}

export interface ActionSuccessResponse {
  success: boolean;
  message?: string;
}

export interface AdminCreationResult {
  id?: number;
  full_name?: string;
  email?: string;
}

export interface DepartmentEntity {
  department_id: number;
  name: string;
  code: string;
}

export interface AddDepartment {
  name: string;
  code: string;
}

export interface DepartmentsInfo {
  status: boolean;
  count: number;
  data: DepartmentEntity[];
}

export interface LevelEntity {
  level_id: number;
  name: string;
  level_number: number;
}

export interface LevelInfo {
  status: boolean;
  count: number;
  data: DepartmentEntity[];
}

export interface CourseEntity {
  course_id: number;
  course_code: string;
  course_name_ar: string;
  course_name_en: string;
  desc?: string | null;
  credit_hours: number;
}

export interface CourseInfo {
  status: boolean;
  count: number;
  data: CourseEntity[];
}

export interface AddCourse {
  course_code: number;
  name_ar: string;
  name_en: string;
  desc?: string;
  credit_hours: number;
}

export interface LevelEntity {
  level_id: number;
  department_id: number;
  name: string;
  level_number: number;
  created_at?: string;
  department?: DepartmentEntity; // في حال تضمين علاقة القسم عبر eager loading
}

// البيانات المطلوبة عند إنشاء مستوى جديد
export interface AddLevel {
  department_ids: number[]; // مصفوفة معرفات
  name: string;
  level_number: number;
}

// بنية الاستجابة عند جلب قائمة المستويات
export interface LevelsInfo {
  status: boolean;
  count: number;
  data: LevelEntity[];
}

export interface SemesterEntity {
  semester_id: number;
  level_id: number;
  name?: string;
  semester_name?: string; // المفتاح القادم من دالة index في الباك إند
  semester_number: number;
  academic_year: string;
  level_name?: string;
  department_name?: string;
  department_code?: string | null;
  created_at?: string;
  level?: LevelEntity;
}

export interface AddSemester {
  level_id: number;
  name: string;
  semester_number: number;
  academic_year: string;
}

export interface SemestersInfo {
  status: boolean;
  count: number;
  data: SemesterEntity[];
}

export interface DoctorUser {
  user_id: number;
  full_name: string;
  email: string;
  name_ar?: string;
  name_en?: string;
  status?: string;
}

export interface DoctorEntity {
  doctor_id: number;
  user_id: number;
  created_at?: string;
  updated_at?: string;
  user: DoctorUser;
}

export interface AddDoctor {
  name_ar: string;
  name_en: string;
}

export interface DoctorsInfo {
  status: boolean;
  count: number;
  data: DoctorEntity[];
}

// أنواع المحتوى
export interface ContentTypeEntity {
  content_type_id: number;
  name: string;
  description?: string;
}

// طرح المواد في الأترام
export interface CourseOfferingEntity {
  offering_id: number;
  course_code: string | null;
  course_name: string;
  semester_name: string;
  doctors: {
    course_doctor_id: number;
    doctor_name: string;
  }[];
}

// إسناد الدكاترة للمواد المطروحة
export interface CourseDoctorEntity {
  course_doctor_id: number;
  doctor_name: string;
  course_name: string;
  course_code: string | null;
  department_name: string;
  level_name: string;
  semester_name: string;
}

// حمولات الإنشاء (Payloads)
export interface AddCourseOfferingPayload {
  course_id: number;
  semester_id: number;
}

export interface AssignDoctorPayload {
  offering_id: number;
  doctor_id: number;
}
