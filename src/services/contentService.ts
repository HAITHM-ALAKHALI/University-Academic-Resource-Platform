import { apiClient } from "./api";
import type { ContentEntity, ContentStatus } from "../types/content";

export const contentService = {
  // جلب كافة المحتويات أو تصفيتها بحسب دكتور المادة
  getContents: async (
    courseDoctorId?: number | "",
  ): Promise<ContentEntity[]> => {
    const endpoint = courseDoctorId
      ? `/contents?course_doctor_id=${courseDoctorId}`
      : `/contents`;

    const res = await apiClient.get(endpoint);
    return res.data?.data || res.data || [];
  },

  // رفع محتوى جديد
  createContent: async (formData: FormData): Promise<ContentEntity> => {
    const res = await apiClient.post("/contents", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data?.data || res.data;
  },

  // تعديل بيانات المحتوى
  updateContent: async (
    id: number,
    data: Partial<ContentEntity>,
  ): Promise<ContentEntity> => {
    const res = await apiClient.put(`/contents/${id}`, data);
    return res.data?.data || res.data;
  },

  // تحديث حالة الاعتماد
  updateStatus: async (id: number, status: ContentStatus): Promise<void> => {
    await apiClient.patch(`/contents/${id}/status`, { status });
  },

  // حذف المحتوى
  deleteContent: async (id: number): Promise<void> => {
    await apiClient.delete(`/contents/${id}`);
  },
};
