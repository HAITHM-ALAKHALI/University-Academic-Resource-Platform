import { apiClient } from "./api";
import type {
  SemesterEntity,
  SemestersInfo,
  AddSemester,
  ApiResponse,
} from "../types/api";

export const semesterService = {
  fetchSemesters: async (): Promise<SemestersInfo> => {
    const response = await apiClient.get<SemestersInfo>("/semesters");
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
