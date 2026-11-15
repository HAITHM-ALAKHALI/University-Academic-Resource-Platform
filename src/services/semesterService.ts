import { apiClient } from "./api";
import type {
  SemesterEntity,
  SemestersInfo,
  AddSemester,
  ApiResponse,
} from "../types/api";

export interface SemesterFilterParams {
  levelId?: number;
  academicYear?: string;
}

export const semesterService = {
  fetchSemesters: async (
    filters?: SemesterFilterParams,
  ): Promise<SemestersInfo> => {
    const params: Record<string, string | number> = {};
    if (filters?.levelId) params.level_id = filters.levelId;
    if (filters?.academicYear) params.academic_year = filters.academicYear;

    const response = await apiClient.get<SemestersInfo>("/semesters", {
      params: Object.keys(params).length > 0 ? params : undefined,
    });
    return response.data;
  },

  addSemester: async (
    payload: AddSemester,
  ): Promise<ApiResponse<SemesterEntity>> => {
    const response = await apiClient.post<ApiResponse<SemesterEntity>>(
      "/semesters",
      payload,
    );
    return response.data;
  },

  updateSemester: async (
    id: number,
    payload: AddSemester,
  ): Promise<ApiResponse<SemesterEntity>> => {
    const response = await apiClient.put<ApiResponse<SemesterEntity>>(
      `/semesters/${id}`,
      payload,
    );
    return response.data;
  },

  deleteSemester: async (id: number): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(
      `/semesters/${id}`,
    );
    return response.data;
  },
};

export default semesterService;
