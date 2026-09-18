import { apiClient } from "./api";
import type {
  DepartmentsInfo,
  DepartmentEntity,
  AddDepartment,
  ApiResponse,
} from "../types/api";

export const departmentService = {
  // جلب كافة الأقسام
  getDepartments: async (): Promise<DepartmentsInfo> => {
    const response = await apiClient.get<DepartmentsInfo>("/departments");
    return response.data;
  },

  // إضافة قسم جديد (تمت إضافة نوع الإرجاع الصريح)
  addDepartment: async (
    payload: AddDepartment,
  ): Promise<ApiResponse<DepartmentEntity>> => {
    const response = await apiClient.post<ApiResponse<DepartmentEntity>>(
      "/departments",
      payload,
    );
    return response.data;
  },

  // تحديث بيانات قسم
  updateDepartment: async (
    id: number,
    payload: AddDepartment,
  ): Promise<ApiResponse<DepartmentEntity>> => {
    const response = await apiClient.put<ApiResponse<DepartmentEntity>>(
      `/departments/${id}`,
      payload,
    );
    return response.data;
  },

  // حذف قسم
  deleteDepartment: async (id: number): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(
      `/departments/${id}`,
    );
    return response.data;
  },
};

export default departmentService;
