import { apiClient } from "./api";
import type {
  DoctorEntity,
  DoctorsInfo,
  AddDoctor,
  ApiResponse,
} from "../types/api";

export const doctorService = {
  // GET: جلب الكل
  fetchDoctors: async (): Promise<DoctorsInfo> => {
    const response = await apiClient.get<DoctorsInfo>("/doctors");
    return response.data;
  },

  // GET: جلب دكتور محدد
  getDoctorById: async (id: number): Promise<ApiResponse<DoctorEntity>> => {
    const response = await apiClient.get<ApiResponse<DoctorEntity>>(
      `/doctors/${id}`,
    );
    return response.data;
  },

  // POST: إنشاء دكتور جديد
  addDoctor: async (payload: AddDoctor): Promise<ApiResponse<DoctorEntity>> => {
    const response = await apiClient.post<ApiResponse<DoctorEntity>>(
      "/doctors",
      payload,
    );
    return response.data;
  },

  // PUT: تحديث بيانات دكتور
  updateDoctor: async (
    id: number,
    payload: Partial<AddDoctor>,
  ): Promise<ApiResponse<DoctorEntity>> => {
    const response = await apiClient.put<ApiResponse<DoctorEntity>>(
      `/doctors/${id}`,
      payload,
    );
    return response.data;
  },

  // DELETE: حذف دكتور
  deleteDoctor: async (id: number): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(
      `/doctors/${id}`,
    );
    return response.data;
  },
};

export default doctorService;
