import { apiClient } from "./api";
import type {
  CourseEntity,
  CourseInfo,
  ApiResponse,
  AddCourse,
} from "../types/api";

export const courseService = {
  /**
   * Fetch all courses from the API
   */
  fetchCourses: async (): Promise<CourseInfo> => {
    const response = await apiClient.get<CourseInfo>("/courses");
    return response.data;
  },

  /**
   * Add a new course
   */
  addCourse: async (payload: AddCourse): Promise<ApiResponse<CourseEntity>> => {
    const response = await apiClient.post<ApiResponse<CourseEntity>>(
      "/courses",
      payload,
    );
    return response.data;
  },

  /**
   * Update an existing course
   */
  updateCourse: async (
    id: number,
    payload: AddCourse,
  ): Promise<ApiResponse<CourseEntity>> => {
    const response = await apiClient.put<ApiResponse<CourseEntity>>(
      `/courses/${id}`,
      payload,
    );
    return response.data;
  },

  /**
   * Delete a course
   */
  deleteCourse: async (id: number): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(
      `/courses/${id}`,
    );
    return response.data;
  },
};

export default courseService;
