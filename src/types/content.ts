/**
 * Content Management and Academic Hierarchy Types
 * Strictly aligned with the darasty_db_2 database schema.
 */

export interface DepartmentEntity {
  department_id: number;
  name: string;
  code: string;
  created_at?: string;
  updated_at?: string;
}

export interface LevelEntity {
  level_id: number;
  department_id: number;
  name: string;
  level_number: number;
  created_at?: string;
}

export interface SemesterEntity {
  semester_id: number;
  level_id: number;
  name: string;
  semester_number: number;
  academic_year: string;
  created_at?: string;
}

export interface CourseEntity {
  course_id: number;
  course_code: string;
  course_name_ar: string;
  course_name_en?: string;
  description?: string;
  credit_hours?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CourseOfferingEntity {
  offering_id: number;
  course_id: number;
  semester_id: number;
  course?: CourseEntity;
  created_at?: string;
  updated_at?: string;
}

export interface DoctorUserEntity {
  doctor_id: number;
  user_id: number;
  full_name: string;
  email: string;
  created_at?: string;
}

export interface CourseDoctorEntity {
  course_doctor_id: number;
  offering_id: number;
  doctor_id: number;
  doctor?: DoctorUserEntity;
  created_at?: string;
}

export interface ContentTypeEntity {
  content_type_id: number;
  name: string;
  description?: string;
  created_at?: string;
}

export type ContentSourceType = "file" | "video";

export type ContentStatus = "pending" | "approved" | "rejected";

export interface ContentEntity {
  content_id: number;
  course_doctor_id: number;
  content_type_id: number;
  uploaded_by: number;
  uploaded_by_name?: string;
  title: string;
  description?: string;
  source_type: ContentSourceType;
  file_path?: string;
  file_name?: string;
  file_size?: number;
  file_size_formatted?: string;
  file_extension?: string;
  video_url?: string;
  download_count: number;
  status: ContentStatus;
  created_at: string;
  updated_at?: string;
}

export interface CreateContentPayload {
  title: string;
  description?: string;
  content_type_id: number;
  source_type: ContentSourceType;
  file_name?: string;
  file_size?: number;
  file_extension?: string;
  video_url?: string;
}
