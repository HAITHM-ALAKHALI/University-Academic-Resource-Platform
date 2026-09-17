import { apiClient } from "./api";
import type { DepartmentsInfo  , DepartmentEntity , AddDepartment , ApiResponse} from "../types/api";

export const departmentService = {
  getDepartments: async (): Promise<DepartmentsInfo> => {
    const response = await apiClient.get<DepartmentsInfo>("/departments");
    return response.data; // هنا response.data هي التي تطابق DepartmentsInfo
  },

  AddDepartment: async (departmentInfo : AddDepartment): Promise<ApiResponse<DepartmentEntity>> => {
    const response = await apiClient.post<ApiResponse<DepartmentEntity>>('/add-departments' , departmentInfo)
    return response.data
  }
};

export default departmentService;
