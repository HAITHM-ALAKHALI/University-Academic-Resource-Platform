// src/services/courseService.ts
import { apiClient } from "./api";
import type { AcademicCourse, CourseResource } from "../types/academic";
import type { ApiResponse } from "../types/api";

export const courseService = {
  /**
   * Fetch all courses from the API
   */
  fetchCourses: async (): Promise<AcademicCourse[]> => {
    const response = await apiClient.get<ApiResponse<AcademicCourse[]>>("/courses");
    return response.data.data || [];
  },

  /**
   * Fetch academic content/resources for a specific doctor
   */
  fetchDoctorContents: async (courseDoctorId: number): Promise<CourseResource[]> => {
    const response = await apiClient.get<ApiResponse<CourseResource[]>>(
      `/contents?doctor_id=${courseDoctorId}`
    );
    return response.data.data || [];
  },
};

// Export individual functions for convenience
export const fetchCourses = courseService.fetchCourses;
export const fetchDoctorContents = courseService.fetchDoctorContents;

export default courseService;