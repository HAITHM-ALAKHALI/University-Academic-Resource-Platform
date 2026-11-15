import { apiClient } from "./api";
import type { CourseDoctorAssignment } from "../types/api";

export const courseDoctorsService = {
  /**
   * جلب كافة إسنادات الدكاترة، أو مصفاة حسب المقرر المطروح (offering_id)
   */
  getAssignments: async (
    offeringId?: number,
  ): Promise<CourseDoctorAssignment[]> => {
    const url = offeringId
      ? `/course-doctors?offering_id=${offeringId}`
      : "/course-doctors";
    const res = await apiClient.get(url);
    return res.data.data;
  },

  /**
   * إسناد دكتور إلى مقرر مطروح
   */
  assignDoctor: async (payload: { offering_id: number; doctor_id: number }) => {
    const res = await apiClient.post("/course-doctors", payload);
    return res.data;
  },

  /**
   * حذف إسناد دكتور
   */
  deleteAssignment: async (id: number) => {
    const res = await apiClient.delete(`/course-doctors/${id}`);
    return res.data;
  },

  /**
   * تعديل إسناد دكتور لمقرر مطروح
   */
  updateAssignment: async (
    id: number,
    payload: { offering_id: number; doctor_id: number },
  ) => {
    const res = await apiClient.put(`/course-doctors/${id}`, payload);
    return res.data;
  },
};

export default courseDoctorsService;
