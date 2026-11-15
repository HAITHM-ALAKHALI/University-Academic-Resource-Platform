import { apiClient } from "./api";
import type {
  LevelEntity,
  LevelsInfo,
  AddLevel,
  ApiResponse,
} from "../types/api";

export const levelService = {
  /**
   * جلب كافة المستويات الدراسية، مع إمكانية الفلترة بحسب القسم
   */
  fetchLevels: async (departmentId?: number): Promise<LevelsInfo> => {
    const response = await apiClient.get<LevelsInfo>("/levels", {
      params: departmentId ? { department_id: departmentId } : undefined,
    });
    return response.data;
  },

  /**
   * إضافة مستوى جديد
   */
  addLevel: async (payload: AddLevel): Promise<ApiResponse<LevelEntity[]>> => {
    const response = await apiClient.post<ApiResponse<LevelEntity[]>>(
      "/levels",
      payload,
    );
    return response.data;
  },

  /**
   * تحديث بيانات مستوى
   */
  updateLevel: async (
    id: number,
    payload: AddLevel,
  ): Promise<ApiResponse<LevelEntity>> => {
    const response = await apiClient.put<ApiResponse<LevelEntity>>(
      `/levels/${id}`,
      payload,
    );
    return response.data;
  },

  /**
   * حذف مستوى دراسي
   */
  deleteLevel: async (id: number): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/levels/${id}`);
    return response.data;
  },
};

export default levelService;
